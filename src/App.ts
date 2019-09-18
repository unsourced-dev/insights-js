import unfetch from "unfetch"
import * as parameters from "./parameters"
import { isInBrowser, isReferrerSameHost, getHost } from "./utils"

/**
 * Additional options used when tracking events
 */
export interface AppOptions {
  /**
   * When true, the call to `track(event)` will never throw nor log any error.
   * This flag should be set to `true` for production systems.
   */
  ignoreErrors?: boolean

  /**
   * When `true`, all calls are disabled.
   * This flag is useful to disable the tracking based on the environment/URL.
   */
  disabled?: boolean
}

/**
 * The default options.
 */
const defaultOptions: AppOptions = {}

function ignore() {}

/**
 * A map of key/value pairs.
 */
interface StringMap<T> {
  [key: string]: T
}

/**
 * A parameter's value to log.
 */
export interface ParameterValue {
  /**
   * A possible type for this value.
   * This will be used by [insights.io](https://insights.io)'s web interface to display certain parameters in specific ways.
   *
   * You should not set the value manually, instead, use provided parameters functions in `parameters`.
   */
  type?: string
  /**
   * The actual value.
   */
  value: string
}

/**
 * The payload to call
 */
export interface TrackEventPayload {
  /**
   * A unique identifier for this event.
   * This should be formatted as `pascal-case`.
   *
   * [insights.io](https://insights.io)'s web interface properly format these parameter names.
   */
  id: string

  /**
   * The parameters to log along this event.
   * Each key in the map is the parameter name, and the value it's value.
   *
   * [insights.io](https://insights.io) will aggregate the counts for each value and display them under each event.
   *
   * e.g.
   * ```js
   * import { track, parameters } from "insights-js"
   *
   * // user signed up with their email/password
   * track({
   *   id: "user-signed-up",
   *   parameters: {
   *     provider: "email",
   *   }
   * })
   *
   * // user signed up with facebook
   * track({
   *   id: "user-signed-up",
   *   parameters: {
   *     provider: "facebook"
   *   }
   * })
   *
   * // a product was sold
   * track({
   *   id: "product-sale",
   *   parameters: {
   *     product: product.name,
   *     currency: customer.currency,
   *   }
   * })
   *
   * // a page was opened
   * track({
   *   id: "open-page",
   *   parameters: {
   *     path: parameters.path(),
   *     screenType: parameters.screenType(),
   *     referrer: parameters.referrer()
   *   }
   * })
   * ```
   */
  parameters?: StringMap<string | ParameterValue>

  /**
   * When true, check if a similar event (i.e. same id & same parameters),
   * has already been logged **with the unique flag** in this session.
   *
   * If a similar event has already been logged, it skips it.
   */
  unique?: boolean

  /**
   * Certain events last through time and may be undone or cancelled after they have been logged.
   * For example, when tracking subscription to services or people.
   *
   * For these events, it is very useful to be able to know:
   *
   * - When an event is tracked
   * - When an event is marked as cancelled
   * - The current number of active (`tracked - cancelled`) events
   *
   * When this flag is set to `true`, the given event is marked as cancelled.
   *
   * e.g:
   * ```js
   * // A user just subscribed!
   * track({
   *   id: "user-subscribed",
   *   parameters: {
   *     plan: "Premium"
   *   }
   * })
   *
   * // A user unsbubscribed.
   * track({
   *   id: "user-subscribed",
   *   parameters: {
   *     plan: "Premium",
   *   },
   *   remove: true
   * })
   * ```
   *
   * When used in combination with `update`, only remove from the counts of the parameters.
   * Useful to "cancel" a parameter value.
   */
  remove?: boolean

  /**
   * When `true`, the count of an event is not updated, only parameter counts.
   * This can be used to modify the value of parameters.
   */
  update?: boolean
}

/**
 * The options to use when tracking pages
 */
export interface TrackPagesOptions {
  /**
   * `true` to track the hash portion of the URL.
   *
   * `false` by default.
   */
  hash?: boolean
  /**
   * `true` to track the search portion of the URL.
   *
   * `false` by default.
   */
  search?: boolean
}

/**
 * The object returned by `App.trackPages()`, used to stop tracking pages.
 */
export interface TrackPagesResult {
  /** Stops the tracking of pages. */
  stop(): void
}

interface TrackPageData {
  hash: boolean
  search: boolean
  result: TrackPagesResult

  time: number
  path: string
}

/**
 * A class that contains a `projectId` and related configuration to track events painlessly.
 */
export class App {
  private uniques: StringMap<boolean> = {}

  // variables used when tracking pages
  private trackPageData: TrackPageData | null = null

  constructor(public projectId: string, public options: AppOptions = defaultOptions) {
    this.trackPageChange = this.trackPageChange.bind(this)
    this.trackLastPageTimeSpent = this.trackLastPageTimeSpent.bind(this)
  }

  /**
   * Track an occurence of the given event.
   *
   * @param event {TrackEventPayload} The event to track.
   *
   * @returns {Promise} a promise that resolves when the call to the API resolves.
   */
  track(event: TrackEventPayload): Promise<void> {
    if (this.options.disabled || !isInBrowser()) {
      return Promise.resolve()
    }
    if (event.unique) {
      const stringified = JSON.stringify(event)
      if (this.uniques[stringified]) return Promise.resolve()
      this.uniques[stringified] = true
    }

    const body: any = {
      id: event.id,
      projectId: this.projectId,
      ignoreErrors: this.options.ignoreErrors || false
    }
    if (event.remove) body.remove = true
    if (event.parameters) body.parameters = event.parameters
    if (event.update) body.update = true

    return unfetch("https://getinsights.io/app/tics", {
      method: "post",
      body: JSON.stringify(body)
    }).then(ignore)
  }

  /**
   * Tracks page views. This method checks if the URL changed every so often and tracks new pages accordingly.
   *
   * @param options The options to use for the tracking
   *
   * @returns An object of the form `{ stop(): void }` to stop the tracking
   */
  trackPages(options?: TrackPagesOptions): TrackPagesResult {
    if (!isInBrowser()) {
      return { stop() {} }
    }
    if (this.trackPageData) {
      return this.trackPageData.result
    }

    // Start tracking page changes
    const interval = setInterval(this.trackPageChange, 2000)

    // Calculate the data
    const { hash = false, search = false } = options || {}
    this.trackPageData = {
      hash,
      search,
      path: parameters.path(hash, search).value,
      time: Date.now(),
      result: {
        stop() {
          clearInterval(interval)
        }
      }
    }

    // Track the first/current page view
    this.trackSinglePage(true, this.trackPageData.path)

    window.addEventListener("beforeunload", this.trackLastPageTimeSpent)

    return this.trackPageData.result
  }

  private getPreviousPage(first: boolean) {
    const dataPath = this.trackPageData && this.trackPageData.path
    if (!first && dataPath) {
      return dataPath
    }
    if (isReferrerSameHost()) {
      return document.referrer.replace(getHost(), "")
    }

    return document.referrer
  }

  private trackPageChange() {
    if (!this.trackPageData) return

    const { hash, search } = this.trackPageData
    const newPath = parameters.path(hash, search).value

    if (newPath !== this.trackPageData.path) {
      this.trackSinglePage(false, newPath)
    }
  }

  private trackSinglePage(first: boolean, path: string) {
    if (!this.trackPageData) return
    const { time } = this.trackPageData
    const params: any = {
      path,
      referrer: parameters.referrer(),
      locale: parameters.locale(),
      screenType: parameters.screenType(),
      unique: first && !isReferrerSameHost() ? "Yes" : "No"
    }

    const previous = this.getPreviousPage(first)
    if (previous && previous !== path) {
      params.transitions = parameters.transition(previous, path)
    }

    if (!first) {
      const now = Date.now()
      this.trackPageData.time = now
      params.duration = parameters.durationInterval(now - time)
    }

    this.trackPageData.path = path
    this.track({
      id: "page-views",
      parameters: params
    })
  }

  private trackLastPageTimeSpent() {
    const time = this.trackPageData && this.trackPageData.time
    if (!time) {
      return
    }

    const now = Date.now()
    this.track({
      id: "page-views",
      parameters: {
        duration: parameters.durationInterval(now - time)
      },
      update: true
    })
  }
}

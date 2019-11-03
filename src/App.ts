import * as parameters from "./parameters"
import { isInBrowser, isReferrerSameHost, getHost, isInIframe } from "./utils"

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
  isOnFirstPage: boolean
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
   */
  track(event: TrackEventPayload) {
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

    // do not use fetch, for IE compatibility
    const request = new XMLHttpRequest()
    request.open("post", "https://getinsights.io/app/tics", true)
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(body))
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
      isOnFirstPage: true,
      time: Date.now(),
      result: {
        stop() {
          clearInterval(interval)
        }
      }
    }

    // Track the first/current page view
    this.trackSinglePage(true, this.trackPageData.path)

    window.addEventListener("unload", this.trackLastPageTimeSpent)

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

    if (isInIframe()) {
      return null
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

    this.trackPageData.isOnFirstPage = first && !isReferrerSameHost()
    const { time, isOnFirstPage } = this.trackPageData
    const params: any = {
      path
    }

    if (isOnFirstPage) {
      params.uniqueViews = path
      params.referrer = parameters.referrer()
      params.locale = parameters.locale()
      params.screenType = parameters.screenType()
    }

    const previous = this.getPreviousPage(first)
    if (previous && previous !== path) {
      params.transitions = parameters.transition(previous, path)

      const now = Date.now()
      this.trackPageData.time = now
      params.duration = parameters.durationInterval(now - time, previous + " - ")
    }

    this.trackPageData.path = path
    this.track({
      id: "page-views",
      parameters: params
    })
  }

  private trackLastPageTimeSpent() {
    const time = this.trackPageData && this.trackPageData.time
    if (!time || typeof navigator.sendBeacon !== "function" || this.options.disabled || !this.trackPageData) {
      return
    }
    const { isOnFirstPage, path } = this.trackPageData
    const params: any = {}

    // add the duration
    params.duration = parameters.durationInterval(Date.now() - time, path + " - ")

    const nextUrl: string = (document.activeElement && (document.activeElement as any).href) || ""
    const host = getHost()
    if (!nextUrl) {
      // user closed the window
      params.bounces = isOnFirstPage ? "Yes" : "No"
    } else if (nextUrl[0] !== "/" && nextUrl.substr(0, host.length) !== getHost()) {
      // link outside of the app
      params.transitions = parameters.transition(path, nextUrl)
    }

    // polyfil for IE, this won't always work, but it's better than nothing.
    navigator.sendBeacon =
      navigator.sendBeacon ||
      function(url: string, body: string) {
        const request = new XMLHttpRequest()
        request.open("post", url, false)
        request.send(body)
      }

    navigator.sendBeacon(
      "https://getinsights.io/app/tics",
      JSON.stringify({
        id: "page-views",
        projectId: this.projectId,
        parameters: params,
        ignoreErrors: this.options.ignoreErrors || false,
        update: true
      })
    )
  }
}

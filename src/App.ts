import unfetch from "unfetch"

/**
 * Additional options used when tracking events
 */
export interface AppOptions {
  /**
   * When true, the call to `track(event)` will never throw nor log any error.
   * This flag should be set to `true` for production systems.
   */
  ignoreErrors?: boolean
}

/**
 * The default options.
 */
const defaultOptions: AppOptions = {}

function ignore() {}

/**
 * A map of key/value pairs.
 */
export interface StringMap<T> {
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
   */
  remove?: boolean
}

/**
 * A class that contains a `projectId` and related configuration to track events painlessly.
 */
export class App {
  private uniques: StringMap<boolean> = {}

  constructor(public projectId: string, public options: AppOptions = defaultOptions) {}

  /**
   * Track an occurence of the given event.
   *
   * @param event {TrackEventPayload} The event to track.
   *
   * @returns {Promise} a promise that resolves when the call to the API resolves.
   */
  track(event: TrackEventPayload): Promise<void> {
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

    return unfetch("https://getinsights.io/app/tics", {
      method: "post",
      body: JSON.stringify(body)
    }).then(ignore)
  }
}

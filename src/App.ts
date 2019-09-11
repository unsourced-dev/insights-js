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
 * A parameter to log
 */
export interface ParameterValue {
  type?: string
  value: string
}

/**
 * The payload to call
 */
export interface TrackEventPayload {
  /**
   * A unique identifier for this event.
   * This should be formatted as `pascal-case`.
   */
  id: string

  /**
   * The parameters to log along this event.
   * Each key in the map is the parameter name, and the value it's value.
   *
   * e.g.
   * ```js
   * track({
   *   id: "user-subscribed",
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
   * When tracking values that can be undone, this
   *
   *
   * e.g.
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
   *     plan: "Premium"
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

import unfetch from "unfetch"
import { getApiUrl } from "./utils"

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

function doNothing() {}

/**
 * The
 */
export interface TrackedEvent {
  /**
   * A unique identifier for this event.
   * This should be formatted as `pascal-case`.
   */
  id: string
}

export class App {
  constructor(public projectId: string, public options: AppOptions = defaultOptions) {}

  /**
   * Track an occurence of the given event.
   *
   * @param event {TrackedEvent} The event to track.
   *
   * @returns {Promise} a promise that resolves when the call to the API resolves.
   */
  track(event: TrackedEvent): Promise<void> {
    return unfetch(getApiUrl("tics"), {
      method: "post",
      body: JSON.stringify({
        id: event.id,
        projectId: this.projectId,
        ignoreErrors: this.options.ignoreErrors
      })
    }).then(doNothing)
  }
}

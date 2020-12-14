import * as parameters from "./parameters"
import { App, AppOptions, TrackEventPayload, TrackPagesOptions, TrackPagesResult } from "./App"
import { isInBrowser } from "./utils"

export { parameters }
export { App, AppOptions, TrackEventPayload, TrackPagesOptions, TrackPagesResult }

/**
 * This file is the entry point for the `insights-js` library.
 *
 * It contains basic methods to initialize and log events:
 * ```typescript
 * init(projectId: string, options?: AppOptions): App
 * track(event: TrackEventPayload): void
 * trackPages(options?: TrackPagesOptions): TrackPagesResult
 * ```
 *
 * As well as the `parameters` helpers.
 */

/**
 * The default application, or `null` if none.
 */
export let DEFAULT_APP: App | null = null

/**
 * Initialize a default app for the given project with the given options.
 *
 * @param projectId The project for which to initialize the library
 * @param options The options to use
 *
 * @returns The default app
 */
export function init(projectId: string, options?: AppOptions): App {
  if (!isInBrowser() || DEFAULT_APP) {
    return DEFAULT_APP as any
  }
  DEFAULT_APP = new App(projectId, options)
  return DEFAULT_APP
}

/**
 * Tracks an event using the default app, you must call `init()` before calling this.
 *
 * @param event The event to track
 */
export function track(event: TrackEventPayload): void {
  if (!DEFAULT_APP || !isInBrowser()) return

  DEFAULT_APP.track(event)
}

/**
 * Tracks page views using the default app.
 * This method checks if the URL changed every so often and tracks new pages accordingly.
 *
 * By default, does not track the `location.hash` nor the `location.search`.
 *
 * @param options The options to use for the tracking
 *
 * @returns An object of the form `{ stop(): void }` to stop the tracking
 */
export function trackPages(options?: TrackPagesOptions): TrackPagesResult {
  if (!DEFAULT_APP || !isInBrowser()) return { stop() {} }

  return DEFAULT_APP.trackPages(options)
}

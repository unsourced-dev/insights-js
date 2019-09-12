import * as parameters from "./parameters"
import { App, AppOptions, TrackEventPayload, TrackPagesOptions, TrackPagesResult } from "./App"

export { parameters }
export { App }

export const apps: App[] = []

/**
 * Initialize a default app for the given project with the given options.
 *
 * @param projectId The project for which to initialize the library
 * @param options The options to use
 *
 * @returns The default app
 */
export function init(projectId: string, options?: AppOptions): App {
  if (apps.length > 0) {
    throw new Error("Already initialized!")
  }
  const result = new App(projectId, options)
  apps.push(result)
  return result
}

/**
 * Tracks an event using the default app, you must call `init()` before calling this.
 *
 * @param event The event to track
 */
export function track(event: TrackEventPayload): void {
  const app = apps[0]
  if (!app) throw new Error("No intialized apps!")

  app.track(event)
}

/**
 * Tracks page views using the default app.
 * This method checks if the URL changed every so often and tracks new pages accordingly.
 *
 * **Important note on bounce rate and unique views:**
 *
 * This method does not store any cookie or local storage, it expects that you use a client-side router.
 * e.g. `react-router`, `nextjs`'s router, etc...
 * The bounce rate and unique views will not be accurate if you do not use a client-side router,
 * in these cases, user `trackPages(false)` to disable tracking of the bounce rate and unique page views.
 *
 * By default, does not track the `location.hash` nor the `location.search`.
 *
 * @param options The options to use for the tracking
 *
 * @returns An object of the form `{ stop(): void }` to stop the tracking
 */
export function trackPages(options?: TrackPagesOptions): TrackPagesResult {
  const app = apps[0]
  if (!app) throw new Error("No intialized apps!")

  return app.trackPages(options)
}

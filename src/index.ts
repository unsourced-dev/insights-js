import * as parameters from "./parameters"
import { App, AppOptions, TrackEventPayload } from "./App"

export { parameters }

export const apps: App[] = []

/**
 * Initialize a default app for the given project with the given options.
 *
 * @param projectId The project for which to initialize the library
 * @param options The options
 */
export function init(projectId: string, options?: AppOptions): void {
  if (apps.length > 0) {
    throw new Error("Already initialized!")
  }
  apps.push(new App(projectId, options))
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

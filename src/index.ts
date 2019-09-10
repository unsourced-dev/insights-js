import * as parameters from "./parameters"
import { App, AppOptions, TrackedEvent } from "./App"

export { parameters }

export const apps: App[] = []

export function init(projectId: string, options?: AppOptions): void {
  if (apps.length > 0) {
    throw new Error("Already initialized!")
  }
  apps.push(new App(projectId, options))
}

export function track(event: TrackedEvent): void {
  const app = apps[0]
  if (!app) throw new Error("No intialized apps!")

  app.track(event)
}

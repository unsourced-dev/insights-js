# Insights-js

This repository contains the official javascript wrapper for https://getinsights.io.

This library allows you to track events in the browser and see them aggregated in our admin interface.

## Getting Started

### With npm or yarn:

You can just install from npm or yarn, typescript definitions are included in the base package:

```sh
npm install insights-js
```

Then import as a `commonjs` module:

```js
const { init, track, parameters } = require("insights-js")
```

Or as an `es6` module:

```ts
import { init, track, parameters } from "insights-js"
```

And track something:

```js
// Initialize for your project, you can find this on your dashboard
init("XkJsfa5KasGf9W_8")

// ...

// track something
track({
  id: "user-subscribed",
  parameters: {
    plan: "Startup"
  }
})
```

### With the umd build

```html
<script src="https://unpkg.com/insights-js"></script>

<script>
  // Initialize for your project,
  // you can find this on your dashboard
  init("XkJsfa5KasGf9W_8")

  // ...

  // track something
  track({
    id: "user-subscribed",
    parameters: {
      plan: "Startup"
    }
  })
</script>
```

## Guides

### Tracking simple events

Just call `track()`

```js
track({
  id: "user-registered",
  parameters: {
    method: "google",
    from: "top-link"
  }
})
```

Here is the result in the dashboard:
![Event User Registered in dashboard](./images/user-registered.png)

### Custom parameters

`insights-js` ships with multiple built-in parameters, to track values that are often useful, use as follow:

```js
import { parameters } from "insights-js"

track({
  id: "read-post",
  parameters: {
    // this will track the locale of the user, useful to know if we should translate our posts
    locale: parameters.locale(),
    // this will track the type of screen on which the user reads the post, useful for useability
    screenSize: parameters.screenType()
  }
})
```

Result in the dashboard:
![Event read post](./images/read-post.png)

See the full list [in the parameters'API documentation](#parameters).

### Untracking events

Certain events last through time and may be undone or cancelled after they have been logged.
For example, when tracking subscription to services or people.

For these events, it is very useful to be able to know:

- When an event is tracked
- When an event is marked as cancelled
- The current number of active (`tracked - cancelled`) events

When this flag is set to `true`, the given event is marked as cancelled.

e.g:

```js
// A user just subscribed!
track({
  id: "user-subscribed",
  parameters: {
    plan: "Startup"
  }
})

// A user unsbubscribed.
track({
  id: "user-subscribed",
  parameters: {
    plan: "Startup"
  },
  remove: true
})
```

Here is the result in the dashboard:
![Event User Subscribed in dashboard](./images/user-subscribed.png)

### Tracking page views

`insights-js` provides an automatic way of collecting page views, just call the `trackPages()` function:

```ts
trackPages()
```

This function tracks the current page then listen for URL changes and track any subsequent page views.
You may configure its behaviour by passing an options object.

**Important note on bounce rate and unique views:**

This method does not store any cookie or local storage, it expects that you use a client-side router.
e.g. `react-router`, `nextjs`'s router, etc...
The bounce rate and unique views will not be accurate if you do not use a client-side router,
in these cases, user `trackPages(false)` to disable tracking of the bounce rate and unique page views.

By default, does not track the `location.hash` nor the `location.search`.

Here is the result in the dashboard:
![Event User Subscribed in dashboard](./images/page-views.png)

### Tracking on multiple projects

The calls to `init()` and `track()` are wrappers are methods on the `App` class.
You may instantiate any use one app per project - with or without the default App:

```js
import { App } from "insights-js"

// equivalent to init("project-1-id")
const app1 = new App("project-1-id")
const app2 = new App("project-2-id")

// will show up in project 1's dashboard
app1.track({
  id: "user-registered",
  parameters: {
    method: "google",
    from: "top-link"
  }
})

// will show up in project 2's dashboard
app2.track({
  id: "read-post",
  parameters: {
    // this will track the locale of the user, useful to know if we should translate our posts
    locale: parameters.locale(),
    // this will track the type of screen on which the user reads the post, useful for useability
    screenSize: parameters.screenType()
  }
})
```

## API

See the detailed API documentation [in the docs folder](./docs/README.md).

### `init(projectId, options)`

```ts
init(projectId: string, options?: InitOptions): void
```

#### arguments

`projectId: string`
_Mandatory_
The projectId to track this event with, you can find this in the page of your project

`options?: AppOptions`
_Optional_
_Default value:_ `{}`

`options.ignoreErrors: boolean`
_Optional_
_Default value:_ `false`
When set to `true` any error that may occur when tracking events will be ignored. It is reccomended to set this flag to `true` on production.

`options.disabled: boolean`
_Optional_
_Default value:_ `false`
When set to `true`, all calls are disabled.
This flag is useful to disable the tracking based on the environment or URL.

### `track(event)`

```ts
track(event: Event): Promise<void>
```

**arguments**

`event: Event`
_Mandatory_
The event to track

`event.id: string`
_Mandatory_
The id of the event to track, should be a human readable id in `kebab-case`.

`event.parameters: { [key: string]: string }`
_Optional_
_Default value:_ `{}`
A map of `(key: string) -> (value: string)` pairs.
Getinsights keeps track of the number of events logged for each value.
You may also use the `parameters` variable to generate built-in values.
See the full list [in the parameters'API documentation](#parameters).

`event.unique: boolean`
_Optional_
_Default value:_ `false`
When true, check if a similar event (i.e. same id & same parameters), has already been logged **with the unique flag** in this session.
If a similar event has already been logged, it skips it.

`event.update: boolean`
_Optional_
_Default value:_ `false`
When true, only update the counts of the parameters, not the count of the event.

`event.remove: boolean`
_Optional_
_Default value:_ `false`
Certain events last through time and may be undone or cancelled after they have been logged.
For example, when tracking subscription to services or people.

For these events, it is very useful to be able to know:

- when an event is tracked
- when an event is marked as cancelled
- the current number of active (`tracked - cancelled`) events.

When this flag is set to `true`, the given event is marked as cancelled.

**Examples:**

```js
import { track, parameters } from "insights-js"

// user signed up with their email/password
track({
  id: "user-signed-up",
  parameters: {
    provider: "email"
  }
})

// user signed up with facebook
track({
  id: "user-signed-up",
  parameters: {
    provider: "facebook"
  }
})

// a product was sold
track({
  id: "product-sale",
  parameters: {
    product: product.name,
    currency: customer.currency
  }
})

// a page was opened
track({
  id: "open-page",
  parameters: {
    path: parameters.path(),
    screenType: parameters.screenType(),
    referrer: parameters.referrer()
  }
})
```

### `trackPage(options)`

```ts
trackPage(options?: TrackPageOptions): TrackPageResult
```

**arguments**

`options: TrackPagesOptions`
_Optional_
_Default value:_ `{}`
The options to configure the behaviour of the tracking, namely:

- wether or not to track the hash portion of the URL (defaults to `false`)
- wether or not to track the search portion of the URL (defaults to `false`)
- wether or not to track unique page views as well (defaults to `true`)

`options.hash: boolean`
_Optional_
_Default value:_ `false`
`true` to also track the hash portion of the URL.

`options.search: boolean`
_Optional_
_Default value:_ `false`
`true` to also track the hash portion of the URL.

A unique page view being defined as the first page tracked in the current session (subsequent pages tracked are not unique).

**returns**

An object of the form `{ stop(): void }` to cancel page tracking if needed.

### Parameters

#### `parameters.locale()`

Gets the `locale` of the current user, for example: `en-US`, `pt-BR` or `fr-FR`.

#### `parameters.screenType()`

Gets the type of screen the user is currently on, possible return values:

- `"XS"` if `screen width <= 414px`: Mobile phone
- `"S"` if `screen width <= 800px`: Tablet
- `"M"` if `screen width <= 1200px`: Small laptop
- `"L"` if `screen width <= 1600px`: Large laptop / small desktop
- `"XL"` if `screen width > 1600px`: Large desktop

#### `parameters.referrer()`

Gets the referrer of the user.

For example `"https://google.com"` if the user came from Google.

#### `parameters.path(hash, search)`

```ts
parameters.path(hash?: boolean, search?: boolean)
```

Gets the current path (segment of the URL after the domain) of the user.

`hash?: boolean`
_Optional_
_Default value:_ `false`
When `true`, also returns the hash segment of the URL.

`search?: boolean`
_Optional_
_Default value:_ `false`
When `true`, also returns the search segment of the URL.

#### `parameters.transition(previous, next)`

```ts
parameters.transition(previous: string, next: string)
```

Gets a parameter value that represents a transition between 2 states.

`previous: string`
_Mandatory_
The previous state.

`next: string`
_Mandatory_
The next state.

#### `parameters.durationInterval(durationMs)`

```ts
parameters.durationInterval(durationMs: number)
```

Categorizes a given duration in possible intervals and return the interval:

- `"< 5s"` for durations less than 5 seconds
- `"< 15s"` for durations less than 15 seconds
- `"< 30s"` for durations less than 30 seconds
- `"< 1m"` for durations less than 1 minute
- `"< 5m"` for durations less than 5 minutes
- `"> 5m"` for durations of 5 minutes or more

`durationMs: number`
_Mandatory_
The duration, in milliseconds.

## License

MIT

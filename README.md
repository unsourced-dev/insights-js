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
  id: "user-subscribed",
  parameters: {
    plan: "Startup"
  }
})
```

Here is the result in the dashboard:
![Event User Subscribed in dashboard](./images/user-subscribed.png)

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

See the full list [in the API documentation](#parameters).

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

## API

### init(projectId, options)

```ts
init(projectId: string, options?: InitOptions): void
```

#### arguments

`projectId: string`
_Mandatory_
The projectId to track this event with, you can find this in the page of your project

`options?: AppOptions`
_Optional_

| Option       |  Default Value | Description                                                                                                                                   |
| ------------ | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| ignoreErrors | `false`        | When set to `true` any error that may occur when tracking events will be ignored. It is reccomended to set this flag to `true` on production. |

### track(event)

#### arguments

`event: Event`
_Mandatory_

| Event attribute |  Default Value | Description                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id              |                | The id of the event to track, should be a human readable id in `kebab-case`                                                                                                                                                                                                                                                                                                                                               |
| parameters      | `{}`           | A map of `key -> value` pairs. Getinsights keeps track of the number of events logged for each value.                                                                                                                                                                                                                                                                                                                     |
| unique          | `false`        | When true, check if a similar event (i.e. same id & same parameters), has already been logged **with the unique flag** in this session. If a similar event has already been logged, it skips it.                                                                                                                                                                                                                          |
| remove          | `false`        | Certain events last through time and may be undone or cancelled after they have been logged. For example, when tracking subscription to services or people. For these events, it is very useful to be able to know: when an event is tracked, when an event is marked as cancelled, the current number of active (`tracked - cancelled`) events. When this flag is set to `true`, the given event is marked as cancelled. |

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

### Parameters

#### parameters.locale()

Tracks the `locale` of the current user, for example: `en-US`, `pt-BR` or `fr-FR`

#### parameters.screenType()

Tracks the type of screen the user is currently on:

| Screen    | Value | Description   |
| --------- | ----- | ------------- |
| `<= 414`  | `xs`  | Mobile phone  |
| `<= 800`  | `s`   | Tablet        |
| `<= 1200` | `m`   | Small laptop  |
| `<= 1600` | `l`   | Small desktop |
| `> 1600`  | `xl`  | Large desktop |

#### parameters.referrer()

Tracks the referrer of the user.

#### parameters.path()

Tracks the current path (segment of the URL after the domain) of the user.

## License

MIT

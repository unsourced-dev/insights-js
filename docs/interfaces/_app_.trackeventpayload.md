**[insights-js](../README.md)**

> [Globals](../globals.md) / ["App"](../modules/_app_.md) / TrackEventPayload

# Interface: TrackEventPayload

The payload to call

## Hierarchy

* **TrackEventPayload**

## Index

### Properties

* [id](_app_.trackeventpayload.md#id)
* [parameters](_app_.trackeventpayload.md#parameters)
* [remove](_app_.trackeventpayload.md#remove)
* [unique](_app_.trackeventpayload.md#unique)
* [update](_app_.trackeventpayload.md#update)

## Properties

### id

•  **id**: string

A unique identifier for this event.
This should be formatted as `pascal-case`.

[insights.io](https://insights.io)'s web interface properly format these parameter names.

___

### parameters

• `Optional` **parameters**: StringMap<string \| [ParameterValue](_app_.parametervalue.md)\>

The parameters to log along this event.
Each key in the map is the parameter name, and the value it's value.

[insights.io](https://insights.io) will aggregate the counts for each value and display them under each event.

e.g.
```js
import { track, parameters } from "insights-js"

// user signed up with their email/password
track({
  id: "user-signed-up",
  parameters: {
    provider: "email",
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
    currency: customer.currency,
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

___

### remove

• `Optional` **remove**: undefined \| false \| true

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
    plan: "Premium"
  }
})

// A user unsbubscribed.
track({
  id: "user-subscribed",
  parameters: {
    plan: "Premium",
  },
  remove: true
})
```

When used in combination with `update`, only remove from the counts of the parameters.
Useful to "cancel" a parameter value.

___

### unique

• `Optional` **unique**: undefined \| false \| true

When true, check if a similar event (i.e. same id & same parameters),
has already been logged **with the unique flag** in this session.

If a similar event has already been logged, it skips it.

___

### update

• `Optional` **update**: undefined \| false \| true

When `true`, the count of an event is not updated, only parameter counts.
This can be used to modify the value of parameters.

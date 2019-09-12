**[insights-js](../README.md)**

[Globals](../globals.md) › [&quot;App&quot;](../modules/_app_.md) › [TrackEventPayload](_app_.trackeventpayload.md)

# Interface: TrackEventPayload

The payload to call

## Hierarchy

* **TrackEventPayload**

## Index

### Properties

* [id](_app_.trackeventpayload.md#id)
* [parameters](_app_.trackeventpayload.md#optional-parameters)
* [remove](_app_.trackeventpayload.md#optional-remove)
* [unique](_app_.trackeventpayload.md#optional-unique)

## Properties

###  id

• **id**: *string*

*Defined in [App.ts:63](https://github.com/getinsights/insights-js/blob/61408e0/src/App.ts#L63)*

A unique identifier for this event.
This should be formatted as `pascal-case`.

[insights.io](https://insights.io)'s web interface properly format these parameter names.

___

### `Optional` parameters

• **parameters**? : *[StringMap](_app_.stringmap.md)‹string | [ParameterValue](_app_.parametervalue.md)›*

*Defined in [App.ts:111](https://github.com/getinsights/insights-js/blob/61408e0/src/App.ts#L111)*

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

### `Optional` remove

• **remove**? : *undefined | false | true*

*Defined in [App.ts:152](https://github.com/getinsights/insights-js/blob/61408e0/src/App.ts#L152)*

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

___

### `Optional` unique

• **unique**? : *undefined | false | true*

*Defined in [App.ts:118](https://github.com/getinsights/insights-js/blob/61408e0/src/App.ts#L118)*

When true, check if a similar event (i.e. same id & same parameters),
has already been logged **with the unique flag** in this session.

If a similar event has already been logged, it skips it.
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

*Defined in [App.ts:44](https://github.com/getinsights/insights-js/blob/fcce543/src/App.ts#L44)*

A unique identifier for this event.
This should be formatted as `pascal-case`.

___

### `Optional` parameters

• **parameters**? : *[StringMap](_app_.stringmap.md)‹string | [ParameterValue](_app_.parametervalue.md)›*

*Defined in [App.ts:57](https://github.com/getinsights/insights-js/blob/fcce543/src/App.ts#L57)*

The parameters to log along this event.
Each key in the map is the parameter name, and the value it's value.

e.g.
```js
track({
  id: "user-subscribed",
})
```

___

### `Optional` remove

• **remove**? : *undefined | false | true*

*Defined in [App.ts:90](https://github.com/getinsights/insights-js/blob/fcce543/src/App.ts#L90)*

When tracking values that can be undone, this

e.g.
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
    plan: "Premium"
  },
  remove: true
})
```

___

### `Optional` unique

• **unique**? : *undefined | false | true*

*Defined in [App.ts:64](https://github.com/getinsights/insights-js/blob/fcce543/src/App.ts#L64)*

When true, check if a similar event (i.e. same id & same parameters),
has already been logged **with the unique flag** in this session.

If a similar event has already been logged, it skips it.
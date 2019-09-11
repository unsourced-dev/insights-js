**[insights-js](../README.md)**

[Globals](../globals.md) › [&quot;index&quot;](_index_.md)

# External module: "index"

## Index

### Variables

* [apps](_index_.md#const-apps)

### Functions

* [init](_index_.md#init)
* [track](_index_.md#track)

## Variables

### `Const` apps

• **apps**: *[App](../classes/_app_.app.md)[]* =  []

*Defined in [index.ts:6](https://github.com/getinsights/insights-js/blob/fcce543/src/index.ts#L6)*

## Functions

###  init

▸ **init**(`projectId`: string, `options?`: [AppOptions](../interfaces/_app_.appoptions.md)): *void*

*Defined in [index.ts:14](https://github.com/getinsights/insights-js/blob/fcce543/src/index.ts#L14)*

Initialize a default app for the given project with the given options.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`projectId` | string | The project for which to initialize the library |
`options?` | [AppOptions](../interfaces/_app_.appoptions.md) | The options  |

**Returns:** *void*

___

###  track

▸ **track**(`event`: [TrackEventPayload](../interfaces/_app_.trackeventpayload.md)): *void*

*Defined in [index.ts:26](https://github.com/getinsights/insights-js/blob/fcce543/src/index.ts#L26)*

Tracks an event using the default app, you must call `init()` before calling this.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | [TrackEventPayload](../interfaces/_app_.trackeventpayload.md) | The event to track  |

**Returns:** *void*
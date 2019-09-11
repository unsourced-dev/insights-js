**[insights-js](../README.md)**

[Globals](../globals.md) › [&quot;App&quot;](../modules/_app_.md) › [App](_app_.app.md)

# Class: App

A class that contains a `projectId` and related configuration to track events painlessly.

## Hierarchy

* **App**

## Index

### Constructors

* [constructor](_app_.app.md#constructor)

### Properties

* [options](_app_.app.md#options)
* [projectId](_app_.app.md#projectid)
* [uniques](_app_.app.md#private-uniques)

### Methods

* [track](_app_.app.md#track)

## Constructors

###  constructor

\+ **new App**(`projectId`: string, `options`: [AppOptions](../interfaces/_app_.appoptions.md)): *[App](_app_.app.md)*

*Defined in [App.ts:97](https://github.com/getinsights/insights-js/blob/fcce543/src/App.ts#L97)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`projectId` | string | - |
`options` | [AppOptions](../interfaces/_app_.appoptions.md) |  defaultOptions |

**Returns:** *[App](_app_.app.md)*

## Properties

###  options

• **options**: *[AppOptions](../interfaces/_app_.appoptions.md)*

*Defined in [App.ts:99](https://github.com/getinsights/insights-js/blob/fcce543/src/App.ts#L99)*

___

###  projectId

• **projectId**: *string*

*Defined in [App.ts:99](https://github.com/getinsights/insights-js/blob/fcce543/src/App.ts#L99)*

___

### `Private` uniques

• **uniques**: *[StringMap](../interfaces/_app_.stringmap.md)‹boolean›*

*Defined in [App.ts:97](https://github.com/getinsights/insights-js/blob/fcce543/src/App.ts#L97)*

## Methods

###  track

▸ **track**(`event`: [TrackEventPayload](../interfaces/_app_.trackeventpayload.md)): *Promise‹void›*

*Defined in [App.ts:108](https://github.com/getinsights/insights-js/blob/fcce543/src/App.ts#L108)*

Track an occurence of the given event.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | [TrackEventPayload](../interfaces/_app_.trackeventpayload.md) | The event to track.  |

**Returns:** *Promise‹void›*

a promise that resolves when the call to the API resolves.
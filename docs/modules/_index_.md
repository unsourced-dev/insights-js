[insights-js](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Variables

* [DEFAULT_APP](_index_.md#let-default_app)

### Functions

* [init](_index_.md#init)
* [track](_index_.md#track)
* [trackPages](_index_.md#trackpages)

## Variables

### `Let` DEFAULT_APP

• **DEFAULT_APP**: *[App](../classes/_app_.app.md) | null* = null

The default application, or `null` if none.

## Functions

###  init

▸ **init**(`projectId`: string, `options?`: [AppOptions](../interfaces/_app_.appoptions.md)): *[App](../classes/_app_.app.md)*

Initialize a default app for the given project with the given options.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`projectId` | string | The project for which to initialize the library |
`options?` | [AppOptions](../interfaces/_app_.appoptions.md) | The options to use  |

**Returns:** *[App](../classes/_app_.app.md)*

The default app

___

###  track

▸ **track**(`event`: [TrackEventPayload](../interfaces/_app_.trackeventpayload.md)): *void*

Tracks an event using the default app, you must call `init()` before calling this.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | [TrackEventPayload](../interfaces/_app_.trackeventpayload.md) | The event to track  |

**Returns:** *void*

___

###  trackPages

▸ **trackPages**(`options?`: [TrackPagesOptions](../interfaces/_app_.trackpagesoptions.md)): *[TrackPagesResult](../interfaces/_app_.trackpagesresult.md)*

Tracks page views using the default app.
This method checks if the URL changed every so often and tracks new pages accordingly.

By default, does not track the `location.hash` nor the `location.search`.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options?` | [TrackPagesOptions](../interfaces/_app_.trackpagesoptions.md) | The options to use for the tracking  |

**Returns:** *[TrackPagesResult](../interfaces/_app_.trackpagesresult.md)*

An object of the form `{ stop(): void }` to stop the tracking

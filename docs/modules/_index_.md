**[insights-js](../README.md)**

[Globals](../globals.md) › [&quot;index&quot;](_index_.md)

# External module: "index"

## Index

### Variables

* [apps](_index_.md#const-apps)

### Functions

* [init](_index_.md#init)
* [track](_index_.md#track)
* [trackPages](_index_.md#trackpages)

## Variables

### `Const` apps

• **apps**: *[App](../classes/_app_.app.md)[]* =  []

*Defined in [index.ts:8](https://github.com/getinsights/insights-js/blob/f3c18cb/src/index.ts#L8)*

## Functions

###  init

▸ **init**(`projectId`: string, `options?`: [AppOptions](../interfaces/_app_.appoptions.md)): *[App](../classes/_app_.app.md)*

*Defined in [index.ts:18](https://github.com/getinsights/insights-js/blob/f3c18cb/src/index.ts#L18)*

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

*Defined in [index.ts:32](https://github.com/getinsights/insights-js/blob/f3c18cb/src/index.ts#L32)*

Tracks an event using the default app, you must call `init()` before calling this.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | [TrackEventPayload](../interfaces/_app_.trackeventpayload.md) | The event to track  |

**Returns:** *void*

___

###  trackPages

▸ **trackPages**(`options?`: [TrackPagesOptions](../interfaces/_app_.trackpagesoptions.md)): *[TrackPagesResult](../interfaces/_app_.trackpagesresult.md)*

*Defined in [index.ts:56](https://github.com/getinsights/insights-js/blob/f3c18cb/src/index.ts#L56)*

Tracks page views using the default app.
This method checks if the URL changed every so often and tracks new pages accordingly.

**Important note on bounce rate and unique views:**

This method does not store any cookie or local storage, it expects that you use a client-side router.
e.g. `react-router`, `nextjs`'s router, etc...
The bounce rate and unique views will not be accurate if you do not use a client-side router,
in these cases, user `trackPages(false)` to disable tracking of the bounce rate and unique page views.

By default, does not track the `location.hash` nor the `location.search`.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options?` | [TrackPagesOptions](../interfaces/_app_.trackpagesoptions.md) | The options to use for the tracking  |

**Returns:** *[TrackPagesResult](../interfaces/_app_.trackpagesresult.md)*

An object of the form `{ stop(): void }` to stop the tracking
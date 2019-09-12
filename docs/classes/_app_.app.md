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
* [trackPageData](_app_.app.md#private-trackpagedata)
* [uniques](_app_.app.md#private-uniques)

### Methods

* [track](_app_.app.md#track)
* [trackPageChange](_app_.app.md#private-trackpagechange)
* [trackPages](_app_.app.md#trackpages)
* [trackSinglePage](_app_.app.md#private-tracksinglepage)

## Constructors

###  constructor

\+ **new App**(`projectId`: string, `options`: [AppOptions](../interfaces/_app_.appoptions.md)): *[App](_app_.app.md)*

*Defined in [App.ts:204](https://github.com/getinsights/insights-js/blob/f3c18cb/src/App.ts#L204)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`projectId` | string | - |
`options` | [AppOptions](../interfaces/_app_.appoptions.md) |  defaultOptions |

**Returns:** *[App](_app_.app.md)*

## Properties

###  options

• **options**: *[AppOptions](../interfaces/_app_.appoptions.md)*

*Defined in [App.ts:206](https://github.com/getinsights/insights-js/blob/f3c18cb/src/App.ts#L206)*

___

###  projectId

• **projectId**: *string*

*Defined in [App.ts:206](https://github.com/getinsights/insights-js/blob/f3c18cb/src/App.ts#L206)*

___

### `Private` trackPageData

• **trackPageData**: *TrackPageData | null* =  null

*Defined in [App.ts:204](https://github.com/getinsights/insights-js/blob/f3c18cb/src/App.ts#L204)*

___

### `Private` uniques

• **uniques**: *[StringMap](../interfaces/_app_.stringmap.md)‹boolean›*

*Defined in [App.ts:201](https://github.com/getinsights/insights-js/blob/f3c18cb/src/App.ts#L201)*

## Methods

###  track

▸ **track**(`event`: [TrackEventPayload](../interfaces/_app_.trackeventpayload.md)): *Promise‹void›*

*Defined in [App.ts:217](https://github.com/getinsights/insights-js/blob/f3c18cb/src/App.ts#L217)*

Track an occurence of the given event.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | [TrackEventPayload](../interfaces/_app_.trackeventpayload.md) | The event to track.  |

**Returns:** *Promise‹void›*

a promise that resolves when the call to the API resolves.

___

### `Private` trackPageChange

▸ **trackPageChange**(): *void*

*Defined in [App.ts:289](https://github.com/getinsights/insights-js/blob/f3c18cb/src/App.ts#L289)*

**Returns:** *void*

___

###  trackPages

▸ **trackPages**(`options?`: [TrackPagesOptions](../interfaces/_app_.trackpagesoptions.md)): *[TrackPagesResult](../interfaces/_app_.trackpagesresult.md)*

*Defined in [App.ts:257](https://github.com/getinsights/insights-js/blob/f3c18cb/src/App.ts#L257)*

Tracks page views. This method checks if the URL changed every so often and tracks new pages accordingly.

**Important note on bounce rate and unique views:**

This method does not store any cookie or local storage, it expects that you use a client-side router.
e.g. `react-router`, `nextjs`'s router, etc...
The bounce rate and unique views will not be accurate if you do not use a client-side router,
in these cases, user `trackPages(false)` to disable tracking of the bounce rate and unique page views.

By default, does not track the `location.hash` nor the `location.search`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options?` | [TrackPagesOptions](../interfaces/_app_.trackpagesoptions.md) | The options to use for the tracking  |

**Returns:** *[TrackPagesResult](../interfaces/_app_.trackpagesresult.md)*

An object of the form `{ stop(): void }` to stop the tracking

___

### `Private` trackSinglePage

▸ **trackSinglePage**(): *void*

*Defined in [App.ts:302](https://github.com/getinsights/insights-js/blob/f3c18cb/src/App.ts#L302)*

**Returns:** *void*
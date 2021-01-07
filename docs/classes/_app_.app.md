**[insights-js](../README.md)**

> [Globals](../globals.md) / ["App"](../modules/_app_.md) / App

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
* [trackPageData](_app_.app.md#trackpagedata)
* [uniques](_app_.app.md#uniques)

### Methods

* [getPreviousPage](_app_.app.md#getpreviouspage)
* [track](_app_.app.md#track)
* [trackLastPageTimeSpent](_app_.app.md#tracklastpagetimespent)
* [trackPageChange](_app_.app.md#trackpagechange)
* [trackPages](_app_.app.md#trackpages)
* [trackSinglePage](_app_.app.md#tracksinglepage)

## Constructors

### constructor

\+ **new App**(`projectId`: string, `options?`: [AppOptions](../interfaces/_app_.appoptions.md)): [App](_app_.app.md)

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`projectId` | string | - |
`options` | [AppOptions](../interfaces/_app_.appoptions.md) | defaultOptions |

**Returns:** [App](_app_.app.md)

## Properties

### options

•  **options**: [AppOptions](../interfaces/_app_.appoptions.md)

___

### projectId

•  **projectId**: string

___

### trackPageData

• `Private` **trackPageData**: TrackPageData \| null = null

___

### uniques

• `Private` **uniques**: StringMap<boolean\>

## Methods

### getPreviousPage

▸ `Private`**getPreviousPage**(`first`: boolean): string

#### Parameters:

Name | Type |
------ | ------ |
`first` | boolean |

**Returns:** string

___

### track

▸ **track**(`event`: [TrackEventPayload](../interfaces/_app_.trackeventpayload.md)): undefined \| Promise<void\>

Track an occurence of the given event.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`event` | [TrackEventPayload](../interfaces/_app_.trackeventpayload.md) | The event to track.  |

**Returns:** undefined \| Promise<void\>

___

### trackLastPageTimeSpent

▸ `Private`**trackLastPageTimeSpent**(): void

**Returns:** void

___

### trackPageChange

▸ `Private`**trackPageChange**(): void

**Returns:** void

___

### trackPages

▸ **trackPages**(`options?`: [TrackPagesOptions](../interfaces/_app_.trackpagesoptions.md)): [TrackPagesResult](../interfaces/_app_.trackpagesresult.md)

Tracks page views. This method checks if the URL changed every so often and tracks new pages accordingly.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`options?` | [TrackPagesOptions](../interfaces/_app_.trackpagesoptions.md) | The options to use for the tracking  |

**Returns:** [TrackPagesResult](../interfaces/_app_.trackpagesresult.md)

An object of the form `{ stop(): void }` to stop the tracking

___

### trackSinglePage

▸ `Private`**trackSinglePage**(`first`: boolean, `path`: string): void

#### Parameters:

Name | Type |
------ | ------ |
`first` | boolean |
`path` | string |

**Returns:** void

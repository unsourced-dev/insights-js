**[insights-js](../README.md)**

[Globals](../globals.md) › [&quot;App&quot;](../modules/_app_.md) › [TrackPagesOptions](_app_.trackpagesoptions.md)

# Interface: TrackPagesOptions

The options to use when tracking pages

## Hierarchy

* **TrackPagesOptions**

## Index

### Properties

* [hash](_app_.trackpagesoptions.md#optional-hash)
* [search](_app_.trackpagesoptions.md#optional-search)
* [unique](_app_.trackpagesoptions.md#optional-unique)

## Properties

### `Optional` hash

• **hash**? : *undefined | false | true*

*Defined in [App.ts:169](https://github.com/getinsights/insights-js/blob/d0bb780/src/App.ts#L169)*

`true` to track the hash portion of the URL.

`false` by default.

___

### `Optional` search

• **search**? : *undefined | false | true*

*Defined in [App.ts:175](https://github.com/getinsights/insights-js/blob/d0bb780/src/App.ts#L175)*

`true` to track the search portion of the URL.

`false` by default.

___

### `Optional` unique

• **unique**? : *undefined | false | true*

*Defined in [App.ts:163](https://github.com/getinsights/insights-js/blob/d0bb780/src/App.ts#L163)*

When `true`, tracks unique page views and the bounce rate in addition to total page views.

`true` by default.
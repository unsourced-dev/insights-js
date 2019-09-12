**[insights-js](../README.md)**

[Globals](../globals.md) › [&quot;App&quot;](../modules/_app_.md) › [AppOptions](_app_.appoptions.md)

# Interface: AppOptions

Additional options used when tracking events

## Hierarchy

* **AppOptions**

## Index

### Properties

* [disabled](_app_.appoptions.md#optional-disabled)
* [ignoreErrors](_app_.appoptions.md#optional-ignoreerrors)

## Properties

### `Optional` disabled

• **disabled**? : *undefined | false | true*

*Defined in [App.ts:18](https://github.com/getinsights/insights-js/blob/d0bb780/src/App.ts#L18)*

When `true`, all calls are disabled.
This flag is useful to disable the tracking based on the environment/URL.

___

### `Optional` ignoreErrors

• **ignoreErrors**? : *undefined | false | true*

*Defined in [App.ts:12](https://github.com/getinsights/insights-js/blob/d0bb780/src/App.ts#L12)*

When true, the call to `track(event)` will never throw nor log any error.
This flag should be set to `true` for production systems.
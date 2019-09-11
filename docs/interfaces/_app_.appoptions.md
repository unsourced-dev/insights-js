**[insights-js](../README.md)**

[Globals](../globals.md) › [&quot;App&quot;](../modules/_app_.md) › [AppOptions](_app_.appoptions.md)

# Interface: AppOptions

Additional options used when tracking events

## Hierarchy

* **AppOptions**

## Index

### Properties

* [ignoreErrors](_app_.appoptions.md#optional-ignoreerrors)

## Properties

### `Optional` ignoreErrors

• **ignoreErrors**? : *undefined | false | true*

*Defined in [App.ts:11](https://github.com/getinsights/insights-js/blob/fcce543/src/App.ts#L11)*

When true, the call to `track(event)` will never throw nor log any error.
This flag should be set to `true` for production systems.
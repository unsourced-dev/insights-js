**[insights-js](../README.md)**

> [Globals](../globals.md) / ["App"](../modules/_app_.md) / AppOptions

# Interface: AppOptions

Additional options used when tracking events

## Hierarchy

* **AppOptions**

## Index

### Properties

* [disabled](_app_.appoptions.md#disabled)
* [ignoreErrors](_app_.appoptions.md#ignoreerrors)

## Properties

### disabled

• `Optional` **disabled**: undefined \| false \| true

When `true`, all calls are disabled.
This flag is useful to disable the tracking based on the environment/URL.

___

### ignoreErrors

• `Optional` **ignoreErrors**: undefined \| false \| true

When true, the call to `track(event)` will never throw nor log any error.
This flag should be set to `true` for production systems.

**`deprecated`** No longer used by the server.

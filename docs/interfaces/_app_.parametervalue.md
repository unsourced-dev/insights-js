**[insights-js](../README.md)**

[Globals](../globals.md) › [&quot;App&quot;](../modules/_app_.md) › [ParameterValue](_app_.parametervalue.md)

# Interface: ParameterValue

A parameter's value to log.

## Hierarchy

* **ParameterValue**

## Index

### Properties

* [type](_app_.parametervalue.md#optional-type)
* [value](_app_.parametervalue.md#value)

## Properties

### `Optional` type

• **type**? : *undefined | string*

*Defined in [App.ts:46](https://github.com/getinsights/insights-js/blob/f3c18cb/src/App.ts#L46)*

A possible type for this value.
This will be used by [insights.io](https://insights.io)'s web interface to display certain parameters in specific ways.

You should not set the value manually, instead, use provided parameters functions in `parameters`.

___

###  value

• **value**: *string*

*Defined in [App.ts:50](https://github.com/getinsights/insights-js/blob/f3c18cb/src/App.ts#L50)*

The actual value.
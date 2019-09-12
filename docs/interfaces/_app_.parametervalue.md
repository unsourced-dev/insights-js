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

*Defined in [App.ts:45](https://github.com/getinsights/insights-js/blob/d0bb780/src/App.ts#L45)*

A possible type for this value.
This will be used by [insights.io](https://insights.io)'s web interface to display certain parameters in specific ways.

You should not set the value manually, instead, use provided parameters functions in `parameters`.

___

###  value

• **value**: *string*

*Defined in [App.ts:49](https://github.com/getinsights/insights-js/blob/d0bb780/src/App.ts#L49)*

The actual value.
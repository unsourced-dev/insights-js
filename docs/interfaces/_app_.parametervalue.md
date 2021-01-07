**[insights-js](../README.md)**

> [Globals](../globals.md) / ["App"](../modules/_app_.md) / ParameterValue

# Interface: ParameterValue

A parameter's value to log.

## Hierarchy

* **ParameterValue**

## Index

### Properties

* [type](_app_.parametervalue.md#type)
* [value](_app_.parametervalue.md#value)

## Properties

### type

• `Optional` **type**: undefined \| string

A possible type for this value.
This will be used by [insights.io](https://insights.io)'s web interface to display certain parameters in specific ways.

You should not set the value manually, instead, use provided parameters functions in `parameters`.

___

### value

•  **value**: string

The actual value.

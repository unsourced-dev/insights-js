**[insights-js](../README.md)**

[Globals](../globals.md) › [&quot;parameters&quot;](_parameters_.md)

# External module: "parameters"

## Index

### Functions

* [locale](_parameters_.md#locale)
* [path](_parameters_.md#path)
* [referrer](_parameters_.md#referrer)
* [screenType](_parameters_.md#screentype)

## Functions

###  locale

▸ **locale**(): *object*

*Defined in [parameters.ts:9](https://github.com/getinsights/insights-js/blob/d0bb780/src/parameters.ts#L9)*

Logs the default locale of the current user.

**Returns:** *object*

___

###  path

▸ **path**(`hash`: boolean, `search`: boolean): *object*

*Defined in [parameters.ts:50](https://github.com/getinsights/insights-js/blob/d0bb780/src/parameters.ts#L50)*

Logs the current path within the application.
By default, does not log the `location.hash` nor the `location.search`

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`hash` | boolean | false | `true` to log the hash, `false` by default |
`search` | boolean | false | `true` to log the hash, `false` by default  |

**Returns:** *object*

___

###  referrer

▸ **referrer**(): *object*

*Defined in [parameters.ts:39](https://github.com/getinsights/insights-js/blob/d0bb780/src/parameters.ts#L39)*

Logs the referrer on the current page, or `<none>` if the page has no referrer.

**Returns:** *object*

___

###  screenType

▸ **screenType**(): *object*

*Defined in [parameters.ts:32](https://github.com/getinsights/insights-js/blob/d0bb780/src/parameters.ts#L32)*

Logs the screen type of the current user, based on window size:

- width <= 414: xs -> phone
- width <= 800: s -> tablet
- width <= 1200: m -> small laptop
- width <= 1600: l -> large laptop
- width > 1440: xl -> large desktop

**Returns:** *object*
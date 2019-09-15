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

Logs the default locale of the current user.

**Returns:** *object*

___

###  path

▸ **path**(`hash`: boolean, `search`: boolean): *object*

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

Logs the referrer on the current page, or `<none>` if the page has no referrer.

**Returns:** *object*

___

###  screenType

▸ **screenType**(): *object*

Logs the screen type of the current user, based on window size:

- width <= 414: XS -> phone
- width <= 800: S -> tablet
- width <= 1200: M -> small laptop
- width <= 1600: L -> large laptop
- width > 1440: XL -> large desktop

**Returns:** *object*
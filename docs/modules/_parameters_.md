[insights-js](../README.md) › [Globals](../globals.md) › ["parameters"](_parameters_.md)

# Module: "parameters"

## Index

### Functions

* [durationInterval](_parameters_.md#durationinterval)
* [locale](_parameters_.md#locale)
* [path](_parameters_.md#path)
* [referrer](_parameters_.md#referrer)
* [screenType](_parameters_.md#screentype)
* [transition](_parameters_.md#transition)

## Functions

###  durationInterval

▸ **durationInterval**(`durationMs`: number, `prefix`: string): *object*

Track a duration at several intervals:

- < 5 seconds
- < 15 seconds
- < 30 seconds
- < 1 minute
- < 5 minutes
- \> 5 minutes

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`durationMs` | number | - | the duration to encode, in milliseconds  |
`prefix` | string | "" | - |

**Returns:** *object*

* **type**: *string* = "duration-interval"

* **value**: *string* = prefix + "< 5s"

___

###  locale

▸ **locale**(): *object*

Track the default locale of the current user.

**Returns:** *object*

* **type**: *string* = "locale"

* **value**: *string* = "<not-in-browser>"

___

###  path

▸ **path**(`hash`: boolean, `search`: boolean): *object*

Track the current path within the application.
By default, does not log the `location.hash` nor the `location.search`

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`hash` | boolean | false | `true` to log the hash, `false` by default |
`search` | boolean | false | `true` to log the hash, `false` by default  |

**Returns:** *object*

* **type**: *string* = "path"

* **value**: *string* = "<not-in-browser>"

___

###  referrer

▸ **referrer**(): *object*

Track the referrer on the current page, or `<none>` if the page has no referrer.

**Returns:** *object*

* **type**: *string* = "referrer"

* **value**: *string* = "<not-in-browser>"

___

###  screenType

▸ **screenType**(): *object*

Track the screen type of the current user, based on window size:

- width <= 414: XS -> phone
- width <= 800: S -> tablet
- width <= 1200: M -> small laptop
- width <= 1600: L -> large laptop
- width > 1440: XL -> large desktop

**Returns:** *object*

* **type**: *string* = "screen-type"

* **value**: *string* = "<not-in-browser>"

___

###  transition

▸ **transition**(`previous`: string, `next`: string): *object*

Track a transition between two values.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`previous` | string | The previous value |
`next` | string | The next value  |

**Returns:** *object*

* **type**: *string* = "transition"

* **value**: *string* = previous + "  ->  " + next

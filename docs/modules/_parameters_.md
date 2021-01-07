**[insights-js](../README.md)**

> [Globals](../globals.md) / "parameters"

# Module: "parameters"

## Index

### Functions

* [browser](_parameters_.md#browser)
* [durationInterval](_parameters_.md#durationinterval)
* [locale](_parameters_.md#locale)
* [os](_parameters_.md#os)
* [path](_parameters_.md#path)
* [referrer](_parameters_.md#referrer)
* [screenType](_parameters_.md#screentype)
* [transition](_parameters_.md#transition)

## Functions

### browser

▸ **browser**(): object

Track the browser of the user, here are the most common values:

- Chrome
- Firefox
- Safari
- Mobile Chrome
- Mobile Firefox
- Mobile Safari

**Returns:** object

Name | Type |
------ | ------ |
`type` | string |

___

### durationInterval

▸ **durationInterval**(`durationMs`: number, `prefix?`: string): object

Track a duration at several intervals:

- < 5 seconds
- < 15 seconds
- < 30 seconds
- < 1 minute
- < 5 minutes
- \> 5 minutes

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`durationMs` | number | - | the duration to encode, in milliseconds  |
`prefix` | string | "" | - |

**Returns:** object

Name | Type |
------ | ------ |
`type` | string |
`value` | string |

___

### locale

▸ **locale**(): object

Track the default locale of the current user.

**Returns:** object

Name | Type |
------ | ------ |
`type` | string |
`value` | string |

___

### os

▸ **os**(): object

Track the operating system of the user, here are the most common values:

- Windows
- Mac OS X
- Android
- Linux
- iOS

**Returns:** object

Name | Type |
------ | ------ |
`type` | string |

___

### path

▸ **path**(`hash?`: boolean, `search?`: boolean): object

Track the current path within the application.
By default, does not log the `location.hash` nor the `location.search`

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`hash` | boolean | false | `true` to log the hash, `false` by default |
`search` | boolean | false | `true` to log the hash, `false` by default  |

**Returns:** object

Name | Type |
------ | ------ |
`type` | string |
`value` | string |

___

### referrer

▸ **referrer**(): object

Track the referrer on the current page, or `<none>` if the page has no referrer.

**Returns:** object

Name | Type |
------ | ------ |
`type` | string |
`value` | string |

___

### screenType

▸ **screenType**(): object

Track the screen type of the current user, based on window size:

- width <= 414: XS -> phone
- width <= 800: S -> tablet
- width <= 1200: M -> small laptop
- width <= 1600: L -> large laptop
- width > 1440: XL -> large desktop

**Returns:** object

Name | Type |
------ | ------ |
`type` | string |
`value` | string |

___

### transition

▸ **transition**(`previous`: string, `next`: string): object

Track a transition between two values.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`previous` | string | The previous value |
`next` | string | The next value  |

**Returns:** object

Name | Type |
------ | ------ |
`type` | string |
`value` | string |

// not supported by the server just yet!
// export function number(amount: number, value: string) {
//   return { type: "number", value, amount }
// }

/**
 * Logs the default locale of the current user.
 */
export function locale() {
  const value = typeof navigator.languages !== "undefined" ? navigator.languages[0] : navigator.language
  return { type: "locale", value: value || "<none>" }
}

function getScreenType() {
  const width = window.innerWidth
  if (width <= 320) return "xs"
  if (width <= 576) return "s"
  if (width <= 992) return "m"
  if (width <= 1440) return "l"
  return "xl"
}

/**
 * Logs the screen type of the current user, based on window size:
 *
 * - width <= 320: xs
 * - width <= 576: s
 * - width <= 992: m
 * - width <= 1440: l
 * - width > 1440: xl
 */
export function screenType() {
  return { type: "screen-type", value: getScreenType() }
}

/**
 * Logs the referrer on the current page, or `<none>` if the page has no referrer.
 */
export function referrer() {
  return { type: "referrer", value: document.referrer || "<none>" }
}

/**
 * Logs the current path within the application.
 * By default, does not log the `locaiton.hash` nor the `location.search`
 *
 * @param hash `true` to log the hash, `false` by default
 * @param search `true` to log the hash, `false` by default
 */
export function path(hash: boolean = false, search: boolean = false) {
  let value = window.location.pathname
  if (hash) value += window.location.hash
  if (search && !hash) value += window.location.search

  return { type: "path", value }
}

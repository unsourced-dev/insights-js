import { isInBrowser } from "./utils"

/**
 * Logs the default locale of the current user.
 */
export function locale() {
  if (!isInBrowser()) {
    return { type: "locale", value: "<not-in-browser>" }
  }
  const value = typeof navigator.languages !== "undefined" ? navigator.languages[0] : navigator.language
  return { type: "locale", value: value || "<none>" }
}

function getScreenType() {
  const width = window.innerWidth
  if (width <= 414) return "XS"
  if (width <= 800) return "S"
  if (width <= 1200) return "M"
  if (width <= 1600) return "L"
  return "XL"
}

/**
 * Logs the screen type of the current user, based on window size:
 *
 * - width <= 414: XS -> phone
 * - width <= 800: S -> tablet
 * - width <= 1200: M -> small laptop
 * - width <= 1600: L -> large laptop
 * - width > 1440: XL -> large desktop
 */
export function screenType() {
  if (!isInBrowser()) {
    return { type: "screen-type", value: "<not-in-browser>" }
  }
  return { type: "screen-type", value: getScreenType() }
}

function getHost() {
  return location.protocol + "//" + location.host
}

/**
 * Logs the referrer on the current page, or `<none>` if the page has no referrer.
 */
export function referrer() {
  if (!isInBrowser()) {
    return { type: "referrer", value: "<not-in-browser>" }
  }
  if ((document.referrer || "").startsWith(getHost())) {
    return { type: "referrer", value: "<none>" }
  }

  return { type: "referrer", value: document.referrer || "<none>" }
}

/**
 * Logs the current path within the application.
 * By default, does not log the `location.hash` nor the `location.search`
 *
 * @param hash `true` to log the hash, `false` by default
 * @param search `true` to log the hash, `false` by default
 */
export function path(hash: boolean = false, search: boolean = false) {
  if (!isInBrowser()) {
    return { type: "path", value: "<not-in-browser>" }
  }
  let value = window.location.pathname

  const _hash = window.location.hash
  const _search = window.location.search
  if (hash && search) {
    // the hash contains the search
    value += _hash
  } else if (hash) {
    value += _hash.substr(0, _hash.length - _search.length)
  } else if (search) {
    value += _search
  }

  return { type: "path", value }
}

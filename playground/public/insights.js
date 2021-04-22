(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.insights = {}));
}(this, (function (exports) { 'use strict';

  function isInBrowser() {
      return typeof window !== "undefined";
  }
  /**
   * Get the current host, including the protocol, origin and port (if any).
   *
   * Does **not** end with a trailing "/".
   */
  function getHost() {
      return location.protocol + "//" + location.host;
  }
  function isReferrerSameHost() {
      if (!isInBrowser()) {
          return false;
      }
      var referrer = document.referrer || "";
      var host = getHost();
      return referrer.substr(0, host.length) === host;
  }

  /**
   * Get the preferred browser locale, of the form: xx, xx-YY or falsy
   */
  function getLocale() {
      var locale = typeof navigator.languages !== "undefined" ? navigator.languages[0] : navigator.language;
      if (locale[0] === '"') {
          locale = locale.substr(1);
      }
      if (locale.length > 0 && locale[locale.length - 1] === '"') {
          locale = locale.substr(0, locale.length - 1);
      }
      if (locale && locale.length === 5 && locale[2] === "-") {
          return locale.substr(0, 3) + locale.substr(3).toLocaleUpperCase();
      }
      return locale;
  }
  /**
   * Track the default locale of the current user.
   */
  function locale() {
      if (!isInBrowser()) {
          return { type: "locale", value: "<not-in-browser>" };
      }
      var value = getLocale() || "<none>";
      return { type: "locale", value: value };
  }
  function getScreenType() {
      var width = window.innerWidth;
      if (width <= 414)
          return "XS";
      if (width <= 800)
          return "S";
      if (width <= 1200)
          return "M";
      if (width <= 1600)
          return "L";
      return "XL";
  }
  /**
   * Track the screen type of the current user, based on window size:
   *
   * - width <= 414: XS -> phone
   * - width <= 800: S -> tablet
   * - width <= 1200: M -> small laptop
   * - width <= 1600: L -> large laptop
   * - width > 1440: XL -> large desktop
   */
  function screenType() {
      if (!isInBrowser()) {
          return { type: "screen-type", value: "<not-in-browser>" };
      }
      return { type: "screen-type", value: getScreenType() };
  }
  /**
   * Track the referrer on the current page, or `<none>` if the page has no referrer.
   */
  function referrer() {
      if (!isInBrowser()) {
          return { type: "referrer", value: "<not-in-browser>" };
      }
      if (isReferrerSameHost()) {
          return { type: "referrer", value: "<none>" };
      }
      return { type: "referrer", value: document.referrer || "<none>" };
  }
  /**
   * Track the current path within the application.
   * By default, does not log the `location.hash` nor the `location.search`
   *
   * @param hash `true` to log the hash, `false` by default
   * @param search `true` to log the hash, `false` by default
   */
  function path(hash, search) {
      if (hash === void 0) { hash = false; }
      if (search === void 0) { search = false; }
      if (!isInBrowser()) {
          return { type: "path", value: "<not-in-browser>" };
      }
      var value = window.location.pathname;
      var _hash = window.location.hash;
      var _search = window.location.search;
      if (hash && search) {
          // the hash contains the search
          value += _hash;
      }
      else if (hash) {
          value += _hash.substr(0, _hash.length - _search.length);
      }
      else if (search) {
          value += _search;
      }
      return { type: "path", value: value };
  }
  /**
   * Track a transition between two values.
   *
   * @param previous The previous value
   * @param next The next value
   */
  function transition(previous, next) {
      return { type: "transition", value: previous + "  ->  " + next };
  }
  /**
   * Track a duration at several intervals:
   *
   * - < 5 seconds
   * - < 15 seconds
   * - < 30 seconds
   * - < 1 minute
   * - < 5 minutes
   * - \> 5 minutes
   *
   * @param durationMs the duration to encode, in milliseconds
   */
  function durationInterval(durationMs, prefix) {
      if (prefix === void 0) { prefix = ""; }
      if (durationMs < 5000) {
          return { type: "duration-interval", value: prefix + "< 5s" };
      }
      if (durationMs < 15000) {
          return { type: "duration-interval", value: prefix + "< 15s" };
      }
      if (durationMs < 30000) {
          return { type: "duration-interval", value: prefix + "< 30s" };
      }
      if (durationMs < 60000) {
          return { type: "duration-interval", value: prefix + "< 1m" };
      }
      if (durationMs < 5 * 60000) {
          return { type: "duration-interval", value: prefix + "< 5m" };
      }
      return { type: "duration-interval", value: prefix + "> 5m" };
  }
  /**
   * Track the operating system of the user, here are the most common values:
   *
   * - Windows
   * - Mac OS X
   * - Android
   * - Linux
   * - iOS
   */
  function os() {
      return { type: "os" };
  }
  /**
   * Track the browser of the user, here are the most common values:
   *
   * - Chrome
   * - Firefox
   * - Safari
   * - Mobile Chrome
   * - Mobile Firefox
   * - Mobile Safari
   */
  function browser() {
      return { type: "browser" };
  }

  var parameters = /*#__PURE__*/Object.freeze({
    __proto__: null,
    locale: locale,
    screenType: screenType,
    referrer: referrer,
    path: path,
    transition: transition,
    durationInterval: durationInterval,
    os: os,
    browser: browser
  });

  /**
   * The default options.
   */
  var defaultOptions = {};
  // See https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
  function addOnPageClose(handler) {
      // let hidden: string | undefined = undefined
      // let visibilityChange: string | undefined = undefined
      // const doc = document as any
      // if (typeof doc.hidden !== "undefined") {
      //   // Opera 12.10 and Firefox 18 and later support
      //   hidden = "hidden"
      //   visibilityChange = "visibilitychange"
      // } else if (typeof doc.msHidden !== "undefined") {
      //   hidden = "msHidden"
      //   visibilityChange = "msvisibilitychange"
      // } else if (typeof doc.webkitHidden !== "undefined") {
      //   hidden = "webkitHidden"
      //   visibilityChange = "webkitvisibilitychange"
      // }
      // if (hidden) {
      //   doc.addEventListener(visibilityChange, () => {
      //     if (hidden && doc[hidden]) handler()
      //   })
      // } else if ("onpagehide" in window) {
      //   // See https://stackoverflow.com/questions/6906146/how-to-detect-browser-support-for-pageshow-and-pagehide
      //   window.addEventListener("pagehide", handler)
      // } else {
      // }
      window.addEventListener("unload", handler);
  }
  /**
   * A class that contains a `projectId` and related configuration to track events painlessly.
   */
  var App = /** @class */ (function () {
      function App(projectId, options) {
          if (options === void 0) { options = defaultOptions; }
          this.projectId = projectId;
          this.options = options;
          this.uniques = {};
          // variables used when tracking pages
          this.trackPageData = null;
          this.trackPageChange = this.trackPageChange.bind(this);
          this.trackLastPageTimeSpent = this.trackLastPageTimeSpent.bind(this);
      }
      /**
       * Track an occurence of the given event.
       *
       * @param event {TrackEventPayload} The event to track.
       */
      App.prototype.track = function (event) {
          if (this.options.disabled || !isInBrowser()) {
              return Promise.resolve();
          }
          if (event.unique) {
              var stringified = JSON.stringify(event);
              if (this.uniques[stringified])
                  return Promise.resolve();
              this.uniques[stringified] = true;
          }
          var body = {
              id: event.id,
              projectId: this.projectId,
          };
          if (event.remove)
              body.remove = true;
          if (event.parameters)
              body.parameters = event.parameters;
          if (event.update)
              body.update = true;
          // do not use fetch, for IE compatibility
          var request = new XMLHttpRequest();
          request.open("post", "https://getinsights.io/app/tics", true);
          request.setRequestHeader("Content-Type", "application/json");
          request.send(JSON.stringify(body));
      };
      /**
       * Tracks page views. This method checks if the URL changed every so often and tracks new pages accordingly.
       *
       * @param options The options to use for the tracking
       *
       * @returns An object of the form `{ stop(): void }` to stop the tracking
       */
      App.prototype.trackPages = function (options) {
          if (!isInBrowser()) {
              return { stop: function () { } };
          }
          if (this.trackPageData) {
              return this.trackPageData.result;
          }
          // Start tracking page changes
          var interval = setInterval(this.trackPageChange, 2000);
          // Calculate the data
          var _a = options || {}, _b = _a.hash, hash = _b === void 0 ? false : _b, _c = _a.search, search = _c === void 0 ? false : _c;
          this.trackPageData = {
              hash: hash,
              search: search,
              path: path(hash, search).value,
              isOnFirstPage: true,
              time: Date.now(),
              result: {
                  stop: function () {
                      clearInterval(interval);
                  },
              },
          };
          // Track the first/current page view
          this.trackSinglePage(true, this.trackPageData.path);
          addOnPageClose(this.trackLastPageTimeSpent);
          return this.trackPageData.result;
      };
      App.prototype.getPreviousPage = function (first) {
          var dataPath = this.trackPageData && this.trackPageData.path;
          if (!first && dataPath) {
              return dataPath;
          }
          if (isReferrerSameHost()) {
              return document.referrer.replace(getHost(), "");
          }
          return document.referrer;
      };
      App.prototype.trackPageChange = function () {
          if (!this.trackPageData)
              return;
          var _a = this.trackPageData, hash = _a.hash, search = _a.search;
          var newPath = path(hash, search).value;
          if (newPath !== this.trackPageData.path) {
              this.trackSinglePage(false, newPath);
          }
      };
      App.prototype.trackSinglePage = function (first, path) {
          if (!this.trackPageData)
              return;
          this.trackPageData.isOnFirstPage = first && !isReferrerSameHost();
          var _a = this.trackPageData, time = _a.time, isOnFirstPage = _a.isOnFirstPage;
          var params = {
              path: path,
          };
          if (isOnFirstPage) {
              params.uniqueViews = path;
              params.referrer = referrer();
              params.locale = locale();
              params.screenType = screenType();
          }
          var previous = this.getPreviousPage(first);
          if (previous && previous !== path) {
              params.transitions = transition(previous, path);
              if (!isOnFirstPage) {
                  var now = Date.now();
                  this.trackPageData.time = now;
                  params.duration = durationInterval(now - time, previous + " - ");
              }
          }
          this.trackPageData.path = path;
          this.track({
              id: "page-views",
              parameters: params,
          });
      };
      App.prototype.trackLastPageTimeSpent = function () {
          var time = this.trackPageData && this.trackPageData.time;
          if (!time || typeof navigator.sendBeacon !== "function" || this.options.disabled || !this.trackPageData) {
              return;
          }
          var _a = this.trackPageData, isOnFirstPage = _a.isOnFirstPage, path = _a.path;
          var params = {};
          // add the duration
          params.duration = durationInterval(Date.now() - time, path + " - ");
          var nextUrl = (document.activeElement && document.activeElement.href) || "";
          var host = getHost();
          if (!nextUrl) {
              // user closed the window
              params.bounces = isOnFirstPage ? "Yes" : "No";
          }
          else if (nextUrl[0] !== "/" && nextUrl.substr(0, host.length) !== getHost()) {
              // link outside of the app
              params.transitions = transition(path, nextUrl);
          }
          // polyfil for IE, this won't always work, but it's better than nothing.
          navigator.sendBeacon =
              navigator.sendBeacon ||
                  function (url, body) {
                      var request = new XMLHttpRequest();
                      request.open("post", url, false);
                      request.send(body);
                  };
          navigator.sendBeacon("https://getinsights.io/app/tics", JSON.stringify({
              id: "page-views",
              projectId: this.projectId,
              parameters: params,
              update: true,
          }));
      };
      return App;
  }());

  /**
   * This file is the entry point for the `insights-js` library.
   *
   * It contains basic methods to initialize and log events:
   * ```typescript
   * init(projectId: string, options?: AppOptions): App
   * track(event: TrackEventPayload): void
   * trackPages(options?: TrackPagesOptions): TrackPagesResult
   * ```
   *
   * As well as the `parameters` helpers.
   */
  /**
   * The default application, or `null` if none.
   */
  exports.DEFAULT_APP = null;
  /**
   * Initialize a default app for the given project with the given options.
   *
   * @param projectId The project for which to initialize the library
   * @param options The options to use
   *
   * @returns The default app
   */
  function init(projectId, options) {
      if (!isInBrowser() || exports.DEFAULT_APP) {
          return exports.DEFAULT_APP;
      }
      exports.DEFAULT_APP = new App(projectId, options);
      return exports.DEFAULT_APP;
  }
  /**
   * Tracks an event using the default app, you must call `init()` before calling this.
   *
   * @param event The event to track
   */
  function track(event) {
      if (!exports.DEFAULT_APP || !isInBrowser())
          return;
      exports.DEFAULT_APP.track(event);
  }
  /**
   * Tracks page views using the default app.
   * This method checks if the URL changed every so often and tracks new pages accordingly.
   *
   * By default, does not track the `location.hash` nor the `location.search`.
   *
   * @param options The options to use for the tracking
   *
   * @returns An object of the form `{ stop(): void }` to stop the tracking
   */
  function trackPages(options) {
      if (!exports.DEFAULT_APP || !isInBrowser())
          return { stop: function () { } };
      return exports.DEFAULT_APP.trackPages(options);
  }

  exports.App = App;
  exports.init = init;
  exports.parameters = parameters;
  exports.track = track;
  exports.trackPages = trackPages;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

/*!
 * 
 *     tree-router v0.0.1
 *     https://github.com/paulovieira/tree-router.git
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("underscore"));
	else if(typeof define === 'function' && define.amd)
		define(["underscore"], factory);
	else if(typeof exports === 'object')
		exports["TreeRouter"] = factory(require("underscore"));
	else
		root["TreeRouter"] = factory(root["_"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_underscore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_underscore__);


/*
TODO: extract these methods from underscore

_.keys(name); i < names.length ; i++) {
_.map(params, function(param, i) {...}
_.extend(object, Events);
_.isRegExp(route))
_.isFunction(name)) {
_.result(this, 'routes');
_.bind(this.checkUrl, this);
_.some(this.handlers, function(handler) {
_.has(protoProps, 'constructor')) {
_.create(parent.prototype, protoProps);

*/




var internals = {}

/*********************************************/
/*  Start of the code steal from Backbone.js     */
/*********************************************/


// Events
// ---------------

// A module that can be mixed in to *any object* in order to provide it with
// a custom event channel. You may bind a callback to an event with `on` or
// remove with `off`; `trigger`-ing an event fires all callbacks in
// succession.
//
//     var object = {};
//     _.extend(object, Events);
//     object.on('xyz', function(){ console.log('xyz at ' + new Date().toISOString()) });
//     object.trigger('xyz');
//
var Events = {};

// Regular expression used to split event strings.
var eventSplitter = /\s+/;

// Iterates over the standard `event, callback` (as well as the fancy multiple
// space-separated events `"change blur", callback` and jQuery-style event
// maps `{event: callback}`).
var eventsApi = function(iteratee, events, name, callback, opts) {
  var i = 0, names;
  if (name && typeof name === 'object') {
    // Handle event maps.
    if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
    for (names = __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.keys(name); i < names.length ; i++) {
      events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
    }
  } else if (name && eventSplitter.test(name)) {
    // Handle space-separated event names by delegating them individually.
    for (names = name.split(eventSplitter); i < names.length; i++) {
      events = iteratee(events, names[i], callback, opts);
    }
  } else {
    // Finally, standard events.
    events = iteratee(events, name, callback, opts);
  }
  return events;
};

// Bind an event to a `callback` function. Passing `"all"` will bind
// the callback to all events fired.
Events.on = function(name, callback, context) {
  return internalOn(this, name, callback, context);
};

// Guard the `listening` argument from the public API.
var internalOn = function(obj, name, callback, context, listening) {
  obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
    context: context,
    ctx: obj,
    listening: listening
  });

  if (listening) {
    var listeners = obj._listeners || (obj._listeners = {});
    listeners[listening.id] = listening;
  }

  return obj;
};


// The reducing API that adds a callback to the `events` object.
var onApi = function(events, name, callback, options) {
  if (callback) {
    var handlers = events[name] || (events[name] = []);
    var context = options.context, ctx = options.ctx, listening = options.listening;
    if (listening) listening.count++;

    handlers.push({callback: callback, context: context, ctx: context || ctx, listening: listening});
  }
  return events;
};

// Remove one or many callbacks. If `context` is null, removes all
// callbacks with that function. If `callback` is null, removes all
// callbacks for the event. If `name` is null, removes all bound
// callbacks for all events.
Events.off = function(name, callback, context) {
  if (!this._events) return this;
  this._events = eventsApi(offApi, this._events, name, callback, {
    context: context,
    listeners: this._listeners
  });
  return this;
};


// The reducing API that removes a callback from the `events` object.
var offApi = function(events, name, callback, options) {
  if (!events) return;

  var i = 0, listening;
  var context = options.context, listeners = options.listeners;

  // Delete all events listeners and "drop" events.
  if (!name && !callback && !context) {
    var ids = __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.keys(listeners);
    for (; i < ids.length; i++) {
      listening = listeners[ids[i]];
      delete listeners[listening.id];
      delete listening.listeningTo[listening.objId];
    }
    return;
  }

  var names = name ? [name] : __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.keys(events);
  for (; i < names.length; i++) {
    name = names[i];
    var handlers = events[name];

    // Bail out if there are no events stored.
    if (!handlers) break;

    // Replace events if there are any remaining.  Otherwise, clean up.
    var remaining = [];
    for (var j = 0; j < handlers.length; j++) {
      var handler = handlers[j];
      if (
        callback && callback !== handler.callback &&
          callback !== handler.callback._callback ||
            context && context !== handler.context
      ) {
        remaining.push(handler);
      } else {
        listening = handler.listening;
        if (listening && --listening.count === 0) {
          delete listeners[listening.id];
          delete listening.listeningTo[listening.objId];
        }
      }
    }

    // Update tail event if the list has any events.  Otherwise, clean up.
    if (remaining.length) {
      events[name] = remaining;
    } else {
      delete events[name];
    }
  }
  return events;
};


// Trigger one or many events, firing all bound callbacks. Callbacks are
// passed the same arguments as `trigger` is, apart from the event name
// (unless you're listening on `"all"`, which will cause your callback to
// receive the true name of the event as the first argument).
Events.trigger = function(name) {
  if (!this._events) return this;

  var length = Math.max(0, arguments.length - 1);
  var args = Array(length);
  for (var i = 0; i < length; i++) args[i] = arguments[i + 1];

  eventsApi(triggerApi, this._events, name, void 0, args);
  return this;
};

// Handles triggering the appropriate event callbacks.
var triggerApi = function(objEvents, name, callback, args) {
  if (objEvents) {
    var events = objEvents[name];
    var allEvents = objEvents.all;
    if (events && allEvents) allEvents = allEvents.slice();
    if (events) triggerEvents(events, args);
    if (allEvents) triggerEvents(allEvents, [name].concat(args));
  }
  return objEvents;
};

// A difficult-to-believe, but optimized internal dispatch function for
// triggering events. Tries to keep the usual cases speedy 
// (most events have 3 arguments).
var triggerEvents = function(events, args) {
  var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
  switch (args.length) {
    case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
    case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
    case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
    case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
    default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
  }
};




// Router
// ---------------

// Routers map faux-URLs to actions, and fire events when routes are
// matched. Creating a new one sets its `routes` hash, if not set statically.
var Router = function(options) {

  options || (options = {});
  if (options.routes) this.routes = options.routes;
  this._bindRoutes();
  this.initialize.apply(this, arguments);
};

// Cached regular expressions for matching named param parts and splatted
// parts of route strings.
var optionalParam = /\((.*?)\)/g;
var namedParam    = /(\(\?)?:\w+/g;
var splatParam    = /\*\w+/g;
var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

// Set up all inheritable **Router** properties and methods.
__WEBPACK_IMPORTED_MODULE_0_underscore___default.a.extend(Router.prototype, Events, {

  // Initialize is an empty function by default. Override it with your own
  // initialization logic.
  initialize: function(){},

  // Manually bind a single named route to a callback. For example:
  //
  //     this.route('search/:query/p:num', 'search', function(query, num) {
  //       ...
  //     });
  //
  route: function(route, name, callback) {
    if (!__WEBPACK_IMPORTED_MODULE_0_underscore___default.a.isRegExp(route)) route = this._routeToRegExp(route);
    if (__WEBPACK_IMPORTED_MODULE_0_underscore___default.a.isFunction(name)) {
      callback = name;
      name = '';
    }
    if (!callback) callback = this[name];
    var router = this;
    internals.history.route(route, function(fragment) {
      var args = router._extractParameters(route, fragment);
      if (router.execute(callback, args, name) !== false) {
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        internals.history.trigger('route', router, name, args);
      }
    });
    return this;
  },

  // Execute a route handler with the provided parameters.  This is an
  // excellent place to do pre-route setup or post-route cleanup.
  execute: function(callback, args, name) {
    if (callback) callback.apply(this, args);
  },

  // Simple proxy to `internals.history` to save a fragment into the history.
  navigate: function(fragment, options) {
    internals.history.navigate(fragment, options);
    return this;
  },

  // Bind all defined routes to `internals.history`. We have to reverse the
  // order of the routes here to support behavior where the most general
  // routes can be defined at the bottom of the route map.

  /*
  _bindRoutes: function() {
    if (!this.routes) return;
    this.routes = _.result(this, 'routes');
    var route, routes = _.keys(this.routes);
    while ((route = routes.pop()) != null) {
      this.route(route, this.routes[route]);
    }
  },
  */

  // Convert a route string into a regular expression, suitable for matching
  // against the current location hash.
  _routeToRegExp: function(route) {
    route = route.replace(escapeRegExp, '\\$&')
                 .replace(optionalParam, '(?:$1)?')
                 .replace(namedParam, function(match, optional) {
                   return optional ? match : '([^/?]+)';
                 })
                 .replace(splatParam, '([^?]*?)');
    return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
  },

  // Given a route, and a URL fragment that it matches, return the array of
  // extracted decoded parameters. Empty or unmatched parameters will be
  // treated as `null` to normalize cross-browser behavior.
  _extractParameters: function(route, fragment) {
    var params = route.exec(fragment).slice(1);
    return __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.map(params, function(param, i) {
      // Don't decode the search params.
      if (i === params.length - 1) return param || null;
      return param ? decodeURIComponent(param) : null;
    });
  }

});




// History
// ----------------

// Handles cross-browser history management, based on either
// [pushState](http://diveintohtml5.info/history.html) and real URLs, or
// [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
// and URL fragments. If the browser supports neither (old IE, natch),
// falls back to polling.
var History = function() {
  this.handlers = [];
  this.checkUrl = __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.bind(this.checkUrl, this);

  // Ensure that `History` can be used outside of the browser.
  if (typeof window !== 'undefined') {
    this.windowLocation = window.location;
    this.windowHistory = window.history;
  }
};

// Cached regex for stripping a leading hash/slash and trailing space.
var routeStripper = /^[#\/]|\s+$/g;

// Cached regex for stripping leading and trailing slashes.
var rootStripper = /^\/+|\/+$/g;

// Cached regex for stripping urls of hash.
var pathStripper = /#.*$/;

// Has the history handling already been started?
History.started = false;

// Set up all inheritable **internals.History** properties and methods.
__WEBPACK_IMPORTED_MODULE_0_underscore___default.a.extend(History.prototype, Events, {

  // The default interval to poll for hash changes, if necessary, is
  // twenty times a second.
  interval: 50,

  // Are we at the app root?
  atRoot: function() {
    var path = this.windowLocation.pathname.replace(/[^\/]$/, '$&/');
    return path === this.root && !this.getSearch();
  },

  // Does the pathname match the root?
  matchRoot: function() {
    var path = this.decodeFragment(this.windowLocation.pathname);
    var rootPath = path.slice(0, this.root.length - 1) + '/';
    return rootPath === this.root;
  },

  // Unicode characters in `location.pathname` are percent encoded so they're
  // decoded for comparison. `%25` should not be decoded since it may be part
  // of an encoded parameter.
  decodeFragment: function(fragment) {
    return decodeURI(fragment.replace(/%25/g, '%2525'));
  },

  // In IE6, the hash fragment and search params are incorrect if the
  // fragment contains `?`.
  getSearch: function() {
    var match = this.windowLocation.href.replace(/#.*/, '').match(/\?.+/);
    return match ? match[0] : '';
  },

  // Gets the true hash value. Cannot use location.hash directly due to bug
  // in Firefox where location.hash will always be decoded.
  getHash: function(window) {
    var match = ((window && window.location) || this.windowLocation).href.match(/#(.*)$/);
    return match ? match[1] : '';
  },

  // Get the pathname and search params, without the root.
  getPath: function() {
    var path = this.decodeFragment(
      this.windowLocation.pathname + this.getSearch()
    ).slice(this.root.length - 1);
    return path.charAt(0) === '/' ? path.slice(1) : path;
  },

  // Get the cross-browser normalized URL fragment from the path or hash.
  getFragment: function(fragment) {

    if (fragment == null) {
      if (this._usePushState || !this._wantsHashChange) {
        fragment = this.getPath();
      } else {
        fragment = this.getHash();
      }
    }

    return fragment.replace(routeStripper, '');
  },

  // Start the hash change handling, returning `true` if the current URL matches
  // an existing route, and `false` otherwise.
  start: function(options) {

    if (History.started) throw new Error('internals.history has already been started');
    History.started = true;

    // Figure out the initial configuration. Do we need an iframe?
    // Is pushState desired ... is it available?
    this.options          = __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.extend({root: '/'}, this.options, options);
    this.root             = this.options.root;
    this._wantsHashChange = this.options.hashChange !== false;
    this._hasHashChange   = 'onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7);
    this._useHashChange   = this._wantsHashChange && this._hasHashChange;
    this._wantsPushState  = !!this.options.pushState;
    this._hasPushState    = !!(this.windowHistory && this.windowHistory.pushState);
    this._usePushState    = this._wantsPushState && this._hasPushState;
    this.fragment         = this.getFragment();

    // Normalize root to always include a leading and trailing slash.
    this.root = ('/' + this.root + '/').replace(rootStripper, '/');

    // Transition from hashChange to pushState or vice versa if both are
    // requested.
    if (this._wantsHashChange && this._wantsPushState) {

      // If we've started off with a route from a `pushState`-enabled
      // browser, but we're currently in a browser that doesn't support it...
      if (!this._hasPushState && !this.atRoot()) {
        var rootPath = this.root.slice(0, -1) || '/';
        this.windowLocation.replace(rootPath + '#' + this.getPath());
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._hasPushState && this.atRoot()) {
        this.navigate(this.getHash(), {replace: true});
      }

    }

    // Proxy an iframe to handle location events if the browser doesn't
    // support the `hashchange` event, HTML5 history, or the user wants
    // `hashChange` but not `pushState`.
    if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
      this.iframe = document.createElement('iframe');
      this.iframe.src = 'javascript:0';
      this.iframe.style.display = 'none';
      this.iframe.tabIndex = -1;
      var body = document.body;
      // Using `appendChild` will throw on IE < 9 if the document is not ready.
      var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
      iWindow.document.open();
      iWindow.document.close();
      iWindow.location.hash = '#' + this.fragment;
    }

    // Add a cross-platform `addEventListener` shim for older browsers.
    var addEventListener = window.addEventListener || function(eventName, listener) {
      return attachEvent('on' + eventName, listener);
    };

    // Depending on whether we're using pushState or hashes, and whether
    // 'onhashchange' is supported, determine how we check the URL state.
    if (this._usePushState) {
      addEventListener('popstate', this.checkUrl, false);
    } else if (this._useHashChange && !this.iframe) {
      addEventListener('hashchange', this.checkUrl, false);
    } else if (this._wantsHashChange) {
      this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
    }

    if (!this.options.silent) return this.loadUrl();
  },

  // Disable internals.history, perhaps temporarily. Not useful in a real app,
  // but possibly useful for unit testing Routers.
  stop: function() {
    // Add a cross-platform `removeEventListener` shim for older browsers.
    var removeEventListener = window.removeEventListener || function(eventName, listener) {
      return detachEvent('on' + eventName, listener);
    };

    // Remove window listeners.
    if (this._usePushState) {
      removeEventListener('popstate', this.checkUrl, false);
    } else if (this._useHashChange && !this.iframe) {
      removeEventListener('hashchange', this.checkUrl, false);
    }

    // Clean up the iframe if necessary.
    if (this.iframe) {
      document.body.removeChild(this.iframe);
      this.iframe = null;
    }

    // Some environments will throw when clearing an undefined interval.
    if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
    History.started = false;
  },

  // Add a route to be tested when the fragment changes. Routes added later
  // may override previous routes.
  route: function(route, callback) {
    this.handlers.unshift({route: route, callback: callback});
  },

  // Checks the current URL to see if it has changed, and if it has,
  // calls `loadUrl`, normalizing across the hidden iframe.
  checkUrl: function(e) {
    //debugger
    var current = this.getFragment();

    // If the user pressed the back button, the iframe's hash will have
    // changed and we should use that for comparison.
    if (current === this.fragment && this.iframe) {
      current = this.getHash(this.iframe.contentWindow);
    }

    if (current === this.fragment) return false;
    if (this.iframe) this.navigate(current);
    this.loadUrl();
  },

  // Attempt to load the current URL fragment. If a route succeeds with a
  // match, returns `true`. If no defined routes matches the fragment,
  // returns `false`.
  loadUrl: function(fragment) {
    // If the root doesn't match, no routes can match either.
    if (!this.matchRoot()) return false;

    fragment = this.fragment = this.getFragment(fragment);
    return __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.some(this.handlers, function(handler) {
      if (handler.route.test(fragment)) {
        handler.callback(fragment);
        return true;
      }
    });
  },

  // Save a fragment into the hash history, or replace the URL state if the
  // 'replace' option is passed. You are responsible for properly URL-encoding
  // the fragment in advance.
  //
  // The options object can contain `trigger: true` if you wish to have the
  // route callback be fired (not usually desirable), or `replace: true`, if
  // you wish to modify the current URL without adding an entry to the history.
  navigate: function(fragment, options) {
    if (!History.started) return false;
    if (!options || options === true) options = {trigger: !!options};

    // Normalize the fragment.
    fragment = this.getFragment(fragment || '');

    // Don't include a trailing slash on the root.
    var rootPath = this.root;
    if (fragment === '' || fragment.charAt(0) === '?') {
      rootPath = rootPath.slice(0, -1) || '/';
    }
    var url = rootPath + fragment;

    // Strip the hash and decode for matching.
    fragment = this.decodeFragment(fragment.replace(pathStripper, ''));

    if (this.fragment === fragment) return;
    this.fragment = fragment;

    // If pushState is available, we use it to set the fragment as a real URL.
    if (this._usePushState) {
      this.windowHistory[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

    // If hash changes haven't been explicitly disabled, update the hash
    // fragment to store history.
    } else if (this._wantsHashChange) {
      this._updateHash(this.windowLocation, fragment, options.replace);
      if (this.iframe && fragment !== this.getHash(this.iframe.contentWindow)) {
        var iWindow = this.iframe.contentWindow;

        // Opening and closing the iframe tricks IE7 and earlier to push a
        // history entry on hash-tag change.  When replace is true, we don't
        // want this.
        if (!options.replace) {
          iWindow.document.open();
          iWindow.document.close();
        }

        this._updateHash(iWindow.location, fragment, options.replace);
      }

    // If you've told us that you explicitly don't want fallback hashchange-
    // based history, then `navigate` becomes a page refresh.
    } else {
      return this.windowLocation.assign(url);
    }
    if (options.trigger) return this.loadUrl(fragment);
  },

  // Update the hash location, either replacing the current entry, or adding
  // a new one to the browser history.
  _updateHash: function(location, fragment, replace) {
    if (replace) {
      var href = location.href.replace(/(javascript:|#).*$/, '');
      location.replace(href + '#' + fragment);
    } else {
      // Some browsers require that `hash` contains a leading #.
      location.hash = '#' + fragment;
    }
  }

});




// Helpers
// -------

// Helper function to correctly set up the prototype chain for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
var extend = function(protoProps, staticProps) {
  var parent = this;
  var child;

  // The constructor function for the new subclass is either defined by you
  // (the "constructor" property in your `extend` definition), or defaulted
  // by us to simply call the parent constructor.
  if (protoProps && __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function(){ return parent.apply(this, arguments); };
  }

  // Add static properties to the constructor function, if supplied.
  __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.extend(child, parent, staticProps);

  // Set the prototype chain to inherit from `parent`, without calling
  // `parent`'s constructor function and add the prototype properties.
  child.prototype = __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.create(parent.prototype, protoProps);
  child.prototype.constructor = child;

  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.__super__ = parent.prototype;

  return child;
};




// Set up inheritance for the model, collection, router, view and history.
Router.extend = History.extend = extend;




// Create the default internals.history.
internals.history = new History;


/*********************************************/
/*  End of the code steal from Backbone.js       */
/*********************************************/

// override the original loadUrl to handle the 'allowLeadingSlash' option

internals.history.loadUrl = function(fragment) {

  // If the root doesn't match, no routes can match either.
  if (!this.matchRoot()) return false;

  fragment = this.fragment = this.getFragment(fragment);
  var allowLeadingSlash = this.options.allowLeadingSlash;

  return __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.some(this.handlers, function(handler) {

    if (handler.route.test(fragment)) {
      handler.callback(fragment);
      return true;
    }

    // test handler.route again, now with a leading slash
    if (allowLeadingSlash !== false) {
      if (handler.route.test('/' + fragment)) {
        handler.callback('/' + fragment);
        return true;
      }      
    }
  });
};


// some more helpers for the TreeRouter class

var wrapInArray = function(obj){

  if (obj == null) { return [] }

  if (__WEBPACK_IMPORTED_MODULE_0_underscore___default.a.isArray(obj)) { return obj }

  return [obj];
};

// Decodes the Url query string parameters & and returns them
// as an object. Supports empty parameters, but not array-like
// parameters (which aren't in the URI specification)
var getQueryParameters = function(queryString) {

  if (!queryString) { return {}; }

  return __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.reduce(queryString.split('&'), function(memo, param) {

    var parts = param.split('=');
    var key = parts[0];
    var val = parts[1];

    key = decodeURIComponent(key);
    val = val === undefined ? null : decodeURIComponent(val);

    // If we don't have the value, then we set it.
    if (!memo[key]) {
        memo[key] = val;
    }

    // Otherwise, if we have the value, and it's an array,
    // then we push to it.
    else if (__WEBPACK_IMPORTED_MODULE_0_underscore___default.a.isArray(memo[key])) {
        memo[key].push(val);
    }

    // Otherwise, we have a value that is not yet an array,
    // so we convert it to an array, adding the newest value.
    else {
        memo[key] = [memo[key], val];
    }

    return memo;
  }, {});
};
  
// Returns the named parameters of the route
var getNamedParams = function(route, params) {

  if (!params.length) { return {}; }

  var routeKeys = this.routeParams[route];
  var routeValues = params.slice(0, routeKeys.length);

  return __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.reduce(__WEBPACK_IMPORTED_MODULE_0_underscore___default.a.zip(routeKeys, routeValues), function (obj, opts) {

      obj[opts[0]] = opts[1];

      return obj;
  }, {});
};




var TreeRouter = Router.extend({

  constructor: function(options) {

    this.options = options || {};
    this.routeParams = {};

    if (options.routes) {
      this.addRoutes(options.routes);
    }

    if (options.create) {
      this._create = options.create;
    }

    if (options.mount) {
      this._mount = options.mount;
    }
    
    this.initialize.apply(this, arguments);
  },

  start: function(startOptions){

    // reference: http://backbonejs.org/#History-start
    internals.history.start(startOptions);
  },

  addRoute: function(routeConfig) {

    this.addRoutes(routeConfig);
  },

  addRoutes: function(routesConfig){

    routesConfig = wrapInArray(routesConfig);
    routesConfig.forEach(this._addRoute, this)
  },

  setDefaultCreate: function(create){

    this._create = create;
  },

  setDefaultMount: function(mount){

    this._mount = mount;
  },

  _addRoute: function(routeConfig) {

    var origRoute = routeConfig.path;
    var route, routeStr;

    if (__WEBPACK_IMPORTED_MODULE_0_underscore___default.a.isRegExp(origRoute)) {
        route = origRoute;
        routeStr = '' + origRoute;
    } 
    else {
        route = this._routeToRegExp(origRoute);
        routeStr = origRoute;
    }

    this.routeParams[origRoute] = __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.map(routeStr.match(namedParam), function (param) {
        return param.slice(1);
    });

    // register a callback with history (add the callback directly to the history handlers array)
    var router = this;

    // instead of calling history.route (which uses unshift to add the object to the 
    // handlers array), we .push() directly to the handlers array
    internals.history.handlers.push({ 
      route: route, 
      callback: function (fragment) {
        
        // extract params and query string
        var params = router._extractParameters(route, fragment);
        var queryString = params.pop();

        var routeData = {
            processedAt: Date.now(),
            route: route,
            originalRoute: origRoute,
            uriFragment: fragment,
            params: getNamedParams.call(router, routeStr, params),
            queryString: queryString,
            query: getQueryParameters(queryString)
        }

        var parent = null;
        var children = wrapInArray(routeConfig.children);
        
        // start the recursive call
        router._processChildren(parent, children, routeData); 

        //router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', routeData);
      } 
    });

    return this;
  },

  _processChildren: function (parentValue, children, requestData) {

    children = wrapInArray(children);

    if (children.length === 0) {
      return;
    }
    
    var router = this;
    children.forEach(function(childObj, i) {

      var create = childObj.create || router._create;
      if (typeof create !== 'function') {
        throw new Error('create function is not defined');
      }

      var mount = childObj.mount || router._mount;
      if (typeof mount !== 'function') {
        throw new Error('mount function is not defined');
      }

      var childData = __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.omit(childObj, ['create', 'mount', 'children']);
      childData._index = i;

      var currentValue = create(parentValue, __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.extend({}, requestData), childData);
      var isPromise = currentValue instanceof Promise;

      if (isPromise === false) {
        // sync processing
        router._processChildren(currentValue, childObj.children, requestData);
        mount(parentValue, currentValue, __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.extend({}, requestData), childData);
        return;
      }

      // async processing
      currentValue.then(obj => {

        // copy-paste from the sync version
        router._processChildren(obj, childObj.children, requestData);
        mount(parentValue, obj, __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.extend({}, requestData), childData);
      })
      .catch(err => {
        console.err(err);  // to be done - what to do here?
      })

    })
  },

});

/* harmony default export */ __webpack_exports__["default"] = (TreeRouter);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ])["default"];
});
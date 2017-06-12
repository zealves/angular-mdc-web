webpackJsonp([1],{

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseFxDirectiveAdapter = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _base = __webpack_require__(23);

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

/**
 * Adapter to the BaseFxDirective abstract class so it can be used via composition.
 * @see BaseFxDirective
 */
var BaseFxDirectiveAdapter = function (_super) {
    __extends(BaseFxDirectiveAdapter, _super);
    /**
     * BaseFxDirectiveAdapter constructor
     */
    function BaseFxDirectiveAdapter(_baseKey, // non-responsive @Input property name
    _mediaMonitor, _elementRef, _renderer) {
        var _this = _super.call(this, _mediaMonitor, _elementRef, _renderer) || this;
        _this._baseKey = _baseKey;
        _this._mediaMonitor = _mediaMonitor;
        _this._elementRef = _elementRef;
        _this._renderer = _renderer;
        return _this;
    }
    Object.defineProperty(BaseFxDirectiveAdapter.prototype, "activeKey", {
        /**
         * Accessor to determine which @Input property is "active"
         * e.g. which property value will be used.
         */
        get: function get() {
            var mqa = this._mqActivation;
            var key = mqa ? mqa.activatedInputKey : this._baseKey;
            // Note: ClassDirective::SimpleChanges uses 'klazz' instead of 'class' as a key
            return key === 'class' ? 'klazz' : key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseFxDirectiveAdapter.prototype, "inputMap", {
        /** Hash map of all @Input keys/values defined/used */
        get: function get() {
            return this._inputMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseFxDirectiveAdapter.prototype, "mqActivation", {
        /**
         * @see BaseFxDirective._mqActivation
         */
        get: function get() {
            return this._mqActivation;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @see BaseFxDirective._queryInput
     */
    BaseFxDirectiveAdapter.prototype.queryInput = function (key) {
        return key ? this._queryInput(key) : undefined;
    };
    /**
     *  Save the property value.
     */
    BaseFxDirectiveAdapter.prototype.cacheInput = function (key, source, cacheRaw) {
        if (cacheRaw === void 0) {
            cacheRaw = false;
        }
        if (cacheRaw) {
            this._cacheInputRaw(key, source);
        } else if (Array.isArray(source)) {
            this._cacheInputArray(key, source);
        } else if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) === 'object') {
            this._cacheInputObject(key, source);
        } else if (typeof source === 'string') {
            this._cacheInputString(key, source);
        } else {
            throw new Error('Invalid class value provided. Did you want to cache the raw value?');
        }
    };
    /**
     * @see BaseFxDirective._listenForMediaQueryChanges
     */
    BaseFxDirectiveAdapter.prototype.listenForMediaQueryChanges = function (key, defaultValue, onMediaQueryChange) {
        return this._listenForMediaQueryChanges(key, defaultValue, onMediaQueryChange);
    };
    // ************************************************************
    // Protected Methods
    // ************************************************************
    /**
     * No implicit transforms of the source.
     * Required when caching values expected later for KeyValueDiffers
     */
    BaseFxDirectiveAdapter.prototype._cacheInputRaw = function (key, source) {
        this._inputMap[key] = source;
    };
    /**
     *  Save the property value for Array values.
     */
    BaseFxDirectiveAdapter.prototype._cacheInputArray = function (key, source) {
        this._inputMap[key] = source.join(' ');
    };
    /**
     *  Save the property value for key/value pair values.
     */
    BaseFxDirectiveAdapter.prototype._cacheInputObject = function (key, source) {
        var classes = [];
        for (var prop in source) {
            if (!!source[prop]) {
                classes.push(prop);
            }
        }
        this._inputMap[key] = classes.join(' ');
    };
    /**
     *  Save the property value for string values.
     */
    BaseFxDirectiveAdapter.prototype._cacheInputString = function (key, source) {
        this._inputMap[key] = source;
    };
    return BaseFxDirectiveAdapter;
}(_base.BaseFxDirective);
exports.BaseFxDirectiveAdapter = BaseFxDirectiveAdapter;
//# sourceMappingURL=base-adapter.js.map

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULT_BREAKPOINTS_PROVIDER = undefined;
exports.buildMergedBreakPoints = buildMergedBreakPoints;
exports.DEFAULT_BREAKPOINTS_PROVIDER_FACTORY = DEFAULT_BREAKPOINTS_PROVIDER_FACTORY;
exports.CUSTOM_BREAKPOINTS_PROVIDER_FACTORY = CUSTOM_BREAKPOINTS_PROVIDER_FACTORY;

var _breakPointsToken = __webpack_require__(105);

var _breakPoints = __webpack_require__(142);

var _orientationBreakPoints = __webpack_require__(143);

var _objectExtend = __webpack_require__(42);

var _breakpointTools = __webpack_require__(149);

/**
 * Add new custom items to the default list or override existing default with custom overrides
 */
function buildMergedBreakPoints(_custom, options) {
    options = (0, _objectExtend.extendObject)({}, {
        defaults: true,
        orientation: false // exclude pre-configured, internal orientations breakpoints
    }, options || {});
    return function () {
        // Order so the defaults are loaded last; so ObservableMedia will report these last!
        var defaults = options.orientations ? _orientationBreakPoints.ORIENTATION_BREAKPOINTS.concat(_breakPoints.DEFAULT_BREAKPOINTS) : _breakPoints.DEFAULT_BREAKPOINTS;
        return options.defaults ? (0, _breakpointTools.mergeByAlias)(defaults, _custom || []) : (0, _breakpointTools.mergeByAlias)(_custom);
    };
}
/**
 *  Ensure that only a single global BreakPoint list is instantiated...
 */
function DEFAULT_BREAKPOINTS_PROVIDER_FACTORY() {
    return (0, _breakpointTools.validateSuffixes)(_breakPoints.DEFAULT_BREAKPOINTS);
}
/**
 * Default Provider that does not support external customization nor provide
 * the extra extended breakpoints:   "handset", "tablet", and "web"
 *
 *  NOTE: !! breakpoints are considered to have unique 'alias' properties,
 *        custom breakpoints matching existing breakpoints will override the properties
 *        of the existing (and not be added as an extra breakpoint entry).
 *        [xs, gt-xs, sm, gt-sm, md, gt-md, lg, gt-lg, xl]
 */
var DEFAULT_BREAKPOINTS_PROVIDER = exports.DEFAULT_BREAKPOINTS_PROVIDER = {
    provide: _breakPointsToken.BREAKPOINTS,
    useFactory: DEFAULT_BREAKPOINTS_PROVIDER_FACTORY
};
/**
 * Use with FlexLayoutModule.CUSTOM_BREAKPOINTS_PROVIDER_FACTORY!
 */
function CUSTOM_BREAKPOINTS_PROVIDER_FACTORY(_custom, options) {
    return {
        provide: _breakPointsToken.BREAKPOINTS,
        useFactory: buildMergedBreakPoints(_custom, options)
    };
}
//# sourceMappingURL=break-points-provider.js.map

/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BREAKPOINTS = undefined;

var _core = __webpack_require__(3);

/**
 *  Injection token unique to the flex-layout library.
 *  Use this token when build a custom provider (see below).
 */
var BREAKPOINTS = exports.BREAKPOINTS = new _core.InjectionToken('Token (@angular/flex-layout) Breakpoints');
//# sourceMappingURL=break-points-token.js.map
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OBSERVABLE_MEDIA_PROVIDER = undefined;
exports.OBSERVABLE_MEDIA_PROVIDER_FACTORY = OBSERVABLE_MEDIA_PROVIDER_FACTORY;

var _core = __webpack_require__(3);

__webpack_require__(56);

__webpack_require__(67);

var _breakPointRegistry = __webpack_require__(51);

var _matchMedia = __webpack_require__(59);

var _observableMedia = __webpack_require__(146);

/**
 * Ensure a single global ObservableMedia service provider
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function OBSERVABLE_MEDIA_PROVIDER_FACTORY(parentService, matchMedia, breakpoints) {
  return parentService || new _observableMedia.MediaService(matchMedia, breakpoints);
}
/**
 *  Provider to return global service for observable service for all MediaQuery activations
 */
var OBSERVABLE_MEDIA_PROVIDER = exports.OBSERVABLE_MEDIA_PROVIDER = {
  provide: _observableMedia.ObservableMedia,
  deps: [[new _core.Optional(), new _core.SkipSelf(), _observableMedia.ObservableMedia], _matchMedia.MatchMedia, _breakPointRegistry.BreakPointRegistry],
  useFactory: OBSERVABLE_MEDIA_PROVIDER_FACTORY
};
//# sourceMappingURL=observable-media-provider.js.map

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mergeAlias = mergeAlias;

var _objectExtend = __webpack_require__(42);

/**
 * For the specified MediaChange, make sure it contains the breakpoint alias
 * and suffix (if available).
 */
function mergeAlias(dest, source) {
    return (0, _objectExtend.extendObject)(dest, source ? {
        mqAlias: source.alias,
        suffix: source.suffix
    } : {});
}
//# sourceMappingURL=add-alias.js.map

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function (e, t) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = t(__webpack_require__(3), __webpack_require__(81), __webpack_require__(50)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(81), __webpack_require__(50)], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.angularMDCWeb = t(require("@angular/core"), require("@angular/forms"), require("@angular/common")) : e.angularMDCWeb = t(e.ng.core, e.ng.forms, e.ng.common);
}(undefined, function (e, t, n) {
  return function (e) {
    function t(i) {
      if (n[i]) return n[i].exports;var o = n[i] = { i: i, l: !1, exports: {} };return e[i].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
    }var n = {};return t.m = e, t.c = n, t.i = function (e) {
      return e;
    }, t.d = function (e, n, i) {
      t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: i });
    }, t.n = function (e) {
      var n = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };return t.d(n, "a", n), n;
    }, t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 58);
  }([function (t, n) {
    t.exports = e;
  }, function (e, t, n) {
    "use strict";
    var i = n(20);n.d(t, "b", function () {
      return i.a;
    });var o = n(26);n.d(t, "a", function () {
      return o.a;
    });
  }, function (e, t) {
    function n(e, t) {
      var n = e[1] || "",
          o = e[3];if (!o) return n;if (t && "function" == typeof btoa) {
        var r = i(o),
            a = o.sources.map(function (e) {
          return "/*# sourceURL=" + o.sourceRoot + e + " */";
        });return [n].concat(a).concat([r]).join("\n");
      }return [n].join("\n");
    }function i(e) {
      return "/*# " + ("sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(e))))) + " */";
    }e.exports = function (e) {
      var t = [];return t.toString = function () {
        return this.map(function (t) {
          var i = n(t, e);return t[2] ? "@media " + t[2] + "{" + i + "}" : i;
        }).join("");
      }, t.i = function (e, n) {
        "string" == typeof e && (e = [[null, e, ""]]);for (var i = {}, o = 0; o < this.length; o++) {
          var r = this[o][0];"number" == typeof r && (i[r] = !0);
        }for (o = 0; o < e.length; o++) {
          var a = e[o];"number" == typeof a[0] && i[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), t.push(a));
        }
      }, t;
    };
  }, function (e, t, n) {
    function i(e, t) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n],
            o = f[i.id];if (o) {
          o.refs++;for (a = 0; a < o.parts.length; a++) {
            o.parts[a](i.parts[a]);
          }for (; a < i.parts.length; a++) {
            o.parts.push(l(i.parts[a], t));
          }
        } else {
          for (var r = [], a = 0; a < i.parts.length; a++) {
            r.push(l(i.parts[a], t));
          }f[i.id] = { id: i.id, refs: 1, parts: r };
        }
      }
    }function o(e, t) {
      for (var n = [], i = {}, o = 0; o < e.length; o++) {
        var r = e[o],
            a = t.base ? r[0] + t.base : r[0],
            c = { css: r[1], media: r[2], sourceMap: r[3] };i[a] ? i[a].parts.push(c) : n.push(i[a] = { id: a, parts: [c] });
      }return n;
    }function r(e, t) {
      var n = g(e.insertInto);if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i = _[_.length - 1];if ("top" === e.insertAt) i ? i.nextSibling ? n.insertBefore(t, i.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), _.push(t);else {
        if ("bottom" !== e.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t);
      }
    }function a(e) {
      if (null === e.parentNode) return !1;e.parentNode.removeChild(e);var t = _.indexOf(e);t >= 0 && _.splice(t, 1);
    }function c(e) {
      var t = document.createElement("style");return e.attrs.type = "text/css", d(t, e.attrs), r(e, t), t;
    }function s(e) {
      var t = document.createElement("link");return e.attrs.type = "text/css", e.attrs.rel = "stylesheet", d(t, e.attrs), r(e, t), t;
    }function d(e, t) {
      Object.keys(t).forEach(function (n) {
        e.setAttribute(n, t[n]);
      });
    }function l(e, t) {
      var n, i, o, r;if (t.transform && e.css) {
        if (!(r = t.transform(e.css))) return function () {};e.css = r;
      }if (t.singleton) {
        var d = y++;n = b || (b = c(t)), i = p.bind(null, n, d, !1), o = p.bind(null, n, d, !0);
      } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = s(t), i = u.bind(null, n, t), o = function o() {
        a(n), n.href && URL.revokeObjectURL(n.href);
      }) : (n = c(t), i = m.bind(null, n), o = function o() {
        a(n);
      });return i(e), function (t) {
        if (t) {
          if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;i(e = t);
        } else o();
      };
    }function p(e, t, n, i) {
      var o = n ? "" : i.css;if (e.styleSheet) e.styleSheet.cssText = x(t, o);else {
        var r = document.createTextNode(o),
            a = e.childNodes;a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(r, a[t]) : e.appendChild(r);
      }
    }function m(e, t) {
      var n = t.css,
          i = t.media;if (i && e.setAttribute("media", i), e.styleSheet) e.styleSheet.cssText = n;else {
        for (; e.firstChild;) {
          e.removeChild(e.firstChild);
        }e.appendChild(document.createTextNode(n));
      }
    }function u(e, t, n) {
      var i = n.css,
          o = n.sourceMap,
          r = void 0 === t.convertToAbsoluteUrls && o;(t.convertToAbsoluteUrls || r) && (i = v(i)), o && (i += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");var a = new Blob([i], { type: "text/css" }),
          c = e.href;e.href = URL.createObjectURL(a), c && URL.revokeObjectURL(c);
    }var f = {},
        h = function (e) {
      var t;return function () {
        return void 0 === t && (t = e.apply(this, arguments)), t;
      };
    }(function () {
      return window && document && document.all && !window.atob;
    }),
        g = function (e) {
      var t = {};return function (n) {
        return void 0 === t[n] && (t[n] = e.call(this, n)), t[n];
      };
    }(function (e) {
      return document.querySelector(e);
    }),
        b = null,
        y = 0,
        _ = [],
        v = n(102);e.exports = function (e, t) {
      if ("undefined" != typeof DEBUG && DEBUG && "object" != (typeof document === "undefined" ? "undefined" : _typeof(document))) throw new Error("The style-loader cannot be used in a non-browser environment");(t = t || {}).attrs = "object" == _typeof(t.attrs) ? t.attrs : {}, t.singleton || (t.singleton = h()), t.insertInto || (t.insertInto = "head"), t.insertAt || (t.insertAt = "bottom");var n = o(e, t);return i(n, t), function (e) {
        for (var r = [], a = 0; a < n.length; a++) {
          var c = n[a];(s = f[c.id]).refs--, r.push(s);
        }e && i(o(e, t), t);for (a = 0; a < r.length; a++) {
          var s = r[a];if (0 === s.refs) {
            for (var d = 0; d < s.parts.length; d++) {
              s.parts[d]();
            }delete f[s.id];
          }
        }
      };
    };var x = function () {
      var e = [];return function (t, n) {
        return e[t] = n, e.filter(Boolean).join("\n");
      };
    }();
  }, function (e, n) {
    e.exports = t;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        a = this && this.__decorate || function (e, t, n, i) {
      var o,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(t, n, c) : o(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        c = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var s = n(0);n(96);var d = n(7),
        l = n(23).MDCRippleFoundation,
        p = function () {
      function e(t, n) {
        var o = this;i(this, e), this._renderer = t, this._root = n, this._unlisteners = new Map(), this._mdcAdapter = { browserSupportsCssVars: function browserSupportsCssVars() {
            return d.supportsCssVariables(window);
          }, isUnbounded: function isUnbounded() {
            return o.unbounded;
          }, isSurfaceActive: function isSurfaceActive() {
            return o.active;
          }, isSurfaceDisabled: function isSurfaceDisabled() {
            o._renderer;return !!o._root.nativeElement.attributes.getNamedItem("disabled");
          }, addClass: function addClass(e) {
            var t = o._renderer,
                n = o._root;t.addClass(n.nativeElement, e);
          }, removeClass: function removeClass(e) {
            var t = o._renderer,
                n = o._root;t.removeClass(n.nativeElement, e);
          }, registerInteractionHandler: function registerInteractionHandler(e, t) {
            o._root && o.listen_(e, t);
          }, deregisterInteractionHandler: function deregisterInteractionHandler(e, t) {
            o.unlisten_(e, t);
          }, registerResizeHandler: function registerResizeHandler(e) {
            o._root && o.listen_("resize", e);
          }, deregisterResizeHandler: function deregisterResizeHandler(e) {
            o.unlisten_("resize", e);
          }, updateCssVariable: function updateCssVariable(e, t) {
            o._root && o._root.nativeElement.style.setProperty(e, t);
          }, computeBoundingRect: function computeBoundingRect() {
            var e = o._root.nativeElement.getBoundingClientRect(),
                t = e.left,
                n = e.top,
                i = e.height;return { top: n, left: t, right: t, bottom: n, width: e.width, height: i };
          }, getWindowPageOffset: function getWindowPageOffset() {
            return { x: window.pageXOffset, y: window.pageYOffset };
          } }, this._foundation = new l(this._mdcAdapter), this._foundation.init();
      }return o(e, [{ key: "ngOnDestroy", value: function value() {
          this._foundation.destroy();
        } }, { key: "listen_", value: function value(e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this._root;this._unlisteners.has(e) || this._unlisteners.set(e, new WeakMap());var i = this._renderer.listen(n.nativeElement, e, t);this._unlisteners.get(e).set(t, i);
        } }, { key: "unlisten_", value: function value(e, t) {
          if (this._unlisteners.has(e)) {
            var n = this._unlisteners.get(e);n.has(t) && (n.get(t)(), n.delete(t));
          }
        } }]), e;
    }();p = a([s.Directive({ selector: "[mdc-ripple]" }), c("design:paramtypes", [s.Renderer2, s.ElementRef])], p), t.Ripple = p;
  }, function (e, t, n) {
    "use strict";
    function i(e) {
      return void 0 !== e.document && "function" == typeof e.document.createElement;
    }function o(e) {
      return e in d || e in l;
    }function r(e, t, n) {
      return t[e].styleProperty in n.style ? t[e].noPrefix : t[e].webkitPrefix;
    }function a(e, t) {
      if (!i(e) || !o(t)) return t;var n = t in d ? d : l,
          a = e.document.createElement("div");var c = "";return c = n === d ? r(t, n, a) : n[t].noPrefix in a.style ? n[t].noPrefix : n[t].webkitPrefix;
    }function c(e, t) {
      return a(e, t);
    }function s(e, t) {
      return a(e, t);
    }Object.defineProperty(t, "__esModule", { value: !0 }), t.getCorrectEventName = c, t.getCorrectPropertyName = s;var d = { animationstart: { noPrefix: "animationstart", webkitPrefix: "webkitAnimationStart", styleProperty: "animation" }, animationend: { noPrefix: "animationend", webkitPrefix: "webkitAnimationEnd", styleProperty: "animation" }, animationiteration: { noPrefix: "animationiteration", webkitPrefix: "webkitAnimationIteration", styleProperty: "animation" }, transitionend: { noPrefix: "transitionend", webkitPrefix: "webkitTransitionEnd", styleProperty: "transition" } },
        l = { animation: { noPrefix: "animation", webkitPrefix: "-webkit-animation" }, transform: { noPrefix: "transform", webkitPrefix: "-webkit-transform" }, transition: { noPrefix: "transition", webkitPrefix: "-webkit-transition" } },
        p = ["transform", "WebkitTransform", "MozTransform", "OTransform", "MSTransform"];t.transformStyleProperties = p;
  }, function (e, t, n) {
    "use strict";
    function i(e) {
      if (!(e.CSS && "function" == typeof e.CSS.supports)) return;var t = e.CSS.supports("--css-vars", "yes"),
          n = e.CSS.supports("(--css-vars: yes)") && e.CSS.supports("color", "#00000000");return t || n;
    }function o() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if (void 0 === c || t) {
        var _t = !1;try {
          e.document.addEventListener("test", null, { get passive() {
              _t = !0;
            } });
        } catch (e) {}c = _t;
      }return !!c && { passive: !0 };
    }function r(e) {
      return ["webkitMatchesSelector", "msMatchesSelector", "matches"].filter(function (t) {
        return t in e;
      }).pop();
    }function a(e, t, n) {
      var i = t.x,
          o = t.y,
          r = i + n.left,
          a = o + n.top;
      var c = void 0,
          s = void 0;return "touchstart" === e.type ? (c = e.changedTouches[0].pageX - r, s = e.changedTouches[0].pageY - a) : (c = e.pageX - r, s = e.pageY - a), { x: c, y: s };
    }Object.defineProperty(t, "__esModule", { value: !0 }), t.supportsCssVariables = i, t.applyPassive = o, t.getMatchesProperty = r, t.getNormalizedEventCoords = a;var c = void 0;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    };Object.defineProperty(t, "__esModule", { value: !0 });var a = n(0),
        c = n(52),
        s = function e() {
      i(this, e);
    };s = r([a.NgModule({ exports: [c.ButtonComponent], declarations: [c.ButtonComponent] })], s), t.ButtonModule = s;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    };Object.defineProperty(t, "__esModule", { value: !0 });var a = n(0),
        c = n(4),
        s = n(54),
        d = n(53),
        l = [s.CheckboxComponent, d.CheckboxLabelDirective],
        p = function e() {
      i(this, e);
    };p = r([a.NgModule({ imports: [c.FormsModule], exports: [l], declarations: [l] })], p), t.CheckboxModule = p;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    };Object.defineProperty(t, "__esModule", { value: !0 });var a = n(0),
        c = n(56),
        s = n(55),
        d = [c.FabComponent, s.FabIconDirective],
        l = function e() {
      i(this, e);
    };l = r([a.NgModule({ exports: [d], declarations: [d] })], l), t.FabModule = l;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    };Object.defineProperty(t, "__esModule", { value: !0 });var a = n(0),
        c = n(57),
        s = function e() {
      i(this, e);
    };s = r([a.NgModule({ exports: [c.FormFieldComponent], declarations: [c.FormFieldComponent] })], s), t.FormFieldModule = s;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    };Object.defineProperty(t, "__esModule", { value: !0 });var a = n(0),
        c = [n(59).LinearProgressComponent],
        s = function e() {
      i(this, e);
    };s = r([a.NgModule({ exports: [c], declarations: [c] })], s), t.LinearProgressModule = s;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    };Object.defineProperty(t, "__esModule", { value: !0 });var a = n(0),
        c = n(22),
        s = n(60),
        d = n(24),
        l = [s.MenuComponent, d.MenuItemDirective],
        p = function e() {
      i(this, e);
    };p = r([a.NgModule({ imports: [c.CommonModule], exports: [l], declarations: [l] })], p), t.MenuModule = p;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    };Object.defineProperty(t, "__esModule", { value: !0 });var a = n(0),
        c = n(5),
        s = function e() {
      i(this, e);
    };s = r([a.NgModule({ exports: [c.Ripple], declarations: [c.Ripple] })], s), t.RippleModule = s;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    };Object.defineProperty(t, "__esModule", { value: !0 });var a = n(0),
        c = n(61),
        s = function e() {
      i(this, e);
    };s = r([a.NgModule({ exports: [c.SnackbarComponent], declarations: [c.SnackbarComponent] })], s), t.SnackbarModule = s;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    };Object.defineProperty(t, "__esModule", { value: !0 });var a = n(0),
        c = n(4),
        s = n(63),
        d = n(62),
        l = [s.SwitchComponent, d.SwitchLabelDirective],
        p = function e() {
      i(this, e);
    };p = r([a.NgModule({ imports: [c.FormsModule], exports: [l], declarations: [l] })], p), t.SwitchModule = p;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    };Object.defineProperty(t, "__esModule", { value: !0 });var a = n(0),
        c = n(22),
        s = n(4),
        d = n(65),
        l = n(64),
        p = [d.TextfieldComponent, l.TextfieldHelptextDirective],
        m = function e() {
      i(this, e);
    };m = r([a.NgModule({ imports: [s.FormsModule, c.CommonModule], exports: [p], declarations: [p] })], m), t.TextfieldModule = m;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    };Object.defineProperty(t, "__esModule", { value: !0 });var a = n(0),
        c = n(22),
        s = n(68),
        d = n(66),
        l = n(67),
        p = n(25),
        m = [s.ToolbarComponent, d.ToolbarRowComponent, l.ToolbarSectionComponent, p.ToolbarTitleDirective],
        u = function e() {
      i(this, e);
    };u = r([a.NgModule({ imports: [c.CommonModule], exports: [m], declarations: [m] })], u), t.ToolbarModule = u;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    };Object.defineProperty(t, "__esModule", { value: !0 });var a = n(0),
        c = n(69),
        s = [c.AdjustMarginDirective, c.Display1Directive, c.Display2Directive, c.Display3Directive, c.Display4Directive, c.HeadlineDirective, c.TitleDirective, c.Subheading1Directive, c.Subheading2Directive, c.Body1Directive, c.Body2Directive, c.CaptionDirective],
        d = function e() {
      i(this, e);
    };d = r([a.NgModule({ exports: [s], declarations: [s] })], d), t.TypographyModule = d;
  }, function (e, t, n) {
    "use strict";

    var i = function () {
      _createClass(i, null, [{
        key: "cssClasses",
        get: function get() {
          return {};
        }
      }, {
        key: "strings",
        get: function get() {
          return {};
        }
      }, {
        key: "numbers",
        get: function get() {
          return {};
        }
      }, {
        key: "defaultAdapter",
        get: function get() {
          return {};
        }
      }]);

      function i() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, i);

        this.adapter_ = e;
      }

      _createClass(i, [{
        key: "init",
        value: function init() {}
      }, {
        key: "destroy",
        value: function destroy() {}
      }]);

      return i;
    }();

    t.a = i;
  }, function (e, t, n) {
    "use strict";
    function i(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if (void 0 === s || t) {
        var _t2 = e.document.createElement("div"),
            _n = "transform" in _t2.style ? "transform" : "webkitTransform";s = _n;
      }return s;
    }function o(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      return Math.min(n, Math.max(t, e));
    }function r(e, t, n, i, o) {
      return a(c(e, t, i), n, o);
    }function a(e, t, n) {
      if (0 === e || 1 === e) return e;var i = e * t,
          o = t + e * (n - t);return i += e * (o - i), o += e * (n + e * (1 - n) - o), i + e * (o - i);
    }function c(e, t, n) {
      if (e <= 0) return 0;if (e >= 1) return 1;var i = e,
          o = 0,
          r = 1,
          c = 0;for (var _s = 0; _s < 8; _s++) {
        c = a(i, t, n);var _s2 = (a(i + 1e-6, t, n) - c) / 1e-6;if (Math.abs(c - e) < 1e-6) return i;if (Math.abs(_s2) < 1e-6) break;c < e ? o = i : r = i, i -= (c - e) / _s2;
      }for (var _s3 = 0; Math.abs(c - e) > 1e-6 && _s3 < 8; _s3++) {
        c < e ? (o = i, i = (i + r) / 2) : (r = i, i = (i + o) / 2), c = a(i, t, n);
      }return i;
    }Object.defineProperty(t, "__esModule", { value: !0 }), t.getTransformPropertyName = i, t.clamp = o, t.bezierProgress = r;var s = void 0;
  }, function (e, t) {
    e.exports = n;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = n(1),
        o = n(41),
        r = n(7);n.d(t, "MDCRippleFoundation", function () {
      return o.a;
    });
    var a = function (_i$a) {
      _inherits(a, _i$a);

      function a() {
        _classCallCheck(this, a);

        return _possibleConstructorReturn(this, (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments));
      }

      _createClass(a, [{
        key: "activate",
        value: function activate() {
          this.foundation_.activate();
        }
      }, {
        key: "deactivate",
        value: function deactivate() {
          this.foundation_.deactivate();
        }
      }, {
        key: "getDefaultFoundation",
        value: function getDefaultFoundation() {
          return new o.a(a.createAdapter(this));
        }
      }, {
        key: "initialSyncWithDOM",
        value: function initialSyncWithDOM() {
          this.unbounded = "mdcRippleIsUnbounded" in this.root_.dataset;
        }
      }, {
        key: "unbounded",
        get: function get() {
          return this.unbounded_;
        },
        set: function set(e) {
          var t = o.a.cssClasses.UNBOUNDED;
          this.unbounded_ = Boolean(e), this.unbounded_ ? this.root_.classList.add(t) : this.root_.classList.remove(t);
        }
      }], [{
        key: "attachTo",
        value: function attachTo(e) {
          var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
              t = _ref.isUnbounded;

          var n = new a(e);return void 0 !== t && (n.unbounded = t), n;
        }
      }, {
        key: "createAdapter",
        value: function createAdapter(e) {
          var t = n.i(r.getMatchesProperty)(HTMLElement.prototype);return { browserSupportsCssVars: function browserSupportsCssVars() {
              return n.i(r.supportsCssVariables)(window);
            }, isUnbounded: function isUnbounded() {
              return e.unbounded;
            }, isSurfaceActive: function isSurfaceActive() {
              return e.root_[t](":active");
            }, isSurfaceDisabled: function isSurfaceDisabled() {
              return e.disabled;
            }, addClass: function addClass(t) {
              return e.root_.classList.add(t);
            }, removeClass: function removeClass(t) {
              return e.root_.classList.remove(t);
            }, registerInteractionHandler: function registerInteractionHandler(t, i) {
              return e.root_.addEventListener(t, i, n.i(r.applyPassive)());
            }, deregisterInteractionHandler: function deregisterInteractionHandler(t, i) {
              return e.root_.removeEventListener(t, i, n.i(r.applyPassive)());
            }, registerResizeHandler: function registerResizeHandler(e) {
              return window.addEventListener("resize", e);
            }, deregisterResizeHandler: function deregisterResizeHandler(e) {
              return window.removeEventListener("resize", e);
            }, updateCssVariable: function updateCssVariable(t, n) {
              return e.root_.style.setProperty(t, n);
            }, computeBoundingRect: function computeBoundingRect() {
              return e.root_.getBoundingClientRect();
            }, getWindowPageOffset: function getWindowPageOffset() {
              return { x: window.pageXOffset, y: window.pageYOffset };
            } };
        }
      }]);

      return a;
    }(i.a);

    t.MDCRipple = a;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        a = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var c = n(0),
        s = function e(t) {
      i(this, e), this.root = t, this.className = "mdc-list-item";
    };r([c.Input(), a("design:type", String)], s.prototype, "label", void 0), r([c.Input(), a("design:type", String)], s.prototype, "icon", void 0), r([c.Input(), a("design:type", Boolean)], s.prototype, "disabled", void 0), r([c.HostBinding("class"), a("design:type", String)], s.prototype, "className", void 0), s = r([c.Directive({ selector: "[mdc-menu-item]" }), a("design:paramtypes", [c.ElementRef])], s), t.MenuItemDirective = s;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        a = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var c = n(0),
        s = function e() {
      i(this, e), this.className = "mdc-toolbar__title";
    };r([c.Input(), a("design:type", String)], s.prototype, "id", void 0), r([c.HostBinding("class"), a("design:type", String)], s.prototype, "className", void 0), s = r([c.Directive({ selector: "[mdc-toolbar-title]" })], s), t.ToolbarTitleDirective = s;
  }, function (e, t, n) {
    "use strict";
    var i = n(20);
    var o = function () {
      _createClass(o, null, [{
        key: "attachTo",
        value: function attachTo(e) {
          return new o(e, new i.a());
        }
      }]);

      function o(e, t) {
        _classCallCheck(this, o);

        for (var _len = arguments.length, n = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          n[_key - 2] = arguments[_key];
        }

        this.root_ = e, this.initialize.apply(this, n), this.foundation_ = void 0 === t ? this.getDefaultFoundation() : t, this.foundation_.init(), this.initialSyncWithDOM();
      }

      _createClass(o, [{
        key: "initialize",
        value: function initialize() {}
      }, {
        key: "getDefaultFoundation",
        value: function getDefaultFoundation() {
          throw new Error("Subclasses must override getDefaultFoundation to return a properly configured foundation class");
        }
      }, {
        key: "initialSyncWithDOM",
        value: function initialSyncWithDOM() {}
      }, {
        key: "destroy",
        value: function destroy() {
          this.foundation_.destroy();
        }
      }, {
        key: "listen",
        value: function listen(e, t) {
          this.root_.addEventListener(e, t);
        }
      }, {
        key: "unlisten",
        value: function unlisten(e, t) {
          this.root_.removeEventListener(e, t);
        }
      }, {
        key: "emit",
        value: function emit(e, t) {
          var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
          var i = void 0;"function" == typeof CustomEvent ? i = new CustomEvent(e, { detail: t, bubbles: n }) : (i = document.createEvent("CustomEvent")).initCustomEvent(e, n, !1, t), this.root_.dispatchEvent(i);
        }
      }]);

      return o;
    }();

    t.a = o;
  }, function (e, t, n) {
    "use strict";
    var i = { ROOT: "mdc-checkbox", UPGRADED: "mdc-checkbox--upgraded", CHECKED: "mdc-checkbox--checked", INDETERMINATE: "mdc-checkbox--indeterminate", ANIM_UNCHECKED_CHECKED: "mdc-checkbox--anim-unchecked-checked", ANIM_UNCHECKED_INDETERMINATE: "mdc-checkbox--anim-unchecked-indeterminate", ANIM_CHECKED_UNCHECKED: "mdc-checkbox--anim-checked-unchecked", ANIM_CHECKED_INDETERMINATE: "mdc-checkbox--anim-checked-indeterminate", ANIM_INDETERMINATE_CHECKED: "mdc-checkbox--anim-indeterminate-checked", ANIM_INDETERMINATE_UNCHECKED: "mdc-checkbox--anim-indeterminate-unchecked" };t.a = i;var o = { NATIVE_CONTROL_SELECTOR: ".mdc-checkbox__native-control", TRANSITION_STATE_INIT: "init", TRANSITION_STATE_CHECKED: "checked", TRANSITION_STATE_UNCHECKED: "unchecked", TRANSITION_STATE_INDETERMINATE: "indeterminate" };t.b = o;var r = { ANIM_END_LATCH_MS: 100 };t.c = r;
  }, function (e, t, n) {
    "use strict";
    function i(e) {
      return e && "function" == typeof e.set;
    }var o = n(1),
        r = n(27);var a = ["checked", "indeterminate"];
    var c = function (_o$b) {
      _inherits(c, _o$b);

      _createClass(c, null, [{
        key: "cssClasses",
        get: function get() {
          return r.a;
        }
      }, {
        key: "strings",
        get: function get() {
          return r.b;
        }
      }, {
        key: "numbers",
        get: function get() {
          return r.c;
        }
      }, {
        key: "defaultAdapter",
        get: function get() {
          return { addClass: function addClass() {}, removeClass: function removeClass() {}, registerAnimationEndHandler: function registerAnimationEndHandler() {}, deregisterAnimationEndHandler: function deregisterAnimationEndHandler() {}, registerChangeHandler: function registerChangeHandler() {}, deregisterChangeHandler: function deregisterChangeHandler() {}, getNativeControl: function getNativeControl() {}, forceLayout: function forceLayout() {}, isAttachedToDOM: function isAttachedToDOM() {} };
        }
      }]);

      function c(e) {
        var _this2;

        _classCallCheck(this, c);

        (_this2 = _possibleConstructorReturn(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, Object.assign(c.defaultAdapter, e))), _this2), _this2.currentCheckState_ = r.b.TRANSITION_STATE_INIT, _this2.currentAnimationClass_ = "", _this2.animEndLatchTimer_ = 0, _this2.animEndHandler_ = function () {
          clearTimeout(_this2.animEndLatchTimer_);_this2.animEndLatchTimer_ = setTimeout(function () {
            _this2.adapter_.removeClass(_this2.currentAnimationClass_);_this2.adapter_.deregisterAnimationEndHandler(_this2.animEndHandler_);
          }, r.c.ANIM_END_LATCH_MS);
        }, _this2.changeHandler_ = function () {
          return _this2.transitionCheckState_();
        };return _this2;
      }

      _createClass(c, [{
        key: "init",
        value: function init() {
          this.adapter_.addClass(r.a.UPGRADED), this.adapter_.registerChangeHandler(this.changeHandler_), this.installPropertyChangeHooks_();
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.adapter_.deregisterChangeHandler(this.changeHandler_), this.uninstallPropertyChangeHooks_();
        }
      }, {
        key: "isChecked",
        value: function isChecked() {
          return this.getNativeControl_().checked;
        }
      }, {
        key: "setChecked",
        value: function setChecked(e) {
          this.getNativeControl_().checked = e;
        }
      }, {
        key: "isIndeterminate",
        value: function isIndeterminate() {
          return this.getNativeControl_().indeterminate;
        }
      }, {
        key: "setIndeterminate",
        value: function setIndeterminate(e) {
          this.getNativeControl_().indeterminate = e;
        }
      }, {
        key: "isDisabled",
        value: function isDisabled() {
          return this.getNativeControl_().disabled;
        }
      }, {
        key: "setDisabled",
        value: function setDisabled(e) {
          this.getNativeControl_().disabled = e;
        }
      }, {
        key: "getValue",
        value: function getValue() {
          return this.getNativeControl_().value;
        }
      }, {
        key: "setValue",
        value: function setValue(e) {
          this.getNativeControl_().value = e;
        }
      }, {
        key: "installPropertyChangeHooks_",
        value: function installPropertyChangeHooks_() {
          var _this3 = this;

          var e = this.getNativeControl_(),
              t = Object.getPrototypeOf(e);a.forEach(function (n) {
            var o = Object.getOwnPropertyDescriptor(t, n);i(o) && Object.defineProperty(e, n, { get: o.get, set: function set(t) {
                o.set.call(e, t);_this3.transitionCheckState_();
              }, configurable: o.configurable, enumerable: o.enumerable });
          });
        }
      }, {
        key: "uninstallPropertyChangeHooks_",
        value: function uninstallPropertyChangeHooks_() {
          var e = this.getNativeControl_(),
              t = Object.getPrototypeOf(e);a.forEach(function (n) {
            var o = Object.getOwnPropertyDescriptor(t, n);i(o) && Object.defineProperty(e, n, o);
          });
        }
      }, {
        key: "transitionCheckState_",
        value: function transitionCheckState_() {
          var e = this.adapter_.getNativeControl();if (!e) return;var t = this.currentCheckState_,
              n = this.determineCheckState_(e);t !== n && (this.currentAnimationClass_.length > 0 && (clearTimeout(this.animEndLatchTimer_), this.adapter_.forceLayout(), this.adapter_.removeClass(this.currentAnimationClass_)), this.currentAnimationClass_ = this.getTransitionAnimationClass_(t, n), this.currentCheckState_ = n, this.adapter_.isAttachedToDOM() && this.currentAnimationClass_.length > 0 && (this.adapter_.addClass(this.currentAnimationClass_), this.adapter_.registerAnimationEndHandler(this.animEndHandler_)));
        }
      }, {
        key: "determineCheckState_",
        value: function determineCheckState_(e) {
          var _r$b = r.b,
              t = _r$b.TRANSITION_STATE_INDETERMINATE,
              n = _r$b.TRANSITION_STATE_CHECKED,
              i = _r$b.TRANSITION_STATE_UNCHECKED;
          return e.indeterminate ? t : e.checked ? n : i;
        }
      }, {
        key: "getTransitionAnimationClass_",
        value: function getTransitionAnimationClass_(e, t) {
          var _r$b2 = r.b,
              n = _r$b2.TRANSITION_STATE_INIT,
              i = _r$b2.TRANSITION_STATE_CHECKED,
              o = _r$b2.TRANSITION_STATE_UNCHECKED,
              _c$cssClasses = c.cssClasses,
              a = _c$cssClasses.ANIM_UNCHECKED_CHECKED,
              s = _c$cssClasses.ANIM_UNCHECKED_INDETERMINATE,
              d = _c$cssClasses.ANIM_CHECKED_UNCHECKED,
              l = _c$cssClasses.ANIM_CHECKED_INDETERMINATE,
              p = _c$cssClasses.ANIM_INDETERMINATE_CHECKED,
              m = _c$cssClasses.ANIM_INDETERMINATE_UNCHECKED;
          switch (e) {case n:
              if (t === o) return "";case o:
              return t === i ? a : s;case i:
              return t === o ? d : l;default:
              return t === i ? p : m;}
        }
      }, {
        key: "getNativeControl_",
        value: function getNativeControl_() {
          return this.adapter_.getNativeControl() || { checked: !1, indeterminate: !1, disabled: !1, value: null };
        }
      }]);

      return c;
    }(o.b);

    t.a = c;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = n(1),
        o = n(23),
        r = n(7),
        a = n(6),
        c = n(28);n.d(t, "MDCCheckboxFoundation", function () {
      return c.a;
    });
    var s = function (_i$a2) {
      _inherits(s, _i$a2);

      _createClass(s, [{
        key: "nativeCb_",
        get: function get() {
          var e = c.a.strings.NATIVE_CONTROL_SELECTOR;
          return this.root_.querySelector(e);
        }
      }], [{
        key: "attachTo",
        value: function attachTo(e) {
          return new s(e);
        }
      }]);

      function s() {
        var _ref2;

        var _this4;

        _classCallCheck(this, s);

        for (var _len2 = arguments.length, e = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          e[_key2] = arguments[_key2];
        }

        (_this4 = _possibleConstructorReturn(this, (_ref2 = s.__proto__ || Object.getPrototypeOf(s)).call.apply(_ref2, [this].concat(e))), _this4), _this4.ripple_ = _this4.initRipple_();return _this4;
      }

      _createClass(s, [{
        key: "initRipple_",
        value: function initRipple_() {
          var _this5 = this;

          var e = n.i(r.getMatchesProperty)(HTMLElement.prototype),
              t = Object.assign(o.MDCRipple.createAdapter(this), { isUnbounded: function isUnbounded() {
              return !0;
            }, isSurfaceActive: function isSurfaceActive() {
              return _this5.nativeCb_[e](":active");
            }, registerInteractionHandler: function registerInteractionHandler(e, t) {
              return _this5.nativeCb_.addEventListener(e, t);
            }, deregisterInteractionHandler: function deregisterInteractionHandler(e, t) {
              return _this5.nativeCb_.removeEventListener(e, t);
            }, computeBoundingRect: function computeBoundingRect() {
              var _root_$getBoundingCli = _this5.root_.getBoundingClientRect(),
                  e = _root_$getBoundingCli.left,
                  t = _root_$getBoundingCli.top;

              return { top: t, left: e, right: e + 40, bottom: t + 40, width: 40, height: 40 };
            } }),
              i = new o.MDCRippleFoundation(t);return new o.MDCRipple(this.root_, i);
        }
      }, {
        key: "getDefaultFoundation",
        value: function getDefaultFoundation() {
          var _this6 = this;

          return new c.a({ addClass: function addClass(e) {
              return _this6.root_.classList.add(e);
            }, removeClass: function removeClass(e) {
              return _this6.root_.classList.remove(e);
            }, registerAnimationEndHandler: function registerAnimationEndHandler(e) {
              return _this6.root_.addEventListener(n.i(a.getCorrectEventName)(window, "animationend"), e);
            }, deregisterAnimationEndHandler: function deregisterAnimationEndHandler(e) {
              return _this6.root_.removeEventListener(n.i(a.getCorrectEventName)(window, "animationend"), e);
            }, registerChangeHandler: function registerChangeHandler(e) {
              return _this6.nativeCb_.addEventListener("change", e);
            }, deregisterChangeHandler: function deregisterChangeHandler(e) {
              return _this6.nativeCb_.removeEventListener("change", e);
            }, getNativeControl: function getNativeControl() {
              return _this6.nativeCb_;
            }, forceLayout: function forceLayout() {
              return _this6.root_.offsetWidth;
            }, isAttachedToDOM: function isAttachedToDOM() {
              return Boolean(_this6.root_.parentNode);
            } });
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.ripple_.destroy(), _get(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "destroy", this).call(this);
        }
      }, {
        key: "ripple",
        get: function get() {
          return this.ripple_;
        }
      }, {
        key: "checked",
        get: function get() {
          return this.foundation_.isChecked();
        },
        set: function set(e) {
          this.foundation_.setChecked(e);
        }
      }, {
        key: "indeterminate",
        get: function get() {
          return this.foundation_.isIndeterminate();
        },
        set: function set(e) {
          this.foundation_.setIndeterminate(e);
        }
      }, {
        key: "disabled",
        get: function get() {
          return this.foundation_.isDisabled();
        },
        set: function set(e) {
          this.foundation_.setDisabled(e);
        }
      }, {
        key: "value",
        get: function get() {
          return this.foundation_.getValue();
        },
        set: function set(e) {
          this.foundation_.setValue(e);
        }
      }]);

      return s;
    }(i.a);

    t.MDCCheckbox = s;
  }, function (e, t, n) {
    "use strict";
    var i = { ROOT: "mdc-form-field" };t.a = i;var o = { LABEL_SELECTOR: ".mdc-form-field > label" };t.b = o;
  }, function (e, t, n) {
    "use strict";
    var i = n(1),
        o = n(30);
    var r = function (_i$b) {
      _inherits(r, _i$b);

      _createClass(r, null, [{
        key: "cssClasses",
        get: function get() {
          return o.a;
        }
      }, {
        key: "strings",
        get: function get() {
          return o.b;
        }
      }, {
        key: "defaultAdapter",
        get: function get() {
          return { registerInteractionHandler: function registerInteractionHandler() {}, deregisterInteractionHandler: function deregisterInteractionHandler() {}, activateInputRipple: function activateInputRipple() {}, deactivateInputRipple: function deactivateInputRipple() {} };
        }
      }]);

      function r(e) {
        var _this7;

        _classCallCheck(this, r);

        (_this7 = _possibleConstructorReturn(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, Object.assign(r.defaultAdapter, e))), _this7), _this7.clickHandler_ = function (e) {
          return _this7.handleClick_(e);
        };return _this7;
      }

      _createClass(r, [{
        key: "init",
        value: function init() {
          this.adapter_.registerInteractionHandler("click", this.clickHandler_);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.adapter_.deregisterInteractionHandler("click", this.clickHandler_);
        }
      }, {
        key: "handleClick_",
        value: function handleClick_() {
          var _this8 = this;

          this.adapter_.activateInputRipple(), requestAnimationFrame(function () {
            return _this8.adapter_.deactivateInputRipple();
          });
        }
      }]);

      return r;
    }(i.b);

    t.a = r;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = n(1),
        o = n(31);n.d(t, "MDCFormFieldFoundation", function () {
      return o.a;
    });
    var r = function (_i$a3) {
      _inherits(r, _i$a3);

      function r() {
        _classCallCheck(this, r);

        return _possibleConstructorReturn(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
      }

      _createClass(r, [{
        key: "getDefaultFoundation",
        value: function getDefaultFoundation() {
          var _this10 = this;

          return new o.a({ registerInteractionHandler: function registerInteractionHandler(e, t) {
              return _this10.label_.addEventListener(e, t);
            }, deregisterInteractionHandler: function deregisterInteractionHandler(e, t) {
              return _this10.label_.removeEventListener(e, t);
            }, activateInputRipple: function activateInputRipple() {
              _this10.input_ && _this10.input_.ripple && _this10.input_.ripple.activate();
            }, deactivateInputRipple: function deactivateInputRipple() {
              _this10.input_ && _this10.input_.ripple && _this10.input_.ripple.deactivate();
            } });
        }
      }, {
        key: "input",
        set: function set(e) {
          this.input_ = e;
        },
        get: function get() {
          return this.input_;
        }
      }, {
        key: "label_",
        get: function get() {
          return this.root_.querySelector(o.a.strings.LABEL_SELECTOR);
        }
      }], [{
        key: "attachTo",
        value: function attachTo(e) {
          return new r(e);
        }
      }]);

      return r;
    }(i.a);

    t.MDCFormField = r;
  }, function (e, t, n) {
    "use strict";
    var i = { CLOSED_CLASS: "mdc-linear-progress--closed", INDETERMINATE_CLASS: "mdc-linear-progress--indeterminate", REVERSED_CLASS: "mdc-linear-progress--reversed" };t.a = i;var o = { PRIMARY_BAR_SELECTOR: ".mdc-linear-progress__primary-bar", BUFFER_SELECTOR: ".mdc-linear-progress__buffer" };t.b = o;
  }, function (e, t, n) {
    "use strict";
    var i = n(1),
        o = n(6),
        r = n(33);
    var a = function (_i$b2) {
      _inherits(a, _i$b2);

      _createClass(a, null, [{
        key: "cssClasses",
        get: function get() {
          return r.a;
        }
      }, {
        key: "strings",
        get: function get() {
          return r.b;
        }
      }, {
        key: "defaultAdapter",
        get: function get() {
          return { addClass: function addClass() {}, getPrimaryBar: function getPrimaryBar() {}, getBuffer: function getBuffer() {}, hasClass: function hasClass() {
              return !1;
            }, removeClass: function removeClass() {}, setStyle: function setStyle() {} };
        }
      }]);

      function a(e) {
        _classCallCheck(this, a);

        return _possibleConstructorReturn(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, Object.assign(a.defaultAdapter, e)));
      }

      _createClass(a, [{
        key: "init",
        value: function init() {
          this.determinate_ = !this.adapter_.hasClass(r.a.INDETERMINATE_CLASS), this.reverse_ = this.adapter_.hasClass(r.a.REVERSED_CLASS);
        }
      }, {
        key: "setDeterminate",
        value: function setDeterminate(e) {
          this.determinate_ = e, this.determinate_ ? this.adapter_.removeClass(r.a.INDETERMINATE_CLASS) : (this.adapter_.addClass(r.a.INDETERMINATE_CLASS), this.setScale_(this.adapter_.getPrimaryBar(), 1), this.setScale_(this.adapter_.getBuffer(), 1));
        }
      }, {
        key: "setProgress",
        value: function setProgress(e) {
          this.determinate_ && this.setScale_(this.adapter_.getPrimaryBar(), e);
        }
      }, {
        key: "setBuffer",
        value: function setBuffer(e) {
          this.determinate_ && this.setScale_(this.adapter_.getBuffer(), e);
        }
      }, {
        key: "setReverse",
        value: function setReverse(e) {
          this.reverse_ = e, this.reverse_ ? this.adapter_.addClass(r.a.REVERSED_CLASS) : this.adapter_.removeClass(r.a.REVERSED_CLASS);
        }
      }, {
        key: "open",
        value: function open() {
          this.adapter_.removeClass(r.a.CLOSED_CLASS);
        }
      }, {
        key: "close",
        value: function close() {
          this.adapter_.addClass(r.a.CLOSED_CLASS);
        }
      }, {
        key: "setScale_",
        value: function setScale_(e, t) {
          var _this12 = this;

          var n = "scaleX(" + t + ")";o.transformStyleProperties.forEach(function (t) {
            _this12.adapter_.setStyle(e, t, n);
          });
        }
      }]);

      return a;
    }(i.b);

    t.a = a;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = n(1),
        o = n(34);n.d(t, "MDCLinearProgressFoundation", function () {
      return o.a;
    });
    var r = function (_i$a4) {
      _inherits(r, _i$a4);

      function r() {
        _classCallCheck(this, r);

        return _possibleConstructorReturn(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
      }

      _createClass(r, [{
        key: "open",
        value: function open() {
          this.foundation_.open();
        }
      }, {
        key: "close",
        value: function close() {
          this.foundation_.close();
        }
      }, {
        key: "getDefaultFoundation",
        value: function getDefaultFoundation() {
          var _this14 = this;

          return new o.a({ addClass: function addClass(e) {
              return _this14.root_.classList.add(e);
            }, getPrimaryBar: function getPrimaryBar() {
              return _this14.root_.querySelector(o.a.strings.PRIMARY_BAR_SELECTOR);
            }, getBuffer: function getBuffer() {
              return _this14.root_.querySelector(o.a.strings.BUFFER_SELECTOR);
            }, hasClass: function hasClass(e) {
              return _this14.root_.classList.contains(e);
            }, removeClass: function removeClass(e) {
              return _this14.root_.classList.remove(e);
            }, setStyle: function setStyle(e, t, n) {
              return e.style[t] = n;
            } });
        }
      }, {
        key: "determinate",
        set: function set(e) {
          this.foundation_.setDeterminate(e);
        }
      }, {
        key: "progress",
        set: function set(e) {
          this.foundation_.setProgress(e);
        }
      }, {
        key: "buffer",
        set: function set(e) {
          this.foundation_.setBuffer(e);
        }
      }, {
        key: "reverse",
        set: function set(e) {
          this.foundation_.setReverse(e);
        }
      }], [{
        key: "attachTo",
        value: function attachTo(e) {
          return new r(e);
        }
      }]);

      return r;
    }(i.a);

    t.MDCLinearProgress = r;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = n(39);n.d(t, "MDCSimpleMenu", function () {
      return i.a;
    }), n.d(t, "MDCSimpleMenuFoundation", function () {
      return i.b;
    });
  }, function (e, t, n) {
    "use strict";
    var i = { ROOT: "mdc-simple-menu", OPEN: "mdc-simple-menu--open", ANIMATING: "mdc-simple-menu--animating", TOP_RIGHT: "mdc-simple-menu--open-from-top-right", BOTTOM_LEFT: "mdc-simple-menu--open-from-bottom-left", BOTTOM_RIGHT: "mdc-simple-menu--open-from-bottom-right" };t.a = i;var o = { ITEMS_SELECTOR: ".mdc-simple-menu__items", SELECTED_EVENT: "MDCSimpleMenu:selected", CANCEL_EVENT: "MDCSimpleMenu:cancel" };t.b = o;var r = { SELECTED_TRIGGER_DELAY: 50, TRANSITION_DURATION_MS: 300, TRANSITION_SCALE_ADJUSTMENT_X: .5, TRANSITION_SCALE_ADJUSTMENT_Y: .2, TRANSITION_X1: 0, TRANSITION_Y1: 0, TRANSITION_X2: .2, TRANSITION_Y2: 1 };t.c = r;
  }, function (e, t, n) {
    "use strict";
    var i = n(1),
        o = n(37),
        r = n(21);
    var a = function (_i$b3) {
      _inherits(a, _i$b3);

      _createClass(a, null, [{
        key: "cssClasses",
        get: function get() {
          return o.a;
        }
      }, {
        key: "strings",
        get: function get() {
          return o.b;
        }
      }, {
        key: "numbers",
        get: function get() {
          return o.c;
        }
      }, {
        key: "defaultAdapter",
        get: function get() {
          return { addClass: function addClass() {}, removeClass: function removeClass() {}, hasClass: function hasClass() {}, hasNecessaryDom: function hasNecessaryDom() {
              return !1;
            }, getInnerDimensions: function getInnerDimensions() {
              return {};
            }, hasAnchor: function hasAnchor() {
              return !1;
            }, getAnchorDimensions: function getAnchorDimensions() {
              return {};
            }, getWindowDimensions: function getWindowDimensions() {
              return {};
            }, setScale: function setScale() {}, setInnerScale: function setInnerScale() {}, getNumberOfItems: function getNumberOfItems() {
              return 0;
            }, registerInteractionHandler: function registerInteractionHandler() {}, deregisterInteractionHandler: function deregisterInteractionHandler() {}, registerDocumentClickHandler: function registerDocumentClickHandler() {}, deregisterDocumentClickHandler: function deregisterDocumentClickHandler() {}, getYParamsForItemAtIndex: function getYParamsForItemAtIndex() {
              return {};
            }, setTransitionDelayForItemAtIndex: function setTransitionDelayForItemAtIndex() {}, getIndexForEventTarget: function getIndexForEventTarget() {
              return 0;
            }, notifySelected: function notifySelected() {}, notifyCancel: function notifyCancel() {}, saveFocus: function saveFocus() {}, restoreFocus: function restoreFocus() {}, isFocused: function isFocused() {
              return !1;
            }, focus: function focus() {}, getFocusedItemIndex: function getFocusedItemIndex() {
              return -1;
            }, focusItemAtIndex: function focusItemAtIndex() {}, isRtl: function isRtl() {
              return !1;
            }, setTransformOrigin: function setTransformOrigin() {}, setPosition: function setPosition() {}, getAccurateTime: function getAccurateTime() {
              return 0;
            } };
        }
      }]);

      function a(e) {
        var _this15;

        _classCallCheck(this, a);

        (_this15 = _possibleConstructorReturn(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, Object.assign(a.defaultAdapter, e))), _this15), _this15.clickHandler_ = function (e) {
          return _this15.handlePossibleSelected_(e);
        }, _this15.keydownHandler_ = function (e) {
          return _this15.handleKeyboardDown_(e);
        }, _this15.keyupHandler_ = function (e) {
          return _this15.handleKeyboardUp_(e);
        }, _this15.documentClickHandler_ = function () {
          _this15.adapter_.notifyCancel();_this15.close();
        }, _this15.isOpen_ = !1, _this15.startScaleX_ = 0, _this15.startScaleY_ = 0, _this15.targetScale_ = 1, _this15.scaleX_ = 0, _this15.scaleY_ = 0, _this15.running_ = !1, _this15.selectedTriggerTimerId_ = 0, _this15.animationRequestId_ = 0;return _this15;
      }

      _createClass(a, [{
        key: "init",
        value: function init() {
          var _a$cssClasses = a.cssClasses,
              e = _a$cssClasses.ROOT,
              t = _a$cssClasses.OPEN;
          if (!this.adapter_.hasClass(e)) throw new Error(e + " class required in root element.");if (!this.adapter_.hasNecessaryDom()) throw new Error("Required DOM nodes missing in " + e + " component.");this.adapter_.hasClass(t) && (this.isOpen_ = !0), this.adapter_.registerInteractionHandler("click", this.clickHandler_), this.adapter_.registerInteractionHandler("keyup", this.keyupHandler_), this.adapter_.registerInteractionHandler("keydown", this.keydownHandler_);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          clearTimeout(this.selectedTriggerTimerId_), cancelAnimationFrame(this.animationRequestId_), this.adapter_.deregisterInteractionHandler("click", this.clickHandler_), this.adapter_.deregisterInteractionHandler("keyup", this.keyupHandler_), this.adapter_.deregisterInteractionHandler("keydown", this.keydownHandler_), this.adapter_.deregisterDocumentClickHandler(this.documentClickHandler_);
        }
      }, {
        key: "applyTransitionDelays_",
        value: function applyTransitionDelays_() {
          var _a$cssClasses2 = a.cssClasses,
              e = _a$cssClasses2.BOTTOM_LEFT,
              t = _a$cssClasses2.BOTTOM_RIGHT,
              n = this.adapter_.getNumberOfItems(),
              i = this.dimensions_.height,
              o = a.numbers.TRANSITION_DURATION_MS / 1e3,
              r = a.numbers.TRANSITION_SCALE_ADJUSTMENT_Y;
          for (var _a = 0; _a < n; _a++) {
            var _adapter_$getYParamsF = this.adapter_.getYParamsForItemAtIndex(_a),
                _n2 = _adapter_$getYParamsF.top,
                c = _adapter_$getYParamsF.height;

            this.itemHeight_ = c;var s = _n2 / i;(this.adapter_.hasClass(e) || this.adapter_.hasClass(t)) && (s = (i - _n2 - c) / i);var d = (r + s * (1 - r)) * o;this.adapter_.setTransitionDelayForItemAtIndex(_a, d.toFixed(3) + "s");
          }
        }
      }, {
        key: "removeTransitionDelays_",
        value: function removeTransitionDelays_() {
          var e = this.adapter_.getNumberOfItems();for (var _t3 = 0; _t3 < e; _t3++) {
            this.adapter_.setTransitionDelayForItemAtIndex(_t3, null);
          }
        }
      }, {
        key: "animationLoop_",
        value: function animationLoop_() {
          var _this16 = this;

          var e = this.adapter_.getAccurateTime(),
              _a$numbers = a.numbers,
              t = _a$numbers.TRANSITION_DURATION_MS,
              i = _a$numbers.TRANSITION_X1,
              o = _a$numbers.TRANSITION_Y1,
              c = _a$numbers.TRANSITION_X2,
              s = _a$numbers.TRANSITION_Y2,
              d = _a$numbers.TRANSITION_SCALE_ADJUSTMENT_X,
              l = _a$numbers.TRANSITION_SCALE_ADJUSTMENT_Y,
              p = n.i(r.clamp)((e - this.startTime_) / t);var m = n.i(r.clamp)((p - d) / (1 - d)),
              u = p,
              f = this.startScaleY_;1 === this.targetScale_ && (this.itemHeight_ && (f = Math.max(this.itemHeight_ / this.dimensions_.height, f)), m = n.i(r.clamp)(p + d), u = n.i(r.clamp)((p - l) / (1 - l)));var h = n.i(r.bezierProgress)(m, i, o, c, s),
              g = n.i(r.bezierProgress)(u, i, o, c, s);this.scaleX_ = this.startScaleX_ + (this.targetScale_ - this.startScaleX_) * h;var b = 1 / (0 === this.scaleX_ ? 1 : this.scaleX_);this.scaleY_ = f + (this.targetScale_ - f) * g;var y = 1 / (0 === this.scaleY_ ? 1 : this.scaleY_);this.adapter_.setScale(this.scaleX_, this.scaleY_), this.adapter_.setInnerScale(b, y), p < 1 ? this.animationRequestId_ = requestAnimationFrame(function () {
            return _this16.animationLoop_();
          }) : (this.animationRequestId_ = 0, this.running_ = !1, this.adapter_.removeClass(a.cssClasses.ANIMATING));
        }
      }, {
        key: "animateMenu_",
        value: function animateMenu_() {
          var _this17 = this;

          this.startTime_ = this.adapter_.getAccurateTime(), this.startScaleX_ = this.scaleX_, this.startScaleY_ = this.scaleY_, this.targetScale_ = this.isOpen_ ? 1 : 0, this.running_ || (this.running_ = !0, this.animationRequestId_ = requestAnimationFrame(function () {
            return _this17.animationLoop_();
          }));
        }
      }, {
        key: "focusOnOpen_",
        value: function focusOnOpen_(e) {
          null === e ? (this.adapter_.focus(), this.adapter_.isFocused() || this.adapter_.focusItemAtIndex(0)) : this.adapter_.focusItemAtIndex(e);
        }
      }, {
        key: "handleKeyboardDown_",
        value: function handleKeyboardDown_(e) {
          if (e.altKey || e.ctrlKey || e.metaKey) return !0;var t = e.keyCode,
              n = e.key,
              i = e.shiftKey,
              o = "Tab" === n || 9 === t,
              r = "ArrowUp" === n || 38 === t,
              a = "ArrowDown" === n || 40 === t,
              c = "Space" === n || 32 === t,
              s = this.adapter_.getFocusedItemIndex(),
              d = this.adapter_.getNumberOfItems() - 1;
          return i && o && 0 === s ? (this.adapter_.focusItemAtIndex(d), e.preventDefault(), !1) : !i && o && s === d ? (this.adapter_.focusItemAtIndex(0), e.preventDefault(), !1) : ((r || a || c) && e.preventDefault(), r ? 0 === s || this.adapter_.isFocused() ? this.adapter_.focusItemAtIndex(d) : this.adapter_.focusItemAtIndex(s - 1) : a && (s === d || this.adapter_.isFocused() ? this.adapter_.focusItemAtIndex(0) : this.adapter_.focusItemAtIndex(s + 1)), !0);
        }
      }, {
        key: "handleKeyboardUp_",
        value: function handleKeyboardUp_(e) {
          if (e.altKey || e.ctrlKey || e.metaKey) return !0;var t = e.keyCode,
              n = e.key,
              i = "Enter" === n || 13 === t,
              o = "Space" === n || 32 === t,
              r = "Escape" === n || 27 === t;
          return (i || o) && this.handlePossibleSelected_(e), r && (this.adapter_.notifyCancel(), this.close()), !0;
        }
      }, {
        key: "handlePossibleSelected_",
        value: function handlePossibleSelected_(e) {
          var _this18 = this;

          var t = this.adapter_.getIndexForEventTarget(e.target);t < 0 || this.selectedTriggerTimerId_ || (this.selectedTriggerTimerId_ = setTimeout(function () {
            _this18.selectedTriggerTimerId_ = 0;_this18.close();_this18.adapter_.notifySelected({ index: t });
          }, o.c.SELECTED_TRIGGER_DELAY));
        }
      }, {
        key: "autoPosition_",
        value: function autoPosition_() {
          var _l;

          if (!this.adapter_.hasAnchor()) return;var e = "top",
              t = "left";var n = this.adapter_.getAnchorDimensions(),
              i = this.adapter_.getWindowDimensions(),
              o = n.top + this.dimensions_.height - i.height,
              r = this.dimensions_.height - n.bottom;o > 0 && r < o && (e = "bottom");var a = n.left + this.dimensions_.width - i.width,
              c = this.dimensions_.width - n.right,
              s = a > 0,
              d = c > 0;this.adapter_.isRtl() ? (t = "right", d && a < c && (t = "left")) : s && c < a && (t = "right");var l = (_l = {}, _defineProperty(_l, t, "0"), _defineProperty(_l, e, "0"), _l);this.adapter_.setTransformOrigin(e + " " + t), this.adapter_.setPosition(l);
        }
      }, {
        key: "open",
        value: function open() {
          var _this19 = this;

          var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              _ref3$focusIndex = _ref3.focusIndex,
              e = _ref3$focusIndex === undefined ? null : _ref3$focusIndex;

          this.adapter_.saveFocus(), this.adapter_.addClass(a.cssClasses.ANIMATING), this.animationRequestId_ = requestAnimationFrame(function () {
            _this19.dimensions_ = _this19.adapter_.getInnerDimensions();_this19.applyTransitionDelays_();_this19.autoPosition_();_this19.animateMenu_();_this19.adapter_.addClass(a.cssClasses.OPEN);_this19.focusOnOpen_(e);_this19.adapter_.registerDocumentClickHandler(_this19.documentClickHandler_);
          }), this.isOpen_ = !0;
        }
      }, {
        key: "close",
        value: function close() {
          var _this20 = this;

          this.adapter_.deregisterDocumentClickHandler(this.documentClickHandler_), this.adapter_.addClass(a.cssClasses.ANIMATING), requestAnimationFrame(function () {
            _this20.removeTransitionDelays_();_this20.animateMenu_();_this20.adapter_.removeClass(a.cssClasses.OPEN);
          }), this.isOpen_ = !1, this.adapter_.restoreFocus();
        }
      }, {
        key: "isOpen",
        value: function isOpen() {
          return this.isOpen_;
        }
      }]);

      return a;
    }(i.b);

    t.a = a;
  }, function (e, t, n) {
    "use strict";
    var i = n(1),
        o = n(38),
        r = n(21);n.d(t, "b", function () {
      return o.a;
    });
    var a = function (_i$a5) {
      _inherits(a, _i$a5);

      function a() {
        _classCallCheck(this, a);

        return _possibleConstructorReturn(this, (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments));
      }

      _createClass(a, [{
        key: "show",
        value: function show() {
          var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              _ref4$focusIndex = _ref4.focusIndex,
              e = _ref4$focusIndex === undefined ? null : _ref4$focusIndex;

          this.foundation_.open({ focusIndex: e });
        }
      }, {
        key: "hide",
        value: function hide() {
          this.foundation_.close();
        }
      }, {
        key: "getDefaultFoundation",
        value: function getDefaultFoundation() {
          var _this22 = this;

          return new o.a({ addClass: function addClass(e) {
              return _this22.root_.classList.add(e);
            }, removeClass: function removeClass(e) {
              return _this22.root_.classList.remove(e);
            }, hasClass: function hasClass(e) {
              return _this22.root_.classList.contains(e);
            }, hasNecessaryDom: function hasNecessaryDom() {
              return Boolean(_this22.itemsContainer_);
            }, getInnerDimensions: function getInnerDimensions() {
              var e = _this22.itemsContainer_;
              return { width: e.offsetWidth, height: e.offsetHeight };
            }, hasAnchor: function hasAnchor() {
              return _this22.root_.parentElement && _this22.root_.parentElement.classList.contains("mdc-menu-anchor");
            }, getAnchorDimensions: function getAnchorDimensions() {
              return _this22.root_.parentElement.getBoundingClientRect();
            }, getWindowDimensions: function getWindowDimensions() {
              return { width: window.innerWidth, height: window.innerHeight };
            }, setScale: function setScale(e, t) {
              _this22.root_.style[n.i(r.getTransformPropertyName)(window)] = "scale(" + e + ", " + t + ")";
            }, setInnerScale: function setInnerScale(e, t) {
              _this22.itemsContainer_.style[n.i(r.getTransformPropertyName)(window)] = "scale(" + e + ", " + t + ")";
            }, getNumberOfItems: function getNumberOfItems() {
              return _this22.items.length;
            }, registerInteractionHandler: function registerInteractionHandler(e, t) {
              return _this22.root_.addEventListener(e, t);
            }, deregisterInteractionHandler: function deregisterInteractionHandler(e, t) {
              return _this22.root_.removeEventListener(e, t);
            }, registerDocumentClickHandler: function registerDocumentClickHandler(e) {
              return document.addEventListener("click", e);
            }, deregisterDocumentClickHandler: function deregisterDocumentClickHandler(e) {
              return document.removeEventListener("click", e);
            }, getYParamsForItemAtIndex: function getYParamsForItemAtIndex(e) {
              var _items$e = _this22.items[e],
                  t = _items$e.offsetTop,
                  n = _items$e.offsetHeight;
              return { top: t, height: n };
            }, setTransitionDelayForItemAtIndex: function setTransitionDelayForItemAtIndex(e, t) {
              return _this22.items[e].style.setProperty("transition-delay", t);
            }, getIndexForEventTarget: function getIndexForEventTarget(e) {
              return _this22.items.indexOf(e);
            }, notifySelected: function notifySelected(e) {
              return _this22.emit(o.a.strings.SELECTED_EVENT, { index: e.index, item: _this22.items[e.index] });
            }, notifyCancel: function notifyCancel() {
              return _this22.emit(o.a.strings.CANCEL_EVENT);
            }, saveFocus: function saveFocus() {
              _this22.previousFocus_ = document.activeElement;
            }, restoreFocus: function restoreFocus() {
              _this22.previousFocus_ && _this22.previousFocus_.focus();
            }, isFocused: function isFocused() {
              return document.activeElement === _this22.root_;
            }, focus: function focus() {
              return _this22.root_.focus();
            }, getFocusedItemIndex: function getFocusedItemIndex() {
              return _this22.items.indexOf(document.activeElement);
            }, focusItemAtIndex: function focusItemAtIndex(e) {
              return _this22.items[e].focus();
            }, isRtl: function isRtl() {
              return "rtl" === getComputedStyle(_this22.root_).getPropertyValue("direction");
            }, setTransformOrigin: function setTransformOrigin(e) {
              _this22.root_.style[n.i(r.getTransformPropertyName)(window) + "-origin"] = e;
            }, setPosition: function setPosition(e) {
              _this22.root_.style.left = "left" in e ? e.left : null;_this22.root_.style.right = "right" in e ? e.right : null;_this22.root_.style.top = "top" in e ? e.top : null;_this22.root_.style.bottom = "bottom" in e ? e.bottom : null;
            }, getAccurateTime: function getAccurateTime() {
              return window.performance.now();
            } });
        }
      }, {
        key: "open",
        get: function get() {
          return this.foundation_.isOpen();
        },
        set: function set(e) {
          e ? this.foundation_.open() : this.foundation_.close();
        }
      }, {
        key: "itemsContainer_",
        get: function get() {
          return this.root_.querySelector(o.a.strings.ITEMS_SELECTOR);
        }
      }, {
        key: "items",
        get: function get() {
          var e = this.itemsContainer_;
          return [].slice.call(e.querySelectorAll(".mdc-list-item[role]"));
        }
      }], [{
        key: "attachTo",
        value: function attachTo(e) {
          return new a(e);
        }
      }]);

      return a;
    }(i.a);

    t.a = a;
  }, function (e, t, n) {
    "use strict";
    var i = { ROOT: "mdc-ripple-upgraded", UNBOUNDED: "mdc-ripple-upgraded--unbounded", BG_FOCUSED: "mdc-ripple-upgraded--background-focused", BG_ACTIVE_FILL: "mdc-ripple-upgraded--background-active-fill", FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation", FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation" };t.a = i;var o = { VAR_SURFACE_WIDTH: "--mdc-ripple-surface-width", VAR_SURFACE_HEIGHT: "--mdc-ripple-surface-height", VAR_FG_SIZE: "--mdc-ripple-fg-size", VAR_LEFT: "--mdc-ripple-left", VAR_TOP: "--mdc-ripple-top", VAR_FG_SCALE: "--mdc-ripple-fg-scale", VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start", VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end" };t.b = o;var r = { PADDING: 10, INITIAL_ORIGIN_SCALE: .6, DEACTIVATION_TIMEOUT_MS: 300 };t.c = r;
  }, function (e, t, n) {
    "use strict";
    var i = n(1),
        o = n(40),
        r = n(7);var a = { mouseup: "mousedown", pointerup: "pointerdown", touchend: "touchstart", keyup: "keydown", blur: "focus" };
    var c = function (_i$b4) {
      _inherits(c, _i$b4);

      _createClass(c, [{
        key: "isSupported_",
        get: function get() {
          return this.adapter_.browserSupportsCssVars();
        }
      }], [{
        key: "cssClasses",
        get: function get() {
          return o.a;
        }
      }, {
        key: "strings",
        get: function get() {
          return o.b;
        }
      }, {
        key: "numbers",
        get: function get() {
          return o.c;
        }
      }, {
        key: "defaultAdapter",
        get: function get() {
          return { browserSupportsCssVars: function browserSupportsCssVars() {}, isUnbounded: function isUnbounded() {}, isSurfaceActive: function isSurfaceActive() {}, isSurfaceDisabled: function isSurfaceDisabled() {}, addClass: function addClass() {}, removeClass: function removeClass() {}, registerInteractionHandler: function registerInteractionHandler() {}, deregisterInteractionHandler: function deregisterInteractionHandler() {}, registerResizeHandler: function registerResizeHandler() {}, deregisterResizeHandler: function deregisterResizeHandler() {}, updateCssVariable: function updateCssVariable() {}, computeBoundingRect: function computeBoundingRect() {}, getWindowPageOffset: function getWindowPageOffset() {} };
        }
      }]);

      function c(e) {
        var _this23;

        _classCallCheck(this, c);

        (_this23 = _possibleConstructorReturn(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, Object.assign(c.defaultAdapter, e))), _this23), _this23.layoutFrame_ = 0, _this23.frame_ = { width: 0, height: 0 }, _this23.activationState_ = _this23.defaultActivationState_(), _this23.xfDuration_ = 0, _this23.initialSize_ = 0, _this23.maxRadius_ = 0, _this23.listenerInfos_ = [{ activate: "touchstart", deactivate: "touchend" }, { activate: "pointerdown", deactivate: "pointerup" }, { activate: "mousedown", deactivate: "mouseup" }, { activate: "keydown", deactivate: "keyup" }, { focus: "focus", blur: "blur" }], _this23.listeners_ = { activate: function activate(e) {
            return _this23.activate_(e);
          }, deactivate: function deactivate(e) {
            return _this23.deactivate_(e);
          }, focus: function focus() {
            return requestAnimationFrame(function () {
              return _this23.adapter_.addClass(c.cssClasses.BG_FOCUSED);
            });
          }, blur: function blur() {
            return requestAnimationFrame(function () {
              return _this23.adapter_.removeClass(c.cssClasses.BG_FOCUSED);
            });
          } }, _this23.resizeHandler_ = function () {
          return _this23.layout();
        }, _this23.unboundedCoords_ = { left: 0, top: 0 }, _this23.fgScale_ = 0, _this23.activationTimer_ = 0, _this23.activationAnimationHasEnded_ = !1, _this23.activationTimerCallback_ = function () {
          _this23.activationAnimationHasEnded_ = !0;_this23.runDeactivationUXLogicIfReady_();
        };return _this23;
      }

      _createClass(c, [{
        key: "defaultActivationState_",
        value: function defaultActivationState_() {
          return { isActivated: !1, hasDeactivationUXRun: !1, wasActivatedByPointer: !1, wasElementMadeActive: !1, activationStartTime: 0, activationEvent: null, isProgrammatic: !1 };
        }
      }, {
        key: "init",
        value: function init() {
          var _this24 = this;

          if (!this.isSupported_) return;this.addEventListeners_();var _c$cssClasses2 = c.cssClasses,
              e = _c$cssClasses2.ROOT,
              t = _c$cssClasses2.UNBOUNDED;
          requestAnimationFrame(function () {
            _this24.adapter_.addClass(e);_this24.adapter_.isUnbounded() && _this24.adapter_.addClass(t);_this24.layoutInternal_();
          });
        }
      }, {
        key: "addEventListeners_",
        value: function addEventListeners_() {
          var _this25 = this;

          this.listenerInfos_.forEach(function (e) {
            Object.keys(e).forEach(function (t) {
              _this25.adapter_.registerInteractionHandler(e[t], _this25.listeners_[t]);
            });
          }), this.adapter_.registerResizeHandler(this.resizeHandler_);
        }
      }, {
        key: "activate_",
        value: function activate_(e) {
          var _this26 = this;

          if (this.adapter_.isSurfaceDisabled()) return;var t = this.activationState_;
          t.isActivated || (t.isActivated = !0, t.isProgrammatic = null === e, t.activationEvent = e, t.wasActivatedByPointer = !t.isProgrammatic && ("mousedown" === e.type || "touchstart" === e.type || "pointerdown" === e.type), t.activationStartTime = Date.now(), requestAnimationFrame(function () {
            t.wasElementMadeActive = !e || "keydown" !== e.type || _this26.adapter_.isSurfaceActive();t.wasElementMadeActive ? _this26.animateActivation_() : _this26.activationState_ = _this26.defaultActivationState_();
          }));
        }
      }, {
        key: "activate",
        value: function activate() {
          this.activate_(null);
        }
      }, {
        key: "animateActivation_",
        value: function animateActivation_() {
          var _this27 = this;

          var _c$strings = c.strings,
              e = _c$strings.VAR_FG_TRANSLATE_START,
              t = _c$strings.VAR_FG_TRANSLATE_END,
              _c$cssClasses3 = c.cssClasses,
              n = _c$cssClasses3.BG_ACTIVE_FILL,
              i = _c$cssClasses3.FG_DEACTIVATION,
              o = _c$cssClasses3.FG_ACTIVATION,
              r = c.numbers.DEACTIVATION_TIMEOUT_MS;
          var a = "",
              s = "";if (!this.adapter_.isUnbounded()) {
            var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
                _e = _getFgTranslationCoor.startPoint,
                _t4 = _getFgTranslationCoor.endPoint;

            a = _e.x + "px, " + _e.y + "px", s = _t4.x + "px, " + _t4.y + "px";
          }this.adapter_.updateCssVariable(e, a), this.adapter_.updateCssVariable(t, s), clearTimeout(this.activationTimer_), this.rmBoundedActivationClasses_(), this.adapter_.removeClass(i), this.adapter_.computeBoundingRect(), this.adapter_.addClass(n), this.adapter_.addClass(o), this.activationTimer_ = setTimeout(function () {
            return _this27.activationTimerCallback_();
          }, r);
        }
      }, {
        key: "getFgTranslationCoordinates_",
        value: function getFgTranslationCoordinates_() {
          var e = this.activationState_,
              t = e.activationEvent,
              i = e.wasActivatedByPointer;var o = void 0;return { startPoint: o = { x: (o = i ? n.i(r.getNormalizedEventCoords)(t, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect()) : { x: this.frame_.width / 2, y: this.frame_.height / 2 }).x - this.initialSize_ / 2, y: o.y - this.initialSize_ / 2 }, endPoint: { x: this.frame_.width / 2 - this.initialSize_ / 2, y: this.frame_.height / 2 - this.initialSize_ / 2 } };
        }
      }, {
        key: "runDeactivationUXLogicIfReady_",
        value: function runDeactivationUXLogicIfReady_() {
          var e = c.cssClasses.FG_DEACTIVATION,
              _activationState_ = this.activationState_,
              t = _activationState_.hasDeactivationUXRun,
              n = _activationState_.isActivated;(t || !n) && this.activationAnimationHasEnded_ && (this.rmBoundedActivationClasses_(), this.adapter_.addClass(e));
        }
      }, {
        key: "rmBoundedActivationClasses_",
        value: function rmBoundedActivationClasses_() {
          var _c$cssClasses4 = c.cssClasses,
              e = _c$cssClasses4.BG_ACTIVE_FILL,
              t = _c$cssClasses4.FG_ACTIVATION;
          this.adapter_.removeClass(e), this.adapter_.removeClass(t), this.activationAnimationHasEnded_ = !1, this.adapter_.computeBoundingRect();
        }
      }, {
        key: "deactivate_",
        value: function deactivate_(e) {
          var _this28 = this;

          var t = this.activationState_;
          if (!t.isActivated) return;if (t.isProgrammatic) {
            return requestAnimationFrame(function () {
              return _this28.animateDeactivation_(null, Object.assign({}, t));
            }), void (this.activationState_ = this.defaultActivationState_());
          }var n = a[e.type] === t.activationEvent.type;var i = n;t.wasActivatedByPointer && (i = "mouseup" === e.type);var o = Object.assign({}, t);requestAnimationFrame(function () {
            n && (_this28.activationState_.hasDeactivationUXRun = !0, _this28.animateDeactivation_(e, o));i && (_this28.activationState_ = _this28.defaultActivationState_());
          });
        }
      }, {
        key: "deactivate",
        value: function deactivate() {
          this.deactivate_(null);
        }
      }, {
        key: "animateDeactivation_",
        value: function animateDeactivation_(e, _ref5) {
          var t = _ref5.wasActivatedByPointer,
              n = _ref5.wasElementMadeActive;
          var i = c.cssClasses.BG_FOCUSED;
          (t || n) && (this.adapter_.removeClass(i), this.runDeactivationUXLogicIfReady_());
        }
      }, {
        key: "destroy",
        value: function destroy() {
          var _this29 = this;

          if (!this.isSupported_) return;this.removeEventListeners_();var _c$cssClasses5 = c.cssClasses,
              e = _c$cssClasses5.ROOT,
              t = _c$cssClasses5.UNBOUNDED;
          requestAnimationFrame(function () {
            _this29.adapter_.removeClass(e);_this29.adapter_.removeClass(t);_this29.removeCssVars_();
          });
        }
      }, {
        key: "removeEventListeners_",
        value: function removeEventListeners_() {
          var _this30 = this;

          this.listenerInfos_.forEach(function (e) {
            Object.keys(e).forEach(function (t) {
              _this30.adapter_.deregisterInteractionHandler(e[t], _this30.listeners_[t]);
            });
          }), this.adapter_.deregisterResizeHandler(this.resizeHandler_);
        }
      }, {
        key: "removeCssVars_",
        value: function removeCssVars_() {
          var _this31 = this;

          var e = c.strings;
          Object.keys(e).forEach(function (t) {
            0 === t.indexOf("VAR_") && _this31.adapter_.updateCssVariable(e[t], null);
          });
        }
      }, {
        key: "layout",
        value: function layout() {
          var _this32 = this;

          this.layoutFrame_ && cancelAnimationFrame(this.layoutFrame_), this.layoutFrame_ = requestAnimationFrame(function () {
            _this32.layoutInternal_();_this32.layoutFrame_ = 0;
          });
        }
      }, {
        key: "layoutInternal_",
        value: function layoutInternal_() {
          this.frame_ = this.adapter_.computeBoundingRect();var e = Math.max(this.frame_.height, this.frame_.width),
              t = Math.sqrt(Math.pow(this.frame_.width, 2) + Math.pow(this.frame_.height, 2));this.initialSize_ = e * c.numbers.INITIAL_ORIGIN_SCALE, this.maxRadius_ = t + c.numbers.PADDING, this.fgScale_ = this.maxRadius_ / this.initialSize_, this.xfDuration_ = 1e3 * Math.sqrt(this.maxRadius_ / 1024), this.updateLayoutCssVars_();
        }
      }, {
        key: "updateLayoutCssVars_",
        value: function updateLayoutCssVars_() {
          var _c$strings2 = c.strings,
              e = _c$strings2.VAR_SURFACE_WIDTH,
              t = _c$strings2.VAR_SURFACE_HEIGHT,
              n = _c$strings2.VAR_FG_SIZE,
              i = _c$strings2.VAR_LEFT,
              o = _c$strings2.VAR_TOP,
              r = _c$strings2.VAR_FG_SCALE;
          this.adapter_.updateCssVariable(e, this.frame_.width + "px"), this.adapter_.updateCssVariable(t, this.frame_.height + "px"), this.adapter_.updateCssVariable(n, this.initialSize_ + "px"), this.adapter_.updateCssVariable(r, this.fgScale_), this.adapter_.isUnbounded() && (this.unboundedCoords_ = { left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2), top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2) }, this.adapter_.updateCssVariable(i, this.unboundedCoords_.left + "px"), this.adapter_.updateCssVariable(o, this.unboundedCoords_.top + "px"));
        }
      }]);

      return c;
    }(i.b);

    t.a = c;
  }, function (e, t, n) {
    "use strict";
    var i = { ROOT: "mdc-snackbar", TEXT: "mdc-snackbar__text", ACTION_WRAPPER: "mdc-snackbar__action-wrapper", ACTION_BUTTON: "mdc-snackbar__action-button", ACTIVE: "mdc-snackbar--active", MULTILINE: "mdc-snackbar--multiline", ACTION_ON_BOTTOM: "mdc-snackbar--action-on-bottom" };t.a = i;var o = { TEXT_SELECTOR: ".mdc-snackbar__text", ACTION_WRAPPER_SELECTOR: ".mdc-snackbar__action-wrapper", ACTION_BUTTON_SELECTOR: ".mdc-snackbar__action-button" };t.b = o;var r = { MESSAGE_TIMEOUT: 2750 };t.c = r;
  }, function (e, t, n) {
    "use strict";
    var i = n(1),
        o = n(42);
    var r = function (_i$b5) {
      _inherits(r, _i$b5);

      _createClass(r, [{
        key: "active",
        get: function get() {
          return this.active_;
        }
      }], [{
        key: "cssClasses",
        get: function get() {
          return o.a;
        }
      }, {
        key: "strings",
        get: function get() {
          return o.b;
        }
      }, {
        key: "defaultAdapter",
        get: function get() {
          return { addClass: function addClass() {}, removeClass: function removeClass() {}, setAriaHidden: function setAriaHidden() {}, unsetAriaHidden: function unsetAriaHidden() {}, setMessageText: function setMessageText() {}, setActionText: function setActionText() {}, setActionAriaHidden: function setActionAriaHidden() {}, unsetActionAriaHidden: function unsetActionAriaHidden() {}, registerActionClickHandler: function registerActionClickHandler() {}, deregisterActionClickHandler: function deregisterActionClickHandler() {}, registerTransitionEndHandler: function registerTransitionEndHandler() {}, deregisterTransitionEndHandler: function deregisterTransitionEndHandler() {} };
        }
      }]);

      function r(e) {
        var _this33;

        _classCallCheck(this, r);

        (_this33 = _possibleConstructorReturn(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, Object.assign(r.defaultAdapter, e))), _this33), _this33.active_ = !1, _this33.dismissOnAction_ = !0, _this33.queue_ = [], _this33.actionClickHandler_ = function () {
          return _this33.invokeAction_();
        };return _this33;
      }

      _createClass(r, [{
        key: "init",
        value: function init() {
          this.adapter_.registerActionClickHandler(this.actionClickHandler_), this.adapter_.setAriaHidden(), this.adapter_.setActionAriaHidden();
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.adapter_.deregisterActionClickHandler(this.actionClickHandler_);
        }
      }, {
        key: "dismissesOnAction",
        value: function dismissesOnAction() {
          return this.dismissOnAction_;
        }
      }, {
        key: "setDismissOnAction",
        value: function setDismissOnAction(e) {
          this.dismissOnAction_ = !!e;
        }
      }, {
        key: "show",
        value: function show(e) {
          if (!e) throw new Error("Please provide a data object with at least a message to display.");if (!e.message) throw new Error("Please provide a message to be displayed.");if (e.actionHandler && !e.actionText) throw new Error("Please provide action text with the handler.");if (this.active) return void this.queue_.push(e);var _o$a = o.a,
              t = _o$a.ACTIVE,
              n = _o$a.MULTILINE,
              i = _o$a.ACTION_ON_BOTTOM,
              r = o.c.MESSAGE_TIMEOUT;
          this.adapter_.setMessageText(e.message), e.multiline && (this.adapter_.addClass(n), e.actionOnBottom && this.adapter_.addClass(i)), e.actionHandler ? (this.adapter_.setActionText(e.actionText), this.actionHandler_ = e.actionHandler, this.setActionHidden_(!1)) : (this.setActionHidden_(!0), this.actionHandler_ = null, this.adapter_.setActionText(null)), this.active_ = !0, this.adapter_.addClass(t), this.adapter_.unsetAriaHidden(), this.timeoutId_ = setTimeout(this.cleanup_.bind(this), e.timeout || r);
        }
      }, {
        key: "invokeAction_",
        value: function invokeAction_() {
          try {
            if (!this.actionHandler_) return;this.actionHandler_();
          } finally {
            this.dismissOnAction_ && (clearTimeout(this.timeoutId_), this.cleanup_());
          }
        }
      }, {
        key: "cleanup_",
        value: function cleanup_() {
          var _this34 = this;

          var _o$a2 = o.a,
              e = _o$a2.ACTIVE,
              t = _o$a2.MULTILINE,
              n = _o$a2.ACTION_ON_BOTTOM;
          this.adapter_.removeClass(e);var i = function i() {
            _this34.adapter_.deregisterTransitionEndHandler(i);_this34.adapter_.removeClass(t);_this34.adapter_.removeClass(n);_this34.setActionHidden_(!0);_this34.adapter_.setMessageText(null);_this34.adapter_.setActionText(null);_this34.adapter_.setAriaHidden();_this34.active_ = !1;_this34.showNext_();
          };this.adapter_.registerTransitionEndHandler(i);
        }
      }, {
        key: "showNext_",
        value: function showNext_() {
          this.queue_.length && this.show(this.queue_.shift());
        }
      }, {
        key: "setActionHidden_",
        value: function setActionHidden_(e) {
          e ? this.adapter_.setActionAriaHidden() : this.adapter_.unsetActionAriaHidden();
        }
      }]);

      return r;
    }(i.b);

    t.a = r;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = n(1),
        o = n(43),
        r = n(6);n.d(t, "MDCSnackbarFoundation", function () {
      return o.a;
    });
    var a = function (_i$a6) {
      _inherits(a, _i$a6);

      function a() {
        _classCallCheck(this, a);

        return _possibleConstructorReturn(this, (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments));
      }

      _createClass(a, [{
        key: "show",
        value: function show(e) {
          this.foundation_.show(e);
        }
      }, {
        key: "getDefaultFoundation",
        value: function getDefaultFoundation() {
          var _this36 = this;

          var _o$a$strings = o.a.strings,
              e = _o$a$strings.TEXT_SELECTOR,
              t = _o$a$strings.ACTION_BUTTON_SELECTOR,
              i = function i() {
            return _this36.root_.querySelector(e);
          },
              a = function a() {
            return _this36.root_.querySelector(t);
          };

          return new o.a({ addClass: function addClass(e) {
              return _this36.root_.classList.add(e);
            }, removeClass: function removeClass(e) {
              return _this36.root_.classList.remove(e);
            }, setAriaHidden: function setAriaHidden() {
              return _this36.root_.setAttribute("aria-hidden", "true");
            }, unsetAriaHidden: function unsetAriaHidden() {
              return _this36.root_.removeAttribute("aria-hidden");
            }, setActionAriaHidden: function setActionAriaHidden() {
              return a().setAttribute("aria-hidden", "true");
            }, unsetActionAriaHidden: function unsetActionAriaHidden() {
              return a().removeAttribute("aria-hidden");
            }, setActionText: function setActionText(e) {
              a().textContent = e;
            }, setMessageText: function setMessageText(e) {
              i().textContent = e;
            }, registerActionClickHandler: function registerActionClickHandler(e) {
              return a().addEventListener("click", e);
            }, deregisterActionClickHandler: function deregisterActionClickHandler(e) {
              return a().removeEventListener("click", e);
            }, registerTransitionEndHandler: function registerTransitionEndHandler(e) {
              return _this36.root_.addEventListener(n.i(r.getCorrectEventName)(window, "transitionend"), e);
            }, deregisterTransitionEndHandler: function deregisterTransitionEndHandler(e) {
              return _this36.root_.removeEventListener(n.i(r.getCorrectEventName)(window, "transitionend"), e);
            } });
        }
      }, {
        key: "dismissesOnAction",
        get: function get() {
          return this.foundation_.dismissesOnAction();
        },
        set: function set(e) {
          this.foundation_.setDismissOnAction(e);
        }
      }], [{
        key: "attachTo",
        value: function attachTo(e) {
          return new a(e);
        }
      }]);

      return a;
    }(i.a);

    t.MDCSnackbar = a;
  }, function (e, t, n) {
    "use strict";
    var i = { ARIA_HIDDEN: "aria-hidden", ROLE: "role", INPUT_SELECTOR: ".mdc-textfield__input", LABEL_SELECTOR: ".mdc-textfield__label" };t.b = i;var o = { ROOT: "mdc-textfield", UPGRADED: "mdc-textfield--upgraded", DISABLED: "mdc-textfield--disabled", FOCUSED: "mdc-textfield--focused", INVALID: "mdc-textfield--invalid", HELPTEXT_PERSISTENT: "mdc-textfield-helptext--persistent", HELPTEXT_VALIDATION_MSG: "mdc-textfield-helptext--validation-msg", LABEL_FLOAT_ABOVE: "mdc-textfield__label--float-above" };t.a = o;
  }, function (e, t, n) {
    "use strict";
    var i = n(1),
        o = n(45);
    var r = function (_i$b6) {
      _inherits(r, _i$b6);

      _createClass(r, null, [{
        key: "cssClasses",
        get: function get() {
          return o.a;
        }
      }, {
        key: "strings",
        get: function get() {
          return o.b;
        }
      }, {
        key: "defaultAdapter",
        get: function get() {
          return { addClass: function addClass() {}, removeClass: function removeClass() {}, addClassToLabel: function addClassToLabel() {}, removeClassFromLabel: function removeClassFromLabel() {}, addClassToHelptext: function addClassToHelptext() {}, removeClassFromHelptext: function removeClassFromHelptext() {}, helptextHasClass: function helptextHasClass() {
              return !1;
            }, registerInputFocusHandler: function registerInputFocusHandler() {}, deregisterInputFocusHandler: function deregisterInputFocusHandler() {}, registerInputBlurHandler: function registerInputBlurHandler() {}, deregisterInputBlurHandler: function deregisterInputBlurHandler() {}, registerInputInputHandler: function registerInputInputHandler() {}, deregisterInputInputHandler: function deregisterInputInputHandler() {}, registerInputKeydownHandler: function registerInputKeydownHandler() {}, deregisterInputKeydownHandler: function deregisterInputKeydownHandler() {}, setHelptextAttr: function setHelptextAttr() {}, removeHelptextAttr: function removeHelptextAttr() {}, getNativeInput: function getNativeInput() {
              return {};
            } };
        }
      }]);

      function r() {
        var _this37;

        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, r);

        (_this37 = _possibleConstructorReturn(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, Object.assign(r.defaultAdapter, e))), _this37), _this37.receivedUserInput_ = !1, _this37.inputFocusHandler_ = function () {
          return _this37.activateFocus_();
        }, _this37.inputBlurHandler_ = function () {
          return _this37.deactivateFocus_();
        }, _this37.inputInputHandler_ = function () {
          return _this37.autoCompleteFocus_();
        }, _this37.inputKeydownHandler_ = function () {
          return _this37.receivedUserInput_ = !0;
        };return _this37;
      }

      _createClass(r, [{
        key: "init",
        value: function init() {
          this.adapter_.addClass(r.cssClasses.UPGRADED), this.adapter_.registerInputFocusHandler(this.inputFocusHandler_), this.adapter_.registerInputBlurHandler(this.inputBlurHandler_), this.adapter_.registerInputInputHandler(this.inputInputHandler_), this.adapter_.registerInputKeydownHandler(this.inputKeydownHandler_), this.getNativeInput_().value && this.adapter_.addClassToLabel(r.cssClasses.LABEL_FLOAT_ABOVE);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.adapter_.removeClass(r.cssClasses.UPGRADED), this.adapter_.deregisterInputFocusHandler(this.inputFocusHandler_), this.adapter_.deregisterInputBlurHandler(this.inputBlurHandler_), this.adapter_.deregisterInputInputHandler(this.inputInputHandler_), this.adapter_.deregisterInputKeydownHandler(this.inputKeydownHandler_);
        }
      }, {
        key: "activateFocus_",
        value: function activateFocus_() {
          var _r$cssClasses = r.cssClasses,
              e = _r$cssClasses.FOCUSED,
              t = _r$cssClasses.LABEL_FLOAT_ABOVE;
          this.adapter_.addClass(e), this.adapter_.addClassToLabel(t), this.showHelptext_();
        }
      }, {
        key: "autoCompleteFocus_",
        value: function autoCompleteFocus_() {
          this.receivedUserInput_ || this.activateFocus_();
        }
      }, {
        key: "showHelptext_",
        value: function showHelptext_() {
          var e = r.strings.ARIA_HIDDEN;
          this.adapter_.removeHelptextAttr(e);
        }
      }, {
        key: "deactivateFocus_",
        value: function deactivateFocus_() {
          var _r$cssClasses2 = r.cssClasses,
              e = _r$cssClasses2.FOCUSED,
              t = _r$cssClasses2.INVALID,
              n = _r$cssClasses2.LABEL_FLOAT_ABOVE,
              i = this.getNativeInput_(),
              o = i.checkValidity();
          this.adapter_.removeClass(e), i.value || this.isBadInput_() || (this.adapter_.removeClassFromLabel(n), this.receivedUserInput_ = !1), o ? this.adapter_.removeClass(t) : this.adapter_.addClass(t), this.updateHelptextOnDeactivation_(o);
        }
      }, {
        key: "updateHelptextOnDeactivation_",
        value: function updateHelptextOnDeactivation_(e) {
          var _r$cssClasses3 = r.cssClasses,
              t = _r$cssClasses3.HELPTEXT_PERSISTENT,
              n = _r$cssClasses3.HELPTEXT_VALIDATION_MSG,
              i = r.strings.ROLE,
              o = this.adapter_.helptextHasClass(t),
              a = this.adapter_.helptextHasClass(n) && !e;
          a ? this.adapter_.setHelptextAttr(i, "alert") : this.adapter_.removeHelptextAttr(i), o || a || this.hideHelptext_();
        }
      }, {
        key: "hideHelptext_",
        value: function hideHelptext_() {
          var e = r.strings.ARIA_HIDDEN;
          this.adapter_.setHelptextAttr(e, "true");
        }
      }, {
        key: "isBadInput_",
        value: function isBadInput_() {
          var e = this.getNativeInput_();return e.validity ? e.validity.badInput : e.badInput;
        }
      }, {
        key: "isDisabled",
        value: function isDisabled() {
          return this.getNativeInput_().disabled;
        }
      }, {
        key: "setDisabled",
        value: function setDisabled(e) {
          var t = r.cssClasses.DISABLED;
          this.getNativeInput_().disabled = e, e ? this.adapter_.addClass(t) : this.adapter_.removeClass(t);
        }
      }, {
        key: "getNativeInput_",
        value: function getNativeInput_() {
          return this.adapter_.getNativeInput() || { checkValidity: function checkValidity() {
              return !0;
            }, value: "", disabled: !1, badInput: !1 };
        }
      }]);

      return r;
    }(i.b);

    t.a = r;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = n(1),
        o = n(46);n.d(t, "MDCTextfieldFoundation", function () {
      return o.a;
    });
    var r = function (_i$a7) {
      _inherits(r, _i$a7);

      _createClass(r, null, [{
        key: "attachTo",
        value: function attachTo(e) {
          return new r(e);
        }
      }]);

      function r() {
        var _ref6;

        _classCallCheck(this, r);

        for (var _len3 = arguments.length, e = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          e[_key3] = arguments[_key3];
        }

        var _this38 = _possibleConstructorReturn(this, (_ref6 = r.__proto__ || Object.getPrototypeOf(r)).call.apply(_ref6, [this].concat(e)));

        var t = _this38.input_;_this38.helptextElement = t.hasAttribute("aria-controls") ? document.getElementById(t.getAttribute("aria-controls")) : null;return _this38;
      }

      _createClass(r, [{
        key: "initialSyncWithDom",
        value: function initialSyncWithDom() {
          this.disabled = this.input_.disabled;
        }
      }, {
        key: "getDefaultFoundation",
        value: function getDefaultFoundation() {
          var _this39 = this;

          return new o.a(Object.assign({ addClass: function addClass(e) {
              return _this39.root_.classList.add(e);
            }, removeClass: function removeClass(e) {
              return _this39.root_.classList.remove(e);
            }, addClassToLabel: function addClassToLabel(e) {
              var t = _this39.label_;t && t.classList.add(e);
            }, removeClassFromLabel: function removeClassFromLabel(e) {
              var t = _this39.label_;t && t.classList.remove(e);
            } }, this.getInputAdapterMethods_(), this.getHelptextAdapterMethods_()));
        }
      }, {
        key: "getInputAdapterMethods_",
        value: function getInputAdapterMethods_() {
          var _this40 = this;

          return { registerInputFocusHandler: function registerInputFocusHandler(e) {
              return _this40.input_.addEventListener("focus", e);
            }, registerInputBlurHandler: function registerInputBlurHandler(e) {
              return _this40.input_.addEventListener("blur", e);
            }, registerInputInputHandler: function registerInputInputHandler(e) {
              return _this40.input_.addEventListener("input", e);
            }, registerInputKeydownHandler: function registerInputKeydownHandler(e) {
              return _this40.input_.addEventListener("keydown", e);
            }, deregisterInputFocusHandler: function deregisterInputFocusHandler(e) {
              return _this40.input_.removeEventListener("focus", e);
            }, deregisterInputBlurHandler: function deregisterInputBlurHandler(e) {
              return _this40.input_.removeEventListener("blur", e);
            }, deregisterInputInputHandler: function deregisterInputInputHandler(e) {
              return _this40.input_.removeEventListener("input", e);
            }, deregisterInputKeydownHandler: function deregisterInputKeydownHandler(e) {
              return _this40.input_.removeEventListener("keydown", e);
            }, getNativeInput: function getNativeInput() {
              return _this40.input_;
            } };
        }
      }, {
        key: "getHelptextAdapterMethods_",
        value: function getHelptextAdapterMethods_() {
          var _this41 = this;

          return { addClassToHelptext: function addClassToHelptext(e) {
              _this41.helptextElement && _this41.helptextElement.classList.add(e);
            }, removeClassFromHelptext: function removeClassFromHelptext(e) {
              _this41.helptextElement && _this41.helptextElement.classList.remove(e);
            }, helptextHasClass: function helptextHasClass(e) {
              if (!_this41.helptextElement) return !1;return _this41.helptextElement.classList.contains(e);
            }, setHelptextAttr: function setHelptextAttr(e, t) {
              _this41.helptextElement && _this41.helptextElement.setAttribute(e, t);
            }, removeHelptextAttr: function removeHelptextAttr(e) {
              _this41.helptextElement && _this41.helptextElement.removeAttribute(e);
            } };
        }
      }, {
        key: "disabled",
        get: function get() {
          return this.foundation_.isDisabled();
        },
        set: function set(e) {
          this.foundation_.setDisabled(e);
        }
      }, {
        key: "input_",
        get: function get() {
          return this.root_.querySelector(o.a.strings.INPUT_SELECTOR);
        }
      }, {
        key: "label_",
        get: function get() {
          return this.root_.querySelector(o.a.strings.LABEL_SELECTOR);
        }
      }]);

      return r;
    }(i.a);

    t.MDCTextfield = r;
  }, function (e, t, n) {
    "use strict";
    var i = { FIXED: "mdc-toolbar--fixed", FIXED_LASTROW: "mdc-toolbar--fixed-lastrow-only", FIXED_AT_LAST_ROW: "mdc-toolbar--fixed-at-last-row", TOOLBAR_ROW_FLEXIBLE: "mdc-toolbar--flexible", FLEXIBLE_DEFAULT_BEHAVIOR: "mdc-toolbar--flexible-default-behavior", FLEXIBLE_MAX: "mdc-toolbar--flexible-space-maximized", FLEXIBLE_MIN: "mdc-toolbar--flexible-space-minimized" };t.a = i;var o = { TITLE_SELECTOR: ".mdc-toolbar__title", FLEXIBLE_ROW_SELECTOR: ".mdc-toolbar__row:first-child", CHANGE_EVENT: "MDCToolbar:change" };t.b = o;var r = { MAX_TITLE_SIZE: 2.125, MIN_TITLE_SIZE: 1.25, TOOLBAR_ROW_HEIGHT: 64, TOOLBAR_ROW_MOBILE_HEIGHT: 56, TOOLBAR_MOBILE_BREAKPOINT: 599 };t.c = r;
  }, function (e, t, n) {
    "use strict";
    var i = n(20),
        o = n(48);
    var r = function (_i$a8) {
      _inherits(r, _i$a8);

      _createClass(r, null, [{
        key: "cssClasses",
        get: function get() {
          return o.a;
        }
      }, {
        key: "strings",
        get: function get() {
          return o.b;
        }
      }, {
        key: "numbers",
        get: function get() {
          return o.c;
        }
      }, {
        key: "defaultAdapter",
        get: function get() {
          return { hasClass: function hasClass() {
              return !1;
            }, addClass: function addClass() {}, removeClass: function removeClass() {}, registerScrollHandler: function registerScrollHandler() {}, deregisterScrollHandler: function deregisterScrollHandler() {}, registerResizeHandler: function registerResizeHandler() {}, deregisterResizeHandler: function deregisterResizeHandler() {}, getViewportWidth: function getViewportWidth() {
              return 0;
            }, getViewportScrollY: function getViewportScrollY() {
              return 0;
            }, getOffsetHeight: function getOffsetHeight() {
              return 0;
            }, getFlexibleRowElementOffsetHeight: function getFlexibleRowElementOffsetHeight() {
              return 0;
            }, notifyChange: function notifyChange() {}, setStyle: function setStyle() {}, setStyleForTitleElement: function setStyleForTitleElement() {}, setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement() {}, setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement() {} };
        }
      }]);

      function r(e) {
        var _this42;

        _classCallCheck(this, r);

        (_this42 = _possibleConstructorReturn(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, Object.assign(r.defaultAdapter, e))), _this42), _this42.resizeHandler_ = function () {
          return _this42.checkRowHeight_();
        }, _this42.scrollHandler_ = function () {
          return _this42.updateToolbarStyles_();
        }, _this42.checkRowHeightFrame_ = 0, _this42.scrollFrame_ = 0, _this42.executedLastChange_ = !1, _this42.calculations_ = { toolbarRowHeight: 0, toolbarRatio: 0, flexibleExpansionRatio: 0, maxTranslateYRatio: 0, scrollThesholdRatio: 0, toolbarHeight: 0, flexibleExpansionHeight: 0, maxTranslateYDistance: 0, scrollTheshold: 0 }, _this42.fixed_ = !1, _this42.fixedLastrow_ = !1, _this42.hasFlexibleRow_ = !1, _this42.useFlexDefaultBehavior_ = !1;return _this42;
      }

      _createClass(r, [{
        key: "init",
        value: function init() {
          this.fixed_ = this.adapter_.hasClass(r.cssClasses.FIXED), this.fixedLastrow_ = this.adapter_.hasClass(r.cssClasses.FIXED_LASTROW) & this.fixed_, this.hasFlexibleRow_ = this.adapter_.hasClass(r.cssClasses.TOOLBAR_ROW_FLEXIBLE), this.hasFlexibleRow_ && (this.useFlexDefaultBehavior_ = this.adapter_.hasClass(r.cssClasses.FLEXIBLE_DEFAULT_BEHAVIOR)), this.initKeyRatio_(), this.setKeyHeights_(), this.adapter_.registerResizeHandler(this.resizeHandler_), this.adapter_.registerScrollHandler(this.scrollHandler_);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.adapter_.deregisterResizeHandler(this.resizeHandler_), this.adapter_.deregisterScrollHandler(this.scrollHandler_);
        }
      }, {
        key: "updateAdjustElementStyles",
        value: function updateAdjustElementStyles() {
          this.fixed_ && this.adapter_.setStyleForFixedAdjustElement("margin-top", this.calculations_.toolbarHeight + "px");
        }
      }, {
        key: "getFlexibleExpansionRatio_",
        value: function getFlexibleExpansionRatio_(e) {
          return Math.max(0, 1 - e / (this.calculations_.flexibleExpansionHeight + 1e-4));
        }
      }, {
        key: "checkRowHeight_",
        value: function checkRowHeight_() {
          var _this43 = this;

          cancelAnimationFrame(this.checkRowHeightFrame_), this.checkRowHeightFrame_ = requestAnimationFrame(function () {
            return _this43.setKeyHeights_();
          });
        }
      }, {
        key: "setKeyHeights_",
        value: function setKeyHeights_() {
          var e = this.getRowHeight_();e !== this.calculations_.toolbarRowHeight && (this.calculations_.toolbarRowHeight = e, this.calculations_.toolbarHeight = this.calculations_.toolbarRatio * this.calculations_.toolbarRowHeight, this.calculations_.flexibleExpansionHeight = this.calculations_.flexibleExpansionRatio * this.calculations_.toolbarRowHeight, this.calculations_.maxTranslateYDistance = this.calculations_.maxTranslateYRatio * this.calculations_.toolbarRowHeight, this.calculations_.scrollTheshold = this.calculations_.scrollThesholdRatio * this.calculations_.toolbarRowHeight, this.updateAdjustElementStyles(), this.updateToolbarStyles_());
        }
      }, {
        key: "updateToolbarStyles_",
        value: function updateToolbarStyles_() {
          var _this44 = this;

          cancelAnimationFrame(this.scrollFrame_), this.scrollFrame_ = requestAnimationFrame(function () {
            var e = _this44.adapter_.getViewportScrollY();var t = _this44.scrolledOutOfTheshold_(e);if (t && _this44.executedLastChange_) return;var n = _this44.getFlexibleExpansionRatio_(e);_this44.updateToolbarFlexibleState_(n);_this44.fixedLastrow_ && _this44.updateToolbarFixedState_(e);_this44.hasFlexibleRow_ && _this44.updateFlexibleRowElementStyles_(n);_this44.executedLastChange_ = t;_this44.adapter_.notifyChange({ flexibleExpansionRatio: n });
          });
        }
      }, {
        key: "scrolledOutOfTheshold_",
        value: function scrolledOutOfTheshold_(e) {
          return e > this.calculations_.scrollTheshold;
        }
      }, {
        key: "initKeyRatio_",
        value: function initKeyRatio_() {
          var e = this.getRowHeight_(),
              t = this.adapter_.getFlexibleRowElementOffsetHeight() / e;this.calculations_.toolbarRatio = this.adapter_.getOffsetHeight() / e, this.calculations_.flexibleExpansionRatio = t - 1, this.calculations_.maxTranslateYRatio = this.fixedLastrow_ ? this.calculations_.toolbarRatio - t : 0, this.calculations_.scrollThesholdRatio = (this.fixedLastrow_ ? this.calculations_.toolbarRatio : t) - 1;
        }
      }, {
        key: "getRowHeight_",
        value: function getRowHeight_() {
          var e = r.numbers.TOOLBAR_MOBILE_BREAKPOINT;return this.adapter_.getViewportWidth() <= e ? r.numbers.TOOLBAR_ROW_MOBILE_HEIGHT : r.numbers.TOOLBAR_ROW_HEIGHT;
        }
      }, {
        key: "updateToolbarFlexibleState_",
        value: function updateToolbarFlexibleState_(e) {
          this.adapter_.removeClass(r.cssClasses.FLEXIBLE_MAX), this.adapter_.removeClass(r.cssClasses.FLEXIBLE_MIN), 1 === e ? this.adapter_.addClass(r.cssClasses.FLEXIBLE_MAX) : 0 === e && this.adapter_.addClass(r.cssClasses.FLEXIBLE_MIN);
        }
      }, {
        key: "updateToolbarFixedState_",
        value: function updateToolbarFixedState_(e) {
          var t = Math.max(0, Math.min(e - this.calculations_.flexibleExpansionHeight, this.calculations_.maxTranslateYDistance));this.adapter_.setStyle("transform", "translateY(" + -t + "px)"), t === this.calculations_.maxTranslateYDistance ? this.adapter_.addClass(r.cssClasses.FIXED_AT_LAST_ROW) : this.adapter_.removeClass(r.cssClasses.FIXED_AT_LAST_ROW);
        }
      }, {
        key: "updateFlexibleRowElementStyles_",
        value: function updateFlexibleRowElementStyles_(e) {
          if (this.fixed_) {
            var _t5 = this.calculations_.flexibleExpansionHeight * e;this.adapter_.setStyleForFlexibleRowElement("height", _t5 + this.calculations_.toolbarRowHeight + "px");
          }this.useFlexDefaultBehavior_ && this.updateElementStylesDefaultBehavior_(e);
        }
      }, {
        key: "updateElementStylesDefaultBehavior_",
        value: function updateElementStylesDefaultBehavior_(e) {
          var t = r.numbers.MAX_TITLE_SIZE,
              n = r.numbers.MIN_TITLE_SIZE,
              i = (t - n) * e + n;if (this.fixed_) {
            var _t6 = this.calculations_.flexibleExpansionHeight * e;this.adapter_.setStyleForTitleElement("transform", "translateY(" + _t6 + "px)");
          }this.adapter_.setStyleForTitleElement("font-size", i + "rem");
        }
      }]);

      return r;
    }(i.a);

    t.a = r;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = n(1),
        o = n(49),
        r = n(51);n.d(t, "MDCToolbarFoundation", function () {
      return o.a;
    }), n.d(t, "util", function () {
      return r;
    });
    var a = function (_i$a9) {
      _inherits(a, _i$a9);

      function a() {
        _classCallCheck(this, a);

        return _possibleConstructorReturn(this, (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments));
      }

      _createClass(a, [{
        key: "getDefaultFoundation",
        value: function getDefaultFoundation() {
          var _this46 = this;

          return new o.a({ hasClass: function hasClass(e) {
              return _this46.root_.classList.contains(e);
            }, addClass: function addClass(e) {
              return _this46.root_.classList.add(e);
            }, removeClass: function removeClass(e) {
              return _this46.root_.classList.remove(e);
            }, registerScrollHandler: function registerScrollHandler(e) {
              return window.addEventListener("scroll", e, r.applyPassive());
            }, deregisterScrollHandler: function deregisterScrollHandler(e) {
              return window.removeEventListener("scroll", e, r.applyPassive());
            }, registerResizeHandler: function registerResizeHandler(e) {
              return window.addEventListener("resize", e);
            }, deregisterResizeHandler: function deregisterResizeHandler(e) {
              return window.removeEventListener("resize", e);
            }, getViewportWidth: function getViewportWidth() {
              return window.innerWidth;
            }, getViewportScrollY: function getViewportScrollY() {
              return window.pageYOffset;
            }, getOffsetHeight: function getOffsetHeight() {
              return _this46.root_.offsetHeight;
            }, getFlexibleRowElementOffsetHeight: function getFlexibleRowElementOffsetHeight() {
              return _this46.flexibleRowElement_.offsetHeight;
            }, notifyChange: function notifyChange(e) {
              return _this46.emit(o.a.strings.CHANGE_EVENT, e);
            }, setStyle: function setStyle(e, t) {
              return _this46.root_.style.setProperty(e, t);
            }, setStyleForTitleElement: function setStyleForTitleElement(e, t) {
              return _this46.titleElement_.style.setProperty(e, t);
            }, setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement(e, t) {
              return _this46.flexibleRowElement_.style.setProperty(e, t);
            }, setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement(e, t) {
              _this46.fixedAdjustElement && _this46.fixedAdjustElement.style.setProperty(e, t);
            } });
        }
      }, {
        key: "flexibleRowElement_",
        get: function get() {
          return this.root_.querySelector(o.a.strings.FLEXIBLE_ROW_SELECTOR);
        }
      }, {
        key: "titleElement_",
        get: function get() {
          return this.root_.querySelector(o.a.strings.TITLE_SELECTOR);
        }
      }, {
        key: "fixedAdjustElement",
        set: function set(e) {
          this.fixedAdjustElement_ = e, this.foundation_.updateAdjustElementStyles();
        },
        get: function get() {
          return this.fixedAdjustElement_;
        }
      }], [{
        key: "attachTo",
        value: function attachTo(e) {
          return new a(e);
        }
      }]);

      return a;
    }(i.a);

    t.MDCToolbar = a;
  }, function (e, t, n) {
    "use strict";
    function i() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if (void 0 === o || t) {
        var _t7 = !1;try {
          e.document.addEventListener("test", null, { get passive() {
              _t7 = !0;
            } });
        } catch (e) {}o = _t7;
      }return !!o && { passive: !0 };
    }Object.defineProperty(t, "__esModule", { value: !0 }), t.applyPassive = i;var o = void 0;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        a = this && this.__decorate || function (e, t, n, i) {
      var o,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(t, n, c) : o(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        c = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var s = n(0),
        d = n(5),
        l = n(89),
        p = function () {
      function e(t, n, o) {
        i(this, e), this._renderer = t, this._root = n, this._ripple = o, this.className = "mdc-button";
      }return o(e, [{ key: "onkeydown", value: function value(e) {
          this.handleKeyboardDown_(e);
        } }, { key: "onkeyup", value: function value(e) {
          this.handleKeyboardUp_(e);
        } }, { key: "handleKeyboardDown_", value: function value(e) {
          var t = e.keyCode,
              n = e.key,
              i = "Space" === n || 32 === t,
              o = "Enter" === n || 13 === t;(i || o) && (this._ripple.active = !0, e.preventDefault());
        } }, { key: "handleKeyboardUp_", value: function value(e) {
          var t = e.keyCode,
              n = e.key,
              i = "Space" === n || 32 === t,
              o = "Enter" === n || 13 === t;(i || o) && (this._ripple.active = !1, e.preventDefault());
        } }, { key: "tabindex", get: function get() {
          return this.disabled ? -1 : 0;
        } }, { key: "attrType", get: function get() {
          return this.type ? this.type : "button";
        } }, { key: "classRaised", get: function get() {
          return this.raised ? "mdc-button--raised" : "";
        } }, { key: "classPrimary", get: function get() {
          return this.primary ? "mdc-button--primary" : "";
        } }, { key: "classAccent", get: function get() {
          return this.accent ? "mdc-button--accent" : "";
        } }, { key: "classDense", get: function get() {
          return this.dense ? "mdc-button--dense" : "";
        } }, { key: "classCompact", get: function get() {
          return this.compact ? "mdc-button--compact" : "";
        } }]), e;
    }();a([s.Input(), c("design:type", String)], p.prototype, "type", void 0), a([s.Input(), c("design:type", String)], p.prototype, "disabled", void 0), a([s.Input(), c("design:type", Boolean)], p.prototype, "raised", void 0), a([s.Input(), c("design:type", Boolean)], p.prototype, "primary", void 0), a([s.Input(), c("design:type", Boolean)], p.prototype, "dense", void 0), a([s.Input(), c("design:type", Boolean)], p.prototype, "compact", void 0), a([s.Input(), c("design:type", Boolean)], p.prototype, "accent", void 0), a([s.HostBinding("tabindex"), c("design:type", Number), c("design:paramtypes", [])], p.prototype, "tabindex", null), a([s.HostBinding("attr.type"), c("design:type", String), c("design:paramtypes", [])], p.prototype, "attrType", null), a([s.HostBinding("class"), c("design:type", String)], p.prototype, "className", void 0), a([s.HostBinding("class.mdc-button--raised"), c("design:type", String), c("design:paramtypes", [])], p.prototype, "classRaised", null), a([s.HostBinding("class.mdc-button--primary"), c("design:type", String), c("design:paramtypes", [])], p.prototype, "classPrimary", null), a([s.HostBinding("class.mdc-button--accent"), c("design:type", String), c("design:paramtypes", [])], p.prototype, "classAccent", null), a([s.HostBinding("class.mdc-button--dense"), c("design:type", String), c("design:paramtypes", [])], p.prototype, "classDense", null), a([s.HostBinding("class.mdc-button--compact"), c("design:type", String), c("design:paramtypes", [])], p.prototype, "classCompact", null), a([s.HostListener("keydown", ["$event"]), c("design:type", Function), c("design:paramtypes", [Object]), c("design:returntype", void 0)], p.prototype, "onkeydown", null), a([s.HostListener("keyup", ["$event"]), c("design:type", Function), c("design:paramtypes", [Object]), c("design:returntype", void 0)], p.prototype, "onkeyup", null), p = a([s.Component({ selector: "button[mdc-button]", styles: [String(l)], template: "<ng-content></ng-content>", encapsulation: s.ViewEncapsulation.None, changeDetection: s.ChangeDetectionStrategy.OnPush, providers: [d.Ripple] }), c("design:paramtypes", [s.Renderer2, s.ElementRef, d.Ripple])], p), t.ButtonComponent = p;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        a = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var c = n(0),
        s = function e() {
      i(this, e), this.className = "mdc-checkbox-label";
    };r([c.HostBinding("class"), a("design:type", String)], s.prototype, "className", void 0), r([c.Input(), a("design:type", String)], s.prototype, "id", void 0), s = r([c.Directive({ selector: "[mdc-checkbox-label]" })], s), t.CheckboxLabelDirective = s;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        a = this && this.__decorate || function (e, t, n, i) {
      var o,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(t, n, c) : o(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        c = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var s = n(0),
        d = n(4),
        l = n(5),
        p = n(29).MDCCheckboxFoundation,
        m = n(90);t.MD_CHECKBOX_CONTROL_VALUE_ACCESSOR = { provide: d.NG_VALUE_ACCESSOR, useExisting: s.forwardRef(function () {
        return u;
      }), multi: !0 };var u = function () {
      function e(t, n, o) {
        var r = this;i(this, e), this._renderer = t, this._root = n, this._ripple = o, this.checked = !1, this.indeterminate = !1, this.change = new s.EventEmitter(), this.className = "mdc-checkbox", this.onTouched = function () {}, this._controlValueAccessorChangeFn = function (e) {}, this._unlisteners = new Map(), this._mdcAdapter = { addClass: function addClass(e) {
            var t = r._renderer,
                n = r._root;t.addClass(n.nativeElement, e);
          }, removeClass: function removeClass(e) {
            var t = r._renderer,
                n = r._root;t.removeClass(n.nativeElement, e);
          }, registerAnimationEndHandler: function registerAnimationEndHandler(e) {
            r._root && r.listen_("animationend", e);
          }, deregisterAnimationEndHandler: function deregisterAnimationEndHandler(e) {
            r.unlisten_("animationend", e);
          }, registerChangeHandler: function registerChangeHandler(e) {
            r._root && r.listen_("change", e, r.nativeCb);
          }, deregisterChangeHandler: function deregisterChangeHandler(e) {
            r.unlisten_("change", e);
          }, getNativeControl: function getNativeControl() {
            var e = r.nativeCb;if (!e) throw new Error("Invalid state");return e.nativeElement;
          }, forceLayout: function forceLayout() {
            if (r._root) return r._root.nativeElement.offsetWidth;
          }, isAttachedToDOM: function isAttachedToDOM() {
            return Boolean(r._root);
          } }, this._foundation = new p(this._mdcAdapter);
      }return o(e, [{ key: "ngAfterViewInit", value: function value() {
          this._foundation.init(), this._ripple.unbounded = !0;
        } }, { key: "ngOnDestroy", value: function value() {
          this._foundation.destroy();
        } }, { key: "handleChange", value: function value(e) {
          e.stopPropagation(), this._controlValueAccessorChangeFn(e.target.checked), this.change.emit(e);
        } }, { key: "writeValue", value: function value(e) {
          this.checked = !!e;
        } }, { key: "registerOnChange", value: function value(e) {
          this._controlValueAccessorChangeFn = e;
        } }, { key: "registerOnTouched", value: function value(e) {
          this.onTouched = e;
        } }, { key: "listen_", value: function value(e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this._root;this._unlisteners.has(e) || this._unlisteners.set(e, new WeakMap());var i = this._renderer.listen(n.nativeElement, e, t);this._unlisteners.get(e).set(t, i);
        } }, { key: "unlisten_", value: function value(e, t) {
          if (this._unlisteners.has(e)) {
            var n = this._unlisteners.get(e);n.has(t) && (n.get(t)(), n.delete(t));
          }
        } }, { key: "classDisabled", get: function get() {
          return this.disabled ? this._renderer.setAttribute(this.nativeCb.nativeElement, "disabled", "") : this._renderer.removeAttribute(this.nativeCb.nativeElement, "disabled"), this.disabled ? "mdc-checkbox--disabled" : "";
        } }]), e;
    }();a([s.Input(), c("design:type", Boolean)], u.prototype, "checked", void 0), a([s.Input(), c("design:type", Boolean)], u.prototype, "indeterminate", void 0), a([s.Input(), c("design:type", String)], u.prototype, "labelId", void 0), a([s.Input(), c("design:type", Boolean)], u.prototype, "disabled", void 0), a([s.Output(), c("design:type", s.EventEmitter)], u.prototype, "change", void 0), a([s.HostBinding("class"), c("design:type", String)], u.prototype, "className", void 0), a([s.HostBinding("class.mdc-checkbox--disabled"), c("design:type", String), c("design:paramtypes", [])], u.prototype, "classDisabled", null), a([s.ViewChild("nativeCb"), c("design:type", s.ElementRef)], u.prototype, "nativeCb", void 0), u = a([s.Component({ selector: "mdc-checkbox", template: n(83), styles: [String(m)], encapsulation: s.ViewEncapsulation.None, changeDetection: s.ChangeDetectionStrategy.OnPush, providers: [t.MD_CHECKBOX_CONTROL_VALUE_ACCESSOR, l.Ripple] }), c("design:paramtypes", [s.Renderer2, s.ElementRef, l.Ripple])], u), t.CheckboxComponent = u;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        a = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var c = n(0),
        s = function e() {
      i(this, e), this.className = "mdc-fab__icon";
    };r([c.Input(), a("design:type", String)], s.prototype, "id", void 0), r([c.HostBinding("class"), a("design:type", String)], s.prototype, "className", void 0), s = r([c.Directive({ selector: "[mdc-fab-icon]" })], s), t.FabIconDirective = s;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        a = this && this.__decorate || function (e, t, n, i) {
      var o,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(t, n, c) : o(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        c = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var s = n(0),
        d = n(5),
        l = n(91),
        p = function () {
      function e(t, n, o) {
        i(this, e), this._renderer = t, this._root = n, this._ripple = o, this.className = "mdc-fab", this.classMaterialIcons = "material-icons";
      }return o(e, [{ key: "onkeydown", value: function value(e) {
          this.handleKeyboardDown_(e);
        } }, { key: "onkeyup", value: function value(e) {
          this.handleKeyboardUp_(e);
        } }, { key: "handleKeyboardDown_", value: function value(e) {
          var t = e.keyCode,
              n = e.key,
              i = "Space" === n || 32 === t,
              o = "Enter" === n || 13 === t;(i || o) && (this._ripple.active = !0, e.preventDefault());
        } }, { key: "handleKeyboardUp_", value: function value(e) {
          var t = e.keyCode,
              n = e.key,
              i = "Space" === n || 32 === t,
              o = "Enter" === n || 13 === t;(i || o) && (this._ripple.active = !1, e.preventDefault());
        } }, { key: "tabindex", get: function get() {
          return this.disabled ? -1 : 0;
        } }, { key: "classMini", get: function get() {
          return this.mini ? "mdc-fab--mini" : "";
        } }, { key: "classPlain", get: function get() {
          return this.plain ? "mdc-fab--plain" : "";
        } }]), e;
    }();a([s.Input(), c("design:type", String)], p.prototype, "disabled", void 0), a([s.Input(), c("design:type", Boolean)], p.prototype, "mini", void 0), a([s.Input(), c("design:type", Boolean)], p.prototype, "plain", void 0), a([s.HostBinding("tabindex"), c("design:type", Number), c("design:paramtypes", [])], p.prototype, "tabindex", null), a([s.HostBinding("class"), c("design:type", String)], p.prototype, "className", void 0), a([s.HostBinding("class.material-icons"), c("design:type", String)], p.prototype, "classMaterialIcons", void 0), a([s.HostBinding("class.mdc-fab--mini"), c("design:type", String), c("design:paramtypes", [])], p.prototype, "classMini", null), a([s.HostBinding("class.mdc-fab--plain"), c("design:type", String), c("design:paramtypes", [])], p.prototype, "classPlain", null), a([s.HostListener("keydown", ["$event"]), c("design:type", Function), c("design:paramtypes", [Object]), c("design:returntype", void 0)], p.prototype, "onkeydown", null), a([s.HostListener("keyup", ["$event"]), c("design:type", Function), c("design:paramtypes", [Object]), c("design:returntype", void 0)], p.prototype, "onkeyup", null), p = a([s.Component({ selector: "button[mdc-fab]", styles: [String(l)], template: "<ng-content></ng-content>", encapsulation: s.ViewEncapsulation.None, changeDetection: s.ChangeDetectionStrategy.OnPush, providers: [d.Ripple] }), c("design:paramtypes", [s.Renderer2, s.ElementRef, d.Ripple])], p), t.FabComponent = p;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        a = this && this.__decorate || function (e, t, n, i) {
      var o,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(t, n, c) : o(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        c = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var s = n(0),
        d = n(32).MDCFormFieldFoundation,
        l = n(92),
        p = function () {
      function e(t, n) {
        var o = this;i(this, e), this._renderer = t, this._root = n, this.alignEnd = !1, this._unlisteners = new Map(), this._mdcAdapter = { registerInteractionHandler: function registerInteractionHandler(e, t) {
            o._root && o.listen_(e, t);
          }, deregisterInteractionHandler: function deregisterInteractionHandler(e, t) {
            o.unlisten_(e, t);
          }, activateInputRipple: function activateInputRipple() {}, deactivateInputRipple: function deactivateInputRipple() {} }, this._foundation = new d(this._mdcAdapter);
      }return o(e, [{ key: "ngAfterViewInit", value: function value() {
          this._foundation.init();
        } }, { key: "ngOnDestroy", value: function value() {
          this._foundation.destroy();
        } }, { key: "listen_", value: function value(e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this._root;this._unlisteners.has(e) || this._unlisteners.set(e, new WeakMap());var i = this._renderer.listen(n.nativeElement, e, t);this._unlisteners.get(e).set(t, i);
        } }, { key: "unlisten_", value: function value(e, t) {
          if (this._unlisteners.has(e)) {
            var n = this._unlisteners.get(e);n.has(t) && (n.get(t)(), n.delete(t));
          }
        } }, { key: "className", get: function get() {
          return "mdc-form-field" + (this.alignEnd ? " mdc-form-field--align-end" : "");
        } }]), e;
    }();a([s.Input(), c("design:type", Boolean)], p.prototype, "alignEnd", void 0), a([s.HostBinding("class"), c("design:type", String), c("design:paramtypes", [])], p.prototype, "className", null), p = a([s.Component({ selector: "mdc-form-field", styles: [String(l)], template: "<ng-content></ng-content>", encapsulation: s.ViewEncapsulation.None }), c("design:paramtypes", [s.Renderer2, s.ElementRef])], p), t.FormFieldComponent = p;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function o(e) {
      for (var n in e) {
        t.hasOwnProperty(n) || (t[n] = e[n]);
      }
    }var r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        a = this && this.__decorate || function (e, t, n, i) {
      var o,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(t, n, c) : o(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    };Object.defineProperty(t, "__esModule", { value: !0 });var c = n(0),
        s = n(8),
        d = n(9),
        l = n(10),
        p = n(11),
        m = n(12),
        u = n(13),
        f = n(14),
        h = n(15),
        g = n(16),
        b = n(17),
        y = n(18),
        _ = n(19);o(n(8)), o(n(9)), o(n(10)), o(n(11)), o(n(12)), o(n(13)), o(n(14)), o(n(15)), o(n(16)), o(n(17)), o(n(18)), o(n(19));var v = [s.ButtonModule, d.CheckboxModule, l.FabModule, p.FormFieldModule, m.LinearProgressModule, u.MenuModule, f.RippleModule, h.SnackbarModule, g.SwitchModule, b.TextfieldModule, y.ToolbarModule, _.TypographyModule],
        x = function e() {
      i(this, e);
    };x = a([c.NgModule({ imports: [v], exports: [v] })], x), t.MaterialModule = x;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        a = this && this.__decorate || function (e, t, n, i) {
      var o,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(t, n, c) : o(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        c = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var s = n(0),
        d = n(35).MDCLinearProgressFoundation,
        l = n(93),
        p = function () {
      function e(t, n) {
        var o = this;i(this, e), this._renderer = t, this._root = n, this.role = "progressbar", this.className = "mdc-linear-progress", this._mdcAdapter = { addClass: function addClass(e) {
            var t = o._renderer,
                n = o._root;t.addClass(n.nativeElement, e);
          }, getPrimaryBar: function getPrimaryBar() {
            return o._root.nativeElement.querySelector(d.strings.PRIMARY_BAR_SELECTOR);
          }, getBuffer: function getBuffer() {
            return o._root.nativeElement.querySelector(d.strings.BUFFER_SELECTOR);
          }, hasClass: function hasClass(e) {
            var t = o._renderer,
                n = o._root;return t.parentNode(n.nativeElement).classList.contains(e);
          }, removeClass: function removeClass(e) {
            var t = o._renderer,
                n = o._root;t.removeClass(n.nativeElement, e);
          }, setStyle: function setStyle(e, t, n) {
            o._renderer.setStyle(e, t, n);
          } }, this._foundation = new d(this._mdcAdapter);
      }return o(e, [{ key: "ngAfterViewInit", value: function value() {
          this._foundation.init();
        } }, { key: "open", value: function value() {
          this._foundation.open();
        } }, { key: "close", value: function value() {
          this._foundation.close();
        } }, { key: "buffer", set: function set(e) {
          this._foundation.setBuffer(e);
        } }, { key: "progress", set: function set(e) {
          this._foundation.setProgress(e);
        } }, { key: "classIndeterminate", get: function get() {
          return this.indeterminate ? "mdc-linear-progress--indeterminate" : "";
        } }, { key: "classReversed", get: function get() {
          return this.reversed ? "mdc-linear-progress--reversed" : "";
        } }, { key: "classAccent", get: function get() {
          return this.accent ? "mdc-linear-progress--accent" : "";
        } }]), e;
    }();a([s.Input(), c("design:type", Boolean)], p.prototype, "indeterminate", void 0), a([s.Input(), c("design:type", Boolean)], p.prototype, "reversed", void 0), a([s.Input(), c("design:type", Boolean)], p.prototype, "accent", void 0), a([s.Input(), c("design:type", Number), c("design:paramtypes", [Number])], p.prototype, "buffer", null), a([s.Input(), c("design:type", Number), c("design:paramtypes", [Number])], p.prototype, "progress", null), a([s.HostBinding("attr.role"), c("design:type", String)], p.prototype, "role", void 0), a([s.HostBinding("class"), c("design:type", String)], p.prototype, "className", void 0), a([s.HostBinding("class.mdc-linear-progress--indeterminate"), c("design:type", String), c("design:paramtypes", [])], p.prototype, "classIndeterminate", null), a([s.HostBinding("class.mdc-linear-progress--reversed"), c("design:type", String), c("design:paramtypes", [])], p.prototype, "classReversed", null), a([s.HostBinding("class.mdc-linear-progress--accent"), c("design:type", String), c("design:paramtypes", [])], p.prototype, "classAccent", null), p = a([s.Component({ selector: "mdc-linear-progress", template: n(84), styles: [String(l)], encapsulation: s.ViewEncapsulation.None }), c("design:paramtypes", [s.Renderer2, s.ElementRef])], p), t.LinearProgressComponent = p;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        a = this && this.__decorate || function (e, t, n, i) {
      var o,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(t, n, c) : o(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        c = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var s = n(0),
        d = n(24),
        l = n(36).MDCSimpleMenuFoundation,
        p = n(21).getTransformPropertyName,
        m = n(95),
        u = (n(94), function () {
      function e(t, n) {
        var o = this;i(this, e), this._renderer = t, this._root = n, this.cancel = new s.EventEmitter(), this.select = new s.EventEmitter(), this.className = "mdc-simple-menu", this.tabindex = -1, this._unlisteners = new Map(), this._mdcAdapter = { addClass: function addClass(e) {
            var t = o._renderer,
                n = o._root;t.addClass(n.nativeElement, e);
          }, removeClass: function removeClass(e) {
            var t = o._renderer,
                n = o._root;t.removeClass(n.nativeElement, e);
          }, hasClass: function hasClass(e) {
            return o._root.nativeElement.classList.contains(e);
          }, hasNecessaryDom: function hasNecessaryDom() {
            return Boolean(o.itemsContainerEl);
          }, getInnerDimensions: function getInnerDimensions() {
            var e = o._root;return { width: e.nativeElement.offsetWidth, height: e.nativeElement.offsetHeight };
          }, hasAnchor: function hasAnchor() {
            var e = o._renderer,
                t = o._root;return e.parentNode(t.nativeElement) && e.parentNode(t.nativeElement).classList.contains("mdc-menu-anchor");
          }, getAnchorDimensions: function getAnchorDimensions() {
            var e = o._renderer,
                t = o._root;return e.parentNode(t.nativeElement).getBoundingClientRect();
          }, getWindowDimensions: function getWindowDimensions() {
            return { width: window.innerWidth, height: window.innerHeight };
          }, setScale: function setScale(e, t) {
            var n = o._renderer,
                i = o._root;n.setStyle(i.nativeElement, p(window), "scale(" + e + ", " + t + ")");
          }, setInnerScale: function setInnerScale(e, t) {
            if (o.itemsContainerEl) {
              var n = o._renderer;o._root;n.setStyle(o.itemsContainerEl.nativeElement, p(window), "scale(" + e + ", " + t + ")");
            }
          }, getNumberOfItems: function getNumberOfItems() {
            return o.items ? o.items.length : 0;
          }, registerInteractionHandler: function registerInteractionHandler(e, t) {
            o._root && o.listen_(e, t, o._root.nativeElement);
          }, deregisterInteractionHandler: function deregisterInteractionHandler(e, t) {
            o.unlisten_(e, t);
          }, registerDocumentClickHandler: function registerDocumentClickHandler(e) {
            o._root && o.listen_("click", e, o._root.nativeElement.ownerDocument);
          }, deregisterDocumentClickHandler: function deregisterDocumentClickHandler(e) {
            o.unlisten_("click", e);
          }, getYParamsForItemAtIndex: function getYParamsForItemAtIndex(e) {
            var t = o.menuItems.toArray()[e].root.nativeElement;return { top: t.offsetTop, height: t.offsetHeight };
          }, setTransitionDelayForItemAtIndex: function setTransitionDelayForItemAtIndex(e, t) {
            var n = o._renderer;o._root;n.setStyle(o.menuItems.toArray()[e].root.nativeElement, "transition-delay", t);
          }, getIndexForEventTarget: function getIndexForEventTarget(e) {
            return e.attributes.id ? o.items.findIndex(function (t) {
              return t.id == e.attributes.id.value;
            }) : -1;
          }, notifySelected: function notifySelected(e) {
            o.select.emit(e.index);
          }, notifyCancel: function notifyCancel() {
            o.cancel.emit();
          }, saveFocus: function saveFocus() {}, restoreFocus: function restoreFocus() {}, isFocused: function isFocused() {
            var e = o._root;return e.nativeElement.ownerDocument.activeElement === e.nativeElement;
          }, focus: function focus() {
            o._root.nativeElement.focus();
          }, getFocusedItemIndex: function getFocusedItemIndex() {
            var e = o._root;return o.menuItems.length ? o.menuItems.toArray().findIndex(function (t) {
              return t.root.nativeElement === e.nativeElement.ownerDocument.activeElement;
            }) : -1;
          }, focusItemAtIndex: function focusItemAtIndex(e) {
            var t = o._root;void 0 !== o.menuItems.toArray()[e] ? o.menuItems.toArray()[e].root.nativeElement.focus() : t.nativeElement.focus();
          }, isRtl: function isRtl() {
            return !1;
          }, setTransformOrigin: function setTransformOrigin(e) {
            var t = o._renderer,
                n = o._root;t.setStyle(n.nativeElement, p(window) + "-origin", e);
          }, setPosition: function setPosition(e) {
            var t = o._renderer,
                n = o._root;e.left ? t.setStyle(n.nativeElement, "left", 0) : t.removeStyle(n.nativeElement, "left"), e.right ? t.setStyle(n.nativeElement, "right", 0) : t.removeStyle(n.nativeElement, "right"), e.top ? t.setStyle(n.nativeElement, "top", 0) : t.removeStyle(n.nativeElement, "top"), e.bottom ? t.setStyle(n.nativeElement, "bottom", 0) : t.removeStyle(n.nativeElement, "bottom");
          }, getAccurateTime: function getAccurateTime() {
            return window.performance.now();
          } }, this._foundation = new l(this._mdcAdapter);
      }return o(e, [{ key: "ngAfterViewInit", value: function value() {
          this._foundation.init();
        } }, { key: "ngOnDestroy", value: function value() {
          this._foundation.destroy();
        } }, { key: "isOpen", value: function value() {
          return this._foundation.isOpen();
        } }, { key: "open", value: function value(e) {
          this.isOpen() || this._foundation.open({ focusIndex: e });
        } }, { key: "close", value: function value() {
          this._foundation.close();
        } }, { key: "listen_", value: function value(e, t, n) {
          this._unlisteners.has(e) || this._unlisteners.set(e, new WeakMap());var i = this._renderer.listen(n, e, t);this._unlisteners.get(e).set(t, i);
        } }, { key: "unlisten_", value: function value(e, t) {
          if (this._unlisteners.has(e)) {
            var n = this._unlisteners.get(e);n.has(t) && (n.get(t)(), n.delete(t));
          }
        } }]), e;
    }());a([s.Input(), c("design:type", Array)], u.prototype, "items", void 0), a([s.Output(), c("design:type", s.EventEmitter)], u.prototype, "cancel", void 0), a([s.Output(), c("design:type", s.EventEmitter)], u.prototype, "select", void 0), a([s.HostBinding("class"), c("design:type", String)], u.prototype, "className", void 0), a([s.HostBinding("tabindex"), c("design:type", Number)], u.prototype, "tabindex", void 0), a([s.ViewChild("itemsContainer"), c("design:type", s.ElementRef)], u.prototype, "itemsContainerEl", void 0), a([s.ViewChildren(d.MenuItemDirective), c("design:type", s.QueryList)], u.prototype, "menuItems", void 0), u = a([s.Component({ selector: "mdc-menu", template: n(85), styles: [String(m)], encapsulation: s.ViewEncapsulation.None }), c("design:paramtypes", [s.Renderer2, s.ElementRef])], u), t.MenuComponent = u;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        a = this && this.__decorate || function (e, t, n, i) {
      var o,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(t, n, c) : o(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        c = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var s = n(0),
        d = n(44).MDCSnackbarFoundation,
        l = n(6).getCorrectEventName,
        p = n(97),
        m = function () {
      function e(t, n) {
        var o = this;i(this, e), this._renderer = t, this._root = n, this.className = "mdc-snackbar", this.ariaLive = "assertive", this.ariaAtomic = "true", this.ariaHidden = "true", this._unlisteners = new Map(), this._mdcAdapter = { addClass: function addClass(e) {
            var t = o._renderer,
                n = o._root;t.addClass(n.nativeElement, e);
          }, removeClass: function removeClass(e) {
            var t = o._renderer,
                n = o._root;t.removeClass(n.nativeElement, e);
          }, setAriaHidden: function setAriaHidden() {
            var e = o._renderer,
                t = o._root;e.setAttribute(t.nativeElement, "aria-hidden", "true");
          }, unsetAriaHidden: function unsetAriaHidden() {
            var e = o._renderer,
                t = o._root;e.removeAttribute(t.nativeElement, "aria-hidden");
          }, setMessageText: function setMessageText(e) {
            o.message = e;
          }, setActionText: function setActionText(e) {
            o.actionText = e;
          }, setActionAriaHidden: function setActionAriaHidden() {
            var e = o._renderer,
                t = o._root;e.setAttribute(t.nativeElement.querySelector(d.strings.ACTION_BUTTON_SELECTOR), "aria-hidden", "true");
          }, unsetActionAriaHidden: function unsetActionAriaHidden() {
            var e = o._renderer,
                t = o._root;e.removeAttribute(t.nativeElement.querySelector(d.strings.ACTION_BUTTON_SELECTOR), "aria-hidden");
          }, registerActionClickHandler: function registerActionClickHandler(e) {
            o._root && o.listen_("click", e);
          }, deregisterActionClickHandler: function deregisterActionClickHandler(e) {
            o.unlisten_("click", e);
          }, registerTransitionEndHandler: function registerTransitionEndHandler(e) {
            o._root && o.listen_(l(window, "transitionend"), e);
          }, deregisterTransitionEndHandler: function deregisterTransitionEndHandler(e) {
            o.unlisten_(l(window, "transitionend"), e);
          } }, this._foundation = new d(this._mdcAdapter);
      }return o(e, [{ key: "ngAfterViewInit", value: function value() {
          this._foundation.init();
        } }, { key: "ngOnDestroy", value: function value() {
          this._foundation.destroy();
        } }, { key: "show", value: function value(e) {
          this._foundation.show(e);
        } }, { key: "listen_", value: function value(e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this._root;this._unlisteners.has(e) || this._unlisteners.set(e, new WeakMap());var i = this._renderer.listen(n.nativeElement, e, t);this._unlisteners.get(e).set(t, i);
        } }, { key: "unlisten_", value: function value(e, t) {
          if (this._unlisteners.has(e)) {
            var n = this._unlisteners.get(e);n.has(t) && (n.get(t)(), n.delete(t));
          }
        } }, { key: "dismissOnAction", set: function set(e) {
          this._foundation.setDismissOnAction(e);
        } }]), e;
    }();a([s.Input("dismissOnAction"), c("design:type", Boolean), c("design:paramtypes", [Boolean])], m.prototype, "dismissOnAction", null), a([s.HostBinding("class"), c("design:type", String)], m.prototype, "className", void 0), a([s.HostBinding("attr.aria-live"), c("design:type", String)], m.prototype, "ariaLive", void 0), a([s.HostBinding("attr.aria-atomic"), c("design:type", String)], m.prototype, "ariaAtomic", void 0), a([s.HostBinding("attr.aria-hidden"), c("design:type", String)], m.prototype, "ariaHidden", void 0), m = a([s.Component({ selector: "mdc-snackbar", template: n(86), styles: [String(p)], encapsulation: s.ViewEncapsulation.None }), c("design:paramtypes", [s.Renderer2, s.ElementRef])], m), t.SnackbarComponent = m;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        a = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var c = n(0),
        s = function e() {
      i(this, e), this.className = "mdc-switch-label";
    };r([c.Input(), a("design:type", String)], s.prototype, "id", void 0), r([c.HostBinding("class"), a("design:type", String)], s.prototype, "className", void 0), s = r([c.Directive({ selector: "[mdc-switch-label]" })], s), t.SwitchLabelDirective = s;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        a = this && this.__decorate || function (e, t, n, i) {
      var o,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(t, n, c) : o(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        c = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var s = n(0),
        d = n(4),
        l = n(5),
        p = n(98);t.MD_SWITCH_CONTROL_VALUE_ACCESSOR = { provide: d.NG_VALUE_ACCESSOR, useExisting: s.forwardRef(function () {
        return m;
      }), multi: !0 };var m = function () {
      function e(t, n, o) {
        i(this, e), this._renderer = t, this._root = n, this._ripple = o, this.change = new s.EventEmitter(), this.className = "mdc-switch", this.onTouched = function () {}, this._controlValueAccessorChangeFn = function (e) {}, this._unlisteners = new Map();
      }return o(e, [{ key: "handleChange", value: function value(e) {
          e.stopPropagation(), this._controlValueAccessorChangeFn(e.target.checked), this.change.emit(e);
        } }, { key: "writeValue", value: function value(e) {
          this.checked = !!e;
        } }, { key: "registerOnChange", value: function value(e) {
          this._controlValueAccessorChangeFn = e;
        } }, { key: "registerOnTouched", value: function value(e) {
          this.onTouched = e;
        } }, { key: "listen_", value: function value(e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this._root;this._unlisteners.has(e) || this._unlisteners.set(e, new WeakMap());var i = this._renderer.listen(n.nativeElement, e, t);this._unlisteners.get(e).set(t, i);
        } }, { key: "unlisten_", value: function value(e, t) {
          if (this._unlisteners.has(e)) {
            var n = this._unlisteners.get(e);n.has(t) && (n.get(t)(), n.delete(t));
          }
        } }, { key: "classDisabled", get: function get() {
          return this.disabled ? this._renderer.setAttribute(this.nativeCb.nativeElement, "disabled", "") : this._renderer.removeAttribute(this.nativeCb.nativeElement, "disabled"), this.disabled ? "mdc-switch--disabled" : "";
        } }]), e;
    }();a([s.Input(), c("design:type", String)], m.prototype, "id", void 0), a([s.Input(), c("design:type", Boolean)], m.prototype, "checked", void 0), a([s.Input(), c("design:type", String)], m.prototype, "labelId", void 0), a([s.Input(), c("design:type", Boolean)], m.prototype, "disabled", void 0), a([s.Output(), c("design:type", s.EventEmitter)], m.prototype, "change", void 0), a([s.HostBinding("class"), c("design:type", String)], m.prototype, "className", void 0), a([s.HostBinding("class.mdc-switch--disabled"), c("design:type", String), c("design:paramtypes", [])], m.prototype, "classDisabled", null), a([s.ViewChild("nativeCb"), c("design:type", s.ElementRef)], m.prototype, "nativeCb", void 0), m = a([s.Component({ selector: "mdc-switch", styles: [String(p)], template: n(87), encapsulation: s.ViewEncapsulation.None, changeDetection: s.ChangeDetectionStrategy.OnPush, providers: [t.MD_SWITCH_CONTROL_VALUE_ACCESSOR, l.Ripple] }), c("design:paramtypes", [s.Renderer2, s.ElementRef, l.Ripple])], m), t.SwitchComponent = m;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        a = this && this.__decorate || function (e, t, n, i) {
      var o,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(t, n, c) : o(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        c = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var s = n(0),
        d = function () {
      function e() {
        i(this, e), this.className = "mdc-textfield-helptext";
      }return o(e, [{ key: "classPersistent", get: function get() {
          return this.persistent ? "mdc-textfield-helptext--persistent" : "";
        } }, { key: "classValidation", get: function get() {
          return this.validation ? "mdc-textfield-helptext--validation-msg" : "";
        } }]), e;
    }();a([s.Input(), c("design:type", String)], d.prototype, "id", void 0), a([s.Input(), c("design:type", Boolean)], d.prototype, "persistent", void 0), a([s.Input(), c("design:type", Boolean)], d.prototype, "validation", void 0), a([s.HostBinding("class"), c("design:type", String)], d.prototype, "className", void 0), a([s.HostBinding("class.mdc-textfield-helptext--persistent"), c("design:type", String), c("design:paramtypes", [])], d.prototype, "classPersistent", null), a([s.HostBinding("class.mdc-textfield-helptext--validation-msg"), c("design:type", String), c("design:paramtypes", [])], d.prototype, "classValidation", null), d = a([s.Directive({ selector: "[mdc-textfield-helptext]" })], d), t.TextfieldHelptextDirective = d;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        a = this && this.__decorate || function (e, t, n, i) {
      var o,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(t, n, c) : o(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        c = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var s = n(0),
        d = n(4),
        l = n(47).MDCTextfieldFoundation,
        p = n(99);t.MD_TEXTFIELD_CONTROL_VALUE_ACCESSOR = { provide: d.NG_VALUE_ACCESSOR, useExisting: s.forwardRef(function () {
        return m;
      }), multi: !0 };var m = function () {
      function e(t, n) {
        var o = this;i(this, e), this._renderer = t, this._root = n, this.type = "text", this.focus = new s.EventEmitter(), this.blur = new s.EventEmitter(), this.input = new s.EventEmitter(), this.keydown = new s.EventEmitter(), this.className = "mdc-textfield", this.onTouched = function () {}, this._controlValueAccessorChangeFn = function (e) {}, this._unlisteners = new Map(), this._mdcAdapter = { addClass: function addClass(e) {
            var t = o._renderer,
                n = o._root;t.addClass(n.nativeElement, e);
          }, removeClass: function removeClass(e) {
            var t = o._renderer,
                n = o._root;t.removeClass(n.nativeElement, e);
          }, addClassToLabel: function addClassToLabel(e) {
            var t = o._renderer;o._root;o.inputLabel && o.label && !o.fullwidth && t.addClass(o.inputLabel.nativeElement, e);
          }, removeClassFromLabel: function removeClassFromLabel(e) {
            var t = o._renderer;o._root;o.inputLabel && o.label && !o.fullwidth && t.removeClass(o.inputLabel.nativeElement, e);
          }, addClassToHelptext: function addClassToHelptext(e) {
            var t = o._renderer,
                n = o._root;n.nativeElement.attributes.getNamedItem("aria-controls") && n.nativeElement.nextElementSibling && t.addClass(t.nextSibling(n.nativeElement), e);
          }, removeClassFromHelptext: function removeClassFromHelptext(e) {
            var t = o._renderer,
                n = o._root;n.nativeElement.attributes.getNamedItem("aria-controls") && t.removeClass(t.nextSibling(n.nativeElement), e);
          }, registerInputFocusHandler: function registerInputFocusHandler(e) {
            o._root && o.listen_("focus", e, o.inputEl);
          }, deregisterInputFocusHandler: function deregisterInputFocusHandler(e) {
            o.unlisten_("focus", e);
          }, registerInputBlurHandler: function registerInputBlurHandler(e) {
            o._root && o.listen_("blur", e, o.inputEl);
          }, deregisterInputBlurHandler: function deregisterInputBlurHandler(e) {
            o.unlisten_("blur", e);
          }, registerInputInputHandler: function registerInputInputHandler(e) {
            o._root && o.listen_("input", e, o.inputEl);
          }, deregisterInputInputHandler: function deregisterInputInputHandler(e) {
            o.unlisten_("input", e);
          }, registerInputKeydownHandler: function registerInputKeydownHandler(e) {
            o._root && o.listen_("keydown", e, o.inputEl);
          }, deregisterInputKeydownHandler: function deregisterInputKeydownHandler(e) {
            o.unlisten_("keydown", e);
          }, setHelptextAttr: function setHelptextAttr(e, t) {
            var n = o._renderer,
                i = o._root;i.nativeElement.attributes.getNamedItem("aria-controls") && i.nativeElement.nextElementSibling && n.setAttribute(i.nativeElement.nextElementSibling, e, t);
          }, removeHelptextAttr: function removeHelptextAttr(e) {
            var t = o._renderer,
                n = o._root;if (n.nativeElement.attributes.getNamedItem("aria-controls")) return n.nativeElement.nextElementSibling ? t.removeAttribute(n.nativeElement.nextElementSibling, e) : null;
          }, helptextHasClass: function helptextHasClass(e) {
            o._renderer;var t = o._root;if (t.nativeElement.attributes.getNamedItem("aria-controls")) return !!t.nativeElement.nextElementSibling && t.nativeElement.nextElementSibling.classList.contains(e);
          }, getNativeInput: function getNativeInput() {
            return { checkValidity: function checkValidity() {
                return o.inputEl.nativeElement.checkValidity();
              }, value: o.value, disabled: function disabled(e) {
                return o.disabled_ = e;
              }, badInput: o.inputEl.nativeElement.validity.badInput };
          } }, this._foundation = new l(this._mdcAdapter);
      }return o(e, [{ key: "ngAfterViewInit", value: function value() {
          this._foundation.init();
        } }, { key: "ngOnDestroy", value: function value() {
          this._foundation.destroy();
        } }, { key: "handleFocus", value: function value(e) {
          this.focus.emit(e);
        } }, { key: "handleBlur", value: function value(e) {
          this._controlValueAccessorChangeFn(e.target.value), this.blur.emit(e);
        } }, { key: "handleInput", value: function value(e) {
          e.stopPropagation(), this._controlValueAccessorChangeFn(e.target.value), this.input.emit(e);
        } }, { key: "handleKeyDown", value: function value(e) {
          e.stopPropagation(), this.keydown.emit(e);
        } }, { key: "writeValue", value: function value(e) {
          e && (this.value = e, this._mdcAdapter.addClass(l.cssClasses.UPGRADED), this.fullwidth || this._mdcAdapter.addClassToLabel(l.cssClasses.LABEL_FLOAT_ABOVE));
        } }, { key: "registerOnChange", value: function value(e) {
          this._controlValueAccessorChangeFn = e;
        } }, { key: "registerOnTouched", value: function value(e) {
          this.onTouched = e;
        } }, { key: "listen_", value: function value(e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this._root;this._unlisteners.has(e) || this._unlisteners.set(e, new WeakMap());var i = this._renderer.listen(n.nativeElement, e, t);this._unlisteners.get(e).set(t, i);
        } }, { key: "unlisten_", value: function value(e, t) {
          if (this._unlisteners.has(e)) {
            var n = this._unlisteners.get(e);n.has(t) && (n.get(t)(), n.delete(t));
          }
        } }, { key: "disabled", get: function get() {
          return this.disabled_;
        }, set: function set(e) {
          this.disabled_ = e, this.inputEl && this._foundation.setDisabled(e);
        } }, { key: "classMultiline", get: function get() {
          return this.multiline ? "mdc-textfield--multiline" : "";
        } }, { key: "classFullwidth", get: function get() {
          return this.fullwidth ? "mdc-textfield--fullwidth" : "";
        } }]), e;
    }();a([s.Input(), c("design:type", String)], m.prototype, "id", void 0), a([s.Input(), c("design:type", String)], m.prototype, "type", void 0), a([s.Input(), c("design:type", String)], m.prototype, "value", void 0), a([s.Input(), c("design:type", Boolean), c("design:paramtypes", [Boolean])], m.prototype, "disabled", null), a([s.Input(), c("design:type", Boolean)], m.prototype, "required", void 0), a([s.Input(), c("design:type", String)], m.prototype, "labelId", void 0), a([s.Input(), c("design:type", String)], m.prototype, "label", void 0), a([s.Input(), c("design:type", String)], m.prototype, "placeholder", void 0), a([s.Input(), c("design:type", Number)], m.prototype, "tabindex", void 0), a([s.Input(), c("design:type", Number)], m.prototype, "rows", void 0), a([s.Input(), c("design:type", Number)], m.prototype, "cols", void 0), a([s.Input(), c("design:type", Number)], m.prototype, "maxlength", void 0), a([s.Input(), c("design:type", Boolean)], m.prototype, "fullwidth", void 0), a([s.Input(), c("design:type", Boolean)], m.prototype, "multiline", void 0), a([s.Output(), c("design:type", s.EventEmitter)], m.prototype, "focus", void 0), a([s.Output(), c("design:type", s.EventEmitter)], m.prototype, "blur", void 0), a([s.Output(), c("design:type", s.EventEmitter)], m.prototype, "input", void 0), a([s.Output(), c("design:type", s.EventEmitter)], m.prototype, "keydown", void 0), a([s.HostBinding("class"), c("design:type", String)], m.prototype, "className", void 0), a([s.HostBinding("class.mdc-textfield--multiline"), c("design:type", String), c("design:paramtypes", [])], m.prototype, "classMultiline", null), a([s.HostBinding("class.mdc-textfield--fullwidth"), c("design:type", String), c("design:paramtypes", [])], m.prototype, "classFullwidth", null), a([s.ViewChild("input"), c("design:type", s.ElementRef)], m.prototype, "inputEl", void 0), a([s.ViewChild("inputlabel"), c("design:type", s.ElementRef)], m.prototype, "inputLabel", void 0), m = a([s.Component({ selector: "mdc-textfield", template: n(88), styles: [String(p)], encapsulation: s.ViewEncapsulation.None, providers: [t.MD_TEXTFIELD_CONTROL_VALUE_ACCESSOR] }), c("design:paramtypes", [s.Renderer2, s.ElementRef])], m), t.TextfieldComponent = m;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        a = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var c = n(0),
        s = function e() {
      i(this, e), this.className = "mdc-toolbar__row";
    };r([c.HostBinding("class"), a("design:type", String)], s.prototype, "className", void 0), s = r([c.Component({ selector: "mdc-toolbar-row", template: "<ng-content></ng-content>", encapsulation: c.ViewEncapsulation.None })], s), t.ToolbarRowComponent = s;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        a = this && this.__decorate || function (e, t, n, i) {
      var o,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(t, n, c) : o(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        c = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var s = n(0),
        d = function () {
      function e() {
        i(this, e), this.className = "mdc-toolbar__section";
      }return o(e, [{ key: "classAlignStart", get: function get() {
          return this.alignStart ? "mdc-toolbar__section--align-start" : "";
        } }, { key: "classAlignEnd", get: function get() {
          return this.alignEnd ? "mdc-toolbar__section--align-end" : "";
        } }, { key: "classShrinkToFit", get: function get() {
          return this.shrinkToFit ? "mdc-toolbar__section--shrink-to-fit" : "";
        } }]), e;
    }();a([s.Input(), c("design:type", Boolean)], d.prototype, "alignStart", void 0), a([s.Input(), c("design:type", Boolean)], d.prototype, "alignEnd", void 0), a([s.Input(), c("design:type", Boolean)], d.prototype, "shrinkToFit", void 0), a([s.HostBinding("class"), c("design:type", String)], d.prototype, "className", void 0), a([s.HostBinding("class.mdc-toolbar__section--align-start"), c("design:type", String), c("design:paramtypes", [])], d.prototype, "classAlignStart", null), a([s.HostBinding("class.mdc-toolbar__section--align-end"), c("design:type", String), c("design:paramtypes", [])], d.prototype, "classAlignEnd", null), a([s.HostBinding("class.mdc-toolbar__section--shrink-to-fit"), c("design:type", String), c("design:paramtypes", [])], d.prototype, "classShrinkToFit", null), d = a([s.Component({ selector: "mdc-toolbar-section", template: "<ng-content></ng-content>", encapsulation: s.ViewEncapsulation.None })], d), t.ToolbarSectionComponent = d;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        a = this && this.__decorate || function (e, t, n, i) {
      var o,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(t, n, c) : o(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        c = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : r(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var s = n(0),
        d = n(25),
        l = n(50).MDCToolbarFoundation,
        p = n(100),
        m = function () {
      function e(t, n) {
        var o = this;i(this, e), this._renderer = t, this._root = n, this.flexibleTitle = !0, this.change = new s.EventEmitter(), this.className = "mdc-toolbar", this._unlisteners = new Map(), this._mdcAdapter = { hasClass: function hasClass(e) {
            return o._root.nativeElement.classList.contains(e);
          }, addClass: function addClass(e) {
            var t = o._renderer,
                n = o._root;t.addClass(n.nativeElement, e);
          }, removeClass: function removeClass(e) {
            var t = o._renderer,
                n = o._root;t.removeClass(n.nativeElement, e);
          }, registerScrollHandler: function registerScrollHandler(e) {
            o._root && o.listen_("scroll", e, window);
          }, deregisterScrollHandler: function deregisterScrollHandler(e) {
            o.unlisten_("scroll", e);
          }, registerResizeHandler: function registerResizeHandler(e) {
            var t = o._renderer,
                n = o._root;o._root && o.listen_("resize", e, t.parentNode(n.nativeElement));
          }, deregisterResizeHandler: function deregisterResizeHandler(e) {
            o.unlisten_("resize", e);
          }, getViewportWidth: function getViewportWidth() {
            return window.innerWidth;
          }, getViewportScrollY: function getViewportScrollY() {
            return window.pageYOffset;
          }, getOffsetHeight: function getOffsetHeight() {
            return o._root.nativeElement.offsetHeight;
          }, getFlexibleRowElementOffsetHeight: function getFlexibleRowElementOffsetHeight() {
            return o._root.nativeElement.querySelector(l.strings.FLEXIBLE_ROW_SELECTOR).offsetHeight;
          }, notifyChange: function notifyChange(e) {
            o.change.emit(e.flexibleExpansionRatio);
          }, setStyle: function setStyle(e, t) {
            var n = o._renderer,
                i = o._root;n.setStyle(i.nativeElement, e, t);
          }, setStyleForTitleElement: function setStyleForTitleElement(e, t) {
            var n = o._renderer,
                i = o._root;n.setStyle(i.nativeElement.querySelector(l.strings.TITLE_SELECTOR), e, t);
          }, setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement(e, t) {
            var n = o._renderer,
                i = o._root;n.setStyle(i.nativeElement.querySelector(l.strings.FLEXIBLE_ROW_SELECTOR), e, t);
          }, setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement(e, t) {
            var n = o._renderer;o._root;n.setStyle(document.querySelector(".mdc-toolbar-fixed-adjust"), e, t);
          } }, this._foundation = new l(this._mdcAdapter);
      }return o(e, [{ key: "ngAfterViewInit", value: function value() {
          this._foundation.init();
        } }, { key: "ngOnDestroy", value: function value() {
          this._foundation.destroy();
        } }, { key: "listen_", value: function value(e, t, n) {
          this._unlisteners.has(e) || this._unlisteners.set(e, new WeakMap());var i = this._renderer.listen(n, e, t);this._unlisteners.get(e).set(t, i);
        } }, { key: "unlisten_", value: function value(e, t) {
          if (this._unlisteners.has(e)) {
            var n = this._unlisteners.get(e);n.has(t) && (n.get(t)(), n.delete(t));
          }
        } }, { key: "classFixedToolbar", get: function get() {
          return this.fixed ? "mdc-toolbar--fixed" : "";
        } }, { key: "classWaterfallToolbar", get: function get() {
          return this.waterfall ? "mdc-toolbar--waterfall" : "";
        } }, { key: "classFlexibleToolbar", get: function get() {
          return this.flexible ? "mdc-toolbar--flexible" : "";
        } }, { key: "classFixedLastrow", get: function get() {
          return this.fixedLastrow ? "mdc-toolbar--fixed-lastrow-only" : "";
        } }, { key: "classFlexibleTitle", get: function get() {
          return this.flexible && this.flexibleTitle ? "mdc-toolbar--flexible-default-behavior" : "";
        } }]), e;
    }();a([s.Input(), c("design:type", Boolean)], m.prototype, "flexible", void 0), a([s.Input(), c("design:type", Boolean)], m.prototype, "flexibleTitle", void 0), a([s.Input(), c("design:type", Boolean)], m.prototype, "fixed", void 0), a([s.Input(), c("design:type", Boolean)], m.prototype, "waterfall", void 0), a([s.Input(), c("design:type", Boolean)], m.prototype, "fixedLastrow", void 0), a([s.Output(), c("design:type", s.EventEmitter)], m.prototype, "change", void 0), a([s.HostBinding("class"), c("design:type", String)], m.prototype, "className", void 0), a([s.HostBinding("class.mdc-toolbar--fixed"), c("design:type", String), c("design:paramtypes", [])], m.prototype, "classFixedToolbar", null), a([s.HostBinding("class.mdc-toolbar--waterfall"), c("design:type", String), c("design:paramtypes", [])], m.prototype, "classWaterfallToolbar", null), a([s.HostBinding("class.mdc-toolbar--flexible"), c("design:type", String), c("design:paramtypes", [])], m.prototype, "classFlexibleToolbar", null), a([s.HostBinding("class.mdc-toolbar--fixed-lastrow-only"), c("design:type", String), c("design:paramtypes", [])], m.prototype, "classFixedLastrow", null), a([s.HostBinding("class.mdc-toolbar--flexible-default-behavior"), c("design:type", String), c("design:paramtypes", [])], m.prototype, "classFlexibleTitle", null), a([s.ViewChild(d.ToolbarTitleDirective), c("design:type", s.ElementRef)], m.prototype, "titleEl", void 0), m = a([s.Component({ selector: "mdc-toolbar", template: "<ng-content></ng-content>", styles: [String(p)], encapsulation: s.ViewEncapsulation.None }), c("design:paramtypes", [s.Renderer2, s.ElementRef])], m), t.ToolbarComponent = m;
  }, function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = this && this.__decorate || function (e, t, n, i) {
      var r,
          a = arguments.length,
          c = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i);else for (var s = e.length - 1; s >= 0; s--) {
        (r = e[s]) && (c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c);
      }return a > 3 && c && Object.defineProperty(t, n, c), c;
    },
        a = this && this.__metadata || function (e, t) {
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
    };Object.defineProperty(t, "__esModule", { value: !0 });var c = n(0),
        s = (n(101), function e() {
      i(this, e), this.className = "mdc-typography--adjust-margin";
    });r([c.HostBinding("class.mdc-typography--adjust-margin"), a("design:type", String)], s.prototype, "className", void 0), s = r([c.Directive({ selector: "[mdc-typography-adjust-margin]" })], s), t.AdjustMarginDirective = s;var d = function e() {
      i(this, e), this.className = "mdc-typography--display4";
    };r([c.HostBinding("class.mdc-typography--display4"), a("design:type", String)], d.prototype, "className", void 0), d = r([c.Directive({ selector: "[mdc-typography-display4]" })], d), t.Display4Directive = d;var l = function e() {
      i(this, e), this.className = "mdc-typography--display3";
    };r([c.HostBinding("class.mdc-typography--display3"), a("design:type", String)], l.prototype, "className", void 0), l = r([c.Directive({ selector: "[mdc-typography-display3]" })], l), t.Display3Directive = l;var p = function e() {
      i(this, e), this.className = "mdc-typography--display2";
    };r([c.HostBinding("class.mdc-typography--display2"), a("design:type", String)], p.prototype, "className", void 0), p = r([c.Directive({ selector: "[mdc-typography-display2]" })], p), t.Display2Directive = p;var m = function e() {
      i(this, e), this.className = "mdc-typography--display1";
    };r([c.HostBinding("class.mdc-typography--display1"), a("design:type", String)], m.prototype, "className", void 0), m = r([c.Directive({ selector: "[mdc-typography-display1]" })], m), t.Display1Directive = m;var u = function e() {
      i(this, e), this.className = "mdc-typography--headline";
    };r([c.HostBinding("class.mdc-typography--headline"), a("design:type", String)], u.prototype, "className", void 0), u = r([c.Directive({ selector: "[mdc-typography-headline]" })], u), t.HeadlineDirective = u;var f = function e() {
      i(this, e), this.className = "mdc-typography--title";
    };r([c.HostBinding("class.mdc-typography--title"), a("design:type", String)], f.prototype, "className", void 0), f = r([c.Directive({ selector: "[mdc-typography-title]" })], f), t.TitleDirective = f;var h = function e() {
      i(this, e), this.className = "mdc-typography--subheading2";
    };r([c.HostBinding("class.mdc-typography--subheading2"), a("design:type", String)], h.prototype, "className", void 0), h = r([c.Directive({ selector: "[mdc-typography-subheading2]" })], h), t.Subheading2Directive = h;var g = function e() {
      i(this, e), this.className = "mdc-typography--subheading1";
    };r([c.HostBinding("class.mdc-typography--subheading1"), a("design:type", String)], g.prototype, "className", void 0), g = r([c.Directive({ selector: "[mdc-typography-subheading1]" })], g), t.Subheading1Directive = g;var b = function e() {
      i(this, e), this.className = "mdc-typography--body2";
    };r([c.HostBinding("class.mdc-typography--body2"), a("design:type", String)], b.prototype, "className", void 0), b = r([c.Directive({ selector: "[mdc-typography-body2]" })], b), t.Body2Directive = b;var y = function e() {
      i(this, e), this.className = "mdc-typography--body1";
    };r([c.HostBinding("class.mdc-typography--body1"), a("design:type", String)], y.prototype, "className", void 0), y = r([c.Directive({ selector: "[mdc-typography-body1]" })], y), t.Body1Directive = y;var _ = function e() {
      i(this, e), this.className = "mdc-typography--caption";
    };r([c.HostBinding("class.mdc-typography--caption"), a("design:type", String)], _.prototype, "className", void 0), _ = r([c.Directive({ selector: "[mdc-typography-caption]" })], _), t.CaptionDirective = _;
  }, function (e, t, n) {
    (e.exports = n(2)(void 0)).push([e.i, '/**\n * The css property used for elevation. In most cases this should not be changed. It is exposed\n * as a variable for abstraction / easy use when needing to reference the property directly, for\n * example in a `will-change` rule.\n */\n/**\n * The default duration value for elevation transitions.\n */\n/**\n * The default easing value for elevation transitions.\n */\n/**\n * Applies the correct css rules to an element to give it the elevation specified by $z-value.\n * The $z-value must be between 0 and 24.\n */\n/**\n * Returns a string that can be used as the value for a `transition` property for elevation.\n * Calling this function directly is useful in situations where a component needs to transition\n * more than one property.\n *\n * ```scss\n * .foo {\n *   transition: mdc-elevation-transition-rule(), opacity 100ms ease;\n *   will-change: $mdc-elevation-property, opacity;\n * }\n * ```\n */\n/**\n * Applies the correct css rules needed to have an element transition between elevations.\n * This mixin should be applied to elements whose elevation values will change depending on their\n * context (e.g. when active or disabled).\n */\n/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/** MDC Ripple keyframes are split into their own file so that _mixins.scss can rely on them. */\n@keyframes mdc-ripple-fg-radius-in {\n  from {\n    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n  to {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n@keyframes mdc-ripple-fg-opacity-in {\n  from {\n    opacity: 0;\n    animation-timing-function: linear; }\n  to {\n    opacity: 1; } }\n\n@keyframes mdc-ripple-fg-opacity-out {\n  from {\n    opacity: 1;\n    animation-timing-function: linear; }\n  to {\n    opacity: 0; } }\n\n/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/**\n * Applies the correct theme color style to the specified property.\n * $property is typically color or background-color, but can be any CSS property that accepts color values.\n * $style should be one of the map keys in $mdc-theme-property-values (_variables.scss).\n */\n/**\n * Creates a rule to be used in MDC-Web components for dark theming, and applies the provided contents.\n * Should provide the $root-selector option if applied to anything other than the root selector.\n * When used with a modifier class, provide a second argument of `true` for the $compound parameter\n * to specify that this should be attached as a compound class.\n *\n * Usage example:\n *\n * ```scss\n * .mdc-foo {\n *   color: black;\n *\n *   @include mdc-theme-dark {\n *     color: white;\n *   }\n *\n *   &__bar {\n *     background: black;\n *\n *     @include mdc-theme-dark(".mdc-foo") {\n *       background: white;\n *     }\n *   }\n * }\n *\n * .mdc-foo--disabled {\n *   opacity: .38;\n *\n *   @include mdc-theme-dark(".mdc-foo", true) {\n *     opacity: .5;\n *   }\n * }\n * ```\n */\n/* TODO(sgomes): Figure out what to do about desktop font sizes. */\n/* TODO(sgomes): Figure out what to do about i18n and i18n font sizes. */\n.mdc-button {\n  --mdc-ripple-surface-width: 0;\n  --mdc-ripple-surface-height: 0;\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  will-change: transform, opacity;\n  -webkit-tap-highlight-color: transparent;\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  font-weight: 500;\n  letter-spacing: 0.04em;\n  line-height: 1.5rem;\n  color: rgba(0, 0, 0, 0.87);\n  color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87));\n  display: inline-block;\n  position: relative;\n  min-width: 64px;\n  height: 36px;\n  padding: 0 16px;\n  border: none;\n  border-radius: 2px;\n  outline: none;\n  background: transparent;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 36px;\n  text-align: center;\n  text-decoration: none;\n  text-transform: uppercase;\n  overflow: hidden;\n  vertical-align: middle;\n  user-select: none;\n  box-sizing: border-box;\n  -webkit-appearance: none; }\n  .mdc-button:not(.mdc-ripple-upgraded):hover::before, .mdc-button:not(.mdc-ripple-upgraded):focus::before, .mdc-button:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 85ms;\n    opacity: .6; }\n  .mdc-button::before {\n    background-color: rgba(0, 0, 0, 0.06);\n    position: absolute;\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transition: opacity 250ms linear;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: ""; }\n  .mdc-button.mdc-ripple-upgraded::before {\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transform: scale(0);\n    transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n  .mdc-button.mdc-ripple-upgraded--background-focused::before {\n    opacity: .99999; }\n  .mdc-button.mdc-ripple-upgraded--background-active-fill::before {\n    transition-duration: 120ms;\n    opacity: 1; }\n  .mdc-button.mdc-ripple-upgraded--unbounded::before {\n    top: calc(50% - 50%);\n    top: var(--mdc-ripple-top, calc(50% - 50%));\n    left: calc(50% - 50%);\n    left: var(--mdc-ripple-left, calc(50% - 50%));\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n  .mdc-button::after {\n    background-color: rgba(0, 0, 0, 0.06);\n    position: absolute;\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transition: opacity 250ms linear;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: ""; }\n  .mdc-button.mdc-ripple-upgraded::after {\n    top: 0;\n    left: 0;\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform-origin: center center;\n    opacity: 0; }\n  .mdc-button:not(.mdc-ripple-upgraded--unbounded)::after {\n    transform-origin: center center; }\n  .mdc-button.mdc-ripple-upgraded--unbounded::after {\n    top: 0;\n    top: var(--mdc-ripple-top, 0);\n    left: 0;\n    left: var(--mdc-ripple-left, 0);\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform-origin: center center; }\n  .mdc-button.mdc-ripple-upgraded--foreground-activation::after {\n    animation: 300ms mdc-ripple-fg-radius-in forwards, 83ms mdc-ripple-fg-opacity-in forwards; }\n  .mdc-button.mdc-ripple-upgraded--foreground-deactivation::after {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    animation: 250ms mdc-ripple-fg-opacity-out; }\n  .mdc-button:not(.mdc-ripple-upgraded) {\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.18); }\n  .mdc-button--theme-dark,\n  .mdc-theme--dark .mdc-button {\n    --mdc-ripple-surface-width: 0;\n    --mdc-ripple-surface-height: 0;\n    --mdc-ripple-fg-size: 0;\n    --mdc-ripple-left: 0;\n    --mdc-ripple-top: 0;\n    --mdc-ripple-fg-scale: 1;\n    --mdc-ripple-fg-translate-end: 0;\n    --mdc-ripple-fg-translate-start: 0;\n    will-change: transform, opacity;\n    -webkit-tap-highlight-color: transparent;\n    color: white;\n    color: var(--mdc-theme-text-primary-on-dark, white); }\n    .mdc-button--theme-dark:not(.mdc-ripple-upgraded):hover::before, .mdc-button--theme-dark:not(.mdc-ripple-upgraded):focus::before, .mdc-button--theme-dark:not(.mdc-ripple-upgraded):active::after,\n    .mdc-theme--dark .mdc-button:not(.mdc-ripple-upgraded):hover::before,\n    .mdc-theme--dark .mdc-button:not(.mdc-ripple-upgraded):focus::before,\n    .mdc-theme--dark .mdc-button:not(.mdc-ripple-upgraded):active::after {\n      transition-duration: 85ms;\n      opacity: .6; }\n    .mdc-button--theme-dark::before,\n    .mdc-theme--dark .mdc-button::before {\n      background-color: rgba(255, 255, 255, 0.14);\n      position: absolute;\n      top: calc(50% - 100%);\n      left: calc(50% - 100%);\n      width: 200%;\n      height: 200%;\n      transition: opacity 250ms linear;\n      border-radius: 50%;\n      opacity: 0;\n      pointer-events: none;\n      content: ""; }\n    .mdc-button--theme-dark.mdc-ripple-upgraded::before,\n    .mdc-theme--dark .mdc-button.mdc-ripple-upgraded::before {\n      top: calc(50% - 100%);\n      left: calc(50% - 100%);\n      width: 200%;\n      height: 200%;\n      transform: scale(0);\n      transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n    .mdc-button--theme-dark.mdc-ripple-upgraded--background-focused::before,\n    .mdc-theme--dark .mdc-button.mdc-ripple-upgraded--background-focused::before {\n      opacity: .99999; }\n    .mdc-button--theme-dark.mdc-ripple-upgraded--background-active-fill::before,\n    .mdc-theme--dark .mdc-button.mdc-ripple-upgraded--background-active-fill::before {\n      transition-duration: 120ms;\n      opacity: 1; }\n    .mdc-button--theme-dark.mdc-ripple-upgraded--unbounded::before,\n    .mdc-theme--dark .mdc-button.mdc-ripple-upgraded--unbounded::before {\n      top: calc(50% - 50%);\n      top: var(--mdc-ripple-top, calc(50% - 50%));\n      left: calc(50% - 50%);\n      left: var(--mdc-ripple-left, calc(50% - 50%));\n      width: 100%;\n      width: var(--mdc-ripple-fg-size, 100%);\n      height: 100%;\n      height: var(--mdc-ripple-fg-size, 100%);\n      transform: scale(0);\n      transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n    .mdc-button--theme-dark::after,\n    .mdc-theme--dark .mdc-button::after {\n      background-color: rgba(255, 255, 255, 0.14);\n      position: absolute;\n      top: calc(50% - 100%);\n      left: calc(50% - 100%);\n      width: 200%;\n      height: 200%;\n      transition: opacity 250ms linear;\n      border-radius: 50%;\n      opacity: 0;\n      pointer-events: none;\n      content: ""; }\n    .mdc-button--theme-dark.mdc-ripple-upgraded::after,\n    .mdc-theme--dark .mdc-button.mdc-ripple-upgraded::after {\n      top: 0;\n      left: 0;\n      width: 100%;\n      width: var(--mdc-ripple-fg-size, 100%);\n      height: 100%;\n      height: var(--mdc-ripple-fg-size, 100%);\n      transform: scale(0);\n      transform-origin: center center;\n      opacity: 0; }\n    .mdc-button--theme-dark:not(.mdc-ripple-upgraded--unbounded)::after,\n    .mdc-theme--dark .mdc-button:not(.mdc-ripple-upgraded--unbounded)::after {\n      transform-origin: center center; }\n    .mdc-button--theme-dark.mdc-ripple-upgraded--unbounded::after,\n    .mdc-theme--dark .mdc-button.mdc-ripple-upgraded--unbounded::after {\n      top: 0;\n      top: var(--mdc-ripple-top, 0);\n      left: 0;\n      left: var(--mdc-ripple-left, 0);\n      width: 100%;\n      width: var(--mdc-ripple-fg-size, 100%);\n      height: 100%;\n      height: var(--mdc-ripple-fg-size, 100%);\n      transform: scale(0);\n      transform-origin: center center; }\n    .mdc-button--theme-dark.mdc-ripple-upgraded--foreground-activation::after,\n    .mdc-theme--dark .mdc-button.mdc-ripple-upgraded--foreground-activation::after {\n      animation: 300ms mdc-ripple-fg-radius-in forwards, 83ms mdc-ripple-fg-opacity-in forwards; }\n    .mdc-button--theme-dark.mdc-ripple-upgraded--foreground-deactivation::after,\n    .mdc-theme--dark .mdc-button.mdc-ripple-upgraded--foreground-deactivation::after {\n      transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n      animation: 250ms mdc-ripple-fg-opacity-out; }\n    .mdc-button--theme-dark:not(.mdc-ripple-upgraded),\n    .mdc-theme--dark .mdc-button:not(.mdc-ripple-upgraded) {\n      -webkit-tap-highlight-color: rgba(255, 255, 255, 0.18); }\n  .mdc-button.mdc-button--primary {\n    --mdc-ripple-surface-width: 0;\n    --mdc-ripple-surface-height: 0;\n    --mdc-ripple-fg-size: 0;\n    --mdc-ripple-left: 0;\n    --mdc-ripple-top: 0;\n    --mdc-ripple-fg-scale: 1;\n    --mdc-ripple-fg-translate-end: 0;\n    --mdc-ripple-fg-translate-start: 0;\n    will-change: transform, opacity;\n    -webkit-tap-highlight-color: transparent; }\n    .mdc-button.mdc-button--primary:not(.mdc-ripple-upgraded):hover::before, .mdc-button.mdc-button--primary:not(.mdc-ripple-upgraded):focus::before, .mdc-button.mdc-button--primary:not(.mdc-ripple-upgraded):active::after {\n      transition-duration: 85ms;\n      opacity: .6; }\n    .mdc-button.mdc-button--primary::before {\n      background-color: rgba(63, 81, 181, 0.12);\n      position: absolute;\n      top: calc(50% - 100%);\n      left: calc(50% - 100%);\n      width: 200%;\n      height: 200%;\n      transition: opacity 250ms linear;\n      border-radius: 50%;\n      opacity: 0;\n      pointer-events: none;\n      content: ""; }\n      @supports (background-color: color(green a(10%))) {\n        .mdc-button.mdc-button--primary::before {\n          background-color: color(var(--mdc-theme-primary, #3f51b5) a(12%)); } }\n    .mdc-button.mdc-button--primary.mdc-ripple-upgraded::before {\n      top: calc(50% - 100%);\n      left: calc(50% - 100%);\n      width: 200%;\n      height: 200%;\n      transform: scale(0);\n      transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n    .mdc-button.mdc-button--primary.mdc-ripple-upgraded--background-focused::before {\n      opacity: .99999; }\n    .mdc-button.mdc-button--primary.mdc-ripple-upgraded--background-active-fill::before {\n      transition-duration: 120ms;\n      opacity: 1; }\n    .mdc-button.mdc-button--primary.mdc-ripple-upgraded--unbounded::before {\n      top: calc(50% - 50%);\n      top: var(--mdc-ripple-top, calc(50% - 50%));\n      left: calc(50% - 50%);\n      left: var(--mdc-ripple-left, calc(50% - 50%));\n      width: 100%;\n      width: var(--mdc-ripple-fg-size, 100%);\n      height: 100%;\n      height: var(--mdc-ripple-fg-size, 100%);\n      transform: scale(0);\n      transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n    .mdc-button.mdc-button--primary::after {\n      background-color: rgba(63, 81, 181, 0.12);\n      position: absolute;\n      top: calc(50% - 100%);\n      left: calc(50% - 100%);\n      width: 200%;\n      height: 200%;\n      transition: opacity 250ms linear;\n      border-radius: 50%;\n      opacity: 0;\n      pointer-events: none;\n      content: ""; }\n      @supports (background-color: color(green a(10%))) {\n        .mdc-button.mdc-button--primary::after {\n          background-color: color(var(--mdc-theme-primary, #3f51b5) a(12%)); } }\n    .mdc-button.mdc-button--primary.mdc-ripple-upgraded::after {\n      top: 0;\n      left: 0;\n      width: 100%;\n      width: var(--mdc-ripple-fg-size, 100%);\n      height: 100%;\n      height: var(--mdc-ripple-fg-size, 100%);\n      transform: scale(0);\n      transform-origin: center center;\n      opacity: 0; }\n    .mdc-button.mdc-button--primary:not(.mdc-ripple-upgraded--unbounded)::after {\n      transform-origin: center center; }\n    .mdc-button.mdc-button--primary.mdc-ripple-upgraded--unbounded::after {\n      top: 0;\n      top: var(--mdc-ripple-top, 0);\n      left: 0;\n      left: var(--mdc-ripple-left, 0);\n      width: 100%;\n      width: var(--mdc-ripple-fg-size, 100%);\n      height: 100%;\n      height: var(--mdc-ripple-fg-size, 100%);\n      transform: scale(0);\n      transform-origin: center center; }\n    .mdc-button.mdc-button--primary.mdc-ripple-upgraded--foreground-activation::after {\n      animation: 300ms mdc-ripple-fg-radius-in forwards, 83ms mdc-ripple-fg-opacity-in forwards; }\n    .mdc-button.mdc-button--primary.mdc-ripple-upgraded--foreground-deactivation::after {\n      transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n      animation: 250ms mdc-ripple-fg-opacity-out; }\n  .mdc-button.mdc-button--accent {\n    --mdc-ripple-surface-width: 0;\n    --mdc-ripple-surface-height: 0;\n    --mdc-ripple-fg-size: 0;\n    --mdc-ripple-left: 0;\n    --mdc-ripple-top: 0;\n    --mdc-ripple-fg-scale: 1;\n    --mdc-ripple-fg-translate-end: 0;\n    --mdc-ripple-fg-translate-start: 0;\n    will-change: transform, opacity;\n    -webkit-tap-highlight-color: transparent; }\n    .mdc-button.mdc-button--accent:not(.mdc-ripple-upgraded):hover::before, .mdc-button.mdc-button--accent:not(.mdc-ripple-upgraded):focus::before, .mdc-button.mdc-button--accent:not(.mdc-ripple-upgraded):active::after {\n      transition-duration: 85ms;\n      opacity: .6; }\n    .mdc-button.mdc-button--accent::before {\n      background-color: rgba(255, 64, 129, 0.12);\n      position: absolute;\n      top: calc(50% - 100%);\n      left: calc(50% - 100%);\n      width: 200%;\n      height: 200%;\n      transition: opacity 250ms linear;\n      border-radius: 50%;\n      opacity: 0;\n      pointer-events: none;\n      content: ""; }\n      @supports (background-color: color(green a(10%))) {\n        .mdc-button.mdc-button--accent::before {\n          background-color: color(var(--mdc-theme-accent, #ff4081) a(12%)); } }\n    .mdc-button.mdc-button--accent.mdc-ripple-upgraded::before {\n      top: calc(50% - 100%);\n      left: calc(50% - 100%);\n      width: 200%;\n      height: 200%;\n      transform: scale(0);\n      transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n    .mdc-button.mdc-button--accent.mdc-ripple-upgraded--background-focused::before {\n      opacity: .99999; }\n    .mdc-button.mdc-button--accent.mdc-ripple-upgraded--background-active-fill::before {\n      transition-duration: 120ms;\n      opacity: 1; }\n    .mdc-button.mdc-button--accent.mdc-ripple-upgraded--unbounded::before {\n      top: calc(50% - 50%);\n      top: var(--mdc-ripple-top, calc(50% - 50%));\n      left: calc(50% - 50%);\n      left: var(--mdc-ripple-left, calc(50% - 50%));\n      width: 100%;\n      width: var(--mdc-ripple-fg-size, 100%);\n      height: 100%;\n      height: var(--mdc-ripple-fg-size, 100%);\n      transform: scale(0);\n      transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n    .mdc-button.mdc-button--accent::after {\n      background-color: rgba(255, 64, 129, 0.12);\n      position: absolute;\n      top: calc(50% - 100%);\n      left: calc(50% - 100%);\n      width: 200%;\n      height: 200%;\n      transition: opacity 250ms linear;\n      border-radius: 50%;\n      opacity: 0;\n      pointer-events: none;\n      content: ""; }\n      @supports (background-color: color(green a(10%))) {\n        .mdc-button.mdc-button--accent::after {\n          background-color: color(var(--mdc-theme-accent, #ff4081) a(12%)); } }\n    .mdc-button.mdc-button--accent.mdc-ripple-upgraded::after {\n      top: 0;\n      left: 0;\n      width: 100%;\n      width: var(--mdc-ripple-fg-size, 100%);\n      height: 100%;\n      height: var(--mdc-ripple-fg-size, 100%);\n      transform: scale(0);\n      transform-origin: center center;\n      opacity: 0; }\n    .mdc-button.mdc-button--accent:not(.mdc-ripple-upgraded--unbounded)::after {\n      transform-origin: center center; }\n    .mdc-button.mdc-button--accent.mdc-ripple-upgraded--unbounded::after {\n      top: 0;\n      top: var(--mdc-ripple-top, 0);\n      left: 0;\n      left: var(--mdc-ripple-left, 0);\n      width: 100%;\n      width: var(--mdc-ripple-fg-size, 100%);\n      height: 100%;\n      height: var(--mdc-ripple-fg-size, 100%);\n      transform: scale(0);\n      transform-origin: center center; }\n    .mdc-button.mdc-button--accent.mdc-ripple-upgraded--foreground-activation::after {\n      animation: 300ms mdc-ripple-fg-radius-in forwards, 83ms mdc-ripple-fg-opacity-in forwards; }\n    .mdc-button.mdc-button--accent.mdc-ripple-upgraded--foreground-deactivation::after {\n      transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n      animation: 250ms mdc-ripple-fg-opacity-out; }\n  .mdc-button:active {\n    outline: none; }\n  .mdc-button:hover {\n    cursor: pointer; }\n  .mdc-button::-moz-focus-inner {\n    padding: 0;\n    border: 0; }\n  .mdc-button--dense {\n    height: 32px;\n    font-size: .8125rem;\n    line-height: 32px; }\n  .mdc-button--raised {\n    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n    will-change: box-shadow;\n    min-width: 88px; }\n    .mdc-button--raised:active {\n      box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12); }\n    .mdc-button--raised.mdc-button--primary {\n      --mdc-ripple-surface-width: 0;\n      --mdc-ripple-surface-height: 0;\n      --mdc-ripple-fg-size: 0;\n      --mdc-ripple-left: 0;\n      --mdc-ripple-top: 0;\n      --mdc-ripple-fg-scale: 1;\n      --mdc-ripple-fg-translate-end: 0;\n      --mdc-ripple-fg-translate-start: 0;\n      will-change: transform, opacity;\n      -webkit-tap-highlight-color: transparent; }\n      .mdc-button--raised.mdc-button--primary:not(.mdc-ripple-upgraded):hover::before, .mdc-button--raised.mdc-button--primary:not(.mdc-ripple-upgraded):focus::before, .mdc-button--raised.mdc-button--primary:not(.mdc-ripple-upgraded):active::after {\n        transition-duration: 85ms;\n        opacity: .6; }\n      .mdc-button--raised.mdc-button--primary::before {\n        background-color: rgba(255, 255, 255, 0.14);\n        position: absolute;\n        top: calc(50% - 100%);\n        left: calc(50% - 100%);\n        width: 200%;\n        height: 200%;\n        transition: opacity 250ms linear;\n        border-radius: 50%;\n        opacity: 0;\n        pointer-events: none;\n        content: ""; }\n      .mdc-button--raised.mdc-button--primary.mdc-ripple-upgraded::before {\n        top: calc(50% - 100%);\n        left: calc(50% - 100%);\n        width: 200%;\n        height: 200%;\n        transform: scale(0);\n        transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n      .mdc-button--raised.mdc-button--primary.mdc-ripple-upgraded--background-focused::before {\n        opacity: .99999; }\n      .mdc-button--raised.mdc-button--primary.mdc-ripple-upgraded--background-active-fill::before {\n        transition-duration: 120ms;\n        opacity: 1; }\n      .mdc-button--raised.mdc-button--primary.mdc-ripple-upgraded--unbounded::before {\n        top: calc(50% - 50%);\n        top: var(--mdc-ripple-top, calc(50% - 50%));\n        left: calc(50% - 50%);\n        left: var(--mdc-ripple-left, calc(50% - 50%));\n        width: 100%;\n        width: var(--mdc-ripple-fg-size, 100%);\n        height: 100%;\n        height: var(--mdc-ripple-fg-size, 100%);\n        transform: scale(0);\n        transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n      .mdc-button--raised.mdc-button--primary::after {\n        background-color: rgba(255, 255, 255, 0.14);\n        position: absolute;\n        top: calc(50% - 100%);\n        left: calc(50% - 100%);\n        width: 200%;\n        height: 200%;\n        transition: opacity 250ms linear;\n        border-radius: 50%;\n        opacity: 0;\n        pointer-events: none;\n        content: ""; }\n      .mdc-button--raised.mdc-button--primary.mdc-ripple-upgraded::after {\n        top: 0;\n        left: 0;\n        width: 100%;\n        width: var(--mdc-ripple-fg-size, 100%);\n        height: 100%;\n        height: var(--mdc-ripple-fg-size, 100%);\n        transform: scale(0);\n        transform-origin: center center;\n        opacity: 0; }\n      .mdc-button--raised.mdc-button--primary:not(.mdc-ripple-upgraded--unbounded)::after {\n        transform-origin: center center; }\n      .mdc-button--raised.mdc-button--primary.mdc-ripple-upgraded--unbounded::after {\n        top: 0;\n        top: var(--mdc-ripple-top, 0);\n        left: 0;\n        left: var(--mdc-ripple-left, 0);\n        width: 100%;\n        width: var(--mdc-ripple-fg-size, 100%);\n        height: 100%;\n        height: var(--mdc-ripple-fg-size, 100%);\n        transform: scale(0);\n        transform-origin: center center; }\n      .mdc-button--raised.mdc-button--primary.mdc-ripple-upgraded--foreground-activation::after {\n        animation: 300ms mdc-ripple-fg-radius-in forwards, 83ms mdc-ripple-fg-opacity-in forwards; }\n      .mdc-button--raised.mdc-button--primary.mdc-ripple-upgraded--foreground-deactivation::after {\n        transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n        animation: 250ms mdc-ripple-fg-opacity-out; }\n    .mdc-button--raised.mdc-button--accent {\n      --mdc-ripple-surface-width: 0;\n      --mdc-ripple-surface-height: 0;\n      --mdc-ripple-fg-size: 0;\n      --mdc-ripple-left: 0;\n      --mdc-ripple-top: 0;\n      --mdc-ripple-fg-scale: 1;\n      --mdc-ripple-fg-translate-end: 0;\n      --mdc-ripple-fg-translate-start: 0;\n      will-change: transform, opacity;\n      -webkit-tap-highlight-color: transparent; }\n      .mdc-button--raised.mdc-button--accent:not(.mdc-ripple-upgraded):hover::before, .mdc-button--raised.mdc-button--accent:not(.mdc-ripple-upgraded):focus::before, .mdc-button--raised.mdc-button--accent:not(.mdc-ripple-upgraded):active::after {\n        transition-duration: 85ms;\n        opacity: .6; }\n      .mdc-button--raised.mdc-button--accent::before {\n        background-color: rgba(255, 255, 255, 0.14);\n        position: absolute;\n        top: calc(50% - 100%);\n        left: calc(50% - 100%);\n        width: 200%;\n        height: 200%;\n        transition: opacity 250ms linear;\n        border-radius: 50%;\n        opacity: 0;\n        pointer-events: none;\n        content: ""; }\n      .mdc-button--raised.mdc-button--accent.mdc-ripple-upgraded::before {\n        top: calc(50% - 100%);\n        left: calc(50% - 100%);\n        width: 200%;\n        height: 200%;\n        transform: scale(0);\n        transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n      .mdc-button--raised.mdc-button--accent.mdc-ripple-upgraded--background-focused::before {\n        opacity: .99999; }\n      .mdc-button--raised.mdc-button--accent.mdc-ripple-upgraded--background-active-fill::before {\n        transition-duration: 120ms;\n        opacity: 1; }\n      .mdc-button--raised.mdc-button--accent.mdc-ripple-upgraded--unbounded::before {\n        top: calc(50% - 50%);\n        top: var(--mdc-ripple-top, calc(50% - 50%));\n        left: calc(50% - 50%);\n        left: var(--mdc-ripple-left, calc(50% - 50%));\n        width: 100%;\n        width: var(--mdc-ripple-fg-size, 100%);\n        height: 100%;\n        height: var(--mdc-ripple-fg-size, 100%);\n        transform: scale(0);\n        transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n      .mdc-button--raised.mdc-button--accent::after {\n        background-color: rgba(255, 255, 255, 0.14);\n        position: absolute;\n        top: calc(50% - 100%);\n        left: calc(50% - 100%);\n        width: 200%;\n        height: 200%;\n        transition: opacity 250ms linear;\n        border-radius: 50%;\n        opacity: 0;\n        pointer-events: none;\n        content: ""; }\n      .mdc-button--raised.mdc-button--accent.mdc-ripple-upgraded::after {\n        top: 0;\n        left: 0;\n        width: 100%;\n        width: var(--mdc-ripple-fg-size, 100%);\n        height: 100%;\n        height: var(--mdc-ripple-fg-size, 100%);\n        transform: scale(0);\n        transform-origin: center center;\n        opacity: 0; }\n      .mdc-button--raised.mdc-button--accent:not(.mdc-ripple-upgraded--unbounded)::after {\n        transform-origin: center center; }\n      .mdc-button--raised.mdc-button--accent.mdc-ripple-upgraded--unbounded::after {\n        top: 0;\n        top: var(--mdc-ripple-top, 0);\n        left: 0;\n        left: var(--mdc-ripple-left, 0);\n        width: 100%;\n        width: var(--mdc-ripple-fg-size, 100%);\n        height: 100%;\n        height: var(--mdc-ripple-fg-size, 100%);\n        transform: scale(0);\n        transform-origin: center center; }\n      .mdc-button--raised.mdc-button--accent.mdc-ripple-upgraded--foreground-activation::after {\n        animation: 300ms mdc-ripple-fg-radius-in forwards, 83ms mdc-ripple-fg-opacity-in forwards; }\n      .mdc-button--raised.mdc-button--accent.mdc-ripple-upgraded--foreground-deactivation::after {\n        transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n        animation: 250ms mdc-ripple-fg-opacity-out; }\n    .mdc-button--theme-dark .mdc-button--raised,\n    .mdc-theme--dark .mdc-button--raised {\n      background-color: #3f51b5;\n      background-color: var(--mdc-theme-primary, #3f51b5); }\n      .mdc-button--theme-dark .mdc-button--raised::before,\n      .mdc-theme--dark .mdc-button--raised::before {\n        color: black; }\n  .mdc-button--primary {\n    color: #3f51b5;\n    color: var(--mdc-theme-primary, #3f51b5); }\n    .mdc-button--theme-dark .mdc-button--primary,\n    .mdc-theme--dark .mdc-button--primary {\n      color: #3f51b5;\n      color: var(--mdc-theme-primary, #3f51b5); }\n    .mdc-button--primary.mdc-button--raised {\n      background-color: #3f51b5;\n      background-color: var(--mdc-theme-primary, #3f51b5);\n      color: white;\n      color: var(--mdc-theme-text-primary-on-primary, white); }\n      .mdc-button--primary.mdc-button--raised::before {\n        color: black; }\n  .mdc-button--accent {\n    color: #ff4081;\n    color: var(--mdc-theme-accent, #ff4081); }\n    .mdc-button--theme-dark .mdc-button--accent,\n    .mdc-theme--dark .mdc-button--accent {\n      color: #ff4081;\n      color: var(--mdc-theme-accent, #ff4081); }\n    .mdc-button--accent.mdc-button--raised {\n      background-color: #ff4081;\n      background-color: var(--mdc-theme-accent, #ff4081);\n      color: white;\n      color: var(--mdc-theme-text-primary-on-accent, white); }\n      .mdc-button--accent.mdc-button--raised::before {\n        color: black; }\n  .mdc-button--compact {\n    padding: 0 8px; }\n  fieldset:disabled .mdc-button, .mdc-button:disabled {\n    color: rgba(0, 0, 0, 0.26);\n    cursor: default;\n    pointer-events: none; }\n    .mdc-button--theme-dark fieldset:disabled .mdc-button,\n    .mdc-theme--dark fieldset:disabled .mdc-button, .mdc-button--theme-dark .mdc-button:disabled,\n    .mdc-theme--dark .mdc-button:disabled {\n      color: rgba(255, 255, 255, 0.3); }\n  fieldset:disabled .mdc-button--raised, .mdc-button--raised:disabled {\n    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n    background-color: rgba(0, 0, 0, 0.12);\n    pointer-events: none; }\n    .mdc-button--theme-dark fieldset:disabled .mdc-button--raised,\n    .mdc-theme--dark fieldset:disabled .mdc-button--raised, .mdc-button--theme-dark .mdc-button--raised:disabled,\n    .mdc-theme--dark .mdc-button--raised:disabled {\n      background-color: rgba(255, 255, 255, 0.12); }\n', ""]);
  }, function (e, t, n) {
    (e.exports = n(2)(void 0)).push([e.i, '/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/** MDC Ripple keyframes are split into their own file so that _mixins.scss can rely on them. */\n@keyframes mdc-ripple-fg-radius-in {\n  from {\n    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n  to {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n@keyframes mdc-ripple-fg-opacity-in {\n  from {\n    opacity: 0;\n    animation-timing-function: linear; }\n  to {\n    opacity: 1; } }\n\n@keyframes mdc-ripple-fg-opacity-out {\n  from {\n    opacity: 1;\n    animation-timing-function: linear; }\n  to {\n    opacity: 0; } }\n\n/**\n * Creates a rule that will be applied when an MDC-Web component is within the context of an RTL layout.\n *\n * Usage Example:\n * ```scss\n * .mdc-foo {\n *   position: absolute;\n *   left: 0;\n *\n *   @include mdc-rtl {\n *     left: auto;\n *     right: 0;\n *   }\n *\n *   &__bar {\n *     margin-left: 4px;\n *     @include mdc-rtl(".mdc-foo") {\n *       margin-left: auto;\n *       margin-right: 4px;\n *     }\n *   }\n * }\n *\n * .mdc-foo--mod {\n *   padding-left: 4px;\n *\n *   @include mdc-rtl {\n *     padding-left: auto;\n *     padding-right: 4px;\n *   }\n * }\n * ```\n *\n * Note that this works by checking for [dir="rtl"] on an ancestor element. While this will work\n * in most cases, it will in some cases lead to false negatives, e.g.\n *\n * ```html\n * <html dir="rtl">\n *   \x3c!-- ... --\x3e\n *   <div dir="ltr">\n *     <div class="mdc-foo">Styled incorrectly as RTL!</div>\n *   </div>\n * </html>\n * ```\n *\n * In the future, selectors such as :dir (http://mdn.io/:dir) will help us mitigate this.\n */\n/**\n * Takes a base box-model property - e.g. margin / border / padding - along with a default\n * direction and value, and emits rules which apply the value to the\n * "<base-property>-<default-direction>" property by default, but flips the direction\n * when within an RTL context.\n *\n * For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-box(margin, left, 8px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-left: 8px;\n *\n *   @include mdc-rtl {\n *     margin-right: 8px;\n *     margin-left: 0;\n *   }\n * }\n * ```\n * whereas:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-box(margin, right, 8px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-right: 8px;\n *\n *   @include mdc-rtl {\n *     margin-right: 0;\n *     margin-left: 8px;\n *   }\n * }\n * ```\n *\n * You can also pass a 4th optional $root-selector argument which will be forwarded to `mdc-rtl`,\n * e.g. `@include mdc-rtl-reflexive-box-property(margin, left, 8px, ".mdc-component")`.\n *\n * Note that this function will always zero out the original value in an RTL context. If you\'re\n * trying to flip the values, use mdc-rtl-reflexive-property().\n */\n/**\n * Takes a base property and emits rules that assign <base-property>-left to <left-value> and\n * <base-property>-right to <right-value> in a LTR context, and vice versa in a RTL context.\n * For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-property(margin, auto, 12px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-left: auto;\n *   margin-right: 12px;\n *\n *   @include mdc-rtl {\n *     margin-left: 12px;\n *     margin-right: auto;\n *   }\n * }\n * ```\n *\n * A 4th optional $root-selector argument can be given, which will be passed to `mdc-rtl`.\n */\n/**\n * Takes an argument specifying a horizontal position property (either "left" or "right") as well\n * as a value, and applies that value to the specified position in a LTR context, and flips it in a\n * RTL context. For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-position(left, 0);\n *   position: absolute;\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n *  .mdc-foo {\n *    position: absolute;\n *    left: 0;\n *    right: initial;\n *\n *    @include mdc-rtl {\n *      right: 0;\n *      left: initial;\n *    }\n *  }\n * ```\n * An optional third $root-selector argument may also be given, which is passed to `mdc-rtl`.\n */\n/* Manual calculation done on SVG */\n/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/**\n * Applies the correct theme color style to the specified property.\n * $property is typically color or background-color, but can be any CSS property that accepts color values.\n * $style should be one of the map keys in $mdc-theme-property-values (_variables.scss).\n */\n/**\n * Creates a rule to be used in MDC-Web components for dark theming, and applies the provided contents.\n * Should provide the $root-selector option if applied to anything other than the root selector.\n * When used with a modifier class, provide a second argument of `true` for the $compound parameter\n * to specify that this should be attached as a compound class.\n *\n * Usage example:\n *\n * ```scss\n * .mdc-foo {\n *   color: black;\n *\n *   @include mdc-theme-dark {\n *     color: white;\n *   }\n *\n *   &__bar {\n *     background: black;\n *\n *     @include mdc-theme-dark(".mdc-foo") {\n *       background: white;\n *     }\n *   }\n * }\n *\n * .mdc-foo--disabled {\n *   opacity: .38;\n *\n *   @include mdc-theme-dark(".mdc-foo", true) {\n *     opacity: .5;\n *   }\n * }\n * ```\n */\n/* Manual calculation done on SVG */\n@keyframes mdc-checkbox-fade-in-background {\n  0% {\n    border-color: rgba(0, 0, 0, 0.54);\n    background-color: transparent; }\n  50% {\n    border-color: #3f51b5;\n    border-color: var(--mdc-theme-primary, #3f51b5);\n    background-color: #3f51b5;\n    background-color: var(--mdc-theme-primary, #3f51b5); } }\n\n@keyframes mdc-checkbox-fade-out-background {\n  0%,\n  80% {\n    border-color: #3f51b5;\n    border-color: var(--mdc-theme-primary, #3f51b5);\n    background-color: #3f51b5;\n    background-color: var(--mdc-theme-primary, #3f51b5); }\n  100% {\n    border-color: rgba(0, 0, 0, 0.54);\n    background-color: transparent; } }\n\n@keyframes mdc-checkbox-fade-in-background-dark {\n  0% {\n    border-color: white;\n    background-color: transparent; }\n  50% {\n    border-color: #3f51b5;\n    border-color: var(--mdc-theme-primary, #3f51b5);\n    background-color: #3f51b5;\n    background-color: var(--mdc-theme-primary, #3f51b5); } }\n\n@keyframes mdc-checkbox-fade-out-background-dark {\n  0%,\n  80% {\n    border-color: #3f51b5;\n    border-color: var(--mdc-theme-primary, #3f51b5);\n    background-color: #3f51b5;\n    background-color: var(--mdc-theme-primary, #3f51b5); }\n  100% {\n    border-color: white;\n    background-color: transparent; } }\n\n@keyframes mdc-checkbox-unchecked-checked-checkmark-path {\n  0%,\n  50% {\n    stroke-dashoffset: 29.78334; }\n  50% {\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }\n  100% {\n    stroke-dashoffset: 0; } }\n\n@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {\n  0%,\n  68.2% {\n    transform: scaleX(0); }\n  68.2% {\n    animation-timing-function: cubic-bezier(0, 0, 0, 1); }\n  100% {\n    transform: scaleX(1); } }\n\n@keyframes mdc-checkbox-checked-unchecked-checkmark-path {\n  from {\n    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);\n    opacity: 1;\n    stroke-dashoffset: 0; }\n  to {\n    opacity: 0;\n    stroke-dashoffset: -29.78334; } }\n\n@keyframes mdc-checkbox-checked-indeterminate-checkmark {\n  from {\n    transform: rotate(0deg);\n    opacity: 1;\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }\n  to {\n    transform: rotate(45deg);\n    opacity: 0; } }\n\n@keyframes mdc-checkbox-indeterminate-checked-checkmark {\n  from {\n    transform: rotate(45deg);\n    opacity: 0;\n    animation-timing-function: cubic-bezier(0.14, 0, 0, 1); }\n  to {\n    transform: rotate(360deg);\n    opacity: 1; } }\n\n@keyframes mdc-checkbox-checked-indeterminate-mixedmark {\n  from {\n    transform: rotate(-45deg);\n    opacity: 0;\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }\n  to {\n    transform: rotate(0deg);\n    opacity: 1; } }\n\n@keyframes mdc-checkbox-indeterminate-checked-mixedmark {\n  from {\n    transform: rotate(0deg);\n    opacity: 1;\n    animation-timing-function: cubic-bezier(0.14, 0, 0, 1); }\n  to {\n    transform: rotate(315deg);\n    opacity: 0; } }\n\n@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {\n  0% {\n    transform: scaleX(1);\n    opacity: 1;\n    animation-timing-function: linear; }\n  32.8%,\n  100% {\n    transform: scaleX(0);\n    opacity: 0; } }\n\n.mdc-checkbox {\n  --mdc-ripple-surface-width: 0;\n  --mdc-ripple-surface-height: 0;\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  will-change: transform, opacity;\n  -webkit-tap-highlight-color: transparent;\n  display: inline-block;\n  position: relative;\n  box-sizing: content-box;\n  flex: 0 0 18px;\n  width: 18px;\n  height: 18px;\n  padding: 11px;\n  line-height: 0;\n  white-space: nowrap;\n  cursor: pointer;\n  vertical-align: bottom; }\n  .mdc-checkbox:not(.mdc-ripple-upgraded):hover::before, .mdc-checkbox:not(.mdc-ripple-upgraded):focus::before, .mdc-checkbox:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 85ms;\n    opacity: .6; }\n  .mdc-checkbox::before {\n    background-color: rgba(63, 81, 181, 0.14);\n    position: absolute;\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transition: opacity 250ms linear;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: ""; }\n    @supports (background-color: color(green a(10%))) {\n      .mdc-checkbox::before {\n        background-color: color(var(--mdc-theme-primary, #3f51b5) a(14%)); } }\n  .mdc-checkbox.mdc-ripple-upgraded::before {\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transform: scale(0);\n    transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n  .mdc-checkbox.mdc-ripple-upgraded--background-focused::before {\n    opacity: .99999; }\n  .mdc-checkbox.mdc-ripple-upgraded--background-active-fill::before {\n    transition-duration: 120ms;\n    opacity: 1; }\n  .mdc-checkbox.mdc-ripple-upgraded--unbounded::before {\n    top: calc(50% - 50%);\n    top: var(--mdc-ripple-top, calc(50% - 50%));\n    left: calc(50% - 50%);\n    left: var(--mdc-ripple-left, calc(50% - 50%));\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n  .mdc-checkbox::after {\n    background-color: rgba(63, 81, 181, 0.14);\n    position: absolute;\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transition: opacity 250ms linear;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: ""; }\n    @supports (background-color: color(green a(10%))) {\n      .mdc-checkbox::after {\n        background-color: color(var(--mdc-theme-primary, #3f51b5) a(14%)); } }\n  .mdc-checkbox.mdc-ripple-upgraded::after {\n    top: 0;\n    left: 0;\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform-origin: center center;\n    opacity: 0; }\n  .mdc-checkbox:not(.mdc-ripple-upgraded--unbounded)::after {\n    transform-origin: center center; }\n  .mdc-checkbox.mdc-ripple-upgraded--unbounded::after {\n    top: 0;\n    top: var(--mdc-ripple-top, 0);\n    left: 0;\n    left: var(--mdc-ripple-left, 0);\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform-origin: center center; }\n  .mdc-checkbox.mdc-ripple-upgraded--foreground-activation::after {\n    animation: 300ms mdc-ripple-fg-radius-in forwards, 83ms mdc-ripple-fg-opacity-in forwards; }\n  .mdc-checkbox.mdc-ripple-upgraded--foreground-deactivation::after {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    animation: 250ms mdc-ripple-fg-opacity-out; }\n  .mdc-checkbox::before, .mdc-checkbox::after {\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%; }\n  .mdc-checkbox.mdc-ripple-upgraded--unbounded .mdc-checkbox__background::before {\n    content: none; }\n  .mdc-checkbox__background {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    left: 11px;\n    right: initial;\n    display: inline-flex;\n    top: 11px;\n    align-items: center;\n    justify-content: center;\n    box-sizing: border-box;\n    pointer-events: none;\n    width: 45%;\n    height: 45%;\n    transition: background-color 90ms 0ms cubic-bezier(0.4, 0, 1, 1), border-color 90ms 0ms cubic-bezier(0.4, 0, 1, 1);\n    border: 2px solid rgba(0, 0, 0, 0.54);\n    border-radius: 2px;\n    background-color: transparent;\n    will-change: background-color, border-color; }\n    [dir="rtl"] .mdc-checkbox .mdc-checkbox__background,\n    .mdc-checkbox[dir="rtl"] .mdc-checkbox__background {\n      left: initial;\n      right: 11px; }\n    .mdc-checkbox--theme-dark .mdc-checkbox__background,\n    .mdc-theme--dark .mdc-checkbox__background {\n      border-color: white; }\n    .mdc-checkbox__background::before {\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      transform: scale(0, 0);\n      transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 1, 1), transform 90ms 0ms cubic-bezier(0.4, 0, 1, 1);\n      border-radius: 50%;\n      content: "";\n      opacity: 0;\n      pointer-events: none;\n      will-change: opacity, transform;\n      background: #3f51b5;\n      background: var(--mdc-theme-primary, #3f51b5); }\n  .mdc-checkbox__native-control {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n    cursor: inherit;\n    opacity: 0; }\n  .mdc-checkbox__checkmark {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    transition: opacity 180ms 0ms cubic-bezier(0.4, 0, 1, 1);\n    opacity: 0;\n    fill: white; }\n    .mdc-checkbox__checkmark__path {\n      transition: stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 1, 1);\n      stroke: white !important;\n      stroke-width: 3.12px;\n      stroke-dashoffset: 29.78334;\n      stroke-dasharray: 29.78334; }\n  .mdc-checkbox__mixedmark {\n    width: 100%;\n    height: 2px;\n    transform: scaleX(0) rotate(0deg);\n    transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 1, 1), transform 90ms 0ms cubic-bezier(0.4, 0, 1, 1);\n    background-color: white;\n    opacity: 0; }\n\n.mdc-checkbox__native-control:focus ~ .mdc-checkbox__background::before {\n  transform: scale(2.75, 2.75);\n  transition: opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1), transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  opacity: .26; }\n\n.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background {\n  transition: border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  border-color: #3f51b5;\n  border-color: var(--mdc-theme-primary, #3f51b5);\n  background-color: #3f51b5;\n  background-color: var(--mdc-theme-primary, #3f51b5); }\n  .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background .mdc-checkbox__checkmark {\n    transition: opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1), transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);\n    opacity: 1; }\n    .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background .mdc-checkbox__checkmark__path {\n      stroke-dashoffset: 0; }\n  .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background .mdc-checkbox__mixedmark {\n    transform: scaleX(1) rotate(-45deg); }\n\n.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {\n  border-color: #3f51b5;\n  border-color: var(--mdc-theme-primary, #3f51b5);\n  background-color: #3f51b5;\n  background-color: var(--mdc-theme-primary, #3f51b5); }\n  .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background .mdc-checkbox__checkmark {\n    transform: rotate(45deg);\n    transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 1, 1), transform 90ms 0ms cubic-bezier(0.4, 0, 1, 1);\n    opacity: 0; }\n    .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background .mdc-checkbox__checkmark__path {\n      stroke-dashoffset: 0; }\n  .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background .mdc-checkbox__mixedmark {\n    transform: scaleX(1) rotate(0deg);\n    opacity: 1; }\n\n.mdc-checkbox__native-control:disabled,\nfieldset:disabled .mdc-checkbox__native-control,\n[aria-disabled="true"] .mdc-checkbox__native-control {\n  cursor: default; }\n  .mdc-checkbox__native-control:disabled ~ .mdc-checkbox__background,\n  fieldset:disabled .mdc-checkbox__native-control ~ .mdc-checkbox__background,\n  [aria-disabled="true"] .mdc-checkbox__native-control ~ .mdc-checkbox__background {\n    border-color: rgba(0, 0, 0, 0.26); }\n    .mdc-checkbox--theme-dark .mdc-checkbox__native-control:disabled ~ .mdc-checkbox__background,\n    .mdc-theme--dark .mdc-checkbox__native-control:disabled ~ .mdc-checkbox__background, .mdc-checkbox--theme-dark\n    fieldset:disabled .mdc-checkbox__native-control ~ .mdc-checkbox__background,\n    .mdc-theme--dark\n    fieldset:disabled .mdc-checkbox__native-control ~ .mdc-checkbox__background, .mdc-checkbox--theme-dark\n    [aria-disabled="true"] .mdc-checkbox__native-control ~ .mdc-checkbox__background,\n    .mdc-theme--dark\n    [aria-disabled="true"] .mdc-checkbox__native-control ~ .mdc-checkbox__background {\n      border-color: rgba(255, 255, 255, 0.3); }\n  .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background, .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background,\n  fieldset:disabled .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,\n  fieldset:disabled .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background,\n  [aria-disabled="true"] .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,\n  [aria-disabled="true"] .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {\n    border-color: transparent;\n    background-color: rgba(0, 0, 0, 0.26); }\n    .mdc-checkbox--theme-dark .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,\n    .mdc-theme--dark .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background, .mdc-checkbox--theme-dark .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background,\n    .mdc-theme--dark .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background, .mdc-checkbox--theme-dark\n    fieldset:disabled .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,\n    .mdc-theme--dark\n    fieldset:disabled .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background, .mdc-checkbox--theme-dark\n    fieldset:disabled .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background,\n    .mdc-theme--dark\n    fieldset:disabled .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background, .mdc-checkbox--theme-dark\n    [aria-disabled="true"] .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,\n    .mdc-theme--dark\n    [aria-disabled="true"] .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background, .mdc-checkbox--theme-dark\n    [aria-disabled="true"] .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background,\n    .mdc-theme--dark\n    [aria-disabled="true"] .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {\n      background-color: rgba(255, 255, 255, 0.3); }\n\n.mdc-checkbox--disabled {\n  cursor: default;\n  pointer-events: none; }\n\n.mdc-checkbox--upgraded .mdc-checkbox__background,\n.mdc-checkbox--upgraded .mdc-checkbox__checkmark,\n.mdc-checkbox--upgraded .mdc-checkbox__checkmark__path,\n.mdc-checkbox--upgraded .mdc-checkbox__mixedmark {\n  transition: none !important; }\n\n.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background, .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background {\n  animation: mdc-checkbox-fade-in-background 180ms linear; }\n  .mdc-checkbox--theme-dark .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,\n  .mdc-theme--dark .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background, .mdc-checkbox--theme-dark .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,\n  .mdc-theme--dark .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background {\n    animation-name: mdc-checkbox-fade-in-background-dark; }\n\n.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background, .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {\n  animation: mdc-checkbox-fade-out-background 180ms linear; }\n  .mdc-checkbox--theme-dark .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,\n  .mdc-theme--dark .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background, .mdc-checkbox--theme-dark .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background,\n  .mdc-theme--dark .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {\n    animation-name: mdc-checkbox-fade-out-background-dark; }\n\n.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark__path {\n  animation: 180ms linear 0s mdc-checkbox-unchecked-checked-checkmark-path;\n  transition: none; }\n\n.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {\n  animation: 90ms linear 0s mdc-checkbox-unchecked-indeterminate-mixedmark;\n  transition: none; }\n\n.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark__path {\n  animation: 90ms linear 0s mdc-checkbox-checked-unchecked-checkmark-path;\n  transition: none; }\n\n.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {\n  animation: 90ms linear 0s mdc-checkbox-checked-indeterminate-checkmark;\n  transition: none; }\n\n.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {\n  animation: 90ms linear 0s mdc-checkbox-checked-indeterminate-mixedmark;\n  transition: none; }\n\n.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {\n  animation: 500ms linear 0s mdc-checkbox-indeterminate-checked-checkmark;\n  transition: none; }\n\n.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {\n  animation: 500ms linear 0s mdc-checkbox-indeterminate-checked-mixedmark;\n  transition: none; }\n\n.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {\n  animation: 300ms linear 0s mdc-checkbox-indeterminate-unchecked-mixedmark;\n  transition: none; }\n', ""]);
  }, function (e, t, n) {
    (e.exports = n(2)(void 0)).push([e.i, '/**\n * The css property used for elevation. In most cases this should not be changed. It is exposed\n * as a variable for abstraction / easy use when needing to reference the property directly, for\n * example in a `will-change` rule.\n */\n/**\n * The default duration value for elevation transitions.\n */\n/**\n * The default easing value for elevation transitions.\n */\n/**\n * Applies the correct css rules to an element to give it the elevation specified by $z-value.\n * The $z-value must be between 0 and 24.\n */\n/**\n * Returns a string that can be used as the value for a `transition` property for elevation.\n * Calling this function directly is useful in situations where a component needs to transition\n * more than one property.\n *\n * ```scss\n * .foo {\n *   transition: mdc-elevation-transition-rule(), opacity 100ms ease;\n *   will-change: $mdc-elevation-property, opacity;\n * }\n * ```\n */\n/**\n * Applies the correct css rules needed to have an element transition between elevations.\n * This mixin should be applied to elements whose elevation values will change depending on their\n * context (e.g. when active or disabled).\n */\n/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/** MDC Ripple keyframes are split into their own file so that _mixins.scss can rely on them. */\n@keyframes mdc-ripple-fg-radius-in {\n  from {\n    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n  to {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n@keyframes mdc-ripple-fg-opacity-in {\n  from {\n    opacity: 0;\n    animation-timing-function: linear; }\n  to {\n    opacity: 1; } }\n\n@keyframes mdc-ripple-fg-opacity-out {\n  from {\n    opacity: 1;\n    animation-timing-function: linear; }\n  to {\n    opacity: 0; } }\n\n/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/**\n * Applies the correct theme color style to the specified property.\n * $property is typically color or background-color, but can be any CSS property that accepts color values.\n * $style should be one of the map keys in $mdc-theme-property-values (_variables.scss).\n */\n/**\n * Creates a rule to be used in MDC-Web components for dark theming, and applies the provided contents.\n * Should provide the $root-selector option if applied to anything other than the root selector.\n * When used with a modifier class, provide a second argument of `true` for the $compound parameter\n * to specify that this should be attached as a compound class.\n *\n * Usage example:\n *\n * ```scss\n * .mdc-foo {\n *   color: black;\n *\n *   @include mdc-theme-dark {\n *     color: white;\n *   }\n *\n *   &__bar {\n *     background: black;\n *\n *     @include mdc-theme-dark(".mdc-foo") {\n *       background: white;\n *     }\n *   }\n * }\n *\n * .mdc-foo--disabled {\n *   opacity: .38;\n *\n *   @include mdc-theme-dark(".mdc-foo", true) {\n *     opacity: .5;\n *   }\n * }\n * ```\n */\n.mdc-fab {\n  --mdc-ripple-surface-width: 0;\n  --mdc-ripple-surface-height: 0;\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  will-change: transform, opacity;\n  -webkit-tap-highlight-color: transparent;\n  display: inline-flex;\n  position: relative;\n  justify-content: center;\n  width: 56px;\n  height: 56px;\n  padding: 0;\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  border: none;\n  border-radius: 50%;\n  cursor: pointer;\n  user-select: none;\n  box-sizing: border-box;\n  fill: currentColor;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  overflow: hidden;\n  background-color: #ff4081;\n  background-color: var(--mdc-theme-accent, #ff4081);\n  color: white;\n  color: var(--mdc-theme-text-primary-on-accent, white);\n  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12); }\n  .mdc-fab:not(.mdc-ripple-upgraded):hover::before, .mdc-fab:not(.mdc-ripple-upgraded):focus::before, .mdc-fab:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 85ms;\n    opacity: .6; }\n  .mdc-fab::before {\n    background-color: rgba(255, 255, 255, 0.16);\n    position: absolute;\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transition: opacity 250ms linear;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: ""; }\n  .mdc-fab.mdc-ripple-upgraded::before {\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transform: scale(0);\n    transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n  .mdc-fab.mdc-ripple-upgraded--background-focused::before {\n    opacity: .99999; }\n  .mdc-fab.mdc-ripple-upgraded--background-active-fill::before {\n    transition-duration: 120ms;\n    opacity: 1; }\n  .mdc-fab.mdc-ripple-upgraded--unbounded::before {\n    top: calc(50% - 50%);\n    top: var(--mdc-ripple-top, calc(50% - 50%));\n    left: calc(50% - 50%);\n    left: var(--mdc-ripple-left, calc(50% - 50%));\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n  .mdc-fab::after {\n    background-color: rgba(255, 255, 255, 0.16);\n    position: absolute;\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transition: opacity 250ms linear;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: ""; }\n  .mdc-fab.mdc-ripple-upgraded::after {\n    top: 0;\n    left: 0;\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform-origin: center center;\n    opacity: 0; }\n  .mdc-fab:not(.mdc-ripple-upgraded--unbounded)::after {\n    transform-origin: center center; }\n  .mdc-fab.mdc-ripple-upgraded--unbounded::after {\n    top: 0;\n    top: var(--mdc-ripple-top, 0);\n    left: 0;\n    left: var(--mdc-ripple-left, 0);\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform-origin: center center; }\n  .mdc-fab.mdc-ripple-upgraded--foreground-activation::after {\n    animation: 300ms mdc-ripple-fg-radius-in forwards, 83ms mdc-ripple-fg-opacity-in forwards; }\n  .mdc-fab.mdc-ripple-upgraded--foreground-deactivation::after {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    animation: 250ms mdc-ripple-fg-opacity-out; }\n  .mdc-fab:not(.mdc-ripple-upgraded) {\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.18); }\n  .mdc-fab--mini {\n    width: 40px;\n    height: 40px; }\n  .mdc-fab--plain {\n    background-color: white;\n    color: rgba(0, 0, 0, 0.87);\n    color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87)); }\n    .mdc-fab--plain::before {\n      background-color: rgba(0, 0, 0, 0.06);\n      position: absolute;\n      top: calc(50% - 100%);\n      left: calc(50% - 100%);\n      width: 200%;\n      height: 200%;\n      transition: opacity 250ms linear;\n      border-radius: 50%;\n      opacity: 0;\n      pointer-events: none;\n      content: ""; }\n    .mdc-fab--plain.mdc-ripple-upgraded::before {\n      top: calc(50% - 100%);\n      left: calc(50% - 100%);\n      width: 200%;\n      height: 200%;\n      transform: scale(0);\n      transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n    .mdc-fab--plain.mdc-ripple-upgraded--background-focused::before {\n      opacity: .99999; }\n    .mdc-fab--plain.mdc-ripple-upgraded--background-active-fill::before {\n      transition-duration: 120ms;\n      opacity: 1; }\n    .mdc-fab--plain.mdc-ripple-upgraded--unbounded::before {\n      top: calc(50% - 50%);\n      top: var(--mdc-ripple-top, calc(50% - 50%));\n      left: calc(50% - 50%);\n      left: var(--mdc-ripple-left, calc(50% - 50%));\n      width: 100%;\n      width: var(--mdc-ripple-fg-size, 100%);\n      height: 100%;\n      height: var(--mdc-ripple-fg-size, 100%);\n      transform: scale(0);\n      transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n    .mdc-fab--plain::after {\n      background-color: rgba(0, 0, 0, 0.06);\n      position: absolute;\n      top: calc(50% - 100%);\n      left: calc(50% - 100%);\n      width: 200%;\n      height: 200%;\n      transition: opacity 250ms linear;\n      border-radius: 50%;\n      opacity: 0;\n      pointer-events: none;\n      content: ""; }\n    .mdc-fab--plain.mdc-ripple-upgraded::after {\n      top: 0;\n      left: 0;\n      width: 100%;\n      width: var(--mdc-ripple-fg-size, 100%);\n      height: 100%;\n      height: var(--mdc-ripple-fg-size, 100%);\n      transform: scale(0);\n      transform-origin: center center;\n      opacity: 0; }\n    .mdc-fab--plain:not(.mdc-ripple-upgraded--unbounded)::after {\n      transform-origin: center center; }\n    .mdc-fab--plain.mdc-ripple-upgraded--unbounded::after {\n      top: 0;\n      top: var(--mdc-ripple-top, 0);\n      left: 0;\n      left: var(--mdc-ripple-left, 0);\n      width: 100%;\n      width: var(--mdc-ripple-fg-size, 100%);\n      height: 100%;\n      height: var(--mdc-ripple-fg-size, 100%);\n      transform: scale(0);\n      transform-origin: center center; }\n    .mdc-fab--plain.mdc-ripple-upgraded--foreground-activation::after {\n      animation: 300ms mdc-ripple-fg-radius-in forwards, 83ms mdc-ripple-fg-opacity-in forwards; }\n    .mdc-fab--plain.mdc-ripple-upgraded--foreground-deactivation::after {\n      transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n      animation: 250ms mdc-ripple-fg-opacity-out; }\n  .mdc-fab:active, .mdc-fab:focus {\n    outline: none; }\n  .mdc-fab:active {\n    box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12); }\n  .mdc-fab:hover {\n    cursor: pointer; }\n  .mdc-fab::-moz-focus-inner {\n    padding: 0;\n    border: 0; }\n  .mdc-fab > svg {\n    width: 100%; }\n  fieldset:disabled .mdc-fab, .mdc-fab:disabled {\n    background-color: rgba(0, 0, 0, 0.12);\n    color: rgba(0, 0, 0, 0.26);\n    cursor: default;\n    pointer-events: none; }\n\n.mdc-fab__icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%; }\n', ""]);
  }, function (e, t, n) {
    (e.exports = n(2)(void 0)).push([e.i, '/**\n * Creates a rule that will be applied when an MDC-Web component is within the context of an RTL layout.\n *\n * Usage Example:\n * ```scss\n * .mdc-foo {\n *   position: absolute;\n *   left: 0;\n *\n *   @include mdc-rtl {\n *     left: auto;\n *     right: 0;\n *   }\n *\n *   &__bar {\n *     margin-left: 4px;\n *     @include mdc-rtl(".mdc-foo") {\n *       margin-left: auto;\n *       margin-right: 4px;\n *     }\n *   }\n * }\n *\n * .mdc-foo--mod {\n *   padding-left: 4px;\n *\n *   @include mdc-rtl {\n *     padding-left: auto;\n *     padding-right: 4px;\n *   }\n * }\n * ```\n *\n * Note that this works by checking for [dir="rtl"] on an ancestor element. While this will work\n * in most cases, it will in some cases lead to false negatives, e.g.\n *\n * ```html\n * <html dir="rtl">\n *   \x3c!-- ... --\x3e\n *   <div dir="ltr">\n *     <div class="mdc-foo">Styled incorrectly as RTL!</div>\n *   </div>\n * </html>\n * ```\n *\n * In the future, selectors such as :dir (http://mdn.io/:dir) will help us mitigate this.\n */\n/**\n * Takes a base box-model property - e.g. margin / border / padding - along with a default\n * direction and value, and emits rules which apply the value to the\n * "<base-property>-<default-direction>" property by default, but flips the direction\n * when within an RTL context.\n *\n * For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-box(margin, left, 8px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-left: 8px;\n *\n *   @include mdc-rtl {\n *     margin-right: 8px;\n *     margin-left: 0;\n *   }\n * }\n * ```\n * whereas:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-box(margin, right, 8px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-right: 8px;\n *\n *   @include mdc-rtl {\n *     margin-right: 0;\n *     margin-left: 8px;\n *   }\n * }\n * ```\n *\n * You can also pass a 4th optional $root-selector argument which will be forwarded to `mdc-rtl`,\n * e.g. `@include mdc-rtl-reflexive-box-property(margin, left, 8px, ".mdc-component")`.\n *\n * Note that this function will always zero out the original value in an RTL context. If you\'re\n * trying to flip the values, use mdc-rtl-reflexive-property().\n */\n/**\n * Takes a base property and emits rules that assign <base-property>-left to <left-value> and\n * <base-property>-right to <right-value> in a LTR context, and vice versa in a RTL context.\n * For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-property(margin, auto, 12px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-left: auto;\n *   margin-right: 12px;\n *\n *   @include mdc-rtl {\n *     margin-left: 12px;\n *     margin-right: auto;\n *   }\n * }\n * ```\n *\n * A 4th optional $root-selector argument can be given, which will be passed to `mdc-rtl`.\n */\n/**\n * Takes an argument specifying a horizontal position property (either "left" or "right") as well\n * as a value, and applies that value to the specified position in a LTR context, and flips it in a\n * RTL context. For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-position(left, 0);\n *   position: absolute;\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n *  .mdc-foo {\n *    position: absolute;\n *    left: 0;\n *    right: initial;\n *\n *    @include mdc-rtl {\n *      right: 0;\n *      left: initial;\n *    }\n *  }\n * ```\n * An optional third $root-selector argument may also be given, which is passed to `mdc-rtl`.\n */\n/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/**\n * Applies the correct theme color style to the specified property.\n * $property is typically color or background-color, but can be any CSS property that accepts color values.\n * $style should be one of the map keys in $mdc-theme-property-values (_variables.scss).\n */\n/**\n * Creates a rule to be used in MDC-Web components for dark theming, and applies the provided contents.\n * Should provide the $root-selector option if applied to anything other than the root selector.\n * When used with a modifier class, provide a second argument of `true` for the $compound parameter\n * to specify that this should be attached as a compound class.\n *\n * Usage example:\n *\n * ```scss\n * .mdc-foo {\n *   color: black;\n *\n *   @include mdc-theme-dark {\n *     color: white;\n *   }\n *\n *   &__bar {\n *     background: black;\n *\n *     @include mdc-theme-dark(".mdc-foo") {\n *       background: white;\n *     }\n *   }\n * }\n *\n * .mdc-foo--disabled {\n *   opacity: .38;\n *\n *   @include mdc-theme-dark(".mdc-foo", true) {\n *     opacity: .5;\n *   }\n * }\n * ```\n */\n/* TODO(sgomes): Figure out what to do about desktop font sizes. */\n/* TODO(sgomes): Figure out what to do about i18n and i18n font sizes. */\n/* stylelint-disable selector-no-type */\n.mdc-form-field {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  font-weight: 400;\n  letter-spacing: 0.04em;\n  line-height: 1.25rem;\n  color: rgba(0, 0, 0, 0.87);\n  color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87));\n  display: inline-flex;\n  align-items: center;\n  vertical-align: middle; }\n  .mdc-form-field--theme-dark,\n  .mdc-theme--dark .mdc-form-field {\n    color: white;\n    color: var(--mdc-theme-text-primary-on-dark, white); }\n  .mdc-form-field > label {\n    order: 0;\n    margin-right: auto;\n    padding-left: 4px; }\n  [dir="rtl"] .mdc-form-field > label, .mdc-form-field[dir="rtl"] > label {\n    margin-left: auto;\n    padding-right: 4px; }\n\n.mdc-form-field--align-end > label {\n  order: -1;\n  margin-left: auto;\n  padding-right: 4px; }\n\n[dir="rtl"] .mdc-form-field--align-end > label, .mdc-form-field--align-end[dir="rtl"] > label {\n  margin-right: auto;\n  padding-left: 4px; }\n\n/* stylelint-enable selector-no-type */\n', ""]);
  }, function (e, t, n) {
    (e.exports = n(2)(void 0)).push([e.i, "/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns \"dark\" for dark text and \"light\" for light text.\n */\n/*\n  Main theme colors.\n  If you're a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/**\n * Applies the correct theme color style to the specified property.\n * $property is typically color or background-color, but can be any CSS property that accepts color values.\n * $style should be one of the map keys in $mdc-theme-property-values (_variables.scss).\n */\n/**\n * Creates a rule to be used in MDC-Web components for dark theming, and applies the provided contents.\n * Should provide the $root-selector option if applied to anything other than the root selector.\n * When used with a modifier class, provide a second argument of `true` for the $compound parameter\n * to specify that this should be attached as a compound class.\n *\n * Usage example:\n *\n * ```scss\n * .mdc-foo {\n *   color: black;\n *\n *   @include mdc-theme-dark {\n *     color: white;\n *   }\n *\n *   &__bar {\n *     background: black;\n *\n *     @include mdc-theme-dark(\".mdc-foo\") {\n *       background: white;\n *     }\n *   }\n * }\n *\n * .mdc-foo--disabled {\n *   opacity: .38;\n *\n *   @include mdc-theme-dark(\".mdc-foo\", true) {\n *     opacity: .5;\n *   }\n * }\n * ```\n */\n@keyframes primary-indeterminate-translate {\n  0% {\n    transform: translateX(0); }\n  20% {\n    animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);\n    transform: translateX(0); }\n  59.15% {\n    animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);\n    transform: translateX(83.67142%); }\n  100% {\n    transform: translateX(200.61106%); } }\n\n@keyframes primary-indeterminate-scale {\n  0% {\n    transform: scaleX(0.08); }\n  36.65% {\n    animation-timing-function: cubic-bezier(0.33473, 0.12482, 0.78584, 1);\n    transform: scaleX(0.08); }\n  69.15% {\n    animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);\n    transform: scaleX(0.66148); }\n  100% {\n    transform: scaleX(0.08); } }\n\n@keyframes secondary-indeterminate-translate {\n  0% {\n    animation-timing-function: cubic-bezier(0.15, 0, 0.51506, 0.40969);\n    transform: translateX(0); }\n  25% {\n    animation-timing-function: cubic-bezier(0.31033, 0.28406, 0.8, 0.73371);\n    transform: translateX(37.65191%); }\n  48.35% {\n    animation-timing-function: cubic-bezier(0.4, 0.62704, 0.6, 0.90203);\n    transform: translateX(84.38617%); }\n  100% {\n    transform: translateX(160.27778%); } }\n\n@keyframes secondary-indeterminate-scale {\n  0% {\n    animation-timing-function: cubic-bezier(0.20503, 0.05705, 0.57661, 0.45397);\n    transform: scaleX(0.08); }\n  19.15% {\n    animation-timing-function: cubic-bezier(0.15231, 0.19643, 0.64837, 1.00432);\n    transform: scaleX(0.4571); }\n  44.15% {\n    animation-timing-function: cubic-bezier(0.25776, -0.00316, 0.21176, 1.38179);\n    transform: scaleX(0.72796); }\n  100% {\n    transform: scaleX(0.08); } }\n\n@keyframes buffering {\n  to {\n    transform: translateX(-10px); } }\n\n@keyframes primary-indeterminate-translate-reverse {\n  0% {\n    transform: translateX(0); }\n  20% {\n    animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);\n    transform: translateX(0); }\n  59.15% {\n    animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);\n    transform: translateX(-83.67142%); }\n  100% {\n    transform: translateX(-200.61106%); } }\n\n@keyframes secondary-indeterminate-translate-reverse {\n  0% {\n    animation-timing-function: cubic-bezier(0.15, 0, 0.51506, 0.40969);\n    transform: translateX(0); }\n  25% {\n    animation-timing-function: cubic-bezier(0.31033, 0.28406, 0.8, 0.73371);\n    transform: translateX(-37.65191%); }\n  48.35% {\n    animation-timing-function: cubic-bezier(0.4, 0.62704, 0.6, 0.90203);\n    transform: translateX(-84.38617%); }\n  100% {\n    transform: translateX(-160.27778%); } }\n\n@keyframes buffering-reverse {\n  to {\n    transform: translateX(10px); } }\n\n.mdc-linear-progress {\n  position: relative;\n  width: 100%;\n  height: 4px;\n  transform: translateZ(0);\n  transition: opacity 250ms 0ms cubic-bezier(0.4, 0, 1, 1);\n  overflow: hidden; }\n  .mdc-linear-progress__bar {\n    animation: none;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    transform-origin: top left;\n    transition: transform 250ms 0ms cubic-bezier(0.4, 0, 1, 1); }\n  .mdc-linear-progress__bar-inner {\n    background-color: #3f51b5;\n    background-color: var(--mdc-theme-primary, #3f51b5);\n    animation: none;\n    display: inline-block;\n    position: absolute;\n    width: 100%;\n    height: 100%; }\n  .mdc-linear-progress--accent .mdc-linear-progress__bar-inner {\n    background-color: #ff4081;\n    background-color: var(--mdc-theme-accent, #ff4081); }\n  .mdc-linear-progress__buffering-dots {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    background-image: url(\"data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E\");\n    background-repeat: repeat-x;\n    background-size: 10px 4px;\n    animation: buffering 250ms infinite linear; }\n  .mdc-linear-progress__buffer {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    transform-origin: top left;\n    transition: transform 250ms 0ms cubic-bezier(0.4, 0, 1, 1);\n    background-color: #e6e6e6; }\n  .mdc-linear-progress__secondary-bar {\n    visibility: hidden; }\n  .mdc-linear-progress--indeterminate .mdc-linear-progress__bar {\n    transition: none; }\n  .mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {\n    animation: primary-indeterminate-translate 2s infinite linear;\n    left: -145.166611%; }\n    .mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner {\n      animation: primary-indeterminate-scale 2s infinite linear; }\n  .mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {\n    animation: secondary-indeterminate-translate 2s infinite linear;\n    left: -54.888891%;\n    visibility: visible; }\n    .mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar > .mdc-linear-progress__bar-inner {\n      animation: secondary-indeterminate-scale 2s infinite linear; }\n  .mdc-linear-progress--reversed .mdc-linear-progress__bar,\n  .mdc-linear-progress--reversed .mdc-linear-progress__buffer {\n    right: 0;\n    transform-origin: center right; }\n  .mdc-linear-progress--reversed .mdc-linear-progress__primary-bar {\n    animation-name: primary-indeterminate-translate-reverse; }\n  .mdc-linear-progress--reversed .mdc-linear-progress__secondary-bar {\n    animation-name: secondary-indeterminate-translate-reverse; }\n  .mdc-linear-progress--reversed .mdc-linear-progress__buffering-dots {\n    animation: buffering-reverse 250ms infinite linear; }\n  .mdc-linear-progress--closed {\n    opacity: 0; }\n\n.mdc-linear-progress--indeterminate.mdc-linear-progress--reversed .mdc-linear-progress__primary-bar {\n  right: -145.166611%;\n  left: auto; }\n\n.mdc-linear-progress--indeterminate.mdc-linear-progress--reversed .mdc-linear-progress__secondary-bar {\n  right: -54.888891%;\n  left: auto; }\n", ""]);
  }, function (e, t, n) {
    (e.exports = n(2)(void 0)).push([e.i, '/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/** MDC Ripple keyframes are split into their own file so that _mixins.scss can rely on them. */\n@keyframes mdc-ripple-fg-radius-in {\n  from {\n    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n  to {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n@keyframes mdc-ripple-fg-opacity-in {\n  from {\n    opacity: 0;\n    animation-timing-function: linear; }\n  to {\n    opacity: 1; } }\n\n@keyframes mdc-ripple-fg-opacity-out {\n  from {\n    opacity: 1;\n    animation-timing-function: linear; }\n  to {\n    opacity: 0; } }\n\n/**\n * Creates a rule that will be applied when an MDC-Web component is within the context of an RTL layout.\n *\n * Usage Example:\n * ```scss\n * .mdc-foo {\n *   position: absolute;\n *   left: 0;\n *\n *   @include mdc-rtl {\n *     left: auto;\n *     right: 0;\n *   }\n *\n *   &__bar {\n *     margin-left: 4px;\n *     @include mdc-rtl(".mdc-foo") {\n *       margin-left: auto;\n *       margin-right: 4px;\n *     }\n *   }\n * }\n *\n * .mdc-foo--mod {\n *   padding-left: 4px;\n *\n *   @include mdc-rtl {\n *     padding-left: auto;\n *     padding-right: 4px;\n *   }\n * }\n * ```\n *\n * Note that this works by checking for [dir="rtl"] on an ancestor element. While this will work\n * in most cases, it will in some cases lead to false negatives, e.g.\n *\n * ```html\n * <html dir="rtl">\n *   \x3c!-- ... --\x3e\n *   <div dir="ltr">\n *     <div class="mdc-foo">Styled incorrectly as RTL!</div>\n *   </div>\n * </html>\n * ```\n *\n * In the future, selectors such as :dir (http://mdn.io/:dir) will help us mitigate this.\n */\n/**\n * Takes a base box-model property - e.g. margin / border / padding - along with a default\n * direction and value, and emits rules which apply the value to the\n * "<base-property>-<default-direction>" property by default, but flips the direction\n * when within an RTL context.\n *\n * For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-box(margin, left, 8px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-left: 8px;\n *\n *   @include mdc-rtl {\n *     margin-right: 8px;\n *     margin-left: 0;\n *   }\n * }\n * ```\n * whereas:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-box(margin, right, 8px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-right: 8px;\n *\n *   @include mdc-rtl {\n *     margin-right: 0;\n *     margin-left: 8px;\n *   }\n * }\n * ```\n *\n * You can also pass a 4th optional $root-selector argument which will be forwarded to `mdc-rtl`,\n * e.g. `@include mdc-rtl-reflexive-box-property(margin, left, 8px, ".mdc-component")`.\n *\n * Note that this function will always zero out the original value in an RTL context. If you\'re\n * trying to flip the values, use mdc-rtl-reflexive-property().\n */\n/**\n * Takes a base property and emits rules that assign <base-property>-left to <left-value> and\n * <base-property>-right to <right-value> in a LTR context, and vice versa in a RTL context.\n * For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-property(margin, auto, 12px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-left: auto;\n *   margin-right: 12px;\n *\n *   @include mdc-rtl {\n *     margin-left: 12px;\n *     margin-right: auto;\n *   }\n * }\n * ```\n *\n * A 4th optional $root-selector argument can be given, which will be passed to `mdc-rtl`.\n */\n/**\n * Takes an argument specifying a horizontal position property (either "left" or "right") as well\n * as a value, and applies that value to the specified position in a LTR context, and flips it in a\n * RTL context. For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-position(left, 0);\n *   position: absolute;\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n *  .mdc-foo {\n *    position: absolute;\n *    left: 0;\n *    right: initial;\n *\n *    @include mdc-rtl {\n *      right: 0;\n *      left: initial;\n *    }\n *  }\n * ```\n * An optional third $root-selector argument may also be given, which is passed to `mdc-rtl`.\n */\n/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/**\n * Applies the correct theme color style to the specified property.\n * $property is typically color or background-color, but can be any CSS property that accepts color values.\n * $style should be one of the map keys in $mdc-theme-property-values (_variables.scss).\n */\n/**\n * Creates a rule to be used in MDC-Web components for dark theming, and applies the provided contents.\n * Should provide the $root-selector option if applied to anything other than the root selector.\n * When used with a modifier class, provide a second argument of `true` for the $compound parameter\n * to specify that this should be attached as a compound class.\n *\n * Usage example:\n *\n * ```scss\n * .mdc-foo {\n *   color: black;\n *\n *   @include mdc-theme-dark {\n *     color: white;\n *   }\n *\n *   &__bar {\n *     background: black;\n *\n *     @include mdc-theme-dark(".mdc-foo") {\n *       background: white;\n *     }\n *   }\n * }\n *\n * .mdc-foo--disabled {\n *   opacity: .38;\n *\n *   @include mdc-theme-dark(".mdc-foo", true) {\n *     opacity: .5;\n *   }\n * }\n * ```\n */\n/* TODO(sgomes): Figure out what to do about desktop font sizes. */\n/* TODO(sgomes): Figure out what to do about i18n and i18n font sizes. */\n/* TODO(sgomes): Figure out what to do about desktop font sizes. */\n/* TODO(sgomes): Figure out what to do about i18n and i18n font sizes. */\n.mdc-list {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  font-weight: 400;\n  letter-spacing: 0.04em;\n  line-height: 1.75rem;\n  color: rgba(0, 0, 0, 0.87);\n  color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));\n  margin: 0;\n  padding: 8px 16px 0;\n  line-height: 1.5rem;\n  list-style-type: none; }\n  .mdc-list--theme-dark,\n  .mdc-theme--dark .mdc-list {\n    color: white;\n    color: var(--mdc-theme-text-primary-on-dark, white); }\n\n.mdc-list--dense {\n  padding-top: 4px;\n  font-size: .812rem; }\n\n.mdc-list-item {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  height: 48px; }\n  .mdc-list-item__start-detail {\n    width: 24px;\n    height: 24px;\n    margin-left: 0;\n    margin-right: 32px; }\n    [dir="rtl"] .mdc-list-item .mdc-list-item__start-detail,\n    .mdc-list-item[dir="rtl"] .mdc-list-item__start-detail {\n      margin-left: 32px;\n      margin-right: 0; }\n  .mdc-list-item__end-detail {\n    width: 24px;\n    height: 24px;\n    margin-left: auto;\n    margin-right: 16px; }\n    [dir="rtl"] .mdc-list-item .mdc-list-item__end-detail,\n    .mdc-list-item[dir="rtl"] .mdc-list-item__end-detail {\n      margin-left: 16px;\n      margin-right: auto; }\n  .mdc-list-item__text {\n    display: inline-flex;\n    flex-direction: column; }\n    .mdc-list-item__text__secondary {\n      font-family: Roboto, sans-serif;\n      -moz-osx-font-smoothing: grayscale;\n      -webkit-font-smoothing: antialiased;\n      font-size: 0.875rem;\n      font-weight: 400;\n      letter-spacing: 0.04em;\n      line-height: 1.25rem;\n      color: rgba(0, 0, 0, 0.54);\n      color: var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54)); }\n      .mdc-list-item__text__secondary--theme-dark,\n      .mdc-theme--dark .mdc-list-item__text__secondary {\n        color: rgba(255, 255, 255, 0.7);\n        color: var(--mdc-theme-text-secondary-on-dark, rgba(255, 255, 255, 0.7)); }\n      .mdc-list--dense .mdc-list-item__text__secondary {\n        font-size: inherit; }\n  .mdc-list--dense .mdc-list-item {\n    height: 40px; }\n    .mdc-list--dense .mdc-list-item__start-detail {\n      width: 20px;\n      height: 20px;\n      margin-left: 0;\n      margin-right: 36px; }\n      [dir="rtl"] .mdc-list-item .mdc-list--dense .mdc-list-item__start-detail,\n      .mdc-list-item[dir="rtl"] .mdc-list--dense .mdc-list-item__start-detail {\n        margin-left: 36px;\n        margin-right: 0; }\n    .mdc-list--dense .mdc-list-item__end-detail {\n      width: 20px;\n      height: 20px; }\n  .mdc-list--avatar-list .mdc-list-item {\n    height: 56px; }\n    .mdc-list--avatar-list .mdc-list-item__start-detail {\n      width: 40px;\n      height: 40px;\n      margin-left: 0;\n      margin-right: 16px;\n      border-radius: 50%; }\n      [dir="rtl"] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__start-detail,\n      .mdc-list-item[dir="rtl"] .mdc-list--avatar-list .mdc-list-item__start-detail {\n        margin-left: 16px;\n        margin-right: 0; }\n  .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list__item {\n    height: 48px; }\n    .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list__item__start-detail {\n      width: 36px;\n      height: 36px;\n      margin-left: 0;\n      margin-right: 20px; }\n      [dir="rtl"] .mdc-list-item .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list__item__start-detail,\n      .mdc-list-item[dir="rtl"] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list__item__start-detail {\n        margin-left: 20px;\n        margin-right: 0; }\n  .mdc-list--two-line .mdc-list-item {\n    height: 72px; }\n  .mdc-list--two-line.mdc-list--dense .mdc-list-item {\n    height: 60px; }\n\na.mdc-list-item {\n  color: inherit;\n  text-decoration: none; }\n\n.mdc-list-item.mdc-ripple-upgraded {\n  --mdc-ripple-surface-width: 0;\n  --mdc-ripple-surface-height: 0;\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  will-change: transform, opacity;\n  -webkit-tap-highlight-color: transparent;\n  left: -16px;\n  right: initial;\n  position: relative;\n  width: 100%;\n  padding: 0 16px;\n  overflow: hidden; }\n  .mdc-list-item.mdc-ripple-upgraded:not(.mdc-ripple-upgraded):hover::before, .mdc-list-item.mdc-ripple-upgraded:not(.mdc-ripple-upgraded):focus::before, .mdc-list-item.mdc-ripple-upgraded:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 85ms;\n    opacity: .6; }\n  .mdc-list-item.mdc-ripple-upgraded::before {\n    background-color: rgba(0, 0, 0, 0.06);\n    position: absolute;\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transition: opacity 250ms linear;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: ""; }\n  .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded::before {\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transform: scale(0);\n    transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n  .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--background-focused::before {\n    opacity: .99999; }\n  .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--background-active-fill::before {\n    transition-duration: 120ms;\n    opacity: 1; }\n  .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--unbounded::before {\n    top: calc(50% - 50%);\n    top: var(--mdc-ripple-top, calc(50% - 50%));\n    left: calc(50% - 50%);\n    left: var(--mdc-ripple-left, calc(50% - 50%));\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n  .mdc-list-item.mdc-ripple-upgraded::after {\n    background-color: rgba(0, 0, 0, 0.06);\n    position: absolute;\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transition: opacity 250ms linear;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: ""; }\n  .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded::after {\n    top: 0;\n    left: 0;\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform-origin: center center;\n    opacity: 0; }\n  .mdc-list-item.mdc-ripple-upgraded:not(.mdc-ripple-upgraded--unbounded)::after {\n    transform-origin: center center; }\n  .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--unbounded::after {\n    top: 0;\n    top: var(--mdc-ripple-top, 0);\n    left: 0;\n    left: var(--mdc-ripple-left, 0);\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform-origin: center center; }\n  .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--foreground-activation::after {\n    animation: 300ms mdc-ripple-fg-radius-in forwards, 83ms mdc-ripple-fg-opacity-in forwards; }\n  .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--foreground-deactivation::after {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    animation: 250ms mdc-ripple-fg-opacity-out; }\n  [dir="rtl"] .mdc-list-item.mdc-ripple-upgraded, .mdc-list-item.mdc-ripple-upgraded[dir="rtl"] {\n    left: initial;\n    right: -16px; }\n  .mdc-list-item.mdc-ripple-upgraded:focus {\n    outline: none; }\n  .mdc-list--theme-dark .mdc-list-item.mdc-ripple-upgraded::before,\n  .mdc-theme--dark .mdc-list-item.mdc-ripple-upgraded::before {\n    background-color: rgba(255, 255, 255, 0.12);\n    position: absolute;\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transition: opacity 250ms linear;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: ""; }\n  .mdc-list--theme-dark .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded::before,\n  .mdc-theme--dark .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded::before {\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transform: scale(0);\n    transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n  .mdc-list--theme-dark .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--background-focused::before,\n  .mdc-theme--dark .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--background-focused::before {\n    opacity: .99999; }\n  .mdc-list--theme-dark .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--background-active-fill::before,\n  .mdc-theme--dark .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--background-active-fill::before {\n    transition-duration: 120ms;\n    opacity: 1; }\n  .mdc-list--theme-dark .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--unbounded::before,\n  .mdc-theme--dark .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--unbounded::before {\n    top: calc(50% - 50%);\n    top: var(--mdc-ripple-top, calc(50% - 50%));\n    left: calc(50% - 50%);\n    left: var(--mdc-ripple-left, calc(50% - 50%));\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n  .mdc-list--theme-dark .mdc-list-item.mdc-ripple-upgraded::after,\n  .mdc-theme--dark .mdc-list-item.mdc-ripple-upgraded::after {\n    background-color: rgba(255, 255, 255, 0.12);\n    position: absolute;\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transition: opacity 250ms linear;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: ""; }\n  .mdc-list--theme-dark .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded::after,\n  .mdc-theme--dark .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded::after {\n    top: 0;\n    left: 0;\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform-origin: center center;\n    opacity: 0; }\n  .mdc-list--theme-dark .mdc-list-item.mdc-ripple-upgraded:not(.mdc-ripple-upgraded--unbounded)::after,\n  .mdc-theme--dark .mdc-list-item.mdc-ripple-upgraded:not(.mdc-ripple-upgraded--unbounded)::after {\n    transform-origin: center center; }\n  .mdc-list--theme-dark .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--unbounded::after,\n  .mdc-theme--dark .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--unbounded::after {\n    top: 0;\n    top: var(--mdc-ripple-top, 0);\n    left: 0;\n    left: var(--mdc-ripple-left, 0);\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform-origin: center center; }\n  .mdc-list--theme-dark .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--foreground-activation::after,\n  .mdc-theme--dark .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--foreground-activation::after {\n    animation: 300ms mdc-ripple-fg-radius-in forwards, 83ms mdc-ripple-fg-opacity-in forwards; }\n  .mdc-list--theme-dark .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--foreground-deactivation::after,\n  .mdc-theme--dark .mdc-list-item.mdc-ripple-upgraded.mdc-ripple-upgraded--foreground-deactivation::after {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    animation: 250ms mdc-ripple-fg-opacity-out; }\n\n.mdc-list-divider {\n  height: 0;\n  margin: 0;\n  border: none;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n  .mdc-list--theme-dark .mdc-list-divider,\n  .mdc-theme--dark .mdc-list-divider {\n    border-bottom-color: rgba(255, 255, 255, 0.2); }\n\n.mdc-list-divider--inset {\n  margin-left: 56px;\n  margin-right: 0;\n  width: calc(100% - 56px); }\n  [dir="rtl"] .mdc-list-group .mdc-list-divider--inset,\n  .mdc-list-group[dir="rtl"] .mdc-list-divider--inset {\n    margin-left: 0;\n    margin-right: 56px; }\n\n.mdc-list-group {\n  padding: 0 16px; }\n  .mdc-list-group__subheader {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 0.875rem;\n    font-weight: 500;\n    letter-spacing: 0.04em;\n    line-height: 1.5rem;\n    color: rgba(0, 0, 0, 0.87);\n    color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));\n    margin: 0.75rem 0; }\n    .mdc-list-group__subheader--theme-dark,\n    .mdc-theme--dark .mdc-list-group__subheader {\n      color: white;\n      color: var(--mdc-theme-text-primary-on-dark, white); }\n  .mdc-list-group .mdc-list {\n    padding: 0; }\n', ""]);
  }, function (e, t, n) {
    (e.exports = n(2)(void 0)).push([e.i, '/**\n * The css property used for elevation. In most cases this should not be changed. It is exposed\n * as a variable for abstraction / easy use when needing to reference the property directly, for\n * example in a `will-change` rule.\n */\n/**\n * The default duration value for elevation transitions.\n */\n/**\n * The default easing value for elevation transitions.\n */\n/**\n * Applies the correct css rules to an element to give it the elevation specified by $z-value.\n * The $z-value must be between 0 and 24.\n */\n/**\n * Returns a string that can be used as the value for a `transition` property for elevation.\n * Calling this function directly is useful in situations where a component needs to transition\n * more than one property.\n *\n * ```scss\n * .foo {\n *   transition: mdc-elevation-transition-rule(), opacity 100ms ease;\n *   will-change: $mdc-elevation-property, opacity;\n * }\n * ```\n */\n/**\n * Applies the correct css rules needed to have an element transition between elevations.\n * This mixin should be applied to elements whose elevation values will change depending on their\n * context (e.g. when active or disabled).\n */\n/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/**\n * Applies the correct theme color style to the specified property.\n * $property is typically color or background-color, but can be any CSS property that accepts color values.\n * $style should be one of the map keys in $mdc-theme-property-values (_variables.scss).\n */\n/**\n * Creates a rule to be used in MDC-Web components for dark theming, and applies the provided contents.\n * Should provide the $root-selector option if applied to anything other than the root selector.\n * When used with a modifier class, provide a second argument of `true` for the $compound parameter\n * to specify that this should be attached as a compound class.\n *\n * Usage example:\n *\n * ```scss\n * .mdc-foo {\n *   color: black;\n *\n *   @include mdc-theme-dark {\n *     color: white;\n *   }\n *\n *   &__bar {\n *     background: black;\n *\n *     @include mdc-theme-dark(".mdc-foo") {\n *       background: white;\n *     }\n *   }\n * }\n *\n * .mdc-foo--disabled {\n *   opacity: .38;\n *\n *   @include mdc-theme-dark(".mdc-foo", true) {\n *     opacity: .5;\n *   }\n * }\n * ```\n */\n/* TODO(sgomes): Figure out what to do about desktop font sizes. */\n/* TODO(sgomes): Figure out what to do about i18n and i18n font sizes. */\n/* postcss-bem-linter: define simple-menu */\n.mdc-simple-menu {\n  display: none;\n  position: absolute;\n  max-width: calc(100vw - 32px);\n  max-height: calc(100vh - 32px);\n  margin: 0;\n  padding: 0;\n  transform: scale(0);\n  transform-origin: top left;\n  border-radius: 2px;\n  background-color: white;\n  white-space: nowrap;\n  opacity: 0;\n  overflow: hidden;\n  box-sizing: border-box;\n  will-change: transform, opacity;\n  z-index: 4;\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  /* stylelint-disable plugin/selector-bem-pattern */\n  /* stylelint-enable plugin/selector-bem-pattern */\n  /* stylelint-disable plugin/selector-bem-pattern */\n  /* stylelint-disable selector-no-qualifying-type */\n  /* stylelint-enable selector-no-qualifying-type */\n  /* TODO(sgomes): Revisit when we have interactive lists. */\n  /* stylelint-enable plugin/selector-bem-pattern */ }\n  .mdc-simple-menu--theme-dark,\n  .mdc-theme--dark .mdc-simple-menu {\n    background-color: #424242; }\n  .mdc-simple-menu:focus {\n    outline: none; }\n  .mdc-simple-menu--open {\n    display: inline-block;\n    transform: scale(1);\n    opacity: 1; }\n  .mdc-simple-menu--animating {\n    display: inline-block;\n    transition: opacity 0.2s cubic-bezier(0, 0, 0.2, 1); }\n  .mdc-simple-menu__items {\n    overflow-x: hidden;\n    overflow-y: auto;\n    box-sizing: border-box;\n    will-change: transform;\n    /* stylelint-disable plugin/selector-bem-pattern, selector-no-universal */\n    /* stylelint-enable plugin/selector-bem-pattern, selector-no-universal */ }\n    .mdc-simple-menu__items > * {\n      opacity: 0; }\n    .mdc-simple-menu__items > .mdc-list-item {\n      cursor: pointer; }\n    .mdc-simple-menu--animating .mdc-simple-menu__items {\n      overflow-y: hidden; }\n      .mdc-simple-menu--animating .mdc-simple-menu__items > * {\n        transition-duration: 0.3s;\n        transition-property: opacity;\n        transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }\n    .mdc-simple-menu--open .mdc-simple-menu__items > * {\n      opacity: 1;\n      will-change: opacity; }\n  [dir="rtl"] .mdc-simple-menu {\n    transform-origin: top right; }\n  .mdc-simple-menu--open-from-top-left {\n    transform-origin: top left !important; }\n  .mdc-simple-menu--open-from-top-right {\n    transform-origin: top right !important; }\n  .mdc-simple-menu--open-from-bottom-left {\n    transform-origin: bottom left !important; }\n  .mdc-simple-menu--open-from-bottom-right {\n    transform-origin: bottom right !important; }\n  .mdc-simple-menu .mdc-list-group,\n  .mdc-simple-menu .mdc-list {\n    padding: 8px 0; }\n  .mdc-simple-menu .mdc-list-item {\n    position: relative;\n    padding: 0 16px;\n    outline: none;\n    color: inherit;\n    text-decoration: none;\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 0.875rem;\n    font-weight: 500;\n    letter-spacing: 0.04em;\n    line-height: 1.5rem; }\n    .mdc-simple-menu--theme-dark.mdc-simple-menu .mdc-list-item,\n    .mdc-theme--dark .mdc-simple-menu .mdc-list-item {\n      color: white; }\n  .mdc-simple-menu--theme-dark.mdc-simple-menu .mdc-list-divider,\n  .mdc-theme--dark .mdc-simple-menu .mdc-list-divider {\n    border-color: rgba(255, 255, 255, 0.12); }\n  .mdc-simple-menu .mdc-list-item__start-detail {\n    color: rgba(0, 0, 0, 0.54); }\n    .mdc-simple-menu--theme-dark.mdc-simple-menu .mdc-list-item__start-detail,\n    .mdc-theme--dark .mdc-simple-menu .mdc-list-item__start-detail {\n      color: rgba(255, 255, 255, 0.54); }\n  .mdc-simple-menu--selected.mdc-list-item,\n  .mdc-simple-menu--selected.mdc-list-item .mdc-list-item__start-detail {\n    color: #3f51b5;\n    color: var(--mdc-theme-primary, #3f51b5); }\n  .mdc-simple-menu .mdc-list-item::before {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    transition: opacity 120ms cubic-bezier(0, 0, 0.2, 1);\n    border-radius: inherit;\n    background: currentColor;\n    content: "";\n    opacity: 0; }\n  .mdc-simple-menu .mdc-list-item:focus::before {\n    opacity: .12; }\n  .mdc-simple-menu .mdc-list-item:active::before {\n    /*\n      Slightly darker value for visual distinction.\n      This allows a full base that has distinct modes.\n      Progressive enhancement with ripples will provide complete button spec alignment.\n    */\n    opacity: .18; }\n\n/* postcss-bem-linter: end */\n.mdc-menu-anchor {\n  position: relative;\n  overflow: visible; }\n', ""]);
  }, function (e, t, n) {
    (e.exports = n(2)(void 0)).push([e.i, '/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/**\n * Applies the correct theme color style to the specified property.\n * $property is typically color or background-color, but can be any CSS property that accepts color values.\n * $style should be one of the map keys in $mdc-theme-property-values (_variables.scss).\n */\n/**\n * Creates a rule to be used in MDC-Web components for dark theming, and applies the provided contents.\n * Should provide the $root-selector option if applied to anything other than the root selector.\n * When used with a modifier class, provide a second argument of `true` for the $compound parameter\n * to specify that this should be attached as a compound class.\n *\n * Usage example:\n *\n * ```scss\n * .mdc-foo {\n *   color: black;\n *\n *   @include mdc-theme-dark {\n *     color: white;\n *   }\n *\n *   &__bar {\n *     background: black;\n *\n *     @include mdc-theme-dark(".mdc-foo") {\n *       background: white;\n *     }\n *   }\n * }\n *\n * .mdc-foo--disabled {\n *   opacity: .38;\n *\n *   @include mdc-theme-dark(".mdc-foo", true) {\n *     opacity: .5;\n *   }\n * }\n * ```\n */\n/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/** MDC Ripple keyframes are split into their own file so that _mixins.scss can rely on them. */\n@keyframes mdc-ripple-fg-radius-in {\n  from {\n    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n  to {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n@keyframes mdc-ripple-fg-opacity-in {\n  from {\n    opacity: 0;\n    animation-timing-function: linear; }\n  to {\n    opacity: 1; } }\n\n@keyframes mdc-ripple-fg-opacity-out {\n  from {\n    opacity: 1;\n    animation-timing-function: linear; }\n  to {\n    opacity: 0; } }\n\n.mdc-ripple-surface {\n  --mdc-ripple-surface-width: 0;\n  --mdc-ripple-surface-height: 0;\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  will-change: transform, opacity;\n  -webkit-tap-highlight-color: transparent;\n  position: relative;\n  outline: none;\n  overflow: hidden; }\n  .mdc-ripple-surface:not(.mdc-ripple-upgraded):hover::before, .mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before, .mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 85ms;\n    opacity: .6; }\n  .mdc-ripple-surface::before {\n    background-color: rgba(0, 0, 0, 0.06);\n    position: absolute;\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transition: opacity 250ms linear;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: ""; }\n  .mdc-ripple-surface.mdc-ripple-upgraded::before {\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transform: scale(0);\n    transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n  .mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before {\n    opacity: .99999; }\n  .mdc-ripple-surface.mdc-ripple-upgraded--background-active-fill::before {\n    transition-duration: 120ms;\n    opacity: 1; }\n  .mdc-ripple-surface.mdc-ripple-upgraded--unbounded::before {\n    top: calc(50% - 50%);\n    top: var(--mdc-ripple-top, calc(50% - 50%));\n    left: calc(50% - 50%);\n    left: var(--mdc-ripple-left, calc(50% - 50%));\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n  .mdc-ripple-surface::after {\n    background-color: rgba(0, 0, 0, 0.06);\n    position: absolute;\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transition: opacity 250ms linear;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: ""; }\n  .mdc-ripple-surface.mdc-ripple-upgraded::after {\n    top: 0;\n    left: 0;\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform-origin: center center;\n    opacity: 0; }\n  .mdc-ripple-surface:not(.mdc-ripple-upgraded--unbounded)::after {\n    transform-origin: center center; }\n  .mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after {\n    top: 0;\n    top: var(--mdc-ripple-top, 0);\n    left: 0;\n    left: var(--mdc-ripple-left, 0);\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform-origin: center center; }\n  .mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after {\n    animation: 300ms mdc-ripple-fg-radius-in forwards, 83ms mdc-ripple-fg-opacity-in forwards; }\n  .mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    animation: 250ms mdc-ripple-fg-opacity-out; }\n  .mdc-ripple-surface[data-mdc-ripple-is-unbounded] {\n    overflow: visible; }\n  .mdc-ripple-surface--primary::before, .mdc-ripple-surface--primary::after {\n    background-color: #3f51b5;\n    background-color: var(--mdc-theme-primary, #3f51b5); }\n  .mdc-ripple-surface--primary::before {\n    background-color: rgba(63, 81, 181, 0.16);\n    position: absolute;\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transition: opacity 250ms linear;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: ""; }\n    @supports (background-color: color(green a(10%))) {\n      .mdc-ripple-surface--primary::before {\n        background-color: color(var(--mdc-theme-primary, #3f51b5) a(16%)); } }\n  .mdc-ripple-surface--primary.mdc-ripple-upgraded::before {\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transform: scale(0);\n    transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n  .mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before {\n    opacity: .99999; }\n  .mdc-ripple-surface--primary.mdc-ripple-upgraded--background-active-fill::before {\n    transition-duration: 120ms;\n    opacity: 1; }\n  .mdc-ripple-surface--primary.mdc-ripple-upgraded--unbounded::before {\n    top: calc(50% - 50%);\n    top: var(--mdc-ripple-top, calc(50% - 50%));\n    left: calc(50% - 50%);\n    left: var(--mdc-ripple-left, calc(50% - 50%));\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n  .mdc-ripple-surface--primary::after {\n    background-color: rgba(63, 81, 181, 0.16);\n    position: absolute;\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transition: opacity 250ms linear;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: ""; }\n    @supports (background-color: color(green a(10%))) {\n      .mdc-ripple-surface--primary::after {\n        background-color: color(var(--mdc-theme-primary, #3f51b5) a(16%)); } }\n  .mdc-ripple-surface--primary.mdc-ripple-upgraded::after {\n    top: 0;\n    left: 0;\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform-origin: center center;\n    opacity: 0; }\n  .mdc-ripple-surface--primary:not(.mdc-ripple-upgraded--unbounded)::after {\n    transform-origin: center center; }\n  .mdc-ripple-surface--primary.mdc-ripple-upgraded--unbounded::after {\n    top: 0;\n    top: var(--mdc-ripple-top, 0);\n    left: 0;\n    left: var(--mdc-ripple-left, 0);\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform-origin: center center; }\n  .mdc-ripple-surface--primary.mdc-ripple-upgraded--foreground-activation::after {\n    animation: 300ms mdc-ripple-fg-radius-in forwards, 83ms mdc-ripple-fg-opacity-in forwards; }\n  .mdc-ripple-surface--primary.mdc-ripple-upgraded--foreground-deactivation::after {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    animation: 250ms mdc-ripple-fg-opacity-out; }\n  .mdc-ripple-surface--accent::before, .mdc-ripple-surface--accent::after {\n    background-color: #3f51b5;\n    background-color: var(--mdc-theme-primary, #3f51b5); }\n  .mdc-ripple-surface--accent::before {\n    background-color: rgba(255, 64, 129, 0.16);\n    position: absolute;\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transition: opacity 250ms linear;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: ""; }\n    @supports (background-color: color(green a(10%))) {\n      .mdc-ripple-surface--accent::before {\n        background-color: color(var(--mdc-theme-accent, #ff4081) a(16%)); } }\n  .mdc-ripple-surface--accent.mdc-ripple-upgraded::before {\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transform: scale(0);\n    transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n  .mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before {\n    opacity: .99999; }\n  .mdc-ripple-surface--accent.mdc-ripple-upgraded--background-active-fill::before {\n    transition-duration: 120ms;\n    opacity: 1; }\n  .mdc-ripple-surface--accent.mdc-ripple-upgraded--unbounded::before {\n    top: calc(50% - 50%);\n    top: var(--mdc-ripple-top, calc(50% - 50%));\n    left: calc(50% - 50%);\n    left: var(--mdc-ripple-left, calc(50% - 50%));\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n  .mdc-ripple-surface--accent::after {\n    background-color: rgba(255, 64, 129, 0.16);\n    position: absolute;\n    top: calc(50% - 100%);\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%;\n    transition: opacity 250ms linear;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: ""; }\n    @supports (background-color: color(green a(10%))) {\n      .mdc-ripple-surface--accent::after {\n        background-color: color(var(--mdc-theme-accent, #ff4081) a(16%)); } }\n  .mdc-ripple-surface--accent.mdc-ripple-upgraded::after {\n    top: 0;\n    left: 0;\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform-origin: center center;\n    opacity: 0; }\n  .mdc-ripple-surface--accent:not(.mdc-ripple-upgraded--unbounded)::after {\n    transform-origin: center center; }\n  .mdc-ripple-surface--accent.mdc-ripple-upgraded--unbounded::after {\n    top: 0;\n    top: var(--mdc-ripple-top, 0);\n    left: 0;\n    left: var(--mdc-ripple-left, 0);\n    width: 100%;\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: 100%;\n    height: var(--mdc-ripple-fg-size, 100%);\n    transform: scale(0);\n    transform-origin: center center; }\n  .mdc-ripple-surface--accent.mdc-ripple-upgraded--foreground-activation::after {\n    animation: 300ms mdc-ripple-fg-radius-in forwards, 83ms mdc-ripple-fg-opacity-in forwards; }\n  .mdc-ripple-surface--accent.mdc-ripple-upgraded--foreground-deactivation::after {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    animation: 250ms mdc-ripple-fg-opacity-out; }\n', ""]);
  }, function (e, t, n) {
    (e.exports = n(2)(void 0)).push([e.i, '/**\n * Creates a rule that will be applied when an MDC-Web component is within the context of an RTL layout.\n *\n * Usage Example:\n * ```scss\n * .mdc-foo {\n *   position: absolute;\n *   left: 0;\n *\n *   @include mdc-rtl {\n *     left: auto;\n *     right: 0;\n *   }\n *\n *   &__bar {\n *     margin-left: 4px;\n *     @include mdc-rtl(".mdc-foo") {\n *       margin-left: auto;\n *       margin-right: 4px;\n *     }\n *   }\n * }\n *\n * .mdc-foo--mod {\n *   padding-left: 4px;\n *\n *   @include mdc-rtl {\n *     padding-left: auto;\n *     padding-right: 4px;\n *   }\n * }\n * ```\n *\n * Note that this works by checking for [dir="rtl"] on an ancestor element. While this will work\n * in most cases, it will in some cases lead to false negatives, e.g.\n *\n * ```html\n * <html dir="rtl">\n *   \x3c!-- ... --\x3e\n *   <div dir="ltr">\n *     <div class="mdc-foo">Styled incorrectly as RTL!</div>\n *   </div>\n * </html>\n * ```\n *\n * In the future, selectors such as :dir (http://mdn.io/:dir) will help us mitigate this.\n */\n/**\n * Takes a base box-model property - e.g. margin / border / padding - along with a default\n * direction and value, and emits rules which apply the value to the\n * "<base-property>-<default-direction>" property by default, but flips the direction\n * when within an RTL context.\n *\n * For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-box(margin, left, 8px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-left: 8px;\n *\n *   @include mdc-rtl {\n *     margin-right: 8px;\n *     margin-left: 0;\n *   }\n * }\n * ```\n * whereas:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-box(margin, right, 8px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-right: 8px;\n *\n *   @include mdc-rtl {\n *     margin-right: 0;\n *     margin-left: 8px;\n *   }\n * }\n * ```\n *\n * You can also pass a 4th optional $root-selector argument which will be forwarded to `mdc-rtl`,\n * e.g. `@include mdc-rtl-reflexive-box-property(margin, left, 8px, ".mdc-component")`.\n *\n * Note that this function will always zero out the original value in an RTL context. If you\'re\n * trying to flip the values, use mdc-rtl-reflexive-property().\n */\n/**\n * Takes a base property and emits rules that assign <base-property>-left to <left-value> and\n * <base-property>-right to <right-value> in a LTR context, and vice versa in a RTL context.\n * For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-property(margin, auto, 12px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-left: auto;\n *   margin-right: 12px;\n *\n *   @include mdc-rtl {\n *     margin-left: 12px;\n *     margin-right: auto;\n *   }\n * }\n * ```\n *\n * A 4th optional $root-selector argument can be given, which will be passed to `mdc-rtl`.\n */\n/**\n * Takes an argument specifying a horizontal position property (either "left" or "right") as well\n * as a value, and applies that value to the specified position in a LTR context, and flips it in a\n * RTL context. For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-position(left, 0);\n *   position: absolute;\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n *  .mdc-foo {\n *    position: absolute;\n *    left: 0;\n *    right: initial;\n *\n *    @include mdc-rtl {\n *      right: 0;\n *      left: initial;\n *    }\n *  }\n * ```\n * An optional third $root-selector argument may also be given, which is passed to `mdc-rtl`.\n */\n/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/**\n * Applies the correct theme color style to the specified property.\n * $property is typically color or background-color, but can be any CSS property that accepts color values.\n * $style should be one of the map keys in $mdc-theme-property-values (_variables.scss).\n */\n/**\n * Creates a rule to be used in MDC-Web components for dark theming, and applies the provided contents.\n * Should provide the $root-selector option if applied to anything other than the root selector.\n * When used with a modifier class, provide a second argument of `true` for the $compound parameter\n * to specify that this should be attached as a compound class.\n *\n * Usage example:\n *\n * ```scss\n * .mdc-foo {\n *   color: black;\n *\n *   @include mdc-theme-dark {\n *     color: white;\n *   }\n *\n *   &__bar {\n *     background: black;\n *\n *     @include mdc-theme-dark(".mdc-foo") {\n *       background: white;\n *     }\n *   }\n * }\n *\n * .mdc-foo--disabled {\n *   opacity: .38;\n *\n *   @include mdc-theme-dark(".mdc-foo", true) {\n *     opacity: .5;\n *   }\n * }\n * ```\n */\n/* TODO(sgomes): Figure out what to do about desktop font sizes. */\n/* TODO(sgomes): Figure out what to do about i18n and i18n font sizes. */\n/* postcss-bem-linter: define snackbar */\n.mdc-snackbar {\n  display: flex;\n  position: fixed;\n  bottom: 0;\n  left: 50%;\n  align-items: center;\n  justify-content: flex-start;\n  padding-right: 24px;\n  padding-left: 24px;\n  transform: translate(0, 100%);\n  transition: transform 0.25s 0ms cubic-bezier(0.4, 0, 1, 1);\n  background-color: #323232;\n  will-change: transform;\n  pointer-events: none;\n  /* stylelint-disable plugin/selector-bem-pattern */\n  /* stylelint-enable plugin/selector-bem-pattern */ }\n  @media (max-width: 599px) {\n    .mdc-snackbar {\n      left: 0;\n      width: calc(100% - 48px); } }\n  @media (min-width: 600px) {\n    .mdc-snackbar {\n      min-width: 288px;\n      max-width: 568px;\n      transform: translate(-50%, 100%);\n      border-radius: 2px; } }\n  .mdc-snackbar--active {\n    transform: translate(0, 0);\n    pointer-events: auto;\n    transition: transform 0.25s 0ms cubic-bezier(0, 0, 0.2, 1); }\n    @media (min-width: 600px) {\n      .mdc-snackbar--active {\n        transform: translate(-50%, 0); } }\n  .mdc-snackbar--action-on-bottom {\n    flex-direction: column; }\n  .mdc-snackbar--action-on-bottom .mdc-snackbar__text {\n    margin-right: inherit; }\n  .mdc-snackbar--action-on-bottom .mdc-snackbar__action-wrapper {\n    flex-direction: column;\n    justify-content: flex-start;\n    margin-top: -12px;\n    margin-bottom: 8px;\n    margin-left: auto;\n    margin-right: 0; }\n    [dir="rtl"] .mdc-snackbar--action-on-bottom .mdc-snackbar__action-wrapper, .mdc-snackbar--action-on-bottom .mdc-snackbar__action-wrapper[dir="rtl"] {\n      margin-left: 0;\n      margin-right: auto; }\n  .mdc-snackbar__text {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 0.875rem;\n    font-weight: 400;\n    letter-spacing: 0.04em;\n    line-height: 1.25rem;\n    margin-left: 0;\n    margin-right: auto;\n    display: flex;\n    align-items: center;\n    height: 48px;\n    transition: opacity 0.3s 0ms cubic-bezier(0.4, 0, 1, 1);\n    color: white;\n    opacity: 0; }\n    [dir="rtl"] .mdc-snackbar .mdc-snackbar__text,\n    .mdc-snackbar[dir="rtl"] .mdc-snackbar__text {\n      margin-left: auto;\n      margin-right: 0; }\n  .mdc-snackbar--multiline .mdc-snackbar__text {\n    height: 80px; }\n  .mdc-snackbar--multiline.mdc-snackbar--action-on-bottom .mdc-snackbar__text {\n    margin: 0; }\n  .mdc-snackbar__action-button {\n    color: #ff4081;\n    color: var(--mdc-theme-accent, #ff4081);\n    margin-left: 0;\n    margin-right: -16px;\n    min-width: auto;\n    height: inherit;\n    transition: opacity 0.3s 0ms cubic-bezier(0.4, 0, 1, 1);\n    opacity: 0;\n    visibility: hidden; }\n    [dir="rtl"] .mdc-snackbar .mdc-snackbar__action-button,\n    .mdc-snackbar[dir="rtl"] .mdc-snackbar__action-button {\n      margin-left: -16px;\n      margin-right: 0; }\n    .mdc-snackbar__action-button::-moz-focus-inner {\n      border: 0; }\n    .mdc-snackbar__action-button:not([aria-hidden]) {\n      visibility: inherit; }\n  .mdc-snackbar--active .mdc-snackbar__text,\n  .mdc-snackbar--active .mdc-snackbar__action-button:not([aria-hidden]) {\n    transition: opacity 0.3s 0ms cubic-bezier(0.4, 0, 1, 1);\n    opacity: 1; }\n\n/* postcss-bem-linter: end */\n', ""]);
  }, function (e, t, n) {
    (e.exports = n(2)(void 0)).push([e.i, '/**\n * The css property used for elevation. In most cases this should not be changed. It is exposed\n * as a variable for abstraction / easy use when needing to reference the property directly, for\n * example in a `will-change` rule.\n */\n/**\n * The default duration value for elevation transitions.\n */\n/**\n * The default easing value for elevation transitions.\n */\n/**\n * Applies the correct css rules to an element to give it the elevation specified by $z-value.\n * The $z-value must be between 0 and 24.\n */\n/**\n * Returns a string that can be used as the value for a `transition` property for elevation.\n * Calling this function directly is useful in situations where a component needs to transition\n * more than one property.\n *\n * ```scss\n * .foo {\n *   transition: mdc-elevation-transition-rule(), opacity 100ms ease;\n *   will-change: $mdc-elevation-property, opacity;\n * }\n * ```\n */\n/**\n * Applies the correct css rules needed to have an element transition between elevations.\n * This mixin should be applied to elements whose elevation values will change depending on their\n * context (e.g. when active or disabled).\n */\n/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/**\n * Applies the correct theme color style to the specified property.\n * $property is typically color or background-color, but can be any CSS property that accepts color values.\n * $style should be one of the map keys in $mdc-theme-property-values (_variables.scss).\n */\n/**\n * Creates a rule to be used in MDC-Web components for dark theming, and applies the provided contents.\n * Should provide the $root-selector option if applied to anything other than the root selector.\n * When used with a modifier class, provide a second argument of `true` for the $compound parameter\n * to specify that this should be attached as a compound class.\n *\n * Usage example:\n *\n * ```scss\n * .mdc-foo {\n *   color: black;\n *\n *   @include mdc-theme-dark {\n *     color: white;\n *   }\n *\n *   &__bar {\n *     background: black;\n *\n *     @include mdc-theme-dark(".mdc-foo") {\n *       background: white;\n *     }\n *   }\n * }\n *\n * .mdc-foo--disabled {\n *   opacity: .38;\n *\n *   @include mdc-theme-dark(".mdc-foo", true) {\n *     opacity: .5;\n *   }\n * }\n * ```\n */\n.mdc-switch {\n  display: inline-block;\n  position: relative; }\n  .mdc-switch__native-control {\n    display: inline-block;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 34px;\n    height: 14px;\n    cursor: pointer;\n    opacity: 0;\n    z-index: 2; }\n  .mdc-switch__background {\n    display: block;\n    position: relative;\n    width: 34px;\n    height: 14px;\n    border-radius: 7px;\n    outline: none;\n    background-color: transparent;\n    cursor: pointer;\n    user-select: none; }\n    .mdc-switch--theme-dark .mdc-switch__background,\n    .mdc-theme--dark .mdc-switch__background {\n      background-color: transparent; }\n    .mdc-switch__background::before {\n      display: block;\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      transition: opacity 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1);\n      border-radius: 7px;\n      background-color: #000;\n      content: "";\n      opacity: .38; }\n      .mdc-switch--theme-dark .mdc-switch__background::before,\n      .mdc-theme--dark .mdc-switch__background::before {\n        background-color: #fff;\n        opacity: .3; }\n    .mdc-switch__background .mdc-switch__knob {\n      display: block;\n      position: absolute;\n      top: -3px;\n      left: 0;\n      width: 20px;\n      height: 20px;\n      transform: translateX(0);\n      transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1);\n      border-radius: 10px;\n      background-color: #fafafa;\n      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n      z-index: 1; }\n      .mdc-switch--theme-dark .mdc-switch__background .mdc-switch__knob,\n      .mdc-theme--dark .mdc-switch__background .mdc-switch__knob {\n        background-color: #bdbdbd; }\n      .mdc-switch__background .mdc-switch__knob::before {\n        position: absolute;\n        top: -14px;\n        left: -14px;\n        width: 48px;\n        height: 48px;\n        transform: scale(0);\n        transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1);\n        border-radius: 24px;\n        background-color: transparent;\n        content: "";\n        opacity: .2; }\n\n.mdc-switch__native-control:focus ~ .mdc-switch__background .mdc-switch__knob::before {\n  position: absolute;\n  width: 48px;\n  height: 48px;\n  transform: scale(1);\n  transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1);\n  border-radius: 24px;\n  background-color: #9e9e9e; }\n  .mdc-switch--theme-dark .mdc-switch__native-control:focus ~ .mdc-switch__background .mdc-switch__knob::before,\n  .mdc-theme--dark .mdc-switch__native-control:focus ~ .mdc-switch__background .mdc-switch__knob::before {\n    background-color: #f1f1f1;\n    opacity: .14; }\n\n.mdc-switch__native-control:checked ~ .mdc-switch__background::before {\n  background-color: #3f51b5;\n  background-color: var(--mdc-theme-primary, #3f51b5);\n  opacity: .5; }\n\n.mdc-switch__native-control:checked ~ .mdc-switch__background .mdc-switch__knob {\n  transform: translateX(14px);\n  transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1);\n  background-color: #3f51b5;\n  background-color: var(--mdc-theme-primary, #3f51b5); }\n  .mdc-switch__native-control:checked ~ .mdc-switch__background .mdc-switch__knob::before {\n    background-color: #3f51b5;\n    background-color: var(--mdc-theme-primary, #3f51b5);\n    opacity: .15; }\n    .mdc-switch--theme-dark .mdc-switch__native-control:checked ~ .mdc-switch__background .mdc-switch__knob::before,\n    .mdc-theme--dark .mdc-switch__native-control:checked ~ .mdc-switch__background .mdc-switch__knob::before {\n      background-color: #3f51b5;\n      background-color: var(--mdc-theme-primary, #3f51b5); }\n\n.mdc-switch__native-control:disabled {\n  cursor: initial; }\n\n.mdc-switch__native-control:disabled ~ .mdc-switch__background::before {\n  background-color: #000;\n  opacity: .12; }\n  .mdc-switch--theme-dark .mdc-switch__native-control:disabled ~ .mdc-switch__background::before,\n  .mdc-theme--dark .mdc-switch__native-control:disabled ~ .mdc-switch__background::before {\n    background-color: #fff;\n    opacity: .1; }\n\n.mdc-switch__native-control:disabled ~ .mdc-switch__background .mdc-switch__knob {\n  background-color: #bdbdbd; }\n  .mdc-switch--theme-dark .mdc-switch__native-control:disabled ~ .mdc-switch__background .mdc-switch__knob,\n  .mdc-theme--dark .mdc-switch__native-control:disabled ~ .mdc-switch__background .mdc-switch__knob {\n    background-color: #424242; }\n', ""]);
  }, function (e, t, n) {
    (e.exports = n(2)(void 0)).push([e.i, '/**\n * Creates a rule that will be applied when an MDC-Web component is within the context of an RTL layout.\n *\n * Usage Example:\n * ```scss\n * .mdc-foo {\n *   position: absolute;\n *   left: 0;\n *\n *   @include mdc-rtl {\n *     left: auto;\n *     right: 0;\n *   }\n *\n *   &__bar {\n *     margin-left: 4px;\n *     @include mdc-rtl(".mdc-foo") {\n *       margin-left: auto;\n *       margin-right: 4px;\n *     }\n *   }\n * }\n *\n * .mdc-foo--mod {\n *   padding-left: 4px;\n *\n *   @include mdc-rtl {\n *     padding-left: auto;\n *     padding-right: 4px;\n *   }\n * }\n * ```\n *\n * Note that this works by checking for [dir="rtl"] on an ancestor element. While this will work\n * in most cases, it will in some cases lead to false negatives, e.g.\n *\n * ```html\n * <html dir="rtl">\n *   \x3c!-- ... --\x3e\n *   <div dir="ltr">\n *     <div class="mdc-foo">Styled incorrectly as RTL!</div>\n *   </div>\n * </html>\n * ```\n *\n * In the future, selectors such as :dir (http://mdn.io/:dir) will help us mitigate this.\n */\n/**\n * Takes a base box-model property - e.g. margin / border / padding - along with a default\n * direction and value, and emits rules which apply the value to the\n * "<base-property>-<default-direction>" property by default, but flips the direction\n * when within an RTL context.\n *\n * For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-box(margin, left, 8px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-left: 8px;\n *\n *   @include mdc-rtl {\n *     margin-right: 8px;\n *     margin-left: 0;\n *   }\n * }\n * ```\n * whereas:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-box(margin, right, 8px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-right: 8px;\n *\n *   @include mdc-rtl {\n *     margin-right: 0;\n *     margin-left: 8px;\n *   }\n * }\n * ```\n *\n * You can also pass a 4th optional $root-selector argument which will be forwarded to `mdc-rtl`,\n * e.g. `@include mdc-rtl-reflexive-box-property(margin, left, 8px, ".mdc-component")`.\n *\n * Note that this function will always zero out the original value in an RTL context. If you\'re\n * trying to flip the values, use mdc-rtl-reflexive-property().\n */\n/**\n * Takes a base property and emits rules that assign <base-property>-left to <left-value> and\n * <base-property>-right to <right-value> in a LTR context, and vice versa in a RTL context.\n * For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-property(margin, auto, 12px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-left: auto;\n *   margin-right: 12px;\n *\n *   @include mdc-rtl {\n *     margin-left: 12px;\n *     margin-right: auto;\n *   }\n * }\n * ```\n *\n * A 4th optional $root-selector argument can be given, which will be passed to `mdc-rtl`.\n */\n/**\n * Takes an argument specifying a horizontal position property (either "left" or "right") as well\n * as a value, and applies that value to the specified position in a LTR context, and flips it in a\n * RTL context. For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-position(left, 0);\n *   position: absolute;\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n *  .mdc-foo {\n *    position: absolute;\n *    left: 0;\n *    right: initial;\n *\n *    @include mdc-rtl {\n *      right: 0;\n *      left: initial;\n *    }\n *  }\n * ```\n * An optional third $root-selector argument may also be given, which is passed to `mdc-rtl`.\n */\n/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/**\n * Applies the correct theme color style to the specified property.\n * $property is typically color or background-color, but can be any CSS property that accepts color values.\n * $style should be one of the map keys in $mdc-theme-property-values (_variables.scss).\n */\n/**\n * Creates a rule to be used in MDC-Web components for dark theming, and applies the provided contents.\n * Should provide the $root-selector option if applied to anything other than the root selector.\n * When used with a modifier class, provide a second argument of `true` for the $compound parameter\n * to specify that this should be attached as a compound class.\n *\n * Usage example:\n *\n * ```scss\n * .mdc-foo {\n *   color: black;\n *\n *   @include mdc-theme-dark {\n *     color: white;\n *   }\n *\n *   &__bar {\n *     background: black;\n *\n *     @include mdc-theme-dark(".mdc-foo") {\n *       background: white;\n *     }\n *   }\n * }\n *\n * .mdc-foo--disabled {\n *   opacity: .38;\n *\n *   @include mdc-theme-dark(".mdc-foo", true) {\n *     opacity: .5;\n *   }\n * }\n * ```\n */\n/* TODO(sgomes): Figure out what to do about desktop font sizes. */\n/* TODO(sgomes): Figure out what to do about i18n and i18n font sizes. */\n/* TODO(sgomes): Figure out what to do about desktop font sizes. */\n/* TODO(sgomes): Figure out what to do about i18n and i18n font sizes. */\n.mdc-textfield {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  letter-spacing: 0.04em;\n  display: inline-block;\n  margin-bottom: 8px;\n  will-change: opacity, transform, color; }\n  .mdc-textfield__input {\n    color: rgba(0, 0, 0, 0.87);\n    color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87));\n    padding: 0 0 8px;\n    border: none;\n    background: none;\n    font-size: inherit;\n    appearance: none; }\n    .mdc-textfield__input::placeholder {\n      color: rgba(0, 0, 0, 0.38);\n      color: var(--mdc-theme-text-hint-on-light, rgba(0, 0, 0, 0.38));\n      transition: color 180ms cubic-bezier(0.4, 0, 0.2, 1);\n      opacity: 1; }\n    .mdc-textfield__input:focus {\n      outline: none; }\n      .mdc-textfield__input:focus::placeholder {\n        color: rgba(0, 0, 0, 0.54);\n        color: var(--mdc-theme-text-secondary-on-light, rgba(0, 0, 0, 0.54)); }\n    .mdc-textfield__input:invalid {\n      box-shadow: none; }\n    .mdc-textfield__input--theme-dark,\n    .mdc-theme--dark .mdc-textfield__input {\n      color: white; }\n      .mdc-textfield__input--theme-dark::placeholder,\n      .mdc-theme--dark .mdc-textfield__input::placeholder {\n        color: rgba(255, 255, 255, 0.5);\n        color: var(--mdc-theme-text-hint-on-dark, rgba(255, 255, 255, 0.5)); }\n      .mdc-textfield__input--theme-dark:focus::placeholder,\n      .mdc-theme--dark .mdc-textfield__input:focus::placeholder {\n        color: rgba(255, 255, 255, 0.7);\n        color: var(--mdc-theme-text-secondary-on-dark, rgba(255, 255, 255, 0.7)); }\n  .mdc-textfield__label {\n    color: rgba(0, 0, 0, 0.38);\n    color: var(--mdc-theme-text-hint-on-light, rgba(0, 0, 0, 0.38));\n    position: absolute;\n    bottom: 8px;\n    left: 0;\n    transform-origin: left top;\n    transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), color 180ms cubic-bezier(0.4, 0, 0.2, 1);\n    cursor: text; }\n    [dir="rtl"] .mdc-textfield .mdc-textfield__label,\n    .mdc-textfield[dir="rtl"] .mdc-textfield__label {\n      right: 0;\n      left: auto;\n      transform-origin: right top; }\n    .mdc-textfield--theme-dark .mdc-textfield__label,\n    .mdc-theme--dark .mdc-textfield__label {\n      color: rgba(255, 255, 255, 0.5);\n      color: var(--mdc-theme-text-hint-on-dark, rgba(255, 255, 255, 0.5)); }\n    .mdc-textfield__label--float-above {\n      transform: translateY(-100%) scale(0.75, 0.75);\n      cursor: auto; }\n\n.mdc-textfield__input:-webkit-autofill + .mdc-textfield__label {\n  transform: translateY(-100%) scale(0.75, 0.75);\n  cursor: auto; }\n\n.mdc-textfield--upgraded:not(.mdc-textfield--fullwidth) {\n  display: inline-flex;\n  position: relative;\n  box-sizing: border-box;\n  align-items: flex-end;\n  margin-top: 16px; }\n  .mdc-textfield--upgraded:not(.mdc-textfield--fullwidth):not(.mdc-textfield--multiline) {\n    height: 48px; }\n    .mdc-textfield--upgraded:not(.mdc-textfield--fullwidth):not(.mdc-textfield--multiline)::after {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      width: 100%;\n      height: 1px;\n      transform: translateY(50%) scaleY(1);\n      transform-origin: center bottom;\n      transition: background-color 180ms cubic-bezier(0.4, 0, 0.2, 1), transform 180ms cubic-bezier(0.4, 0, 0.2, 1);\n      background-color: rgba(0, 0, 0, 0.12);\n      content: ""; }\n      .mdc-textfield--theme-dark .mdc-textfield--upgraded:not(.mdc-textfield--fullwidth):not(.mdc-textfield--multiline)::after,\n      .mdc-theme--dark .mdc-textfield--upgraded:not(.mdc-textfield--fullwidth):not(.mdc-textfield--multiline)::after {\n        background-color: rgba(255, 255, 255, 0.12); }\n  .mdc-textfield--upgraded:not(.mdc-textfield--fullwidth) .mdc-textfield__label {\n    pointer-events: none; }\n\n.mdc-textfield--focused.mdc-textfield--upgraded:not(.mdc-textfield--fullwidth):not(.mdc-textfield--multiline)::after {\n  background-color: #3f51b5;\n  background-color: var(--mdc-theme-primary, #3f51b5);\n  transform: translateY(100%) scaleY(2);\n  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1); }\n  .mdc-textfield--theme-dark.mdc-textfield--focused.mdc-textfield--upgraded:not(.mdc-textfield--fullwidth):not(.mdc-textfield--multiline)::after,\n  .mdc-theme--dark .mdc-textfield--focused.mdc-textfield--upgraded:not(.mdc-textfield--fullwidth):not(.mdc-textfield--multiline)::after {\n    background-color: #3f51b5;\n    background-color: var(--mdc-theme-primary, #3f51b5);\n    transform: translateY(100%) scaleY(2);\n    transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1); }\n\n.mdc-textfield--focused .mdc-textfield__label {\n  color: #3f51b5;\n  color: var(--mdc-theme-primary, #3f51b5); }\n  .mdc-textfield--theme-dark .mdc-textfield--focused .mdc-textfield__label,\n  .mdc-theme--dark .mdc-textfield--focused .mdc-textfield__label {\n    color: #3f51b5;\n    color: var(--mdc-theme-primary, #3f51b5); }\n\n.mdc-textfield--dense {\n  margin-top: 12px;\n  margin-bottom: 4px;\n  font-size: .813rem; }\n  .mdc-textfield--dense .mdc-textfield__label--float-above {\n    transform: translateY(calc(-100% - 2px)) scale(0.923, 0.923); }\n\n.mdc-textfield--invalid:not(.mdc-textfield--focused)::after, .mdc-textfield--invalid:not(.mdc-textfield--focused).mdc-textfield--upgraded::after {\n  background-color: #d50000; }\n\n.mdc-textfield--invalid:not(.mdc-textfield--focused) .mdc-textfield__label {\n  color: #d50000; }\n\n.mdc-textfield--theme-dark.mdc-textfield--invalid:not(.mdc-textfield--focused)::after, .mdc-textfield--theme-dark.mdc-textfield--invalid:not(.mdc-textfield--focused).mdc-textfield--upgraded::after,\n.mdc-theme--dark .mdc-textfield--invalid:not(.mdc-textfield--focused)::after,\n.mdc-theme--dark .mdc-textfield--invalid:not(.mdc-textfield--focused).mdc-textfield--upgraded::after {\n  background-color: #ff6e6e; }\n\n.mdc-textfield--theme-dark.mdc-textfield--invalid:not(.mdc-textfield--focused) .mdc-textfield__label,\n.mdc-theme--dark .mdc-textfield--invalid:not(.mdc-textfield--focused) .mdc-textfield__label {\n  color: #ff6e6e; }\n\n.mdc-textfield--disabled {\n  border-bottom: 1px dotted rgba(35, 31, 32, 0.26); }\n  .mdc-textfield--disabled::after {\n    display: none; }\n  .mdc-textfield--disabled .mdc-textfield__input {\n    padding-bottom: 7px; }\n  .mdc-textfield--theme-dark.mdc-textfield--disabled,\n  .mdc-theme--dark .mdc-textfield--disabled {\n    border-bottom: 1px dotted rgba(255, 255, 255, 0.3); }\n  .mdc-textfield--disabled .mdc-textfield__input,\n  .mdc-textfield--disabled .mdc-textfield__label,\n  .mdc-textfield--disabled + .mdc-textfield-helptext {\n    color: rgba(0, 0, 0, 0.38);\n    color: var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38)); }\n  .mdc-textfield--theme-dark .mdc-textfield--disabled .mdc-textfield__input,\n  .mdc-theme--dark .mdc-textfield--disabled .mdc-textfield__input, .mdc-textfield--theme-dark\n  .mdc-textfield--disabled .mdc-textfield__label,\n  .mdc-theme--dark\n  .mdc-textfield--disabled .mdc-textfield__label {\n    color: rgba(255, 255, 255, 0.5);\n    color: var(--mdc-theme-text-disabled-on-dark, rgba(255, 255, 255, 0.5)); }\n  .mdc-textfield--theme-dark.mdc-textfield--disabled + .mdc-textfield-helptext,\n  .mdc-theme--dark .mdc-textfield--disabled + .mdc-textfield-helptext {\n    color: rgba(255, 255, 255, 0.5);\n    color: var(--mdc-theme-text-disabled-on-dark, rgba(255, 255, 255, 0.5)); }\n  .mdc-textfield--disabled .mdc-textfield__label {\n    bottom: 7px;\n    cursor: default; }\n\n.mdc-textfield__input:required + .mdc-textfield__label::after {\n  margin-left: 1px;\n  content: "*"; }\n  .mdc-textfield--focused .mdc-textfield__input:required + .mdc-textfield__label::after {\n    color: #d50000; }\n  .mdc-textfield--focused .mdc-textfield--theme-dark .mdc-textfield__input:required + .mdc-textfield__label::after, .mdc-textfield--focused\n  .mdc-theme--dark .mdc-textfield__input:required + .mdc-textfield__label::after {\n    color: #ff6e6e; }\n\n.mdc-textfield--multiline {\n  display: flex;\n  height: initial;\n  transition: none; }\n  .mdc-textfield--multiline::after {\n    content: initial; }\n  .mdc-textfield--multiline .mdc-textfield__input {\n    padding: 4px;\n    transition: border-color 180ms cubic-bezier(0.4, 0, 0.2, 1);\n    border: 1px solid rgba(0, 0, 0, 0.12);\n    border-radius: 2px; }\n    .mdc-textfield--theme-dark .mdc-textfield--multiline .mdc-textfield__input,\n    .mdc-theme--dark .mdc-textfield--multiline .mdc-textfield__input {\n      border-color: rgba(255, 255, 255, 0.12); }\n    .mdc-textfield--multiline .mdc-textfield__input:focus {\n      border-color: #3f51b5;\n      border-color: var(--mdc-theme-primary, #3f51b5); }\n    .mdc-textfield--multiline .mdc-textfield__input:invalid:not(:focus) {\n      border-color: #d50000; }\n    .mdc-textfield--theme-dark .mdc-textfield--multiline .mdc-textfield__input:invalid:not(:focus),\n    .mdc-theme--dark .mdc-textfield--multiline .mdc-textfield__input:invalid:not(:focus) {\n      border-color: #ff6e6e; }\n  .mdc-textfield--multiline .mdc-textfield__label {\n    top: 6px;\n    bottom: initial;\n    left: 4px; }\n    [dir="rtl"] .mdc-textfield--multiline .mdc-textfield--multiline .mdc-textfield__label,\n    .mdc-textfield--multiline[dir="rtl"] .mdc-textfield--multiline .mdc-textfield__label {\n      right: 4px;\n      left: auto; }\n    .mdc-textfield--multiline .mdc-textfield__label--float-above {\n      transform: translateY(calc(-100% - 6px)) scale(0.923, 0.923); }\n  .mdc-textfield--multiline.mdc-textfield--disabled {\n    border-bottom: none; }\n    .mdc-textfield--multiline.mdc-textfield--disabled .mdc-textfield__input {\n      border: 1px dotted rgba(35, 31, 32, 0.26); }\n      .mdc-textfield--theme-dark .mdc-textfield--multiline.mdc-textfield--disabled .mdc-textfield__input,\n      .mdc-theme--dark .mdc-textfield--multiline.mdc-textfield--disabled .mdc-textfield__input {\n        border-color: rgba(255, 255, 255, 0.3); }\n\n.mdc-textfield--fullwidth {\n  display: block;\n  width: 100%;\n  box-sizing: border-box;\n  margin: 0;\n  border: none;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n  outline: none; }\n  .mdc-textfield--fullwidth:not(.mdc-textfield--multiline) {\n    height: 56px; }\n  .mdc-textfield--fullwidth.mdc-textfield--multiline {\n    padding: 20px 0 0; }\n  .mdc-textfield--fullwidth.mdc-textfield--dense:not(.mdc-textfield--multiline) {\n    height: 48px; }\n  .mdc-textfield--fullwidth.mdc-textfield--dense.mdc-textfield--multiline {\n    padding: 16px 0 0; }\n  .mdc-textfield--fullwidth.mdc-textfield--disabled, .mdc-textfield--fullwidth.mdc-textfield--disabled.mdc-textfield--multiline {\n    border-bottom: 1px dotted rgba(0, 0, 0, 0.12); }\n  .mdc-textfield--fullwidth--theme-dark,\n  .mdc-theme--dark .mdc-textfield--fullwidth {\n    border-bottom: 1px solid rgba(255, 255, 255, 0.12); }\n    .mdc-textfield--fullwidth--theme-dark.mdc-textfield--disabled, .mdc-textfield--fullwidth--theme-dark.mdc-textfield--disabled.mdc-textfield--multiline,\n    .mdc-theme--dark .mdc-textfield--fullwidth.mdc-textfield--disabled,\n    .mdc-theme--dark .mdc-textfield--fullwidth.mdc-textfield--disabled.mdc-textfield--multiline {\n      border-bottom: 1px dotted rgba(255, 255, 255, 0.12); }\n  .mdc-textfield--fullwidth .mdc-textfield__input {\n    width: 100%;\n    height: 100%;\n    padding: 0;\n    resize: none;\n    border: none !important; }\n\n.mdc-textfield:not(.mdc-textfield--upgraded):not(.mdc-textfield--multiline) .mdc-textfield__input {\n  transition: border-bottom-color 180ms cubic-bezier(0.4, 0, 0.2, 1);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n\n.mdc-textfield:not(.mdc-textfield--upgraded) .mdc-textfield__input:focus {\n  border-color: #3f51b5;\n  border-color: var(--mdc-theme-primary, #3f51b5); }\n\n.mdc-textfield:not(.mdc-textfield--upgraded) .mdc-textfield__input:disabled {\n  color: rgba(0, 0, 0, 0.38);\n  color: var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38));\n  border-style: dotted;\n  border-color: rgba(35, 31, 32, 0.26); }\n\n.mdc-textfield:not(.mdc-textfield--upgraded) .mdc-textfield__input:invalid:not(:focus) {\n  border-color: #d50000; }\n\n.mdc-textfield--theme-dark:not(.mdc-textfield--upgraded) .mdc-textfield__input:not(:focus),\n.mdc-theme--dark .mdc-textfield:not(.mdc-textfield--upgraded) .mdc-textfield__input:not(:focus) {\n  border-color: rgba(255, 255, 255, 0.12); }\n\n.mdc-textfield--theme-dark:not(.mdc-textfield--upgraded) .mdc-textfield__input:disabled,\n.mdc-theme--dark .mdc-textfield:not(.mdc-textfield--upgraded) .mdc-textfield__input:disabled {\n  color: rgba(255, 255, 255, 0.5);\n  color: var(--mdc-theme-text-disabled-on-dark, rgba(255, 255, 255, 0.5));\n  border-color: rgba(255, 255, 255, 0.3); }\n\n.mdc-textfield--theme-dark:not(.mdc-textfield--upgraded) .mdc-textfield__input:invalid:not(:focus),\n.mdc-theme--dark .mdc-textfield:not(.mdc-textfield--upgraded) .mdc-textfield__input:invalid:not(:focus) {\n  border-color: #ff6e6e; }\n\n.mdc-textfield-helptext {\n  color: rgba(0, 0, 0, 0.38);\n  color: var(--mdc-theme-text-hint-on-light, rgba(0, 0, 0, 0.38));\n  margin: 0;\n  transition: opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);\n  font-size: .75rem;\n  opacity: 0;\n  will-change: opacity; }\n  .mdc-textfield-helptext--theme-dark,\n  .mdc-theme--dark .mdc-textfield-helptext {\n    color: rgba(255, 255, 255, 0.5);\n    color: var(--mdc-theme-text-hint-on-dark, rgba(255, 255, 255, 0.5)); }\n  .mdc-textfield + .mdc-textfield-helptext {\n    margin-bottom: 8px; }\n  .mdc-textfield--dense + .mdc-textfield-helptext {\n    margin-bottom: 4px; }\n  .mdc-textfield--focused + .mdc-textfield-helptext:not(.mdc-textfield-helptext--validation-msg) {\n    opacity: 1; }\n\n.mdc-textfield-helptext--persistent {\n  transition: none;\n  opacity: 1;\n  will-change: initial; }\n\n.mdc-textfield--invalid + .mdc-textfield-helptext--validation-msg {\n  color: #d50000;\n  opacity: 1; }\n\n.mdc-textfield--theme-dark.mdc-textfield--invalid + .mdc-textfield-helptext--validation-msg,\n.mdc-theme--dark .mdc-textfield--invalid + .mdc-textfield-helptext--validation-msg {\n  color: #ff6e6e; }\n\n.mdc-form-field > .mdc-textfield + label {\n  align-self: flex-start; }\n', ""]);
  }, function (e, t, n) {
    (e.exports = n(2)(void 0)).push([e.i, '/**\n * The css property used for elevation. In most cases this should not be changed. It is exposed\n * as a variable for abstraction / easy use when needing to reference the property directly, for\n * example in a `will-change` rule.\n */\n/**\n * The default duration value for elevation transitions.\n */\n/**\n * The default easing value for elevation transitions.\n */\n/**\n * Applies the correct css rules to an element to give it the elevation specified by $z-value.\n * The $z-value must be between 0 and 24.\n */\n/**\n * Returns a string that can be used as the value for a `transition` property for elevation.\n * Calling this function directly is useful in situations where a component needs to transition\n * more than one property.\n *\n * ```scss\n * .foo {\n *   transition: mdc-elevation-transition-rule(), opacity 100ms ease;\n *   will-change: $mdc-elevation-property, opacity;\n * }\n * ```\n */\n/**\n * Applies the correct css rules needed to have an element transition between elevations.\n * This mixin should be applied to elements whose elevation values will change depending on their\n * context (e.g. when active or disabled).\n */\n/**\n * Creates a rule that will be applied when an MDC-Web component is within the context of an RTL layout.\n *\n * Usage Example:\n * ```scss\n * .mdc-foo {\n *   position: absolute;\n *   left: 0;\n *\n *   @include mdc-rtl {\n *     left: auto;\n *     right: 0;\n *   }\n *\n *   &__bar {\n *     margin-left: 4px;\n *     @include mdc-rtl(".mdc-foo") {\n *       margin-left: auto;\n *       margin-right: 4px;\n *     }\n *   }\n * }\n *\n * .mdc-foo--mod {\n *   padding-left: 4px;\n *\n *   @include mdc-rtl {\n *     padding-left: auto;\n *     padding-right: 4px;\n *   }\n * }\n * ```\n *\n * Note that this works by checking for [dir="rtl"] on an ancestor element. While this will work\n * in most cases, it will in some cases lead to false negatives, e.g.\n *\n * ```html\n * <html dir="rtl">\n *   \x3c!-- ... --\x3e\n *   <div dir="ltr">\n *     <div class="mdc-foo">Styled incorrectly as RTL!</div>\n *   </div>\n * </html>\n * ```\n *\n * In the future, selectors such as :dir (http://mdn.io/:dir) will help us mitigate this.\n */\n/**\n * Takes a base box-model property - e.g. margin / border / padding - along with a default\n * direction and value, and emits rules which apply the value to the\n * "<base-property>-<default-direction>" property by default, but flips the direction\n * when within an RTL context.\n *\n * For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-box(margin, left, 8px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-left: 8px;\n *\n *   @include mdc-rtl {\n *     margin-right: 8px;\n *     margin-left: 0;\n *   }\n * }\n * ```\n * whereas:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-box(margin, right, 8px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-right: 8px;\n *\n *   @include mdc-rtl {\n *     margin-right: 0;\n *     margin-left: 8px;\n *   }\n * }\n * ```\n *\n * You can also pass a 4th optional $root-selector argument which will be forwarded to `mdc-rtl`,\n * e.g. `@include mdc-rtl-reflexive-box-property(margin, left, 8px, ".mdc-component")`.\n *\n * Note that this function will always zero out the original value in an RTL context. If you\'re\n * trying to flip the values, use mdc-rtl-reflexive-property().\n */\n/**\n * Takes a base property and emits rules that assign <base-property>-left to <left-value> and\n * <base-property>-right to <right-value> in a LTR context, and vice versa in a RTL context.\n * For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-property(margin, auto, 12px);\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n * .mdc-foo {\n *   margin-left: auto;\n *   margin-right: 12px;\n *\n *   @include mdc-rtl {\n *     margin-left: 12px;\n *     margin-right: auto;\n *   }\n * }\n * ```\n *\n * A 4th optional $root-selector argument can be given, which will be passed to `mdc-rtl`.\n */\n/**\n * Takes an argument specifying a horizontal position property (either "left" or "right") as well\n * as a value, and applies that value to the specified position in a LTR context, and flips it in a\n * RTL context. For example:\n *\n * ```scss\n * .mdc-foo {\n *   @include mdc-rtl-reflexive-position(left, 0);\n *   position: absolute;\n * }\n * ```\n * is equivalent to:\n *\n * ```scss\n *  .mdc-foo {\n *    position: absolute;\n *    left: 0;\n *    right: initial;\n *\n *    @include mdc-rtl {\n *      right: 0;\n *      left: initial;\n *    }\n *  }\n * ```\n * An optional third $root-selector argument may also be given, which is passed to `mdc-rtl`.\n */\n/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns "dark" for dark text and "light" for light text.\n */\n/*\n  Main theme colors.\n  If you\'re a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/**\n * Applies the correct theme color style to the specified property.\n * $property is typically color or background-color, but can be any CSS property that accepts color values.\n * $style should be one of the map keys in $mdc-theme-property-values (_variables.scss).\n */\n/**\n * Creates a rule to be used in MDC-Web components for dark theming, and applies the provided contents.\n * Should provide the $root-selector option if applied to anything other than the root selector.\n * When used with a modifier class, provide a second argument of `true` for the $compound parameter\n * to specify that this should be attached as a compound class.\n *\n * Usage example:\n *\n * ```scss\n * .mdc-foo {\n *   color: black;\n *\n *   @include mdc-theme-dark {\n *     color: white;\n *   }\n *\n *   &__bar {\n *     background: black;\n *\n *     @include mdc-theme-dark(".mdc-foo") {\n *       background: white;\n *     }\n *   }\n * }\n *\n * .mdc-foo--disabled {\n *   opacity: .38;\n *\n *   @include mdc-theme-dark(".mdc-foo", true) {\n *     opacity: .5;\n *   }\n * }\n * ```\n */\n/* TODO(sgomes): Figure out what to do about desktop font sizes. */\n/* TODO(sgomes): Figure out what to do about i18n and i18n font sizes. */\n.mdc-toolbar {\n  display: flex;\n  position: relative;\n  flex-direction: column;\n  justify-content: space-between;\n  width: 100%;\n  box-sizing: border-box;\n  background-color: #3f51b5;\n  background-color: var(--mdc-theme-primary, #3f51b5);\n  color: white;\n  color: var(--mdc-theme-text-primary-on-primary, white); }\n  .mdc-toolbar__row {\n    display: flex;\n    position: relative;\n    width: 100%;\n    height: auto;\n    min-height: 64px;\n    padding: 20px 28px;\n    box-sizing: border-box; }\n    @media (max-width: 599px) {\n      .mdc-toolbar__row {\n        min-height: 56px;\n        padding: 16px; } }\n  .mdc-toolbar__section {\n    display: inline-flex;\n    flex: 1;\n    align-items: flex-start;\n    justify-content: center;\n    min-width: 0;\n    z-index: 1; }\n    .mdc-toolbar__section--align-start {\n      justify-content: flex-start;\n      order: -1; }\n    .mdc-toolbar__section--align-end {\n      justify-content: flex-end;\n      order: 1; }\n  .mdc-toolbar__title {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 1.25rem;\n    font-weight: 500;\n    letter-spacing: 0.02em;\n    line-height: 2rem;\n    margin: 0;\n    line-height: 1.5rem;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n    z-index: 1; }\n\n.mdc-toolbar--fixed {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12); }\n\n.mdc-toolbar--flexible {\n  --mdc-toolbar-ratio-to-extend-flexible: 4; }\n  .mdc-toolbar--flexible .mdc-toolbar__row:first-child {\n    height: 256px;\n    height: calc(64px * var(--mdc-toolbar-ratio-to-extend-flexible, 4)); }\n    @media (max-width: 599px) {\n      .mdc-toolbar--flexible .mdc-toolbar__row:first-child {\n        height: 224px;\n        height: calc(56px * var(--mdc-toolbar-ratio-to-extend-flexible, 4)); } }\n    .mdc-toolbar--flexible .mdc-toolbar__row:first-child::after {\n      position: absolute;\n      content: ""; }\n  .mdc-toolbar--flexible-default-behavior .mdc-toolbar__title {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 2.125rem;\n    font-weight: 400;\n    letter-spacing: normal;\n    line-height: 2.5rem;\n    transform: translateY(192px);\n    transform: translateY(calc(64px * (var(--mdc-toolbar-ratio-to-extend-flexible, 4) - 1)));\n    line-height: 1.5rem; }\n    @media (max-width: 599px) {\n      .mdc-toolbar--flexible-default-behavior .mdc-toolbar__title {\n        transform: translateY(168px);\n        transform: translateY(calc(56px * (var(--mdc-toolbar-ratio-to-extend-flexible, 4) - 1))); } }\n  .mdc-toolbar--flexible-default-behavior .mdc-toolbar__row:first-child::after {\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    transition: opacity .2s ease;\n    opacity: 1; }\n  .mdc-toolbar--flexible-default-behavior.mdc-toolbar--flexible-space-minimized .mdc-toolbar__row:first-child::after {\n    opacity: 0; }\n  .mdc-toolbar--flexible-default-behavior.mdc-toolbar--flexible-space-minimized .mdc-toolbar__title {\n    font-weight: 500; }\n\n.mdc-toolbar--waterfall.mdc-toolbar--fixed {\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  will-change: box-shadow; }\n  .mdc-toolbar--waterfall.mdc-toolbar--fixed.mdc-toolbar--flexible-space-minimized {\n    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12); }\n  .mdc-toolbar--waterfall.mdc-toolbar--fixed.mdc-toolbar--fixed-lastrow-only.mdc-toolbar--flexible-space-minimized {\n    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12); }\n  .mdc-toolbar--waterfall.mdc-toolbar--fixed.mdc-toolbar--fixed-lastrow-only.mdc-toolbar--fixed-at-last-row {\n    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12); }\n\n.mdc-toolbar-fixed-adjust {\n  margin-top: 64px; }\n  @media (max-width: 599px) {\n    .mdc-toolbar-fixed-adjust {\n      margin-top: 56px; } }\n\n.mdc-toolbar__section--shrink-to-fit {\n  flex: none; }\n', ""]);
  }, function (e, t, n) {
    (e.exports = n(2)(void 0)).push([e.i, "/* TODO(sgomes): Figure out what to do about desktop font sizes. */\n/* TODO(sgomes): Figure out what to do about i18n and i18n font sizes. */\n/* TODO(sgomes): Figure out what to do about desktop font sizes. */\n/* TODO(sgomes): Figure out what to do about i18n and i18n font sizes. */\n.mdc-typography {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased; }\n\n.mdc-typography--display4 {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 7rem;\n  font-weight: 300;\n  letter-spacing: -0.04em;\n  line-height: 7rem; }\n\n.mdc-typography--adjust-margin.mdc-typography--display4 {\n  margin: -1rem 0 3.5rem -0.085em; }\n\n.mdc-typography--display3 {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 3.5rem;\n  font-weight: 400;\n  letter-spacing: -0.02em;\n  line-height: 3.5rem; }\n\n.mdc-typography--adjust-margin.mdc-typography--display3 {\n  margin: -8px 0 64px -0.07em; }\n\n.mdc-typography--display2 {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 2.813rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  line-height: 3rem; }\n\n.mdc-typography--adjust-margin.mdc-typography--display2 {\n  margin: -0.5rem 0 4rem -0.07em; }\n\n.mdc-typography--display1 {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 2.125rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  line-height: 2.5rem; }\n\n.mdc-typography--adjust-margin.mdc-typography--display1 {\n  margin: -0.5rem 0 4rem -0.07em; }\n\n.mdc-typography--headline {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1.5rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  line-height: 2rem; }\n\n.mdc-typography--adjust-margin.mdc-typography--headline {\n  margin: -0.5rem 0 1rem -0.06em; }\n\n.mdc-typography--title {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1.25rem;\n  font-weight: 500;\n  letter-spacing: 0.02em;\n  line-height: 2rem; }\n\n.mdc-typography--adjust-margin.mdc-typography--title {\n  margin: -0.5rem 0 1rem -0.05em; }\n\n.mdc-typography--subheading2 {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  font-weight: 400;\n  letter-spacing: 0.04em;\n  line-height: 1.75rem; }\n\n.mdc-typography--adjust-margin.mdc-typography--subheading2 {\n  margin: -0.5rem 0 1rem -0.06em; }\n\n.mdc-typography--subheading1 {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.938rem;\n  font-weight: 400;\n  letter-spacing: 0.04em;\n  line-height: 1.5rem; }\n\n.mdc-typography--adjust-margin.mdc-typography--subheading1 {\n  margin: -0.313rem 0 0.813rem -0.06em; }\n\n.mdc-typography--body2 {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  font-weight: 500;\n  letter-spacing: 0.04em;\n  line-height: 1.5rem; }\n\n.mdc-typography--adjust-margin.mdc-typography--body2 {\n  margin: -0.25rem 0 0.75rem 0; }\n\n.mdc-typography--body1 {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  font-weight: 400;\n  letter-spacing: 0.04em;\n  line-height: 1.25rem; }\n\n.mdc-typography--adjust-margin.mdc-typography--body1 {\n  margin: -0.25rem 0 0.75rem 0; }\n\n.mdc-typography--caption {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.75rem;\n  font-weight: 400;\n  letter-spacing: 0.08em;\n  line-height: 1.25rem; }\n\n.mdc-typography--adjust-margin.mdc-typography--caption {\n  margin: -0.5rem 0 1rem -0.04em; }\n", ""]);
  }, function (e, t) {
    e.exports = '<input #nativeCb type="checkbox"\r\n       class="mdc-checkbox__native-control"\r\n       [attr.aria-labelledby]="labelId"\r\n       [(ngModel)]="ngModel"\r\n       [checked]="checked"\r\n       [indeterminate]="indeterminate"\r\n       (change)="handleChange($event)"/>\r\n<div class="mdc-checkbox__background">\r\n  <svg class="mdc-checkbox__checkmark"\r\n    viewBox="0 0 24 24">\r\n    <path class="mdc-checkbox__checkmark__path"\r\n          fill="none"\r\n          stroke="white"\r\n          d="M1.73,12.91 8.1,19.28 22.79,4.59"/>\r\n  </svg>\r\n  <div class="mdc-checkbox__mixedmark"></div>\r\n</div>';
  }, function (e, t) {
    e.exports = '<div class="mdc-linear-progress__buffering-dots"></div>\r\n<div class="mdc-linear-progress__buffer"></div>\r\n<div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">\r\n <span class="mdc-linear-progress__bar-inner"></span>\r\n</div>\r\n<div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">\r\n <span class="mdc-linear-progress__bar-inner"></span>\r\n</div>\r\n';
  }, function (e, t) {
    e.exports = '<ul #itemsContainer class="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true">\r\n  <li mdc-menu-item *ngFor="let item of items" [id]="item.id" role="menuitem" [label]="item.label" tabindex="0">{{item.label}}</li>\r\n</ul>\r\n';
  }, function (e, t) {
    e.exports = '<div class="mdc-snackbar__text">{{message}}</div>\r\n<div class="mdc-snackbar__action-wrapper">\r\n  <button type="button" class="mdc-button mdc-snackbar__action-button" aria-hidden>{{actionText}}</button>\r\n</div>\r\n';
  }, function (e, t) {
    e.exports = '<input #nativeCb type="checkbox" \r\n  [id]="id"\r\n  class="mdc-switch__native-control"\r\n  [(ngModel)]="ngModel"\r\n  [checked]="checked"\r\n  (change)="handleChange($event)"/>\r\n<div class="mdc-switch__background">\r\n  <div class="mdc-switch__knob"></div>\r\n</div>\r\n';
  }, function (e, t) {
    e.exports = '<textarea *ngIf="multiline"\r\n  #input\r\n  [rows]="rows"\r\n  [cols]="cols"\r\n  class="mdc-textfield__input"\r\n  type="text"\r\n  [attr.name]="name"\r\n  [id]="id"\r\n  [placeholder]="placeholder ? placeholder : \'\'"\r\n  [tabindex]="tabindex"\r\n  [maxlength]="maxlength"\r\n  [attr.aria-label]="placeholder"\r\n  (focus)="handleFocus($event)"\r\n  (blur)="handleBlur($event)"\r\n  (input)="handleInput($event)"\r\n  (keydown)="handleKeyDown($event)"\r\n  [(ngModel)]="value"\r\n  [disabled]="disabled"\r\n  [required]="required"></textarea>\r\n<input *ngIf="!multiline"\r\n  #input\r\n  class="mdc-textfield__input"\r\n  [type]="type"\r\n  [id]="id"\r\n  [attr.name]="name"\r\n  [attr.aria-controls]="labelId"\r\n  [(ngModel)]="value"\r\n  [placeholder]="placeholder ? placeholder : \'\'"\r\n  [tabindex]="tabindex"\r\n  [maxlength]="maxlength"\r\n  [disabled]="disabled"\r\n  [required]="required"\r\n  [attr.tabindex]="tabindex"\r\n  (focus)="handleFocus($event)"\r\n  (keydown)="handleKeyDown($event)"\r\n  (blur)="handleBlur($event)"\r\n  (input)="handleInput($event)" />\r\n<label #inputlabel [attr.for]="id" class="mdc-textfield__label" *ngIf="!placeholder">{{label}}</label>';
  }, function (e, t, n) {
    var i = n(70);"string" == typeof i && (i = [[e.i, i, ""]]);var o = {};o.transform = void 0;n(3)(i, o);i.locals && (e.exports = i.locals);
  }, function (e, t, n) {
    var i = n(71);"string" == typeof i && (i = [[e.i, i, ""]]);var o = {};o.transform = void 0;n(3)(i, o);i.locals && (e.exports = i.locals);
  }, function (e, t, n) {
    var i = n(72);"string" == typeof i && (i = [[e.i, i, ""]]);var o = {};o.transform = void 0;n(3)(i, o);i.locals && (e.exports = i.locals);
  }, function (e, t, n) {
    var i = n(73);"string" == typeof i && (i = [[e.i, i, ""]]);var o = {};o.transform = void 0;n(3)(i, o);i.locals && (e.exports = i.locals);
  }, function (e, t, n) {
    var i = n(74);"string" == typeof i && (i = [[e.i, i, ""]]);var o = {};o.transform = void 0;n(3)(i, o);i.locals && (e.exports = i.locals);
  }, function (e, t, n) {
    var i = n(75);"string" == typeof i && (i = [[e.i, i, ""]]);var o = {};o.transform = void 0;n(3)(i, o);i.locals && (e.exports = i.locals);
  }, function (e, t, n) {
    var i = n(76);"string" == typeof i && (i = [[e.i, i, ""]]);var o = {};o.transform = void 0;n(3)(i, o);i.locals && (e.exports = i.locals);
  }, function (e, t, n) {
    var i = n(77);"string" == typeof i && (i = [[e.i, i, ""]]);var o = {};o.transform = void 0;n(3)(i, o);i.locals && (e.exports = i.locals);
  }, function (e, t, n) {
    var i = n(78);"string" == typeof i && (i = [[e.i, i, ""]]);var o = {};o.transform = void 0;n(3)(i, o);i.locals && (e.exports = i.locals);
  }, function (e, t, n) {
    var i = n(79);"string" == typeof i && (i = [[e.i, i, ""]]);var o = {};o.transform = void 0;n(3)(i, o);i.locals && (e.exports = i.locals);
  }, function (e, t, n) {
    var i = n(80);"string" == typeof i && (i = [[e.i, i, ""]]);var o = {};o.transform = void 0;n(3)(i, o);i.locals && (e.exports = i.locals);
  }, function (e, t, n) {
    var i = n(81);"string" == typeof i && (i = [[e.i, i, ""]]);var o = {};o.transform = void 0;n(3)(i, o);i.locals && (e.exports = i.locals);
  }, function (e, t, n) {
    var i = n(82);"string" == typeof i && (i = [[e.i, i, ""]]);var o = {};o.transform = void 0;n(3)(i, o);i.locals && (e.exports = i.locals);
  }, function (e, t) {
    e.exports = function (e) {
      var t = "undefined" != typeof window && window.location;if (!t) throw new Error("fixUrls requires window.location");if (!e || "string" != typeof e) return e;var n = t.protocol + "//" + t.host,
          i = n + t.pathname.replace(/\/[^\/]*$/, "/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (e, t) {
        var o = t.trim().replace(/^"(.*)"$/, function (e, t) {
          return t;
        }).replace(/^'(.*)'$/, function (e, t) {
          return t;
        });if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(o)) return e;var r;return r = 0 === o.indexOf("//") ? o : 0 === o.indexOf("/") ? n + o : i + o.replace(/^\.\//, ""), "url(" + JSON.stringify(r) + ")";
      });
    };
  }]);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(678)(module)))

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LayoutWrapDirective = undefined;

var _core = __webpack_require__(3);

var _base = __webpack_require__(23);

var _layout = __webpack_require__(58);

var _mediaMonitor = __webpack_require__(18);

var _layoutValidator = __webpack_require__(60);

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @deprecated
 * This functionality is now part of the `fxLayout` API
 *
 * 'layout-wrap' flexbox styling directive
 * Defines wrapping of child elements in layout container
 * Optional values: reverse, wrap-reverse, none, nowrap, wrap (default)]
 *
 *
 * @see https://css-tricks.com/almanac/properties/f/flex-wrap/
 */
var LayoutWrapDirective = function (_super) {
    __extends(LayoutWrapDirective, _super);
    /* tslint:enable */
    function LayoutWrapDirective(monitor, elRef, renderer, container) {
        var _this = _super.call(this, monitor, elRef, renderer) || this;
        _this._layout = 'row'; // default flex-direction
        if (container) {
            _this._layoutWatcher = container.layout$.subscribe(_this._onLayoutChange.bind(_this));
        }
        return _this;
    }
    Object.defineProperty(LayoutWrapDirective.prototype, "wrap", {
        /* tslint:disable */
        set: function set(val) {
            this._cacheInput("wrap", val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapXs", {
        set: function set(val) {
            this._cacheInput('wrapXs', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapSm", {
        set: function set(val) {
            this._cacheInput('wrapSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapMd", {
        set: function set(val) {
            this._cacheInput('wrapMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapLg", {
        set: function set(val) {
            this._cacheInput('wrapLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapXl", {
        set: function set(val) {
            this._cacheInput('wrapXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapGtXs", {
        set: function set(val) {
            this._cacheInput('wrapGtXs', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapGtSm", {
        set: function set(val) {
            this._cacheInput('wrapGtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapGtMd", {
        set: function set(val) {
            this._cacheInput('wrapGtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapGtLg", {
        set: function set(val) {
            this._cacheInput('wrapGtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapLtSm", {
        set: function set(val) {
            this._cacheInput('wrapLtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapLtMd", {
        set: function set(val) {
            this._cacheInput('wrapLtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapLtLg", {
        set: function set(val) {
            this._cacheInput('wrapLtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapLtXl", {
        set: function set(val) {
            this._cacheInput('wrapLtXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    LayoutWrapDirective.prototype.ngOnChanges = function (changes) {
        if (changes['wrap'] != null || this._mqActivation) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    LayoutWrapDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._listenForMediaQueryChanges('wrap', 'wrap', function (changes) {
            _this._updateWithValue(changes.value);
        });
        this._updateWithValue();
    };
    LayoutWrapDirective.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this._layoutWatcher) {
            this._layoutWatcher.unsubscribe();
        }
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     * Cache the parent container 'flex-direction' and update the 'flex' styles
     */
    LayoutWrapDirective.prototype._onLayoutChange = function (direction) {
        var _this = this;
        this._layout = (direction || '').toLowerCase().replace('-reverse', '');
        if (!_layoutValidator.LAYOUT_VALUES.find(function (x) {
            return x === _this._layout;
        })) {
            this._layout = 'row';
        }
        this._updateWithValue();
    };
    LayoutWrapDirective.prototype._updateWithValue = function (value) {
        value = value || this._queryInput("wrap");
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        value = (0, _layoutValidator.validateWrapValue)(value || 'wrap');
        this._applyStyleToElement(this._buildCSS(value));
    };
    /**
     * Build the CSS that should be assigned to the element instance
     */
    LayoutWrapDirective.prototype._buildCSS = function (value) {
        return {
            'display': 'flex',
            'flex-wrap': value,
            'flex-direction': this.flowDirection
        };
    };
    Object.defineProperty(LayoutWrapDirective.prototype, "flowDirection", {
        get: function get() {
            var _this = this;
            var computeFlowDirection = function computeFlowDirection() {
                return _this._getFlowDirection(_this._elementRef.nativeElement);
            };
            return this._layoutWatcher ? this._layout : computeFlowDirection();
        },
        enumerable: true,
        configurable: true
    });
    return LayoutWrapDirective;
}(_base.BaseFxDirective);
exports.LayoutWrapDirective = LayoutWrapDirective;

LayoutWrapDirective.decorators = [{ type: _core.Directive, args: [{ selector: "\n  [fxLayoutWrap], [fxLayoutWrap.xs], [fxLayoutWrap.sm], [fxLayoutWrap.lg], [fxLayoutWrap.xl],\n  [fxLayoutWrap.gt-xs], [fxLayoutWrap.gt-sm], [fxLayoutWrap.gt-md], [fxLayoutWrap.gt-lg],\n  [fxLayoutWrap.lt-xs], [fxLayoutWrap.lt-sm], [fxLayoutWrap.lt-md], [fxLayoutWrap.lt-lg]\n" }] }];
/** @nocollapse */
LayoutWrapDirective.ctorParameters = function () {
    return [{ type: _mediaMonitor.MediaMonitor }, { type: _core.ElementRef }, { type: _core.Renderer2 }, { type: _layout.LayoutDirective, decorators: [{ type: _core.Optional }, { type: _core.Self }] }];
};
LayoutWrapDirective.propDecorators = {
    'wrap': [{ type: _core.Input, args: ['fxLayoutWrap'] }],
    'wrapXs': [{ type: _core.Input, args: ['fxLayoutWrap.xs'] }],
    'wrapSm': [{ type: _core.Input, args: ['fxLayoutWrap.sm'] }],
    'wrapMd': [{ type: _core.Input, args: ['fxLayoutWrap.md'] }],
    'wrapLg': [{ type: _core.Input, args: ['fxLayoutWrap.lg'] }],
    'wrapXl': [{ type: _core.Input, args: ['fxLayoutWrap.xl'] }],
    'wrapGtXs': [{ type: _core.Input, args: ['fxLayoutWrap.gt-xs'] }],
    'wrapGtSm': [{ type: _core.Input, args: ['fxLayoutWrap.gt-sm'] }],
    'wrapGtMd': [{ type: _core.Input, args: ['fxLayoutWrap.gt-md'] }],
    'wrapGtLg': [{ type: _core.Input, args: ['fxLayoutWrap.gt-lg'] }],
    'wrapLtSm': [{ type: _core.Input, args: ['fxLayoutWrap.lt-sm'] }],
    'wrapLtMd': [{ type: _core.Input, args: ['fxLayoutWrap.lt-md'] }],
    'wrapLtLg': [{ type: _core.Input, args: ['fxLayoutWrap.lt-lg'] }],
    'wrapLtXl': [{ type: _core.Input, args: ['fxLayoutWrap.lt-xl'] }]
};
//# sourceMappingURL=layout-wrap.js.map

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ResponsiveActivation = exports.KeyOptions = undefined;

__webpack_require__(56);

__webpack_require__(67);

var _objectExtend = __webpack_require__(42);

var KeyOptions = function () {
    function KeyOptions(baseKey, defaultValue, inputKeys) {
        this.baseKey = baseKey;
        this.defaultValue = defaultValue;
        this.inputKeys = inputKeys;
    }
    return KeyOptions;
}();
exports.KeyOptions = KeyOptions;
/**
 * ResponsiveActivation acts as a proxy between the MonitorMedia service (which emits mediaQuery
 * changes) and the fx API directives. The MQA proxies mediaQuery change events and notifies the
 * directive via the specified callback.
 *
 * - The MQA also determines which directive property should be used to determine the
 *   current change 'value'... BEFORE the original `onMediaQueryChanges()` method is called.
 * - The `ngOnDestroy()` method is also head-hooked to enable auto-unsubscribe from the
 *   MediaQueryServices.
 *
 * NOTE: these interceptions enables the logic in the fx API directives to remain terse and clean.
 */

var ResponsiveActivation = function () {
    /**
     * Constructor
     */
    function ResponsiveActivation(_options, _mediaMonitor, _onMediaChanges) {
        this._options = _options;
        this._mediaMonitor = _mediaMonitor;
        this._onMediaChanges = _onMediaChanges;
        this._subscribers = [];
        this._subscribers = this._configureChangeObservers();
    }
    Object.defineProperty(ResponsiveActivation.prototype, "mediaMonitor", {
        /**
         * Accessor to the DI'ed directive property
         * Each directive instance has a reference to the MediaMonitor which is
         * used HERE to subscribe to mediaQuery change notifications.
         */
        get: function get() {
            return this._mediaMonitor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResponsiveActivation.prototype, "activatedInputKey", {
        /**
         * Determine which directive @Input() property is currently active (for the viewport size):
         * The key must be defined (in use) or fallback to the 'closest' overlapping property key
         * that is defined; otherwise the default property key will be used.
         * e.g.
         *      if `<div fxHide fxHide.gt-sm="false">` is used but the current activated mediaQuery alias
         *      key is `.md` then `.gt-sm` should be used instead
         */
        get: function get() {
            return this._activatedInputKey || this._options.baseKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResponsiveActivation.prototype, "activatedInput", {
        /**
         * Get the currently activated @Input value or the fallback default @Input value
         */
        get: function get() {
            var key = this.activatedInputKey;
            return this.hasKeyValue(key) ? this._lookupKeyValue(key) : this._options.defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Fast validator for presence of attribute on the host element
     */
    ResponsiveActivation.prototype.hasKeyValue = function (key) {
        var value = this._options.inputKeys[key];
        return typeof value !== 'undefined';
    };
    /**
     * Remove interceptors, restore original functions, and forward the onDestroy() call
     */
    ResponsiveActivation.prototype.destroy = function () {
        this._subscribers.forEach(function (link) {
            link.unsubscribe();
        });
        this._subscribers = [];
    };
    /**
     * For each *defined* API property, register a callback to `_onMonitorEvents( )`
     * Cache 1..n subscriptions for internal auto-unsubscribes when the the directive destructs
     */
    ResponsiveActivation.prototype._configureChangeObservers = function () {
        var _this = this;
        var subscriptions = [];
        this._buildRegistryMap().forEach(function (bp) {
            if (_this._keyInUse(bp.key)) {
                // Inject directive default property key name: to let onMediaChange() calls
                // know which property is being triggered...
                var buildChanges = function buildChanges(change) {
                    change = change.clone();
                    change.property = _this._options.baseKey;
                    return change;
                };
                subscriptions.push(_this.mediaMonitor.observe(bp.alias).map(buildChanges).subscribe(function (change) {
                    _this._onMonitorEvents(change);
                }));
            }
        });
        return subscriptions;
    };
    /**
     * Build mediaQuery key-hashmap; only for the directive properties that are actually defined/used
     * in the HTML markup
     */
    ResponsiveActivation.prototype._buildRegistryMap = function () {
        var _this = this;
        return this.mediaMonitor.breakpoints.map(function (bp) {
            return (0, _objectExtend.extendObject)({}, bp, {
                baseKey: _this._options.baseKey,
                key: _this._options.baseKey + bp.suffix // e.g.  layoutGtSm, layoutMd, layoutGtLg
            });
        }).filter(function (bp) {
            return _this._keyInUse(bp.key);
        });
    };
    /**
     * Synchronizes change notifications with the current mq-activated @Input and calculates the
     * mq-activated input value or the default value
     */
    ResponsiveActivation.prototype._onMonitorEvents = function (change) {
        if (change.property == this._options.baseKey) {
            change.value = this._calculateActivatedValue(change);
            this._onMediaChanges(change);
        }
    };
    /**
     * Has the key been specified in the HTML markup and thus is intended
     * to participate in activation processes.
     */
    ResponsiveActivation.prototype._keyInUse = function (key) {
        return this._lookupKeyValue(key) !== undefined;
    };
    /**
     *  Map input key associated with mediaQuery activation to closest defined input key
     *  then return the values associated with the targeted input property
     *
     *  !! change events may arrive out-of-order (activate before deactivate)
     *     so make sure the deactivate is used ONLY when the keys match
     *     (since a different activate may be in use)
     */
    ResponsiveActivation.prototype._calculateActivatedValue = function (current) {
        var currentKey = this._options.baseKey + current.suffix; // e.g. suffix == 'GtSm',
        var newKey = this._activatedInputKey; // e.g. newKey == hideGtSm
        newKey = current.matches ? currentKey : newKey == currentKey ? null : newKey;
        this._activatedInputKey = this._validateInputKey(newKey);
        return this.activatedInput;
    };
    /**
     * For the specified input property key, validate it is defined (used in the markup)
     * If not see if a overlapping mediaQuery-related input key fallback has been defined
     *
     * NOTE: scans in the order defined by activeOverLaps (largest viewport ranges -> smallest ranges)
     */
    ResponsiveActivation.prototype._validateInputKey = function (inputKey) {
        var _this = this;
        var items = this.mediaMonitor.activeOverlaps;
        var isMissingKey = function isMissingKey(key) {
            return !_this._keyInUse(key);
        };
        if (isMissingKey(inputKey)) {
            items.some(function (bp) {
                var key = _this._options.baseKey + bp.suffix;
                if (!isMissingKey(key)) {
                    inputKey = key;
                    return true; // exit .some()
                }
                return false;
            });
        }
        return inputKey;
    };
    /**
     * Get the value (if any) for the directive instances @Input property (aka key)
     */
    ResponsiveActivation.prototype._lookupKeyValue = function (key) {
        return this._options.inputKeys[key];
    };
    return ResponsiveActivation;
}();
exports.ResponsiveActivation = ResponsiveActivation;
//# sourceMappingURL=responsive-activation.js.map

/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MediaQueriesModule = undefined;

var _core = __webpack_require__(3);

var _matchMedia = __webpack_require__(59);

var _mediaMonitor = __webpack_require__(18);

var _observableMediaProvider = __webpack_require__(106);

var _breakPointsProvider = __webpack_require__(104);

var _breakPointRegistry = __webpack_require__(51);

/**
 * *****************************************************************
 * Define module for the MediaQuery API
 * *****************************************************************
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var MediaQueriesModule = function () {
    function MediaQueriesModule() {}
    return MediaQueriesModule;
}();
exports.MediaQueriesModule = MediaQueriesModule;

MediaQueriesModule.decorators = [{ type: _core.NgModule, args: [{
        providers: [_breakPointsProvider.DEFAULT_BREAKPOINTS_PROVIDER, _breakPointRegistry.BreakPointRegistry, _matchMedia.MatchMedia, _mediaMonitor.MediaMonitor, _observableMediaProvider.OBSERVABLE_MEDIA_PROVIDER // easy subscription injectable `media$` matchMedia observable
        ]
    }] }];
/** @nocollapse */
MediaQueriesModule.ctorParameters = function () {
    return [];
};
//# sourceMappingURL=_module.js.map

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var RESPONSIVE_ALIASES = exports.RESPONSIVE_ALIASES = ['xs', 'gt-xs', 'sm', 'gt-sm', 'md', 'gt-md', 'lg', 'gt-lg', 'xl'];
var DEFAULT_BREAKPOINTS = exports.DEFAULT_BREAKPOINTS = [{
    alias: 'xs',
    mediaQuery: 'screen and (max-width: 599px)'
}, {
    alias: 'gt-xs',
    overlapping: true,
    mediaQuery: 'screen and (min-width: 600px)'
}, {
    alias: 'lt-sm',
    overlapping: true,
    mediaQuery: 'screen and (max-width: 599px)'
}, {
    alias: 'sm',
    mediaQuery: 'screen and (min-width: 600px) and (max-width: 959px)'
}, {
    alias: 'gt-sm',
    overlapping: true,
    mediaQuery: 'screen and (min-width: 960px)'
}, {
    alias: 'lt-md',
    overlapping: true,
    mediaQuery: 'screen and (max-width: 959px)'
}, {
    alias: 'md',
    mediaQuery: 'screen and (min-width: 960px) and (max-width: 1279px)'
}, {
    alias: 'gt-md',
    overlapping: true,
    mediaQuery: 'screen and (min-width: 1280px)'
}, {
    alias: 'lt-lg',
    overlapping: true,
    mediaQuery: 'screen and (max-width: 1279px)'
}, {
    alias: 'lg',
    mediaQuery: 'screen and (min-width: 1280px) and (max-width: 1919px)'
}, {
    alias: 'gt-lg',
    overlapping: true,
    mediaQuery: 'screen and (min-width: 1920px)'
}, {
    alias: 'lt-xl',
    overlapping: true,
    mediaQuery: 'screen and (max-width: 1920px)'
}, {
    alias: 'xl',
    mediaQuery: 'screen and (min-width: 1920px) and (max-width: 5000px)'
}];
//# sourceMappingURL=break-points.js.map

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/* tslint:disable */
var HANDSET_PORTRAIT = '(orientations: portrait) and (max-width: 599px)';
var HANDSET_LANDSCAPE = '(orientations: landscape) and (max-width: 959px)';
var TABLET_LANDSCAPE = '(orientations: landscape) and (min-width: 960px) and (max-width: 1279px)';
var TABLET_PORTRAIT = '(orientations: portrait) and (min-width: 600px) and (max-width: 839px)';
var WEB_PORTRAIT = '(orientations: portrait) and (min-width: 840px)';
var WEB_LANDSCAPE = '(orientations: landscape) and (min-width: 1280px)';
var ScreenTypes = exports.ScreenTypes = {
    'HANDSET': HANDSET_PORTRAIT + ", " + HANDSET_LANDSCAPE,
    'TABLET': TABLET_PORTRAIT + " , " + TABLET_LANDSCAPE,
    'WEB': WEB_PORTRAIT + ", " + WEB_LANDSCAPE + " ",
    'HANDSET_PORTRAIT': "" + HANDSET_PORTRAIT,
    'TABLET_PORTRAIT': TABLET_PORTRAIT + " ",
    'WEB_PORTRAIT': "" + WEB_PORTRAIT,
    'HANDSET_LANDSCAPE': HANDSET_LANDSCAPE + "]",
    'TABLET_LANDSCAPE': "" + TABLET_LANDSCAPE,
    'WEB_LANDSCAPE': "" + WEB_LANDSCAPE
};
/**
 * Extended Breakpoints for handset/tablets with landscape or portrait orientations
 */
var ORIENTATION_BREAKPOINTS = exports.ORIENTATION_BREAKPOINTS = [{ 'alias': 'handset', 'mediaQuery': ScreenTypes.HANDSET }, { 'alias': 'handset.landscape', 'mediaQuery': ScreenTypes.HANDSET_LANDSCAPE }, { 'alias': 'handset.portrait', 'mediaQuery': ScreenTypes.HANDSET_PORTRAIT }, { 'alias': 'tablet', 'mediaQuery': ScreenTypes.TABLET }, { 'alias': 'tablet.landscape', 'mediaQuery': ScreenTypes.TABLET }, { 'alias': 'tablet.portrait', 'mediaQuery': ScreenTypes.TABLET_PORTRAIT }, { 'alias': 'web', 'mediaQuery': ScreenTypes.WEB, overlapping: true }, { 'alias': 'web.landscape', 'mediaQuery': ScreenTypes.WEB_LANDSCAPE, overlapping: true }, { 'alias': 'web.portrait', 'mediaQuery': ScreenTypes.WEB_PORTRAIT, overlapping: true }];
//# sourceMappingURL=orientation-break-points.js.map

/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Class instances emitted [to observers] for each mql notification
 */
var MediaChange = function () {
    function MediaChange(matches, // Is the mq currently activated
    mediaQuery, // e.g.   (min-width: 600px) and (max-width: 959px)
    mqAlias, // e.g.   gt-sm, md, gt-lg
    suffix // e.g.   GtSM, Md, GtLg
    ) {
        if (matches === void 0) {
            matches = false;
        }
        if (mediaQuery === void 0) {
            mediaQuery = 'all';
        }
        if (mqAlias === void 0) {
            mqAlias = '';
        }
        if (suffix === void 0) {
            suffix = '';
        } // e.g.   GtSM, Md, GtLg
        this.matches = matches;
        this.mediaQuery = mediaQuery;
        this.mqAlias = mqAlias;
        this.suffix = suffix; // e.g.   GtSM, Md, GtLg
    }
    MediaChange.prototype.clone = function () {
        return new MediaChange(this.matches, this.mediaQuery, this.mqAlias, this.suffix);
    };
    return MediaChange;
}();
exports.MediaChange = MediaChange;
//# sourceMappingURL=media-change.js.map

/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MEDIA_MONITOR_PROVIDER = undefined;
exports.MEDIA_MONITOR_PROVIDER_FACTORY = MEDIA_MONITOR_PROVIDER_FACTORY;

var _core = __webpack_require__(3);

var _mediaMonitor = __webpack_require__(18);

var _matchMedia = __webpack_require__(59);

var _breakPointRegistry = __webpack_require__(51);

/**
 * Ensure a single global service provider
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function MEDIA_MONITOR_PROVIDER_FACTORY(parentMonitor, breakpoints, matchMedia) {
  return parentMonitor || new _mediaMonitor.MediaMonitor(breakpoints, matchMedia);
}
/**
 * Export provider that uses a global service factory (above)
 */
var MEDIA_MONITOR_PROVIDER = exports.MEDIA_MONITOR_PROVIDER = {
  provide: _mediaMonitor.MediaMonitor,
  deps: [[new _core.Optional(), new _core.SkipSelf(), _mediaMonitor.MediaMonitor], _breakPointRegistry.BreakPointRegistry, _matchMedia.MatchMedia],
  useFactory: MEDIA_MONITOR_PROVIDER_FACTORY
};
//# sourceMappingURL=media-monitor-provider.js.map

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MediaService = exports.ObservableMedia = undefined;

var _core = __webpack_require__(3);

__webpack_require__(56);

__webpack_require__(67);

var _breakPointRegistry = __webpack_require__(51);

var _matchMedia = __webpack_require__(59);

var _addAlias = __webpack_require__(107);

/**
 * Base class for MediaService and pseudo-token for
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ObservableMedia = function () {
    function ObservableMedia() {}
    return ObservableMedia;
}();
exports.ObservableMedia = ObservableMedia;
/**
 * Class internalizes a MatchMedia service and exposes an Subscribable and Observable interface.

 * This an Observable with that exposes a feature to subscribe to mediaQuery
 * changes and a validator method (`isActive(<alias>)`) to test if a mediaQuery (or alias) is
 * currently active.
 *
 * !! Only mediaChange activations (not de-activations) are announced by the ObservableMedia
 *
 * This class uses the BreakPoint Registry to inject alias information into the raw MediaChange
 * notification. For custom mediaQuery notifications, alias information will not be injected and
 * those fields will be ''.
 *
 * !! This is not an actual Observable. It is a wrapper of an Observable used to publish additional
 * methods like `isActive(<alias>). To access the Observable and use RxJS operators, use
 * `.asObservable()` with syntax like media.asObservable().map(....).
 *
 *  @usage
 *
 *  // RxJS
 *  import 'rxjs/add/operator/filter';
 *  import { ObservableMedia } from '@angular/flex-layout';
 *
 *  @Component({ ... })
 *  export class AppComponent {
 *    status : string = '';
 *
 *    constructor(  media:ObservableMedia ) {
 *      let onChange = (change:MediaChange) => {
 *        this.status = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : "";
 *      };
 *
 *      // Subscribe directly or access observable to use filter/map operators
 *      // e.g.
 *      //      media.subscribe(onChange);
 *
 *      media.asObservable()
 *        .filter((change:MediaChange) => true)   // silly noop filter
 *        .subscribe(onChange);
 *    }
 *  }
 */

var MediaService = function () {
    function MediaService(mediaWatcher, breakpoints) {
        this.mediaWatcher = mediaWatcher;
        this.breakpoints = breakpoints;
        /**
         * Should we announce gt-<xxx> breakpoint activations ?
         */
        this.filterOverlaps = true;
        this.observable$ = this._buildObservable();
        this._registerBreakPoints();
    }
    /**
     * Test if specified query/alias is active.
     */
    MediaService.prototype.isActive = function (alias) {
        var query = this._toMediaQuery(alias);
        return this.mediaWatcher.isActive(query);
    };
    ;
    /**
     * Proxy to the Observable subscribe method
     */
    MediaService.prototype.subscribe = function (next, error, complete) {
        return this.observable$.subscribe(next, error, complete);
    };
    ;
    /**
     * Access to observable for use with operators like
     * .filter(), .map(), etc.
     */
    MediaService.prototype.asObservable = function () {
        return this.observable$;
    };
    // ************************************************
    // Internal Methods
    // ************************************************
    /**
     * Register all the mediaQueries registered in the BreakPointRegistry
     * This is needed so subscribers can be auto-notified of all standard, registered
     * mediaQuery activations
     */
    MediaService.prototype._registerBreakPoints = function () {
        var _this = this;
        this.breakpoints.items.forEach(function (bp) {
            _this.mediaWatcher.registerQuery(bp.mediaQuery);
            return bp;
        });
    };
    /**
     * Prepare internal observable
     * NOTE: the raw MediaChange events [from MatchMedia] do not contain important alias information
     * these must be injected into the MediaChange
     */
    MediaService.prototype._buildObservable = function () {
        var _this = this;
        var self = this;
        // Only pass/announce activations (not de-activations)
        // Inject associated (if any) alias information into the MediaChange event
        // Exclude mediaQuery activations for overlapping mQs. List bounded mQ ranges only
        var activationsOnly = function activationsOnly(change) {
            return change.matches === true;
        };
        var addAliasInformation = function addAliasInformation(change) {
            return (0, _addAlias.mergeAlias)(change, _this._findByQuery(change.mediaQuery));
        };
        var excludeOverlaps = function excludeOverlaps(change) {
            var bp = _this.breakpoints.findByQuery(change.mediaQuery);
            return !bp ? true : !(self.filterOverlaps && bp.overlapping);
        };
        return this.mediaWatcher.observe().filter(activationsOnly).map(addAliasInformation).filter(excludeOverlaps);
    };
    /**
     * Breakpoint locator by alias
     */
    MediaService.prototype._findByAlias = function (alias) {
        return this.breakpoints.findByAlias(alias);
    };
    /**
     * Breakpoint locator by mediaQuery
     */
    MediaService.prototype._findByQuery = function (query) {
        return this.breakpoints.findByQuery(query);
    };
    ;
    /**
     * Find associated breakpoint (if any)
     */
    MediaService.prototype._toMediaQuery = function (query) {
        var bp = this._findByAlias(query) || this._findByQuery(query);
        return bp ? bp.mediaQuery : query;
    };
    ;
    return MediaService;
}();
exports.MediaService = MediaService;

MediaService.decorators = [{ type: _core.Injectable }];
/** @nocollapse */
MediaService.ctorParameters = function () {
    return [{ type: _matchMedia.MatchMedia }, { type: _breakPointRegistry.BreakPointRegistry }];
};
//# sourceMappingURL=observable-media.js.map

/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.applyCssPrefixes = applyCssPrefixes;
exports.toAlignContentValue = toAlignContentValue;
exports.toBoxValue = toBoxValue;
exports.toBoxOrient = toBoxOrient;
exports.toBoxDirection = toBoxDirection;
exports.toBoxOrdinal = toBoxOrdinal;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Applies CSS prefixes to appropriate style keys.*/
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function applyCssPrefixes(target) {
    for (var key in target) {
        var value = target[key];
        switch (key) {
            case 'display':
                target['display'] = value;
                // also need 'display : -webkit-box' and 'display : -ms-flexbox;'
                break;
            case 'flex':
                target['-ms-flex'] = value;
                target['-webkit-box-flex'] = value.split(" ")[0];
                break;
            case 'flex-direction':
                value = value || "row";
                target['flex-direction'] = value;
                target['-ms-flex-direction'] = value;
                target['-webkit-box-orient'] = toBoxOrient(value);
                target['-webkit-box-direction'] = toBoxDirection(value);
                break;
            case 'flex-wrap':
                target['-ms-flex-wrap'] = value;
                break;
            case 'order':
                if (isNaN(value)) {
                    value = "0";
                }
                target['order'] = value;
                target['-ms-flex-order'] = value;
                target['-webkit-box-ordinal-group'] = toBoxOrdinal(value);
                break;
            case 'justify-content':
                target['-ms-flex-pack'] = toBoxValue(value);
                target['-webkit-box-pack'] = toBoxValue(value);
                break;
            case 'align-items':
                target['-ms-flex-align'] = toBoxValue(value);
                target['-webkit-box-align'] = toBoxValue(value);
                break;
            case 'align-self':
                target['-ms-flex-item-align'] = toBoxValue(value);
                break;
            case 'align-content':
                target['-ms-align-content'] = toAlignContentValue(value);
                target['-ms-flex-line-pack'] = toAlignContentValue(value);
                break;
        }
    }
    return target;
}
function toAlignContentValue(value) {
    switch (value) {
        case "space-between":
            return "justify";
        case "space-around":
            return "distribute";
        default:
            return toBoxValue(value);
    }
}
/** Convert flex values flex-start, flex-end to start, end. */
function toBoxValue(value) {
    if (value === void 0) {
        value = "";
    }
    return value == 'flex-start' ? 'start' : value == 'flex-end' ? 'end' : value;
}
/** Convert flex Direction to Box orientations */
function toBoxOrient(flexDirection) {
    if (flexDirection === void 0) {
        flexDirection = 'row';
    }
    return flexDirection.indexOf('column') === -1 ? 'horizontal' : 'vertical';
}
/** Convert flex Direction to Box direction type */
function toBoxDirection(flexDirection) {
    if (flexDirection === void 0) {
        flexDirection = 'row';
    }
    return flexDirection.indexOf('reverse') !== -1 ? 'reverse' : 'normal';
}
/** Convert flex order to Box ordinal group */
function toBoxOrdinal(order) {
    if (order === void 0) {
        order = '0';
    }
    var value = order ? parseInt(order) + 1 : 1;
    return isNaN(value) ? "0" : value.toString();
}
//# sourceMappingURL=auto-prefixer.js.map

/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateBasis = validateBasis;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
* The flex API permits 3 or 1 parts of the value:
*    - `flex-grow flex-shrink flex-basis`, or
*    - `flex-basis`
*/
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function validateBasis(basis, grow, shrink) {
    if (grow === void 0) {
        grow = "1";
    }
    if (shrink === void 0) {
        shrink = "1";
    }
    var parts = [grow, shrink, basis];
    var j = basis.indexOf('calc');
    if (j > 0) {
        parts[2] = _validateCalcValue(basis.substring(j).trim());
        var matches = basis.substr(0, j).trim().split(" ");
        if (matches.length == 2) {
            parts[0] = matches[0];
            parts[1] = matches[1];
        }
    } else if (j == 0) {
        parts[2] = _validateCalcValue(basis.trim());
    } else {
        var matches = basis.split(" ");
        parts = matches.length === 3 ? matches : [grow, shrink, basis];
    }
    return parts;
}
/**
 * Calc expressions require whitespace before & after any expression operators
 * This is a simple, crude whitespace padding solution.
 *   - "3 3 calc(15em + 20px)"
 *   - calc(100% / 7 * 2)
 *   - "calc(15em + 20px)"
 *   - "calc(15em+20px)"
 *   - "37px"
 *   = "43%"
 */
function _validateCalcValue(calc) {
    return calc.replace(/[\s]/g, "").replace(/[\/\*\+\-]/g, " $& ");
}
//# sourceMappingURL=basis-validator.js.map

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateSuffixes = validateSuffixes;
exports.mergeByAlias = mergeByAlias;

var _objectExtend = __webpack_require__(42);

var ALIAS_DELIMITERS = /(\.|-|_)/g; /**
                                     * @license
                                     * Copyright Google Inc. All Rights Reserved.
                                     *
                                     * Use of this source code is governed by an MIT-style license that can be
                                     * found in the LICENSE file at https://angular.io/license
                                     */

function firstUpperCase(part) {
    var first = part.length > 0 ? part.charAt(0) : "";
    var remainder = part.length > 1 ? part.slice(1) : "";
    return first.toUpperCase() + remainder;
}
/**
 * Converts snake-case to SnakeCase.
 * @param name Text to UpperCamelCase
 */
function camelCase(name) {
    return name.replace(ALIAS_DELIMITERS, "|").split("|").map(firstUpperCase).join("");
}
/**
 * For each breakpoint, ensure that a Suffix is defined;
 * fallback to UpperCamelCase the unique Alias value
 */
function validateSuffixes(list) {
    list.forEach(function (bp) {
        if (!bp.suffix || bp.suffix === "") {
            bp.suffix = camelCase(bp.alias); // create Suffix value based on alias
            bp.overlapping = bp.overlapping || false; // ensure default value
        }
    });
    return list;
}
/**
 * Merge a custom breakpoint list with the default list based on unique alias values
 *  - Items are added if the alias is not in the default list
 *  - Items are merged with the custom override if the alias exists in the default list
 */
function mergeByAlias(defaults, custom) {
    if (custom === void 0) {
        custom = [];
    }
    var merged = defaults.map(function (bp) {
        return (0, _objectExtend.extendObject)({}, bp);
    });
    var findByAlias = function findByAlias(alias) {
        return merged.reduce(function (result, bp) {
            return result || (bp.alias === alias ? bp : null);
        }, null);
    };
    // Merge custom breakpoints
    custom.forEach(function (bp) {
        var target = findByAlias(bp.alias);
        if (target) {
            (0, _objectExtend.extendObject)(target, bp);
        } else {
            merged.push(bp);
        }
    });
    return validateSuffixes(merged);
}
//# sourceMappingURL=breakpoint-tools.js.map

/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * NgStyle allowed inputs
 */
var NgStyleKeyValue = function () {
    function NgStyleKeyValue(key, value, noQuotes) {
        if (noQuotes === void 0) {
            noQuotes = true;
        }
        this.key = key;
        this.value = value;
        this.key = noQuotes ? key.replace(/['"]/g, "").trim() : key.trim();
        this.value = noQuotes ? value.replace(/['"]/g, "").trim() : value.trim();
        this.value = this.value.replace(/;/, "");
    }
    return NgStyleKeyValue;
}();
exports.NgStyleKeyValue = NgStyleKeyValue;
/**
 * Transform Operators for @angular/flex-layout NgStyle Directive
 */

var ngStyleUtils = exports.ngStyleUtils = {
    getType: getType,
    buildRawList: buildRawList,
    buildMapFromList: buildMapFromList,
    buildMapFromSet: buildMapFromSet
};
function getType(target) {
    var what = typeof target === "undefined" ? "undefined" : _typeof(target);
    if (what === 'object') {
        return target.constructor === Array ? 'array' : target.constructor === Set ? 'set' : 'object';
    }
    return what;
}
/**
 * Split string of key:value pairs into Array of k-v pairs
 * e.g.  'key:value; key:value; key:value;' -> ['key:value',...]
 */
function buildRawList(source, delimiter) {
    if (delimiter === void 0) {
        delimiter = ";";
    }
    return String(source).trim().split(delimiter).map(function (val) {
        return val.trim();
    }).filter(function (val) {
        return val !== "";
    });
}
/**
 * Convert array of key:value strings to a iterable map object
 */
function buildMapFromList(styles, sanitize) {
    var sanitizeValue = function sanitizeValue(it) {
        if (sanitize) {
            it.value = sanitize(it.value);
        }
        return it;
    };
    return styles.map(stringToKeyValue).filter(function (entry) {
        return !!entry;
    }).map(sanitizeValue).reduce(keyValuesToMap, {});
}
;
/**
 * Convert Set<string> or raw Object to an iterable NgStyleMap
 */
function buildMapFromSet(source, sanitize) {
    var list = new Array();
    if (getType(source) == 'set') {
        source.forEach(function (entry) {
            return list.push(entry);
        });
    } else {
        Object.keys(source).forEach(function (key) {
            list.push(key + ":" + source[key]);
        });
    }
    return buildMapFromList(list, sanitize);
}
/**
 * Convert "key:value" -> [key, value]
 */
function stringToKeyValue(it) {
    var _a = it.split(":"),
        key = _a[0],
        val = _a[1];
    return val ? new NgStyleKeyValue(key, val) : null;
}
;
/**
 * Convert [ [key,value] ] -> { key : value }
 */
function keyValuesToMap(map, entry) {
    if (!!entry.key) {
        map[entry.key] = entry.value;
    }
    return map;
}
//# sourceMappingURL=style-transforms.js.map

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @template A
 */
var MDCFoundation = function () {
  _createClass(MDCFoundation, null, [{
    key: "cssClasses",


    /** @return enum{cssClasses} */
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    }

    /** @return enum{strings} */

  }, {
    key: "strings",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    }

    /** @return enum{numbers} */

  }, {
    key: "numbers",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    }

    /** @return {!Object} */

  }, {
    key: "defaultAdapter",
    get: function get() {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    }

    /**
     * @param {!A} adapter
     */

  }]);

  function MDCFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MDCFoundation);

    /** @private {!A} */
    this.adapter_ = adapter;
  }

  _createClass(MDCFoundation, [{
    key: "init",
    value: function init() {
      // Subclasses should override this method to perform initialization routines (registering events, etc.)
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
    }
  }]);

  return MDCFoundation;
}();

exports.default = MDCFoundation;

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _foundation = __webpack_require__(151);

Object.defineProperty(exports, 'MDCFoundation', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_foundation).default;
  }
});

var _component = __webpack_require__(256);

Object.defineProperty(exports, 'MDCComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_component).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MediaMonitor = undefined;

var _core = __webpack_require__(3);

var _breakPointRegistry = __webpack_require__(51);

var _matchMedia2 = __webpack_require__(59);

var _addAlias = __webpack_require__(107);

__webpack_require__(56);

/**
 * MediaMonitor uses the MatchMedia service to observe mediaQuery changes (both activations and
 * deactivations). These changes are are published as MediaChange notifications.
 *
 * Note: all notifications will be performed within the
 * ng Zone to trigger change detections and component updates.
 *
 * It is the MediaMonitor that:
 *  - auto registers all known breakpoints
 *  - injects alias information into each raw MediaChange event
 *  - provides accessor to the currently active BreakPoint
 *  - publish list of overlapping BreakPoint(s); used by ResponsiveActivation
 */
var MediaMonitor = function () {
    function MediaMonitor(_breakpoints, _matchMedia) {
        this._breakpoints = _breakpoints;
        this._matchMedia = _matchMedia;
        this._registerBreakpoints();
    }
    Object.defineProperty(MediaMonitor.prototype, "breakpoints", {
        /**
         * Read-only accessor to the list of breakpoints configured in the BreakPointRegistry provider
         */
        get: function get() {
            return this._breakpoints.items.slice();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaMonitor.prototype, "activeOverlaps", {
        get: function get() {
            var _this = this;
            var items = this._breakpoints.overlappings.reverse();
            return items.filter(function (bp) {
                return _this._matchMedia.isActive(bp.mediaQuery);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaMonitor.prototype, "active", {
        get: function get() {
            var _this = this;
            var found = null,
                items = this.breakpoints.reverse();
            items.forEach(function (bp) {
                if (bp.alias !== '') {
                    if (!found && _this._matchMedia.isActive(bp.mediaQuery)) {
                        found = bp;
                    }
                }
            });
            var first = this.breakpoints[0];
            return found || (this._matchMedia.isActive(first.mediaQuery) ? first : null);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * For the specified mediaQuery alias, is the mediaQuery range active?
     */
    MediaMonitor.prototype.isActive = function (alias) {
        var bp = this._breakpoints.findByAlias(alias) || this._breakpoints.findByQuery(alias);
        return this._matchMedia.isActive(bp ? bp.mediaQuery : alias);
    };
    /**
     * External observers can watch for all (or a specific) mql changes.
     * If specific breakpoint is observed, only return *activated* events
     * otherwise return all events for BOTH activated + deactivated changes.
     */
    MediaMonitor.prototype.observe = function (alias) {
        var bp = this._breakpoints.findByAlias(alias) || this._breakpoints.findByQuery(alias);
        var hasAlias = function hasAlias(change) {
            return bp ? change.mqAlias !== "" : true;
        };
        // Note: the raw MediaChange events [from MatchMedia] do not contain important alias information
        return this._matchMedia.observe(bp ? bp.mediaQuery : alias).map(function (change) {
            return (0, _addAlias.mergeAlias)(change, bp);
        }).filter(hasAlias);
    };
    /**
     * Immediate calls to matchMedia() to establish listeners
     * and prepare for immediate subscription notifications
     */
    MediaMonitor.prototype._registerBreakpoints = function () {
        var _this = this;
        this._breakpoints.items.forEach(function (bp) {
            _this._matchMedia.registerQuery(bp.mediaQuery);
        });
    };
    return MediaMonitor;
}(); /**
      * @license
      * Copyright Google Inc. All Rights Reserved.
      *
      * Use of this source code is governed by an MIT-style license that can be
      * found in the LICENSE file at https://angular.io/license
      */
exports.MediaMonitor = MediaMonitor;

MediaMonitor.decorators = [{ type: _core.Injectable }];
/** @nocollapse */
MediaMonitor.ctorParameters = function () {
    return [{ type: _breakPointRegistry.BreakPointRegistry }, { type: _matchMedia2.MatchMedia }];
};
//# sourceMappingURL=media-monitor.js.map

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var ButtonDemoComponent = function () {
    function ButtonDemoComponent() {
        _classCallCheck(this, ButtonDemoComponent);
    }

    _createClass(ButtonDemoComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            var doc = document.body;
            var script = document.createElement('script');
            script.innerHTML = '';
            script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
            script.async = true;
            script.defer = true;
            doc.appendChild(script);
        }
    }]);

    return ButtonDemoComponent;
}();
ButtonDemoComponent = __decorate([core_1.Component({
    selector: 'button-demo',
    template: __webpack_require__(688)
})], ButtonDemoComponent);
exports.ButtonDemoComponent = ButtonDemoComponent;

/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var CheckboxDemoComponent = function () {
    function CheckboxDemoComponent() {
        _classCallCheck(this, CheckboxDemoComponent);

        this.isChecked = false;
    }

    _createClass(CheckboxDemoComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            var doc = document.body;
            var script = document.createElement('script');
            script.innerHTML = '';
            script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
            script.async = true;
            script.defer = true;
            doc.appendChild(script);
        }
    }]);

    return CheckboxDemoComponent;
}();
CheckboxDemoComponent = __decorate([core_1.Component({
    selector: 'checkbox-demo',
    template: __webpack_require__(689)
})], CheckboxDemoComponent);
exports.CheckboxDemoComponent = CheckboxDemoComponent;

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var FabDemoComponent = function () {
    function FabDemoComponent() {
        _classCallCheck(this, FabDemoComponent);
    }

    _createClass(FabDemoComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            var doc = document.body;
            var script = document.createElement('script');
            script.innerHTML = '';
            script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
            script.async = true;
            script.defer = true;
            doc.appendChild(script);
        }
    }]);

    return FabDemoComponent;
}();
FabDemoComponent = __decorate([core_1.Component({
    selector: 'fab-demo',
    template: __webpack_require__(690)
})], FabDemoComponent);
exports.FabDemoComponent = FabDemoComponent;

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var router_1 = __webpack_require__(82);
var HomeComponent = function () {
    function HomeComponent(route, router) {
        _classCallCheck(this, HomeComponent);

        this.route = route;
        this.router = router;
    }

    _createClass(HomeComponent, [{
        key: "viewComponent",
        value: function viewComponent(value) {
            this.router.navigate([value]);
        }
    }]);

    return HomeComponent;
}();
HomeComponent = __decorate([core_1.Component({
    selector: 'home',
    template: __webpack_require__(691)
}), __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router])], HomeComponent);
exports.HomeComponent = HomeComponent;

/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var linear_progress_1 = __webpack_require__(685);
var LinearProgressDemoComponent = function () {
    function LinearProgressDemoComponent() {
        _classCallCheck(this, LinearProgressDemoComponent);
    }

    _createClass(LinearProgressDemoComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            var doc = document.body;
            var script = document.createElement('script');
            script.innerHTML = '';
            script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
            script.async = true;
            script.defer = true;
            doc.appendChild(script);
        }
    }, {
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
            this.demobar1.progress = 0.5;
            this.demobar1.buffer = 0.65;
        }
    }]);

    return LinearProgressDemoComponent;
}();
__decorate([core_1.ViewChild('demobar1'), __metadata("design:type", linear_progress_1.LinearProgressComponent)], LinearProgressDemoComponent.prototype, "demobar1", void 0);
LinearProgressDemoComponent = __decorate([core_1.Component({
    selector: 'linear-progress-demo',
    template: __webpack_require__(692)
})], LinearProgressDemoComponent);
exports.LinearProgressDemoComponent = LinearProgressDemoComponent;

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var MenuDemoComponent = function () {
    function MenuDemoComponent() {
        _classCallCheck(this, MenuDemoComponent);

        this.selectedIndex = -1;
        this.focusedItemIndex = null;
        this.menuItems = [{
            id: 1,
            label: 'Security settings'
        }, {
            id: 2,
            label: 'Review account activity'
        }, {
            id: 3,
            label: 'Logoff'
        }];
    }

    _createClass(MenuDemoComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            var doc = document.body;
            var script = document.createElement('script');
            script.innerHTML = '';
            script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
            script.async = true;
            script.defer = true;
            doc.appendChild(script);
        }
    }, {
        key: "showMenu",
        value: function showMenu() {
            this.menu.open(this.focusedItemIndex);
        }
    }, {
        key: "handleMenuCancel",
        value: function handleMenuCancel() {
            console.log('Menu cancel event');
        }
    }, {
        key: "handleMenuSelect",
        value: function handleMenuSelect(event) {
            this.selectedIndex = event;
            console.log('Menu event: Selected item: ' + event);
        }
    }]);

    return MenuDemoComponent;
}();
__decorate([core_1.ViewChild('menu'), __metadata("design:type", Object)], MenuDemoComponent.prototype, "menu", void 0);
MenuDemoComponent = __decorate([core_1.Component({
    selector: 'menu-demo',
    template: __webpack_require__(693)
})], MenuDemoComponent);
exports.MenuDemoComponent = MenuDemoComponent;

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var SnackbarDemoComponent = function () {
    function SnackbarDemoComponent() {
        _classCallCheck(this, SnackbarDemoComponent);
    }

    _createClass(SnackbarDemoComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            var doc = document.body;
            var script = document.createElement('script');
            script.innerHTML = '';
            script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
            script.async = true;
            script.defer = true;
            doc.appendChild(script);
        }
    }, {
        key: "showSimple",
        value: function showSimple() {
            var data = {
                message: 'Notification received'
            };
            this.snack.show(data);
        }
    }, {
        key: "showActionButton",
        value: function showActionButton() {
            var data = {
                message: 'Notification received',
                actionText: 'Ok',
                actionHandler: function actionHandler() {
                    console.log('Action button pressed!');
                }
            };
            this.snack.show(data);
        }
    }, {
        key: "showMultiline",
        value: function showMultiline() {
            var data = {
                message: 'Notification received',
                actionText: 'Ok',
                multiline: true,
                actionHandler: function actionHandler() {
                    console.log('Action button pressed!');
                }
            };
            this.snack.show(data);
        }
    }, {
        key: "showMultilineBottom",
        value: function showMultilineBottom() {
            var data = {
                message: 'Notification received',
                actionText: 'Ok',
                multiline: true,
                actionOnBottom: true,
                actionHandler: function actionHandler() {
                    console.log('Action button pressed!');
                }
            };
            this.snack.show(data);
        }
    }]);

    return SnackbarDemoComponent;
}();
__decorate([core_1.ViewChild('snack'), __metadata("design:type", Object)], SnackbarDemoComponent.prototype, "snack", void 0);
SnackbarDemoComponent = __decorate([core_1.Component({
    selector: 'snackbar-demo',
    template: __webpack_require__(695)
})], SnackbarDemoComponent);
exports.SnackbarDemoComponent = SnackbarDemoComponent;

/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var SwitchDemoComponent = function () {
    function SwitchDemoComponent() {
        _classCallCheck(this, SwitchDemoComponent);
    }

    _createClass(SwitchDemoComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            var doc = document.body;
            var script = document.createElement('script');
            script.innerHTML = '';
            script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
            script.async = true;
            script.defer = true;
            doc.appendChild(script);
        }
    }]);

    return SwitchDemoComponent;
}();
SwitchDemoComponent = __decorate([core_1.Component({
    selector: 'switch-demo',
    template: __webpack_require__(696)
})], SwitchDemoComponent);
exports.SwitchDemoComponent = SwitchDemoComponent;

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseFxDirective = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _autoPrefixer = __webpack_require__(147);

var _layoutValidator = __webpack_require__(60);

var _responsiveActivation = __webpack_require__(140);

/** Abstract base class for the Layout API styling directives. */
var BaseFxDirective = function () {
    /**
     *
     */
    function BaseFxDirective(_mediaMonitor, _elementRef, _renderer) {
        this._mediaMonitor = _mediaMonitor;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /**
         *  Dictionary of input keys with associated values
         */
        this._inputMap = {};
        this._display = this._getDisplayStyle();
    }
    Object.defineProperty(BaseFxDirective.prototype, "hasMediaQueryListener", {
        get: function get() {
            return !!this._mqActivation;
        },
        enumerable: true,
        configurable: true
    });
    // *********************************************
    // Accessor Methods
    // *********************************************
    /**
     * Access the current value (if any) of the @Input property.
     */
    BaseFxDirective.prototype._queryInput = function (key) {
        return this._inputMap[key];
    };
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    BaseFxDirective.prototype.ngOnDestroy = function () {
        if (this._mqActivation) {
            this._mqActivation.destroy();
        }
        this._mediaMonitor = null;
    };
    // *********************************************
    // Protected Methods
    // *********************************************
    /**
     * Was the directive's default selector used ?
     * If not, use the fallback value!
     */
    BaseFxDirective.prototype._getDefaultVal = function (key, fallbackVal) {
        var val = this._queryInput(key);
        var hasDefaultVal = val !== undefined && val !== null;
        return hasDefaultVal && val !== '' ? val : fallbackVal;
    };
    /**
     * Quick accessor to the current HTMLElement's `display` style
     * Note: this allows use to preserve the original style
     * and optional restore it when the mediaQueries deactivate
     */
    BaseFxDirective.prototype._getDisplayStyle = function (source) {
        var element = source || this._elementRef.nativeElement;
        var value = element.style['display'] || getComputedStyle(element)['display'];
        return value.trim();
    };
    BaseFxDirective.prototype._getFlowDirection = function (target, addIfMissing) {
        if (addIfMissing === void 0) {
            addIfMissing = false;
        }
        var value = "";
        if (target) {
            var directionKeys_1 = Object.keys((0, _autoPrefixer.applyCssPrefixes)({ 'flex-direction': '' }));
            var findDirection = function findDirection(styles) {
                return directionKeys_1.reduce(function (direction, key) {
                    return direction || styles[key];
                }, null);
            };
            var immediateValue = findDirection(target['style']);
            value = immediateValue || findDirection(getComputedStyle(target));
            if (!immediateValue && addIfMissing) {
                value = value || 'row';
                this._applyStyleToElements((0, _layoutValidator.buildLayoutCSS)(value), [target]);
            }
        }
        return value ? value.trim() : "row";
    };
    /**
     * Applies styles given via string pair or object map to the directive element.
     */
    BaseFxDirective.prototype._applyStyleToElement = function (style, value, nativeElement) {
        var _this = this;
        var styles = {};
        var element = nativeElement || this._elementRef.nativeElement;
        if (typeof style === 'string') {
            styles[style] = value;
            style = styles;
        }
        styles = (0, _autoPrefixer.applyCssPrefixes)(style);
        // Iterate all properties in hashMap and set styles
        Object.keys(styles).forEach(function (key) {
            _this._renderer.setStyle(element, key, styles[key]);
        });
    };
    /**
     * Applies styles given via string pair or object map to the directive element.
     */
    BaseFxDirective.prototype._applyStyleToElements = function (style, elements) {
        var _this = this;
        var styles = (0, _autoPrefixer.applyCssPrefixes)(style);
        Object.keys(styles).forEach(function (key) {
            elements.forEach(function (el) {
                return _this._renderer.setStyle(el, key, styles[key]);
            });
        });
    };
    /**
     *  Save the property value; which may be a complex object.
     *  Complex objects support property chains
     */
    BaseFxDirective.prototype._cacheInput = function (key, source) {
        if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) === 'object') {
            for (var prop in source) {
                this._inputMap[prop] = source[prop];
            }
        } else {
            this._inputMap[key] = source;
        }
    };
    /**
     *  Build a ResponsiveActivation object used to manage subscriptions to mediaChange notifications
     *  and intelligent lookup of the directive's property value that corresponds to that mediaQuery
     *  (or closest match).
     */
    BaseFxDirective.prototype._listenForMediaQueryChanges = function (key, defaultValue, onMediaQueryChange) {
        if (!this._mqActivation) {
            var keyOptions = new _responsiveActivation.KeyOptions(key, defaultValue, this._inputMap);
            this._mqActivation = new _responsiveActivation.ResponsiveActivation(keyOptions, this._mediaMonitor, function (change) {
                return onMediaQueryChange(change);
            });
        }
        return this._mqActivation;
    };
    Object.defineProperty(BaseFxDirective.prototype, "childrenNodes", {
        /**
         * Special accessor to query for all child 'element' nodes regardless of type, class, etc.
         */
        get: function get() {
            var obj = this._elementRef.nativeElement.childNodes;
            var buffer = [];
            // iterate backwards ensuring that length is an UInt32
            for (var i = obj.length; i--;) {
                buffer[i] = obj[i];
            }
            return buffer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Fast validator for presence of attribute on the host element
     */
    BaseFxDirective.prototype.hasKeyValue = function (key) {
        return this._mqActivation.hasKeyValue(key);
    };
    return BaseFxDirective;
}();
exports.BaseFxDirective = BaseFxDirective;
//# sourceMappingURL=base.js.map

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var TextfieldDemoComponent = function () {
    function TextfieldDemoComponent() {
        _classCallCheck(this, TextfieldDemoComponent);

        this.username = null;
        this.password = null;
        this.comments = null;
        this.subject = null;
        this.message = null;
        this.submitEventText = null;
        this.inputHasFocus = false;
        this.inputKeysPressed = 0;
        this.inputCount = 0;
    }

    _createClass(TextfieldDemoComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            var doc = document.body;
            var script = document.createElement('script');
            script.innerHTML = '';
            script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
            script.async = true;
            script.defer = true;
            doc.appendChild(script);
        }
    }, {
        key: "handleFocus",
        value: function handleFocus($event) {
            this.inputHasFocus = true;
        }
    }, {
        key: "handleBlur",
        value: function handleBlur($event) {
            this.inputHasFocus = false;
        }
    }, {
        key: "handleInput",
        value: function handleInput($event) {
            this.inputCount++;
        }
    }, {
        key: "handleKeyDown",
        value: function handleKeyDown($event) {
            this.inputKeysPressed++;
        }
    }, {
        key: "submit",
        value: function submit(message) {
            // this.submitEventText = message;
        }
    }]);

    return TextfieldDemoComponent;
}();
TextfieldDemoComponent = __decorate([core_1.Component({
    selector: 'textfield-demo',
    template: __webpack_require__(697)
})], TextfieldDemoComponent);
exports.TextfieldDemoComponent = TextfieldDemoComponent;

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var ToolbarDemoComponent = function () {
    function ToolbarDemoComponent() {
        _classCallCheck(this, ToolbarDemoComponent);
    }

    _createClass(ToolbarDemoComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            var doc = document.body;
            var script = document.createElement('script');
            script.innerHTML = '';
            script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
            script.async = true;
            script.defer = true;
            doc.appendChild(script);
        }
    }]);

    return ToolbarDemoComponent;
}();
ToolbarDemoComponent = __decorate([core_1.Component({
    selector: 'toolbar-demo',
    template: __webpack_require__(698)
})], ToolbarDemoComponent);
exports.ToolbarDemoComponent = ToolbarDemoComponent;

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var TypographyDemoComponent = function () {
    function TypographyDemoComponent() {
        _classCallCheck(this, TypographyDemoComponent);
    }

    _createClass(TypographyDemoComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            var doc = document.body;
            var script = document.createElement('script');
            script.innerHTML = '';
            script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
            script.async = true;
            script.defer = true;
            doc.appendChild(script);
        }
    }]);

    return TypographyDemoComponent;
}();
TypographyDemoComponent = __decorate([core_1.Component({
    selector: 'typography-progress-demo',
    template: __webpack_require__(699)
})], TypographyDemoComponent);
exports.TypographyDemoComponent = TypographyDemoComponent;

/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var forms_1 = __webpack_require__(81);
var platform_browser_1 = __webpack_require__(49);
var http_1 = __webpack_require__(254);
var app_component_1 = __webpack_require__(680);
var button_demo_component_1 = __webpack_require__(222);
var checkbox_demo_component_1 = __webpack_require__(223);
var fab_demo_component_1 = __webpack_require__(224);
var linear_progress_demo_component_1 = __webpack_require__(226);
var menu_demo_component_1 = __webpack_require__(227);
var navbar_component_1 = __webpack_require__(681);
var snackbar_demo_component_1 = __webpack_require__(228);
var switch_demo_component_1 = __webpack_require__(229);
var textfield_demo_component_1 = __webpack_require__(230);
var toolbar_demo_component_1 = __webpack_require__(231);
var typography_demo_component_1 = __webpack_require__(232);
var dist_1 = __webpack_require__(137);
var home_component_1 = __webpack_require__(225);
var flex_layout_1 = __webpack_require__(251);
var app_routing_module_1 = __webpack_require__(679);
var AppModule = function AppModule() {
    _classCallCheck(this, AppModule);
};
AppModule = __decorate([core_1.NgModule({
    imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, flex_layout_1.FlexLayoutModule, dist_1.MaterialModule, app_routing_module_1.AppRoutingModule],
    declarations: [app_component_1.AppComponent, button_demo_component_1.ButtonDemoComponent, checkbox_demo_component_1.CheckboxDemoComponent, fab_demo_component_1.FabDemoComponent, home_component_1.HomeComponent, linear_progress_demo_component_1.LinearProgressDemoComponent, menu_demo_component_1.MenuDemoComponent, navbar_component_1.NavbarComponent, snackbar_demo_component_1.SnackbarDemoComponent, switch_demo_component_1.SwitchDemoComponent, textfield_demo_component_1.TextfieldDemoComponent, toolbar_demo_component_1.ToolbarDemoComponent, typography_demo_component_1.TypographyDemoComponent],
    bootstrap: [app_component_1.AppComponent]
})], AppModule);
exports.AppModule = AppModule;

/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FlexLayoutModule = undefined;

__webpack_require__(67);

__webpack_require__(56);

var _core = __webpack_require__(3);

var _module = __webpack_require__(141);

var _breakPointsProvider = __webpack_require__(104);

var _mediaMonitorProvider = __webpack_require__(145);

var _observableMediaProvider = __webpack_require__(106);

var _flex = __webpack_require__(245);

var _layout = __webpack_require__(58);

var _showHide = __webpack_require__(248);

var _flexAlign = __webpack_require__(241);

var _flexFill = __webpack_require__(242);

var _flexOffset = __webpack_require__(243);

var _flexOrder = __webpack_require__(244);

var _layoutAlign = __webpack_require__(246);

var _layoutWrap = __webpack_require__(139);

var _layoutGap = __webpack_require__(247);

var _class = __webpack_require__(240);

var _style = __webpack_require__(249);

/**
 * Since the equivalent results are easily achieved with a css class attached to each
 * layout child, these have been deprecated and removed from the API.
 *
 *  import {LayoutPaddingDirective} from './api/layout-padding';
 *  import {LayoutMarginDirective} from './api/layout-margin';
 */
var ALL_DIRECTIVES = [_layout.LayoutDirective, _layoutWrap.LayoutWrapDirective, _layoutGap.LayoutGapDirective, _layoutAlign.LayoutAlignDirective, _flex.FlexDirective, _flexOrder.FlexOrderDirective, _flexOffset.FlexOffsetDirective, _flexFill.FlexFillDirective, _flexAlign.FlexAlignDirective, _showHide.ShowHideDirective, _class.ClassDirective, _style.StyleDirective];
/**
 *
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var FlexLayoutModule = function () {
    function FlexLayoutModule() {}
    /**
     * External uses can easily add custom breakpoints AND include internal orientations
     * breakpoints; which are not available by default.
     *
     * !! Selector aliases are not auto-configured. Developers must subclass
     * the API directives to support extra selectors for the orientations breakpoints !!
     */
    FlexLayoutModule.provideBreakPoints = function (breakpoints, options) {
        return {
            ngModule: FlexLayoutModule,
            providers: [(0, _breakPointsProvider.CUSTOM_BREAKPOINTS_PROVIDER_FACTORY)(breakpoints, options || { orientations: false })]
        };
    };
    return FlexLayoutModule;
}();
exports.FlexLayoutModule = FlexLayoutModule;

FlexLayoutModule.decorators = [{ type: _core.NgModule, args: [{
        declarations: ALL_DIRECTIVES,
        imports: [_module.MediaQueriesModule],
        exports: [_module.MediaQueriesModule].concat(ALL_DIRECTIVES),
        providers: [_mediaMonitorProvider.MEDIA_MONITOR_PROVIDER, _breakPointsProvider.DEFAULT_BREAKPOINTS_PROVIDER, _observableMediaProvider.OBSERVABLE_MEDIA_PROVIDER]
    }] }];
/** @nocollapse */
FlexLayoutModule.ctorParameters = function () {
    return [];
};
//# sourceMappingURL=_module.js.map

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClassDirective = undefined;

var _core = __webpack_require__(3);

var _common = __webpack_require__(50);

var _baseAdapter = __webpack_require__(103);

var _mediaMonitor = __webpack_require__(18);

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Directive to add responsive support for ngClass.
 */
var ClassDirective = function (_super) {
    __extends(ClassDirective, _super);
    /* tslint:enable */
    function ClassDirective(monitor, _iterableDiffers, _keyValueDiffers, _ngEl, _oldRenderer, _renderer) {
        var _this =
        // TODO: this should use Renderer2 as well, but NgClass hasn't switched over yet.
        _super.call(this, _iterableDiffers, _keyValueDiffers, _ngEl, _oldRenderer) || this;
        _this.monitor = monitor;
        _this._classAdapter = new _baseAdapter.BaseFxDirectiveAdapter('class', monitor, _ngEl, _renderer);
        _this._ngClassAdapter = new _baseAdapter.BaseFxDirectiveAdapter('ngClass', monitor, _ngEl, _renderer);
        return _this;
    }
    Object.defineProperty(ClassDirective.prototype, "ngClassBase", {
        /**
         * Intercept ngClass assignments so we cache the default classes
         * which are merged with activated styles or used as fallbacks.
         * Note: Base ngClass values are applied during ngDoCheck()
         */
        set: function set(val) {
            this._ngClassAdapter.cacheInput('ngClass', val, true);
            this.ngClass = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassXs", {
        /* tslint:disable */
        set: function set(val) {
            this._ngClassAdapter.cacheInput('ngClassXs', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassSm", {
        set: function set(val) {
            this._ngClassAdapter.cacheInput('ngClassSm', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassMd", {
        set: function set(val) {
            this._ngClassAdapter.cacheInput('ngClassMd', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassLg", {
        set: function set(val) {
            this._ngClassAdapter.cacheInput('ngClassLg', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassXl", {
        set: function set(val) {
            this._ngClassAdapter.cacheInput('ngClassXl', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassLtSm", {
        set: function set(val) {
            this._ngClassAdapter.cacheInput('ngClassLtSm', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassLtMd", {
        set: function set(val) {
            this._ngClassAdapter.cacheInput('ngClassLtMd', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassLtLg", {
        set: function set(val) {
            this._ngClassAdapter.cacheInput('ngClassLtLg', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassLtXl", {
        set: function set(val) {
            this._ngClassAdapter.cacheInput('ngClassLtXl', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassGtXs", {
        set: function set(val) {
            this._ngClassAdapter.cacheInput('ngClassGtXs', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassGtSm", {
        set: function set(val) {
            this._ngClassAdapter.cacheInput('ngClassGtSm', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassGtMd", {
        set: function set(val) {
            this._ngClassAdapter.cacheInput('ngClassGtMd', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassGtLg", {
        set: function set(val) {
            this._ngClassAdapter.cacheInput('ngClassGtLg', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classBase", {
        /** Deprecated selectors */
        /**
         * Base class selector values get applied immediately and are considered destructive overwrites to
         * all previous class assignments
         *
         * Delegate to NgClass:klass setter and cache value for base fallback from responsive APIs.
         */
        set: function set(val) {
            this._classAdapter.cacheInput('_rawClass', val, true);
            this.klass = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classXs", {
        set: function set(val) {
            this._classAdapter.cacheInput('classXs', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classSm", {
        set: function set(val) {
            this._classAdapter.cacheInput('classSm', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classMd", {
        set: function set(val) {
            this._classAdapter.cacheInput('classMd', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classLg", {
        set: function set(val) {
            this._classAdapter.cacheInput('classLg', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classXl", {
        set: function set(val) {
            this._classAdapter.cacheInput('classXl', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classLtSm", {
        set: function set(val) {
            this._classAdapter.cacheInput('classLtSm', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classLtMd", {
        set: function set(val) {
            this._classAdapter.cacheInput('classLtMd', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classLtLg", {
        set: function set(val) {
            this._classAdapter.cacheInput('classLtLg', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classLtXl", {
        set: function set(val) {
            this._classAdapter.cacheInput('classLtXl', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classGtXs", {
        set: function set(val) {
            this._classAdapter.cacheInput('classGtXs', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classGtSm", {
        set: function set(val) {
            this._classAdapter.cacheInput('classGtSm', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classGtMd", {
        set: function set(val) {
            this._classAdapter.cacheInput('classGtMd', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classGtLg", {
        set: function set(val) {
            this._classAdapter.cacheInput('classGtLg', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "initialClasses", {
        /**
         * Initial value of the `class` attribute; used as
         * fallback and will be merged with nay `ngClass` values
         */
        get: function get() {
            return this._classAdapter.queryInput('_rawClass') || "";
        },
        enumerable: true,
        configurable: true
    });
    // ******************************************************************
    // Lifecycle Hooks
    // ******************************************************************
    /**
     * For @Input changes on the current mq activation property
     */
    ClassDirective.prototype.ngOnChanges = function (changes) {
        if (this._classAdapter.activeKey in changes) {
            this._updateKlass();
        }
        if (this._ngClassAdapter.activeKey in changes) {
            this._updateNgClass();
        }
    };
    /**
     * For ChangeDetectionStrategy.onPush and ngOnChanges() updates
     */
    ClassDirective.prototype.ngDoCheck = function () {
        if (!this._classAdapter.hasMediaQueryListener) {
            this._configureMQListener();
        }
        _super.prototype.ngDoCheck.call(this);
    };
    ClassDirective.prototype.ngOnDestroy = function () {
        this._classAdapter.ngOnDestroy();
        this._ngClassAdapter.ngOnDestroy();
    };
    // ******************************************************************
    // Internal Methods
    // ******************************************************************
    /**
     * Build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    ClassDirective.prototype._configureMQListener = function () {
        var _this = this;
        this._classAdapter.listenForMediaQueryChanges('class', '', function (changes) {
            _this._updateKlass(changes.value);
        });
        this._ngClassAdapter.listenForMediaQueryChanges('ngClass', '', function (changes) {
            _this._updateNgClass(changes.value);
            _super.prototype.ngDoCheck.call(_this); // trigger NgClass::_applyIterableChanges()
        });
    };
    /**
     *  Apply updates directly to the NgClass:klass property
     *  ::ngDoCheck() is not needed
     */
    ClassDirective.prototype._updateKlass = function (value) {
        var klass = value || this._classAdapter.queryInput('class') || '';
        if (this._classAdapter.mqActivation) {
            klass = this._classAdapter.mqActivation.activatedInput;
        }
        this.klass = klass || this.initialClasses;
    };
    /**
     *  Identify the activated input value and update the ngClass iterables...
     *  needs ngDoCheck() to actually apply the values to the element
     */
    ClassDirective.prototype._updateNgClass = function (value) {
        if (this._ngClassAdapter.mqActivation) {
            value = this._ngClassAdapter.mqActivation.activatedInput;
        }
        this.ngClass = value || ''; // Delegate subsequent activity to the NgClass logic
    };
    return ClassDirective;
}(_common.NgClass);
exports.ClassDirective = ClassDirective;

ClassDirective.decorators = [{ type: _core.Directive, args: [{
        selector: "\n    [class], [class.xs], [class.sm], [class.md], [class.lg], [class.xl],\n    [class.lt-sm], [class.lt-md], [class.lt-lg], [class.lt-xl],\n    [class.gt-xs], [class.gt-sm], [class.gt-md], [class.gt-lg],\n\n    [ngClass], [ngClass.xs], [ngClass.sm], [ngClass.md], [ngClass.lg], [ngClass.xl],\n    [ngClass.lt-sm], [ngClass.lt-md], [ngClass.lt-lg], [ngClass.lt-xl],\n    [ngClass.gt-xs], [ngClass.gt-sm], [ngClass.gt-md], [ngClass.gt-lg]\n  "
    }] }];
/** @nocollapse */
ClassDirective.ctorParameters = function () {
    return [{ type: _mediaMonitor.MediaMonitor }, { type: _core.IterableDiffers }, { type: _core.KeyValueDiffers }, { type: _core.ElementRef }, { type: _core.Renderer }, { type: _core.Renderer2 }];
};
ClassDirective.propDecorators = {
    'ngClassBase': [{ type: _core.Input, args: ['ngClass'] }],
    'ngClassXs': [{ type: _core.Input, args: ['ngClass.xs'] }],
    'ngClassSm': [{ type: _core.Input, args: ['ngClass.sm'] }],
    'ngClassMd': [{ type: _core.Input, args: ['ngClass.md'] }],
    'ngClassLg': [{ type: _core.Input, args: ['ngClass.lg'] }],
    'ngClassXl': [{ type: _core.Input, args: ['ngClass.xl'] }],
    'ngClassLtSm': [{ type: _core.Input, args: ['ngClass.lt-sm'] }],
    'ngClassLtMd': [{ type: _core.Input, args: ['ngClass.lt-md'] }],
    'ngClassLtLg': [{ type: _core.Input, args: ['ngClass.lt-lg'] }],
    'ngClassLtXl': [{ type: _core.Input, args: ['ngClass.lt-xl'] }],
    'ngClassGtXs': [{ type: _core.Input, args: ['ngClass.gt-xs'] }],
    'ngClassGtSm': [{ type: _core.Input, args: ['ngClass.gt-sm'] }],
    'ngClassGtMd': [{ type: _core.Input, args: ['ngClass.gt-md'] }],
    'ngClassGtLg': [{ type: _core.Input, args: ['ngClass.gt-lg'] }],
    'classBase': [{ type: _core.Input, args: ['class'] }],
    'classXs': [{ type: _core.Input, args: ['class.xs'] }],
    'classSm': [{ type: _core.Input, args: ['class.sm'] }],
    'classMd': [{ type: _core.Input, args: ['class.md'] }],
    'classLg': [{ type: _core.Input, args: ['class.lg'] }],
    'classXl': [{ type: _core.Input, args: ['class.xl'] }],
    'classLtSm': [{ type: _core.Input, args: ['class.lt-sm'] }],
    'classLtMd': [{ type: _core.Input, args: ['class.lt-md'] }],
    'classLtLg': [{ type: _core.Input, args: ['class.lt-lg'] }],
    'classLtXl': [{ type: _core.Input, args: ['class.lt-xl'] }],
    'classGtXs': [{ type: _core.Input, args: ['class.gt-xs'] }],
    'classGtSm': [{ type: _core.Input, args: ['class.gt-sm'] }],
    'classGtMd': [{ type: _core.Input, args: ['class.gt-md'] }],
    'classGtLg': [{ type: _core.Input, args: ['class.gt-lg'] }]
};
//# sourceMappingURL=class.js.map

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FlexAlignDirective = undefined;

var _core = __webpack_require__(3);

var _base = __webpack_require__(23);

var _mediaMonitor = __webpack_require__(18);

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * 'flex-align' flexbox styling directive
 * Allows element-specific overrides for cross-axis alignments in a layout container
 * @see https://css-tricks.com/almanac/properties/a/align-self/
 */
var FlexAlignDirective = function (_super) {
    __extends(FlexAlignDirective, _super);
    /* tslint:enable */
    function FlexAlignDirective(monitor, elRef, renderer) {
        return _super.call(this, monitor, elRef, renderer) || this;
    }
    Object.defineProperty(FlexAlignDirective.prototype, "align", {
        /* tslint:disable */
        set: function set(val) {
            this._cacheInput('align', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignXs", {
        set: function set(val) {
            this._cacheInput('alignXs', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignSm", {
        set: function set(val) {
            this._cacheInput('alignSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignMd", {
        set: function set(val) {
            this._cacheInput('alignMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignLg", {
        set: function set(val) {
            this._cacheInput('alignLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignXl", {
        set: function set(val) {
            this._cacheInput('alignXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignLtSm", {
        set: function set(val) {
            this._cacheInput('alignLtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignLtMd", {
        set: function set(val) {
            this._cacheInput('alignLtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignLtLg", {
        set: function set(val) {
            this._cacheInput('alignLtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignLtXl", {
        set: function set(val) {
            this._cacheInput('alignLtXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignGtXs", {
        set: function set(val) {
            this._cacheInput('alignGtXs', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignGtSm", {
        set: function set(val) {
            this._cacheInput('alignGtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignGtMd", {
        set: function set(val) {
            this._cacheInput('alignGtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignGtLg", {
        set: function set(val) {
            this._cacheInput('alignGtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * For @Input changes on the current mq activation property, see onMediaQueryChanges()
     */
    FlexAlignDirective.prototype.ngOnChanges = function (changes) {
        if (changes['align'] != null || this._mqActivation) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    FlexAlignDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._listenForMediaQueryChanges('align', 'stretch', function (changes) {
            _this._updateWithValue(changes.value);
        });
        this._updateWithValue();
    };
    // *********************************************
    // Protected methods
    // *********************************************
    FlexAlignDirective.prototype._updateWithValue = function (value) {
        value = value || this._queryInput("align") || 'stretch';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        this._applyStyleToElement(this._buildCSS(value));
    };
    FlexAlignDirective.prototype._buildCSS = function (align) {
        var css = {};
        // Cross-axis
        switch (align) {
            case 'start':
                css['align-self'] = 'flex-start';
                break;
            case 'end':
                css['align-self'] = 'flex-end';
                break;
            default:
                css['align-self'] = align;
                break;
        }
        return css;
    };
    return FlexAlignDirective;
}(_base.BaseFxDirective);
exports.FlexAlignDirective = FlexAlignDirective;

FlexAlignDirective.decorators = [{ type: _core.Directive, args: [{
        selector: "\n  [fxFlexAlign],\n  [fxFlexAlign.xs], [fxFlexAlign.sm], [fxFlexAlign.md], [fxFlexAlign.lg], [fxFlexAlign.xl],\n  [fxFlexAlign.lt-sm], [fxFlexAlign.lt-md], [fxFlexAlign.lt-lg], [fxFlexAlign.lt-xl],\n  [fxFlexAlign.gt-xs], [fxFlexAlign.gt-sm], [fxFlexAlign.gt-md], [fxFlexAlign.gt-lg]\n"
    }] }];
/** @nocollapse */
FlexAlignDirective.ctorParameters = function () {
    return [{ type: _mediaMonitor.MediaMonitor }, { type: _core.ElementRef }, { type: _core.Renderer2 }];
};
FlexAlignDirective.propDecorators = {
    'align': [{ type: _core.Input, args: ['fxFlexAlign'] }],
    'alignXs': [{ type: _core.Input, args: ['fxFlexAlign.xs'] }],
    'alignSm': [{ type: _core.Input, args: ['fxFlexAlign.sm'] }],
    'alignMd': [{ type: _core.Input, args: ['fxFlexAlign.md'] }],
    'alignLg': [{ type: _core.Input, args: ['fxFlexAlign.lg'] }],
    'alignXl': [{ type: _core.Input, args: ['fxFlexAlign.xl'] }],
    'alignLtSm': [{ type: _core.Input, args: ['fxFlexAlign.lt-sm'] }],
    'alignLtMd': [{ type: _core.Input, args: ['fxFlexAlign.lt-md'] }],
    'alignLtLg': [{ type: _core.Input, args: ['fxFlexAlign.lt-lg'] }],
    'alignLtXl': [{ type: _core.Input, args: ['fxFlexAlign.lt-xl'] }],
    'alignGtXs': [{ type: _core.Input, args: ['fxFlexAlign.gt-xs'] }],
    'alignGtSm': [{ type: _core.Input, args: ['fxFlexAlign.gt-sm'] }],
    'alignGtMd': [{ type: _core.Input, args: ['fxFlexAlign.gt-md'] }],
    'alignGtLg': [{ type: _core.Input, args: ['fxFlexAlign.gt-lg'] }]
};
//# sourceMappingURL=flex-align.js.map

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FlexFillDirective = undefined;

var _core = __webpack_require__(3);

var _mediaMonitor = __webpack_require__(18);

var _base = __webpack_require__(23);

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var FLEX_FILL_CSS = {
    'margin': 0,
    'width': '100%',
    'height': '100%',
    'min-width': '100%',
    'min-height': '100%'
};
/**
 * 'fxFill' flexbox styling directive
 *  Maximizes width and height of element in a layout container
 *
 *  NOTE: fxFill is NOT responsive API!!
 */
var FlexFillDirective = function (_super) {
    __extends(FlexFillDirective, _super);
    function FlexFillDirective(monitor, elRef, renderer) {
        var _this = _super.call(this, monitor, elRef, renderer) || this;
        _this.elRef = elRef;
        _this.renderer = renderer;
        _this._applyStyleToElement(FLEX_FILL_CSS);
        return _this;
    }
    return FlexFillDirective;
}(_base.BaseFxDirective);
exports.FlexFillDirective = FlexFillDirective;

FlexFillDirective.decorators = [{ type: _core.Directive, args: [{ selector: "\n  [fxFill],\n  [fxFlexFill]\n" }] }];
/** @nocollapse */
FlexFillDirective.ctorParameters = function () {
    return [{ type: _mediaMonitor.MediaMonitor }, { type: _core.ElementRef }, { type: _core.Renderer2 }];
};
//# sourceMappingURL=flex-fill.js.map

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FlexOffsetDirective = undefined;

var _core = __webpack_require__(3);

var _base = __webpack_require__(23);

var _mediaMonitor = __webpack_require__(18);

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * 'flex-offset' flexbox styling directive
 * Configures the 'margin-left' of the element in a layout container
 */
var FlexOffsetDirective = function (_super) {
    __extends(FlexOffsetDirective, _super);
    /* tslint:enable */
    function FlexOffsetDirective(monitor, elRef, renderer) {
        return _super.call(this, monitor, elRef, renderer) || this;
    }
    Object.defineProperty(FlexOffsetDirective.prototype, "offset", {
        /* tslint:disable */
        set: function set(val) {
            this._cacheInput('offset', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetXs", {
        set: function set(val) {
            this._cacheInput('offsetXs', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetSm", {
        set: function set(val) {
            this._cacheInput('offsetSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetMd", {
        set: function set(val) {
            this._cacheInput('offsetMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetLg", {
        set: function set(val) {
            this._cacheInput('offsetLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetXl", {
        set: function set(val) {
            this._cacheInput('offsetXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetLtSm", {
        set: function set(val) {
            this._cacheInput('offsetLtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetLtMd", {
        set: function set(val) {
            this._cacheInput('offsetLtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetLtLg", {
        set: function set(val) {
            this._cacheInput('offsetLtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetLtXl", {
        set: function set(val) {
            this._cacheInput('offsetLtXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetGtXs", {
        set: function set(val) {
            this._cacheInput('offsetGtXs', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetGtSm", {
        set: function set(val) {
            this._cacheInput('offsetGtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetGtMd", {
        set: function set(val) {
            this._cacheInput('offsetGtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetGtLg", {
        set: function set(val) {
            this._cacheInput('offsetGtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * For @Input changes on the current mq activation property, see onMediaQueryChanges()
     */
    FlexOffsetDirective.prototype.ngOnChanges = function (changes) {
        if (changes['offset'] != null || this._mqActivation) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    FlexOffsetDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._listenForMediaQueryChanges('offset', 0, function (changes) {
            _this._updateWithValue(changes.value);
        });
    };
    // *********************************************
    // Protected methods
    // *********************************************
    FlexOffsetDirective.prototype._updateWithValue = function (value) {
        value = value || this._queryInput("offset") || 0;
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        this._applyStyleToElement(this._buildCSS(value));
    };
    FlexOffsetDirective.prototype._buildCSS = function (offset) {
        var isPercent = String(offset).indexOf('%') > -1;
        var isPx = String(offset).indexOf('px') > -1;
        if (!isPx && !isPercent && !isNaN(offset)) {
            offset = offset + '%';
        }
        return { 'margin-left': "" + offset };
    };
    return FlexOffsetDirective;
}(_base.BaseFxDirective);
exports.FlexOffsetDirective = FlexOffsetDirective;

FlexOffsetDirective.decorators = [{ type: _core.Directive, args: [{ selector: "\n  [fxFlexOffset],\n  [fxFlexOffset.xs], [fxFlexOffset.sm], [fxFlexOffset.md], [fxFlexOffset.lg], [fxFlexOffset.xl],\n  [fxFlexOffset.lt-sm], [fxFlexOffset.lt-md], [fxFlexOffset.lt-lg], [fxFlexOffset.lt-xl],\n  [fxFlexOffset.gt-xs], [fxFlexOffset.gt-sm], [fxFlexOffset.gt-md], [fxFlexOffset.gt-lg]\n" }] }];
/** @nocollapse */
FlexOffsetDirective.ctorParameters = function () {
    return [{ type: _mediaMonitor.MediaMonitor }, { type: _core.ElementRef }, { type: _core.Renderer2 }];
};
FlexOffsetDirective.propDecorators = {
    'offset': [{ type: _core.Input, args: ['fxFlexOffset'] }],
    'offsetXs': [{ type: _core.Input, args: ['fxFlexOffset.xs'] }],
    'offsetSm': [{ type: _core.Input, args: ['fxFlexOffset.sm'] }],
    'offsetMd': [{ type: _core.Input, args: ['fxFlexOffset.md'] }],
    'offsetLg': [{ type: _core.Input, args: ['fxFlexOffset.lg'] }],
    'offsetXl': [{ type: _core.Input, args: ['fxFlexOffset.xl'] }],
    'offsetLtSm': [{ type: _core.Input, args: ['fxFlexOffset.lt-sm'] }],
    'offsetLtMd': [{ type: _core.Input, args: ['fxFlexOffset.lt-md'] }],
    'offsetLtLg': [{ type: _core.Input, args: ['fxFlexOffset.lt-lg'] }],
    'offsetLtXl': [{ type: _core.Input, args: ['fxFlexOffset.lt-xl'] }],
    'offsetGtXs': [{ type: _core.Input, args: ['fxFlexOffset.gt-xs'] }],
    'offsetGtSm': [{ type: _core.Input, args: ['fxFlexOffset.gt-sm'] }],
    'offsetGtMd': [{ type: _core.Input, args: ['fxFlexOffset.gt-md'] }],
    'offsetGtLg': [{ type: _core.Input, args: ['fxFlexOffset.gt-lg'] }]
};
//# sourceMappingURL=flex-offset.js.map

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FlexOrderDirective = undefined;

var _core = __webpack_require__(3);

var _base = __webpack_require__(23);

var _mediaMonitor = __webpack_require__(18);

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * 'flex-order' flexbox styling directive
 * Configures the positional ordering of the element in a sorted layout container
 * @see https://css-tricks.com/almanac/properties/o/order/
 */
var FlexOrderDirective = function (_super) {
    __extends(FlexOrderDirective, _super);
    /* tslint:enable */
    function FlexOrderDirective(monitor, elRef, renderer) {
        return _super.call(this, monitor, elRef, renderer) || this;
    }
    Object.defineProperty(FlexOrderDirective.prototype, "order", {
        /* tslint:disable */
        set: function set(val) {
            this._cacheInput('order', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexOrderDirective.prototype, "orderXs", {
        set: function set(val) {
            this._cacheInput('orderXs', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexOrderDirective.prototype, "orderSm", {
        set: function set(val) {
            this._cacheInput('orderSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderMd", {
        set: function set(val) {
            this._cacheInput('orderMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderLg", {
        set: function set(val) {
            this._cacheInput('orderLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderXl", {
        set: function set(val) {
            this._cacheInput('orderXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderGtXs", {
        set: function set(val) {
            this._cacheInput('orderGtXs', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderGtSm", {
        set: function set(val) {
            this._cacheInput('orderGtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderGtMd", {
        set: function set(val) {
            this._cacheInput('orderGtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderGtLg", {
        set: function set(val) {
            this._cacheInput('orderGtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderLtSm", {
        set: function set(val) {
            this._cacheInput('orderLtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderLtMd", {
        set: function set(val) {
            this._cacheInput('orderLtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderLtLg", {
        set: function set(val) {
            this._cacheInput('orderLtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderLtXl", {
        set: function set(val) {
            this._cacheInput('orderLtXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * For @Input changes on the current mq activation property, see onMediaQueryChanges()
     */
    FlexOrderDirective.prototype.ngOnChanges = function (changes) {
        if (changes['order'] != null || this._mqActivation) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    FlexOrderDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._listenForMediaQueryChanges('order', '0', function (changes) {
            _this._updateWithValue(changes.value);
        });
        this._updateWithValue();
    };
    // *********************************************
    // Protected methods
    // *********************************************
    FlexOrderDirective.prototype._updateWithValue = function (value) {
        value = value || this._queryInput("order") || '0';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        this._applyStyleToElement(this._buildCSS(value));
    };
    FlexOrderDirective.prototype._buildCSS = function (value) {
        value = parseInt(value, 10);
        return { order: isNaN(value) ? 0 : value };
    };
    return FlexOrderDirective;
}(_base.BaseFxDirective);
exports.FlexOrderDirective = FlexOrderDirective;

FlexOrderDirective.decorators = [{ type: _core.Directive, args: [{ selector: "\n  [fxFlexOrder],\n  [fxFlexOrder.xs], [fxFlexOrder.sm], [fxFlexOrder.md], [fxFlexOrder.lg], [fxFlexOrder.xl],\n  [fxFlexOrder.lt-sm], [fxFlexOrder.lt-md], [fxFlexOrder.lt-lg], [fxFlexOrder.lt-xl],\n  [fxFlexOrder.gt-xs], [fxFlexOrder.gt-sm], [fxFlexOrder.gt-md], [fxFlexOrder.gt-lg]\n" }] }];
/** @nocollapse */
FlexOrderDirective.ctorParameters = function () {
    return [{ type: _mediaMonitor.MediaMonitor }, { type: _core.ElementRef }, { type: _core.Renderer2 }];
};
FlexOrderDirective.propDecorators = {
    'order': [{ type: _core.Input, args: ['fxFlexOrder'] }],
    'orderXs': [{ type: _core.Input, args: ['fxFlexOrder.xs'] }],
    'orderSm': [{ type: _core.Input, args: ['fxFlexOrder.sm'] }],
    'orderMd': [{ type: _core.Input, args: ['fxFlexOrder.md'] }],
    'orderLg': [{ type: _core.Input, args: ['fxFlexOrder.lg'] }],
    'orderXl': [{ type: _core.Input, args: ['fxFlexOrder.xl'] }],
    'orderGtXs': [{ type: _core.Input, args: ['fxFlexOrder.gt-xs'] }],
    'orderGtSm': [{ type: _core.Input, args: ['fxFlexOrder.gt-sm'] }],
    'orderGtMd': [{ type: _core.Input, args: ['fxFlexOrder.gt-md'] }],
    'orderGtLg': [{ type: _core.Input, args: ['fxFlexOrder.gt-lg'] }],
    'orderLtSm': [{ type: _core.Input, args: ['fxFlexOrder.lt-sm'] }],
    'orderLtMd': [{ type: _core.Input, args: ['fxFlexOrder.lt-md'] }],
    'orderLtLg': [{ type: _core.Input, args: ['fxFlexOrder.lt-lg'] }],
    'orderLtXl': [{ type: _core.Input, args: ['fxFlexOrder.lt-xl'] }]
};
//# sourceMappingURL=flex-order.js.map

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FlexDirective = undefined;

var _core = __webpack_require__(3);

var _objectExtend = __webpack_require__(42);

var _base = __webpack_require__(23);

var _mediaMonitor = __webpack_require__(18);

var _layout = __webpack_require__(58);

var _layoutWrap = __webpack_require__(139);

var _basisValidator = __webpack_require__(148);

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Directive to control the size of a flex item using flex-basis, flex-grow, and flex-shrink.
 * Corresponds to the css `flex` shorthand property.
 *
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
var FlexDirective = function (_super) {
    __extends(FlexDirective, _super);
    /* tslint:enable */
    // Explicitly @SkipSelf on LayoutDirective and LayoutWrapDirective because we want the
    // parent flex container for this flex item.
    function FlexDirective(monitor, elRef, renderer, _container, _wrap) {
        var _this = _super.call(this, monitor, elRef, renderer) || this;
        _this._container = _container;
        _this._wrap = _wrap;
        /** The flex-direction of this element's flex container. Defaults to 'row'. */
        _this._layout = 'row';
        _this._cacheInput("flex", "");
        _this._cacheInput("shrink", 1);
        _this._cacheInput("grow", 1);
        if (_container) {
            // If this flex item is inside of a flex container marked with
            // Subscribe to layout immediate parent direction changes
            _this._layoutWatcher = _container.layout$.subscribe(function (direction) {
                // `direction` === null if parent container does not have a `fxLayout`
                _this._onLayoutChange(direction);
            });
        }
        return _this;
    }
    Object.defineProperty(FlexDirective.prototype, "shrink", {
        /* tslint:disable */
        set: function set(val) {
            this._cacheInput("shrink", val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "grow", {
        set: function set(val) {
            this._cacheInput("grow", val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flex", {
        set: function set(val) {
            this._cacheInput("flex", val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexXs", {
        set: function set(val) {
            this._cacheInput('flexXs', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexSm", {
        set: function set(val) {
            this._cacheInput('flexSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexMd", {
        set: function set(val) {
            this._cacheInput('flexMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexLg", {
        set: function set(val) {
            this._cacheInput('flexLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexXl", {
        set: function set(val) {
            this._cacheInput('flexXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexGtXs", {
        set: function set(val) {
            this._cacheInput('flexGtXs', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexGtSm", {
        set: function set(val) {
            this._cacheInput('flexGtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexGtMd", {
        set: function set(val) {
            this._cacheInput('flexGtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexGtLg", {
        set: function set(val) {
            this._cacheInput('flexGtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexLtSm", {
        set: function set(val) {
            this._cacheInput('flexLtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexLtMd", {
        set: function set(val) {
            this._cacheInput('flexLtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexLtLg", {
        set: function set(val) {
            this._cacheInput('flexLtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexLtXl", {
        set: function set(val) {
            this._cacheInput('flexLtXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * For @Input changes on the current mq activation property, see onMediaQueryChanges()
     */
    FlexDirective.prototype.ngOnChanges = function (changes) {
        if (changes['flex'] != null || this._mqActivation) {
            this._updateStyle();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    FlexDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._listenForMediaQueryChanges('flex', '', function (changes) {
            _this._updateStyle(changes.value);
        });
        this._updateStyle();
    };
    FlexDirective.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this._layoutWatcher) {
            this._layoutWatcher.unsubscribe();
        }
    };
    /**
     * Caches the parent container's 'flex-direction' and updates the element's style.
     * Used as a handler for layout change events from the parent flex container.
     */
    FlexDirective.prototype._onLayoutChange = function (direction) {
        this._layout = direction || this._layout || "row";
        this._updateStyle();
    };
    FlexDirective.prototype._updateStyle = function (value) {
        var flexBasis = value || this._queryInput("flex") || '';
        if (this._mqActivation) {
            flexBasis = this._mqActivation.activatedInput;
        }
        var basis = String(flexBasis).replace(";", "");
        var parts = (0, _basisValidator.validateBasis)(basis, this._queryInput("grow"), this._queryInput("shrink"));
        this._applyStyleToElement(this._validateValue.apply(this, parts));
    };
    /**
     * Validate the value to be one of the acceptable value options
     * Use default fallback of "row"
     */
    FlexDirective.prototype._validateValue = function (grow, shrink, basis) {
        // The flex-direction of this element's flex container. Defaults to 'row'.
        var layout = this._getFlowDirection(this.parentElement, true);
        var direction = layout.indexOf('column') > -1 ? 'column' : 'row';
        var css, isValue;
        grow = grow == "0" ? 0 : grow;
        shrink = shrink == "0" ? 0 : shrink;
        // flex-basis allows you to specify the initial/starting main-axis size of the element,
        // before anything else is computed. It can either be a percentage or an absolute value.
        // It is, however, not the breaking point for flex-grow/shrink properties
        //
        // flex-grow can be seen as this:
        //   0: Do not stretch. Either size to element's content width, or obey 'flex-basis'.
        //   1: (Default value). Stretch; will be the same size to all other flex items on
        //       the same row since they have a default value of 1.
        //   ≥2 (integer n): Stretch. Will be n times the size of other elements
        //      with 'flex-grow: 1' on the same row.
        // Use `null` to clear existing styles.
        var clearStyles = {
            'max-width': null,
            'max-height': null,
            'min-width': null,
            'min-height': null
        };
        switch (basis || '') {
            case '':
                css = (0, _objectExtend.extendObject)(clearStyles, { 'flex': '1 1 0.000000001px' });
                break;
            case 'initial': // default
            case 'nogrow':
                grow = 0;
                css = (0, _objectExtend.extendObject)(clearStyles, { 'flex': '0 1 auto' });
                break;
            case 'grow':
                css = (0, _objectExtend.extendObject)(clearStyles, { 'flex': '1 1 100%' });
                break;
            case 'noshrink':
                shrink = 0;
                css = (0, _objectExtend.extendObject)(clearStyles, { 'flex': '1 0 auto' });
                break;
            case 'auto':
                css = (0, _objectExtend.extendObject)(clearStyles, { 'flex': grow + " " + shrink + " auto" });
                break;
            case 'none':
                grow = 0;
                shrink = 0;
                css = (0, _objectExtend.extendObject)(clearStyles, { 'flex': '0 0 auto' });
                break;
            default:
                var hasCalc = String(basis).indexOf('calc') > -1;
                var isPercent = String(basis).indexOf('%') > -1 && !hasCalc;
                isValue = hasCalc || String(basis).indexOf('px') > -1 || String(basis).indexOf('em') > -1 || String(basis).indexOf('vw') > -1 || String(basis).indexOf('vh') > -1;
                // Defaults to percentage sizing unless `px` is explicitly set
                if (!isValue && !isPercent && !isNaN(basis)) {
                    basis = basis + '%';
                }
                if (basis === '0px') {
                    basis = '0%';
                }
                // Set max-width = basis if using layout-wrap
                // tslint:disable-next-line:max-line-length
                // @see https://github.com/philipwalton/flexbugs#11-min-and-max-size-declarations-are-ignored-when-wrappifl-flex-items
                css = (0, _objectExtend.extendObject)(clearStyles, {
                    'flex': grow + " " + shrink + " " + (isValue || this._wrap ? basis : '100%')
                });
                break;
        }
        var max = direction === 'row' ? 'max-width' : 'max-height';
        var min = direction === 'row' ? 'min-width' : 'min-height';
        var usingCalc = String(basis).indexOf('calc') > -1 || basis == 'auto';
        var isPx = String(basis).indexOf('px') > -1 || usingCalc;
        // make box inflexible when shrink and grow are both zero
        // should not set a min when the grow is zero
        // should not set a max when the shrink is zero
        var isFixed = !grow && !shrink;
        css[min] = basis == '0%' ? 0 : isFixed || isPx && grow ? basis : null;
        css[max] = basis == '0%' ? 0 : isFixed || !usingCalc && shrink ? basis : null;
        return (0, _objectExtend.extendObject)(css, { 'box-sizing': 'border-box' });
    };
    Object.defineProperty(FlexDirective.prototype, "parentElement", {
        get: function get() {
            return this._elementRef.nativeElement.parentNode;
        },
        enumerable: true,
        configurable: true
    });
    return FlexDirective;
}(_base.BaseFxDirective);
exports.FlexDirective = FlexDirective;

FlexDirective.decorators = [{ type: _core.Directive, args: [{ selector: "\n  [fxFlex],\n  [fxFlex.xs], [fxFlex.sm], [fxFlex.md], [fxFlex.lg], [fxFlex.xl],\n  [fxFlex.lt-sm], [fxFlex.lt-md], [fxFlex.lt-lg], [fxFlex.lt-xl],\n  [fxFlex.gt-xs], [fxFlex.gt-sm], [fxFlex.gt-md], [fxFlex.gt-lg],\n"
    }] }];
/** @nocollapse */
FlexDirective.ctorParameters = function () {
    return [{ type: _mediaMonitor.MediaMonitor }, { type: _core.ElementRef }, { type: _core.Renderer2 }, { type: _layout.LayoutDirective, decorators: [{ type: _core.Optional }, { type: _core.SkipSelf }] }, { type: _layoutWrap.LayoutWrapDirective, decorators: [{ type: _core.Optional }, { type: _core.SkipSelf }] }];
};
FlexDirective.propDecorators = {
    'shrink': [{ type: _core.Input, args: ['fxShrink'] }],
    'grow': [{ type: _core.Input, args: ['fxGrow'] }],
    'flex': [{ type: _core.Input, args: ['fxFlex'] }],
    'flexXs': [{ type: _core.Input, args: ['fxFlex.xs'] }],
    'flexSm': [{ type: _core.Input, args: ['fxFlex.sm'] }],
    'flexMd': [{ type: _core.Input, args: ['fxFlex.md'] }],
    'flexLg': [{ type: _core.Input, args: ['fxFlex.lg'] }],
    'flexXl': [{ type: _core.Input, args: ['fxFlex.xl'] }],
    'flexGtXs': [{ type: _core.Input, args: ['fxFlex.gt-xs'] }],
    'flexGtSm': [{ type: _core.Input, args: ['fxFlex.gt-sm'] }],
    'flexGtMd': [{ type: _core.Input, args: ['fxFlex.gt-md'] }],
    'flexGtLg': [{ type: _core.Input, args: ['fxFlex.gt-lg'] }],
    'flexLtSm': [{ type: _core.Input, args: ['fxFlex.lt-sm'] }],
    'flexLtMd': [{ type: _core.Input, args: ['fxFlex.lt-md'] }],
    'flexLtLg': [{ type: _core.Input, args: ['fxFlex.lt-lg'] }],
    'flexLtXl': [{ type: _core.Input, args: ['fxFlex.lt-xl'] }]
};
//# sourceMappingURL=flex.js.map

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LayoutAlignDirective = undefined;

var _core = __webpack_require__(3);

var _objectExtend = __webpack_require__(42);

var _base = __webpack_require__(23);

var _mediaMonitor = __webpack_require__(18);

var _layout = __webpack_require__(58);

var _layoutValidator = __webpack_require__(60);

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * 'layout-align' flexbox styling directive
 *  Defines positioning of child elements along main and cross axis in a layout container
 *  Optional values: {main-axis} values or {main-axis cross-axis} value pairs
 *
 *  @see https://css-tricks.com/almanac/properties/j/justify-content/
 *  @see https://css-tricks.com/almanac/properties/a/align-items/
 *  @see https://css-tricks.com/almanac/properties/a/align-content/
 */
var LayoutAlignDirective = function (_super) {
    __extends(LayoutAlignDirective, _super);
    /* tslint:enable */
    function LayoutAlignDirective(monitor, elRef, renderer, container) {
        var _this = _super.call(this, monitor, elRef, renderer) || this;
        _this._layout = 'row'; // default flex-direction
        if (container) {
            _this._layoutWatcher = container.layout$.subscribe(_this._onLayoutChange.bind(_this));
        }
        return _this;
    }
    Object.defineProperty(LayoutAlignDirective.prototype, "align", {
        /* tslint:disable */
        set: function set(val) {
            this._cacheInput('align', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutAlignDirective.prototype, "alignXs", {
        set: function set(val) {
            this._cacheInput('alignXs', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutAlignDirective.prototype, "alignSm", {
        set: function set(val) {
            this._cacheInput('alignSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignMd", {
        set: function set(val) {
            this._cacheInput('alignMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignLg", {
        set: function set(val) {
            this._cacheInput('alignLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignXl", {
        set: function set(val) {
            this._cacheInput('alignXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignGtXs", {
        set: function set(val) {
            this._cacheInput('alignGtXs', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignGtSm", {
        set: function set(val) {
            this._cacheInput('alignGtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignGtMd", {
        set: function set(val) {
            this._cacheInput('alignGtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignGtLg", {
        set: function set(val) {
            this._cacheInput('alignGtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignLtSm", {
        set: function set(val) {
            this._cacheInput('alignLtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignLtMd", {
        set: function set(val) {
            this._cacheInput('alignLtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignLtLg", {
        set: function set(val) {
            this._cacheInput('alignLtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignLtXl", {
        set: function set(val) {
            this._cacheInput('alignLtXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    LayoutAlignDirective.prototype.ngOnChanges = function (changes) {
        if (changes['align'] != null || this._mqActivation) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    LayoutAlignDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._listenForMediaQueryChanges('align', 'start stretch', function (changes) {
            _this._updateWithValue(changes.value);
        });
        this._updateWithValue();
    };
    LayoutAlignDirective.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this._layoutWatcher) {
            this._layoutWatcher.unsubscribe();
        }
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     *
     */
    LayoutAlignDirective.prototype._updateWithValue = function (value) {
        value = value || this._queryInput("align") || 'start stretch';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        this._applyStyleToElement(this._buildCSS(value));
        this._allowStretching(value, !this._layout ? "row" : this._layout);
    };
    /**
     * Cache the parent container 'flex-direction' and update the 'flex' styles
     */
    LayoutAlignDirective.prototype._onLayoutChange = function (direction) {
        var _this = this;
        this._layout = (direction || '').toLowerCase();
        if (!_layoutValidator.LAYOUT_VALUES.find(function (x) {
            return x === _this._layout;
        })) {
            this._layout = 'row';
        }
        var value = this._queryInput("align") || 'start stretch';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        this._allowStretching(value, this._layout || "row");
    };
    LayoutAlignDirective.prototype._buildCSS = function (align) {
        var css = {},
            _a = align.split(' '),
            main_axis = _a[0],
            cross_axis = _a[1]; // tslint:disable-line:variable-name
        // Main axis
        switch (main_axis) {
            case 'center':
                css['justify-content'] = 'center';
                break;
            case 'space-around':
                css['justify-content'] = 'space-around';
                break;
            case 'space-between':
                css['justify-content'] = 'space-between';
                break;
            case 'end':
            case 'flex-end':
                css['justify-content'] = 'flex-end';
                break;
            case 'start':
            case 'flex-start':
            default:
                css['justify-content'] = 'flex-start'; // default main axis
                break;
        }
        // Cross-axis
        switch (cross_axis) {
            case 'start':
            case 'flex-start':
                css['align-items'] = css['align-content'] = 'flex-start';
                break;
            case 'baseline':
                css['align-items'] = 'baseline';
                break;
            case 'center':
                css['align-items'] = css['align-content'] = 'center';
                break;
            case 'end':
            case 'flex-end':
                css['align-items'] = css['align-content'] = 'flex-end';
                break;
            case 'stretch':
            default:
                css['align-items'] = css['align-content'] = 'stretch'; // default cross axis
                break;
        }
        return (0, _objectExtend.extendObject)(css, {
            'display': 'flex',
            'flex-direction': this._layout || "row",
            'box-sizing': 'border-box'
        });
    };
    /**
     * Update container element to 'stretch' as needed...
     * NOTE: this is only done if the crossAxis is explicitly set to 'stretch'
     */
    LayoutAlignDirective.prototype._allowStretching = function (align, layout) {
        var _a = align.split(' '),
            cross_axis = _a[1]; // tslint:disable-line:variable-name
        if (cross_axis == 'stretch') {
            // Use `null` values to remove style
            this._applyStyleToElement({
                'box-sizing': 'border-box',
                'max-width': layout === 'column' ? '100%' : null,
                'max-height': layout === 'row' ? '100%' : null
            });
        }
    };
    return LayoutAlignDirective;
}(_base.BaseFxDirective);
exports.LayoutAlignDirective = LayoutAlignDirective;

LayoutAlignDirective.decorators = [{ type: _core.Directive, args: [{ selector: "\n  [fxLayoutAlign],\n  [fxLayoutAlign.xs], [fxLayoutAlign.sm], [fxLayoutAlign.md], [fxLayoutAlign.lg],[fxLayoutAlign.xl],\n  [fxLayoutAlign.lt-sm], [fxLayoutAlign.lt-md], [fxLayoutAlign.lt-lg], [fxLayoutAlign.lt-xl],\n  [fxLayoutAlign.gt-xs], [fxLayoutAlign.gt-sm], [fxLayoutAlign.gt-md], [fxLayoutAlign.gt-lg]\n" }] }];
/** @nocollapse */
LayoutAlignDirective.ctorParameters = function () {
    return [{ type: _mediaMonitor.MediaMonitor }, { type: _core.ElementRef }, { type: _core.Renderer2 }, { type: _layout.LayoutDirective, decorators: [{ type: _core.Optional }, { type: _core.Self }] }];
};
LayoutAlignDirective.propDecorators = {
    'align': [{ type: _core.Input, args: ['fxLayoutAlign'] }],
    'alignXs': [{ type: _core.Input, args: ['fxLayoutAlign.xs'] }],
    'alignSm': [{ type: _core.Input, args: ['fxLayoutAlign.sm'] }],
    'alignMd': [{ type: _core.Input, args: ['fxLayoutAlign.md'] }],
    'alignLg': [{ type: _core.Input, args: ['fxLayoutAlign.lg'] }],
    'alignXl': [{ type: _core.Input, args: ['fxLayoutAlign.xl'] }],
    'alignGtXs': [{ type: _core.Input, args: ['fxLayoutAlign.gt-xs'] }],
    'alignGtSm': [{ type: _core.Input, args: ['fxLayoutAlign.gt-sm'] }],
    'alignGtMd': [{ type: _core.Input, args: ['fxLayoutAlign.gt-md'] }],
    'alignGtLg': [{ type: _core.Input, args: ['fxLayoutAlign.gt-lg'] }],
    'alignLtSm': [{ type: _core.Input, args: ['fxLayoutAlign.lt-sm'] }],
    'alignLtMd': [{ type: _core.Input, args: ['fxLayoutAlign.lt-md'] }],
    'alignLtLg': [{ type: _core.Input, args: ['fxLayoutAlign.lt-lg'] }],
    'alignLtXl': [{ type: _core.Input, args: ['fxLayoutAlign.lt-xl'] }]
};
//# sourceMappingURL=layout-align.js.map

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LayoutGapDirective = undefined;

var _core = __webpack_require__(3);

var _base = __webpack_require__(23);

var _layout = __webpack_require__(58);

var _mediaMonitor = __webpack_require__(18);

var _layoutValidator = __webpack_require__(60);

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * 'layout-padding' styling directive
 *  Defines padding of child elements in a layout container
 */
var LayoutGapDirective = function (_super) {
    __extends(LayoutGapDirective, _super);
    /* tslint:enable */
    function LayoutGapDirective(monitor, elRef, renderer, container) {
        var _this = _super.call(this, monitor, elRef, renderer) || this;
        _this._layout = 'row'; // default flex-direction
        if (container) {
            _this._layoutWatcher = container.layout$.subscribe(_this._onLayoutChange.bind(_this));
        }
        return _this;
    }
    Object.defineProperty(LayoutGapDirective.prototype, "gap", {
        /* tslint:disable */
        set: function set(val) {
            this._cacheInput('gap', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutGapDirective.prototype, "gapXs", {
        set: function set(val) {
            this._cacheInput('gapXs', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutGapDirective.prototype, "gapSm", {
        set: function set(val) {
            this._cacheInput('gapSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapMd", {
        set: function set(val) {
            this._cacheInput('gapMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapLg", {
        set: function set(val) {
            this._cacheInput('gapLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapXl", {
        set: function set(val) {
            this._cacheInput('gapXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapGtXs", {
        set: function set(val) {
            this._cacheInput('gapGtXs', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapGtSm", {
        set: function set(val) {
            this._cacheInput('gapGtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapGtMd", {
        set: function set(val) {
            this._cacheInput('gapGtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapGtLg", {
        set: function set(val) {
            this._cacheInput('gapGtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapLtSm", {
        set: function set(val) {
            this._cacheInput('gapLtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapLtMd", {
        set: function set(val) {
            this._cacheInput('gapLtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapLtLg", {
        set: function set(val) {
            this._cacheInput('gapLtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapLtXl", {
        set: function set(val) {
            this._cacheInput('gapLtXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    LayoutGapDirective.prototype.ngOnChanges = function (changes) {
        if (changes['gap'] != null || this._mqActivation) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    LayoutGapDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._watchContentChanges();
        this._listenForMediaQueryChanges('gap', '0', function (changes) {
            _this._updateWithValue(changes.value);
        });
        this._updateWithValue();
    };
    LayoutGapDirective.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this._layoutWatcher) {
            this._layoutWatcher.unsubscribe();
        }
        if (this._observer) {
            this._observer.disconnect();
        }
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     * Watch for child nodes to be added... and apply the layout gap styles to each.
     * NOTE: this does NOT! differentiate between viewChildren and contentChildren
     */
    LayoutGapDirective.prototype._watchContentChanges = function () {
        var _this = this;
        var onMutationCallback = function onMutationCallback(mutations) {
            var validatedChanges = function validatedChanges(it) {
                return it.addedNodes && it.addedNodes.length || it.removedNodes && it.removedNodes.length;
            };
            // update gap styles only for child 'added' or 'removed' events
            if (mutations.filter(validatedChanges).length) {
                _this._updateWithValue();
            }
        };
        this._observer = new MutationObserver(onMutationCallback);
        this._observer.observe(this._elementRef.nativeElement, { childList: true });
    };
    /**
     * Cache the parent container 'flex-direction' and update the 'margin' styles
     */
    LayoutGapDirective.prototype._onLayoutChange = function (direction) {
        var _this = this;
        this._layout = (direction || '').toLowerCase();
        if (!_layoutValidator.LAYOUT_VALUES.find(function (x) {
            return x === _this._layout;
        })) {
            this._layout = 'row';
        }
        this._updateWithValue();
    };
    /**
     *
     */
    LayoutGapDirective.prototype._updateWithValue = function (value) {
        var _this = this;
        value = value || this._queryInput("gap") || '0';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        // Gather all non-hidden Element nodes
        var items = this.childrenNodes.filter(function (el) {
            return el.nodeType === 1 && _this._getDisplayStyle(el) != "none";
        });
        var numItems = items.length;
        if (numItems > 1) {
            var lastItem = items[numItems - 1];
            // For each `element` children EXCEPT the last,
            // set the margin right/bottom styles...
            items = items.filter(function (el, j) {
                return j < numItems - 1;
            });
            this._applyStyleToElements(this._buildCSS(value), items);
            // Clear all gaps for all visible elements
            this._applyStyleToElements(this._buildCSS(), [lastItem]);
        }
    };
    /**
     * Prepare margin CSS, remove any previous explicitly
     * assigned margin assignments
     */
    LayoutGapDirective.prototype._buildCSS = function (value) {
        if (value === void 0) {
            value = null;
        }
        var key,
            margins = {
            'margin-left': null,
            'margin-right': null,
            'margin-top': null,
            'margin-bottom': null
        };
        switch (this._layout) {
            case 'column':
            case 'column-reverse':
                key = 'margin-bottom';
                break;
            case "row":
            case 'row-reverse':
            default:
                key = 'margin-right';
                break;
        }
        margins[key] = value;
        return margins;
    };
    return LayoutGapDirective;
}(_base.BaseFxDirective);
exports.LayoutGapDirective = LayoutGapDirective;

LayoutGapDirective.decorators = [{ type: _core.Directive, args: [{ selector: "\n  [fxLayoutGap],\n  [fxLayoutGap.xs], [fxLayoutGap.sm], [fxLayoutGap.md], [fxLayoutGap.lg], [fxLayoutGap.xl],\n  [fxLayoutGap.lt-sm], [fxLayoutGap.lt-md], [fxLayoutGap.lt-lg], [fxLayoutGap.lt-xl],\n  [fxLayoutGap.gt-xs], [fxLayoutGap.gt-sm], [fxLayoutGap.gt-md], [fxLayoutGap.gt-lg]\n"
    }] }];
/** @nocollapse */
LayoutGapDirective.ctorParameters = function () {
    return [{ type: _mediaMonitor.MediaMonitor }, { type: _core.ElementRef }, { type: _core.Renderer2 }, { type: _layout.LayoutDirective, decorators: [{ type: _core.Optional }, { type: _core.Self }] }];
};
LayoutGapDirective.propDecorators = {
    'gap': [{ type: _core.Input, args: ['fxLayoutGap'] }],
    'gapXs': [{ type: _core.Input, args: ['fxLayoutGap.xs'] }],
    'gapSm': [{ type: _core.Input, args: ['fxLayoutGap.sm'] }],
    'gapMd': [{ type: _core.Input, args: ['fxLayoutGap.md'] }],
    'gapLg': [{ type: _core.Input, args: ['fxLayoutGap.lg'] }],
    'gapXl': [{ type: _core.Input, args: ['fxLayoutGap.xl'] }],
    'gapGtXs': [{ type: _core.Input, args: ['fxLayoutGap.gt-xs'] }],
    'gapGtSm': [{ type: _core.Input, args: ['fxLayoutGap.gt-sm'] }],
    'gapGtMd': [{ type: _core.Input, args: ['fxLayoutGap.gt-md'] }],
    'gapGtLg': [{ type: _core.Input, args: ['fxLayoutGap.gt-lg'] }],
    'gapLtSm': [{ type: _core.Input, args: ['fxLayoutGap.lt-sm'] }],
    'gapLtMd': [{ type: _core.Input, args: ['fxLayoutGap.lt-md'] }],
    'gapLtLg': [{ type: _core.Input, args: ['fxLayoutGap.lt-lg'] }],
    'gapLtXl': [{ type: _core.Input, args: ['fxLayoutGap.lt-xl'] }]
};
//# sourceMappingURL=layout-gap.js.map

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ShowHideDirective = undefined;
exports.negativeOf = negativeOf;

var _core = __webpack_require__(3);

var _base = __webpack_require__(23);

var _mediaMonitor = __webpack_require__(18);

var _layout2 = __webpack_require__(58);

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var FALSY = ['false', false, 0];
/**
 * For fxHide selectors, we invert the 'value'
 * and assign to the equivalent fxShow selector cache
 *  - When 'hide' === '' === true, do NOT show the element
 *  - When 'hide' === false or 0... we WILL show the element
 */
function negativeOf(hide) {
    return hide === "" ? false : hide === "false" || hide === 0 ? true : !hide;
}
/**
 * 'show' Layout API directive
 *
 */
var ShowHideDirective = function (_super) {
    __extends(ShowHideDirective, _super);
    /* tslint:enable */
    /**
     *
     */
    function ShowHideDirective(monitor, _layout, elRef, renderer) {
        var _this = _super.call(this, monitor, elRef, renderer) || this;
        _this._layout = _layout;
        _this.elRef = elRef;
        _this.renderer = renderer;
        _this._display = _this._getDisplayStyle(); // re-invoke override to use `this._layout`
        if (_layout) {
            /**
             * The Layout can set the display:flex (and incorrectly affect the Hide/Show directives.
             * Whenever Layout [on the same element] resets its CSS, then update the Hide/Show CSS
             */
            _this._layoutWatcher = _layout.layout$.subscribe(function () {
                return _this._updateWithValue();
            });
        }
        return _this;
    }
    Object.defineProperty(ShowHideDirective.prototype, "show", {
        /* tslint:disable */
        set: function set(val) {
            this._cacheInput("show", val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShowHideDirective.prototype, "showXs", {
        set: function set(val) {
            this._cacheInput('showXs', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShowHideDirective.prototype, "showSm", {
        set: function set(val) {
            this._cacheInput('showSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showMd", {
        set: function set(val) {
            this._cacheInput('showMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showLg", {
        set: function set(val) {
            this._cacheInput('showLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showXl", {
        set: function set(val) {
            this._cacheInput('showXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showLtSm", {
        set: function set(val) {
            this._cacheInput('showLtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showLtMd", {
        set: function set(val) {
            this._cacheInput('showLtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showLtLg", {
        set: function set(val) {
            this._cacheInput('showLtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showLtXl", {
        set: function set(val) {
            this._cacheInput('showLtXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showGtXs", {
        set: function set(val) {
            this._cacheInput('showGtXs', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showGtSm", {
        set: function set(val) {
            this._cacheInput('showGtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showGtMd", {
        set: function set(val) {
            this._cacheInput('showGtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showGtLg", {
        set: function set(val) {
            this._cacheInput('showGtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hide", {
        set: function set(val) {
            this._cacheInput("show", negativeOf(val));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShowHideDirective.prototype, "hideXs", {
        set: function set(val) {
            this._cacheInput("showXs", negativeOf(val));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShowHideDirective.prototype, "hideSm", {
        set: function set(val) {
            this._cacheInput('showSm', negativeOf(val));
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideMd", {
        set: function set(val) {
            this._cacheInput('showMd', negativeOf(val));
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideLg", {
        set: function set(val) {
            this._cacheInput('showLg', negativeOf(val));
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideXl", {
        set: function set(val) {
            this._cacheInput('showXl', negativeOf(val));
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideLtSm", {
        set: function set(val) {
            this._cacheInput('showLtSm', negativeOf(val));
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideLtMd", {
        set: function set(val) {
            this._cacheInput('showLtMd', negativeOf(val));
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideLtLg", {
        set: function set(val) {
            this._cacheInput('showLtLg', negativeOf(val));
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideLtXl", {
        set: function set(val) {
            this._cacheInput('showLtXl', negativeOf(val));
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideGtXs", {
        set: function set(val) {
            this._cacheInput('showGtXs', negativeOf(val));
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideGtSm", {
        set: function set(val) {
            this._cacheInput('showGtSm', negativeOf(val));
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideGtMd", {
        set: function set(val) {
            this._cacheInput('showGtMd', negativeOf(val));
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideGtLg", {
        set: function set(val) {
            this._cacheInput('showGtLg', negativeOf(val));
        },
        enumerable: true,
        configurable: true
    });
    ;
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * Override accessor to the current HTMLElement's `display` style
     * Note: Show/Hide will not change the display to 'flex' but will set it to 'block'
     * unless it was already explicitly defined.
     */
    ShowHideDirective.prototype._getDisplayStyle = function () {
        return this._layout ? "flex" : _super.prototype._getDisplayStyle.call(this);
    };
    /**
     * On changes to any @Input properties...
     * Default to use the non-responsive Input value ('fxShow')
     * Then conditionally override with the mq-activated Input's current value
     */
    ShowHideDirective.prototype.ngOnChanges = function (changes) {
        if (changes['show'] != null || this._mqActivation) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    ShowHideDirective.prototype.ngOnInit = function () {
        var _this = this;
        var value = this._getDefaultVal("show", true);
        // Build _mqActivation controller
        this._listenForMediaQueryChanges('show', value, function (changes) {
            _this._updateWithValue(changes.value);
        });
        this._updateWithValue();
    };
    ShowHideDirective.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this._layoutWatcher) {
            this._layoutWatcher.unsubscribe();
        }
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /** Validate the visibility value and then update the host's inline display style */
    ShowHideDirective.prototype._updateWithValue = function (value) {
        value = value || this._getDefaultVal("show", true);
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        var shouldShow = this._validateTruthy(value);
        this._applyStyleToElement(this._buildCSS(shouldShow));
    };
    /** Build the CSS that should be assigned to the element instance */
    ShowHideDirective.prototype._buildCSS = function (show) {
        return { 'display': show ? this._display : 'none' };
    };
    /**  Validate the to be not FALSY */
    ShowHideDirective.prototype._validateTruthy = function (show) {
        return FALSY.indexOf(show) == -1;
    };
    return ShowHideDirective;
}(_base.BaseFxDirective);
exports.ShowHideDirective = ShowHideDirective;

ShowHideDirective.decorators = [{ type: _core.Directive, args: [{
        selector: "\n  [fxShow],\n  [fxShow.xs], [fxShow.sm], [fxShow.md], [fxShow.lg], [fxShow.xl],\n  [fxShow.lt-sm], [fxShow.lt-md], [fxShow.lt-lg], [fxShow.lt-xl],\n  [fxShow.gt-xs], [fxShow.gt-sm], [fxShow.gt-md], [fxShow.gt-lg],\n  [fxHide],\n  [fxHide.xs], [fxHide.sm], [fxHide.md], [fxHide.lg], [fxHide.xl],\n  [fxHide.lt-sm], [fxHide.lt-md], [fxHide.lt-lg], [fxHide.lt-xl],\n  [fxHide.gt-xs], [fxHide.gt-sm], [fxHide.gt-md], [fxHide.gt-lg]\n"
    }] }];
/** @nocollapse */
ShowHideDirective.ctorParameters = function () {
    return [{ type: _mediaMonitor.MediaMonitor }, { type: _layout2.LayoutDirective, decorators: [{ type: _core.Optional }, { type: _core.Self }] }, { type: _core.ElementRef }, { type: _core.Renderer2 }];
};
ShowHideDirective.propDecorators = {
    'show': [{ type: _core.Input, args: ['fxShow'] }],
    'showXs': [{ type: _core.Input, args: ['fxShow.xs'] }],
    'showSm': [{ type: _core.Input, args: ['fxShow.sm'] }],
    'showMd': [{ type: _core.Input, args: ['fxShow.md'] }],
    'showLg': [{ type: _core.Input, args: ['fxShow.lg'] }],
    'showXl': [{ type: _core.Input, args: ['fxShow.xl'] }],
    'showLtSm': [{ type: _core.Input, args: ['fxShow.lt-sm'] }],
    'showLtMd': [{ type: _core.Input, args: ['fxShow.lt-md'] }],
    'showLtLg': [{ type: _core.Input, args: ['fxShow.lt-lg'] }],
    'showLtXl': [{ type: _core.Input, args: ['fxShow.lt-xl'] }],
    'showGtXs': [{ type: _core.Input, args: ['fxShow.gt-xs'] }],
    'showGtSm': [{ type: _core.Input, args: ['fxShow.gt-sm'] }],
    'showGtMd': [{ type: _core.Input, args: ['fxShow.gt-md'] }],
    'showGtLg': [{ type: _core.Input, args: ['fxShow.gt-lg'] }],
    'hide': [{ type: _core.Input, args: ['fxHide'] }],
    'hideXs': [{ type: _core.Input, args: ['fxHide.xs'] }],
    'hideSm': [{ type: _core.Input, args: ['fxHide.sm'] }],
    'hideMd': [{ type: _core.Input, args: ['fxHide.md'] }],
    'hideLg': [{ type: _core.Input, args: ['fxHide.lg'] }],
    'hideXl': [{ type: _core.Input, args: ['fxHide.xl'] }],
    'hideLtSm': [{ type: _core.Input, args: ['fxHide.lt-sm'] }],
    'hideLtMd': [{ type: _core.Input, args: ['fxHide.lt-md'] }],
    'hideLtLg': [{ type: _core.Input, args: ['fxHide.lt-lg'] }],
    'hideLtXl': [{ type: _core.Input, args: ['fxHide.lt-xl'] }],
    'hideGtXs': [{ type: _core.Input, args: ['fxHide.gt-xs'] }],
    'hideGtSm': [{ type: _core.Input, args: ['fxHide.gt-sm'] }],
    'hideGtMd': [{ type: _core.Input, args: ['fxHide.gt-md'] }],
    'hideGtLg': [{ type: _core.Input, args: ['fxHide.gt-lg'] }]
};
//# sourceMappingURL=show-hide.js.map

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StyleDirective = undefined;

var _core = __webpack_require__(3);

var _common = __webpack_require__(50);

var _baseAdapter = __webpack_require__(103);

var _breakPointRegistry = __webpack_require__(51);

var _mediaMonitor = __webpack_require__(18);

var _objectExtend = __webpack_require__(42);

var _platformBrowser = __webpack_require__(49);

var _styleTransforms = __webpack_require__(150);

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Directive to add responsive support for ngStyle.
 *
 */
var StyleDirective = function (_super) {
    __extends(StyleDirective, _super);
    /* tslint:enable */
    /**
     *  Constructor for the ngStyle subclass; which adds selectors and
     *  a MediaQuery Activation Adapter
     */
    function StyleDirective(monitor, _bpRegistry, _sanitizer, _differs, _ngEl, _oldRenderer, _renderer) {
        var _this =
        // TODO: this should use Renderer2 when the NgStyle signature is switched over to it.
        _super.call(this, _differs, _ngEl, _oldRenderer) || this;
        _this.monitor = monitor;
        _this._bpRegistry = _bpRegistry;
        _this._sanitizer = _sanitizer;
        // Build adapter, `cacheInput()` interceptor, and get current inline style if any
        _this._buildAdapter(monitor, _ngEl, _renderer);
        _this._base.cacheInput('style', _ngEl.nativeElement.getAttribute("style"), true);
        return _this;
    }
    Object.defineProperty(StyleDirective.prototype, "styleBase", {
        /**
         * Intercept ngStyle assignments so we cache the default styles
         * which are merged with activated styles or used as fallbacks.
         */
        set: function set(val) {
            this._base.cacheInput('style', val, true);
            this.ngStyle = this._base.inputMap['style'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StyleDirective.prototype, "ngStyleXs", {
        /* tslint:disable */
        set: function set(val) {
            this._base.cacheInput('styleXs', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StyleDirective.prototype, "ngStyleSm", {
        set: function set(val) {
            this._base.cacheInput('styleSm', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleMd", {
        set: function set(val) {
            this._base.cacheInput('styleMd', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleLg", {
        set: function set(val) {
            this._base.cacheInput('styleLg', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleXl", {
        set: function set(val) {
            this._base.cacheInput('styleXl', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleLtSm", {
        set: function set(val) {
            this._base.cacheInput('styleLtSm', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleLtMd", {
        set: function set(val) {
            this._base.cacheInput('styleLtMd', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleLtLg", {
        set: function set(val) {
            this._base.cacheInput('styleLtLg', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleLtXl", {
        set: function set(val) {
            this._base.cacheInput('styleLtXl', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleGtXs", {
        set: function set(val) {
            this._base.cacheInput('styleGtXs', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleGtSm", {
        set: function set(val) {
            this._base.cacheInput('styleGtSm', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleGtMd", {
        set: function set(val) {
            this._base.cacheInput('styleGtMd', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleGtLg", {
        set: function set(val) {
            this._base.cacheInput('styleGtLg', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleXs", {
        /** Deprecated selectors */
        set: function set(val) {
            this._base.cacheInput('styleXs', val, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StyleDirective.prototype, "styleSm", {
        set: function set(val) {
            this._base.cacheInput('styleSm', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleMd", {
        set: function set(val) {
            this._base.cacheInput('styleMd', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleLg", {
        set: function set(val) {
            this._base.cacheInput('styleLg', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleXl", {
        set: function set(val) {
            this._base.cacheInput('styleXl', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleLtSm", {
        set: function set(val) {
            this._base.cacheInput('styleLtSm', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleLtMd", {
        set: function set(val) {
            this._base.cacheInput('styleLtMd', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleLtLg", {
        set: function set(val) {
            this._base.cacheInput('styleLtLg', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleLtXl", {
        set: function set(val) {
            this._base.cacheInput('styleLtXl', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleGtXs", {
        set: function set(val) {
            this._base.cacheInput('styleGtXs', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleGtSm", {
        set: function set(val) {
            this._base.cacheInput('styleGtSm', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleGtMd", {
        set: function set(val) {
            this._base.cacheInput('styleGtMd', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleGtLg", {
        set: function set(val) {
            this._base.cacheInput('styleGtLg', val, true);
        },
        enumerable: true,
        configurable: true
    });
    ;
    // ******************************************************************
    // Lifecycle Hookks
    // ******************************************************************
    /**
     * For @Input changes on the current mq activation property
     */
    StyleDirective.prototype.ngOnChanges = function (changes) {
        if (this._base.activeKey in changes) {
            this._updateStyle();
        }
    };
    /**
     * For ChangeDetectionStrategy.onPush and ngOnChanges() updates
     */
    StyleDirective.prototype.ngDoCheck = function () {
        if (!this._base.hasMediaQueryListener) {
            this._configureMQListener();
        }
        _super.prototype.ngDoCheck.call(this);
    };
    StyleDirective.prototype.ngOnDestroy = function () {
        this._base.ngOnDestroy();
    };
    // ******************************************************************
    // Internal Methods
    // ******************************************************************
    /**
       * Build an mqActivation object that bridges
       * mql change events to onMediaQueryChange handlers
       */
    StyleDirective.prototype._configureMQListener = function () {
        var _this = this;
        this._base.listenForMediaQueryChanges('style', '', function (changes) {
            _this._updateStyle(changes.value);
            // trigger NgClass::_applyIterableChanges()
            _super.prototype.ngDoCheck.call(_this);
        });
    };
    // ************************************************************************
    // Private Internal Methods
    // ************************************************************************
    /**
     * Use the currently activated input property and assign to
     * `ngStyle` which does the style injections...
     */
    StyleDirective.prototype._updateStyle = function (value) {
        var style = value || this._base.queryInput("style") || '';
        if (this._base.mqActivation) {
            style = this._base.mqActivation.activatedInput;
        }
        // Delegate subsequent activity to the NgStyle logic
        this.ngStyle = style;
    };
    /**
     * Build MediaQuery Activation Adapter
     * This adapter manages listening to mediaQuery change events and identifying
     * which property value should be used for the style update
     */
    StyleDirective.prototype._buildAdapter = function (monitor, _ngEl, _renderer) {
        this._base = new _baseAdapter.BaseFxDirectiveAdapter('style', monitor, _ngEl, _renderer);
        this._buildCacheInterceptor();
    };
    /**
     * Build intercept to convert raw strings to ngStyleMap
     */
    StyleDirective.prototype._buildCacheInterceptor = function () {
        var _this = this;
        var cacheInput = this._base.cacheInput.bind(this._base);
        this._base.cacheInput = function (key, source, cacheRaw, merge) {
            if (cacheRaw === void 0) {
                cacheRaw = false;
            }
            if (merge === void 0) {
                merge = true;
            }
            var styles = _this._buildStyleMap(source);
            if (merge) {
                styles = (0, _objectExtend.extendObject)({}, _this._base.inputMap['style'], styles);
            }
            cacheInput(key, styles, cacheRaw);
        };
    };
    /**
     * Convert raw strings to ngStyleMap; which is required by ngStyle
     * NOTE: Raw string key-value pairs MUST be delimited by `;`
     *       Comma-delimiters are not supported due to complexities of
     *       possible style values such as `rgba(x,x,x,x)` and others
     */
    StyleDirective.prototype._buildStyleMap = function (styles) {
        var _this = this;
        var sanitizer = function sanitizer(val) {
            // Always safe-guard (aka sanitize) style property values
            return _this._sanitizer.sanitize(_core.SecurityContext.STYLE, val);
        };
        if (styles) {
            switch (_styleTransforms.ngStyleUtils.getType(styles)) {
                case 'string':
                    return _styleTransforms.ngStyleUtils.buildMapFromList(_styleTransforms.ngStyleUtils.buildRawList(styles), sanitizer);
                case 'array':
                    return _styleTransforms.ngStyleUtils.buildMapFromList(styles, sanitizer);
                case 'set':
                    return _styleTransforms.ngStyleUtils.buildMapFromSet(styles, sanitizer);
                default:
                    return _styleTransforms.ngStyleUtils.buildMapFromSet(styles, sanitizer);
            }
        }
        return styles;
    };
    return StyleDirective;
}(_common.NgStyle);
exports.StyleDirective = StyleDirective;

StyleDirective.decorators = [{ type: _core.Directive, args: [{
        selector: "\n    [style.xs], [style.sm], [style.md], [style.lg], [style.xl],\n    [style.lt-sm], [style.lt-md], [style.lt-lg], [style.lt-xl],\n    [style.gt-xs], [style.gt-sm], [style.gt-md], [style.gt-lg],\n    [ngStyle],\n    [ngStyle.xs], [ngStyle.sm], [ngStyle.lg], [ngStyle.xl],\n    [ngStyle.lt-sm], [ngStyle.lt-md], [ngStyle.lt-lg], [ngStyle.lt-xl],\n    [ngStyle.gt-xs], [ngStyle.gt-sm], [ngStyle.gt-md], [ngStyle.gt-lg]\n  "
    }] }];
/** @nocollapse */
StyleDirective.ctorParameters = function () {
    return [{ type: _mediaMonitor.MediaMonitor }, { type: _breakPointRegistry.BreakPointRegistry }, { type: _platformBrowser.DomSanitizer }, { type: _core.KeyValueDiffers }, { type: _core.ElementRef }, { type: _core.Renderer }, { type: _core.Renderer2 }];
};
StyleDirective.propDecorators = {
    'styleBase': [{ type: _core.Input, args: ['ngStyle'] }],
    'ngStyleXs': [{ type: _core.Input, args: ['ngStyle.xs'] }],
    'ngStyleSm': [{ type: _core.Input, args: ['ngStyle.sm'] }],
    'ngStyleMd': [{ type: _core.Input, args: ['ngStyle.md'] }],
    'ngStyleLg': [{ type: _core.Input, args: ['ngStyle.lg'] }],
    'ngStyleXl': [{ type: _core.Input, args: ['ngStyle.xl'] }],
    'ngStyleLtSm': [{ type: _core.Input, args: ['ngStyle.lt-sm'] }],
    'ngStyleLtMd': [{ type: _core.Input, args: ['ngStyle.lt-md'] }],
    'ngStyleLtLg': [{ type: _core.Input, args: ['ngStyle.lt-lg'] }],
    'ngStyleLtXl': [{ type: _core.Input, args: ['ngStyle.lt-xl'] }],
    'ngStyleGtXs': [{ type: _core.Input, args: ['ngStyle.gt-xs'] }],
    'ngStyleGtSm': [{ type: _core.Input, args: ['ngStyle.gt-sm'] }],
    'ngStyleGtMd': [{ type: _core.Input, args: ['ngStyle.gt-md'] }],
    'ngStyleGtLg': [{ type: _core.Input, args: ['ngStyle.gt-lg'] }],
    'styleXs': [{ type: _core.Input, args: ['style.xs'] }],
    'styleSm': [{ type: _core.Input, args: ['style.sm'] }],
    'styleMd': [{ type: _core.Input, args: ['style.md'] }],
    'styleLg': [{ type: _core.Input, args: ['style.lg'] }],
    'styleXl': [{ type: _core.Input, args: ['style.xl'] }],
    'styleLtSm': [{ type: _core.Input, args: ['style.lt-sm'] }],
    'styleLtMd': [{ type: _core.Input, args: ['style.lt-md'] }],
    'styleLtLg': [{ type: _core.Input, args: ['style.lt-lg'] }],
    'styleLtXl': [{ type: _core.Input, args: ['style.lt-xl'] }],
    'styleGtXs': [{ type: _core.Input, args: ['style.gt-xs'] }],
    'styleGtSm': [{ type: _core.Input, args: ['style.gt-sm'] }],
    'styleGtMd': [{ type: _core.Input, args: ['style.gt-md'] }],
    'styleGtLg': [{ type: _core.Input, args: ['style.gt-lg'] }]
};
//# sourceMappingURL=style.js.map

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = __webpack_require__(23);

Object.keys(_base).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _base[key];
    }
  });
});

var _baseAdapter = __webpack_require__(103);

Object.keys(_baseAdapter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _baseAdapter[key];
    }
  });
});

var _responsiveActivation = __webpack_require__(140);

Object.keys(_responsiveActivation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _responsiveActivation[key];
    }
  });
});

var _module = __webpack_require__(239);

Object.keys(_module).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _module[key];
    }
  });
});

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(250);

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});

var _index2 = __webpack_require__(252);

Object.keys(_index2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index2[key];
    }
  });
});

var _index3 = __webpack_require__(253);

Object.keys(_index3).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index3[key];
    }
  });
});

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _breakPoints = __webpack_require__(142);

Object.keys(_breakPoints).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _breakPoints[key];
    }
  });
});

var _orientationBreakPoints = __webpack_require__(143);

Object.keys(_orientationBreakPoints).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _orientationBreakPoints[key];
    }
  });
});

var _breakPointsToken = __webpack_require__(105);

Object.keys(_breakPointsToken).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _breakPointsToken[key];
    }
  });
});

var _breakPointRegistry = __webpack_require__(51);

Object.keys(_breakPointRegistry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _breakPointRegistry[key];
    }
  });
});

var _observableMedia = __webpack_require__(146);

Object.keys(_observableMedia).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _observableMedia[key];
    }
  });
});

var _matchMedia = __webpack_require__(59);

Object.keys(_matchMedia).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _matchMedia[key];
    }
  });
});

var _mediaChange = __webpack_require__(144);

Object.keys(_mediaChange).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mediaChange[key];
    }
  });
});

var _mediaMonitor = __webpack_require__(18);

Object.keys(_mediaMonitor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mediaMonitor[key];
    }
  });
});

var _breakPointsProvider = __webpack_require__(104);

Object.keys(_breakPointsProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _breakPointsProvider[key];
    }
  });
});

var _observableMediaProvider = __webpack_require__(106);

Object.keys(_observableMediaProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _observableMediaProvider[key];
    }
  });
});

var _mediaMonitorProvider = __webpack_require__(145);

Object.keys(_mediaMonitorProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mediaMonitorProvider[key];
    }
  });
});

var _module = __webpack_require__(141);

Object.keys(_module).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _module[key];
    }
  });
});

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _addAlias = __webpack_require__(107);

Object.keys(_addAlias).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _addAlias[key];
    }
  });
});

var _autoPrefixer = __webpack_require__(147);

Object.keys(_autoPrefixer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _autoPrefixer[key];
    }
  });
});

var _basisValidator = __webpack_require__(148);

Object.keys(_basisValidator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _basisValidator[key];
    }
  });
});

var _layoutValidator = __webpack_require__(60);

Object.keys(_layoutValidator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _layoutValidator[key];
    }
  });
});

var _breakpointTools = __webpack_require__(149);

Object.keys(_breakpointTools).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _breakpointTools[key];
    }
  });
});

var _objectExtend = __webpack_require__(42);

Object.keys(_objectExtend).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _objectExtend[key];
    }
  });
});

var _styleTransforms = __webpack_require__(150);

Object.keys(_styleTransforms).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _styleTransforms[key];
    }
  });
});

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ɵd = exports.ɵc = exports.ɵb = exports.ɵf = exports.ɵa = exports.ɵg = exports.VERSION = exports.URLSearchParams = exports.QueryEncoder = exports.Response = exports.Request = exports.XSRFStrategy = exports.ConnectionBackend = exports.Connection = exports.JsonpModule = exports.HttpModule = exports.Jsonp = exports.Http = exports.Headers = exports.ResponseType = exports.ResponseContentType = exports.RequestMethod = exports.ReadyState = exports.ResponseOptions = exports.BaseResponseOptions = exports.RequestOptions = exports.BaseRequestOptions = exports.XHRConnection = exports.XHRBackend = exports.CookieXSRFStrategy = exports.JSONPConnection = exports.JSONPBackend = exports.BrowserXhr = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = __webpack_require__(3);

var _Observable = __webpack_require__(0);

var _platformBrowser = __webpack_require__(49);

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @license Angular v4.1.3
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A backend for http that uses the `XMLHttpRequest` browser API.
 *
 * Take care not to evaluate this in non-browser contexts.
 *
 * \@experimental
 */
var BrowserXhr = function () {
    function BrowserXhr() {}
    /**
     * @return {?}
     */
    BrowserXhr.prototype.build = function () {
        return new XMLHttpRequest();
    };
    return BrowserXhr;
}();
BrowserXhr.decorators = [{ type: _core.Injectable }];
/**
 * @nocollapse
 */
BrowserXhr.ctorParameters = function () {
    return [];
};
var RequestMethod = {};
RequestMethod.Get = 0;
RequestMethod.Post = 1;
RequestMethod.Put = 2;
RequestMethod.Delete = 3;
RequestMethod.Options = 4;
RequestMethod.Head = 5;
RequestMethod.Patch = 6;
RequestMethod[RequestMethod.Get] = "Get";
RequestMethod[RequestMethod.Post] = "Post";
RequestMethod[RequestMethod.Put] = "Put";
RequestMethod[RequestMethod.Delete] = "Delete";
RequestMethod[RequestMethod.Options] = "Options";
RequestMethod[RequestMethod.Head] = "Head";
RequestMethod[RequestMethod.Patch] = "Patch";
var ReadyState = {};
ReadyState.Unsent = 0;
ReadyState.Open = 1;
ReadyState.HeadersReceived = 2;
ReadyState.Loading = 3;
ReadyState.Done = 4;
ReadyState.Cancelled = 5;
ReadyState[ReadyState.Unsent] = "Unsent";
ReadyState[ReadyState.Open] = "Open";
ReadyState[ReadyState.HeadersReceived] = "HeadersReceived";
ReadyState[ReadyState.Loading] = "Loading";
ReadyState[ReadyState.Done] = "Done";
ReadyState[ReadyState.Cancelled] = "Cancelled";
var ResponseType = {};
ResponseType.Basic = 0;
ResponseType.Cors = 1;
ResponseType.Default = 2;
ResponseType.Error = 3;
ResponseType.Opaque = 4;
ResponseType[ResponseType.Basic] = "Basic";
ResponseType[ResponseType.Cors] = "Cors";
ResponseType[ResponseType.Default] = "Default";
ResponseType[ResponseType.Error] = "Error";
ResponseType[ResponseType.Opaque] = "Opaque";
var ContentType = {};
ContentType.NONE = 0;
ContentType.JSON = 1;
ContentType.FORM = 2;
ContentType.FORM_DATA = 3;
ContentType.TEXT = 4;
ContentType.BLOB = 5;
ContentType.ARRAY_BUFFER = 6;
ContentType[ContentType.NONE] = "NONE";
ContentType[ContentType.JSON] = "JSON";
ContentType[ContentType.FORM] = "FORM";
ContentType[ContentType.FORM_DATA] = "FORM_DATA";
ContentType[ContentType.TEXT] = "TEXT";
ContentType[ContentType.BLOB] = "BLOB";
ContentType[ContentType.ARRAY_BUFFER] = "ARRAY_BUFFER";
var ResponseContentType = {};
ResponseContentType.Text = 0;
ResponseContentType.Json = 1;
ResponseContentType.ArrayBuffer = 2;
ResponseContentType.Blob = 3;
ResponseContentType[ResponseContentType.Text] = "Text";
ResponseContentType[ResponseContentType.Json] = "Json";
ResponseContentType[ResponseContentType.ArrayBuffer] = "ArrayBuffer";
ResponseContentType[ResponseContentType.Blob] = "Blob";
/**
 * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
 * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
 *
 * The only known difference between this `Headers` implementation and the spec is the
 * lack of an `entries` method.
 *
 * ### Example
 *
 * ```
 * import {Headers} from '\@angular/http';
 *
 * var firstHeaders = new Headers();
 * firstHeaders.append('Content-Type', 'image/jpeg');
 * console.log(firstHeaders.get('Content-Type')) //'image/jpeg'
 *
 * // Create headers from Plain Old JavaScript Object
 * var secondHeaders = new Headers({
 *   'X-My-Custom-Header': 'Angular'
 * });
 * console.log(secondHeaders.get('X-My-Custom-Header')); //'Angular'
 *
 * var thirdHeaders = new Headers(secondHeaders);
 * console.log(thirdHeaders.get('X-My-Custom-Header')); //'Angular'
 * ```
 *
 * \@experimental
 */
var Headers = function () {
    /**
     * @param {?=} headers
     */
    function Headers(headers) {
        var _this = this;
        /**
         * \@internal header names are lower case
         */
        this._headers = new Map();
        /**
         * \@internal map lower case names to actual names
         */
        this._normalizedNames = new Map();
        if (!headers) {
            return;
        }
        if (headers instanceof Headers) {
            headers.forEach(function (values, name) {
                values.forEach(function (value) {
                    return _this.append(name, value);
                });
            });
            return;
        }
        Object.keys(headers).forEach(function (name) {
            var values = Array.isArray(headers[name]) ? headers[name] : [headers[name]];
            _this.delete(name);
            values.forEach(function (value) {
                return _this.append(name, value);
            });
        });
    }
    /**
     * Returns a new Headers instance from the given DOMString of Response Headers
     * @param {?} headersString
     * @return {?}
     */
    Headers.fromResponseHeaderString = function (headersString) {
        var /** @type {?} */headers = new Headers();
        headersString.split('\n').forEach(function (line) {
            var /** @type {?} */index = line.indexOf(':');
            if (index > 0) {
                var /** @type {?} */name = line.slice(0, index);
                var /** @type {?} */value = line.slice(index + 1).trim();
                headers.set(name, value);
            }
        });
        return headers;
    };
    /**
     * Appends a header to existing list of header values for a given header name.
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    Headers.prototype.append = function (name, value) {
        var /** @type {?} */values = this.getAll(name);
        if (values === null) {
            this.set(name, value);
        } else {
            values.push(value);
        }
    };
    /**
     * Deletes all header values for the given name.
     * @param {?} name
     * @return {?}
     */
    Headers.prototype.delete = function (name) {
        var /** @type {?} */lcName = name.toLowerCase();
        this._normalizedNames.delete(lcName);
        this._headers.delete(lcName);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Headers.prototype.forEach = function (fn) {
        var _this = this;
        this._headers.forEach(function (values, lcName) {
            return fn(values, _this._normalizedNames.get(lcName), _this._headers);
        });
    };
    /**
     * Returns first header that matches given name.
     * @param {?} name
     * @return {?}
     */
    Headers.prototype.get = function (name) {
        var /** @type {?} */values = this.getAll(name);
        if (values === null) {
            return null;
        }
        return values.length > 0 ? values[0] : null;
    };
    /**
     * Checks for existence of header by given name.
     * @param {?} name
     * @return {?}
     */
    Headers.prototype.has = function (name) {
        return this._headers.has(name.toLowerCase());
    };
    /**
     * Returns the names of the headers
     * @return {?}
     */
    Headers.prototype.keys = function () {
        return Array.from(this._normalizedNames.values());
    };
    /**
     * Sets or overrides header value for given name.
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    Headers.prototype.set = function (name, value) {
        if (Array.isArray(value)) {
            if (value.length) {
                this._headers.set(name.toLowerCase(), [value.join(',')]);
            }
        } else {
            this._headers.set(name.toLowerCase(), [value]);
        }
        this.mayBeSetNormalizedName(name);
    };
    /**
     * Returns values of all headers.
     * @return {?}
     */
    Headers.prototype.values = function () {
        return Array.from(this._headers.values());
    };
    /**
     * @return {?}
     */
    Headers.prototype.toJSON = function () {
        var _this = this;
        var /** @type {?} */serialized = {};
        this._headers.forEach(function (values, name) {
            var /** @type {?} */split = [];
            values.forEach(function (v) {
                return split.push.apply(split, v.split(','));
            });
            serialized[_this._normalizedNames.get(name)] = split;
        });
        return serialized;
    };
    /**
     * Returns list of header values for a given name.
     * @param {?} name
     * @return {?}
     */
    Headers.prototype.getAll = function (name) {
        return this.has(name) ? this._headers.get(name.toLowerCase()) || null : null;
    };
    /**
     * This method is not implemented.
     * @return {?}
     */
    Headers.prototype.entries = function () {
        throw new Error('"entries" method is not implemented on Headers class');
    };
    /**
     * @param {?} name
     * @return {?}
     */
    Headers.prototype.mayBeSetNormalizedName = function (name) {
        var /** @type {?} */lcName = name.toLowerCase();
        if (!this._normalizedNames.has(lcName)) {
            this._normalizedNames.set(lcName, name);
        }
    };
    return Headers;
}();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Creates a response options object to be optionally provided when instantiating a
 * {\@link Response}.
 *
 * This class is based on the `ResponseInit` description in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#responseinit).
 *
 * All values are null by default. Typical defaults can be found in the
 * {\@link BaseResponseOptions} class, which sub-classes `ResponseOptions`.
 *
 * This class may be used in tests to build {\@link Response Responses} for
 * mock responses (see {\@link MockBackend}).
 *
 * ### Example ([live demo](http://plnkr.co/edit/P9Jkk8e8cz6NVzbcxEsD?p=preview))
 *
 * ```typescript
 * import {ResponseOptions, Response} from '\@angular/http';
 *
 * var options = new ResponseOptions({
 *   body: '{"name":"Jeff"}'
 * });
 * var res = new Response(options);
 *
 * console.log('res.json():', res.json()); // Object {name: "Jeff"}
 * ```
 *
 * \@experimental
 */
var ResponseOptions = function () {
    /**
     * @param {?=} __0
     */
    function ResponseOptions(_a) {
        var _b = _a === void 0 ? {} : _a,
            body = _b.body,
            status = _b.status,
            headers = _b.headers,
            statusText = _b.statusText,
            type = _b.type,
            url = _b.url;
        this.body = body != null ? body : null;
        this.status = status != null ? status : null;
        this.headers = headers != null ? headers : null;
        this.statusText = statusText != null ? statusText : null;
        this.type = type != null ? type : null;
        this.url = url != null ? url : null;
    }
    /**
     * Creates a copy of the `ResponseOptions` instance, using the optional input as values to
     * override
     * existing values. This method will not change the values of the instance on which it is being
     * called.
     *
     * This may be useful when sharing a base `ResponseOptions` object inside tests,
     * where certain properties may change from test to test.
     *
     * ### Example ([live demo](http://plnkr.co/edit/1lXquqFfgduTFBWjNoRE?p=preview))
     *
     * ```typescript
     * import {ResponseOptions, Response} from '\@angular/http';
     *
     * var options = new ResponseOptions({
     *   body: {name: 'Jeff'}
     * });
     * var res = new Response(options.merge({
     *   url: 'https://google.com'
     * }));
     * console.log('options.url:', options.url); // null
     * console.log('res.json():', res.json()); // Object {name: "Jeff"}
     * console.log('res.url:', res.url); // https://google.com
     * ```
     * @param {?=} options
     * @return {?}
     */
    ResponseOptions.prototype.merge = function (options) {
        return new ResponseOptions({
            body: options && options.body != null ? options.body : this.body,
            status: options && options.status != null ? options.status : this.status,
            headers: options && options.headers != null ? options.headers : this.headers,
            statusText: options && options.statusText != null ? options.statusText : this.statusText,
            type: options && options.type != null ? options.type : this.type,
            url: options && options.url != null ? options.url : this.url
        });
    };
    return ResponseOptions;
}();
/**
 * Subclass of {\@link ResponseOptions}, with default values.
 *
 * Default values:
 *  * status: 200
 *  * headers: empty {\@link Headers} object
 *
 * This class could be extended and bound to the {\@link ResponseOptions} class
 * when configuring an {\@link Injector}, in order to override the default options
 * used by {\@link Http} to create {\@link Response Responses}.
 *
 * ### Example ([live demo](http://plnkr.co/edit/qv8DLT?p=preview))
 *
 * ```typescript
 * import {provide} from '\@angular/core';
 * import {bootstrap} from '\@angular/platform-browser/browser';
 * import {HTTP_PROVIDERS, Headers, Http, BaseResponseOptions, ResponseOptions} from
 * '\@angular/http';
 * import {App} from './myapp';
 *
 * class MyOptions extends BaseResponseOptions {
 *   headers:Headers = new Headers({network: 'github'});
 * }
 *
 * bootstrap(App, [HTTP_PROVIDERS, {provide: ResponseOptions, useClass: MyOptions}]);
 * ```
 *
 * The options could also be extended when manually creating a {\@link Response}
 * object.
 *
 * ### Example ([live demo](http://plnkr.co/edit/VngosOWiaExEtbstDoix?p=preview))
 *
 * ```
 * import {BaseResponseOptions, Response} from '\@angular/http';
 *
 * var options = new BaseResponseOptions();
 * var res = new Response(options.merge({
 *   body: 'Angular',
 *   headers: new Headers({framework: 'angular'})
 * }));
 * console.log('res.headers.get("framework"):', res.headers.get('framework')); // angular
 * console.log('res.text():', res.text()); // Angular;
 * ```
 *
 * \@experimental
 */
var BaseResponseOptions = function (_super) {
    __extends(BaseResponseOptions, _super);
    function BaseResponseOptions() {
        return _super.call(this, { status: 200, statusText: 'Ok', type: ResponseType.Default, headers: new Headers() }) || this;
    }
    return BaseResponseOptions;
}(ResponseOptions);
BaseResponseOptions.decorators = [{ type: _core.Injectable }];
/**
 * @nocollapse
 */
BaseResponseOptions.ctorParameters = function () {
    return [];
};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Abstract class from which real backends are derived.
 *
 * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
 * {\@link Request}.
 *
 * \@experimental
 * @abstract
 */
var ConnectionBackend = function () {
    function ConnectionBackend() {}
    /**
     * @abstract
     * @param {?} request
     * @return {?}
     */
    ConnectionBackend.prototype.createConnection = function (request) {};
    return ConnectionBackend;
}();
/**
 * Abstract class from which real connections are derived.
 *
 * \@experimental
 * @abstract
 */
var Connection = function () {
    function Connection() {}
    return Connection;
}();
/**
 * An XSRFStrategy configures XSRF protection (e.g. via headers) on an HTTP request.
 *
 * \@experimental
 * @abstract
 */
var XSRFStrategy = function () {
    function XSRFStrategy() {}
    /**
     * @abstract
     * @param {?} req
     * @return {?}
     */
    XSRFStrategy.prototype.configureRequest = function (req) {};
    return XSRFStrategy;
}();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} method
 * @return {?}
 */
function normalizeMethodName(method) {
    if (typeof method !== 'string') return method;
    switch (method.toUpperCase()) {
        case 'GET':
            return RequestMethod.Get;
        case 'POST':
            return RequestMethod.Post;
        case 'PUT':
            return RequestMethod.Put;
        case 'DELETE':
            return RequestMethod.Delete;
        case 'OPTIONS':
            return RequestMethod.Options;
        case 'HEAD':
            return RequestMethod.Head;
        case 'PATCH':
            return RequestMethod.Patch;
    }
    throw new Error("Invalid request method. The method \"" + method + "\" is not supported.");
}
var isSuccess = function isSuccess(status) {
    return status >= 200 && status < 300;
};
/**
 * @param {?} xhr
 * @return {?}
 */
function getResponseURL(xhr) {
    if ('responseURL' in xhr) {
        return xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader('X-Request-URL');
    }
    return null;
}
/**
 * @param {?} input
 * @return {?}
 */
/**
 * @param {?} input
 * @return {?}
 */
function stringToArrayBuffer(input) {
    var /** @type {?} */view = new Uint16Array(input.length);
    for (var /** @type {?} */i = 0, /** @type {?} */strLen = input.length; i < strLen; i++) {
        view[i] = input.charCodeAt(i);
    }
    return view.buffer;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 * @param {?=} rawParams
 * @return {?}
 */
function paramParser(rawParams) {
    if (rawParams === void 0) {
        rawParams = '';
    }
    var /** @type {?} */map = new Map();
    if (rawParams.length > 0) {
        var /** @type {?} */params = rawParams.split('&');
        params.forEach(function (param) {
            var /** @type {?} */eqIdx = param.indexOf('=');
            var _a = eqIdx == -1 ? [param, ''] : [param.slice(0, eqIdx), param.slice(eqIdx + 1)],
                key = _a[0],
                val = _a[1];
            var /** @type {?} */list = map.get(key) || [];
            list.push(val);
            map.set(key, list);
        });
    }
    return map;
}
/**
 * \@experimental
 *
 */
var QueryEncoder = function () {
    function QueryEncoder() {}
    /**
     * @param {?} k
     * @return {?}
     */
    QueryEncoder.prototype.encodeKey = function (k) {
        return standardEncoding(k);
    };
    /**
     * @param {?} v
     * @return {?}
     */
    QueryEncoder.prototype.encodeValue = function (v) {
        return standardEncoding(v);
    };
    return QueryEncoder;
}();
/**
 * @param {?} v
 * @return {?}
 */
function standardEncoding(v) {
    return encodeURIComponent(v).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/gi, '$').replace(/%2C/gi, ',').replace(/%3B/gi, ';').replace(/%2B/gi, '+').replace(/%3D/gi, '=').replace(/%3F/gi, '?').replace(/%2F/gi, '/');
}
/**
 * Map-like representation of url search parameters, based on
 * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard,
 * with several extensions for merging URLSearchParams objects:
 *   - setAll()
 *   - appendAll()
 *   - replaceAll()
 *
 * This class accepts an optional second parameter of ${\@link QueryEncoder},
 * which is used to serialize parameters before making a request. By default,
 * `QueryEncoder` encodes keys and values of parameters using `encodeURIComponent`,
 * and then un-encodes certain characters that are allowed to be part of the query
 * according to IETF RFC 3986: https://tools.ietf.org/html/rfc3986.
 *
 * These are the characters that are not encoded: `! $ \' ( ) * + , ; A 9 - . _ ~ ? /`
 *
 * If the set of allowed query characters is not acceptable for a particular backend,
 * `QueryEncoder` can be subclassed and provided as the 2nd argument to URLSearchParams.
 *
 * ```
 * import {URLSearchParams, QueryEncoder} from '\@angular/http';
 * class MyQueryEncoder extends QueryEncoder {
 *   encodeKey(k: string): string {
 *     return myEncodingFunction(k);
 *   }
 *
 *   encodeValue(v: string): string {
 *     return myEncodingFunction(v);
 *   }
 * }
 *
 * let params = new URLSearchParams('', new MyQueryEncoder());
 * ```
 * \@experimental
 */
var URLSearchParams = function () {
    /**
     * @param {?=} rawParams
     * @param {?=} queryEncoder
     */
    function URLSearchParams(rawParams, queryEncoder) {
        if (rawParams === void 0) {
            rawParams = '';
        }
        if (queryEncoder === void 0) {
            queryEncoder = new QueryEncoder();
        }
        this.rawParams = rawParams;
        this.queryEncoder = queryEncoder;
        this.paramsMap = paramParser(rawParams);
    }
    /**
     * @return {?}
     */
    URLSearchParams.prototype.clone = function () {
        var /** @type {?} */clone = new URLSearchParams('', this.queryEncoder);
        clone.appendAll(this);
        return clone;
    };
    /**
     * @param {?} param
     * @return {?}
     */
    URLSearchParams.prototype.has = function (param) {
        return this.paramsMap.has(param);
    };
    /**
     * @param {?} param
     * @return {?}
     */
    URLSearchParams.prototype.get = function (param) {
        var /** @type {?} */storedParam = this.paramsMap.get(param);
        return Array.isArray(storedParam) ? storedParam[0] : null;
    };
    /**
     * @param {?} param
     * @return {?}
     */
    URLSearchParams.prototype.getAll = function (param) {
        return this.paramsMap.get(param) || [];
    };
    /**
     * @param {?} param
     * @param {?} val
     * @return {?}
     */
    URLSearchParams.prototype.set = function (param, val) {
        if (val === void 0 || val === null) {
            this.delete(param);
            return;
        }
        var /** @type {?} */list = this.paramsMap.get(param) || [];
        list.length = 0;
        list.push(val);
        this.paramsMap.set(param, list);
    };
    /**
     * @param {?} searchParams
     * @return {?}
     */
    URLSearchParams.prototype.setAll = function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var /** @type {?} */list = _this.paramsMap.get(param) || [];
            list.length = 0;
            list.push(value[0]);
            _this.paramsMap.set(param, list);
        });
    };
    /**
     * @param {?} param
     * @param {?} val
     * @return {?}
     */
    URLSearchParams.prototype.append = function (param, val) {
        if (val === void 0 || val === null) return;
        var /** @type {?} */list = this.paramsMap.get(param) || [];
        list.push(val);
        this.paramsMap.set(param, list);
    };
    /**
     * @param {?} searchParams
     * @return {?}
     */
    URLSearchParams.prototype.appendAll = function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var /** @type {?} */list = _this.paramsMap.get(param) || [];
            for (var /** @type {?} */i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            _this.paramsMap.set(param, list);
        });
    };
    /**
     * @param {?} searchParams
     * @return {?}
     */
    URLSearchParams.prototype.replaceAll = function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var /** @type {?} */list = _this.paramsMap.get(param) || [];
            list.length = 0;
            for (var /** @type {?} */i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            _this.paramsMap.set(param, list);
        });
    };
    /**
     * @return {?}
     */
    URLSearchParams.prototype.toString = function () {
        var _this = this;
        var /** @type {?} */paramsList = [];
        this.paramsMap.forEach(function (values, k) {
            values.forEach(function (v) {
                return paramsList.push(_this.queryEncoder.encodeKey(k) + '=' + _this.queryEncoder.encodeValue(v));
            });
        });
        return paramsList.join('&');
    };
    /**
     * @param {?} param
     * @return {?}
     */
    URLSearchParams.prototype.delete = function (param) {
        this.paramsMap.delete(param);
    };
    return URLSearchParams;
}();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * HTTP request body used by both {\@link Request} and {\@link Response}
 * https://fetch.spec.whatwg.org/#body
 * @abstract
 */
var Body = function () {
    function Body() {}
    /**
     * Attempts to return body as parsed `JSON` object, or raises an exception.
     * @return {?}
     */
    Body.prototype.json = function () {
        if (typeof this._body === 'string') {
            return JSON.parse( /** @type {?} */this._body);
        }
        if (this._body instanceof ArrayBuffer) {
            return JSON.parse(this.text());
        }
        return this._body;
    };
    /**
     * Returns the body as a string, presuming `toString()` can be called on the response body.
     *
     * When decoding an `ArrayBuffer`, the optional `encodingHint` parameter determines how the
     * bytes in the buffer will be interpreted. Valid values are:
     *
     * - `legacy` - incorrectly interpret the bytes as UTF-16 (technically, UCS-2). Only characters
     *   in the Basic Multilingual Plane are supported, surrogate pairs are not handled correctly.
     *   In addition, the endianness of the 16-bit octet pairs in the `ArrayBuffer` is not taken
     *   into consideration. This is the default behavior to avoid breaking apps, but should be
     *   considered deprecated.
     *
     * - `iso-8859` - interpret the bytes as ISO-8859 (which can be used for ASCII encoded text).
     * @param {?=} encodingHint
     * @return {?}
     */
    Body.prototype.text = function (encodingHint) {
        if (encodingHint === void 0) {
            encodingHint = 'legacy';
        }
        if (this._body instanceof URLSearchParams) {
            return this._body.toString();
        }
        if (this._body instanceof ArrayBuffer) {
            switch (encodingHint) {
                case 'legacy':
                    return String.fromCharCode.apply(null, new Uint16Array( /** @type {?} */this._body));
                case 'iso-8859':
                    return String.fromCharCode.apply(null, new Uint8Array( /** @type {?} */this._body));
                default:
                    throw new Error("Invalid value for encodingHint: " + encodingHint);
            }
        }
        if (this._body == null) {
            return '';
        }
        if (_typeof(this._body) === 'object') {
            return JSON.stringify(this._body, null, 2);
        }
        return this._body.toString();
    };
    /**
     * Return the body as an ArrayBuffer
     * @return {?}
     */
    Body.prototype.arrayBuffer = function () {
        if (this._body instanceof ArrayBuffer) {
            return this._body;
        }
        return stringToArrayBuffer(this.text());
    };
    /**
     * Returns the request's body as a Blob, assuming that body exists.
     * @return {?}
     */
    Body.prototype.blob = function () {
        if (this._body instanceof Blob) {
            return this._body;
        }
        if (this._body instanceof ArrayBuffer) {
            return new Blob([this._body]);
        }
        throw new Error('The request body isn\'t either a blob or an array buffer');
    };
    return Body;
}();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Creates `Response` instances from provided values.
 *
 * Though this object isn't
 * usually instantiated by end-users, it is the primary object interacted with when it comes time to
 * add data to a view.
 *
 * ### Example
 *
 * ```
 * http.request('my-friends.txt').subscribe(response => this.friends = response.text());
 * ```
 *
 * The Response's interface is inspired by the Response constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#response-class), but is considered a static value whose body
 * can be accessed many times. There are other differences in the implementation, but this is the
 * most significant.
 *
 * \@experimental
 */
var Response = function (_super) {
    __extends(Response, _super);
    /**
     * @param {?} responseOptions
     */
    function Response(responseOptions) {
        var _this = _super.call(this) || this;
        _this._body = responseOptions.body;
        _this.status = responseOptions.status;
        _this.ok = _this.status >= 200 && _this.status <= 299;
        _this.statusText = responseOptions.statusText;
        _this.headers = responseOptions.headers;
        _this.type = responseOptions.type;
        _this.url = responseOptions.url;
        return _this;
    }
    /**
     * @return {?}
     */
    Response.prototype.toString = function () {
        return "Response with status: " + this.status + " " + this.statusText + " for URL: " + this.url;
    };
    return Response;
}(Body);
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _nextRequestId = 0;
var JSONP_HOME = '__ng_jsonp__';
var _jsonpConnections = null;
/**
 * @return {?}
 */
function _getJsonpConnections() {
    var /** @type {?} */w = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' ? window : {};
    if (_jsonpConnections === null) {
        _jsonpConnections = w[JSONP_HOME] = {};
    }
    return _jsonpConnections;
}
var BrowserJsonp = function () {
    function BrowserJsonp() {}
    /**
     * @param {?} url
     * @return {?}
     */
    BrowserJsonp.prototype.build = function (url) {
        var /** @type {?} */node = document.createElement('script');
        node.src = url;
        return node;
    };
    /**
     * @return {?}
     */
    BrowserJsonp.prototype.nextRequestID = function () {
        return "__req" + _nextRequestId++;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    BrowserJsonp.prototype.requestCallback = function (id) {
        return JSONP_HOME + "." + id + ".finished";
    };
    /**
     * @param {?} id
     * @param {?} connection
     * @return {?}
     */
    BrowserJsonp.prototype.exposeConnection = function (id, connection) {
        var /** @type {?} */connections = _getJsonpConnections();
        connections[id] = connection;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    BrowserJsonp.prototype.removeConnection = function (id) {
        var /** @type {?} */connections = _getJsonpConnections();
        connections[id] = null;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    BrowserJsonp.prototype.send = function (node) {
        document.body.appendChild( /** @type {?} */node);
    };
    /**
     * @param {?} node
     * @return {?}
     */
    BrowserJsonp.prototype.cleanup = function (node) {
        if (node.parentNode) {
            node.parentNode.removeChild( /** @type {?} */node);
        }
    };
    return BrowserJsonp;
}();
BrowserJsonp.decorators = [{ type: _core.Injectable }];
/**
 * @nocollapse
 */
BrowserJsonp.ctorParameters = function () {
    return [];
};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
var JSONP_ERR_WRONG_METHOD = 'JSONP requests must use GET request method.';
/**
 * Abstract base class for an in-flight JSONP request.
 *
 * \@experimental
 * @abstract
 */
var JSONPConnection = function () {
    function JSONPConnection() {}
    /**
     * Callback called when the JSONP request completes, to notify the application
     * of the new data.
     * @abstract
     * @param {?=} data
     * @return {?}
     */
    JSONPConnection.prototype.finished = function (data) {};
    return JSONPConnection;
}();
var JSONPConnection_ = function (_super) {
    __extends(JSONPConnection_, _super);
    /**
     * @param {?} req
     * @param {?} _dom
     * @param {?=} baseResponseOptions
     */
    function JSONPConnection_(req, _dom, baseResponseOptions) {
        var _this = _super.call(this) || this;
        _this._dom = _dom;
        _this.baseResponseOptions = baseResponseOptions;
        _this._finished = false;
        if (req.method !== RequestMethod.Get) {
            throw new TypeError(JSONP_ERR_WRONG_METHOD);
        }
        _this.request = req;
        _this.response = new _Observable.Observable(function (responseObserver) {
            _this.readyState = ReadyState.Loading;
            var id = _this._id = _dom.nextRequestID();
            _dom.exposeConnection(id, _this);
            // Workaround Dart
            // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
            var callback = _dom.requestCallback(_this._id);
            var url = req.url;
            if (url.indexOf('=JSONP_CALLBACK&') > -1) {
                url = url.replace('=JSONP_CALLBACK&', "=" + callback + "&");
            } else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
                url = url.substring(0, url.length - '=JSONP_CALLBACK'.length) + ("=" + callback);
            }
            var script = _this._script = _dom.build(url);
            var onLoad = function onLoad(event) {
                if (_this.readyState === ReadyState.Cancelled) return;
                _this.readyState = ReadyState.Done;
                _dom.cleanup(script);
                if (!_this._finished) {
                    var responseOptions_1 = new ResponseOptions({ body: JSONP_ERR_NO_CALLBACK, type: ResponseType.Error, url: url });
                    if (baseResponseOptions) {
                        responseOptions_1 = baseResponseOptions.merge(responseOptions_1);
                    }
                    responseObserver.error(new Response(responseOptions_1));
                    return;
                }
                var responseOptions = new ResponseOptions({ body: _this._responseData, url: url });
                if (_this.baseResponseOptions) {
                    responseOptions = _this.baseResponseOptions.merge(responseOptions);
                }
                responseObserver.next(new Response(responseOptions));
                responseObserver.complete();
            };
            var onError = function onError(error) {
                if (_this.readyState === ReadyState.Cancelled) return;
                _this.readyState = ReadyState.Done;
                _dom.cleanup(script);
                var responseOptions = new ResponseOptions({ body: error.message, type: ResponseType.Error });
                if (baseResponseOptions) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new Response(responseOptions));
            };
            script.addEventListener('load', onLoad);
            script.addEventListener('error', onError);
            _dom.send(script);
            return function () {
                _this.readyState = ReadyState.Cancelled;
                script.removeEventListener('load', onLoad);
                script.removeEventListener('error', onError);
                _this._dom.cleanup(script);
            };
        });
        return _this;
    }
    /**
     * @param {?=} data
     * @return {?}
     */
    JSONPConnection_.prototype.finished = function (data) {
        // Don't leak connections
        this._finished = true;
        this._dom.removeConnection(this._id);
        if (this.readyState === ReadyState.Cancelled) return;
        this._responseData = data;
    };
    return JSONPConnection_;
}(JSONPConnection);
/**
 * A {\@link ConnectionBackend} that uses the JSONP strategy of making requests.
 *
 * \@experimental
 * @abstract
 */
var JSONPBackend = function (_super) {
    __extends(JSONPBackend, _super);
    function JSONPBackend() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return JSONPBackend;
}(ConnectionBackend);
var JSONPBackend_ = function (_super) {
    __extends(JSONPBackend_, _super);
    /**
     * @param {?} _browserJSONP
     * @param {?} _baseResponseOptions
     */
    function JSONPBackend_(_browserJSONP, _baseResponseOptions) {
        var _this = _super.call(this) || this;
        _this._browserJSONP = _browserJSONP;
        _this._baseResponseOptions = _baseResponseOptions;
        return _this;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    JSONPBackend_.prototype.createConnection = function (request) {
        return new JSONPConnection_(request, this._browserJSONP, this._baseResponseOptions);
    };
    return JSONPBackend_;
}(JSONPBackend);
JSONPBackend_.decorators = [{ type: _core.Injectable }];
/**
 * @nocollapse
 */
JSONPBackend_.ctorParameters = function () {
    return [{ type: BrowserJsonp }, { type: ResponseOptions }];
};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var XSSI_PREFIX = /^\)\]\}',?\n/;
/**
 * Creates connections using `XMLHttpRequest`. Given a fully-qualified
 * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
 * request.
 *
 * This class would typically not be created or interacted with directly inside applications, though
 * the {\@link MockConnection} may be interacted with in tests.
 *
 * \@experimental
 */
var XHRConnection = function () {
    /**
     * @param {?} req
     * @param {?} browserXHR
     * @param {?=} baseResponseOptions
     */
    function XHRConnection(req, browserXHR, baseResponseOptions) {
        var _this = this;
        this.request = req;
        this.response = new _Observable.Observable(function (responseObserver) {
            var _xhr = browserXHR.build();
            _xhr.open(RequestMethod[req.method].toUpperCase(), req.url);
            if (req.withCredentials != null) {
                _xhr.withCredentials = req.withCredentials;
            }
            // load event handler
            var onLoad = function onLoad() {
                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                var status = _xhr.status === 1223 ? 204 : _xhr.status;
                var body = null;
                // HTTP 204 means no content
                if (status !== 204) {
                    // responseText is the old-school way of retrieving response (supported by IE8 & 9)
                    // response/responseType properties were introduced in ResourceLoader Level2 spec
                    // (supported by IE10)
                    body = typeof _xhr.response === 'undefined' ? _xhr.responseText : _xhr.response;
                    // Implicitly strip a potential XSSI prefix.
                    if (typeof body === 'string') {
                        body = body.replace(XSSI_PREFIX, '');
                    }
                }
                // fix status code when it is 0 (0 status is undocumented).
                // Occurs when accessing file resources or on Android 4.1 stock browser
                // while retrieving files from application cache.
                if (status === 0) {
                    status = body ? 200 : 0;
                }
                var headers = Headers.fromResponseHeaderString(_xhr.getAllResponseHeaders());
                // IE 9 does not provide the way to get URL of response
                var url = getResponseURL(_xhr) || req.url;
                var statusText = _xhr.statusText || 'OK';
                var responseOptions = new ResponseOptions({ body: body, status: status, headers: headers, statusText: statusText, url: url });
                if (baseResponseOptions != null) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                var response = new Response(responseOptions);
                response.ok = isSuccess(status);
                if (response.ok) {
                    responseObserver.next(response);
                    // TODO(gdi2290): defer complete if array buffer until done
                    responseObserver.complete();
                    return;
                }
                responseObserver.error(response);
            };
            // error event handler
            var onError = function onError(err) {
                var responseOptions = new ResponseOptions({
                    body: err,
                    type: ResponseType.Error,
                    status: _xhr.status,
                    statusText: _xhr.statusText
                });
                if (baseResponseOptions != null) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new Response(responseOptions));
            };
            _this.setDetectedContentType(req, _xhr);
            if (req.headers == null) {
                req.headers = new Headers();
            }
            if (!req.headers.has('Accept')) {
                req.headers.append('Accept', 'application/json, text/plain, */*');
            }
            req.headers.forEach(function (values, name) {
                return _xhr.setRequestHeader(name, values.join(','));
            });
            // Select the correct buffer type to store the response
            if (req.responseType != null && _xhr.responseType != null) {
                switch (req.responseType) {
                    case ResponseContentType.ArrayBuffer:
                        _xhr.responseType = 'arraybuffer';
                        break;
                    case ResponseContentType.Json:
                        _xhr.responseType = 'json';
                        break;
                    case ResponseContentType.Text:
                        _xhr.responseType = 'text';
                        break;
                    case ResponseContentType.Blob:
                        _xhr.responseType = 'blob';
                        break;
                    default:
                        throw new Error('The selected responseType is not supported');
                }
            }
            _xhr.addEventListener('load', onLoad);
            _xhr.addEventListener('error', onError);
            _xhr.send(_this.request.getBody());
            return function () {
                _xhr.removeEventListener('load', onLoad);
                _xhr.removeEventListener('error', onError);
                _xhr.abort();
            };
        });
    }
    /**
     * @param {?} req
     * @param {?} _xhr
     * @return {?}
     */
    XHRConnection.prototype.setDetectedContentType = function (req /** TODO Request */, _xhr /** XMLHttpRequest */) {
        // Skip if a custom Content-Type header is provided
        if (req.headers != null && req.headers.get('Content-Type') != null) {
            return;
        }
        // Set the detected content type
        switch (req.contentType) {
            case ContentType.NONE:
                break;
            case ContentType.JSON:
                _xhr.setRequestHeader('content-type', 'application/json');
                break;
            case ContentType.FORM:
                _xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
                break;
            case ContentType.TEXT:
                _xhr.setRequestHeader('content-type', 'text/plain');
                break;
            case ContentType.BLOB:
                var /** @type {?} */blob = req.blob();
                if (blob.type) {
                    _xhr.setRequestHeader('content-type', blob.type);
                }
                break;
        }
    };
    return XHRConnection;
}();
/**
 * `XSRFConfiguration` sets up Cross Site Request Forgery (XSRF) protection for the application
 * using a cookie. See https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)
 * for more information on XSRF.
 *
 * Applications can configure custom cookie and header names by binding an instance of this class
 * with different `cookieName` and `headerName` values. See the main HTTP documentation for more
 * details.
 *
 * \@experimental
 */
var CookieXSRFStrategy = function () {
    /**
     * @param {?=} _cookieName
     * @param {?=} _headerName
     */
    function CookieXSRFStrategy(_cookieName, _headerName) {
        if (_cookieName === void 0) {
            _cookieName = 'XSRF-TOKEN';
        }
        if (_headerName === void 0) {
            _headerName = 'X-XSRF-TOKEN';
        }
        this._cookieName = _cookieName;
        this._headerName = _headerName;
    }
    /**
     * @param {?} req
     * @return {?}
     */
    CookieXSRFStrategy.prototype.configureRequest = function (req) {
        var /** @type {?} */xsrfToken = (0, _platformBrowser.ɵgetDOM)().getCookie(this._cookieName);
        if (xsrfToken) {
            req.headers.set(this._headerName, xsrfToken);
        }
    };
    return CookieXSRFStrategy;
}();
/**
 * Creates {\@link XHRConnection} instances.
 *
 * This class would typically not be used by end users, but could be
 * overridden if a different backend implementation should be used,
 * such as in a node backend.
 *
 * ### Example
 *
 * ```
 * import {Http, MyNodeBackend, HTTP_PROVIDERS, BaseRequestOptions} from '\@angular/http';
 * \@Component({
 *   viewProviders: [
 *     HTTP_PROVIDERS,
 *     {provide: Http, useFactory: (backend, options) => {
 *       return new Http(backend, options);
 *     }, deps: [MyNodeBackend, BaseRequestOptions]}]
 * })
 * class MyComponent {
 *   constructor(http:Http) {
 *     http.request('people.json').subscribe(res => this.people = res.json());
 *   }
 * }
 * ```
 * \@experimental
 */
var XHRBackend = function () {
    /**
     * @param {?} _browserXHR
     * @param {?} _baseResponseOptions
     * @param {?} _xsrfStrategy
     */
    function XHRBackend(_browserXHR, _baseResponseOptions, _xsrfStrategy) {
        this._browserXHR = _browserXHR;
        this._baseResponseOptions = _baseResponseOptions;
        this._xsrfStrategy = _xsrfStrategy;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    XHRBackend.prototype.createConnection = function (request) {
        this._xsrfStrategy.configureRequest(request);
        return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
    };
    return XHRBackend;
}();
XHRBackend.decorators = [{ type: _core.Injectable }];
/**
 * @nocollapse
 */
XHRBackend.ctorParameters = function () {
    return [{ type: BrowserXhr }, { type: ResponseOptions }, { type: XSRFStrategy }];
};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Creates a request options object to be optionally provided when instantiating a
 * {\@link Request}.
 *
 * This class is based on the `RequestInit` description in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#requestinit).
 *
 * All values are null by default. Typical defaults can be found in the {\@link BaseRequestOptions}
 * class, which sub-classes `RequestOptions`.
 *
 * ```typescript
 * import {RequestOptions, Request, RequestMethod} from '\@angular/http';
 *
 * const options = new RequestOptions({
 *   method: RequestMethod.Post,
 *   url: 'https://google.com'
 * });
 * const req = new Request(options);
 * console.log('req.method:', RequestMethod[req.method]); // Post
 * console.log('options.url:', options.url); // https://google.com
 * ```
 *
 * \@experimental
 */
var RequestOptions = function () {
    /**
     * @param {?=} __0
     */
    function RequestOptions(_a) {
        var _b = _a === void 0 ? {} : _a,
            method = _b.method,
            headers = _b.headers,
            body = _b.body,
            url = _b.url,
            search = _b.search,
            params = _b.params,
            withCredentials = _b.withCredentials,
            responseType = _b.responseType;
        this.method = method != null ? normalizeMethodName(method) : null;
        this.headers = headers != null ? headers : null;
        this.body = body != null ? body : null;
        this.url = url != null ? url : null;
        this.params = this._mergeSearchParams(params || search);
        this.withCredentials = withCredentials != null ? withCredentials : null;
        this.responseType = responseType != null ? responseType : null;
    }
    Object.defineProperty(RequestOptions.prototype, "search", {
        /**
         * @deprecated from 4.0.0. Use params instead.
         * @return {?}
         */
        get: function get() {
            return this.params;
        },
        /**
         * @deprecated from 4.0.0. Use params instead.
         * @param {?} params
         * @return {?}
         */
        set: function set(params) {
            this.params = params;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
     * existing values. This method will not change the values of the instance on which it is being
     * called.
     *
     * Note that `headers` and `search` will override existing values completely if present in
     * the `options` object. If these values should be merged, it should be done prior to calling
     * `merge` on the `RequestOptions` instance.
     *
     * ```typescript
     * import {RequestOptions, Request, RequestMethod} from '\@angular/http';
     *
     * const options = new RequestOptions({
     *   method: RequestMethod.Post
     * });
     * const req = new Request(options.merge({
     *   url: 'https://google.com'
     * }));
     * console.log('req.method:', RequestMethod[req.method]); // Post
     * console.log('options.url:', options.url); // null
     * console.log('req.url:', req.url); // https://google.com
     * ```
     * @param {?=} options
     * @return {?}
     */
    RequestOptions.prototype.merge = function (options) {
        return new RequestOptions({
            method: options && options.method != null ? options.method : this.method,
            headers: options && options.headers != null ? options.headers : new Headers(this.headers),
            body: options && options.body != null ? options.body : this.body,
            url: options && options.url != null ? options.url : this.url,
            params: options && this._mergeSearchParams(options.params || options.search),
            withCredentials: options && options.withCredentials != null ? options.withCredentials : this.withCredentials,
            responseType: options && options.responseType != null ? options.responseType : this.responseType
        });
    };
    /**
     * @param {?=} params
     * @return {?}
     */
    RequestOptions.prototype._mergeSearchParams = function (params) {
        if (!params) return this.params;
        if (params instanceof URLSearchParams) {
            return params.clone();
        }
        if (typeof params === 'string') {
            return new URLSearchParams(params);
        }
        return this._parseParams(params);
    };
    /**
     * @param {?=} objParams
     * @return {?}
     */
    RequestOptions.prototype._parseParams = function (objParams) {
        var _this = this;
        if (objParams === void 0) {
            objParams = {};
        }
        var /** @type {?} */params = new URLSearchParams();
        Object.keys(objParams).forEach(function (key) {
            var /** @type {?} */value = objParams[key];
            if (Array.isArray(value)) {
                value.forEach(function (item) {
                    return _this._appendParam(key, item, params);
                });
            } else {
                _this._appendParam(key, value, params);
            }
        });
        return params;
    };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} params
     * @return {?}
     */
    RequestOptions.prototype._appendParam = function (key, value, params) {
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        params.append(key, value);
    };
    return RequestOptions;
}();
/**
 * Subclass of {\@link RequestOptions}, with default values.
 *
 * Default values:
 *  * method: {\@link RequestMethod RequestMethod.Get}
 *  * headers: empty {\@link Headers} object
 *
 * This class could be extended and bound to the {\@link RequestOptions} class
 * when configuring an {\@link Injector}, in order to override the default options
 * used by {\@link Http} to create and send {\@link Request Requests}.
 *
 * ```typescript
 * import {BaseRequestOptions, RequestOptions} from '\@angular/http';
 *
 * class MyOptions extends BaseRequestOptions {
 *   search: string = 'coreTeam=true';
 * }
 *
 * {provide: RequestOptions, useClass: MyOptions};
 * ```
 *
 * The options could also be extended when manually creating a {\@link Request}
 * object.
 *
 * ```
 * import {BaseRequestOptions, Request, RequestMethod} from '\@angular/http';
 *
 * const options = new BaseRequestOptions();
 * const req = new Request(options.merge({
 *   method: RequestMethod.Post,
 *   url: 'https://google.com'
 * }));
 * console.log('req.method:', RequestMethod[req.method]); // Post
 * console.log('options.url:', options.url); // null
 * console.log('req.url:', req.url); // https://google.com
 * ```
 *
 * \@experimental
 */
var BaseRequestOptions = function (_super) {
    __extends(BaseRequestOptions, _super);
    function BaseRequestOptions() {
        return _super.call(this, { method: RequestMethod.Get, headers: new Headers() }) || this;
    }
    return BaseRequestOptions;
}(RequestOptions);
BaseRequestOptions.decorators = [{ type: _core.Injectable }];
/**
 * @nocollapse
 */
BaseRequestOptions.ctorParameters = function () {
    return [];
};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Creates `Request` instances from provided values.
 *
 * The Request's interface is inspired by the Request constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#request-class),
 * but is considered a static value whose body can be accessed many times. There are other
 * differences in the implementation, but this is the most significant.
 *
 * `Request` instances are typically created by higher-level classes, like {\@link Http} and
 * {\@link Jsonp}, but it may occasionally be useful to explicitly create `Request` instances.
 * One such example is when creating services that wrap higher-level services, like {\@link Http},
 * where it may be useful to generate a `Request` with arbitrary headers and search params.
 *
 * ```typescript
 * import {Injectable, Injector} from '\@angular/core';
 * import {HTTP_PROVIDERS, Http, Request, RequestMethod} from '\@angular/http';
 *
 * \@Injectable()
 * class AutoAuthenticator {
 *   constructor(public http:Http) {}
 *   request(url:string) {
 *     return this.http.request(new Request({
 *       method: RequestMethod.Get,
 *       url: url,
 *       search: 'password=123'
 *     }));
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([HTTP_PROVIDERS, AutoAuthenticator]);
 * var authenticator = injector.get(AutoAuthenticator);
 * authenticator.request('people.json').subscribe(res => {
 *   //URL should have included '?password=123'
 *   console.log('people', res.json());
 * });
 * ```
 *
 * \@experimental
 */
var Request = function (_super) {
    __extends(Request, _super);
    /**
     * @param {?} requestOptions
     */
    function Request(requestOptions) {
        var _this = _super.call(this) || this;
        // TODO: assert that url is present
        var url = requestOptions.url;
        _this.url = requestOptions.url;
        var paramsArg = requestOptions.params || requestOptions.search;
        if (paramsArg) {
            var params = void 0;
            if ((typeof paramsArg === 'undefined' ? 'undefined' : _typeof(paramsArg)) === 'object' && !(paramsArg instanceof URLSearchParams)) {
                params = urlEncodeParams(paramsArg).toString();
            } else {
                params = paramsArg.toString();
            }
            if (params.length > 0) {
                var prefix = '?';
                if (_this.url.indexOf('?') != -1) {
                    prefix = _this.url[_this.url.length - 1] == '&' ? '' : '&';
                }
                // TODO: just delete search-query-looking string in url?
                _this.url = url + prefix + params;
            }
        }
        _this._body = requestOptions.body;
        _this.method = normalizeMethodName(requestOptions.method);
        // TODO(jeffbcross): implement behavior
        // Defaults to 'omit', consistent with browser
        _this.headers = new Headers(requestOptions.headers);
        _this.contentType = _this.detectContentType();
        _this.withCredentials = requestOptions.withCredentials;
        _this.responseType = requestOptions.responseType;
        return _this;
    }
    /**
     * Returns the content type enum based on header options.
     * @return {?}
     */
    Request.prototype.detectContentType = function () {
        switch (this.headers.get('content-type')) {
            case 'application/json':
                return ContentType.JSON;
            case 'application/x-www-form-urlencoded':
                return ContentType.FORM;
            case 'multipart/form-data':
                return ContentType.FORM_DATA;
            case 'text/plain':
            case 'text/html':
                return ContentType.TEXT;
            case 'application/octet-stream':
                return this._body instanceof ArrayBuffer$1 ? ContentType.ARRAY_BUFFER : ContentType.BLOB;
            default:
                return this.detectContentTypeFromBody();
        }
    };
    /**
     * Returns the content type of request's body based on its type.
     * @return {?}
     */
    Request.prototype.detectContentTypeFromBody = function () {
        if (this._body == null) {
            return ContentType.NONE;
        } else if (this._body instanceof URLSearchParams) {
            return ContentType.FORM;
        } else if (this._body instanceof FormData) {
            return ContentType.FORM_DATA;
        } else if (this._body instanceof Blob$1) {
            return ContentType.BLOB;
        } else if (this._body instanceof ArrayBuffer$1) {
            return ContentType.ARRAY_BUFFER;
        } else if (this._body && _typeof(this._body) === 'object') {
            return ContentType.JSON;
        } else {
            return ContentType.TEXT;
        }
    };
    /**
     * Returns the request's body according to its type. If body is undefined, return
     * null.
     * @return {?}
     */
    Request.prototype.getBody = function () {
        switch (this.contentType) {
            case ContentType.JSON:
                return this.text();
            case ContentType.FORM:
                return this.text();
            case ContentType.FORM_DATA:
                return this._body;
            case ContentType.TEXT:
                return this.text();
            case ContentType.BLOB:
                return this.blob();
            case ContentType.ARRAY_BUFFER:
                return this.arrayBuffer();
            default:
                return null;
        }
    };
    return Request;
}(Body);
/**
 * @param {?} params
 * @return {?}
 */
function urlEncodeParams(params) {
    var /** @type {?} */searchParams = new URLSearchParams();
    Object.keys(params).forEach(function (key) {
        var /** @type {?} */value = params[key];
        if (value && Array.isArray(value)) {
            value.forEach(function (element) {
                return searchParams.append(key, element.toString());
            });
        } else {
            searchParams.append(key, value.toString());
        }
    });
    return searchParams;
}
var noop = function noop() {};
var w = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' ? window : noop;
var FormData = w[/** TODO #9100 */'FormData'] || noop;
var Blob$1 = w[/** TODO #9100 */'Blob'] || noop;
var ArrayBuffer$1 = w[/** TODO #9100 */'ArrayBuffer'] || noop;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} backend
 * @param {?} request
 * @return {?}
 */
function httpRequest(backend, request) {
    return backend.createConnection(request).response;
}
/**
 * @param {?} defaultOpts
 * @param {?} providedOpts
 * @param {?} method
 * @param {?} url
 * @return {?}
 */
function mergeOptions(defaultOpts, providedOpts, method, url) {
    var /** @type {?} */newOptions = defaultOpts;
    if (providedOpts) {
        // Hack so Dart can used named parameters
        return newOptions.merge(new RequestOptions({
            method: providedOpts.method || method,
            url: providedOpts.url || url,
            search: providedOpts.search,
            params: providedOpts.params,
            headers: providedOpts.headers,
            body: providedOpts.body,
            withCredentials: providedOpts.withCredentials,
            responseType: providedOpts.responseType
        }));
    }
    return newOptions.merge(new RequestOptions({ method: method, url: url }));
}
/**
 * Performs http requests using `XMLHttpRequest` as the default backend.
 *
 * `Http` is available as an injectable class, with methods to perform http requests. Calling
 * `request` returns an `Observable` which will emit a single {\@link Response} when a
 * response is received.
 *
 * ### Example
 *
 * ```typescript
 * import {Http, HTTP_PROVIDERS} from '\@angular/http';
 * import 'rxjs/add/operator/map'
 * \@Component({
 *   selector: 'http-app',
 *   viewProviders: [HTTP_PROVIDERS],
 *   templateUrl: 'people.html'
 * })
 * class PeopleComponent {
 *   constructor(http: Http) {
 *     http.get('people.json')
 *       // Call map on the response observable to get the parsed people object
 *       .map(res => res.json())
 *       // Subscribe to the observable to get the parsed people object and attach it to the
 *       // component
 *       .subscribe(people => this.people = people);
 *   }
 * }
 * ```
 *
 *
 * ### Example
 *
 * ```
 * http.get('people.json').subscribe((res:Response) => this.people = res.json());
 * ```
 *
 * The default construct used to perform requests, `XMLHttpRequest`, is abstracted as a "Backend" (
 * {\@link XHRBackend} in this case), which could be mocked with dependency injection by replacing
 * the {\@link XHRBackend} provider, as in the following example:
 *
 * ### Example
 *
 * ```typescript
 * import {BaseRequestOptions, Http} from '\@angular/http';
 * import {MockBackend} from '\@angular/http/testing';
 * var injector = Injector.resolveAndCreate([
 *   BaseRequestOptions,
 *   MockBackend,
 *   {provide: Http, useFactory:
 *       function(backend, defaultOptions) {
 *         return new Http(backend, defaultOptions);
 *       },
 *       deps: [MockBackend, BaseRequestOptions]}
 * ]);
 * var http = injector.get(Http);
 * http.get('request-from-mock-backend.json').subscribe((res:Response) => doSomething(res));
 * ```
 *
 * \@experimental
 */
var Http = function () {
    /**
     * @param {?} _backend
     * @param {?} _defaultOptions
     */
    function Http(_backend, _defaultOptions) {
        this._backend = _backend;
        this._defaultOptions = _defaultOptions;
    }
    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {\@link Request} instance. If the first argument is a url, an optional {\@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {\@link BaseRequestOptions} before performing the request.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    Http.prototype.request = function (url, options) {
        var /** @type {?} */responseObservable;
        if (typeof url === 'string') {
            responseObservable = httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, /** @type {?} */url)));
        } else if (url instanceof Request) {
            responseObservable = httpRequest(this._backend, url);
        } else {
            throw new Error('First argument must be a url string or Request instance.');
        }
        return responseObservable;
    };
    /**
     * Performs a request with `get` http method.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    Http.prototype.get = function (url, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url)));
    };
    /**
     * Performs a request with `post` http method.
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    Http.prototype.post = function (url, body, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Post, url)));
    };
    /**
     * Performs a request with `put` http method.
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    Http.prototype.put = function (url, body, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Put, url)));
    };
    /**
     * Performs a request with `delete` http method.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    Http.prototype.delete = function (url, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Delete, url)));
    };
    /**
     * Performs a request with `patch` http method.
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    Http.prototype.patch = function (url, body, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Patch, url)));
    };
    /**
     * Performs a request with `head` http method.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    Http.prototype.head = function (url, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Head, url)));
    };
    /**
     * Performs a request with `options` http method.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    Http.prototype.options = function (url, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Options, url)));
    };
    return Http;
}();
Http.decorators = [{ type: _core.Injectable }];
/**
 * @nocollapse
 */
Http.ctorParameters = function () {
    return [{ type: ConnectionBackend }, { type: RequestOptions }];
};
/**
 * \@experimental
 */
var Jsonp = function (_super) {
    __extends(Jsonp, _super);
    /**
     * @param {?} backend
     * @param {?} defaultOptions
     */
    function Jsonp(backend, defaultOptions) {
        return _super.call(this, backend, defaultOptions) || this;
    }
    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {\@link Request} instance. If the first argument is a url, an optional {\@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {\@link BaseRequestOptions} before performing the request.
     *
     * \@security Regular XHR is the safest alternative to JSONP for most applications, and is
     * supported by all current browsers. Because JSONP creates a `<script>` element with
     * contents retrieved from a remote source, attacker-controlled data introduced by an untrusted
     * source could expose your application to XSS risks. Data exposed by JSONP may also be
     * readable by malicious third-party websites. In addition, JSONP introduces potential risk for
     * future security issues (e.g. content sniffing).  For more detail, see the
     * [Security Guide](http://g.co/ng/security).
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    Jsonp.prototype.request = function (url, options) {
        var /** @type {?} */responseObservable;
        if (typeof url === 'string') {
            url = new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, /** @type {?} */url));
        }
        if (url instanceof Request) {
            if (url.method !== RequestMethod.Get) {
                throw new Error('JSONP requests must use GET request method.');
            }
            responseObservable = httpRequest(this._backend, url);
        } else {
            throw new Error('First argument must be a url string or Request instance.');
        }
        return responseObservable;
    };
    return Jsonp;
}(Http);
Jsonp.decorators = [{ type: _core.Injectable }];
/**
 * @nocollapse
 */
Jsonp.ctorParameters = function () {
    return [{ type: ConnectionBackend }, { type: RequestOptions }];
};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * The http module provides services to perform http requests. To get started, see the {@link Http}
 * class.
 */
/**
 * @return {?}
 */
function _createDefaultCookieXSRFStrategy() {
    return new CookieXSRFStrategy();
}
/**
 * @param {?} xhrBackend
 * @param {?} requestOptions
 * @return {?}
 */
function httpFactory(xhrBackend, requestOptions) {
    return new Http(xhrBackend, requestOptions);
}
/**
 * @param {?} jsonpBackend
 * @param {?} requestOptions
 * @return {?}
 */
function jsonpFactory(jsonpBackend, requestOptions) {
    return new Jsonp(jsonpBackend, requestOptions);
}
/**
 * The module that includes http's providers
 *
 * \@experimental
 */
var HttpModule = function () {
    function HttpModule() {}
    return HttpModule;
}();
HttpModule.decorators = [{ type: _core.NgModule, args: [{
        providers: [
        // TODO(pascal): use factory type annotations once supported in DI
        // issue: https://github.com/angular/angular/issues/3183
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] }, BrowserXhr, { provide: RequestOptions, useClass: BaseRequestOptions }, { provide: ResponseOptions, useClass: BaseResponseOptions }, XHRBackend, { provide: XSRFStrategy, useFactory: _createDefaultCookieXSRFStrategy }]
    }] }];
/**
 * @nocollapse
 */
HttpModule.ctorParameters = function () {
    return [];
};
/**
 * The module that includes jsonp's providers
 *
 * \@experimental
 */
var JsonpModule = function () {
    function JsonpModule() {}
    return JsonpModule;
}();
JsonpModule.decorators = [{ type: _core.NgModule, args: [{
        providers: [
        // TODO(pascal): use factory type annotations once supported in DI
        // issue: https://github.com/angular/angular/issues/3183
        { provide: Jsonp, useFactory: jsonpFactory, deps: [JSONPBackend, RequestOptions] }, BrowserJsonp, { provide: RequestOptions, useClass: BaseRequestOptions }, { provide: ResponseOptions, useClass: BaseResponseOptions }, { provide: JSONPBackend, useClass: JSONPBackend_ }]
    }] }];
/**
 * @nocollapse
 */
JsonpModule.ctorParameters = function () {
    return [];
};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the common package.
 */
/**
 * \@stable
 */
var VERSION = new _core.Version('4.1.3');
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the http package.
 */
// This file only reexports content of the `src` folder. Keep it that way.
/**
 * Generated bundle index. Do not edit.
 */
exports.BrowserXhr = BrowserXhr;
exports.JSONPBackend = JSONPBackend;
exports.JSONPConnection = JSONPConnection;
exports.CookieXSRFStrategy = CookieXSRFStrategy;
exports.XHRBackend = XHRBackend;
exports.XHRConnection = XHRConnection;
exports.BaseRequestOptions = BaseRequestOptions;
exports.RequestOptions = RequestOptions;
exports.BaseResponseOptions = BaseResponseOptions;
exports.ResponseOptions = ResponseOptions;
exports.ReadyState = ReadyState;
exports.RequestMethod = RequestMethod;
exports.ResponseContentType = ResponseContentType;
exports.ResponseType = ResponseType;
exports.Headers = Headers;
exports.Http = Http;
exports.Jsonp = Jsonp;
exports.HttpModule = HttpModule;
exports.JsonpModule = JsonpModule;
exports.Connection = Connection;
exports.ConnectionBackend = ConnectionBackend;
exports.XSRFStrategy = XSRFStrategy;
exports.Request = Request;
exports.Response = Response;
exports.QueryEncoder = QueryEncoder;
exports.URLSearchParams = URLSearchParams;
exports.VERSION = VERSION;
exports.ɵg = BrowserJsonp;
exports.ɵa = JSONPBackend_;
exports.ɵf = Body;
exports.ɵb = _createDefaultCookieXSRFStrategy;
exports.ɵc = httpFactory;
exports.ɵd = jsonpFactory;
//# sourceMappingURL=http.es5.js.map

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCorrectEventName = getCorrectEventName;
exports.getCorrectPropertyName = getCorrectPropertyName;
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @typedef {{
 *   noPrefix: string,
 *   webkitPrefix: string
 * }}
 */
var VendorPropertyMapType = void 0;

/** @const {Object<string, !VendorPropertyMapType>} */
var eventTypeMap = {
  'animationstart': {
    noPrefix: 'animationstart',
    webkitPrefix: 'webkitAnimationStart',
    styleProperty: 'animation'
  },
  'animationend': {
    noPrefix: 'animationend',
    webkitPrefix: 'webkitAnimationEnd',
    styleProperty: 'animation'
  },
  'animationiteration': {
    noPrefix: 'animationiteration',
    webkitPrefix: 'webkitAnimationIteration',
    styleProperty: 'animation'
  },
  'transitionend': {
    noPrefix: 'transitionend',
    webkitPrefix: 'webkitTransitionEnd',
    styleProperty: 'transition'
  }
};

/** @const {Object<string, !VendorPropertyMapType>} */
var cssPropertyMap = {
  'animation': {
    noPrefix: 'animation',
    webkitPrefix: '-webkit-animation'
  },
  'transform': {
    noPrefix: 'transform',
    webkitPrefix: '-webkit-transform'
  },
  'transition': {
    noPrefix: 'transition',
    webkitPrefix: '-webkit-transition'
  }
};

/**
 * @param {!Object} windowObj
 * @return {boolean}
 */
function hasProperShape(windowObj) {
  return windowObj['document'] !== undefined && typeof windowObj['document']['createElement'] === 'function';
}

/**
 * @param {string} eventType
 * @return {boolean}
 */
function eventFoundInMaps(eventType) {
  return eventType in eventTypeMap || eventType in cssPropertyMap;
}

/**
 * @param {string} eventType
 * @param {!Object<string, !VendorPropertyMapType>} map
 * @param {!Element} el
 * @return {string}
 */
function getJavaScriptEventName(eventType, map, el) {
  return map[eventType].styleProperty in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
}

/**
 * Helper function to determine browser prefix for CSS3 animation events
 * and property names.
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getAnimationName(windowObj, eventType) {
  if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
    return eventType;
  }

  var map = /** @type {!Object<string, !VendorPropertyMapType>} */eventType in eventTypeMap ? eventTypeMap : cssPropertyMap;
  var el = windowObj['document']['createElement']('div');
  var eventName = '';

  if (map === eventTypeMap) {
    eventName = getJavaScriptEventName(eventType, map, el);
  } else {
    eventName = map[eventType].noPrefix in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
  }

  return eventName;
}

// Public functions to access getAnimationName() for JavaScript events or CSS
// property names.

var transformStyleProperties = exports.transformStyleProperties = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'MSTransform'];

/**
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getCorrectEventName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}

/**
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getCorrectPropertyName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016 Google Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _foundation = __webpack_require__(151);

var _foundation2 = _interopRequireDefault(_foundation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @template F
 */
var MDCComponent = function () {
  _createClass(MDCComponent, null, [{
    key: 'attachTo',


    /**
     * @param {!Element} root
     * @return {!MDCComponent}
     */
    value: function attachTo(root) {
      // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
      // returns an instantiated component with its root set to that element. Also note that in the cases of
      // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
      // from getDefaultFoundation().
      return new MDCComponent(root, new _foundation2.default());
    }

    /**
     * @param {!Element} root
     * @param {!F} foundation
     * @param {...?} args
     */

  }]);

  function MDCComponent(root) {
    var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    _classCallCheck(this, MDCComponent);

    /** @private {!Element} */
    this.root_ = root;

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    this.initialize.apply(this, args);
    // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.
    /** @private {!F} */
    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  _createClass(MDCComponent, [{
    key: 'initialize',
    value: function initialize() /* ...args */{}
    // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.


    /**
     * @return {!F} foundation
     */

  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      // Subclasses must override this method to return a properly configured foundation class for the
      // component.
      throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
    }
  }, {
    key: 'initialSyncWithDOM',
    value: function initialSyncWithDOM() {
      // Subclasses should override this method if they need to perform work to synchronize with a host DOM
      // object. An example of this would be a form control wrapper that needs to synchronize its internal state
      // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
      // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      // Subclasses may implement this method to release any resources / deregister any listeners they have
      // attached. An example of this might be deregistering a resize event from the window object.
      this.foundation_.destroy();
    }

    /**
     * Wrapper method to add an event listener to the component's root element. This is most useful when
     * listening for custom events.
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: 'listen',
    value: function listen(evtType, handler) {
      this.root_.addEventListener(evtType, handler);
    }

    /**
     * Wrapper method to remove an event listener to the component's root element. This is most useful when
     * unlistening for custom events.
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: 'unlisten',
    value: function unlisten(evtType, handler) {
      this.root_.removeEventListener(evtType, handler);
    }

    /**
     * Fires a cross-browser-compatible custom event from the component root of the given type,
     * with the given data.
     * @param {string} evtType
     * @param {!Object} evtData
     * @param {boolean} shouldBubble
     */

  }, {
    key: 'emit',
    value: function emit(evtType, evtData) {
      var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var evt = void 0;
      if (typeof CustomEvent === 'function') {
        evt = new CustomEvent(evtType, {
          detail: evtData,
          bubbles: shouldBubble
        });
      } else {
        evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(evtType, shouldBubble, false, evtData);
      }

      this.root_.dispatchEvent(evt);
    }
  }]);

  return MDCComponent;
}();

exports.default = MDCComponent;

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cssClasses = exports.cssClasses = {
  CLOSED_CLASS: 'mdc-linear-progress--closed',
  INDETERMINATE_CLASS: 'mdc-linear-progress--indeterminate',
  REVERSED_CLASS: 'mdc-linear-progress--reversed'
};

var strings = exports.strings = {
  PRIMARY_BAR_SELECTOR: '.mdc-linear-progress__primary-bar',
  BUFFER_SELECTOR: '.mdc-linear-progress__buffer'
};

/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = __webpack_require__(152);

var _animation = __webpack_require__(255);

var _constants = __webpack_require__(257);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2017 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MDCLinearProgressFoundation = function (_MDCFoundation) {
  _inherits(MDCLinearProgressFoundation, _MDCFoundation);

  _createClass(MDCLinearProgressFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return _constants.cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return _constants.strings;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        addClass: function addClass() /* className: string */{},
        getPrimaryBar: function getPrimaryBar() /* el: Element */{},
        getBuffer: function getBuffer() /* el: Element */{},
        hasClass: function hasClass() {
          return (/* className: string */false
          );
        },
        removeClass: function removeClass() /* className: string */{},
        setStyle: function setStyle() /* el: Element, styleProperty: string, value: number */{}
      };
    }
  }]);

  function MDCLinearProgressFoundation(adapter) {
    _classCallCheck(this, MDCLinearProgressFoundation);

    return _possibleConstructorReturn(this, (MDCLinearProgressFoundation.__proto__ || Object.getPrototypeOf(MDCLinearProgressFoundation)).call(this, Object.assign(MDCLinearProgressFoundation.defaultAdapter, adapter)));
  }

  _createClass(MDCLinearProgressFoundation, [{
    key: 'init',
    value: function init() {
      this.determinate_ = !this.adapter_.hasClass(_constants.cssClasses.INDETERMINATE_CLASS);
      this.reverse_ = this.adapter_.hasClass(_constants.cssClasses.REVERSED_CLASS);
    }
  }, {
    key: 'setDeterminate',
    value: function setDeterminate(isDeterminate) {
      this.determinate_ = isDeterminate;
      if (this.determinate_) {
        this.adapter_.removeClass(_constants.cssClasses.INDETERMINATE_CLASS);
      } else {
        this.adapter_.addClass(_constants.cssClasses.INDETERMINATE_CLASS);
        this.setScale_(this.adapter_.getPrimaryBar(), 1);
        this.setScale_(this.adapter_.getBuffer(), 1);
      }
    }
  }, {
    key: 'setProgress',
    value: function setProgress(value) {
      if (this.determinate_) {
        this.setScale_(this.adapter_.getPrimaryBar(), value);
      }
    }
  }, {
    key: 'setBuffer',
    value: function setBuffer(value) {
      if (this.determinate_) {
        this.setScale_(this.adapter_.getBuffer(), value);
      }
    }
  }, {
    key: 'setReverse',
    value: function setReverse(isReversed) {
      this.reverse_ = isReversed;
      if (this.reverse_) {
        this.adapter_.addClass(_constants.cssClasses.REVERSED_CLASS);
      } else {
        this.adapter_.removeClass(_constants.cssClasses.REVERSED_CLASS);
      }
    }
  }, {
    key: 'open',
    value: function open() {
      this.adapter_.removeClass(_constants.cssClasses.CLOSED_CLASS);
    }
  }, {
    key: 'close',
    value: function close() {
      this.adapter_.addClass(_constants.cssClasses.CLOSED_CLASS);
    }
  }, {
    key: 'setScale_',
    value: function setScale_(el, scaleValue) {
      var _this2 = this;

      var value = 'scaleX(' + scaleValue + ')';
      _animation.transformStyleProperties.forEach(function (transformStyleProperty) {
        _this2.adapter_.setStyle(el, transformStyleProperty, value);
      });
    }
  }]);

  return MDCLinearProgressFoundation;
}(_base.MDCFoundation);

exports.default = MDCLinearProgressFoundation;

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCLinearProgress = exports.MDCLinearProgressFoundation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = __webpack_require__(152);

var _foundation = __webpack_require__(258);

var _foundation2 = _interopRequireDefault(_foundation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2017 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

exports.MDCLinearProgressFoundation = _foundation2.default;

var MDCLinearProgress = exports.MDCLinearProgress = function (_MDCComponent) {
  _inherits(MDCLinearProgress, _MDCComponent);

  function MDCLinearProgress() {
    _classCallCheck(this, MDCLinearProgress);

    return _possibleConstructorReturn(this, (MDCLinearProgress.__proto__ || Object.getPrototypeOf(MDCLinearProgress)).apply(this, arguments));
  }

  _createClass(MDCLinearProgress, [{
    key: 'open',
    value: function open() {
      this.foundation_.open();
    }
  }, {
    key: 'close',
    value: function close() {
      this.foundation_.close();
    }
  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      var _this2 = this;

      return new _foundation2.default({
        addClass: function addClass(className) {
          return _this2.root_.classList.add(className);
        },
        getPrimaryBar: function getPrimaryBar() {
          return _this2.root_.querySelector(_foundation2.default.strings.PRIMARY_BAR_SELECTOR);
        },
        getBuffer: function getBuffer() {
          return _this2.root_.querySelector(_foundation2.default.strings.BUFFER_SELECTOR);
        },
        hasClass: function hasClass(className) {
          return _this2.root_.classList.contains(className);
        },
        removeClass: function removeClass(className) {
          return _this2.root_.classList.remove(className);
        },
        setStyle: function setStyle(el, styleProperty, value) {
          return el.style[styleProperty] = value;
        }
      });
    }
  }, {
    key: 'determinate',
    set: function set(value) {
      this.foundation_.setDeterminate(value);
    }
  }, {
    key: 'progress',
    set: function set(value) {
      this.foundation_.setProgress(value);
    }
  }, {
    key: 'buffer',
    set: function set(value) {
      this.foundation_.setBuffer(value);
    }
  }, {
    key: 'reverse',
    set: function set(value) {
      this.foundation_.setReverse(value);
    }
  }], [{
    key: 'attachTo',
    value: function attachTo(root) {
      return new MDCLinearProgress(root);
    }
  }]);

  return MDCLinearProgress;
}(_base.MDCComponent);

/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extendObject = extendObject;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Extends an object with the *enumerable* and *own* properties of one or more source objects,
 * similar to Object.assign.
 *
 * @param dest The object which will have properties copied to it.
 * @param sources The source objects from which properties will be copied.
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function extendObject(dest) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    if (dest == null) {
        throw TypeError('Cannot convert undefined or null to object');
    }
    for (var _a = 0, sources_1 = sources; _a < sources_1.length; _a++) {
        var source = sources_1[_a];
        if (source != null) {
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    dest[key] = source[key];
                }
            }
        }
    }
    return dest;
}
//# sourceMappingURL=object-extend.js.map

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BreakPointRegistry = undefined;

var _core = __webpack_require__(3);

var _breakPointsToken = __webpack_require__(105);

/**
 * Registry of 1..n MediaQuery breakpoint ranges
 * This is published as a provider and may be overriden from custom, application-specific ranges
 *
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var BreakPointRegistry = function () {
    function BreakPointRegistry(_registry) {
        this._registry = _registry;
    }
    Object.defineProperty(BreakPointRegistry.prototype, "items", {
        /**
         * Accessor to raw list
         */
        get: function get() {
            return this._registry.slice();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Search breakpoints by alias (e.g. gt-xs)
     */
    BreakPointRegistry.prototype.findByAlias = function (alias) {
        return this._registry.find(function (bp) {
            return bp.alias == alias;
        });
    };
    BreakPointRegistry.prototype.findByQuery = function (query) {
        return this._registry.find(function (bp) {
            return bp.mediaQuery == query;
        });
    };
    Object.defineProperty(BreakPointRegistry.prototype, "overlappings", {
        /**
         * Get all the breakpoints whose ranges could overlapping `normal` ranges;
         * e.g. gt-sm overlaps md, lg, and xl
         */
        get: function get() {
            return this._registry.filter(function (it) {
                return it.overlapping == true;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BreakPointRegistry.prototype, "aliases", {
        /**
         * Get list of all registered (non-empty) breakpoint aliases
         */
        get: function get() {
            return this._registry.map(function (it) {
                return it.alias;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BreakPointRegistry.prototype, "suffixes", {
        /**
         * Aliases are mapped to properties using suffixes
         * e.g.  'gt-sm' for property 'layout'  uses suffix 'GtSm'
         * for property layoutGtSM.
         */
        get: function get() {
            return this._registry.map(function (it) {
                return it.suffix;
            });
        },
        enumerable: true,
        configurable: true
    });
    return BreakPointRegistry;
}();
exports.BreakPointRegistry = BreakPointRegistry;

BreakPointRegistry.decorators = [{ type: _core.Injectable }];
/** @nocollapse */
BreakPointRegistry.ctorParameters = function () {
    return [{ type: Array, decorators: [{ type: _core.Inject, args: [_breakPointsToken.BREAKPOINTS] }] }];
};
//# sourceMappingURL=break-point-registry.js.map

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LayoutDirective = undefined;

var _core = __webpack_require__(3);

var _BehaviorSubject = __webpack_require__(72);

var _base = __webpack_require__(23);

var _mediaMonitor = __webpack_require__(18);

var _layoutValidator = __webpack_require__(60);

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * 'layout' flexbox styling directive
 * Defines the positioning flow direction for the child elements: row or column
 * Optional values: column or row (default)
 * @see https://css-tricks.com/almanac/properties/f/flex-direction/
 *
 */
var LayoutDirective = function (_super) {
    __extends(LayoutDirective, _super);
    /* tslint:enable */
    /**
     *
     */
    function LayoutDirective(monitor, elRef, renderer) {
        var _this = _super.call(this, monitor, elRef, renderer) || this;
        _this._announcer = new _BehaviorSubject.BehaviorSubject("row");
        _this.layout$ = _this._announcer.asObservable();
        return _this;
    }
    Object.defineProperty(LayoutDirective.prototype, "layout", {
        /* tslint:disable */
        set: function set(val) {
            this._cacheInput("layout", val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutXs", {
        set: function set(val) {
            this._cacheInput('layoutXs', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutSm", {
        set: function set(val) {
            this._cacheInput('layoutSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutMd", {
        set: function set(val) {
            this._cacheInput('layoutMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutLg", {
        set: function set(val) {
            this._cacheInput('layoutLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutXl", {
        set: function set(val) {
            this._cacheInput('layoutXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutGtXs", {
        set: function set(val) {
            this._cacheInput('layoutGtXs', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutGtSm", {
        set: function set(val) {
            this._cacheInput('layoutGtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutGtMd", {
        set: function set(val) {
            this._cacheInput('layoutGtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutGtLg", {
        set: function set(val) {
            this._cacheInput('layoutGtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutLtSm", {
        set: function set(val) {
            this._cacheInput('layoutLtSm', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutLtMd", {
        set: function set(val) {
            this._cacheInput('layoutLtMd', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutLtLg", {
        set: function set(val) {
            this._cacheInput('layoutLtLg', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutLtXl", {
        set: function set(val) {
            this._cacheInput('layoutLtXl', val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * On changes to any @Input properties...
     * Default to use the non-responsive Input value ('fxLayout')
     * Then conditionally override with the mq-activated Input's current value
     */
    LayoutDirective.prototype.ngOnChanges = function (changes) {
        if (changes['layout'] != null || this._mqActivation) {
            this._updateWithDirection();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    LayoutDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._listenForMediaQueryChanges('layout', 'row', function (changes) {
            _this._updateWithDirection(changes.value);
        });
        this._updateWithDirection();
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     * Validate the direction value and then update the host's inline flexbox styles
     */
    LayoutDirective.prototype._updateWithDirection = function (value) {
        value = value || this._queryInput("layout") || 'row';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        // Update styles and announce to subscribers the *new* direction
        var css = (0, _layoutValidator.buildLayoutCSS)(value);
        this._applyStyleToElement(css);
        this._announcer.next(css['flex-direction']);
    };
    return LayoutDirective;
}(_base.BaseFxDirective);
exports.LayoutDirective = LayoutDirective;

LayoutDirective.decorators = [{ type: _core.Directive, args: [{ selector: "\n  [fxLayout],\n  [fxLayout.xs], [fxLayout.sm], [fxLayout.md], [fxLayout.lg], [fxLayout.xl],\n  [fxLayout.lt-sm], [fxLayout.lt-md], [fxLayout.lt-lg], [fxLayout.lt-xl],\n  [fxLayout.gt-xs], [fxLayout.gt-sm], [fxLayout.gt-md], [fxLayout.gt-lg]\n" }] }];
/** @nocollapse */
LayoutDirective.ctorParameters = function () {
    return [{ type: _mediaMonitor.MediaMonitor }, { type: _core.ElementRef }, { type: _core.Renderer2 }];
};
LayoutDirective.propDecorators = {
    'layout': [{ type: _core.Input, args: ['fxLayout'] }],
    'layoutXs': [{ type: _core.Input, args: ['fxLayout.xs'] }],
    'layoutSm': [{ type: _core.Input, args: ['fxLayout.sm'] }],
    'layoutMd': [{ type: _core.Input, args: ['fxLayout.md'] }],
    'layoutLg': [{ type: _core.Input, args: ['fxLayout.lg'] }],
    'layoutXl': [{ type: _core.Input, args: ['fxLayout.xl'] }],
    'layoutGtXs': [{ type: _core.Input, args: ['fxLayout.gt-xs'] }],
    'layoutGtSm': [{ type: _core.Input, args: ['fxLayout.gt-sm'] }],
    'layoutGtMd': [{ type: _core.Input, args: ['fxLayout.gt-md'] }],
    'layoutGtLg': [{ type: _core.Input, args: ['fxLayout.gt-lg'] }],
    'layoutLtSm': [{ type: _core.Input, args: ['fxLayout.lt-sm'] }],
    'layoutLtMd': [{ type: _core.Input, args: ['fxLayout.lt-md'] }],
    'layoutLtLg': [{ type: _core.Input, args: ['fxLayout.lt-lg'] }],
    'layoutLtXl': [{ type: _core.Input, args: ['fxLayout.lt-xl'] }]
};
//# sourceMappingURL=layout.js.map

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MatchMedia = undefined;

var _core = __webpack_require__(3);

var _BehaviorSubject = __webpack_require__(72);

__webpack_require__(67);

__webpack_require__(56);

var _mediaChange = __webpack_require__(144);

/**
 * MediaMonitor configures listeners to mediaQuery changes and publishes an Observable facade to
 * convert mediaQuery change callbacks to subscriber notifications. These notifications will be
 * performed within the ng Zone to trigger change detections and component updates.
 *
 * NOTE: both mediaQuery activations and de-activations are announced in notifications
 */
var MatchMedia = function () {
    function MatchMedia(_zone) {
        this._zone = _zone;
        this._registry = new Map();
        this._source = new _BehaviorSubject.BehaviorSubject(new _mediaChange.MediaChange(true));
        this._observable$ = this._source.asObservable();
    }
    /**
     * For the specified mediaQuery?
     */
    MatchMedia.prototype.isActive = function (mediaQuery) {
        if (this._registry.has(mediaQuery)) {
            var mql = this._registry.get(mediaQuery);
            return mql.matches;
        }
        return false;
    };
    /**
     * External observers can watch for all (or a specific) mql changes.
     * Typically used by the MediaQueryAdaptor; optionally available to components
     * who wish to use the MediaMonitor as mediaMonitor$ observable service.
     *
     * NOTE: if a mediaQuery is not specified, then ALL mediaQuery activations will
     *       be announced.
     */
    MatchMedia.prototype.observe = function (mediaQuery) {
        this.registerQuery(mediaQuery);
        return this._observable$.filter(function (change) {
            return mediaQuery ? change.mediaQuery === mediaQuery : true;
        });
    };
    /**
     * Based on the BreakPointRegistry provider, register internal listeners for each unique
     * mediaQuery. Each listener emits specific MediaChange data to observers
     */
    MatchMedia.prototype.registerQuery = function (mediaQuery) {
        var _this = this;
        if (mediaQuery) {
            var mql = this._registry.get(mediaQuery);
            var onMQLEvent = function onMQLEvent(e) {
                _this._zone.run(function () {
                    var change = new _mediaChange.MediaChange(e.matches, mediaQuery);
                    _this._source.next(change);
                });
            };
            if (!mql) {
                mql = this._buildMQL(mediaQuery);
                mql.addListener(onMQLEvent);
                this._registry.set(mediaQuery, mql);
            }
            if (mql.matches) {
                onMQLEvent(mql); // Announce activate range for initial subscribers
            }
        }
    };
    /**
     * Call window.matchMedia() to build a MediaQueryList; which
     * supports 0..n listeners for activation/deactivation
     */
    MatchMedia.prototype._buildMQL = function (query) {
        prepareQueryCSS(query);
        var canListen = !!window.matchMedia('all').addListener;
        return canListen ? window.matchMedia(query) : {
            matches: query === 'all' || query === '',
            media: query,
            addListener: function addListener() {},
            removeListener: function removeListener() {}
        };
    };
    return MatchMedia;
}();
// RxJS Operators used by the classes...
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
exports.MatchMedia = MatchMedia;

MatchMedia.decorators = [{ type: _core.Injectable }];
/** @nocollapse */
MatchMedia.ctorParameters = function () {
    return [{ type: _core.NgZone }];
};
/**
 * Private global registry for all dynamically-created, injected style tags
 * @see prepare(query)
 */
var ALL_STYLES = {};
/**
 * For Webkit engines that only trigger the MediaQueryListListener
 * when there is at least one CSS selector for the respective media query.
 *
 * @param query string The mediaQuery used to create a faux CSS selector
 *
 */
function prepareQueryCSS(query) {
    if (!ALL_STYLES[query]) {
        try {
            var style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            if (!style['styleSheet']) {
                var cssText = "@media " + query + " {.fx-query-test{ }}";
                style.appendChild(document.createTextNode(cssText));
            }
            document.getElementsByTagName('head')[0].appendChild(style);
            // Store in private global registry
            ALL_STYLES[query] = style;
        } catch (e) {
            console.error(e);
        }
    }
}
//# sourceMappingURL=match-media.js.map

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildLayoutCSS = buildLayoutCSS;
exports.validateWrapValue = validateWrapValue;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */var LAYOUT_VALUES = exports.LAYOUT_VALUES = ['row', 'column', 'row-reverse', 'column-reverse'];
/**
 * Validate the direction|"direction wrap" value and then update the host's inline flexbox styles
 */
function buildLayoutCSS(value) {
    var _a = validateValue(value),
        direction = _a[0],
        wrap = _a[1];
    return buildCSS(direction, wrap);
}
/**
  * Validate the value to be one of the acceptable value options
  * Use default fallback of "row"
  */
function validateValue(value) {
    value = value ? value.toLowerCase() : '';
    var _a = value.split(" "),
        direction = _a[0],
        wrap = _a[1];
    if (!LAYOUT_VALUES.find(function (x) {
        return x === direction;
    })) {
        direction = LAYOUT_VALUES[0];
    }
    return [direction, validateWrapValue(wrap)];
}
/**
 * Convert layout-wrap="<value>" to expected flex-wrap style
 */
function validateWrapValue(value) {
    if (!!value) {
        switch (value.toLowerCase()) {
            case 'reverse':
            case 'wrap-reverse':
            case 'reverse-wrap':
                value = 'wrap-reverse';
                break;
            case 'no':
            case 'none':
            case 'nowrap':
                value = 'nowrap';
                break;
            // All other values fallback to "wrap"
            default:
                value = 'wrap';
                break;
        }
    }
    return value;
}
/**
 * Build the CSS that should be assigned to the element instance
 * BUG:
 *   1) min-height on a column flex container won’t apply to its flex item children in IE 10-11.
 *      Use height instead if possible; height : <xxx>vh;
 *
 *  This way any padding or border specified on the child elements are
 *  laid out and drawn inside that element's specified width and height.
 */
function buildCSS(direction, wrap) {
    if (wrap === void 0) {
        wrap = null;
    }
    return {
        'display': 'flex',
        'box-sizing': 'border-box',
        'flex-direction': direction,
        'flex-wrap': !!wrap ? wrap : null
    };
}
//# sourceMappingURL=layout-validator.js.map

/***/ }),

/***/ 676:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var memoize = function memoize(fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = function (fn) {
	var memo = {};

	return function (selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector];
	};
}(function (target) {
	return document.querySelector(target);
});

var singleton = null;
var singletonCounter = 0;
var stylesInsertedAtTop = [];

var fixUrls = __webpack_require__(677);

module.exports = function (list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if ((typeof document === "undefined" ? "undefined" : _typeof(document)) !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = _typeof(options.attrs) === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if (newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if (domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j]();
				}delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if (domStyle) {
			domStyle.refs++;

			for (var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for (; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for (var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts };
		}
	}
}

function listToStyles(list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = { css: css, media: media, sourceMap: sourceMap };

		if (!newStyles[id]) styles.push(newStyles[id] = { id: id, parts: [part] });else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement(options, style) {
	var target = getElement(options.insertInto);

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if (idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement(options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs(el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
		result = options.transform(obj.css);

		if (result) {
			// If transform returns a value, use that instead of the original css.
			// This allows running runtime transformations on the css.
			obj.css = result;
		} else {
			// If the transform function returns a falsy value, don't add this css.
			// This allows conditional loading of css
			return function () {
				// noop
			};
		}
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);
	} else if (obj.sourceMap && typeof URL === "function" && typeof URL.createObjectURL === "function" && typeof URL.revokeObjectURL === "function" && typeof Blob === "function" && typeof btoa === "function") {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function remove() {
			removeStyleElement(style);

			if (style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function remove() {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if (newObj) {
			if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
}();

function applyToSingletonTag(style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag(style, obj) {
	var css = obj.css;
	var media = obj.media;

	if (media) {
		style.setAttribute("media", media);
	}

	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while (style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink(link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
 	If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
 	and there is no publicPath defined then lets turn convertToAbsoluteUrls
 	on by default.  Otherwise default to the convertToAbsoluteUrls option
 	directly
 */
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if (oldSrc) URL.revokeObjectURL(oldSrc);
}

/***/ }),

/***/ 677:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),

/***/ 678:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),

/***/ 679:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var router_1 = __webpack_require__(82);
var home_component_1 = __webpack_require__(225);
var button_demo_component_1 = __webpack_require__(222);
var checkbox_demo_component_1 = __webpack_require__(223);
var fab_demo_component_1 = __webpack_require__(224);
var switch_demo_component_1 = __webpack_require__(229);
var snackbar_demo_component_1 = __webpack_require__(228);
var menu_demo_component_1 = __webpack_require__(227);
var textfield_demo_component_1 = __webpack_require__(230);
var toolbar_demo_component_1 = __webpack_require__(231);
var linear_progress_demo_component_1 = __webpack_require__(226);
var typography_demo_component_1 = __webpack_require__(232);
exports.appRoutes = [{ path: 'button-demo', component: button_demo_component_1.ButtonDemoComponent }, { path: 'checkbox-demo', component: checkbox_demo_component_1.CheckboxDemoComponent }, { path: 'fab-demo', component: fab_demo_component_1.FabDemoComponent }, { path: 'switch-demo', component: switch_demo_component_1.SwitchDemoComponent }, { path: 'snackbar-demo', component: snackbar_demo_component_1.SnackbarDemoComponent }, { path: 'menu-demo', component: menu_demo_component_1.MenuDemoComponent }, { path: 'textfield-demo', component: textfield_demo_component_1.TextfieldDemoComponent }, { path: 'toolbar-demo', component: toolbar_demo_component_1.ToolbarDemoComponent }, { path: 'linear-progress-demo', component: linear_progress_demo_component_1.LinearProgressDemoComponent }, { path: 'typography-demo', component: typography_demo_component_1.TypographyDemoComponent }, { path: '', component: home_component_1.HomeComponent, pathMatch: 'full' }, { path: '**', redirectTo: '' }];
var AppRoutingModule = function AppRoutingModule() {
    _classCallCheck(this, AppRoutingModule);
};
AppRoutingModule = __decorate([core_1.NgModule({
    imports: [router_1.RouterModule.forRoot(exports.appRoutes, { useHash: true })],
    exports: [router_1.RouterModule]
})], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;

/***/ }),

/***/ 680:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var AppComponent = function AppComponent() {
    _classCallCheck(this, AppComponent);
};
AppComponent = __decorate([core_1.Component({
    selector: 'app-root',
    template: __webpack_require__(687)
})], AppComponent);
exports.AppComponent = AppComponent;

/***/ }),

/***/ 681:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var router_1 = __webpack_require__(82);
var NavbarComponent = function NavbarComponent(route, router) {
    _classCallCheck(this, NavbarComponent);

    this.route = route;
    this.router = router;
};
NavbarComponent = __decorate([core_1.Component({
    selector: 'navbar',
    template: __webpack_require__(694)
}), __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router])], NavbarComponent);
exports.NavbarComponent = NavbarComponent;

/***/ }),

/***/ 683:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var platform_browser_dynamic_1 = __webpack_require__(102);
var app_module_1 = __webpack_require__(237);
__webpack_require__(137);
core_1.enableProdMode();
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);

/***/ }),

/***/ 685:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);

var _require = __webpack_require__(259),
    MDCLinearProgressFoundation = _require.MDCLinearProgressFoundation;

var MDC_PROGRESS_STYLES = __webpack_require__(701);
var LinearProgressComponent = function () {
    function LinearProgressComponent(_renderer, _root) {
        var _this = this;

        _classCallCheck(this, LinearProgressComponent);

        this._renderer = _renderer;
        this._root = _root;
        this.role = 'progressbar';
        this.className = 'mdc-linear-progress';
        this._mdcAdapter = {
            addClass: function addClass(className) {
                var renderer = _this._renderer,
                    root = _this._root;

                renderer.addClass(root.nativeElement, className);
            },
            getPrimaryBar: function getPrimaryBar() {
                var root = _this._root;

                return root.nativeElement.querySelector(MDCLinearProgressFoundation.strings.PRIMARY_BAR_SELECTOR);
            },
            getBuffer: function getBuffer() {
                var root = _this._root;

                return root.nativeElement.querySelector(MDCLinearProgressFoundation.strings.BUFFER_SELECTOR);
            },
            hasClass: function hasClass(className) {
                var renderer = _this._renderer,
                    root = _this._root;

                return renderer.parentNode(root.nativeElement).classList.contains(className);
            },
            removeClass: function removeClass(className) {
                var renderer = _this._renderer,
                    root = _this._root;

                renderer.removeClass(root.nativeElement, className);
            },
            setStyle: function setStyle(el, styleProperty, value) {
                var renderer = _this._renderer;

                renderer.setStyle(el, styleProperty, value);
            }
        };
        this._foundation = new MDCLinearProgressFoundation(this._mdcAdapter);
    }

    _createClass(LinearProgressComponent, [{
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
            this._foundation.init();
        }
    }, {
        key: "open",
        value: function open() {
            this._foundation.open();
        }
    }, {
        key: "close",
        value: function close() {
            this._foundation.close();
        }
    }, {
        key: "buffer",
        set: function set(value) {
            this._foundation.setBuffer(value);
        }
    }, {
        key: "progress",
        set: function set(value) {
            this._foundation.setProgress(value);
        }
    }, {
        key: "classIndeterminate",
        get: function get() {
            return this.indeterminate ? 'mdc-linear-progress--indeterminate' : '';
        }
    }, {
        key: "classReversed",
        get: function get() {
            return this.reversed ? 'mdc-linear-progress--reversed' : '';
        }
    }, {
        key: "classAccent",
        get: function get() {
            return this.accent ? 'mdc-linear-progress--accent' : '';
        }
    }]);

    return LinearProgressComponent;
}();
__decorate([core_1.Input(), __metadata("design:type", Boolean)], LinearProgressComponent.prototype, "indeterminate", void 0);
__decorate([core_1.Input(), __metadata("design:type", Boolean)], LinearProgressComponent.prototype, "reversed", void 0);
__decorate([core_1.Input(), __metadata("design:type", Boolean)], LinearProgressComponent.prototype, "accent", void 0);
__decorate([core_1.Input(), __metadata("design:type", Number), __metadata("design:paramtypes", [Number])], LinearProgressComponent.prototype, "buffer", null);
__decorate([core_1.Input(), __metadata("design:type", Number), __metadata("design:paramtypes", [Number])], LinearProgressComponent.prototype, "progress", null);
__decorate([core_1.HostBinding('attr.role'), __metadata("design:type", String)], LinearProgressComponent.prototype, "role", void 0);
__decorate([core_1.HostBinding('class'), __metadata("design:type", String)], LinearProgressComponent.prototype, "className", void 0);
__decorate([core_1.HostBinding('class.mdc-linear-progress--indeterminate'), __metadata("design:type", String), __metadata("design:paramtypes", [])], LinearProgressComponent.prototype, "classIndeterminate", null);
__decorate([core_1.HostBinding('class.mdc-linear-progress--reversed'), __metadata("design:type", String), __metadata("design:paramtypes", [])], LinearProgressComponent.prototype, "classReversed", null);
__decorate([core_1.HostBinding('class.mdc-linear-progress--accent'), __metadata("design:type", String), __metadata("design:paramtypes", [])], LinearProgressComponent.prototype, "classAccent", null);
LinearProgressComponent = __decorate([core_1.Component({
    selector: 'mdc-linear-progress',
    template: __webpack_require__(700),
    styles: [String(MDC_PROGRESS_STYLES)],
    encapsulation: core_1.ViewEncapsulation.None
}), __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])], LinearProgressComponent);
exports.LinearProgressComponent = LinearProgressComponent;

/***/ }),

/***/ 686:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(410)(undefined);
// imports


// module
exports.push([module.i, "/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns \"dark\" for dark text and \"light\" for light text.\n */\n/*\n  Main theme colors.\n  If you're a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/**\n * Applies the correct theme color style to the specified property.\n * $property is typically color or background-color, but can be any CSS property that accepts color values.\n * $style should be one of the map keys in $mdc-theme-property-values (_variables.scss).\n */\n/**\n * Creates a rule to be used in MDC-Web components for dark theming, and applies the provided contents.\n * Should provide the $root-selector option if applied to anything other than the root selector.\n * When used with a modifier class, provide a second argument of `true` for the $compound parameter\n * to specify that this should be attached as a compound class.\n *\n * Usage example:\n *\n * ```scss\n * .mdc-foo {\n *   color: black;\n *\n *   @include mdc-theme-dark {\n *     color: white;\n *   }\n *\n *   &__bar {\n *     background: black;\n *\n *     @include mdc-theme-dark(\".mdc-foo\") {\n *       background: white;\n *     }\n *   }\n * }\n *\n * .mdc-foo--disabled {\n *   opacity: .38;\n *\n *   @include mdc-theme-dark(\".mdc-foo\", true) {\n *     opacity: .5;\n *   }\n * }\n * ```\n */\n@keyframes primary-indeterminate-translate {\n  0% {\n    transform: translateX(0); }\n  20% {\n    animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);\n    transform: translateX(0); }\n  59.15% {\n    animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);\n    transform: translateX(83.67142%); }\n  100% {\n    transform: translateX(200.61106%); } }\n\n@keyframes primary-indeterminate-scale {\n  0% {\n    transform: scaleX(0.08); }\n  36.65% {\n    animation-timing-function: cubic-bezier(0.33473, 0.12482, 0.78584, 1);\n    transform: scaleX(0.08); }\n  69.15% {\n    animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);\n    transform: scaleX(0.66148); }\n  100% {\n    transform: scaleX(0.08); } }\n\n@keyframes secondary-indeterminate-translate {\n  0% {\n    animation-timing-function: cubic-bezier(0.15, 0, 0.51506, 0.40969);\n    transform: translateX(0); }\n  25% {\n    animation-timing-function: cubic-bezier(0.31033, 0.28406, 0.8, 0.73371);\n    transform: translateX(37.65191%); }\n  48.35% {\n    animation-timing-function: cubic-bezier(0.4, 0.62704, 0.6, 0.90203);\n    transform: translateX(84.38617%); }\n  100% {\n    transform: translateX(160.27778%); } }\n\n@keyframes secondary-indeterminate-scale {\n  0% {\n    animation-timing-function: cubic-bezier(0.20503, 0.05705, 0.57661, 0.45397);\n    transform: scaleX(0.08); }\n  19.15% {\n    animation-timing-function: cubic-bezier(0.15231, 0.19643, 0.64837, 1.00432);\n    transform: scaleX(0.4571); }\n  44.15% {\n    animation-timing-function: cubic-bezier(0.25776, -0.00316, 0.21176, 1.38179);\n    transform: scaleX(0.72796); }\n  100% {\n    transform: scaleX(0.08); } }\n\n@keyframes buffering {\n  to {\n    transform: translateX(-10px); } }\n\n@keyframes primary-indeterminate-translate-reverse {\n  0% {\n    transform: translateX(0); }\n  20% {\n    animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);\n    transform: translateX(0); }\n  59.15% {\n    animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);\n    transform: translateX(-83.67142%); }\n  100% {\n    transform: translateX(-200.61106%); } }\n\n@keyframes secondary-indeterminate-translate-reverse {\n  0% {\n    animation-timing-function: cubic-bezier(0.15, 0, 0.51506, 0.40969);\n    transform: translateX(0); }\n  25% {\n    animation-timing-function: cubic-bezier(0.31033, 0.28406, 0.8, 0.73371);\n    transform: translateX(-37.65191%); }\n  48.35% {\n    animation-timing-function: cubic-bezier(0.4, 0.62704, 0.6, 0.90203);\n    transform: translateX(-84.38617%); }\n  100% {\n    transform: translateX(-160.27778%); } }\n\n@keyframes buffering-reverse {\n  to {\n    transform: translateX(10px); } }\n\n.mdc-linear-progress {\n  position: relative;\n  width: 100%;\n  height: 4px;\n  transform: translateZ(0);\n  transition: opacity 250ms 0ms cubic-bezier(0.4, 0, 1, 1);\n  overflow: hidden; }\n  .mdc-linear-progress__bar {\n    animation: none;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    transform-origin: top left;\n    transition: transform 250ms 0ms cubic-bezier(0.4, 0, 1, 1); }\n  .mdc-linear-progress__bar-inner {\n    background-color: #3f51b5;\n    background-color: var(--mdc-theme-primary, #3f51b5);\n    animation: none;\n    display: inline-block;\n    position: absolute;\n    width: 100%;\n    height: 100%; }\n  .mdc-linear-progress--accent .mdc-linear-progress__bar-inner {\n    background-color: #ff4081;\n    background-color: var(--mdc-theme-accent, #ff4081); }\n  .mdc-linear-progress__buffering-dots {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    background-image: url(\"data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E\");\n    background-repeat: repeat-x;\n    background-size: 10px 4px;\n    animation: buffering 250ms infinite linear; }\n  .mdc-linear-progress__buffer {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    transform-origin: top left;\n    transition: transform 250ms 0ms cubic-bezier(0.4, 0, 1, 1);\n    background-color: #e6e6e6; }\n  .mdc-linear-progress__secondary-bar {\n    visibility: hidden; }\n  .mdc-linear-progress--indeterminate .mdc-linear-progress__bar {\n    transition: none; }\n  .mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {\n    animation: primary-indeterminate-translate 2s infinite linear;\n    left: -145.166611%; }\n    .mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner {\n      animation: primary-indeterminate-scale 2s infinite linear; }\n  .mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {\n    animation: secondary-indeterminate-translate 2s infinite linear;\n    left: -54.888891%;\n    visibility: visible; }\n    .mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar > .mdc-linear-progress__bar-inner {\n      animation: secondary-indeterminate-scale 2s infinite linear; }\n  .mdc-linear-progress--reversed .mdc-linear-progress__bar,\n  .mdc-linear-progress--reversed .mdc-linear-progress__buffer {\n    right: 0;\n    transform-origin: center right; }\n  .mdc-linear-progress--reversed .mdc-linear-progress__primary-bar {\n    animation-name: primary-indeterminate-translate-reverse; }\n  .mdc-linear-progress--reversed .mdc-linear-progress__secondary-bar {\n    animation-name: secondary-indeterminate-translate-reverse; }\n  .mdc-linear-progress--reversed .mdc-linear-progress__buffering-dots {\n    animation: buffering-reverse 250ms infinite linear; }\n  .mdc-linear-progress--closed {\n    opacity: 0; }\n\n.mdc-linear-progress--indeterminate.mdc-linear-progress--reversed .mdc-linear-progress__primary-bar {\n  right: -145.166611%;\n  left: auto; }\n\n.mdc-linear-progress--indeterminate.mdc-linear-progress--reversed .mdc-linear-progress__secondary-bar {\n  right: -54.888891%;\n  left: auto; }\n", ""]);

// exports


/***/ }),

/***/ 687:
/***/ (function(module, exports) {

module.exports = "<navbar></navbar>\r\n<div class=\"mdc-toolbar-fixed-adjust\">\r\n\t<router-outlet></router-outlet>\r\n</div>\r\n";

/***/ }),

/***/ 688:
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"start start\" class=\"mdc-padding\">\r\n  <h1 mdc-typography-display1>Buttons</h1>\r\n  <p mdc-typography-subheading2>The MDC Button component is a spec-aligned button component adhering to the Material Design button requirements.</p>\r\n  <a href=\"https://github.com/material-components/material-components-web/tree/master/packages/mdc-button\">Google Material Components documentation</a>\r\n  <h1 mdc-typography-headline>Usage</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[import { ButtonModule } from '@angular-mdc/web';]]></pre>\r\n  </div>\r\n  <div fxLayout=\"row\" fxLayout.lt-md=\"column\">\r\n    <div fxLayout=\"column\">\r\n      <h1 mdc-typography-headline>API reference</h1>\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Attribute</th>\r\n            <th>Description</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() type: string</pre></td>\r\n            <td>Input type of button (e.g. button, submit).</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() dense: boolean</pre></td>\r\n            <td>Compresses the button text to make it slightly smaller.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() raised: boolean</pre></td>\r\n            <td>Elevates the button and creates a colored background.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() compact: boolean</pre></td>\r\n            <td>Reduces the amount of horizontal padding in the button.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() primary: boolean</pre></td>\r\n            <td>Colors the button with the primary color.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() accent: boolean</pre></td>\r\n            <td>Colors the button with the accent color.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() disabled: string</pre></td>\r\n            <td>Disables the component.</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <div fxLayout=\"column\" fxFlexOffset.gt-md=\"5\">\r\n      <h1 mdc-typography-headline>Events</h1>\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Event</th>\r\n            <th>Description</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@HostListener() keydown</pre></td>\r\n            <td>Show ripple on keyboard down event.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@HostListener() keyup</pre></td>\r\n            <td>Show ripple on keyboard up event.</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  <h1 mdc-typography-headline>Examples</h1>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <button mdc-button [accent]=\"true\">Button</button>\r\n    </div>\r\n    <p>Accent</p>\r\n    <pre class=\"prettyprint\">&lt;button mdc-button [accent]=\"true\"&gt;Accent&lt;/button&gt;</pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <button mdc-button [raised]=\"true\">Button</button>\r\n    </div>\r\n    <p>Raised</p>\r\n    <pre class=\"prettyprint\">&lt;button mdc-button [raised]=\"true\"&gt;Raised&lt;/button&gt;</pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <button mdc-button [dense]=\"true\" [raised]=\"true\">Button</button>\r\n    </div>\r\n    <p>Dense and Raised</p>\r\n    <pre class=\"prettyprint\">&lt;button mdc-button [dense]=\"true\" [raised]=\"true\"&gt;Dense and Raised&lt;/button&gt;</pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <button mdc-button [compact]=\"true\" [raised]=\"true\">Button</button>\r\n    </div>\r\n    <p>Compact and Raised</p>\r\n    <pre class=\"prettyprint\">&lt;button mdc-button [compact]=\"true\" [raised]=\"true\"&gt;Compact and Raised&lt;/button&gt;</pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <button mdc-button [accent]=\"true\" [raised]=\"true\">Button</button>\r\n    </div>\r\n    <p>Accent and Raised</p>\r\n    <pre class=\"prettyprint\">&lt;button mdc-button [accent]=\"true\" [raised]=\"true\"&gt;Accent and Raised&lt;/button&gt;</pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <button mdc-button [primary]=\"true\" [raised]=\"true\">Button</button>\r\n    </div>\r\n    <p>Primary and Raised</p>\r\n    <pre class=\"prettyprint\">&lt;button mdc-button [primary]=\"true\" [raised]=\"true\"&gt;Primary and Raised&lt;/button&gt;</pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <button mdc-button [primary]=\"true\" [raised]=\"true\" disabled>Button</button>\r\n    </div>\r\n    <p>Disabled</p>\r\n    <pre class=\"prettyprint\">&lt;button mdc-button [primary]=\"true\" [raised]=\"true\" disabled&gt;Disabled&lt;/button&gt;</pre>\r\n  </div>\r\n</div>\r\n";

/***/ }),

/***/ 689:
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"start start\" class=\"mdc-padding\">\r\n  <h1 mdc-typography-display1>Checkbox</h1>\r\n  <p mdc-typography-subheading2>The MDC Checkbox component is a spec-aligned checkbox component adhering to the Material Design checkbox requirements.</p>\r\n  <a href=\"https://github.com/material-components/material-components-web/tree/master/packages/mdc-checkbox\">Google Material Components documentation</a>\r\n  <h1 mdc-typography-headline>Usage</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[import { CheckboxModule } from '@angular-mdc/web';]]></pre>\r\n  </div>\r\n  <h1 mdc-typography-headline>Directives</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[@Directive({selector: '[mdc-checkbox-label]'})]]></pre>\r\n  </div>\r\n  <div fxLayout=\"row\" fxLayout.lt-md=\"column\">\r\n    <div fxLayout=\"column\">\r\n      <h1 mdc-typography-headline>API reference</h1>\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Attribute</th>\r\n            <th>Description</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() checked: boolean</pre></td>\r\n            <td>Boolean for verifying the checked value.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() indeterminate: boolean</pre></td>\r\n            <td>To represent a checkbox with three states (e.g. a nested list of checkable items).</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() labelId: string</pre></td>\r\n            <td></td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() disabled: boolean</pre></td>\r\n            <td>Disables the component.</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <div fxLayout=\"column\" fxFlexOffset.gt-md=\"5\">\r\n      <h1 mdc-typography-headline>Events</h1>\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Event</th>\r\n            <th>Description</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Output() change</pre></td>\r\n            <td>Event dispatched on value change.</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  <h1 mdc-typography-headline>Examples</h1>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <mdc-form-field>\r\n        <mdc-checkbox [(ngModel)]=\"isChecked\"></mdc-checkbox>\r\n        <label mdc-checkbox-label [id]=\"labelId\">Checkbox is {{isChecked}}</label>\r\n      </mdc-form-field>\r\n    </div>\r\n    <pre class=\"prettyprint\">\r\n&lt;mdc-form-field&gt;\r\n  &lt;mdc-checkbox [(ngModel)]=\"isChecked\"&gt;&lt;/mdc-checkbox&gt;\r\n  &lt;label mdc-checkbox-label [id]=\"labelId\"&gt;Label text&lt;/label&gt;\r\n&lt;/mdc-form-field&gt;\r\n       </pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <mdc-form-field>\r\n        <mdc-checkbox [(ngModel)]=\"isChecked\" [disabled]=\"true\"></mdc-checkbox>\r\n        <label mdc-checkbox-label [id]=\"labelId\">Checkbox is disabled</label>\r\n      </mdc-form-field>\r\n    </div>\r\n    <p>Disabled</p>\r\n    <pre class=\"prettyprint\">\r\n&lt;mdc-form-field&gt;\r\n  &lt;mdc-checkbox [(ngModel)]=\"isChecked\" [disabled]=\"true\"&gt;&lt;/mdc-checkbox&gt;\r\n  &lt;label mdc-checkbox-label [id]=\"labelId\"&gt;Label text&lt;/label&gt;\r\n&lt;/mdc-form-field&gt;\r\n       </pre>\r\n  </div>\r\n</div>\r\n";

/***/ }),

/***/ 690:
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"start start\" class=\"mdc-padding\">\r\n  <h1 mdc-typography-display1>Floating Action Buttons</h1>\r\n  <p mdc-typography-subheading2>The MDC FAB component is a spec-aligned button component adhering to the Material Design button requirements.</p>\r\n  <a href=\"https://github.com/material-components/material-components-web/tree/master/packages/mdc-button\">Google Material Components documentation</a>\r\n  <h1 mdc-typography-headline>Usage</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[import { FabModule } from '@angular-mdc/web';]]></pre>\r\n  </div>\r\n  <h1 mdc-typography-headline>Directives</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[@Directive({selector: '[mdc-fab-icon]'})]]></pre>\r\n  </div>\r\n  <div fxLayout=\"row\" fxLayout.lt-md=\"column\">\r\n    <div fxLayout=\"column\">\r\n      <h1 mdc-typography-headline>API reference</h1>\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Attribute</th>\r\n            <th>Description</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() mini: boolean</pre></td>\r\n            <td>Makes the fab smaller (40 x 40 pixels).</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() plain: boolean</pre></td>\r\n            <td>Makes the FAB have a white background.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() disabled: string</pre></td>\r\n            <td>Disables the component.</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <div fxLayout=\"column\" fxFlexOffset.gt-md=\"5\">\r\n      <h1 mdc-typography-headline>Events</h1>\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Event</th>\r\n            <th>Description</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@HostListener() keydown</pre></td>\r\n            <td>Show ripple on keyboard down event.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@HostListener() keyup</pre></td>\r\n            <td>Show ripple on keyboard up event.</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  <h1 mdc-typography-headline>Examples</h1>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <button mdc-fab aria-label=\"Search\">\r\n        <span mdc-fab-icon>search</span>\r\n      </button>\r\n    </div>\r\n    <p>Default</p>\r\n    <pre class=\"prettyprint\">\r\n&lt;button mdc-fab aria-label=\"Search\"&gt;\r\n  &lt;span mdc-fab-icon>search&lt;/span&gt;\r\n&lt;/button&gt;</pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <button mdc-fab [mini]=\"true\" aria-label=\"Search\">\r\n        <span mdc-fab-icon>search</span>\r\n      </button>\r\n    </div>\r\n    <p>Mini</p>\r\n    <pre class=\"prettyprint\">\r\n&lt;button mdc-fab [mini]=\"true\" aria-label=\"Search\"&gt;\r\n  &lt;span mdc-fab-icon>search&lt;/span&gt;\r\n&lt;/button&gt;</pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <button mdc-fab [plain]=\"true\" aria-label=\"Search\">\r\n        <span mdc-fab-icon>search</span>\r\n      </button>\r\n    </div>\r\n    <p>Plain</p>\r\n    <pre class=\"prettyprint\">\r\n&lt;button mdc-fab [plain]=\"true\" aria-label=\"Search\"&gt;\r\n  &lt;span mdc-fab-icon>search&lt;/span&gt;\r\n&lt;/button&gt;</pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <button mdc-fab [plain]=\"true\" [mini]=\"true\" aria-label=\"Search\">\r\n        <span mdc-fab-icon>search</span>\r\n      </button>\r\n    </div>\r\n    <p>Plain and Mini</p>\r\n    <pre class=\"prettyprint\">\r\n&lt;button mdc-fab [plain]=\"true\" [mini]=\"true\" aria-label=\"Search\"&gt;\r\n  &lt;span mdc-fab-icon>search&lt;/span&gt;\r\n&lt;/button&gt;</pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <button mdc-fab disabled aria-label=\"Search\">\r\n        <span mdc-fab-icon>search</span>\r\n      </button>\r\n    </div>\r\n    <p>Disabled</p>\r\n    <pre class=\"prettyprint\">\r\n&lt;button mdc-fab disabled aria-label=\"Search\"&gt;\r\n  &lt;span mdc-fab-icon>search&lt;/span&gt;\r\n&lt;/button&gt;</pre>\r\n  </div>\r\n</div>\r\n";

/***/ }),

/***/ 691:
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxLayoutAlign=\"center\" style=\"padding-top: 20px;\">\r\n  <div fxLayout=\"center\" fxLayoutWrap fxFlex=\"70\">\r\n    <div class=\"mdc-card home-card\">\r\n      <section class=\"mdc-card__primary\">\r\n        <h1 class=\"mdc-card__title mdc-card__title--large\">Buttons</h1>\r\n      </section>\r\n      <section class=\"mdc-card__supporting-text\">\r\n        Buttons communicate the action that will occur when the user touches them.\r\n      </section>\r\n      <section class=\"mdc-card__actions\">\r\n        <button mdc-button [compact]=\"true\" class=\"mdc-card__action\" (click)=\"viewComponent('button-demo');\">View Demo</button>\r\n      </section>\r\n    </div>\r\n    <div class=\"mdc-card home-card\">\r\n      <section class=\"mdc-card__primary\">\r\n        <h1 class=\"mdc-card__title mdc-card__title--large\">Checkbox</h1>\r\n      </section>\r\n      <section class=\"mdc-card__supporting-text\">\r\n        Checkboxes allow the user to select multiple options from a set.\r\n      </section>\r\n      <section class=\"mdc-card__actions\">\r\n        <button mdc-button [compact]=\"true\" class=\"mdc-card__action\" (click)=\"viewComponent('checkbox-demo');\">View Demo</button>\r\n      </section>\r\n    </div>\r\n    <div class=\"mdc-card home-card\">\r\n      <section class=\"mdc-card__primary\">\r\n        <h1 class=\"mdc-card__title mdc-card__title--large\">Floating Action Button (FAB)</h1>\r\n      </section>\r\n      <section class=\"mdc-card__supporting-text\">\r\n        A floating action button represents the primary action in an application.\r\n      </section>\r\n      <section class=\"mdc-card__actions\">\r\n        <button mdc-button [compact]=\"true\" class=\"mdc-card__action\" (click)=\"viewComponent('fab-demo');\">View Demo</button>\r\n      </section>\r\n    </div>\r\n    <div class=\"mdc-card home-card\">\r\n      <section class=\"mdc-card__primary\">\r\n        <h1 class=\"mdc-card__title mdc-card__title--large\">Linear Progress</h1>\r\n      </section>\r\n      <section class=\"mdc-card__supporting-text\">\r\n        Progress and activity indicators are visual indications of an app loading content.\r\n      </section>\r\n      <section class=\"mdc-card__actions\">\r\n        <button mdc-button [compact]=\"true\" class=\"mdc-card__action\" (click)=\"viewComponent('linear-progress-demo');\">View Demo</button>\r\n      </section>\r\n    </div>\r\n    <div class=\"mdc-card home-card\">\r\n      <section class=\"mdc-card__primary\">\r\n        <h1 class=\"mdc-card__title mdc-card__title--large\">Menu</h1>\r\n      </section>\r\n      <section class=\"mdc-card__supporting-text\">\r\n        Menus display a list of choices on a transient sheet of material.\r\n      </section>\r\n      <section class=\"mdc-card__actions\">\r\n        <button mdc-button [compact]=\"true\" class=\"mdc-card__action\" (click)=\"viewComponent('menu-demo');\">View Demo</button>\r\n      </section>\r\n    </div>\r\n    <div class=\"mdc-card home-card\">\r\n      <section class=\"mdc-card__primary\">\r\n        <h1 class=\"mdc-card__title mdc-card__title--large\">Snackbar</h1>\r\n      </section>\r\n      <section class=\"mdc-card__supporting-text\">\r\n        Snackbars provide brief feedback about an operation through a message at the bottom of the screen.\r\n      </section>\r\n      <section class=\"mdc-card__actions\">\r\n        <button mdc-button [compact]=\"true\" class=\"mdc-card__action\" (click)=\"viewComponent('snackbar-demo');\">View Demo</button>\r\n      </section>\r\n    </div>\r\n    <div class=\"mdc-card home-card\">\r\n      <section class=\"mdc-card__primary\">\r\n        <h1 class=\"mdc-card__title mdc-card__title--large\">Switch</h1>\r\n      </section>\r\n      <section class=\"mdc-card__supporting-text\">\r\n        On/off switches toggle the state of a single settings option.\r\n      </section>\r\n      <section class=\"mdc-card__actions\">\r\n        <button mdc-button [compact]=\"true\" class=\"mdc-card__action\" (click)=\"viewComponent('switch-demo');\">View Demo</button>\r\n      </section>\r\n    </div>\r\n    <div class=\"mdc-card home-card\">\r\n      <section class=\"mdc-card__primary\">\r\n        <h1 class=\"mdc-card__title mdc-card__title--large\">Textfield</h1>\r\n      </section>\r\n      <section class=\"mdc-card__supporting-text\">\r\n        <p>Text fields allow users to input, edit, and select text.</p>\r\n      </section>\r\n      <section class=\"mdc-card__actions\">\r\n        <button mdc-button [compact]=\"true\" class=\"mdc-card__action\" (click)=\"viewComponent('textfield-demo');\">View Demo</button>\r\n      </section>\r\n    </div>\r\n    <div class=\"mdc-card home-card\">\r\n      <section class=\"mdc-card__primary\">\r\n        <h1 class=\"mdc-card__title mdc-card__title--large\">Toolbar</h1>\r\n      </section>\r\n      <section class=\"mdc-card__supporting-text\">\r\n        Toolbars appear a step above the sheet of material affected by their actions.\r\n      </section>\r\n      <section class=\"mdc-card__actions\">\r\n        <button mdc-button [compact]=\"true\" class=\"mdc-card__action\" (click)=\"viewComponent('toolbar-demo');\">View Demo</button>\r\n      </section>\r\n    </div>\r\n    <div class=\"mdc-card home-card\">\r\n      <section class=\"mdc-card__primary\">\r\n        <h1 class=\"mdc-card__title mdc-card__title--large\">Typography</h1>\r\n      </section>\r\n      <section class=\"mdc-card__supporting-text\">\r\n        Material Design typography uses the Roboto font.\r\n      </section>\r\n      <section class=\"mdc-card__actions\">\r\n        <button mdc-button [compact]=\"true\" class=\"mdc-card__action\" (click)=\"viewComponent('typography-demo');\">View Demo</button>\r\n      </section>\r\n    </div>\r\n  </div>\r\n";

/***/ }),

/***/ 692:
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"start start\" class=\"mdc-padding\">\r\n  <h1 mdc-typography-display1>Linear Progress</h1>\r\n  <p mdc-typography-subheading2>The MDC Linear Progress component is a spec-aligned linear progress indicator component adhering to the Material Design progress & activity requirements.</p>\r\n  <a href=\"https://github.com/material-components/material-components-web/tree/master/packages/mdc-button\">Google Material Components documentation</a>\r\n  <h1 mdc-typography-headline>Usage</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[import { LinearProgressModule } from '@angular-mdc/web';]]></pre>\r\n  </div>\r\n  <div fxLayout=\"column\">\r\n    <h1 mdc-typography-headline>API reference</h1>\r\n    <table>\r\n      <thead>\r\n        <tr>\r\n          <th>Attribute</th>\r\n          <th>Description</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr>\r\n          <td><pre class=\"prettyprint\">@Input() indeterminate: boolean</pre></td>\r\n          <td>Puts the linear progress indicator in an indeterminate state.</td>\r\n        </tr>\r\n        <tr>\r\n          <td><pre class=\"prettyprint\">@Input() reversed: boolean</pre></td>\r\n          <td>Reverses the direction of the linear progress indicator.</td>\r\n        </tr>\r\n        <tr>\r\n          <td><pre class=\"prettyprint\">@Input() accent: boolean</pre></td>\r\n          <td>Colors the button with the accent color.</td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n    <table>\r\n      <thead>\r\n        <tr>\r\n          <th>Function</th>\r\n          <th>Description</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr>\r\n          <td><pre class=\"prettyprint\">open()</pre></td>\r\n          <td>Puts the component in the open state.</td>\r\n        </tr>\r\n        <tr>\r\n          <td><pre class=\"prettyprint\">close()</pre></td>\r\n          <td>Puts the component in the closed state.</td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <h1 mdc-typography-headline>Examples</h1>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <mdc-linear-progress [indeterminate]=\"true\"></mdc-linear-progress>\r\n    <p>Indeterminate</p>\r\n    <pre class=\"prettyprint\">\r\n&lt;mdc-linear-progress [indeterminate]=\"true\"&gt;&lt;/mdc-linear-progress&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <mdc-linear-progress [indeterminate]=\"false\"></mdc-linear-progress>\r\n    <p>Determinate</p>\r\n    <pre class=\"prettyprint\">\r\n&lt;mdc-linear-progress [indeterminate]=\"false\"&gt;&lt;/mdc-linear-progress&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <mdc-linear-progress [indeterminate]=\"true\" [reversed]=\"true\"></mdc-linear-progress>\r\n    <p>Reversed</p>\r\n    <pre class=\"prettyprint\">\r\n&lt;mdc-linear-progress [indeterminate]=\"true\" [reversed]=\"true\"&gt;&lt;/mdc-linear-progress&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <mdc-linear-progress [indeterminate]=\"true\" [accent]=\"true\"></mdc-linear-progress>\r\n    <p>Accent</p>\r\n    <pre class=\"prettyprint\">\r\n&lt;mdc-linear-progress [indeterminate]=\"true\" [accent]=\"true\"&gt;&lt;/mdc-linear-progress&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <mdc-linear-progress #demobar1 [indeterminate]=\"true\"></mdc-linear-progress>\r\n    <p>Progress and Buffer methods</p>\r\n    <pre class=\"prettyprint\">\r\nthis.demobar1.progress = 0.5;\r\nthis.demobar1.buffer = 0.65;\r\n\r\n&lt;mdc-linear-progress #demobar1 [indeterminate]=\"true\"&gt;&lt;/mdc-linear-progress&gt;\r\n      </pre>\r\n  </div>\r\n</div>\r\n";

/***/ }),

/***/ 693:
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"start start\" class=\"mdc-padding\">\r\n  <h1 mdc-typography-display1>Menu</h1>\r\n  <p mdc-typography-subheading2>The MDC Menu component is a spec-aligned menu component adhering to the Material Design menu requirements.</p>\r\n  <a href=\"https://github.com/material-components/material-components-web/tree/master/packages/mdc-menu\">Google Material Components documentation</a>\r\n  <h1 mdc-typography-headline>Usage</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[import { MenuModule } from '@angular-mdc/web';]]></pre>\r\n  </div>\r\n  <h1 mdc-typography-headline>Directives</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[@Directive({selector: '[mdc-menu-item]'})]]></pre>\r\n  </div>\r\n  <div fxLayout=\"row\" fxLayout.lt-md=\"column\">\r\n    <div fxLayout=\"column\">\r\n      <h1 mdc-typography-headline>API reference</h1>\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Attribute</th>\r\n            <th>Description</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() items: MenuItemDirective[]</pre></td>\r\n            <td></td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <div fxLayout=\"column\" fxFlexOffset.gt-md=\"20\">\r\n      <h1 mdc-typography-headline>Events</h1>\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Event</th>\r\n            <th>Description</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">cancel</pre></td>\r\n            <td>Dispatches an event that the menu closed with no selection made.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">select</pre></td>\r\n            <td>Dispatches an event that a menu item has been selected.</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  <h1 mdc-typography-headline>Examples</h1>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <div class=\"mdc-menu-anchor\">\r\n        <button mdc-fab aria-label=\"Profile\" (click)=\"showMenu();\">\r\n          <span mdc-fab-icon>person</span>\r\n        </button>\r\n        <mdc-menu #menu (cancel)=\"handleMenuCancel();\" (select)=\"handleMenuSelect($event);\" [items]=\"menuItems\"></mdc-menu>\r\n      </div>\r\n    </div>\r\n    <pre class=\"prettyprint\">\r\n&lt;div class=\"mdc-menu-anchor\"&gt;\r\n  &lt;button mdc-fab aria-label=\"Profile\" (click)=\"showMenu();\"&gt;\r\n    &lt;span mdc-fab-icon>person&lt;/span&gt;\r\n  &lt;/button&gt;\r\n  &lt;mdc-menu #menu (cancel)=\"handleMenuCancel();\"\r\n   (select)=\"handleMenuSelect($event);\"\r\n   [items]=\"menuItems\"&gt;&lt;/mdc-menu&gt;\r\n&lt;/div&gt;\r\n      </pre>\r\n  </div>\r\n</div>\r\n<!--     \r\n    <p>Selected index : {{selectedIndex}}</p>\r\n    <mdc-textfield [(ngModel)]=\"focusedItemIndex\" label=\"Set focus to item index\" type=\"number\"></mdc-textfield>\r\n -->\r\n";

/***/ }),

/***/ 694:
/***/ (function(module, exports) {

module.exports = "<mdc-toolbar [flexible]=\"false\" [fixed]=\"true\" [waterfall]=\"false\" [fixedLastrow]=\"false\" [flexibleTitle]=\"true\">\r\n  <mdc-toolbar-row>\r\n    <mdc-toolbar-section [alignStart]=\"true\">\r\n      <a href=\"#\" class=\"material-icons\" alt=\"Home\">{{router.url == '/' ? 'menu' : 'arrow_back'}}</a>\r\n      <span mdc-toolbar-title fxShow fxHide.xs>Angular for Material Design Components</span>\r\n      <span mdc-toolbar-title fxHide fxShow.xs>angular-mdc-web</span>\r\n    </mdc-toolbar-section>\r\n    <mdc-toolbar-section [alignEnd]=\"true\">\r\n      <a href=\"https://github.com/trimox/angular-mdc-web\" alt=\"GitHub\" class=\"material-icons\">\r\n        <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\">\r\n          <title>github-circle-white-transparent</title>\r\n          <path d=\"M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0 0 10 0z\" fill=\"#FFF\" fill-rule=\"evenodd\" />\r\n        </svg>\r\n      </a>\r\n    </mdc-toolbar-section>\r\n  </mdc-toolbar-row>\r\n</mdc-toolbar>\r\n";

/***/ }),

/***/ 695:
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"start start\" class=\"mdc-padding\">\r\n  <h1 mdc-typography-display1>Snackbar</h1>\r\n  <p mdc-typography-subheading2>The MDC Snackbar component is a spec-aligned snackbar/toast component adhering to the Material Design snackbars & toasts requirements.</p>\r\n  <a href=\"https://github.com/material-components/material-components-web/tree/master/packages/mdc-snackbar\">Google Material Components documentation</a>\r\n  <h1 mdc-typography-headline>Usage</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[import { SnackbarModule } from '@angular-mdc/web';]]></pre>\r\n  </div>\r\n  <div fxLayout=\"row\" fxLayout.lt-md=\"column\">\r\n    <div fxLayout=\"column\">\r\n      <h1 mdc-typography-headline>API reference</h1>\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Attribute</th>\r\n            <th>Description</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() dismissOnAction: boolean</pre></td>\r\n            <td>Dismiss snackbar when the user presses the action button. Defaults to true</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <div fxLayout=\"column\" fxFlexOffset.gt-md=\"5\">\r\n      <h1 mdc-typography-headline>Methods</h1>\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Method</th>\r\n            <th>Description</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">show(data)</pre></td>\r\n            <td>Show snackbar using argument properties.</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  <h1 mdc-typography-headline>Examples</h1>\r\n  <div class=\"mdc-padding\">\r\n    <button mdc-button [primary]=\"true\" [raised]=\"true\" (click)=\"showSimple();\">Simple</button>\r\n    <button mdc-button [primary]=\"true\" [raised]=\"true\" (click)=\"showActionButton();\">Show Action</button>\r\n    <button mdc-button [primary]=\"true\" [raised]=\"true\" (click)=\"showMultiline();\">Show Multiline</button>\r\n    <button mdc-button [primary]=\"true\" [raised]=\"true\" (click)=\"showMultilineBottom();\">Show Multiline - Bottom</button>\r\n  </div>\r\n</div>\r\n<mdc-snackbar #snack></mdc-snackbar>\r\n";

/***/ }),

/***/ 696:
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"start start\" class=\"mdc-padding\">\r\n  <h1 mdc-typography-display1>Switch</h1>\r\n  <p mdc-typography-subheading2>The MDC Switch component is a spec-aligned switch component adhering to the Material Design switch requirements.</p>\r\n  <a href=\"https://github.com/material-components/material-components-web/tree/master/packages/mdc-switch\">Google Material Components documentation</a>\r\n  <h1 mdc-typography-headline>Usage</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[import { SwitchModule } from '@angular-mdc/web';]]></pre>\r\n  </div>\r\n  <h1 class=\"mdc-typography--headline\">Directives</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[@Directive({selector: '[mdc-switch-label]'})]]></pre>\r\n  </div>\r\n  <div fxLayout=\"row\" fxLayout.lt-md=\"column\">\r\n    <div fxLayout=\"column\">\r\n      <h1 mdc-typography-headline>API reference</h1>\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Attribute</th>\r\n            <th>Description</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() checked: boolean</pre></td>\r\n            <td>Boolean for verifying the checked value.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() labelId: string</pre></td>\r\n            <td></td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() disabled: boolean</pre></td>\r\n            <td>Disables the component.</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <div fxLayout=\"column\" fxFlexOffset.gt-md=\"5\">\r\n      <h1 mdc-typography-headline>Events</h1>\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Event</th>\r\n            <th>Description</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Output() change</pre></td>\r\n            <td>Event dispatched on value change.</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  <h1 mdc-typography-headline>Examples</h1>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <mdc-form-field>\r\n        <mdc-switch [(ngModel)]=\"isSwitchOn\"></mdc-switch>\r\n        <label mdc-switch-label [id]=\"labelId\">off/on</label>\r\n      </mdc-form-field>\r\n      <pre class=\"prettyprint\">\r\n&lt;mdc-form-field&gt;\r\n  &lt;mdc-switch [(ngModel)]=\"isChecked\"&gt;&lt;/mdc-switch&gt;\r\n  &lt;label mdc-switch-label [id]=\"labelId\"&gt;Label text&lt;/label&gt;\r\n&lt;/mdc-form-field&gt;\r\n       </pre>\r\n    </div>\r\n    <div fxLayout=\"column\" class=\"mdc-padding\">\r\n      <div fxFlexAlign=\"start\">\r\n        <mdc-form-field>\r\n          <mdc-switch [(ngModel)]=\"isSwitchOn\" [disabled]=\"true\"></mdc-switch>\r\n          <label mdc-switch-label [id]=\"labelId\">off/on</label>\r\n        </mdc-form-field>\r\n        <p>Disabled</p>\r\n        <pre class=\"prettyprint\">\r\n&lt;mdc-form-field&gt;\r\n  &lt;mdc-switch [(ngModel)]=\"isChecked\" [disabled]=\"true\"&gt;&lt;/mdc-switch&gt;\r\n  &lt;label mdc-switch-label [id]=\"labelId\"&gt;Label text&lt;/label&gt;\r\n&lt;/mdc-form-field&gt;\r\n       </pre>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n";

/***/ }),

/***/ 697:
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"start start\" class=\"mdc-padding\">\r\n  <h1 mdc-typography-display1>Text Field</h1>\r\n  <p mdc-typography-subheading2>The MDC Text Field component provides a textual input field adhering the Material Design specification.</p>\r\n  <a href=\"https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield\">Google Material Components documentation</a>\r\n  <h1 mdc-typography-headline>Usage</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[import { TextfieldModule } from '@angular-mdc/web';]]></pre>\r\n  </div>\r\n  <h1 mdc-typography-headline>Directives</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[@Directive({selector: '[mdc-textfield-helptext]'})]]></pre>\r\n  </div>\r\n  <div fxLayout=\"row\" fxLayout.lt-md=\"column\">\r\n    <div fxLayout=\"column\">\r\n      <h1 mdc-typography-headline>API reference</h1>\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Attribute</th>\r\n            <th>Description</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() id: string</pre></td>\r\n            <td>Unique id of the element.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() type: string = 'text'</pre></td>\r\n            <td>Input type of textfield (e.g. email, password, url).</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() value: string</pre></td>\r\n            <td>The input element's value.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() fullwidth: boolean</pre></td>\r\n            <td>Use to change element to fullwidth textfield.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() multiline: boolean</pre></td>\r\n            <td>Use to allow multiple lines inside the textfield.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() disabled: boolean</pre></td>\r\n            <td>Disables the component.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() required: boolean</pre></td>\r\n            <td>Whether the element is required.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() labelId: string</pre></td>\r\n            <td></td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() label: string</pre></td>\r\n            <td></td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() placeholder: string</pre></td>\r\n            <td>Placeholder attribute of the element.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() tabindex: number</pre></td>\r\n            <td>Tab index of the text element.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() rows: number</pre></td>\r\n            <td>Number of rows for this textarea.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() cols: number</pre></td>\r\n            <td>Number of columns for this textarea.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">@Input() maxlength: number</pre></td>\r\n            <td>Maxlength of characters allowed to be entered.</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <div fxLayout=\"column\" fxFlexOffset.gt-md=\"5\">\r\n      <h1 mdc-typography-headline>Events</h1>\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Event</th>\r\n            <th>Description</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">focus</pre></td>\r\n            <td>Native input element for a \"focus\" event.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">blur</pre></td>\r\n            <td>Native input element for a \"blur\" event.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">input</pre></td>\r\n            <td>Native input element for a \"input\" event.</td>\r\n          </tr>\r\n          <tr>\r\n            <td><pre class=\"prettyprint\">keydown</pre></td>\r\n            <td>Native input element for a \"keydown\" event.</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  <h1 mdc-typography-headline>Examples</h1>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxLayout=\"row\">\r\n      <mdc-form-field>\r\n        <mdc-checkbox [(ngModel)]=\"isDisabled\"></mdc-checkbox>\r\n        <label mdc-checkbox-label [id]=\"labelId\">Disable</label>\r\n      </mdc-form-field>\r\n    </div>\r\n    <div fxFlexAlign=\"start\">\r\n      <mdc-textfield #user [(ngModel)]=\"username\" id=\"username\" label=\"Username\" required [disabled]=\"isDisabled\" aria-controls=\"help-username-val\" (focus)=\"handleFocus($event);\" (blur)=\"handleBlur($event);\" (input)=\"handleInput($event);\" (keydown)=\"handleKeyDown($event);\">\r\n      </mdc-textfield>\r\n      <p mdc-textfield-helptext id=\"help-username-val\" [validation]=\"true\" [persistent]=\"false\">Username is required</p>\r\n    </div>\r\n    <pre class=\"prettyprint\">\r\n&lt;mdc-textfield [(ngModel)]=\"username\"\r\n  id=\"username\"\r\n  label=\"Username\"\r\n  required\r\n  [disabled]=\"isDisabled\"\r\n  aria-controls=\"help-username-val\"\r\n  (focus)=\"handleFocus($event);\"\r\n  (blur)=\"handleBlur($event);\"\r\n  (input)=\"handleInput($event);\"\r\n  (keydown)=\"handleKeyDown($event);\"&gt;\r\n&lt;/mdc-textfield&gt;\r\n&lt;p mdc-textfield-helptext\r\n  id=\"help-username-val\"\r\n  [validation]=\"true\"\r\n  [persistent]=\"false\">Username is required&lt;/p&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <mdc-textfield [(ngModel)]=\"comments\" id=\"comments\" label=\"Comments\" rows=\"8\" cols=\"40\" [multiline]=\"true\"></mdc-textfield>\r\n    </div>\r\n    <p>Multi-line</p>\r\n    <pre class=\"prettyprint\">\r\n&lt;mdc-textfield [(ngModel)]=\"comments\"\r\n  id=\"comments\"\r\n  label=\"Comments\"\r\n  rows=\"8\"\r\n  cols=\"40\"\r\n  [multiline]=\"true\"&gt;\r\n&lt;/mdc-textfield&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div>\r\n      <mdc-textfield [(ngModel)]=\"subject\" id=\"subject\" placeholder=\"Subject\" [fullwidth]=\"true\"></mdc-textfield>\r\n    </div>\r\n    <p>Full-width single line</p>\r\n    <pre class=\"prettyprint\">\r\n&lt;mdc-textfield [(ngModel)]=\"subject\"\r\n  id=\"subject\"\r\n  placeholder=\"Subject\"\r\n  [fullwidth]=\"true\"&gt;\r\n&lt;/mdc-textfield&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div>\r\n      <mdc-textfield [(ngModel)]=\"message\" id=\"message\" placeholder=\"Type your message here\" [fullwidth]=\"true\" [multiline]=\"true\" rows=\"8\"></mdc-textfield>\r\n    </div>\r\n    <p>Full-width multi-line</p>\r\n    <pre class=\"prettyprint\">\r\n&lt;mdc-textfield [(ngModel)]=\"message\"\r\n  id=\"message\"\r\n  placeholder=\"Type your message here\"\r\n  [fullwidth]=\"true\"\r\n  [multiline]=\"true\"\r\n  rows=\"8\"&gt;\r\n&lt;/mdc-textfield&gt;\r\n      </pre>\r\n  </div>\r\n</div>\r\n<!--     <p>Username ngModel : {{username ? username : 'empty'}}</p>\r\n    <p>Focused : {{inputHasFocus}}</p>\r\n    <p>Keydown event count : {{inputKeysPressed}}</p>\r\n    <p>Input event count : {{inputCount}}</p>\r\n -->\r\n";

/***/ }),

/***/ 698:
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"start start\" class=\"mdc-padding\">\r\n  <h1 mdc-typography-display1>Toolbars</h1>\r\n  <p mdc-typography-subheading2>MDC Toolbar acts as a container for multiple rows containing items such as application title, navigation menu, and tabs, among other things. Toolbars scroll with content by default, but supports fixed behavior as well.</p>\r\n  <a href=\"https://github.com/material-components/material-components-web/tree/master/packages/mdc-toolbar\">Google Material Components documentation</a>\r\n  <h1 mdc-typography-headline>Usage</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[import { ToolbarModule } from '@angular-mdc/web';]]></pre>\r\n  </div>\r\n  <h1 mdc-typography-headline>Components</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[@Component({selector: '[mdc-toolbar-section]'})]]></pre>\r\n  </div>\r\n  <h1 mdc-typography-headline>Directives</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[@Directive({selector: '[mdc-toolbar-title]'})]]></pre>\r\n  </div>\r\n  <div fxLayout=\"column\">\r\n    <h1 mdc-typography-headline>API reference</h1>\r\n    <table>\r\n      <thead>\r\n        <tr>\r\n          <th>Attribute</th>\r\n          <th>Description</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr>\r\n          <td><pre class=\"prettyprint\">@Input() fixed: boolean</pre></td>\r\n          <td>Makes toolbar fixed on top and have persistent elavation.</td>\r\n        </tr>\r\n        <tr>\r\n          <td><pre class=\"prettyprint\">@Input() waterfall: boolean</pre></td>\r\n          <td>Removes fixed toolbar persistent elavation; gaining elevation scrolling down the page.</td>\r\n        </tr>\r\n        <tr>\r\n          <td><pre class=\"prettyprint\">@Input() flexible: boolean</pre></td>\r\n          <td>Makes toolbar first row has flexible space.</td>\r\n        </tr>\r\n        <tr>\r\n          <td><pre class=\"prettyprint\">@Input() flexibleTitle: boolean</pre></td>\r\n          <td>Toolbar text has flexible movement.</td>\r\n        </tr>\r\n        <tr>\r\n          <td><pre class=\"prettyprint\">@Input() fixedLastrow: boolean</pre></td>\r\n          <td>Makes only last row of fixed toolbar anchored on top.</td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n    <table>\r\n      <thead>\r\n        <tr>\r\n          <th>Event</th>\r\n          <th>Description</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr>\r\n          <td><pre class=\"prettyprint\">@Output() change <![CDATA[{flexibleExpansionRatio: number})]]></pre>\r\n            <td>Emits the ratio of current flexible space to total flexible space height.</td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <h1 mdc-typography-headline>Examples</h1>\r\n  <div fxLayout=\"column\" class=\"mdc-padding\">\r\n    <div fxFlexAlign=\"start\">\r\n      <mdc-toolbar [flexible]=\"false\" [fixed]=\"false\" [waterfall]=\"false\" [fixedLastrow]=\"false\" [flexibleTitle]=\"true\">\r\n        <mdc-toolbar-row>\r\n          <mdc-toolbar-section [alignStart]=\"true\">\r\n            <a href=\"#\" class=\"material-icons\" aria-label=\"menu\">menu</a>\r\n            <span mdc-toolbar-title>Title</span>\r\n          </mdc-toolbar-section>\r\n          <mdc-toolbar-section [alignEnd]=\"true\">\r\n            <a href=\"#\" class=\"material-icons\" aria-label=\"Download\">file_download</a>\r\n            <a href=\"#\" class=\"material-icons\" aria-label=\"Print this page\">print</a>\r\n            <a href=\"#\" class=\"material-icons\" aria-label=\"Bookmark this page\">bookmark</a>\r\n          </mdc-toolbar-section>\r\n        </mdc-toolbar-row>\r\n      </mdc-toolbar>\r\n      <pre class=\"prettyprint\">\r\n&lt;mdc-toolbar \r\n  [flexible]=\"false\"\r\n  [fixed]=\"false\"\r\n  [waterfall]=\"false\"\r\n  [fixedLastrow]=\"false\"\r\n  [flexibleTitle]=\"true\"&gt;\r\n  &lt;mdc-toolbar-row&gt;\r\n    &lt;mdc-toolbar-section [alignStart]=\"true\"&gt;\r\n      &lt;a href=\"#\" class=\"material-icons\" aria-label=\"menu\"&gt;menu&lt;/a&gt;\r\n      &lt;span mdc-toolbar-title&gt;Title&lt;/span&gt;\r\n    &lt;/mdc-toolbar-section&gt;\r\n    &lt;mdc-toolbar-section [alignEnd]=\"true\"&gt;\r\n      &lt;a href=\"#\" class=\"material-icons\" aria-label=\"Download\" alt=\"Download\"&gt;file_download&lt;/a&gt;\r\n      &lt;a href=\"#\" class=\"material-icons\" aria-label=\"Print page\" alt=\"Print page\"&gt;print&lt;/a&gt;\r\n      &lt;a href=\"#\" class=\"material-icons\" aria-label=\"Bookmark page\" alt=\"Bookmark page\"&gt;bookmark&lt;/a&gt;\r\n    &lt;/mdc-toolbar-section&gt;\r\n  &lt;/mdc-toolbar-row&gt;\r\n&lt;/mdc-toolbar>&gt;\r\n        </pre>\r\n    </div>\r\n  </div>\r\n</div>\r\n";

/***/ }),

/***/ 699:
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"start start\" class=\"mdc-padding\">\r\n  <h1 mdc-typography-display1>Typography</h1>\r\n  <p mdc-typography-subheading2>The MDC Typography directives implement the Material Design typography guidelines.</p>\r\n  <a href=\"https://github.com/material-components/material-components-web/tree/master/packages/mdc-typography\">Google Material Components documentation</a>\r\n  <h1 mdc-typography-headline>Usage</h1>\r\n  <div>\r\n    <pre class=\"prettyprint\"><![CDATA[import { TypographyModule } from '@angular-mdc/web';]]></pre>\r\n  </div>\r\n  <h1 mdc-typography-headline>Examples</h1>\r\n  <div fxLayout=\"column\">\r\n    <h3 mdc-typography-title mdc-typography-adjust-margin>Text with adjust margins directive</h3>\r\n    <h4 mdc-typography-caption mdc-typography-adjust-margin>Sample text showing the aligned margin</h4>\r\n    <span>If you include the mdc-typography-adjust-margin directive, positioning will be adjusted according to the style.</span>\r\n    <pre class=\"prettyprint\">\r\n&lt;h3 mdc-typography-title mdc-typography-adjust-margin&gt;Text with adjust margins directive&lt;/h3&gt;\r\n&lt;h4 mdc-typography-caption mdc-typography-adjust-margin&gt;Sample text showing the aligned margins&lt;/h4&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\">\r\n    <h2 mdc-typography-display4>Display 4</h2>\r\n    <pre class=\"prettyprint\">\r\n&lt;h2 mdc-typography-display4&gt;Display 4&lt;/h2&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\">\r\n    <h1 mdc-typography-display3>Display 3</h1>\r\n    <pre class=\"prettyprint\">\r\n&lt;h1 mdc-typography-display3&gt;Display3&lt;/h1&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\">\r\n    <h1 mdc-typography-display2>Display 2</h1>\r\n    <pre class=\"prettyprint\">\r\n&lt;h1 mdc-typography-display2&gt;Display2&lt;/h1&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\">\r\n    <h1 mdc-typography-display1>Display 1</h1>\r\n    <pre class=\"prettyprint\">\r\n&lt;h1 mdc-typography-display1&gt;Display1&lt;/h1&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\">\r\n    <h1 mdc-typography-headline>Headline</h1>\r\n    <pre class=\"prettyprint\">\r\n&lt;h1 mdc-typography-headline&gt;Headline&lt;/h1&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\">\r\n    <h2 mdc-typography-title>Title</h2>\r\n    <pre class=\"prettyprint\">\r\n&lt;h2 mdc-typography-title&gt;Title&lt;/h2&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\">\r\n    <h2 mdc-typography-caption>Caption</h2>\r\n    <pre class=\"prettyprint\">\r\n&lt;h2 mdc-typography-caption&gt;Caption&lt;/h2&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\">\r\n    <h3 mdc-typography-subheading2>Subheading 2</h3>\r\n    <pre class=\"prettyprint\">\r\n&lt;h3 mdc-typography-subheading2&gt;Subheading 2&lt;/h3&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\">\r\n    <h4 mdc-typography-subheading1>Subheading 1</h4>\r\n    <pre class=\"prettyprint\">\r\n&lt;h4 mdc-typography-subheading1&gt;Subheading 1&lt;/h4&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\">\r\n    <p mdc-typography-body2>Body 2</p>\r\n    <pre class=\"prettyprint\">\r\n&lt;p mdc-typography-body2&gt;Body 2&lt;/p&gt;\r\n      </pre>\r\n  </div>\r\n  <div fxLayout=\"column\">\r\n    <p mdc-typography-body1>Body 1</p>\r\n    <pre class=\"prettyprint\">\r\n&lt;p mdc-typography-body1&gt;Body 1&lt;/p&gt;\r\n      </pre>\r\n  </div>\r\n</div>\r\n";

/***/ }),

/***/ 700:
/***/ (function(module, exports) {

module.exports = "<div class=\"mdc-linear-progress__buffering-dots\"></div>\r\n<div class=\"mdc-linear-progress__buffer\"></div>\r\n<div class=\"mdc-linear-progress__bar mdc-linear-progress__primary-bar\">\r\n <span class=\"mdc-linear-progress__bar-inner\"></span>\r\n</div>\r\n<div class=\"mdc-linear-progress__bar mdc-linear-progress__secondary-bar\">\r\n <span class=\"mdc-linear-progress__bar-inner\"></span>\r\n</div>\r\n";

/***/ }),

/***/ 701:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(686);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(676)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!../../sass-loader/lib/loader.js??ref--3-2!./mdc-linear-progress.scss", function() {
			var newContent = require("!!../../css-loader/index.js!../../sass-loader/lib/loader.js??ref--3-2!./mdc-linear-progress.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

},[683]);
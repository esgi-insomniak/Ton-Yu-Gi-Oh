function Vt(y) {
  return y && y.__esModule && Object.prototype.hasOwnProperty.call(y, "default") ? y.default : y;
}
var Xe = {}, Ut = {
  get exports() {
    return Xe;
  },
  set exports(y) {
    Xe = y;
  }
}, _ = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ct;
function Yt() {
  if (ct)
    return _;
  ct = 1;
  var y = Symbol.for("react.element"), d = Symbol.for("react.portal"), ae = Symbol.for("react.fragment"), Y = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), B = Symbol.for("react.provider"), ee = Symbol.for("react.context"), re = Symbol.for("react.forward_ref"), M = Symbol.for("react.suspense"), te = Symbol.for("react.memo"), N = Symbol.for("react.lazy"), z = Symbol.iterator;
  function ne(n) {
    return n === null || typeof n != "object" ? null : (n = z && n[z] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var X = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, fe = Object.assign, Fe = {};
  function oe(n, s, h) {
    this.props = n, this.context = s, this.refs = Fe, this.updater = h || X;
  }
  oe.prototype.isReactComponent = {}, oe.prototype.setState = function(n, s) {
    if (typeof n != "object" && typeof n != "function" && n != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, n, s, "setState");
  }, oe.prototype.forceUpdate = function(n) {
    this.updater.enqueueForceUpdate(this, n, "forceUpdate");
  };
  function ue() {
  }
  ue.prototype = oe.prototype;
  function $(n, s, h) {
    this.props = n, this.context = s, this.refs = Fe, this.updater = h || X;
  }
  var me = $.prototype = new ue();
  me.constructor = $, fe(me, oe.prototype), me.isPureReactComponent = !0;
  var ie = Array.isArray, W = Object.prototype.hasOwnProperty, K = { current: null }, le = { key: !0, ref: !0, __self: !0, __source: !0 };
  function ve(n, s, h) {
    var w, b = {}, P = null, j = null;
    if (s != null)
      for (w in s.ref !== void 0 && (j = s.ref), s.key !== void 0 && (P = "" + s.key), s)
        W.call(s, w) && !le.hasOwnProperty(w) && (b[w] = s[w]);
    var O = arguments.length - 2;
    if (O === 1)
      b.children = h;
    else if (1 < O) {
      for (var S = Array(O), U = 0; U < O; U++)
        S[U] = arguments[U + 2];
      b.children = S;
    }
    if (n && n.defaultProps)
      for (w in O = n.defaultProps, O)
        b[w] === void 0 && (b[w] = O[w]);
    return { $$typeof: y, type: n, key: P, ref: j, props: b, _owner: K.current };
  }
  function Ce(n, s) {
    return { $$typeof: y, type: n.type, key: s, ref: n.ref, props: n.props, _owner: n._owner };
  }
  function we(n) {
    return typeof n == "object" && n !== null && n.$$typeof === y;
  }
  function Ye(n) {
    var s = { "=": "=0", ":": "=2" };
    return "$" + n.replace(/[=:]/g, function(h) {
      return s[h];
    });
  }
  var Se = /\/+/g;
  function J(n, s) {
    return typeof n == "object" && n !== null && n.key != null ? Ye("" + n.key) : s.toString(36);
  }
  function Q(n, s, h, w, b) {
    var P = typeof n;
    (P === "undefined" || P === "boolean") && (n = null);
    var j = !1;
    if (n === null)
      j = !0;
    else
      switch (P) {
        case "string":
        case "number":
          j = !0;
          break;
        case "object":
          switch (n.$$typeof) {
            case y:
            case d:
              j = !0;
          }
      }
    if (j)
      return j = n, b = b(j), n = w === "" ? "." + J(j, 0) : w, ie(b) ? (h = "", n != null && (h = n.replace(Se, "$&/") + "/"), Q(b, s, h, "", function(U) {
        return U;
      })) : b != null && (we(b) && (b = Ce(b, h + (!b.key || j && j.key === b.key ? "" : ("" + b.key).replace(Se, "$&/") + "/") + n)), s.push(b)), 1;
    if (j = 0, w = w === "" ? "." : w + ":", ie(n))
      for (var O = 0; O < n.length; O++) {
        P = n[O];
        var S = w + J(P, O);
        j += Q(P, s, h, S, b);
      }
    else if (S = ne(n), typeof S == "function")
      for (n = S.call(n), O = 0; !(P = n.next()).done; )
        P = P.value, S = w + J(P, O++), j += Q(P, s, h, S, b);
    else if (P === "object")
      throw s = String(n), Error("Objects are not valid as a React child (found: " + (s === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : s) + "). If you meant to render a collection of children, use an array instead.");
    return j;
  }
  function q(n, s, h) {
    if (n == null)
      return n;
    var w = [], b = 0;
    return Q(n, w, "", "", function(P) {
      return s.call(h, P, b++);
    }), w;
  }
  function se(n) {
    if (n._status === -1) {
      var s = n._result;
      s = s(), s.then(function(h) {
        (n._status === 0 || n._status === -1) && (n._status = 1, n._result = h);
      }, function(h) {
        (n._status === 0 || n._status === -1) && (n._status = 2, n._result = h);
      }), n._status === -1 && (n._status = 0, n._result = s);
    }
    if (n._status === 1)
      return n._result.default;
    throw n._result;
  }
  var p = { current: null }, de = { transition: null }, Te = { ReactCurrentDispatcher: p, ReactCurrentBatchConfig: de, ReactCurrentOwner: K };
  return _.Children = { map: q, forEach: function(n, s, h) {
    q(n, function() {
      s.apply(this, arguments);
    }, h);
  }, count: function(n) {
    var s = 0;
    return q(n, function() {
      s++;
    }), s;
  }, toArray: function(n) {
    return q(n, function(s) {
      return s;
    }) || [];
  }, only: function(n) {
    if (!we(n))
      throw Error("React.Children.only expected to receive a single React element child.");
    return n;
  } }, _.Component = oe, _.Fragment = ae, _.Profiler = x, _.PureComponent = $, _.StrictMode = Y, _.Suspense = M, _.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Te, _.cloneElement = function(n, s, h) {
    if (n == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + n + ".");
    var w = fe({}, n.props), b = n.key, P = n.ref, j = n._owner;
    if (s != null) {
      if (s.ref !== void 0 && (P = s.ref, j = K.current), s.key !== void 0 && (b = "" + s.key), n.type && n.type.defaultProps)
        var O = n.type.defaultProps;
      for (S in s)
        W.call(s, S) && !le.hasOwnProperty(S) && (w[S] = s[S] === void 0 && O !== void 0 ? O[S] : s[S]);
    }
    var S = arguments.length - 2;
    if (S === 1)
      w.children = h;
    else if (1 < S) {
      O = Array(S);
      for (var U = 0; U < S; U++)
        O[U] = arguments[U + 2];
      w.children = O;
    }
    return { $$typeof: y, type: n.type, key: b, ref: P, props: w, _owner: j };
  }, _.createContext = function(n) {
    return n = { $$typeof: ee, _currentValue: n, _currentValue2: n, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, n.Provider = { $$typeof: B, _context: n }, n.Consumer = n;
  }, _.createElement = ve, _.createFactory = function(n) {
    var s = ve.bind(null, n);
    return s.type = n, s;
  }, _.createRef = function() {
    return { current: null };
  }, _.forwardRef = function(n) {
    return { $$typeof: re, render: n };
  }, _.isValidElement = we, _.lazy = function(n) {
    return { $$typeof: N, _payload: { _status: -1, _result: n }, _init: se };
  }, _.memo = function(n, s) {
    return { $$typeof: te, type: n, compare: s === void 0 ? null : s };
  }, _.startTransition = function(n) {
    var s = de.transition;
    de.transition = {};
    try {
      n();
    } finally {
      de.transition = s;
    }
  }, _.unstable_act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, _.useCallback = function(n, s) {
    return p.current.useCallback(n, s);
  }, _.useContext = function(n) {
    return p.current.useContext(n);
  }, _.useDebugValue = function() {
  }, _.useDeferredValue = function(n) {
    return p.current.useDeferredValue(n);
  }, _.useEffect = function(n, s) {
    return p.current.useEffect(n, s);
  }, _.useId = function() {
    return p.current.useId();
  }, _.useImperativeHandle = function(n, s, h) {
    return p.current.useImperativeHandle(n, s, h);
  }, _.useInsertionEffect = function(n, s) {
    return p.current.useInsertionEffect(n, s);
  }, _.useLayoutEffect = function(n, s) {
    return p.current.useLayoutEffect(n, s);
  }, _.useMemo = function(n, s) {
    return p.current.useMemo(n, s);
  }, _.useReducer = function(n, s, h) {
    return p.current.useReducer(n, s, h);
  }, _.useRef = function(n) {
    return p.current.useRef(n);
  }, _.useState = function(n) {
    return p.current.useState(n);
  }, _.useSyncExternalStore = function(n, s, h) {
    return p.current.useSyncExternalStore(n, s, h);
  }, _.useTransition = function() {
    return p.current.useTransition();
  }, _.version = "18.2.0", _;
}
var Je = {}, Bt = {
  get exports() {
    return Je;
  },
  set exports(y) {
    Je = y;
  }
};
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ft;
function zt() {
  return ft || (ft = 1, function(y, d) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var ae = "18.2.0", Y = Symbol.for("react.element"), x = Symbol.for("react.portal"), B = Symbol.for("react.fragment"), ee = Symbol.for("react.strict_mode"), re = Symbol.for("react.profiler"), M = Symbol.for("react.provider"), te = Symbol.for("react.context"), N = Symbol.for("react.forward_ref"), z = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), X = Symbol.for("react.memo"), fe = Symbol.for("react.lazy"), Fe = Symbol.for("react.offscreen"), oe = Symbol.iterator, ue = "@@iterator";
      function $(e) {
        if (e === null || typeof e != "object")
          return null;
        var r = oe && e[oe] || e[ue];
        return typeof r == "function" ? r : null;
      }
      var me = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, ie = {
        transition: null
      }, W = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, K = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, le = {}, ve = null;
      function Ce(e) {
        ve = e;
      }
      le.setExtraStackFrame = function(e) {
        ve = e;
      }, le.getCurrentStack = null, le.getStackAddendum = function() {
        var e = "";
        ve && (e += ve);
        var r = le.getCurrentStack;
        return r && (e += r() || ""), e;
      };
      var we = !1, Ye = !1, Se = !1, J = !1, Q = !1, q = {
        ReactCurrentDispatcher: me,
        ReactCurrentBatchConfig: ie,
        ReactCurrentOwner: K
      };
      q.ReactDebugCurrentFrame = le, q.ReactCurrentActQueue = W;
      function se(e) {
        {
          for (var r = arguments.length, a = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
            a[o - 1] = arguments[o];
          de("warn", e, a);
        }
      }
      function p(e) {
        {
          for (var r = arguments.length, a = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
            a[o - 1] = arguments[o];
          de("error", e, a);
        }
      }
      function de(e, r, a) {
        {
          var o = q.ReactDebugCurrentFrame, i = o.getStackAddendum();
          i !== "" && (r += "%s", a = a.concat([i]));
          var v = a.map(function(l) {
            return String(l);
          });
          v.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, v);
        }
      }
      var Te = {};
      function n(e, r) {
        {
          var a = e.constructor, o = a && (a.displayName || a.name) || "ReactClass", i = o + "." + r;
          if (Te[i])
            return;
          p("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", r, o), Te[i] = !0;
        }
      }
      var s = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(e) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(e, r, a) {
          n(e, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(e, r, a, o) {
          n(e, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(e, r, a, o) {
          n(e, "setState");
        }
      }, h = Object.assign, w = {};
      Object.freeze(w);
      function b(e, r, a) {
        this.props = e, this.context = r, this.refs = w, this.updater = a || s;
      }
      b.prototype.isReactComponent = {}, b.prototype.setState = function(e, r) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e, r, "setState");
      }, b.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      {
        var P = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, j = function(e, r) {
          Object.defineProperty(b.prototype, e, {
            get: function() {
              se("%s(...) is deprecated in plain JavaScript React classes. %s", r[0], r[1]);
            }
          });
        };
        for (var O in P)
          P.hasOwnProperty(O) && j(O, P[O]);
      }
      function S() {
      }
      S.prototype = b.prototype;
      function U(e, r, a) {
        this.props = e, this.context = r, this.refs = w, this.updater = a || s;
      }
      var he = U.prototype = new S();
      he.constructor = U, h(he, b.prototype), he.isPureReactComponent = !0;
      function hr() {
        var e = {
          current: null
        };
        return Object.seal(e), e;
      }
      var Qe = Array.isArray;
      function $e(e) {
        return Qe(e);
      }
      function gr(e) {
        {
          var r = typeof Symbol == "function" && Symbol.toStringTag, a = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return a;
        }
      }
      function Le(e) {
        try {
          return Oe(e), !1;
        } catch {
          return !0;
        }
      }
      function Oe(e) {
        return "" + e;
      }
      function ke(e) {
        if (Le(e))
          return p("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", gr(e)), Oe(e);
      }
      function Ze(e, r, a) {
        var o = e.displayName;
        if (o)
          return o;
        var i = r.displayName || r.name || "";
        return i !== "" ? a + "(" + i + ")" : a;
      }
      function Pe(e) {
        return e.displayName || "Context";
      }
      function pe(e) {
        if (e == null)
          return null;
        if (typeof e.tag == "number" && p("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
          return e.displayName || e.name || null;
        if (typeof e == "string")
          return e;
        switch (e) {
          case B:
            return "Fragment";
          case x:
            return "Portal";
          case re:
            return "Profiler";
          case ee:
            return "StrictMode";
          case z:
            return "Suspense";
          case ne:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case te:
              var r = e;
              return Pe(r) + ".Consumer";
            case M:
              var a = e;
              return Pe(a._context) + ".Provider";
            case N:
              return Ze(e, e.render, "ForwardRef");
            case X:
              var o = e.displayName || null;
              return o !== null ? o : pe(e.type) || "Memo";
            case fe: {
              var i = e, v = i._payload, l = i._init;
              try {
                return pe(l(v));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var je = Object.prototype.hasOwnProperty, Me = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, er, rr, Ne;
      Ne = {};
      function Be(e) {
        if (je.call(e, "ref")) {
          var r = Object.getOwnPropertyDescriptor(e, "ref").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.ref !== void 0;
      }
      function ge(e) {
        if (je.call(e, "key")) {
          var r = Object.getOwnPropertyDescriptor(e, "key").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.key !== void 0;
      }
      function _r(e, r) {
        var a = function() {
          er || (er = !0, p("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: a,
          configurable: !0
        });
      }
      function tr(e, r) {
        var a = function() {
          rr || (rr = !0, p("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: a,
          configurable: !0
        });
      }
      function nr(e) {
        if (typeof e.ref == "string" && K.current && e.__self && K.current.stateNode !== e.__self) {
          var r = pe(K.current.type);
          Ne[r] || (p('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, e.ref), Ne[r] = !0);
        }
      }
      var Ae = function(e, r, a, o, i, v, l) {
        var m = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: Y,
          // Built-in properties that belong on the element
          type: e,
          key: r,
          ref: a,
          props: l,
          // Record the component responsible for creating this element.
          _owner: v
        };
        return m._store = {}, Object.defineProperty(m._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(m, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: o
        }), Object.defineProperty(m, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: i
        }), Object.freeze && (Object.freeze(m.props), Object.freeze(m)), m;
      };
      function br(e, r, a) {
        var o, i = {}, v = null, l = null, m = null, R = null;
        if (r != null) {
          Be(r) && (l = r.ref, nr(r)), ge(r) && (ke(r.key), v = "" + r.key), m = r.__self === void 0 ? null : r.__self, R = r.__source === void 0 ? null : r.__source;
          for (o in r)
            je.call(r, o) && !Me.hasOwnProperty(o) && (i[o] = r[o]);
        }
        var k = arguments.length - 2;
        if (k === 1)
          i.children = a;
        else if (k > 1) {
          for (var A = Array(k), I = 0; I < k; I++)
            A[I] = arguments[I + 2];
          Object.freeze && Object.freeze(A), i.children = A;
        }
        if (e && e.defaultProps) {
          var F = e.defaultProps;
          for (o in F)
            i[o] === void 0 && (i[o] = F[o]);
        }
        if (v || l) {
          var V = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          v && _r(i, V), l && tr(i, V);
        }
        return Ae(e, v, l, m, R, K.current, i);
      }
      function Er(e, r) {
        var a = Ae(e.type, r, e.ref, e._self, e._source, e._owner, e.props);
        return a;
      }
      function Rr(e, r, a) {
        if (e == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
        var o, i = h({}, e.props), v = e.key, l = e.ref, m = e._self, R = e._source, k = e._owner;
        if (r != null) {
          Be(r) && (l = r.ref, k = K.current), ge(r) && (ke(r.key), v = "" + r.key);
          var A;
          e.type && e.type.defaultProps && (A = e.type.defaultProps);
          for (o in r)
            je.call(r, o) && !Me.hasOwnProperty(o) && (r[o] === void 0 && A !== void 0 ? i[o] = A[o] : i[o] = r[o]);
        }
        var I = arguments.length - 2;
        if (I === 1)
          i.children = a;
        else if (I > 1) {
          for (var F = Array(I), V = 0; V < I; V++)
            F[V] = arguments[V + 2];
          i.children = F;
        }
        return Ae(e.type, v, l, m, R, k, i);
      }
      function _e(e) {
        return typeof e == "object" && e !== null && e.$$typeof === Y;
      }
      var ar = ".", Cr = ":";
      function wr(e) {
        var r = /[=:]/g, a = {
          "=": "=0",
          ":": "=2"
        }, o = e.replace(r, function(i) {
          return a[i];
        });
        return "$" + o;
      }
      var We = !1, or = /\/+/g;
      function ye(e) {
        return e.replace(or, "$&/");
      }
      function Ie(e, r) {
        return typeof e == "object" && e !== null && e.key != null ? (ke(e.key), wr("" + e.key)) : r.toString(36);
      }
      function be(e, r, a, o, i) {
        var v = typeof e;
        (v === "undefined" || v === "boolean") && (e = null);
        var l = !1;
        if (e === null)
          l = !0;
        else
          switch (v) {
            case "string":
            case "number":
              l = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case Y:
                case x:
                  l = !0;
              }
          }
        if (l) {
          var m = e, R = i(m), k = o === "" ? ar + Ie(m, 0) : o;
          if ($e(R)) {
            var A = "";
            k != null && (A = ye(k) + "/"), be(R, r, A, "", function(Wt) {
              return Wt;
            });
          } else
            R != null && (_e(R) && (R.key && (!m || m.key !== R.key) && ke(R.key), R = Er(
              R,
              // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              a + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (R.key && (!m || m.key !== R.key) ? (
                // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                // eslint-disable-next-line react-internal/safe-string-coercion
                ye("" + R.key) + "/"
              ) : "") + k
            )), r.push(R));
          return 1;
        }
        var I, F, V = 0, G = o === "" ? ar : o + Cr;
        if ($e(e))
          for (var mr = 0; mr < e.length; mr++)
            I = e[mr], F = G + Ie(I, mr), V += be(I, r, a, F, i);
        else {
          var Mr = $(e);
          if (typeof Mr == "function") {
            var ut = e;
            Mr === ut.entries && (We || se("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), We = !0);
            for (var Mt = Mr.call(ut), it, Nt = 0; !(it = Mt.next()).done; )
              I = it.value, F = G + Ie(I, Nt++), V += be(I, r, a, F, i);
          } else if (v === "object") {
            var st = String(e);
            throw new Error("Objects are not valid as a React child (found: " + (st === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : st) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return V;
      }
      function xe(e, r, a) {
        if (e == null)
          return e;
        var o = [], i = 0;
        return be(e, o, "", "", function(v) {
          return r.call(a, v, i++);
        }), o;
      }
      function Sr(e) {
        var r = 0;
        return xe(e, function() {
          r++;
        }), r;
      }
      function ur(e, r, a) {
        xe(e, function() {
          r.apply(this, arguments);
        }, a);
      }
      function Tr(e) {
        return xe(e, function(r) {
          return r;
        }) || [];
      }
      function ir(e) {
        if (!_e(e))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return e;
      }
      function sr(e) {
        var r = {
          $$typeof: te,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: e,
          _currentValue2: e,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        r.Provider = {
          $$typeof: M,
          _context: r
        };
        var a = !1, o = !1, i = !1;
        {
          var v = {
            $$typeof: te,
            _context: r
          };
          Object.defineProperties(v, {
            Provider: {
              get: function() {
                return o || (o = !0, p("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), r.Provider;
              },
              set: function(l) {
                r.Provider = l;
              }
            },
            _currentValue: {
              get: function() {
                return r._currentValue;
              },
              set: function(l) {
                r._currentValue = l;
              }
            },
            _currentValue2: {
              get: function() {
                return r._currentValue2;
              },
              set: function(l) {
                r._currentValue2 = l;
              }
            },
            _threadCount: {
              get: function() {
                return r._threadCount;
              },
              set: function(l) {
                r._threadCount = l;
              }
            },
            Consumer: {
              get: function() {
                return a || (a = !0, p("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), r.Consumer;
              }
            },
            displayName: {
              get: function() {
                return r.displayName;
              },
              set: function(l) {
                i || (se("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", l), i = !0);
              }
            }
          }), r.Consumer = v;
        }
        return r._currentRenderer = null, r._currentRenderer2 = null, r;
      }
      var De = -1, ze = 0, qe = 1, Or = 2;
      function kr(e) {
        if (e._status === De) {
          var r = e._result, a = r();
          if (a.then(function(v) {
            if (e._status === ze || e._status === De) {
              var l = e;
              l._status = qe, l._result = v;
            }
          }, function(v) {
            if (e._status === ze || e._status === De) {
              var l = e;
              l._status = Or, l._result = v;
            }
          }), e._status === De) {
            var o = e;
            o._status = ze, o._result = a;
          }
        }
        if (e._status === qe) {
          var i = e._result;
          return i === void 0 && p(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, i), "default" in i || p(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, i), i.default;
        } else
          throw e._result;
      }
      function Pr(e) {
        var r = {
          // We use these fields to store the result.
          _status: De,
          _result: e
        }, a = {
          $$typeof: fe,
          _payload: r,
          _init: kr
        };
        {
          var o, i;
          Object.defineProperties(a, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return o;
              },
              set: function(v) {
                p("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), o = v, Object.defineProperty(a, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return i;
              },
              set: function(v) {
                p("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), i = v, Object.defineProperty(a, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return a;
      }
      function jr(e) {
        e != null && e.$$typeof === X ? p("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e != "function" ? p("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e) : e.length !== 0 && e.length !== 2 && p("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), e != null && (e.defaultProps != null || e.propTypes != null) && p("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var r = {
          $$typeof: N,
          render: e
        };
        {
          var a;
          Object.defineProperty(r, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return a;
            },
            set: function(o) {
              a = o, !e.name && !e.displayName && (e.displayName = o);
            }
          });
        }
        return r;
      }
      var t;
      t = Symbol.for("react.module.reference");
      function u(e) {
        return !!(typeof e == "string" || typeof e == "function" || e === B || e === re || Q || e === ee || e === z || e === ne || J || e === Fe || we || Ye || Se || typeof e == "object" && e !== null && (e.$$typeof === fe || e.$$typeof === X || e.$$typeof === M || e.$$typeof === te || e.$$typeof === N || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        e.$$typeof === t || e.getModuleId !== void 0));
      }
      function c(e, r) {
        u(e) || p("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e);
        var a = {
          $$typeof: X,
          type: e,
          compare: r === void 0 ? null : r
        };
        {
          var o;
          Object.defineProperty(a, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return o;
            },
            set: function(i) {
              o = i, !e.name && !e.displayName && (e.displayName = i);
            }
          });
        }
        return a;
      }
      function f() {
        var e = me.current;
        return e === null && p(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), e;
      }
      function C(e) {
        var r = f();
        if (e._context !== void 0) {
          var a = e._context;
          a.Consumer === e ? p("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : a.Provider === e && p("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return r.useContext(e);
      }
      function T(e) {
        var r = f();
        return r.useState(e);
      }
      function E(e, r, a) {
        var o = f();
        return o.useReducer(e, r, a);
      }
      function g(e) {
        var r = f();
        return r.useRef(e);
      }
      function H(e, r) {
        var a = f();
        return a.useEffect(e, r);
      }
      function D(e, r) {
        var a = f();
        return a.useInsertionEffect(e, r);
      }
      function L(e, r) {
        var a = f();
        return a.useLayoutEffect(e, r);
      }
      function Z(e, r) {
        var a = f();
        return a.useCallback(e, r);
      }
      function Ee(e, r) {
        var a = f();
        return a.useMemo(e, r);
      }
      function cr(e, r, a) {
        var o = f();
        return o.useImperativeHandle(e, r, a);
      }
      function ce(e, r) {
        {
          var a = f();
          return a.useDebugValue(e, r);
        }
      }
      function yt() {
        var e = f();
        return e.useTransition();
      }
      function mt(e) {
        var r = f();
        return r.useDeferredValue(e);
      }
      function ht() {
        var e = f();
        return e.useId();
      }
      function gt(e, r, a) {
        var o = f();
        return o.useSyncExternalStore(e, r, a);
      }
      var He = 0, Wr, Vr, Ur, Yr, Br, zr, qr;
      function Hr() {
      }
      Hr.__reactDisabledLog = !0;
      function _t() {
        {
          if (He === 0) {
            Wr = console.log, Vr = console.info, Ur = console.warn, Yr = console.error, Br = console.group, zr = console.groupCollapsed, qr = console.groupEnd;
            var e = {
              configurable: !0,
              enumerable: !0,
              value: Hr,
              writable: !0
            };
            Object.defineProperties(console, {
              info: e,
              log: e,
              warn: e,
              error: e,
              group: e,
              groupCollapsed: e,
              groupEnd: e
            });
          }
          He++;
        }
      }
      function bt() {
        {
          if (He--, He === 0) {
            var e = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: h({}, e, {
                value: Wr
              }),
              info: h({}, e, {
                value: Vr
              }),
              warn: h({}, e, {
                value: Ur
              }),
              error: h({}, e, {
                value: Yr
              }),
              group: h({}, e, {
                value: Br
              }),
              groupCollapsed: h({}, e, {
                value: zr
              }),
              groupEnd: h({}, e, {
                value: qr
              })
            });
          }
          He < 0 && p("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Ar = q.ReactCurrentDispatcher, Ir;
      function fr(e, r, a) {
        {
          if (Ir === void 0)
            try {
              throw Error();
            } catch (i) {
              var o = i.stack.trim().match(/\n( *(at )?)/);
              Ir = o && o[1] || "";
            }
          return `
` + Ir + e;
        }
      }
      var xr = !1, lr;
      {
        var Et = typeof WeakMap == "function" ? WeakMap : Map;
        lr = new Et();
      }
      function Gr(e, r) {
        if (!e || xr)
          return "";
        {
          var a = lr.get(e);
          if (a !== void 0)
            return a;
        }
        var o;
        xr = !0;
        var i = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var v;
        v = Ar.current, Ar.current = null, _t();
        try {
          if (r) {
            var l = function() {
              throw Error();
            };
            if (Object.defineProperty(l.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(l, []);
              } catch (G) {
                o = G;
              }
              Reflect.construct(e, [], l);
            } else {
              try {
                l.call();
              } catch (G) {
                o = G;
              }
              e.call(l.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (G) {
              o = G;
            }
            e();
          }
        } catch (G) {
          if (G && o && typeof G.stack == "string") {
            for (var m = G.stack.split(`
`), R = o.stack.split(`
`), k = m.length - 1, A = R.length - 1; k >= 1 && A >= 0 && m[k] !== R[A]; )
              A--;
            for (; k >= 1 && A >= 0; k--, A--)
              if (m[k] !== R[A]) {
                if (k !== 1 || A !== 1)
                  do
                    if (k--, A--, A < 0 || m[k] !== R[A]) {
                      var I = `
` + m[k].replace(" at new ", " at ");
                      return e.displayName && I.includes("<anonymous>") && (I = I.replace("<anonymous>", e.displayName)), typeof e == "function" && lr.set(e, I), I;
                    }
                  while (k >= 1 && A >= 0);
                break;
              }
          }
        } finally {
          xr = !1, Ar.current = v, bt(), Error.prepareStackTrace = i;
        }
        var F = e ? e.displayName || e.name : "", V = F ? fr(F) : "";
        return typeof e == "function" && lr.set(e, V), V;
      }
      function Rt(e, r, a) {
        return Gr(e, !1);
      }
      function Ct(e) {
        var r = e.prototype;
        return !!(r && r.isReactComponent);
      }
      function dr(e, r, a) {
        if (e == null)
          return "";
        if (typeof e == "function")
          return Gr(e, Ct(e));
        if (typeof e == "string")
          return fr(e);
        switch (e) {
          case z:
            return fr("Suspense");
          case ne:
            return fr("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case N:
              return Rt(e.render);
            case X:
              return dr(e.type, r, a);
            case fe: {
              var o = e, i = o._payload, v = o._init;
              try {
                return dr(v(i), r, a);
              } catch {
              }
            }
          }
        return "";
      }
      var Kr = {}, Jr = q.ReactDebugCurrentFrame;
      function pr(e) {
        if (e) {
          var r = e._owner, a = dr(e.type, e._source, r ? r.type : null);
          Jr.setExtraStackFrame(a);
        } else
          Jr.setExtraStackFrame(null);
      }
      function wt(e, r, a, o, i) {
        {
          var v = Function.call.bind(je);
          for (var l in e)
            if (v(e, l)) {
              var m = void 0;
              try {
                if (typeof e[l] != "function") {
                  var R = Error((o || "React class") + ": " + a + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw R.name = "Invariant Violation", R;
                }
                m = e[l](r, l, o, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (k) {
                m = k;
              }
              m && !(m instanceof Error) && (pr(i), p("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", a, l, typeof m), pr(null)), m instanceof Error && !(m.message in Kr) && (Kr[m.message] = !0, pr(i), p("Failed %s type: %s", a, m.message), pr(null));
            }
        }
      }
      function Ve(e) {
        if (e) {
          var r = e._owner, a = dr(e.type, e._source, r ? r.type : null);
          Ce(a);
        } else
          Ce(null);
      }
      var Dr;
      Dr = !1;
      function Xr() {
        if (K.current) {
          var e = pe(K.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
      function St(e) {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), a = e.lineNumber;
          return `

Check your code at ` + r + ":" + a + ".";
        }
        return "";
      }
      function Tt(e) {
        return e != null ? St(e.__source) : "";
      }
      var Qr = {};
      function Ot(e) {
        var r = Xr();
        if (!r) {
          var a = typeof e == "string" ? e : e.displayName || e.name;
          a && (r = `

Check the top-level render call using <` + a + ">.");
        }
        return r;
      }
      function Zr(e, r) {
        if (!(!e._store || e._store.validated || e.key != null)) {
          e._store.validated = !0;
          var a = Ot(r);
          if (!Qr[a]) {
            Qr[a] = !0;
            var o = "";
            e && e._owner && e._owner !== K.current && (o = " It was passed a child from " + pe(e._owner.type) + "."), Ve(e), p('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, o), Ve(null);
          }
        }
      }
      function et(e, r) {
        if (typeof e == "object") {
          if ($e(e))
            for (var a = 0; a < e.length; a++) {
              var o = e[a];
              _e(o) && Zr(o, r);
            }
          else if (_e(e))
            e._store && (e._store.validated = !0);
          else if (e) {
            var i = $(e);
            if (typeof i == "function" && i !== e.entries)
              for (var v = i.call(e), l; !(l = v.next()).done; )
                _e(l.value) && Zr(l.value, r);
          }
        }
      }
      function rt(e) {
        {
          var r = e.type;
          if (r == null || typeof r == "string")
            return;
          var a;
          if (typeof r == "function")
            a = r.propTypes;
          else if (typeof r == "object" && (r.$$typeof === N || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          r.$$typeof === X))
            a = r.propTypes;
          else
            return;
          if (a) {
            var o = pe(r);
            wt(a, e.props, "prop", o, e);
          } else if (r.PropTypes !== void 0 && !Dr) {
            Dr = !0;
            var i = pe(r);
            p("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", i || "Unknown");
          }
          typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && p("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function kt(e) {
        {
          for (var r = Object.keys(e.props), a = 0; a < r.length; a++) {
            var o = r[a];
            if (o !== "children" && o !== "key") {
              Ve(e), p("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), Ve(null);
              break;
            }
          }
          e.ref !== null && (Ve(e), p("Invalid attribute `ref` supplied to `React.Fragment`."), Ve(null));
        }
      }
      function tt(e, r, a) {
        var o = u(e);
        if (!o) {
          var i = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (i += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var v = Tt(r);
          v ? i += v : i += Xr();
          var l;
          e === null ? l = "null" : $e(e) ? l = "array" : e !== void 0 && e.$$typeof === Y ? (l = "<" + (pe(e.type) || "Unknown") + " />", i = " Did you accidentally export a JSX literal instead of a component?") : l = typeof e, p("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", l, i);
        }
        var m = br.apply(this, arguments);
        if (m == null)
          return m;
        if (o)
          for (var R = 2; R < arguments.length; R++)
            et(arguments[R], e);
        return e === B ? kt(m) : rt(m), m;
      }
      var nt = !1;
      function Pt(e) {
        var r = tt.bind(null, e);
        return r.type = e, nt || (nt = !0, se("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(r, "type", {
          enumerable: !1,
          get: function() {
            return se("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: e
            }), e;
          }
        }), r;
      }
      function jt(e, r, a) {
        for (var o = Rr.apply(this, arguments), i = 2; i < arguments.length; i++)
          et(arguments[i], o.type);
        return rt(o), o;
      }
      function At(e, r) {
        var a = ie.transition;
        ie.transition = {};
        var o = ie.transition;
        ie.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          e();
        } finally {
          if (ie.transition = a, a === null && o._updatedFibers) {
            var i = o._updatedFibers.size;
            i > 10 && se("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), o._updatedFibers.clear();
          }
        }
      }
      var at = !1, vr = null;
      function It(e) {
        if (vr === null)
          try {
            var r = ("require" + Math.random()).slice(0, 7), a = y && y[r];
            vr = a.call(y, "timers").setImmediate;
          } catch {
            vr = function(i) {
              at === !1 && (at = !0, typeof MessageChannel > "u" && p("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var v = new MessageChannel();
              v.port1.onmessage = i, v.port2.postMessage(void 0);
            };
          }
        return vr(e);
      }
      var Ue = 0, ot = !1;
      function xt(e) {
        {
          var r = Ue;
          Ue++, W.current === null && (W.current = []);
          var a = W.isBatchingLegacy, o;
          try {
            if (W.isBatchingLegacy = !0, o = e(), !a && W.didScheduleLegacyUpdate) {
              var i = W.current;
              i !== null && (W.didScheduleLegacyUpdate = !1, Lr(i));
            }
          } catch (F) {
            throw yr(r), F;
          } finally {
            W.isBatchingLegacy = a;
          }
          if (o !== null && typeof o == "object" && typeof o.then == "function") {
            var v = o, l = !1, m = {
              then: function(F, V) {
                l = !0, v.then(function(G) {
                  yr(r), Ue === 0 ? Fr(G, F, V) : F(G);
                }, function(G) {
                  yr(r), V(G);
                });
              }
            };
            return !ot && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              l || (ot = !0, p("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), m;
          } else {
            var R = o;
            if (yr(r), Ue === 0) {
              var k = W.current;
              k !== null && (Lr(k), W.current = null);
              var A = {
                then: function(F, V) {
                  W.current === null ? (W.current = [], Fr(R, F, V)) : F(R);
                }
              };
              return A;
            } else {
              var I = {
                then: function(F, V) {
                  F(R);
                }
              };
              return I;
            }
          }
        }
      }
      function yr(e) {
        e !== Ue - 1 && p("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ue = e;
      }
      function Fr(e, r, a) {
        {
          var o = W.current;
          if (o !== null)
            try {
              Lr(o), It(function() {
                o.length === 0 ? (W.current = null, r(e)) : Fr(e, r, a);
              });
            } catch (i) {
              a(i);
            }
          else
            r(e);
        }
      }
      var $r = !1;
      function Lr(e) {
        if (!$r) {
          $r = !0;
          var r = 0;
          try {
            for (; r < e.length; r++) {
              var a = e[r];
              do
                a = a(!0);
              while (a !== null);
            }
            e.length = 0;
          } catch (o) {
            throw e = e.slice(r + 1), o;
          } finally {
            $r = !1;
          }
        }
      }
      var Dt = tt, Ft = jt, $t = Pt, Lt = {
        map: xe,
        forEach: ur,
        count: Sr,
        toArray: Tr,
        only: ir
      };
      d.Children = Lt, d.Component = b, d.Fragment = B, d.Profiler = re, d.PureComponent = U, d.StrictMode = ee, d.Suspense = z, d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = q, d.cloneElement = Ft, d.createContext = sr, d.createElement = Dt, d.createFactory = $t, d.createRef = hr, d.forwardRef = jr, d.isValidElement = _e, d.lazy = Pr, d.memo = c, d.startTransition = At, d.unstable_act = xt, d.useCallback = Z, d.useContext = C, d.useDebugValue = ce, d.useDeferredValue = mt, d.useEffect = H, d.useId = ht, d.useImperativeHandle = cr, d.useInsertionEffect = D, d.useLayoutEffect = L, d.useMemo = Ee, d.useReducer = E, d.useRef = g, d.useState = T, d.useSyncExternalStore = gt, d.useTransition = yt, d.version = ae, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(Bt, Je)), Je;
}
(function(y) {
  process.env.NODE_ENV === "production" ? y.exports = Yt() : y.exports = zt();
})(Ut);
const Re = /* @__PURE__ */ Vt(Xe), qt = (y) => y.innerWidth < 768 ? "sm" : y.innerWidth < 992 ? "md" : y.innerWidth < 1200 ? "lg" : "xl", lt = (y) => y === "clientId" ? "client-" + crypto.getRandomValues(new Uint32Array(1))[0] : "app-" + crypto.getRandomValues(new Uint32Array(1))[0], Xt = ({ tag: y, type: d, clientId: ae, appId: Y }) => {
  const x = Re.useRef(null);
  return Re.useEffect(() => {
    const B = () => {
      navigator.sendBeacon("/api/track", JSON.stringify({
        event: d,
        tag: y,
        timestamp: Date.now(),
        clientId: ae,
        appId: Y
      }));
    };
    return x.current && x.current.addEventListener(d, B), () => {
      x.current && x.current.removeEventListener(d, B);
    };
  }, [x]), {
    ref: x
  };
}, Qt = ({ x: y, y: d, clientId: ae, appId: Y }) => {
  const x = Re.useRef(null);
  return Re.useEffect(() => {
    const B = () => {
      const ee = qt(window);
      navigator.sendBeacon("/api/track", JSON.stringify({
        event: "mouse-movement",
        x: y,
        y: d,
        screenSize: ee,
        timestamp: Date.now(),
        clientId: ae,
        appId: Y
      }));
    };
    return x.current && x.current.addEventListener("mousemove", B), () => {
      x.current && x.current.removeEventListener("mousemove", B);
    };
  }, [x]), {
    ref: x
  };
};
var Nr = {}, Ht = {
  get exports() {
    return Nr;
  },
  set exports(y) {
    Nr = y;
  }
}, Ge = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dt;
function Gt() {
  if (dt)
    return Ge;
  dt = 1;
  var y = Xe, d = Symbol.for("react.element"), ae = Symbol.for("react.fragment"), Y = Object.prototype.hasOwnProperty, x = y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, B = { key: !0, ref: !0, __self: !0, __source: !0 };
  function ee(re, M, te) {
    var N, z = {}, ne = null, X = null;
    te !== void 0 && (ne = "" + te), M.key !== void 0 && (ne = "" + M.key), M.ref !== void 0 && (X = M.ref);
    for (N in M)
      Y.call(M, N) && !B.hasOwnProperty(N) && (z[N] = M[N]);
    if (re && re.defaultProps)
      for (N in M = re.defaultProps, M)
        z[N] === void 0 && (z[N] = M[N]);
    return { $$typeof: d, type: re, key: ne, ref: X, props: z, _owner: x.current };
  }
  return Ge.Fragment = ae, Ge.jsx = ee, Ge.jsxs = ee, Ge;
}
var Ke = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pt;
function Kt() {
  return pt || (pt = 1, process.env.NODE_ENV !== "production" && function() {
    var y = Xe, d = Symbol.for("react.element"), ae = Symbol.for("react.portal"), Y = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), B = Symbol.for("react.profiler"), ee = Symbol.for("react.provider"), re = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), te = Symbol.for("react.suspense"), N = Symbol.for("react.suspense_list"), z = Symbol.for("react.memo"), ne = Symbol.for("react.lazy"), X = Symbol.for("react.offscreen"), fe = Symbol.iterator, Fe = "@@iterator";
    function oe(t) {
      if (t === null || typeof t != "object")
        return null;
      var u = fe && t[fe] || t[Fe];
      return typeof u == "function" ? u : null;
    }
    var ue = y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function $(t) {
      {
        for (var u = arguments.length, c = new Array(u > 1 ? u - 1 : 0), f = 1; f < u; f++)
          c[f - 1] = arguments[f];
        me("error", t, c);
      }
    }
    function me(t, u, c) {
      {
        var f = ue.ReactDebugCurrentFrame, C = f.getStackAddendum();
        C !== "" && (u += "%s", c = c.concat([C]));
        var T = c.map(function(E) {
          return String(E);
        });
        T.unshift("Warning: " + u), Function.prototype.apply.call(console[t], console, T);
      }
    }
    var ie = !1, W = !1, K = !1, le = !1, ve = !1, Ce;
    Ce = Symbol.for("react.module.reference");
    function we(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === Y || t === B || ve || t === x || t === te || t === N || le || t === X || ie || W || K || typeof t == "object" && t !== null && (t.$$typeof === ne || t.$$typeof === z || t.$$typeof === ee || t.$$typeof === re || t.$$typeof === M || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === Ce || t.getModuleId !== void 0));
    }
    function Ye(t, u, c) {
      var f = t.displayName;
      if (f)
        return f;
      var C = u.displayName || u.name || "";
      return C !== "" ? c + "(" + C + ")" : c;
    }
    function Se(t) {
      return t.displayName || "Context";
    }
    function J(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && $("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case Y:
          return "Fragment";
        case ae:
          return "Portal";
        case B:
          return "Profiler";
        case x:
          return "StrictMode";
        case te:
          return "Suspense";
        case N:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case re:
            var u = t;
            return Se(u) + ".Consumer";
          case ee:
            var c = t;
            return Se(c._context) + ".Provider";
          case M:
            return Ye(t, t.render, "ForwardRef");
          case z:
            var f = t.displayName || null;
            return f !== null ? f : J(t.type) || "Memo";
          case ne: {
            var C = t, T = C._payload, E = C._init;
            try {
              return J(E(T));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Q = Object.assign, q = 0, se, p, de, Te, n, s, h;
    function w() {
    }
    w.__reactDisabledLog = !0;
    function b() {
      {
        if (q === 0) {
          se = console.log, p = console.info, de = console.warn, Te = console.error, n = console.group, s = console.groupCollapsed, h = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: w,
            writable: !0
          };
          Object.defineProperties(console, {
            info: t,
            log: t,
            warn: t,
            error: t,
            group: t,
            groupCollapsed: t,
            groupEnd: t
          });
        }
        q++;
      }
    }
    function P() {
      {
        if (q--, q === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Q({}, t, {
              value: se
            }),
            info: Q({}, t, {
              value: p
            }),
            warn: Q({}, t, {
              value: de
            }),
            error: Q({}, t, {
              value: Te
            }),
            group: Q({}, t, {
              value: n
            }),
            groupCollapsed: Q({}, t, {
              value: s
            }),
            groupEnd: Q({}, t, {
              value: h
            })
          });
        }
        q < 0 && $("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var j = ue.ReactCurrentDispatcher, O;
    function S(t, u, c) {
      {
        if (O === void 0)
          try {
            throw Error();
          } catch (C) {
            var f = C.stack.trim().match(/\n( *(at )?)/);
            O = f && f[1] || "";
          }
        return `
` + O + t;
      }
    }
    var U = !1, he;
    {
      var hr = typeof WeakMap == "function" ? WeakMap : Map;
      he = new hr();
    }
    function Qe(t, u) {
      if (!t || U)
        return "";
      {
        var c = he.get(t);
        if (c !== void 0)
          return c;
      }
      var f;
      U = !0;
      var C = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var T;
      T = j.current, j.current = null, b();
      try {
        if (u) {
          var E = function() {
            throw Error();
          };
          if (Object.defineProperty(E.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(E, []);
            } catch (ce) {
              f = ce;
            }
            Reflect.construct(t, [], E);
          } else {
            try {
              E.call();
            } catch (ce) {
              f = ce;
            }
            t.call(E.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ce) {
            f = ce;
          }
          t();
        }
      } catch (ce) {
        if (ce && f && typeof ce.stack == "string") {
          for (var g = ce.stack.split(`
`), H = f.stack.split(`
`), D = g.length - 1, L = H.length - 1; D >= 1 && L >= 0 && g[D] !== H[L]; )
            L--;
          for (; D >= 1 && L >= 0; D--, L--)
            if (g[D] !== H[L]) {
              if (D !== 1 || L !== 1)
                do
                  if (D--, L--, L < 0 || g[D] !== H[L]) {
                    var Z = `
` + g[D].replace(" at new ", " at ");
                    return t.displayName && Z.includes("<anonymous>") && (Z = Z.replace("<anonymous>", t.displayName)), typeof t == "function" && he.set(t, Z), Z;
                  }
                while (D >= 1 && L >= 0);
              break;
            }
        }
      } finally {
        U = !1, j.current = T, P(), Error.prepareStackTrace = C;
      }
      var Ee = t ? t.displayName || t.name : "", cr = Ee ? S(Ee) : "";
      return typeof t == "function" && he.set(t, cr), cr;
    }
    function $e(t, u, c) {
      return Qe(t, !1);
    }
    function gr(t) {
      var u = t.prototype;
      return !!(u && u.isReactComponent);
    }
    function Le(t, u, c) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return Qe(t, gr(t));
      if (typeof t == "string")
        return S(t);
      switch (t) {
        case te:
          return S("Suspense");
        case N:
          return S("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case M:
            return $e(t.render);
          case z:
            return Le(t.type, u, c);
          case ne: {
            var f = t, C = f._payload, T = f._init;
            try {
              return Le(T(C), u, c);
            } catch {
            }
          }
        }
      return "";
    }
    var Oe = Object.prototype.hasOwnProperty, ke = {}, Ze = ue.ReactDebugCurrentFrame;
    function Pe(t) {
      if (t) {
        var u = t._owner, c = Le(t.type, t._source, u ? u.type : null);
        Ze.setExtraStackFrame(c);
      } else
        Ze.setExtraStackFrame(null);
    }
    function pe(t, u, c, f, C) {
      {
        var T = Function.call.bind(Oe);
        for (var E in t)
          if (T(t, E)) {
            var g = void 0;
            try {
              if (typeof t[E] != "function") {
                var H = Error((f || "React class") + ": " + c + " type `" + E + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[E] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw H.name = "Invariant Violation", H;
              }
              g = t[E](u, E, f, c, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (D) {
              g = D;
            }
            g && !(g instanceof Error) && (Pe(C), $("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", f || "React class", c, E, typeof g), Pe(null)), g instanceof Error && !(g.message in ke) && (ke[g.message] = !0, Pe(C), $("Failed %s type: %s", c, g.message), Pe(null));
          }
      }
    }
    var je = Array.isArray;
    function Me(t) {
      return je(t);
    }
    function er(t) {
      {
        var u = typeof Symbol == "function" && Symbol.toStringTag, c = u && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return c;
      }
    }
    function rr(t) {
      try {
        return Ne(t), !1;
      } catch {
        return !0;
      }
    }
    function Ne(t) {
      return "" + t;
    }
    function Be(t) {
      if (rr(t))
        return $("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", er(t)), Ne(t);
    }
    var ge = ue.ReactCurrentOwner, _r = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, tr, nr, Ae;
    Ae = {};
    function br(t) {
      if (Oe.call(t, "ref")) {
        var u = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (u && u.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function Er(t) {
      if (Oe.call(t, "key")) {
        var u = Object.getOwnPropertyDescriptor(t, "key").get;
        if (u && u.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function Rr(t, u) {
      if (typeof t.ref == "string" && ge.current && u && ge.current.stateNode !== u) {
        var c = J(ge.current.type);
        Ae[c] || ($('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', J(ge.current.type), t.ref), Ae[c] = !0);
      }
    }
    function _e(t, u) {
      {
        var c = function() {
          tr || (tr = !0, $("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", u));
        };
        c.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: c,
          configurable: !0
        });
      }
    }
    function ar(t, u) {
      {
        var c = function() {
          nr || (nr = !0, $("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", u));
        };
        c.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: c,
          configurable: !0
        });
      }
    }
    var Cr = function(t, u, c, f, C, T, E) {
      var g = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: d,
        // Built-in properties that belong on the element
        type: t,
        key: u,
        ref: c,
        props: E,
        // Record the component responsible for creating this element.
        _owner: T
      };
      return g._store = {}, Object.defineProperty(g._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(g, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: f
      }), Object.defineProperty(g, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: C
      }), Object.freeze && (Object.freeze(g.props), Object.freeze(g)), g;
    };
    function wr(t, u, c, f, C) {
      {
        var T, E = {}, g = null, H = null;
        c !== void 0 && (Be(c), g = "" + c), Er(u) && (Be(u.key), g = "" + u.key), br(u) && (H = u.ref, Rr(u, C));
        for (T in u)
          Oe.call(u, T) && !_r.hasOwnProperty(T) && (E[T] = u[T]);
        if (t && t.defaultProps) {
          var D = t.defaultProps;
          for (T in D)
            E[T] === void 0 && (E[T] = D[T]);
        }
        if (g || H) {
          var L = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          g && _e(E, L), H && ar(E, L);
        }
        return Cr(t, g, H, C, f, ge.current, E);
      }
    }
    var We = ue.ReactCurrentOwner, or = ue.ReactDebugCurrentFrame;
    function ye(t) {
      if (t) {
        var u = t._owner, c = Le(t.type, t._source, u ? u.type : null);
        or.setExtraStackFrame(c);
      } else
        or.setExtraStackFrame(null);
    }
    var Ie;
    Ie = !1;
    function be(t) {
      return typeof t == "object" && t !== null && t.$$typeof === d;
    }
    function xe() {
      {
        if (We.current) {
          var t = J(We.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function Sr(t) {
      {
        if (t !== void 0) {
          var u = t.fileName.replace(/^.*[\\\/]/, ""), c = t.lineNumber;
          return `

Check your code at ` + u + ":" + c + ".";
        }
        return "";
      }
    }
    var ur = {};
    function Tr(t) {
      {
        var u = xe();
        if (!u) {
          var c = typeof t == "string" ? t : t.displayName || t.name;
          c && (u = `

Check the top-level render call using <` + c + ">.");
        }
        return u;
      }
    }
    function ir(t, u) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var c = Tr(u);
        if (ur[c])
          return;
        ur[c] = !0;
        var f = "";
        t && t._owner && t._owner !== We.current && (f = " It was passed a child from " + J(t._owner.type) + "."), ye(t), $('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', c, f), ye(null);
      }
    }
    function sr(t, u) {
      {
        if (typeof t != "object")
          return;
        if (Me(t))
          for (var c = 0; c < t.length; c++) {
            var f = t[c];
            be(f) && ir(f, u);
          }
        else if (be(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var C = oe(t);
          if (typeof C == "function" && C !== t.entries)
            for (var T = C.call(t), E; !(E = T.next()).done; )
              be(E.value) && ir(E.value, u);
        }
      }
    }
    function De(t) {
      {
        var u = t.type;
        if (u == null || typeof u == "string")
          return;
        var c;
        if (typeof u == "function")
          c = u.propTypes;
        else if (typeof u == "object" && (u.$$typeof === M || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        u.$$typeof === z))
          c = u.propTypes;
        else
          return;
        if (c) {
          var f = J(u);
          pe(c, t.props, "prop", f, t);
        } else if (u.PropTypes !== void 0 && !Ie) {
          Ie = !0;
          var C = J(u);
          $("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", C || "Unknown");
        }
        typeof u.getDefaultProps == "function" && !u.getDefaultProps.isReactClassApproved && $("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ze(t) {
      {
        for (var u = Object.keys(t.props), c = 0; c < u.length; c++) {
          var f = u[c];
          if (f !== "children" && f !== "key") {
            ye(t), $("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", f), ye(null);
            break;
          }
        }
        t.ref !== null && (ye(t), $("Invalid attribute `ref` supplied to `React.Fragment`."), ye(null));
      }
    }
    function qe(t, u, c, f, C, T) {
      {
        var E = we(t);
        if (!E) {
          var g = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (g += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var H = Sr(C);
          H ? g += H : g += xe();
          var D;
          t === null ? D = "null" : Me(t) ? D = "array" : t !== void 0 && t.$$typeof === d ? (D = "<" + (J(t.type) || "Unknown") + " />", g = " Did you accidentally export a JSX literal instead of a component?") : D = typeof t, $("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", D, g);
        }
        var L = wr(t, u, c, C, T);
        if (L == null)
          return L;
        if (E) {
          var Z = u.children;
          if (Z !== void 0)
            if (f)
              if (Me(Z)) {
                for (var Ee = 0; Ee < Z.length; Ee++)
                  sr(Z[Ee], t);
                Object.freeze && Object.freeze(Z);
              } else
                $("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              sr(Z, t);
        }
        return t === Y ? ze(L) : De(L), L;
      }
    }
    function Or(t, u, c) {
      return qe(t, u, c, !0);
    }
    function kr(t, u, c) {
      return qe(t, u, c, !1);
    }
    var Pr = kr, jr = Or;
    Ke.Fragment = Y, Ke.jsx = Pr, Ke.jsxs = jr;
  }()), Ke;
}
(function(y) {
  process.env.NODE_ENV === "production" ? y.exports = Gt() : y.exports = Kt();
})(Ht);
const Jt = Nr.jsx, vt = Re.createContext({ clientId: "", appId: "" }), Zt = ({ children: y }) => {
  const d = Re.useMemo(() => ({
    clientId: localStorage.getItem("clientId") || lt("clientId"),
    appId: localStorage.getItem("appId") || lt("appId")
  }), []);
  return Re.useEffect(() => {
    localStorage.setItem("clientId", d.clientId), localStorage.setItem("appId", d.appId);
  }, [d]), /* @__PURE__ */ Jt(vt.Provider, { value: d, children: y });
}, en = () => {
  const y = Re.useContext(vt);
  if (y === void 0)
    throw new Error("useTrackingContext must be used within a TrackingProvider");
  return y;
};
export {
  Zt as TrackingProvider,
  lt as generateId,
  qt as getScreenSize,
  Xt as useTrackEvent,
  Qt as useTrackMouseMovement,
  en as useTrackingContext
};

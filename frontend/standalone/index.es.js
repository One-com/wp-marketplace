import ls, { createContext as Pl, useContext as Ll, useMemo as qr, useRef as lt, useCallback as zt, useState as Je, useEffect as ft } from "react";
import { createPortal as ro } from "react-dom";
var ri = { exports: {} }, pn = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qa;
function Ld() {
  if (Qa) return pn;
  Qa = 1;
  var e = ls, r = Symbol.for("react.element"), i = Symbol.for("react.fragment"), t = Object.prototype.hasOwnProperty, n = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(a, c, l) {
    var f, u = {}, d = null, v = null;
    l !== void 0 && (d = "" + l), c.key !== void 0 && (d = "" + c.key), c.ref !== void 0 && (v = c.ref);
    for (f in c) t.call(c, f) && !s.hasOwnProperty(f) && (u[f] = c[f]);
    if (a && a.defaultProps) for (f in c = a.defaultProps, c) u[f] === void 0 && (u[f] = c[f]);
    return { $$typeof: r, type: a, key: d, ref: v, props: u, _owner: n.current };
  }
  return pn.Fragment = i, pn.jsx = o, pn.jsxs = o, pn;
}
var vn = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ec;
function $d() {
  return ec || (ec = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = ls, r = Symbol.for("react.element"), i = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), a = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), p = Symbol.iterator, _ = "@@iterator";
    function m(w) {
      if (w === null || typeof w != "object")
        return null;
      var T = p && w[p] || w[_];
      return typeof T == "function" ? T : null;
    }
    var y = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function b(w) {
      {
        for (var T = arguments.length, B = new Array(T > 1 ? T - 1 : 0), ee = 1; ee < T; ee++)
          B[ee - 1] = arguments[ee];
        S("error", w, B);
      }
    }
    function S(w, T, B) {
      {
        var ee = y.ReactDebugCurrentFrame, Ce = ee.getStackAddendum();
        Ce !== "" && (T += "%s", B = B.concat([Ce]));
        var Re = B.map(function(ye) {
          return String(ye);
        });
        Re.unshift("Warning: " + T), Function.prototype.apply.call(console[w], console, Re);
      }
    }
    var E = !1, C = !1, A = !1, I = !1, M = !1, D;
    D = Symbol.for("react.module.reference");
    function L(w) {
      return !!(typeof w == "string" || typeof w == "function" || w === t || w === s || M || w === n || w === l || w === f || I || w === v || E || C || A || typeof w == "object" && w !== null && (w.$$typeof === d || w.$$typeof === u || w.$$typeof === o || w.$$typeof === a || w.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      w.$$typeof === D || w.getModuleId !== void 0));
    }
    function j(w, T, B) {
      var ee = w.displayName;
      if (ee)
        return ee;
      var Ce = T.displayName || T.name || "";
      return Ce !== "" ? B + "(" + Ce + ")" : B;
    }
    function k(w) {
      return w.displayName || "Context";
    }
    function P(w) {
      if (w == null)
        return null;
      if (typeof w.tag == "number" && b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof w == "function")
        return w.displayName || w.name || null;
      if (typeof w == "string")
        return w;
      switch (w) {
        case t:
          return "Fragment";
        case i:
          return "Portal";
        case s:
          return "Profiler";
        case n:
          return "StrictMode";
        case l:
          return "Suspense";
        case f:
          return "SuspenseList";
      }
      if (typeof w == "object")
        switch (w.$$typeof) {
          case a:
            var T = w;
            return k(T) + ".Consumer";
          case o:
            var B = w;
            return k(B._context) + ".Provider";
          case c:
            return j(w, w.render, "ForwardRef");
          case u:
            var ee = w.displayName || null;
            return ee !== null ? ee : P(w.type) || "Memo";
          case d: {
            var Ce = w, Re = Ce._payload, ye = Ce._init;
            try {
              return P(ye(Re));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var G = Object.assign, F = 0, ae, ue, K, oe, re, Me, Oe;
    function Pe() {
    }
    Pe.__reactDisabledLog = !0;
    function Se() {
      {
        if (F === 0) {
          ae = console.log, ue = console.info, K = console.warn, oe = console.error, re = console.group, Me = console.groupCollapsed, Oe = console.groupEnd;
          var w = {
            configurable: !0,
            enumerable: !0,
            value: Pe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: w,
            log: w,
            warn: w,
            error: w,
            group: w,
            groupCollapsed: w,
            groupEnd: w
          });
        }
        F++;
      }
    }
    function We() {
      {
        if (F--, F === 0) {
          var w = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: G({}, w, {
              value: ae
            }),
            info: G({}, w, {
              value: ue
            }),
            warn: G({}, w, {
              value: K
            }),
            error: G({}, w, {
              value: oe
            }),
            group: G({}, w, {
              value: re
            }),
            groupCollapsed: G({}, w, {
              value: Me
            }),
            groupEnd: G({}, w, {
              value: Oe
            })
          });
        }
        F < 0 && b("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var X = y.ReactCurrentDispatcher, qe;
    function Ge(w, T, B) {
      {
        if (qe === void 0)
          try {
            throw Error();
          } catch (Ce) {
            var ee = Ce.stack.trim().match(/\n( *(at )?)/);
            qe = ee && ee[1] || "";
          }
        return `
` + qe + w;
      }
    }
    var He = !1, Ye;
    {
      var ot = typeof WeakMap == "function" ? WeakMap : Map;
      Ye = new ot();
    }
    function at(w, T) {
      if (!w || He)
        return "";
      {
        var B = Ye.get(w);
        if (B !== void 0)
          return B;
      }
      var ee;
      He = !0;
      var Ce = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Re;
      Re = X.current, X.current = null, Se();
      try {
        if (T) {
          var ye = function() {
            throw Error();
          };
          if (Object.defineProperty(ye.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ye, []);
            } catch (Ct) {
              ee = Ct;
            }
            Reflect.construct(w, [], ye);
          } else {
            try {
              ye.call();
            } catch (Ct) {
              ee = Ct;
            }
            w.call(ye.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ct) {
            ee = Ct;
          }
          w();
        }
      } catch (Ct) {
        if (Ct && ee && typeof Ct.stack == "string") {
          for (var he = Ct.stack.split(`
`), _t = ee.stack.split(`
`), Ke = he.length - 1, et = _t.length - 1; Ke >= 1 && et >= 0 && he[Ke] !== _t[et]; )
            et--;
          for (; Ke >= 1 && et >= 0; Ke--, et--)
            if (he[Ke] !== _t[et]) {
              if (Ke !== 1 || et !== 1)
                do
                  if (Ke--, et--, et < 0 || he[Ke] !== _t[et]) {
                    var Rt = `
` + he[Ke].replace(" at new ", " at ");
                    return w.displayName && Rt.includes("<anonymous>") && (Rt = Rt.replace("<anonymous>", w.displayName)), typeof w == "function" && Ye.set(w, Rt), Rt;
                  }
                while (Ke >= 1 && et >= 0);
              break;
            }
        }
      } finally {
        He = !1, X.current = Re, We(), Error.prepareStackTrace = Ce;
      }
      var $r = w ? w.displayName || w.name : "", kr = $r ? Ge($r) : "";
      return typeof w == "function" && Ye.set(w, kr), kr;
    }
    function O(w, T, B) {
      return at(w, !1);
    }
    function U(w) {
      var T = w.prototype;
      return !!(T && T.isReactComponent);
    }
    function V(w, T, B) {
      if (w == null)
        return "";
      if (typeof w == "function")
        return at(w, U(w));
      if (typeof w == "string")
        return Ge(w);
      switch (w) {
        case l:
          return Ge("Suspense");
        case f:
          return Ge("SuspenseList");
      }
      if (typeof w == "object")
        switch (w.$$typeof) {
          case c:
            return O(w.render);
          case u:
            return V(w.type, T, B);
          case d: {
            var ee = w, Ce = ee._payload, Re = ee._init;
            try {
              return V(Re(Ce), T, B);
            } catch {
            }
          }
        }
      return "";
    }
    var H = Object.prototype.hasOwnProperty, R = {}, Y = y.ReactDebugCurrentFrame;
    function Z(w) {
      if (w) {
        var T = w._owner, B = V(w.type, w._source, T ? T.type : null);
        Y.setExtraStackFrame(B);
      } else
        Y.setExtraStackFrame(null);
    }
    function J(w, T, B, ee, Ce) {
      {
        var Re = Function.call.bind(H);
        for (var ye in w)
          if (Re(w, ye)) {
            var he = void 0;
            try {
              if (typeof w[ye] != "function") {
                var _t = Error((ee || "React class") + ": " + B + " type `" + ye + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof w[ye] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw _t.name = "Invariant Violation", _t;
              }
              he = w[ye](T, ye, ee, B, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Ke) {
              he = Ke;
            }
            he && !(he instanceof Error) && (Z(Ce), b("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", ee || "React class", B, ye, typeof he), Z(null)), he instanceof Error && !(he.message in R) && (R[he.message] = !0, Z(Ce), b("Failed %s type: %s", B, he.message), Z(null));
          }
      }
    }
    var ze = Array.isArray;
    function ct(w) {
      return ze(w);
    }
    function ht(w) {
      {
        var T = typeof Symbol == "function" && Symbol.toStringTag, B = T && w[Symbol.toStringTag] || w.constructor.name || "Object";
        return B;
      }
    }
    function It(w) {
      try {
        return z(w), !1;
      } catch {
        return !0;
      }
    }
    function z(w) {
      return "" + w;
    }
    function Q(w) {
      if (It(w))
        return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ht(w)), z(w);
    }
    var Le = y.ReactCurrentOwner, pt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, je, Ot;
    function me(w) {
      if (H.call(w, "ref")) {
        var T = Object.getOwnPropertyDescriptor(w, "ref").get;
        if (T && T.isReactWarning)
          return !1;
      }
      return w.ref !== void 0;
    }
    function ut(w) {
      if (H.call(w, "key")) {
        var T = Object.getOwnPropertyDescriptor(w, "key").get;
        if (T && T.isReactWarning)
          return !1;
      }
      return w.key !== void 0;
    }
    function At(w, T) {
      typeof w.ref == "string" && Le.current;
    }
    function Ae(w, T) {
      {
        var B = function() {
          je || (je = !0, b("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", T));
        };
        B.isReactWarning = !0, Object.defineProperty(w, "key", {
          get: B,
          configurable: !0
        });
      }
    }
    function de(w, T) {
      {
        var B = function() {
          Ot || (Ot = !0, b("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", T));
        };
        B.isReactWarning = !0, Object.defineProperty(w, "ref", {
          get: B,
          configurable: !0
        });
      }
    }
    var Ie = function(w, T, B, ee, Ce, Re, ye) {
      var he = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: w,
        key: T,
        ref: B,
        props: ye,
        // Record the component responsible for creating this element.
        _owner: Re
      };
      return he._store = {}, Object.defineProperty(he._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(he, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ee
      }), Object.defineProperty(he, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Ce
      }), Object.freeze && (Object.freeze(he.props), Object.freeze(he)), he;
    };
    function q(w, T, B, ee, Ce) {
      {
        var Re, ye = {}, he = null, _t = null;
        B !== void 0 && (Q(B), he = "" + B), ut(T) && (Q(T.key), he = "" + T.key), me(T) && (_t = T.ref, At(T, Ce));
        for (Re in T)
          H.call(T, Re) && !pt.hasOwnProperty(Re) && (ye[Re] = T[Re]);
        if (w && w.defaultProps) {
          var Ke = w.defaultProps;
          for (Re in Ke)
            ye[Re] === void 0 && (ye[Re] = Ke[Re]);
        }
        if (he || _t) {
          var et = typeof w == "function" ? w.displayName || w.name || "Unknown" : w;
          he && Ae(ye, et), _t && de(ye, et);
        }
        return Ie(w, he, _t, Ce, ee, Le.current, ye);
      }
    }
    var xe = y.ReactCurrentOwner, ar = y.ReactDebugCurrentFrame;
    function $t(w) {
      if (w) {
        var T = w._owner, B = V(w.type, w._source, T ? T.type : null);
        ar.setExtraStackFrame(B);
      } else
        ar.setExtraStackFrame(null);
    }
    var Kt;
    Kt = !1;
    function Jt(w) {
      return typeof w == "object" && w !== null && w.$$typeof === r;
    }
    function fn() {
      {
        if (xe.current) {
          var w = P(xe.current.type);
          if (w)
            return `

Check the render method of \`` + w + "`.";
        }
        return "";
      }
    }
    function Qn(w) {
      return "";
    }
    var yt = {};
    function ei(w) {
      {
        var T = fn();
        if (!T) {
          var B = typeof w == "string" ? w : w.displayName || w.name;
          B && (T = `

Check the top-level render call using <` + B + ">.");
        }
        return T;
      }
    }
    function dn(w, T) {
      {
        if (!w._store || w._store.validated || w.key != null)
          return;
        w._store.validated = !0;
        var B = ei(T);
        if (yt[B])
          return;
        yt[B] = !0;
        var ee = "";
        w && w._owner && w._owner !== xe.current && (ee = " It was passed a child from " + P(w._owner.type) + "."), $t(w), b('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', B, ee), $t(null);
      }
    }
    function hn(w, T) {
      {
        if (typeof w != "object")
          return;
        if (ct(w))
          for (var B = 0; B < w.length; B++) {
            var ee = w[B];
            Jt(ee) && dn(ee, T);
          }
        else if (Jt(w))
          w._store && (w._store.validated = !0);
        else if (w) {
          var Ce = m(w);
          if (typeof Ce == "function" && Ce !== w.entries)
            for (var Re = Ce.call(w), ye; !(ye = Re.next()).done; )
              Jt(ye.value) && dn(ye.value, T);
        }
      }
    }
    function nt(w) {
      {
        var T = w.type;
        if (T == null || typeof T == "string")
          return;
        var B;
        if (typeof T == "function")
          B = T.propTypes;
        else if (typeof T == "object" && (T.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        T.$$typeof === u))
          B = T.propTypes;
        else
          return;
        if (B) {
          var ee = P(T);
          J(B, w.props, "prop", ee, w);
        } else if (T.PropTypes !== void 0 && !Kt) {
          Kt = !0;
          var Ce = P(T);
          b("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ce || "Unknown");
        }
        typeof T.getDefaultProps == "function" && !T.getDefaultProps.isReactClassApproved && b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function xt(w) {
      {
        for (var T = Object.keys(w.props), B = 0; B < T.length; B++) {
          var ee = T[B];
          if (ee !== "children" && ee !== "key") {
            $t(w), b("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", ee), $t(null);
            break;
          }
        }
        w.ref !== null && ($t(w), b("Invalid attribute `ref` supplied to `React.Fragment`."), $t(null));
      }
    }
    var Dt = {};
    function Xt(w, T, B, ee, Ce, Re) {
      {
        var ye = L(w);
        if (!ye) {
          var he = "";
          (w === void 0 || typeof w == "object" && w !== null && Object.keys(w).length === 0) && (he += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var _t = Qn();
          _t ? he += _t : he += fn();
          var Ke;
          w === null ? Ke = "null" : ct(w) ? Ke = "array" : w !== void 0 && w.$$typeof === r ? (Ke = "<" + (P(w.type) || "Unknown") + " />", he = " Did you accidentally export a JSX literal instead of a component?") : Ke = typeof w, b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Ke, he);
        }
        var et = q(w, T, B, Ce, Re);
        if (et == null)
          return et;
        if (ye) {
          var Rt = T.children;
          if (Rt !== void 0)
            if (ee)
              if (ct(Rt)) {
                for (var $r = 0; $r < Rt.length; $r++)
                  hn(Rt[$r], w);
                Object.freeze && Object.freeze(Rt);
              } else
                b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              hn(Rt, w);
        }
        if (H.call(T, "key")) {
          var kr = P(w), Ct = Object.keys(T).filter(function(Pd) {
            return Pd !== "key";
          }), Is = Ct.length > 0 ? "{key: someKey, " + Ct.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Dt[kr + Is]) {
            var Md = Ct.length > 0 ? "{" + Ct.join(": ..., ") + ": ...}" : "{}";
            b(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Is, kr, Md, kr), Dt[kr + Is] = !0;
          }
        }
        return w === t ? xt(et) : nt(et), et;
      }
    }
    function Lr(w, T, B) {
      return Xt(w, T, B, !0);
    }
    function ti(w, T, B) {
      return Xt(w, T, B, !1);
    }
    var Td = ti, Nd = Lr;
    vn.Fragment = t, vn.jsx = Td, vn.jsxs = Nd;
  })()), vn;
}
var tc;
function Dd() {
  return tc || (tc = 1, process.env.NODE_ENV === "production" ? ri.exports = Ld() : ri.exports = $d()), ri.exports;
}
var g = Dd();
function Fd(e) {
  if (!e || !e.data || !Array.isArray(e.data.catalog))
    return console.error(
      "Unsupported marketplace response shape. Expected { data: { catalog: [...] } }.",
      e
    ), { plugins: [], uiI18n: {}, locale: null };
  const r = e.data.catalog, i = e.data.uiI18n || {}, t = e.data.locale || null;
  if (r.length === 0) return { plugins: [], uiI18n: i, locale: t };
  const n = r.map((a) => {
    var _;
    const c = (_ = a == null ? void 0 : a.i18n) == null ? void 0 : _.description, l = typeof c == "string" && c ? c : typeof (a == null ? void 0 : a.description) == "object" && a.description !== null ? a.description["en-gb"] || Object.values(a.description)[0] || "" : (a == null ? void 0 : a.description) || "", f = (a == null ? void 0 : a.download) || (a == null ? void 0 : a.download_url) || (a == null ? void 0 : a.downloadUrl) || "", u = typeof (a == null ? void 0 : a.author) == "object" && a.author !== null ? a.author.name || "" : (a == null ? void 0 : a.author) || "", d = typeof (a == null ? void 0 : a.author) == "object" && a.author !== null && a.author.url || "", v = typeof (a == null ? void 0 : a.price) == "object" && a.price !== null ? a.price.amount : void 0, p = typeof (a == null ? void 0 : a.price) == "object" && a.price !== null ? a.price.currency : void 0;
    return {
      ...a,
      name: (a == null ? void 0 : a.name) || "Unknown",
      slug: (a == null ? void 0 : a.slug) || "",
      thumbnail: (a == null ? void 0 : a.thumbnail) || "",
      description: l,
      download: f,
      author: u,
      authorUrl: d,
      priceAmount: v,
      priceCurrency: p,
      installed: (a == null ? void 0 : a.installed) ?? !1,
      activated: (a == null ? void 0 : a.activated) ?? !1,
      i18n: (a == null ? void 0 : a.i18n) || {}
    };
  }), s = /* @__PURE__ */ new Set();
  return { plugins: n.filter((a) => {
    const c = a.slug || a.name || JSON.stringify(a);
    return s.has(c) ? !1 : (s.add(c), !0);
  }), uiI18n: i, locale: t };
}
var jd = Object.defineProperty, Ud = (e, r, i) => r in e ? jd(e, r, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[r] = i, pr = (e, r, i) => (Ud(e, r + "", i), i);
const Os = {};
async function vr(e) {
  if (Os.hasOwnProperty(e))
    return Os[e];
  let r;
  return e.startsWith("data:") || !("caches" in self) ? r = fetch(e).then((i) => i.text()) : r = caches.open("gravity").then(async (i) => {
    let t = await i.match(e);
    return t || (t = await fetch(e), t.ok && await i.put(e, t.clone())), t.text();
  }), Os[e] = r, r;
}
class no extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }
  fetchFlag(r) {
    r && vr(r).then((i) => this.innerHTML = i);
  }
  connectedCallback() {
    this.fetchFlag(this.getAttribute("src"));
  }
  attributeChangedCallback(r, i, t) {
    r === "src" && i !== t && this.fetchFlag(t);
  }
}
pr(no, "TAG_NAME", "gv-flag");
class io extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }
  fetchIcon(r) {
    r && vr(r).then((i) => this.innerHTML = i);
  }
  connectedCallback() {
    this.fetchIcon(this.getAttribute("src"));
  }
  attributeChangedCallback(r, i, t) {
    r === "src" && i !== t && this.fetchIcon(t);
  }
}
pr(io, "TAG_NAME", "gv-icon");
class so extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }
  fetchIllustration(r) {
    r && vr(r).then((i) => this.innerHTML = i);
  }
  connectedCallback() {
    this.fetchIllustration(this.getAttribute("src"));
  }
  attributeChangedCallback(r, i, t) {
    r === "src" && i !== t && this.fetchIllustration(t);
  }
}
pr(so, "TAG_NAME", "gv-illustration");
class oo extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }
  fetchIndicator(r) {
    r && vr(r).then((i) => this.innerHTML = i);
  }
  connectedCallback() {
    this.fetchIndicator(this.getAttribute("src"));
  }
  attributeChangedCallback(r, i, t) {
    r === "src" && i !== t && this.fetchIndicator(t);
  }
}
pr(oo, "TAG_NAME", "gv-indicator");
class ao extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }
  fetchLoader(r) {
    r && vr(r).then((i) => this.innerHTML = i);
  }
  connectedCallback() {
    this.fetchLoader(this.getAttribute("src"));
  }
  attributeChangedCallback(r, i, t) {
    r === "src" && i !== t && this.fetchLoader(t);
  }
}
pr(ao, "TAG_NAME", "gv-loader");
class co extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }
  fetchLogo(r) {
    r && vr(r).then((i) => this.innerHTML = i);
  }
  connectedCallback() {
    this.fetchLogo(this.getAttribute("src"));
  }
  attributeChangedCallback(r, i, t) {
    r === "src" && i !== t && this.fetchLogo(t);
  }
}
pr(co, "TAG_NAME", "gv-logo");
class lo extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }
  fetchPayIcon(r) {
    r && vr(r).then((i) => this.innerHTML = i);
  }
  connectedCallback() {
    this.fetchPayIcon(this.getAttribute("src"));
  }
  attributeChangedCallback(r, i, t) {
    r === "src" && i !== t && this.fetchPayIcon(t);
  }
}
pr(lo, "TAG_NAME", "gv-pay-icon");
class uo extends HTMLElement {
  static get observedAttributes() {
    return ["src", "variant"];
  }
  fetchTile(r) {
    r && vr(r).then((i) => this.innerHTML = i);
  }
  connectedCallback() {
    this.fetchTile(this.getAttribute("src"));
  }
  attributeChangedCallback(r, i, t) {
    r === "src" && i !== t && this.fetchTile(t);
  }
}
pr(uo, "TAG_NAME", "gv-tile");
function gr(e, r) {
  customElements.get(e) || customElements.define(e, r);
}
gr(no.TAG_NAME, no);
gr(io.TAG_NAME, io);
gr(so.TAG_NAME, so);
gr(oo.TAG_NAME, oo);
gr(ao.TAG_NAME, ao);
gr(co.TAG_NAME, co);
gr(lo.TAG_NAME, lo);
gr(uo.TAG_NAME, uo);
const Bd = (e, r, i, t) => {
  var s, o, a, c;
  const n = [i, {
    code: r,
    ...t || {}
  }];
  if ((o = (s = e == null ? void 0 : e.services) == null ? void 0 : s.logger) != null && o.forward)
    return e.services.logger.forward(n, "warn", "react-i18next::", !0);
  Ir(n[0]) && (n[0] = `react-i18next:: ${n[0]}`), (c = (a = e == null ? void 0 : e.services) == null ? void 0 : a.logger) != null && c.warn ? e.services.logger.warn(...n) : console != null && console.warn && console.warn(...n);
}, rc = {}, $l = (e, r, i, t) => {
  Ir(i) && rc[i] || (Ir(i) && (rc[i] = /* @__PURE__ */ new Date()), Bd(e, r, i, t));
}, Dl = (e, r) => () => {
  if (e.isInitialized)
    r();
  else {
    const i = () => {
      setTimeout(() => {
        e.off("initialized", i);
      }, 0), r();
    };
    e.on("initialized", i);
  }
}, fo = (e, r, i) => {
  e.loadNamespaces(r, Dl(e, i));
}, nc = (e, r, i, t) => {
  if (Ir(i) && (i = [i]), e.options.preload && e.options.preload.indexOf(r) > -1) return fo(e, i, t);
  i.forEach((n) => {
    e.options.ns.indexOf(n) < 0 && e.options.ns.push(n);
  }), e.loadLanguages(r, Dl(e, t));
}, Wd = (e, r, i = {}) => !r.languages || !r.languages.length ? ($l(r, "NO_LANGUAGES", "i18n.languages were undefined or empty", {
  languages: r.languages
}), !0) : r.hasLoadedNamespace(e, {
  lng: i.lng,
  precheck: (t, n) => {
    if (i.bindI18n && i.bindI18n.indexOf("languageChanging") > -1 && t.services.backendConnector.backend && t.isLanguageChangingTo && !n(t.isLanguageChangingTo, e)) return !1;
  }
}), Ir = (e) => typeof e == "string", zd = (e) => typeof e == "object" && e !== null, Gd = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, Vd = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "©",
  "&#169;": "©",
  "&reg;": "®",
  "&#174;": "®",
  "&hellip;": "…",
  "&#8230;": "…",
  "&#x2F;": "/",
  "&#47;": "/"
}, qd = (e) => Vd[e], Hd = (e) => e.replace(Gd, qd);
let Yd = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: Hd,
  transDefaultProps: void 0
};
const Kd = () => Yd;
let Jd;
const Xd = () => Jd, Zd = Pl();
class Qd {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(r) {
    r.forEach((i) => {
      this.usedNamespaces[i] || (this.usedNamespaces[i] = !0);
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
var ni = { exports: {} }, As = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ic;
function eh() {
  if (ic) return As;
  ic = 1;
  var e = ls;
  function r(u, d) {
    return u === d && (u !== 0 || 1 / u === 1 / d) || u !== u && d !== d;
  }
  var i = typeof Object.is == "function" ? Object.is : r, t = e.useState, n = e.useEffect, s = e.useLayoutEffect, o = e.useDebugValue;
  function a(u, d) {
    var v = d(), p = t({ inst: { value: v, getSnapshot: d } }), _ = p[0].inst, m = p[1];
    return s(
      function() {
        _.value = v, _.getSnapshot = d, c(_) && m({ inst: _ });
      },
      [u, v, d]
    ), n(
      function() {
        return c(_) && m({ inst: _ }), u(function() {
          c(_) && m({ inst: _ });
        });
      },
      [u]
    ), o(v), v;
  }
  function c(u) {
    var d = u.getSnapshot;
    u = u.value;
    try {
      var v = d();
      return !i(u, v);
    } catch {
      return !0;
    }
  }
  function l(u, d) {
    return d();
  }
  var f = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : a;
  return As.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : f, As;
}
var Rs = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sc;
function th() {
  return sc || (sc = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(v, p) {
      return v === p && (v !== 0 || 1 / v === 1 / p) || v !== v && p !== p;
    }
    function r(v, p) {
      f || n.startTransition === void 0 || (f = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var _ = p();
      if (!u) {
        var m = p();
        s(_, m) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), u = !0);
      }
      m = o({
        inst: { value: _, getSnapshot: p }
      });
      var y = m[0].inst, b = m[1];
      return c(
        function() {
          y.value = _, y.getSnapshot = p, i(y) && b({ inst: y });
        },
        [v, _, p]
      ), a(
        function() {
          return i(y) && b({ inst: y }), v(function() {
            i(y) && b({ inst: y });
          });
        },
        [v]
      ), l(_), _;
    }
    function i(v) {
      var p = v.getSnapshot;
      v = v.value;
      try {
        var _ = p();
        return !s(v, _);
      } catch {
        return !0;
      }
    }
    function t(v, p) {
      return p();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var n = ls, s = typeof Object.is == "function" ? Object.is : e, o = n.useState, a = n.useEffect, c = n.useLayoutEffect, l = n.useDebugValue, f = !1, u = !1, d = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? t : r;
    Rs.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : d, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), Rs;
}
var oc;
function rh() {
  return oc || (oc = 1, process.env.NODE_ENV === "production" ? ni.exports = eh() : ni.exports = th()), ni.exports;
}
var nh = rh();
const ih = (e, r) => Ir(r) ? r : zd(r) && Ir(r.defaultValue) ? r.defaultValue : Array.isArray(e) ? e[e.length - 1] : e, sh = {
  t: ih,
  ready: !1
}, oh = () => () => {
}, Fl = (e, r = {}) => {
  var D, L, j;
  const {
    i18n: i
  } = r, {
    i18n: t,
    defaultNS: n
  } = Ll(Zd) || {}, s = i || t || Xd();
  s && !s.reportNamespaces && (s.reportNamespaces = new Qd()), s || $l(s, "NO_I18NEXT_INSTANCE", "useTranslation: You will need to pass in an i18next instance by using initReactI18next");
  const o = qr(() => {
    var k;
    return {
      ...Kd(),
      ...(k = s == null ? void 0 : s.options) == null ? void 0 : k.react,
      ...r
    };
  }, [s, r]), {
    useSuspense: a,
    keyPrefix: c
  } = o, l = n || ((D = s == null ? void 0 : s.options) == null ? void 0 : D.defaultNS), f = Ir(l) ? [l] : l || ["translation"], u = qr(() => f, f);
  (j = (L = s == null ? void 0 : s.reportNamespaces) == null ? void 0 : L.addUsedNamespaces) == null || j.call(L, u);
  const d = lt(0), v = zt((k) => {
    if (!s) return oh;
    const {
      bindI18n: P,
      bindI18nStore: G
    } = o, F = () => {
      d.current += 1, k();
    };
    return P && s.on(P, F), G && s.store.on(G, F), () => {
      P && P.split(" ").forEach((ae) => s.off(ae, F)), G && G.split(" ").forEach((ae) => s.store.off(ae, F));
    };
  }, [s, o]), p = lt(), _ = zt(() => {
    if (!s)
      return sh;
    const k = !!(s.isInitialized || s.initializedStoreOnce) && u.every((K) => Wd(K, s, o)), P = r.lng || s.language, G = d.current, F = p.current;
    if (F && F.ready === k && F.lng === P && F.keyPrefix === c && F.revision === G)
      return F;
    const ue = {
      t: s.getFixedT(P, o.nsMode === "fallback" ? u : u[0], c),
      ready: k,
      lng: P,
      keyPrefix: c,
      revision: G
    };
    return p.current = ue, ue;
  }, [s, u, c, o, r.lng]), [m, y] = Je(0), {
    t: b,
    ready: S
  } = nh.useSyncExternalStore(v, _, _);
  ft(() => {
    if (s && !S && !a) {
      const k = () => y((P) => P + 1);
      r.lng ? nc(s, r.lng, u, k) : fo(s, u, k);
    }
  }, [s, r.lng, u, S, a, m]);
  const E = s || {}, C = lt(null), A = lt(), I = (k) => {
    const P = Object.getOwnPropertyDescriptors(k);
    P.__original && delete P.__original;
    const G = Object.create(Object.getPrototypeOf(k), P);
    if (!Object.prototype.hasOwnProperty.call(G, "__original"))
      try {
        Object.defineProperty(G, "__original", {
          value: k,
          writable: !1,
          enumerable: !1,
          configurable: !1
        });
      } catch {
      }
    return G;
  }, M = qr(() => {
    const k = E, P = k == null ? void 0 : k.language;
    let G = k;
    k && (C.current && C.current.__original === k ? A.current !== P ? (G = I(k), C.current = G, A.current = P) : G = C.current : (G = I(k), C.current = G, A.current = P));
    const F = [b, G, S];
    return F.t = b, F.i18n = G, F.ready = S, F;
  }, [b, E, S, E.resolvedLanguage, E.language, E.languages]);
  if (s && a && !S)
    throw new Promise((k) => {
      const P = () => k();
      r.lng ? nc(s, r.lng, u, P) : fo(s, u, P);
    });
  return M;
};
var N;
if (typeof window > "u") {
  var ac = {
    hostname: ""
  };
  N = {
    crypto: { randomUUID: function() {
      throw Error("unsupported");
    } },
    navigator: { userAgent: "", onLine: !0 },
    document: {
      createElement: function() {
        return {};
      },
      location: ac,
      referrer: ""
    },
    screen: { width: 0, height: 0 },
    location: ac,
    addEventListener: function() {
    },
    removeEventListener: function() {
    }
  };
} else
  N = window;
function cc(e, r) {
  (r == null || r > e.length) && (r = e.length);
  for (var i = 0, t = new Array(r); i < r; i++) t[i] = e[i];
  return t;
}
function lc(e, r, i, t, n, s, o) {
  try {
    var a = e[s](o), c = a.value;
  } catch (l) {
    i(l);
    return;
  }
  a.done ? r(c) : Promise.resolve(c).then(t, n);
}
function la(e) {
  return function() {
    var r = this, i = arguments;
    return new Promise(function(t, n) {
      var s = e.apply(r, i);
      function o(c) {
        lc(s, t, n, o, a, "next", c);
      }
      function a(c) {
        lc(s, t, n, o, a, "throw", c);
      }
      o(void 0);
    });
  };
}
function Ai(e, r, i) {
  return jl() ? Ai = Reflect.construct : Ai = function(n, s, o) {
    var a = [
      null
    ];
    a.push.apply(a, s);
    var c = Function.bind.apply(n, a), l = new c();
    return o && Nn(l, o.prototype), l;
  }, Ai.apply(null, arguments);
}
function ah(e, r) {
  for (var i = 0; i < r.length; i++) {
    var t = r[i];
    t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t);
  }
}
function dt(e, r, i) {
  return r && ah(e.prototype, r), e;
}
function we() {
  return we = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
      var i = arguments[r];
      for (var t in i)
        Object.prototype.hasOwnProperty.call(i, t) && (e[t] = i[t]);
    }
    return e;
  }, we.apply(this, arguments);
}
function ho(e) {
  return ho = Object.setPrototypeOf ? Object.getPrototypeOf : function(i) {
    return i.__proto__ || Object.getPrototypeOf(i);
  }, ho(e);
}
function mt(e, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(r && r.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), r && Nn(e, r);
}
function te(e, r) {
  return r != null && typeof Symbol < "u" && r[Symbol.hasInstance] ? !!r[Symbol.hasInstance](e) : e instanceof r;
}
function ch(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function Tn(e, r) {
  if (e == null) return {};
  var i = {}, t = Object.keys(e), n, s;
  for (s = 0; s < t.length; s++)
    n = t[s], !(r.indexOf(n) >= 0) && (i[n] = e[n]);
  return i;
}
function Nn(e, r) {
  return Nn = Object.setPrototypeOf || function(t, n) {
    return t.__proto__ = n, t;
  }, Nn(e, r);
}
function ce(e) {
  "@swc/helpers - typeof";
  return e && typeof Symbol < "u" && e.constructor === Symbol ? "symbol" : typeof e;
}
function lh(e, r) {
  if (e) {
    if (typeof e == "string") return cc(e, r);
    var i = Object.prototype.toString.call(e).slice(8, -1);
    if (i === "Object" && e.constructor && (i = e.constructor.name), i === "Map" || i === "Set") return Array.from(i);
    if (i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return cc(e, r);
  }
}
function $i(e) {
  var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return $i = function(t) {
    if (t === null || !ch(t)) return t;
    if (typeof t != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof r < "u") {
      if (r.has(t)) return r.get(t);
      r.set(t, n);
    }
    function n() {
      return Ai(t, arguments, ho(this).constructor);
    }
    return n.prototype = Object.create(t.prototype, {
      constructor: {
        value: n,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), Nn(n, t);
  }, $i(e);
}
function jl() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (jl = function() {
    return !!e;
  })();
}
function W(e, r) {
  var i = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (i) return (i = i.call(e)).next.bind(i);
  if (Array.isArray(e) || (i = lh(e)) || r) {
    i && (e = i);
    var t = 0;
    return function() {
      return t >= e.length ? {
        done: !0
      } : {
        done: !1,
        value: e[t++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Mn(e, r) {
  var i, t, n, s, o = {
    label: 0,
    sent: function() {
      if (n[0] & 1) throw n[1];
      return n[1];
    },
    trys: [],
    ops: []
  };
  return s = {
    next: a(0),
    throw: a(1),
    return: a(2)
  }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a(l) {
    return function(f) {
      return c([
        l,
        f
      ]);
    };
  }
  function c(l) {
    if (i) throw new TypeError("Generator is already executing.");
    for (; o; ) try {
      if (i = 1, t && (n = l[0] & 2 ? t.return : l[0] ? t.throw || ((n = t.return) && n.call(t), 0) : t.next) && !(n = n.call(t, l[1])).done) return n;
      switch (t = 0, n && (l = [
        l[0] & 2,
        n.value
      ]), l[0]) {
        case 0:
        case 1:
          n = l;
          break;
        case 4:
          return o.label++, {
            value: l[1],
            done: !1
          };
        case 5:
          o.label++, t = l[1], l = [
            0
          ];
          continue;
        case 7:
          l = o.ops.pop(), o.trys.pop();
          continue;
        default:
          if (n = o.trys, !(n = n.length > 0 && n[n.length - 1]) && (l[0] === 6 || l[0] === 2)) {
            o = 0;
            continue;
          }
          if (l[0] === 3 && (!n || l[1] > n[0] && l[1] < n[3])) {
            o.label = l[1];
            break;
          }
          if (l[0] === 6 && o.label < n[1]) {
            o.label = n[1], n = l;
            break;
          }
          if (n && o.label < n[2]) {
            o.label = n[2], o.ops.push(l);
            break;
          }
          n[2] && o.ops.pop(), o.trys.pop();
          continue;
      }
      l = r.call(e, o);
    } catch (f) {
      l = [
        6,
        f
      ], t = 0;
    } finally {
      i = n = 0;
    }
    if (l[0] & 5) throw l[1];
    return {
      value: l[0] ? l[1] : void 0,
      done: !0
    };
  }
}
function Ul(e) {
  var r = typeof Symbol == "function" && Symbol.iterator, i = r && e[r], t = 0;
  if (i) return i.call(e);
  if (e && typeof e.length == "number") return {
    next: function() {
      return e && t >= e.length && (e = void 0), {
        value: e && e[t++],
        done: !e
      };
    }
  };
  throw new TypeError(r ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
var uh = Object.defineProperty, fh = function(e, r, i) {
  return r in e ? uh(e, r, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
  }) : e[r] = i;
}, $ = function(e, r, i) {
  return fh(e, (typeof r > "u" ? "undefined" : ce(r)) !== "symbol" ? r + "" : r, i);
}, uc, dh = Object.defineProperty, hh = function(e, r, i) {
  return r in e ? dh(e, r, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
  }) : e[r] = i;
}, fc = function(e, r, i) {
  return hh(e, (typeof r > "u" ? "undefined" : ce(r)) !== "symbol" ? r + "" : r, i);
}, it = /* @__PURE__ */ (function(e) {
  return e[e.Document = 0] = "Document", e[e.DocumentType = 1] = "DocumentType", e[e.Element = 2] = "Element", e[e.Text = 3] = "Text", e[e.CDATA = 4] = "CDATA", e[e.Comment = 5] = "Comment", e;
})(it || {}), dc = {
  Node: [
    "childNodes",
    "parentNode",
    "parentElement",
    "textContent"
  ],
  ShadowRoot: [
    "host",
    "styleSheets"
  ],
  Element: [
    "shadowRoot",
    "querySelector",
    "querySelectorAll"
  ],
  MutationObserver: []
}, hc = {
  Node: [
    "contains",
    "getRootNode"
  ],
  ShadowRoot: [
    "getSelection"
  ],
  Element: [],
  MutationObserver: [
    "constructor"
  ]
}, ii = {}, ph = function() {
  return !!globalThis.Zone;
};
function ua(e) {
  if (ii[e]) return ii[e];
  var r = globalThis[e], i = r.prototype, t = e in dc ? dc[e] : void 0, n = !!(t && // @ts-expect-error 2345
  t.every(function(f) {
    var u, d;
    return !!((d = (u = Object.getOwnPropertyDescriptor(i, f)) == null ? void 0 : u.get) != null && d.toString().includes("[native code]"));
  })), s = e in hc ? hc[e] : void 0, o = !!(s && s.every(
    // @ts-expect-error 2345
    function(f) {
      var u;
      return typeof i[f] == "function" && ((u = i[f]) == null ? void 0 : u.toString().includes("[native code]"));
    }
  ));
  if (n && o && !ph())
    return ii[e] = r.prototype, r.prototype;
  try {
    var a = document.createElement("iframe");
    document.body.appendChild(a);
    var c = a.contentWindow;
    if (!c) return r.prototype;
    var l = c[e].prototype;
    return document.body.removeChild(a), l ? ii[e] = l : i;
  } catch {
    return i;
  }
}
var Ts = {};
function mr(e, r, i) {
  var t, n = e + "." + String(i);
  if (Ts[n]) return Ts[n].call(r);
  var s = ua(e), o = (t = Object.getOwnPropertyDescriptor(s, i)) == null ? void 0 : t.get;
  return o ? (Ts[n] = o, o.call(r)) : r[i];
}
var Ns = {};
function Bl(e, r, i) {
  var t = e + "." + String(i);
  if (Ns[t]) return Ns[t].bind(r);
  var n = ua(e), s = n[i];
  return typeof s != "function" ? r[i] : (Ns[t] = s, s.bind(r));
}
function vh(e) {
  return mr("Node", e, "childNodes");
}
function gh(e) {
  return mr("Node", e, "parentNode");
}
function mh(e) {
  return mr("Node", e, "parentElement");
}
function yh(e) {
  return mr("Node", e, "textContent");
}
function _h(e, r) {
  return Bl("Node", e, "contains")(r);
}
function bh(e) {
  return Bl("Node", e, "getRootNode")();
}
function wh(e) {
  return !e || !("host" in e) ? null : mr("ShadowRoot", e, "host");
}
function Sh(e) {
  return e.styleSheets;
}
function xh(e) {
  return !e || !("shadowRoot" in e) ? null : mr("Element", e, "shadowRoot");
}
function Ch(e, r) {
  return mr("Element", e, "querySelector")(r);
}
function kh(e, r) {
  return mr("Element", e, "querySelectorAll")(r);
}
function Eh() {
  return ua("MutationObserver").constructor;
}
function Ih(e, r, i) {
  try {
    if (!(r in e))
      return function() {
      };
    var t = e[r], n = i(t);
    return typeof n == "function" && (n.prototype = n.prototype || {}, Object.defineProperties(n, {
      __rrweb_original__: {
        enumerable: !1,
        value: t
      }
    })), e[r] = n, function() {
      e[r] = t;
    };
  } catch {
    return function() {
    };
  }
}
var gt = {
  childNodes: vh,
  parentNode: gh,
  parentElement: mh,
  textContent: yh,
  contains: _h,
  getRootNode: bh,
  host: wh,
  styleSheets: Sh,
  shadowRoot: xh,
  querySelector: Ch,
  querySelectorAll: kh,
  mutationObserver: Eh,
  patch: Ih
};
function Wl(e) {
  return e.nodeType === e.ELEMENT_NODE;
}
function wn(e) {
  var r = (
    // anchor and textarea elements also have a `host` property
    // but only shadow roots have a `mode` property
    e && "host" in e && "mode" in e && gt.host(e) || null
  );
  return !!(r && "shadowRoot" in r && gt.shadowRoot(r) === e);
}
function Sn(e) {
  return Object.prototype.toString.call(e) === "[object ShadowRoot]";
}
function Oh(e) {
  return e.includes(" background-clip: text;") && !e.includes(" -webkit-background-clip: text;") && (e = e.replace(/\sbackground-clip:\s*text;/g, " -webkit-background-clip: text; background-clip: text;")), e;
}
function Ah(e) {
  var r = e.cssText;
  if (r.split('"').length < 3) return r;
  var i = [
    "@import",
    "url(" + JSON.stringify(e.href) + ")"
  ];
  return e.layerName === "" ? i.push("layer") : e.layerName && i.push("layer(" + e.layerName + ")"), e.supportsText && i.push("supports(" + e.supportsText + ")"), e.media.length && i.push(e.media.mediaText), i.join(" ") + ";";
}
function po(e) {
  try {
    var r = e.rules || e.cssRules;
    if (!r)
      return null;
    var i = e.href;
    !i && e.ownerNode && e.ownerNode.ownerDocument && (i = e.ownerNode.ownerDocument.location.href);
    var t = Array.from(r, function(n) {
      return zl(n, i);
    }).join("");
    return Oh(t);
  } catch {
    return null;
  }
}
function zl(e, r) {
  if (Th(e)) {
    var i;
    try {
      i = // we can access the imported stylesheet rules directly
      po(e.styleSheet) || // work around browser issues with the raw string `@import url(...)` statement
      Ah(e);
    } catch {
      i = e.cssText;
    }
    return e.styleSheet.href ? ji(i, e.styleSheet.href) : i;
  } else {
    var t = e.cssText;
    return Nh(e) && e.selectorText.includes(":") && (t = Rh(t)), r ? ji(t, r) : t;
  }
}
function Rh(e) {
  var r = /(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm;
  return e.replace(r, "$1\\$2");
}
function Th(e) {
  return "styleSheet" in e;
}
function Nh(e) {
  return "selectorText" in e;
}
var Gl = /* @__PURE__ */ (function() {
  function e() {
    fc(this, "idNodeMap", /* @__PURE__ */ new Map()), fc(this, "nodeMetaMap", /* @__PURE__ */ new WeakMap());
  }
  var r = e.prototype;
  return r.getId = function(t) {
    var n;
    if (!t) return -1;
    var s = (n = this.getMeta(t)) == null ? void 0 : n.id;
    return s ?? -1;
  }, r.getNode = function(t) {
    return this.idNodeMap.get(t) || null;
  }, r.getIds = function() {
    return Array.from(this.idNodeMap.keys());
  }, r.getMeta = function(t) {
    return this.nodeMetaMap.get(t) || null;
  }, r.removeNodeFromMap = function(t) {
    var n = this, s = this.getId(t);
    this.idNodeMap.delete(s), t.childNodes && t.childNodes.forEach(function(o) {
      return n.removeNodeFromMap(o);
    });
  }, r.has = function(t) {
    return this.idNodeMap.has(t);
  }, r.hasNode = function(t) {
    return this.nodeMetaMap.has(t);
  }, r.add = function(t, n) {
    var s = n.id;
    this.idNodeMap.set(s, t), this.nodeMetaMap.set(t, n);
  }, r.replace = function(t, n) {
    var s = this.getNode(t);
    if (s) {
      var o = this.nodeMetaMap.get(s);
      o && this.nodeMetaMap.set(n, o);
    }
    this.idNodeMap.set(t, n);
  }, r.reset = function() {
    this.idNodeMap = /* @__PURE__ */ new Map(), this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
  }, e;
})();
function Mh() {
  return new Gl();
}
function Di(e) {
  var r = e.element, i = e.maskInputOptions, t = e.tagName, n = e.type, s = e.value, o = e.maskInputFn, a = s || "", c = n && Or(n);
  return (i[t.toLowerCase()] || c && i[c]) && (o ? a = o(a, r) : a = "*".repeat(a.length)), a;
}
function Or(e) {
  return e.toLowerCase();
}
var pc = "__rrweb_original__";
function Ph(e) {
  var r = e.getContext("2d");
  if (!r) return !0;
  for (var i = 50, t = 0; t < e.width; t += i)
    for (var n = 0; n < e.height; n += i) {
      var s = r.getImageData, o = pc in s ? s[pc] : s, a = new Uint32Array(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        o.call(r, t, n, Math.min(i, e.width - t), Math.min(i, e.height - n)).data.buffer
      );
      if (a.some(function(c) {
        return c !== 0;
      })) return !1;
    }
  return !0;
}
function Fi(e) {
  var r = e.type;
  return e.hasAttribute("data-rr-is-password") ? "password" : r ? (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    Or(r)
  ) : null;
}
function Vl(e, r) {
  var i;
  try {
    i = new URL(e, r ?? window.location.href);
  } catch {
    return null;
  }
  var t = /\.([0-9a-z]+)(?:$)/i, n = i.pathname.match(t), s;
  return (s = n == null ? void 0 : n[1]) != null ? s : null;
}
function Lh(e) {
  var r = "";
  return e.indexOf("//") > -1 ? r = e.split("/").slice(0, 3).join("/") : r = e.split("/")[0], r = r.split("?")[0], r;
}
var $h = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm, Dh = /^(?:[a-z+]+:)?\/\//i, Fh = /^www\..*/i, jh = /^(data:)([^,]*),(.*)/i;
function ji(e, r) {
  return (e || "").replace($h, function(i, t, n, s, o, a) {
    var c = n || o || a, l = t || s || "";
    if (!c)
      return i;
    if (Dh.test(c) || Fh.test(c) || jh.test(c))
      return "url(" + l + c + l + ")";
    if (c[0] === "/")
      return "url(" + l + (Lh(r) + c) + l + ")";
    var f = r.split("/"), u = c.split("/");
    f.pop();
    for (var d = W(u), v; !(v = d()).done; ) {
      var p = v.value;
      p !== "." && (p === ".." ? f.pop() : f.push(p));
    }
    return "url(" + l + f.join("/") + l + ")";
  });
}
function si(e, r) {
  return r === void 0 && (r = !1), r ? e.replace(/(\/\*[^*]*\*\/)|[\s;]/g, "") : e.replace(/(\/\*[^*]*\*\/)|[\s;]/g, "").replace(/0px/g, "0");
}
function Uh(e, r, i) {
  i === void 0 && (i = !1);
  var t = Array.from(r.childNodes), n = [], s = 0;
  if (t.length > 1 && e && typeof e == "string") {
    for (var o = si(e, i), a = o.length / e.length, c = 1; c < t.length; c++)
      if (t[c].textContent && typeof t[c].textContent == "string") {
        for (var l = si(t[c].textContent, i), f = 100, u = 3; u < l.length && // keep consuming css identifiers (to get a decent chunk more quickly)
        (l[u].match(/[a-zA-Z0-9]/) || // substring needs to be unique to this section
        l.indexOf(l.substring(0, u), 1) !== -1); u++)
          ;
        for (; u < l.length; u++) {
          var d = l.substring(0, u), v = o.split(d), p = -1;
          if (v.length === 2)
            p = v[0].length;
          else if (v.length > 2 && v[0] === "" && t[c - 1].textContent !== "")
            p = o.indexOf(d, 1);
          else if (v.length === 1) {
            if (d = d.substring(0, d.length - 1), v = o.split(d), v.length <= 1)
              return n.push(e), n;
            u = f + 1;
          } else u === l.length - 1 && (p = o.indexOf(d));
          if (v.length >= 2 && u > f) {
            var _ = t[c - 1].textContent;
            if (_ && typeof _ == "string") {
              var m = si(_).length;
              p = o.indexOf(d, m);
            }
            p === -1 && (p = v[0].length);
          }
          if (p !== -1) {
            for (var y = Math.floor(p / a); y > 0 && y < e.length; ) {
              if (s += 1, s > 50 * t.length)
                return n.push(e), n;
              var b = si(e.substring(0, y), i);
              if (b.length === p) {
                n.push(e.substring(0, y)), e = e.substring(y), o = o.substring(p);
                break;
              } else b.length < p ? y += Math.max(1, Math.floor((p - b.length) / a)) : y -= Math.max(1, Math.floor((b.length - p) * a));
            }
            break;
          }
        }
      }
  }
  return n.push(e), n;
}
function Bh(e, r) {
  return Uh(e, r).join("/* rr_split */");
}
var Wh = 1, zh = new RegExp("[^a-z0-9-_:]"), Pn = -2;
function ql() {
  return Wh++;
}
function Gh(e) {
  if (te(e, HTMLFormElement))
    return "form";
  var r = Or(e.tagName);
  return zh.test(r) ? "div" : r;
}
var Dr, vc, Vh = /^[^ \t\n\r\u000c]+/, qh = /^[, \t\n\r\u000c]+/;
function Hh(e, r) {
  if (r.trim() === "")
    return r;
  var i = 0;
  function t(l) {
    var f, u = l.exec(r.substring(i));
    return u ? (f = u[0], i += f.length, f) : "";
  }
  for (var n = []; t(qh), !(i >= r.length); ) {
    var s = t(Vh);
    if (s.slice(-1) === ",")
      s = Wr(e, s.substring(0, s.length - 1)), n.push(s);
    else {
      var o = "";
      s = Wr(e, s);
      for (var a = !1; ; ) {
        var c = r.charAt(i);
        if (c === "") {
          n.push((s + o).trim());
          break;
        } else if (a)
          c === ")" && (a = !1);
        else if (c === ",") {
          i += 1, n.push((s + o).trim());
          break;
        } else c === "(" && (a = !0);
        o += c, i += 1;
      }
    }
  }
  return n.join(", ");
}
var gc = /* @__PURE__ */ new WeakMap();
function Wr(e, r) {
  return !r || r.trim() === "" ? r : fa(e, r);
}
function Yh(e) {
  return !!(e.tagName === "svg" || e.ownerSVGElement);
}
function fa(e, r) {
  var i = gc.get(e);
  if (i || (i = e.createElement("a"), gc.set(e, i)), !r)
    r = "";
  else if (r.startsWith("blob:") || r.startsWith("data:"))
    return r;
  return i.setAttribute("href", r), i.href;
}
function Hl(e, r, i, t) {
  return t && (i === "src" || i === "href" && !(r === "use" && t[0] === "#") || i === "xlink:href" && t[0] !== "#" || i === "background" && (r === "table" || r === "td" || r === "th") ? Wr(e, t) : i === "srcset" ? Hh(e, t) : i === "style" ? ji(t, fa(e)) : r === "object" && i === "data" ? Wr(e, t) : t);
}
function Yl(e, r, i) {
  return (e === "video" || e === "audio") && r === "autoplay";
}
function Kh(e, r, i) {
  try {
    if (typeof r == "string") {
      if (e.classList.contains(r))
        return !0;
    } else
      for (var t = e.classList.length; t--; ) {
        var n = e.classList[t];
        if (r.test(n))
          return !0;
      }
    if (i)
      return e.matches(i);
  } catch {
  }
  return !1;
}
function Ui(e, r, i) {
  if (!e) return !1;
  if (e.nodeType !== e.ELEMENT_NODE)
    return i ? Ui(gt.parentNode(e), r, i) : !1;
  for (var t = e.classList.length; t--; ) {
    var n = e.classList[t];
    if (r.test(n))
      return !0;
  }
  return i ? Ui(gt.parentNode(e), r, i) : !1;
}
function Kl(e, r, i, t) {
  var n;
  if (Wl(e)) {
    if (n = e, !gt.childNodes(n).length)
      return !1;
  } else {
    if (gt.parentElement(e) === null)
      return !1;
    n = gt.parentElement(e);
  }
  try {
    if (typeof r == "string") {
      if (t) {
        if (n.closest("." + r)) return !0;
      } else if (n.classList.contains(r)) return !0;
    } else if (Ui(n, r, t)) return !0;
    if (i) {
      if (t) {
        if (n.closest(i)) return !0;
      } else if (n.matches(i)) return !0;
    }
  } catch {
  }
  return !1;
}
function Jh(e, r, i) {
  var t = e.contentWindow;
  if (t) {
    var n = !1, s;
    try {
      s = t.document.readyState;
    } catch {
      return;
    }
    if (s !== "complete") {
      var o = setTimeout(function() {
        n || (r(), n = !0);
      }, i);
      e.addEventListener("load", function() {
        clearTimeout(o), n = !0, r();
      });
      return;
    }
    var a = "about:blank";
    if (t.location.href !== a || e.src === a || e.src === "")
      return setTimeout(r, 0), e.addEventListener("load", r);
    e.addEventListener("load", r);
  }
}
function Xh(e, r, i) {
  var t = !1, n;
  try {
    n = e.sheet;
  } catch {
    return;
  }
  if (!n) {
    var s = setTimeout(function() {
      t || (r(), t = !0);
    }, i);
    e.addEventListener("load", function() {
      clearTimeout(s), t = !0, r();
    });
  }
}
function Zh(e, r) {
  var i = r.doc, t = r.mirror, n = r.blockClass, s = r.blockSelector, o = r.needsMask, a = r.inlineStylesheet, c = r.maskInputOptions, l = c === void 0 ? {} : c, f = r.maskTextFn, u = r.maskInputFn, d = r.dataURLOptions, v = d === void 0 ? {} : d, p = r.inlineImages, _ = r.recordCanvas, m = r.keepIframeSrcFn, y = r.newlyAddedElement, b = y === void 0 ? !1 : y, S = r.cssCaptured, E = S === void 0 ? !1 : S, C = Qh(i, t);
  switch (e.nodeType) {
    case e.DOCUMENT_NODE:
      return e.compatMode !== "CSS1Compat" ? {
        type: it.Document,
        childNodes: [],
        compatMode: e.compatMode
      } : {
        type: it.Document,
        childNodes: []
      };
    case e.DOCUMENT_TYPE_NODE:
      return {
        type: it.DocumentType,
        name: e.name,
        publicId: e.publicId,
        systemId: e.systemId,
        rootId: C
      };
    case e.ELEMENT_NODE:
      return tp(e, {
        doc: i,
        blockClass: n,
        blockSelector: s,
        inlineStylesheet: a,
        maskInputOptions: l,
        maskInputFn: u,
        dataURLOptions: v,
        inlineImages: p,
        recordCanvas: _,
        keepIframeSrcFn: m,
        newlyAddedElement: b,
        rootId: C
      });
    case e.TEXT_NODE:
      return ep(e, {
        doc: i,
        needsMask: o,
        maskTextFn: f,
        rootId: C,
        cssCaptured: E
      });
    case e.CDATA_SECTION_NODE:
      return {
        type: it.CDATA,
        textContent: "",
        rootId: C
      };
    case e.COMMENT_NODE:
      return {
        type: it.Comment,
        textContent: gt.textContent(e) || "",
        rootId: C
      };
    default:
      return !1;
  }
}
function Qh(e, r) {
  if (r.hasNode(e)) {
    var i = r.getId(e);
    return i === 1 ? void 0 : i;
  }
}
function ep(e, r) {
  var i = r.needsMask, t = r.maskTextFn, n = r.rootId, s = r.cssCaptured, o = gt.parentNode(e), a = o && o.tagName, c = "", l = a === "STYLE" ? !0 : void 0, f = a === "SCRIPT" ? !0 : void 0;
  return f ? c = "SCRIPT_PLACEHOLDER" : s || (c = gt.textContent(e), l && c && (c = ji(c, fa(r.doc)))), !l && !f && c && i && (c = t ? t(c, gt.parentElement(e)) : c.replace(/[\S]/g, "*")), {
    type: it.Text,
    textContent: c || "",
    rootId: n
  };
}
function tp(e, r) {
  for (var i = r.doc, t = r.blockClass, n = r.blockSelector, s = r.inlineStylesheet, o = r.maskInputOptions, a = o === void 0 ? {} : o, c = r.maskInputFn, l = r.dataURLOptions, f = l === void 0 ? {} : l, u = r.inlineImages, d = r.recordCanvas, v = r.keepIframeSrcFn, p = r.newlyAddedElement, _ = p === void 0 ? !1 : p, m = r.rootId, y = Kh(e, t, n), b = Gh(e), S = {}, E = e.attributes.length, C = 0; C < E; C++) {
    var A = e.attributes[C];
    Yl(b, A.name, A.value) || (S[A.name] = Hl(i, b, Or(A.name), A.value));
  }
  if (b === "link" && s) {
    var I = Array.from(i.styleSheets).find(function(Se) {
      return Se.href === e.href;
    }), M = null;
    I && (M = po(I)), M && (delete S.rel, delete S.href, S._cssText = M);
  }
  if (b === "style" && e.sheet) {
    var D = po(e.sheet);
    D && (e.childNodes.length > 1 && (D = Bh(D, e)), S._cssText = D);
  }
  if (b === "input" || b === "textarea" || b === "select") {
    var L = e.value, j = e.checked;
    S.type !== "radio" && S.type !== "checkbox" && S.type !== "submit" && S.type !== "button" && L ? S.value = Di({
      element: e,
      type: Fi(e),
      tagName: b,
      value: L,
      maskInputOptions: a,
      maskInputFn: c
    }) : j && (S.checked = j);
  }
  if (b === "option" && (e.selected && !a.select ? S.selected = !0 : delete S.selected), b === "dialog" && e.open && (S.rr_open_mode = e.matches("dialog:modal") ? "modal" : "non-modal"), b === "canvas" && d) {
    if (e.__context === "2d")
      Ph(e) || (S.rr_dataURL = e.toDataURL(f.type, f.quality));
    else if (!("__context" in e)) {
      var k = e.toDataURL(f.type, f.quality), P = i.createElement("canvas");
      P.width = e.width, P.height = e.height;
      var G = P.toDataURL(f.type, f.quality);
      k !== G && (S.rr_dataURL = k);
    }
  }
  if (b === "img" && u) {
    Dr || (Dr = i.createElement("canvas"), vc = Dr.getContext("2d"));
    var F = e, ae = F.currentSrc || F.getAttribute("src") || "<unknown-src>", ue = F.crossOrigin, K = function() {
      F.removeEventListener("load", K);
      try {
        Dr.width = F.naturalWidth, Dr.height = F.naturalHeight, vc.drawImage(F, 0, 0), S.rr_dataURL = Dr.toDataURL(f.type, f.quality);
      } catch (Se) {
        if (F.crossOrigin !== "anonymous") {
          F.crossOrigin = "anonymous", F.complete && F.naturalWidth !== 0 ? K() : F.addEventListener("load", K);
          return;
        } else
          console.warn("Cannot inline img src=" + ae + "! Error: " + Se);
      }
      F.crossOrigin === "anonymous" && (ue ? S.crossOrigin = ue : F.removeAttribute("crossorigin"));
    };
    F.complete && F.naturalWidth !== 0 ? K() : F.addEventListener("load", K);
  }
  if (b === "audio" || b === "video") {
    var oe = S;
    oe.rr_mediaState = e.paused ? "paused" : "played", oe.rr_mediaCurrentTime = e.currentTime, oe.rr_mediaPlaybackRate = e.playbackRate, oe.rr_mediaMuted = e.muted, oe.rr_mediaLoop = e.loop, oe.rr_mediaVolume = e.volume;
  }
  if (_ || (e.scrollLeft && (S.rr_scrollLeft = e.scrollLeft), e.scrollTop && (S.rr_scrollTop = e.scrollTop)), y) {
    var re = e.getBoundingClientRect(), Me = re.width, Oe = re.height;
    S = {
      class: S.class,
      rr_width: "" + Me + "px",
      rr_height: "" + Oe + "px"
    };
  }
  b === "iframe" && !v(S.src) && (e.contentDocument || (S.rr_src = S.src), delete S.src);
  var Pe;
  try {
    customElements.get(b) && (Pe = !0);
  } catch {
  }
  return {
    type: it.Element,
    tagName: b,
    attributes: S,
    childNodes: [],
    isSVG: Yh(e) || void 0,
    needBlock: y,
    rootId: m,
    isCustom: Pe
  };
}
function Te(e) {
  return e == null ? "" : e.toLowerCase();
}
function rp(e, r) {
  if (r.comment && e.type === it.Comment)
    return !0;
  if (e.type === it.Element) {
    if (r.script && // script tag
    (e.tagName === "script" || // (module)preload link
    e.tagName === "link" && (e.attributes.rel === "preload" && e.attributes.as === "script" || e.attributes.rel === "modulepreload") || // prefetch link
    e.tagName === "link" && e.attributes.rel === "prefetch" && typeof e.attributes.href == "string" && Vl(e.attributes.href) === "js"))
      return !0;
    if (r.headFavicon && (e.tagName === "link" && e.attributes.rel === "shortcut icon" || e.tagName === "meta" && (Te(e.attributes.name).match(/^msapplication-tile(image|color)$/) || Te(e.attributes.name) === "application-name" || Te(e.attributes.rel) === "icon" || Te(e.attributes.rel) === "apple-touch-icon" || Te(e.attributes.rel) === "shortcut icon")))
      return !0;
    if (e.tagName === "meta") {
      if (r.headMetaDescKeywords && Te(e.attributes.name).match(/^description|keywords$/))
        return !0;
      if (r.headMetaSocial && (Te(e.attributes.property).match(/^(og|twitter|fb):/) || // og = opengraph (facebook)
      Te(e.attributes.name).match(/^(og|twitter):/) || Te(e.attributes.name) === "pinterest"))
        return !0;
      if (r.headMetaRobots && (Te(e.attributes.name) === "robots" || Te(e.attributes.name) === "googlebot" || Te(e.attributes.name) === "bingbot"))
        return !0;
      if (r.headMetaHttpEquiv && e.attributes["http-equiv"] !== void 0)
        return !0;
      if (r.headMetaAuthorship && (Te(e.attributes.name) === "author" || Te(e.attributes.name) === "generator" || Te(e.attributes.name) === "framework" || Te(e.attributes.name) === "publisher" || Te(e.attributes.name) === "progid" || Te(e.attributes.property).match(/^article:/) || Te(e.attributes.property).match(/^product:/)))
        return !0;
      if (r.headMetaVerification && (Te(e.attributes.name) === "google-site-verification" || Te(e.attributes.name) === "yandex-verification" || Te(e.attributes.name) === "csrf-token" || Te(e.attributes.name) === "p:domain_verify" || Te(e.attributes.name) === "verify-v1" || Te(e.attributes.name) === "verification" || Te(e.attributes.name) === "shopify-checkout-api-token"))
        return !0;
    }
  }
  return !1;
}
function zr(e, r) {
  var i = r.doc, t = r.mirror, n = r.blockClass, s = r.blockSelector, o = r.maskTextClass, a = r.maskTextSelector, c = r.skipChild, l = c === void 0 ? !1 : c, f = r.inlineStylesheet, u = f === void 0 ? !0 : f, d = r.maskInputOptions, v = d === void 0 ? {} : d, p = r.maskTextFn, _ = r.maskInputFn, m = r.slimDOMOptions, y = r.dataURLOptions, b = y === void 0 ? {} : y, S = r.inlineImages, E = S === void 0 ? !1 : S, C = r.recordCanvas, A = C === void 0 ? !1 : C, I = r.onSerialize, M = r.onIframeLoad, D = r.iframeLoadTimeout, L = D === void 0 ? 5e3 : D, j = r.onStylesheetLoad, k = r.stylesheetLoadTimeout, P = k === void 0 ? 5e3 : k, G = r.keepIframeSrcFn, F = G === void 0 ? function() {
    return !1;
  } : G, ae = r.newlyAddedElement, ue = ae === void 0 ? !1 : ae, K = r.cssCaptured, oe = K === void 0 ? !1 : K, re = r.needsMask, Me = r.preserveWhiteSpace, Oe = Me === void 0 ? !0 : Me;
  if (!re) {
    var Pe = re === void 0;
    re = Kl(e, o, a, Pe);
  }
  var Se = Zh(e, {
    doc: i,
    mirror: t,
    blockClass: n,
    blockSelector: s,
    needsMask: re,
    inlineStylesheet: u,
    maskInputOptions: v,
    maskTextFn: p,
    maskInputFn: _,
    dataURLOptions: b,
    inlineImages: E,
    recordCanvas: A,
    keepIframeSrcFn: F,
    newlyAddedElement: ue,
    cssCaptured: oe
  });
  if (!Se)
    return console.warn(e, "not serialized"), null;
  var We;
  t.hasNode(e) ? We = t.getId(e) : rp(Se, m) || !Oe && Se.type === it.Text && !Se.textContent.replace(/^\s+|\s+$/gm, "").length ? We = Pn : We = ql();
  var X = Object.assign(Se, {
    id: We
  });
  if (t.add(e, X), We === Pn)
    return null;
  I && I(e);
  var qe = !l;
  if (X.type === it.Element) {
    qe = qe && !X.needBlock, delete X.needBlock;
    var Ge = gt.shadowRoot(e);
    Ge && Sn(Ge) && (X.isShadowHost = !0);
  }
  if ((X.type === it.Document || X.type === it.Element) && qe) {
    m.headWhitespace && X.type === it.Element && X.tagName === "head" && (Oe = !1);
    var He = {
      doc: i,
      mirror: t,
      blockClass: n,
      blockSelector: s,
      needsMask: re,
      maskTextClass: o,
      maskTextSelector: a,
      skipChild: l,
      inlineStylesheet: u,
      maskInputOptions: v,
      maskTextFn: p,
      maskInputFn: _,
      slimDOMOptions: m,
      dataURLOptions: b,
      inlineImages: E,
      recordCanvas: A,
      preserveWhiteSpace: Oe,
      onSerialize: I,
      onIframeLoad: M,
      iframeLoadTimeout: L,
      onStylesheetLoad: j,
      stylesheetLoadTimeout: P,
      keepIframeSrcFn: F,
      cssCaptured: !1
    };
    if (!(X.type === it.Element && X.tagName === "textarea" && X.attributes.value !== void 0)) {
      X.type === it.Element && X.attributes._cssText !== void 0 && typeof X.attributes._cssText == "string" && (He.cssCaptured = !0);
      for (var Ye = W(Array.from(gt.childNodes(e))), ot; !(ot = Ye()).done; ) {
        var at = ot.value, O = zr(at, He);
        O && X.childNodes.push(O);
      }
    }
    var U = null;
    if (Wl(e) && (U = gt.shadowRoot(e)))
      for (var V = W(Array.from(gt.childNodes(U))), H; !(H = V()).done; ) {
        var R = H.value, Y = zr(R, He);
        Y && (Sn(U) && (Y.isShadow = !0), X.childNodes.push(Y));
      }
  }
  var Z = gt.parentNode(e);
  return Z && wn(Z) && Sn(Z) && (X.isShadow = !0), X.type === it.Element && X.tagName === "iframe" && Jh(e, function() {
    var J = e.contentDocument;
    if (J && M) {
      var ze = zr(J, {
        doc: J,
        mirror: t,
        blockClass: n,
        blockSelector: s,
        needsMask: re,
        maskTextClass: o,
        maskTextSelector: a,
        skipChild: !1,
        inlineStylesheet: u,
        maskInputOptions: v,
        maskTextFn: p,
        maskInputFn: _,
        slimDOMOptions: m,
        dataURLOptions: b,
        inlineImages: E,
        recordCanvas: A,
        preserveWhiteSpace: Oe,
        onSerialize: I,
        onIframeLoad: M,
        iframeLoadTimeout: L,
        onStylesheetLoad: j,
        stylesheetLoadTimeout: P,
        keepIframeSrcFn: F
      });
      ze && M(e, ze);
    }
  }, L), X.type === it.Element && X.tagName === "link" && typeof X.attributes.rel == "string" && (X.attributes.rel === "stylesheet" || X.attributes.rel === "preload" && typeof X.attributes.href == "string" && Vl(X.attributes.href) === "css") && Xh(e, function() {
    if (j) {
      var J = zr(e, {
        doc: i,
        mirror: t,
        blockClass: n,
        blockSelector: s,
        needsMask: re,
        maskTextClass: o,
        maskTextSelector: a,
        skipChild: !1,
        inlineStylesheet: u,
        maskInputOptions: v,
        maskTextFn: p,
        maskInputFn: _,
        slimDOMOptions: m,
        dataURLOptions: b,
        inlineImages: E,
        recordCanvas: A,
        preserveWhiteSpace: Oe,
        onSerialize: I,
        onIframeLoad: M,
        iframeLoadTimeout: L,
        onStylesheetLoad: j,
        stylesheetLoadTimeout: P,
        keepIframeSrcFn: F
      });
      J && j(e, J);
    }
  }, P), X;
}
function np(e, r) {
  var i = r || {}, t = i.mirror, n = t === void 0 ? new Gl() : t, s = i.blockClass, o = s === void 0 ? "rr-block" : s, a = i.blockSelector, c = a === void 0 ? null : a, l = i.maskTextClass, f = l === void 0 ? "rr-mask" : l, u = i.maskTextSelector, d = u === void 0 ? null : u, v = i.inlineStylesheet, p = v === void 0 ? !0 : v, _ = i.inlineImages, m = _ === void 0 ? !1 : _, y = i.recordCanvas, b = y === void 0 ? !1 : y, S = i.maskAllInputs, E = S === void 0 ? !1 : S, C = i.maskTextFn, A = i.maskInputFn, I = i.slimDOM, M = I === void 0 ? !1 : I, D = i.dataURLOptions, L = i.preserveWhiteSpace, j = i.onSerialize, k = i.onIframeLoad, P = i.iframeLoadTimeout, G = i.onStylesheetLoad, F = i.stylesheetLoadTimeout, ae = i.keepIframeSrcFn, ue = ae === void 0 ? function() {
    return !1;
  } : ae, K = E === !0 ? {
    color: !0,
    date: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
    textarea: !0,
    select: !0,
    password: !0,
    hidden: !0
  } : E === !1 ? {
    password: !0
  } : E, oe = M === !0 || M === "all" ? (
    // if true: set of sensible options that should not throw away any information
    {
      script: !0,
      comment: !0,
      headFavicon: !0,
      headWhitespace: !0,
      headMetaDescKeywords: M === "all",
      // destructive
      headMetaSocial: !0,
      headMetaRobots: !0,
      headMetaHttpEquiv: !0,
      headMetaAuthorship: !0,
      headMetaVerification: !0
    }
  ) : M === !1 ? {} : M;
  return zr(e, {
    doc: e,
    mirror: n,
    blockClass: o,
    blockSelector: c,
    maskTextClass: f,
    maskTextSelector: d,
    skipChild: !1,
    inlineStylesheet: p,
    maskInputOptions: K,
    maskTextFn: C,
    maskInputFn: A,
    slimDOMOptions: oe,
    dataURLOptions: D,
    inlineImages: m,
    recordCanvas: b,
    preserveWhiteSpace: L,
    onSerialize: j,
    onIframeLoad: k,
    iframeLoadTimeout: P,
    onStylesheetLoad: G,
    stylesheetLoadTimeout: F,
    keepIframeSrcFn: ue,
    newlyAddedElement: !1
  });
}
function ip(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function sp(e) {
  if (e.__esModule) return e;
  var r = e.default;
  if (typeof r == "function") {
    var i = function t() {
      return te(this, t) ? Reflect.construct(r, arguments, this.constructor) : r.apply(this, arguments);
    };
    i.prototype = r.prototype;
  } else i = {};
  return Object.defineProperty(i, "__esModule", {
    value: !0
  }), Object.keys(e).forEach(function(t) {
    var n = Object.getOwnPropertyDescriptor(e, t);
    Object.defineProperty(i, t, n.get ? n : {
      enumerable: !0,
      get: function() {
        return e[t];
      }
    });
  }), i;
}
var da = {
  exports: {}
}, $e = String, Jl = function() {
  return {
    isColorSupported: !1,
    reset: $e,
    bold: $e,
    dim: $e,
    italic: $e,
    underline: $e,
    inverse: $e,
    hidden: $e,
    strikethrough: $e,
    black: $e,
    red: $e,
    green: $e,
    yellow: $e,
    blue: $e,
    magenta: $e,
    cyan: $e,
    white: $e,
    gray: $e,
    bgBlack: $e,
    bgRed: $e,
    bgGreen: $e,
    bgYellow: $e,
    bgBlue: $e,
    bgMagenta: $e,
    bgCyan: $e,
    bgWhite: $e
  };
};
da.exports = Jl();
da.exports.createColors = Jl;
var op = da.exports, ap = {}, cp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ap
}, Symbol.toStringTag, {
  value: "Module"
})), Xe = /* @__PURE__ */ sp(cp), mc = op, yc = Xe, vo = /* @__PURE__ */ (function(e) {
  mt(r, e);
  function r(t, n, s, o, a, c) {
    var l;
    return l = e.call(this, t) || this, l.name = "CssSyntaxError", l.reason = t, a && (l.file = a), o && (l.source = o), c && (l.plugin = c), typeof n < "u" && typeof s < "u" && (typeof n == "number" ? (l.line = n, l.column = s) : (l.line = n.line, l.column = n.column, l.endLine = s.line, l.endColumn = s.column)), l.setMessage(), Error.captureStackTrace && Error.captureStackTrace(l, r), l;
  }
  var i = r.prototype;
  return i.setMessage = function() {
    this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", typeof this.line < "u" && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
  }, i.showSourceCode = function(n) {
    var s = this;
    if (!this.source) return "";
    var o = this.source;
    n == null && (n = mc.isColorSupported), yc && n && (o = yc(o));
    var a = o.split(/\r?\n/), c = Math.max(this.line - 3, 0), l = Math.min(this.line + 2, a.length), f = String(l).length, u, d;
    if (n) {
      var v = mc.createColors(!0), p = v.bold, _ = v.gray, m = v.red;
      u = function(y) {
        return p(m(y));
      }, d = function(y) {
        return _(y);
      };
    } else
      u = d = function(y) {
        return y;
      };
    return a.slice(c, l).map(function(y, b) {
      var S = c + 1 + b, E = " " + (" " + S).slice(-f) + " | ";
      if (S === s.line) {
        var C = d(E.replace(/\d/g, " ")) + y.slice(0, s.column - 1).replace(/[^\t]/g, " ");
        return u(">") + d(E) + y + `
 ` + C + u("^");
      }
      return " " + d(E) + y;
    }).join(`
`);
  }, i.toString = function() {
    var n = this.showSourceCode();
    return n && (n = `

` + n + `
`), this.name + ": " + this.message + n;
  }, r;
})($i(Error)), ha = vo;
vo.default = vo;
var yr = {};
yr.isClean = Symbol("isClean");
yr.my = Symbol("my");
var _c = {
  after: `
`,
  beforeClose: `
`,
  beforeComment: `
`,
  beforeDecl: `
`,
  beforeOpen: " ",
  beforeRule: `
`,
  colon: ": ",
  commentLeft: " ",
  commentRight: " ",
  emptyBody: "",
  indent: "    ",
  semicolon: !1
};
function lp(e) {
  return e[0].toUpperCase() + e.slice(1);
}
var go = /* @__PURE__ */ (function() {
  function e(i) {
    this.builder = i;
  }
  var r = e.prototype;
  return r.atrule = function(t, n) {
    var s = "@" + t.name, o = t.params ? this.rawValue(t, "params") : "";
    if (typeof t.raws.afterName < "u" ? s += t.raws.afterName : o && (s += " "), t.nodes)
      this.block(t, s + o);
    else {
      var a = (t.raws.between || "") + (n ? ";" : "");
      this.builder(s + o + a, t);
    }
  }, r.beforeAfter = function(t, n) {
    var s;
    t.type === "decl" ? s = this.raw(t, null, "beforeDecl") : t.type === "comment" ? s = this.raw(t, null, "beforeComment") : n === "before" ? s = this.raw(t, null, "beforeRule") : s = this.raw(t, null, "beforeClose");
    for (var o = t.parent, a = 0; o && o.type !== "root"; )
      a += 1, o = o.parent;
    if (s.includes(`
`)) {
      var c = this.raw(t, null, "indent");
      if (c.length)
        for (var l = 0; l < a; l++) s += c;
    }
    return s;
  }, r.block = function(t, n) {
    var s = this.raw(t, "between", "beforeOpen");
    this.builder(n + s + "{", t, "start");
    var o;
    t.nodes && t.nodes.length ? (this.body(t), o = this.raw(t, "after")) : o = this.raw(t, "after", "emptyBody"), o && this.builder(o), this.builder("}", t, "end");
  }, r.body = function(t) {
    for (var n = t.nodes.length - 1; n > 0 && t.nodes[n].type === "comment"; )
      n -= 1;
    for (var s = this.raw(t, "semicolon"), o = 0; o < t.nodes.length; o++) {
      var a = t.nodes[o], c = this.raw(a, "before");
      c && this.builder(c), this.stringify(a, n !== o || s);
    }
  }, r.comment = function(t) {
    var n = this.raw(t, "left", "commentLeft"), s = this.raw(t, "right", "commentRight");
    this.builder("/*" + n + t.text + s + "*/", t);
  }, r.decl = function(t, n) {
    var s = this.raw(t, "between", "colon"), o = t.prop + s + this.rawValue(t, "value");
    t.important && (o += t.raws.important || " !important"), n && (o += ";"), this.builder(o, t);
  }, r.document = function(t) {
    this.body(t);
  }, r.raw = function(t, n, s) {
    var o;
    if (s || (s = n), n && (o = t.raws[n], typeof o < "u"))
      return o;
    var a = t.parent;
    if (s === "before" && (!a || a.type === "root" && a.first === t || a && a.type === "document"))
      return "";
    if (!a) return _c[s];
    var c = t.root();
    if (c.rawCache || (c.rawCache = {}), typeof c.rawCache[s] < "u")
      return c.rawCache[s];
    if (s === "before" || s === "after")
      return this.beforeAfter(t, s);
    var l = "raw" + lp(s);
    return this[l] ? o = this[l](c, t) : c.walk(function(f) {
      if (o = f.raws[n], typeof o < "u") return !1;
    }), typeof o > "u" && (o = _c[s]), c.rawCache[s] = o, o;
  }, r.rawBeforeClose = function(t) {
    var n;
    return t.walk(function(s) {
      if (s.nodes && s.nodes.length > 0 && typeof s.raws.after < "u")
        return n = s.raws.after, n.includes(`
`) && (n = n.replace(/[^\n]+$/, "")), !1;
    }), n && (n = n.replace(/\S/g, "")), n;
  }, r.rawBeforeComment = function(t, n) {
    var s;
    return t.walkComments(function(o) {
      if (typeof o.raws.before < "u")
        return s = o.raws.before, s.includes(`
`) && (s = s.replace(/[^\n]+$/, "")), !1;
    }), typeof s > "u" ? s = this.raw(n, null, "beforeDecl") : s && (s = s.replace(/\S/g, "")), s;
  }, r.rawBeforeDecl = function(t, n) {
    var s;
    return t.walkDecls(function(o) {
      if (typeof o.raws.before < "u")
        return s = o.raws.before, s.includes(`
`) && (s = s.replace(/[^\n]+$/, "")), !1;
    }), typeof s > "u" ? s = this.raw(n, null, "beforeRule") : s && (s = s.replace(/\S/g, "")), s;
  }, r.rawBeforeOpen = function(t) {
    var n;
    return t.walk(function(s) {
      if (s.type !== "decl" && (n = s.raws.between, typeof n < "u"))
        return !1;
    }), n;
  }, r.rawBeforeRule = function(t) {
    var n;
    return t.walk(function(s) {
      if (s.nodes && (s.parent !== t || t.first !== s) && typeof s.raws.before < "u")
        return n = s.raws.before, n.includes(`
`) && (n = n.replace(/[^\n]+$/, "")), !1;
    }), n && (n = n.replace(/\S/g, "")), n;
  }, r.rawColon = function(t) {
    var n;
    return t.walkDecls(function(s) {
      if (typeof s.raws.between < "u")
        return n = s.raws.between.replace(/[^\s:]/g, ""), !1;
    }), n;
  }, r.rawEmptyBody = function(t) {
    var n;
    return t.walk(function(s) {
      if (s.nodes && s.nodes.length === 0 && (n = s.raws.after, typeof n < "u"))
        return !1;
    }), n;
  }, r.rawIndent = function(t) {
    if (t.raws.indent) return t.raws.indent;
    var n;
    return t.walk(function(s) {
      var o = s.parent;
      if (o && o !== t && o.parent && o.parent === t && typeof s.raws.before < "u") {
        var a = s.raws.before.split(`
`);
        return n = a[a.length - 1], n = n.replace(/\S/g, ""), !1;
      }
    }), n;
  }, r.rawSemicolon = function(t) {
    var n;
    return t.walk(function(s) {
      if (s.nodes && s.nodes.length && s.last.type === "decl" && (n = s.raws.semicolon, typeof n < "u"))
        return !1;
    }), n;
  }, r.rawValue = function(t, n) {
    var s = t[n], o = t.raws[n];
    return o && o.value === s ? o.raw : s;
  }, r.root = function(t) {
    this.body(t), t.raws.after && this.builder(t.raws.after);
  }, r.rule = function(t) {
    this.block(t, this.rawValue(t, "selector")), t.raws.ownSemicolon && this.builder(t.raws.ownSemicolon, t, "end");
  }, r.stringify = function(t, n) {
    if (!this[t.type])
      throw new Error("Unknown AST node type " + t.type + ". Maybe you need to change PostCSS stringifier.");
    this[t.type](t, n);
  }, e;
})(), Xl = go;
go.default = go;
var up = Xl;
function mo(e, r) {
  var i = new up(r);
  i.stringify(e);
}
var us = mo;
mo.default = mo;
var oi = yr.isClean, fp = yr.my, dp = ha, hp = Xl, pp = us;
function yo(e, r) {
  var i = new e.constructor();
  for (var t in e)
    if (Object.prototype.hasOwnProperty.call(e, t) && t !== "proxyCache") {
      var n = e[t], s = typeof n > "u" ? "undefined" : ce(n);
      t === "parent" && s === "object" ? r && (i[t] = r) : t === "source" ? i[t] = n : Array.isArray(n) ? i[t] = n.map(function(o) {
        return yo(o, i);
      }) : (s === "object" && n !== null && (n = yo(n)), i[t] = n);
    }
  return i;
}
var _o = /* @__PURE__ */ (function() {
  function e(i) {
    i === void 0 && (i = {}), this.raws = {}, this[oi] = !1, this[fp] = !0;
    for (var t in i)
      if (t === "nodes") {
        this.nodes = [];
        for (var n = W(i[t]), s; !(s = n()).done; ) {
          var o = s.value;
          typeof o.clone == "function" ? this.append(o.clone()) : this.append(o);
        }
      } else
        this[t] = i[t];
  }
  var r = e.prototype;
  return r.addToError = function(t) {
    if (t.postcssNode = this, t.stack && this.source && /\n\s{4}at /.test(t.stack)) {
      var n = this.source;
      t.stack = t.stack.replace(/\n\s{4}at /, "$&" + n.input.from + ":" + n.start.line + ":" + n.start.column + "$&");
    }
    return t;
  }, r.after = function(t) {
    return this.parent.insertAfter(this, t), this;
  }, r.assign = function(t) {
    t === void 0 && (t = {});
    for (var n in t)
      this[n] = t[n];
    return this;
  }, r.before = function(t) {
    return this.parent.insertBefore(this, t), this;
  }, r.cleanRaws = function(t) {
    delete this.raws.before, delete this.raws.after, t || delete this.raws.between;
  }, r.clone = function(t) {
    t === void 0 && (t = {});
    var n = yo(this);
    for (var s in t)
      n[s] = t[s];
    return n;
  }, r.cloneAfter = function(t) {
    t === void 0 && (t = {});
    var n = this.clone(t);
    return this.parent.insertAfter(this, n), n;
  }, r.cloneBefore = function(t) {
    t === void 0 && (t = {});
    var n = this.clone(t);
    return this.parent.insertBefore(this, n), n;
  }, r.error = function(t, n) {
    if (n === void 0 && (n = {}), this.source) {
      var s = this.rangeBy(n), o = s.end, a = s.start;
      return this.source.input.error(t, {
        column: a.column,
        line: a.line
      }, {
        column: o.column,
        line: o.line
      }, n);
    }
    return new dp(t);
  }, r.getProxyProcessor = function() {
    return {
      get: function(n, s) {
        return s === "proxyOf" ? n : s === "root" ? function() {
          return n.root().toProxy();
        } : n[s];
      },
      set: function(n, s, o) {
        return n[s] === o || (n[s] = o, (s === "prop" || s === "value" || s === "name" || s === "params" || s === "important" || /* c8 ignore next */
        s === "text") && n.markDirty()), !0;
      }
    };
  }, r.markDirty = function() {
    if (this[oi]) {
      this[oi] = !1;
      for (var t = this; t = t.parent; )
        t[oi] = !1;
    }
  }, r.next = function() {
    if (this.parent) {
      var t = this.parent.index(this);
      return this.parent.nodes[t + 1];
    }
  }, r.positionBy = function(t, n) {
    var s = this.source.start;
    if (t.index)
      s = this.positionInside(t.index, n);
    else if (t.word) {
      n = this.toString();
      var o = n.indexOf(t.word);
      o !== -1 && (s = this.positionInside(o, n));
    }
    return s;
  }, r.positionInside = function(t, n) {
    for (var s = n || this.toString(), o = this.source.start.column, a = this.source.start.line, c = 0; c < t; c++)
      s[c] === `
` ? (o = 1, a += 1) : o += 1;
    return {
      column: o,
      line: a
    };
  }, r.prev = function() {
    if (this.parent) {
      var t = this.parent.index(this);
      return this.parent.nodes[t - 1];
    }
  }, r.rangeBy = function(t) {
    var n = {
      column: this.source.start.column,
      line: this.source.start.line
    }, s = this.source.end ? {
      column: this.source.end.column + 1,
      line: this.source.end.line
    } : {
      column: n.column + 1,
      line: n.line
    };
    if (t.word) {
      var o = this.toString(), a = o.indexOf(t.word);
      a !== -1 && (n = this.positionInside(a, o), s = this.positionInside(a + t.word.length, o));
    } else
      t.start ? n = {
        column: t.start.column,
        line: t.start.line
      } : t.index && (n = this.positionInside(t.index)), t.end ? s = {
        column: t.end.column,
        line: t.end.line
      } : typeof t.endIndex == "number" ? s = this.positionInside(t.endIndex) : t.index && (s = this.positionInside(t.index + 1));
    return (s.line < n.line || s.line === n.line && s.column <= n.column) && (s = {
      column: n.column + 1,
      line: n.line
    }), {
      end: s,
      start: n
    };
  }, r.raw = function(t, n) {
    var s = new hp();
    return s.raw(this, t, n);
  }, r.remove = function() {
    return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
  }, r.replaceWith = function() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    if (this.parent) {
      for (var o = this, a = !1, c = W(n), l; !(l = c()).done; ) {
        var f = l.value;
        f === this ? a = !0 : a ? (this.parent.insertAfter(o, f), o = f) : this.parent.insertBefore(o, f);
      }
      a || this.remove();
    }
    return this;
  }, r.root = function() {
    for (var t = this; t.parent && t.parent.type !== "document"; )
      t = t.parent;
    return t;
  }, r.toJSON = function(t, n) {
    var s = {}, o = n == null;
    n = n || /* @__PURE__ */ new Map();
    var a = 0;
    for (var c in this)
      if (Object.prototype.hasOwnProperty.call(this, c) && !(c === "parent" || c === "proxyCache")) {
        var l = this[c];
        if (Array.isArray(l))
          s[c] = l.map(function(u) {
            return (typeof u > "u" ? "undefined" : ce(u)) === "object" && u.toJSON ? u.toJSON(null, n) : u;
          });
        else if ((typeof l > "u" ? "undefined" : ce(l)) === "object" && l.toJSON)
          s[c] = l.toJSON(null, n);
        else if (c === "source") {
          var f = n.get(l.input);
          f == null && (f = a, n.set(l.input, a), a++), s[c] = {
            end: l.end,
            inputId: f,
            start: l.start
          };
        } else
          s[c] = l;
      }
    return o && (s.inputs = [].concat(n.keys()).map(function(u) {
      return u.toJSON();
    })), s;
  }, r.toProxy = function() {
    return this.proxyCache || (this.proxyCache = new Proxy(this, this.getProxyProcessor())), this.proxyCache;
  }, r.toString = function(t) {
    t === void 0 && (t = pp), t.stringify && (t = t.stringify);
    var n = "";
    return t(this, function(s) {
      n += s;
    }), n;
  }, r.warn = function(t, n, s) {
    var o = {
      node: this
    };
    for (var a in s) o[a] = s[a];
    return t.warn(n, o);
  }, dt(e, [
    {
      key: "proxyOf",
      get: function() {
        return this;
      }
    }
  ]), e;
})(), fs = _o;
_o.default = _o;
var vp = fs, bo = /* @__PURE__ */ (function(e) {
  mt(r, e);
  function r(i) {
    var t;
    return i && typeof i.value < "u" && typeof i.value != "string" && (i = we({}, i, {
      value: String(i.value)
    })), t = e.call(this, i) || this, t.type = "decl", t;
  }
  return dt(r, [
    {
      key: "variable",
      get: function() {
        return this.prop.startsWith("--") || this.prop[0] === "$";
      }
    }
  ]), r;
})(vp), ds = bo;
bo.default = bo;
var gp = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", mp = function(e) {
  e === void 0 && (e = 21);
  for (var r = "", i = e; i--; )
    r += gp[Math.random() * 64 | 0];
  return r;
}, yp = {
  nanoid: mp
}, bc = Xe.SourceMapConsumer, wc = Xe.SourceMapGenerator, _p = Xe.existsSync, bp = Xe.readFileSync, Ms = Xe.dirname, wp = Xe.join;
function Sp(e) {
  return Buffer ? Buffer.from(e, "base64").toString() : window.atob(e);
}
var wo = /* @__PURE__ */ (function() {
  function e(i, t) {
    if (t.map !== !1) {
      this.loadAnnotation(i), this.inline = this.startWith(this.annotation, "data:");
      var n = t.map ? t.map.prev : void 0, s = this.loadMap(t.from, n);
      !this.mapFile && t.from && (this.mapFile = t.from), this.mapFile && (this.root = Ms(this.mapFile)), s && (this.text = s);
    }
  }
  var r = e.prototype;
  return r.consumer = function() {
    return this.consumerCache || (this.consumerCache = new bc(this.text)), this.consumerCache;
  }, r.decodeInline = function(t) {
    var n = /^data:application\/json;charset=utf-?8;base64,/, s = /^data:application\/json;base64,/, o = /^data:application\/json;charset=utf-?8,/, a = /^data:application\/json,/;
    if (o.test(t) || a.test(t))
      return decodeURIComponent(t.substr(RegExp.lastMatch.length));
    if (n.test(t) || s.test(t))
      return Sp(t.substr(RegExp.lastMatch.length));
    var c = t.match(/data:application\/json;([^,]+),/)[1];
    throw new Error("Unsupported source map encoding " + c);
  }, r.getAnnotationURL = function(t) {
    return t.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
  }, r.isMap = function(t) {
    return (typeof t > "u" ? "undefined" : ce(t)) !== "object" ? !1 : typeof t.mappings == "string" || typeof t._mappings == "string" || Array.isArray(t.sections);
  }, r.loadAnnotation = function(t) {
    var n = t.match(/\/\*\s*# sourceMappingURL=/gm);
    if (n) {
      var s = t.lastIndexOf(n.pop()), o = t.indexOf("*/", s);
      s > -1 && o > -1 && (this.annotation = this.getAnnotationURL(t.substring(s, o)));
    }
  }, r.loadFile = function(t) {
    if (this.root = Ms(t), _p(t))
      return this.mapFile = t, bp(t, "utf-8").toString().trim();
  }, r.loadMap = function(t, n) {
    if (n === !1) return !1;
    if (n) {
      if (typeof n == "string")
        return n;
      if (typeof n == "function") {
        var s = n(t);
        if (s) {
          var o = this.loadFile(s);
          if (!o)
            throw new Error("Unable to load previous source map: " + s.toString());
          return o;
        }
      } else {
        if (te(n, bc))
          return wc.fromSourceMap(n).toString();
        if (te(n, wc))
          return n.toString();
        if (this.isMap(n))
          return JSON.stringify(n);
        throw new Error("Unsupported previous source map format: " + n.toString());
      }
    } else {
      if (this.inline)
        return this.decodeInline(this.annotation);
      if (this.annotation) {
        var a = this.annotation;
        return t && (a = wp(Ms(t), a)), this.loadFile(a);
      }
    }
  }, r.startWith = function(t, n) {
    return t ? t.substr(0, n.length) === n : !1;
  }, r.withContent = function() {
    return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
  }, e;
})(), Zl = wo;
wo.default = wo;
var xp = Xe.SourceMapConsumer, Cp = Xe.SourceMapGenerator, Sc = Xe.fileURLToPath, ai = Xe.pathToFileURL, So = Xe.isAbsolute, xo = Xe.resolve, kp = yp.nanoid, Ps = Xe, xc = ha, Ep = Zl, Ls = Symbol("fromOffsetCache"), Ip = !!(xp && Cp), Cc = !!(xo && So), Bi = /* @__PURE__ */ (function() {
  function e(i, t) {
    if (t === void 0 && (t = {}), i === null || typeof i > "u" || (typeof i > "u" ? "undefined" : ce(i)) === "object" && !i.toString)
      throw new Error("PostCSS received " + i + " instead of CSS string");
    if (this.css = i.toString(), this.css[0] === "\uFEFF" || this.css[0] === "￾" ? (this.hasBOM = !0, this.css = this.css.slice(1)) : this.hasBOM = !1, t.from && (!Cc || /^\w+:\/\//.test(t.from) || So(t.from) ? this.file = t.from : this.file = xo(t.from)), Cc && Ip) {
      var n = new Ep(this.css, t);
      if (n.text) {
        this.map = n;
        var s = n.consumer().file;
        !this.file && s && (this.file = this.mapResolve(s));
      }
    }
    this.file || (this.id = "<input css " + kp(6) + ">"), this.map && (this.map.file = this.from);
  }
  var r = e.prototype;
  return r.error = function(t, n, s, o) {
    o === void 0 && (o = {});
    var a, c, l;
    if (n && (typeof n > "u" ? "undefined" : ce(n)) === "object") {
      var f = n, u = s;
      if (typeof f.offset == "number") {
        var d = this.fromOffset(f.offset);
        n = d.line, s = d.col;
      } else
        n = f.line, s = f.column;
      if (typeof u.offset == "number") {
        var v = this.fromOffset(u.offset);
        c = v.line, l = v.col;
      } else
        c = u.line, l = u.column;
    } else if (!s) {
      var p = this.fromOffset(n);
      n = p.line, s = p.col;
    }
    var _ = this.origin(n, s, c, l);
    return _ ? a = new xc(t, _.endLine === void 0 ? _.line : {
      column: _.column,
      line: _.line
    }, _.endLine === void 0 ? _.column : {
      column: _.endColumn,
      line: _.endLine
    }, _.source, _.file, o.plugin) : a = new xc(t, c === void 0 ? n : {
      column: s,
      line: n
    }, c === void 0 ? s : {
      column: l,
      line: c
    }, this.css, this.file, o.plugin), a.input = {
      column: s,
      endColumn: l,
      endLine: c,
      line: n,
      source: this.css
    }, this.file && (ai && (a.input.url = ai(this.file).toString()), a.input.file = this.file), a;
  }, r.fromOffset = function(t) {
    var n, s;
    if (this[Ls])
      s = this[Ls];
    else {
      var o = this.css.split(`
`);
      s = new Array(o.length);
      for (var a = 0, c = 0, l = o.length; c < l; c++)
        s[c] = a, a += o[c].length + 1;
      this[Ls] = s;
    }
    n = s[s.length - 1];
    var f = 0;
    if (t >= n)
      f = s.length - 1;
    else
      for (var u = s.length - 2, d; f < u; )
        if (d = f + (u - f >> 1), t < s[d])
          u = d - 1;
        else if (t >= s[d + 1])
          f = d + 1;
        else {
          f = d;
          break;
        }
    return {
      col: t - s[f] + 1,
      line: f + 1
    };
  }, r.mapResolve = function(t) {
    return /^\w+:\/\//.test(t) ? t : xo(this.map.consumer().sourceRoot || this.map.root || ".", t);
  }, r.origin = function(t, n, s, o) {
    if (!this.map) return !1;
    var a = this.map.consumer(), c = a.originalPositionFor({
      column: n,
      line: t
    });
    if (!c.source) return !1;
    var l;
    typeof s == "number" && (l = a.originalPositionFor({
      column: o,
      line: s
    }));
    var f;
    So(c.source) ? f = ai(c.source) : f = new URL(c.source, this.map.consumer().sourceRoot || ai(this.map.mapFile));
    var u = {
      column: c.column,
      endColumn: l && l.column,
      endLine: l && l.line,
      line: c.line,
      url: f.toString()
    };
    if (f.protocol === "file:")
      if (Sc)
        u.file = Sc(f);
      else
        throw new Error("file: protocol is not available in this PostCSS build");
    var d = a.sourceContentFor(c.source);
    return d && (u.source = d), u;
  }, r.toJSON = function() {
    for (var t = {}, n = 0, s = [
      "hasBOM",
      "css",
      "file",
      "id"
    ]; n < s.length; n++) {
      var o = s[n];
      this[o] != null && (t[o] = this[o]);
    }
    return this.map && (t.map = we({}, this.map), t.map.consumerCache && (t.map.consumerCache = void 0)), t;
  }, dt(e, [
    {
      key: "from",
      get: function() {
        return this.file || this.id;
      }
    }
  ]), e;
})(), hs = Bi;
Bi.default = Bi;
Ps && Ps.registerInput && Ps.registerInput(Bi);
var Ql = Xe.SourceMapConsumer, Ri = Xe.SourceMapGenerator, Ti = Xe.dirname, eu = Xe.relative, tu = Xe.resolve, ru = Xe.sep, kc = Xe.pathToFileURL, Op = hs, Ap = !!(Ql && Ri), Rp = !!(Ti && tu && eu && ru), Tp = /* @__PURE__ */ (function() {
  function e(i, t, n, s) {
    this.stringify = i, this.mapOpts = n.map || {}, this.root = t, this.opts = n, this.css = s, this.originalCSS = s, this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute, this.memoizedFileURLs = /* @__PURE__ */ new Map(), this.memoizedPaths = /* @__PURE__ */ new Map(), this.memoizedURLs = /* @__PURE__ */ new Map();
  }
  var r = e.prototype;
  return r.addAnnotation = function() {
    var t;
    this.isInline() ? t = "data:application/json;base64," + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == "string" ? t = this.mapOpts.annotation : typeof this.mapOpts.annotation == "function" ? t = this.mapOpts.annotation(this.opts.to, this.root) : t = this.outputFile() + ".map";
    var n = `
`;
    this.css.includes(`\r
`) && (n = `\r
`), this.css += n + "/*# sourceMappingURL=" + t + " */";
  }, r.applyPrevMaps = function() {
    for (var t = W(this.previous()), n; !(n = t()).done; ) {
      var s = n.value, o = this.toUrl(this.path(s.file)), a = s.root || Ti(s.file), c = void 0;
      this.mapOpts.sourcesContent === !1 ? (c = new Ql(s.text), c.sourcesContent && (c.sourcesContent = null)) : c = s.consumer(), this.map.applySourceMap(c, o, this.toUrl(this.path(a)));
    }
  }, r.clearAnnotation = function() {
    if (this.mapOpts.annotation !== !1)
      if (this.root)
        for (var t, n = this.root.nodes.length - 1; n >= 0; n--)
          t = this.root.nodes[n], t.type === "comment" && t.text.indexOf("# sourceMappingURL=") === 0 && this.root.removeChild(n);
      else this.css && (this.css = this.css.replace(/\n*?\/\*#[\S\s]*?\*\/$/gm, ""));
  }, r.generate = function() {
    if (this.clearAnnotation(), Rp && Ap && this.isMap())
      return this.generateMap();
    var t = "";
    return this.stringify(this.root, function(n) {
      t += n;
    }), [
      t
    ];
  }, r.generateMap = function() {
    if (this.root)
      this.generateString();
    else if (this.previous().length === 1) {
      var t = this.previous()[0].consumer();
      t.file = this.outputFile(), this.map = Ri.fromSourceMap(t, {
        ignoreInvalidMapping: !0
      });
    } else
      this.map = new Ri({
        file: this.outputFile(),
        ignoreInvalidMapping: !0
      }), this.map.addMapping({
        generated: {
          column: 0,
          line: 1
        },
        original: {
          column: 0,
          line: 1
        },
        source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
      });
    return this.isSourcesContent() && this.setSourcesContent(), this.root && this.previous().length > 0 && this.applyPrevMaps(), this.isAnnotation() && this.addAnnotation(), this.isInline() ? [
      this.css
    ] : [
      this.css,
      this.map
    ];
  }, r.generateString = function() {
    var t = this;
    this.css = "", this.map = new Ri({
      file: this.outputFile(),
      ignoreInvalidMapping: !0
    });
    var n = 1, s = 1, o = "<no source>", a = {
      generated: {
        column: 0,
        line: 0
      },
      original: {
        column: 0,
        line: 0
      },
      source: ""
    }, c, l;
    this.stringify(this.root, function(f, u, d) {
      if (t.css += f, u && d !== "end" && (a.generated.line = n, a.generated.column = s - 1, u.source && u.source.start ? (a.source = t.sourcePath(u), a.original.line = u.source.start.line, a.original.column = u.source.start.column - 1, t.map.addMapping(a)) : (a.source = o, a.original.line = 1, a.original.column = 0, t.map.addMapping(a))), c = f.match(/\n/g), c ? (n += c.length, l = f.lastIndexOf(`
`), s = f.length - l) : s += f.length, u && d !== "start") {
        var v = u.parent || {
          raws: {}
        }, p = u.type === "decl" || u.type === "atrule" && !u.nodes;
        (!p || u !== v.last || v.raws.semicolon) && (u.source && u.source.end ? (a.source = t.sourcePath(u), a.original.line = u.source.end.line, a.original.column = u.source.end.column - 1, a.generated.line = n, a.generated.column = s - 2, t.map.addMapping(a)) : (a.source = o, a.original.line = 1, a.original.column = 0, a.generated.line = n, a.generated.column = s - 1, t.map.addMapping(a)));
      }
    });
  }, r.isAnnotation = function() {
    return this.isInline() ? !0 : typeof this.mapOpts.annotation < "u" ? this.mapOpts.annotation : this.previous().length ? this.previous().some(function(t) {
      return t.annotation;
    }) : !0;
  }, r.isInline = function() {
    if (typeof this.mapOpts.inline < "u")
      return this.mapOpts.inline;
    var t = this.mapOpts.annotation;
    return typeof t < "u" && t !== !0 ? !1 : this.previous().length ? this.previous().some(function(n) {
      return n.inline;
    }) : !0;
  }, r.isMap = function() {
    return typeof this.opts.map < "u" ? !!this.opts.map : this.previous().length > 0;
  }, r.isSourcesContent = function() {
    return typeof this.mapOpts.sourcesContent < "u" ? this.mapOpts.sourcesContent : this.previous().length ? this.previous().some(function(t) {
      return t.withContent();
    }) : !0;
  }, r.outputFile = function() {
    return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
  }, r.path = function(t) {
    if (this.mapOpts.absolute || t.charCodeAt(0) === 60 || /^\w+:\/\//.test(t)) return t;
    var n = this.memoizedPaths.get(t);
    if (n) return n;
    var s = this.opts.to ? Ti(this.opts.to) : ".";
    typeof this.mapOpts.annotation == "string" && (s = Ti(tu(s, this.mapOpts.annotation)));
    var o = eu(s, t);
    return this.memoizedPaths.set(t, o), o;
  }, r.previous = function() {
    var t = this;
    if (!this.previousMaps)
      if (this.previousMaps = [], this.root)
        this.root.walk(function(s) {
          if (s.source && s.source.input.map) {
            var o = s.source.input.map;
            t.previousMaps.includes(o) || t.previousMaps.push(o);
          }
        });
      else {
        var n = new Op(this.originalCSS, this.opts);
        n.map && this.previousMaps.push(n.map);
      }
    return this.previousMaps;
  }, r.setSourcesContent = function() {
    var t = this, n = {};
    if (this.root)
      this.root.walk(function(o) {
        if (o.source) {
          var a = o.source.input.from;
          if (a && !n[a]) {
            n[a] = !0;
            var c = t.usesFileUrls ? t.toFileUrl(a) : t.toUrl(t.path(a));
            t.map.setSourceContent(c, o.source.input.css);
          }
        }
      });
    else if (this.css) {
      var s = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
      this.map.setSourceContent(s, this.css);
    }
  }, r.sourcePath = function(t) {
    return this.mapOpts.from ? this.toUrl(this.mapOpts.from) : this.usesFileUrls ? this.toFileUrl(t.source.input.from) : this.toUrl(this.path(t.source.input.from));
  }, r.toBase64 = function(t) {
    return Buffer ? Buffer.from(t).toString("base64") : window.btoa(unescape(encodeURIComponent(t)));
  }, r.toFileUrl = function(t) {
    var n = this.memoizedFileURLs.get(t);
    if (n) return n;
    if (kc) {
      var s = kc(t).toString();
      return this.memoizedFileURLs.set(t, s), s;
    } else
      throw new Error("`map.absolute` option is not available in this PostCSS build");
  }, r.toUrl = function(t) {
    var n = this.memoizedURLs.get(t);
    if (n) return n;
    ru === "\\" && (t = t.replace(/\\/g, "/"));
    var s = encodeURI(t).replace(/[#?]/g, encodeURIComponent);
    return this.memoizedURLs.set(t, s), s;
  }, e;
})(), nu = Tp, Np = fs, Co = /* @__PURE__ */ (function(e) {
  mt(r, e);
  function r(i) {
    var t;
    return t = e.call(this, i) || this, t.type = "comment", t;
  }
  return r;
})(Np), ps = Co;
Co.default = Co;
var iu = yr.isClean, su = yr.my, ou = ds, au = ps, Mp = fs, cu, pa, va, lu;
function uu(e) {
  return e.map(function(r) {
    return r.nodes && (r.nodes = uu(r.nodes)), delete r.source, r;
  });
}
function fu(e) {
  if (e[iu] = !1, e.proxyOf.nodes)
    for (var r = W(e.proxyOf.nodes), i; !(i = r()).done; ) {
      var t = i.value;
      fu(t);
    }
}
var tr = /* @__PURE__ */ (function(e) {
  mt(r, e);
  function r() {
    return e.apply(this, arguments) || this;
  }
  var i = r.prototype;
  return i.append = function() {
    for (var n = arguments.length, s = new Array(n), o = 0; o < n; o++)
      s[o] = arguments[o];
    for (var a = W(s), c; !(c = a()).done; )
      for (var l = c.value, f = this.normalize(l, this.last), u = W(f), d; !(d = u()).done; ) {
        var v = d.value;
        this.proxyOf.nodes.push(v);
      }
    return this.markDirty(), this;
  }, i.cleanRaws = function(n) {
    if (e.prototype.cleanRaws.call(this, n), this.nodes)
      for (var s = W(this.nodes), o; !(o = s()).done; ) {
        var a = o.value;
        a.cleanRaws(n);
      }
  }, i.each = function(n) {
    if (this.proxyOf.nodes) {
      for (var s = this.getIterator(), o, a; this.indexes[s] < this.proxyOf.nodes.length && (o = this.indexes[s], a = n(this.proxyOf.nodes[o], o), a !== !1); )
        this.indexes[s] += 1;
      return delete this.indexes[s], a;
    }
  }, i.every = function(n) {
    return this.nodes.every(n);
  }, i.getIterator = function() {
    this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach += 1;
    var n = this.lastEach;
    return this.indexes[n] = 0, n;
  }, i.getProxyProcessor = function() {
    return {
      get: function(s, o) {
        return o === "proxyOf" ? s : s[o] ? o === "each" || typeof o == "string" && o.startsWith("walk") ? function() {
          for (var a = arguments.length, c = new Array(a), l = 0; l < a; l++)
            c[l] = arguments[l];
          var f;
          return (f = s)[o].apply(f, [].concat(c.map(function(u) {
            return typeof u == "function" ? function(d, v) {
              return u(d.toProxy(), v);
            } : u;
          })));
        } : o === "every" || o === "some" ? function(a) {
          return s[o](function(c) {
            for (var l = arguments.length, f = new Array(l > 1 ? l - 1 : 0), u = 1; u < l; u++)
              f[u - 1] = arguments[u];
            return a.apply(void 0, [].concat([
              c.toProxy()
            ], f));
          });
        } : o === "root" ? function() {
          return s.root().toProxy();
        } : o === "nodes" ? s.nodes.map(function(a) {
          return a.toProxy();
        }) : o === "first" || o === "last" ? s[o].toProxy() : s[o] : s[o];
      },
      set: function(s, o, a) {
        return s[o] === a || (s[o] = a, (o === "name" || o === "params" || o === "selector") && s.markDirty()), !0;
      }
    };
  }, i.index = function(n) {
    return typeof n == "number" ? n : (n.proxyOf && (n = n.proxyOf), this.proxyOf.nodes.indexOf(n));
  }, i.insertAfter = function(n, s) {
    var o = this.index(n), a = this.normalize(s, this.proxyOf.nodes[o]).reverse();
    o = this.index(n);
    for (var c = W(a), l; !(l = c()).done; ) {
      var f = l.value;
      this.proxyOf.nodes.splice(o + 1, 0, f);
    }
    var u;
    for (var d in this.indexes)
      u = this.indexes[d], o < u && (this.indexes[d] = u + a.length);
    return this.markDirty(), this;
  }, i.insertBefore = function(n, s) {
    var o = this.index(n), a = o === 0 ? "prepend" : !1, c = this.normalize(s, this.proxyOf.nodes[o], a).reverse();
    o = this.index(n);
    for (var l = W(c), f; !(f = l()).done; ) {
      var u = f.value;
      this.proxyOf.nodes.splice(o, 0, u);
    }
    var d;
    for (var v in this.indexes)
      d = this.indexes[v], o <= d && (this.indexes[v] = d + c.length);
    return this.markDirty(), this;
  }, i.normalize = function(n, s) {
    var o = this;
    if (typeof n == "string")
      n = uu(cu(n).nodes);
    else if (typeof n > "u")
      n = [];
    else if (Array.isArray(n)) {
      n = n.slice(0);
      for (var a = W(n), c; !(c = a()).done; ) {
        var l = c.value;
        l.parent && l.parent.removeChild(l, "ignore");
      }
    } else if (n.type === "root" && this.type !== "document") {
      n = n.nodes.slice(0);
      for (var f = W(n), u; !(u = f()).done; ) {
        var d = u.value;
        d.parent && d.parent.removeChild(d, "ignore");
      }
    } else if (n.type)
      n = [
        n
      ];
    else if (n.prop) {
      if (typeof n.value > "u")
        throw new Error("Value field is missed in node creation");
      typeof n.value != "string" && (n.value = String(n.value)), n = [
        new ou(n)
      ];
    } else if (n.selector)
      n = [
        new pa(n)
      ];
    else if (n.name)
      n = [
        new va(n)
      ];
    else if (n.text)
      n = [
        new au(n)
      ];
    else
      throw new Error("Unknown node type in node creation");
    var v = n.map(function(p) {
      return p[su] || r.rebuild(p), p = p.proxyOf, p.parent && p.parent.removeChild(p), p[iu] && fu(p), typeof p.raws.before > "u" && s && typeof s.raws.before < "u" && (p.raws.before = s.raws.before.replace(/\S/g, "")), p.parent = o.proxyOf, p;
    });
    return v;
  }, i.prepend = function() {
    for (var n = arguments.length, s = new Array(n), o = 0; o < n; o++)
      s[o] = arguments[o];
    s = s.reverse();
    for (var a = W(s), c; !(c = a()).done; ) {
      for (var l = c.value, f = this.normalize(l, this.first, "prepend").reverse(), u = W(f), d; !(d = u()).done; ) {
        var v = d.value;
        this.proxyOf.nodes.unshift(v);
      }
      for (var p in this.indexes)
        this.indexes[p] = this.indexes[p] + f.length;
    }
    return this.markDirty(), this;
  }, i.push = function(n) {
    return n.parent = this, this.proxyOf.nodes.push(n), this;
  }, i.removeAll = function() {
    for (var n = W(this.proxyOf.nodes), s; !(s = n()).done; ) {
      var o = s.value;
      o.parent = void 0;
    }
    return this.proxyOf.nodes = [], this.markDirty(), this;
  }, i.removeChild = function(n) {
    n = this.index(n), this.proxyOf.nodes[n].parent = void 0, this.proxyOf.nodes.splice(n, 1);
    var s;
    for (var o in this.indexes)
      s = this.indexes[o], s >= n && (this.indexes[o] = s - 1);
    return this.markDirty(), this;
  }, i.replaceValues = function(n, s, o) {
    return o || (o = s, s = {}), this.walkDecls(function(a) {
      s.props && !s.props.includes(a.prop) || s.fast && !a.value.includes(s.fast) || (a.value = a.value.replace(n, o));
    }), this.markDirty(), this;
  }, i.some = function(n) {
    return this.nodes.some(n);
  }, i.walk = function(n) {
    return this.each(function(s, o) {
      var a;
      try {
        a = n(s, o);
      } catch (c) {
        throw s.addToError(c);
      }
      return a !== !1 && s.walk && (a = s.walk(n)), a;
    });
  }, i.walkAtRules = function(n, s) {
    return s ? te(n, RegExp) ? this.walk(function(o, a) {
      if (o.type === "atrule" && n.test(o.name))
        return s(o, a);
    }) : this.walk(function(o, a) {
      if (o.type === "atrule" && o.name === n)
        return s(o, a);
    }) : (s = n, this.walk(function(o, a) {
      if (o.type === "atrule")
        return s(o, a);
    }));
  }, i.walkComments = function(n) {
    return this.walk(function(s, o) {
      if (s.type === "comment")
        return n(s, o);
    });
  }, i.walkDecls = function(n, s) {
    return s ? te(n, RegExp) ? this.walk(function(o, a) {
      if (o.type === "decl" && n.test(o.prop))
        return s(o, a);
    }) : this.walk(function(o, a) {
      if (o.type === "decl" && o.prop === n)
        return s(o, a);
    }) : (s = n, this.walk(function(o, a) {
      if (o.type === "decl")
        return s(o, a);
    }));
  }, i.walkRules = function(n, s) {
    return s ? te(n, RegExp) ? this.walk(function(o, a) {
      if (o.type === "rule" && n.test(o.selector))
        return s(o, a);
    }) : this.walk(function(o, a) {
      if (o.type === "rule" && o.selector === n)
        return s(o, a);
    }) : (s = n, this.walk(function(o, a) {
      if (o.type === "rule")
        return s(o, a);
    }));
  }, dt(r, [
    {
      key: "first",
      get: function() {
        if (this.proxyOf.nodes)
          return this.proxyOf.nodes[0];
      }
    },
    {
      key: "last",
      get: function() {
        if (this.proxyOf.nodes)
          return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
      }
    }
  ]), r;
})(Mp);
tr.registerParse = function(e) {
  cu = e;
};
tr.registerRule = function(e) {
  pa = e;
};
tr.registerAtRule = function(e) {
  va = e;
};
tr.registerRoot = function(e) {
  lu = e;
};
var Tr = tr;
tr.default = tr;
tr.rebuild = function(e) {
  e.type === "atrule" ? Object.setPrototypeOf(e, va.prototype) : e.type === "rule" ? Object.setPrototypeOf(e, pa.prototype) : e.type === "decl" ? Object.setPrototypeOf(e, ou.prototype) : e.type === "comment" ? Object.setPrototypeOf(e, au.prototype) : e.type === "root" && Object.setPrototypeOf(e, lu.prototype), e[su] = !0, e.nodes && e.nodes.forEach(function(r) {
    tr.rebuild(r);
  });
};
var Pp = Tr, du, hu, Ln = /* @__PURE__ */ (function(e) {
  mt(r, e);
  function r(t) {
    var n;
    return n = e.call(this, we({
      type: "document"
    }, t)) || this, n.nodes || (n.nodes = []), n;
  }
  var i = r.prototype;
  return i.toResult = function(n) {
    n === void 0 && (n = {});
    var s = new du(new hu(), this, n);
    return s.stringify();
  }, r;
})(Pp);
Ln.registerLazyResult = function(e) {
  du = e;
};
Ln.registerProcessor = function(e) {
  hu = e;
};
var ga = Ln;
Ln.default = Ln;
var Ec = {}, pu = function(r) {
  Ec[r] || (Ec[r] = !0, typeof console < "u" && console.warn && console.warn(r));
}, ko = /* @__PURE__ */ (function() {
  function e(i, t) {
    if (t === void 0 && (t = {}), this.type = "warning", this.text = i, t.node && t.node.source) {
      var n = t.node.rangeBy(t);
      this.line = n.start.line, this.column = n.start.column, this.endLine = n.end.line, this.endColumn = n.end.column;
    }
    for (var s in t) this[s] = t[s];
  }
  var r = e.prototype;
  return r.toString = function() {
    return this.node ? this.node.error(this.text, {
      index: this.index,
      plugin: this.plugin,
      word: this.word
    }).message : this.plugin ? this.plugin + ": " + this.text : this.text;
  }, e;
})(), vu = ko;
ko.default = ko;
var Lp = vu, Eo = /* @__PURE__ */ (function() {
  function e(i, t, n) {
    this.processor = i, this.messages = [], this.root = t, this.opts = n, this.css = void 0, this.map = void 0;
  }
  var r = e.prototype;
  return r.toString = function() {
    return this.css;
  }, r.warn = function(t, n) {
    n === void 0 && (n = {}), n.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (n.plugin = this.lastPlugin.postcssPlugin);
    var s = new Lp(t, n);
    return this.messages.push(s), s;
  }, r.warnings = function() {
    return this.messages.filter(function(t) {
      return t.type === "warning";
    });
  }, dt(e, [
    {
      key: "content",
      get: function() {
        return this.css;
      }
    }
  ]), e;
})(), ma = Eo;
Eo.default = Eo;
var $s = 39, Ic = 34, ci = 92, Oc = 47, li = 10, gn = 32, ui = 12, fi = 9, di = 13, $p = 91, Dp = 93, Fp = 40, jp = 41, Up = 123, Bp = 125, Wp = 59, zp = 42, Gp = 58, Vp = 64, hi = /[\t\n\f\r "#'()/;[\\\]{}]/g, pi = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, qp = /.[\r\n"'(/\\]/, Ac = /[\da-f]/i, Hp = function(r, i) {
  i === void 0 && (i = {});
  var t = r.css.valueOf(), n = i.ignoreErrors, s, o, a, c, l, f, u, d, v, p, _ = t.length, m = 0, y = [], b = [];
  function S() {
    return m;
  }
  function E(M) {
    throw r.error("Unclosed " + M, m);
  }
  function C() {
    return b.length === 0 && m >= _;
  }
  function A(M) {
    if (b.length) return b.pop();
    if (!(m >= _)) {
      var D = M ? M.ignoreUnclosed : !1;
      switch (s = t.charCodeAt(m), s) {
        case li:
        case gn:
        case fi:
        case di:
        case ui: {
          o = m;
          do
            o += 1, s = t.charCodeAt(o);
          while (s === gn || s === li || s === fi || s === di || s === ui);
          p = [
            "space",
            t.slice(m, o)
          ], m = o - 1;
          break;
        }
        case $p:
        case Dp:
        case Up:
        case Bp:
        case Gp:
        case Wp:
        case jp: {
          var L = String.fromCharCode(s);
          p = [
            L,
            L,
            m
          ];
          break;
        }
        case Fp: {
          if (d = y.length ? y.pop()[1] : "", v = t.charCodeAt(m + 1), d === "url" && v !== $s && v !== Ic && v !== gn && v !== li && v !== fi && v !== ui && v !== di) {
            o = m;
            do {
              if (f = !1, o = t.indexOf(")", o + 1), o === -1)
                if (n || D) {
                  o = m;
                  break;
                } else
                  E("bracket");
              for (u = o; t.charCodeAt(u - 1) === ci; )
                u -= 1, f = !f;
            } while (f);
            p = [
              "brackets",
              t.slice(m, o + 1),
              m,
              o
            ], m = o;
          } else
            o = t.indexOf(")", m + 1), c = t.slice(m, o + 1), o === -1 || qp.test(c) ? p = [
              "(",
              "(",
              m
            ] : (p = [
              "brackets",
              c,
              m,
              o
            ], m = o);
          break;
        }
        case $s:
        case Ic: {
          a = s === $s ? "'" : '"', o = m;
          do {
            if (f = !1, o = t.indexOf(a, o + 1), o === -1)
              if (n || D) {
                o = m + 1;
                break;
              } else
                E("string");
            for (u = o; t.charCodeAt(u - 1) === ci; )
              u -= 1, f = !f;
          } while (f);
          p = [
            "string",
            t.slice(m, o + 1),
            m,
            o
          ], m = o;
          break;
        }
        case Vp: {
          hi.lastIndex = m + 1, hi.test(t), hi.lastIndex === 0 ? o = t.length - 1 : o = hi.lastIndex - 2, p = [
            "at-word",
            t.slice(m, o + 1),
            m,
            o
          ], m = o;
          break;
        }
        case ci: {
          for (o = m, l = !0; t.charCodeAt(o + 1) === ci; )
            o += 1, l = !l;
          if (s = t.charCodeAt(o + 1), l && s !== Oc && s !== gn && s !== li && s !== fi && s !== di && s !== ui && (o += 1, Ac.test(t.charAt(o)))) {
            for (; Ac.test(t.charAt(o + 1)); )
              o += 1;
            t.charCodeAt(o + 1) === gn && (o += 1);
          }
          p = [
            "word",
            t.slice(m, o + 1),
            m,
            o
          ], m = o;
          break;
        }
        default: {
          s === Oc && t.charCodeAt(m + 1) === zp ? (o = t.indexOf("*/", m + 2) + 1, o === 0 && (n || D ? o = t.length : E("comment")), p = [
            "comment",
            t.slice(m, o + 1),
            m,
            o
          ], m = o) : (pi.lastIndex = m + 1, pi.test(t), pi.lastIndex === 0 ? o = t.length - 1 : o = pi.lastIndex - 2, p = [
            "word",
            t.slice(m, o + 1),
            m,
            o
          ], y.push(p), m = o);
          break;
        }
      }
      return m++, p;
    }
  }
  function I(M) {
    b.push(M);
  }
  return {
    back: I,
    endOfFile: C,
    nextToken: A,
    position: S
  };
}, gu = Tr, Wi = /* @__PURE__ */ (function(e) {
  mt(r, e);
  function r(t) {
    var n;
    return n = e.call(this, t) || this, n.type = "atrule", n;
  }
  var i = r.prototype;
  return i.append = function() {
    for (var n = arguments.length, s = new Array(n), o = 0; o < n; o++)
      s[o] = arguments[o];
    var a;
    return this.proxyOf.nodes || (this.nodes = []), (a = e.prototype.append).call.apply(a, [].concat([
      this
    ], s));
  }, i.prepend = function() {
    for (var n = arguments.length, s = new Array(n), o = 0; o < n; o++)
      s[o] = arguments[o];
    var a;
    return this.proxyOf.nodes || (this.nodes = []), (a = e.prototype.prepend).call.apply(a, [].concat([
      this
    ], s));
  }, r;
})(gu), ya = Wi;
Wi.default = Wi;
gu.registerAtRule(Wi);
var mu = Tr, yu, _u, Kr = /* @__PURE__ */ (function(e) {
  mt(r, e);
  function r(t) {
    var n;
    return n = e.call(this, t) || this, n.type = "root", n.nodes || (n.nodes = []), n;
  }
  var i = r.prototype;
  return i.normalize = function(n, s, o) {
    var a = e.prototype.normalize.call(this, n);
    if (s) {
      if (o === "prepend")
        this.nodes.length > 1 ? s.raws.before = this.nodes[1].raws.before : delete s.raws.before;
      else if (this.first !== s)
        for (var c = W(a), l; !(l = c()).done; ) {
          var f = l.value;
          f.raws.before = s.raws.before;
        }
    }
    return a;
  }, i.removeChild = function(n, s) {
    var o = this.index(n);
    return !s && o === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[o].raws.before), e.prototype.removeChild.call(this, n);
  }, i.toResult = function(n) {
    n === void 0 && (n = {});
    var s = new yu(new _u(), this, n);
    return s.stringify();
  }, r;
})(mu);
Kr.registerLazyResult = function(e) {
  yu = e;
};
Kr.registerProcessor = function(e) {
  _u = e;
};
var Kn = Kr;
Kr.default = Kr;
mu.registerRoot(Kr);
var $n = {
  comma: function(r) {
    return $n.split(r, [
      ","
    ], !0);
  },
  space: function(r) {
    var i = [
      " ",
      `
`,
      "	"
    ];
    return $n.split(r, i);
  },
  split: function(r, i, t) {
    for (var n = [], s = "", o = !1, a = 0, c = !1, l = "", f = !1, u = W(r), d; !(d = u()).done; ) {
      var v = d.value;
      f ? f = !1 : v === "\\" ? f = !0 : c ? v === l && (c = !1) : v === '"' || v === "'" ? (c = !0, l = v) : v === "(" ? a += 1 : v === ")" ? a > 0 && (a -= 1) : a === 0 && i.includes(v) && (o = !0), o ? (s !== "" && n.push(s.trim()), s = "", o = !1) : s += v;
    }
    return (t || s !== "") && n.push(s.trim()), n;
  }
}, bu = $n;
$n.default = $n;
var wu = Tr, Yp = bu, zi = /* @__PURE__ */ (function(e) {
  mt(r, e);
  function r(i) {
    var t;
    return t = e.call(this, i) || this, t.type = "rule", t.nodes || (t.nodes = []), t;
  }
  return dt(r, [
    {
      key: "selectors",
      get: function() {
        return Yp.comma(this.selector);
      },
      set: function(t) {
        var n = this.selector ? this.selector.match(/,\s*/) : null, s = n ? n[0] : "," + this.raw("between", "beforeOpen");
        this.selector = t.join(s);
      }
    }
  ]), r;
})(wu), _a = zi;
zi.default = zi;
wu.registerRule(zi);
var Kp = ds, Jp = Hp, Xp = ps, Zp = ya, Qp = Kn, Rc = _a, Tc = {
  empty: !0,
  space: !0
};
function ev(e) {
  for (var r = e.length - 1; r >= 0; r--) {
    var i = e[r], t = i[3] || i[2];
    if (t) return t;
  }
}
var tv = /* @__PURE__ */ (function() {
  function e(i) {
    this.input = i, this.root = new Qp(), this.current = this.root, this.spaces = "", this.semicolon = !1, this.createTokenizer(), this.root.source = {
      input: i,
      start: {
        column: 1,
        line: 1,
        offset: 0
      }
    };
  }
  var r = e.prototype;
  return r.atrule = function(t) {
    var n = new Zp();
    n.name = t[1].slice(1), n.name === "" && this.unnamedAtrule(n, t), this.init(n, t[2]);
    for (var s, o, a, c = !1, l = !1, f = [], u = []; !this.tokenizer.endOfFile(); ) {
      if (t = this.tokenizer.nextToken(), s = t[0], s === "(" || s === "[" ? u.push(s === "(" ? ")" : "]") : s === "{" && u.length > 0 ? u.push("}") : s === u[u.length - 1] && u.pop(), u.length === 0)
        if (s === ";") {
          n.source.end = this.getPosition(t[2]), n.source.end.offset++, this.semicolon = !0;
          break;
        } else if (s === "{") {
          l = !0;
          break;
        } else if (s === "}") {
          if (f.length > 0) {
            for (a = f.length - 1, o = f[a]; o && o[0] === "space"; )
              o = f[--a];
            o && (n.source.end = this.getPosition(o[3] || o[2]), n.source.end.offset++);
          }
          this.end(t);
          break;
        } else
          f.push(t);
      else
        f.push(t);
      if (this.tokenizer.endOfFile()) {
        c = !0;
        break;
      }
    }
    n.raws.between = this.spacesAndCommentsFromEnd(f), f.length ? (n.raws.afterName = this.spacesAndCommentsFromStart(f), this.raw(n, "params", f), c && (t = f[f.length - 1], n.source.end = this.getPosition(t[3] || t[2]), n.source.end.offset++, this.spaces = n.raws.between, n.raws.between = "")) : (n.raws.afterName = "", n.params = ""), l && (n.nodes = [], this.current = n);
  }, r.checkMissedSemicolon = function(t) {
    var n = this.colon(t);
    if (n !== !1) {
      for (var s = 0, o, a = n - 1; a >= 0 && (o = t[a], !(o[0] !== "space" && (s += 1, s === 2))); a--)
        ;
      throw this.input.error("Missed semicolon", o[0] === "word" ? o[3] + 1 : o[2]);
    }
  }, r.colon = function(t) {
    for (var n = 0, s, o, a, c = W(t.entries()), l; !(l = c()).done; ) {
      var f = l.value, u = f[0], d = f[1];
      if (s = d, o = s[0], o === "(" && (n += 1), o === ")" && (n -= 1), n === 0 && o === ":")
        if (!a)
          this.doubleColon(s);
        else {
          if (a[0] === "word" && a[1] === "progid")
            continue;
          return u;
        }
      a = s;
    }
    return !1;
  }, r.comment = function(t) {
    var n = new Xp();
    this.init(n, t[2]), n.source.end = this.getPosition(t[3] || t[2]), n.source.end.offset++;
    var s = t[1].slice(2, -2);
    if (/^\s*$/.test(s))
      n.text = "", n.raws.left = s, n.raws.right = "";
    else {
      var o = s.match(/^(\s*)([^]*\S)(\s*)$/);
      n.text = o[2], n.raws.left = o[1], n.raws.right = o[3];
    }
  }, r.createTokenizer = function() {
    this.tokenizer = Jp(this.input);
  }, r.decl = function(t, n) {
    var s = new Kp();
    this.init(s, t[0][2]);
    var o = t[t.length - 1];
    for (o[0] === ";" && (this.semicolon = !0, t.pop()), s.source.end = this.getPosition(o[3] || o[2] || ev(t)), s.source.end.offset++; t[0][0] !== "word"; )
      t.length === 1 && this.unknownWord(t), s.raws.before += t.shift()[1];
    for (s.source.start = this.getPosition(t[0][2]), s.prop = ""; t.length; ) {
      var a = t[0][0];
      if (a === ":" || a === "space" || a === "comment")
        break;
      s.prop += t.shift()[1];
    }
    s.raws.between = "";
    for (var c; t.length; )
      if (c = t.shift(), c[0] === ":") {
        s.raws.between += c[1];
        break;
      } else
        c[0] === "word" && /\w/.test(c[1]) && this.unknownWord([
          c
        ]), s.raws.between += c[1];
    (s.prop[0] === "_" || s.prop[0] === "*") && (s.raws.before += s.prop[0], s.prop = s.prop.slice(1));
    for (var l = [], f; t.length && (f = t[0][0], !(f !== "space" && f !== "comment")); )
      l.push(t.shift());
    this.precheckMissedSemicolon(t);
    for (var u = t.length - 1; u >= 0; u--) {
      if (c = t[u], c[1].toLowerCase() === "!important") {
        s.important = !0;
        var d = this.stringFrom(t, u);
        d = this.spacesFromEnd(t) + d, d !== " !important" && (s.raws.important = d);
        break;
      } else if (c[1].toLowerCase() === "important") {
        for (var v = t.slice(0), p = "", _ = u; _ > 0; _--) {
          var m = v[_][0];
          if (p.trim().indexOf("!") === 0 && m !== "space")
            break;
          p = v.pop()[1] + p;
        }
        p.trim().indexOf("!") === 0 && (s.important = !0, s.raws.important = p, t = v);
      }
      if (c[0] !== "space" && c[0] !== "comment")
        break;
    }
    var y = t.some(function(b) {
      return b[0] !== "space" && b[0] !== "comment";
    });
    y && (s.raws.between += l.map(function(b) {
      return b[1];
    }).join(""), l = []), this.raw(s, "value", l.concat(t), n), s.value.includes(":") && !n && this.checkMissedSemicolon(t);
  }, r.doubleColon = function(t) {
    throw this.input.error("Double colon", {
      offset: t[2]
    }, {
      offset: t[2] + t[1].length
    });
  }, r.emptyRule = function(t) {
    var n = new Rc();
    this.init(n, t[2]), n.selector = "", n.raws.between = "", this.current = n;
  }, r.end = function(t) {
    this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.semicolon = !1, this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.spaces = "", this.current.parent ? (this.current.source.end = this.getPosition(t[2]), this.current.source.end.offset++, this.current = this.current.parent) : this.unexpectedClose(t);
  }, r.endFile = function() {
    this.current.parent && this.unclosedBlock(), this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.root.source.end = this.getPosition(this.tokenizer.position());
  }, r.freeSemicolon = function(t) {
    if (this.spaces += t[1], this.current.nodes) {
      var n = this.current.nodes[this.current.nodes.length - 1];
      n && n.type === "rule" && !n.raws.ownSemicolon && (n.raws.ownSemicolon = this.spaces, this.spaces = "");
    }
  }, r.getPosition = function(t) {
    var n = this.input.fromOffset(t);
    return {
      column: n.col,
      line: n.line,
      offset: t
    };
  }, r.init = function(t, n) {
    this.current.push(t), t.source = {
      input: this.input,
      start: this.getPosition(n)
    }, t.raws.before = this.spaces, this.spaces = "", t.type !== "comment" && (this.semicolon = !1);
  }, r.other = function(t) {
    for (var n = !1, s = null, o = !1, a = null, c = [], l = t[1].startsWith("--"), f = [], u = t; u; ) {
      if (s = u[0], f.push(u), s === "(" || s === "[")
        a || (a = u), c.push(s === "(" ? ")" : "]");
      else if (l && o && s === "{")
        a || (a = u), c.push("}");
      else if (c.length === 0)
        if (s === ";")
          if (o) {
            this.decl(f, l);
            return;
          } else
            break;
        else if (s === "{") {
          this.rule(f);
          return;
        } else if (s === "}") {
          this.tokenizer.back(f.pop()), n = !0;
          break;
        } else s === ":" && (o = !0);
      else s === c[c.length - 1] && (c.pop(), c.length === 0 && (a = null));
      u = this.tokenizer.nextToken();
    }
    if (this.tokenizer.endOfFile() && (n = !0), c.length > 0 && this.unclosedBracket(a), n && o) {
      if (!l)
        for (; f.length && (u = f[f.length - 1][0], !(u !== "space" && u !== "comment")); )
          this.tokenizer.back(f.pop());
      this.decl(f, l);
    } else
      this.unknownWord(f);
  }, r.parse = function() {
    for (var t; !this.tokenizer.endOfFile(); )
      switch (t = this.tokenizer.nextToken(), t[0]) {
        case "space":
          this.spaces += t[1];
          break;
        case ";":
          this.freeSemicolon(t);
          break;
        case "}":
          this.end(t);
          break;
        case "comment":
          this.comment(t);
          break;
        case "at-word":
          this.atrule(t);
          break;
        case "{":
          this.emptyRule(t);
          break;
        default:
          this.other(t);
          break;
      }
    this.endFile();
  }, r.precheckMissedSemicolon = function() {
  }, r.raw = function(t, n, s, o) {
    for (var a, c, l = s.length, f = "", u = !0, d, v, p = 0; p < l; p += 1)
      a = s[p], c = a[0], c === "space" && p === l - 1 && !o ? u = !1 : c === "comment" ? (v = s[p - 1] ? s[p - 1][0] : "empty", d = s[p + 1] ? s[p + 1][0] : "empty", !Tc[v] && !Tc[d] ? f.slice(-1) === "," ? u = !1 : f += a[1] : u = !1) : f += a[1];
    if (!u) {
      var _ = s.reduce(function(m, y) {
        return m + y[1];
      }, "");
      t.raws[n] = {
        raw: _,
        value: f
      };
    }
    t[n] = f;
  }, r.rule = function(t) {
    t.pop();
    var n = new Rc();
    this.init(n, t[0][2]), n.raws.between = this.spacesAndCommentsFromEnd(t), this.raw(n, "selector", t), this.current = n;
  }, r.spacesAndCommentsFromEnd = function(t) {
    for (var n, s = ""; t.length && (n = t[t.length - 1][0], !(n !== "space" && n !== "comment")); )
      s = t.pop()[1] + s;
    return s;
  }, r.spacesAndCommentsFromStart = function(t) {
    for (var n, s = ""; t.length && (n = t[0][0], !(n !== "space" && n !== "comment")); )
      s += t.shift()[1];
    return s;
  }, r.spacesFromEnd = function(t) {
    for (var n, s = ""; t.length && (n = t[t.length - 1][0], n === "space"); )
      s = t.pop()[1] + s;
    return s;
  }, r.stringFrom = function(t, n) {
    for (var s = "", o = n; o < t.length; o++)
      s += t[o][1];
    return t.splice(n, t.length - n), s;
  }, r.unclosedBlock = function() {
    var t = this.current.source.start;
    throw this.input.error("Unclosed block", t.line, t.column);
  }, r.unclosedBracket = function(t) {
    throw this.input.error("Unclosed bracket", {
      offset: t[2]
    }, {
      offset: t[2] + 1
    });
  }, r.unexpectedClose = function(t) {
    throw this.input.error("Unexpected }", {
      offset: t[2]
    }, {
      offset: t[2] + 1
    });
  }, r.unknownWord = function(t) {
    throw this.input.error("Unknown word", {
      offset: t[0][2]
    }, {
      offset: t[0][2] + t[0][1].length
    });
  }, r.unnamedAtrule = function(t, n) {
    throw this.input.error("At-rule without name", {
      offset: n[2]
    }, {
      offset: n[2] + n[1].length
    });
  }, e;
})(), rv = tv, nv = Tr, iv = rv, sv = hs;
function Gi(e, r) {
  var i = new sv(e, r), t = new iv(i);
  try {
    t.parse();
  } catch (n) {
    throw process.env.NODE_ENV !== "production" && n.name === "CssSyntaxError" && r && r.from && (/\.scss$/i.test(r.from) ? n.message += `
You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser` : /\.sass/i.test(r.from) ? n.message += `
You tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser` : /\.less$/i.test(r.from) && (n.message += `
You tried to parse Less with the standard CSS parser; try again with the postcss-less parser`)), n;
  }
  return t.root;
}
var ba = Gi;
Gi.default = Gi;
nv.registerParse(Gi);
var Bt = yr.isClean, ov = yr.my, av = nu, cv = us, lv = Tr, uv = ga, fv = pu, Nc = ma, dv = ba, hv = Kn, pv = {
  atrule: "AtRule",
  comment: "Comment",
  decl: "Declaration",
  document: "Document",
  root: "Root",
  rule: "Rule"
}, vv = {
  AtRule: !0,
  AtRuleExit: !0,
  Comment: !0,
  CommentExit: !0,
  Declaration: !0,
  DeclarationExit: !0,
  Document: !0,
  DocumentExit: !0,
  Once: !0,
  OnceExit: !0,
  postcssPlugin: !0,
  prepare: !0,
  Root: !0,
  RootExit: !0,
  Rule: !0,
  RuleExit: !0
}, gv = {
  Once: !0,
  postcssPlugin: !0,
  prepare: !0
}, Jr = 0;
function mn(e) {
  return (typeof e > "u" ? "undefined" : ce(e)) === "object" && typeof e.then == "function";
}
function Su(e) {
  var r = !1, i = pv[e.type];
  return e.type === "decl" ? r = e.prop.toLowerCase() : e.type === "atrule" && (r = e.name.toLowerCase()), r && e.append ? [
    i,
    i + "-" + r,
    Jr,
    i + "Exit",
    i + "Exit-" + r
  ] : r ? [
    i,
    i + "-" + r,
    i + "Exit",
    i + "Exit-" + r
  ] : e.append ? [
    i,
    Jr,
    i + "Exit"
  ] : [
    i,
    i + "Exit"
  ];
}
function Mc(e) {
  var r;
  return e.type === "document" ? r = [
    "Document",
    Jr,
    "DocumentExit"
  ] : e.type === "root" ? r = [
    "Root",
    Jr,
    "RootExit"
  ] : r = Su(e), {
    eventIndex: 0,
    events: r,
    iterator: 0,
    node: e,
    visitorIndex: 0,
    visitors: []
  };
}
function Io(e) {
  return e[Bt] = !1, e.nodes && e.nodes.forEach(function(r) {
    return Io(r);
  }), e;
}
var Oo = {}, Xr = /* @__PURE__ */ (function() {
  function e(i, t, n) {
    var s = this;
    this.stringified = !1, this.processed = !1;
    var o;
    if ((typeof t > "u" ? "undefined" : ce(t)) === "object" && t !== null && (t.type === "root" || t.type === "document"))
      o = Io(t);
    else if (te(t, e) || te(t, Nc))
      o = Io(t.root), t.map && (typeof n.map > "u" && (n.map = {}), n.map.inline || (n.map.inline = !1), n.map.prev = t.map);
    else {
      var a = dv;
      n.syntax && (a = n.syntax.parse), n.parser && (a = n.parser), a.parse && (a = a.parse);
      try {
        o = a(t, n);
      } catch (c) {
        this.processed = !0, this.error = c;
      }
      o && !o[ov] && lv.rebuild(o);
    }
    this.result = new Nc(i, o, n), this.helpers = we({}, Oo, {
      postcss: Oo,
      result: this.result
    }), this.plugins = this.processor.plugins.map(function(c) {
      return (typeof c > "u" ? "undefined" : ce(c)) === "object" && c.prepare ? we({}, c, c.prepare(s.result)) : c;
    });
  }
  var r = e.prototype;
  return r.async = function() {
    return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing || (this.processing = this.runAsync()), this.processing);
  }, r.catch = function(t) {
    return this.async().catch(t);
  }, r.finally = function(t) {
    return this.async().then(t, t);
  }, r.getAsyncError = function() {
    throw new Error("Use process(css).then(cb) to work with async plugins");
  }, r.handleError = function(t, n) {
    var s = this.result.lastPlugin;
    try {
      if (n && n.addToError(t), this.error = t, t.name === "CssSyntaxError" && !t.plugin)
        t.plugin = s.postcssPlugin, t.setMessage();
      else if (s.postcssVersion && process.env.NODE_ENV !== "production") {
        var o = s.postcssPlugin, a = s.postcssVersion, c = this.result.processor.version, l = a.split("."), f = c.split(".");
        (l[0] !== f[0] || parseInt(l[1]) > parseInt(f[1])) && console.error("Unknown error from PostCSS plugin. Your current PostCSS version is " + c + ", but " + o + " uses " + a + ". Perhaps this is the source of the error below.");
      }
    } catch (u) {
      console && console.error && console.error(u);
    }
    return t;
  }, r.prepareVisitors = function() {
    var t = this;
    this.listeners = {};
    for (var n = function(f, u, d) {
      t.listeners[u] || (t.listeners[u] = []), t.listeners[u].push([
        f,
        d
      ]);
    }, s = W(this.plugins), o; !(o = s()).done; ) {
      var a = o.value;
      if ((typeof a > "u" ? "undefined" : ce(a)) === "object")
        for (var c in a) {
          if (!vv[c] && /^[A-Z]/.test(c))
            throw new Error("Unknown event " + c + " in " + a.postcssPlugin + ". Try to update PostCSS (" + this.processor.version + " now).");
          if (!gv[c])
            if (ce(a[c]) === "object")
              for (var l in a[c])
                l === "*" ? n(a, c, a[c][l]) : n(a, c + "-" + l.toLowerCase(), a[c][l]);
            else typeof a[c] == "function" && n(a, c, a[c]);
        }
    }
    this.hasListener = Object.keys(this.listeners).length > 0;
  }, r.runAsync = function() {
    var t = this;
    return la(function() {
      var n, s, o, a, c, l, f, u, d, v, p, _;
      return Mn(this, function(m) {
        switch (m.label) {
          case 0:
            t.plugin = 0, n = 0, m.label = 1;
          case 1:
            if (!(n < t.plugins.length)) return [
              3,
              6
            ];
            if (s = t.plugins[n], o = t.runOnRoot(s), !mn(o)) return [
              3,
              5
            ];
            m.label = 2;
          case 2:
            return m.trys.push([
              2,
              4,
              ,
              5
            ]), [
              4,
              o
            ];
          case 3:
            return m.sent(), [
              3,
              5
            ];
          case 4:
            throw a = m.sent(), t.handleError(a);
          case 5:
            return n++, [
              3,
              1
            ];
          case 6:
            if (t.prepareVisitors(), !t.hasListener) return [
              3,
              18
            ];
            c = t.result.root, m.label = 7;
          case 7:
            if (c[Bt]) return [
              3,
              14
            ];
            c[Bt] = !0, l = [
              Mc(c)
            ], m.label = 8;
          case 8:
            if (!(l.length > 0)) return [
              3,
              13
            ];
            if (f = t.visitTick(l), !mn(f)) return [
              3,
              12
            ];
            m.label = 9;
          case 9:
            return m.trys.push([
              9,
              11,
              ,
              12
            ]), [
              4,
              f
            ];
          case 10:
            return m.sent(), [
              3,
              12
            ];
          case 11:
            throw u = m.sent(), d = l[l.length - 1].node, t.handleError(u, d);
          case 12:
            return [
              3,
              8
            ];
          case 13:
            return [
              3,
              7
            ];
          case 14:
            if (!t.listeners.OnceExit) return [
              3,
              18
            ];
            v = function() {
              var y, b, S, E, C;
              return Mn(this, function(A) {
                switch (A.label) {
                  case 0:
                    y = _.value, b = y[0], S = y[1], t.result.lastPlugin = b, A.label = 1;
                  case 1:
                    return A.trys.push([
                      1,
                      6,
                      ,
                      7
                    ]), c.type !== "document" ? [
                      3,
                      3
                    ] : (E = c.nodes.map(function(I) {
                      return S(I, t.helpers);
                    }), [
                      4,
                      Promise.all(E)
                    ]);
                  case 2:
                    return A.sent(), [
                      3,
                      5
                    ];
                  case 3:
                    return [
                      4,
                      S(c, t.helpers)
                    ];
                  case 4:
                    A.sent(), A.label = 5;
                  case 5:
                    return [
                      3,
                      7
                    ];
                  case 6:
                    throw C = A.sent(), t.handleError(C);
                  case 7:
                    return [
                      2
                    ];
                }
              });
            }, p = W(t.listeners.OnceExit), m.label = 15;
          case 15:
            return (_ = p()).done ? [
              3,
              18
            ] : [
              5,
              Ul(v())
            ];
          case 16:
            m.sent(), m.label = 17;
          case 17:
            return [
              3,
              15
            ];
          case 18:
            return t.processed = !0, [
              2,
              t.stringify()
            ];
        }
      });
    })();
  }, r.runOnRoot = function(t) {
    var n = this;
    this.result.lastPlugin = t;
    try {
      if ((typeof t > "u" ? "undefined" : ce(t)) === "object" && t.Once) {
        if (this.result.root.type === "document") {
          var s = this.result.root.nodes.map(function(o) {
            return t.Once(o, n.helpers);
          });
          return mn(s[0]) ? Promise.all(s) : s;
        }
        return t.Once(this.result.root, this.helpers);
      } else if (typeof t == "function")
        return t(this.result.root, this.result);
    } catch (o) {
      throw this.handleError(o);
    }
  }, r.stringify = function() {
    if (this.error) throw this.error;
    if (this.stringified) return this.result;
    this.stringified = !0, this.sync();
    var t = this.result.opts, n = cv;
    t.syntax && (n = t.syntax.stringify), t.stringifier && (n = t.stringifier), n.stringify && (n = n.stringify);
    var s = new av(n, this.result.root, this.result.opts), o = s.generate();
    return this.result.css = o[0], this.result.map = o[1], this.result;
  }, r.sync = function() {
    if (this.error) throw this.error;
    if (this.processed) return this.result;
    if (this.processed = !0, this.processing)
      throw this.getAsyncError();
    for (var t = W(this.plugins), n; !(n = t()).done; ) {
      var s = n.value, o = this.runOnRoot(s);
      if (mn(o))
        throw this.getAsyncError();
    }
    if (this.prepareVisitors(), this.hasListener) {
      for (var a = this.result.root; !a[Bt]; )
        a[Bt] = !0, this.walkSync(a);
      if (this.listeners.OnceExit)
        if (a.type === "document")
          for (var c = W(a.nodes), l; !(l = c()).done; ) {
            var f = l.value;
            this.visitSync(this.listeners.OnceExit, f);
          }
        else
          this.visitSync(this.listeners.OnceExit, a);
    }
    return this.result;
  }, r.then = function(t, n) {
    return process.env.NODE_ENV !== "production" && ("from" in this.opts || fv("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")), this.async().then(t, n);
  }, r.toString = function() {
    return this.css;
  }, r.visitSync = function(t, n) {
    for (var s = W(t), o; !(o = s()).done; ) {
      var a = o.value, c = a[0], l = a[1];
      this.result.lastPlugin = c;
      var f = void 0;
      try {
        f = l(n, this.helpers);
      } catch (u) {
        throw this.handleError(u, n.proxyOf);
      }
      if (n.type !== "root" && n.type !== "document" && !n.parent)
        return !0;
      if (mn(f))
        throw this.getAsyncError();
    }
  }, r.visitTick = function(t) {
    var n = t[t.length - 1], s = n.node, o = n.visitors;
    if (s.type !== "root" && s.type !== "document" && !s.parent) {
      t.pop();
      return;
    }
    if (o.length > 0 && n.visitorIndex < o.length) {
      var a = o[n.visitorIndex], c = a[0], l = a[1];
      n.visitorIndex += 1, n.visitorIndex === o.length && (n.visitors = [], n.visitorIndex = 0), this.result.lastPlugin = c;
      try {
        return l(s.toProxy(), this.helpers);
      } catch (p) {
        throw this.handleError(p, s);
      }
    }
    if (n.iterator !== 0) {
      for (var f = n.iterator, u; u = s.nodes[s.indexes[f]]; )
        if (s.indexes[f] += 1, !u[Bt]) {
          u[Bt] = !0, t.push(Mc(u));
          return;
        }
      n.iterator = 0, delete s.indexes[f];
    }
    for (var d = n.events; n.eventIndex < d.length; ) {
      var v = d[n.eventIndex];
      if (n.eventIndex += 1, v === Jr) {
        s.nodes && s.nodes.length && (s[Bt] = !0, n.iterator = s.getIterator());
        return;
      } else if (this.listeners[v]) {
        n.visitors = this.listeners[v];
        return;
      }
    }
    t.pop();
  }, r.walkSync = function(t) {
    var n = this;
    t[Bt] = !0;
    for (var s = Su(t), o = W(s), a; !(a = o()).done; ) {
      var c = a.value;
      if (c === Jr)
        t.nodes && t.each(function(f) {
          f[Bt] || n.walkSync(f);
        });
      else {
        var l = this.listeners[c];
        if (l && this.visitSync(l, t.toProxy()))
          return;
      }
    }
  }, r.warnings = function() {
    return this.sync().warnings();
  }, dt(e, [
    {
      key: "content",
      get: function() {
        return this.stringify().content;
      }
    },
    {
      key: "css",
      get: function() {
        return this.stringify().css;
      }
    },
    {
      key: "map",
      get: function() {
        return this.stringify().map;
      }
    },
    {
      key: "messages",
      get: function() {
        return this.sync().messages;
      }
    },
    {
      key: "opts",
      get: function() {
        return this.result.opts;
      }
    },
    {
      key: "processor",
      get: function() {
        return this.result.processor;
      }
    },
    {
      key: "root",
      get: function() {
        return this.sync().root;
      }
    },
    {
      key: Symbol.toStringTag,
      get: function() {
        return "LazyResult";
      }
    }
  ]), e;
})();
Xr.registerPostcss = function(e) {
  Oo = e;
};
var xu = Xr;
Xr.default = Xr;
hv.registerLazyResult(Xr);
uv.registerLazyResult(Xr);
var mv = nu, yv = us, _v = pu, bv = ba, wv = ma, Ao = /* @__PURE__ */ (function() {
  function e(i, t, n) {
    t = t.toString(), this.stringified = !1, this._processor = i, this._css = t, this._opts = n, this._map = void 0;
    var s, o = yv;
    this.result = new wv(this._processor, s, this._opts), this.result.css = t;
    var a = this;
    Object.defineProperty(this.result, "root", {
      get: function() {
        return a.root;
      }
    });
    var c = new mv(o, s, this._opts, t);
    if (c.isMap()) {
      var l = c.generate(), f = l[0], u = l[1];
      f && (this.result.css = f), u && (this.result.map = u);
    } else
      c.clearAnnotation(), this.result.css = c.css;
  }
  var r = e.prototype;
  return r.async = function() {
    return this.error ? Promise.reject(this.error) : Promise.resolve(this.result);
  }, r.catch = function(t) {
    return this.async().catch(t);
  }, r.finally = function(t) {
    return this.async().then(t, t);
  }, r.sync = function() {
    if (this.error) throw this.error;
    return this.result;
  }, r.then = function(t, n) {
    return process.env.NODE_ENV !== "production" && ("from" in this._opts || _v("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")), this.async().then(t, n);
  }, r.toString = function() {
    return this._css;
  }, r.warnings = function() {
    return [];
  }, dt(e, [
    {
      key: "content",
      get: function() {
        return this.result.css;
      }
    },
    {
      key: "css",
      get: function() {
        return this.result.css;
      }
    },
    {
      key: "map",
      get: function() {
        return this.result.map;
      }
    },
    {
      key: "messages",
      get: function() {
        return [];
      }
    },
    {
      key: "opts",
      get: function() {
        return this.result.opts;
      }
    },
    {
      key: "processor",
      get: function() {
        return this.result.processor;
      }
    },
    {
      key: "root",
      get: function() {
        if (this._root)
          return this._root;
        var t, n = bv;
        try {
          t = n(this._css, this._opts);
        } catch (s) {
          this.error = s;
        }
        if (this.error)
          throw this.error;
        return this._root = t, t;
      }
    },
    {
      key: Symbol.toStringTag,
      get: function() {
        return "NoWorkResult";
      }
    }
  ]), e;
})(), Sv = Ao;
Ao.default = Ao;
var xv = Sv, Cv = xu, kv = ga, Ev = Kn, Dn = /* @__PURE__ */ (function() {
  function e(i) {
    i === void 0 && (i = []), this.version = "8.4.38", this.plugins = this.normalize(i);
  }
  var r = e.prototype;
  return r.normalize = function(t) {
    for (var n = [], s = W(t), o; !(o = s()).done; ) {
      var a = o.value;
      if (a.postcss === !0 ? a = a() : a.postcss && (a = a.postcss), (typeof a > "u" ? "undefined" : ce(a)) === "object" && Array.isArray(a.plugins))
        n = n.concat(a.plugins);
      else if ((typeof a > "u" ? "undefined" : ce(a)) === "object" && a.postcssPlugin)
        n.push(a);
      else if (typeof a == "function")
        n.push(a);
      else if ((typeof a > "u" ? "undefined" : ce(a)) === "object" && (a.parse || a.stringify)) {
        if (process.env.NODE_ENV !== "production")
          throw new Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.");
      } else
        throw new Error(a + " is not a PostCSS plugin");
    }
    return n;
  }, r.process = function(t, n) {
    return n === void 0 && (n = {}), !this.plugins.length && !n.parser && !n.stringifier && !n.syntax ? new xv(this, t, n) : new Cv(this, t, n);
  }, r.use = function(t) {
    return this.plugins = this.plugins.concat(this.normalize([
      t
    ])), this;
  }, e;
})(), Iv = Dn;
Dn.default = Dn;
Ev.registerProcessor(Dn);
kv.registerProcessor(Dn);
var Ov = ds, Av = Zl, Rv = ps, Tv = ya, Nv = hs, Mv = Kn, Pv = _a;
function Fn(e, r) {
  if (Array.isArray(e)) return e.map(function(u) {
    return Fn(u);
  });
  var i = e.inputs, t = Tn(e, [
    "inputs"
  ]);
  if (i) {
    r = [];
    for (var n = W(i), s; !(s = n()).done; ) {
      var o = s.value, a = we({}, o, {
        __proto__: Nv.prototype
      });
      a.map && (a.map = we({}, a.map, {
        __proto__: Av.prototype
      })), r.push(a);
    }
  }
  if (t.nodes && (t.nodes = e.nodes.map(function(u) {
    return Fn(u, r);
  })), t.source) {
    var c = t.source, l = c.inputId, f = Tn(c, [
      "inputId"
    ]);
    t.source = f, l != null && (t.source.input = r[l]);
  }
  if (t.type === "root")
    return new Mv(t);
  if (t.type === "decl")
    return new Ov(t);
  if (t.type === "rule")
    return new Pv(t);
  if (t.type === "comment")
    return new Rv(t);
  if (t.type === "atrule")
    return new Tv(t);
  throw new Error("Unknown node type: " + e.type);
}
var Lv = Fn;
Fn.default = Fn;
var $v = ha, Cu = ds, Dv = xu, Fv = Tr, wa = Iv, jv = us, Uv = Lv, ku = ga, Bv = vu, Eu = ps, Iu = ya, Wv = ma, zv = hs, Gv = ba, Vv = bu, Ou = _a, Au = Kn, qv = fs;
function ke() {
  for (var e = arguments.length, r = new Array(e), i = 0; i < e; i++)
    r[i] = arguments[i];
  return r.length === 1 && Array.isArray(r[0]) && (r = r[0]), new wa(r);
}
ke.plugin = function(r, i) {
  var t = !1;
  function n() {
    for (var o = arguments.length, a = new Array(o), c = 0; c < o; c++)
      a[c] = arguments[c];
    console && console.warn && !t && (t = !0, console.warn(r + `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`), process.env.LANG && process.env.LANG.startsWith("cn") && console.warn(r + `: 里面 postcss.plugin 被弃用. 迁移指南:
https://www.w3ctech.com/topic/2226`));
    var l = i.apply(void 0, [].concat(a));
    return l.postcssPlugin = r, l.postcssVersion = new wa().version, l;
  }
  var s;
  return Object.defineProperty(n, "postcss", {
    get: function() {
      return s || (s = n()), s;
    }
  }), n.process = function(o, a, c) {
    return ke([
      n(c)
    ]).process(o, a);
  }, n;
};
ke.stringify = jv;
ke.parse = Gv;
ke.fromJSON = Uv;
ke.list = Vv;
ke.comment = function(e) {
  return new Eu(e);
};
ke.atRule = function(e) {
  return new Iu(e);
};
ke.decl = function(e) {
  return new Cu(e);
};
ke.rule = function(e) {
  return new Ou(e);
};
ke.root = function(e) {
  return new Au(e);
};
ke.document = function(e) {
  return new ku(e);
};
ke.CssSyntaxError = $v;
ke.Declaration = Cu;
ke.Container = Fv;
ke.Processor = wa;
ke.Document = ku;
ke.Comment = Eu;
ke.Warning = Bv;
ke.AtRule = Iu;
ke.Result = Wv;
ke.Input = zv;
ke.Rule = Ou;
ke.Root = Au;
ke.Node = qv;
Dv.registerPostcss(ke);
var Hv = ke;
ke.default = ke;
var Ue = /* @__PURE__ */ ip(Hv);
Ue.stringify;
Ue.fromJSON;
Ue.plugin;
Ue.parse;
Ue.list;
Ue.document;
Ue.comment;
Ue.atRule;
Ue.rule;
Ue.decl;
Ue.root;
Ue.CssSyntaxError;
Ue.Declaration;
Ue.Container;
Ue.Processor;
Ue.Document;
Ue.Comment;
Ue.Warning;
Ue.AtRule;
Ue.Result;
Ue.Input;
Ue.Rule;
Ue.Root;
Ue.Node;
var Yv = Object.defineProperty, Kv = function(e, r, i) {
  return r in e ? Yv(e, r, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
  }) : e[r] = i;
}, Tt = function(e, r, i) {
  return Kv(e, (typeof r > "u" ? "undefined" : ce(r)) !== "symbol" ? r + "" : r, i);
};
function Jv(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Xv(e) {
  if (e.__esModule) return e;
  var r = e.default;
  if (typeof r == "function") {
    var i = function t() {
      return te(this, t) ? Reflect.construct(r, arguments, this.constructor) : r.apply(this, arguments);
    };
    i.prototype = r.prototype;
  } else i = {};
  return Object.defineProperty(i, "__esModule", {
    value: !0
  }), Object.keys(e).forEach(function(t) {
    var n = Object.getOwnPropertyDescriptor(e, t);
    Object.defineProperty(i, t, n.get ? n : {
      enumerable: !0,
      get: function() {
        return e[t];
      }
    });
  }), i;
}
var Sa = {
  exports: {}
}, De = String, Ru = function() {
  return {
    isColorSupported: !1,
    reset: De,
    bold: De,
    dim: De,
    italic: De,
    underline: De,
    inverse: De,
    hidden: De,
    strikethrough: De,
    black: De,
    red: De,
    green: De,
    yellow: De,
    blue: De,
    magenta: De,
    cyan: De,
    white: De,
    gray: De,
    bgBlack: De,
    bgRed: De,
    bgGreen: De,
    bgYellow: De,
    bgBlue: De,
    bgMagenta: De,
    bgCyan: De,
    bgWhite: De
  };
};
Sa.exports = Ru();
Sa.exports.createColors = Ru;
var Zv = Sa.exports, Qv = {}, eg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qv
}, Symbol.toStringTag, {
  value: "Module"
})), Ze = /* @__PURE__ */ Xv(eg), Pc = Zv, Lc = Ze, Ro = /* @__PURE__ */ (function(e) {
  mt(r, e);
  function r(t, n, s, o, a, c) {
    var l;
    return l = e.call(this, t) || this, l.name = "CssSyntaxError", l.reason = t, a && (l.file = a), o && (l.source = o), c && (l.plugin = c), typeof n < "u" && typeof s < "u" && (typeof n == "number" ? (l.line = n, l.column = s) : (l.line = n.line, l.column = n.column, l.endLine = s.line, l.endColumn = s.column)), l.setMessage(), Error.captureStackTrace && Error.captureStackTrace(l, r), l;
  }
  var i = r.prototype;
  return i.setMessage = function() {
    this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", typeof this.line < "u" && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
  }, i.showSourceCode = function(n) {
    var s = this;
    if (!this.source) return "";
    var o = this.source;
    n == null && (n = Pc.isColorSupported), Lc && n && (o = Lc(o));
    var a = o.split(/\r?\n/), c = Math.max(this.line - 3, 0), l = Math.min(this.line + 2, a.length), f = String(l).length, u, d;
    if (n) {
      var v = Pc.createColors(!0), p = v.bold, _ = v.gray, m = v.red;
      u = function(y) {
        return p(m(y));
      }, d = function(y) {
        return _(y);
      };
    } else
      u = d = function(y) {
        return y;
      };
    return a.slice(c, l).map(function(y, b) {
      var S = c + 1 + b, E = " " + (" " + S).slice(-f) + " | ";
      if (S === s.line) {
        var C = d(E.replace(/\d/g, " ")) + y.slice(0, s.column - 1).replace(/[^\t]/g, " ");
        return u(">") + d(E) + y + `
 ` + C + u("^");
      }
      return " " + d(E) + y;
    }).join(`
`);
  }, i.toString = function() {
    var n = this.showSourceCode();
    return n && (n = `

` + n + `
`), this.name + ": " + this.message + n;
  }, r;
})($i(Error)), xa = Ro;
Ro.default = Ro;
var _r = {};
_r.isClean = Symbol("isClean");
_r.my = Symbol("my");
var $c = {
  after: `
`,
  beforeClose: `
`,
  beforeComment: `
`,
  beforeDecl: `
`,
  beforeOpen: " ",
  beforeRule: `
`,
  colon: ": ",
  commentLeft: " ",
  commentRight: " ",
  emptyBody: "",
  indent: "    ",
  semicolon: !1
};
function tg(e) {
  return e[0].toUpperCase() + e.slice(1);
}
var To = /* @__PURE__ */ (function() {
  function e(i) {
    this.builder = i;
  }
  var r = e.prototype;
  return r.atrule = function(t, n) {
    var s = "@" + t.name, o = t.params ? this.rawValue(t, "params") : "";
    if (typeof t.raws.afterName < "u" ? s += t.raws.afterName : o && (s += " "), t.nodes)
      this.block(t, s + o);
    else {
      var a = (t.raws.between || "") + (n ? ";" : "");
      this.builder(s + o + a, t);
    }
  }, r.beforeAfter = function(t, n) {
    var s;
    t.type === "decl" ? s = this.raw(t, null, "beforeDecl") : t.type === "comment" ? s = this.raw(t, null, "beforeComment") : n === "before" ? s = this.raw(t, null, "beforeRule") : s = this.raw(t, null, "beforeClose");
    for (var o = t.parent, a = 0; o && o.type !== "root"; )
      a += 1, o = o.parent;
    if (s.includes(`
`)) {
      var c = this.raw(t, null, "indent");
      if (c.length)
        for (var l = 0; l < a; l++) s += c;
    }
    return s;
  }, r.block = function(t, n) {
    var s = this.raw(t, "between", "beforeOpen");
    this.builder(n + s + "{", t, "start");
    var o;
    t.nodes && t.nodes.length ? (this.body(t), o = this.raw(t, "after")) : o = this.raw(t, "after", "emptyBody"), o && this.builder(o), this.builder("}", t, "end");
  }, r.body = function(t) {
    for (var n = t.nodes.length - 1; n > 0 && t.nodes[n].type === "comment"; )
      n -= 1;
    for (var s = this.raw(t, "semicolon"), o = 0; o < t.nodes.length; o++) {
      var a = t.nodes[o], c = this.raw(a, "before");
      c && this.builder(c), this.stringify(a, n !== o || s);
    }
  }, r.comment = function(t) {
    var n = this.raw(t, "left", "commentLeft"), s = this.raw(t, "right", "commentRight");
    this.builder("/*" + n + t.text + s + "*/", t);
  }, r.decl = function(t, n) {
    var s = this.raw(t, "between", "colon"), o = t.prop + s + this.rawValue(t, "value");
    t.important && (o += t.raws.important || " !important"), n && (o += ";"), this.builder(o, t);
  }, r.document = function(t) {
    this.body(t);
  }, r.raw = function(t, n, s) {
    var o;
    if (s || (s = n), n && (o = t.raws[n], typeof o < "u"))
      return o;
    var a = t.parent;
    if (s === "before" && (!a || a.type === "root" && a.first === t || a && a.type === "document"))
      return "";
    if (!a) return $c[s];
    var c = t.root();
    if (c.rawCache || (c.rawCache = {}), typeof c.rawCache[s] < "u")
      return c.rawCache[s];
    if (s === "before" || s === "after")
      return this.beforeAfter(t, s);
    var l = "raw" + tg(s);
    return this[l] ? o = this[l](c, t) : c.walk(function(f) {
      if (o = f.raws[n], typeof o < "u") return !1;
    }), typeof o > "u" && (o = $c[s]), c.rawCache[s] = o, o;
  }, r.rawBeforeClose = function(t) {
    var n;
    return t.walk(function(s) {
      if (s.nodes && s.nodes.length > 0 && typeof s.raws.after < "u")
        return n = s.raws.after, n.includes(`
`) && (n = n.replace(/[^\n]+$/, "")), !1;
    }), n && (n = n.replace(/\S/g, "")), n;
  }, r.rawBeforeComment = function(t, n) {
    var s;
    return t.walkComments(function(o) {
      if (typeof o.raws.before < "u")
        return s = o.raws.before, s.includes(`
`) && (s = s.replace(/[^\n]+$/, "")), !1;
    }), typeof s > "u" ? s = this.raw(n, null, "beforeDecl") : s && (s = s.replace(/\S/g, "")), s;
  }, r.rawBeforeDecl = function(t, n) {
    var s;
    return t.walkDecls(function(o) {
      if (typeof o.raws.before < "u")
        return s = o.raws.before, s.includes(`
`) && (s = s.replace(/[^\n]+$/, "")), !1;
    }), typeof s > "u" ? s = this.raw(n, null, "beforeRule") : s && (s = s.replace(/\S/g, "")), s;
  }, r.rawBeforeOpen = function(t) {
    var n;
    return t.walk(function(s) {
      if (s.type !== "decl" && (n = s.raws.between, typeof n < "u"))
        return !1;
    }), n;
  }, r.rawBeforeRule = function(t) {
    var n;
    return t.walk(function(s) {
      if (s.nodes && (s.parent !== t || t.first !== s) && typeof s.raws.before < "u")
        return n = s.raws.before, n.includes(`
`) && (n = n.replace(/[^\n]+$/, "")), !1;
    }), n && (n = n.replace(/\S/g, "")), n;
  }, r.rawColon = function(t) {
    var n;
    return t.walkDecls(function(s) {
      if (typeof s.raws.between < "u")
        return n = s.raws.between.replace(/[^\s:]/g, ""), !1;
    }), n;
  }, r.rawEmptyBody = function(t) {
    var n;
    return t.walk(function(s) {
      if (s.nodes && s.nodes.length === 0 && (n = s.raws.after, typeof n < "u"))
        return !1;
    }), n;
  }, r.rawIndent = function(t) {
    if (t.raws.indent) return t.raws.indent;
    var n;
    return t.walk(function(s) {
      var o = s.parent;
      if (o && o !== t && o.parent && o.parent === t && typeof s.raws.before < "u") {
        var a = s.raws.before.split(`
`);
        return n = a[a.length - 1], n = n.replace(/\S/g, ""), !1;
      }
    }), n;
  }, r.rawSemicolon = function(t) {
    var n;
    return t.walk(function(s) {
      if (s.nodes && s.nodes.length && s.last.type === "decl" && (n = s.raws.semicolon, typeof n < "u"))
        return !1;
    }), n;
  }, r.rawValue = function(t, n) {
    var s = t[n], o = t.raws[n];
    return o && o.value === s ? o.raw : s;
  }, r.root = function(t) {
    this.body(t), t.raws.after && this.builder(t.raws.after);
  }, r.rule = function(t) {
    this.block(t, this.rawValue(t, "selector")), t.raws.ownSemicolon && this.builder(t.raws.ownSemicolon, t, "end");
  }, r.stringify = function(t, n) {
    if (!this[t.type])
      throw new Error("Unknown AST node type " + t.type + ". Maybe you need to change PostCSS stringifier.");
    this[t.type](t, n);
  }, e;
})(), Tu = To;
To.default = To;
var rg = Tu;
function No(e, r) {
  var i = new rg(r);
  i.stringify(e);
}
var vs = No;
No.default = No;
var vi = _r.isClean, ng = _r.my, ig = xa, sg = Tu, og = vs;
function Mo(e, r) {
  var i = new e.constructor();
  for (var t in e)
    if (Object.prototype.hasOwnProperty.call(e, t) && t !== "proxyCache") {
      var n = e[t], s = typeof n > "u" ? "undefined" : ce(n);
      t === "parent" && s === "object" ? r && (i[t] = r) : t === "source" ? i[t] = n : Array.isArray(n) ? i[t] = n.map(function(o) {
        return Mo(o, i);
      }) : (s === "object" && n !== null && (n = Mo(n)), i[t] = n);
    }
  return i;
}
var Po = /* @__PURE__ */ (function() {
  function e(i) {
    i === void 0 && (i = {}), this.raws = {}, this[vi] = !1, this[ng] = !0;
    for (var t in i)
      if (t === "nodes") {
        this.nodes = [];
        for (var n = W(i[t]), s; !(s = n()).done; ) {
          var o = s.value;
          typeof o.clone == "function" ? this.append(o.clone()) : this.append(o);
        }
      } else
        this[t] = i[t];
  }
  var r = e.prototype;
  return r.addToError = function(t) {
    if (t.postcssNode = this, t.stack && this.source && /\n\s{4}at /.test(t.stack)) {
      var n = this.source;
      t.stack = t.stack.replace(/\n\s{4}at /, "$&" + n.input.from + ":" + n.start.line + ":" + n.start.column + "$&");
    }
    return t;
  }, r.after = function(t) {
    return this.parent.insertAfter(this, t), this;
  }, r.assign = function(t) {
    t === void 0 && (t = {});
    for (var n in t)
      this[n] = t[n];
    return this;
  }, r.before = function(t) {
    return this.parent.insertBefore(this, t), this;
  }, r.cleanRaws = function(t) {
    delete this.raws.before, delete this.raws.after, t || delete this.raws.between;
  }, r.clone = function(t) {
    t === void 0 && (t = {});
    var n = Mo(this);
    for (var s in t)
      n[s] = t[s];
    return n;
  }, r.cloneAfter = function(t) {
    t === void 0 && (t = {});
    var n = this.clone(t);
    return this.parent.insertAfter(this, n), n;
  }, r.cloneBefore = function(t) {
    t === void 0 && (t = {});
    var n = this.clone(t);
    return this.parent.insertBefore(this, n), n;
  }, r.error = function(t, n) {
    if (n === void 0 && (n = {}), this.source) {
      var s = this.rangeBy(n), o = s.end, a = s.start;
      return this.source.input.error(t, {
        column: a.column,
        line: a.line
      }, {
        column: o.column,
        line: o.line
      }, n);
    }
    return new ig(t);
  }, r.getProxyProcessor = function() {
    return {
      get: function(n, s) {
        return s === "proxyOf" ? n : s === "root" ? function() {
          return n.root().toProxy();
        } : n[s];
      },
      set: function(n, s, o) {
        return n[s] === o || (n[s] = o, (s === "prop" || s === "value" || s === "name" || s === "params" || s === "important" || /* c8 ignore next */
        s === "text") && n.markDirty()), !0;
      }
    };
  }, r.markDirty = function() {
    if (this[vi]) {
      this[vi] = !1;
      for (var t = this; t = t.parent; )
        t[vi] = !1;
    }
  }, r.next = function() {
    if (this.parent) {
      var t = this.parent.index(this);
      return this.parent.nodes[t + 1];
    }
  }, r.positionBy = function(t, n) {
    var s = this.source.start;
    if (t.index)
      s = this.positionInside(t.index, n);
    else if (t.word) {
      n = this.toString();
      var o = n.indexOf(t.word);
      o !== -1 && (s = this.positionInside(o, n));
    }
    return s;
  }, r.positionInside = function(t, n) {
    for (var s = n || this.toString(), o = this.source.start.column, a = this.source.start.line, c = 0; c < t; c++)
      s[c] === `
` ? (o = 1, a += 1) : o += 1;
    return {
      column: o,
      line: a
    };
  }, r.prev = function() {
    if (this.parent) {
      var t = this.parent.index(this);
      return this.parent.nodes[t - 1];
    }
  }, r.rangeBy = function(t) {
    var n = {
      column: this.source.start.column,
      line: this.source.start.line
    }, s = this.source.end ? {
      column: this.source.end.column + 1,
      line: this.source.end.line
    } : {
      column: n.column + 1,
      line: n.line
    };
    if (t.word) {
      var o = this.toString(), a = o.indexOf(t.word);
      a !== -1 && (n = this.positionInside(a, o), s = this.positionInside(a + t.word.length, o));
    } else
      t.start ? n = {
        column: t.start.column,
        line: t.start.line
      } : t.index && (n = this.positionInside(t.index)), t.end ? s = {
        column: t.end.column,
        line: t.end.line
      } : typeof t.endIndex == "number" ? s = this.positionInside(t.endIndex) : t.index && (s = this.positionInside(t.index + 1));
    return (s.line < n.line || s.line === n.line && s.column <= n.column) && (s = {
      column: n.column + 1,
      line: n.line
    }), {
      end: s,
      start: n
    };
  }, r.raw = function(t, n) {
    var s = new sg();
    return s.raw(this, t, n);
  }, r.remove = function() {
    return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
  }, r.replaceWith = function() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    if (this.parent) {
      for (var o = this, a = !1, c = W(n), l; !(l = c()).done; ) {
        var f = l.value;
        f === this ? a = !0 : a ? (this.parent.insertAfter(o, f), o = f) : this.parent.insertBefore(o, f);
      }
      a || this.remove();
    }
    return this;
  }, r.root = function() {
    for (var t = this; t.parent && t.parent.type !== "document"; )
      t = t.parent;
    return t;
  }, r.toJSON = function(t, n) {
    var s = {}, o = n == null;
    n = n || /* @__PURE__ */ new Map();
    var a = 0;
    for (var c in this)
      if (Object.prototype.hasOwnProperty.call(this, c) && !(c === "parent" || c === "proxyCache")) {
        var l = this[c];
        if (Array.isArray(l))
          s[c] = l.map(function(u) {
            return (typeof u > "u" ? "undefined" : ce(u)) === "object" && u.toJSON ? u.toJSON(null, n) : u;
          });
        else if ((typeof l > "u" ? "undefined" : ce(l)) === "object" && l.toJSON)
          s[c] = l.toJSON(null, n);
        else if (c === "source") {
          var f = n.get(l.input);
          f == null && (f = a, n.set(l.input, a), a++), s[c] = {
            end: l.end,
            inputId: f,
            start: l.start
          };
        } else
          s[c] = l;
      }
    return o && (s.inputs = [].concat(n.keys()).map(function(u) {
      return u.toJSON();
    })), s;
  }, r.toProxy = function() {
    return this.proxyCache || (this.proxyCache = new Proxy(this, this.getProxyProcessor())), this.proxyCache;
  }, r.toString = function(t) {
    t === void 0 && (t = og), t.stringify && (t = t.stringify);
    var n = "";
    return t(this, function(s) {
      n += s;
    }), n;
  }, r.warn = function(t, n, s) {
    var o = {
      node: this
    };
    for (var a in s) o[a] = s[a];
    return t.warn(n, o);
  }, dt(e, [
    {
      key: "proxyOf",
      get: function() {
        return this;
      }
    }
  ]), e;
})(), gs = Po;
Po.default = Po;
var ag = gs, Lo = /* @__PURE__ */ (function(e) {
  mt(r, e);
  function r(i) {
    var t;
    return i && typeof i.value < "u" && typeof i.value != "string" && (i = we({}, i, {
      value: String(i.value)
    })), t = e.call(this, i) || this, t.type = "decl", t;
  }
  return dt(r, [
    {
      key: "variable",
      get: function() {
        return this.prop.startsWith("--") || this.prop[0] === "$";
      }
    }
  ]), r;
})(ag), ms = Lo;
Lo.default = Lo;
var cg = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", lg = function(e) {
  e === void 0 && (e = 21);
  for (var r = "", i = e; i--; )
    r += cg[Math.random() * 64 | 0];
  return r;
}, ug = {
  nanoid: lg
}, Dc = Ze.SourceMapConsumer, Fc = Ze.SourceMapGenerator, fg = Ze.existsSync, dg = Ze.readFileSync, Ds = Ze.dirname, hg = Ze.join;
function pg(e) {
  return Buffer ? Buffer.from(e, "base64").toString() : window.atob(e);
}
var $o = /* @__PURE__ */ (function() {
  function e(i, t) {
    if (t.map !== !1) {
      this.loadAnnotation(i), this.inline = this.startWith(this.annotation, "data:");
      var n = t.map ? t.map.prev : void 0, s = this.loadMap(t.from, n);
      !this.mapFile && t.from && (this.mapFile = t.from), this.mapFile && (this.root = Ds(this.mapFile)), s && (this.text = s);
    }
  }
  var r = e.prototype;
  return r.consumer = function() {
    return this.consumerCache || (this.consumerCache = new Dc(this.text)), this.consumerCache;
  }, r.decodeInline = function(t) {
    var n = /^data:application\/json;charset=utf-?8;base64,/, s = /^data:application\/json;base64,/, o = /^data:application\/json;charset=utf-?8,/, a = /^data:application\/json,/;
    if (o.test(t) || a.test(t))
      return decodeURIComponent(t.substr(RegExp.lastMatch.length));
    if (n.test(t) || s.test(t))
      return pg(t.substr(RegExp.lastMatch.length));
    var c = t.match(/data:application\/json;([^,]+),/)[1];
    throw new Error("Unsupported source map encoding " + c);
  }, r.getAnnotationURL = function(t) {
    return t.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
  }, r.isMap = function(t) {
    return (typeof t > "u" ? "undefined" : ce(t)) !== "object" ? !1 : typeof t.mappings == "string" || typeof t._mappings == "string" || Array.isArray(t.sections);
  }, r.loadAnnotation = function(t) {
    var n = t.match(/\/\*\s*# sourceMappingURL=/gm);
    if (n) {
      var s = t.lastIndexOf(n.pop()), o = t.indexOf("*/", s);
      s > -1 && o > -1 && (this.annotation = this.getAnnotationURL(t.substring(s, o)));
    }
  }, r.loadFile = function(t) {
    if (this.root = Ds(t), fg(t))
      return this.mapFile = t, dg(t, "utf-8").toString().trim();
  }, r.loadMap = function(t, n) {
    if (n === !1) return !1;
    if (n) {
      if (typeof n == "string")
        return n;
      if (typeof n == "function") {
        var s = n(t);
        if (s) {
          var o = this.loadFile(s);
          if (!o)
            throw new Error("Unable to load previous source map: " + s.toString());
          return o;
        }
      } else {
        if (te(n, Dc))
          return Fc.fromSourceMap(n).toString();
        if (te(n, Fc))
          return n.toString();
        if (this.isMap(n))
          return JSON.stringify(n);
        throw new Error("Unsupported previous source map format: " + n.toString());
      }
    } else {
      if (this.inline)
        return this.decodeInline(this.annotation);
      if (this.annotation) {
        var a = this.annotation;
        return t && (a = hg(Ds(t), a)), this.loadFile(a);
      }
    }
  }, r.startWith = function(t, n) {
    return t ? t.substr(0, n.length) === n : !1;
  }, r.withContent = function() {
    return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
  }, e;
})(), Nu = $o;
$o.default = $o;
var vg = Ze.SourceMapConsumer, gg = Ze.SourceMapGenerator, jc = Ze.fileURLToPath, gi = Ze.pathToFileURL, Do = Ze.isAbsolute, Fo = Ze.resolve, mg = ug.nanoid, Fs = Ze, Uc = xa, yg = Nu, js = Symbol("fromOffsetCache"), _g = !!(vg && gg), Bc = !!(Fo && Do), Vi = /* @__PURE__ */ (function() {
  function e(i, t) {
    if (t === void 0 && (t = {}), i === null || typeof i > "u" || (typeof i > "u" ? "undefined" : ce(i)) === "object" && !i.toString)
      throw new Error("PostCSS received " + i + " instead of CSS string");
    if (this.css = i.toString(), this.css[0] === "\uFEFF" || this.css[0] === "￾" ? (this.hasBOM = !0, this.css = this.css.slice(1)) : this.hasBOM = !1, t.from && (!Bc || /^\w+:\/\//.test(t.from) || Do(t.from) ? this.file = t.from : this.file = Fo(t.from)), Bc && _g) {
      var n = new yg(this.css, t);
      if (n.text) {
        this.map = n;
        var s = n.consumer().file;
        !this.file && s && (this.file = this.mapResolve(s));
      }
    }
    this.file || (this.id = "<input css " + mg(6) + ">"), this.map && (this.map.file = this.from);
  }
  var r = e.prototype;
  return r.error = function(t, n, s, o) {
    o === void 0 && (o = {});
    var a, c, l;
    if (n && (typeof n > "u" ? "undefined" : ce(n)) === "object") {
      var f = n, u = s;
      if (typeof f.offset == "number") {
        var d = this.fromOffset(f.offset);
        n = d.line, s = d.col;
      } else
        n = f.line, s = f.column;
      if (typeof u.offset == "number") {
        var v = this.fromOffset(u.offset);
        c = v.line, l = v.col;
      } else
        c = u.line, l = u.column;
    } else if (!s) {
      var p = this.fromOffset(n);
      n = p.line, s = p.col;
    }
    var _ = this.origin(n, s, c, l);
    return _ ? a = new Uc(t, _.endLine === void 0 ? _.line : {
      column: _.column,
      line: _.line
    }, _.endLine === void 0 ? _.column : {
      column: _.endColumn,
      line: _.endLine
    }, _.source, _.file, o.plugin) : a = new Uc(t, c === void 0 ? n : {
      column: s,
      line: n
    }, c === void 0 ? s : {
      column: l,
      line: c
    }, this.css, this.file, o.plugin), a.input = {
      column: s,
      endColumn: l,
      endLine: c,
      line: n,
      source: this.css
    }, this.file && (gi && (a.input.url = gi(this.file).toString()), a.input.file = this.file), a;
  }, r.fromOffset = function(t) {
    var n, s;
    if (this[js])
      s = this[js];
    else {
      var o = this.css.split(`
`);
      s = new Array(o.length);
      for (var a = 0, c = 0, l = o.length; c < l; c++)
        s[c] = a, a += o[c].length + 1;
      this[js] = s;
    }
    n = s[s.length - 1];
    var f = 0;
    if (t >= n)
      f = s.length - 1;
    else
      for (var u = s.length - 2, d; f < u; )
        if (d = f + (u - f >> 1), t < s[d])
          u = d - 1;
        else if (t >= s[d + 1])
          f = d + 1;
        else {
          f = d;
          break;
        }
    return {
      col: t - s[f] + 1,
      line: f + 1
    };
  }, r.mapResolve = function(t) {
    return /^\w+:\/\//.test(t) ? t : Fo(this.map.consumer().sourceRoot || this.map.root || ".", t);
  }, r.origin = function(t, n, s, o) {
    if (!this.map) return !1;
    var a = this.map.consumer(), c = a.originalPositionFor({
      column: n,
      line: t
    });
    if (!c.source) return !1;
    var l;
    typeof s == "number" && (l = a.originalPositionFor({
      column: o,
      line: s
    }));
    var f;
    Do(c.source) ? f = gi(c.source) : f = new URL(c.source, this.map.consumer().sourceRoot || gi(this.map.mapFile));
    var u = {
      column: c.column,
      endColumn: l && l.column,
      endLine: l && l.line,
      line: c.line,
      url: f.toString()
    };
    if (f.protocol === "file:")
      if (jc)
        u.file = jc(f);
      else
        throw new Error("file: protocol is not available in this PostCSS build");
    var d = a.sourceContentFor(c.source);
    return d && (u.source = d), u;
  }, r.toJSON = function() {
    for (var t = {}, n = 0, s = [
      "hasBOM",
      "css",
      "file",
      "id"
    ]; n < s.length; n++) {
      var o = s[n];
      this[o] != null && (t[o] = this[o]);
    }
    return this.map && (t.map = we({}, this.map), t.map.consumerCache && (t.map.consumerCache = void 0)), t;
  }, dt(e, [
    {
      key: "from",
      get: function() {
        return this.file || this.id;
      }
    }
  ]), e;
})(), ys = Vi;
Vi.default = Vi;
Fs && Fs.registerInput && Fs.registerInput(Vi);
var Mu = Ze.SourceMapConsumer, Ni = Ze.SourceMapGenerator, Mi = Ze.dirname, Pu = Ze.relative, Lu = Ze.resolve, $u = Ze.sep, Wc = Ze.pathToFileURL, bg = ys, wg = !!(Mu && Ni), Sg = !!(Mi && Lu && Pu && $u), xg = /* @__PURE__ */ (function() {
  function e(i, t, n, s) {
    this.stringify = i, this.mapOpts = n.map || {}, this.root = t, this.opts = n, this.css = s, this.originalCSS = s, this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute, this.memoizedFileURLs = /* @__PURE__ */ new Map(), this.memoizedPaths = /* @__PURE__ */ new Map(), this.memoizedURLs = /* @__PURE__ */ new Map();
  }
  var r = e.prototype;
  return r.addAnnotation = function() {
    var t;
    this.isInline() ? t = "data:application/json;base64," + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == "string" ? t = this.mapOpts.annotation : typeof this.mapOpts.annotation == "function" ? t = this.mapOpts.annotation(this.opts.to, this.root) : t = this.outputFile() + ".map";
    var n = `
`;
    this.css.includes(`\r
`) && (n = `\r
`), this.css += n + "/*# sourceMappingURL=" + t + " */";
  }, r.applyPrevMaps = function() {
    for (var t = W(this.previous()), n; !(n = t()).done; ) {
      var s = n.value, o = this.toUrl(this.path(s.file)), a = s.root || Mi(s.file), c = void 0;
      this.mapOpts.sourcesContent === !1 ? (c = new Mu(s.text), c.sourcesContent && (c.sourcesContent = null)) : c = s.consumer(), this.map.applySourceMap(c, o, this.toUrl(this.path(a)));
    }
  }, r.clearAnnotation = function() {
    if (this.mapOpts.annotation !== !1)
      if (this.root)
        for (var t, n = this.root.nodes.length - 1; n >= 0; n--)
          t = this.root.nodes[n], t.type === "comment" && t.text.indexOf("# sourceMappingURL=") === 0 && this.root.removeChild(n);
      else this.css && (this.css = this.css.replace(/\n*?\/\*#[\S\s]*?\*\/$/gm, ""));
  }, r.generate = function() {
    if (this.clearAnnotation(), Sg && wg && this.isMap())
      return this.generateMap();
    var t = "";
    return this.stringify(this.root, function(n) {
      t += n;
    }), [
      t
    ];
  }, r.generateMap = function() {
    if (this.root)
      this.generateString();
    else if (this.previous().length === 1) {
      var t = this.previous()[0].consumer();
      t.file = this.outputFile(), this.map = Ni.fromSourceMap(t, {
        ignoreInvalidMapping: !0
      });
    } else
      this.map = new Ni({
        file: this.outputFile(),
        ignoreInvalidMapping: !0
      }), this.map.addMapping({
        generated: {
          column: 0,
          line: 1
        },
        original: {
          column: 0,
          line: 1
        },
        source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
      });
    return this.isSourcesContent() && this.setSourcesContent(), this.root && this.previous().length > 0 && this.applyPrevMaps(), this.isAnnotation() && this.addAnnotation(), this.isInline() ? [
      this.css
    ] : [
      this.css,
      this.map
    ];
  }, r.generateString = function() {
    var t = this;
    this.css = "", this.map = new Ni({
      file: this.outputFile(),
      ignoreInvalidMapping: !0
    });
    var n = 1, s = 1, o = "<no source>", a = {
      generated: {
        column: 0,
        line: 0
      },
      original: {
        column: 0,
        line: 0
      },
      source: ""
    }, c, l;
    this.stringify(this.root, function(f, u, d) {
      if (t.css += f, u && d !== "end" && (a.generated.line = n, a.generated.column = s - 1, u.source && u.source.start ? (a.source = t.sourcePath(u), a.original.line = u.source.start.line, a.original.column = u.source.start.column - 1, t.map.addMapping(a)) : (a.source = o, a.original.line = 1, a.original.column = 0, t.map.addMapping(a))), c = f.match(/\n/g), c ? (n += c.length, l = f.lastIndexOf(`
`), s = f.length - l) : s += f.length, u && d !== "start") {
        var v = u.parent || {
          raws: {}
        }, p = u.type === "decl" || u.type === "atrule" && !u.nodes;
        (!p || u !== v.last || v.raws.semicolon) && (u.source && u.source.end ? (a.source = t.sourcePath(u), a.original.line = u.source.end.line, a.original.column = u.source.end.column - 1, a.generated.line = n, a.generated.column = s - 2, t.map.addMapping(a)) : (a.source = o, a.original.line = 1, a.original.column = 0, a.generated.line = n, a.generated.column = s - 1, t.map.addMapping(a)));
      }
    });
  }, r.isAnnotation = function() {
    return this.isInline() ? !0 : typeof this.mapOpts.annotation < "u" ? this.mapOpts.annotation : this.previous().length ? this.previous().some(function(t) {
      return t.annotation;
    }) : !0;
  }, r.isInline = function() {
    if (typeof this.mapOpts.inline < "u")
      return this.mapOpts.inline;
    var t = this.mapOpts.annotation;
    return typeof t < "u" && t !== !0 ? !1 : this.previous().length ? this.previous().some(function(n) {
      return n.inline;
    }) : !0;
  }, r.isMap = function() {
    return typeof this.opts.map < "u" ? !!this.opts.map : this.previous().length > 0;
  }, r.isSourcesContent = function() {
    return typeof this.mapOpts.sourcesContent < "u" ? this.mapOpts.sourcesContent : this.previous().length ? this.previous().some(function(t) {
      return t.withContent();
    }) : !0;
  }, r.outputFile = function() {
    return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
  }, r.path = function(t) {
    if (this.mapOpts.absolute || t.charCodeAt(0) === 60 || /^\w+:\/\//.test(t)) return t;
    var n = this.memoizedPaths.get(t);
    if (n) return n;
    var s = this.opts.to ? Mi(this.opts.to) : ".";
    typeof this.mapOpts.annotation == "string" && (s = Mi(Lu(s, this.mapOpts.annotation)));
    var o = Pu(s, t);
    return this.memoizedPaths.set(t, o), o;
  }, r.previous = function() {
    var t = this;
    if (!this.previousMaps)
      if (this.previousMaps = [], this.root)
        this.root.walk(function(s) {
          if (s.source && s.source.input.map) {
            var o = s.source.input.map;
            t.previousMaps.includes(o) || t.previousMaps.push(o);
          }
        });
      else {
        var n = new bg(this.originalCSS, this.opts);
        n.map && this.previousMaps.push(n.map);
      }
    return this.previousMaps;
  }, r.setSourcesContent = function() {
    var t = this, n = {};
    if (this.root)
      this.root.walk(function(o) {
        if (o.source) {
          var a = o.source.input.from;
          if (a && !n[a]) {
            n[a] = !0;
            var c = t.usesFileUrls ? t.toFileUrl(a) : t.toUrl(t.path(a));
            t.map.setSourceContent(c, o.source.input.css);
          }
        }
      });
    else if (this.css) {
      var s = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
      this.map.setSourceContent(s, this.css);
    }
  }, r.sourcePath = function(t) {
    return this.mapOpts.from ? this.toUrl(this.mapOpts.from) : this.usesFileUrls ? this.toFileUrl(t.source.input.from) : this.toUrl(this.path(t.source.input.from));
  }, r.toBase64 = function(t) {
    return Buffer ? Buffer.from(t).toString("base64") : window.btoa(unescape(encodeURIComponent(t)));
  }, r.toFileUrl = function(t) {
    var n = this.memoizedFileURLs.get(t);
    if (n) return n;
    if (Wc) {
      var s = Wc(t).toString();
      return this.memoizedFileURLs.set(t, s), s;
    } else
      throw new Error("`map.absolute` option is not available in this PostCSS build");
  }, r.toUrl = function(t) {
    var n = this.memoizedURLs.get(t);
    if (n) return n;
    $u === "\\" && (t = t.replace(/\\/g, "/"));
    var s = encodeURI(t).replace(/[#?]/g, encodeURIComponent);
    return this.memoizedURLs.set(t, s), s;
  }, e;
})(), Du = xg, Cg = gs, jo = /* @__PURE__ */ (function(e) {
  mt(r, e);
  function r(i) {
    var t;
    return t = e.call(this, i) || this, t.type = "comment", t;
  }
  return r;
})(Cg), _s = jo;
jo.default = jo;
var Fu = _r.isClean, ju = _r.my, Uu = ms, Bu = _s, kg = gs, Wu, Ca, ka, zu;
function Gu(e) {
  return e.map(function(r) {
    return r.nodes && (r.nodes = Gu(r.nodes)), delete r.source, r;
  });
}
function Vu(e) {
  if (e[Fu] = !1, e.proxyOf.nodes)
    for (var r = W(e.proxyOf.nodes), i; !(i = r()).done; ) {
      var t = i.value;
      Vu(t);
    }
}
var rr = /* @__PURE__ */ (function(e) {
  mt(r, e);
  function r() {
    return e.apply(this, arguments) || this;
  }
  var i = r.prototype;
  return i.append = function() {
    for (var n = arguments.length, s = new Array(n), o = 0; o < n; o++)
      s[o] = arguments[o];
    for (var a = W(s), c; !(c = a()).done; )
      for (var l = c.value, f = this.normalize(l, this.last), u = W(f), d; !(d = u()).done; ) {
        var v = d.value;
        this.proxyOf.nodes.push(v);
      }
    return this.markDirty(), this;
  }, i.cleanRaws = function(n) {
    if (e.prototype.cleanRaws.call(this, n), this.nodes)
      for (var s = W(this.nodes), o; !(o = s()).done; ) {
        var a = o.value;
        a.cleanRaws(n);
      }
  }, i.each = function(n) {
    if (this.proxyOf.nodes) {
      for (var s = this.getIterator(), o, a; this.indexes[s] < this.proxyOf.nodes.length && (o = this.indexes[s], a = n(this.proxyOf.nodes[o], o), a !== !1); )
        this.indexes[s] += 1;
      return delete this.indexes[s], a;
    }
  }, i.every = function(n) {
    return this.nodes.every(n);
  }, i.getIterator = function() {
    this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach += 1;
    var n = this.lastEach;
    return this.indexes[n] = 0, n;
  }, i.getProxyProcessor = function() {
    return {
      get: function(s, o) {
        return o === "proxyOf" ? s : s[o] ? o === "each" || typeof o == "string" && o.startsWith("walk") ? function() {
          for (var a = arguments.length, c = new Array(a), l = 0; l < a; l++)
            c[l] = arguments[l];
          var f;
          return (f = s)[o].apply(f, [].concat(c.map(function(u) {
            return typeof u == "function" ? function(d, v) {
              return u(d.toProxy(), v);
            } : u;
          })));
        } : o === "every" || o === "some" ? function(a) {
          return s[o](function(c) {
            for (var l = arguments.length, f = new Array(l > 1 ? l - 1 : 0), u = 1; u < l; u++)
              f[u - 1] = arguments[u];
            return a.apply(void 0, [].concat([
              c.toProxy()
            ], f));
          });
        } : o === "root" ? function() {
          return s.root().toProxy();
        } : o === "nodes" ? s.nodes.map(function(a) {
          return a.toProxy();
        }) : o === "first" || o === "last" ? s[o].toProxy() : s[o] : s[o];
      },
      set: function(s, o, a) {
        return s[o] === a || (s[o] = a, (o === "name" || o === "params" || o === "selector") && s.markDirty()), !0;
      }
    };
  }, i.index = function(n) {
    return typeof n == "number" ? n : (n.proxyOf && (n = n.proxyOf), this.proxyOf.nodes.indexOf(n));
  }, i.insertAfter = function(n, s) {
    var o = this.index(n), a = this.normalize(s, this.proxyOf.nodes[o]).reverse();
    o = this.index(n);
    for (var c = W(a), l; !(l = c()).done; ) {
      var f = l.value;
      this.proxyOf.nodes.splice(o + 1, 0, f);
    }
    var u;
    for (var d in this.indexes)
      u = this.indexes[d], o < u && (this.indexes[d] = u + a.length);
    return this.markDirty(), this;
  }, i.insertBefore = function(n, s) {
    var o = this.index(n), a = o === 0 ? "prepend" : !1, c = this.normalize(s, this.proxyOf.nodes[o], a).reverse();
    o = this.index(n);
    for (var l = W(c), f; !(f = l()).done; ) {
      var u = f.value;
      this.proxyOf.nodes.splice(o, 0, u);
    }
    var d;
    for (var v in this.indexes)
      d = this.indexes[v], o <= d && (this.indexes[v] = d + c.length);
    return this.markDirty(), this;
  }, i.normalize = function(n, s) {
    var o = this;
    if (typeof n == "string")
      n = Gu(Wu(n).nodes);
    else if (typeof n > "u")
      n = [];
    else if (Array.isArray(n)) {
      n = n.slice(0);
      for (var a = W(n), c; !(c = a()).done; ) {
        var l = c.value;
        l.parent && l.parent.removeChild(l, "ignore");
      }
    } else if (n.type === "root" && this.type !== "document") {
      n = n.nodes.slice(0);
      for (var f = W(n), u; !(u = f()).done; ) {
        var d = u.value;
        d.parent && d.parent.removeChild(d, "ignore");
      }
    } else if (n.type)
      n = [
        n
      ];
    else if (n.prop) {
      if (typeof n.value > "u")
        throw new Error("Value field is missed in node creation");
      typeof n.value != "string" && (n.value = String(n.value)), n = [
        new Uu(n)
      ];
    } else if (n.selector)
      n = [
        new Ca(n)
      ];
    else if (n.name)
      n = [
        new ka(n)
      ];
    else if (n.text)
      n = [
        new Bu(n)
      ];
    else
      throw new Error("Unknown node type in node creation");
    var v = n.map(function(p) {
      return p[ju] || r.rebuild(p), p = p.proxyOf, p.parent && p.parent.removeChild(p), p[Fu] && Vu(p), typeof p.raws.before > "u" && s && typeof s.raws.before < "u" && (p.raws.before = s.raws.before.replace(/\S/g, "")), p.parent = o.proxyOf, p;
    });
    return v;
  }, i.prepend = function() {
    for (var n = arguments.length, s = new Array(n), o = 0; o < n; o++)
      s[o] = arguments[o];
    s = s.reverse();
    for (var a = W(s), c; !(c = a()).done; ) {
      for (var l = c.value, f = this.normalize(l, this.first, "prepend").reverse(), u = W(f), d; !(d = u()).done; ) {
        var v = d.value;
        this.proxyOf.nodes.unshift(v);
      }
      for (var p in this.indexes)
        this.indexes[p] = this.indexes[p] + f.length;
    }
    return this.markDirty(), this;
  }, i.push = function(n) {
    return n.parent = this, this.proxyOf.nodes.push(n), this;
  }, i.removeAll = function() {
    for (var n = W(this.proxyOf.nodes), s; !(s = n()).done; ) {
      var o = s.value;
      o.parent = void 0;
    }
    return this.proxyOf.nodes = [], this.markDirty(), this;
  }, i.removeChild = function(n) {
    n = this.index(n), this.proxyOf.nodes[n].parent = void 0, this.proxyOf.nodes.splice(n, 1);
    var s;
    for (var o in this.indexes)
      s = this.indexes[o], s >= n && (this.indexes[o] = s - 1);
    return this.markDirty(), this;
  }, i.replaceValues = function(n, s, o) {
    return o || (o = s, s = {}), this.walkDecls(function(a) {
      s.props && !s.props.includes(a.prop) || s.fast && !a.value.includes(s.fast) || (a.value = a.value.replace(n, o));
    }), this.markDirty(), this;
  }, i.some = function(n) {
    return this.nodes.some(n);
  }, i.walk = function(n) {
    return this.each(function(s, o) {
      var a;
      try {
        a = n(s, o);
      } catch (c) {
        throw s.addToError(c);
      }
      return a !== !1 && s.walk && (a = s.walk(n)), a;
    });
  }, i.walkAtRules = function(n, s) {
    return s ? te(n, RegExp) ? this.walk(function(o, a) {
      if (o.type === "atrule" && n.test(o.name))
        return s(o, a);
    }) : this.walk(function(o, a) {
      if (o.type === "atrule" && o.name === n)
        return s(o, a);
    }) : (s = n, this.walk(function(o, a) {
      if (o.type === "atrule")
        return s(o, a);
    }));
  }, i.walkComments = function(n) {
    return this.walk(function(s, o) {
      if (s.type === "comment")
        return n(s, o);
    });
  }, i.walkDecls = function(n, s) {
    return s ? te(n, RegExp) ? this.walk(function(o, a) {
      if (o.type === "decl" && n.test(o.prop))
        return s(o, a);
    }) : this.walk(function(o, a) {
      if (o.type === "decl" && o.prop === n)
        return s(o, a);
    }) : (s = n, this.walk(function(o, a) {
      if (o.type === "decl")
        return s(o, a);
    }));
  }, i.walkRules = function(n, s) {
    return s ? te(n, RegExp) ? this.walk(function(o, a) {
      if (o.type === "rule" && n.test(o.selector))
        return s(o, a);
    }) : this.walk(function(o, a) {
      if (o.type === "rule" && o.selector === n)
        return s(o, a);
    }) : (s = n, this.walk(function(o, a) {
      if (o.type === "rule")
        return s(o, a);
    }));
  }, dt(r, [
    {
      key: "first",
      get: function() {
        if (this.proxyOf.nodes)
          return this.proxyOf.nodes[0];
      }
    },
    {
      key: "last",
      get: function() {
        if (this.proxyOf.nodes)
          return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
      }
    }
  ]), r;
})(kg);
rr.registerParse = function(e) {
  Wu = e;
};
rr.registerRule = function(e) {
  Ca = e;
};
rr.registerAtRule = function(e) {
  ka = e;
};
rr.registerRoot = function(e) {
  zu = e;
};
var Nr = rr;
rr.default = rr;
rr.rebuild = function(e) {
  e.type === "atrule" ? Object.setPrototypeOf(e, ka.prototype) : e.type === "rule" ? Object.setPrototypeOf(e, Ca.prototype) : e.type === "decl" ? Object.setPrototypeOf(e, Uu.prototype) : e.type === "comment" ? Object.setPrototypeOf(e, Bu.prototype) : e.type === "root" && Object.setPrototypeOf(e, zu.prototype), e[ju] = !0, e.nodes && e.nodes.forEach(function(r) {
    rr.rebuild(r);
  });
};
var Eg = Nr, qu, Hu, jn = /* @__PURE__ */ (function(e) {
  mt(r, e);
  function r(t) {
    var n;
    return n = e.call(this, we({
      type: "document"
    }, t)) || this, n.nodes || (n.nodes = []), n;
  }
  var i = r.prototype;
  return i.toResult = function(n) {
    n === void 0 && (n = {});
    var s = new qu(new Hu(), this, n);
    return s.stringify();
  }, r;
})(Eg);
jn.registerLazyResult = function(e) {
  qu = e;
};
jn.registerProcessor = function(e) {
  Hu = e;
};
var Ea = jn;
jn.default = jn;
var zc = {}, Yu = function(r) {
  zc[r] || (zc[r] = !0, typeof console < "u" && console.warn && console.warn(r));
}, Uo = /* @__PURE__ */ (function() {
  function e(i, t) {
    if (t === void 0 && (t = {}), this.type = "warning", this.text = i, t.node && t.node.source) {
      var n = t.node.rangeBy(t);
      this.line = n.start.line, this.column = n.start.column, this.endLine = n.end.line, this.endColumn = n.end.column;
    }
    for (var s in t) this[s] = t[s];
  }
  var r = e.prototype;
  return r.toString = function() {
    return this.node ? this.node.error(this.text, {
      index: this.index,
      plugin: this.plugin,
      word: this.word
    }).message : this.plugin ? this.plugin + ": " + this.text : this.text;
  }, e;
})(), Ku = Uo;
Uo.default = Uo;
var Ig = Ku, Bo = /* @__PURE__ */ (function() {
  function e(i, t, n) {
    this.processor = i, this.messages = [], this.root = t, this.opts = n, this.css = void 0, this.map = void 0;
  }
  var r = e.prototype;
  return r.toString = function() {
    return this.css;
  }, r.warn = function(t, n) {
    n === void 0 && (n = {}), n.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (n.plugin = this.lastPlugin.postcssPlugin);
    var s = new Ig(t, n);
    return this.messages.push(s), s;
  }, r.warnings = function() {
    return this.messages.filter(function(t) {
      return t.type === "warning";
    });
  }, dt(e, [
    {
      key: "content",
      get: function() {
        return this.css;
      }
    }
  ]), e;
})(), Ia = Bo;
Bo.default = Bo;
var Us = 39, Gc = 34, mi = 92, Vc = 47, yi = 10, yn = 32, _i = 12, bi = 9, wi = 13, Og = 91, Ag = 93, Rg = 40, Tg = 41, Ng = 123, Mg = 125, Pg = 59, Lg = 42, $g = 58, Dg = 64, Si = /[\t\n\f\r "#'()/;[\\\]{}]/g, xi = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, Fg = /.[\r\n"'(/\\]/, qc = /[\da-f]/i, jg = function(r, i) {
  i === void 0 && (i = {});
  var t = r.css.valueOf(), n = i.ignoreErrors, s, o, a, c, l, f, u, d, v, p, _ = t.length, m = 0, y = [], b = [];
  function S() {
    return m;
  }
  function E(M) {
    throw r.error("Unclosed " + M, m);
  }
  function C() {
    return b.length === 0 && m >= _;
  }
  function A(M) {
    if (b.length) return b.pop();
    if (!(m >= _)) {
      var D = M ? M.ignoreUnclosed : !1;
      switch (s = t.charCodeAt(m), s) {
        case yi:
        case yn:
        case bi:
        case wi:
        case _i: {
          o = m;
          do
            o += 1, s = t.charCodeAt(o);
          while (s === yn || s === yi || s === bi || s === wi || s === _i);
          p = [
            "space",
            t.slice(m, o)
          ], m = o - 1;
          break;
        }
        case Og:
        case Ag:
        case Ng:
        case Mg:
        case $g:
        case Pg:
        case Tg: {
          var L = String.fromCharCode(s);
          p = [
            L,
            L,
            m
          ];
          break;
        }
        case Rg: {
          if (d = y.length ? y.pop()[1] : "", v = t.charCodeAt(m + 1), d === "url" && v !== Us && v !== Gc && v !== yn && v !== yi && v !== bi && v !== _i && v !== wi) {
            o = m;
            do {
              if (f = !1, o = t.indexOf(")", o + 1), o === -1)
                if (n || D) {
                  o = m;
                  break;
                } else
                  E("bracket");
              for (u = o; t.charCodeAt(u - 1) === mi; )
                u -= 1, f = !f;
            } while (f);
            p = [
              "brackets",
              t.slice(m, o + 1),
              m,
              o
            ], m = o;
          } else
            o = t.indexOf(")", m + 1), c = t.slice(m, o + 1), o === -1 || Fg.test(c) ? p = [
              "(",
              "(",
              m
            ] : (p = [
              "brackets",
              c,
              m,
              o
            ], m = o);
          break;
        }
        case Us:
        case Gc: {
          a = s === Us ? "'" : '"', o = m;
          do {
            if (f = !1, o = t.indexOf(a, o + 1), o === -1)
              if (n || D) {
                o = m + 1;
                break;
              } else
                E("string");
            for (u = o; t.charCodeAt(u - 1) === mi; )
              u -= 1, f = !f;
          } while (f);
          p = [
            "string",
            t.slice(m, o + 1),
            m,
            o
          ], m = o;
          break;
        }
        case Dg: {
          Si.lastIndex = m + 1, Si.test(t), Si.lastIndex === 0 ? o = t.length - 1 : o = Si.lastIndex - 2, p = [
            "at-word",
            t.slice(m, o + 1),
            m,
            o
          ], m = o;
          break;
        }
        case mi: {
          for (o = m, l = !0; t.charCodeAt(o + 1) === mi; )
            o += 1, l = !l;
          if (s = t.charCodeAt(o + 1), l && s !== Vc && s !== yn && s !== yi && s !== bi && s !== wi && s !== _i && (o += 1, qc.test(t.charAt(o)))) {
            for (; qc.test(t.charAt(o + 1)); )
              o += 1;
            t.charCodeAt(o + 1) === yn && (o += 1);
          }
          p = [
            "word",
            t.slice(m, o + 1),
            m,
            o
          ], m = o;
          break;
        }
        default: {
          s === Vc && t.charCodeAt(m + 1) === Lg ? (o = t.indexOf("*/", m + 2) + 1, o === 0 && (n || D ? o = t.length : E("comment")), p = [
            "comment",
            t.slice(m, o + 1),
            m,
            o
          ], m = o) : (xi.lastIndex = m + 1, xi.test(t), xi.lastIndex === 0 ? o = t.length - 1 : o = xi.lastIndex - 2, p = [
            "word",
            t.slice(m, o + 1),
            m,
            o
          ], y.push(p), m = o);
          break;
        }
      }
      return m++, p;
    }
  }
  function I(M) {
    b.push(M);
  }
  return {
    back: I,
    endOfFile: C,
    nextToken: A,
    position: S
  };
}, Ju = Nr, qi = /* @__PURE__ */ (function(e) {
  mt(r, e);
  function r(t) {
    var n;
    return n = e.call(this, t) || this, n.type = "atrule", n;
  }
  var i = r.prototype;
  return i.append = function() {
    for (var n = arguments.length, s = new Array(n), o = 0; o < n; o++)
      s[o] = arguments[o];
    var a;
    return this.proxyOf.nodes || (this.nodes = []), (a = e.prototype.append).call.apply(a, [].concat([
      this
    ], s));
  }, i.prepend = function() {
    for (var n = arguments.length, s = new Array(n), o = 0; o < n; o++)
      s[o] = arguments[o];
    var a;
    return this.proxyOf.nodes || (this.nodes = []), (a = e.prototype.prepend).call.apply(a, [].concat([
      this
    ], s));
  }, r;
})(Ju), Oa = qi;
qi.default = qi;
Ju.registerAtRule(qi);
var Xu = Nr, Zu, Qu, Zr = /* @__PURE__ */ (function(e) {
  mt(r, e);
  function r(t) {
    var n;
    return n = e.call(this, t) || this, n.type = "root", n.nodes || (n.nodes = []), n;
  }
  var i = r.prototype;
  return i.normalize = function(n, s, o) {
    var a = e.prototype.normalize.call(this, n);
    if (s) {
      if (o === "prepend")
        this.nodes.length > 1 ? s.raws.before = this.nodes[1].raws.before : delete s.raws.before;
      else if (this.first !== s)
        for (var c = W(a), l; !(l = c()).done; ) {
          var f = l.value;
          f.raws.before = s.raws.before;
        }
    }
    return a;
  }, i.removeChild = function(n, s) {
    var o = this.index(n);
    return !s && o === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[o].raws.before), e.prototype.removeChild.call(this, n);
  }, i.toResult = function(n) {
    n === void 0 && (n = {});
    var s = new Zu(new Qu(), this, n);
    return s.stringify();
  }, r;
})(Xu);
Zr.registerLazyResult = function(e) {
  Zu = e;
};
Zr.registerProcessor = function(e) {
  Qu = e;
};
var Jn = Zr;
Zr.default = Zr;
Xu.registerRoot(Zr);
var Un = {
  comma: function(r) {
    return Un.split(r, [
      ","
    ], !0);
  },
  space: function(r) {
    var i = [
      " ",
      `
`,
      "	"
    ];
    return Un.split(r, i);
  },
  split: function(r, i, t) {
    for (var n = [], s = "", o = !1, a = 0, c = !1, l = "", f = !1, u = W(r), d; !(d = u()).done; ) {
      var v = d.value;
      f ? f = !1 : v === "\\" ? f = !0 : c ? v === l && (c = !1) : v === '"' || v === "'" ? (c = !0, l = v) : v === "(" ? a += 1 : v === ")" ? a > 0 && (a -= 1) : a === 0 && i.includes(v) && (o = !0), o ? (s !== "" && n.push(s.trim()), s = "", o = !1) : s += v;
    }
    return (t || s !== "") && n.push(s.trim()), n;
  }
}, ef = Un;
Un.default = Un;
var tf = Nr, Ug = ef, Hi = /* @__PURE__ */ (function(e) {
  mt(r, e);
  function r(i) {
    var t;
    return t = e.call(this, i) || this, t.type = "rule", t.nodes || (t.nodes = []), t;
  }
  return dt(r, [
    {
      key: "selectors",
      get: function() {
        return Ug.comma(this.selector);
      },
      set: function(t) {
        var n = this.selector ? this.selector.match(/,\s*/) : null, s = n ? n[0] : "," + this.raw("between", "beforeOpen");
        this.selector = t.join(s);
      }
    }
  ]), r;
})(tf), Aa = Hi;
Hi.default = Hi;
tf.registerRule(Hi);
var Bg = ms, Wg = jg, zg = _s, Gg = Oa, Vg = Jn, Hc = Aa, Yc = {
  empty: !0,
  space: !0
};
function qg(e) {
  for (var r = e.length - 1; r >= 0; r--) {
    var i = e[r], t = i[3] || i[2];
    if (t) return t;
  }
}
var Hg = /* @__PURE__ */ (function() {
  function e(i) {
    this.input = i, this.root = new Vg(), this.current = this.root, this.spaces = "", this.semicolon = !1, this.createTokenizer(), this.root.source = {
      input: i,
      start: {
        column: 1,
        line: 1,
        offset: 0
      }
    };
  }
  var r = e.prototype;
  return r.atrule = function(t) {
    var n = new Gg();
    n.name = t[1].slice(1), n.name === "" && this.unnamedAtrule(n, t), this.init(n, t[2]);
    for (var s, o, a, c = !1, l = !1, f = [], u = []; !this.tokenizer.endOfFile(); ) {
      if (t = this.tokenizer.nextToken(), s = t[0], s === "(" || s === "[" ? u.push(s === "(" ? ")" : "]") : s === "{" && u.length > 0 ? u.push("}") : s === u[u.length - 1] && u.pop(), u.length === 0)
        if (s === ";") {
          n.source.end = this.getPosition(t[2]), n.source.end.offset++, this.semicolon = !0;
          break;
        } else if (s === "{") {
          l = !0;
          break;
        } else if (s === "}") {
          if (f.length > 0) {
            for (a = f.length - 1, o = f[a]; o && o[0] === "space"; )
              o = f[--a];
            o && (n.source.end = this.getPosition(o[3] || o[2]), n.source.end.offset++);
          }
          this.end(t);
          break;
        } else
          f.push(t);
      else
        f.push(t);
      if (this.tokenizer.endOfFile()) {
        c = !0;
        break;
      }
    }
    n.raws.between = this.spacesAndCommentsFromEnd(f), f.length ? (n.raws.afterName = this.spacesAndCommentsFromStart(f), this.raw(n, "params", f), c && (t = f[f.length - 1], n.source.end = this.getPosition(t[3] || t[2]), n.source.end.offset++, this.spaces = n.raws.between, n.raws.between = "")) : (n.raws.afterName = "", n.params = ""), l && (n.nodes = [], this.current = n);
  }, r.checkMissedSemicolon = function(t) {
    var n = this.colon(t);
    if (n !== !1) {
      for (var s = 0, o, a = n - 1; a >= 0 && (o = t[a], !(o[0] !== "space" && (s += 1, s === 2))); a--)
        ;
      throw this.input.error("Missed semicolon", o[0] === "word" ? o[3] + 1 : o[2]);
    }
  }, r.colon = function(t) {
    for (var n = 0, s, o, a, c = W(t.entries()), l; !(l = c()).done; ) {
      var f = l.value, u = f[0], d = f[1];
      if (s = d, o = s[0], o === "(" && (n += 1), o === ")" && (n -= 1), n === 0 && o === ":")
        if (!a)
          this.doubleColon(s);
        else {
          if (a[0] === "word" && a[1] === "progid")
            continue;
          return u;
        }
      a = s;
    }
    return !1;
  }, r.comment = function(t) {
    var n = new zg();
    this.init(n, t[2]), n.source.end = this.getPosition(t[3] || t[2]), n.source.end.offset++;
    var s = t[1].slice(2, -2);
    if (/^\s*$/.test(s))
      n.text = "", n.raws.left = s, n.raws.right = "";
    else {
      var o = s.match(/^(\s*)([^]*\S)(\s*)$/);
      n.text = o[2], n.raws.left = o[1], n.raws.right = o[3];
    }
  }, r.createTokenizer = function() {
    this.tokenizer = Wg(this.input);
  }, r.decl = function(t, n) {
    var s = new Bg();
    this.init(s, t[0][2]);
    var o = t[t.length - 1];
    for (o[0] === ";" && (this.semicolon = !0, t.pop()), s.source.end = this.getPosition(o[3] || o[2] || qg(t)), s.source.end.offset++; t[0][0] !== "word"; )
      t.length === 1 && this.unknownWord(t), s.raws.before += t.shift()[1];
    for (s.source.start = this.getPosition(t[0][2]), s.prop = ""; t.length; ) {
      var a = t[0][0];
      if (a === ":" || a === "space" || a === "comment")
        break;
      s.prop += t.shift()[1];
    }
    s.raws.between = "";
    for (var c; t.length; )
      if (c = t.shift(), c[0] === ":") {
        s.raws.between += c[1];
        break;
      } else
        c[0] === "word" && /\w/.test(c[1]) && this.unknownWord([
          c
        ]), s.raws.between += c[1];
    (s.prop[0] === "_" || s.prop[0] === "*") && (s.raws.before += s.prop[0], s.prop = s.prop.slice(1));
    for (var l = [], f; t.length && (f = t[0][0], !(f !== "space" && f !== "comment")); )
      l.push(t.shift());
    this.precheckMissedSemicolon(t);
    for (var u = t.length - 1; u >= 0; u--) {
      if (c = t[u], c[1].toLowerCase() === "!important") {
        s.important = !0;
        var d = this.stringFrom(t, u);
        d = this.spacesFromEnd(t) + d, d !== " !important" && (s.raws.important = d);
        break;
      } else if (c[1].toLowerCase() === "important") {
        for (var v = t.slice(0), p = "", _ = u; _ > 0; _--) {
          var m = v[_][0];
          if (p.trim().indexOf("!") === 0 && m !== "space")
            break;
          p = v.pop()[1] + p;
        }
        p.trim().indexOf("!") === 0 && (s.important = !0, s.raws.important = p, t = v);
      }
      if (c[0] !== "space" && c[0] !== "comment")
        break;
    }
    var y = t.some(function(b) {
      return b[0] !== "space" && b[0] !== "comment";
    });
    y && (s.raws.between += l.map(function(b) {
      return b[1];
    }).join(""), l = []), this.raw(s, "value", l.concat(t), n), s.value.includes(":") && !n && this.checkMissedSemicolon(t);
  }, r.doubleColon = function(t) {
    throw this.input.error("Double colon", {
      offset: t[2]
    }, {
      offset: t[2] + t[1].length
    });
  }, r.emptyRule = function(t) {
    var n = new Hc();
    this.init(n, t[2]), n.selector = "", n.raws.between = "", this.current = n;
  }, r.end = function(t) {
    this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.semicolon = !1, this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.spaces = "", this.current.parent ? (this.current.source.end = this.getPosition(t[2]), this.current.source.end.offset++, this.current = this.current.parent) : this.unexpectedClose(t);
  }, r.endFile = function() {
    this.current.parent && this.unclosedBlock(), this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.root.source.end = this.getPosition(this.tokenizer.position());
  }, r.freeSemicolon = function(t) {
    if (this.spaces += t[1], this.current.nodes) {
      var n = this.current.nodes[this.current.nodes.length - 1];
      n && n.type === "rule" && !n.raws.ownSemicolon && (n.raws.ownSemicolon = this.spaces, this.spaces = "");
    }
  }, r.getPosition = function(t) {
    var n = this.input.fromOffset(t);
    return {
      column: n.col,
      line: n.line,
      offset: t
    };
  }, r.init = function(t, n) {
    this.current.push(t), t.source = {
      input: this.input,
      start: this.getPosition(n)
    }, t.raws.before = this.spaces, this.spaces = "", t.type !== "comment" && (this.semicolon = !1);
  }, r.other = function(t) {
    for (var n = !1, s = null, o = !1, a = null, c = [], l = t[1].startsWith("--"), f = [], u = t; u; ) {
      if (s = u[0], f.push(u), s === "(" || s === "[")
        a || (a = u), c.push(s === "(" ? ")" : "]");
      else if (l && o && s === "{")
        a || (a = u), c.push("}");
      else if (c.length === 0)
        if (s === ";")
          if (o) {
            this.decl(f, l);
            return;
          } else
            break;
        else if (s === "{") {
          this.rule(f);
          return;
        } else if (s === "}") {
          this.tokenizer.back(f.pop()), n = !0;
          break;
        } else s === ":" && (o = !0);
      else s === c[c.length - 1] && (c.pop(), c.length === 0 && (a = null));
      u = this.tokenizer.nextToken();
    }
    if (this.tokenizer.endOfFile() && (n = !0), c.length > 0 && this.unclosedBracket(a), n && o) {
      if (!l)
        for (; f.length && (u = f[f.length - 1][0], !(u !== "space" && u !== "comment")); )
          this.tokenizer.back(f.pop());
      this.decl(f, l);
    } else
      this.unknownWord(f);
  }, r.parse = function() {
    for (var t; !this.tokenizer.endOfFile(); )
      switch (t = this.tokenizer.nextToken(), t[0]) {
        case "space":
          this.spaces += t[1];
          break;
        case ";":
          this.freeSemicolon(t);
          break;
        case "}":
          this.end(t);
          break;
        case "comment":
          this.comment(t);
          break;
        case "at-word":
          this.atrule(t);
          break;
        case "{":
          this.emptyRule(t);
          break;
        default:
          this.other(t);
          break;
      }
    this.endFile();
  }, r.precheckMissedSemicolon = function() {
  }, r.raw = function(t, n, s, o) {
    for (var a, c, l = s.length, f = "", u = !0, d, v, p = 0; p < l; p += 1)
      a = s[p], c = a[0], c === "space" && p === l - 1 && !o ? u = !1 : c === "comment" ? (v = s[p - 1] ? s[p - 1][0] : "empty", d = s[p + 1] ? s[p + 1][0] : "empty", !Yc[v] && !Yc[d] ? f.slice(-1) === "," ? u = !1 : f += a[1] : u = !1) : f += a[1];
    if (!u) {
      var _ = s.reduce(function(m, y) {
        return m + y[1];
      }, "");
      t.raws[n] = {
        raw: _,
        value: f
      };
    }
    t[n] = f;
  }, r.rule = function(t) {
    t.pop();
    var n = new Hc();
    this.init(n, t[0][2]), n.raws.between = this.spacesAndCommentsFromEnd(t), this.raw(n, "selector", t), this.current = n;
  }, r.spacesAndCommentsFromEnd = function(t) {
    for (var n, s = ""; t.length && (n = t[t.length - 1][0], !(n !== "space" && n !== "comment")); )
      s = t.pop()[1] + s;
    return s;
  }, r.spacesAndCommentsFromStart = function(t) {
    for (var n, s = ""; t.length && (n = t[0][0], !(n !== "space" && n !== "comment")); )
      s += t.shift()[1];
    return s;
  }, r.spacesFromEnd = function(t) {
    for (var n, s = ""; t.length && (n = t[t.length - 1][0], n === "space"); )
      s = t.pop()[1] + s;
    return s;
  }, r.stringFrom = function(t, n) {
    for (var s = "", o = n; o < t.length; o++)
      s += t[o][1];
    return t.splice(n, t.length - n), s;
  }, r.unclosedBlock = function() {
    var t = this.current.source.start;
    throw this.input.error("Unclosed block", t.line, t.column);
  }, r.unclosedBracket = function(t) {
    throw this.input.error("Unclosed bracket", {
      offset: t[2]
    }, {
      offset: t[2] + 1
    });
  }, r.unexpectedClose = function(t) {
    throw this.input.error("Unexpected }", {
      offset: t[2]
    }, {
      offset: t[2] + 1
    });
  }, r.unknownWord = function(t) {
    throw this.input.error("Unknown word", {
      offset: t[0][2]
    }, {
      offset: t[0][2] + t[0][1].length
    });
  }, r.unnamedAtrule = function(t, n) {
    throw this.input.error("At-rule without name", {
      offset: n[2]
    }, {
      offset: n[2] + n[1].length
    });
  }, e;
})(), Yg = Hg, Kg = Nr, Jg = Yg, Xg = ys;
function Yi(e, r) {
  var i = new Xg(e, r), t = new Jg(i);
  try {
    t.parse();
  } catch (n) {
    throw process.env.NODE_ENV !== "production" && n.name === "CssSyntaxError" && r && r.from && (/\.scss$/i.test(r.from) ? n.message += `
You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser` : /\.sass/i.test(r.from) ? n.message += `
You tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser` : /\.less$/i.test(r.from) && (n.message += `
You tried to parse Less with the standard CSS parser; try again with the postcss-less parser`)), n;
  }
  return t.root;
}
var Ra = Yi;
Yi.default = Yi;
Kg.registerParse(Yi);
var Wt = _r.isClean, Zg = _r.my, Qg = Du, em = vs, tm = Nr, rm = Ea, nm = Yu, Kc = Ia, im = Ra, sm = Jn, om = {
  atrule: "AtRule",
  comment: "Comment",
  decl: "Declaration",
  document: "Document",
  root: "Root",
  rule: "Rule"
}, am = {
  AtRule: !0,
  AtRuleExit: !0,
  Comment: !0,
  CommentExit: !0,
  Declaration: !0,
  DeclarationExit: !0,
  Document: !0,
  DocumentExit: !0,
  Once: !0,
  OnceExit: !0,
  postcssPlugin: !0,
  prepare: !0,
  Root: !0,
  RootExit: !0,
  Rule: !0,
  RuleExit: !0
}, cm = {
  Once: !0,
  postcssPlugin: !0,
  prepare: !0
}, Qr = 0;
function _n(e) {
  return (typeof e > "u" ? "undefined" : ce(e)) === "object" && typeof e.then == "function";
}
function rf(e) {
  var r = !1, i = om[e.type];
  return e.type === "decl" ? r = e.prop.toLowerCase() : e.type === "atrule" && (r = e.name.toLowerCase()), r && e.append ? [
    i,
    i + "-" + r,
    Qr,
    i + "Exit",
    i + "Exit-" + r
  ] : r ? [
    i,
    i + "-" + r,
    i + "Exit",
    i + "Exit-" + r
  ] : e.append ? [
    i,
    Qr,
    i + "Exit"
  ] : [
    i,
    i + "Exit"
  ];
}
function Jc(e) {
  var r;
  return e.type === "document" ? r = [
    "Document",
    Qr,
    "DocumentExit"
  ] : e.type === "root" ? r = [
    "Root",
    Qr,
    "RootExit"
  ] : r = rf(e), {
    eventIndex: 0,
    events: r,
    iterator: 0,
    node: e,
    visitorIndex: 0,
    visitors: []
  };
}
function Wo(e) {
  return e[Wt] = !1, e.nodes && e.nodes.forEach(function(r) {
    return Wo(r);
  }), e;
}
var zo = {}, en = /* @__PURE__ */ (function() {
  function e(i, t, n) {
    var s = this;
    this.stringified = !1, this.processed = !1;
    var o;
    if ((typeof t > "u" ? "undefined" : ce(t)) === "object" && t !== null && (t.type === "root" || t.type === "document"))
      o = Wo(t);
    else if (te(t, e) || te(t, Kc))
      o = Wo(t.root), t.map && (typeof n.map > "u" && (n.map = {}), n.map.inline || (n.map.inline = !1), n.map.prev = t.map);
    else {
      var a = im;
      n.syntax && (a = n.syntax.parse), n.parser && (a = n.parser), a.parse && (a = a.parse);
      try {
        o = a(t, n);
      } catch (c) {
        this.processed = !0, this.error = c;
      }
      o && !o[Zg] && tm.rebuild(o);
    }
    this.result = new Kc(i, o, n), this.helpers = we({}, zo, {
      postcss: zo,
      result: this.result
    }), this.plugins = this.processor.plugins.map(function(c) {
      return (typeof c > "u" ? "undefined" : ce(c)) === "object" && c.prepare ? we({}, c, c.prepare(s.result)) : c;
    });
  }
  var r = e.prototype;
  return r.async = function() {
    return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing || (this.processing = this.runAsync()), this.processing);
  }, r.catch = function(t) {
    return this.async().catch(t);
  }, r.finally = function(t) {
    return this.async().then(t, t);
  }, r.getAsyncError = function() {
    throw new Error("Use process(css).then(cb) to work with async plugins");
  }, r.handleError = function(t, n) {
    var s = this.result.lastPlugin;
    try {
      if (n && n.addToError(t), this.error = t, t.name === "CssSyntaxError" && !t.plugin)
        t.plugin = s.postcssPlugin, t.setMessage();
      else if (s.postcssVersion && process.env.NODE_ENV !== "production") {
        var o = s.postcssPlugin, a = s.postcssVersion, c = this.result.processor.version, l = a.split("."), f = c.split(".");
        (l[0] !== f[0] || parseInt(l[1]) > parseInt(f[1])) && console.error("Unknown error from PostCSS plugin. Your current PostCSS version is " + c + ", but " + o + " uses " + a + ". Perhaps this is the source of the error below.");
      }
    } catch (u) {
      console && console.error && console.error(u);
    }
    return t;
  }, r.prepareVisitors = function() {
    var t = this;
    this.listeners = {};
    for (var n = function(f, u, d) {
      t.listeners[u] || (t.listeners[u] = []), t.listeners[u].push([
        f,
        d
      ]);
    }, s = W(this.plugins), o; !(o = s()).done; ) {
      var a = o.value;
      if ((typeof a > "u" ? "undefined" : ce(a)) === "object")
        for (var c in a) {
          if (!am[c] && /^[A-Z]/.test(c))
            throw new Error("Unknown event " + c + " in " + a.postcssPlugin + ". Try to update PostCSS (" + this.processor.version + " now).");
          if (!cm[c])
            if (ce(a[c]) === "object")
              for (var l in a[c])
                l === "*" ? n(a, c, a[c][l]) : n(a, c + "-" + l.toLowerCase(), a[c][l]);
            else typeof a[c] == "function" && n(a, c, a[c]);
        }
    }
    this.hasListener = Object.keys(this.listeners).length > 0;
  }, r.runAsync = function() {
    var t = this;
    return la(function() {
      var n, s, o, a, c, l, f, u, d, v, p, _;
      return Mn(this, function(m) {
        switch (m.label) {
          case 0:
            t.plugin = 0, n = 0, m.label = 1;
          case 1:
            if (!(n < t.plugins.length)) return [
              3,
              6
            ];
            if (s = t.plugins[n], o = t.runOnRoot(s), !_n(o)) return [
              3,
              5
            ];
            m.label = 2;
          case 2:
            return m.trys.push([
              2,
              4,
              ,
              5
            ]), [
              4,
              o
            ];
          case 3:
            return m.sent(), [
              3,
              5
            ];
          case 4:
            throw a = m.sent(), t.handleError(a);
          case 5:
            return n++, [
              3,
              1
            ];
          case 6:
            if (t.prepareVisitors(), !t.hasListener) return [
              3,
              18
            ];
            c = t.result.root, m.label = 7;
          case 7:
            if (c[Wt]) return [
              3,
              14
            ];
            c[Wt] = !0, l = [
              Jc(c)
            ], m.label = 8;
          case 8:
            if (!(l.length > 0)) return [
              3,
              13
            ];
            if (f = t.visitTick(l), !_n(f)) return [
              3,
              12
            ];
            m.label = 9;
          case 9:
            return m.trys.push([
              9,
              11,
              ,
              12
            ]), [
              4,
              f
            ];
          case 10:
            return m.sent(), [
              3,
              12
            ];
          case 11:
            throw u = m.sent(), d = l[l.length - 1].node, t.handleError(u, d);
          case 12:
            return [
              3,
              8
            ];
          case 13:
            return [
              3,
              7
            ];
          case 14:
            if (!t.listeners.OnceExit) return [
              3,
              18
            ];
            v = function() {
              var y, b, S, E, C;
              return Mn(this, function(A) {
                switch (A.label) {
                  case 0:
                    y = _.value, b = y[0], S = y[1], t.result.lastPlugin = b, A.label = 1;
                  case 1:
                    return A.trys.push([
                      1,
                      6,
                      ,
                      7
                    ]), c.type !== "document" ? [
                      3,
                      3
                    ] : (E = c.nodes.map(function(I) {
                      return S(I, t.helpers);
                    }), [
                      4,
                      Promise.all(E)
                    ]);
                  case 2:
                    return A.sent(), [
                      3,
                      5
                    ];
                  case 3:
                    return [
                      4,
                      S(c, t.helpers)
                    ];
                  case 4:
                    A.sent(), A.label = 5;
                  case 5:
                    return [
                      3,
                      7
                    ];
                  case 6:
                    throw C = A.sent(), t.handleError(C);
                  case 7:
                    return [
                      2
                    ];
                }
              });
            }, p = W(t.listeners.OnceExit), m.label = 15;
          case 15:
            return (_ = p()).done ? [
              3,
              18
            ] : [
              5,
              Ul(v())
            ];
          case 16:
            m.sent(), m.label = 17;
          case 17:
            return [
              3,
              15
            ];
          case 18:
            return t.processed = !0, [
              2,
              t.stringify()
            ];
        }
      });
    })();
  }, r.runOnRoot = function(t) {
    var n = this;
    this.result.lastPlugin = t;
    try {
      if ((typeof t > "u" ? "undefined" : ce(t)) === "object" && t.Once) {
        if (this.result.root.type === "document") {
          var s = this.result.root.nodes.map(function(o) {
            return t.Once(o, n.helpers);
          });
          return _n(s[0]) ? Promise.all(s) : s;
        }
        return t.Once(this.result.root, this.helpers);
      } else if (typeof t == "function")
        return t(this.result.root, this.result);
    } catch (o) {
      throw this.handleError(o);
    }
  }, r.stringify = function() {
    if (this.error) throw this.error;
    if (this.stringified) return this.result;
    this.stringified = !0, this.sync();
    var t = this.result.opts, n = em;
    t.syntax && (n = t.syntax.stringify), t.stringifier && (n = t.stringifier), n.stringify && (n = n.stringify);
    var s = new Qg(n, this.result.root, this.result.opts), o = s.generate();
    return this.result.css = o[0], this.result.map = o[1], this.result;
  }, r.sync = function() {
    if (this.error) throw this.error;
    if (this.processed) return this.result;
    if (this.processed = !0, this.processing)
      throw this.getAsyncError();
    for (var t = W(this.plugins), n; !(n = t()).done; ) {
      var s = n.value, o = this.runOnRoot(s);
      if (_n(o))
        throw this.getAsyncError();
    }
    if (this.prepareVisitors(), this.hasListener) {
      for (var a = this.result.root; !a[Wt]; )
        a[Wt] = !0, this.walkSync(a);
      if (this.listeners.OnceExit)
        if (a.type === "document")
          for (var c = W(a.nodes), l; !(l = c()).done; ) {
            var f = l.value;
            this.visitSync(this.listeners.OnceExit, f);
          }
        else
          this.visitSync(this.listeners.OnceExit, a);
    }
    return this.result;
  }, r.then = function(t, n) {
    return process.env.NODE_ENV !== "production" && ("from" in this.opts || nm("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")), this.async().then(t, n);
  }, r.toString = function() {
    return this.css;
  }, r.visitSync = function(t, n) {
    for (var s = W(t), o; !(o = s()).done; ) {
      var a = o.value, c = a[0], l = a[1];
      this.result.lastPlugin = c;
      var f = void 0;
      try {
        f = l(n, this.helpers);
      } catch (u) {
        throw this.handleError(u, n.proxyOf);
      }
      if (n.type !== "root" && n.type !== "document" && !n.parent)
        return !0;
      if (_n(f))
        throw this.getAsyncError();
    }
  }, r.visitTick = function(t) {
    var n = t[t.length - 1], s = n.node, o = n.visitors;
    if (s.type !== "root" && s.type !== "document" && !s.parent) {
      t.pop();
      return;
    }
    if (o.length > 0 && n.visitorIndex < o.length) {
      var a = o[n.visitorIndex], c = a[0], l = a[1];
      n.visitorIndex += 1, n.visitorIndex === o.length && (n.visitors = [], n.visitorIndex = 0), this.result.lastPlugin = c;
      try {
        return l(s.toProxy(), this.helpers);
      } catch (p) {
        throw this.handleError(p, s);
      }
    }
    if (n.iterator !== 0) {
      for (var f = n.iterator, u; u = s.nodes[s.indexes[f]]; )
        if (s.indexes[f] += 1, !u[Wt]) {
          u[Wt] = !0, t.push(Jc(u));
          return;
        }
      n.iterator = 0, delete s.indexes[f];
    }
    for (var d = n.events; n.eventIndex < d.length; ) {
      var v = d[n.eventIndex];
      if (n.eventIndex += 1, v === Qr) {
        s.nodes && s.nodes.length && (s[Wt] = !0, n.iterator = s.getIterator());
        return;
      } else if (this.listeners[v]) {
        n.visitors = this.listeners[v];
        return;
      }
    }
    t.pop();
  }, r.walkSync = function(t) {
    var n = this;
    t[Wt] = !0;
    for (var s = rf(t), o = W(s), a; !(a = o()).done; ) {
      var c = a.value;
      if (c === Qr)
        t.nodes && t.each(function(f) {
          f[Wt] || n.walkSync(f);
        });
      else {
        var l = this.listeners[c];
        if (l && this.visitSync(l, t.toProxy()))
          return;
      }
    }
  }, r.warnings = function() {
    return this.sync().warnings();
  }, dt(e, [
    {
      key: "content",
      get: function() {
        return this.stringify().content;
      }
    },
    {
      key: "css",
      get: function() {
        return this.stringify().css;
      }
    },
    {
      key: "map",
      get: function() {
        return this.stringify().map;
      }
    },
    {
      key: "messages",
      get: function() {
        return this.sync().messages;
      }
    },
    {
      key: "opts",
      get: function() {
        return this.result.opts;
      }
    },
    {
      key: "processor",
      get: function() {
        return this.result.processor;
      }
    },
    {
      key: "root",
      get: function() {
        return this.sync().root;
      }
    },
    {
      key: Symbol.toStringTag,
      get: function() {
        return "LazyResult";
      }
    }
  ]), e;
})();
en.registerPostcss = function(e) {
  zo = e;
};
var nf = en;
en.default = en;
sm.registerLazyResult(en);
rm.registerLazyResult(en);
var lm = Du, um = vs, fm = Yu, dm = Ra, hm = Ia, Go = /* @__PURE__ */ (function() {
  function e(i, t, n) {
    t = t.toString(), this.stringified = !1, this._processor = i, this._css = t, this._opts = n, this._map = void 0;
    var s, o = um;
    this.result = new hm(this._processor, s, this._opts), this.result.css = t;
    var a = this;
    Object.defineProperty(this.result, "root", {
      get: function() {
        return a.root;
      }
    });
    var c = new lm(o, s, this._opts, t);
    if (c.isMap()) {
      var l = c.generate(), f = l[0], u = l[1];
      f && (this.result.css = f), u && (this.result.map = u);
    } else
      c.clearAnnotation(), this.result.css = c.css;
  }
  var r = e.prototype;
  return r.async = function() {
    return this.error ? Promise.reject(this.error) : Promise.resolve(this.result);
  }, r.catch = function(t) {
    return this.async().catch(t);
  }, r.finally = function(t) {
    return this.async().then(t, t);
  }, r.sync = function() {
    if (this.error) throw this.error;
    return this.result;
  }, r.then = function(t, n) {
    return process.env.NODE_ENV !== "production" && ("from" in this._opts || fm("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")), this.async().then(t, n);
  }, r.toString = function() {
    return this._css;
  }, r.warnings = function() {
    return [];
  }, dt(e, [
    {
      key: "content",
      get: function() {
        return this.result.css;
      }
    },
    {
      key: "css",
      get: function() {
        return this.result.css;
      }
    },
    {
      key: "map",
      get: function() {
        return this.result.map;
      }
    },
    {
      key: "messages",
      get: function() {
        return [];
      }
    },
    {
      key: "opts",
      get: function() {
        return this.result.opts;
      }
    },
    {
      key: "processor",
      get: function() {
        return this.result.processor;
      }
    },
    {
      key: "root",
      get: function() {
        if (this._root)
          return this._root;
        var t, n = dm;
        try {
          t = n(this._css, this._opts);
        } catch (s) {
          this.error = s;
        }
        if (this.error)
          throw this.error;
        return this._root = t, t;
      }
    },
    {
      key: Symbol.toStringTag,
      get: function() {
        return "NoWorkResult";
      }
    }
  ]), e;
})(), pm = Go;
Go.default = Go;
var vm = pm, gm = nf, mm = Ea, ym = Jn, Bn = /* @__PURE__ */ (function() {
  function e(i) {
    i === void 0 && (i = []), this.version = "8.4.38", this.plugins = this.normalize(i);
  }
  var r = e.prototype;
  return r.normalize = function(t) {
    for (var n = [], s = W(t), o; !(o = s()).done; ) {
      var a = o.value;
      if (a.postcss === !0 ? a = a() : a.postcss && (a = a.postcss), (typeof a > "u" ? "undefined" : ce(a)) === "object" && Array.isArray(a.plugins))
        n = n.concat(a.plugins);
      else if ((typeof a > "u" ? "undefined" : ce(a)) === "object" && a.postcssPlugin)
        n.push(a);
      else if (typeof a == "function")
        n.push(a);
      else if ((typeof a > "u" ? "undefined" : ce(a)) === "object" && (a.parse || a.stringify)) {
        if (process.env.NODE_ENV !== "production")
          throw new Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.");
      } else
        throw new Error(a + " is not a PostCSS plugin");
    }
    return n;
  }, r.process = function(t, n) {
    return n === void 0 && (n = {}), !this.plugins.length && !n.parser && !n.stringifier && !n.syntax ? new vm(this, t, n) : new gm(this, t, n);
  }, r.use = function(t) {
    return this.plugins = this.plugins.concat(this.normalize([
      t
    ])), this;
  }, e;
})(), _m = Bn;
Bn.default = Bn;
ym.registerProcessor(Bn);
mm.registerProcessor(Bn);
var bm = ms, wm = Nu, Sm = _s, xm = Oa, Cm = ys, km = Jn, Em = Aa;
function Wn(e, r) {
  if (Array.isArray(e)) return e.map(function(u) {
    return Wn(u);
  });
  var i = e.inputs, t = Tn(e, [
    "inputs"
  ]);
  if (i) {
    r = [];
    for (var n = W(i), s; !(s = n()).done; ) {
      var o = s.value, a = we({}, o, {
        __proto__: Cm.prototype
      });
      a.map && (a.map = we({}, a.map, {
        __proto__: wm.prototype
      })), r.push(a);
    }
  }
  if (t.nodes && (t.nodes = e.nodes.map(function(u) {
    return Wn(u, r);
  })), t.source) {
    var c = t.source, l = c.inputId, f = Tn(c, [
      "inputId"
    ]);
    t.source = f, l != null && (t.source.input = r[l]);
  }
  if (t.type === "root")
    return new km(t);
  if (t.type === "decl")
    return new bm(t);
  if (t.type === "rule")
    return new Em(t);
  if (t.type === "comment")
    return new Sm(t);
  if (t.type === "atrule")
    return new xm(t);
  throw new Error("Unknown node type: " + e.type);
}
var Im = Wn;
Wn.default = Wn;
var Om = xa, sf = ms, Am = nf, Rm = Nr, Ta = _m, Tm = vs, Nm = Im, of = Ea, Mm = Ku, af = _s, cf = Oa, Pm = Ia, Lm = ys, $m = Ra, Dm = ef, lf = Aa, uf = Jn, Fm = gs;
function Ee() {
  for (var e = arguments.length, r = new Array(e), i = 0; i < e; i++)
    r[i] = arguments[i];
  return r.length === 1 && Array.isArray(r[0]) && (r = r[0]), new Ta(r);
}
Ee.plugin = function(r, i) {
  var t = !1;
  function n() {
    for (var o = arguments.length, a = new Array(o), c = 0; c < o; c++)
      a[c] = arguments[c];
    console && console.warn && !t && (t = !0, console.warn(r + `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`), process.env.LANG && process.env.LANG.startsWith("cn") && console.warn(r + `: 里面 postcss.plugin 被弃用. 迁移指南:
https://www.w3ctech.com/topic/2226`));
    var l = i.apply(void 0, [].concat(a));
    return l.postcssPlugin = r, l.postcssVersion = new Ta().version, l;
  }
  var s;
  return Object.defineProperty(n, "postcss", {
    get: function() {
      return s || (s = n()), s;
    }
  }), n.process = function(o, a, c) {
    return Ee([
      n(c)
    ]).process(o, a);
  }, n;
};
Ee.stringify = Tm;
Ee.parse = $m;
Ee.fromJSON = Nm;
Ee.list = Dm;
Ee.comment = function(e) {
  return new af(e);
};
Ee.atRule = function(e) {
  return new cf(e);
};
Ee.decl = function(e) {
  return new sf(e);
};
Ee.rule = function(e) {
  return new lf(e);
};
Ee.root = function(e) {
  return new uf(e);
};
Ee.document = function(e) {
  return new of(e);
};
Ee.CssSyntaxError = Om;
Ee.Declaration = sf;
Ee.Container = Rm;
Ee.Processor = Ta;
Ee.Document = of;
Ee.Comment = af;
Ee.Warning = Mm;
Ee.AtRule = cf;
Ee.Result = Pm;
Ee.Input = Lm;
Ee.Rule = lf;
Ee.Root = uf;
Ee.Node = Fm;
Am.registerPostcss(Ee);
var jm = Ee;
Ee.default = Ee;
var Be = /* @__PURE__ */ Jv(jm);
Be.stringify;
Be.fromJSON;
Be.plugin;
Be.parse;
Be.list;
Be.document;
Be.comment;
Be.atRule;
Be.rule;
Be.decl;
Be.root;
Be.CssSyntaxError;
Be.Declaration;
Be.Container;
Be.Processor;
Be.Document;
Be.Comment;
Be.Warning;
Be.AtRule;
Be.Result;
Be.Input;
Be.Rule;
Be.Root;
Be.Node;
var Um = /* @__PURE__ */ (function() {
  function e() {
    for (var i = arguments.length, t = new Array(i), n = 0; n < i; n++)
      t[n] = arguments[n];
    Tt(this, "parentElement", null), Tt(this, "parentNode", null), Tt(this, "ownerDocument"), Tt(this, "firstChild", null), Tt(this, "lastChild", null), Tt(this, "previousSibling", null), Tt(this, "nextSibling", null), Tt(this, "ELEMENT_NODE", 1), Tt(this, "TEXT_NODE", 3), Tt(this, "nodeType"), Tt(this, "nodeName"), Tt(this, "RRNodeType");
  }
  var r = e.prototype;
  return r.contains = function(t) {
    if (te(t, e)) {
      if (t.ownerDocument !== this.ownerDocument) return !1;
      if (t === this) return !0;
    } else return !1;
    for (; t.parentNode; ) {
      if (t.parentNode === this) return !0;
      t = t.parentNode;
    }
    return !1;
  }, r.appendChild = function(t) {
    throw new Error("RRDomException: Failed to execute 'appendChild' on 'RRNode': This RRNode type does not support this method.");
  }, r.insertBefore = function(t, n) {
    throw new Error("RRDomException: Failed to execute 'insertBefore' on 'RRNode': This RRNode type does not support this method.");
  }, r.removeChild = function(t) {
    throw new Error("RRDomException: Failed to execute 'removeChild' on 'RRNode': This RRNode type does not support this method.");
  }, r.toString = function() {
    return "RRNode";
  }, dt(e, [
    {
      key: "childNodes",
      get: function() {
        for (var t = [], n = this.firstChild; n; )
          t.push(n), n = n.nextSibling;
        return t;
      }
    }
  ]), e;
})(), Xc = {
  Node: [
    "childNodes",
    "parentNode",
    "parentElement",
    "textContent"
  ],
  ShadowRoot: [
    "host",
    "styleSheets"
  ],
  Element: [
    "shadowRoot",
    "querySelector",
    "querySelectorAll"
  ],
  MutationObserver: []
}, Zc = {
  Node: [
    "contains",
    "getRootNode"
  ],
  ShadowRoot: [
    "getSelection"
  ],
  Element: [],
  MutationObserver: [
    "constructor"
  ]
}, Ci = {}, Bm = function() {
  return !!globalThis.Zone;
};
function Na(e) {
  if (Ci[e]) return Ci[e];
  var r = globalThis[e], i = r.prototype, t = e in Xc ? Xc[e] : void 0, n = !!(t && // @ts-expect-error 2345
  t.every(function(f) {
    var u, d;
    return !!((d = (u = Object.getOwnPropertyDescriptor(i, f)) == null ? void 0 : u.get) != null && d.toString().includes("[native code]"));
  })), s = e in Zc ? Zc[e] : void 0, o = !!(s && s.every(
    // @ts-expect-error 2345
    function(f) {
      var u;
      return typeof i[f] == "function" && ((u = i[f]) == null ? void 0 : u.toString().includes("[native code]"));
    }
  ));
  if (n && o && !Bm())
    return Ci[e] = r.prototype, r.prototype;
  try {
    var a = document.createElement("iframe");
    document.body.appendChild(a);
    var c = a.contentWindow;
    if (!c) return r.prototype;
    var l = c[e].prototype;
    return document.body.removeChild(a), l ? Ci[e] = l : i;
  } catch {
    return i;
  }
}
var Bs = {};
function br(e, r, i) {
  var t, n = e + "." + String(i);
  if (Bs[n]) return Bs[n].call(r);
  var s = Na(e), o = (t = Object.getOwnPropertyDescriptor(s, i)) == null ? void 0 : t.get;
  return o ? (Bs[n] = o, o.call(r)) : r[i];
}
var Ws = {};
function ff(e, r, i) {
  var t = e + "." + String(i);
  if (Ws[t]) return Ws[t].bind(r);
  var n = Na(e), s = n[i];
  return typeof s != "function" ? r[i] : (Ws[t] = s, s.bind(r));
}
function Wm(e) {
  return br("Node", e, "childNodes");
}
function zm(e) {
  return br("Node", e, "parentNode");
}
function Gm(e) {
  return br("Node", e, "parentElement");
}
function Vm(e) {
  return br("Node", e, "textContent");
}
function qm(e, r) {
  return ff("Node", e, "contains")(r);
}
function Hm(e) {
  return ff("Node", e, "getRootNode")();
}
function Ym(e) {
  return !e || !("host" in e) ? null : br("ShadowRoot", e, "host");
}
function Km(e) {
  return e.styleSheets;
}
function Jm(e) {
  return !e || !("shadowRoot" in e) ? null : br("Element", e, "shadowRoot");
}
function Xm(e, r) {
  return br("Element", e, "querySelector")(r);
}
function Zm(e, r) {
  return br("Element", e, "querySelectorAll")(r);
}
function df() {
  return Na("MutationObserver").constructor;
}
function Mr(e, r, i) {
  try {
    if (!(r in e))
      return function() {
      };
    var t = e[r], n = i(t);
    return typeof n == "function" && (n.prototype = n.prototype || {}, Object.defineProperties(n, {
      __rrweb_original__: {
        enumerable: !1,
        value: t
      }
    })), e[r] = n, function() {
      e[r] = t;
    };
  } catch {
    return function() {
    };
  }
}
var pe = {
  childNodes: Wm,
  parentNode: zm,
  parentElement: Gm,
  textContent: Vm,
  contains: qm,
  getRootNode: Hm,
  host: Ym,
  styleSheets: Km,
  shadowRoot: Jm,
  querySelector: Xm,
  querySelectorAll: Zm,
  mutationObserver: df,
  patch: Mr
};
function bt(e, r, i) {
  i === void 0 && (i = document);
  var t = {
    capture: !0,
    passive: !0
  };
  return i.addEventListener(e, r, t), function() {
    return i.removeEventListener(e, r, t);
  };
}
var Ur = `Please stop import mirror directly. Instead of that,\r
now you can use replayer.getMirror() to access the mirror instance of a replayer,\r
or you can use record.mirror to access the mirror instance during recording.`, Qc = {
  map: {},
  getId: function() {
    return console.error(Ur), -1;
  },
  getNode: function() {
    return console.error(Ur), null;
  },
  removeNodeFromMap: function() {
    console.error(Ur);
  },
  has: function() {
    return console.error(Ur), !1;
  },
  reset: function() {
    console.error(Ur);
  }
};
typeof window < "u" && window.Proxy && window.Reflect && (Qc = new Proxy(Qc, {
  get: function(r, i, t) {
    return i === "map" && console.error(Ur), Reflect.get(r, i, t);
  }
}));
function zn(e, r, i) {
  i === void 0 && (i = {});
  var t = null, n = 0;
  return function() {
    for (var s = arguments.length, o = new Array(s), a = 0; a < s; a++)
      o[a] = arguments[a];
    var c = Date.now();
    !n && i.leading === !1 && (n = c);
    var l = r - (c - n), f = this;
    l <= 0 || l > r ? (t && (clearTimeout(t), t = null), n = c, e.apply(f, o)) : !t && i.trailing !== !1 && (t = setTimeout(function() {
      n = i.leading === !1 ? 0 : Date.now(), t = null, e.apply(f, o);
    }, l));
  };
}
function bs(e, r, i, t, n) {
  n === void 0 && (n = window);
  var s = n.Object.getOwnPropertyDescriptor(e, r);
  return n.Object.defineProperty(e, r, t ? i : {
    set: function(a) {
      var c = this;
      setTimeout(function() {
        i.set.call(c, a);
      }, 0), s && s.set && s.set.call(this, a);
    }
  }), function() {
    return bs(e, r, s || {}, !0);
  };
}
var Ki = Date.now;
/* @__PURE__ */ /[1-9][0-9]{12}/.test(Date.now().toString()) || (Ki = function() {
  return /* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime();
});
function hf(e) {
  var r, i, t, n, s = e.document;
  return {
    left: s.scrollingElement ? s.scrollingElement.scrollLeft : e.pageXOffset !== void 0 ? e.pageXOffset : s.documentElement.scrollLeft || (s == null ? void 0 : s.body) && ((r = pe.parentElement(s.body)) == null ? void 0 : r.scrollLeft) || ((i = s == null ? void 0 : s.body) == null ? void 0 : i.scrollLeft) || 0,
    top: s.scrollingElement ? s.scrollingElement.scrollTop : e.pageYOffset !== void 0 ? e.pageYOffset : (s == null ? void 0 : s.documentElement.scrollTop) || (s == null ? void 0 : s.body) && ((t = pe.parentElement(s.body)) == null ? void 0 : t.scrollTop) || ((n = s == null ? void 0 : s.body) == null ? void 0 : n.scrollTop) || 0
  };
}
function pf() {
  return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight;
}
function vf() {
  return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth;
}
function gf(e) {
  if (!e)
    return null;
  var r = e.nodeType === e.ELEMENT_NODE ? e : pe.parentElement(e);
  return r;
}
function wt(e, r, i, t) {
  if (!e)
    return !1;
  var n = gf(e);
  if (!n)
    return !1;
  try {
    if (typeof r == "string") {
      if (n.classList.contains(r) || t && n.closest("." + r) !== null) return !0;
    } else if (Ui(n, r, t)) return !0;
  } catch {
  }
  return !!(i && (n.matches(i) || t && n.closest(i) !== null));
}
function Qm(e, r) {
  return r.getId(e) !== -1;
}
function zs(e, r, i) {
  return e.tagName === "TITLE" && i.headTitleMutations ? !0 : r.getId(e) === Pn;
}
function mf(e, r) {
  if (wn(e))
    return !1;
  var i = r.getId(e);
  if (!r.has(i))
    return !0;
  var t = pe.parentNode(e);
  return t && t.nodeType === e.DOCUMENT_NODE ? !1 : t ? mf(t, r) : !0;
}
function Vo(e) {
  return !!e.changedTouches;
}
function ey(e) {
  e === void 0 && (e = window), "NodeList" in e && !e.NodeList.prototype.forEach && (e.NodeList.prototype.forEach = Array.prototype.forEach), "DOMTokenList" in e && !e.DOMTokenList.prototype.forEach && (e.DOMTokenList.prototype.forEach = Array.prototype.forEach);
}
function yf(e, r) {
  return !!(e.nodeName === "IFRAME" && r.getMeta(e));
}
function _f(e, r) {
  return !!(e.nodeName === "LINK" && e.nodeType === e.ELEMENT_NODE && e.getAttribute && e.getAttribute("rel") === "stylesheet" && r.getMeta(e));
}
function qo(e) {
  return e ? te(e, Um) && "shadowRoot" in e ? !!e.shadowRoot : !!pe.shadowRoot(e) : !1;
}
var ty = /* @__PURE__ */ (function() {
  function e() {
    $(this, "id", 1), $(this, "styleIDMap", /* @__PURE__ */ new WeakMap()), $(this, "idStyleMap", /* @__PURE__ */ new Map());
  }
  var r = e.prototype;
  return r.getId = function(t) {
    var n;
    return (n = this.styleIDMap.get(t)) != null ? n : -1;
  }, r.has = function(t) {
    return this.styleIDMap.has(t);
  }, r.add = function(t, n) {
    if (this.has(t)) return this.getId(t);
    var s;
    return n === void 0 ? s = this.id++ : s = n, this.styleIDMap.set(t, s), this.idStyleMap.set(s, t), s;
  }, r.getStyle = function(t) {
    return this.idStyleMap.get(t) || null;
  }, r.reset = function() {
    this.styleIDMap = /* @__PURE__ */ new WeakMap(), this.idStyleMap = /* @__PURE__ */ new Map(), this.id = 1;
  }, r.generateId = function() {
    return this.id++;
  }, e;
})();
function bf(e) {
  var r, i = null;
  return "getRootNode" in e && ((r = pe.getRootNode(e)) == null ? void 0 : r.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && pe.host(pe.getRootNode(e)) && (i = pe.host(pe.getRootNode(e))), i;
}
function ry(e) {
  for (var r = e, i; i = bf(r); ) r = i;
  return r;
}
function ny(e) {
  var r = e.ownerDocument;
  if (!r) return !1;
  var i = ry(e);
  return pe.contains(r, i);
}
function wf(e) {
  var r = e.ownerDocument;
  return r ? pe.contains(r, e) || ny(e) : !1;
}
var ve = /* @__PURE__ */ (function(e) {
  return e[e.DomContentLoaded = 0] = "DomContentLoaded", e[e.Load = 1] = "Load", e[e.FullSnapshot = 2] = "FullSnapshot", e[e.IncrementalSnapshot = 3] = "IncrementalSnapshot", e[e.Meta = 4] = "Meta", e[e.Custom = 5] = "Custom", e[e.Plugin = 6] = "Plugin", e;
})(ve || {}), ne = /* @__PURE__ */ (function(e) {
  return e[e.Mutation = 0] = "Mutation", e[e.MouseMove = 1] = "MouseMove", e[e.MouseInteraction = 2] = "MouseInteraction", e[e.Scroll = 3] = "Scroll", e[e.ViewportResize = 4] = "ViewportResize", e[e.Input = 5] = "Input", e[e.TouchMove = 6] = "TouchMove", e[e.MediaInteraction = 7] = "MediaInteraction", e[e.StyleSheetRule = 8] = "StyleSheetRule", e[e.CanvasMutation = 9] = "CanvasMutation", e[e.Font = 10] = "Font", e[e.Log = 11] = "Log", e[e.Drag = 12] = "Drag", e[e.StyleDeclaration = 13] = "StyleDeclaration", e[e.Selection = 14] = "Selection", e[e.AdoptedStyleSheet = 15] = "AdoptedStyleSheet", e[e.CustomElement = 16] = "CustomElement", e;
})(ne || {}), kt = /* @__PURE__ */ (function(e) {
  return e[e.MouseUp = 0] = "MouseUp", e[e.MouseDown = 1] = "MouseDown", e[e.Click = 2] = "Click", e[e.ContextMenu = 3] = "ContextMenu", e[e.DblClick = 4] = "DblClick", e[e.Focus = 5] = "Focus", e[e.Blur = 6] = "Blur", e[e.TouchStart = 7] = "TouchStart", e[e.TouchMove_Departed = 8] = "TouchMove_Departed", e[e.TouchEnd = 9] = "TouchEnd", e[e.TouchCancel = 10] = "TouchCancel", e;
})(kt || {}), Zt = /* @__PURE__ */ (function(e) {
  return e[e.Mouse = 0] = "Mouse", e[e.Pen = 1] = "Pen", e[e.Touch = 2] = "Touch", e;
})(Zt || {}), tn = /* @__PURE__ */ (function(e) {
  return e[e["2D"] = 0] = "2D", e[e.WebGL = 1] = "WebGL", e[e.WebGL2 = 2] = "WebGL2", e;
})(tn || {}), Br = /* @__PURE__ */ (function(e) {
  return e[e.Play = 0] = "Play", e[e.Pause = 1] = "Pause", e[e.Seeked = 2] = "Seeked", e[e.VolumeChange = 3] = "VolumeChange", e[e.RateChange = 4] = "RateChange", e;
})(Br || {}), Sf = /* @__PURE__ */ (function(e) {
  return e[e.Document = 0] = "Document", e[e.DocumentType = 1] = "DocumentType", e[e.Element = 2] = "Element", e[e.Text = 3] = "Text", e[e.CDATA = 4] = "CDATA", e[e.Comment = 5] = "Comment", e;
})(Sf || {});
function el(e) {
  return "__ln" in e;
}
var iy = /* @__PURE__ */ (function() {
  function e() {
    $(this, "length", 0), $(this, "head", null), $(this, "tail", null);
  }
  var r = e.prototype;
  return r.get = function(t) {
    if (t >= this.length)
      throw new Error("Position outside of list range");
    for (var n = this.head, s = 0; s < t; s++)
      n = (n == null ? void 0 : n.next) || null;
    return n;
  }, r.addNode = function(t) {
    var n = {
      value: t,
      previous: null,
      next: null
    };
    if (t.__ln = n, t.previousSibling && el(t.previousSibling)) {
      var s = t.previousSibling.__ln.next;
      n.next = s, n.previous = t.previousSibling.__ln, t.previousSibling.__ln.next = n, s && (s.previous = n);
    } else if (t.nextSibling && el(t.nextSibling) && t.nextSibling.__ln.previous) {
      var o = t.nextSibling.__ln.previous;
      n.previous = o, n.next = t.nextSibling.__ln, t.nextSibling.__ln.previous = n, o && (o.next = n);
    } else
      this.head && (this.head.previous = n), n.next = this.head, this.head = n;
    n.next === null && (this.tail = n), this.length++;
  }, r.removeNode = function(t) {
    var n = t.__ln;
    this.head && (n.previous ? (n.previous.next = n.next, n.next ? n.next.previous = n.previous : this.tail = n.previous) : (this.head = n.next, this.head ? this.head.previous = null : this.tail = null), t.__ln && delete t.__ln, this.length--);
  }, e;
})(), tl = function(e, r) {
  return e + "@" + r;
}, sy = /* @__PURE__ */ (function() {
  function e() {
    var i = this;
    $(this, "frozen", !1), $(this, "locked", !1), $(this, "texts", []), $(this, "attributes", []), $(this, "attributeMap", /* @__PURE__ */ new WeakMap()), $(this, "removes", []), $(this, "mapRemoves", []), $(this, "movedMap", {}), $(this, "addedSet", /* @__PURE__ */ new Set()), $(this, "movedSet", /* @__PURE__ */ new Set()), $(this, "droppedSet", /* @__PURE__ */ new Set()), $(this, "removesSubTreeCache", /* @__PURE__ */ new Set()), $(this, "mutationCb"), $(this, "blockClass"), $(this, "blockSelector"), $(this, "maskTextClass"), $(this, "maskTextSelector"), $(this, "inlineStylesheet"), $(this, "maskInputOptions"), $(this, "maskTextFn"), $(this, "maskInputFn"), $(this, "keepIframeSrcFn"), $(this, "recordCanvas"), $(this, "inlineImages"), $(this, "slimDOMOptions"), $(this, "dataURLOptions"), $(this, "doc"), $(this, "mirror"), $(this, "iframeManager"), $(this, "stylesheetManager"), $(this, "shadowDomManager"), $(this, "canvasManager"), $(this, "processedNodeManager"), $(this, "unattachedDoc"), $(this, "processMutations", function(t) {
      t.forEach(i.processMutation), i.emit();
    }), $(this, "emit", function() {
      if (!(i.frozen || i.locked)) {
        for (var t = [], n = /* @__PURE__ */ new Set(), s = new iy(), o = function(j) {
          for (var k = j, P = Pn; P === Pn; )
            k = k && k.nextSibling, P = k && i.mirror.getId(k);
          return P;
        }, a = function(j) {
          var k = pe.parentNode(j);
          if (!(!k || !wf(j))) {
            var P = !1;
            if (j.nodeType === Node.TEXT_NODE) {
              var G = k.tagName;
              if (G === "TEXTAREA")
                return;
              G === "STYLE" && i.addedSet.has(k) && (P = !0);
            }
            var F = wn(k) ? i.mirror.getId(bf(j)) : i.mirror.getId(k), ae = o(j);
            if (F === -1 || ae === -1)
              return s.addNode(j);
            var ue = zr(j, {
              doc: i.doc,
              mirror: i.mirror,
              blockClass: i.blockClass,
              blockSelector: i.blockSelector,
              maskTextClass: i.maskTextClass,
              maskTextSelector: i.maskTextSelector,
              skipChild: !0,
              newlyAddedElement: !0,
              inlineStylesheet: i.inlineStylesheet,
              maskInputOptions: i.maskInputOptions,
              maskTextFn: i.maskTextFn,
              maskInputFn: i.maskInputFn,
              slimDOMOptions: i.slimDOMOptions,
              dataURLOptions: i.dataURLOptions,
              recordCanvas: i.recordCanvas,
              inlineImages: i.inlineImages,
              onSerialize: function(K) {
                yf(K, i.mirror) && i.iframeManager.addIframe(K), _f(K, i.mirror) && i.stylesheetManager.trackLinkElement(K), qo(j) && i.shadowDomManager.addShadowRoot(pe.shadowRoot(j), i.doc);
              },
              onIframeLoad: function(K, oe) {
                i.iframeManager.attachIframe(K, oe), i.shadowDomManager.observeAttachShadow(K);
              },
              onStylesheetLoad: function(K, oe) {
                i.stylesheetManager.attachLinkElement(K, oe);
              },
              cssCaptured: P
            });
            ue && (t.push({
              parentId: F,
              nextId: ae,
              node: ue
            }), n.add(ue.id));
          }
        }; i.mapRemoves.length; )
          i.mirror.removeNodeFromMap(i.mapRemoves.shift());
        for (var c = W(i.movedSet), l; !(l = c()).done; ) {
          var f = l.value;
          rl(i.removesSubTreeCache, f, i.mirror) && !i.movedSet.has(pe.parentNode(f)) || a(f);
        }
        for (var u = W(i.addedSet), d; !(d = u()).done; ) {
          var v = d.value;
          !nl(i.droppedSet, v) && !rl(i.removesSubTreeCache, v, i.mirror) || nl(i.movedSet, v) ? a(v) : i.droppedSet.add(v);
        }
        for (var p = null; s.length; ) {
          var _ = null;
          if (p) {
            var m = i.mirror.getId(pe.parentNode(p.value)), y = o(p.value);
            m !== -1 && y !== -1 && (_ = p);
          }
          if (!_)
            for (var b = s.tail; b; ) {
              var S = b;
              if (b = b.previous, S) {
                var E = i.mirror.getId(pe.parentNode(S.value)), C = o(S.value);
                if (C === -1) continue;
                if (E !== -1) {
                  _ = S;
                  break;
                } else {
                  var A = S.value, I = pe.parentNode(A);
                  if (I && I.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                    var M = pe.host(I), D = i.mirror.getId(M);
                    if (D !== -1) {
                      _ = S;
                      break;
                    }
                  }
                }
              }
            }
          if (!_) {
            for (; s.head; )
              s.removeNode(s.head.value);
            break;
          }
          p = _.previous, s.removeNode(_.value), a(_.value);
        }
        var L = {
          texts: i.texts.map(function(j) {
            var k = j.node, P = pe.parentNode(k);
            return P && P.tagName === "TEXTAREA" && i.genTextAreaValueMutation(P), {
              id: i.mirror.getId(k),
              value: j.value
            };
          }).filter(function(j) {
            return !n.has(j.id);
          }).filter(function(j) {
            return i.mirror.has(j.id);
          }),
          attributes: i.attributes.map(function(j) {
            var k = j.attributes;
            if (typeof k.style == "string") {
              var P = JSON.stringify(j.styleDiff), G = JSON.stringify(j._unchangedStyles);
              P.length < k.style.length && (P + G).split("var(").length === k.style.split("var(").length && (k.style = j.styleDiff);
            }
            return {
              id: i.mirror.getId(j.node),
              attributes: k
            };
          }).filter(function(j) {
            return !n.has(j.id);
          }).filter(function(j) {
            return i.mirror.has(j.id);
          }),
          removes: i.removes,
          adds: t
        };
        !L.texts.length && !L.attributes.length && !L.removes.length && !L.adds.length || (i.texts = [], i.attributes = [], i.attributeMap = /* @__PURE__ */ new WeakMap(), i.removes = [], i.addedSet = /* @__PURE__ */ new Set(), i.movedSet = /* @__PURE__ */ new Set(), i.droppedSet = /* @__PURE__ */ new Set(), i.removesSubTreeCache = /* @__PURE__ */ new Set(), i.movedMap = {}, i.mutationCb(L));
      }
    }), $(this, "genTextAreaValueMutation", function(t) {
      var n = i.attributeMap.get(t);
      n || (n = {
        node: t,
        attributes: {},
        styleDiff: {},
        _unchangedStyles: {}
      }, i.attributes.push(n), i.attributeMap.set(t, n));
      var s = Array.from(pe.childNodes(t), function(o) {
        return pe.textContent(o) || "";
      }).join("");
      n.attributes.value = Di({
        element: t,
        maskInputOptions: i.maskInputOptions,
        tagName: t.tagName,
        type: Fi(t),
        value: s,
        maskInputFn: i.maskInputFn
      });
    }), $(this, "processMutation", function(t) {
      if (!zs(t.target, i.mirror, i.slimDOMOptions))
        switch (t.type) {
          case "characterData": {
            var n = pe.textContent(t.target);
            !wt(t.target, i.blockClass, i.blockSelector, !1) && n !== t.oldValue && i.texts.push({
              value: Kl(t.target, i.maskTextClass, i.maskTextSelector, !0) && n ? i.maskTextFn ? i.maskTextFn(n, gf(t.target)) : n.replace(/[\S]/g, "*") : n,
              node: t.target
            });
            break;
          }
          case "attributes": {
            var s = t.target, o = t.attributeName, a = t.target.getAttribute(o);
            if (o === "value") {
              var c = Fi(s);
              a = Di({
                element: s,
                maskInputOptions: i.maskInputOptions,
                tagName: s.tagName,
                type: c,
                value: a,
                maskInputFn: i.maskInputFn
              });
            }
            if (wt(t.target, i.blockClass, i.blockSelector, !1) || a === t.oldValue)
              return;
            var l = i.attributeMap.get(t.target);
            if (s.tagName === "IFRAME" && o === "src" && !i.keepIframeSrcFn(a))
              if (!s.contentDocument)
                o = "rr_src";
              else
                return;
            if (l || (l = {
              node: t.target,
              attributes: {},
              styleDiff: {},
              _unchangedStyles: {}
            }, i.attributes.push(l), i.attributeMap.set(t.target, l)), o === "type" && s.tagName === "INPUT" && (t.oldValue || "").toLowerCase() === "password" && s.setAttribute("data-rr-is-password", "true"), !Yl(s.tagName, o))
              if (l.attributes[o] = Hl(i.doc, Or(s.tagName), Or(o), a), o === "style") {
                if (!i.unattachedDoc)
                  try {
                    i.unattachedDoc = document.implementation.createHTMLDocument();
                  } catch {
                    i.unattachedDoc = i.doc;
                  }
                var f = i.unattachedDoc.createElement("span");
                t.oldValue && f.setAttribute("style", t.oldValue);
                for (var u = W(Array.from(s.style)), d; !(d = u()).done; ) {
                  var v = d.value, p = s.style.getPropertyValue(v), _ = s.style.getPropertyPriority(v);
                  p !== f.style.getPropertyValue(v) || _ !== f.style.getPropertyPriority(v) ? _ === "" ? l.styleDiff[v] = p : l.styleDiff[v] = [
                    p,
                    _
                  ] : l._unchangedStyles[v] = [
                    p,
                    _
                  ];
                }
                for (var m = W(Array.from(f.style)), y; !(y = m()).done; ) {
                  var b = y.value;
                  s.style.getPropertyValue(b) === "" && (l.styleDiff[b] = !1);
                }
              } else o === "open" && s.tagName === "DIALOG" && (s.matches("dialog:modal") ? l.attributes.rr_open_mode = "modal" : l.attributes.rr_open_mode = "non-modal");
            break;
          }
          case "childList": {
            if (wt(t.target, i.blockClass, i.blockSelector, !0)) return;
            if (t.target.tagName === "TEXTAREA") {
              i.genTextAreaValueMutation(t.target);
              return;
            }
            t.addedNodes.forEach(function(S) {
              return i.genAdds(S, t.target);
            }), t.removedNodes.forEach(function(S) {
              var E = i.mirror.getId(S), C = wn(t.target) ? i.mirror.getId(pe.host(t.target)) : i.mirror.getId(t.target);
              wt(t.target, i.blockClass, i.blockSelector, !1) || zs(S, i.mirror, i.slimDOMOptions) || !Qm(S, i.mirror) || (i.addedSet.has(S) ? (Ho(i.addedSet, S), i.droppedSet.add(S)) : i.addedSet.has(t.target) && E === -1 || mf(t.target, i.mirror) || (i.movedSet.has(S) && i.movedMap[tl(E, C)] ? Ho(i.movedSet, S) : (i.removes.push({
                parentId: C,
                id: E,
                isShadow: wn(t.target) && Sn(t.target) ? !0 : void 0
              }), oy(S, i.removesSubTreeCache))), i.mapRemoves.push(S));
            });
            break;
          }
        }
    }), $(this, "genAdds", function(t, n) {
      if (!i.processedNodeManager.inOtherBuffer(t, i) && !(i.addedSet.has(t) || i.movedSet.has(t))) {
        if (i.mirror.hasNode(t)) {
          if (zs(t, i.mirror, i.slimDOMOptions))
            return;
          i.movedSet.add(t);
          var s = null;
          n && i.mirror.hasNode(n) && (s = i.mirror.getId(n)), s && s !== -1 && (i.movedMap[tl(i.mirror.getId(t), s)] = !0);
        } else
          i.addedSet.add(t), i.droppedSet.delete(t);
        wt(t, i.blockClass, i.blockSelector, !1) || (pe.childNodes(t).forEach(function(o) {
          return i.genAdds(o);
        }), qo(t) && pe.childNodes(pe.shadowRoot(t)).forEach(function(o) {
          i.processedNodeManager.add(o, i), i.genAdds(o, t);
        }));
      }
    });
  }
  var r = e.prototype;
  return r.init = function(t) {
    var n = this;
    [
      "mutationCb",
      "blockClass",
      "blockSelector",
      "maskTextClass",
      "maskTextSelector",
      "inlineStylesheet",
      "maskInputOptions",
      "maskTextFn",
      "maskInputFn",
      "keepIframeSrcFn",
      "recordCanvas",
      "inlineImages",
      "slimDOMOptions",
      "dataURLOptions",
      "doc",
      "mirror",
      "iframeManager",
      "stylesheetManager",
      "shadowDomManager",
      "canvasManager",
      "processedNodeManager"
    ].forEach(function(s) {
      n[s] = t[s];
    });
  }, r.freeze = function() {
    this.frozen = !0, this.canvasManager.freeze();
  }, r.unfreeze = function() {
    this.frozen = !1, this.canvasManager.unfreeze(), this.emit();
  }, r.isFrozen = function() {
    return this.frozen;
  }, r.lock = function() {
    this.locked = !0, this.canvasManager.lock();
  }, r.unlock = function() {
    this.locked = !1, this.canvasManager.unlock(), this.emit();
  }, r.reset = function() {
    this.shadowDomManager.reset(), this.canvasManager.reset();
  }, e;
})();
function Ho(e, r) {
  e.delete(r), pe.childNodes(r).forEach(function(i) {
    return Ho(e, i);
  });
}
function oy(e, r) {
  for (var i = [
    e
  ]; i.length; ) {
    var t = i.pop();
    r.has(t) || (r.add(t), pe.childNodes(t).forEach(function(n) {
      return i.push(n);
    }));
  }
}
function rl(e, r, i) {
  return e.size === 0 ? !1 : ay(e, r);
}
function ay(e, r, i) {
  var t = pe.parentNode(r);
  return t ? e.has(t) : !1;
}
function nl(e, r) {
  return e.size === 0 ? !1 : xf(e, r);
}
function xf(e, r) {
  var i = pe.parentNode(r);
  return i ? e.has(i) ? !0 : xf(e, i) : !1;
}
var xn;
function cy(e) {
  xn = e;
}
function ly() {
  xn = void 0;
}
var _e = function(e) {
  if (!xn)
    return e;
  var r = function() {
    for (var i = arguments.length, t = new Array(i), n = 0; n < i; n++)
      t[n] = arguments[n];
    try {
      return e.apply(void 0, [].concat(t));
    } catch (s) {
      if (xn && xn(s) === !0)
        return;
      throw s;
    }
  };
  return r;
}, Er = [];
function Xn(e) {
  try {
    if ("composedPath" in e) {
      var r = e.composedPath();
      if (r.length)
        return r[0];
    } else if ("path" in e && e.path.length)
      return e.path[0];
  } catch {
  }
  return e && e.target;
}
function Cf(e, r) {
  var i = new sy();
  Er.push(i), i.init(e);
  var t = new (df())(_e(i.processMutations.bind(i)));
  return t.observe(r, {
    attributes: !0,
    attributeOldValue: !0,
    characterData: !0,
    characterDataOldValue: !0,
    childList: !0,
    subtree: !0
  }), t;
}
function uy(e) {
  var r = e.mousemoveCb, i = e.sampling, t = e.doc, n = e.mirror;
  if (i.mousemove === !1)
    return function() {
    };
  var s = typeof i.mousemove == "number" ? i.mousemove : 50, o = typeof i.mousemoveCallback == "number" ? i.mousemoveCallback : 500, a = [], c, l = zn(_e(function(d) {
    var v = Date.now() - c;
    r(a.map(function(p) {
      return p.timeOffset -= v, p;
    }), d), a = [], c = null;
  }), o), f = _e(zn(_e(function(d) {
    var v = Xn(d), p = Vo(d) ? d.changedTouches[0] : d, _ = p.clientX, m = p.clientY;
    c || (c = Ki()), a.push({
      x: _,
      y: m,
      id: n.getId(v),
      timeOffset: Ki() - c
    }), l(typeof DragEvent < "u" && te(d, DragEvent) ? ne.Drag : te(d, MouseEvent) ? ne.MouseMove : ne.TouchMove);
  }), s, {
    trailing: !1
  })), u = [
    bt("mousemove", f, t),
    bt("touchmove", f, t),
    bt("drag", f, t)
  ];
  return _e(function() {
    u.forEach(function(d) {
      return d();
    });
  });
}
function fy(e) {
  var r = e.mouseInteractionCb, i = e.doc, t = e.mirror, n = e.blockClass, s = e.blockSelector, o = e.sampling;
  if (o.mouseInteraction === !1)
    return function() {
    };
  var a = o.mouseInteraction === !0 || o.mouseInteraction === void 0 ? {} : o.mouseInteraction, c = [], l = null, f = function(u) {
    return function(d) {
      var v = Xn(d);
      if (!wt(v, n, s, !0)) {
        var p = null, _ = u;
        if ("pointerType" in d) {
          switch (d.pointerType) {
            case "mouse":
              p = Zt.Mouse;
              break;
            case "touch":
              p = Zt.Touch;
              break;
            case "pen":
              p = Zt.Pen;
              break;
          }
          p === Zt.Touch ? kt[u] === kt.MouseDown ? _ = "TouchStart" : kt[u] === kt.MouseUp && (_ = "TouchEnd") : Zt.Pen;
        } else Vo(d) && (p = Zt.Touch);
        p !== null ? (l = p, (_.startsWith("Touch") && p === Zt.Touch || _.startsWith("Mouse") && p === Zt.Mouse) && (p = null)) : kt[u] === kt.Click && (p = l, l = null);
        var m = Vo(d) ? d.changedTouches[0] : d;
        if (m) {
          var y = t.getId(v), b = m.clientX, S = m.clientY;
          _e(r)(we({
            type: kt[_],
            id: y,
            x: b,
            y: S
          }, p !== null && {
            pointerType: p
          }));
        }
      }
    };
  };
  return Object.keys(kt).filter(function(u) {
    return Number.isNaN(Number(u)) && !u.endsWith("_Departed") && a[u] !== !1;
  }).forEach(function(u) {
    var d = Or(u), v = f(u);
    if (window.PointerEvent)
      switch (kt[u]) {
        case kt.MouseDown:
        case kt.MouseUp:
          d = d.replace("mouse", "pointer");
          break;
        case kt.TouchStart:
        case kt.TouchEnd:
          return;
      }
    c.push(bt(d, v, i));
  }), _e(function() {
    c.forEach(function(u) {
      return u();
    });
  });
}
function kf(e) {
  var r = e.scrollCb, i = e.doc, t = e.mirror, n = e.blockClass, s = e.blockSelector, o = e.sampling, a = _e(zn(_e(function(c) {
    var l = Xn(c);
    if (!(!l || wt(l, n, s, !0))) {
      var f = t.getId(l);
      if (l === i && i.defaultView) {
        var u = hf(i.defaultView);
        r({
          id: f,
          x: u.left,
          y: u.top
        });
      } else
        r({
          id: f,
          x: l.scrollLeft,
          y: l.scrollTop
        });
    }
  }), o.scroll || 100));
  return bt("scroll", a, i);
}
function dy(e, r) {
  var i = e.viewportResizeCb, t = r.win, n = -1, s = -1, o = _e(zn(_e(function() {
    var a = pf(), c = vf();
    (n !== a || s !== c) && (i({
      width: Number(c),
      height: Number(a)
    }), n = a, s = c);
  }), 200));
  return bt("resize", o, t);
}
var hy = [
  "INPUT",
  "TEXTAREA",
  "SELECT"
], il = /* @__PURE__ */ new WeakMap();
function py(e) {
  var r = e.inputCb, i = e.doc, t = e.mirror, n = e.blockClass, s = e.blockSelector, o = e.ignoreClass, a = e.ignoreSelector, c = e.maskInputOptions, l = e.maskInputFn, f = e.sampling, u = e.userTriggeredOnInput;
  function d(E) {
    var C = Xn(E), A = E.isTrusted, I = C && C.tagName;
    if (C && I === "OPTION" && (C = pe.parentElement(C)), !(!C || !I || hy.indexOf(I) < 0 || wt(C, n, s, !0)) && !(C.classList.contains(o) || a && C.matches(a))) {
      var M = C.value, D = !1, L = Fi(C) || "";
      L === "radio" || L === "checkbox" ? D = C.checked : (c[I.toLowerCase()] || c[L]) && (M = Di({
        element: C,
        maskInputOptions: c,
        tagName: I,
        type: L,
        value: M,
        maskInputFn: l
      })), v(C, u ? {
        text: M,
        isChecked: D,
        userTriggered: A
      } : {
        text: M,
        isChecked: D
      });
      var j = C.name;
      L === "radio" && j && D && i.querySelectorAll('input[type="radio"][name="' + j + '"]').forEach(function(k) {
        if (k !== C) {
          var P = k.value;
          v(k, u ? {
            text: P,
            isChecked: !D,
            userTriggered: !1
          } : {
            text: P,
            isChecked: !D
          });
        }
      });
    }
  }
  function v(E, C) {
    var A = il.get(E);
    if (!A || A.text !== C.text || A.isChecked !== C.isChecked) {
      il.set(E, C);
      var I = t.getId(E);
      _e(r)(we({}, C, {
        id: I
      }));
    }
  }
  var p = f.input === "last" ? [
    "change"
  ] : [
    "input",
    "change"
  ], _ = p.map(function(E) {
    return bt(E, _e(d), i);
  }), m = i.defaultView;
  if (!m)
    return function() {
      _.forEach(function(E) {
        return E();
      });
    };
  var y = m.Object.getOwnPropertyDescriptor(m.HTMLInputElement.prototype, "value"), b = [
    [
      m.HTMLInputElement.prototype,
      "value"
    ],
    [
      m.HTMLInputElement.prototype,
      "checked"
    ],
    [
      m.HTMLSelectElement.prototype,
      "value"
    ],
    [
      m.HTMLTextAreaElement.prototype,
      "value"
    ],
    // Some UI library use selectedIndex to set select value
    [
      m.HTMLSelectElement.prototype,
      "selectedIndex"
    ],
    [
      m.HTMLOptionElement.prototype,
      "selected"
    ]
  ];
  if (y && y.set) {
    var S;
    (S = _).push.apply(S, [].concat(b.map(function(E) {
      return bs(E[0], E[1], {
        set: function() {
          _e(d)({
            target: this,
            isTrusted: !1
          });
        }
      }, !1, m);
    })));
  }
  return _e(function() {
    _.forEach(function(E) {
      return E();
    });
  });
}
function Ji(e) {
  var r = [];
  function i(t, n) {
    if (ki("CSSGroupingRule") && te(t.parentRule, CSSGroupingRule) || ki("CSSMediaRule") && te(t.parentRule, CSSMediaRule) || ki("CSSSupportsRule") && te(t.parentRule, CSSSupportsRule) || ki("CSSConditionRule") && te(t.parentRule, CSSConditionRule)) {
      var s = Array.from(t.parentRule.cssRules), o = s.indexOf(t);
      n.unshift(o);
    } else if (t.parentStyleSheet) {
      var a = Array.from(t.parentStyleSheet.cssRules), c = a.indexOf(t);
      n.unshift(c);
    }
    return n;
  }
  return i(e, r);
}
function cr(e, r, i) {
  var t, n;
  return e ? (e.ownerNode ? t = r.getId(e.ownerNode) : n = i.getId(e), {
    styleId: n,
    id: t
  }) : {};
}
function vy(e, r) {
  var i = e.styleSheetRuleCb, t = e.mirror, n = e.stylesheetManager, s = r.win;
  if (!s.CSSStyleSheet || !s.CSSStyleSheet.prototype)
    return function() {
    };
  var o = s.CSSStyleSheet.prototype.insertRule;
  s.CSSStyleSheet.prototype.insertRule = new Proxy(o, {
    apply: _e(function(d, v, p) {
      var _ = p[0], m = p[1], y = cr(v, t, n.styleMirror), b = y.id, S = y.styleId;
      return (b && b !== -1 || S && S !== -1) && i({
        id: b,
        styleId: S,
        adds: [
          {
            rule: _,
            index: m
          }
        ]
      }), d.apply(v, p);
    })
  }), s.CSSStyleSheet.prototype.addRule = function(d, v, p) {
    p === void 0 && (p = this.cssRules.length);
    var _ = d + " { " + v + " }";
    return s.CSSStyleSheet.prototype.insertRule.apply(this, [
      _,
      p
    ]);
  };
  var a = s.CSSStyleSheet.prototype.deleteRule;
  s.CSSStyleSheet.prototype.deleteRule = new Proxy(a, {
    apply: _e(function(d, v, p) {
      var _ = p[0], m = cr(v, t, n.styleMirror), y = m.id, b = m.styleId;
      return (y && y !== -1 || b && b !== -1) && i({
        id: y,
        styleId: b,
        removes: [
          {
            index: _
          }
        ]
      }), d.apply(v, p);
    })
  }), s.CSSStyleSheet.prototype.removeRule = function(d) {
    return s.CSSStyleSheet.prototype.deleteRule.apply(this, [
      d
    ]);
  };
  var c;
  s.CSSStyleSheet.prototype.replace && (c = s.CSSStyleSheet.prototype.replace, s.CSSStyleSheet.prototype.replace = new Proxy(c, {
    apply: _e(function(d, v, p) {
      var _ = p[0], m = cr(v, t, n.styleMirror), y = m.id, b = m.styleId;
      return (y && y !== -1 || b && b !== -1) && i({
        id: y,
        styleId: b,
        replace: _
      }), d.apply(v, p);
    })
  }));
  var l;
  s.CSSStyleSheet.prototype.replaceSync && (l = s.CSSStyleSheet.prototype.replaceSync, s.CSSStyleSheet.prototype.replaceSync = new Proxy(l, {
    apply: _e(function(d, v, p) {
      var _ = p[0], m = cr(v, t, n.styleMirror), y = m.id, b = m.styleId;
      return (y && y !== -1 || b && b !== -1) && i({
        id: y,
        styleId: b,
        replaceSync: _
      }), d.apply(v, p);
    })
  }));
  var f = {};
  Ei("CSSGroupingRule") ? f.CSSGroupingRule = s.CSSGroupingRule : (Ei("CSSMediaRule") && (f.CSSMediaRule = s.CSSMediaRule), Ei("CSSConditionRule") && (f.CSSConditionRule = s.CSSConditionRule), Ei("CSSSupportsRule") && (f.CSSSupportsRule = s.CSSSupportsRule));
  var u = {};
  return Object.entries(f).forEach(function(d) {
    var v = d[0], p = d[1];
    u[v] = {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      insertRule: p.prototype.insertRule,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deleteRule: p.prototype.deleteRule
    }, p.prototype.insertRule = new Proxy(u[v].insertRule, {
      apply: _e(function(_, m, y) {
        var b = y[0], S = y[1], E = cr(m.parentStyleSheet, t, n.styleMirror), C = E.id, A = E.styleId;
        return (C && C !== -1 || A && A !== -1) && i({
          id: C,
          styleId: A,
          adds: [
            {
              rule: b,
              index: [].concat(Ji(m), [
                S || 0
              ])
            }
          ]
        }), _.apply(m, y);
      })
    }), p.prototype.deleteRule = new Proxy(u[v].deleteRule, {
      apply: _e(function(_, m, y) {
        var b = y[0], S = cr(m.parentStyleSheet, t, n.styleMirror), E = S.id, C = S.styleId;
        return (E && E !== -1 || C && C !== -1) && i({
          id: E,
          styleId: C,
          removes: [
            {
              index: [].concat(Ji(m), [
                b
              ])
            }
          ]
        }), _.apply(m, y);
      })
    });
  }), _e(function() {
    s.CSSStyleSheet.prototype.insertRule = o, s.CSSStyleSheet.prototype.deleteRule = a, c && (s.CSSStyleSheet.prototype.replace = c), l && (s.CSSStyleSheet.prototype.replaceSync = l), Object.entries(f).forEach(function(d) {
      var v = d[0], p = d[1];
      p.prototype.insertRule = u[v].insertRule, p.prototype.deleteRule = u[v].deleteRule;
    });
  });
}
function Ef(e, r) {
  var i = e.mirror, t = e.stylesheetManager, n, s, o, a = null;
  r.nodeName === "#document" ? a = i.getId(r) : a = i.getId(pe.host(r));
  var c = r.nodeName === "#document" ? (n = r.defaultView) == null ? void 0 : n.Document : (o = (s = r.ownerDocument) == null ? void 0 : s.defaultView) == null ? void 0 : o.ShadowRoot, l = c != null && c.prototype ? Object.getOwnPropertyDescriptor(c == null ? void 0 : c.prototype, "adoptedStyleSheets") : void 0;
  return a === null || a === -1 || !c || !l ? function() {
  } : (Object.defineProperty(r, "adoptedStyleSheets", {
    configurable: l.configurable,
    enumerable: l.enumerable,
    get: function() {
      var u;
      return (u = l.get) == null ? void 0 : u.call(this);
    },
    set: function(u) {
      var d, v = (d = l.set) == null ? void 0 : d.call(this, u);
      if (a !== null && a !== -1)
        try {
          t.adoptStyleSheets(u, a);
        } catch {
        }
      return v;
    }
  }), _e(function() {
    Object.defineProperty(r, "adoptedStyleSheets", {
      configurable: l.configurable,
      enumerable: l.enumerable,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      get: l.get,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      set: l.set
    });
  }));
}
function gy(e, r) {
  var i = e.styleDeclarationCb, t = e.mirror, n = e.ignoreCSSAttributes, s = e.stylesheetManager, o = r.win, a = o.CSSStyleDeclaration.prototype.setProperty;
  o.CSSStyleDeclaration.prototype.setProperty = new Proxy(a, {
    apply: _e(function(l, f, u) {
      var d, v = u[0], p = u[1], _ = u[2];
      if (n.has(v))
        return a.apply(f, [
          v,
          p,
          _
        ]);
      var m = cr((d = f.parentRule) == null ? void 0 : d.parentStyleSheet, t, s.styleMirror), y = m.id, b = m.styleId;
      return (y && y !== -1 || b && b !== -1) && i({
        id: y,
        styleId: b,
        set: {
          property: v,
          value: p,
          priority: _
        },
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        index: Ji(f.parentRule)
      }), l.apply(f, u);
    })
  });
  var c = o.CSSStyleDeclaration.prototype.removeProperty;
  return o.CSSStyleDeclaration.prototype.removeProperty = new Proxy(c, {
    apply: _e(function(l, f, u) {
      var d, v = u[0];
      if (n.has(v))
        return c.apply(f, [
          v
        ]);
      var p = cr((d = f.parentRule) == null ? void 0 : d.parentStyleSheet, t, s.styleMirror), _ = p.id, m = p.styleId;
      return (_ && _ !== -1 || m && m !== -1) && i({
        id: _,
        styleId: m,
        remove: {
          property: v
        },
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        index: Ji(f.parentRule)
      }), l.apply(f, u);
    })
  }), _e(function() {
    o.CSSStyleDeclaration.prototype.setProperty = a, o.CSSStyleDeclaration.prototype.removeProperty = c;
  });
}
function my(e) {
  var r = e.mediaInteractionCb, i = e.blockClass, t = e.blockSelector, n = e.mirror, s = e.sampling, o = e.doc, a = _e(function(l) {
    return zn(_e(function(f) {
      var u = Xn(f);
      if (!(!u || wt(u, i, t, !0))) {
        var d = u.currentTime, v = u.volume, p = u.muted, _ = u.playbackRate, m = u.loop;
        r({
          type: l,
          id: n.getId(u),
          currentTime: d,
          volume: v,
          muted: p,
          playbackRate: _,
          loop: m
        });
      }
    }), s.media || 500);
  }), c = [
    bt("play", a(Br.Play), o),
    bt("pause", a(Br.Pause), o),
    bt("seeked", a(Br.Seeked), o),
    bt("volumechange", a(Br.VolumeChange), o),
    bt("ratechange", a(Br.RateChange), o)
  ];
  return _e(function() {
    c.forEach(function(l) {
      return l();
    });
  });
}
function yy(e) {
  var r = e.fontCb, i = e.doc, t = i.defaultView;
  if (!t)
    return function() {
    };
  var n = [], s = /* @__PURE__ */ new WeakMap(), o = t.FontFace;
  t.FontFace = function(l, f, u) {
    var d = new o(l, f, u);
    return s.set(d, {
      family: l,
      buffer: typeof f != "string",
      descriptors: u,
      fontSource: typeof f == "string" ? f : JSON.stringify(Array.from(new Uint8Array(f)))
    }), d;
  };
  var a = Mr(i.fonts, "add", function(c) {
    return function(l) {
      return setTimeout(_e(function() {
        var f = s.get(l);
        f && (r(f), s.delete(l));
      }), 0), c.apply(this, [
        l
      ]);
    };
  });
  return n.push(function() {
    t.FontFace = o;
  }), n.push(a), _e(function() {
    n.forEach(function(c) {
      return c();
    });
  });
}
function _y(e) {
  var r = e.doc, i = e.mirror, t = e.blockClass, n = e.blockSelector, s = e.selectionCb, o = !0, a = _e(function() {
    var c = r.getSelection();
    if (!(!c || o && (c != null && c.isCollapsed))) {
      o = c.isCollapsed || !1;
      for (var l = [], f = c.rangeCount || 0, u = 0; u < f; u++) {
        var d = c.getRangeAt(u), v = d.startContainer, p = d.startOffset, _ = d.endContainer, m = d.endOffset, y = wt(v, t, n, !0) || wt(_, t, n, !0);
        y || l.push({
          start: i.getId(v),
          startOffset: p,
          end: i.getId(_),
          endOffset: m
        });
      }
      s({
        ranges: l
      });
    }
  });
  return a(), bt("selectionchange", a);
}
function by(e) {
  var r = e.doc, i = e.customElementCb, t = r.defaultView;
  if (!t || !t.customElements) return function() {
  };
  var n = Mr(t.customElements, "define", function(s) {
    return function(o, a, c) {
      try {
        i({
          define: {
            name: o
          }
        });
      } catch {
        console.warn("Custom element callback failed for " + o);
      }
      return s.apply(this, [
        o,
        a,
        c
      ]);
    };
  });
  return n;
}
function wy(e, r) {
  var i = e.mutationCb, t = e.mousemoveCb, n = e.mouseInteractionCb, s = e.scrollCb, o = e.viewportResizeCb, a = e.inputCb, c = e.mediaInteractionCb, l = e.styleSheetRuleCb, f = e.styleDeclarationCb, u = e.canvasMutationCb, d = e.fontCb, v = e.selectionCb, p = e.customElementCb;
  e.mutationCb = function() {
    for (var _ = arguments.length, m = new Array(_), y = 0; y < _; y++)
      m[y] = arguments[y];
    if (r.mutation) {
      var b;
      (b = r).mutation.apply(b, [].concat(m));
    }
    i.apply(void 0, [].concat(m));
  }, e.mousemoveCb = function() {
    for (var _ = arguments.length, m = new Array(_), y = 0; y < _; y++)
      m[y] = arguments[y];
    if (r.mousemove) {
      var b;
      (b = r).mousemove.apply(b, [].concat(m));
    }
    t.apply(void 0, [].concat(m));
  }, e.mouseInteractionCb = function() {
    for (var _ = arguments.length, m = new Array(_), y = 0; y < _; y++)
      m[y] = arguments[y];
    if (r.mouseInteraction) {
      var b;
      (b = r).mouseInteraction.apply(b, [].concat(m));
    }
    n.apply(void 0, [].concat(m));
  }, e.scrollCb = function() {
    for (var _ = arguments.length, m = new Array(_), y = 0; y < _; y++)
      m[y] = arguments[y];
    if (r.scroll) {
      var b;
      (b = r).scroll.apply(b, [].concat(m));
    }
    s.apply(void 0, [].concat(m));
  }, e.viewportResizeCb = function() {
    for (var _ = arguments.length, m = new Array(_), y = 0; y < _; y++)
      m[y] = arguments[y];
    if (r.viewportResize) {
      var b;
      (b = r).viewportResize.apply(b, [].concat(m));
    }
    o.apply(void 0, [].concat(m));
  }, e.inputCb = function() {
    for (var _ = arguments.length, m = new Array(_), y = 0; y < _; y++)
      m[y] = arguments[y];
    if (r.input) {
      var b;
      (b = r).input.apply(b, [].concat(m));
    }
    a.apply(void 0, [].concat(m));
  }, e.mediaInteractionCb = function() {
    for (var _ = arguments.length, m = new Array(_), y = 0; y < _; y++)
      m[y] = arguments[y];
    if (r.mediaInteaction) {
      var b;
      (b = r).mediaInteaction.apply(b, [].concat(m));
    }
    c.apply(void 0, [].concat(m));
  }, e.styleSheetRuleCb = function() {
    for (var _ = arguments.length, m = new Array(_), y = 0; y < _; y++)
      m[y] = arguments[y];
    if (r.styleSheetRule) {
      var b;
      (b = r).styleSheetRule.apply(b, [].concat(m));
    }
    l.apply(void 0, [].concat(m));
  }, e.styleDeclarationCb = function() {
    for (var _ = arguments.length, m = new Array(_), y = 0; y < _; y++)
      m[y] = arguments[y];
    if (r.styleDeclaration) {
      var b;
      (b = r).styleDeclaration.apply(b, [].concat(m));
    }
    f.apply(void 0, [].concat(m));
  }, e.canvasMutationCb = function() {
    for (var _ = arguments.length, m = new Array(_), y = 0; y < _; y++)
      m[y] = arguments[y];
    if (r.canvasMutation) {
      var b;
      (b = r).canvasMutation.apply(b, [].concat(m));
    }
    u.apply(void 0, [].concat(m));
  }, e.fontCb = function() {
    for (var _ = arguments.length, m = new Array(_), y = 0; y < _; y++)
      m[y] = arguments[y];
    if (r.font) {
      var b;
      (b = r).font.apply(b, [].concat(m));
    }
    d.apply(void 0, [].concat(m));
  }, e.selectionCb = function() {
    for (var _ = arguments.length, m = new Array(_), y = 0; y < _; y++)
      m[y] = arguments[y];
    if (r.selection) {
      var b;
      (b = r).selection.apply(b, [].concat(m));
    }
    v.apply(void 0, [].concat(m));
  }, e.customElementCb = function() {
    for (var _ = arguments.length, m = new Array(_), y = 0; y < _; y++)
      m[y] = arguments[y];
    if (r.customElement) {
      var b;
      (b = r).customElement.apply(b, [].concat(m));
    }
    p.apply(void 0, [].concat(m));
  };
}
function Sy(e, r) {
  r === void 0 && (r = {});
  var i = e.doc.defaultView;
  if (!i)
    return function() {
    };
  wy(e, r);
  var t;
  e.recordDOM && (t = Cf(e, e.doc));
  var n = uy(e), s = fy(e), o = kf(e), a = dy(e, {
    win: i
  }), c = py(e), l = my(e), f = function() {
  }, u = function() {
  }, d = function() {
  }, v = function() {
  };
  e.recordDOM && (f = vy(e, {
    win: i
  }), u = Ef(e, e.doc), d = gy(e, {
    win: i
  }), e.collectFonts && (v = yy(e)));
  for (var p = _y(e), _ = by(e), m = [], y = W(e.plugins), b; !(b = y()).done; ) {
    var S = b.value;
    m.push(S.observer(S.callback, i, S.options));
  }
  return _e(function() {
    Er.forEach(function(E) {
      return E.reset();
    }), t == null || t.disconnect(), n(), s(), o(), a(), c(), l(), f(), u(), d(), v(), p(), _(), m.forEach(function(E) {
      return E();
    });
  });
}
function ki(e) {
  return typeof window[e] < "u";
}
function Ei(e) {
  return !!(typeof window[e] < "u" && // Note: Generally, this check _shouldn't_ be necessary
  // However, in some scenarios (e.g. jsdom) this can sometimes fail, so we check for it here
  window[e].prototype && "insertRule" in window[e].prototype && "deleteRule" in window[e].prototype);
}
var sl = /* @__PURE__ */ (function() {
  function e(i) {
    $(this, "iframeIdToRemoteIdMap", /* @__PURE__ */ new WeakMap()), $(this, "iframeRemoteIdToIdMap", /* @__PURE__ */ new WeakMap()), this.generateIdFn = i;
  }
  var r = e.prototype;
  return r.getId = function(t, n, s, o) {
    var a = s || this.getIdToRemoteIdMap(t), c = o || this.getRemoteIdToIdMap(t), l = a.get(n);
    return l || (l = this.generateIdFn(), a.set(n, l), c.set(l, n)), l;
  }, r.getIds = function(t, n) {
    var s = this, o = this.getIdToRemoteIdMap(t), a = this.getRemoteIdToIdMap(t);
    return n.map(function(c) {
      return s.getId(t, c, o, a);
    });
  }, r.getRemoteId = function(t, n, s) {
    var o = s || this.getRemoteIdToIdMap(t);
    if (typeof n != "number") return n;
    var a = o.get(n);
    return a || -1;
  }, r.getRemoteIds = function(t, n) {
    var s = this, o = this.getRemoteIdToIdMap(t);
    return n.map(function(a) {
      return s.getRemoteId(t, a, o);
    });
  }, r.reset = function(t) {
    if (!t) {
      this.iframeIdToRemoteIdMap = /* @__PURE__ */ new WeakMap(), this.iframeRemoteIdToIdMap = /* @__PURE__ */ new WeakMap();
      return;
    }
    this.iframeIdToRemoteIdMap.delete(t), this.iframeRemoteIdToIdMap.delete(t);
  }, r.getIdToRemoteIdMap = function(t) {
    var n = this.iframeIdToRemoteIdMap.get(t);
    return n || (n = /* @__PURE__ */ new Map(), this.iframeIdToRemoteIdMap.set(t, n)), n;
  }, r.getRemoteIdToIdMap = function(t) {
    var n = this.iframeRemoteIdToIdMap.get(t);
    return n || (n = /* @__PURE__ */ new Map(), this.iframeRemoteIdToIdMap.set(t, n)), n;
  }, e;
})(), xy = /* @__PURE__ */ (function() {
  function e(i) {
    $(this, "iframes", /* @__PURE__ */ new WeakMap()), $(this, "crossOriginIframeMap", /* @__PURE__ */ new WeakMap()), $(this, "crossOriginIframeMirror", new sl(ql)), $(this, "crossOriginIframeStyleMirror"), $(this, "crossOriginIframeRootIdMap", /* @__PURE__ */ new WeakMap()), $(this, "mirror"), $(this, "mutationCb"), $(this, "wrappedEmit"), $(this, "loadListener"), $(this, "stylesheetManager"), $(this, "recordCrossOriginIframes"), this.mutationCb = i.mutationCb, this.wrappedEmit = i.wrappedEmit, this.stylesheetManager = i.stylesheetManager, this.recordCrossOriginIframes = i.recordCrossOriginIframes, this.crossOriginIframeStyleMirror = new sl(this.stylesheetManager.styleMirror.generateId.bind(this.stylesheetManager.styleMirror)), this.mirror = i.mirror, this.recordCrossOriginIframes && window.addEventListener("message", this.handleMessage.bind(this));
  }
  var r = e.prototype;
  return r.addIframe = function(t) {
    this.iframes.set(t, !0), t.contentWindow && this.crossOriginIframeMap.set(t.contentWindow, t);
  }, r.addLoadListener = function(t) {
    this.loadListener = t;
  }, r.attachIframe = function(t, n) {
    var s, o;
    this.mutationCb({
      adds: [
        {
          parentId: this.mirror.getId(t),
          nextId: null,
          node: n
        }
      ],
      removes: [],
      texts: [],
      attributes: [],
      isAttachIframe: !0
    }), this.recordCrossOriginIframes && ((s = t.contentWindow) == null || s.addEventListener("message", this.handleMessage.bind(this))), (o = this.loadListener) == null || o.call(this, t), t.contentDocument && t.contentDocument.adoptedStyleSheets && t.contentDocument.adoptedStyleSheets.length > 0 && this.stylesheetManager.adoptStyleSheets(t.contentDocument.adoptedStyleSheets, this.mirror.getId(t.contentDocument));
  }, r.handleMessage = function(t) {
    var n = t;
    if (!(n.data.type !== "rrweb" || // To filter out the rrweb messages which are forwarded by some sites.
    n.origin !== n.data.origin)) {
      var s = t.source;
      if (s) {
        var o = this.crossOriginIframeMap.get(t.source);
        if (o) {
          var a = this.transformCrossOriginEvent(o, n.data.event);
          a && this.wrappedEmit(a, n.data.isCheckout);
        }
      }
    }
  }, r.transformCrossOriginEvent = function(t, n) {
    var s = this, o;
    switch (n.type) {
      case ve.FullSnapshot: {
        this.crossOriginIframeMirror.reset(t), this.crossOriginIframeStyleMirror.reset(t), this.replaceIdOnNode(n.data.node, t);
        var a = n.data.node.id;
        return this.crossOriginIframeRootIdMap.set(t, a), this.patchRootIdOnNode(n.data.node, a), {
          timestamp: n.timestamp,
          type: ve.IncrementalSnapshot,
          data: {
            source: ne.Mutation,
            adds: [
              {
                parentId: this.mirror.getId(t),
                nextId: null,
                node: n.data.node
              }
            ],
            removes: [],
            texts: [],
            attributes: [],
            isAttachIframe: !0
          }
        };
      }
      case ve.Meta:
      case ve.Load:
      case ve.DomContentLoaded:
        return !1;
      case ve.Plugin:
        return n;
      case ve.Custom:
        return this.replaceIds(n.data.payload, t, [
          "id",
          "parentId",
          "previousId",
          "nextId"
        ]), n;
      case ve.IncrementalSnapshot:
        switch (n.data.source) {
          case ne.Mutation:
            return n.data.adds.forEach(function(c) {
              s.replaceIds(c, t, [
                "parentId",
                "nextId",
                "previousId"
              ]), s.replaceIdOnNode(c.node, t);
              var l = s.crossOriginIframeRootIdMap.get(t);
              l && s.patchRootIdOnNode(c.node, l);
            }), n.data.removes.forEach(function(c) {
              s.replaceIds(c, t, [
                "parentId",
                "id"
              ]);
            }), n.data.attributes.forEach(function(c) {
              s.replaceIds(c, t, [
                "id"
              ]);
            }), n.data.texts.forEach(function(c) {
              s.replaceIds(c, t, [
                "id"
              ]);
            }), n;
          case ne.Drag:
          case ne.TouchMove:
          case ne.MouseMove:
            return n.data.positions.forEach(function(c) {
              s.replaceIds(c, t, [
                "id"
              ]);
            }), n;
          case ne.ViewportResize:
            return !1;
          case ne.MediaInteraction:
          case ne.MouseInteraction:
          case ne.Scroll:
          case ne.CanvasMutation:
          case ne.Input:
            return this.replaceIds(n.data, t, [
              "id"
            ]), n;
          case ne.StyleSheetRule:
          case ne.StyleDeclaration:
            return this.replaceIds(n.data, t, [
              "id"
            ]), this.replaceStyleIds(n.data, t, [
              "styleId"
            ]), n;
          case ne.Font:
            return n;
          case ne.Selection:
            return n.data.ranges.forEach(function(c) {
              s.replaceIds(c, t, [
                "start",
                "end"
              ]);
            }), n;
          case ne.AdoptedStyleSheet:
            return this.replaceIds(n.data, t, [
              "id"
            ]), this.replaceStyleIds(n.data, t, [
              "styleIds"
            ]), (o = n.data.styles) == null || o.forEach(function(c) {
              s.replaceStyleIds(c, t, [
                "styleId"
              ]);
            }), n;
        }
    }
    return !1;
  }, r.replace = function(t, n, s, o) {
    for (var a = W(o), c; !(c = a()).done; ) {
      var l = c.value;
      !Array.isArray(n[l]) && typeof n[l] != "number" || (Array.isArray(n[l]) ? n[l] = t.getIds(s, n[l]) : n[l] = t.getId(s, n[l]));
    }
    return n;
  }, r.replaceIds = function(t, n, s) {
    return this.replace(this.crossOriginIframeMirror, t, n, s);
  }, r.replaceStyleIds = function(t, n, s) {
    return this.replace(this.crossOriginIframeStyleMirror, t, n, s);
  }, r.replaceIdOnNode = function(t, n) {
    var s = this;
    this.replaceIds(t, n, [
      "id",
      "rootId"
    ]), "childNodes" in t && t.childNodes.forEach(function(o) {
      s.replaceIdOnNode(o, n);
    });
  }, r.patchRootIdOnNode = function(t, n) {
    var s = this;
    t.type !== Sf.Document && !t.rootId && (t.rootId = n), "childNodes" in t && t.childNodes.forEach(function(o) {
      s.patchRootIdOnNode(o, n);
    });
  }, e;
})(), Cy = /* @__PURE__ */ (function() {
  function e(i) {
    $(this, "shadowDoms", /* @__PURE__ */ new WeakSet()), $(this, "mutationCb"), $(this, "scrollCb"), $(this, "bypassOptions"), $(this, "mirror"), $(this, "restoreHandlers", []), this.mutationCb = i.mutationCb, this.scrollCb = i.scrollCb, this.bypassOptions = i.bypassOptions, this.mirror = i.mirror, this.init();
  }
  var r = e.prototype;
  return r.init = function() {
    this.reset(), this.patchAttachShadow(Element, document);
  }, r.addShadowRoot = function(t, n) {
    var s = this;
    if (Sn(t) && !this.shadowDoms.has(t)) {
      this.shadowDoms.add(t);
      var o = Cf(we({}, this.bypassOptions, {
        doc: n,
        mutationCb: this.mutationCb,
        mirror: this.mirror,
        shadowDomManager: this
      }), t);
      this.restoreHandlers.push(function() {
        return o.disconnect();
      }), this.restoreHandlers.push(kf(we({}, this.bypassOptions, {
        scrollCb: this.scrollCb,
        // https://gist.github.com/praveenpuglia/0832da687ed5a5d7a0907046c9ef1813
        // scroll is not allowed to pass the boundary, so we need to listen the shadow document
        doc: t,
        mirror: this.mirror
      }))), setTimeout(function() {
        t.adoptedStyleSheets && t.adoptedStyleSheets.length > 0 && s.bypassOptions.stylesheetManager.adoptStyleSheets(t.adoptedStyleSheets, s.mirror.getId(pe.host(t))), s.restoreHandlers.push(Ef({
          mirror: s.mirror,
          stylesheetManager: s.bypassOptions.stylesheetManager
        }, t));
      }, 0);
    }
  }, r.observeAttachShadow = function(t) {
    !t.contentWindow || !t.contentDocument || this.patchAttachShadow(t.contentWindow.Element, t.contentDocument);
  }, r.patchAttachShadow = function(t, n) {
    var s = this;
    this.restoreHandlers.push(Mr(t.prototype, "attachShadow", function(o) {
      return function(a) {
        var c = o.call(this, a), l = pe.shadowRoot(this);
        return l && wf(this) && s.addShadowRoot(l, n), c;
      };
    }));
  }, r.reset = function() {
    this.restoreHandlers.forEach(function(t) {
      try {
        t();
      } catch {
      }
    }), this.restoreHandlers = [], this.shadowDoms = /* @__PURE__ */ new WeakSet();
  }, e;
})(), Gr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", ky = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var Ii = 0; Ii < Gr.length; Ii++)
  ky[Gr.charCodeAt(Ii)] = Ii;
var Ey = function(r) {
  var i = new Uint8Array(r), t, n = i.length, s = "";
  for (t = 0; t < n; t += 3)
    s += Gr[i[t] >> 2], s += Gr[(i[t] & 3) << 4 | i[t + 1] >> 4], s += Gr[(i[t + 1] & 15) << 2 | i[t + 2] >> 6], s += Gr[i[t + 2] & 63];
  return n % 3 === 2 ? s = s.substring(0, s.length - 1) + "=" : n % 3 === 1 && (s = s.substring(0, s.length - 2) + "=="), s;
}, ol = /* @__PURE__ */ new Map();
function Iy(e, r) {
  var i = ol.get(e);
  return i || (i = /* @__PURE__ */ new Map(), ol.set(e, i)), i.has(r) || i.set(r, []), i.get(r);
}
var If = function(e, r, i) {
  if (!(!e || !(Af(e, r) || (typeof e > "u" ? "undefined" : ce(e)) === "object"))) {
    var t = e.constructor.name, n = Iy(i, t), s = n.indexOf(e);
    return s === -1 && (s = n.length, n.push(e)), s;
  }
};
function Pi(e, r, i) {
  if (te(e, Array))
    return e.map(function(p) {
      return Pi(p, r, i);
    });
  if (e === null)
    return e;
  if (te(e, Float32Array) || te(e, Float64Array) || te(e, Int32Array) || te(e, Uint32Array) || te(e, Uint8Array) || te(e, Uint16Array) || te(e, Int16Array) || te(e, Int8Array) || te(e, Uint8ClampedArray)) {
    var t = e.constructor.name;
    return {
      rr_type: t,
      args: [
        Object.values(e)
      ]
    };
  } else if (
    // SharedArrayBuffer disabled on most browsers due to spectre.
    // More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/SharedArrayBuffer
    // value instanceof SharedArrayBuffer ||
    te(e, ArrayBuffer)
  ) {
    var n = e.constructor.name, s = Ey(e);
    return {
      rr_type: n,
      base64: s
    };
  } else if (te(e, DataView)) {
    var o = e.constructor.name;
    return {
      rr_type: o,
      args: [
        Pi(e.buffer, r, i),
        e.byteOffset,
        e.byteLength
      ]
    };
  } else if (te(e, HTMLImageElement)) {
    var a = e.constructor.name, c = e.src;
    return {
      rr_type: a,
      src: c
    };
  } else if (te(e, HTMLCanvasElement)) {
    var l = "HTMLImageElement", f = e.toDataURL();
    return {
      rr_type: l,
      src: f
    };
  } else if (te(e, ImageData)) {
    var u = e.constructor.name;
    return {
      rr_type: u,
      args: [
        Pi(e.data, r, i),
        e.width,
        e.height
      ]
    };
  } else if (Af(e, r) || (typeof e > "u" ? "undefined" : ce(e)) === "object") {
    var d = e.constructor.name, v = If(e, r, i);
    return {
      rr_type: d,
      index: v
    };
  }
  return e;
}
var Of = function(e, r, i) {
  return e.map(function(t) {
    return Pi(t, r, i);
  });
}, Af = function(e, r) {
  var i = [
    "WebGLActiveInfo",
    "WebGLBuffer",
    "WebGLFramebuffer",
    "WebGLProgram",
    "WebGLRenderbuffer",
    "WebGLShader",
    "WebGLShaderPrecisionFormat",
    "WebGLTexture",
    "WebGLUniformLocation",
    "WebGLVertexArrayObject",
    // In old Chrome versions, value won't be an instanceof WebGLVertexArrayObject.
    "WebGLVertexArrayObjectOES"
  ], t = i.filter(function(n) {
    return typeof r[n] == "function";
  });
  return !!t.find(function(n) {
    return te(e, r[n]);
  });
};
function Oy(e, r, i, t) {
  for (var n = function() {
    var l = c.value;
    try {
      if (typeof r.CanvasRenderingContext2D.prototype[l] != "function")
        return "continue";
      var f = Mr(r.CanvasRenderingContext2D.prototype, l, function(d) {
        return function() {
          for (var v = this, p = arguments.length, _ = new Array(p), m = 0; m < p; m++)
            _[m] = arguments[m];
          return wt(this.canvas, i, t, !0) || setTimeout(function() {
            var y = Of(_, r, v);
            e(v.canvas, {
              type: tn["2D"],
              property: l,
              args: y
            });
          }, 0), d.apply(this, _);
        };
      });
      s.push(f);
    } catch {
      var u = bs(r.CanvasRenderingContext2D.prototype, l, {
        set: function(p) {
          e(this.canvas, {
            type: tn["2D"],
            property: l,
            args: [
              p
            ],
            setter: !0
          });
        }
      });
      s.push(u);
    }
  }, s = [], o = Object.getOwnPropertyNames(r.CanvasRenderingContext2D.prototype), a = W(o), c; !(c = a()).done; ) n();
  return function() {
    s.forEach(function(l) {
      return l();
    });
  };
}
function Ay(e) {
  return e === "experimental-webgl" ? "webgl" : e;
}
function al(e, r, i, t) {
  var n = [];
  try {
    var s = Mr(e.HTMLCanvasElement.prototype, "getContext", function(o) {
      return function(a) {
        for (var c = arguments.length, l = new Array(c > 1 ? c - 1 : 0), f = 1; f < c; f++)
          l[f - 1] = arguments[f];
        if (!wt(this, r, i, !0)) {
          var u = Ay(a);
          if ("__context" in this || (this.__context = u), t && [
            "webgl",
            "webgl2"
          ].includes(u))
            if (l[0] && ce(l[0]) === "object") {
              var d = l[0];
              d.preserveDrawingBuffer || (d.preserveDrawingBuffer = !0);
            } else
              l.splice(0, 1, {
                preserveDrawingBuffer: !0
              });
        }
        return o.apply(this, [].concat([
          a
        ], l));
      };
    });
    n.push(s);
  } catch {
    console.error("failed to patch HTMLCanvasElement.prototype.getContext");
  }
  return function() {
    n.forEach(function(o) {
      return o();
    });
  };
}
function cl(e, r, i, t, n, s) {
  for (var o = function() {
    var u = f.value;
    if (
      //prop.startsWith('get') ||  // e.g. getProgramParameter, but too risky
      [
        "isContextLost",
        "canvas",
        "drawingBufferWidth",
        "drawingBufferHeight"
      ].includes(u)
    )
      return "continue";
    try {
      if (typeof e[u] != "function")
        return "continue";
      var d = Mr(e, u, function(p) {
        return function() {
          for (var _ = arguments.length, m = new Array(_), y = 0; y < _; y++)
            m[y] = arguments[y];
          var b = p.apply(this, m);
          if (If(b, s, this), "tagName" in this.canvas && !wt(this.canvas, t, n, !0)) {
            var S = Of(m, s, this), E = {
              type: r,
              property: u,
              args: S
            };
            i(this.canvas, E);
          }
          return b;
        };
      });
      a.push(d);
    } catch {
      var v = bs(e, u, {
        set: function(m) {
          i(this.canvas, {
            type: r,
            property: u,
            args: [
              m
            ],
            setter: !0
          });
        }
      });
      a.push(v);
    }
  }, a = [], c = Object.getOwnPropertyNames(e), l = W(c), f; !(f = l()).done; ) o();
  return a;
}
function Ry(e, r, i, t) {
  var n, s = [];
  if ((n = s).push.apply(n, [].concat(cl(r.WebGLRenderingContext.prototype, tn.WebGL, e, i, t, r))), typeof r.WebGL2RenderingContext < "u") {
    var o;
    (o = s).push.apply(o, [].concat(cl(r.WebGL2RenderingContext.prototype, tn.WebGL2, e, i, t, r)));
  }
  return function() {
    s.forEach(function(a) {
      return a();
    });
  };
}
var Rf = "KGZ1bmN0aW9uKCkgewogICJ1c2Ugc3RyaWN0IjsKICB2YXIgY2hhcnMgPSAiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyI7CiAgdmFyIGxvb2t1cCA9IHR5cGVvZiBVaW50OEFycmF5ID09PSAidW5kZWZpbmVkIiA/IFtdIDogbmV3IFVpbnQ4QXJyYXkoMjU2KTsKICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7CiAgICBsb29rdXBbY2hhcnMuY2hhckNvZGVBdChpKV0gPSBpOwogIH0KICB2YXIgZW5jb2RlID0gZnVuY3Rpb24oYXJyYXlidWZmZXIpIHsKICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKSwgaTIsIGxlbiA9IGJ5dGVzLmxlbmd0aCwgYmFzZTY0ID0gIiI7CiAgICBmb3IgKGkyID0gMDsgaTIgPCBsZW47IGkyICs9IDMpIHsKICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kyXSA+PiAyXTsKICAgICAgYmFzZTY0ICs9IGNoYXJzWyhieXRlc1tpMl0gJiAzKSA8PCA0IHwgYnl0ZXNbaTIgKyAxXSA+PiA0XTsKICAgICAgYmFzZTY0ICs9IGNoYXJzWyhieXRlc1tpMiArIDFdICYgMTUpIDw8IDIgfCBieXRlc1tpMiArIDJdID4+IDZdOwogICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaTIgKyAyXSAmIDYzXTsKICAgIH0KICAgIGlmIChsZW4gJSAzID09PSAyKSB7CiAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgIj0iOwogICAgfSBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7CiAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgIj09IjsKICAgIH0KICAgIHJldHVybiBiYXNlNjQ7CiAgfTsKICBjb25zdCBsYXN0QmxvYk1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7CiAgY29uc3QgdHJhbnNwYXJlbnRCbG9iTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTsKICBhc3luYyBmdW5jdGlvbiBnZXRUcmFuc3BhcmVudEJsb2JGb3Iod2lkdGgsIGhlaWdodCwgZGF0YVVSTE9wdGlvbnMpIHsKICAgIGNvbnN0IGlkID0gYCR7d2lkdGh9LSR7aGVpZ2h0fWA7CiAgICBpZiAoIk9mZnNjcmVlbkNhbnZhcyIgaW4gZ2xvYmFsVGhpcykgewogICAgICBpZiAodHJhbnNwYXJlbnRCbG9iTWFwLmhhcyhpZCkpIHJldHVybiB0cmFuc3BhcmVudEJsb2JNYXAuZ2V0KGlkKTsKICAgICAgY29uc3Qgb2Zmc2NyZWVuID0gbmV3IE9mZnNjcmVlbkNhbnZhcyh3aWR0aCwgaGVpZ2h0KTsKICAgICAgb2Zmc2NyZWVuLmdldENvbnRleHQoIjJkIik7CiAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCBvZmZzY3JlZW4uY29udmVydFRvQmxvYihkYXRhVVJMT3B0aW9ucyk7CiAgICAgIGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgYmxvYi5hcnJheUJ1ZmZlcigpOwogICAgICBjb25zdCBiYXNlNjQgPSBlbmNvZGUoYXJyYXlCdWZmZXIpOwogICAgICB0cmFuc3BhcmVudEJsb2JNYXAuc2V0KGlkLCBiYXNlNjQpOwogICAgICByZXR1cm4gYmFzZTY0OwogICAgfSBlbHNlIHsKICAgICAgcmV0dXJuICIiOwogICAgfQogIH0KICBjb25zdCB3b3JrZXIgPSBzZWxmOwogIHdvcmtlci5vbm1lc3NhZ2UgPSBhc3luYyBmdW5jdGlvbihlKSB7CiAgICBpZiAoIk9mZnNjcmVlbkNhbnZhcyIgaW4gZ2xvYmFsVGhpcykgewogICAgICBjb25zdCB7IGlkLCBiaXRtYXAsIHdpZHRoLCBoZWlnaHQsIGRhdGFVUkxPcHRpb25zIH0gPSBlLmRhdGE7CiAgICAgIGNvbnN0IHRyYW5zcGFyZW50QmFzZTY0ID0gZ2V0VHJhbnNwYXJlbnRCbG9iRm9yKAogICAgICAgIHdpZHRoLAogICAgICAgIGhlaWdodCwKICAgICAgICBkYXRhVVJMT3B0aW9ucwogICAgICApOwogICAgICBjb25zdCBvZmZzY3JlZW4gPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKHdpZHRoLCBoZWlnaHQpOwogICAgICBjb25zdCBjdHggPSBvZmZzY3JlZW4uZ2V0Q29udGV4dCgiMmQiKTsKICAgICAgY3R4LmRyYXdJbWFnZShiaXRtYXAsIDAsIDApOwogICAgICBiaXRtYXAuY2xvc2UoKTsKICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IG9mZnNjcmVlbi5jb252ZXJ0VG9CbG9iKGRhdGFVUkxPcHRpb25zKTsKICAgICAgY29uc3QgdHlwZSA9IGJsb2IudHlwZTsKICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSBhd2FpdCBibG9iLmFycmF5QnVmZmVyKCk7CiAgICAgIGNvbnN0IGJhc2U2NCA9IGVuY29kZShhcnJheUJ1ZmZlcik7CiAgICAgIGlmICghbGFzdEJsb2JNYXAuaGFzKGlkKSAmJiBhd2FpdCB0cmFuc3BhcmVudEJhc2U2NCA9PT0gYmFzZTY0KSB7CiAgICAgICAgbGFzdEJsb2JNYXAuc2V0KGlkLCBiYXNlNjQpOwogICAgICAgIHJldHVybiB3b3JrZXIucG9zdE1lc3NhZ2UoeyBpZCB9KTsKICAgICAgfQogICAgICBpZiAobGFzdEJsb2JNYXAuZ2V0KGlkKSA9PT0gYmFzZTY0KSByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQgfSk7CiAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7CiAgICAgICAgaWQsCiAgICAgICAgdHlwZSwKICAgICAgICBiYXNlNjQsCiAgICAgICAgd2lkdGgsCiAgICAgICAgaGVpZ2h0CiAgICAgIH0pOwogICAgICBsYXN0QmxvYk1hcC5zZXQoaWQsIGJhc2U2NCk7CiAgICB9IGVsc2UgewogICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQ6IGUuZGF0YS5pZCB9KTsKICAgIH0KICB9Owp9KSgpOwovLyMgc291cmNlTWFwcGluZ1VSTD1pbWFnZS1iaXRtYXAtZGF0YS11cmwtd29ya2VyLUlKcEM3Z19iLmpzLm1hcAo=", Ty = function(e) {
  return Uint8Array.from(atob(e), function(r) {
    return r.charCodeAt(0);
  });
}, ll = typeof window < "u" && window.Blob && new Blob([
  Ty(Rf)
], {
  type: "text/javascript;charset=utf-8"
});
function Ny(e) {
  var r;
  try {
    if (r = ll && (window.URL || window.webkitURL).createObjectURL(ll), !r) throw "";
    var i = new Worker(r, {
      name: e == null ? void 0 : e.name
    });
    return i.addEventListener("error", function() {
      (window.URL || window.webkitURL).revokeObjectURL(r);
    }), i;
  } catch {
    return new Worker("data:text/javascript;base64," + Rf, {
      name: e == null ? void 0 : e.name
    });
  } finally {
    r && (window.URL || window.webkitURL).revokeObjectURL(r);
  }
}
var My = /* @__PURE__ */ (function() {
  function e(i) {
    var t = this;
    $(this, "pendingCanvasMutations", /* @__PURE__ */ new Map()), $(this, "rafStamps", {
      latestId: 0,
      invokeId: null
    }), $(this, "mirror"), $(this, "mutationCb"), $(this, "resetObservers"), $(this, "frozen", !1), $(this, "locked", !1), $(this, "processMutation", function(u, d) {
      var v = t.rafStamps.invokeId && t.rafStamps.latestId !== t.rafStamps.invokeId;
      (v || !t.rafStamps.invokeId) && (t.rafStamps.invokeId = t.rafStamps.latestId), t.pendingCanvasMutations.has(u) || t.pendingCanvasMutations.set(u, []), t.pendingCanvasMutations.get(u).push(d);
    });
    var n = i.sampling, s = n === void 0 ? "all" : n, o = i.win, a = i.blockClass, c = i.blockSelector, l = i.recordCanvas, f = i.dataURLOptions;
    this.mutationCb = i.mutationCb, this.mirror = i.mirror, l && s === "all" && this.initCanvasMutationObserver(o, a, c), l && typeof s == "number" && this.initCanvasFPSObserver(s, o, a, c, {
      dataURLOptions: f
    });
  }
  var r = e.prototype;
  return r.reset = function() {
    this.pendingCanvasMutations.clear(), this.resetObservers && this.resetObservers();
  }, r.freeze = function() {
    this.frozen = !0;
  }, r.unfreeze = function() {
    this.frozen = !1;
  }, r.lock = function() {
    this.locked = !0;
  }, r.unlock = function() {
    this.locked = !1;
  }, r.initCanvasFPSObserver = function(t, n, s, o, a) {
    var c = this, l = al(n, s, o, !0), f = /* @__PURE__ */ new Map(), u = new Ny();
    u.onmessage = function(y) {
      var b = y.data.id;
      if (f.set(b, !1), "base64" in y.data) {
        var S = y.data, E = S.base64, C = S.type, A = S.width, I = S.height;
        c.mutationCb({
          id: b,
          type: tn["2D"],
          commands: [
            {
              property: "clearRect",
              // wipe canvas
              args: [
                0,
                0,
                A,
                I
              ]
            },
            {
              property: "drawImage",
              // draws (semi-transparent) image
              args: [
                {
                  rr_type: "ImageBitmap",
                  args: [
                    {
                      rr_type: "Blob",
                      data: [
                        {
                          rr_type: "ArrayBuffer",
                          base64: E
                        }
                      ],
                      type: C
                    }
                  ]
                },
                0,
                0
              ]
            }
          ]
        });
      }
    };
    var d = 1e3 / t, v = 0, p, _ = function() {
      var y = [];
      return n.document.querySelectorAll("canvas").forEach(function(b) {
        wt(b, s, o, !0) || y.push(b);
      }), y;
    }, m = function(y) {
      if (v && y - v < d) {
        p = requestAnimationFrame(m);
        return;
      }
      v = y;
      var b = c;
      _().forEach(/* @__PURE__ */ la(function(S) {
        var E, C, A, I;
        return Mn(this, function(M) {
          switch (M.label) {
            case 0:
              return C = b.mirror.getId(S), f.get(C) ? [
                2
              ] : S.width === 0 || S.height === 0 ? [
                2
              ] : (f.set(C, !0), [
                "webgl",
                "webgl2"
              ].includes(S.__context) && (A = S.getContext(S.__context), ((E = A == null ? void 0 : A.getContextAttributes()) == null ? void 0 : E.preserveDrawingBuffer) === !1 && A.clear(A.COLOR_BUFFER_BIT)), [
                4,
                createImageBitmap(S)
              ]);
            case 1:
              return I = M.sent(), u.postMessage({
                id: C,
                bitmap: I,
                width: S.width,
                height: S.height,
                dataURLOptions: a.dataURLOptions
              }, [
                I
              ]), [
                2
              ];
          }
        });
      })), p = requestAnimationFrame(m);
    };
    p = requestAnimationFrame(m), this.resetObservers = function() {
      l(), cancelAnimationFrame(p);
    };
  }, r.initCanvasMutationObserver = function(t, n, s) {
    this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
    var o = al(t, n, s, !1), a = Oy(this.processMutation.bind(this), t, n, s), c = Ry(this.processMutation.bind(this), t, n, s);
    this.resetObservers = function() {
      o(), a(), c();
    };
  }, r.startPendingCanvasMutationFlusher = function() {
    var t = this;
    requestAnimationFrame(function() {
      return t.flushPendingCanvasMutations();
    });
  }, r.startRAFTimestamping = function() {
    var t = this, n = function(s) {
      t.rafStamps.latestId = s, requestAnimationFrame(n);
    };
    requestAnimationFrame(n);
  }, r.flushPendingCanvasMutations = function() {
    var t = this;
    this.pendingCanvasMutations.forEach(function(n, s) {
      var o = t.mirror.getId(s);
      t.flushPendingCanvasMutationFor(s, o);
    }), requestAnimationFrame(function() {
      return t.flushPendingCanvasMutations();
    });
  }, r.flushPendingCanvasMutationFor = function(t, n) {
    if (!(this.frozen || this.locked)) {
      var s = this.pendingCanvasMutations.get(t);
      if (!(!s || n === -1)) {
        var o = s.map(function(c) {
          c.type;
          var l = Tn(c, [
            "type"
          ]);
          return l;
        }), a = s[0].type;
        this.mutationCb({
          id: n,
          type: a,
          commands: o
        }), this.pendingCanvasMutations.delete(t);
      }
    }
  }, e;
})(), Py = /* @__PURE__ */ (function() {
  function e(i) {
    $(this, "trackedLinkElements", /* @__PURE__ */ new WeakSet()), $(this, "mutationCb"), $(this, "adoptedStyleSheetCb"), $(this, "styleMirror", new ty()), this.mutationCb = i.mutationCb, this.adoptedStyleSheetCb = i.adoptedStyleSheetCb;
  }
  var r = e.prototype;
  return r.attachLinkElement = function(t, n) {
    "_cssText" in n.attributes && this.mutationCb({
      adds: [],
      removes: [],
      texts: [],
      attributes: [
        {
          id: n.id,
          attributes: n.attributes
        }
      ]
    }), this.trackLinkElement(t);
  }, r.trackLinkElement = function(t) {
    this.trackedLinkElements.has(t) || (this.trackedLinkElements.add(t), this.trackStylesheetInLinkElement(t));
  }, r.adoptStyleSheets = function(t, n) {
    var s, o = function() {
      var u = f.value, d = void 0;
      s.styleMirror.has(u) ? d = s.styleMirror.getId(u) : (d = s.styleMirror.add(u), c.push({
        styleId: d,
        rules: Array.from(u.rules || CSSRule, function(v, p) {
          return {
            rule: zl(v, u.href),
            index: p
          };
        })
      })), a.styleIds.push(d);
    };
    if (t.length !== 0) {
      for (var a = {
        id: n,
        styleIds: []
      }, c = [], l = W(t), f; !(f = l()).done; ) s = this, o();
      c.length > 0 && (a.styles = c), this.adoptedStyleSheetCb(a);
    }
  }, r.reset = function() {
    this.styleMirror.reset(), this.trackedLinkElements = /* @__PURE__ */ new WeakSet();
  }, r.trackStylesheetInLinkElement = function(t) {
  }, e;
})(), Ly = /* @__PURE__ */ (function() {
  function e() {
    $(this, "nodeMap", /* @__PURE__ */ new WeakMap()), $(this, "active", !1);
  }
  var r = e.prototype;
  return r.inOtherBuffer = function(t, n) {
    var s = this.nodeMap.get(t);
    return s && Array.from(s).some(function(o) {
      return o !== n;
    });
  }, r.add = function(t, n) {
    var s = this;
    this.active || (this.active = !0, requestAnimationFrame(function() {
      s.nodeMap = /* @__PURE__ */ new WeakMap(), s.active = !1;
    })), this.nodeMap.set(t, (this.nodeMap.get(t) || /* @__PURE__ */ new Set()).add(n));
  }, r.destroy = function() {
  }, e;
})(), Ve, Li, Gs, Xi = !1;
try {
  if (Array.from([
    1
  ], function(e) {
    return e * 2;
  })[0] !== 2) {
    var Vs = document.createElement("iframe");
    document.body.appendChild(Vs), Array.from = ((uc = Vs.contentWindow) == null ? void 0 : uc.Array.from) || Array.from, document.body.removeChild(Vs);
  }
} catch (e) {
  console.debug("Unable to override Array.from", e);
}
var Ft = Mh();
function wr(e) {
  e === void 0 && (e = {});
  var r = e.emit, i = e.checkoutEveryNms, t = e.checkoutEveryNth, n = e.blockClass, s = n === void 0 ? "rr-block" : n, o = e.blockSelector, a = o === void 0 ? null : o, c = e.ignoreClass, l = c === void 0 ? "rr-ignore" : c, f = e.ignoreSelector, u = f === void 0 ? null : f, d = e.maskTextClass, v = d === void 0 ? "rr-mask" : d, p = e.maskTextSelector, _ = p === void 0 ? null : p, m = e.inlineStylesheet, y = m === void 0 ? !0 : m, b = e.maskAllInputs, S = e.maskInputOptions, E = e.slimDOMOptions, C = e.maskInputFn, A = e.maskTextFn, I = e.hooks, M = e.packFn, D = e.sampling, L = D === void 0 ? {} : D, j = e.dataURLOptions, k = j === void 0 ? {} : j, P = e.mousemoveWait, G = e.recordDOM, F = G === void 0 ? !0 : G, ae = e.recordCanvas, ue = ae === void 0 ? !1 : ae, K = e.recordCrossOriginIframes, oe = K === void 0 ? !1 : K, re = e.recordAfter, Me = re === void 0 ? e.recordAfter === "DOMContentLoaded" ? e.recordAfter : "load" : re, Oe = e.userTriggeredOnInput, Pe = Oe === void 0 ? !1 : Oe, Se = e.collectFonts, We = Se === void 0 ? !1 : Se, X = e.inlineImages, qe = X === void 0 ? !1 : X, Ge = e.plugins, He = e.keepIframeSrcFn, Ye = He === void 0 ? function() {
    return !1;
  } : He, ot = e.ignoreCSSAttributes, at = ot === void 0 ? /* @__PURE__ */ new Set([]) : ot, O = e.errorHandler;
  cy(O);
  var U = oe ? window.parent === window : !0, V = !1;
  if (!U)
    try {
      window.parent.document && (V = !1);
    } catch {
      V = !0;
    }
  if (U && !r)
    throw new Error("emit function is required");
  if (!U && !V)
    return function() {
    };
  P !== void 0 && L.mousemove === void 0 && (L.mousemove = P), Ft.reset();
  var H = b === !0 ? {
    color: !0,
    date: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
    textarea: !0,
    select: !0,
    password: !0,
    hidden: !0
  } : S !== void 0 ? S : {
    password: !0
  }, R = E === !0 || E === "all" ? {
    script: !0,
    comment: !0,
    headFavicon: !0,
    headWhitespace: !0,
    headMetaSocial: !0,
    headMetaRobots: !0,
    headMetaHttpEquiv: !0,
    headMetaVerification: !0,
    // the following are off for slimDOMOptions === true,
    // as they destroy some (hidden) info:
    headMetaAuthorship: E === "all",
    headMetaDescKeywords: E === "all",
    headTitleMutations: E === "all"
  } : E || {};
  ey();
  var Y, Z = 0, J = function(de) {
    for (var Ie = W(Ge || []), q; !(q = Ie()).done; ) {
      var xe = q.value;
      xe.eventProcessor && (de = xe.eventProcessor(de));
    }
    return M && // Disable packing events which will be emitted to parent frames.
    !V && (de = M(de)), de;
  };
  Ve = function(de, Ie) {
    var q, xe = de;
    if (xe.timestamp = Ki(), (q = Er[0]) != null && q.isFrozen() && xe.type !== ve.FullSnapshot && !(xe.type === ve.IncrementalSnapshot && xe.data.source === ne.Mutation) && Er.forEach(function(Jt) {
      return Jt.unfreeze();
    }), U)
      r == null || r(J(xe), Ie);
    else if (V) {
      var ar = {
        type: "rrweb",
        event: J(xe),
        origin: window.location.origin,
        isCheckout: Ie
      };
      window.parent.postMessage(ar, "*");
    }
    if (xe.type === ve.FullSnapshot)
      Y = xe, Z = 0;
    else if (xe.type === ve.IncrementalSnapshot) {
      if (xe.data.source === ne.Mutation && xe.data.isAttachIframe)
        return;
      Z++;
      var $t = t && Z >= t, Kt = i && xe.timestamp - Y.timestamp > i;
      ($t || Kt) && Li(!0);
    }
  };
  for (var ze = function(de) {
    Ve({
      type: ve.IncrementalSnapshot,
      data: we({
        source: ne.Mutation
      }, de)
    });
  }, ct = function(de) {
    return Ve({
      type: ve.IncrementalSnapshot,
      data: we({
        source: ne.Scroll
      }, de)
    });
  }, ht = function(de) {
    return Ve({
      type: ve.IncrementalSnapshot,
      data: we({
        source: ne.CanvasMutation
      }, de)
    });
  }, It = function(de) {
    return Ve({
      type: ve.IncrementalSnapshot,
      data: we({
        source: ne.AdoptedStyleSheet
      }, de)
    });
  }, z = new Py({
    mutationCb: ze,
    adoptedStyleSheetCb: It
  }), Q = new xy({
    mirror: Ft,
    mutationCb: ze,
    stylesheetManager: z,
    recordCrossOriginIframes: oe,
    wrappedEmit: Ve
  }), Le = W(Ge || []), pt; !(pt = Le()).done; ) {
    var je = pt.value;
    je.getMirror && je.getMirror({
      nodeMirror: Ft,
      crossOriginIframeMirror: Q.crossOriginIframeMirror,
      crossOriginIframeStyleMirror: Q.crossOriginIframeStyleMirror
    });
  }
  var Ot = new Ly();
  Gs = new My({
    recordCanvas: ue,
    mutationCb: ht,
    win: window,
    blockClass: s,
    blockSelector: a,
    mirror: Ft,
    sampling: L.canvas,
    dataURLOptions: k
  });
  var me = new Cy({
    mutationCb: ze,
    scrollCb: ct,
    bypassOptions: {
      blockClass: s,
      blockSelector: a,
      maskTextClass: v,
      maskTextSelector: _,
      inlineStylesheet: y,
      maskInputOptions: H,
      dataURLOptions: k,
      maskTextFn: A,
      maskInputFn: C,
      recordCanvas: ue,
      inlineImages: qe,
      sampling: L,
      slimDOMOptions: R,
      iframeManager: Q,
      stylesheetManager: z,
      canvasManager: Gs,
      keepIframeSrcFn: Ye,
      processedNodeManager: Ot
    },
    mirror: Ft
  });
  Li = function(de) {
    if (de === void 0 && (de = !1), !!F) {
      Ve({
        type: ve.Meta,
        data: {
          href: window.location.href,
          width: vf(),
          height: pf()
        }
      }, de), z.reset(), me.init(), Er.forEach(function(q) {
        return q.lock();
      });
      var Ie = np(document, {
        mirror: Ft,
        blockClass: s,
        blockSelector: a,
        maskTextClass: v,
        maskTextSelector: _,
        inlineStylesheet: y,
        maskAllInputs: H,
        maskTextFn: A,
        maskInputFn: C,
        slimDOM: R,
        dataURLOptions: k,
        recordCanvas: ue,
        inlineImages: qe,
        onSerialize: function(q) {
          yf(q, Ft) && Q.addIframe(q), _f(q, Ft) && z.trackLinkElement(q), qo(q) && me.addShadowRoot(pe.shadowRoot(q), document);
        },
        onIframeLoad: function(q, xe) {
          Q.attachIframe(q, xe), me.observeAttachShadow(q);
        },
        onStylesheetLoad: function(q, xe) {
          z.attachLinkElement(q, xe);
        },
        keepIframeSrcFn: Ye
      });
      if (!Ie)
        return console.warn("Failed to snapshot the document");
      Ve({
        type: ve.FullSnapshot,
        data: {
          node: Ie,
          initialOffset: hf(window)
        }
      }, de), Er.forEach(function(q) {
        return q.unlock();
      }), document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0 && z.adoptStyleSheets(document.adoptedStyleSheets, Ft.getId(document));
    }
  };
  try {
    var ut = [], At = function(de) {
      var Ie;
      return _e(Sy)({
        mutationCb: ze,
        mousemoveCb: function(q, xe) {
          return Ve({
            type: ve.IncrementalSnapshot,
            data: {
              source: xe,
              positions: q
            }
          });
        },
        mouseInteractionCb: function(q) {
          return Ve({
            type: ve.IncrementalSnapshot,
            data: we({
              source: ne.MouseInteraction
            }, q)
          });
        },
        scrollCb: ct,
        viewportResizeCb: function(q) {
          return Ve({
            type: ve.IncrementalSnapshot,
            data: we({
              source: ne.ViewportResize
            }, q)
          });
        },
        inputCb: function(q) {
          return Ve({
            type: ve.IncrementalSnapshot,
            data: we({
              source: ne.Input
            }, q)
          });
        },
        mediaInteractionCb: function(q) {
          return Ve({
            type: ve.IncrementalSnapshot,
            data: we({
              source: ne.MediaInteraction
            }, q)
          });
        },
        styleSheetRuleCb: function(q) {
          return Ve({
            type: ve.IncrementalSnapshot,
            data: we({
              source: ne.StyleSheetRule
            }, q)
          });
        },
        styleDeclarationCb: function(q) {
          return Ve({
            type: ve.IncrementalSnapshot,
            data: we({
              source: ne.StyleDeclaration
            }, q)
          });
        },
        canvasMutationCb: ht,
        fontCb: function(q) {
          return Ve({
            type: ve.IncrementalSnapshot,
            data: we({
              source: ne.Font
            }, q)
          });
        },
        selectionCb: function(q) {
          Ve({
            type: ve.IncrementalSnapshot,
            data: we({
              source: ne.Selection
            }, q)
          });
        },
        customElementCb: function(q) {
          Ve({
            type: ve.IncrementalSnapshot,
            data: we({
              source: ne.CustomElement
            }, q)
          });
        },
        blockClass: s,
        ignoreClass: l,
        ignoreSelector: u,
        maskTextClass: v,
        maskTextSelector: _,
        maskInputOptions: H,
        inlineStylesheet: y,
        sampling: L,
        recordDOM: F,
        recordCanvas: ue,
        inlineImages: qe,
        userTriggeredOnInput: Pe,
        collectFonts: We,
        doc: de,
        maskInputFn: C,
        maskTextFn: A,
        keepIframeSrcFn: Ye,
        blockSelector: a,
        slimDOMOptions: R,
        dataURLOptions: k,
        mirror: Ft,
        iframeManager: Q,
        stylesheetManager: z,
        shadowDomManager: me,
        processedNodeManager: Ot,
        canvasManager: Gs,
        ignoreCSSAttributes: at,
        plugins: ((Ie = Ge == null ? void 0 : Ge.filter(function(q) {
          return q.observer;
        })) == null ? void 0 : Ie.map(function(q) {
          return {
            observer: q.observer,
            options: q.options,
            callback: function(xe) {
              return Ve({
                type: ve.Plugin,
                data: {
                  plugin: q.name,
                  payload: xe
                }
              });
            }
          };
        })) || []
      }, I);
    };
    Q.addLoadListener(function(de) {
      try {
        ut.push(At(de.contentDocument));
      } catch (Ie) {
        console.warn(Ie);
      }
    });
    var Ae = function() {
      Li(), ut.push(At(document)), Xi = !0;
    };
    return document.readyState === "interactive" || document.readyState === "complete" ? Ae() : (ut.push(bt("DOMContentLoaded", function() {
      Ve({
        type: ve.DomContentLoaded,
        data: {}
      }), Me === "DOMContentLoaded" && Ae();
    })), ut.push(bt("load", function() {
      Ve({
        type: ve.Load,
        data: {}
      }), Me === "load" && Ae();
    }, window))), function() {
      ut.forEach(function(de) {
        try {
          de();
        } catch (q) {
          var Ie = String(q).toLowerCase();
          Ie.includes("cross-origin") || console.warn(q);
        }
      }), Ot.destroy(), Xi = !1, ly();
    };
  } catch (de) {
    console.warn(de);
  }
}
wr.addCustomEvent = function(e, r) {
  if (!Xi)
    throw new Error("please add custom event after start recording");
  Ve({
    type: ve.Custom,
    data: {
      tag: e,
      payload: r
    }
  });
};
wr.freezePage = function() {
  Er.forEach(function(e) {
    return e.freeze();
  });
};
wr.takeFullSnapshot = function(e) {
  if (!Xi)
    throw new Error("please take full snapshot after start recording");
  Li(e);
};
wr.mirror = Ft;
var ul;
(function(e) {
  e[e.NotStarted = 0] = "NotStarted", e[e.Running = 1] = "Running", e[e.Stopped = 2] = "Stopped";
})(ul || (ul = {}));
wr.addCustomEvent;
wr.freezePage;
wr.takeFullSnapshot;
var $y = Object.defineProperty, Dy = function(e, r, i) {
  return r in e ? $y(e, r, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
  }) : e[r] = i;
}, Oi = function(e, r, i) {
  return Dy(e, (typeof r > "u" ? "undefined" : ce(r)) !== "symbol" ? r + "" : r, i);
};
function Fy(e, r, i) {
  try {
    if (!(r in e))
      return function() {
      };
    var t = e[r], n = i(t);
    return typeof n == "function" && (n.prototype = n.prototype || {}, Object.defineProperties(n, {
      __rrweb_original__: {
        enumerable: !1,
        value: t
      }
    })), e[r] = n, function() {
      e[r] = t;
    };
  } catch {
    return function() {
    };
  }
}
var Fr = /* @__PURE__ */ (function() {
  function e(i) {
    Oi(this, "fileName"), Oi(this, "functionName"), Oi(this, "lineNumber"), Oi(this, "columnNumber"), this.fileName = i.fileName || "", this.functionName = i.functionName || "", this.lineNumber = i.lineNumber, this.columnNumber = i.columnNumber;
  }
  var r = e.prototype;
  return r.toString = function() {
    var t = this.lineNumber || "", n = this.columnNumber || "";
    return this.functionName ? this.functionName + " (" + this.fileName + ":" + t + ":" + n + ")" : this.fileName + ":" + t + ":" + n;
  }, e;
})(), jy = /(^|@)\S+:\d+/, fl = /^\s*at .*(\S+:\d+|\(native\))/m, Uy = /^(eval@)?(\[native code])?$/, qs = {
  /**
  * Given an Error object, extract the most information from it.
  */
  parse: function(r) {
    return r ? (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      typeof r.stacktrace < "u" || // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      typeof r["opera#sourceloc"] < "u" ? this.parseOpera(r) : r.stack && r.stack.match(fl) ? this.parseV8OrIE(r) : r.stack ? this.parseFFOrSafari(r) : (console.warn("[console-record-plugin]: Failed to parse error object:", r), [])
    ) : [];
  },
  // Separate line and column numbers from a string of the form: (URI:Line:Column)
  extractLocation: function(r) {
    if (r.indexOf(":") === -1)
      return [
        r
      ];
    var i = /(.+?)(?::(\d+))?(?::(\d+))?$/, t = i.exec(r.replace(/[()]/g, ""));
    if (!t) throw new Error("Cannot parse given url: " + r);
    return [
      t[1],
      t[2] || void 0,
      t[3] || void 0
    ];
  },
  parseV8OrIE: function(r) {
    var i = r.stack.split(`
`).filter(function(t) {
      return !!t.match(fl);
    }, this);
    return i.map(function(t) {
      t.indexOf("(eval ") > -1 && (t = t.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(\),.*$)/g, ""));
      var n = t.replace(/^\s+/, "").replace(/\(eval code/g, "("), s = n.match(/ (\((.+):(\d+):(\d+)\)$)/);
      n = s ? n.replace(s[0], "") : n;
      var o = n.split(/\s+/).slice(1), a = this.extractLocation(s ? s[1] : o.pop()), c = o.join(" ") || void 0, l = [
        "eval",
        "<anonymous>"
      ].indexOf(a[0]) > -1 ? void 0 : a[0];
      return new Fr({
        functionName: c,
        fileName: l,
        lineNumber: a[1],
        columnNumber: a[2]
      });
    }, this);
  },
  parseFFOrSafari: function(r) {
    var i = r.stack.split(`
`).filter(function(t) {
      return !t.match(Uy);
    }, this);
    return i.map(function(t) {
      if (t.indexOf(" > eval") > -1 && (t = t.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1")), t.indexOf("@") === -1 && t.indexOf(":") === -1)
        return new Fr({
          functionName: t
        });
      var n = /((.*".+"[^@]*)?[^@]*)(?:@)/, s = t.match(n), o = s && s[1] ? s[1] : void 0, a = this.extractLocation(t.replace(n, ""));
      return new Fr({
        functionName: o,
        fileName: a[0],
        lineNumber: a[1],
        columnNumber: a[2]
      });
    }, this);
  },
  parseOpera: function(r) {
    return !r.stacktrace || r.message.indexOf(`
`) > -1 && r.message.split(`
`).length > r.stacktrace.split(`
`).length ? this.parseOpera9(r) : r.stack ? this.parseOpera11(r) : this.parseOpera10(r);
  },
  parseOpera9: function(r) {
    for (var i = /Line (\d+).*script (?:in )?(\S+)/i, t = r.message.split(`
`), n = [], s = 2, o = t.length; s < o; s += 2) {
      var a = i.exec(t[s]);
      a && n.push(new Fr({
        fileName: a[2],
        lineNumber: parseFloat(a[1])
      }));
    }
    return n;
  },
  parseOpera10: function(r) {
    for (var i = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, t = r.stacktrace.split(`
`), n = [], s = 0, o = t.length; s < o; s += 2) {
      var a = i.exec(t[s]);
      a && n.push(new Fr({
        functionName: a[3] || void 0,
        fileName: a[2],
        lineNumber: parseFloat(a[1])
      }));
    }
    return n;
  },
  // Opera 10.65+ Error.stack very similar to FF/Safari
  parseOpera11: function(r) {
    var i = r.stack.split(`
`).filter(function(t) {
      return !!t.match(jy) && !t.match(/^Error created at/);
    }, this);
    return i.map(function(t) {
      var n = t.split("@"), s = this.extractLocation(n.pop()), o = n.shift() || "", a = o.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^)]*\)/g, "") || void 0;
      return new Fr({
        functionName: a,
        fileName: s[0],
        lineNumber: s[1],
        columnNumber: s[2]
      });
    }, this);
  }
};
function By(e) {
  if (!e || !e.outerHTML)
    return "";
  for (var r = ""; e.parentElement; ) {
    var i = e.localName;
    if (!i)
      break;
    i = i.toLowerCase();
    var t = e.parentElement, n = [];
    if (t.children && t.children.length > 0)
      for (var s = 0; s < t.children.length; s++) {
        var o = t.children[s];
        o.localName && o.localName.toLowerCase && o.localName.toLowerCase() === i && n.push(o);
      }
    n.length > 1 && (i += ":eq(" + n.indexOf(e) + ")"), r = i + (r ? ">" + r : ""), e = t;
  }
  return r;
}
function Yo(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Tf(e, r) {
  if (r === 0)
    return !0;
  for (var i = Object.keys(e), t = W(i), n; !(n = t()).done; ) {
    var s = n.value;
    if (Yo(e[s]) && Tf(e[s], r - 1))
      return !0;
  }
  return !1;
}
function jr(e, r) {
  var i = {
    numOfKeysLimit: 50,
    depthOfLimit: 4
  };
  Object.assign(i, r);
  var t = [], n = [];
  return JSON.stringify(e, function(a, c) {
    if (t.length > 0) {
      var l = t.indexOf(this);
      ~l ? t.splice(l + 1) : t.push(this), ~l ? n.splice(l, 1 / 0, a) : n.push(a), ~t.indexOf(c) && (t[0] === c ? c = "[Circular ~]" : c = "[Circular ~." + n.slice(0, t.indexOf(c)).join(".") + "]");
    } else
      t.push(c);
    if (c === null) return c;
    if (c === void 0) return "undefined";
    if (s(c))
      return o(c);
    if ((typeof c > "u" ? "undefined" : ce(c)) === "bigint")
      return c.toString() + "n";
    if (te(c, Event)) {
      var f = {};
      for (var u in c) {
        var d = c[u];
        Array.isArray(d) ? f[u] = By(d.length ? d[0] : null) : f[u] = d;
      }
      return f;
    } else {
      if (te(c, Node))
        return te(c, HTMLElement) ? c ? c.outerHTML : "" : c.nodeName;
      if (te(c, Error))
        return c.stack ? c.stack + `
End of stack for Error object` : c.name + ": " + c.message;
    }
    return c;
  });
  function s(a) {
    return !!(Yo(a) && Object.keys(a).length > i.numOfKeysLimit || typeof a == "function" || Yo(a) && Tf(a, i.depthOfLimit));
  }
  function o(a) {
    var c = a.toString();
    return i.stringLengthLimit && c.length > i.stringLengthLimit && (c = "" + c.slice(0, i.stringLengthLimit) + "..."), c;
  }
}
var dl = {
  level: [
    "assert",
    "clear",
    "count",
    "countReset",
    "debug",
    "dir",
    "dirxml",
    "error",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "table",
    "time",
    "timeEnd",
    "timeLog",
    "trace",
    "warn"
  ],
  lengthThreshold: 1e3,
  logger: "console"
};
function Wy(e, r, i) {
  var t = i ? Object.assign({}, dl, i) : dl, n = t.logger;
  if (!n)
    return function() {
    };
  var s;
  typeof n == "string" ? s = r[n] : s = n;
  var o = 0, a = !1, c = [];
  if (t.level.includes("error")) {
    var l = function(_) {
      var m = _.message, y = _.error, b = qs.parse(y).map(function(E) {
        return E.toString();
      }), S = [
        jr(m, t.stringifyOptions)
      ];
      e({
        level: "error",
        trace: b,
        payload: S
      });
    };
    r.addEventListener("error", l), c.push(function() {
      r.removeEventListener("error", l);
    });
    var f = function(_) {
      var m, y;
      te(_.reason, Error) ? (m = _.reason, y = [
        jr("Uncaught (in promise) " + m.name + ": " + m.message, t.stringifyOptions)
      ]) : (m = new Error(), y = [
        jr("Uncaught (in promise)", t.stringifyOptions),
        jr(_.reason, t.stringifyOptions)
      ]);
      var b = qs.parse(m).map(function(S) {
        return S.toString();
      });
      e({
        level: "error",
        trace: b,
        payload: y
      });
    };
    r.addEventListener("unhandledrejection", f), c.push(function() {
      r.removeEventListener("unhandledrejection", f);
    });
  }
  for (var u = W(t.level), d; !(d = u()).done; ) {
    var v = d.value;
    c.push(p(s, v));
  }
  return function() {
    c.forEach(function(_) {
      return _();
    });
  };
  function p(_, m) {
    var y = this;
    return _[m] ? Fy(_, m, function(b) {
      var S = y;
      return function() {
        for (var E = arguments.length, C = new Array(E), A = 0; A < E; A++)
          C[A] = arguments[A];
        if (b.apply(S, C), !(m === "assert" && C[0]) && !a) {
          a = !0;
          try {
            var I = qs.parse(new Error()).map(function(L) {
              return L.toString();
            }).splice(1), M = m === "assert" ? C.slice(1) : C, D = M.map(function(L) {
              return jr(L, t.stringifyOptions);
            });
            o++, o < t.lengthThreshold ? e({
              level: m,
              trace: I,
              payload: D
            }) : o === t.lengthThreshold && e({
              level: "warn",
              trace: [],
              payload: [
                jr("The number of log records reached the threshold.")
              ]
            });
          } catch (L) {
            b.apply(void 0, [].concat([
              "rrweb logger error:",
              L
            ], C));
          } finally {
            a = !1;
          }
        }
      };
    }) : function() {
    };
  }
}
var zy = "rrweb/console@1", Gy = function(e) {
  return {
    name: zy,
    observer: Wy,
    options: e
  };
}, hl = N.setImmediate, dr, Ko, Jo, Nf = Object.prototype.toString, Vy = typeof hl < "u" ? function(r) {
  return hl(r);
} : setTimeout;
try {
  Object.defineProperty({}, "x", {}), dr = function(r, i, t, n) {
    return Object.defineProperty(r, i, {
      value: t,
      writable: !0,
      configurable: n !== !1
    });
  };
} catch {
  dr = function(i, t, n) {
    return i[t] = n, i;
  };
}
Jo = /* @__PURE__ */ (function() {
  var r, i, t;
  function n(s, o) {
    this.fn = s, this.self = o, this.next = void 0;
  }
  return {
    add: function(o, a) {
      t = new n(o, a), i ? i.next = t : r = t, i = t, t = void 0;
    },
    drain: function() {
      var o = r;
      for (r = i = Ko = void 0; o; )
        o.fn.call(o.self), o = o.next;
    }
  };
})();
function Zi(e, r) {
  Jo.add(e, r), Ko || (Ko = Vy(Jo.drain));
}
function Mf(e) {
  var r, i = typeof e;
  return e !== null && (i === "object" || i === "function") && (r = e.then), typeof r == "function" ? r : !1;
}
function Ma() {
  for (var e = 0; e < this.chain.length; e++)
    qy(
      this,
      this.state === 1 ? this.chain[e].success : this.chain[e].failure,
      this.chain[e]
    );
  this.chain.length = 0;
}
function qy(e, r, i) {
  var t, n;
  try {
    r === !1 ? i.reject(e.msg) : (r === !0 ? t = e.msg : t = r.call(void 0, e.msg), t === i.promise ? i.reject(TypeError("Promise-chain cycle")) : (n = Mf(t)) ? n.call(t, i.resolve, i.reject) : i.resolve(t));
  } catch (s) {
    i.reject(s);
  }
}
function Pf(e) {
  var r, i = this;
  if (!i.triggered) {
    i.triggered = !0, i.def && (i = i.def);
    try {
      (r = Mf(e)) ? Zi(function() {
        var t = new pl(i);
        try {
          r.call(
            e,
            function() {
              Pf.apply(t, arguments);
            },
            function() {
              Cn.apply(t, arguments);
            }
          );
        } catch (n) {
          Cn.call(t, n);
        }
      }) : (i.msg = e, i.state = 1, i.chain.length > 0 && Zi(Ma, i));
    } catch (t) {
      Cn.call(new pl(i), t);
    }
  }
}
function Cn(e) {
  var r = this;
  r.triggered || (r.triggered = !0, r.def && (r = r.def), r.msg = e, r.state = 2, r.chain.length > 0 && Zi(Ma, r));
}
function Lf(e, r, i, t) {
  for (var n = 0; n < r.length; n++)
    (function(o) {
      e.resolve(r[o]).then(
        function(c) {
          i(o, c);
        },
        t
      );
    })(n);
}
function pl(e) {
  this.def = e, this.triggered = !1;
}
function Hy(e) {
  this.promise = e, this.state = 0, this.triggered = !1, this.chain = [], this.msg = void 0;
}
function Sr(e) {
  if (typeof e != "function")
    throw TypeError("Not a function");
  if (this.__NPO__ !== 0)
    throw TypeError("Not a promise");
  this.__NPO__ = 1;
  var r = new Hy(this);
  this.then = function(t, n) {
    var s = {
      success: typeof t == "function" ? t : !0,
      failure: typeof n == "function" ? n : !1
    };
    return s.promise = new this.constructor(function(a, c) {
      if (typeof a != "function" || typeof c != "function")
        throw TypeError("Not a function");
      s.resolve = a, s.reject = c;
    }), r.chain.push(s), r.state !== 0 && Zi(Ma, r), s.promise;
  }, this.catch = function(t) {
    return this.then(void 0, t);
  };
  try {
    e.call(
      void 0,
      function(t) {
        Pf.call(r, t);
      },
      function(t) {
        Cn.call(r, t);
      }
    );
  } catch (i) {
    Cn.call(r, i);
  }
}
var $f = dr(
  {},
  "constructor",
  Sr,
  /*configurable=*/
  !1
);
Sr.prototype = $f;
dr(
  $f,
  "__NPO__",
  0,
  /*configurable=*/
  !1
);
dr(Sr, "resolve", function(r) {
  var i = this;
  return r && typeof r == "object" && r.__NPO__ === 1 ? r : new i(function(n, s) {
    if (typeof n != "function" || typeof s != "function")
      throw TypeError("Not a function");
    n(r);
  });
});
dr(Sr, "reject", function(r) {
  return new this(function(t, n) {
    if (typeof t != "function" || typeof n != "function")
      throw TypeError("Not a function");
    n(r);
  });
});
dr(Sr, "all", function(r) {
  var i = this;
  return Nf.call(r) !== "[object Array]" ? i.reject(TypeError("Not an array")) : r.length === 0 ? i.resolve([]) : new i(function(n, s) {
    if (typeof n != "function" || typeof s != "function")
      throw TypeError("Not a function");
    var o = r.length, a = Array(o), c = 0;
    Lf(i, r, function(f, u) {
      a[f] = u, ++c === o && n(a);
    }, s);
  });
});
dr(Sr, "race", function(r) {
  var i = this;
  return Nf.call(r) !== "[object Array]" ? i.reject(TypeError("Not an array")) : new i(function(n, s) {
    if (typeof n != "function" || typeof s != "function")
      throw TypeError("Not a function");
    Lf(i, r, function(a, c) {
      n(c);
    }, s);
  });
});
var ge;
typeof Promise < "u" && Promise.toString().indexOf("[native code]") !== -1 ? ge = Promise : ge = Sr;
var Mt = {
  DEBUG: !1,
  LIB_VERSION: "2.72.0"
}, kn = 1440 * 60 * 1e3, Hs = 8 * 1e3, ws = Array.prototype, Yy = Function.prototype, Df = Object.prototype, lr = ws.slice, Zn = Df.toString, Ss = Df.hasOwnProperty, tt = N.console, Qt = N.navigator, ie = N.document, bn = N.opera, vl = N.screen, Gt = Qt.userAgent, Ys = Yy.bind, gl = ws.forEach, ml = ws.indexOf, yl = ws.map, Ky = Array.isArray, Xo = {}, h = {
  trim: function(e) {
    return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  }
}, be = {
  /** @type {function(...*)} */
  log: function() {
    if (Mt.DEBUG && !h.isUndefined(tt) && tt)
      try {
        tt.log.apply(tt, arguments);
      } catch {
        h.each(arguments, function(r) {
          tt.log(r);
        });
      }
  },
  /** @type {function(...*)} */
  warn: function() {
    if (Mt.DEBUG && !h.isUndefined(tt) && tt) {
      var e = ["Mixpanel warning:"].concat(h.toArray(arguments));
      try {
        tt.warn.apply(tt, e);
      } catch {
        h.each(e, function(i) {
          tt.warn(i);
        });
      }
    }
  },
  /** @type {function(...*)} */
  error: function() {
    if (Mt.DEBUG && !h.isUndefined(tt) && tt) {
      var e = ["Mixpanel error:"].concat(h.toArray(arguments));
      try {
        tt.error.apply(tt, e);
      } catch {
        h.each(e, function(i) {
          tt.error(i);
        });
      }
    }
  },
  /** @type {function(...*)} */
  critical: function() {
    if (!h.isUndefined(tt) && tt) {
      var e = ["Mixpanel error:"].concat(h.toArray(arguments));
      try {
        tt.error.apply(tt, e);
      } catch {
        h.each(e, function(i) {
          tt.error(i);
        });
      }
    }
  }
}, Ks = function(e, r) {
  return function() {
    return arguments[0] = "[" + r + "] " + arguments[0], e.apply(be, arguments);
  };
}, Pr = function(e) {
  return {
    log: Ks(be.log, e),
    error: Ks(be.error, e),
    critical: Ks(be.critical, e)
  };
}, Gn = function(e) {
  return function() {
    try {
      return e.apply(this, arguments);
    } catch (r) {
      be.critical("Implementation error. Please turn on debug and contact support@mixpanel.com."), Mt.DEBUG && be.critical(r);
    }
  };
}, Ff = function(e) {
  var r = e.prototype;
  for (var i in r)
    typeof r[i] == "function" && (r[i] = Gn(r[i]));
};
h.bind = function(e, r) {
  var i, t;
  if (Ys && e.bind === Ys)
    return Ys.apply(e, lr.call(arguments, 1));
  if (!h.isFunction(e))
    throw new TypeError();
  return i = lr.call(arguments, 2), t = function() {
    if (!(this instanceof t))
      return e.apply(r, i.concat(lr.call(arguments)));
    var n = {};
    n.prototype = e.prototype;
    var s = new n();
    n.prototype = null;
    var o = e.apply(s, i.concat(lr.call(arguments)));
    return Object(o) === o ? o : s;
  }, t;
};
h.each = function(e, r, i) {
  if (e != null) {
    if (gl && e.forEach === gl)
      e.forEach(r, i);
    else if (e.length === +e.length) {
      for (var t = 0, n = e.length; t < n; t++)
        if (t in e && r.call(i, e[t], t, e) === Xo)
          return;
    } else
      for (var s in e)
        if (Ss.call(e, s) && r.call(i, e[s], s, e) === Xo)
          return;
  }
};
h.extend = function(e) {
  return h.each(lr.call(arguments, 1), function(r) {
    for (var i in r)
      r[i] !== void 0 && (e[i] = r[i]);
  }), e;
};
h.isArray = Ky || function(e) {
  return Zn.call(e) === "[object Array]";
};
h.isFunction = function(e) {
  try {
    return /^\s*\bfunction\b/.test(e);
  } catch {
    return !1;
  }
};
h.isArguments = function(e) {
  return !!(e && Ss.call(e, "callee"));
};
h.toArray = function(e) {
  return e ? e.toArray ? e.toArray() : h.isArray(e) || h.isArguments(e) ? lr.call(e) : h.values(e) : [];
};
h.map = function(e, r, i) {
  if (yl && e.map === yl)
    return e.map(r, i);
  var t = [];
  return h.each(e, function(n) {
    t.push(r.call(i, n));
  }), t;
};
h.keys = function(e) {
  var r = [];
  return e === null || h.each(e, function(i, t) {
    r[r.length] = t;
  }), r;
};
h.values = function(e) {
  var r = [];
  return e === null || h.each(e, function(i) {
    r[r.length] = i;
  }), r;
};
h.include = function(e, r) {
  var i = !1;
  return e === null ? i : ml && e.indexOf === ml ? e.indexOf(r) != -1 : (h.each(e, function(t) {
    if (i || (i = t === r))
      return Xo;
  }), i);
};
h.includes = function(e, r) {
  return e.indexOf(r) !== -1;
};
h.inherit = function(e, r) {
  return e.prototype = new r(), e.prototype.constructor = e, e.superclass = r.prototype, e;
};
h.isObject = function(e) {
  return e === Object(e) && !h.isArray(e);
};
h.isEmptyObject = function(e) {
  if (h.isObject(e)) {
    for (var r in e)
      if (Ss.call(e, r))
        return !1;
    return !0;
  }
  return !1;
};
h.isUndefined = function(e) {
  return e === void 0;
};
h.isString = function(e) {
  return Zn.call(e) == "[object String]";
};
h.isDate = function(e) {
  return Zn.call(e) == "[object Date]";
};
h.isNumber = function(e) {
  return Zn.call(e) == "[object Number]";
};
h.isElement = function(e) {
  return !!(e && e.nodeType === 1);
};
h.encodeDates = function(e) {
  return h.each(e, function(r, i) {
    h.isDate(r) ? e[i] = h.formatDate(r) : h.isObject(r) && (e[i] = h.encodeDates(r));
  }), e;
};
h.timestamp = function() {
  return Date.now = Date.now || function() {
    return +/* @__PURE__ */ new Date();
  }, Date.now();
};
h.formatDate = function(e) {
  function r(i) {
    return i < 10 ? "0" + i : i;
  }
  return e.getUTCFullYear() + "-" + r(e.getUTCMonth() + 1) + "-" + r(e.getUTCDate()) + "T" + r(e.getUTCHours()) + ":" + r(e.getUTCMinutes()) + ":" + r(e.getUTCSeconds());
};
h.strip_empty_properties = function(e) {
  var r = {};
  return h.each(e, function(i, t) {
    h.isString(i) && i.length > 0 && (r[t] = i);
  }), r;
};
h.truncate = function(e, r) {
  var i;
  return typeof e == "string" ? i = e.slice(0, r) : h.isArray(e) ? (i = [], h.each(e, function(t) {
    i.push(h.truncate(t, r));
  })) : h.isObject(e) ? (i = {}, h.each(e, function(t, n) {
    i[n] = h.truncate(t, r);
  })) : i = e, i;
};
h.JSONEncode = /* @__PURE__ */ (function() {
  return function(e) {
    var r = e, i = function(n) {
      var s = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, o = {
        // table of character substitutions
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
      };
      return s.lastIndex = 0, s.test(n) ? '"' + n.replace(s, function(a) {
        var c = o[a];
        return typeof c == "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
      }) + '"' : '"' + n + '"';
    }, t = function(n, s) {
      var o = "", a = "    ", c = 0, l = "", f = "", u = 0, d = o, v = [], p = s[n];
      switch (p && typeof p == "object" && typeof p.toJSON == "function" && (p = p.toJSON(n)), typeof p) {
        case "string":
          return i(p);
        case "number":
          return isFinite(p) ? String(p) : "null";
        case "boolean":
        case "null":
          return String(p);
        case "object":
          if (!p)
            return "null";
          if (o += a, v = [], Zn.apply(p) === "[object Array]") {
            for (u = p.length, c = 0; c < u; c += 1)
              v[c] = t(c, p) || "null";
            return f = v.length === 0 ? "[]" : o ? `[
` + o + v.join(`,
` + o) + `
` + d + "]" : "[" + v.join(",") + "]", o = d, f;
          }
          for (l in p)
            Ss.call(p, l) && (f = t(l, p), f && v.push(i(l) + (o ? ": " : ":") + f));
          return f = v.length === 0 ? "{}" : o ? "{" + v.join(",") + d + "}" : "{" + v.join(",") + "}", o = d, f;
      }
    };
    return t("", {
      "": r
    });
  };
})();
h.JSONDecode = (function() {
  var e, r, i = {
    '"': '"',
    "\\": "\\",
    "/": "/",
    b: "\b",
    f: "\f",
    n: `
`,
    r: "\r",
    t: "	"
  }, t, n = function(v) {
    var p = new SyntaxError(v);
    throw p.at = e, p.text = t, p;
  }, s = function(v) {
    return v && v !== r && n("Expected '" + v + "' instead of '" + r + "'"), r = t.charAt(e), e += 1, r;
  }, o = function() {
    var v, p = "";
    for (r === "-" && (p = "-", s("-")); r >= "0" && r <= "9"; )
      p += r, s();
    if (r === ".")
      for (p += "."; s() && r >= "0" && r <= "9"; )
        p += r;
    if (r === "e" || r === "E")
      for (p += r, s(), (r === "-" || r === "+") && (p += r, s()); r >= "0" && r <= "9"; )
        p += r, s();
    if (v = +p, !isFinite(v))
      n("Bad number");
    else
      return v;
  }, a = function() {
    var v, p, _ = "", m;
    if (r === '"')
      for (; s(); ) {
        if (r === '"')
          return s(), _;
        if (r === "\\")
          if (s(), r === "u") {
            for (m = 0, p = 0; p < 4 && (v = parseInt(s(), 16), !!isFinite(v)); p += 1)
              m = m * 16 + v;
            _ += String.fromCharCode(m);
          } else if (typeof i[r] == "string")
            _ += i[r];
          else
            break;
        else
          _ += r;
      }
    n("Bad string");
  }, c = function() {
    for (; r && r <= " "; )
      s();
  }, l = function() {
    switch (r) {
      case "t":
        return s("t"), s("r"), s("u"), s("e"), !0;
      case "f":
        return s("f"), s("a"), s("l"), s("s"), s("e"), !1;
      case "n":
        return s("n"), s("u"), s("l"), s("l"), null;
    }
    n('Unexpected "' + r + '"');
  }, f, u = function() {
    var v = [];
    if (r === "[") {
      if (s("["), c(), r === "]")
        return s("]"), v;
      for (; r; ) {
        if (v.push(f()), c(), r === "]")
          return s("]"), v;
        s(","), c();
      }
    }
    n("Bad array");
  }, d = function() {
    var v, p = {};
    if (r === "{") {
      if (s("{"), c(), r === "}")
        return s("}"), p;
      for (; r; ) {
        if (v = a(), c(), s(":"), Object.hasOwnProperty.call(p, v) && n('Duplicate key "' + v + '"'), p[v] = f(), c(), r === "}")
          return s("}"), p;
        s(","), c();
      }
    }
    n("Bad object");
  };
  return f = function() {
    switch (c(), r) {
      case "{":
        return d();
      case "[":
        return u();
      case '"':
        return a();
      case "-":
        return o();
      default:
        return r >= "0" && r <= "9" ? o() : l();
    }
  }, function(v) {
    var p;
    return t = v, e = 0, r = " ", p = f(), c(), r && n("Syntax error"), p;
  };
})();
h.base64Encode = function(e) {
  var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", i, t, n, s, o, a, c, l, f = 0, u = 0, d = "", v = [];
  if (!e)
    return e;
  e = h.utf8Encode(e);
  do
    i = e.charCodeAt(f++), t = e.charCodeAt(f++), n = e.charCodeAt(f++), l = i << 16 | t << 8 | n, s = l >> 18 & 63, o = l >> 12 & 63, a = l >> 6 & 63, c = l & 63, v[u++] = r.charAt(s) + r.charAt(o) + r.charAt(a) + r.charAt(c);
  while (f < e.length);
  switch (d = v.join(""), e.length % 3) {
    case 1:
      d = d.slice(0, -2) + "==";
      break;
    case 2:
      d = d.slice(0, -1) + "=";
      break;
  }
  return d;
};
h.utf8Encode = function(e) {
  e = (e + "").replace(/\r\n/g, `
`).replace(/\r/g, `
`);
  var r = "", i, t, n = 0, s;
  for (i = t = 0, n = e.length, s = 0; s < n; s++) {
    var o = e.charCodeAt(s), a = null;
    o < 128 ? t++ : o > 127 && o < 2048 ? a = String.fromCharCode(o >> 6 | 192, o & 63 | 128) : a = String.fromCharCode(o >> 12 | 224, o >> 6 & 63 | 128, o & 63 | 128), a !== null && (t > i && (r += e.substring(i, t)), r += a, i = t = s + 1);
  }
  return t > i && (r += e.substring(i, e.length)), r;
};
h.UUID = function() {
  try {
    return N.crypto.randomUUID();
  } catch {
    for (var e = new Array(36), r = 0; r < 36; r++)
      e[r] = Math.floor(Math.random() * 16);
    return e[14] = 4, e[19] = e[19] &= -5, e[19] = e[19] |= 8, e[8] = e[13] = e[18] = e[23] = "-", h.map(e, function(t) {
      return t.toString(16);
    }).join("");
  }
};
var _l = [
  "ahrefsbot",
  "ahrefssiteaudit",
  "amazonbot",
  "baiduspider",
  "bingbot",
  "bingpreview",
  "chrome-lighthouse",
  "facebookexternal",
  "petalbot",
  "pinterest",
  "screaming frog",
  "yahoo! slurp",
  "yandex",
  // a whole bunch of goog-specific crawlers
  // https://developers.google.com/search/docs/advanced/crawling/overview-google-crawlers
  "adsbot-google",
  "apis-google",
  "duplexweb-google",
  "feedfetcher-google",
  "google favicon",
  "google web preview",
  "google-read-aloud",
  "googlebot",
  "googleweblight",
  "mediapartners-google",
  "storebot-google"
];
h.isBlockedUA = function(e) {
  var r;
  for (e = e.toLowerCase(), r = 0; r < _l.length; r++)
    if (e.indexOf(_l[r]) !== -1)
      return !0;
  return !1;
};
h.HTTPBuildQuery = function(e, r) {
  var i, t, n = [];
  return h.isUndefined(r) && (r = "&"), h.each(e, function(s, o) {
    i = encodeURIComponent(s.toString()), t = encodeURIComponent(o), n[n.length] = t + "=" + i;
  }), n.join(r);
};
h.getQueryParam = function(e, r) {
  r = r.replace(/[[]/g, "\\[").replace(/[\]]/g, "\\]");
  var i = "[\\?&]" + r + "=([^&#]*)", t = new RegExp(i), n = t.exec(e);
  if (n === null || n && typeof n[1] != "string" && n[1].length)
    return "";
  var s = n[1];
  try {
    s = decodeURIComponent(s);
  } catch {
    be.error("Skipping decoding for malformed query param: " + s);
  }
  return s.replace(/\+/g, " ");
};
h.cookie = {
  get: function(e) {
    for (var r = e + "=", i = ie.cookie.split(";"), t = 0; t < i.length; t++) {
      for (var n = i[t]; n.charAt(0) == " "; )
        n = n.substring(1, n.length);
      if (n.indexOf(r) === 0)
        return decodeURIComponent(n.substring(r.length, n.length));
    }
    return null;
  },
  parse: function(e) {
    var r;
    try {
      r = h.JSONDecode(h.cookie.get(e)) || {};
    } catch {
    }
    return r;
  },
  set_seconds: function(e, r, i, t, n, s, o) {
    var a = "", c = "", l = "";
    if (o)
      a = "; domain=" + o;
    else if (t) {
      var f = bl(ie.location.hostname);
      a = f ? "; domain=." + f : "";
    }
    if (i) {
      var u = /* @__PURE__ */ new Date();
      u.setTime(u.getTime() + i * 1e3), c = "; expires=" + u.toGMTString();
    }
    s && (n = !0, l = "; SameSite=None"), n && (l += "; secure"), ie.cookie = e + "=" + encodeURIComponent(r) + c + "; path=/" + a + l;
  },
  set: function(e, r, i, t, n, s, o) {
    var a = "", c = "", l = "";
    if (o)
      a = "; domain=" + o;
    else if (t) {
      var f = bl(ie.location.hostname);
      a = f ? "; domain=." + f : "";
    }
    if (i) {
      var u = /* @__PURE__ */ new Date();
      u.setTime(u.getTime() + i * 24 * 60 * 60 * 1e3), c = "; expires=" + u.toGMTString();
    }
    s && (n = !0, l = "; SameSite=None"), n && (l += "; secure");
    var d = e + "=" + encodeURIComponent(r) + c + "; path=/" + a + l;
    return ie.cookie = d, d;
  },
  remove: function(e, r, i) {
    h.cookie.set(e, "", -1, r, !1, !1, i);
  }
};
var jf = function(e) {
  var r = !0;
  try {
    var i = "__mplss_" + Pa(8), t = "xyz";
    e.setItem(i, t), e.getItem(i) !== t && (r = !1), e.removeItem(i);
  } catch {
    r = !1;
  }
  return r;
}, Js = null, Vn = function(e, r) {
  return Js !== null && !r ? Js : Js = jf(e || N.localStorage);
}, Xs = null, Jy = function(e, r) {
  return Xs !== null && !r ? Xs : Xs = jf(e || N.sessionStorage);
};
function Uf(e, r, i) {
  var t = function(n) {
    be.error(r + " error: " + n);
  };
  return {
    is_supported: function(n) {
      var s = i(e, n);
      return s || be.error(r + " unsupported"), s;
    },
    error: t,
    get: function(n) {
      try {
        return e.getItem(n);
      } catch (s) {
        t(s);
      }
      return null;
    },
    parse: function(n) {
      try {
        return h.JSONDecode(e.getItem(n)) || {};
      } catch {
      }
      return null;
    },
    set: function(n, s) {
      try {
        e.setItem(n, s);
      } catch (o) {
        t(o);
      }
    },
    remove: function(n) {
      try {
        e.removeItem(n);
      } catch (s) {
        t(s);
      }
    }
  };
}
h.localStorage = Uf(N.localStorage, "localStorage", Vn);
h.sessionStorage = Uf(N.sessionStorage, "sessionStorage", Jy);
h.register_event = (function() {
  var e = function(t, n, s, o, a) {
    if (!t) {
      be.error("No valid element provided to register_event");
      return;
    }
    if (t.addEventListener && !o)
      t.addEventListener(n, s, !!a);
    else {
      var c = "on" + n, l = t[c];
      t[c] = r(t, s, l);
    }
  };
  function r(t, n, s) {
    var o = function(a) {
      if (a = a || i(N.event), !!a) {
        var c = !0, l, f;
        return h.isFunction(s) && (l = s(a)), f = n.call(t, a), (l === !1 || f === !1) && (c = !1), c;
      }
    };
    return o;
  }
  function i(t) {
    return t && (t.preventDefault = i.preventDefault, t.stopPropagation = i.stopPropagation), t;
  }
  return i.preventDefault = function() {
    this.returnValue = !1;
  }, i.stopPropagation = function() {
    this.cancelBubble = !0;
  }, e;
})();
var Xy = new RegExp('^(\\w*)\\[(\\w+)([=~\\|\\^\\$\\*]?)=?"?([^\\]"]*)"?\\]$');
h.dom_query = /* @__PURE__ */ (function() {
  function e(n) {
    return n.all ? n.all : n.getElementsByTagName("*");
  }
  var r = /[\t\r\n]/g;
  function i(n, s) {
    var o = " " + s + " ";
    return (" " + n.className + " ").replace(r, " ").indexOf(o) >= 0;
  }
  function t(n) {
    if (!ie.getElementsByTagName)
      return [];
    var s = n.split(" "), o, a, c, l, f, u, d, v, p, _, m = [ie];
    for (u = 0; u < s.length; u++) {
      if (o = s[u].replace(/^\s+/, "").replace(/\s+$/, ""), o.indexOf("#") > -1) {
        a = o.split("#"), c = a[0];
        var y = a[1], b = ie.getElementById(y);
        if (!b || c && b.nodeName.toLowerCase() != c)
          return [];
        m = [b];
        continue;
      }
      if (o.indexOf(".") > -1) {
        a = o.split("."), c = a[0];
        var S = a[1];
        for (c || (c = "*"), l = [], f = 0, d = 0; d < m.length; d++)
          for (c == "*" ? p = e(m[d]) : p = m[d].getElementsByTagName(c), v = 0; v < p.length; v++)
            l[f++] = p[v];
        for (m = [], _ = 0, d = 0; d < l.length; d++)
          l[d].className && h.isString(l[d].className) && // some SVG elements have classNames which are not strings
          i(l[d], S) && (m[_++] = l[d]);
        continue;
      }
      var E = o.match(Xy);
      if (E) {
        c = E[1];
        var C = E[2], A = E[3], I = E[4];
        for (c || (c = "*"), l = [], f = 0, d = 0; d < m.length; d++)
          for (c == "*" ? p = e(m[d]) : p = m[d].getElementsByTagName(c), v = 0; v < p.length; v++)
            l[f++] = p[v];
        m = [], _ = 0;
        var M;
        switch (A) {
          case "=":
            M = function(D) {
              return D.getAttribute(C) == I;
            };
            break;
          case "~":
            M = function(D) {
              return D.getAttribute(C).match(new RegExp("\\b" + I + "\\b"));
            };
            break;
          case "|":
            M = function(D) {
              return D.getAttribute(C).match(new RegExp("^" + I + "-?"));
            };
            break;
          case "^":
            M = function(D) {
              return D.getAttribute(C).indexOf(I) === 0;
            };
            break;
          case "$":
            M = function(D) {
              return D.getAttribute(C).lastIndexOf(I) == D.getAttribute(C).length - I.length;
            };
            break;
          case "*":
            M = function(D) {
              return D.getAttribute(C).indexOf(I) > -1;
            };
            break;
          default:
            M = function(D) {
              return D.getAttribute(C);
            };
        }
        for (m = [], _ = 0, d = 0; d < l.length; d++)
          M(l[d]) && (m[_++] = l[d]);
        continue;
      }
      for (c = o, l = [], f = 0, d = 0; d < m.length; d++)
        for (p = m[d].getElementsByTagName(c), v = 0; v < p.length; v++)
          l[f++] = p[v];
      m = l;
    }
    return m;
  }
  return function(n) {
    return h.isElement(n) ? [n] : h.isObject(n) && !h.isUndefined(n.length) ? n : t.call(this, n);
  };
})();
var Zy = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id", "utm_source_platform", "utm_campaign_id", "utm_creative_format", "utm_marketing_tactic"], Qy = ["dclid", "fbclid", "gclid", "ko_click_id", "li_fat_id", "msclkid", "sccid", "ttclid", "twclid", "wbraid"];
h.info = {
  campaignParams: function(e) {
    var r = "", i = {};
    return h.each(Zy, function(t) {
      r = h.getQueryParam(ie.URL, t), r.length ? i[t] = r : e !== void 0 && (i[t] = e);
    }), i;
  },
  clickParams: function() {
    var e = "", r = {};
    return h.each(Qy, function(i) {
      e = h.getQueryParam(ie.URL, i), e.length && (r[i] = e);
    }), r;
  },
  marketingParams: function() {
    return h.extend(h.info.campaignParams(), h.info.clickParams());
  },
  searchEngine: function(e) {
    return e.search("https?://(.*)google.([^/?]*)") === 0 ? "google" : e.search("https?://(.*)bing.com") === 0 ? "bing" : e.search("https?://(.*)yahoo.com") === 0 ? "yahoo" : e.search("https?://(.*)duckduckgo.com") === 0 ? "duckduckgo" : null;
  },
  searchInfo: function(e) {
    var r = h.info.searchEngine(e), i = r != "yahoo" ? "q" : "p", t = {};
    if (r !== null) {
      t.$search_engine = r;
      var n = h.getQueryParam(e, i);
      n.length && (t.mp_keyword = n);
    }
    return t;
  },
  /**
   * This function detects which browser is running this script.
   * The order of the checks are important since many user agents
   * include key words used in later checks.
   */
  browser: function(e, r, i) {
    return r = r || "", i || h.includes(e, " OPR/") ? h.includes(e, "Mini") ? "Opera Mini" : "Opera" : /(BlackBerry|PlayBook|BB10)/i.test(e) ? "BlackBerry" : h.includes(e, "IEMobile") || h.includes(e, "WPDesktop") ? "Internet Explorer Mobile" : h.includes(e, "SamsungBrowser/") ? "Samsung Internet" : h.includes(e, "Edge") || h.includes(e, "Edg/") ? "Microsoft Edge" : h.includes(e, "FBIOS") ? "Facebook Mobile" : h.includes(e, "Whale/") ? "Whale Browser" : h.includes(e, "Chrome") ? "Chrome" : h.includes(e, "CriOS") ? "Chrome iOS" : h.includes(e, "UCWEB") || h.includes(e, "UCBrowser") ? "UC Browser" : h.includes(e, "FxiOS") ? "Firefox iOS" : h.includes(r, "Apple") ? h.includes(e, "Mobile") ? "Mobile Safari" : "Safari" : h.includes(e, "Android") ? "Android Mobile" : h.includes(e, "Konqueror") ? "Konqueror" : h.includes(e, "Firefox") ? "Firefox" : h.includes(e, "MSIE") || h.includes(e, "Trident/") ? "Internet Explorer" : h.includes(e, "Gecko") ? "Mozilla" : "";
  },
  /**
   * This function detects which browser version is running this script,
   * parsing major and minor version (e.g., 42.1). User agent strings from:
   * http://www.useragentstring.com/pages/useragentstring.php
   */
  browserVersion: function(e, r, i) {
    var t = h.info.browser(e, r, i), n = {
      "Internet Explorer Mobile": /rv:(\d+(\.\d+)?)/,
      "Microsoft Edge": /Edge?\/(\d+(\.\d+)?)/,
      Chrome: /Chrome\/(\d+(\.\d+)?)/,
      "Chrome iOS": /CriOS\/(\d+(\.\d+)?)/,
      "UC Browser": /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
      Safari: /Version\/(\d+(\.\d+)?)/,
      "Mobile Safari": /Version\/(\d+(\.\d+)?)/,
      Opera: /(Opera|OPR)\/(\d+(\.\d+)?)/,
      Firefox: /Firefox\/(\d+(\.\d+)?)/,
      "Firefox iOS": /FxiOS\/(\d+(\.\d+)?)/,
      Konqueror: /Konqueror:(\d+(\.\d+)?)/,
      BlackBerry: /BlackBerry (\d+(\.\d+)?)/,
      "Android Mobile": /android\s(\d+(\.\d+)?)/,
      "Samsung Internet": /SamsungBrowser\/(\d+(\.\d+)?)/,
      "Internet Explorer": /(rv:|MSIE )(\d+(\.\d+)?)/,
      Mozilla: /rv:(\d+(\.\d+)?)/,
      "Whale Browser": /Whale\/(\d+(\.\d+)?)/
    }, s = n[t];
    if (s === void 0)
      return null;
    var o = e.match(s);
    return o ? parseFloat(o[o.length - 2]) : null;
  },
  os: function() {
    var e = Gt;
    return /Windows/i.test(e) ? /Phone/.test(e) || /WPDesktop/.test(e) ? "Windows Phone" : "Windows" : /(iPhone|iPad|iPod)/.test(e) ? "iOS" : /Android/.test(e) ? "Android" : /(BlackBerry|PlayBook|BB10)/i.test(e) ? "BlackBerry" : /Mac/i.test(e) ? "Mac OS X" : /Linux/.test(e) ? "Linux" : /CrOS/.test(e) ? "Chrome OS" : "";
  },
  device: function(e) {
    return /Windows Phone/i.test(e) || /WPDesktop/.test(e) ? "Windows Phone" : /iPad/.test(e) ? "iPad" : /iPod/.test(e) ? "iPod Touch" : /iPhone/.test(e) ? "iPhone" : /(BlackBerry|PlayBook|BB10)/i.test(e) ? "BlackBerry" : /Android/.test(e) ? "Android" : "";
  },
  referringDomain: function(e) {
    var r = e.split("/");
    return r.length >= 3 ? r[2] : "";
  },
  currentUrl: function() {
    return N.location.href;
  },
  properties: function(e) {
    return typeof e != "object" && (e = {}), h.extend(h.strip_empty_properties({
      $os: h.info.os(),
      $browser: h.info.browser(Gt, Qt.vendor, bn),
      $referrer: ie.referrer,
      $referring_domain: h.info.referringDomain(ie.referrer),
      $device: h.info.device(Gt)
    }), {
      $current_url: h.info.currentUrl(),
      $browser_version: h.info.browserVersion(Gt, Qt.vendor, bn),
      $screen_height: vl.height,
      $screen_width: vl.width,
      mp_lib: "web",
      $lib_version: Mt.LIB_VERSION,
      $insert_id: Pa(),
      time: h.timestamp() / 1e3
      // epoch time in seconds
    }, h.strip_empty_properties(e));
  },
  people_properties: function() {
    return h.extend(h.strip_empty_properties({
      $os: h.info.os(),
      $browser: h.info.browser(Gt, Qt.vendor, bn)
    }), {
      $browser_version: h.info.browserVersion(Gt, Qt.vendor, bn)
    });
  },
  mpPageViewProperties: function() {
    return h.strip_empty_properties({
      current_page_title: ie.title,
      current_domain: N.location.hostname,
      current_url_path: N.location.pathname,
      current_url_protocol: N.location.protocol,
      current_url_search: N.location.search
    });
  }
};
var e_ = function(e, r) {
  var i = null, t = [];
  return function(n) {
    var s = this;
    return t.push(n), i || (i = new ge(function(o) {
      setTimeout(function() {
        var a = e.apply(s, [t]);
        i = null, t = [], o(a);
      }, r);
    })), i;
  };
}, Pa = function(e) {
  var r = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
  return e ? r.substring(0, e) : r;
}, t_ = function() {
  var e = h.UUID().replace(/-/g, ""), r = h.UUID().replace(/-/g, "").substring(0, 16), i = "01";
  return "00-" + e + "-" + r + "-" + i;
}, r_ = /[a-z0-9][a-z0-9-]*\.[a-z]+$/i, n_ = /[a-z0-9][a-z0-9-]+\.[a-z.]{2,6}$/i, bl = function(e) {
  var r = n_, i = e.split("."), t = i[i.length - 1];
  (t.length > 4 || t === "com" || t === "org") && (r = r_);
  var n = e.match(r);
  return n ? n[0] : "";
}, i_ = function() {
  var e = N.navigator.onLine;
  return h.isUndefined(e) || e;
}, fr = function() {
}, rn = null, Qi = null;
typeof JSON < "u" && (rn = JSON.stringify, Qi = JSON.parse);
rn = rn || h.JSONEncode;
Qi = Qi || h.JSONDecode;
var s_ = function(e, r, i) {
  if (!N.CompressionStream)
    return !1;
  var t = h.info.browser(e, r, i), n = h.info.browserVersion(e, r, i);
  return !((t === "Safari" || t === "Mobile Safari") && n >= 16.4 && n < 16.6);
};
h.info = h.info;
h.info.browser = h.info.browser;
h.info.browserVersion = h.info.browserVersion;
h.info.device = h.info.device;
h.info.properties = h.info.properties;
h.isBlockedUA = h.isBlockedUA;
h.isEmptyObject = h.isEmptyObject;
h.isObject = h.isObject;
h.JSONDecode = h.JSONDecode;
h.JSONEncode = h.JSONEncode;
h.toArray = h.toArray;
h.NPO = Sr;
var o_ = "mixpanelBrowserDb", Bf = "mixpanelRecordingEvents", La = "mixpanelRecordingRegistry", a_ = 1, c_ = [Bf, La], Ut = function(e) {
  this.dbPromise = null, this.storeName = e;
};
Ut.prototype._openDb = function() {
  return new ge(function(e, r) {
    var i = N.indexedDB.open(o_, a_);
    i.onerror = function() {
      r(i.error);
    }, i.onsuccess = function() {
      e(i.result);
    }, i.onupgradeneeded = function(t) {
      var n = t.target.result;
      c_.forEach(function(s) {
        n.createObjectStore(s);
      });
    };
  });
};
Ut.prototype.init = function() {
  return N.indexedDB ? (this.dbPromise || (this.dbPromise = this._openDb()), this.dbPromise.then(function(e) {
    return e instanceof N.IDBDatabase ? ge.resolve() : ge.reject(e);
  })) : ge.reject("indexedDB is not supported in this browser");
};
Ut.prototype.isInitialized = function() {
  return !!this.dbPromise;
};
Ut.prototype.makeTransaction = function(e, r) {
  var i = this.storeName, t = function(n) {
    return new ge(function(s, o) {
      var a = n.transaction(i, e);
      a.oncomplete = function() {
        s(a);
      }, a.onabort = a.onerror = function() {
        o(a.error);
      }, r(a.objectStore(i));
    });
  };
  return this.dbPromise.then(t).catch((function(n) {
    return n && n.name === "InvalidStateError" ? (this.dbPromise = this._openDb(), this.dbPromise.then(t)) : ge.reject(n);
  }).bind(this));
};
Ut.prototype.setItem = function(e, r) {
  return this.makeTransaction("readwrite", function(i) {
    i.put(r, e);
  });
};
Ut.prototype.getItem = function(e) {
  var r;
  return this.makeTransaction("readonly", function(i) {
    r = i.get(e);
  }).then(function() {
    return r.result;
  });
};
Ut.prototype.removeItem = function(e) {
  return this.makeTransaction("readwrite", function(r) {
    r.delete(e);
  });
};
Ut.prototype.getAll = function() {
  var e;
  return this.makeTransaction("readonly", function(r) {
    e = r.getAll();
  }).then(function() {
    return e.result;
  });
};
var l_ = "__mp_opt_in_out_";
function u_(e, r) {
  Gf(!0, e, r);
}
function f_(e, r) {
  Gf(!1, e, r);
}
function d_(e, r) {
  return zf(e, r) === "1";
}
function Wf(e, r) {
  if (p_(r))
    return be.warn('This browser has "Do Not Track" enabled. This will prevent the Mixpanel SDK from sending any data. To ignore the "Do Not Track" browser setting, initialize the Mixpanel instance with the config "ignore_dnt: true"'), !0;
  var i = zf(e, r) === "0";
  return i && be.warn("You are opted out of Mixpanel tracking. This will prevent the Mixpanel SDK from sending any data."), i;
}
function xr(e) {
  return Fa(e, function(r) {
    return this.get_config(r);
  });
}
function Cr(e) {
  return Fa(e, function(r) {
    return this._get_config(r);
  });
}
function cn(e) {
  return Fa(e, function(r) {
    return this._get_config(r);
  });
}
function h_(e, r) {
  r = r || {}, $a(r).remove(
    Da(e, r),
    !!r.crossSubdomainCookie,
    r.cookieDomain
  );
}
function $a(e) {
  return e = e || {}, e.persistenceType === "localStorage" ? h.localStorage : h.cookie;
}
function Da(e, r) {
  return r = r || {}, (r.persistencePrefix || l_) + e;
}
function zf(e, r) {
  return $a(r).get(Da(e, r));
}
function p_(e) {
  if (e && e.ignoreDnt)
    return !1;
  var r = e && e.window || N, i = r.navigator || {}, t = !1;
  return h.each([
    i.doNotTrack,
    // standard
    i.msDoNotTrack,
    r.doNotTrack
  ], function(n) {
    h.includes([!0, 1, "1", "yes"], n) && (t = !0);
  }), t;
}
function Gf(e, r, i) {
  if (!h.isString(r) || !r.length) {
    be.error("gdpr." + (e ? "optIn" : "optOut") + " called with an invalid token");
    return;
  }
  i = i || {}, $a(i).set(
    Da(r, i),
    e ? 1 : 0,
    h.isNumber(i.cookieExpiration) ? i.cookieExpiration : null,
    !!i.crossSubdomainCookie,
    !!i.secureCookie,
    !!i.crossSiteCookie,
    i.cookieDomain
  ), i.track && e && i.track(i.trackEventName || "$opt_in", i.trackProperties, {
    send_immediately: !0
  });
}
function Fa(e, r) {
  return function() {
    var i = !1;
    try {
      var t = r.call(this, "token"), n = r.call(this, "ignore_dnt"), s = r.call(this, "opt_out_tracking_persistence_type"), o = r.call(this, "opt_out_tracking_cookie_prefix"), a = r.call(this, "window");
      t && (i = Wf(t, {
        ignoreDnt: n,
        persistenceType: s,
        persistencePrefix: o,
        window: a
      }));
    } catch (l) {
      be.error("Unexpected error when checking tracking opt-out status: " + l);
    }
    if (!i)
      return e.apply(this, arguments);
    var c = arguments[arguments.length - 1];
    typeof c == "function" && c(0);
  };
}
var v_ = Pr("lock"), Vf = function(e, r) {
  r = r || {}, this.storageKey = e, this.storage = r.storage || N.localStorage, this.pollIntervalMS = r.pollIntervalMS || 100, this.timeoutMS = r.timeoutMS || 2e3, this.promiseImpl = r.promiseImpl || ge;
};
Vf.prototype.withLock = function(e, r) {
  var i = this.promiseImpl;
  return new i(h.bind(function(t, n) {
    var s = r || (/* @__PURE__ */ new Date()).getTime() + "|" + Math.random(), o = (/* @__PURE__ */ new Date()).getTime(), a = this.storageKey, c = this.pollIntervalMS, l = this.timeoutMS, f = this.storage, u = a + ":X", d = a + ":Y", v = a + ":Z", p = function(S) {
      if ((/* @__PURE__ */ new Date()).getTime() - o > l) {
        v_.error("Timeout waiting for mutex on " + a + "; clearing lock. [" + s + "]"), f.removeItem(v), f.removeItem(d), y();
        return;
      }
      setTimeout(function() {
        try {
          S();
        } catch (E) {
          n(E);
        }
      }, c * (Math.random() + 0.1));
    }, _ = function(S, E) {
      S() ? E() : p(function() {
        _(S, E);
      });
    }, m = function() {
      var S = f.getItem(d);
      return S && S !== s ? !1 : (f.setItem(d, s), f.getItem(d) === s ? !0 : (Vn(f, !0) || n(new Error("localStorage support dropped while acquiring lock")), !1));
    }, y = function() {
      f.setItem(u, s), _(m, function() {
        if (f.getItem(u) === s) {
          b();
          return;
        }
        p(function() {
          if (f.getItem(d) !== s) {
            y();
            return;
          }
          _(function() {
            return !f.getItem(v);
          }, b);
        });
      });
    }, b = function() {
      f.setItem(v, "1");
      var S = function() {
        f.removeItem(v), f.getItem(d) === s && f.removeItem(d), f.getItem(u) === s && f.removeItem(u);
      };
      e().then(function(E) {
        S(), t(E);
      }).catch(function(E) {
        S(), n(E);
      });
    };
    try {
      if (Vn(f, !0))
        y();
      else
        throw new Error("localStorage support check failed");
    } catch (S) {
      n(S);
    }
  }, this));
};
var ln = function(e) {
  this.storage = e || N.localStorage;
};
ln.prototype.init = function() {
  return ge.resolve();
};
ln.prototype.isInitialized = function() {
  return !0;
};
ln.prototype.setItem = function(e, r) {
  return new ge(h.bind(function(i, t) {
    try {
      this.storage.setItem(e, rn(r));
    } catch (n) {
      t(n);
    }
    i();
  }, this));
};
ln.prototype.getItem = function(e) {
  return new ge(h.bind(function(r, i) {
    var t;
    try {
      t = Qi(this.storage.getItem(e));
    } catch (n) {
      i(n);
    }
    r(t);
  }, this));
};
ln.prototype.removeItem = function(e) {
  return new ge(h.bind(function(r, i) {
    try {
      this.storage.removeItem(e);
    } catch (t) {
      i(t);
    }
    r();
  }, this));
};
var wl = Pr("batch"), Ht = function(e, r) {
  r = r || {}, this.storageKey = e, this.usePersistence = r.usePersistence, this.usePersistence && (this.queueStorage = r.queueStorage || new ln(), this.lock = new Vf(e, {
    storage: r.sharedLockStorage || N.localStorage,
    timeoutMS: r.sharedLockTimeoutMS
  })), this.reportError = r.errorReporter || h.bind(wl.error, wl), this.pid = r.pid || null, this.memQueue = [], this.initialized = !1, r.enqueueThrottleMs ? this.enqueuePersisted = e_(h.bind(this._enqueuePersisted, this), r.enqueueThrottleMs) : this.enqueuePersisted = h.bind(function(i) {
    return this._enqueuePersisted([i]);
  }, this);
};
Ht.prototype.ensureInit = function() {
  return this.initialized || !this.usePersistence ? ge.resolve() : this.queueStorage.init().then(h.bind(function() {
    this.initialized = !0;
  }, this)).catch(h.bind(function(e) {
    this.reportError("Error initializing queue persistence. Disabling persistence", e), this.initialized = !0, this.usePersistence = !1;
  }, this));
};
Ht.prototype.enqueue = function(e, r) {
  var i = {
    id: Pa(),
    flushAfter: (/* @__PURE__ */ new Date()).getTime() + r * 2,
    payload: e
  };
  return this.usePersistence ? this.enqueuePersisted(i) : (this.memQueue.push(i), ge.resolve(!0));
};
Ht.prototype._enqueuePersisted = function(e) {
  var r = h.bind(function() {
    return this.ensureInit().then(h.bind(function() {
      return this.readFromStorage();
    }, this)).then(h.bind(function(i) {
      return this.saveToStorage(i.concat(e));
    }, this)).then(h.bind(function(i) {
      return i && (this.memQueue = this.memQueue.concat(e)), i;
    }, this)).catch(h.bind(function(i) {
      return this.reportError("Error enqueueing items", i, e), !1;
    }, this));
  }, this);
  return this.lock.withLock(r, this.pid).catch(h.bind(function(i) {
    return this.reportError("Error acquiring storage lock", i), !1;
  }, this));
};
Ht.prototype.fillBatch = function(e) {
  var r = this.memQueue.slice(0, e);
  return this.usePersistence && r.length < e ? this.ensureInit().then(h.bind(function() {
    return this.readFromStorage();
  }, this)).then(h.bind(function(i) {
    if (i.length) {
      var t = {};
      h.each(r, function(o) {
        t[o.id] = !0;
      });
      for (var n = 0; n < i.length; n++) {
        var s = i[n];
        if ((/* @__PURE__ */ new Date()).getTime() > s.flushAfter && !t[s.id] && (s.orphaned = !0, r.push(s), r.length >= e))
          break;
      }
    }
    return r;
  }, this)) : ge.resolve(r);
};
var Sl = function(e, r) {
  var i = [];
  return h.each(e, function(t) {
    t.id && !r[t.id] && i.push(t);
  }), i;
};
Ht.prototype.removeItemsByID = function(e) {
  var r = {};
  if (h.each(e, function(t) {
    r[t] = !0;
  }), this.memQueue = Sl(this.memQueue, r), this.usePersistence) {
    var i = h.bind(function() {
      return this.ensureInit().then(h.bind(function() {
        return this.readFromStorage();
      }, this)).then(h.bind(function(t) {
        return t = Sl(t, r), this.saveToStorage(t);
      }, this)).then(h.bind(function() {
        return this.readFromStorage();
      }, this)).then(h.bind(function(t) {
        for (var n = 0; n < t.length; n++) {
          var s = t[n];
          if (s.id && r[s.id])
            throw new Error("Item not removed from storage");
        }
        return !0;
      }, this)).catch(h.bind(function(t) {
        return this.reportError("Error removing items", t, e), !1;
      }, this));
    }, this);
    return this.lock.withLock(i, this.pid).catch(h.bind(function(t) {
      return this.reportError("Error acquiring storage lock", t), Vn(this.lock.storage, !0) ? !1 : i().then(h.bind(function(n) {
        return n || this.queueStorage.removeItem(this.storageKey).then(function() {
          return n;
        });
      }, this)).catch(h.bind(function(n) {
        return this.reportError("Error clearing queue", n), !1;
      }, this));
    }, this));
  } else
    return ge.resolve(!0);
};
var xl = function(e, r) {
  var i = [];
  return h.each(e, function(t) {
    var n = t.id;
    if (n in r) {
      var s = r[n];
      s !== null && (t.payload = s, i.push(t));
    } else
      i.push(t);
  }), i;
};
Ht.prototype.updatePayloads = function(e) {
  return this.memQueue = xl(this.memQueue, e), this.usePersistence ? this.lock.withLock(h.bind(function() {
    return this.ensureInit().then(h.bind(function() {
      return this.readFromStorage();
    }, this)).then(h.bind(function(i) {
      return i = xl(i, e), this.saveToStorage(i);
    }, this)).catch(h.bind(function(i) {
      return this.reportError("Error updating items", e, i), !1;
    }, this));
  }, this), this.pid).catch(h.bind(function(r) {
    return this.reportError("Error acquiring storage lock", r), !1;
  }, this)) : ge.resolve(!0);
};
Ht.prototype.readFromStorage = function() {
  return this.ensureInit().then(h.bind(function() {
    return this.queueStorage.getItem(this.storageKey);
  }, this)).then(h.bind(function(e) {
    return e && (h.isArray(e) || (this.reportError("Invalid storage entry:", e), e = null)), e || [];
  }, this)).catch(h.bind(function(e) {
    return this.reportError("Error retrieving queue", e), [];
  }, this));
};
Ht.prototype.saveToStorage = function(e) {
  return this.ensureInit().then(h.bind(function() {
    return this.queueStorage.setItem(this.storageKey, e);
  }, this)).then(function() {
    return !0;
  }).catch(h.bind(function(r) {
    return this.reportError("Error saving queue", r), !1;
  }, this));
};
Ht.prototype.clear = function() {
  return this.memQueue = [], this.usePersistence ? this.ensureInit().then(h.bind(function() {
    return this.queueStorage.removeItem(this.storageKey);
  }, this)) : ge.resolve();
};
var g_ = 600 * 1e3, En = Pr("batch"), Pt = function(e, r) {
  this.errorReporter = r.errorReporter, this.queue = new Ht(e, {
    errorReporter: h.bind(this.reportError, this),
    queueStorage: r.queueStorage,
    sharedLockStorage: r.sharedLockStorage,
    sharedLockTimeoutMS: r.sharedLockTimeoutMS,
    usePersistence: r.usePersistence,
    enqueueThrottleMs: r.enqueueThrottleMs
  }), this.libConfig = r.libConfig, this.sendRequest = r.sendRequestFunc, this.beforeSendHook = r.beforeSendHook, this.stopAllBatching = r.stopAllBatchingFunc, this.batchSize = this.libConfig.batch_size, this.flushInterval = this.libConfig.batch_flush_interval_ms, this.stopped = !this.libConfig.batch_autostart, this.consecutiveRemovalFailures = 0, this.itemIdsSentSuccessfully = {}, this.flushOnlyOnInterval = r.flushOnlyOnInterval || !1, this._flushPromise = null;
};
Pt.prototype.enqueue = function(e) {
  return this.queue.enqueue(e, this.flushInterval);
};
Pt.prototype.start = function() {
  return this.stopped = !1, this.consecutiveRemovalFailures = 0, this.flush();
};
Pt.prototype.stop = function() {
  this.stopped = !0, this.timeoutID && (clearTimeout(this.timeoutID), this.timeoutID = null);
};
Pt.prototype.clear = function() {
  return this.queue.clear();
};
Pt.prototype.resetBatchSize = function() {
  this.batchSize = this.libConfig.batch_size;
};
Pt.prototype.resetFlush = function() {
  this.scheduleFlush(this.libConfig.batch_flush_interval_ms);
};
Pt.prototype.scheduleFlush = function(e) {
  this.flushInterval = e, this.stopped || (this.timeoutID = setTimeout(h.bind(function() {
    this.stopped || (this._flushPromise = this.flush());
  }, this), this.flushInterval));
};
Pt.prototype.sendRequestPromise = function(e, r) {
  return new ge(h.bind(function(i) {
    this.sendRequest(e, r, i);
  }, this));
};
Pt.prototype.flush = function(e) {
  if (this.requestInProgress)
    return En.log("Flush: Request already in progress"), ge.resolve();
  this.requestInProgress = !0, e = e || {};
  var r = this.libConfig.batch_request_timeout_ms, i = (/* @__PURE__ */ new Date()).getTime(), t = this.batchSize;
  return this.queue.fillBatch(t).then(h.bind(function(n) {
    var s = n.length === t, o = [], a = {};
    if (h.each(n, function(u) {
      var d = u.payload;
      if (this.beforeSendHook && !u.orphaned && (d = this.beforeSendHook(d)), d) {
        d.event && d.properties && (d.properties = h.extend(
          {},
          d.properties,
          { mp_sent_by_lib_version: Mt.LIB_VERSION }
        ));
        var v = !0, p = u.id;
        p ? (this.itemIdsSentSuccessfully[p] || 0) > 5 && (this.reportError("[dupe] item ID sent too many times, not sending", {
          item: u,
          batchSize: n.length,
          timesSent: this.itemIdsSentSuccessfully[p]
        }), v = !1) : this.reportError("[dupe] found item with no ID", { item: u }), v && o.push(d);
      }
      a[u.id] = d;
    }, this), o.length < 1)
      return this.requestInProgress = !1, this.resetFlush(), ge.resolve();
    var c = h.bind(function() {
      return this.queue.removeItemsByID(
        h.map(n, function(u) {
          return u.id;
        })
      ).then(h.bind(function(u) {
        return h.each(n, h.bind(function(d) {
          var v = d.id;
          v ? (this.itemIdsSentSuccessfully[v] = this.itemIdsSentSuccessfully[v] || 0, this.itemIdsSentSuccessfully[v]++, this.itemIdsSentSuccessfully[v] > 5 && this.reportError("[dupe] item ID sent too many times", {
            item: d,
            batchSize: n.length,
            timesSent: this.itemIdsSentSuccessfully[v]
          })) : this.reportError("[dupe] found item with no ID while removing", { item: d });
        }, this)), u ? (this.consecutiveRemovalFailures = 0, this.flushOnlyOnInterval && !s ? (this.resetFlush(), ge.resolve()) : this.flush()) : (++this.consecutiveRemovalFailures > 5 ? (this.reportError("Too many queue failures; disabling batching system."), this.stopAllBatching()) : this.resetFlush(), ge.resolve());
      }, this));
    }, this), l = h.bind(function(u) {
      this.requestInProgress = !1;
      try {
        if (e.unloading)
          return this.queue.updatePayloads(a);
        if (h.isObject(u) && u.error === "timeout" && (/* @__PURE__ */ new Date()).getTime() - i >= r)
          return this.reportError("Network timeout; retrying"), this.flush();
        if (h.isObject(u) && (u.httpStatusCode >= 500 || u.httpStatusCode === 429 || u.httpStatusCode <= 0 && !i_() || u.error === "timeout")) {
          var d = this.flushInterval * 2;
          return u.retryAfter && (d = parseInt(u.retryAfter, 10) * 1e3 || d), d = Math.min(g_, d), this.reportError("Error; retry in " + d + " ms"), this.scheduleFlush(d), ge.resolve();
        } else if (h.isObject(u) && u.httpStatusCode === 413)
          if (n.length > 1) {
            var v = Math.max(1, Math.floor(t / 2));
            return this.batchSize = Math.min(this.batchSize, v, n.length - 1), this.reportError("413 response; reducing batch size to " + this.batchSize), this.resetFlush(), ge.resolve();
          } else
            return this.reportError("Single-event request too large; dropping", n), this.resetBatchSize(), c();
        else
          return c();
      } catch (p) {
        this.reportError("Error handling API response", p), this.resetFlush();
      }
    }, this), f = {
      method: "POST",
      verbose: !0,
      ignore_json_errors: !0,
      // eslint-disable-line camelcase
      timeout_ms: r
      // eslint-disable-line camelcase
    };
    return e.unloading && (f.transport = "sendBeacon"), En.log("MIXPANEL REQUEST:", o), this.sendRequestPromise(o, f).then(l);
  }, this)).catch(h.bind(function(n) {
    this.reportError("Error flushing request queue", n), this.resetFlush();
  }, this));
};
Pt.prototype.reportError = function(e, r) {
  if (En.error.apply(En.error, arguments), this.errorReporter)
    try {
      r instanceof Error || (r = new Error(e)), this.errorReporter(e, r);
    } catch (i) {
      En.error(i);
    }
};
var ja = function(e) {
  var r = Date.now();
  return !e || r > e.maxExpires || r > e.idleExpires;
}, m_ = 250, Hr = Pr("recorder"), y_ = N.CompressionStream, __ = {
  batch_size: 1e3,
  batch_flush_interval_ms: 10 * 1e3,
  batch_request_timeout_ms: 90 * 1e3,
  batch_autostart: !0
}, b_ = /* @__PURE__ */ new Set([
  ne.MouseMove,
  ne.MouseInteraction,
  ne.Scroll,
  ne.ViewportResize,
  ne.Input,
  ne.TouchMove,
  ne.MediaInteraction,
  ne.Drag,
  ne.Selection
]);
function w_(e) {
  return e.type === ve.IncrementalSnapshot && b_.has(e.data.source);
}
var st = function(e) {
  this._mixpanel = e.mixpanelInstance, this._onIdleTimeout = e.onIdleTimeout || fr, this._onMaxLengthReached = e.onMaxLengthReached || fr, this._onBatchSent = e.onBatchSent || fr, this._rrwebRecord = e.rrwebRecord || null, this._stopRecording = null, this.replayId = e.replayId, this.batchStartUrl = e.batchStartUrl || null, this.replayStartUrl = e.replayStartUrl || null, this.idleExpires = e.idleExpires || null, this.maxExpires = e.maxExpires || null, this.replayStartTime = e.replayStartTime || null, this.lastEventTimestamp = e.lastEventTimestamp || null, this.seqNo = e.seqNo || 0, this.idleTimeoutId = null, this.maxTimeoutId = null, this.recordMaxMs = kn, this.recordMinMs = 0;
  var r = Vn(e.sharedLockStorage, !0) && !this.getConfig("disable_persistence");
  this.batcherKey = "__mprec_" + this.getConfig("name") + "_" + this.getConfig("token") + "_" + this.replayId, this.queueStorage = new Ut(Bf), this.batcher = new Pt(this.batcherKey, {
    errorReporter: this.reportError.bind(this),
    flushOnlyOnInterval: !0,
    libConfig: __,
    sendRequestFunc: this.flushEventsWithOptOut.bind(this),
    queueStorage: this.queueStorage,
    sharedLockStorage: e.sharedLockStorage,
    usePersistence: r,
    stopAllBatchingFunc: this.stopRecording.bind(this),
    // increased throttle and shared lock timeout because recording events are very high frequency.
    // this will minimize the amount of lock contention between enqueued events.
    // for session recordings there is a lock for each tab anyway, so there's no risk of deadlock between tabs.
    enqueueThrottleMs: m_,
    sharedLockTimeoutMS: 10 * 1e3
  });
};
st.prototype.getUserIdInfo = function() {
  if (this.finalFlushUserIdInfo)
    return this.finalFlushUserIdInfo;
  var e = {
    distinct_id: String(this._mixpanel.get_distinct_id())
  }, r = this._mixpanel.get_property("$device_id");
  r && (e.$device_id = r);
  var i = this._mixpanel.get_property("$user_id");
  return i && (e.$user_id = i), e;
};
st.prototype.unloadPersistedData = function() {
  return this.batcher.stop(), this.queueStorage.init().catch((function() {
    this.reportError("Error initializing IndexedDB storage for unloading persisted data.");
  }).bind(this)).then((function() {
    return this.getDurationMs() < this._getRecordMinMs() ? this.queueStorage.removeItem(this.batcherKey) : this.batcher.flush().then((function() {
      return this.queueStorage.removeItem(this.batcherKey);
    }).bind(this));
  }).bind(this));
};
st.prototype.getConfig = function(e) {
  return this._mixpanel.get_config(e);
};
st.prototype.get_config = function(e) {
  return this.getConfig(e);
};
st.prototype.startRecording = function(e) {
  if (this._rrwebRecord === null) {
    this.reportError("rrweb record function not provided. ");
    return;
  }
  if (this._stopRecording !== null) {
    Hr.log("Recording already in progress, skipping startRecording.");
    return;
  }
  this.recordMaxMs = this.getConfig("record_max_ms"), this.recordMaxMs > kn && (this.recordMaxMs = kn, Hr.critical("record_max_ms cannot be greater than " + kn + "ms. Capping value.")), this.maxExpires || (this.maxExpires = (/* @__PURE__ */ new Date()).getTime() + this.recordMaxMs), this.recordMinMs = this._getRecordMinMs(), this.replayStartTime || (this.replayStartTime = (/* @__PURE__ */ new Date()).getTime(), this.batchStartUrl = h.info.currentUrl(), this.replayStartUrl = h.info.currentUrl()), e || this.recordMinMs > 0 ? this.batcher.stop() : this.batcher.start();
  var r = (function() {
    clearTimeout(this.idleTimeoutId);
    var n = this.getConfig("record_idle_timeout_ms");
    this.idleTimeoutId = setTimeout(this._onIdleTimeout, n), this.idleExpires = (/* @__PURE__ */ new Date()).getTime() + n;
  }).bind(this);
  r();
  var i = this.getConfig("record_block_selector");
  (i === "" || i === null) && (i = void 0);
  try {
    this._stopRecording = this._rrwebRecord({
      emit: (function(n) {
        if (this.idleExpires && this.idleExpires < n.timestamp) {
          this._onIdleTimeout();
          return;
        }
        w_(n) && (this.batcher.stopped && (/* @__PURE__ */ new Date()).getTime() - this.replayStartTime >= this.recordMinMs && this.batcher.start(), r()), this.__enqueuePromise = this.batcher.enqueue(n), (this.lastEventTimestamp === null || n.timestamp > this.lastEventTimestamp) && (this.lastEventTimestamp = n.timestamp);
      }).bind(this),
      blockClass: this.getConfig("record_block_class"),
      blockSelector: i,
      collectFonts: this.getConfig("record_collect_fonts"),
      dataURLOptions: {
        // canvas image options (https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)
        type: "image/webp",
        quality: 0.6
      },
      maskAllInputs: !0,
      maskTextClass: this.getConfig("record_mask_text_class"),
      maskTextSelector: this.getConfig("record_mask_text_selector"),
      recordCanvas: this.getConfig("record_canvas"),
      sampling: {
        canvas: 15
      },
      plugins: this.getConfig("record_console") ? [
        Gy({
          stringifyOptions: {
            stringLengthLimit: 1e3,
            numOfKeysLimit: 50,
            depthOfLimit: 2
          }
        })
      ] : []
    });
  } catch (n) {
    this.reportError("Unexpected error when starting rrweb recording.", n);
  }
  if (typeof this._stopRecording != "function") {
    this.reportError("rrweb failed to start, skipping this recording."), this._stopRecording = null, this.stopRecording();
    return;
  }
  var t = this.maxExpires - (/* @__PURE__ */ new Date()).getTime();
  this.maxTimeoutId = setTimeout(this._onMaxLengthReached.bind(this), t);
};
st.prototype.stopRecording = function(e) {
  if (this.finalFlushUserIdInfo = this.getUserIdInfo(), !this.isRrwebStopped()) {
    try {
      this._stopRecording();
    } catch (i) {
      this.reportError("Error with rrweb stopRecording", i);
    }
    this._stopRecording = null;
  }
  var r;
  return this.batcher.stopped ? r = this.batcher.clear() : e || (r = this.batcher.flush()), this.batcher.stop(), clearTimeout(this.idleTimeoutId), clearTimeout(this.maxTimeoutId), r;
};
st.prototype.isRrwebStopped = function() {
  return this._stopRecording === null;
};
st.prototype.flushEventsWithOptOut = function(e, r, i) {
  var t = (function(n) {
    n === 0 && (this.stopRecording(), i({ error: "Tracking has been opted out, stopping recording." }));
  }).bind(this);
  this._flushEvents(e, r, i, t);
};
st.prototype.serialize = function() {
  var e;
  try {
    e = this._mixpanel.get_tab_id();
  } catch (r) {
    this.reportError("Error getting tab ID for serialization ", r), e = null;
  }
  return {
    replayId: this.replayId,
    seqNo: this.seqNo,
    replayStartTime: this.replayStartTime,
    batchStartUrl: this.batchStartUrl,
    replayStartUrl: this.replayStartUrl,
    lastEventTimestamp: this.lastEventTimestamp,
    idleExpires: this.idleExpires,
    maxExpires: this.maxExpires,
    tabId: e
  };
};
st.deserialize = function(e, r) {
  var i = new st(h.extend({}, r, {
    replayId: e.replayId,
    batchStartUrl: e.batchStartUrl,
    replayStartUrl: e.replayStartUrl,
    idleExpires: e.idleExpires,
    maxExpires: e.maxExpires,
    replayStartTime: e.replayStartTime,
    lastEventTimestamp: e.lastEventTimestamp,
    seqNo: e.seqNo,
    sharedLockStorage: r.sharedLockStorage
  }));
  return i;
};
st.prototype._sendRequest = function(e, r, i, t) {
  var n = (function(o, a) {
    o.status === 200 && this.replayId === e && (this.seqNo++, this.batchStartUrl = h.info.currentUrl()), this._onBatchSent(), t({
      status: 0,
      httpStatusCode: o.status,
      responseBody: a,
      retryAfter: o.headers.get("Retry-After")
    });
  }).bind(this), s = this._mixpanel.get_api_host && this._mixpanel.get_api_host("record") || this.getConfig("api_host");
  N.fetch(s + "/" + this.getConfig("api_routes").record + "?" + new URLSearchParams(r), {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(this.getConfig("token") + ":"),
      "Content-Type": "application/octet-stream"
    },
    body: i
  }).then(function(o) {
    o.json().then(function(a) {
      n(o, a);
    }).catch(function(a) {
      t({ error: a });
    });
  }).catch(function(o) {
    t({ error: o, httpStatusCode: 0 });
  });
};
st.prototype._flushEvents = xr(function(e, r, i) {
  var t = e.length;
  if (t > 0) {
    for (var n = this.replayId, s = 1 / 0, o = -1 / 0, a = !1, c = 0; c < t; c++)
      s = Math.min(s, e[c].timestamp), o = Math.max(o, e[c].timestamp), e[c].type === ve.FullSnapshot && (a = !0);
    if (this.seqNo === 0) {
      if (!a) {
        i({ error: "First batch does not contain a full snapshot. Aborting recording." }), this.stopRecording(!0);
        return;
      }
      this.replayStartTime = s;
    } else this.replayStartTime || (this.reportError("Replay start time not set but seqNo is not 0. Using current batch start time as a fallback."), this.replayStartTime = s);
    var l = o - this.replayStartTime, f = {
      $current_url: this.batchStartUrl,
      $lib_version: Mt.LIB_VERSION,
      batch_start_time: s / 1e3,
      mp_lib: "web",
      replay_id: n,
      replay_length_ms: l,
      replay_start_time: this.replayStartTime / 1e3,
      replay_start_url: this.replayStartUrl,
      seq: this.seqNo
    }, u = JSON.stringify(e);
    if (Object.assign(f, this.getUserIdInfo()), s_(Gt, Qt.vendor, bn)) {
      var d = new Blob([u], { type: "application/json" }).stream(), v = d.pipeThrough(new y_("gzip"));
      new Response(v).blob().then((function(p) {
        f.format = "gzip", this._sendRequest(n, f, p, i);
      }).bind(this));
    } else
      f.format = "body", this._sendRequest(n, f, u, i);
  }
});
st.prototype.reportError = function(e, r) {
  Hr.error.apply(Hr.error, arguments);
  try {
    !r && !(e instanceof Error) && (e = new Error(e)), this.getConfig("error_reporter")(e, r);
  } catch (i) {
    Hr.error(i);
  }
};
st.prototype.getDurationMs = function() {
  return this.replayStartTime === null ? 0 : this.lastEventTimestamp === null ? (/* @__PURE__ */ new Date()).getTime() - this.replayStartTime : this.lastEventTimestamp - this.replayStartTime;
};
st.prototype._getRecordMinMs = function() {
  var e = this.getConfig("record_min_ms");
  return e > Hs ? (Hr.critical("record_min_ms cannot be greater than " + Hs + "ms. Capping value."), Hs) : e;
};
var ir = function(e) {
  this.idb = new Ut(La), this.errorReporter = e.errorReporter, this.mixpanelInstance = e.mixpanelInstance, this.sharedLockStorage = e.sharedLockStorage;
};
ir.prototype.isPersistenceEnabled = function() {
  return !this.mixpanelInstance.get_config("disable_persistence");
};
ir.prototype.handleError = function(e) {
  this.errorReporter("IndexedDB error: ", e);
};
ir.prototype.setActiveRecording = function(e) {
  if (!this.isPersistenceEnabled())
    return ge.resolve();
  var r = e.tabId;
  return r ? this.idb.init().then((function() {
    return this.idb.setItem(r, e);
  }).bind(this)).catch(this.handleError.bind(this)) : (console.warn("No tab ID is set, cannot persist recording metadata."), ge.resolve());
};
ir.prototype.getActiveRecording = function() {
  return this.isPersistenceEnabled() ? this.idb.init().then((function() {
    return this.idb.getItem(this.mixpanelInstance.get_tab_id());
  }).bind(this)).then((function(e) {
    return ja(e) ? null : e;
  }).bind(this)).catch(this.handleError.bind(this)) : ge.resolve(null);
};
ir.prototype.clearActiveRecording = function() {
  return this.isPersistenceEnabled() ? this.markActiveRecordingExpired() : this.deleteActiveRecording();
};
ir.prototype.markActiveRecordingExpired = function() {
  return this.getActiveRecording().then((function(e) {
    if (e)
      return e.maxExpires = 0, this.setActiveRecording(e);
  }).bind(this)).catch(this.handleError.bind(this));
};
ir.prototype.deleteActiveRecording = function() {
  return this.idb.isInitialized() ? this.idb.removeItem(this.mixpanelInstance.get_tab_id()).catch(this.handleError.bind(this)) : ge.resolve();
};
ir.prototype.flushInactiveRecordings = function() {
  return this.isPersistenceEnabled() ? this.idb.init().then((function() {
    return this.idb.getAll();
  }).bind(this)).then((function(e) {
    var r = e.filter(function(i) {
      return ja(i);
    }).map((function(i) {
      var t = st.deserialize(i, {
        mixpanelInstance: this.mixpanelInstance,
        sharedLockStorage: this.sharedLockStorage
      });
      return t.unloadPersistedData().then((function() {
        return this.idb.removeItem(i.tabId);
      }).bind(this)).catch(this.handleError.bind(this));
    }).bind(this));
    return ge.all(r);
  }).bind(this)).catch(this.handleError.bind(this)) : ge.resolve([]);
};
var In = Pr("recorder"), sr = function(e, r, i) {
  this.mixpanelInstance = e, this.rrwebRecord = r || wr, this.sharedLockStorage = i, this.recordingRegistry = new ir({
    mixpanelInstance: this.mixpanelInstance,
    errorReporter: In.error,
    sharedLockStorage: i
  }), this._flushInactivePromise = this.recordingRegistry.flushInactiveRecordings(), this.activeRecording = null, this.stopRecordingInProgress = !1;
};
sr.prototype.startRecording = function(e) {
  if (e = e || {}, this.activeRecording && !this.activeRecording.isRrwebStopped()) {
    In.log("Recording already in progress, skipping startRecording.");
    return;
  }
  var r = (function() {
    In.log("Idle timeout reached, restarting recording."), this.resetRecording();
  }).bind(this), i = (function() {
    In.log("Max recording length reached, stopping recording."), this.resetRecording();
  }).bind(this), t = (function() {
    this.recordingRegistry.setActiveRecording(this.activeRecording.serialize()), this.__flushPromise = this.activeRecording.batcher._flushPromise;
  }).bind(this), n = {
    mixpanelInstance: this.mixpanelInstance,
    onBatchSent: t,
    onIdleTimeout: r,
    onMaxLengthReached: i,
    replayId: h.UUID(),
    rrwebRecord: this.rrwebRecord,
    sharedLockStorage: this.sharedLockStorage
  };
  return e.activeSerializedRecording ? this.activeRecording = st.deserialize(e.activeSerializedRecording, n) : this.activeRecording = new st(n), this.activeRecording.startRecording(e.shouldStopBatcher), this.recordingRegistry.setActiveRecording(this.activeRecording.serialize());
};
sr.prototype.stopRecording = function() {
  return this.stopRecordingInProgress = !0, this._stopCurrentRecording(!1, !0).then((function() {
    return this.recordingRegistry.clearActiveRecording();
  }).bind(this)).then((function() {
    this.stopRecordingInProgress = !1;
  }).bind(this));
};
sr.prototype.pauseRecording = function() {
  return this._stopCurrentRecording(!1);
};
sr.prototype._stopCurrentRecording = function(e, r) {
  if (this.activeRecording) {
    var i = this.activeRecording.stopRecording(e);
    return r && (this.activeRecording = null), i;
  }
  return ge.resolve();
};
sr.prototype.resumeRecording = function(e) {
  return this.activeRecording && this.activeRecording.isRrwebStopped() ? (this.activeRecording.startRecording(!1), ge.resolve(null)) : this.recordingRegistry.getActiveRecording().then((function(r) {
    return r && !this.stopRecordingInProgress ? this.startRecording({ activeSerializedRecording: r }) : e ? this.startRecording({ shouldStopBatcher: !1 }) : (In.log("No resumable recording found."), null);
  }).bind(this));
};
sr.prototype.resetRecording = function() {
  this.stopRecording(), this.startRecording({ shouldStopBatcher: !0 });
};
sr.prototype.getActiveReplayId = function() {
  return this.activeRecording && !this.activeRecording.isRrwebStopped() ? this.activeRecording.replayId : null;
};
Object.defineProperty(sr.prototype, "replayId", {
  get: function() {
    return this.getActiveReplayId();
  }
});
N.__mp_recorder = sr;
var qn = "change", nr = "click", Zo = "hashchange", S_ = "input", Cl = "load", ur = "mp_locationchange", kl = "popstate", xs = "scrollend", Ua = "scroll", x_ = "select", es = "submit", C_ = "toggle", El = "visibilitychange", k_ = [
  "clientX",
  "clientY",
  "offsetX",
  "offsetY",
  "pageX",
  "pageY",
  "screenX",
  "screenY",
  "x",
  "y"
], Il = ["mp-include"], Qo = ["mp-no-track"], Ol = Qo.concat(["mp-sensitive"]), E_ = [
  "aria-label",
  "aria-labelledby",
  "aria-describedby",
  "href",
  "name",
  "role",
  "title",
  "type"
], I_ = {
  button: !0,
  checkbox: !0,
  combobox: !0,
  grid: !0,
  link: !0,
  listbox: !0,
  menu: !0,
  menubar: !0,
  menuitem: !0,
  menuitemcheckbox: !0,
  menuitemradio: !0,
  navigation: !0,
  option: !0,
  radio: !0,
  radiogroup: !0,
  searchbox: !0,
  slider: !0,
  spinbutton: !0,
  switch: !0,
  tab: !0,
  tablist: !0,
  textbox: !0,
  tree: !0,
  treegrid: !0,
  treeitem: !0
}, O_ = {
  // Document metadata
  base: !0,
  head: !0,
  html: !0,
  link: !0,
  meta: !0,
  script: !0,
  style: !0,
  title: !0,
  // Text formatting
  br: !0,
  hr: !0,
  wbr: !0,
  // Other
  noscript: !0,
  picture: !0,
  source: !0,
  template: !0,
  track: !0
}, A_ = {
  article: !0,
  div: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  p: !0,
  section: !0,
  span: !0
}, Al = [
  "onclick",
  "onmousedown",
  "onmouseup",
  "onpointerdown",
  "onpointerup",
  "ontouchend",
  "ontouchstart"
], R_ = 5, Ne = Pr("autocapture");
function ea(e) {
  for (var r = {}, i = qf(e).split(" "), t = 0; t < i.length; t++) {
    var n = i[t];
    n && (r[n] = !0);
  }
  return r;
}
function qf(e) {
  switch (typeof e.className) {
    case "string":
      return e.className;
    case "object":
      return e.className.baseVal || e.getAttribute("class") || "";
    default:
      return "";
  }
}
function T_(e) {
  if (e.previousElementSibling)
    return e.previousElementSibling;
  do
    e = e.previousSibling;
  while (e && !Hf(e));
  return e;
}
function Rl(e, r, i, t, n, s) {
  var o = {
    $classes: qf(e).split(" "),
    $tag_name: e.tagName.toLowerCase()
  }, a = e.id;
  a && (o.$id = a), Ba(e, r, n, s) && h.each(E_.concat(t), function(u) {
    if (e.hasAttribute(u) && !i[u]) {
      var d = e.getAttribute(u);
      ts(d) && (o["$attr-" + u] = d);
    }
  });
  for (var c = 1, l = 1, f = e; f = T_(f); )
    c++, f.tagName === e.tagName && l++;
  return o.$nth_child = c, o.$nth_of_type = l, o;
}
function N_(e, r) {
  var i = r.allowElementCallback, t = r.allowSelectors || [], n = r.blockAttrs || [], s = r.blockElementCallback, o = r.blockSelectors || [], a = r.captureTextContent || !1, c = r.captureExtraAttrs || [], l = r.capturedForHeatMap || !1, f = {};
  h.each(n, function(C) {
    f[C] = !0;
  });
  var u = null, d = typeof e.target > "u" ? e.srcElement : e.target;
  if (Yf(d) && (d = d.parentNode), $_(d, e) && ta(d, e, i, t) && !Zs(d, e, s, o)) {
    for (var v = [d], p = d; p.parentNode && !Vt(p, "body"); )
      v.push(p.parentNode), p = p.parentNode;
    var _ = [], m, y = !1;
    if (h.each(v, function(C) {
      var A = Ba(C, e, i, t);
      !f.href && C.tagName.toLowerCase() === "a" && (m = C.getAttribute("href"), m = A && ts(m) && m), Zs(C, e, s, o) && (y = !0), _.push(Rl(C, e, f, c, i, t));
    }, this), !y) {
      var b = ie.documentElement;
      if (u = {
        $event_type: e.type,
        $host: N.location.host,
        $pathname: N.location.pathname,
        $elements: _,
        $el_attr__href: m,
        $viewportHeight: Math.max(b.clientHeight, N.innerHeight || 0),
        $viewportWidth: Math.max(b.clientWidth, N.innerWidth || 0),
        $pageHeight: ie.body.offsetHeight || 0,
        $pageWidth: ie.body.offsetWidth || 0
      }, h.each(c, function(C) {
        if (!f[C] && d.hasAttribute(C)) {
          var A = d.getAttribute(C);
          ts(A) && (u["$el_attr__" + C] = A);
        }
      }), a && (S = Tl(d, e, i, t), S && S.length && (u.$el_text = S)), e.type === nr && (h.each(k_, function(C) {
        C in e && (u["$" + C] = e[C]);
      }), l && (u.$captured_for_heatmap = !0), d = M_(e)), a) {
        var S = Tl(d, e, i, t);
        S && S.length && (u.$el_text = S);
      }
      if (d) {
        if (!ta(d, e, i, t) || Zs(d, e, s, o))
          return null;
        var E = Rl(d, e, f, c, i, t);
        u.$target = E, u.$el_classes = E.$classes, h.extend(u, h.strip_empty_properties({
          $el_id: E.$id,
          $el_tag_name: E.$tag_name
        }));
      }
    }
  }
  return u;
}
function Tl(e, r, i, t) {
  var n = "";
  return Ba(e, r, i, t) && e.childNodes && e.childNodes.length && h.each(e.childNodes, function(s) {
    Yf(s) && s.textContent && (n += h.trim(s.textContent).split(/(\s+)/).filter(ts).join("").replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255));
  }), h.trim(n);
}
function M_(e) {
  for (var r = e.target, i = e.composedPath(), t = 0; t < i.length; t++) {
    var n = i[t];
    if (Vt(n, "a") || Vt(n, "button") || Vt(n, "input") || Vt(n, "select") || n.getAttribute && n.getAttribute("role") === "button") {
      r = n;
      break;
    }
    if (n === r)
      break;
  }
  return r;
}
function ta(e, r, i, t) {
  if (i)
    try {
      if (!i(e, r))
        return !1;
    } catch (o) {
      return Ne.critical("Error while checking element in allowElementCallback", o), !1;
    }
  if (!t.length)
    return !0;
  for (var n = 0; n < t.length; n++) {
    var s = t[n];
    try {
      if (e.matches(s))
        return !0;
    } catch (o) {
      Ne.critical("Error while checking selector: " + s, o);
    }
  }
  return !1;
}
function Zs(e, r, i, t) {
  var n;
  if (i)
    try {
      if (i(e, r))
        return !0;
    } catch (a) {
      return Ne.critical("Error while checking element in blockElementCallback", a), !0;
    }
  if (t && t.length)
    for (n = 0; n < t.length; n++) {
      var s = t[n];
      try {
        if (e.matches(s))
          return !0;
      } catch (a) {
        Ne.critical("Error while checking selector: " + s, a);
      }
    }
  var o = ea(e);
  for (n = 0; n < Qo.length; n++)
    if (o[Qo[n]])
      return !0;
  return !1;
}
function Hf(e) {
  return e && e.nodeType === 1;
}
function Vt(e, r) {
  return e && e.tagName && e.tagName.toLowerCase() === r.toLowerCase();
}
function Yf(e) {
  return e && e.nodeType === 3;
}
function P_() {
  try {
    var e = ie.createElement("div");
    return !!e.matches;
  } catch {
    return !1;
  }
}
function L_() {
  return typeof WeakSet < "u";
}
function $_(e, r) {
  if (!e || Vt(e, "html") || !Hf(e))
    return !1;
  var i = e.tagName.toLowerCase();
  switch (i) {
    case "form":
      return r.type === es;
    case "input":
      return ["button", "submit"].indexOf(e.getAttribute("type")) === -1 ? r.type === qn : r.type === nr;
    case "select":
    case "textarea":
      return r.type === qn;
    default:
      return r.type === nr;
  }
}
function Ba(e, r, i, t) {
  var n;
  if (!ta(e, r, i, t))
    return !1;
  for (var s = e; s.parentNode && !Vt(s, "body"); s = s.parentNode) {
    var o = ea(s);
    for (n = 0; n < Ol.length; n++)
      if (o[Ol[n]])
        return !1;
  }
  var a = ea(e);
  for (n = 0; n < Il.length; n++)
    if (a[Il[n]])
      return !0;
  if (Vt(e, "input") || Vt(e, "select") || Vt(e, "textarea") || e.getAttribute("contenteditable") === "true")
    return !1;
  var c = e.type || "";
  if (typeof c == "string")
    switch (c.toLowerCase()) {
      case "hidden":
        return !1;
      case "password":
        return !1;
    }
  var l = e.name || e.id || "";
  if (typeof l == "string") {
    var f = /^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i;
    if (f.test(l.replace(/[^a-zA-Z0-9]/g, "")))
      return !1;
  }
  return !0;
}
function ts(e) {
  if (e === null || h.isUndefined(e))
    return !1;
  if (typeof e == "string") {
    e = h.trim(e);
    var r = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
    if (r.test((e || "").replace(/[- ]/g, "")))
      return !1;
    var i = /(^\d{3}-?\d{2}-?\d{4}$)/;
    if (i.test(e))
      return !1;
  }
  return !0;
}
function Kf(e) {
  var r = "onscrollend" in N, i = Gn(e), t = xs;
  if (!r) {
    var n = null, s = 100;
    i = Gn(function() {
      clearTimeout(n), n = setTimeout(e, s);
    }), t = Ua;
  }
  return {
    listener: i,
    eventType: t
  };
}
function D_(e) {
  for (var r = 0; r < Al.length; r++)
    if (e.hasAttribute(Al[r]))
      return !0;
  return !1;
}
function F_(e) {
  var r = e.getAttribute("role");
  if (!r) return !1;
  var i = r.trim().split(/\s+/)[0].toLowerCase();
  return I_[i];
}
function Qs(e) {
  var r = e.tagName.toLowerCase();
  return !!(r === "button" || r === "input" || r === "select" || r === "textarea" || r === "details" || r === "dialog" || e.isContentEditable || e.onclick || e.onmousedown || e.onmouseup || e.ontouchstart || e.ontouchend || D_(e) || F_(e) || r === "a" && e.hasAttribute("href") || e.hasAttribute("tabindex"));
}
function Jf(e) {
  if (!e || !e.tagName)
    return !0;
  var r = e.tagName.toLowerCase();
  if (O_[r])
    return !0;
  if (Qs(e))
    return !1;
  for (var i = e.parentElement, t = 0; i && t < R_; ) {
    if (Qs(i))
      return !1;
    if (i.getRootNode && i.getRootNode() !== ie) {
      var n = i.getRootNode();
      if (n.host && Qs(n.host))
        return !1;
    }
    i = i.parentElement, t++;
  }
  return !!A_[r];
}
function Xf(e) {
  return "composedPath" in e ? e.composedPath() : [];
}
function Zf(e) {
  var r = Xf(e);
  return r && r.length > 0 ? r[0] : e.target || e.srcElement;
}
var j_ = 30, U_ = 1e3, B_ = 4, W_ = !1;
function Qf() {
  this.clicks = [];
}
Qf.prototype.isRageClick = function(e, r) {
  r = r || {};
  var i = r.threshold_px || j_, t = r.timeout_ms || U_, n = r.click_count || B_, s = r.interactive_elements_only || W_;
  if (s) {
    var o = Zf(e);
    if (!o || Jf(o))
      return !1;
  }
  var a = Date.now(), c = e.pageX, l = e.pageY, f = this.clicks[this.clicks.length - 1];
  if (f && a - f.timestamp < t && Math.sqrt(Math.pow(c - f.x, 2) + Math.pow(l - f.y, 2)) < i) {
    if (this.clicks.push({ x: c, y: l, timestamp: a }), this.clicks.length >= n)
      return this.clicks = [], !0;
  } else
    this.clicks = [{ x: c, y: l, timestamp: a }];
  return !1;
};
function un(e, r) {
  this.changeCallback = e || function() {
  }, this.observerConfig = r, this.observedShadowRoots = null, this.shadowObservers = [];
}
un.prototype.getEventTarget = function(e) {
  if (this.observedShadowRoots)
    return Zf(e);
};
un.prototype.observeFromEvent = function(e) {
  if (this.observedShadowRoots)
    for (var r = Xf(e), i = 0; i < r.length; i++) {
      var t = r[i];
      t && t.shadowRoot && this.observeShadowRoot(t.shadowRoot);
    }
};
un.prototype.observeShadowRoot = function(e) {
  if (!(!this.observedShadowRoots || this.observedShadowRoots.has(e))) {
    var r = this;
    try {
      this.observedShadowRoots.add(e);
      var i = new window.MutationObserver(function() {
        r.changeCallback();
      });
      i.observe(e, this.observerConfig), this.shadowObservers.push(i);
    } catch (t) {
      Ne.critical("Error while observing shadow root", t);
    }
  }
};
un.prototype.start = function() {
  if (!this.observedShadowRoots) {
    if (!L_()) {
      Ne.critical("Shadow DOM observation unavailable: WeakSet not supported");
      return;
    }
    this.observedShadowRoots = /* @__PURE__ */ new WeakSet();
  }
};
un.prototype.stop = function() {
  if (this.observedShadowRoots) {
    for (var e = 0; e < this.shadowObservers.length; e++)
      try {
        this.shadowObservers[e].disconnect();
      } catch (r) {
        Ne.critical("Error while disconnecting shadow DOM observer", r);
      }
    this.shadowObservers = [], this.observedShadowRoots = null;
  }
};
var z_ = 500, G_ = [qn, S_, es, x_, C_], V_ = [xs], q_ = [Zo], Nl = {
  characterData: !0,
  childList: !0,
  subtree: !0,
  attributes: !0,
  attributeFilter: ["style", "class", "hidden", "checked", "selected", "value", "display", "visibility"]
};
function Yt(e) {
  this.eventListeners = [], this.mutationObserver = null, this.shadowDOMObserver = null, this.isTracking = !1, this.lastChangeEventTimestamp = 0, this.pendingClicks = [], this.onDeadClickCallback = e, this.processingActive = !1, this.processingTimeout = null;
}
Yt.prototype.addClick = function(e) {
  var r = this.shadowDOMObserver && this.shadowDOMObserver.getEventTarget(e);
  return r || (r = e.target || e.srcElement), !r || Jf(r) ? !1 : (this.shadowDOMObserver && this.shadowDOMObserver.observeFromEvent(e), this.pendingClicks.push({
    element: r,
    event: e,
    timestamp: Date.now()
  }), !0);
};
Yt.prototype.trackClick = function(e, r) {
  if (!this.isTracking)
    return !1;
  var i = this.addClick(e);
  return i && this.triggerProcessing(r), i;
};
Yt.prototype.getDeadClicks = function(e) {
  if (this.pendingClicks.length === 0)
    return [];
  var r = e.timeout_ms, i = Date.now(), t = this.pendingClicks.slice();
  this.pendingClicks = [];
  for (var n = [], s = 0; s < t.length; s++) {
    var o = t[s];
    i - o.timestamp >= r ? this.hasChangesAfter(o.timestamp) || n.push(o) : this.pendingClicks.push(o);
  }
  return n;
};
Yt.prototype.hasChangesAfter = function(e) {
  return this.lastChangeEventTimestamp >= e - 100;
};
Yt.prototype.recordChangeEvent = function() {
  this.lastChangeEventTimestamp = Date.now();
};
Yt.prototype.triggerProcessing = function(e) {
  this.processingActive || (this.processingActive = !0, this.processRecursively(e));
};
Yt.prototype.processRecursively = function(e) {
  if (!this.isTracking || !this.onDeadClickCallback) {
    this.processingActive = !1;
    return;
  }
  var r = e.timeout_ms, i = this;
  this.processingTimeout = setTimeout(function() {
    if (i.processingActive) {
      for (var t = i.getDeadClicks(e), n = 0; n < t.length; n++)
        i.onDeadClickCallback(t[n].event);
      i.pendingClicks.length > 0 ? i.processRecursively(e) : i.processingActive = !1;
    }
  }, r);
};
Yt.prototype.startTracking = function() {
  if (!this.isTracking) {
    this.isTracking = !0;
    var e = this;
    G_.forEach(function(i) {
      var t = function() {
        e.recordChangeEvent();
      };
      document.addEventListener(i, t, { capture: !0, passive: !0 }), e.eventListeners.push({ target: document, event: i, handler: t, options: { capture: !0, passive: !0 } });
    }), q_.forEach(function(i) {
      var t = function() {
        e.recordChangeEvent();
      };
      window.addEventListener(i, t), e.eventListeners.push({ target: window, event: i, handler: t });
    }), V_.forEach(function(i) {
      var t = function() {
        e.recordChangeEvent();
      };
      window.addEventListener(i, t, { passive: !0 }), e.eventListeners.push({ target: window, event: i, handler: t, options: { passive: !0 } });
    });
    var r = function() {
      e.recordChangeEvent();
    };
    if (document.addEventListener("selectionchange", r), e.eventListeners.push({ target: document, event: "selectionchange", handler: r }), window.MutationObserver)
      try {
        this.mutationObserver = new window.MutationObserver(function() {
          e.recordChangeEvent();
        }), this.mutationObserver.observe(document.body || document.documentElement, Nl);
      } catch (i) {
        Ne.critical("Error while setting up mutation observer", i);
      }
    if (window.customElements)
      try {
        this.shadowDOMObserver = new un(
          function() {
            e.recordChangeEvent();
          },
          Nl
        ), this.shadowDOMObserver.start();
      } catch (i) {
        Ne.critical("Error while setting up shadow DOM observer", i), this.shadowDOMObserver = null;
      }
  }
};
Yt.prototype.stopTracking = function() {
  if (this.isTracking) {
    this.isTracking = !1, this.pendingClicks = [], this.lastChangeEventTimestamp = 0, this.processingActive = !1, this.processingTimeout && (clearTimeout(this.processingTimeout), this.processingTimeout = null);
    for (var e = 0; e < this.eventListeners.length; e++) {
      var r = this.eventListeners[e];
      try {
        r.target.removeEventListener(r.event, r.handler, r.options);
      } catch (i) {
        Ne.critical("Error while removing event listener", i);
      }
    }
    if (this.eventListeners = [], this.mutationObserver) {
      try {
        this.mutationObserver.disconnect();
      } catch (i) {
        Ne.critical("Error while disconnecting mutation observer", i);
      }
      this.mutationObserver = null;
    }
    if (this.shadowDOMObserver) {
      try {
        this.shadowDOMObserver.stop();
      } catch (i) {
        Ne.critical("Error while stopping shadow DOM observer", i);
      }
      this.shadowDOMObserver = null;
    }
  }
};
var ed = "autocapture", H_ = "track_pageview", td = "full-url", Y_ = "url-with-path-and-query-string", K_ = "url-with-path", J_ = "allow_element_callback", rd = "allow_selectors", nd = "allow_url_regexes", id = "block_attrs", sd = "block_element_callback", od = "block_selectors", ad = "block_url_regexes", cd = "capture_extra_attrs", ld = "capture_text_content", ud = "scroll_capture_all", fd = "scroll_depth_percent_checkpoints", rs = "click", ns = "dead_click", ra = "input", dd = "pageview", is = "rage_click", na = "scroll", Cs = "page_leave", ia = "submit", rt = {};
rt[rd] = [];
rt[nd] = [];
rt[id] = [];
rt[sd] = null;
rt[od] = [];
rt[ad] = [];
rt[cd] = [];
rt[ld] = !1;
rt[ud] = !1;
rt[fd] = [25, 50, 75, 100];
rt[rs] = !0;
rt[ns] = !0;
rt[ra] = !0;
rt[dd] = td;
rt[is] = !0;
rt[na] = !0;
rt[Cs] = !1;
rt[ia] = !0;
var Hn = {
  $mp_autocapture: !0
}, hd = "$mp_click", pd = "$mp_dead_click", X_ = "$mp_input_change", vd = "$mp_rage_click", Z_ = "$mp_scroll", Q_ = "$mp_submit", eb = "$mp_page_leave", Qe = function(e) {
  this.mp = e, this.maxScrollViewDepth = 0, this.hasTrackedScrollSession = !1, this.previousScrollHeight = 0;
};
Qe.prototype.init = function() {
  if (!P_()) {
    Ne.critical("Autocapture unavailable: missing required DOM APIs");
    return;
  }
  this.initPageListeners(), this.initPageviewTracking(), this.initClickTracking(), this.initDeadClickTracking(), this.initInputTracking(), this.initScrollTracking(), this.initSubmitTracking(), this.initRageClickTracking(), this.initPageLeaveTracking();
};
Qe.prototype.getFullConfig = function() {
  var e = this.mp.get_config(ed);
  return e ? h.isObject(e) ? h.extend({}, rt, e) : rt : {};
};
Qe.prototype.getConfig = function(e) {
  return this.getFullConfig()[e];
};
Qe.prototype.currentUrlBlocked = function() {
  var e, r = h.info.currentUrl(), i = this.getConfig(nd) || [];
  if (i.length) {
    var t = !1;
    for (e = 0; e < i.length; e++) {
      var n = i[e];
      try {
        if (r.match(n)) {
          t = !0;
          break;
        }
      } catch (o) {
        return Ne.critical("Error while checking block URL regex: " + n, o), !0;
      }
    }
    if (!t)
      return !0;
  }
  var s = this.getConfig(ad) || [];
  if (!s || !s.length)
    return !1;
  for (e = 0; e < s.length; e++)
    try {
      if (r.match(s[e]))
        return !0;
    } catch (o) {
      return Ne.critical("Error while checking block URL regex: " + s[e], o), !0;
    }
  return !1;
};
Qe.prototype.pageviewTrackingConfig = function() {
  return this.mp.get_config(ed) ? this.getConfig(dd) : this.mp.get_config(H_);
};
Qe.prototype.trackDomEvent = function(e, r) {
  if (!this.currentUrlBlocked()) {
    var i = this.mp.is_recording_heatmap_data() && (r === hd && !this.getConfig(rs) || r === vd && !this._getClickTrackingConfig(is) || r === pd && !this._getClickTrackingConfig(ns)), t = N_(e, {
      allowElementCallback: this.getConfig(J_),
      allowSelectors: this.getConfig(rd),
      blockAttrs: this.getConfig(id),
      blockElementCallback: this.getConfig(sd),
      blockSelectors: this.getConfig(od),
      captureExtraAttrs: this.getConfig(cd),
      captureTextContent: this.getConfig(ld),
      capturedForHeatMap: i
    });
    t && (h.extend(t, Hn), this.mp.track(r, t));
  }
};
Qe.prototype.initPageListeners = function() {
  if (N.removeEventListener(kl, this.listenerPopstate), N.removeEventListener(Zo, this.listenerHashchange), !(!this.pageviewTrackingConfig() && !this.getConfig(Cs) && !this.mp.get_config("record_heatmap_data"))) {
    this.listenerPopstate = function() {
      N.dispatchEvent(new Event(ur));
    }, this.listenerHashchange = function() {
      N.dispatchEvent(new Event(ur));
    }, N.addEventListener(kl, this.listenerPopstate), N.addEventListener(Zo, this.listenerHashchange);
    var e = N.history.pushState;
    typeof e == "function" && (N.history.pushState = function(i, t, n) {
      e.call(N.history, i, t, n), N.dispatchEvent(new Event(ur));
    });
    var r = N.history.replaceState;
    typeof r == "function" && (N.history.replaceState = function(i, t, n) {
      r.call(N.history, i, t, n), N.dispatchEvent(new Event(ur));
    });
  }
};
Qe.prototype._getClickTrackingConfig = function(e) {
  var r = this.getConfig(e);
  return r ? r === !0 ? {} : typeof r == "object" ? r : {} : null;
};
Qe.prototype._trackPageLeave = function(e, r, i) {
  if (!this.hasTrackedScrollSession && !(!this.getConfig(Cs) && !this.mp.is_recording_heatmap_data())) {
    this.hasTrackedScrollSession = !0;
    var t = Math.max(ie.documentElement.clientHeight, N.innerHeight || 0), n = Math.round(Math.max(this.maxScrollViewDepth - t, 0) / (i - t) * 100), s = Math.round(t / i * 100);
    i <= t && (n = 100, s = 100);
    var o = h.extend({
      $max_scroll_view_depth: this.maxScrollViewDepth,
      $max_scroll_percentage: n,
      $fold_line_percentage: s,
      $scroll_height: i,
      $event_type: e.type,
      $current_url: r || h.info.currentUrl(),
      $viewportHeight: t,
      // This is the fold line
      $viewportWidth: Math.max(ie.documentElement.clientWidth, N.innerWidth || 0),
      $captured_for_heatmap: this.mp.is_recording_heatmap_data()
    }, Hn);
    this.mp.track(eb, o, { transport: "sendBeacon" });
  }
};
Qe.prototype._initScrollDepthTracking = function() {
  if (N.removeEventListener(Ua, this.listenerScrollDepth), N.removeEventListener(xs, this.listenerScrollDepth), !!this.mp.get_config("record_heatmap_data")) {
    Ne.log("Initializing scroll depth tracking"), this.maxScrollViewDepth = Math.max(ie.documentElement.clientHeight, N.innerHeight || 0);
    var e = (function() {
      if (!this.currentUrlBlocked()) {
        var i = Math.max(ie.documentElement.clientHeight, N.innerHeight || 0) + N.scrollY;
        i > this.maxScrollViewDepth && (this.maxScrollViewDepth = i), this.previousScrollHeight = ie.body.scrollHeight;
      }
    }).bind(this), r = Kf(e);
    this.listenerScrollDepth = r.listener, N.addEventListener(r.eventType, this.listenerScrollDepth);
  }
};
Qe.prototype.initClickTracking = function() {
  N.removeEventListener(nr, this.listenerClick), !(!this.getConfig(rs) && !this.mp.get_config("record_heatmap_data")) && (Ne.log("Initializing click tracking"), this.listenerClick = (function(e) {
    !this.getConfig(rs) && !this.mp.is_recording_heatmap_data() || this.trackDomEvent(e, hd);
  }).bind(this), N.addEventListener(nr, this.listenerClick));
};
Qe.prototype.initDeadClickTracking = function() {
  var e = this._getClickTrackingConfig(ns);
  if (!e && !this.mp.get_config("record_heatmap_data")) {
    this.stopDeadClickTracking();
    return;
  }
  Ne.log("Initializing dead click tracking"), this._deadClickTracker || (this._deadClickTracker = new Yt((function(r) {
    this.trackDomEvent(r, pd);
  }).bind(this)), this._deadClickTracker.startTracking()), this.listenerDeadClick || (this.listenerDeadClick = (function(r) {
    var i = this._getClickTrackingConfig(ns);
    if (!(!i && !this.mp.is_recording_heatmap_data()) && !this.currentUrlBlocked()) {
      var t = i || {};
      t.timeout_ms || (t.timeout_ms = z_), this._deadClickTracker.trackClick(r, t);
    }
  }).bind(this), N.addEventListener(nr, this.listenerDeadClick));
};
Qe.prototype.initInputTracking = function() {
  N.removeEventListener(qn, this.listenerChange), this.getConfig(ra) && (Ne.log("Initializing input tracking"), this.listenerChange = (function(e) {
    this.getConfig(ra) && this.trackDomEvent(e, X_);
  }).bind(this), N.addEventListener(qn, this.listenerChange));
};
Qe.prototype.initPageviewTracking = function() {
  if (N.removeEventListener(ur, this.listenerLocationchange), !!this.pageviewTrackingConfig()) {
    Ne.log("Initializing pageview tracking");
    var e = "", r = !1;
    this.currentUrlBlocked() || (r = this.mp.track_pageview(Hn)), r && (e = h.info.currentUrl()), this.listenerLocationchange = Gn((function() {
      if (!this.currentUrlBlocked()) {
        var i = h.info.currentUrl(), t = !1, n = i.split("#")[0].split("?")[0] !== e.split("#")[0].split("?")[0], s = this.pageviewTrackingConfig();
        if (s === td ? t = i !== e : s === Y_ ? t = i.split("#")[0] !== e.split("#")[0] : s === K_ && (t = n), t) {
          var o = this.mp.track_pageview(Hn);
          o && (e = i), n && (this.lastScrollCheckpoint = 0, Ne.log("Path change: re-initializing scroll depth checkpoints"));
        }
      }
    }).bind(this)), N.addEventListener(ur, this.listenerLocationchange);
  }
};
Qe.prototype.initRageClickTracking = function() {
  N.removeEventListener(nr, this.listenerRageClick);
  var e = this._getClickTrackingConfig(is);
  !e && !this.mp.get_config("record_heatmap_data") || (Ne.log("Initializing rage click tracking"), this._rageClickTracker || (this._rageClickTracker = new Qf()), this.listenerRageClick = (function(r) {
    var i = this._getClickTrackingConfig(is);
    !i && !this.mp.is_recording_heatmap_data() || this.currentUrlBlocked() || this._rageClickTracker.isRageClick(r, i) && this.trackDomEvent(r, vd);
  }).bind(this), N.addEventListener(nr, this.listenerRageClick));
};
Qe.prototype.initScrollTracking = function() {
  if (N.removeEventListener(xs, this.listenerScroll), N.removeEventListener(Ua, this.listenerScroll), !!this.getConfig(na)) {
    Ne.log("Initializing scroll tracking"), this.lastScrollCheckpoint = 0;
    var e = (function() {
      if (this.getConfig(na) && !this.currentUrlBlocked()) {
        var i = this.getConfig(ud), t = (this.getConfig(fd) || []).slice().sort(function(f, u) {
          return f - u;
        }), n = N.scrollY, s = h.extend({ $scroll_top: n }, Hn);
        try {
          var o = ie.body.scrollHeight, a = Math.round(n / (o - N.innerHeight) * 100);
          if (s.$scroll_height = o, s.$scroll_percentage = a, a > this.lastScrollCheckpoint)
            for (var c = 0; c < t.length; c++) {
              var l = t[c];
              a >= l && this.lastScrollCheckpoint < l && (s.$scroll_checkpoint = l, this.lastScrollCheckpoint = l, i = !0);
            }
        } catch (f) {
          Ne.critical("Error while calculating scroll percentage", f);
        }
        i && this.mp.track(Z_, s);
      }
    }).bind(this), r = Kf(e);
    this.listenerScroll = r.listener, N.addEventListener(r.eventType, this.listenerScroll);
  }
};
Qe.prototype.initSubmitTracking = function() {
  N.removeEventListener(es, this.listenerSubmit), this.getConfig(ia) && (Ne.log("Initializing submit tracking"), this.listenerSubmit = (function(e) {
    this.getConfig(ia) && this.trackDomEvent(e, Q_);
  }).bind(this), N.addEventListener(es, this.listenerSubmit));
};
Qe.prototype.initPageLeaveTracking = function() {
  if (ie.removeEventListener(El, this.listenerPageLeaveVisibilitychange), N.removeEventListener(ur, this.listenerPageLeaveLocationchange), N.removeEventListener(Cl, this.listenerPageLoad), !(!this.getConfig(Cs) && !this.mp.get_config("record_heatmap_data"))) {
    Ne.log("Initializing page visibility tracking."), this._initScrollDepthTracking();
    var e = h.info.currentUrl();
    this.listenerPageLoad = (function() {
      this.previousScrollHeight = ie.body.scrollHeight;
    }).bind(this), N.addEventListener(Cl, this.listenerPageLoad), this.listenerPageLeaveLocationchange = Gn((function(r) {
      if (!this.currentUrlBlocked()) {
        var i = h.info.currentUrl(), t = i !== e;
        t && (this._trackPageLeave(r, e, this.previousScrollHeight), e = i, this.maxScrollViewDepth = Math.max(ie.documentElement.clientHeight, N.innerHeight || 0), this.previousScrollHeight = ie.body.scrollHeight, this.hasTrackedScrollSession = !1);
      }
    }).bind(this)), N.addEventListener(ur, this.listenerPageLeaveLocationchange), this.listenerPageLeaveVisibilitychange = (function(r) {
      ie.hidden && this._trackPageLeave(r, e, this.previousScrollHeight);
    }).bind(this), ie.addEventListener(El, this.listenerPageLeaveVisibilitychange);
  }
};
Qe.prototype.stopDeadClickTracking = function() {
  this.listenerDeadClick && (N.removeEventListener(nr, this.listenerDeadClick), this.listenerDeadClick = null), this._deadClickTracker && (this._deadClickTracker.stopTracking(), this._deadClickTracker = null);
};
Ff(Qe);
var St = Pr("flags"), ss = "flags", os = "context", sa = {};
sa[os] = {};
var fe = function(e) {
  this.fetch = N.fetch, this.getFullApiRoute = e.getFullApiRoute, this.getMpConfig = e.getConfigFunc, this.setMpConfig = e.setConfigFunc, this.getMpProperty = e.getPropertyFunc, this.track = e.trackingFunc;
};
fe.prototype.init = function() {
  if (!this.minApisSupported()) {
    St.critical("Feature Flags unavailable: missing minimum required APIs");
    return;
  }
  this.flags = null, this.fetchFlags(), this.trackedFeatures = /* @__PURE__ */ new Set();
};
fe.prototype.getFullConfig = function() {
  var e = this.getMpConfig(ss);
  return e ? h.isObject(e) ? h.extend({}, sa, e) : sa : {};
};
fe.prototype.getConfig = function(e) {
  return this.getFullConfig()[e];
};
fe.prototype.isSystemEnabled = function() {
  return !!this.getMpConfig(ss);
};
fe.prototype.updateContext = function(e, r) {
  if (!this.isSystemEnabled())
    return St.critical("Feature Flags not enabled, cannot update context"), Promise.resolve();
  var i = this.getMpConfig(ss);
  h.isObject(i) || (i = {});
  var t = r && r.replace ? {} : this.getConfig(os);
  return i[os] = h.extend({}, t, e), this.setMpConfig(ss, i), this.fetchFlags();
};
fe.prototype.areFlagsReady = function() {
  return this.isSystemEnabled() || St.error("Feature Flags not enabled"), !!this.flags;
};
fe.prototype.fetchFlags = function() {
  if (!this.isSystemEnabled())
    return Promise.resolve();
  var e = this.getMpProperty("distinct_id"), r = this.getMpProperty("$device_id"), i = t_();
  St.log("Fetching flags for distinct ID: " + e);
  var t = h.extend({ distinct_id: e, device_id: r }, this.getConfig(os)), n = new URLSearchParams();
  n.set("context", JSON.stringify(t)), n.set("token", this.getMpConfig("token")), n.set("mp_lib", "web"), n.set("$lib_version", Mt.LIB_VERSION);
  var s = this.getFullApiRoute() + "?" + n.toString();
  return this._fetchInProgressStartTime = Date.now(), this.fetchPromise = this.fetch.call(N, s, {
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa(this.getMpConfig("token") + ":"),
      traceparent: i
    }
  }).then((function(o) {
    return this.markFetchComplete(), o.json().then((function(a) {
      var c = a.flags;
      if (!c)
        throw new Error("No flags in API response");
      var l = /* @__PURE__ */ new Map();
      h.each(c, function(f, u) {
        l.set(u, {
          key: f.variant_key,
          value: f.variant_value,
          experiment_id: f.experiment_id,
          is_experiment_active: f.is_experiment_active,
          is_qa_tester: f.is_qa_tester
        });
      }), this.flags = l, this._traceparent = i;
    }).bind(this)).catch((function(a) {
      this.markFetchComplete(), St.error(a);
    }).bind(this));
  }).bind(this)).catch((function(o) {
    this.markFetchComplete(), St.error(o);
  }).bind(this)), this.fetchPromise;
};
fe.prototype.markFetchComplete = function() {
  if (!this._fetchInProgressStartTime) {
    St.error("Fetch in progress started time not set, cannot mark fetch complete");
    return;
  }
  this._fetchStartTime = this._fetchInProgressStartTime, this._fetchCompleteTime = Date.now(), this._fetchLatency = this._fetchCompleteTime - this._fetchStartTime, this._fetchInProgressStartTime = null;
};
fe.prototype.getVariant = function(e, r) {
  return this.fetchPromise ? this.fetchPromise.then((function() {
    return this.getVariantSync(e, r);
  }).bind(this)).catch(function(i) {
    return St.error(i), r;
  }) : new Promise(function(i) {
    St.critical("Feature Flags not initialized"), i(r);
  });
};
fe.prototype.getVariantSync = function(e, r) {
  if (!this.areFlagsReady())
    return St.log("Flags not loaded yet"), r;
  var i = this.flags.get(e);
  return i ? (this.trackFeatureCheck(e, i), i) : (St.log('No flag found: "' + e + '"'), r);
};
fe.prototype.getVariantValue = function(e, r) {
  return this.getVariant(e, { value: r }).then(function(i) {
    return i.value;
  }).catch(function(i) {
    return St.error(i), r;
  });
};
fe.prototype.getFeatureData = function(e, r) {
  return St.critical("mixpanel.flags.get_feature_data() is deprecated and will be removed in a future release. Use mixpanel.flags.get_variant_value() instead."), this.getVariantValue(e, r);
};
fe.prototype.getVariantValueSync = function(e, r) {
  return this.getVariantSync(e, { value: r }).value;
};
fe.prototype.isEnabled = function(e, r) {
  return this.getVariantValue(e).then((function() {
    return this.isEnabledSync(e, r);
  }).bind(this)).catch(function(i) {
    return St.error(i), r;
  });
};
fe.prototype.isEnabledSync = function(e, r) {
  r = r || !1;
  var i = this.getVariantValueSync(e, r);
  return i !== !0 && i !== !1 && (St.error('Feature flag "' + e + '" value: ' + i + " is not a boolean; returning fallback value: " + r), i = r), i;
};
fe.prototype.trackFeatureCheck = function(e, r) {
  if (!this.trackedFeatures.has(e)) {
    this.trackedFeatures.add(e);
    var i = {
      "Experiment name": e,
      "Variant name": r.key,
      $experiment_type: "feature_flag",
      "Variant fetch start time": new Date(this._fetchStartTime).toISOString(),
      "Variant fetch complete time": new Date(this._fetchCompleteTime).toISOString(),
      "Variant fetch latency (ms)": this._fetchLatency,
      "Variant fetch traceparent": this._traceparent
    };
    r.experiment_id !== "undefined" && (i.$experiment_id = r.experiment_id), r.is_experiment_active !== "undefined" && (i.$is_experiment_active = r.is_experiment_active), r.is_qa_tester !== "undefined" && (i.$is_qa_tester = r.is_qa_tester), this.track("$experiment_started", i);
  }
};
fe.prototype.minApisSupported = function() {
  return !!this.fetch && typeof Promise < "u" && typeof Map < "u" && typeof Set < "u";
};
Ff(fe);
fe.prototype.are_flags_ready = fe.prototype.areFlagsReady;
fe.prototype.get_variant = fe.prototype.getVariant;
fe.prototype.get_variant_sync = fe.prototype.getVariantSync;
fe.prototype.get_variant_value = fe.prototype.getVariantValue;
fe.prototype.get_variant_value_sync = fe.prototype.getVariantValueSync;
fe.prototype.is_enabled = fe.prototype.isEnabled;
fe.prototype.is_enabled_sync = fe.prototype.isEnabledSync;
fe.prototype.update_context = fe.prototype.updateContext;
fe.prototype.get_feature_data = fe.prototype.getFeatureData;
var or = function() {
};
or.prototype.create_properties = function() {
};
or.prototype.event_handler = function() {
};
or.prototype.after_track_handler = function() {
};
or.prototype.init = function(e) {
  return this.mp = e, this;
};
or.prototype.track = function(e, r, i, t) {
  var n = this, s = h.dom_query(e);
  if (s.length === 0) {
    be.error("The DOM query (" + e + ") returned 0 elements");
    return;
  }
  return h.each(s, function(o) {
    h.register_event(o, this.override_event, function(a) {
      var c = {}, l = n.create_properties(i, this), f = n.mp.get_config("track_links_timeout");
      n.event_handler(a, this, c), window.setTimeout(n.track_callback(t, l, c, !0), f), n.mp.track(r, l, n.track_callback(t, l, c));
    });
  }, this), !0;
};
or.prototype.track_callback = function(e, r, i, t) {
  t = t || !1;
  var n = this;
  return function() {
    i.callback_fired || (i.callback_fired = !0, !(e && e(t, r) === !1) && n.after_track_handler(r, i, t));
  };
};
or.prototype.create_properties = function(e, r) {
  var i;
  return typeof e == "function" ? i = e(r) : i = h.extend({}, e), i;
};
var nn = function() {
  this.override_event = "click";
};
h.inherit(nn, or);
nn.prototype.create_properties = function(e, r) {
  var i = nn.superclass.create_properties.apply(this, arguments);
  return r.href && (i.url = r.href), i;
};
nn.prototype.event_handler = function(e, r, i) {
  i.new_tab = e.which === 2 || e.metaKey || e.ctrlKey || r.target === "_blank", i.href = r.href, i.new_tab || e.preventDefault();
};
nn.prototype.after_track_handler = function(e, r) {
  r.new_tab || setTimeout(function() {
    window.location = r.href;
  }, 0);
};
var ks = function() {
  this.override_event = "submit";
};
h.inherit(ks, or);
ks.prototype.event_handler = function(e, r, i) {
  i.element = r, e.preventDefault();
};
ks.prototype.after_track_handler = function(e, r) {
  setTimeout(function() {
    r.element.submit();
  }, 0);
};
var hr = "$set", sn = "$set_once", jt = "$unset", Ar = "$add", qt = "$append", Rr = "$union", er = "$remove", tb = "$delete", gd = {
  set_action: function(e, r) {
    var i = {}, t = {};
    return h.isObject(e) ? h.each(e, function(n, s) {
      this._is_reserved_property(s) || (t[s] = n);
    }, this) : t[e] = r, i[hr] = t, i;
  },
  unset_action: function(e) {
    var r = {}, i = [];
    return h.isArray(e) || (e = [e]), h.each(e, function(t) {
      this._is_reserved_property(t) || i.push(t);
    }, this), r[jt] = i, r;
  },
  set_once_action: function(e, r) {
    var i = {}, t = {};
    return h.isObject(e) ? h.each(e, function(n, s) {
      this._is_reserved_property(s) || (t[s] = n);
    }, this) : t[e] = r, i[sn] = t, i;
  },
  union_action: function(e, r) {
    var i = {}, t = {};
    return h.isObject(e) ? h.each(e, function(n, s) {
      this._is_reserved_property(s) || (t[s] = h.isArray(n) ? n : [n]);
    }, this) : t[e] = h.isArray(r) ? r : [r], i[Rr] = t, i;
  },
  append_action: function(e, r) {
    var i = {}, t = {};
    return h.isObject(e) ? h.each(e, function(n, s) {
      this._is_reserved_property(s) || (t[s] = n);
    }, this) : t[e] = r, i[qt] = t, i;
  },
  remove_action: function(e, r) {
    var i = {}, t = {};
    return h.isObject(e) ? h.each(e, function(n, s) {
      this._is_reserved_property(s) || (t[s] = n);
    }, this) : t[e] = r, i[er] = t, i;
  },
  delete_action: function() {
    var e = {};
    return e[tb] = "", e;
  }
}, Fe = function() {
};
h.extend(Fe.prototype, gd);
Fe.prototype._init = function(e, r, i) {
  this._mixpanel = e, this._group_key = r, this._group_id = i;
};
Fe.prototype.set = cn(function(e, r, i) {
  var t = this.set_action(e, r);
  return h.isObject(e) && (i = r), this._send_request(t, i);
});
Fe.prototype.set_once = cn(function(e, r, i) {
  var t = this.set_once_action(e, r);
  return h.isObject(e) && (i = r), this._send_request(t, i);
});
Fe.prototype.unset = cn(function(e, r) {
  var i = this.unset_action(e);
  return this._send_request(i, r);
});
Fe.prototype.union = cn(function(e, r, i) {
  h.isObject(e) && (i = r);
  var t = this.union_action(e, r);
  return this._send_request(t, i);
});
Fe.prototype.delete = cn(function(e) {
  var r = this.delete_action();
  return this._send_request(r, e);
});
Fe.prototype.remove = cn(function(e, r, i) {
  var t = this.remove_action(e, r);
  return this._send_request(t, i);
});
Fe.prototype._send_request = function(e, r) {
  e.$group_key = this._group_key, e.$group_id = this._group_id, e.$token = this._get_config("token");
  var i = h.encodeDates(e);
  return this._mixpanel._track_or_batch({
    type: "groups",
    data: i,
    endpoint: this._mixpanel.get_api_host("groups") + "/" + this._get_config("api_routes").groups,
    batcher: this._mixpanel.request_batchers.groups
  }, r);
};
Fe.prototype._is_reserved_property = function(e) {
  return e === "$group_key" || e === "$group_id";
};
Fe.prototype._get_config = function(e) {
  return this._mixpanel.get_config(e);
};
Fe.prototype.toString = function() {
  return this._mixpanel.toString() + ".group." + this._group_key + "." + this._group_id;
};
Fe.prototype.remove = Fe.prototype.remove;
Fe.prototype.set = Fe.prototype.set;
Fe.prototype.set_once = Fe.prototype.set_once;
Fe.prototype.union = Fe.prototype.union;
Fe.prototype.unset = Fe.prototype.unset;
Fe.prototype.toString = Fe.prototype.toString;
var se = function() {
};
h.extend(se.prototype, gd);
se.prototype._init = function(e) {
  this._mixpanel = e;
};
se.prototype.set = Cr(function(e, r, i) {
  var t = this.set_action(e, r);
  return h.isObject(e) && (i = r), this._get_config("save_referrer") && this._mixpanel.persistence.update_referrer_info(document.referrer), t[hr] = h.extend(
    {},
    h.info.people_properties(),
    t[hr]
  ), this._send_request(t, i);
});
se.prototype.set_once = Cr(function(e, r, i) {
  var t = this.set_once_action(e, r);
  return h.isObject(e) && (i = r), this._send_request(t, i);
});
se.prototype.unset = Cr(function(e, r) {
  var i = this.unset_action(e);
  return this._send_request(i, r);
});
se.prototype.increment = Cr(function(e, r, i) {
  var t = {}, n = {};
  return h.isObject(e) ? (h.each(e, function(s, o) {
    if (!this._is_reserved_property(o))
      if (isNaN(parseFloat(s))) {
        be.error("Invalid increment value passed to mixpanel.people.increment - must be a number");
        return;
      } else
        n[o] = s;
  }, this), i = r) : (h.isUndefined(r) && (r = 1), n[e] = r), t[Ar] = n, this._send_request(t, i);
});
se.prototype.append = Cr(function(e, r, i) {
  h.isObject(e) && (i = r);
  var t = this.append_action(e, r);
  return this._send_request(t, i);
});
se.prototype.remove = Cr(function(e, r, i) {
  h.isObject(e) && (i = r);
  var t = this.remove_action(e, r);
  return this._send_request(t, i);
});
se.prototype.union = Cr(function(e, r, i) {
  h.isObject(e) && (i = r);
  var t = this.union_action(e, r);
  return this._send_request(t, i);
});
se.prototype.track_charge = Cr(function() {
  be.error("mixpanel.people.track_charge() is deprecated and no longer has any effect.");
});
se.prototype.clear_charges = function(e) {
  return this.set("$transactions", [], e);
};
se.prototype.delete_user = function() {
  if (!this._identify_called()) {
    be.error("mixpanel.people.delete_user() requires you to call identify() first");
    return;
  }
  var e = { $delete: this._mixpanel.get_distinct_id() };
  return this._send_request(e);
};
se.prototype.toString = function() {
  return this._mixpanel.toString() + ".people";
};
se.prototype._send_request = function(e, r) {
  e.$token = this._get_config("token"), e.$distinct_id = this._mixpanel.get_distinct_id();
  var i = this._mixpanel.get_property("$device_id"), t = this._mixpanel.get_property("$user_id"), n = this._mixpanel.get_property("$had_persisted_distinct_id");
  i && (e.$device_id = i), t && (e.$user_id = t), n && (e.$had_persisted_distinct_id = n);
  var s = h.encodeDates(e);
  return this._identify_called() ? this._mixpanel._track_or_batch({
    type: "people",
    data: s,
    endpoint: this._mixpanel.get_api_host("people") + "/" + this._get_config("api_routes").engage,
    batcher: this._mixpanel.request_batchers.people
  }, r) : (this._enqueue(e), h.isUndefined(r) || (this._get_config("verbose") ? r({ status: -1, error: null }) : r(-1)), h.truncate(s, 255));
};
se.prototype._get_config = function(e) {
  return this._mixpanel.get_config(e);
};
se.prototype._identify_called = function() {
  return this._mixpanel._flags.identify_called === !0;
};
se.prototype._enqueue = function(e) {
  hr in e ? this._mixpanel.persistence._add_to_people_queue(hr, e) : sn in e ? this._mixpanel.persistence._add_to_people_queue(sn, e) : jt in e ? this._mixpanel.persistence._add_to_people_queue(jt, e) : Ar in e ? this._mixpanel.persistence._add_to_people_queue(Ar, e) : qt in e ? this._mixpanel.persistence._add_to_people_queue(qt, e) : er in e ? this._mixpanel.persistence._add_to_people_queue(er, e) : Rr in e ? this._mixpanel.persistence._add_to_people_queue(Rr, e) : be.error("Invalid call to _enqueue():", e);
};
se.prototype._flush_one_queue = function(e, r, i, t) {
  var n = this, s = h.extend({}, this._mixpanel.persistence.load_queue(e)), o = s;
  !h.isUndefined(s) && h.isObject(s) && !h.isEmptyObject(s) && (n._mixpanel.persistence._pop_from_people_queue(e, s), n._mixpanel.persistence.save(), t && (o = t(s)), r.call(n, o, function(a, c) {
    a === 0 && n._mixpanel.persistence._add_to_people_queue(e, s), h.isUndefined(i) || i(a, c);
  }));
};
se.prototype._flush = function(e, r, i, t, n, s, o) {
  var a = this;
  this._flush_one_queue(hr, this.set, e), this._flush_one_queue(sn, this.set_once, t), this._flush_one_queue(jt, this.unset, s, function(m) {
    return h.keys(m);
  }), this._flush_one_queue(Ar, this.increment, r), this._flush_one_queue(Rr, this.union, n);
  var c = this._mixpanel.persistence.load_queue(qt);
  if (!h.isUndefined(c) && h.isArray(c) && c.length)
    for (var l, f = function(m, y) {
      m === 0 && a._mixpanel.persistence._add_to_people_queue(qt, l), h.isUndefined(i) || i(m, y);
    }, u = c.length - 1; u >= 0; u--)
      c = this._mixpanel.persistence.load_queue(qt), l = c.pop(), a._mixpanel.persistence.save(), h.isEmptyObject(l) || a.append(l, f);
  var d = this._mixpanel.persistence.load_queue(er);
  if (!h.isUndefined(d) && h.isArray(d) && d.length)
    for (var v, p = function(m, y) {
      m === 0 && a._mixpanel.persistence._add_to_people_queue(er, v), h.isUndefined(o) || o(m, y);
    }, _ = d.length - 1; _ >= 0; _--)
      d = this._mixpanel.persistence.load_queue(er), v = d.pop(), a._mixpanel.persistence.save(), h.isEmptyObject(v) || a.remove(v, p);
};
se.prototype._is_reserved_property = function(e) {
  return e === "$distinct_id" || e === "$token" || e === "$device_id" || e === "$user_id" || e === "$had_persisted_distinct_id";
};
se.prototype.set = se.prototype.set;
se.prototype.set_once = se.prototype.set_once;
se.prototype.unset = se.prototype.unset;
se.prototype.increment = se.prototype.increment;
se.prototype.append = se.prototype.append;
se.prototype.remove = se.prototype.remove;
se.prototype.union = se.prototype.union;
se.prototype.track_charge = se.prototype.track_charge;
se.prototype.clear_charges = se.prototype.clear_charges;
se.prototype.delete_user = se.prototype.delete_user;
se.prototype.toString = se.prototype.toString;
var Wa = "__mps", za = "__mpso", Ga = "__mpus", Va = "__mpa", qa = "__mpap", Ha = "__mpr", Ya = "__mpu", md = "$people_distinct_id", as = "__alias", Yn = "__timers", rb = [
  Wa,
  za,
  Ga,
  Va,
  qa,
  Ha,
  Ya,
  md,
  as,
  Yn
], le = function(e) {
  this.props = {}, this.campaign_params_saved = !1, e.persistence_name ? this.name = "mp_" + e.persistence_name : this.name = "mp_" + e.token + "_mixpanel";
  var r = e.persistence;
  r !== "cookie" && r !== "localStorage" && (be.critical("Unknown persistence type " + r + "; falling back to cookie"), r = e.persistence = "cookie"), r === "localStorage" && h.localStorage.is_supported() ? this.storage = h.localStorage : this.storage = h.cookie, this.load(), this.update_config(e), this.upgrade(), this.save();
};
le.prototype.properties = function() {
  var e = {};
  return this.load(), h.each(this.props, function(r, i) {
    h.include(rb, i) || (e[i] = r);
  }), e;
};
le.prototype.load = function() {
  if (!this.disabled) {
    var e = this.storage.parse(this.name);
    e && (this.props = h.extend({}, e));
  }
};
le.prototype.upgrade = function() {
  var e, r;
  this.storage === h.localStorage ? (e = h.cookie.parse(this.name), h.cookie.remove(this.name), h.cookie.remove(this.name, !0), e && this.register_once(e)) : this.storage === h.cookie && (r = h.localStorage.parse(this.name), h.localStorage.remove(this.name), r && this.register_once(r));
};
le.prototype.save = function() {
  this.disabled || this.storage.set(
    this.name,
    rn(this.props),
    this.expire_days,
    this.cross_subdomain,
    this.secure,
    this.cross_site,
    this.cookie_domain
  );
};
le.prototype.load_prop = function(e) {
  return this.load(), this.props[e];
};
le.prototype.remove = function() {
  this.storage.remove(this.name, !1, this.cookie_domain), this.storage.remove(this.name, !0, this.cookie_domain);
};
le.prototype.clear = function() {
  this.remove(), this.props = {};
};
le.prototype.register_once = function(e, r, i) {
  return h.isObject(e) ? (typeof r > "u" && (r = "None"), this.expire_days = typeof i > "u" ? this.default_expiry : i, this.load(), h.each(e, function(t, n) {
    (!this.props.hasOwnProperty(n) || this.props[n] === r) && (this.props[n] = t);
  }, this), this.save(), !0) : !1;
};
le.prototype.register = function(e, r) {
  return h.isObject(e) ? (this.expire_days = typeof r > "u" ? this.default_expiry : r, this.load(), h.extend(this.props, e), this.save(), !0) : !1;
};
le.prototype.unregister = function(e) {
  this.load(), e in this.props && (delete this.props[e], this.save());
};
le.prototype.update_search_keyword = function(e) {
  this.register(h.info.searchInfo(e));
};
le.prototype.update_referrer_info = function(e) {
  this.register_once({
    $initial_referrer: e || "$direct",
    $initial_referring_domain: h.info.referringDomain(e) || "$direct"
  }, "");
};
le.prototype.get_referrer_info = function() {
  return h.strip_empty_properties({
    $initial_referrer: this.props.$initial_referrer,
    $initial_referring_domain: this.props.$initial_referring_domain
  });
};
le.prototype.update_config = function(e) {
  this.default_expiry = this.expire_days = e.cookie_expiration, this.set_disabled(e.disable_persistence), this.set_cookie_domain(e.cookie_domain), this.set_cross_site(e.cross_site_cookie), this.set_cross_subdomain(e.cross_subdomain_cookie), this.set_secure(e.secure_cookie);
};
le.prototype.set_disabled = function(e) {
  this.disabled = e, this.disabled ? this.remove() : this.save();
};
le.prototype.set_cookie_domain = function(e) {
  e !== this.cookie_domain && (this.remove(), this.cookie_domain = e, this.save());
};
le.prototype.set_cross_site = function(e) {
  e !== this.cross_site && (this.cross_site = e, this.remove(), this.save());
};
le.prototype.set_cross_subdomain = function(e) {
  e !== this.cross_subdomain && (this.cross_subdomain = e, this.remove(), this.save());
};
le.prototype.get_cross_subdomain = function() {
  return this.cross_subdomain;
};
le.prototype.set_secure = function(e) {
  e !== this.secure && (this.secure = !!e, this.remove(), this.save());
};
le.prototype._add_to_people_queue = function(e, r) {
  var i = this._get_queue_key(e), t = r[e], n = this._get_or_create_queue(hr), s = this._get_or_create_queue(sn), o = this._get_or_create_queue(jt), a = this._get_or_create_queue(Ar), c = this._get_or_create_queue(Rr), l = this._get_or_create_queue(er, []), f = this._get_or_create_queue(qt, []);
  i === Wa ? (h.extend(n, t), this._pop_from_people_queue(Ar, t), this._pop_from_people_queue(Rr, t), this._pop_from_people_queue(jt, t)) : i === za ? (h.each(t, function(u, d) {
    d in s || (s[d] = u);
  }), this._pop_from_people_queue(jt, t)) : i === Ga ? h.each(t, function(u) {
    h.each([n, s, a, c], function(d) {
      u in d && delete d[u];
    }), h.each(f, function(d) {
      u in d && delete d[u];
    }), o[u] = !0;
  }) : i === Va ? (h.each(t, function(u, d) {
    d in n ? n[d] += u : (d in a || (a[d] = 0), a[d] += u);
  }, this), this._pop_from_people_queue(jt, t)) : i === Ya ? (h.each(t, function(u, d) {
    h.isArray(u) && (d in c || (c[d] = []), h.each(u, function(v) {
      h.include(c[d], v) || c[d].push(v);
    }));
  }), this._pop_from_people_queue(jt, t)) : i === Ha ? (l.push(t), this._pop_from_people_queue(qt, t)) : i === qa && (f.push(t), this._pop_from_people_queue(jt, t)), be.log("MIXPANEL PEOPLE REQUEST (QUEUED, PENDING IDENTIFY):"), be.log(r), this.save();
};
le.prototype._pop_from_people_queue = function(e, r) {
  var i = this.props[this._get_queue_key(e)];
  h.isUndefined(i) || h.each(r, function(t, n) {
    e === qt || e === er ? h.each(i, function(s) {
      s[n] === t && delete s[n];
    }) : delete i[n];
  }, this);
};
le.prototype.load_queue = function(e) {
  return this.load_prop(this._get_queue_key(e));
};
le.prototype._get_queue_key = function(e) {
  if (e === hr)
    return Wa;
  if (e === sn)
    return za;
  if (e === jt)
    return Ga;
  if (e === Ar)
    return Va;
  if (e === qt)
    return qa;
  if (e === er)
    return Ha;
  if (e === Rr)
    return Ya;
  be.error("Invalid queue:", e);
};
le.prototype._get_or_create_queue = function(e, r) {
  var i = this._get_queue_key(e);
  return r = h.isUndefined(r) ? {} : r, this.props[i] || (this.props[i] = r);
};
le.prototype.set_event_timer = function(e, r) {
  var i = this.load_prop(Yn) || {};
  i[e] = r, this.props[Yn] = i, this.save();
};
le.prototype.remove_event_timer = function(e) {
  var r = this.load_prop(Yn) || {}, i = r[e];
  return h.isUndefined(i) || (delete this.props[Yn][e], this.save()), i;
};
var Ka, yd = function(e, r) {
  throw new Error(e + " not available in this build.");
}, vt, _d = 0, nb = 1, ib = function(e) {
  return e;
}, Nt = "mixpanel", bd = "base64", sb = "json", Ja = "$device:", Yr = N.XMLHttpRequest && "withCredentials" in new XMLHttpRequest(), wd = !Yr && Gt.indexOf("MSIE") === -1 && Gt.indexOf("Mozilla") === -1, cs = null;
Qt.sendBeacon && (cs = function() {
  return Qt.sendBeacon.apply(Qt, arguments);
});
var Sd = {
  track: "track/",
  engage: "engage/",
  groups: "groups/",
  record: "record/",
  flags: "flags/"
}, Ml = {
  api_host: "https://api-js.mixpanel.com",
  api_hosts: {},
  api_routes: Sd,
  api_extra_query_params: {},
  api_method: "POST",
  api_transport: "XHR",
  api_payload_format: bd,
  app_host: "https://mixpanel.com",
  autocapture: !1,
  cdn: "https://cdn.mxpnl.com",
  cross_site_cookie: !1,
  cross_subdomain_cookie: !0,
  error_reporter: fr,
  flags: !1,
  persistence: "cookie",
  persistence_name: "",
  cookie_domain: "",
  cookie_name: "",
  loaded: fr,
  mp_loader: null,
  track_marketing: !0,
  track_pageview: !1,
  skip_first_touch_marketing: !1,
  store_google: !0,
  stop_utm_persistence: !1,
  save_referrer: !0,
  test: !1,
  verbose: !1,
  img: !1,
  debug: !1,
  track_links_timeout: 300,
  cookie_expiration: 365,
  upgrade: !1,
  disable_persistence: !1,
  disable_cookie: !1,
  secure_cookie: !1,
  ip: !0,
  opt_out_tracking_by_default: !1,
  opt_out_persistence_by_default: !1,
  opt_out_tracking_persistence_type: "localStorage",
  opt_out_tracking_cookie_prefix: null,
  property_blacklist: [],
  xhr_headers: {},
  // { header: value, header2: value }
  ignore_dnt: !1,
  batch_requests: !0,
  batch_size: 50,
  batch_flush_interval_ms: 5e3,
  batch_request_timeout_ms: 9e4,
  batch_autostart: !0,
  hooks: {},
  record_block_class: new RegExp("^(mp-block|fs-exclude|amp-block|rr-block|ph-no-capture)$"),
  record_block_selector: "img, video, audio",
  record_canvas: !1,
  record_collect_fonts: !1,
  record_console: !0,
  record_heatmap_data: !1,
  record_idle_timeout_ms: 1800 * 1e3,
  // 30 minutes
  record_mask_text_class: new RegExp("^(mp-mask|fs-mask|amp-mask|rr-mask|ph-mask)$"),
  record_mask_text_selector: "*",
  record_max_ms: kn,
  record_min_ms: 0,
  record_sessions_percent: 0,
  recorder_src: "https://cdn.mxpnl.com/libs/mixpanel-recorder.min.js"
}, xd = !1, x = function() {
}, oa = function(e, r, i) {
  var t, n = i === Nt ? vt : vt[i];
  if (n && Ka === _d)
    t = n;
  else {
    if (n && !h.isArray(n)) {
      be.error("You have already initialized " + i);
      return;
    }
    t = new x();
  }
  if (t._cached_groups = {}, t._init(e, r, i), t.people = new se(), t.people._init(t), !t.get_config("skip_first_touch_marketing")) {
    var s = h.info.campaignParams(null), o = {}, a = !1;
    h.each(s, function(c, l) {
      o["initial_" + l] = c, c && (a = !0);
    }), a && t.people.set_once(o);
  }
  return Mt.DEBUG = Mt.DEBUG || t.get_config("debug"), !h.isUndefined(n) && h.isArray(n) && (t._execute_array.call(t.people, n.people), t._execute_array(n)), t;
};
x.prototype.init = function(e, r, i) {
  if (h.isUndefined(i)) {
    this.report_error("You must name your new library: init(token, config, name)");
    return;
  }
  if (i === Nt) {
    this.report_error("You must initialize the main mixpanel object right after you include the Mixpanel js snippet");
    return;
  }
  var t = oa(e, r, i);
  return vt[i] = t, t._loaded(), t;
};
x.prototype._init = function(e, r, i) {
  r = r || {}, this.__loaded = !0, this.config = {};
  var t = {};
  if (!("api_payload_format" in r)) {
    var n = r.api_host || Ml.api_host;
    n.match(/\.mixpanel\.com/) && (t.api_payload_format = sb);
  }
  if (this.set_config(h.extend({}, Ml, t, r, {
    name: i,
    token: e,
    callback_fn: (i === Nt ? i : Nt + "." + i) + "._jsc"
  })), this._jsc = fr, this.__dom_loaded_queue = [], this.__request_queue = [], this.__disabled_events = [], this._flags = {
    disable_all_events: !1,
    identify_called: !1
  }, this.request_batchers = {}, this._batch_requests = this.get_config("batch_requests"), this._batch_requests) {
    if (!h.localStorage.is_supported(!0) || !Yr)
      this._batch_requests = !1, be.log("Turning off Mixpanel request-queueing; needs XHR and localStorage support"), h.each(this.get_batcher_configs(), function(a) {
        be.log("Clearing batch queue " + a.queue_key), h.localStorage.remove(a.queue_key);
      });
    else if (this.init_batchers(), cs && N.addEventListener) {
      var s = h.bind(function() {
        this.request_batchers.events.stopped || this.request_batchers.events.flush({ unloading: !0 });
      }, this);
      N.addEventListener("pagehide", function(a) {
        a.persisted && s();
      }), N.addEventListener("visibilitychange", function() {
        ie.visibilityState === "hidden" && s();
      });
    }
  }
  this.persistence = this.cookie = new le(this.config), this.unpersisted_superprops = {}, this._gdpr_init();
  var o = h.UUID();
  this.get_distinct_id() || this.register_once({
    distinct_id: Ja + o,
    $device_id: o
  }, ""), this.flags = new fe({
    getFullApiRoute: h.bind(function() {
      return this.get_api_host("flags") + "/" + this.get_config("api_routes").flags;
    }, this),
    getConfigFunc: h.bind(this.get_config, this),
    setConfigFunc: h.bind(this.set_config, this),
    getPropertyFunc: h.bind(this.get_property, this),
    trackingFunc: h.bind(this.track, this)
  }), this.flags.init(), this.flags = this.flags, this.autocapture = new Qe(this), this.autocapture.init(), this._init_tab_id(), this._check_and_start_session_recording();
};
x.prototype._init_tab_id = function() {
  if (this.get_config("disable_persistence"))
    be.log("Tab ID initialization skipped due to disable_persistence config");
  else if (h.sessionStorage.is_supported())
    try {
      var e = this.get_config("name") + "_" + this.get_config("token"), r = "mp_tab_id_" + e, i = "mp_gen_new_tab_id_" + e;
      (h.sessionStorage.get(i) || !h.sessionStorage.get(r)) && h.sessionStorage.set(r, "$tab-" + h.UUID()), h.sessionStorage.set(i, "1"), this.tab_id = h.sessionStorage.get(r), N.addEventListener("beforeunload", function() {
        h.sessionStorage.remove(i);
      });
    } catch (t) {
      this.report_error("Error initializing tab id", t);
    }
  else
    this.report_error("Session storage is not supported, cannot keep track of unique tab ID.");
};
x.prototype.get_tab_id = function() {
  return this.tab_id || null;
};
x.prototype._should_load_recorder = function() {
  if (this.get_config("disable_persistence"))
    return be.log("Load recorder check skipped due to disable_persistence config"), Promise.resolve(!1);
  var e = new Ut(La), r = this.get_tab_id();
  return e.init().then(function() {
    return e.getAll();
  }).then(function(i) {
    for (var t = 0; t < i.length; t++)
      if (ja(i[t]) || i[t].tabId === r)
        return !0;
    return !1;
  }).catch(h.bind(function(i) {
    this.report_error("Error checking recording registry", i);
  }, this));
};
x.prototype._check_and_start_session_recording = xr(function(e) {
  if (!N.MutationObserver) {
    be.critical("Browser does not support MutationObserver; skipping session recording");
    return;
  }
  var r = h.bind(function(t) {
    var n = h.bind(function() {
      this._recorder = this._recorder || new N.__mp_recorder(this), this._recorder.resumeRecording(t);
    }, this);
    h.isUndefined(N.__mp_recorder) ? yd(this.get_config("recorder_src"), n) : n();
  }, this), i = this.get_config("record_sessions_percent") > 0 && Math.random() * 100 <= this.get_config("record_sessions_percent");
  e || i ? r(!0) : this._should_load_recorder().then(function(t) {
    t && r(!1);
  });
});
x.prototype.start_session_recording = function() {
  this._check_and_start_session_recording(!0);
};
x.prototype.stop_session_recording = function() {
  return this._recorder ? this._recorder.stopRecording() : Promise.resolve();
};
x.prototype.pause_session_recording = function() {
  return this._recorder ? this._recorder.pauseRecording() : Promise.resolve();
};
x.prototype.resume_session_recording = function() {
  return this._recorder ? this._recorder.resumeRecording() : Promise.resolve();
};
x.prototype.is_recording_heatmap_data = function() {
  return this._get_session_replay_id() && this.get_config("record_heatmap_data");
};
x.prototype.get_session_recording_properties = function() {
  var e = {}, r = this._get_session_replay_id();
  return r && (e.$mp_replay_id = r), e;
};
x.prototype.get_session_replay_url = function() {
  var e = null, r = this._get_session_replay_id();
  if (r) {
    var i = h.HTTPBuildQuery({
      replay_id: r,
      distinct_id: this.get_distinct_id(),
      token: this.get_config("token")
    });
    e = "https://mixpanel.com/projects/replay-redirect?" + i;
  }
  return e;
};
x.prototype._get_session_replay_id = function() {
  var e = null;
  return this._recorder && (e = this._recorder.replayId), e || null;
};
x.prototype.__get_recorder = function() {
  return this._recorder;
};
x.prototype._loaded = function() {
  if (this.get_config("loaded")(this), this._set_default_superprops(), this.people.set_once(this.persistence.get_referrer_info()), this.get_config("store_google") && this.get_config("stop_utm_persistence")) {
    var e = h.info.campaignParams(null);
    h.each(e, (function(r, i) {
      this.unregister(i);
    }).bind(this));
  }
};
x.prototype._set_default_superprops = function() {
  this.persistence.update_search_keyword(ie.referrer), this.get_config("store_google") && !this.get_config("stop_utm_persistence") && this.register(h.info.campaignParams()), this.get_config("save_referrer") && this.persistence.update_referrer_info(ie.referrer);
};
x.prototype._dom_loaded = function() {
  h.each(this.__dom_loaded_queue, function(e) {
    this._track_dom.apply(this, e);
  }, this), this.has_opted_out_tracking() || h.each(this.__request_queue, function(e) {
    this._send_request.apply(this, e);
  }, this), delete this.__dom_loaded_queue, delete this.__request_queue;
};
x.prototype._track_dom = function(e, r) {
  if (this.get_config("img"))
    return this.report_error("You can't use DOM tracking functions with img = true."), !1;
  if (!xd)
    return this.__dom_loaded_queue.push([e, r]), !1;
  var i = new e().init(this);
  return i.track.apply(i, r);
};
x.prototype._prepare_callback = function(e, r) {
  if (h.isUndefined(e))
    return null;
  if (Yr) {
    var i = function(o) {
      e(o, r);
    };
    return i;
  } else {
    var t = this._jsc, n = "" + Math.floor(Math.random() * 1e8), s = this.get_config("callback_fn") + "[" + n + "]";
    return t[n] = function(o) {
      delete t[n], e(o, r);
    }, s;
  }
};
x.prototype._send_request = function(e, r, i, t) {
  var n = !0;
  if (wd)
    return this.__request_queue.push(arguments), n;
  var s = {
    method: this.get_config("api_method"),
    transport: this.get_config("api_transport"),
    verbose: this.get_config("verbose")
  }, o = null;
  !t && (h.isFunction(i) || typeof i == "string") && (t = i, i = null), i = h.extend(s, i || {}), Yr || (i.method = "GET");
  var a = i.method === "POST", c = cs && a && i.transport.toLowerCase() === "sendbeacon", l = i.verbose;
  r.verbose && (l = !0), this.get_config("test") && (r.test = 1), l && (r.verbose = 1), this.get_config("img") && (r.img = 1), Yr || (t ? r.callback = t : (l || this.get_config("test")) && (r.callback = "(function(){})")), r.ip = this.get_config("ip") ? 1 : 0, r._ = (/* @__PURE__ */ new Date()).getTime().toString(), a && (o = "data=" + encodeURIComponent(r.data), delete r.data), h.extend(r, this.get_config("api_extra_query_params")), e += "?" + h.HTTPBuildQuery(r);
  var f = this;
  if ("img" in r) {
    var u = ie.createElement("img");
    u.src = e, ie.body.appendChild(u);
  } else if (c) {
    try {
      n = cs(e, o);
    } catch (y) {
      f.report_error(y), n = !1;
    }
    try {
      t && t(n ? 1 : 0);
    } catch (y) {
      f.report_error(y);
    }
  } else if (Yr)
    try {
      var d = new XMLHttpRequest();
      d.open(i.method, e, !0);
      var v = this.get_config("xhr_headers");
      if (a && (v["Content-Type"] = "application/x-www-form-urlencoded"), h.each(v, function(y, b) {
        d.setRequestHeader(b, y);
      }), i.timeout_ms && typeof d.timeout < "u") {
        d.timeout = i.timeout_ms;
        var p = (/* @__PURE__ */ new Date()).getTime();
      }
      d.withCredentials = !0, d.onreadystatechange = function() {
        if (d.readyState === 4)
          if (d.status === 200) {
            if (t)
              if (l) {
                var y;
                try {
                  y = h.JSONDecode(d.responseText);
                } catch (E) {
                  if (f.report_error(E), i.ignore_json_errors)
                    y = d.responseText;
                  else
                    return;
                }
                t(y);
              } else
                t(Number(d.responseText));
          } else {
            var b;
            if (d.timeout && !d.status && (/* @__PURE__ */ new Date()).getTime() - p >= d.timeout ? b = "timeout" : b = "Bad HTTP status: " + d.status + " " + d.statusText, f.report_error(b), t)
              if (l) {
                var S = d.responseHeaders || {};
                t({ status: 0, httpStatusCode: d.status, error: b, retryAfter: S["Retry-After"] });
              } else
                t(0);
          }
      }, d.send(o);
    } catch (y) {
      f.report_error(y), n = !1;
    }
  else {
    var _ = ie.createElement("script");
    _.type = "text/javascript", _.async = !0, _.defer = !0, _.src = e;
    var m = ie.getElementsByTagName("script")[0];
    m.parentNode.insertBefore(_, m);
  }
  return n;
};
x.prototype._execute_array = function(e) {
  var r, i = [], t = [], n = [];
  h.each(e, function(o) {
    o && (r = o[0], h.isArray(r) ? n.push(o) : typeof o == "function" ? o.call(this) : h.isArray(o) && r === "alias" ? i.push(o) : h.isArray(o) && r.indexOf("track") !== -1 && typeof this[r] == "function" ? n.push(o) : t.push(o));
  }, this);
  var s = function(o, a) {
    h.each(o, function(c) {
      if (h.isArray(c[0])) {
        var l = a;
        h.each(c, function(f) {
          l = l[f[0]].apply(l, f.slice(1));
        });
      } else
        this[c[0]].apply(this, c.slice(1));
    }, a);
  };
  s(i, this), s(t, this), s(n, this);
};
x.prototype.are_batchers_initialized = function() {
  return !!this.request_batchers.events;
};
x.prototype.get_batcher_configs = function() {
  var e = "__mpq_" + this.get_config("token");
  return this._batcher_configs = this._batcher_configs || {
    events: { type: "events", api_name: "track", queue_key: e + "_ev" },
    people: { type: "people", api_name: "engage", queue_key: e + "_pp" },
    groups: { type: "groups", api_name: "groups", queue_key: e + "_gr" }
  }, this._batcher_configs;
};
x.prototype.init_batchers = function() {
  if (!this.are_batchers_initialized()) {
    var e = h.bind(function(i) {
      return new Pt(
        i.queue_key,
        {
          libConfig: this.config,
          errorReporter: this.get_config("error_reporter"),
          sendRequestFunc: h.bind(function(t, n, s) {
            var o = this.get_config("api_routes");
            this._send_request(
              this.get_api_host(i.api_name) + "/" + o[i.api_name],
              this._encode_data_for_request(t),
              n,
              this._prepare_callback(s, t)
            );
          }, this),
          beforeSendHook: h.bind(function(t) {
            return this._run_hook("before_send_" + i.type, t);
          }, this),
          stopAllBatchingFunc: h.bind(this.stop_batch_senders, this),
          usePersistence: !0
        }
      );
    }, this), r = this.get_batcher_configs();
    this.request_batchers = {
      events: e(r.events),
      people: e(r.people),
      groups: e(r.groups)
    };
  }
  this.get_config("batch_autostart") && this.start_batch_senders();
};
x.prototype.start_batch_senders = function() {
  this._batchers_were_started = !0, this.are_batchers_initialized() && (this._batch_requests = !0, h.each(this.request_batchers, function(e) {
    e.start();
  }));
};
x.prototype.stop_batch_senders = function() {
  this._batch_requests = !1, h.each(this.request_batchers, function(e) {
    e.stop(), e.clear();
  });
};
x.prototype.push = function(e) {
  this._execute_array([e]);
};
x.prototype.disable = function(e) {
  typeof e > "u" ? this._flags.disable_all_events = !0 : this.__disabled_events = this.__disabled_events.concat(e);
};
x.prototype._encode_data_for_request = function(e) {
  var r = rn(e);
  return this.get_config("api_payload_format") === bd && (r = h.base64Encode(r)), { data: r };
};
x.prototype._track_or_batch = function(e, r) {
  var i = h.truncate(e.data, 255), t = e.endpoint, n = e.batcher, s = e.should_send_immediately, o = e.send_request_options || {};
  r = r || fr;
  var a = !0, c = h.bind(function() {
    return o.skip_hooks || (i = this._run_hook("before_send_" + e.type, i)), i ? (be.log("MIXPANEL REQUEST:"), be.log(i), this._send_request(
      t,
      this._encode_data_for_request(i),
      o,
      this._prepare_callback(r, i)
    )) : null;
  }, this);
  return this._batch_requests && !s ? n.enqueue(i).then(function(l) {
    l ? r(1, i) : c();
  }) : a = c(), a && i;
};
x.prototype.track = xr(function(e, r, i, t) {
  !t && typeof i == "function" && (t = i, i = null), i = i || {};
  var n = i.transport;
  n && (i.transport = n);
  var s = i.send_immediately;
  if (typeof t != "function" && (t = fr), h.isUndefined(e)) {
    this.report_error("No event name provided to mixpanel.track");
    return;
  }
  if (this._event_is_disabled(e)) {
    t(0);
    return;
  }
  r = h.extend({}, r), r.token = this.get_config("token");
  var o = this.persistence.remove_event_timer(e);
  if (!h.isUndefined(o)) {
    var a = (/* @__PURE__ */ new Date()).getTime() - o;
    r.$duration = parseFloat((a / 1e3).toFixed(3));
  }
  this._set_default_superprops();
  var c = this.get_config("track_marketing") ? h.info.marketingParams() : {};
  r = h.extend(
    {},
    h.info.properties({ mp_loader: this.get_config("mp_loader") }),
    c,
    this.persistence.properties(),
    this.unpersisted_superprops,
    this.get_session_recording_properties(),
    r
  );
  var l = this.get_config("property_blacklist");
  h.isArray(l) ? h.each(l, function(d) {
    delete r[d];
  }) : this.report_error("Invalid value for property_blacklist config: " + l);
  var f = {
    event: e,
    properties: r
  }, u = this._track_or_batch({
    type: "events",
    data: f,
    endpoint: this.get_api_host("events") + "/" + this.get_config("api_routes").track,
    batcher: this.request_batchers.events,
    should_send_immediately: s,
    send_request_options: i
  }, t);
  return u;
});
x.prototype.set_group = xr(function(e, r, i) {
  h.isArray(r) || (r = [r]);
  var t = {};
  return t[e] = r, this.register(t), this.people.set(e, r, i);
});
x.prototype.add_group = xr(function(e, r, i) {
  var t = this.get_property(e), n = {};
  return t === void 0 ? (n[e] = [r], this.register(n)) : t.indexOf(r) === -1 && (t.push(r), n[e] = t, this.register(n)), this.people.union(e, r, i);
});
x.prototype.remove_group = xr(function(e, r, i) {
  var t = this.get_property(e);
  if (t !== void 0) {
    var n = t.indexOf(r);
    n > -1 && (t.splice(n, 1), this.register({ group_key: t })), t.length === 0 && this.unregister(e);
  }
  return this.people.remove(e, r, i);
});
x.prototype.track_with_groups = xr(function(e, r, i, t) {
  var n = h.extend({}, r || {});
  return h.each(i, function(s, o) {
    s != null && (n[o] = s);
  }), this.track(e, n, t);
});
x.prototype._create_map_key = function(e, r) {
  return e + "_" + JSON.stringify(r);
};
x.prototype._remove_group_from_cache = function(e, r) {
  delete this._cached_groups[this._create_map_key(e, r)];
};
x.prototype.get_group = function(e, r) {
  var i = this._create_map_key(e, r), t = this._cached_groups[i];
  return (t === void 0 || t._group_key !== e || t._group_id !== r) && (t = new Fe(), t._init(this, e, r), this._cached_groups[i] = t), t;
};
x.prototype.track_pageview = xr(function(e, r) {
  typeof e != "object" && (e = {}), r = r || {};
  var i = r.event_name || "$mp_web_page_view", t = h.extend(
    h.info.mpPageViewProperties(),
    h.info.campaignParams(),
    h.info.clickParams()
  ), n = h.extend(
    {},
    t,
    e
  );
  return this.track(i, n);
});
x.prototype.track_links = function() {
  return this._track_dom.call(this, nn, arguments);
};
x.prototype.track_forms = function() {
  return this._track_dom.call(this, ks, arguments);
};
x.prototype.time_event = function(e) {
  if (h.isUndefined(e)) {
    this.report_error("No event name provided to mixpanel.time_event");
    return;
  }
  this._event_is_disabled(e) || this.persistence.set_event_timer(e, (/* @__PURE__ */ new Date()).getTime());
};
var ob = {
  persistent: !0
}, Xa = function(e) {
  var r;
  return h.isObject(e) ? r = e : h.isUndefined(e) ? r = {} : r = { days: e }, h.extend({}, ob, r);
};
x.prototype.register = function(e, r) {
  var i = Xa(r);
  i.persistent ? this.persistence.register(e, i.days) : h.extend(this.unpersisted_superprops, e);
};
x.prototype.register_once = function(e, r, i) {
  var t = Xa(i);
  t.persistent ? this.persistence.register_once(e, r, t.days) : (typeof r > "u" && (r = "None"), h.each(e, function(n, s) {
    (!this.unpersisted_superprops.hasOwnProperty(s) || this.unpersisted_superprops[s] === r) && (this.unpersisted_superprops[s] = n);
  }, this));
};
x.prototype.unregister = function(e, r) {
  r = Xa(r), r.persistent ? this.persistence.unregister(e) : delete this.unpersisted_superprops[e];
};
x.prototype._register_single = function(e, r) {
  var i = {};
  i[e] = r, this.register(i);
};
x.prototype.identify = function(e, r, i, t, n, s, o, a) {
  var c = this.get_distinct_id();
  if (e && c !== e) {
    if (typeof e == "string" && e.indexOf(Ja) === 0)
      return this.report_error("distinct_id cannot have $device: prefix"), -1;
    this.register({ $user_id: e });
  }
  if (!this.get_property("$device_id")) {
    var l = c;
    this.register_once({
      $had_persisted_distinct_id: !0,
      $device_id: l
    }, "");
  }
  e !== c && e !== this.get_property(as) && (this.unregister(as), this.register({ distinct_id: e })), this._flags.identify_called = !0, this.people._flush(r, i, t, n, s, o, a), e !== c && this.track("$identify", {
    distinct_id: e,
    $anon_distinct_id: c
  }, { skip_hooks: !0 }), e !== c && this.flags.fetchFlags();
};
x.prototype.reset = function() {
  this.stop_session_recording(), this.persistence.clear(), this._flags.identify_called = !1;
  var e = h.UUID();
  this.register_once({
    distinct_id: Ja + e,
    $device_id: e
  }, ""), this._check_and_start_session_recording();
};
x.prototype.get_distinct_id = function() {
  return this.get_property("distinct_id");
};
x.prototype.alias = function(e, r) {
  if (e === this.get_property(md))
    return this.report_error("Attempting to create alias for existing People user - aborting."), -2;
  var i = this;
  return h.isUndefined(r) && (r = this.get_distinct_id()), e !== r ? (this._register_single(as, e), this.track("$create_alias", {
    alias: e,
    distinct_id: r
  }, {
    skip_hooks: !0
  }, function() {
    i.identify(e);
  })) : (this.report_error("alias matches current distinct_id - skipping api call."), this.identify(e), -1);
};
x.prototype.name_tag = function(e) {
  this._register_single("mp_name_tag", e);
};
x.prototype.set_config = function(e) {
  if (h.isObject(e)) {
    h.extend(this.config, e);
    var r = e.batch_size;
    r && h.each(this.request_batchers, function(i) {
      i.resetBatchSize();
    }), this.get_config("persistence_name") || (this.config.persistence_name = this.config.cookie_name), this.get_config("disable_persistence") || (this.config.disable_persistence = this.config.disable_cookie), this.persistence && this.persistence.update_config(this.config), Mt.DEBUG = Mt.DEBUG || this.get_config("debug"), ("autocapture" in e || "record_heatmap_data" in e) && this.autocapture && this.autocapture.init();
  }
};
x.prototype.get_config = function(e) {
  return this.config[e];
};
x.prototype._run_hook = function(e) {
  var r = (this.config.hooks[e] || ib).apply(this, lr.call(arguments, 1));
  return typeof r > "u" && (this.report_error(e + " hook did not return a value"), r = null), r;
};
x.prototype.get_property = function(e) {
  return this.persistence.load_prop([e]);
};
x.prototype.get_api_host = function(e) {
  return this.get_config("api_hosts")[e] || this.get_config("api_host");
};
x.prototype.toString = function() {
  var e = this.get_config("name");
  return e !== Nt && (e = Nt + "." + e), e;
};
x.prototype._event_is_disabled = function(e) {
  return h.isBlockedUA(Gt) || this._flags.disable_all_events || h.include(this.__disabled_events, e);
};
x.prototype._gdpr_init = function() {
  var e = this.get_config("opt_out_tracking_persistence_type") === "localStorage";
  e && h.localStorage.is_supported() && (!this.has_opted_in_tracking() && this.has_opted_in_tracking({ persistence_type: "cookie" }) && this.opt_in_tracking({ enable_persistence: !1 }), !this.has_opted_out_tracking() && this.has_opted_out_tracking({ persistence_type: "cookie" }) && this.opt_out_tracking({ clear_persistence: !1 }), this.clear_opt_in_out_tracking({
    persistence_type: "cookie",
    enable_persistence: !1
  })), this.has_opted_out_tracking() ? this._gdpr_update_persistence({ clear_persistence: !0 }) : !this.has_opted_in_tracking() && (this.get_config("opt_out_tracking_by_default") || h.cookie.get("mp_optout")) && (h.cookie.remove("mp_optout"), this.opt_out_tracking({
    clear_persistence: this.get_config("opt_out_persistence_by_default")
  }));
};
x.prototype._gdpr_update_persistence = function(e) {
  var r;
  if (e && e.clear_persistence)
    r = !0;
  else if (e && e.enable_persistence)
    r = !1;
  else
    return;
  !this.get_config("disable_persistence") && this.persistence.disabled !== r && this.persistence.set_disabled(r), r ? (this.stop_batch_senders(), this.stop_session_recording()) : this._batchers_were_started && this.start_batch_senders();
};
x.prototype._gdpr_call_func = function(e, r) {
  return r = h.extend({
    track: h.bind(this.track, this),
    persistence_type: this.get_config("opt_out_tracking_persistence_type"),
    cookie_prefix: this.get_config("opt_out_tracking_cookie_prefix"),
    cookie_expiration: this.get_config("cookie_expiration"),
    cross_site_cookie: this.get_config("cross_site_cookie"),
    cross_subdomain_cookie: this.get_config("cross_subdomain_cookie"),
    cookie_domain: this.get_config("cookie_domain"),
    secure_cookie: this.get_config("secure_cookie"),
    ignore_dnt: this.get_config("ignore_dnt")
  }, r), h.localStorage.is_supported() || (r.persistence_type = "cookie"), e(this.get_config("token"), {
    track: r.track,
    trackEventName: r.track_event_name,
    trackProperties: r.track_properties,
    persistenceType: r.persistence_type,
    persistencePrefix: r.cookie_prefix,
    cookieDomain: r.cookie_domain,
    cookieExpiration: r.cookie_expiration,
    crossSiteCookie: r.cross_site_cookie,
    crossSubdomainCookie: r.cross_subdomain_cookie,
    secureCookie: r.secure_cookie,
    ignoreDnt: r.ignore_dnt
  });
};
x.prototype.opt_in_tracking = function(e) {
  e = h.extend({
    enable_persistence: !0
  }, e), this._gdpr_call_func(u_, e), this._gdpr_update_persistence(e);
};
x.prototype.opt_out_tracking = function(e) {
  e = h.extend({
    clear_persistence: !0,
    delete_user: !0
  }, e), e.delete_user && this.people && this.people._identify_called() && (this.people.delete_user(), this.people.clear_charges()), this._gdpr_call_func(f_, e), this._gdpr_update_persistence(e);
};
x.prototype.has_opted_in_tracking = function(e) {
  return this._gdpr_call_func(d_, e);
};
x.prototype.has_opted_out_tracking = function(e) {
  return this._gdpr_call_func(Wf, e);
};
x.prototype.clear_opt_in_out_tracking = function(e) {
  e = h.extend({
    enable_persistence: !0
  }, e), this._gdpr_call_func(h_, e), this._gdpr_update_persistence(e);
};
x.prototype.report_error = function(e, r) {
  be.error.apply(be.error, arguments);
  try {
    !r && !(e instanceof Error) && (e = new Error(e)), this.get_config("error_reporter")(e, r);
  } catch (i) {
    be.error(i);
  }
};
x.prototype.init = x.prototype.init;
x.prototype.reset = x.prototype.reset;
x.prototype.disable = x.prototype.disable;
x.prototype.time_event = x.prototype.time_event;
x.prototype.track = x.prototype.track;
x.prototype.track_links = x.prototype.track_links;
x.prototype.track_forms = x.prototype.track_forms;
x.prototype.track_pageview = x.prototype.track_pageview;
x.prototype.register = x.prototype.register;
x.prototype.register_once = x.prototype.register_once;
x.prototype.unregister = x.prototype.unregister;
x.prototype.identify = x.prototype.identify;
x.prototype.alias = x.prototype.alias;
x.prototype.name_tag = x.prototype.name_tag;
x.prototype.set_config = x.prototype.set_config;
x.prototype.get_config = x.prototype.get_config;
x.prototype.get_api_host = x.prototype.get_api_host;
x.prototype.get_property = x.prototype.get_property;
x.prototype.get_distinct_id = x.prototype.get_distinct_id;
x.prototype.toString = x.prototype.toString;
x.prototype.opt_out_tracking = x.prototype.opt_out_tracking;
x.prototype.opt_in_tracking = x.prototype.opt_in_tracking;
x.prototype.has_opted_out_tracking = x.prototype.has_opted_out_tracking;
x.prototype.has_opted_in_tracking = x.prototype.has_opted_in_tracking;
x.prototype.clear_opt_in_out_tracking = x.prototype.clear_opt_in_out_tracking;
x.prototype.get_group = x.prototype.get_group;
x.prototype.set_group = x.prototype.set_group;
x.prototype.add_group = x.prototype.add_group;
x.prototype.remove_group = x.prototype.remove_group;
x.prototype.track_with_groups = x.prototype.track_with_groups;
x.prototype.start_batch_senders = x.prototype.start_batch_senders;
x.prototype.stop_batch_senders = x.prototype.stop_batch_senders;
x.prototype.start_session_recording = x.prototype.start_session_recording;
x.prototype.stop_session_recording = x.prototype.stop_session_recording;
x.prototype.pause_session_recording = x.prototype.pause_session_recording;
x.prototype.resume_session_recording = x.prototype.resume_session_recording;
x.prototype.get_session_recording_properties = x.prototype.get_session_recording_properties;
x.prototype.get_session_replay_url = x.prototype.get_session_replay_url;
x.prototype.get_tab_id = x.prototype.get_tab_id;
x.prototype.DEFAULT_API_ROUTES = Sd;
x.prototype.__get_recorder = x.prototype.__get_recorder;
le.prototype.properties = le.prototype.properties;
le.prototype.update_search_keyword = le.prototype.update_search_keyword;
le.prototype.update_referrer_info = le.prototype.update_referrer_info;
le.prototype.get_cross_subdomain = le.prototype.get_cross_subdomain;
le.prototype.clear = le.prototype.clear;
var Vr = {}, ab = function() {
  h.each(Vr, function(e, r) {
    r !== Nt && (vt[r] = e);
  }), vt._ = h;
}, cb = function() {
  vt.init = function(e, r, i) {
    if (i)
      return vt[i] || (vt[i] = Vr[i] = oa(e, r, i), vt[i]._loaded()), vt[i];
    var t = vt;
    Vr[Nt] ? t = Vr[Nt] : e && (t = oa(e, r, Nt), t._loaded(), Vr[Nt] = t), vt = t, Ka === nb && (N[Nt] = vt), ab();
  };
}, lb = function() {
  function e() {
    e.done || (e.done = !0, xd = !0, wd = !1, h.each(Vr, function(t) {
      t._dom_loaded();
    }));
  }
  function r() {
    try {
      ie.documentElement.doScroll("left");
    } catch {
      setTimeout(r, 1);
      return;
    }
    e();
  }
  if (ie.addEventListener)
    ie.readyState === "complete" ? e() : ie.addEventListener("DOMContentLoaded", e, !1);
  else if (ie.attachEvent) {
    ie.attachEvent("onreadystatechange", e);
    var i = !1;
    try {
      i = N.frameElement === null;
    } catch {
    }
    ie.documentElement.doScroll && i && r();
  }
  h.register_event(N, "load", e, !0);
};
function ub(e) {
  return yd = e, Ka = _d, vt = new x(), cb(), vt.init(), lb(), vt;
}
function fb(e, r) {
  r();
}
var on = ub(fb);
let an = !1;
const Cd = () => {
  try {
    if (typeof window > "u")
      return !1;
    if (an)
      return !0;
    const e = window.marketplaceConfig || {};
    if (!e.data_consent_status)
      return console.log("[MixpanelTracking] Data consent not given. Mixpanel tracking disabled."), !1;
    const i = e.mixpanel || {}, t = i.token;
    if (!t || t === "")
      return console.warn(
        "[MixpanelTracking] No Mixpanel token provided. Add your token in MarketplaceController.php"
      ), !1;
    on.init(t, {
      debug: i.debug || !1,
      track_pageview: !1,
      // We'll handle page views manually
      persistence: "localStorage",
      // Disable automatic collection of potentially sensitive properties for privacy
      property_blacklist: [
        "$initial_referrer",
        "$initial_referring_domain",
        "$current_url",
        "$referrer",
        "$referring_domain",
        "mp_lib",
        "$lib_version",
        "$browser",
        "$browser_version",
        "$device",
        "$screen_height",
        "$screen_width",
        "$os",
        "$search_engine"
      ]
    });
    const n = i.distinctId;
    return console.log(
      "[MixpanelTracking] distinctId from config:",
      n,
      "Type:",
      typeof n
    ), n && n !== "" ? (on.identify(n), console.log("[MixpanelTracking] User identified with distinct_id:", n)) : console.warn(
      "[MixpanelTracking] No valid distinctId provided. Mixpanel will use auto-generated device ID."
    ), an = !0, console.log("[MixpanelTracking] Mixpanel initialized successfully"), !0;
  } catch (e) {
    return console.error("[MixpanelTracking] Error initializing Mixpanel:", e), !1;
  }
}, db = () => {
  try {
    return an && typeof on < "u";
  } catch (e) {
    return console.warn("[MixpanelTracking] Error checking Mixpanel availability:", e), !1;
  }
}, hb = () => {
  try {
    an && typeof on < "u" && (on.reset(), an = !1, console.log("[MixpanelTracking] Mixpanel tracking disabled"));
  } catch (e) {
    console.error("[MixpanelTracking] Error disabling Mixpanel:", e);
  }
}, pb = () => {
  try {
    if (typeof window > "u")
      return !1;
    const i = ((window.marketplaceConfig || {}).mixpanel || {}).token;
    return !i || i === "" ? (console.warn("[MixpanelTracking] No Mixpanel token provided. Cannot enable tracking."), !1) : (an = !1, Cd());
  } catch (e) {
    return console.error("[MixpanelTracking] Error enabling Mixpanel:", e), !1;
  }
}, vb = () => {
  try {
    if (typeof window > "u")
      return {};
    const i = ((window.marketplaceConfig || {}).mixpanel || {}).globalProperties || {}, n = new URLSearchParams(window.location.search).get("page") || "", s = {
      ...i,
      hit_type: "event",
      page: n || window.location.pathname,
      path: window.location.pathname + window.location.search,
      referrer: document.referrer.split("/").filter(Boolean).pop() || ""
    };
    return Object.fromEntries(
      Object.entries(s).filter(([o, a]) => !(a === "" || a === null || a === void 0 || Array.isArray(a) && a.length === 0))
    );
  } catch (e) {
    return console.error("[MixpanelTracking] Error building global properties:", e), {};
  }
}, kd = (e, r = {}) => {
  try {
    if (!db())
      return;
    const i = {
      ...vb(),
      ...r
    };
    on.track(e, i), console.log("[MixpanelTracking] Event tracked:", e, i);
  } catch (i) {
    console.error("[MixpanelTracking] Error tracking event:", e, i);
  }
}, On = ({
  pluginSlug: e,
  pluginName: r,
  category: i,
  itemName: t,
  isContentRendered: n = !0,
  contentReceivedAt: s = null,
  contentRenderedAt: o = null,
  isCached: a = !1
} = {}) => {
  try {
    const c = Date.now(), l = {
      content_received_at: s || c,
      is_content_rendered: n,
      is_cached: a
    };
    n && (l.content_rendered_at = o || c), t ? l.item_name = t : e && (l.item_name = e), e && (l.product_slug = e), r && (l.product_name = r), i && (l.item_category = i), kd("Page Viewed", l);
  } catch (c) {
    console.error("[MixpanelTracking] Error tracking page view:", c);
  }
}, gb = (e) => {
  if (!e) return {};
  const r = {
    product_slug: e.slug || "",
    product_name: e.name || ""
    // Note: item_name is NOT included here by default
    // It should be set contextually by the calling function
  };
  if (e.categories && e.categories.length > 0) {
    const i = typeof e.categories[0] == "object" ? e.categories[0].slug || e.categories[0].title : e.categories[0];
    r.item_category = i;
  }
  return e.licenseType && (r.license_type = e.licenseType), e.priceAmount !== void 0 && (r.price_amount = e.priceAmount), e.priceCurrency && (r.price_currency = e.priceCurrency), r;
}, Et = ({
  buttonName: e,
  buttonAction: r,
  plugin: i = null,
  context: t = {}
} = {}) => {
  try {
    const n = {
      button_name: e || "",
      button_action: r || "",
      item_name: e || "",
      // item_name should be the button name
      timestamp: Date.now()
    };
    i && Object.assign(n, gb(i)), Object.assign(n, t), kd("Button Clicked", n);
  } catch (n) {
    console.error("[MixpanelTracking] Error tracking button click:", n);
  }
}, mb = (e = null, r = null, i = !1) => {
  try {
    On({
      category: "marketplace_home",
      itemName: "Catalog Page",
      // Set item_name to 'Catalog page' for marketplace listing
      contentReceivedAt: e,
      contentRenderedAt: r,
      isCached: i
    });
  } catch (t) {
    console.error("[MixpanelTracking] Error tracking marketplace visit:", t);
  }
}, yb = (e, r = null, i = null, t = !1) => {
  try {
    if (!e) {
      console.warn("[MixpanelTracking] Plugin object required for tracking detail visit");
      return;
    }
    const n = e.categories && e.categories.length > 0 ? typeof e.categories[0] == "object" ? e.categories[0].slug || e.categories[0].title : e.categories[0] : "";
    On({
      pluginSlug: e.slug,
      pluginName: e.name,
      category: n,
      itemName: "Product Page",
      // Set item_name to 'Product page' for plugin detail page
      contentReceivedAt: r,
      contentRenderedAt: i,
      isCached: t
    });
  } catch (n) {
    console.error("[MixpanelTracking] Error tracking plugin detail visit:", n);
  }
}, _b = (e, r) => {
  if (!e) return !0;
  const i = String(e).split("."), t = String(r).split(".");
  for (let n = 0; n < Math.max(i.length, t.length); n++) {
    const s = parseInt(i[n] || 0, 10), o = parseInt(t[n] || 0, 10);
    if (s > o) return !0;
    if (s < o) return !1;
  }
  return !0;
}, Ed = Pl(null), bb = ({
  children: e,
  apiBaseUrl: r,
  useWPHandlers: i,
  wpConfig: t,
  enableDefaultStyles: n,
  assetsBaseUrl: s
}) => {
  var at;
  const [o, a] = Je({}), [c, l] = Je({}), [f, u] = Je({}), [d, v] = Je([]), [p, _] = Je({}), [m, y] = Je(""), [b, S] = Je(""), [E, C] = Je({ visible: !1, type: null, pluginSlug: null }), [A, I] = Je({ visible: !1, type: null, pluginSlug: null }), [M, D] = Je({
    visible: !1,
    type: null,
    pluginSlug: null
  }), [L, j] = Je(!1), [k, P] = Je(!1), [G, F] = Je(!0), [ae, ue] = Je(() => {
    var U;
    const O = typeof window < "u" && ((U = window.marketplaceConfig) == null ? void 0 : U.data_consent_status);
    return console.log(
      "[MarketplaceContext] Initializing with consent status from config:",
      O,
      "Type:",
      typeof O
    ), O === !0 || O === "true" || O === "1" || O === 1;
  });
  lt({});
  const K = lt(null), re = (typeof window < "u" && ((at = window.marketplaceConfig) == null ? void 0 : at.brand)) === "onecom", Me = qr(() => {
    var O;
    return typeof window < "u" && ((O = window.marketplaceConfig) != null && O.activePlugins) ? window.marketplaceConfig.activePlugins : [];
  }, []), Oe = qr(() => {
    var O;
    return typeof window < "u" && ((O = window.marketplaceConfig) != null && O.activeThemeAuthor) ? window.marketplaceConfig.activeThemeAuthor : "";
  }, []), Pe = qr(() => {
    var O;
    return typeof window < "u" && ((O = window.marketplaceConfig) != null && O.wpVersion) ? window.marketplaceConfig.wpVersion : "";
  }, []);
  ft(() => {
    ae === !0 ? (console.log("[MarketplaceContext] Initial consent is true - initializing Mixpanel"), Cd()) : console.log("[MarketplaceContext] Initial consent is false - Mixpanel will not initialize");
    const O = (V) => {
      var R;
      const H = ((R = V.detail) == null ? void 0 : R.data_consent_status) !== void 0 ? V.detail.data_consent_status : !1;
      console.log(
        "[MarketplaceContext] Consent change detected via onConsentStatusChanged event:",
        H
      ), ue(H), H === !0 ? (console.log("[MarketplaceContext] Consent granted - enabling Mixpanel tracking"), typeof window < "u" && window.marketplaceConfig && (window.marketplaceConfig.data_consent_status = !0), pb()) : (console.log("[MarketplaceContext] Consent revoked - disabling Mixpanel tracking"), typeof window < "u" && window.marketplaceConfig && (window.marketplaceConfig.data_consent_status = !1), hb());
    };
    window.addEventListener("onConsentStatusChanged", O);
    const U = (V) => {
      if (V.key === "onecom_data_consent_status") {
        const H = V.newValue === "1";
        console.log(
          "[MarketplaceContext] Consent change detected via storage event (cross-page):",
          H
        ), O({ detail: { data_consent_status: H } });
      }
    };
    return window.addEventListener("storage", U), () => {
      window.removeEventListener("onConsentStatusChanged", O), window.removeEventListener("storage", U);
    };
  }, [ae]);
  const Se = zt(
    async (O) => {
      var U, V;
      if (re && X(O)) {
        u((H) => ({ ...H, [O]: !0 }));
        try {
          const H = typeof window.marketplaceConfig < "u" && ((V = (U = window.marketplaceConfig) == null ? void 0 : U.wpConfig) == null ? void 0 : V.ajaxUrl);
          if (!H) {
            console.warn("ajaxUrl not available in marketplaceConfig"), u((J) => ({ ...J, [O]: !1 }));
            return;
          }
          console.log(`[MarketplaceContext] Fetching subscription status for ${O}`);
          const R = new FormData();
          R.append("action", "get_addon_purchase_status"), R.append("addon_purchase_check", "true"), R.append("addon_slug", O);
          const Z = await (await fetch(H, {
            method: "POST",
            body: R
          })).json();
          console.log(`[MarketplaceContext] Subscription status response for ${O}:`, Z), l((J) => ({ ...J, [O]: Z.is_purchased }));
        } catch (H) {
          console.error(
            `[MarketplaceContext] Failed to fetch subscription status for ${O}`,
            H
          ), l((R) => ({ ...R, [O]: !1 }));
        } finally {
          u((H) => ({ ...H, [O]: !1 }));
        }
      }
    },
    [re, X]
  ), We = zt(() => {
    K.current && (clearTimeout(K.current), K.current = null);
  }, []), X = zt((O) => O === "wp-rocket" || O === "seo-by-rank-math-pro", []), qe = zt(
    (O) => _b(Pe, O),
    [Pe]
  ), Ge = zt(
    (O) => !O || !re ? !1 : X(O.slug) && !O.installed && c[O.slug] === !0,
    [re, c, X]
  ), He = zt(
    (O) => {
      if (!O.rules)
        return !0;
      if (O.rules.mustHavePlugins && Array.isArray(O.rules.mustHavePlugins)) {
        if (O.rules.mustHavePlugins.length === 0)
          return !0;
        if (!O.rules.mustHavePlugins.some(
          (V) => Me.includes(V)
        ))
          return !1;
      }
      if (O.rules.mustHaveThemesByAuthor && typeof O.rules.mustHaveThemesByAuthor == "string") {
        const U = O.rules.mustHaveThemesByAuthor;
        if (Oe !== U)
          return !1;
      }
      return !0;
    },
    [Me, Oe]
  ), Ye = zt(
    async (O, U) => {
      var Z, J, ze, ct, ht, It, z, Q, Le, pt, je, Ot;
      const V = O === "activate" && U.slug === "imagify";
      a((me) => ({ ...me, [U.slug]: !0 }));
      let H = !1;
      const R = U.name || U.slug;
      let Y = "";
      if (O === "activate" ? Y = (((Z = p == null ? void 0 : p.notifications) == null ? void 0 : Z.activating) || "Activating {0}").replace("{0}", R) + "..." : O === "deactivate" ? Y = (((J = p == null ? void 0 : p.notifications) == null ? void 0 : J.deactivating) || "Deactivating {0}").replace("{0}", R) + "..." : O === "install" ? Y = (((ze = p == null ? void 0 : p.notifications) == null ? void 0 : ze.installing) || "Installing {0}").replace("{0}", R) + "..." : O === "delete" ? Y = (((ct = p == null ? void 0 : p.notifications) == null ? void 0 : ct.deleting) || "Deleting {0}").replace("{0}", R) + "..." : Y = `${O.charAt(0).toUpperCase() + (O.endsWith("e") ? O.slice(1, -1) : O.slice(1)) + "ing"} ${R}`, y(Y), S(""), V) {
        let me = `${r}/${O}/${U.slug}`;
        const ut = `download_url=${encodeURIComponent(U.download || "")}`;
        i ? me = `${t.ajaxUrl}?action=marketplace_${O}_plugin&_wpnonce=${t.nonce}&nonce=${t.nonce}&slug=${U.slug}&${ut}` : me = me + (me.includes("?") ? "&" : "?") + ut, setTimeout(() => {
          fetch(me, { method: "POST" }).catch((At) => {
            console.log("Imagify activation request initiated, reload will proceed");
          }), setTimeout(() => {
            C({ visible: !0, type: "activated", pluginSlug: U.slug }), D({ visible: !0, type: "activate", pluginSlug: U.slug }), Et({
              buttonName: "Activate",
              buttonAction: "product_activate",
              plugin: U,
              context: {
                action: O,
                result: "success",
                special_case: "imagify_redirect"
              }
            });
          }, 1e3), setTimeout(() => {
            y(""), S("");
          }, 1100), setTimeout(() => {
            v(
              (At) => At.map((Ae) => Ae.slug === U.slug ? { ...Ae, installed: !0, activated: !0 } : Ae)
            );
          }, 1200), K.current = setTimeout(() => {
            sessionStorage.setItem("mp_skip_page_view", "true"), window.location.reload();
          }, 5e3);
        }, 100);
        return;
      }
      try {
        let me = `${r}/${O}/${U.slug}`;
        const ut = `download_url=${encodeURIComponent(U.download || "")}`;
        i ? me = `${t.ajaxUrl}?action=marketplace_${O}_plugin&_wpnonce=${t.nonce}&nonce=${t.nonce}&slug=${U.slug}&${ut}` : me = me + (me.includes("?") ? "&" : "?") + ut;
        const Ae = await (await fetch(me, { method: "POST" })).json();
        Ae.success ? (v(
          (de) => de.map((Ie) => Ie.slug === U.slug ? { ...Ie, installed: Ae.data.installed, activated: Ae.data.activated } : O === "deactivate" && U.slug === "seo-by-rank-math" && Ie.slug === "seo-by-rank-math-pro" ? { ...Ie, activated: !1 } : O === "activate" && U.slug === "seo-by-rank-math-pro" && Ie.slug === "seo-by-rank-math" ? { ...Ie, activated: !0 } : Ie)
        ), O === "install" && Ae.data.installed ? (C({ visible: !0, type: "installed", pluginSlug: U.slug }), Et({
          buttonName: "Install",
          buttonAction: "product_install",
          plugin: U,
          context: {
            action: O,
            result: "success"
          }
        })) : O === "delete" && !Ae.data.installed ? (C({ visible: !0, type: "deleted", pluginSlug: U.slug }), D({ visible: !0, type: "delete", pluginSlug: U.slug }), Et({
          buttonName: "Delete",
          buttonAction: "product_delete",
          plugin: U,
          context: {
            action: O,
            result: "success"
          }
        })) : O === "activate" && Ae.data.activated ? (H = !0, C({ visible: !0, type: "activated", pluginSlug: U.slug }), D({ visible: !0, type: "activate", pluginSlug: U.slug }), Et({
          buttonName: "Activate",
          buttonAction: "product_activate",
          plugin: U,
          context: {
            action: O,
            result: "success"
          }
        }), K.current = setTimeout(() => {
          sessionStorage.setItem("mp_skip_page_view", "true"), window.location.reload();
        }, 3e3), y(""), S("")) : O === "deactivate" && !Ae.data.activated && (H = !0, D({ visible: !0, type: "deactivate", pluginSlug: U.slug }), Et({
          buttonName: "Deactivate",
          buttonAction: "product_deactivate",
          plugin: U,
          context: {
            action: O,
            result: "success"
          }
        }), K.current = setTimeout(() => {
          sessionStorage.setItem("mp_skip_page_view", "true"), window.location.reload();
        }, 3e3), y(""), S(""))) : O === "activate" ? (I({ visible: !0, type: "activate", pluginSlug: U.slug }), Et({
          buttonName: "Activate",
          buttonAction: "product_activate",
          plugin: U,
          context: {
            action: O,
            result: "error",
            error_message: ((ht = Ae.data) == null ? void 0 : ht.message) || ((It = p == null ? void 0 : p.notifications) == null ? void 0 : It.pluginActivationFailed) || "Activation failed"
          }
        })) : O === "deactivate" ? (I({ visible: !0, type: "deactivate", pluginSlug: U.slug }), Et({
          buttonName: "Deactivate",
          buttonAction: "product_deactivate",
          plugin: U,
          context: {
            action: O,
            result: "error",
            error_message: ((z = Ae.data) == null ? void 0 : z.message) || ((Q = p == null ? void 0 : p.notifications) == null ? void 0 : Q.pluginDeactivationFailed) || "Deactivation failed"
          }
        })) : O === "install" ? (I({ visible: !0, type: "install", pluginSlug: U.slug }), Et({
          buttonName: "Install",
          buttonAction: "product_install",
          plugin: U,
          context: {
            action: O,
            result: "error",
            error_message: ((Le = Ae.data) == null ? void 0 : Le.message) || "Installation failed"
          }
        })) : O === "delete" ? (I({ visible: !0, type: "delete", pluginSlug: U.slug }), Et({
          buttonName: "Delete",
          buttonAction: "product_delete",
          plugin: U,
          context: {
            action: O,
            result: "error",
            error_message: ((pt = Ae.data) == null ? void 0 : pt.message) || ((je = p == null ? void 0 : p.notifications) == null ? void 0 : je.pluginDeletionFailed) || "Deletion failed"
          }
        })) : alert(((Ot = Ae.data) == null ? void 0 : Ot.message) || "Failed to perform action");
      } catch (me) {
        console.error("Plugin action failed", me), (O === "activate" || O === "install" || O === "delete") && Et({
          buttonName: O === "activate" ? "Activate" : O === "install" ? "Install" : "Delete",
          buttonAction: O === "activate" ? "product_activate" : O === "install" ? "product_install" : "product_delete",
          plugin: U,
          context: {
            action: O,
            result: "error",
            error_message: me.message || "Network error"
          }
        });
      } finally {
        H || a((me) => ({ ...me, [U.slug]: !1 })), y(""), S("");
      }
    },
    [r, i, t, p]
  ), ot = {
    apiBaseUrl: r,
    useWPHandlers: i,
    wpConfig: t,
    enableDefaultStyles: n,
    assetsBaseUrl: s,
    pluginInAction: o,
    setPluginInAction: a,
    subscriptionStatus: c,
    isCheckingSubscription: f,
    fetchSubscriptionStatus: Se,
    isOnecomBrand: re,
    plugins: d,
    setPlugins: v,
    uiI18n: p,
    setUiI18n: _,
    handlePluginAction: Ye,
    cancelReload: We,
    loadingAction: m,
    loadingPlugin: b,
    noticeState: E,
    setNoticeState: C,
    errorState: A,
    setErrorState: I,
    successState: M,
    setSuccessState: D,
    allPluginsActivated: L,
    setAllPluginsActivated: j,
    catalogError: k,
    setCatalogError: P,
    catalogLoading: G,
    setCatalogLoading: F,
    shouldShowProvision: Ge,
    isSpecialPlugin: X,
    shouldShowPlugin: He,
    isWpVersionSupported: qe,
    wpVersion: Pe,
    activePlugins: Me,
    activeThemeAuthor: Oe
  };
  return /* @__PURE__ */ g.jsx(Ed.Provider, { value: ot, children: e });
}, Lt = () => {
  const e = Ll(Ed);
  if (!e)
    throw new Error("useMarketplace must be used within MarketplaceProvider");
  return e;
}, Id = (e, r = !1) => {
  var s;
  let i = e.redirectUrl;
  const t = e.slug === "seo-by-rank-math" || e.slug === "seo-by-rank-math-pro", n = e.onboardingUrl && typeof e.onboardingUrl == "string" && e.onboardingUrl.trim() !== "";
  if (t) {
    const o = (s = window.marketplaceConfig) == null ? void 0 : s.wpConfig;
    !(o ? o.rankMathRegistrationSkip === !0 : !1) && n && (i = e.onboardingUrl);
  } else r && n && (i = e.onboardingUrl);
  return i;
}, Od = (e) => {
  var r, i;
  if (e && e.trim() !== "") {
    const t = typeof window.marketplaceConfig < "u" && ((i = (r = window.marketplaceConfig) == null ? void 0 : r.wpConfig) == null ? void 0 : i.adminUrl);
    if (t) {
      let n = e;
      n.startsWith("wp-admin/") && (n = n.substring(9));
      const s = `${t}${n}`;
      window.location.href = s;
    } else {
      const s = `${window.location.origin}/${e}`;
      window.location.href = s;
    }
    return;
  }
  window.location.href = "/wp-admin/plugins.php";
};
function aa({ plugin: e }) {
  var E, C, A, I, M, D;
  const {
    assetsBaseUrl: r,
    pluginInAction: i,
    subscriptionStatus: t,
    isCheckingSubscription: n,
    isOnecomBrand: s,
    handlePluginAction: o,
    uiI18n: a,
    isSpecialPlugin: c
  } = Lt(), l = t[e.slug], f = n[e.slug], u = r || typeof window.marketplaceConfig < "u" && ((E = window.marketplaceConfig) == null ? void 0 : E.assetsBaseUrl) || "", d = u ? `${u}assets/` : "", v = (L) => {
    const j = !e.installed;
    if (s && c(e.slug) && j && L === "install") {
      Et({
        buttonName: "Install",
        buttonAction: "product_install",
        plugin: e,
        context: {
          action: L,
          result: "initiated"
        }
      });
      const k = new CustomEvent("onecom-plugin-provision", {
        detail: {
          slug: e.slug
        },
        bubbles: !0,
        cancelable: !0,
        composed: !0
      });
      document.dispatchEvent(k);
      return;
    }
    o(L, e);
  }, p = () => {
    Et({
      buttonName: "Select",
      buttonAction: "subscribe_addon",
      plugin: e
    });
    const L = new CustomEvent("onecom-subscribe-addon", {
      detail: { slug: e.slug },
      bubbles: !0,
      cancelable: !0,
      composed: !0
    });
    document.dispatchEvent(L);
  }, _ = () => {
    Et({
      buttonName: "Manage",
      buttonAction: "manage_product",
      context: {
        product_slug: e.slug,
        product_name: e.name,
        has_redirect_url: !!(e.redirectUrl && e.redirectUrl.trim() !== ""),
        has_onboarding_url: !!(e.onboardingUrl && e.onboardingUrl.trim() !== "")
      }
    });
    const L = Id(e, !1);
    Od(L);
  }, m = (L, j) => L ? L.replace("{0}", j || "") : "", y = (e == null ? void 0 : e.name) || "", b = s && c(e.slug) && !e.installed && l === !1, S = s && c(e.slug) && !e.installed && (f || l === void 0);
  return /* @__PURE__ */ g.jsx("div", { className: "plugin-actions gv-mt-md", children: S ? /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-heading-md" }) : b ? /* @__PURE__ */ g.jsx(
    "button",
    {
      type: "button",
      className: "gv-button gv-button-primary",
      onClick: p,
      disabled: f,
      children: "Select"
    }
  ) : e.installed ? e.activated ? /* @__PURE__ */ g.jsxs("button", { type: "button", className: "gv-button gv-button-primary", onClick: _, children: [
    /* @__PURE__ */ g.jsx("span", { children: ((C = a == null ? void 0 : a.labels) == null ? void 0 : C.manage) || "Manage" }),
    /* @__PURE__ */ g.jsx("gv-icon", { "aria-hidden": "true", src: `${d}icons/arrow_right.svg` })
  ] }) : /* @__PURE__ */ g.jsx(
    "button",
    {
      className: "gv-button gv-button-primary",
      disabled: i[e.slug],
      onClick: () => v("activate"),
      children: i[e.slug] ? m(((A = a == null ? void 0 : a.notifications) == null ? void 0 : A.activating) || "Activating {0}", y) : (a == null ? void 0 : a.activateButton) || ((I = e.i18n) == null ? void 0 : I.activateButton) || "Activate"
    }
  ) : /* @__PURE__ */ g.jsx(
    "button",
    {
      className: `gv-button ${e.slug === "seo-by-rank-math" ? "gv-button-secondary" : "gv-button-primary"}`,
      disabled: i[e.slug],
      onClick: () => v("install"),
      children: i[e.slug] ? m(((M = a == null ? void 0 : a.notifications) == null ? void 0 : M.installing) || "Installing {0}", y) : (a == null ? void 0 : a.installButton) || ((D = e.i18n) == null ? void 0 : D.installButton) || "Install"
    }
  ) });
}
function Ad({ plugin: e }) {
  var m, y, b, S, E;
  const { assetsBaseUrl: r, noticeState: i, setNoticeState: t, handlePluginAction: n, cancelReload: s, uiI18n: o } = Lt();
  if (!i || !i.visible || i.pluginSlug !== (e == null ? void 0 : e.slug))
    return null;
  const a = r || typeof window.marketplaceConfig < "u" && ((m = window.marketplaceConfig) == null ? void 0 : m.assetsBaseUrl) || "", c = a ? `${a}assets/` : "", l = () => {
    t({ visible: !1, type: null, pluginSlug: null });
  }, f = () => {
    n("activate", e);
  }, u = () => {
    Et({
      buttonName: "Get started",
      buttonAction: "manage_product",
      plugin: e,
      context: {
        product_slug: e.slug,
        product_name: e.name,
        has_redirect_url: !!(e.redirectUrl && e.redirectUrl.trim() !== ""),
        has_onboarding_url: !!(e.onboardingUrl && e.onboardingUrl.trim() !== "")
      }
    }), s();
    const C = Id(e, !0);
    Od(C);
  }, d = i.type === "installed", v = i.type === "activated", p = (C, A) => C ? C.replace("{0}", A || "") : "", _ = (e == null ? void 0 : e.name) || "";
  return /* @__PURE__ */ g.jsxs(
    "div",
    {
      className: "gv-notice gv-notice-success gv-p-lg gv-max-mob-pt-lg gv-mb-0 gv-mt-lg",
      style: { gridColumn: "1 / -1", width: "100%" },
      children: [
        /* @__PURE__ */ g.jsx("img", { className: "gv-notice-icon", src: `${c}icons/success.svg`, alt: "Success" }),
        /* @__PURE__ */ g.jsxs("div", { className: "gv-notice-content", children: [
          /* @__PURE__ */ g.jsxs("div", { className: "gv-notice-title", children: [
            d && p(
              ((y = o == null ? void 0 : o.notifications) == null ? void 0 : y.pluginInstalled) || "Plugin was installed.",
              _
            ),
            v && p(
              ((b = o == null ? void 0 : o.notifications) == null ? void 0 : b.pluginActivated) || "Plugin was activated.",
              _
            )
          ] }),
          /* @__PURE__ */ g.jsxs("p", { className: "gv-text-sm", children: [
            d && (((S = o == null ? void 0 : o.notifications) == null ? void 0 : S.activateNow) || "Activate it now to start using it."),
            v && p(
              ((E = o == null ? void 0 : o.notifications) == null ? void 0 : E.manageInMyProducts) || "{0} plugin was activated for this site. You can manage it on the My products page.",
              _
            )
          ] })
        ] }),
        d && /* @__PURE__ */ g.jsx(
          "button",
          {
            type: "button",
            className: "gv-action gv-button gv-button-neutral",
            onClick: f,
            children: o == null ? void 0 : o.activatePluginButton
          }
        ),
        v && /* @__PURE__ */ g.jsxs(
          "button",
          {
            type: "button",
            className: "gv-action gv-button gv-button-neutral",
            onClick: u,
            children: [
              /* @__PURE__ */ g.jsx("span", { children: (o == null ? void 0 : o.featuredCta) || "Get Started" }),
              /* @__PURE__ */ g.jsx("gv-icon", { "aria-hidden": "true", src: `${c}icons/arrow_forward.svg` })
            ]
          }
        ),
        /* @__PURE__ */ g.jsx("button", { type: "button", className: "gv-notice-close", "aria-label": "Close", onClick: l, children: /* @__PURE__ */ g.jsx("gv-icon", { "aria-hidden": "true", src: `${c}icons/close.svg` }) })
      ]
    }
  );
}
function ca({ plugin: e }) {
  var y, b, S, E, C;
  const { assetsBaseUrl: r, errorState: i, setErrorState: t, uiI18n: n, plugins: s } = Lt(), o = e || s.find((A) => A.slug === i.pluginSlug), a = i && i.visible && i.pluginSlug === (o == null ? void 0 : o.slug), c = zt(() => {
    t({ visible: !1, type: null, pluginSlug: null });
  }, [t]);
  if (ft(() => {
    if (a) {
      const A = setTimeout(() => {
        c();
      }, 5e3);
      return () => clearTimeout(A);
    }
  }, [a, c]), !a)
    return null;
  const l = r || typeof window.marketplaceConfig < "u" && ((y = window.marketplaceConfig) == null ? void 0 : y.assetsBaseUrl) || "", f = l ? `${l}assets/` : "", u = i.type === "activate", d = i.type === "deactivate", v = i.type === "install", p = i.type === "delete", _ = (A, I) => A ? A.replace("{0}", I || "") : "", m = (o == null ? void 0 : o.name) || "";
  return /* @__PURE__ */ g.jsx("div", { className: "gv-toast-container", children: /* @__PURE__ */ g.jsxs("div", { className: "gv-toast gv-toast-alert gv-visible", children: [
    /* @__PURE__ */ g.jsx(
      "gv-icon",
      {
        className: "gv-notice-icon",
        "aria-hidden": "true",
        src: `${f}icons/error.svg`
      }
    ),
    /* @__PURE__ */ g.jsxs("div", { className: "gv-toast-content", children: [
      u && _(
        ((b = n == null ? void 0 : n.notifications) == null ? void 0 : b.pluginActivationFailed) || "Couldn't activate plugin.",
        m
      ),
      d && _(
        ((S = n == null ? void 0 : n.notifications) == null ? void 0 : S.pluginDeactivationFailed) || "Couldn't deactivate plugin.",
        m
      ),
      v && _(
        ((E = n == null ? void 0 : n.notifications) == null ? void 0 : E.pluginInstallationFailed) || "Couldn't install plugin.",
        m
      ),
      p && _(
        ((C = n == null ? void 0 : n.notifications) == null ? void 0 : C.pluginDeletionFailed) || "Couldn't delete plugin.",
        m
      )
    ] }),
    /* @__PURE__ */ g.jsx("button", { type: "button", className: "gv-toast-close", "aria-label": "Close", onClick: c, children: /* @__PURE__ */ g.jsx("gv-icon", { "aria-hidden": "true", src: `${f}icons/close.svg` }) })
  ] }) });
}
const wb = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  DKK: "kr",
  NOK: "kr",
  SEK: "kr"
  // Add more currencies here as needed
  // 'JPY': '¥',
}, Sb = ["DKK", "SEK", "NOK"], An = (e) => wb[e] || e, Rn = (e, r, i) => Sb.includes(i) ? `${e} ${r}` : `${r} ${e}`, Za = (e) => {
  if (e.prices && Array.isArray(e.prices) && e.prices.length > 0) {
    const r = e.prices.find((i) => i.priceType === "full");
    if (r && r.amount && r.currency) {
      const i = An(r.currency), t = Number(r.amount).toFixed(2);
      return Rn(t, i, r.currency);
    }
  }
  return null;
}, Rd = (e) => {
  if (e.prices && Array.isArray(e.prices) && e.prices.length > 0) {
    const r = e.prices.find((i) => i.priceType === "rebate");
    if (r && r.amount !== void 0 && r.amount !== null && r.currency) {
      const i = An(r.currency), t = Number(r.amount).toFixed(2);
      return Rn(t, i, r.currency);
    }
  }
  return null;
}, Es = (e, r = "Free", i = null) => {
  var n;
  if (e.licenseType === "free")
    return r;
  if (e.prices && Array.isArray(e.prices) && e.prices.length > 0) {
    const s = e.prices.find((a) => a.priceType === "rebate");
    if (s && e.licenseType === "premium") {
      if (s.amount === 0)
        return ((n = i == null ? void 0 : i.labels) == null ? void 0 : n.freeUntilRenewal) || "Free until renewal";
      if (s.amount && s.currency) {
        const a = An(s.currency), c = Number(s.amount).toFixed(2);
        return `${Rn(
          c,
          a,
          s.currency
        )} `;
      }
    }
    let o = e.prices.find(
      (a) => a.priceType === "full" && (a.isActive === !0 || a.isActive === void 0)
    );
    if (o || (o = e.prices.find((a) => a.isActive === !0)), o || (o = e.prices[0]), o && o.amount && o.currency) {
      const a = An(o.currency), c = Number(o.amount).toFixed(2);
      return Rn(c, a, o.currency);
    }
  }
  if (e.priceCurrency && e.priceAmount) {
    const s = An(e.priceCurrency), o = Number(e.priceAmount).toFixed(2);
    return Rn(o, s, e.priceCurrency);
  }
  return "";
};
function eo({ plugin: e, onClose: r, usePortal: i = !0, loading: t = !1 }) {
  var oe, re, Me, Oe, Pe, Se, We, X, qe, Ge, He, Ye, ot, at, O, U;
  const {
    assetsBaseUrl: n,
    useWPHandlers: s,
    pluginInAction: o,
    uiI18n: a,
    subscriptionStatus: c,
    isCheckingSubscription: l,
    setNoticeState: f,
    setErrorState: u
  } = Lt(), d = n || typeof window.marketplaceConfig < "u" && ((oe = window.marketplaceConfig) == null ? void 0 : oe.assetsBaseUrl) || "", v = d ? `${d}assets/icons/` : "";
  if (ft(() => {
    e && window.scrollTo(0, 0);
  }, [e]), ft(() => {
    e && (f({ visible: !1, type: null, pluginSlug: null }), u({ visible: !1, type: null, pluginSlug: null }));
  }, [e, f, u]), ft(() => {
    if (e) {
      const V = () => {
        f({ visible: !1, type: null, pluginSlug: null }), u({ visible: !1, type: null, pluginSlug: null });
      };
      return window.addEventListener("popstate", V), () => window.removeEventListener("popstate", V);
    }
  }, [e, f, u]), t) {
    const V = /* @__PURE__ */ g.jsx("div", { className: "gv-surface-dim", children: /* @__PURE__ */ g.jsxs("article", { className: "gv-layout-product gv-p-0 gv-product-single gv-w-max-container gv-mx-auto gv-p-fluid", children: [
      /* @__PURE__ */ g.jsx("nav", { className: "gv-breadcrumbs gv-area-nav gv-flex-col gv-items-start", children: /* @__PURE__ */ g.jsx("div", { className: "gv-flex gv-items-center gv-gap-xs", children: /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton", style: { width: "60px" } }) }) }),
      /* @__PURE__ */ g.jsxs("header", { className: "gv-product-header gv-area-header", children: [
        /* @__PURE__ */ g.jsxs("div", { className: "gv-content gv-stack-space-sm gv-text-sm", children: [
          /* @__PURE__ */ g.jsx(
            "div",
            {
              className: "gv-skeleton gv-heading-lg gv-mb-sm",
              style: { marginBottom: "24px" }
            }
          ),
          /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton" }),
          /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton" }),
          /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton", style: { width: "80%" } })
        ] }),
        /* @__PURE__ */ g.jsx("div", { className: "gv-image", children: /* @__PURE__ */ g.jsx("div", { className: "gv-card-image gv-h-full", style: { marginTop: "75px" }, children: /* @__PURE__ */ g.jsx(
          "div",
          {
            className: "gv-skeleton gv-radius-0 gv-h-full",
            style: { minHeight: "300px" }
          }
        ) }) })
      ] }),
      /* @__PURE__ */ g.jsx("section", { className: "gv-product-table gv-features-table gv-products-1 gv-area-table", children: /* @__PURE__ */ g.jsx("div", { className: "gv-table-container", children: /* @__PURE__ */ g.jsxs("div", { className: "gv-table", role: "table", children: [
        /* @__PURE__ */ g.jsx("div", { className: "gv-table-header", role: "rowgroup", children: /* @__PURE__ */ g.jsx("div", { className: "gv-table-row", role: "row", children: /* @__PURE__ */ g.jsxs("div", { className: "gv-product gv-p-0 oc-border-none", role: "columnheader", children: [
          /* @__PURE__ */ g.jsxs("div", { className: "gv-content", children: [
            /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-heading-md gv-mb-sm" }),
            /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton", style: { width: "70%" } })
          ] }),
          /* @__PURE__ */ g.jsxs("div", { className: "gv-bottom", children: [
            /* @__PURE__ */ g.jsx("div", { className: "gv-price-container", children: /* @__PURE__ */ g.jsx(
              "div",
              {
                className: "gv-skeleton",
                style: { width: "120px", height: "32px" }
              }
            ) }),
            /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-heading-md gv-mt-md" })
          ] })
        ] }) }) }),
        /* @__PURE__ */ g.jsxs("div", { className: "gv-section oc-left-border-0", role: "rowgroup", children: [
          /* @__PURE__ */ g.jsx("div", { className: "gv-section-header gv-table-row", role: "row", children: /* @__PURE__ */ g.jsx("div", { className: "gv-cell", role: "cell", children: /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-heading-md", style: { width: "150px" } }) }) }),
          [...Array(3)].map((H, R) => /* @__PURE__ */ g.jsx("div", { className: "gv-table-row", role: "row", children: /* @__PURE__ */ g.jsx("div", { className: "gv-cell", role: "cell", children: /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-text-sm gv-w-full" }) }) }, R))
        ] })
      ] }) }) }),
      /* @__PURE__ */ g.jsx("div", { className: "gv-area-details gv-grid gv-gap-fluid", children: /* @__PURE__ */ g.jsxs("section", { className: "gv-stack-space-md", children: [
        /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-heading-md gv-mb-md", style: { width: "180px" } }),
        /* @__PURE__ */ g.jsx("ul", { className: "gv-list-items gv-list-check gv-mode-condensed", children: [...Array(3)].map((H, R) => /* @__PURE__ */ g.jsx("li", { children: /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-text-sm" }) }, R)) })
      ] }) }),
      /* @__PURE__ */ g.jsx("div", { className: "gv-area-content gv-grid gv-gap-fluid", children: /* @__PURE__ */ g.jsxs("section", { className: "gv-text-sm gv-stack-space-md", children: [
        /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-heading-md gv-mb-md", style: { width: "250px" } }),
        /* @__PURE__ */ g.jsx("div", { className: "gv-grid gv-gap-lg gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3", children: [...Array(3)].map((H, R) => /* @__PURE__ */ g.jsxs("div", { className: "gv-item gv-stack-space-sm", children: [
          /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-heading-md gv-mb-sm" }),
          /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-text-sm gv-mb-xs" }),
          /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-text-sm" })
        ] }, R)) })
      ] }) })
    ] }) });
    return i ? ro(V, document.body) : V;
  }
  if (!e) return null;
  typeof window.onecomWpVars < "u" && ((re = window.onecomWpVars) != null && re.imageURL), e.thumbnail || `${d}`;
  const p = e.bannerUrl || e.image || e.thumbnail || "https://gravity.group.one/guide-images/product-image@2x.png", _ = e.name || "Product", m = ((Me = e.i18n) == null ? void 0 : Me.description) || ((Oe = e.i18n) == null ? void 0 : Oe.subtitle) || e.description || e.shortDescription || "No description available.", y = (Pe = e.i18n) == null ? void 0 : Pe.subtitle, b = e.licenseType === "free", S = ((Se = e.i18n) == null ? void 0 : Se.freeTrialText) || "", E = S && S.trim() !== "", C = ((We = e.i18n) == null ? void 0 : We.freeTrialPeriod) || "", A = C && C.trim() !== "", I = A || E ? ((X = a == null ? void 0 : a.headings) == null ? void 0 : X.freeTrial) || "Free trial*" : Es(e, ((qe = a == null ? void 0 : a.labels) == null ? void 0 : qe.free) || "Free", a), M = I === (((Ge = a == null ? void 0 : a.labels) == null ? void 0 : Ge.freeUntilRenewal) || "Free until renewal"), D = Za(e), L = Rd(e), j = (V, H) => {
    if (!V || typeof V != "object") return [];
    const R = [];
    let Y = 1;
    for (; V[`${H}${Y}`]; ) {
      const Z = V[`${H}${Y}`];
      Z && Z.trim() !== "" && R.push(Z), Y++;
    }
    return R;
  }, k = j(e.i18n, "keyBenefitContent"), P = j(e.i18n, "keyFeatureContent"), G = [];
  if (e.i18n && typeof e.i18n == "object") {
    let V = 1;
    for (; e.i18n[`coreFeatureTitle${V}`] || e.i18n[`coreFeatureContent${V}`]; ) {
      const H = e.i18n[`coreFeatureTitle${V}`], R = e.i18n[`coreFeatureContent${V}`];
      H && H.trim() !== "" && R && R.trim() !== "" && G.push({ name: H, desc: R }), V++;
    }
  }
  const F = P, ae = k, ue = G, K = /* @__PURE__ */ g.jsx("div", { className: "gv-surface-dim", children: /* @__PURE__ */ g.jsxs("article", { className: "gv-layout-product gv-p-0 gv-product-single gv-w-max-container gv-mx-auto gv-p-fluid", children: [
    /* @__PURE__ */ g.jsxs("nav", { className: "gv-breadcrumbs gv-area-nav gv-flex-col gv-items-start", children: [
      /* @__PURE__ */ g.jsxs(
        "button",
        {
          type: "button",
          onClick: (V) => {
            if (V.preventDefault(), !o[e.slug])
              if (typeof window < "u" && window.history && window.history.length > 1)
                try {
                  window.history.back();
                } catch {
                  r && r();
                }
              else r && r();
          },
          className: "gv-flex gv-items-center gv-gap-xs gv-reset-button",
          "aria-label": "Go back",
          style: {
            opacity: o[e.slug] ? 0.5 : 1,
            pointerEvents: o[e.slug] ? "none" : "auto",
            cursor: o[e.slug] ? "not-allowed" : "pointer"
          },
          "aria-disabled": o[e.slug] ? "true" : "false",
          children: [
            /* @__PURE__ */ g.jsx(
              "img",
              {
                style: { minWidth: "24px" },
                className: "gv-tile",
                src: `${v}arrow_back.svg`,
                alt: "Back to plugins"
              }
            ),
            /* @__PURE__ */ g.jsx("span", { children: "Back" })
          ]
        }
      ),
      /* @__PURE__ */ g.jsx(Ad, { plugin: e }),
      /* @__PURE__ */ g.jsx(ca, { plugin: e })
    ] }),
    /* @__PURE__ */ g.jsxs("header", { className: "gv-product-header gv-area-header", children: [
      /* @__PURE__ */ g.jsxs("div", { className: "gv-content gv-stack-space-md gv-text-sm", children: [
        /* @__PURE__ */ g.jsx("h3", { className: "gv-title gv-header-lg", children: _ }),
        /* @__PURE__ */ g.jsx("p", { className: "gv-text-sm", children: m })
      ] }),
      /* @__PURE__ */ g.jsx("div", { className: "gv-image", children: /* @__PURE__ */ g.jsxs("picture", { children: [
        /* @__PURE__ */ g.jsx("source", { media: "(min-width: 600px)", srcSet: `${p} 1x, ${p} 2x` }),
        /* @__PURE__ */ g.jsx("img", { src: p, srcSet: `${p} 1x, ${p} 2x`, alt: _ })
      ] }) })
    ] }),
    /* @__PURE__ */ g.jsx("section", { className: "gv-product-table gv-features-table gv-products-1 gv-area-table", children: /* @__PURE__ */ g.jsx("div", { className: "gv-table-container", children: /* @__PURE__ */ g.jsxs("div", { className: "gv-table", role: "table", children: [
      /* @__PURE__ */ g.jsx("div", { className: "gv-table-header", role: "rowgroup", children: /* @__PURE__ */ g.jsx("div", { className: "gv-table-row", role: "row", children: /* @__PURE__ */ g.jsxs("div", { className: "gv-product gv-p-0 oc-border-none", role: "columnheader", children: [
        /* @__PURE__ */ g.jsxs("div", { className: "gv-content", children: [
          /* @__PURE__ */ g.jsx("h3", { className: "gv-title", children: _ }),
          /* @__PURE__ */ g.jsx("p", { children: y })
        ] }),
        /* @__PURE__ */ g.jsxs("div", { className: "gv-bottom", children: [
          /* @__PURE__ */ g.jsxs("div", { className: "gv-price-container", children: [
            /* @__PURE__ */ g.jsx("div", { className: "gv-price", children: A || E ? /* @__PURE__ */ g.jsx("span", { className: "gv-price-text", children: I }) : /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
              /* @__PURE__ */ g.jsx("span", { className: "gv-price-text", children: e.licenseType === "premium" && L !== null ? L !== null ? L : D : I }),
              !b && !M && I && /* @__PURE__ */ g.jsxs("span", { className: "gv-period", children: [
                "/",
                (He = a == null ? void 0 : a.labels) == null ? void 0 : He.timeMonth
              ] })
            ] }) }),
            A || E ? /* @__PURE__ */ g.jsx("div", { className: "gv-price-info", children: /* @__PURE__ */ g.jsx("div", { className: "gv-info", children: S }) }) : !b && I && D && L !== null && /* @__PURE__ */ g.jsxs("div", { className: "gv-price-info", children: [
              /* @__PURE__ */ g.jsxs("div", { className: "gv-info", children: [
                a.labels.untilRenewal,
                " [",
                L,
                "]/",
                (Ye = a == null ? void 0 : a.labels) == null ? void 0 : Ye.timeMonth
              ] }),
              /* @__PURE__ */ g.jsxs("div", { className: "gv-info", children: [
                a.labels.afterThat,
                " [",
                D,
                "]/",
                (ot = a == null ? void 0 : a.labels) == null ? void 0 : ot.timeMonth
              ] })
            ] })
          ] }),
          s ? /* @__PURE__ */ g.jsx(aa, { plugin: e }) : e.download && /* @__PURE__ */ g.jsx(
            "a",
            {
              href: e.download,
              download: !0,
              className: "gv-button gv-button-secondary",
              children: "Download"
            }
          )
        ] })
      ] }) }) }),
      F.length > 0 && /* @__PURE__ */ g.jsxs("div", { className: "gv-section oc-left-border-0", role: "rowgroup", children: [
        /* @__PURE__ */ g.jsx("div", { className: "gv-section-header gv-table-row", role: "row", children: /* @__PURE__ */ g.jsx("div", { className: "gv-cell", role: "cell", children: /* @__PURE__ */ g.jsx("h4", { className: "gv-title", children: (a == null ? void 0 : a.keyFeatureHeading) || ((at = e.i18n) == null ? void 0 : at.keyFeatureHeading) }) }) }),
        F.map((V, H) => /* @__PURE__ */ g.jsx("div", { className: "gv-table-row", role: "row", children: /* @__PURE__ */ g.jsx("div", { className: "gv-cell", role: "cell", children: /* @__PURE__ */ g.jsx("span", { className: "gv-cell-text", children: V }) }) }, H))
      ] })
    ] }) }) }),
    /* @__PURE__ */ g.jsx("div", { className: "gv-area-details gv-grid gv-gap-fluid", children: ae.length > 0 && /* @__PURE__ */ g.jsxs("section", { className: "gv-stack-space-md", children: [
      /* @__PURE__ */ g.jsx("h2", { className: "gv-title gv-text-bold gv-text-lg", children: (a == null ? void 0 : a.benefitHeading) || ((O = e.i18n) == null ? void 0 : O.benefitHeading) || "Key benefits" }),
      /* @__PURE__ */ g.jsx("ul", { className: "gv-list-items gv-list-check gv-mode-condensed", children: ae.map((V, H) => /* @__PURE__ */ g.jsx("li", { children: V }, H)) })
    ] }) }),
    ue.length > 0 && /* @__PURE__ */ g.jsx("div", { className: "gv-area-content gv-grid gv-gap-fluid", children: /* @__PURE__ */ g.jsxs("section", { className: "gv-text-sm gv-stack-space-md", children: [
      /* @__PURE__ */ g.jsx("h2", { className: "gv-title gv-text-bold gv-text-lg", children: (a == null ? void 0 : a.featureOverviewHeading) || ((U = e.i18n) == null ? void 0 : U.featureOverviewHeading) || "Core features overview" }),
      /* @__PURE__ */ g.jsx("div", { className: "gv-grid gv-gap-lg gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3", children: ue.map((V, H) => /* @__PURE__ */ g.jsxs("div", { className: "gv-item gv-stack-space-sm", children: [
        /* @__PURE__ */ g.jsx("h3", { className: "gv-title gv-text-bold gv-text-lg", children: V.name }),
        /* @__PURE__ */ g.jsx("p", { className: "gv-text-sm", children: V.desc })
      ] }, H)) })
    ] }) })
  ] }) });
  return i ? ro(K, document.body) : K;
}
function to({
  plugin: e,
  onClose: r,
  usePortal: i = !0,
  loading: t = !1
}) {
  var Ge, He, Ye, ot, at, O, U, V, H, R, Y, Z, J, ze, ct, ht, It;
  const {
    assetsBaseUrl: n,
    useWPHandlers: s,
    pluginInAction: o,
    plugins: a,
    uiI18n: c,
    subscriptionStatus: l,
    isCheckingSubscription: f
  } = Lt(), u = n || typeof window.marketplaceConfig < "u" && ((Ge = window.marketplaceConfig) == null ? void 0 : Ge.assetsBaseUrl) || "", d = u ? `${u}assets/icons/` : "", v = lt(null), p = lt(null), _ = lt(null), m = lt(null), y = lt(null);
  lt([]);
  const [b, S] = Je(0);
  ft(() => {
    e && window.scrollTo(0, 0);
  }, [e]), ft(() => {
    if (!e) return;
    const z = v.current, Q = p.current, Le = _.current, pt = m.current, je = y.current;
    if (!z || !Q || !Le || !pt || !je) return;
    const Ot = Q.querySelector(".gv-previous"), me = Q.querySelector(".gv-next");
    let ut = !1, At = "top", Ae = !1, de = !1, Ie = !1, q = null, xe = !1;
    const ar = () => {
      const nt = z.scrollLeft, xt = z.offsetWidth, Dt = Math.round(nt / xt);
      if (S(Dt), Ot && (Dt === 0 ? Ot.classList.add("gv-disabled") : Ot.classList.remove("gv-disabled")), me) {
        const Xt = Math.round(z.scrollWidth / xt) - 1;
        Dt >= Xt ? me.classList.add("gv-disabled") : me.classList.remove("gv-disabled");
      }
    }, $t = () => {
      const nt = parseFloat(getComputedStyle(Le).paddingTop) || 0, Dt = pt.offsetHeight / 2, Xt = Dt + nt, Lr = window.innerHeight / 2 - Xt, ti = 2 * Dt;
      return Q.style.transform = `translateY(${Xt}px)`, Q.style.top = `${Lr}px`, Q.style.bottom = `${ti}px`, { bottomValue: ti, halfHeaderHeight: Dt };
    }, Kt = (nt) => {
      const xt = Le.getBoundingClientRect(), Xt = window.innerHeight - nt, Lr = xt.bottom <= Xt;
      Lr !== ut && (ut = Lr, ut ? Q.classList.add("gv-state-bottom") : Q.classList.remove("gv-state-bottom"));
    }, Jt = () => {
      if (Ie)
        return;
      let nt;
      Ae ? Ae && !de ? nt = "overlay" : nt = "bottom" : nt = "top", nt !== At && (Ie = !0, At = nt, At === "top" ? (je.classList.add("gv-state-top"), je.classList.remove("gv-state-overlay")) : At === "overlay" ? (je.classList.remove("gv-state-top"), je.classList.add("gv-state-overlay")) : (je.classList.remove("gv-state-top"), je.classList.remove("gv-state-overlay")), requestAnimationFrame(() => {
        setTimeout(() => {
          Ie = !1;
        }, 50);
      }));
    }, { bottomValue: fn } = $t();
    z.addEventListener("scroll", ar);
    const Qn = new IntersectionObserver(
      (nt) => {
        nt.forEach((xt) => {
          !xt.isIntersecting && xt.boundingClientRect.top < 0 ? Ae = !0 : (xt.isIntersecting || xt.boundingClientRect.top >= 0) && (Ae = !1), Jt();
        });
      },
      {
        threshold: [0, 1],
        rootMargin: "0px"
      }
    ), yt = document.createElement("div");
    yt.style.position = "absolute", yt.style.bottom = "0", yt.style.left = "0", yt.style.width = "1px", yt.style.height = "1px", yt.style.pointerEvents = "none", Le.style.position = "relative", Le.appendChild(yt);
    const ei = new IntersectionObserver(
      (nt) => {
        nt.forEach((xt) => {
          de = xt.isIntersecting, Jt();
        });
      },
      {
        threshold: [0],
        rootMargin: "-100px 0px 0px 0px"
      }
    );
    Qn.observe(je), ei.observe(yt);
    const dn = () => {
      xe || (xe = !0, requestAnimationFrame(() => {
        Kt(fn);
      }), q = setTimeout(() => {
        xe = !1;
      }, 100));
    }, hn = () => {
      const { bottomValue: nt } = $t();
      Kt(nt);
    };
    return window.addEventListener("scroll", dn), window.addEventListener("resize", hn), ar(), Kt(fn), Jt(), () => {
      q && clearTimeout(q), z.removeEventListener("scroll", ar), window.removeEventListener("scroll", dn), window.removeEventListener("resize", hn), Qn.disconnect(), ei.disconnect(), yt && yt.parentNode && yt.parentNode.removeChild(yt);
    };
  }, [e]);
  const E = () => {
    const z = v.current;
    if (!z) return;
    const Q = z.offsetWidth;
    z.scrollTo({
      left: z.scrollLeft - Q,
      behavior: "smooth"
    });
  }, C = () => {
    const z = v.current;
    if (!z) return;
    const Q = z.offsetWidth;
    z.scrollTo({
      left: z.scrollLeft + Q,
      behavior: "smooth"
    });
  }, A = (z) => {
    const Q = v.current;
    if (!Q) return;
    const Le = Q.offsetWidth;
    Q.scrollTo({
      left: Le * z,
      behavior: "smooth"
    });
  };
  if (!e) return null;
  const I = a.find((z) => z.slug === "seo-by-rank-math") || null, M = a.find((z) => z.slug === "seo-by-rank-math-pro") || null;
  typeof window.onecomWpVars < "u" && ((He = window.onecomWpVars) != null && He.imageURL), e.thumbnail || `${u}`;
  const D = e.bannerUrl || e.image || e.thumbnail || "https://gravity.group.one/guide-images/product-image@2x.png", L = (I == null ? void 0 : I.name) || e.name || "Product", j = ((Ye = I == null ? void 0 : I.i18n) == null ? void 0 : Ye.description) || ((ot = I == null ? void 0 : I.i18n) == null ? void 0 : ot.subtitle), k = (at = I == null ? void 0 : I.i18n) == null ? void 0 : at.subtitle, P = (M == null ? void 0 : M.name) || "Rank Math Pro", G = ((O = M == null ? void 0 : M.i18n) == null ? void 0 : O.subtitle) || ((U = M == null ? void 0 : M.i18n) == null ? void 0 : U.description), F = M ? Es(M, ((V = c == null ? void 0 : c.labels) == null ? void 0 : V.free) || "Free", c) : "", ae = F === (((H = c == null ? void 0 : c.labels) == null ? void 0 : H.freeUntilRenewal) || "Free until renewal"), ue = Za(M), K = (z, Q) => {
    if (!z || typeof z != "object") return [];
    const Le = [];
    let pt = 1;
    for (; z[`${Q}${pt}`]; ) {
      const je = z[`${Q}${pt}`];
      je && je.trim() !== "" && Le.push(je), pt++;
    }
    return Le;
  }, oe = (I == null ? void 0 : I.i18n) || e.i18n, re = K(oe, "keyBenefitContent"), Me = K(I == null ? void 0 : I.i18n, "keyFeatureContent"), Oe = K(M == null ? void 0 : M.i18n, "keyFeatureContent"), Pe = Math.max(Me.length, Oe.length), Se = [];
  if (oe && typeof oe == "object") {
    let z = 1;
    for (; oe[`coreFeatureTitle${z}`] || oe[`coreFeatureContent${z}`]; ) {
      const Q = oe[`coreFeatureTitle${z}`], Le = oe[`coreFeatureContent${z}`];
      Q && Q.trim() !== "" && Le && Le.trim() !== "" && Se.push({ name: Q, desc: Le }), z++;
    }
  }
  const We = re, X = Se, qe = /* @__PURE__ */ g.jsx("div", { className: "gv-surface-dim", children: /* @__PURE__ */ g.jsxs("article", { className: "gv-layout-product gv-w-max-container gv-mx-auto gv-p-fluid gv-p-0", children: [
    /* @__PURE__ */ g.jsxs("nav", { className: "gv-breadcrumbs gv-area-nav", children: [
      /* @__PURE__ */ g.jsxs(
        "button",
        {
          type: "button",
          className: "gv-reset-button",
          onClick: (z) => {
            if (z.preventDefault(), typeof window < "u" && window.history && window.history.length > 1)
              try {
                window.history.back();
              } catch {
                r && r();
              }
            else r && r();
          },
          children: [
            /* @__PURE__ */ g.jsx("gv-icon", { "aria-hidden": "true", src: `${d}arrow_back.svg` }),
            /* @__PURE__ */ g.jsx("span", { children: "Back" })
          ]
        }
      ),
      /* @__PURE__ */ g.jsx(Ad, { plugin: I }),
      /* @__PURE__ */ g.jsx(ca, { plugin: I }),
      /* @__PURE__ */ g.jsx(ca, { plugin: M })
    ] }),
    /* @__PURE__ */ g.jsxs("header", { className: "gv-product-header gv-area-header", children: [
      /* @__PURE__ */ g.jsxs("div", { className: "gv-content gv-stack-space-md gv-text-sm", children: [
        /* @__PURE__ */ g.jsx("h3", { className: "gv-title gv-header-lg", children: "Rank Math" }),
        /* @__PURE__ */ g.jsx("p", { className: "gv-text-sm", children: j })
      ] }),
      /* @__PURE__ */ g.jsx("div", { className: "gv-image", children: /* @__PURE__ */ g.jsxs("picture", { children: [
        /* @__PURE__ */ g.jsx("source", { media: "(min-width: 600px)", srcSet: `${D} 2x, ${D} 1x` }),
        /* @__PURE__ */ g.jsx("img", { src: D, srcSet: `${D} 2x, ${D} 1x`, alt: "Rank Math" })
      ] }) })
    ] }),
    /* @__PURE__ */ g.jsx("section", { className: "gv-product-table gv-features-table gv-products-2 gv-recommended-2 gv-area-table", children: /* @__PURE__ */ g.jsxs("div", { className: "gv-dots-scroll-area", children: [
      /* @__PURE__ */ g.jsxs("div", { className: "gv-table-container", children: [
        /* @__PURE__ */ g.jsxs("div", { className: "gv-slider-nav", ref: p, children: [
          /* @__PURE__ */ g.jsx(
            "button",
            {
              type: "button",
              className: "gv-nav-button gv-previous gv-disabled",
              onClick: E,
              children: /* @__PURE__ */ g.jsx("gv-icon", { "aria-hidden": "true", src: `${d}chevron_left.svg` })
            }
          ),
          /* @__PURE__ */ g.jsx("button", { type: "button", className: "gv-nav-button gv-next", onClick: C, children: /* @__PURE__ */ g.jsx("gv-icon", { "aria-hidden": "true", src: `${d}chevron_right.svg` }) })
        ] }),
        /* @__PURE__ */ g.jsx("div", { className: "gv-table-slider", ref: v, children: /* @__PURE__ */ g.jsxs("div", { className: "gv-table", role: "table", ref: _, children: [
          /* @__PURE__ */ g.jsx("div", { className: "gv-table-header", role: "rowgroup", ref: m, children: /* @__PURE__ */ g.jsxs("div", { className: "gv-table-row", role: "row", children: [
            /* @__PURE__ */ g.jsxs("div", { className: "gv-product gv-p-0", role: "columnheader", children: [
              /* @__PURE__ */ g.jsxs("div", { className: "gv-content", children: [
                /* @__PURE__ */ g.jsx("h3", { className: "gv-title", children: `${L} free` }),
                /* @__PURE__ */ g.jsx("p", { children: k })
              ] }),
              /* @__PURE__ */ g.jsxs("div", { className: "gv-bottom", children: [
                /* @__PURE__ */ g.jsx("div", { className: "gv-price-container", children: /* @__PURE__ */ g.jsx("div", { className: "gv-price", children: /* @__PURE__ */ g.jsx("span", { className: "gv-price-text", children: ((R = c == null ? void 0 : c.labels) == null ? void 0 : R.free) || "Free" }) }) }),
                s && I ? /* @__PURE__ */ g.jsx(aa, { plugin: I }) : (I == null ? void 0 : I.download) && /* @__PURE__ */ g.jsx("button", { type: "button", className: "gv-button gv-button-secondary", children: (c == null ? void 0 : c.installButton) || ((Y = I == null ? void 0 : I.i18n) == null ? void 0 : Y.installButton) || "Install" })
              ] })
            ] }),
            /* @__PURE__ */ g.jsxs("div", { className: "gv-product gv-p-0", role: "columnheader", children: [
              /* @__PURE__ */ g.jsx("div", { className: "gv-recommended-label", children: "Recommended" }),
              /* @__PURE__ */ g.jsxs("div", { className: "gv-content", children: [
                /* @__PURE__ */ g.jsx("h3", { className: "gv-title", children: P }),
                /* @__PURE__ */ g.jsxs("p", { children: [
                  G.substring(0, 120),
                  G.length > 120 ? "…" : ""
                ] })
              ] }),
              /* @__PURE__ */ g.jsxs("div", { className: "gv-bottom", children: [
                /* @__PURE__ */ g.jsxs("div", { className: "gv-price-container", children: [
                  /* @__PURE__ */ g.jsxs("div", { className: "gv-price", children: [
                    /* @__PURE__ */ g.jsxs("span", { className: "gv-price-text", children: [
                      F,
                      F && !ae && ",-"
                    ] }),
                    F && !ae && /* @__PURE__ */ g.jsxs("span", { className: "gv-period", children: [
                      "/",
                      (Z = c == null ? void 0 : c.labels) == null ? void 0 : Z.timeMonth
                    ] })
                  ] }),
                  F && /* @__PURE__ */ g.jsx("div", { className: "gv-price-info", children: /* @__PURE__ */ g.jsxs("div", { className: "gv-info", children: [
                    c.labels.afterThat,
                    " [",
                    ue,
                    "]/",
                    (J = c == null ? void 0 : c.labels) == null ? void 0 : J.timeMonth
                  ] }) })
                ] }),
                s && M ? /* @__PURE__ */ g.jsx(aa, { plugin: M }) : /* @__PURE__ */ g.jsx("button", { type: "button", className: "gv-button gv-button-primary", children: "Select" })
              ] })
            ] })
          ] }) }),
          Pe > 0 && /* @__PURE__ */ g.jsxs("div", { className: "gv-section", role: "rowgroup", children: [
            /* @__PURE__ */ g.jsxs("div", { className: "gv-section-header gv-table-row", role: "row", children: [
              /* @__PURE__ */ g.jsx("div", { className: "gv-cell", role: "cell", children: /* @__PURE__ */ g.jsx("h4", { className: "gv-title", children: (c == null ? void 0 : c.keyFeatureHeading) || ((ze = I == null ? void 0 : I.i18n) == null ? void 0 : ze.keyFeatureHeading) || "Key features" }) }),
              /* @__PURE__ */ g.jsx("div", { className: "gv-cell", role: "cell", children: /* @__PURE__ */ g.jsx("h4", { className: "gv-title", children: (c == null ? void 0 : c.keyFeatureHeading) || ((ct = M == null ? void 0 : M.i18n) == null ? void 0 : ct.keyFeatureHeading) || "Key features" }) })
            ] }),
            Array.from({ length: Pe }).map((z, Q) => /* @__PURE__ */ g.jsxs("div", { className: "gv-table-row", role: "row", children: [
              /* @__PURE__ */ g.jsx("div", { className: "gv-cell", role: "cell", children: /* @__PURE__ */ g.jsx("span", { className: "gv-cell-text", children: Me[Q] || "" }) }),
              /* @__PURE__ */ g.jsx("div", { className: "gv-cell", role: "cell", children: /* @__PURE__ */ g.jsx("span", { className: "gv-cell-text", children: Oe[Q] || "" }) })
            ] }, Q))
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ g.jsx("div", { className: "gv-slider-pagination gv-state-top", ref: y, children: /* @__PURE__ */ g.jsx("div", { className: "gv-dots", role: "tablist", children: [0, 1].map((z) => /* @__PURE__ */ g.jsx(
        "button",
        {
          type: "button",
          className: `gv-dot gv-reset-button ${b === z ? "gv-active" : ""}`,
          role: "tab",
          "aria-selected": b === z ? "true" : "false",
          "aria-label": `Go to slide ${z + 1}`,
          onClick: () => A(z),
          style: { cursor: "pointer" }
        },
        z
      )) }) })
    ] }) }),
    /* @__PURE__ */ g.jsx("div", { className: "gv-area-details gv-grid gv-gap-fluid", children: We.length > 0 && /* @__PURE__ */ g.jsxs("section", { className: "gv-stack-space-md", children: [
      /* @__PURE__ */ g.jsx("h2", { className: "gv-title gv-text-bold gv-text-lg", children: (c == null ? void 0 : c.benefitHeading) || ((ht = e.i18n) == null ? void 0 : ht.benefitHeading) || "Key benefits" }),
      /* @__PURE__ */ g.jsx("ul", { className: "gv-list-items gv-list-check gv-mode-condensed", children: We.map((z, Q) => /* @__PURE__ */ g.jsx("li", { children: z }, Q)) })
    ] }) }),
    X.length > 0 && /* @__PURE__ */ g.jsx("div", { className: "gv-area-content gv-grid gv-gap-fluid", children: /* @__PURE__ */ g.jsxs("section", { className: "gv-text-sm gv-stack-space-md", children: [
      /* @__PURE__ */ g.jsx("h2", { className: "gv-title gv-text-bold gv-text-lg", children: (c == null ? void 0 : c.featureOverviewHeading) || ((It = e.i18n) == null ? void 0 : It.featureOverviewHeading) || "Core features overview" }),
      /* @__PURE__ */ g.jsx("div", { className: "gv-grid gv-gap-lg gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3", children: X.map((z, Q) => /* @__PURE__ */ g.jsxs("div", { className: "gv-item gv-stack-space-sm", children: [
        /* @__PURE__ */ g.jsx("h3", { className: "gv-title gv-text-bold gv-text-lg", children: z.name }),
        /* @__PURE__ */ g.jsx("p", { className: "gv-text-sm", children: z.desc })
      ] }, Q)) })
    ] }) })
  ] }) });
  return i ? ro(qe, document.body) : qe;
}
function xb() {
  var t;
  const { assetsBaseUrl: e } = Lt(), { t: r } = Fl();
  e || typeof window.marketplaceConfig < "u" && ((t = window.marketplaceConfig) != null && t.assetsBaseUrl);
  const i = () => {
    window.location.reload();
  };
  return /* @__PURE__ */ g.jsx("div", { className: "marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-items-center gv-justify-center gv-p-fluid", children: /* @__PURE__ */ g.jsxs("div", { className: "gv-text-center", children: [
    /* @__PURE__ */ g.jsx("h5", { className: "gv-header-md gv-mb-sm", children: r("ui.notifications.couldNotLoad") }),
    /* @__PURE__ */ g.jsx("p", { className: "gv-text-md gv-mb-lg", children: r("ui.notifications.refreshPage") }),
    /* @__PURE__ */ g.jsx(
      "button",
      {
        type: "button",
        className: "gv-button gv-button-primary buttons-min-width",
        onClick: i,
        children: /* @__PURE__ */ g.jsx("span", { children: r("ui.button.refreshPage") })
      }
    )
  ] }) });
}
function Cb() {
  var t, n, s;
  const { uiI18n: e } = Lt(), r = () => {
    var o, a;
    window.location.href = typeof window < "u" && ((a = (o = window.marketplaceConfig) == null ? void 0 : o.wpConfig) != null && a.adminUrl) ? `${window.marketplaceConfig.wpConfig.adminUrl}update-core.php` : "/wp-admin/update-core.php";
  }, i = (n = (t = e == null ? void 0 : e.notifications) == null ? void 0 : t.updateWPText) == null ? void 0 : n.replace("{0}", "6.2");
  return /* @__PURE__ */ g.jsx("div", { className: "marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-items-center gv-justify-center gv-p-fluid", children: /* @__PURE__ */ g.jsxs("div", { className: "gv-text-center", children: [
    /* @__PURE__ */ g.jsx("h5", { className: "gv-header-md gv-mb-sm", children: (s = e == null ? void 0 : e.notifications) == null ? void 0 : s.updateWPTitle }),
    /* @__PURE__ */ g.jsx("p", { className: "gv-text-md gv-mb-lg", children: i }),
    /* @__PURE__ */ g.jsx(
      "button",
      {
        type: "button",
        className: "gv-button gv-button-primary buttons-min-width",
        onClick: r,
        children: /* @__PURE__ */ g.jsx("span", { children: e == null ? void 0 : e.updateWPButton })
      }
    )
  ] }) });
}
function kb() {
  var He, Ye, ot, at, O, U, V, H;
  const {
    apiBaseUrl: e,
    useWPHandlers: r,
    wpConfig: i,
    enableDefaultStyles: t,
    assetsBaseUrl: n,
    pluginInAction: s,
    setPluginInAction: o,
    fetchSubscriptionStatus: a,
    isOnecomBrand: c,
    plugins: l,
    setPlugins: f,
    uiI18n: u,
    setUiI18n: d,
    handlePluginAction: v,
    allPluginsActivated: p,
    setAllPluginsActivated: _,
    catalogError: m,
    setCatalogError: y,
    catalogLoading: b,
    setCatalogLoading: S,
    shouldShowProvision: E,
    isSpecialPlugin: C,
    shouldShowPlugin: A,
    isWpVersionSupported: I
  } = Lt();
  typeof window < "u" && ((He = window.marketplaceConfig) != null && He.activePlugins) && window.marketplaceConfig.activePlugins, typeof window < "u" && ((Ye = window.marketplaceConfig) != null && Ye.activeThemeAuthor) && window.marketplaceConfig.activeThemeAuthor;
  const [M, D] = Je({}), [L, j] = Je(null), k = lt(!1), P = lt(!1), G = lt(null), F = lt(null), ae = lt(null), ue = lt(!1), K = n || typeof window.marketplaceConfig < "u" && ((ot = window.marketplaceConfig) == null ? void 0 : ot.assetsBaseUrl) || "", oe = K ? `${K}assets/icons/` : "", re = typeof window < "u" ? new URLSearchParams(window.location.search).get("plugin") : null, Me = () => {
    if (typeof window > "u") return "";
    const R = new URL(window.location.href);
    return R.searchParams.delete("plugin"), R.toString();
  };
  ft(() => {
    if (re && l.length) {
      const R = l.find((Y) => Y.slug === re);
      R && j(R);
    } else re || j(null);
  }, [re, l]), ft(() => {
    const R = () => {
      const Y = new URLSearchParams(window.location.search).get("plugin");
      if (!Y)
        j(null);
      else if (l.length) {
        const Z = l.find((J) => J.slug === Y);
        Z && j(Z);
      }
    };
    return window.addEventListener("popstate", R), () => window.removeEventListener("popstate", R);
  }, [l]);
  const { t: Oe } = Fl();
  ft(() => {
    if (k.current)
      return;
    async function R() {
      try {
        k.current = !0;
        const Z = await (await fetch(`${e}`)).json();
        if (F.current = Date.now(), ue.current = Z.is_cached || !1, Z && Z.success === !1) {
          console.error("API returned error:", Z.error), On({
            category: "marketplace_home",
            isContentRendered: !1
          }), y(!0), S(!1);
          return;
        }
        if (!Z || !Z.data || !Z.data.catalog || Array.isArray(Z.data.catalog) && Z.data.catalog.length === 0) {
          console.error("API returned empty or blank response"), On({
            category: "marketplace_home",
            isContentRendered: !1
          }), y(!0), S(!1);
          return;
        }
        const { plugins: J, uiI18n: ze } = Fd(Z);
        f(J), d(ze), c && J.filter((ht) => C(ht.slug)).forEach((ht) => {
          a(ht.slug);
        });
      } catch (Y) {
        console.error("Failed to fetch plugins", Y), On({
          category: "marketplace_home",
          isContentRendered: !1
        }), y(!0);
      } finally {
        S(!1);
      }
    }
    R();
  }, [
    e,
    c,
    a,
    f,
    C,
    y,
    S,
    d
  ]), ft(() => {
    if (l.length > 0) {
      const Y = l.filter((Z) => Z.activated !== !0).length === 0;
      _(Y);
    }
  }, [l, _]), ft(() => {
    !b && !m && l.length > 0 && !re && !P.current && (ae.current = Date.now(), sessionStorage.getItem("mp_skip_page_view") === "true" ? (sessionStorage.removeItem("mp_skip_page_view"), console.log("[Marketplace] Skipping page view tracking after activation reload")) : mb(
      F.current,
      ae.current,
      ue.current
    ), P.current = !0);
  }, [b, m, l.length, re]), ft(() => {
    L && re && G.current !== L.slug && (ae.current = Date.now(), sessionStorage.getItem("mp_skip_page_view") === "true" ? (sessionStorage.removeItem("mp_skip_page_view"), console.log(
      "[Marketplace] Skipping plugin detail page view tracking after activation reload"
    )) : yb(
      L,
      F.current,
      ae.current,
      ue.current
    ), G.current = L.slug), re || (G.current = null);
  }, [L, re]), ft(() => {
    L && console.log("Selected plugin state now:", L.slug);
  }, [L]);
  const Pe = (R) => {
    var ze;
    if (!R) return !1;
    const Z = (typeof window < "u" && ((ze = window.marketplaceConfig) == null ? void 0 : ze.brand)) === "onecom", J = R.slug === "seo-by-rank-math-pro" || R.slug === "seo-by-rank-math";
    return Z && J;
  };
  if (b) {
    if (re) {
      const J = (typeof window < "u" && ((at = window.marketplaceConfig) == null ? void 0 : at.brand)) === "onecom" && (re === "seo-by-rank-math-pro" || re === "seo-by-rank-math") ? to : eo;
      return /* @__PURE__ */ g.jsx(J, { plugin: null, onClose: () => {
      }, usePortal: !1, loading: !0 });
    }
    return /* @__PURE__ */ g.jsx("div", { className: "marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg", children: /* @__PURE__ */ g.jsxs("section", { className: "category-section", children: [
      /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-mb-sm", style: { width: "160px" } }),
      /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-text-sm gv-mb-sm", style: { width: "400px" } }),
      /* @__PURE__ */ g.jsx("div", { className: "product-grid gv-grid gv-gap-lg gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-mb-md gv-desk-lg-grid-cols-3 gv-mt-md", children: [...Array(3)].map((R, Y) => /* @__PURE__ */ g.jsxs(
        "div",
        {
          className: "gv-card gv-gap-md gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius",
          children: [
            /* @__PURE__ */ g.jsx("div", { className: "gv-desk-span-2 gv-span-3 gv-tab-span-3", children: /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton", style: { width: "48px", height: "48px" } }) }),
            /* @__PURE__ */ g.jsxs("div", { className: "gv-desk-span-8 gv-tab-span-7 gv-span-7", children: [
              /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-text-sm gv-mb-sm" }),
              /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-text-sm gv-mb-sm" }),
              /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-text-sm", style: { width: "80px" } })
            ] }),
            /* @__PURE__ */ g.jsx("div", { className: "gv-span-2 gv-content-center gv-text-right", children: /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton", style: { width: "24px" } }) })
          ]
        },
        Y
      )) }),
      /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-mb-sm", style: { width: "160px" } }),
      /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-text-sm gv-mb-sm", style: { width: "400px" } }),
      /* @__PURE__ */ g.jsx("div", { className: "product-grid gv-grid gv-gap-lg gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3 gv-mt-md", children: [...Array(3)].map((R, Y) => /* @__PURE__ */ g.jsxs(
        "div",
        {
          className: "gv-card gv-gap-md gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius",
          children: [
            /* @__PURE__ */ g.jsx("div", { className: "gv-desk-span-2 gv-span-3 gv-tab-span-3", children: /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton", style: { width: "48px", height: "48px" } }) }),
            /* @__PURE__ */ g.jsxs("div", { className: "gv-desk-span-8 gv-tab-span-7 gv-span-7", children: [
              /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-text-sm gv-mb-sm" }),
              /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-text-sm gv-mb-sm" }),
              /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-text-sm", style: { width: "80px" } })
            ] }),
            /* @__PURE__ */ g.jsx("div", { className: "gv-span-2 gv-content-center gv-text-right", children: /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton", style: { width: "24px" } }) })
          ]
        },
        Y + 3
      )) })
    ] }) });
  }
  if (m)
    return /* @__PURE__ */ g.jsx(xb, {});
  if (!I("6.2"))
    return /* @__PURE__ */ g.jsx(Cb, {});
  if (L && re) {
    const R = Pe(L) ? to : eo;
    return /* @__PURE__ */ g.jsx(
      R,
      {
        plugin: L,
        onClose: () => {
          if (j(null), typeof window < "u" && window.history && window.history.length > 1)
            window.history.back();
          else {
            const Y = new URL(window.location.href);
            Y.searchParams.delete("plugin"), window.history.replaceState({}, "", Y.toString());
          }
        },
        usePortal: !1,
        loading: b
      }
    );
  }
  const Se = /* @__PURE__ */ new Map(), We = /* @__PURE__ */ new Map(), X = ((O = l.find((R) => R.slug === "seo-by-rank-math")) == null ? void 0 : O.activated) === !0, qe = ((U = l.find((R) => R.slug === "seo-by-rank-math-pro")) == null ? void 0 : U.activated) === !0;
  l.forEach((R) => {
    if (!(We.has(R.slug) || R.activated === !0)) {
      if (R.slug === "seo-by-rank-math") {
        !X && !qe && A(R) && We.set(R.slug, R);
        return;
      }
      if (R.slug === "seo-by-rank-math-pro") {
        X && A(R) && We.set(R.slug, R);
        return;
      }
      A(R) && We.set(R.slug, R);
    }
  }), Array.from(We.values()).forEach((R) => {
    const Y = Array.isArray(R.categories) && R.categories.length ? typeof R.categories[0] == "object" ? R.categories[0] : { slug: String(R.categories[0]), title: String(R.categories[0]), description: null } : { slug: "Others", title: "Others", description: null }, Z = Y.slug || Y.title || "Others";
    Se.has(Z) || Se.set(Z, { info: Y, plugins: [] }), Se.get(Z).plugins.push(R);
  });
  const Ge = Array.from(Se.entries()).filter(
    ([R, { plugins: Y }]) => Y.length > 0
  );
  return p ? /* @__PURE__ */ g.jsx("div", { className: "marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-items-center gv-justify-center gv-p-fluid", children: /* @__PURE__ */ g.jsxs("div", { className: "gv-text-center", children: [
    /* @__PURE__ */ g.jsx("h5", { className: "gv-header-md gv-mb-sm", children: (V = u == null ? void 0 : u.notifications) == null ? void 0 : V.allPluginsOwned }),
    /* @__PURE__ */ g.jsx("p", { className: "gv-text-md gv-mb-lg", children: (H = u == null ? void 0 : u.text) == null ? void 0 : H.managePlugins }),
    /* @__PURE__ */ g.jsxs(
      "button",
      {
        type: "button",
        className: "gv-button gv-button-primary  buttons-min-width",
        onClick: () => {
          window.location.href = "/wp-admin/plugins.php";
        },
        children: [
          /* @__PURE__ */ g.jsx("span", { children: u.viewProductsButton }),
          /* @__PURE__ */ g.jsx("gv-icon", { "aria-hidden": "true", src: `${oe}/arrow_right.svg` })
        ]
      }
    )
  ] }) }) : /* @__PURE__ */ g.jsxs("div", { className: "marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg", children: [
    Ge.map(([R, { info: Y, plugins: Z }]) => /* @__PURE__ */ g.jsxs("section", { className: "category-section", children: [
      /* @__PURE__ */ g.jsx("p", { className: "gv-text-bold gv-text-lg gv-mb-xs", children: Y.title || R }),
      Y.description && /* @__PURE__ */ g.jsx("p", { className: "gv-text-sm", children: Y.description }),
      /* @__PURE__ */ g.jsx("div", { className: "product-grid gv-grid gv-gap-lg  gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3 gv-mt-md", children: Z.map((J) => {
        var z, Q, Le;
        E(J);
        const ze = J.i18n.freeTrialPeriod && J.i18n.freeTrialPeriod.trim() !== "" ? J.i18n.freeTrialPeriod : ((z = u == null ? void 0 : u.labels) == null ? void 0 : z.free) || "Free", ct = Es(J, ze, u), ht = Za(J), It = Rd(J);
        return /* @__PURE__ */ g.jsxs(
          "div",
          {
            className: "gv-card gv-gap-md gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius",
            children: [
              /* @__PURE__ */ g.jsx("div", { className: "gv-desk-span-2 gv-span-3 gv-tab-span-3", children: /* @__PURE__ */ g.jsx(
                "img",
                {
                  className: "gv-icon-tile",
                  src: J.iconUrl || `${oe}add_box.svg`,
                  alt: J.name
                }
              ) }),
              /* @__PURE__ */ g.jsxs("div", { className: "gv-desk-span-8 gv-tab-span-7 gv-span-7", children: [
                /* @__PURE__ */ g.jsx("p", { className: "gv-text-sm gv-text-bold gv-mb-xs", children: J.name }),
                /* @__PURE__ */ g.jsxs("p", { className: "oc-card-content gv-text-on-alternative gv-mb-sm gv-text-sm", children: [
                  " ",
                  J.i18n.listingDescription || J.i18n.subtitle,
                  " "
                ] }),
                /* @__PURE__ */ g.jsx("span", { className: "gv-caption-lg gv-text-bold", children: /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
                  J.licenseType === "premium" && It > 0 ? It !== null ? It : ht : ct,
                  J.licenseType !== "free" && ct && ct !== ze && ct !== (((Q = u == null ? void 0 : u.labels) == null ? void 0 : Q.freeUntilRenewal) || "Free until renewal") && /* @__PURE__ */ g.jsxs("span", { className: "gv-period", children: [
                    "/",
                    (Le = u == null ? void 0 : u.labels) == null ? void 0 : Le.timeMonth
                  ] })
                ] }) })
              ] }),
              /* @__PURE__ */ g.jsx("div", { className: "gv-span-2 gv-content-center gv-text-right", children: /* @__PURE__ */ g.jsx(
                "a",
                {
                  href: `${Me()}&plugin=${J.slug}`,
                  className: "gv-reset-button",
                  style: { display: "inline-block" },
                  "aria-label": `View details for ${J.name}`,
                  onClick: (pt) => {
                    pt.preventDefault(), j(J);
                    const je = new URL(window.location.href);
                    je.searchParams.set("plugin", J.slug), window.history.pushState({}, "", je.toString());
                  },
                  children: /* @__PURE__ */ g.jsx(
                    "img",
                    {
                      className: "gv-tile",
                      src: `${oe}arrow_forward.svg`,
                      alt: `View ${J.name} details`,
                      style: { minWidth: "24px" }
                    }
                  )
                }
              ) })
            ]
          },
          J.slug
        );
      }) })
    ] }, R)),
    L && !re && (() => {
      const R = Pe(L) ? to : eo;
      return /* @__PURE__ */ g.jsx(
        R,
        {
          plugin: L,
          onClose: () => j(null),
          loading: b
        }
      );
    })()
  ] });
}
const Eb = ({ loading: e = !1 }) => {
  var s, o;
  const { assetsBaseUrl: r, uiI18n: i } = Lt(), t = "https://wpaddon-static.group-cdn.one/images/wp/marketplace/banners/top-header-left-banner.png", n = "https://wpaddon-static.group-cdn.one/images/wp/marketplace/banners/top-header-right-banner.png";
  return /* @__PURE__ */ g.jsxs("header", { className: "gv-product-header gv-product-banner gv-pt-fluid gv-items-stretch gv-justify-between gv-gap-lg gv-max-mob-pt-md", children: [
    /* @__PURE__ */ g.jsx("div", { className: `gv-left-banner ${e ? "gv-h-full gv-w-full" : ""}`, children: e ? /* @__PURE__ */ g.jsx("div", { className: "gv-card-image gv-h-full", children: /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-radius-0 gv-h-full" }) }) : /* @__PURE__ */ g.jsx("div", { className: "gv-image", children: /* @__PURE__ */ g.jsxs("picture", { children: [
      /* @__PURE__ */ g.jsx("source", { media: "(min-width: 600px)", srcSet: t }),
      /* @__PURE__ */ g.jsx("img", { src: t, alt: "Left banner" })
    ] }) }) }),
    /* @__PURE__ */ g.jsx("div", { className: "gv-content gv-banner-content gv-max-mob-pt-0 gv-max-mob-pb-0 gv-desk-lg-text-center gv-tab-text-left gv-flex gv-flex-col gv-align-center gv-justify-center gv-pt-0", children: e ? /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
      /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-heading-lg gv-mt-sm" }),
      /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-heading-lg gv-mt-sm" }),
      /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-mt-sm" }),
      /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-mt-sm" })
    ] }) : /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
      /* @__PURE__ */ g.jsx("h2", { className: "gv-banner-title", children: (s = i == null ? void 0 : i.headings) == null ? void 0 : s.pageTitle }),
      /* @__PURE__ */ g.jsx("p", { className: "gv-banner-text gv-text-sm gv-mt-sm", children: (o = i == null ? void 0 : i.text) == null ? void 0 : o.pageContent })
    ] }) }),
    /* @__PURE__ */ g.jsx(
      "div",
      {
        className: `gv-right-banner gv-max-mob-pl-md ${e ? "gv-h-full gv-mt-0 gv-w-full" : ""}`,
        ...e ? { style: { transform: "translate(70px,5px)" } } : {},
        children: e ? /* @__PURE__ */ g.jsx("div", { className: "gv-card-image gv-h-full", children: /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-radius-0 gv-h-full" }) }) : /* @__PURE__ */ g.jsx("div", { className: "gv-image", children: /* @__PURE__ */ g.jsxs("picture", { children: [
          /* @__PURE__ */ g.jsx("source", { media: "(min-width: 600px)", srcSet: n }),
          /* @__PURE__ */ g.jsx("img", { src: n, alt: "Product" })
        ] }) })
      }
    )
  ] });
};
function Ib({ loading: e = !1 }) {
  var A, I, M, D, L, j;
  const { plugins: r, assetsBaseUrl: i, uiI18n: t } = Lt(), [n, s] = Je(0), [o, a] = Je(2), c = typeof window < "u" && ((A = window.marketplaceConfig) != null && A.activePlugins) ? window.marketplaceConfig.activePlugins : [], l = typeof window < "u" && ((I = window.marketplaceConfig) != null && I.activeThemeAuthor) ? window.marketplaceConfig.activeThemeAuthor : "";
  ft(() => {
    const k = () => {
      window.innerWidth > 1024 ? a(2) : (window.innerWidth >= 600, a(1));
    };
    return k(), window.addEventListener("resize", k), () => window.removeEventListener("resize", k);
  }, []);
  const f = (k) => {
    if (!k.rules)
      return !0;
    if (k.rules.mustHavePlugins && Array.isArray(k.rules.mustHavePlugins)) {
      if (k.rules.mustHavePlugins.length === 0)
        return !0;
      if (!k.rules.mustHavePlugins.some(
        (G) => c.includes(G)
      ))
        return !1;
    }
    if (k.rules.mustHaveThemesByAuthor && typeof k.rules.mustHaveThemesByAuthor == "string") {
      const P = k.rules.mustHaveThemesByAuthor;
      if (l !== P)
        return !1;
    }
    return !0;
  }, u = ((M = r.find((k) => k.slug === "seo-by-rank-math")) == null ? void 0 : M.activated) === !0, d = ((D = r.find((k) => k.slug === "seo-by-rank-math-pro")) == null ? void 0 : D.activated) === !0, v = r.filter((k) => k.activated === !0 || k.featured !== !0 ? !1 : k.slug === "seo-by-rank-math" ? !u && !d && f(k) : k.slug === "seo-by-rank-math-pro" ? u && f(k) : f(k)).sort((k, P) => {
    const G = k.displayOrder !== void 0 ? parseInt(k.displayOrder) : 1 / 0, F = P.displayOrder !== void 0 ? parseInt(P.displayOrder) : 1 / 0;
    return G - F;
  }), p = i || typeof window.marketplaceConfig < "u" && ((L = window.marketplaceConfig) == null ? void 0 : L.assetsBaseUrl) || "", _ = p ? `${p}assets/icons/` : "", m = v.length, y = Math.max(0, m - o), b = () => {
    n > 0 && s((k) => k - 1);
  }, S = () => {
    n < y && s((k) => k + 1);
  };
  if (e)
    return /* @__PURE__ */ g.jsxs("section", { className: "gv-featured-carousel gv-w-full", children: [
      /* @__PURE__ */ g.jsx("div", { className: "gv-carousel-header gv-mb-lg gv-tab-mt-md gv-max-mob-mt-0", children: /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-heading-md", style: { width: "200px" } }) }),
      /* @__PURE__ */ g.jsx("div", { className: "gv-carousel-container", style: { position: "relative", overflow: "hidden" }, children: /* @__PURE__ */ g.jsx(
        "div",
        {
          className: "gv-carousel-track",
          style: {
            display: "flex",
            gap: "1rem"
          },
          children: [...Array(o)].map((k, P) => /* @__PURE__ */ g.jsx(
            "div",
            {
              className: "gv-carousel-slide gv-border-alt",
              style: {
                minWidth: `calc((100% - ${o - 1}rem) / ${o})`,
                maxWidth: `calc((100% - ${o - 1}rem) / ${o})`,
                flex: "0 0 auto",
                backgroundColor: "#D9EBF7",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "space-between",
                maxHeight: "456px"
              },
              children: /* @__PURE__ */ g.jsxs(
                "header",
                {
                  className: "gv-product-header gv-area-header gv-w-full",
                  style: {
                    border: "none",
                    background: "#D9EBF7"
                  },
                  children: [
                    /* @__PURE__ */ g.jsxs("div", { className: "gv-content gv-stack-space-sm gv-text-sm gv-flex gv-flex-col gv-items-start", children: [
                      /* @__PURE__ */ g.jsx(
                        "div",
                        {
                          className: "gv-skeleton",
                          style: { width: "80px", marginBottom: "24px" }
                        }
                      ),
                      /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-heading-md gv-w-full" }),
                      /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-heading-md gv-w-full" }),
                      /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-text-sm", style: { width: "90%" } }),
                      /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-text-sm", style: { width: "80%" } }),
                      /* @__PURE__ */ g.jsxs(
                        "div",
                        {
                          className: "gv-slide-footer gv-flex gv-align-center gv-flex-wrap gv-items-center",
                          style: { marginTop: "24px" },
                          children: [
                            /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton", style: { width: "100px", height: "40px" } }),
                            /* @__PURE__ */ g.jsx(
                              "div",
                              {
                                className: "gv-skeleton gv-ml-md",
                                style: { width: "60px", height: "24px" }
                              }
                            )
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ g.jsx("div", { className: "gv-image gv-max-mob-pl-md", children: /* @__PURE__ */ g.jsx(
                      "div",
                      {
                        className: "gv-card-image",
                        style: { width: "100%", height: "100%", marginTop: "74px" },
                        children: /* @__PURE__ */ g.jsx("div", { className: "gv-skeleton gv-radius-0 gv-h-full" })
                      }
                    ) })
                  ]
                }
              )
            },
            `skeleton-slide-${P}`
          ))
        }
      ) })
    ] });
  if (!v || v.length === 0)
    return null;
  const E = (k) => {
    s(Math.min(k, y));
  }, C = (k) => {
    if (typeof window < "u") {
      const P = new URL(window.location.href);
      P.searchParams.set("plugin", k.slug), window.history.pushState({}, "", P.toString()), window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };
  return /* @__PURE__ */ g.jsxs("section", { className: "gv-featured-carousel gv-w-full", children: [
    /* @__PURE__ */ g.jsx("div", { className: "gv-carousel-header gv-mb-lg gv-tab-mt-md gv-max-mob-mt-0", children: /* @__PURE__ */ g.jsx("h5", { className: "gv-title gv-heading-sm gv-recommended-heading", children: (j = t == null ? void 0 : t.headings) == null ? void 0 : j.recommendedHeading }) }),
    /* @__PURE__ */ g.jsx("div", { className: "gv-carousel-container", style: { position: "relative", overflow: "hidden" }, children: /* @__PURE__ */ g.jsx(
      "div",
      {
        className: "gv-carousel-track",
        style: {
          display: "flex",
          transition: "transform 0.3s ease-in-out",
          transform: `translateX(calc(-${n} * ((100% - ${o - 1}rem) / ${o} + 1rem)))`,
          gap: "1rem"
        },
        children: v.map((k, P) => {
          var re, Me, Oe, Pe, Se;
          const G = (re = k == null ? void 0 : k.i18n) == null ? void 0 : re.featuredTitle, F = (Me = k == null ? void 0 : k.i18n) == null ? void 0 : Me.featuredContent, ae = k.i18n.freeTrialPeriod && k.i18n.freeTrialPeriod.trim() !== "" ? k.i18n.freeTrialPeriod : ((Oe = t == null ? void 0 : t.labels) == null ? void 0 : Oe.free) || "Free", ue = Es(k, ae, t), K = k.bannerUrl || k.image || k.thumbnail || "https://gravity.group.one/guide-images/product-image@2x.png", oe = Array.isArray(k.categories) && k.categories.length ? typeof k.categories[0] == "object" ? k.categories[0] : {
            slug: String(k.categories[0]),
            title: String(k.categories[0])
          } : { slug: "Others", title: "Others" };
          return oe.title || oe.slug, /* @__PURE__ */ g.jsx(
            "div",
            {
              className: "gv-carousel-slide gv-border-alt",
              style: {
                minWidth: `calc((100% - ${o - 1}rem) / ${o})`,
                maxWidth: `calc((100% - ${o - 1}rem) / ${o})`,
                flex: "0 0 auto",
                backgroundColor: "#D9EBF7",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "space-between",
                maxHeight: "456px"
              },
              children: /* @__PURE__ */ g.jsxs(
                "header",
                {
                  className: "gv-product-header gv-area-header",
                  style: {
                    border: "none",
                    background: "#D9EBF7"
                  },
                  children: [
                    /* @__PURE__ */ g.jsxs("div", { className: "gv-content  gv-stack-space-lg gv-text-sm gv-flex gv-flex-col gv-items-start", children: [
                      /* @__PURE__ */ g.jsx("div", { className: "gv-badge gv-badge-info", children: k == null ? void 0 : k.name }),
                      /* @__PURE__ */ g.jsx("h5", { className: "gv-title gv-header-sm", children: G }),
                      /* @__PURE__ */ g.jsx(
                        "p",
                        {
                          className: "gv-text-sm",
                          style: {
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            textOverflow: "ellipsis"
                          },
                          children: F
                        }
                      ),
                      /* @__PURE__ */ g.jsxs("div", { className: "gv-slide-footer gv-flex gv-align-center gv-items-center", children: [
                        /* @__PURE__ */ g.jsx(
                          "button",
                          {
                            onClick: () => C(k),
                            className: "gv-button gv-button-secondary gv-w-auto gv-flex-shrink-0",
                            children: t == null ? void 0 : t.featuredCta
                          }
                        ),
                        /* @__PURE__ */ g.jsxs("span", { className: "gv-price gv-text-bold gv-text-md gv-ml-md gv-flex-1", children: [
                          ue,
                          k.licenseType !== "free" && ue && ue !== ae && ue !== (((Pe = t == null ? void 0 : t.labels) == null ? void 0 : Pe.freeUntilRenewal) || "Free until renewal") && /* @__PURE__ */ g.jsxs("span", { className: "gv-period", children: [
                            "/",
                            (Se = t == null ? void 0 : t.labels) == null ? void 0 : Se.timeMonth
                          ] })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ g.jsx("div", { className: "gv-image gv-max-mob-pl-md", children: /* @__PURE__ */ g.jsxs("picture", { children: [
                      /* @__PURE__ */ g.jsx(
                        "source",
                        {
                          media: "(min-width: 600px)",
                          srcSet: `${K} 1x, ${K} 2x`
                        }
                      ),
                      /* @__PURE__ */ g.jsx(
                        "img",
                        {
                          src: K,
                          srcSet: `${K} 1x, ${K} 2x`,
                          alt: G
                        }
                      )
                    ] }) })
                  ]
                }
              )
            },
            `slide-${P}`
          );
        })
      }
    ) }),
    m > o && /* @__PURE__ */ g.jsxs("div", { className: "gv-carousel-nav-wrapper gv-flex gv-justify-center gv-align-center gv-mt-sm gv-gap-fluid", children: [
      /* @__PURE__ */ g.jsx(
        "button",
        {
          onClick: b,
          disabled: n === 0,
          className: "gv-carousel-nav gv-carousel-nav-prev",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: n === 0 ? "not-allowed" : "pointer",
            opacity: n === 0 ? 0.5 : 1
          },
          "aria-label": "Previous slide",
          children: /* @__PURE__ */ g.jsx(
            "img",
            {
              src: `${_}chevron_left.svg`,
              alt: "Previous",
              style: { width: "24px", height: "24px" }
            }
          )
        }
      ),
      /* @__PURE__ */ g.jsx("div", { className: "gv-carousel-dots gv-flex-wrap gv-items-center gv-flex gv-justify-center  gv-gap-sm", children: Array.from({ length: y + 1 }).map((k, P) => /* @__PURE__ */ g.jsx(
        "button",
        {
          onClick: () => E(P),
          className: "gv-carousel-dot",
          style: {
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            border: "none",
            background: n === P ? "#0066CC" : "#D0D0D0",
            cursor: "pointer",
            padding: 0
          },
          "aria-label": `Go to slide ${P + 1}`
        },
        P
      )) }),
      /* @__PURE__ */ g.jsx(
        "button",
        {
          onClick: S,
          disabled: n >= y,
          className: "gv-carousel-nav gv-carousel-nav-next",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: n >= y ? "not-allowed" : "pointer",
            opacity: n >= y ? 0.5 : 1
          },
          "aria-label": "Next slide",
          children: /* @__PURE__ */ g.jsx(
            "img",
            {
              src: `${_}chevron_right.svg`,
              alt: "Next",
              style: { width: "24px", height: "24px" }
            }
          )
        }
      )
    ] })
  ] });
}
function Ob() {
  var s;
  const { loadingAction: e, loadingPlugin: r, assetsBaseUrl: i } = Lt();
  if (!e)
    return null;
  const n = `${i || typeof window.marketplaceConfig < "u" && ((s = window.marketplaceConfig) == null ? void 0 : s.assetsBaseUrl) || ""}assets/images/spinner.svg`;
  return /* @__PURE__ */ g.jsx("div", { className: "loading-overlay show", children: /* @__PURE__ */ g.jsxs("div", { className: "gv-loader-container gv-pos-center gv-pos-absolute", children: [
    /* @__PURE__ */ g.jsx("gv-loader", { src: n }),
    /* @__PURE__ */ g.jsx("p", { children: e })
  ] }) });
}
const Ab = () => {
  const { allPluginsActivated: e, catalogError: r, catalogLoading: i, isWpVersionSupported: t } = Lt(), n = t("6.2"), [s, o] = Je(
    typeof window < "u" && new URLSearchParams(window.location.search).get("plugin")
  );
  return ft(() => {
    const a = () => {
      const f = typeof window < "u" && new URLSearchParams(window.location.search).get("plugin");
      o(!!f);
    };
    window.addEventListener("popstate", a);
    const c = window.history.pushState;
    window.history.pushState = function(...f) {
      c.apply(this, f), a();
    };
    const l = window.history.replaceState;
    return window.history.replaceState = function(...f) {
      l.apply(this, f), a();
    }, () => {
      window.removeEventListener("popstate", a), window.history.pushState = c, window.history.replaceState = l;
    };
  }, []), /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    /* @__PURE__ */ g.jsx(Ob, {}),
    /* @__PURE__ */ g.jsx("div", { className: "gv-activated", children: /* @__PURE__ */ g.jsxs("div", { className: "marketplace-container gv-layout-product gv-surface-dim gv-w-max-container gv-mx-auto gv-p-fluid ", children: [
      !s && !r && n && /* @__PURE__ */ g.jsx(Eb, { loading: i }),
      !s && !e && n && /* @__PURE__ */ g.jsx(Ib, { loading: i }),
      /* @__PURE__ */ g.jsx(kb, {})
    ] }) })
  ] });
}, Nb = ({
  apiBaseUrl: e,
  useWPHandlers: r,
  wpConfig: i,
  enableDefaultStyles: t,
  assetsBaseUrl: n
}) => /* @__PURE__ */ g.jsx(
  bb,
  {
    apiBaseUrl: e,
    useWPHandlers: r,
    wpConfig: i,
    enableDefaultStyles: t,
    assetsBaseUrl: n,
    children: /* @__PURE__ */ g.jsx(Ab, {})
  }
);
export {
  Nb as default
};

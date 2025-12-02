/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@group.one/gravity/dist/index.es.js":
/*!**********************************************************!*\
  !*** ./node_modules/@group.one/gravity/dist/index.es.js ***!
  \**********************************************************/
/***/ (() => {

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const promises = {};
async function fetchWithCache(url) {
  if (promises.hasOwnProperty(url)) {
    return promises[url];
  }
  let promise;
  if (url.startsWith("data:") || !("caches" in self)) {
    promise = fetch(url).then((r) => r.text());
  } else {
    promise = caches.open("gravity").then(async (cache) => {
      let response = await cache.match(url);
      if (!response) {
        response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response.clone());
        }
      }
      return response.text();
    });
  }
  promises[url] = promise;
  return promise;
}
class GvFlagElement extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }
  fetchFlag(path) {
    if (!path) {
      return;
    }
    fetchWithCache(path).then((svg) => this.innerHTML = svg);
  }
  connectedCallback() {
    this.fetchFlag(this.getAttribute("src"));
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src" && oldValue !== newValue) {
      this.fetchFlag(newValue);
    }
  }
}
__publicField(GvFlagElement, "TAG_NAME", "gv-flag");
class GvIconElement extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }
  fetchIcon(path) {
    if (!path) {
      return;
    }
    fetchWithCache(path).then((svg) => this.innerHTML = svg);
  }
  connectedCallback() {
    this.fetchIcon(this.getAttribute("src"));
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src" && oldValue !== newValue) {
      this.fetchIcon(newValue);
    }
  }
}
__publicField(GvIconElement, "TAG_NAME", "gv-icon");
class GvIllustrationElement extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }
  fetchIllustration(path) {
    if (!path) {
      return;
    }
    fetchWithCache(path).then((svg) => this.innerHTML = svg);
  }
  connectedCallback() {
    this.fetchIllustration(this.getAttribute("src"));
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src" && oldValue !== newValue) {
      this.fetchIllustration(newValue);
    }
  }
}
__publicField(GvIllustrationElement, "TAG_NAME", "gv-illustration");
class GvIndicatorElement extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }
  fetchIndicator(path) {
    if (!path) {
      return;
    }
    fetchWithCache(path).then((svg) => this.innerHTML = svg);
  }
  connectedCallback() {
    this.fetchIndicator(this.getAttribute("src"));
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src" && oldValue !== newValue) {
      this.fetchIndicator(newValue);
    }
  }
}
__publicField(GvIndicatorElement, "TAG_NAME", "gv-indicator");
class GvLoaderElement extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }
  fetchLoader(path) {
    if (!path) {
      return;
    }
    fetchWithCache(path).then((svg) => this.innerHTML = svg);
  }
  connectedCallback() {
    this.fetchLoader(this.getAttribute("src"));
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src" && oldValue !== newValue) {
      this.fetchLoader(newValue);
    }
  }
}
__publicField(GvLoaderElement, "TAG_NAME", "gv-loader");
class GvLogoElement extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }
  fetchLogo(path) {
    if (!path) {
      return;
    }
    fetchWithCache(path).then((svg) => this.innerHTML = svg);
  }
  connectedCallback() {
    this.fetchLogo(this.getAttribute("src"));
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src" && oldValue !== newValue) {
      this.fetchLogo(newValue);
    }
  }
}
__publicField(GvLogoElement, "TAG_NAME", "gv-logo");
class GvPayIconElement extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }
  fetchPayIcon(path) {
    if (!path) {
      return;
    }
    fetchWithCache(path).then((svg) => this.innerHTML = svg);
  }
  connectedCallback() {
    this.fetchPayIcon(this.getAttribute("src"));
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src" && oldValue !== newValue) {
      this.fetchPayIcon(newValue);
    }
  }
}
__publicField(GvPayIconElement, "TAG_NAME", "gv-pay-icon");
class GvTileElement extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }
  fetchTile(path) {
    if (!path) {
      return;
    }
    fetchWithCache(path).then((svg) => this.innerHTML = svg);
  }
  connectedCallback() {
    this.fetchTile(this.getAttribute("src"));
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src" && oldValue !== newValue) {
      this.fetchTile(newValue);
    }
  }
}
__publicField(GvTileElement, "TAG_NAME", "gv-tile");
function defineCustomElement(tagName, elementClass) {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, elementClass);
  }
}
defineCustomElement(GvFlagElement.TAG_NAME, GvFlagElement);
defineCustomElement(GvIconElement.TAG_NAME, GvIconElement);
defineCustomElement(GvIllustrationElement.TAG_NAME, GvIllustrationElement);
defineCustomElement(GvIndicatorElement.TAG_NAME, GvIndicatorElement);
defineCustomElement(GvLoaderElement.TAG_NAME, GvLoaderElement);
defineCustomElement(GvLogoElement.TAG_NAME, GvLogoElement);
defineCustomElement(GvPayIconElement.TAG_NAME, GvPayIconElement);
defineCustomElement(GvTileElement.TAG_NAME, GvTileElement);


/***/ }),

/***/ "./node_modules/html-parse-stringify/dist/html-parse-stringify.module.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/html-parse-stringify/dist/html-parse-stringify.module.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var void_elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! void-elements */ "./node_modules/void-elements/index.js");
/* harmony import */ var void_elements__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(void_elements__WEBPACK_IMPORTED_MODULE_0__);
var t=/\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;function n(n){var r={type:"tag",name:"",voidElement:!1,attrs:{},children:[]},i=n.match(/<\/?([^\s]+?)[/\s>]/);if(i&&(r.name=i[1],((void_elements__WEBPACK_IMPORTED_MODULE_0___default())[i[1]]||"/"===n.charAt(n.length-2))&&(r.voidElement=!0),r.name.startsWith("!--"))){var s=n.indexOf("--\x3e");return{type:"comment",comment:-1!==s?n.slice(4,s):""}}for(var a=new RegExp(t),c=null;null!==(c=a.exec(n));)if(c[0].trim())if(c[1]){var o=c[1].trim(),l=[o,""];o.indexOf("=")>-1&&(l=o.split("=")),r.attrs[l[0]]=l[1],a.lastIndex--}else c[2]&&(r.attrs[c[2]]=c[3].trim().substring(1,c[3].length-1));return r}var r=/<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g,i=/^\s*$/,s=Object.create(null);function a(e,t){switch(t.type){case"text":return e+t.content;case"tag":return e+="<"+t.name+(t.attrs?function(e){var t=[];for(var n in e)t.push(n+'="'+e[n]+'"');return t.length?" "+t.join(" "):""}(t.attrs):"")+(t.voidElement?"/>":">"),t.voidElement?e:e+t.children.reduce(a,"")+"</"+t.name+">";case"comment":return e+"\x3c!--"+t.comment+"--\x3e"}}var c={parse:function(e,t){t||(t={}),t.components||(t.components=s);var a,c=[],o=[],l=-1,m=!1;if(0!==e.indexOf("<")){var u=e.indexOf("<");c.push({type:"text",content:-1===u?e:e.substring(0,u)})}return e.replace(r,function(r,s){if(m){if(r!=="</"+a.name+">")return;m=!1}var u,f="/"!==r.charAt(1),h=r.startsWith("\x3c!--"),p=s+r.length,d=e.charAt(p);if(h){var v=n(r);return l<0?(c.push(v),c):((u=o[l]).children.push(v),c)}if(f&&(l++,"tag"===(a=n(r)).type&&t.components[a.name]&&(a.type="component",m=!0),a.voidElement||m||!d||"<"===d||a.children.push({type:"text",content:e.slice(p,e.indexOf("<",p))}),0===l&&c.push(a),(u=o[l-1])&&u.children.push(a),o[l]=a),(!f||a.voidElement)&&(l>-1&&(a.voidElement||a.name===r.slice(2,-1))&&(l--,a=-1===l?c:o[l]),!m&&"<"!==d&&d)){u=-1===l?c:o[l].children;var x=e.indexOf("<",p),g=e.slice(p,-1===x?void 0:x);i.test(g)&&(g=" "),(x>-1&&l+u.length>=0||" "!==g)&&u.push({type:"text",content:g})}}),c},stringify:function(e){return e.reduce(function(e,t){return e+a("",t)},"")}};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (c);
//# sourceMappingURL=html-parse-stringify.module.js.map


/***/ }),

/***/ "./node_modules/i18next/dist/esm/i18next.js":
/*!**************************************************!*\
  !*** ./node_modules/i18next/dist/esm/i18next.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeLanguage: () => (/* binding */ changeLanguage),
/* harmony export */   createInstance: () => (/* binding */ createInstance),
/* harmony export */   "default": () => (/* binding */ instance),
/* harmony export */   dir: () => (/* binding */ dir),
/* harmony export */   exists: () => (/* binding */ exists),
/* harmony export */   getFixedT: () => (/* binding */ getFixedT),
/* harmony export */   hasLoadedNamespace: () => (/* binding */ hasLoadedNamespace),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   keyFromSelector: () => (/* binding */ keysFromSelector),
/* harmony export */   loadLanguages: () => (/* binding */ loadLanguages),
/* harmony export */   loadNamespaces: () => (/* binding */ loadNamespaces),
/* harmony export */   loadResources: () => (/* binding */ loadResources),
/* harmony export */   reloadResources: () => (/* binding */ reloadResources),
/* harmony export */   setDefaultNamespace: () => (/* binding */ setDefaultNamespace),
/* harmony export */   t: () => (/* binding */ t),
/* harmony export */   use: () => (/* binding */ use)
/* harmony export */ });
const isString = obj => typeof obj === 'string';
const defer = () => {
  let res;
  let rej;
  const promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
};
const makeString = object => {
  if (object == null) return '';
  return '' + object;
};
const copy = (a, s, t) => {
  a.forEach(m => {
    if (s[m]) t[m] = s[m];
  });
};
const lastOfPathSeparatorRegExp = /###/g;
const cleanKey = key => key && key.indexOf('###') > -1 ? key.replace(lastOfPathSeparatorRegExp, '.') : key;
const canNotTraverseDeeper = object => !object || isString(object);
const getLastOfPath = (object, path, Empty) => {
  const stack = !isString(path) ? path : path.split('.');
  let stackIndex = 0;
  while (stackIndex < stack.length - 1) {
    if (canNotTraverseDeeper(object)) return {};
    const key = cleanKey(stack[stackIndex]);
    if (!object[key] && Empty) object[key] = new Empty();
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      object = object[key];
    } else {
      object = {};
    }
    ++stackIndex;
  }
  if (canNotTraverseDeeper(object)) return {};
  return {
    obj: object,
    k: cleanKey(stack[stackIndex])
  };
};
const setPath = (object, path, newValue) => {
  const {
    obj,
    k
  } = getLastOfPath(object, path, Object);
  if (obj !== undefined || path.length === 1) {
    obj[k] = newValue;
    return;
  }
  let e = path[path.length - 1];
  let p = path.slice(0, path.length - 1);
  let last = getLastOfPath(object, p, Object);
  while (last.obj === undefined && p.length) {
    e = `${p[p.length - 1]}.${e}`;
    p = p.slice(0, p.length - 1);
    last = getLastOfPath(object, p, Object);
    if (last?.obj && typeof last.obj[`${last.k}.${e}`] !== 'undefined') {
      last.obj = undefined;
    }
  }
  last.obj[`${last.k}.${e}`] = newValue;
};
const pushPath = (object, path, newValue, concat) => {
  const {
    obj,
    k
  } = getLastOfPath(object, path, Object);
  obj[k] = obj[k] || [];
  obj[k].push(newValue);
};
const getPath = (object, path) => {
  const {
    obj,
    k
  } = getLastOfPath(object, path);
  if (!obj) return undefined;
  if (!Object.prototype.hasOwnProperty.call(obj, k)) return undefined;
  return obj[k];
};
const getPathWithDefaults = (data, defaultData, key) => {
  const value = getPath(data, key);
  if (value !== undefined) {
    return value;
  }
  return getPath(defaultData, key);
};
const deepExtend = (target, source, overwrite) => {
  for (const prop in source) {
    if (prop !== '__proto__' && prop !== 'constructor') {
      if (prop in target) {
        if (isString(target[prop]) || target[prop] instanceof String || isString(source[prop]) || source[prop] instanceof String) {
          if (overwrite) target[prop] = source[prop];
        } else {
          deepExtend(target[prop], source[prop], overwrite);
        }
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
};
const regexEscape = str => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
var _entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};
const escape = data => {
  if (isString(data)) {
    return data.replace(/[&<>"'\/]/g, s => _entityMap[s]);
  }
  return data;
};
class RegExpCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.regExpMap = new Map();
    this.regExpQueue = [];
  }
  getRegExp(pattern) {
    const regExpFromCache = this.regExpMap.get(pattern);
    if (regExpFromCache !== undefined) {
      return regExpFromCache;
    }
    const regExpNew = new RegExp(pattern);
    if (this.regExpQueue.length === this.capacity) {
      this.regExpMap.delete(this.regExpQueue.shift());
    }
    this.regExpMap.set(pattern, regExpNew);
    this.regExpQueue.push(pattern);
    return regExpNew;
  }
}
const chars = [' ', ',', '?', '!', ';'];
const looksLikeObjectPathRegExpCache = new RegExpCache(20);
const looksLikeObjectPath = (key, nsSeparator, keySeparator) => {
  nsSeparator = nsSeparator || '';
  keySeparator = keySeparator || '';
  const possibleChars = chars.filter(c => nsSeparator.indexOf(c) < 0 && keySeparator.indexOf(c) < 0);
  if (possibleChars.length === 0) return true;
  const r = looksLikeObjectPathRegExpCache.getRegExp(`(${possibleChars.map(c => c === '?' ? '\\?' : c).join('|')})`);
  let matched = !r.test(key);
  if (!matched) {
    const ki = key.indexOf(keySeparator);
    if (ki > 0 && !r.test(key.substring(0, ki))) {
      matched = true;
    }
  }
  return matched;
};
const deepFind = (obj, path, keySeparator = '.') => {
  if (!obj) return undefined;
  if (obj[path]) {
    if (!Object.prototype.hasOwnProperty.call(obj, path)) return undefined;
    return obj[path];
  }
  const tokens = path.split(keySeparator);
  let current = obj;
  for (let i = 0; i < tokens.length;) {
    if (!current || typeof current !== 'object') {
      return undefined;
    }
    let next;
    let nextPath = '';
    for (let j = i; j < tokens.length; ++j) {
      if (j !== i) {
        nextPath += keySeparator;
      }
      nextPath += tokens[j];
      next = current[nextPath];
      if (next !== undefined) {
        if (['string', 'number', 'boolean'].indexOf(typeof next) > -1 && j < tokens.length - 1) {
          continue;
        }
        i += j - i + 1;
        break;
      }
    }
    current = next;
  }
  return current;
};
const getCleanedCode = code => code?.replace('_', '-');

const consoleLogger = {
  type: 'logger',
  log(args) {
    this.output('log', args);
  },
  warn(args) {
    this.output('warn', args);
  },
  error(args) {
    this.output('error', args);
  },
  output(type, args) {
    console?.[type]?.apply?.(console, args);
  }
};
class Logger {
  constructor(concreteLogger, options = {}) {
    this.init(concreteLogger, options);
  }
  init(concreteLogger, options = {}) {
    this.prefix = options.prefix || 'i18next:';
    this.logger = concreteLogger || consoleLogger;
    this.options = options;
    this.debug = options.debug;
  }
  log(...args) {
    return this.forward(args, 'log', '', true);
  }
  warn(...args) {
    return this.forward(args, 'warn', '', true);
  }
  error(...args) {
    return this.forward(args, 'error', '');
  }
  deprecate(...args) {
    return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
  }
  forward(args, lvl, prefix, debugOnly) {
    if (debugOnly && !this.debug) return null;
    if (isString(args[0])) args[0] = `${prefix}${this.prefix} ${args[0]}`;
    return this.logger[lvl](args);
  }
  create(moduleName) {
    return new Logger(this.logger, {
      ...{
        prefix: `${this.prefix}:${moduleName}:`
      },
      ...this.options
    });
  }
  clone(options) {
    options = options || this.options;
    options.prefix = options.prefix || this.prefix;
    return new Logger(this.logger, options);
  }
}
var baseLogger = new Logger();

class EventEmitter {
  constructor() {
    this.observers = {};
  }
  on(events, listener) {
    events.split(' ').forEach(event => {
      if (!this.observers[event]) this.observers[event] = new Map();
      const numListeners = this.observers[event].get(listener) || 0;
      this.observers[event].set(listener, numListeners + 1);
    });
    return this;
  }
  off(event, listener) {
    if (!this.observers[event]) return;
    if (!listener) {
      delete this.observers[event];
      return;
    }
    this.observers[event].delete(listener);
  }
  emit(event, ...args) {
    if (this.observers[event]) {
      const cloned = Array.from(this.observers[event].entries());
      cloned.forEach(([observer, numTimesAdded]) => {
        for (let i = 0; i < numTimesAdded; i++) {
          observer(...args);
        }
      });
    }
    if (this.observers['*']) {
      const cloned = Array.from(this.observers['*'].entries());
      cloned.forEach(([observer, numTimesAdded]) => {
        for (let i = 0; i < numTimesAdded; i++) {
          observer.apply(observer, [event, ...args]);
        }
      });
    }
  }
}

class ResourceStore extends EventEmitter {
  constructor(data, options = {
    ns: ['translation'],
    defaultNS: 'translation'
  }) {
    super();
    this.data = data || {};
    this.options = options;
    if (this.options.keySeparator === undefined) {
      this.options.keySeparator = '.';
    }
    if (this.options.ignoreJSONStructure === undefined) {
      this.options.ignoreJSONStructure = true;
    }
  }
  addNamespaces(ns) {
    if (this.options.ns.indexOf(ns) < 0) {
      this.options.ns.push(ns);
    }
  }
  removeNamespaces(ns) {
    const index = this.options.ns.indexOf(ns);
    if (index > -1) {
      this.options.ns.splice(index, 1);
    }
  }
  getResource(lng, ns, key, options = {}) {
    const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
    const ignoreJSONStructure = options.ignoreJSONStructure !== undefined ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let path;
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
    } else {
      path = [lng, ns];
      if (key) {
        if (Array.isArray(key)) {
          path.push(...key);
        } else if (isString(key) && keySeparator) {
          path.push(...key.split(keySeparator));
        } else {
          path.push(key);
        }
      }
    }
    const result = getPath(this.data, path);
    if (!result && !ns && !key && lng.indexOf('.') > -1) {
      lng = path[0];
      ns = path[1];
      key = path.slice(2).join('.');
    }
    if (result || !ignoreJSONStructure || !isString(key)) return result;
    return deepFind(this.data?.[lng]?.[ns], key, keySeparator);
  }
  addResource(lng, ns, key, value, options = {
    silent: false
  }) {
    const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
    let path = [lng, ns];
    if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      value = ns;
      ns = path[1];
    }
    this.addNamespaces(ns);
    setPath(this.data, path, value);
    if (!options.silent) this.emit('added', lng, ns, key, value);
  }
  addResources(lng, ns, resources, options = {
    silent: false
  }) {
    for (const m in resources) {
      if (isString(resources[m]) || Array.isArray(resources[m])) this.addResource(lng, ns, m, resources[m], {
        silent: true
      });
    }
    if (!options.silent) this.emit('added', lng, ns, resources);
  }
  addResourceBundle(lng, ns, resources, deep, overwrite, options = {
    silent: false,
    skipCopy: false
  }) {
    let path = [lng, ns];
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      deep = resources;
      resources = ns;
      ns = path[1];
    }
    this.addNamespaces(ns);
    let pack = getPath(this.data, path) || {};
    if (!options.skipCopy) resources = JSON.parse(JSON.stringify(resources));
    if (deep) {
      deepExtend(pack, resources, overwrite);
    } else {
      pack = {
        ...pack,
        ...resources
      };
    }
    setPath(this.data, path, pack);
    if (!options.silent) this.emit('added', lng, ns, resources);
  }
  removeResourceBundle(lng, ns) {
    if (this.hasResourceBundle(lng, ns)) {
      delete this.data[lng][ns];
    }
    this.removeNamespaces(ns);
    this.emit('removed', lng, ns);
  }
  hasResourceBundle(lng, ns) {
    return this.getResource(lng, ns) !== undefined;
  }
  getResourceBundle(lng, ns) {
    if (!ns) ns = this.options.defaultNS;
    return this.getResource(lng, ns);
  }
  getDataByLanguage(lng) {
    return this.data[lng];
  }
  hasLanguageSomeTranslations(lng) {
    const data = this.getDataByLanguage(lng);
    const n = data && Object.keys(data) || [];
    return !!n.find(v => data[v] && Object.keys(data[v]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}

var postProcessor = {
  processors: {},
  addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle(processors, value, key, options, translator) {
    processors.forEach(processor => {
      value = this.processors[processor]?.process(value, key, options, translator) ?? value;
    });
    return value;
  }
};

const PATH_KEY = Symbol('i18next/PATH_KEY');
function createProxy() {
  const state = [];
  const handler = Object.create(null);
  let proxy;
  handler.get = (target, key) => {
    proxy?.revoke?.();
    if (key === PATH_KEY) return state;
    state.push(key);
    proxy = Proxy.revocable(target, handler);
    return proxy.proxy;
  };
  return Proxy.revocable(Object.create(null), handler).proxy;
}
function keysFromSelector(selector, opts) {
  const {
    [PATH_KEY]: path
  } = selector(createProxy());
  return path.join(opts?.keySeparator ?? '.');
}

const checkedLoadedFor = {};
const shouldHandleAsObject = res => !isString(res) && typeof res !== 'boolean' && typeof res !== 'number';
class Translator extends EventEmitter {
  constructor(services, options = {}) {
    super();
    copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat', 'utils'], services, this);
    this.options = options;
    if (this.options.keySeparator === undefined) {
      this.options.keySeparator = '.';
    }
    this.logger = baseLogger.create('translator');
  }
  changeLanguage(lng) {
    if (lng) this.language = lng;
  }
  exists(key, o = {
    interpolation: {}
  }) {
    const opt = {
      ...o
    };
    if (key == null) return false;
    const resolved = this.resolve(key, opt);
    return resolved?.res !== undefined;
  }
  extractFromKey(key, opt) {
    let nsSeparator = opt.nsSeparator !== undefined ? opt.nsSeparator : this.options.nsSeparator;
    if (nsSeparator === undefined) nsSeparator = ':';
    const keySeparator = opt.keySeparator !== undefined ? opt.keySeparator : this.options.keySeparator;
    let namespaces = opt.ns || this.options.defaultNS || [];
    const wouldCheckForNsInKey = nsSeparator && key.indexOf(nsSeparator) > -1;
    const seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !opt.keySeparator && !this.options.userDefinedNsSeparator && !opt.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
    if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
      const m = key.match(this.interpolator.nestingRegexp);
      if (m && m.length > 0) {
        return {
          key,
          namespaces: isString(namespaces) ? [namespaces] : namespaces
        };
      }
      const parts = key.split(nsSeparator);
      if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
      key = parts.join(keySeparator);
    }
    return {
      key,
      namespaces: isString(namespaces) ? [namespaces] : namespaces
    };
  }
  translate(keys, o, lastKey) {
    let opt = typeof o === 'object' ? {
      ...o
    } : o;
    if (typeof opt !== 'object' && this.options.overloadTranslationOptionHandler) {
      opt = this.options.overloadTranslationOptionHandler(arguments);
    }
    if (typeof opt === 'object') opt = {
      ...opt
    };
    if (!opt) opt = {};
    if (keys == null) return '';
    if (typeof keys === 'function') keys = keysFromSelector(keys, {
      ...this.options,
      ...opt
    });
    if (!Array.isArray(keys)) keys = [String(keys)];
    const returnDetails = opt.returnDetails !== undefined ? opt.returnDetails : this.options.returnDetails;
    const keySeparator = opt.keySeparator !== undefined ? opt.keySeparator : this.options.keySeparator;
    const {
      key,
      namespaces
    } = this.extractFromKey(keys[keys.length - 1], opt);
    const namespace = namespaces[namespaces.length - 1];
    let nsSeparator = opt.nsSeparator !== undefined ? opt.nsSeparator : this.options.nsSeparator;
    if (nsSeparator === undefined) nsSeparator = ':';
    const lng = opt.lng || this.language;
    const appendNamespaceToCIMode = opt.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (lng?.toLowerCase() === 'cimode') {
      if (appendNamespaceToCIMode) {
        if (returnDetails) {
          return {
            res: `${namespace}${nsSeparator}${key}`,
            usedKey: key,
            exactUsedKey: key,
            usedLng: lng,
            usedNS: namespace,
            usedParams: this.getUsedParamsDetails(opt)
          };
        }
        return `${namespace}${nsSeparator}${key}`;
      }
      if (returnDetails) {
        return {
          res: key,
          usedKey: key,
          exactUsedKey: key,
          usedLng: lng,
          usedNS: namespace,
          usedParams: this.getUsedParamsDetails(opt)
        };
      }
      return key;
    }
    const resolved = this.resolve(keys, opt);
    let res = resolved?.res;
    const resUsedKey = resolved?.usedKey || key;
    const resExactUsedKey = resolved?.exactUsedKey || key;
    const noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
    const joinArrays = opt.joinArrays !== undefined ? opt.joinArrays : this.options.joinArrays;
    const handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
    const needsPluralHandling = opt.count !== undefined && !isString(opt.count);
    const hasDefaultValue = Translator.hasDefaultValue(opt);
    const defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, opt) : '';
    const defaultValueSuffixOrdinalFallback = opt.ordinal && needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, {
      ordinal: false
    }) : '';
    const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
    const defaultValue = needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] || opt[`defaultValue${defaultValueSuffix}`] || opt[`defaultValue${defaultValueSuffixOrdinalFallback}`] || opt.defaultValue;
    let resForObjHndl = res;
    if (handleAsObjectInI18nFormat && !res && hasDefaultValue) {
      resForObjHndl = defaultValue;
    }
    const handleAsObject = shouldHandleAsObject(resForObjHndl);
    const resType = Object.prototype.toString.apply(resForObjHndl);
    if (handleAsObjectInI18nFormat && resForObjHndl && handleAsObject && noObject.indexOf(resType) < 0 && !(isString(joinArrays) && Array.isArray(resForObjHndl))) {
      if (!opt.returnObjects && !this.options.returnObjects) {
        if (!this.options.returnedObjectHandler) {
          this.logger.warn('accessing an object - but returnObjects options is not enabled!');
        }
        const r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, resForObjHndl, {
          ...opt,
          ns: namespaces
        }) : `key '${key} (${this.language})' returned an object instead of string.`;
        if (returnDetails) {
          resolved.res = r;
          resolved.usedParams = this.getUsedParamsDetails(opt);
          return resolved;
        }
        return r;
      }
      if (keySeparator) {
        const resTypeIsArray = Array.isArray(resForObjHndl);
        const copy = resTypeIsArray ? [] : {};
        const newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
        for (const m in resForObjHndl) {
          if (Object.prototype.hasOwnProperty.call(resForObjHndl, m)) {
            const deepKey = `${newKeyToUse}${keySeparator}${m}`;
            if (hasDefaultValue && !res) {
              copy[m] = this.translate(deepKey, {
                ...opt,
                defaultValue: shouldHandleAsObject(defaultValue) ? defaultValue[m] : undefined,
                ...{
                  joinArrays: false,
                  ns: namespaces
                }
              });
            } else {
              copy[m] = this.translate(deepKey, {
                ...opt,
                ...{
                  joinArrays: false,
                  ns: namespaces
                }
              });
            }
            if (copy[m] === deepKey) copy[m] = resForObjHndl[m];
          }
        }
        res = copy;
      }
    } else if (handleAsObjectInI18nFormat && isString(joinArrays) && Array.isArray(res)) {
      res = res.join(joinArrays);
      if (res) res = this.extendTranslation(res, keys, opt, lastKey);
    } else {
      let usedDefault = false;
      let usedKey = false;
      if (!this.isValidLookup(res) && hasDefaultValue) {
        usedDefault = true;
        res = defaultValue;
      }
      if (!this.isValidLookup(res)) {
        usedKey = true;
        res = key;
      }
      const missingKeyNoValueFallbackToKey = opt.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
      const resForMissing = missingKeyNoValueFallbackToKey && usedKey ? undefined : res;
      const updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
      if (usedKey || usedDefault || updateMissing) {
        this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? defaultValue : res);
        if (keySeparator) {
          const fk = this.resolve(key, {
            ...opt,
            keySeparator: false
          });
          if (fk && fk.res) this.logger.warn('Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.');
        }
        let lngs = [];
        const fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, opt.lng || this.language);
        if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
          for (let i = 0; i < fallbackLngs.length; i++) {
            lngs.push(fallbackLngs[i]);
          }
        } else if (this.options.saveMissingTo === 'all') {
          lngs = this.languageUtils.toResolveHierarchy(opt.lng || this.language);
        } else {
          lngs.push(opt.lng || this.language);
        }
        const send = (l, k, specificDefaultValue) => {
          const defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
          if (this.options.missingKeyHandler) {
            this.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, opt);
          } else if (this.backendConnector?.saveMissing) {
            this.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, opt);
          }
          this.emit('missingKey', l, namespace, k, res);
        };
        if (this.options.saveMissing) {
          if (this.options.saveMissingPlurals && needsPluralHandling) {
            lngs.forEach(language => {
              const suffixes = this.pluralResolver.getSuffixes(language, opt);
              if (needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] && suffixes.indexOf(`${this.options.pluralSeparator}zero`) < 0) {
                suffixes.push(`${this.options.pluralSeparator}zero`);
              }
              suffixes.forEach(suffix => {
                send([language], key + suffix, opt[`defaultValue${suffix}`] || defaultValue);
              });
            });
          } else {
            send(lngs, key, defaultValue);
          }
        }
      }
      res = this.extendTranslation(res, keys, opt, resolved, lastKey);
      if (usedKey && res === key && this.options.appendNamespaceToMissingKey) {
        res = `${namespace}${nsSeparator}${key}`;
      }
      if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) {
        res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${namespace}${nsSeparator}${key}` : key, usedDefault ? res : undefined, opt);
      }
    }
    if (returnDetails) {
      resolved.res = res;
      resolved.usedParams = this.getUsedParamsDetails(opt);
      return resolved;
    }
    return res;
  }
  extendTranslation(res, key, opt, resolved, lastKey) {
    if (this.i18nFormat?.parse) {
      res = this.i18nFormat.parse(res, {
        ...this.options.interpolation.defaultVariables,
        ...opt
      }, opt.lng || this.language || resolved.usedLng, resolved.usedNS, resolved.usedKey, {
        resolved
      });
    } else if (!opt.skipInterpolation) {
      if (opt.interpolation) this.interpolator.init({
        ...opt,
        ...{
          interpolation: {
            ...this.options.interpolation,
            ...opt.interpolation
          }
        }
      });
      const skipOnVariables = isString(res) && (opt?.interpolation?.skipOnVariables !== undefined ? opt.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let nestBef;
      if (skipOnVariables) {
        const nb = res.match(this.interpolator.nestingRegexp);
        nestBef = nb && nb.length;
      }
      let data = opt.replace && !isString(opt.replace) ? opt.replace : opt;
      if (this.options.interpolation.defaultVariables) data = {
        ...this.options.interpolation.defaultVariables,
        ...data
      };
      res = this.interpolator.interpolate(res, data, opt.lng || this.language || resolved.usedLng, opt);
      if (skipOnVariables) {
        const na = res.match(this.interpolator.nestingRegexp);
        const nestAft = na && na.length;
        if (nestBef < nestAft) opt.nest = false;
      }
      if (!opt.lng && resolved && resolved.res) opt.lng = this.language || resolved.usedLng;
      if (opt.nest !== false) res = this.interpolator.nest(res, (...args) => {
        if (lastKey?.[0] === args[0] && !opt.context) {
          this.logger.warn(`It seems you are nesting recursively key: ${args[0]} in key: ${key[0]}`);
          return null;
        }
        return this.translate(...args, key);
      }, opt);
      if (opt.interpolation) this.interpolator.reset();
    }
    const postProcess = opt.postProcess || this.options.postProcess;
    const postProcessorNames = isString(postProcess) ? [postProcess] : postProcess;
    if (res != null && postProcessorNames?.length && opt.applyPostProcessor !== false) {
      res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? {
        i18nResolved: {
          ...resolved,
          usedParams: this.getUsedParamsDetails(opt)
        },
        ...opt
      } : opt, this);
    }
    return res;
  }
  resolve(keys, opt = {}) {
    let found;
    let usedKey;
    let exactUsedKey;
    let usedLng;
    let usedNS;
    if (isString(keys)) keys = [keys];
    keys.forEach(k => {
      if (this.isValidLookup(found)) return;
      const extracted = this.extractFromKey(k, opt);
      const key = extracted.key;
      usedKey = key;
      let namespaces = extracted.namespaces;
      if (this.options.fallbackNS) namespaces = namespaces.concat(this.options.fallbackNS);
      const needsPluralHandling = opt.count !== undefined && !isString(opt.count);
      const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
      const needsContextHandling = opt.context !== undefined && (isString(opt.context) || typeof opt.context === 'number') && opt.context !== '';
      const codes = opt.lngs ? opt.lngs : this.languageUtils.toResolveHierarchy(opt.lng || this.language, opt.fallbackLng);
      namespaces.forEach(ns => {
        if (this.isValidLookup(found)) return;
        usedNS = ns;
        if (!checkedLoadedFor[`${codes[0]}-${ns}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(usedNS)) {
          checkedLoadedFor[`${codes[0]}-${ns}`] = true;
          this.logger.warn(`key "${usedKey}" for languages "${codes.join(', ')}" won't get resolved as namespace "${usedNS}" was not yet loaded`, 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
        }
        codes.forEach(code => {
          if (this.isValidLookup(found)) return;
          usedLng = code;
          const finalKeys = [key];
          if (this.i18nFormat?.addLookupKeys) {
            this.i18nFormat.addLookupKeys(finalKeys, key, code, ns, opt);
          } else {
            let pluralSuffix;
            if (needsPluralHandling) pluralSuffix = this.pluralResolver.getSuffix(code, opt.count, opt);
            const zeroSuffix = `${this.options.pluralSeparator}zero`;
            const ordinalPrefix = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (needsPluralHandling) {
              if (opt.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                finalKeys.push(key + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
              }
              finalKeys.push(key + pluralSuffix);
              if (needsZeroSuffixLookup) {
                finalKeys.push(key + zeroSuffix);
              }
            }
            if (needsContextHandling) {
              const contextKey = `${key}${this.options.contextSeparator || '_'}${opt.context}`;
              finalKeys.push(contextKey);
              if (needsPluralHandling) {
                if (opt.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                  finalKeys.push(contextKey + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
                }
                finalKeys.push(contextKey + pluralSuffix);
                if (needsZeroSuffixLookup) {
                  finalKeys.push(contextKey + zeroSuffix);
                }
              }
            }
          }
          let possibleKey;
          while (possibleKey = finalKeys.pop()) {
            if (!this.isValidLookup(found)) {
              exactUsedKey = possibleKey;
              found = this.getResource(code, ns, possibleKey, opt);
            }
          }
        });
      });
    });
    return {
      res: found,
      usedKey,
      exactUsedKey,
      usedLng,
      usedNS
    };
  }
  isValidLookup(res) {
    return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
  }
  getResource(code, ns, key, options = {}) {
    if (this.i18nFormat?.getResource) return this.i18nFormat.getResource(code, ns, key, options);
    return this.resourceStore.getResource(code, ns, key, options);
  }
  getUsedParamsDetails(options = {}) {
    const optionsKeys = ['defaultValue', 'ordinal', 'context', 'replace', 'lng', 'lngs', 'fallbackLng', 'ns', 'keySeparator', 'nsSeparator', 'returnObjects', 'returnDetails', 'joinArrays', 'postProcess', 'interpolation'];
    const useOptionsReplaceForData = options.replace && !isString(options.replace);
    let data = useOptionsReplaceForData ? options.replace : options;
    if (useOptionsReplaceForData && typeof options.count !== 'undefined') {
      data.count = options.count;
    }
    if (this.options.interpolation.defaultVariables) {
      data = {
        ...this.options.interpolation.defaultVariables,
        ...data
      };
    }
    if (!useOptionsReplaceForData) {
      data = {
        ...data
      };
      for (const key of optionsKeys) {
        delete data[key];
      }
    }
    return data;
  }
  static hasDefaultValue(options) {
    const prefix = 'defaultValue';
    for (const option in options) {
      if (Object.prototype.hasOwnProperty.call(options, option) && prefix === option.substring(0, prefix.length) && undefined !== options[option]) {
        return true;
      }
    }
    return false;
  }
}

class LanguageUtil {
  constructor(options) {
    this.options = options;
    this.supportedLngs = this.options.supportedLngs || false;
    this.logger = baseLogger.create('languageUtils');
  }
  getScriptPartFromCode(code) {
    code = getCleanedCode(code);
    if (!code || code.indexOf('-') < 0) return null;
    const p = code.split('-');
    if (p.length === 2) return null;
    p.pop();
    if (p[p.length - 1].toLowerCase() === 'x') return null;
    return this.formatLanguageCode(p.join('-'));
  }
  getLanguagePartFromCode(code) {
    code = getCleanedCode(code);
    if (!code || code.indexOf('-') < 0) return code;
    const p = code.split('-');
    return this.formatLanguageCode(p[0]);
  }
  formatLanguageCode(code) {
    if (isString(code) && code.indexOf('-') > -1) {
      let formattedCode;
      try {
        formattedCode = Intl.getCanonicalLocales(code)[0];
      } catch (e) {}
      if (formattedCode && this.options.lowerCaseLng) {
        formattedCode = formattedCode.toLowerCase();
      }
      if (formattedCode) return formattedCode;
      if (this.options.lowerCaseLng) {
        return code.toLowerCase();
      }
      return code;
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
  }
  isSupportedCode(code) {
    if (this.options.load === 'languageOnly' || this.options.nonExplicitSupportedLngs) {
      code = this.getLanguagePartFromCode(code);
    }
    return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
  }
  getBestMatchFromCodes(codes) {
    if (!codes) return null;
    let found;
    codes.forEach(code => {
      if (found) return;
      const cleanedLng = this.formatLanguageCode(code);
      if (!this.options.supportedLngs || this.isSupportedCode(cleanedLng)) found = cleanedLng;
    });
    if (!found && this.options.supportedLngs) {
      codes.forEach(code => {
        if (found) return;
        const lngScOnly = this.getScriptPartFromCode(code);
        if (this.isSupportedCode(lngScOnly)) return found = lngScOnly;
        const lngOnly = this.getLanguagePartFromCode(code);
        if (this.isSupportedCode(lngOnly)) return found = lngOnly;
        found = this.options.supportedLngs.find(supportedLng => {
          if (supportedLng === lngOnly) return supportedLng;
          if (supportedLng.indexOf('-') < 0 && lngOnly.indexOf('-') < 0) return;
          if (supportedLng.indexOf('-') > 0 && lngOnly.indexOf('-') < 0 && supportedLng.substring(0, supportedLng.indexOf('-')) === lngOnly) return supportedLng;
          if (supportedLng.indexOf(lngOnly) === 0 && lngOnly.length > 1) return supportedLng;
        });
      });
    }
    if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
    return found;
  }
  getFallbackCodes(fallbacks, code) {
    if (!fallbacks) return [];
    if (typeof fallbacks === 'function') fallbacks = fallbacks(code);
    if (isString(fallbacks)) fallbacks = [fallbacks];
    if (Array.isArray(fallbacks)) return fallbacks;
    if (!code) return fallbacks.default || [];
    let found = fallbacks[code];
    if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
    if (!found) found = fallbacks[this.formatLanguageCode(code)];
    if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
    if (!found) found = fallbacks.default;
    return found || [];
  }
  toResolveHierarchy(code, fallbackCode) {
    const fallbackCodes = this.getFallbackCodes((fallbackCode === false ? [] : fallbackCode) || this.options.fallbackLng || [], code);
    const codes = [];
    const addCode = c => {
      if (!c) return;
      if (this.isSupportedCode(c)) {
        codes.push(c);
      } else {
        this.logger.warn(`rejecting language code not found in supportedLngs: ${c}`);
      }
    };
    if (isString(code) && (code.indexOf('-') > -1 || code.indexOf('_') > -1)) {
      if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
      if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
      if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
    } else if (isString(code)) {
      addCode(this.formatLanguageCode(code));
    }
    fallbackCodes.forEach(fc => {
      if (codes.indexOf(fc) < 0) addCode(this.formatLanguageCode(fc));
    });
    return codes;
  }
}

const suffixesOrder = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
const dummyRule = {
  select: count => count === 1 ? 'one' : 'other',
  resolvedOptions: () => ({
    pluralCategories: ['one', 'other']
  })
};
class PluralResolver {
  constructor(languageUtils, options = {}) {
    this.languageUtils = languageUtils;
    this.options = options;
    this.logger = baseLogger.create('pluralResolver');
    this.pluralRulesCache = {};
  }
  addRule(lng, obj) {
    this.rules[lng] = obj;
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(code, options = {}) {
    const cleanedCode = getCleanedCode(code === 'dev' ? 'en' : code);
    const type = options.ordinal ? 'ordinal' : 'cardinal';
    const cacheKey = JSON.stringify({
      cleanedCode,
      type
    });
    if (cacheKey in this.pluralRulesCache) {
      return this.pluralRulesCache[cacheKey];
    }
    let rule;
    try {
      rule = new Intl.PluralRules(cleanedCode, {
        type
      });
    } catch (err) {
      if (!Intl) {
        this.logger.error('No Intl support, please use an Intl polyfill!');
        return dummyRule;
      }
      if (!code.match(/-|_/)) return dummyRule;
      const lngPart = this.languageUtils.getLanguagePartFromCode(code);
      rule = this.getRule(lngPart, options);
    }
    this.pluralRulesCache[cacheKey] = rule;
    return rule;
  }
  needsPlural(code, options = {}) {
    let rule = this.getRule(code, options);
    if (!rule) rule = this.getRule('dev', options);
    return rule?.resolvedOptions().pluralCategories.length > 1;
  }
  getPluralFormsOfKey(code, key, options = {}) {
    return this.getSuffixes(code, options).map(suffix => `${key}${suffix}`);
  }
  getSuffixes(code, options = {}) {
    let rule = this.getRule(code, options);
    if (!rule) rule = this.getRule('dev', options);
    if (!rule) return [];
    return rule.resolvedOptions().pluralCategories.sort((pluralCategory1, pluralCategory2) => suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2]).map(pluralCategory => `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ''}${pluralCategory}`);
  }
  getSuffix(code, count, options = {}) {
    const rule = this.getRule(code, options);
    if (rule) {
      return `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ''}${rule.select(count)}`;
    }
    this.logger.warn(`no plural rule found for: ${code}`);
    return this.getSuffix('dev', count, options);
  }
}

const deepFindWithDefaults = (data, defaultData, key, keySeparator = '.', ignoreJSONStructure = true) => {
  let path = getPathWithDefaults(data, defaultData, key);
  if (!path && ignoreJSONStructure && isString(key)) {
    path = deepFind(data, key, keySeparator);
    if (path === undefined) path = deepFind(defaultData, key, keySeparator);
  }
  return path;
};
const regexSafe = val => val.replace(/\$/g, '$$$$');
class Interpolator {
  constructor(options = {}) {
    this.logger = baseLogger.create('interpolator');
    this.options = options;
    this.format = options?.interpolation?.format || (value => value);
    this.init(options);
  }
  init(options = {}) {
    if (!options.interpolation) options.interpolation = {
      escapeValue: true
    };
    const {
      escape: escape$1,
      escapeValue,
      useRawValueToEscape,
      prefix,
      prefixEscaped,
      suffix,
      suffixEscaped,
      formatSeparator,
      unescapeSuffix,
      unescapePrefix,
      nestingPrefix,
      nestingPrefixEscaped,
      nestingSuffix,
      nestingSuffixEscaped,
      nestingOptionsSeparator,
      maxReplaces,
      alwaysFormat
    } = options.interpolation;
    this.escape = escape$1 !== undefined ? escape$1 : escape;
    this.escapeValue = escapeValue !== undefined ? escapeValue : true;
    this.useRawValueToEscape = useRawValueToEscape !== undefined ? useRawValueToEscape : false;
    this.prefix = prefix ? regexEscape(prefix) : prefixEscaped || '{{';
    this.suffix = suffix ? regexEscape(suffix) : suffixEscaped || '}}';
    this.formatSeparator = formatSeparator || ',';
    this.unescapePrefix = unescapeSuffix ? '' : unescapePrefix || '-';
    this.unescapeSuffix = this.unescapePrefix ? '' : unescapeSuffix || '';
    this.nestingPrefix = nestingPrefix ? regexEscape(nestingPrefix) : nestingPrefixEscaped || regexEscape('$t(');
    this.nestingSuffix = nestingSuffix ? regexEscape(nestingSuffix) : nestingSuffixEscaped || regexEscape(')');
    this.nestingOptionsSeparator = nestingOptionsSeparator || ',';
    this.maxReplaces = maxReplaces || 1000;
    this.alwaysFormat = alwaysFormat !== undefined ? alwaysFormat : false;
    this.resetRegExp();
  }
  reset() {
    if (this.options) this.init(this.options);
  }
  resetRegExp() {
    const getOrResetRegExp = (existingRegExp, pattern) => {
      if (existingRegExp?.source === pattern) {
        existingRegExp.lastIndex = 0;
        return existingRegExp;
      }
      return new RegExp(pattern, 'g');
    };
    this.regexp = getOrResetRegExp(this.regexp, `${this.prefix}(.+?)${this.suffix}`);
    this.regexpUnescape = getOrResetRegExp(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`);
    this.nestingRegexp = getOrResetRegExp(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`);
  }
  interpolate(str, data, lng, options) {
    let match;
    let value;
    let replaces;
    const defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    const handleFormat = key => {
      if (key.indexOf(this.formatSeparator) < 0) {
        const path = deepFindWithDefaults(data, defaultData, key, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(path, undefined, lng, {
          ...options,
          ...data,
          interpolationkey: key
        }) : path;
      }
      const p = key.split(this.formatSeparator);
      const k = p.shift().trim();
      const f = p.join(this.formatSeparator).trim();
      return this.format(deepFindWithDefaults(data, defaultData, k, this.options.keySeparator, this.options.ignoreJSONStructure), f, lng, {
        ...options,
        ...data,
        interpolationkey: k
      });
    };
    this.resetRegExp();
    const missingInterpolationHandler = options?.missingInterpolationHandler || this.options.missingInterpolationHandler;
    const skipOnVariables = options?.interpolation?.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    const todos = [{
      regex: this.regexpUnescape,
      safeValue: val => regexSafe(val)
    }, {
      regex: this.regexp,
      safeValue: val => this.escapeValue ? regexSafe(this.escape(val)) : regexSafe(val)
    }];
    todos.forEach(todo => {
      replaces = 0;
      while (match = todo.regex.exec(str)) {
        const matchedVar = match[1].trim();
        value = handleFormat(matchedVar);
        if (value === undefined) {
          if (typeof missingInterpolationHandler === 'function') {
            const temp = missingInterpolationHandler(str, match, options);
            value = isString(temp) ? temp : '';
          } else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) {
            value = '';
          } else if (skipOnVariables) {
            value = match[0];
            continue;
          } else {
            this.logger.warn(`missed to pass in variable ${matchedVar} for interpolating ${str}`);
            value = '';
          }
        } else if (!isString(value) && !this.useRawValueToEscape) {
          value = makeString(value);
        }
        const safeValue = todo.safeValue(value);
        str = str.replace(match[0], safeValue);
        if (skipOnVariables) {
          todo.regex.lastIndex += value.length;
          todo.regex.lastIndex -= match[0].length;
        } else {
          todo.regex.lastIndex = 0;
        }
        replaces++;
        if (replaces >= this.maxReplaces) {
          break;
        }
      }
    });
    return str;
  }
  nest(str, fc, options = {}) {
    let match;
    let value;
    let clonedOptions;
    const handleHasOptions = (key, inheritedOptions) => {
      const sep = this.nestingOptionsSeparator;
      if (key.indexOf(sep) < 0) return key;
      const c = key.split(new RegExp(`${sep}[ ]*{`));
      let optionsString = `{${c[1]}`;
      key = c[0];
      optionsString = this.interpolate(optionsString, clonedOptions);
      const matchedSingleQuotes = optionsString.match(/'/g);
      const matchedDoubleQuotes = optionsString.match(/"/g);
      if ((matchedSingleQuotes?.length ?? 0) % 2 === 0 && !matchedDoubleQuotes || matchedDoubleQuotes.length % 2 !== 0) {
        optionsString = optionsString.replace(/'/g, '"');
      }
      try {
        clonedOptions = JSON.parse(optionsString);
        if (inheritedOptions) clonedOptions = {
          ...inheritedOptions,
          ...clonedOptions
        };
      } catch (e) {
        this.logger.warn(`failed parsing options string in nesting for key ${key}`, e);
        return `${key}${sep}${optionsString}`;
      }
      if (clonedOptions.defaultValue && clonedOptions.defaultValue.indexOf(this.prefix) > -1) delete clonedOptions.defaultValue;
      return key;
    };
    while (match = this.nestingRegexp.exec(str)) {
      let formatters = [];
      clonedOptions = {
        ...options
      };
      clonedOptions = clonedOptions.replace && !isString(clonedOptions.replace) ? clonedOptions.replace : clonedOptions;
      clonedOptions.applyPostProcessor = false;
      delete clonedOptions.defaultValue;
      const keyEndIndex = /{.*}/.test(match[1]) ? match[1].lastIndexOf('}') + 1 : match[1].indexOf(this.formatSeparator);
      if (keyEndIndex !== -1) {
        formatters = match[1].slice(keyEndIndex).split(this.formatSeparator).map(elem => elem.trim()).filter(Boolean);
        match[1] = match[1].slice(0, keyEndIndex);
      }
      value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
      if (value && match[0] === str && !isString(value)) return value;
      if (!isString(value)) value = makeString(value);
      if (!value) {
        this.logger.warn(`missed to resolve ${match[1]} for nesting ${str}`);
        value = '';
      }
      if (formatters.length) {
        value = formatters.reduce((v, f) => this.format(v, f, options.lng, {
          ...options,
          interpolationkey: match[1].trim()
        }), value.trim());
      }
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
    }
    return str;
  }
}

const parseFormatStr = formatStr => {
  let formatName = formatStr.toLowerCase().trim();
  const formatOptions = {};
  if (formatStr.indexOf('(') > -1) {
    const p = formatStr.split('(');
    formatName = p[0].toLowerCase().trim();
    const optStr = p[1].substring(0, p[1].length - 1);
    if (formatName === 'currency' && optStr.indexOf(':') < 0) {
      if (!formatOptions.currency) formatOptions.currency = optStr.trim();
    } else if (formatName === 'relativetime' && optStr.indexOf(':') < 0) {
      if (!formatOptions.range) formatOptions.range = optStr.trim();
    } else {
      const opts = optStr.split(';');
      opts.forEach(opt => {
        if (opt) {
          const [key, ...rest] = opt.split(':');
          const val = rest.join(':').trim().replace(/^'+|'+$/g, '');
          const trimmedKey = key.trim();
          if (!formatOptions[trimmedKey]) formatOptions[trimmedKey] = val;
          if (val === 'false') formatOptions[trimmedKey] = false;
          if (val === 'true') formatOptions[trimmedKey] = true;
          if (!isNaN(val)) formatOptions[trimmedKey] = parseInt(val, 10);
        }
      });
    }
  }
  return {
    formatName,
    formatOptions
  };
};
const createCachedFormatter = fn => {
  const cache = {};
  return (v, l, o) => {
    let optForCache = o;
    if (o && o.interpolationkey && o.formatParams && o.formatParams[o.interpolationkey] && o[o.interpolationkey]) {
      optForCache = {
        ...optForCache,
        [o.interpolationkey]: undefined
      };
    }
    const key = l + JSON.stringify(optForCache);
    let frm = cache[key];
    if (!frm) {
      frm = fn(getCleanedCode(l), o);
      cache[key] = frm;
    }
    return frm(v);
  };
};
const createNonCachedFormatter = fn => (v, l, o) => fn(getCleanedCode(l), o)(v);
class Formatter {
  constructor(options = {}) {
    this.logger = baseLogger.create('formatter');
    this.options = options;
    this.init(options);
  }
  init(services, options = {
    interpolation: {}
  }) {
    this.formatSeparator = options.interpolation.formatSeparator || ',';
    const cf = options.cacheInBuiltFormats ? createCachedFormatter : createNonCachedFormatter;
    this.formats = {
      number: cf((lng, opt) => {
        const formatter = new Intl.NumberFormat(lng, {
          ...opt
        });
        return val => formatter.format(val);
      }),
      currency: cf((lng, opt) => {
        const formatter = new Intl.NumberFormat(lng, {
          ...opt,
          style: 'currency'
        });
        return val => formatter.format(val);
      }),
      datetime: cf((lng, opt) => {
        const formatter = new Intl.DateTimeFormat(lng, {
          ...opt
        });
        return val => formatter.format(val);
      }),
      relativetime: cf((lng, opt) => {
        const formatter = new Intl.RelativeTimeFormat(lng, {
          ...opt
        });
        return val => formatter.format(val, opt.range || 'day');
      }),
      list: cf((lng, opt) => {
        const formatter = new Intl.ListFormat(lng, {
          ...opt
        });
        return val => formatter.format(val);
      })
    };
  }
  add(name, fc) {
    this.formats[name.toLowerCase().trim()] = fc;
  }
  addCached(name, fc) {
    this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
  }
  format(value, format, lng, options = {}) {
    const formats = format.split(this.formatSeparator);
    if (formats.length > 1 && formats[0].indexOf('(') > 1 && formats[0].indexOf(')') < 0 && formats.find(f => f.indexOf(')') > -1)) {
      const lastIndex = formats.findIndex(f => f.indexOf(')') > -1);
      formats[0] = [formats[0], ...formats.splice(1, lastIndex)].join(this.formatSeparator);
    }
    const result = formats.reduce((mem, f) => {
      const {
        formatName,
        formatOptions
      } = parseFormatStr(f);
      if (this.formats[formatName]) {
        let formatted = mem;
        try {
          const valOptions = options?.formatParams?.[options.interpolationkey] || {};
          const l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
          formatted = this.formats[formatName](mem, l, {
            ...formatOptions,
            ...options,
            ...valOptions
          });
        } catch (error) {
          this.logger.warn(error);
        }
        return formatted;
      } else {
        this.logger.warn(`there was no format function for ${formatName}`);
      }
      return mem;
    }, value);
    return result;
  }
}

const removePending = (q, name) => {
  if (q.pending[name] !== undefined) {
    delete q.pending[name];
    q.pendingCount--;
  }
};
class Connector extends EventEmitter {
  constructor(backend, store, services, options = {}) {
    super();
    this.backend = backend;
    this.store = store;
    this.services = services;
    this.languageUtils = services.languageUtils;
    this.options = options;
    this.logger = baseLogger.create('backendConnector');
    this.waitingReads = [];
    this.maxParallelReads = options.maxParallelReads || 10;
    this.readingCalls = 0;
    this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
    this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
    this.state = {};
    this.queue = [];
    this.backend?.init?.(services, options.backend, options);
  }
  queueLoad(languages, namespaces, options, callback) {
    const toLoad = {};
    const pending = {};
    const toLoadLanguages = {};
    const toLoadNamespaces = {};
    languages.forEach(lng => {
      let hasAllNamespaces = true;
      namespaces.forEach(ns => {
        const name = `${lng}|${ns}`;
        if (!options.reload && this.store.hasResourceBundle(lng, ns)) {
          this.state[name] = 2;
        } else if (this.state[name] < 0) ; else if (this.state[name] === 1) {
          if (pending[name] === undefined) pending[name] = true;
        } else {
          this.state[name] = 1;
          hasAllNamespaces = false;
          if (pending[name] === undefined) pending[name] = true;
          if (toLoad[name] === undefined) toLoad[name] = true;
          if (toLoadNamespaces[ns] === undefined) toLoadNamespaces[ns] = true;
        }
      });
      if (!hasAllNamespaces) toLoadLanguages[lng] = true;
    });
    if (Object.keys(toLoad).length || Object.keys(pending).length) {
      this.queue.push({
        pending,
        pendingCount: Object.keys(pending).length,
        loaded: {},
        errors: [],
        callback
      });
    }
    return {
      toLoad: Object.keys(toLoad),
      pending: Object.keys(pending),
      toLoadLanguages: Object.keys(toLoadLanguages),
      toLoadNamespaces: Object.keys(toLoadNamespaces)
    };
  }
  loaded(name, err, data) {
    const s = name.split('|');
    const lng = s[0];
    const ns = s[1];
    if (err) this.emit('failedLoading', lng, ns, err);
    if (!err && data) {
      this.store.addResourceBundle(lng, ns, data, undefined, undefined, {
        skipCopy: true
      });
    }
    this.state[name] = err ? -1 : 2;
    if (err && data) this.state[name] = 0;
    const loaded = {};
    this.queue.forEach(q => {
      pushPath(q.loaded, [lng], ns);
      removePending(q, name);
      if (err) q.errors.push(err);
      if (q.pendingCount === 0 && !q.done) {
        Object.keys(q.loaded).forEach(l => {
          if (!loaded[l]) loaded[l] = {};
          const loadedKeys = q.loaded[l];
          if (loadedKeys.length) {
            loadedKeys.forEach(n => {
              if (loaded[l][n] === undefined) loaded[l][n] = true;
            });
          }
        });
        q.done = true;
        if (q.errors.length) {
          q.callback(q.errors);
        } else {
          q.callback();
        }
      }
    });
    this.emit('loaded', loaded);
    this.queue = this.queue.filter(q => !q.done);
  }
  read(lng, ns, fcName, tried = 0, wait = this.retryTimeout, callback) {
    if (!lng.length) return callback(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng,
        ns,
        fcName,
        tried,
        wait,
        callback
      });
      return;
    }
    this.readingCalls++;
    const resolver = (err, data) => {
      this.readingCalls--;
      if (this.waitingReads.length > 0) {
        const next = this.waitingReads.shift();
        this.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
      }
      if (err && data && tried < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, lng, ns, fcName, tried + 1, wait * 2, callback);
        }, wait);
        return;
      }
      callback(err, data);
    };
    const fc = this.backend[fcName].bind(this.backend);
    if (fc.length === 2) {
      try {
        const r = fc(lng, ns);
        if (r && typeof r.then === 'function') {
          r.then(data => resolver(null, data)).catch(resolver);
        } else {
          resolver(null, r);
        }
      } catch (err) {
        resolver(err);
      }
      return;
    }
    return fc(lng, ns, resolver);
  }
  prepareLoading(languages, namespaces, options = {}, callback) {
    if (!this.backend) {
      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
      return callback && callback();
    }
    if (isString(languages)) languages = this.languageUtils.toResolveHierarchy(languages);
    if (isString(namespaces)) namespaces = [namespaces];
    const toLoad = this.queueLoad(languages, namespaces, options, callback);
    if (!toLoad.toLoad.length) {
      if (!toLoad.pending.length) callback();
      return null;
    }
    toLoad.toLoad.forEach(name => {
      this.loadOne(name);
    });
  }
  load(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {}, callback);
  }
  reload(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {
      reload: true
    }, callback);
  }
  loadOne(name, prefix = '') {
    const s = name.split('|');
    const lng = s[0];
    const ns = s[1];
    this.read(lng, ns, 'read', undefined, undefined, (err, data) => {
      if (err) this.logger.warn(`${prefix}loading namespace ${ns} for language ${lng} failed`, err);
      if (!err && data) this.logger.log(`${prefix}loaded namespace ${ns} for language ${lng}`, data);
      this.loaded(name, err, data);
    });
  }
  saveMissing(languages, namespace, key, fallbackValue, isUpdate, options = {}, clb = () => {}) {
    if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(namespace)) {
      this.logger.warn(`did not save key "${key}" as the namespace "${namespace}" was not yet loaded`, 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
      return;
    }
    if (key === undefined || key === null || key === '') return;
    if (this.backend?.create) {
      const opts = {
        ...options,
        isUpdate
      };
      const fc = this.backend.create.bind(this.backend);
      if (fc.length < 6) {
        try {
          let r;
          if (fc.length === 5) {
            r = fc(languages, namespace, key, fallbackValue, opts);
          } else {
            r = fc(languages, namespace, key, fallbackValue);
          }
          if (r && typeof r.then === 'function') {
            r.then(data => clb(null, data)).catch(clb);
          } else {
            clb(null, r);
          }
        } catch (err) {
          clb(err);
        }
      } else {
        fc(languages, namespace, key, fallbackValue, clb, opts);
      }
    }
    if (!languages || !languages[0]) return;
    this.store.addResource(languages[0], namespace, key, fallbackValue);
  }
}

const get = () => ({
  debug: false,
  initAsync: true,
  ns: ['translation'],
  defaultNS: ['translation'],
  fallbackLng: ['dev'],
  fallbackNS: false,
  supportedLngs: false,
  nonExplicitSupportedLngs: false,
  load: 'all',
  preload: false,
  simplifyPluralSuffix: true,
  keySeparator: '.',
  nsSeparator: ':',
  pluralSeparator: '_',
  contextSeparator: '_',
  partialBundledLanguages: false,
  saveMissing: false,
  updateMissing: false,
  saveMissingTo: 'fallback',
  saveMissingPlurals: true,
  missingKeyHandler: false,
  missingInterpolationHandler: false,
  postProcess: false,
  postProcessPassResolved: false,
  returnNull: false,
  returnEmptyString: true,
  returnObjects: false,
  joinArrays: false,
  returnedObjectHandler: false,
  parseMissingKeyHandler: false,
  appendNamespaceToMissingKey: false,
  appendNamespaceToCIMode: false,
  overloadTranslationOptionHandler: args => {
    let ret = {};
    if (typeof args[1] === 'object') ret = args[1];
    if (isString(args[1])) ret.defaultValue = args[1];
    if (isString(args[2])) ret.tDescription = args[2];
    if (typeof args[2] === 'object' || typeof args[3] === 'object') {
      const options = args[3] || args[2];
      Object.keys(options).forEach(key => {
        ret[key] = options[key];
      });
    }
    return ret;
  },
  interpolation: {
    escapeValue: true,
    format: value => value,
    prefix: '{{',
    suffix: '}}',
    formatSeparator: ',',
    unescapePrefix: '-',
    nestingPrefix: '$t(',
    nestingSuffix: ')',
    nestingOptionsSeparator: ',',
    maxReplaces: 1000,
    skipOnVariables: true
  },
  cacheInBuiltFormats: true
});
const transformOptions = options => {
  if (isString(options.ns)) options.ns = [options.ns];
  if (isString(options.fallbackLng)) options.fallbackLng = [options.fallbackLng];
  if (isString(options.fallbackNS)) options.fallbackNS = [options.fallbackNS];
  if (options.supportedLngs?.indexOf?.('cimode') < 0) {
    options.supportedLngs = options.supportedLngs.concat(['cimode']);
  }
  if (typeof options.initImmediate === 'boolean') options.initAsync = options.initImmediate;
  return options;
};

const noop = () => {};
const bindMemberFunctions = inst => {
  const mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
  mems.forEach(mem => {
    if (typeof inst[mem] === 'function') {
      inst[mem] = inst[mem].bind(inst);
    }
  });
};
class I18n extends EventEmitter {
  constructor(options = {}, callback) {
    super();
    this.options = transformOptions(options);
    this.services = {};
    this.logger = baseLogger;
    this.modules = {
      external: []
    };
    bindMemberFunctions(this);
    if (callback && !this.isInitialized && !options.isClone) {
      if (!this.options.initAsync) {
        this.init(options, callback);
        return this;
      }
      setTimeout(() => {
        this.init(options, callback);
      }, 0);
    }
  }
  init(options = {}, callback) {
    this.isInitializing = true;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (options.defaultNS == null && options.ns) {
      if (isString(options.ns)) {
        options.defaultNS = options.ns;
      } else if (options.ns.indexOf('translation') < 0) {
        options.defaultNS = options.ns[0];
      }
    }
    const defOpts = get();
    this.options = {
      ...defOpts,
      ...this.options,
      ...transformOptions(options)
    };
    this.options.interpolation = {
      ...defOpts.interpolation,
      ...this.options.interpolation
    };
    if (options.keySeparator !== undefined) {
      this.options.userDefinedKeySeparator = options.keySeparator;
    }
    if (options.nsSeparator !== undefined) {
      this.options.userDefinedNsSeparator = options.nsSeparator;
    }
    const createClassOnDemand = ClassOrObject => {
      if (!ClassOrObject) return null;
      if (typeof ClassOrObject === 'function') return new ClassOrObject();
      return ClassOrObject;
    };
    if (!this.options.isClone) {
      if (this.modules.logger) {
        baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
      } else {
        baseLogger.init(null, this.options);
      }
      let formatter;
      if (this.modules.formatter) {
        formatter = this.modules.formatter;
      } else {
        formatter = Formatter;
      }
      const lu = new LanguageUtil(this.options);
      this.store = new ResourceStore(this.options.resources, this.options);
      const s = this.services;
      s.logger = baseLogger;
      s.resourceStore = this.store;
      s.languageUtils = lu;
      s.pluralResolver = new PluralResolver(lu, {
        prepend: this.options.pluralSeparator,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      });
      const usingLegacyFormatFunction = this.options.interpolation.format && this.options.interpolation.format !== defOpts.interpolation.format;
      if (usingLegacyFormatFunction) {
        this.logger.deprecate(`init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting`);
      }
      if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
        s.formatter = createClassOnDemand(formatter);
        if (s.formatter.init) s.formatter.init(s, this.options);
        this.options.interpolation.format = s.formatter.format.bind(s.formatter);
      }
      s.interpolator = new Interpolator(this.options);
      s.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      };
      s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
      s.backendConnector.on('*', (event, ...args) => {
        this.emit(event, ...args);
      });
      if (this.modules.languageDetector) {
        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
        if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
      }
      if (this.modules.i18nFormat) {
        s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
        if (s.i18nFormat.init) s.i18nFormat.init(this);
      }
      this.translator = new Translator(this.services, this.options);
      this.translator.on('*', (event, ...args) => {
        this.emit(event, ...args);
      });
      this.modules.external.forEach(m => {
        if (m.init) m.init(this);
      });
    }
    this.format = this.options.interpolation.format;
    if (!callback) callback = noop;
    if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      if (codes.length > 0 && codes[0] !== 'dev') this.options.lng = codes[0];
    }
    if (!this.services.languageDetector && !this.options.lng) {
      this.logger.warn('init: no languageDetector is used and no lng is defined');
    }
    const storeApi = ['getResource', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];
    storeApi.forEach(fcName => {
      this[fcName] = (...args) => this.store[fcName](...args);
    });
    const storeApiChained = ['addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle'];
    storeApiChained.forEach(fcName => {
      this[fcName] = (...args) => {
        this.store[fcName](...args);
        return this;
      };
    });
    const deferred = defer();
    const load = () => {
      const finish = (err, t) => {
        this.isInitializing = false;
        if (this.isInitialized && !this.initializedStoreOnce) this.logger.warn('init: i18next is already initialized. You should call init just once!');
        this.isInitialized = true;
        if (!this.options.isClone) this.logger.log('initialized', this.options);
        this.emit('initialized', this.options);
        deferred.resolve(t);
        callback(err, t);
      };
      if (this.languages && !this.isInitialized) return finish(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, finish);
    };
    if (this.options.resources || !this.options.initAsync) {
      load();
    } else {
      setTimeout(load, 0);
    }
    return deferred;
  }
  loadResources(language, callback = noop) {
    let usedCallback = callback;
    const usedLng = isString(language) ? language : this.language;
    if (typeof language === 'function') usedCallback = language;
    if (!this.options.resources || this.options.partialBundledLanguages) {
      if (usedLng?.toLowerCase() === 'cimode' && (!this.options.preload || this.options.preload.length === 0)) return usedCallback();
      const toLoad = [];
      const append = lng => {
        if (!lng) return;
        if (lng === 'cimode') return;
        const lngs = this.services.languageUtils.toResolveHierarchy(lng);
        lngs.forEach(l => {
          if (l === 'cimode') return;
          if (toLoad.indexOf(l) < 0) toLoad.push(l);
        });
      };
      if (!usedLng) {
        const fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        fallbacks.forEach(l => append(l));
      } else {
        append(usedLng);
      }
      this.options.preload?.forEach?.(l => append(l));
      this.services.backendConnector.load(toLoad, this.options.ns, e => {
        if (!e && !this.resolvedLanguage && this.language) this.setResolvedLanguage(this.language);
        usedCallback(e);
      });
    } else {
      usedCallback(null);
    }
  }
  reloadResources(lngs, ns, callback) {
    const deferred = defer();
    if (typeof lngs === 'function') {
      callback = lngs;
      lngs = undefined;
    }
    if (typeof ns === 'function') {
      callback = ns;
      ns = undefined;
    }
    if (!lngs) lngs = this.languages;
    if (!ns) ns = this.options.ns;
    if (!callback) callback = noop;
    this.services.backendConnector.reload(lngs, ns, err => {
      deferred.resolve();
      callback(err);
    });
    return deferred;
  }
  use(module) {
    if (!module) throw new Error('You are passing an undefined module! Please check the object you are passing to i18next.use()');
    if (!module.type) throw new Error('You are passing a wrong module! Please check the object you are passing to i18next.use()');
    if (module.type === 'backend') {
      this.modules.backend = module;
    }
    if (module.type === 'logger' || module.log && module.warn && module.error) {
      this.modules.logger = module;
    }
    if (module.type === 'languageDetector') {
      this.modules.languageDetector = module;
    }
    if (module.type === 'i18nFormat') {
      this.modules.i18nFormat = module;
    }
    if (module.type === 'postProcessor') {
      postProcessor.addPostProcessor(module);
    }
    if (module.type === 'formatter') {
      this.modules.formatter = module;
    }
    if (module.type === '3rdParty') {
      this.modules.external.push(module);
    }
    return this;
  }
  setResolvedLanguage(l) {
    if (!l || !this.languages) return;
    if (['cimode', 'dev'].indexOf(l) > -1) return;
    for (let li = 0; li < this.languages.length; li++) {
      const lngInLngs = this.languages[li];
      if (['cimode', 'dev'].indexOf(lngInLngs) > -1) continue;
      if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
        this.resolvedLanguage = lngInLngs;
        break;
      }
    }
    if (!this.resolvedLanguage && this.languages.indexOf(l) < 0 && this.store.hasLanguageSomeTranslations(l)) {
      this.resolvedLanguage = l;
      this.languages.unshift(l);
    }
  }
  changeLanguage(lng, callback) {
    this.isLanguageChangingTo = lng;
    const deferred = defer();
    this.emit('languageChanging', lng);
    const setLngProps = l => {
      this.language = l;
      this.languages = this.services.languageUtils.toResolveHierarchy(l);
      this.resolvedLanguage = undefined;
      this.setResolvedLanguage(l);
    };
    const done = (err, l) => {
      if (l) {
        if (this.isLanguageChangingTo === lng) {
          setLngProps(l);
          this.translator.changeLanguage(l);
          this.isLanguageChangingTo = undefined;
          this.emit('languageChanged', l);
          this.logger.log('languageChanged', l);
        }
      } else {
        this.isLanguageChangingTo = undefined;
      }
      deferred.resolve((...args) => this.t(...args));
      if (callback) callback(err, (...args) => this.t(...args));
    };
    const setLng = lngs => {
      if (!lng && !lngs && this.services.languageDetector) lngs = [];
      const fl = isString(lngs) ? lngs : lngs && lngs[0];
      const l = this.store.hasLanguageSomeTranslations(fl) ? fl : this.services.languageUtils.getBestMatchFromCodes(isString(lngs) ? [lngs] : lngs);
      if (l) {
        if (!this.language) {
          setLngProps(l);
        }
        if (!this.translator.language) this.translator.changeLanguage(l);
        this.services.languageDetector?.cacheUserLanguage?.(l);
      }
      this.loadResources(l, err => {
        done(err, l);
      });
    };
    if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
      setLng(this.services.languageDetector.detect());
    } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
      if (this.services.languageDetector.detect.length === 0) {
        this.services.languageDetector.detect().then(setLng);
      } else {
        this.services.languageDetector.detect(setLng);
      }
    } else {
      setLng(lng);
    }
    return deferred;
  }
  getFixedT(lng, ns, keyPrefix) {
    const fixedT = (key, opts, ...rest) => {
      let o;
      if (typeof opts !== 'object') {
        o = this.options.overloadTranslationOptionHandler([key, opts].concat(rest));
      } else {
        o = {
          ...opts
        };
      }
      o.lng = o.lng || fixedT.lng;
      o.lngs = o.lngs || fixedT.lngs;
      o.ns = o.ns || fixedT.ns;
      if (o.keyPrefix !== '') o.keyPrefix = o.keyPrefix || keyPrefix || fixedT.keyPrefix;
      const keySeparator = this.options.keySeparator || '.';
      let resultKey;
      if (o.keyPrefix && Array.isArray(key)) {
        resultKey = key.map(k => {
          if (typeof k === 'function') k = keysFromSelector(k, {
            ...this.options,
            ...opts
          });
          return `${o.keyPrefix}${keySeparator}${k}`;
        });
      } else {
        if (typeof key === 'function') key = keysFromSelector(key, {
          ...this.options,
          ...opts
        });
        resultKey = o.keyPrefix ? `${o.keyPrefix}${keySeparator}${key}` : key;
      }
      return this.t(resultKey, o);
    };
    if (isString(lng)) {
      fixedT.lng = lng;
    } else {
      fixedT.lngs = lng;
    }
    fixedT.ns = ns;
    fixedT.keyPrefix = keyPrefix;
    return fixedT;
  }
  t(...args) {
    return this.translator?.translate(...args);
  }
  exists(...args) {
    return this.translator?.exists(...args);
  }
  setDefaultNamespace(ns) {
    this.options.defaultNS = ns;
  }
  hasLoadedNamespace(ns, options = {}) {
    if (!this.isInitialized) {
      this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages);
      return false;
    }
    if (!this.languages || !this.languages.length) {
      this.logger.warn('hasLoadedNamespace: i18n.languages were undefined or empty', this.languages);
      return false;
    }
    const lng = options.lng || this.resolvedLanguage || this.languages[0];
    const fallbackLng = this.options ? this.options.fallbackLng : false;
    const lastLng = this.languages[this.languages.length - 1];
    if (lng.toLowerCase() === 'cimode') return true;
    const loadNotPending = (l, n) => {
      const loadState = this.services.backendConnector.state[`${l}|${n}`];
      return loadState === -1 || loadState === 0 || loadState === 2;
    };
    if (options.precheck) {
      const preResult = options.precheck(this, loadNotPending);
      if (preResult !== undefined) return preResult;
    }
    if (this.hasResourceBundle(lng, ns)) return true;
    if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
    if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
    return false;
  }
  loadNamespaces(ns, callback) {
    const deferred = defer();
    if (!this.options.ns) {
      if (callback) callback();
      return Promise.resolve();
    }
    if (isString(ns)) ns = [ns];
    ns.forEach(n => {
      if (this.options.ns.indexOf(n) < 0) this.options.ns.push(n);
    });
    this.loadResources(err => {
      deferred.resolve();
      if (callback) callback(err);
    });
    return deferred;
  }
  loadLanguages(lngs, callback) {
    const deferred = defer();
    if (isString(lngs)) lngs = [lngs];
    const preloaded = this.options.preload || [];
    const newLngs = lngs.filter(lng => preloaded.indexOf(lng) < 0 && this.services.languageUtils.isSupportedCode(lng));
    if (!newLngs.length) {
      if (callback) callback();
      return Promise.resolve();
    }
    this.options.preload = preloaded.concat(newLngs);
    this.loadResources(err => {
      deferred.resolve();
      if (callback) callback(err);
    });
    return deferred;
  }
  dir(lng) {
    if (!lng) lng = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language);
    if (!lng) return 'rtl';
    try {
      const l = new Intl.Locale(lng);
      if (l && l.getTextInfo) {
        const ti = l.getTextInfo();
        if (ti && ti.direction) return ti.direction;
      }
    } catch (e) {}
    const rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ug', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam', 'ckb'];
    const languageUtils = this.services?.languageUtils || new LanguageUtil(get());
    if (lng.toLowerCase().indexOf('-latn') > 1) return 'ltr';
    return rtlLngs.indexOf(languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf('-arab') > 1 ? 'rtl' : 'ltr';
  }
  static createInstance(options = {}, callback) {
    return new I18n(options, callback);
  }
  cloneInstance(options = {}, callback = noop) {
    const forkResourceStore = options.forkResourceStore;
    if (forkResourceStore) delete options.forkResourceStore;
    const mergedOptions = {
      ...this.options,
      ...options,
      ...{
        isClone: true
      }
    };
    const clone = new I18n(mergedOptions);
    if (options.debug !== undefined || options.prefix !== undefined) {
      clone.logger = clone.logger.clone(options);
    }
    const membersToCopy = ['store', 'services', 'language'];
    membersToCopy.forEach(m => {
      clone[m] = this[m];
    });
    clone.services = {
      ...this.services
    };
    clone.services.utils = {
      hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
    };
    if (forkResourceStore) {
      const clonedData = Object.keys(this.store.data).reduce((prev, l) => {
        prev[l] = {
          ...this.store.data[l]
        };
        prev[l] = Object.keys(prev[l]).reduce((acc, n) => {
          acc[n] = {
            ...prev[l][n]
          };
          return acc;
        }, prev[l]);
        return prev;
      }, {});
      clone.store = new ResourceStore(clonedData, mergedOptions);
      clone.services.resourceStore = clone.store;
    }
    clone.translator = new Translator(clone.services, mergedOptions);
    clone.translator.on('*', (event, ...args) => {
      clone.emit(event, ...args);
    });
    clone.init(mergedOptions, callback);
    clone.translator.options = mergedOptions;
    clone.translator.backendConnector.services.utils = {
      hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
    };
    return clone;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const instance = I18n.createInstance();
instance.createInstance = I18n.createInstance;

const createInstance = instance.createInstance;
const dir = instance.dir;
const init = instance.init;
const loadResources = instance.loadResources;
const reloadResources = instance.reloadResources;
const use = instance.use;
const changeLanguage = instance.changeLanguage;
const getFixedT = instance.getFixedT;
const t = instance.t;
const exists = instance.exists;
const setDefaultNamespace = instance.setDefaultNamespace;
const hasLoadedNamespace = instance.hasLoadedNamespace;
const loadNamespaces = instance.loadNamespaces;
const loadLanguages = instance.loadLanguages;




/***/ }),

/***/ "./node_modules/react-i18next/dist/es/I18nextProvider.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-i18next/dist/es/I18nextProvider.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I18nextProvider: () => (/* binding */ I18nextProvider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context.js */ "./node_modules/react-i18next/dist/es/context.js");


function I18nextProvider({
  i18n,
  defaultNS,
  children
}) {
  const value = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    i18n,
    defaultNS
  }), [i18n, defaultNS]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_context_js__WEBPACK_IMPORTED_MODULE_1__.I18nContext.Provider, {
    value
  }, children);
}

/***/ }),

/***/ "./node_modules/react-i18next/dist/es/Trans.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-i18next/dist/es/Trans.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Trans: () => (/* binding */ Trans),
/* harmony export */   nodesToString: () => (/* reexport safe */ _TransWithoutContext_js__WEBPACK_IMPORTED_MODULE_1__.nodesToString)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _TransWithoutContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TransWithoutContext.js */ "./node_modules/react-i18next/dist/es/TransWithoutContext.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context.js */ "./node_modules/react-i18next/dist/es/context.js");




function Trans({
  children,
  count,
  parent,
  i18nKey,
  context,
  tOptions = {},
  values,
  defaults,
  components,
  ns,
  i18n: i18nFromProps,
  t: tFromProps,
  shouldUnescape,
  ...additionalProps
}) {
  const {
    i18n: i18nFromContext,
    defaultNS: defaultNSFromContext
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_js__WEBPACK_IMPORTED_MODULE_2__.I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || (0,_context_js__WEBPACK_IMPORTED_MODULE_2__.getI18n)();
  const t = tFromProps || i18n?.t.bind(i18n);
  return (0,_TransWithoutContext_js__WEBPACK_IMPORTED_MODULE_1__.Trans)({
    children,
    count,
    parent,
    i18nKey,
    context,
    tOptions,
    values,
    defaults,
    components,
    ns: ns || t?.ns || defaultNSFromContext || i18n?.options?.defaultNS,
    i18n,
    t: tFromProps,
    shouldUnescape,
    ...additionalProps
  });
}

/***/ }),

/***/ "./node_modules/react-i18next/dist/es/TransWithoutContext.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-i18next/dist/es/TransWithoutContext.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Trans: () => (/* binding */ Trans),
/* harmony export */   nodesToString: () => (/* binding */ nodesToString)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var html_parse_stringify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-parse-stringify */ "./node_modules/html-parse-stringify/dist/html-parse-stringify.module.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/react-i18next/dist/es/utils.js");
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defaults.js */ "./node_modules/react-i18next/dist/es/defaults.js");
/* harmony import */ var _i18nInstance_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./i18nInstance.js */ "./node_modules/react-i18next/dist/es/i18nInstance.js");





const hasChildren = (node, checkLength) => {
  if (!node) return false;
  const base = node.props?.children ?? node.children;
  if (checkLength) return base.length > 0;
  return !!base;
};
const getChildren = node => {
  if (!node) return [];
  const children = node.props?.children ?? node.children;
  return node.props?.i18nIsDynamicList ? getAsArray(children) : children;
};
const hasValidReactChildren = children => Array.isArray(children) && children.every(react__WEBPACK_IMPORTED_MODULE_0__.isValidElement);
const getAsArray = data => Array.isArray(data) ? data : [data];
const mergeProps = (source, target) => {
  const newTarget = {
    ...target
  };
  newTarget.props = Object.assign(source.props, target.props);
  return newTarget;
};
const nodesToString = (children, i18nOptions, i18n, i18nKey) => {
  if (!children) return '';
  let stringNode = '';
  const childrenArray = getAsArray(children);
  const keepArray = i18nOptions?.transSupportBasicHtmlNodes ? i18nOptions.transKeepBasicHtmlNodesFor ?? [] : [];
  childrenArray.forEach((child, childIndex) => {
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isString)(child)) {
      stringNode += `${child}`;
      return;
    }
    if ((0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child)) {
      const {
        props,
        type
      } = child;
      const childPropsCount = Object.keys(props).length;
      const shouldKeepChild = keepArray.indexOf(type) > -1;
      const childChildren = props.children;
      if (!childChildren && shouldKeepChild && !childPropsCount) {
        stringNode += `<${type}/>`;
        return;
      }
      if (!childChildren && (!shouldKeepChild || childPropsCount) || props.i18nIsDynamicList) {
        stringNode += `<${childIndex}></${childIndex}>`;
        return;
      }
      if (shouldKeepChild && childPropsCount === 1 && (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isString)(childChildren)) {
        stringNode += `<${type}>${childChildren}</${type}>`;
        return;
      }
      const content = nodesToString(childChildren, i18nOptions, i18n, i18nKey);
      stringNode += `<${childIndex}>${content}</${childIndex}>`;
      return;
    }
    if (child === null) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warn)(i18n, 'TRANS_NULL_VALUE', `Passed in a null value as child`, {
        i18nKey
      });
      return;
    }
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(child)) {
      const {
        format,
        ...clone
      } = child;
      const keys = Object.keys(clone);
      if (keys.length === 1) {
        const value = format ? `${keys[0]}, ${format}` : keys[0];
        stringNode += `{{${value}}}`;
        return;
      }
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warn)(i18n, 'TRANS_INVALID_OBJ', `Invalid child - Object should only have keys {{ value, format }} (format is optional).`, {
        i18nKey,
        child
      });
      return;
    }
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warn)(i18n, 'TRANS_INVALID_VAR', `Passed in a variable like {number} - pass variables for interpolation as full objects like {{number}}.`, {
      i18nKey,
      child
    });
  });
  return stringNode;
};
const renderNodes = (children, knownComponentsMap, targetString, i18n, i18nOptions, combinedTOpts, shouldUnescape) => {
  if (targetString === '') return [];
  const keepArray = i18nOptions.transKeepBasicHtmlNodesFor || [];
  const emptyChildrenButNeedsHandling = targetString && new RegExp(keepArray.map(keep => `<${keep}`).join('|')).test(targetString);
  if (!children && !knownComponentsMap && !emptyChildrenButNeedsHandling && !shouldUnescape) return [targetString];
  const data = knownComponentsMap ?? {};
  const getData = childs => {
    const childrenArray = getAsArray(childs);
    childrenArray.forEach(child => {
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isString)(child)) return;
      if (hasChildren(child)) getData(getChildren(child));else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(child) && !(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child)) Object.assign(data, child);
    });
  };
  getData(children);
  const ast = html_parse_stringify__WEBPACK_IMPORTED_MODULE_1__["default"].parse(`<0>${targetString}</0>`);
  const opts = {
    ...data,
    ...combinedTOpts
  };
  const renderInner = (child, node, rootReactNode) => {
    const childs = getChildren(child);
    const mappedChildren = mapAST(childs, node.children, rootReactNode);
    return hasValidReactChildren(childs) && mappedChildren.length === 0 || child.props?.i18nIsDynamicList ? childs : mappedChildren;
  };
  const pushTranslatedJSX = (child, inner, mem, i, isVoid) => {
    if (child.dummy) {
      child.children = inner;
      mem.push((0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child, {
        key: i
      }, isVoid ? undefined : inner));
    } else {
      mem.push(...react__WEBPACK_IMPORTED_MODULE_0__.Children.map([child], c => {
        const props = {
          ...c.props
        };
        delete props.i18nIsDynamicList;
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(c.type, {
          ...props,
          key: i,
          ref: c.props.ref ?? c.ref
        }, isVoid ? null : inner);
      }));
    }
  };
  const mapAST = (reactNode, astNode, rootReactNode) => {
    const reactNodes = getAsArray(reactNode);
    const astNodes = getAsArray(astNode);
    return astNodes.reduce((mem, node, i) => {
      const translationContent = node.children?.[0]?.content && i18n.services.interpolator.interpolate(node.children[0].content, opts, i18n.language);
      if (node.type === 'tag') {
        let tmp = reactNodes[parseInt(node.name, 10)];
        if (!tmp && knownComponentsMap) tmp = knownComponentsMap[node.name];
        if (rootReactNode.length === 1 && !tmp) tmp = rootReactNode[0][node.name];
        if (!tmp) tmp = {};
        const child = Object.keys(node.attrs).length !== 0 ? mergeProps({
          props: node.attrs
        }, tmp) : tmp;
        const isElement = (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child);
        const isValidTranslationWithChildren = isElement && hasChildren(node, true) && !node.voidElement;
        const isEmptyTransWithHTML = emptyChildrenButNeedsHandling && (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(child) && child.dummy && !isElement;
        const isKnownComponent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(knownComponentsMap) && Object.hasOwnProperty.call(knownComponentsMap, node.name);
        if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isString)(child)) {
          const value = i18n.services.interpolator.interpolate(child, opts, i18n.language);
          mem.push(value);
        } else if (hasChildren(child) || isValidTranslationWithChildren) {
          const inner = renderInner(child, node, rootReactNode);
          pushTranslatedJSX(child, inner, mem, i);
        } else if (isEmptyTransWithHTML) {
          const inner = mapAST(reactNodes, node.children, rootReactNode);
          pushTranslatedJSX(child, inner, mem, i);
        } else if (Number.isNaN(parseFloat(node.name))) {
          if (isKnownComponent) {
            const inner = renderInner(child, node, rootReactNode);
            pushTranslatedJSX(child, inner, mem, i, node.voidElement);
          } else if (i18nOptions.transSupportBasicHtmlNodes && keepArray.indexOf(node.name) > -1) {
            if (node.voidElement) {
              mem.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(node.name, {
                key: `${node.name}-${i}`
              }));
            } else {
              const inner = mapAST(reactNodes, node.children, rootReactNode);
              mem.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(node.name, {
                key: `${node.name}-${i}`
              }, inner));
            }
          } else if (node.voidElement) {
            mem.push(`<${node.name} />`);
          } else {
            const inner = mapAST(reactNodes, node.children, rootReactNode);
            mem.push(`<${node.name}>${inner}</${node.name}>`);
          }
        } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(child) && !isElement) {
          const content = node.children[0] ? translationContent : null;
          if (content) mem.push(content);
        } else {
          pushTranslatedJSX(child, translationContent, mem, i, node.children.length !== 1 || !translationContent);
        }
      } else if (node.type === 'text') {
        const wrapTextNodes = i18nOptions.transWrapTextNodes;
        const content = shouldUnescape ? i18nOptions.unescape(i18n.services.interpolator.interpolate(node.content, opts, i18n.language)) : i18n.services.interpolator.interpolate(node.content, opts, i18n.language);
        if (wrapTextNodes) {
          mem.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(wrapTextNodes, {
            key: `${node.name}-${i}`
          }, content));
        } else {
          mem.push(content);
        }
      }
      return mem;
    }, []);
  };
  const result = mapAST([{
    dummy: true,
    children: children || []
  }], ast, getAsArray(children || []));
  return getChildren(result[0]);
};
const fixComponentProps = (component, index, translation) => {
  const componentKey = component.key || index;
  const comp = (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(component, {
    key: componentKey
  });
  if (!comp.props || !comp.props.children || translation.indexOf(`${index}/>`) < 0 && translation.indexOf(`${index} />`) < 0) {
    return comp;
  }
  function Componentized() {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, comp);
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Componentized, {
    key: componentKey
  });
};
const generateArrayComponents = (components, translation) => components.map((c, index) => fixComponentProps(c, index, translation));
const generateObjectComponents = (components, translation) => {
  const componentMap = {};
  Object.keys(components).forEach(c => {
    Object.assign(componentMap, {
      [c]: fixComponentProps(components[c], c, translation)
    });
  });
  return componentMap;
};
const generateComponents = (components, translation, i18n, i18nKey) => {
  if (!components) return null;
  if (Array.isArray(components)) {
    return generateArrayComponents(components, translation);
  }
  if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(components)) {
    return generateObjectComponents(components, translation);
  }
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warnOnce)(i18n, 'TRANS_INVALID_COMPONENTS', `<Trans /> "components" prop expects an object or array`, {
    i18nKey
  });
  return null;
};
const isComponentsMap = object => {
  if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(object)) return false;
  if (Array.isArray(object)) return false;
  return Object.keys(object).reduce((acc, key) => acc && Number.isNaN(Number.parseFloat(key)), true);
};
function Trans({
  children,
  count,
  parent,
  i18nKey,
  context,
  tOptions = {},
  values,
  defaults,
  components,
  ns,
  i18n: i18nFromProps,
  t: tFromProps,
  shouldUnescape,
  ...additionalProps
}) {
  const i18n = i18nFromProps || (0,_i18nInstance_js__WEBPACK_IMPORTED_MODULE_4__.getI18n)();
  if (!i18n) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warnOnce)(i18n, 'NO_I18NEXT_INSTANCE', `Trans: You need to pass in an i18next instance using i18nextReactModule`, {
      i18nKey
    });
    return children;
  }
  const t = tFromProps || i18n.t.bind(i18n) || (k => k);
  const reactI18nextOptions = {
    ...(0,_defaults_js__WEBPACK_IMPORTED_MODULE_3__.getDefaults)(),
    ...i18n.options?.react
  };
  let namespaces = ns || t.ns || i18n.options?.defaultNS;
  namespaces = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isString)(namespaces) ? [namespaces] : namespaces || ['translation'];
  const nodeAsString = nodesToString(children, reactI18nextOptions, i18n, i18nKey);
  const defaultValue = defaults || nodeAsString || reactI18nextOptions.transEmptyNodeValue || i18nKey;
  const {
    hashTransKey
  } = reactI18nextOptions;
  const key = i18nKey || (hashTransKey ? hashTransKey(nodeAsString || defaultValue) : nodeAsString || defaultValue);
  if (i18n.options?.interpolation?.defaultVariables) {
    values = values && Object.keys(values).length > 0 ? {
      ...values,
      ...i18n.options.interpolation.defaultVariables
    } : {
      ...i18n.options.interpolation.defaultVariables
    };
  }
  const interpolationOverride = values || count !== undefined && !i18n.options?.interpolation?.alwaysFormat || !children ? tOptions.interpolation : {
    interpolation: {
      ...tOptions.interpolation,
      prefix: '#$?',
      suffix: '?$#'
    }
  };
  const combinedTOpts = {
    ...tOptions,
    context: context || tOptions.context,
    count,
    ...values,
    ...interpolationOverride,
    defaultValue,
    ns: namespaces
  };
  const translation = key ? t(key, combinedTOpts) : defaultValue;
  const generatedComponents = generateComponents(components, translation, i18n, i18nKey);
  let indexedChildren = generatedComponents || children;
  let componentsMap = null;
  if (isComponentsMap(generatedComponents)) {
    componentsMap = generatedComponents;
    indexedChildren = children;
  }
  const content = renderNodes(indexedChildren, componentsMap, translation, i18n, reactI18nextOptions, combinedTOpts, shouldUnescape);
  const useAsParent = parent ?? reactI18nextOptions.defaultTransParent;
  return useAsParent ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(useAsParent, additionalProps, content) : content;
}

/***/ }),

/***/ "./node_modules/react-i18next/dist/es/Translation.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-i18next/dist/es/Translation.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Translation: () => (/* binding */ Translation)
/* harmony export */ });
/* harmony import */ var _useTranslation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useTranslation.js */ "./node_modules/react-i18next/dist/es/useTranslation.js");

const Translation = ({
  ns,
  children,
  ...options
}) => {
  const [t, i18n, ready] = (0,_useTranslation_js__WEBPACK_IMPORTED_MODULE_0__.useTranslation)(ns, options);
  return children(t, {
    i18n,
    lng: i18n.language
  }, ready);
};

/***/ }),

/***/ "./node_modules/react-i18next/dist/es/context.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-i18next/dist/es/context.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I18nContext: () => (/* binding */ I18nContext),
/* harmony export */   ReportNamespaces: () => (/* binding */ ReportNamespaces),
/* harmony export */   composeInitialProps: () => (/* binding */ composeInitialProps),
/* harmony export */   getDefaults: () => (/* reexport safe */ _defaults_js__WEBPACK_IMPORTED_MODULE_1__.getDefaults),
/* harmony export */   getI18n: () => (/* reexport safe */ _i18nInstance_js__WEBPACK_IMPORTED_MODULE_2__.getI18n),
/* harmony export */   getInitialProps: () => (/* binding */ getInitialProps),
/* harmony export */   initReactI18next: () => (/* reexport safe */ _initReactI18next_js__WEBPACK_IMPORTED_MODULE_3__.initReactI18next),
/* harmony export */   setDefaults: () => (/* reexport safe */ _defaults_js__WEBPACK_IMPORTED_MODULE_1__.setDefaults),
/* harmony export */   setI18n: () => (/* reexport safe */ _i18nInstance_js__WEBPACK_IMPORTED_MODULE_2__.setI18n)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaults.js */ "./node_modules/react-i18next/dist/es/defaults.js");
/* harmony import */ var _i18nInstance_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./i18nInstance.js */ "./node_modules/react-i18next/dist/es/i18nInstance.js");
/* harmony import */ var _initReactI18next_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initReactI18next.js */ "./node_modules/react-i18next/dist/es/initReactI18next.js");





const I18nContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)();
class ReportNamespaces {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(namespaces) {
    namespaces.forEach(ns => {
      if (!this.usedNamespaces[ns]) this.usedNamespaces[ns] = true;
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
const composeInitialProps = ForComponent => async ctx => {
  const componentsInitialProps = (await ForComponent.getInitialProps?.(ctx)) ?? {};
  const i18nInitialProps = getInitialProps();
  return {
    ...componentsInitialProps,
    ...i18nInitialProps
  };
};
const getInitialProps = () => {
  const i18n = (0,_i18nInstance_js__WEBPACK_IMPORTED_MODULE_2__.getI18n)();
  const namespaces = i18n.reportNamespaces?.getUsedNamespaces() ?? [];
  const ret = {};
  const initialI18nStore = {};
  i18n.languages.forEach(l => {
    initialI18nStore[l] = {};
    namespaces.forEach(ns => {
      initialI18nStore[l][ns] = i18n.getResourceBundle(l, ns) || {};
    });
  });
  ret.initialI18nStore = initialI18nStore;
  ret.initialLanguage = i18n.language;
  return ret;
};

/***/ }),

/***/ "./node_modules/react-i18next/dist/es/defaults.js":
/*!********************************************************!*\
  !*** ./node_modules/react-i18next/dist/es/defaults.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaults: () => (/* binding */ getDefaults),
/* harmony export */   setDefaults: () => (/* binding */ setDefaults)
/* harmony export */ });
/* harmony import */ var _unescape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unescape.js */ "./node_modules/react-i18next/dist/es/unescape.js");

let defaultOptions = {
  bindI18n: 'languageChanged',
  bindI18nStore: '',
  transEmptyNodeValue: '',
  transSupportBasicHtmlNodes: true,
  transWrapTextNodes: '',
  transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
  useSuspense: true,
  unescape: _unescape_js__WEBPACK_IMPORTED_MODULE_0__.unescape
};
const setDefaults = (options = {}) => {
  defaultOptions = {
    ...defaultOptions,
    ...options
  };
};
const getDefaults = () => defaultOptions;

/***/ }),

/***/ "./node_modules/react-i18next/dist/es/i18nInstance.js":
/*!************************************************************!*\
  !*** ./node_modules/react-i18next/dist/es/i18nInstance.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getI18n: () => (/* binding */ getI18n),
/* harmony export */   setI18n: () => (/* binding */ setI18n)
/* harmony export */ });
let i18nInstance;
const setI18n = instance => {
  i18nInstance = instance;
};
const getI18n = () => i18nInstance;

/***/ }),

/***/ "./node_modules/react-i18next/dist/es/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-i18next/dist/es/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I18nContext: () => (/* reexport safe */ _context_js__WEBPACK_IMPORTED_MODULE_11__.I18nContext),
/* harmony export */   I18nextProvider: () => (/* reexport safe */ _I18nextProvider_js__WEBPACK_IMPORTED_MODULE_5__.I18nextProvider),
/* harmony export */   Trans: () => (/* reexport safe */ _Trans_js__WEBPACK_IMPORTED_MODULE_0__.Trans),
/* harmony export */   TransWithoutContext: () => (/* reexport safe */ _TransWithoutContext_js__WEBPACK_IMPORTED_MODULE_1__.Trans),
/* harmony export */   Translation: () => (/* reexport safe */ _Translation_js__WEBPACK_IMPORTED_MODULE_4__.Translation),
/* harmony export */   composeInitialProps: () => (/* reexport safe */ _context_js__WEBPACK_IMPORTED_MODULE_11__.composeInitialProps),
/* harmony export */   date: () => (/* binding */ date),
/* harmony export */   getDefaults: () => (/* reexport safe */ _defaults_js__WEBPACK_IMPORTED_MODULE_9__.getDefaults),
/* harmony export */   getI18n: () => (/* reexport safe */ _i18nInstance_js__WEBPACK_IMPORTED_MODULE_10__.getI18n),
/* harmony export */   getInitialProps: () => (/* reexport safe */ _context_js__WEBPACK_IMPORTED_MODULE_11__.getInitialProps),
/* harmony export */   initReactI18next: () => (/* reexport safe */ _initReactI18next_js__WEBPACK_IMPORTED_MODULE_8__.initReactI18next),
/* harmony export */   number: () => (/* binding */ number),
/* harmony export */   plural: () => (/* binding */ plural),
/* harmony export */   select: () => (/* binding */ select),
/* harmony export */   selectOrdinal: () => (/* binding */ selectOrdinal),
/* harmony export */   setDefaults: () => (/* reexport safe */ _defaults_js__WEBPACK_IMPORTED_MODULE_9__.setDefaults),
/* harmony export */   setI18n: () => (/* reexport safe */ _i18nInstance_js__WEBPACK_IMPORTED_MODULE_10__.setI18n),
/* harmony export */   time: () => (/* binding */ time),
/* harmony export */   useSSR: () => (/* reexport safe */ _useSSR_js__WEBPACK_IMPORTED_MODULE_7__.useSSR),
/* harmony export */   useTranslation: () => (/* reexport safe */ _useTranslation_js__WEBPACK_IMPORTED_MODULE_2__.useTranslation),
/* harmony export */   withSSR: () => (/* reexport safe */ _withSSR_js__WEBPACK_IMPORTED_MODULE_6__.withSSR),
/* harmony export */   withTranslation: () => (/* reexport safe */ _withTranslation_js__WEBPACK_IMPORTED_MODULE_3__.withTranslation)
/* harmony export */ });
/* harmony import */ var _Trans_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Trans.js */ "./node_modules/react-i18next/dist/es/Trans.js");
/* harmony import */ var _TransWithoutContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TransWithoutContext.js */ "./node_modules/react-i18next/dist/es/TransWithoutContext.js");
/* harmony import */ var _useTranslation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useTranslation.js */ "./node_modules/react-i18next/dist/es/useTranslation.js");
/* harmony import */ var _withTranslation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./withTranslation.js */ "./node_modules/react-i18next/dist/es/withTranslation.js");
/* harmony import */ var _Translation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Translation.js */ "./node_modules/react-i18next/dist/es/Translation.js");
/* harmony import */ var _I18nextProvider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./I18nextProvider.js */ "./node_modules/react-i18next/dist/es/I18nextProvider.js");
/* harmony import */ var _withSSR_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./withSSR.js */ "./node_modules/react-i18next/dist/es/withSSR.js");
/* harmony import */ var _useSSR_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useSSR.js */ "./node_modules/react-i18next/dist/es/useSSR.js");
/* harmony import */ var _initReactI18next_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./initReactI18next.js */ "./node_modules/react-i18next/dist/es/initReactI18next.js");
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./defaults.js */ "./node_modules/react-i18next/dist/es/defaults.js");
/* harmony import */ var _i18nInstance_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./i18nInstance.js */ "./node_modules/react-i18next/dist/es/i18nInstance.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./context.js */ "./node_modules/react-i18next/dist/es/context.js");












const date = () => '';
const time = () => '';
const number = () => '';
const select = () => '';
const plural = () => '';
const selectOrdinal = () => '';

/***/ }),

/***/ "./node_modules/react-i18next/dist/es/initReactI18next.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-i18next/dist/es/initReactI18next.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initReactI18next: () => (/* binding */ initReactI18next)
/* harmony export */ });
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaults.js */ "./node_modules/react-i18next/dist/es/defaults.js");
/* harmony import */ var _i18nInstance_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18nInstance.js */ "./node_modules/react-i18next/dist/es/i18nInstance.js");


const initReactI18next = {
  type: '3rdParty',
  init(instance) {
    (0,_defaults_js__WEBPACK_IMPORTED_MODULE_0__.setDefaults)(instance.options.react);
    (0,_i18nInstance_js__WEBPACK_IMPORTED_MODULE_1__.setI18n)(instance);
  }
};

/***/ }),

/***/ "./node_modules/react-i18next/dist/es/unescape.js":
/*!********************************************************!*\
  !*** ./node_modules/react-i18next/dist/es/unescape.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   unescape: () => (/* binding */ unescape)
/* harmony export */ });
const matchHtmlEntity = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;
const htmlEntities = {
  '&amp;': '&',
  '&#38;': '&',
  '&lt;': '<',
  '&#60;': '<',
  '&gt;': '>',
  '&#62;': '>',
  '&apos;': "'",
  '&#39;': "'",
  '&quot;': '"',
  '&#34;': '"',
  '&nbsp;': ' ',
  '&#160;': ' ',
  '&copy;': '©',
  '&#169;': '©',
  '&reg;': '®',
  '&#174;': '®',
  '&hellip;': '…',
  '&#8230;': '…',
  '&#x2F;': '/',
  '&#47;': '/'
};
const unescapeHtmlEntity = m => htmlEntities[m];
const unescape = text => text.replace(matchHtmlEntity, unescapeHtmlEntity);

/***/ }),

/***/ "./node_modules/react-i18next/dist/es/useSSR.js":
/*!******************************************************!*\
  !*** ./node_modules/react-i18next/dist/es/useSSR.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSSR: () => (/* binding */ useSSR)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context.js */ "./node_modules/react-i18next/dist/es/context.js");


const useSSR = (initialI18nStore, initialLanguage, props = {}) => {
  const {
    i18n: i18nFromProps
  } = props;
  const {
    i18n: i18nFromContext
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_js__WEBPACK_IMPORTED_MODULE_1__.I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || (0,_context_js__WEBPACK_IMPORTED_MODULE_1__.getI18n)();
  if (i18n.options?.isClone) return;
  if (initialI18nStore && !i18n.initializedStoreOnce) {
    i18n.services.resourceStore.data = initialI18nStore;
    i18n.options.ns = Object.values(initialI18nStore).reduce((mem, lngResources) => {
      Object.keys(lngResources).forEach(ns => {
        if (mem.indexOf(ns) < 0) mem.push(ns);
      });
      return mem;
    }, i18n.options.ns);
    i18n.initializedStoreOnce = true;
    i18n.isInitialized = true;
  }
  if (initialLanguage && !i18n.initializedLanguageOnce) {
    i18n.changeLanguage(initialLanguage);
    i18n.initializedLanguageOnce = true;
  }
};

/***/ }),

/***/ "./node_modules/react-i18next/dist/es/useTranslation.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-i18next/dist/es/useTranslation.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTranslation: () => (/* binding */ useTranslation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context.js */ "./node_modules/react-i18next/dist/es/context.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/react-i18next/dist/es/utils.js");



const usePrevious = (value, ignore) => {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    ref.current = ignore ? ref.current : value;
  }, [value, ignore]);
  return ref.current;
};
const alwaysNewT = (i18n, language, namespace, keyPrefix) => i18n.getFixedT(language, namespace, keyPrefix);
const useMemoizedT = (i18n, language, namespace, keyPrefix) => (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(alwaysNewT(i18n, language, namespace, keyPrefix), [i18n, language, namespace, keyPrefix]);
const useTranslation = (ns, props = {}) => {
  const {
    i18n: i18nFromProps
  } = props;
  const {
    i18n: i18nFromContext,
    defaultNS: defaultNSFromContext
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_js__WEBPACK_IMPORTED_MODULE_1__.I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || (0,_context_js__WEBPACK_IMPORTED_MODULE_1__.getI18n)();
  if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new _context_js__WEBPACK_IMPORTED_MODULE_1__.ReportNamespaces();
  if (!i18n) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warnOnce)(i18n, 'NO_I18NEXT_INSTANCE', 'useTranslation: You will need to pass in an i18next instance by using initReactI18next');
    const notReadyT = (k, optsOrDefaultValue) => {
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isString)(optsOrDefaultValue)) return optsOrDefaultValue;
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(optsOrDefaultValue) && (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isString)(optsOrDefaultValue.defaultValue)) return optsOrDefaultValue.defaultValue;
      return Array.isArray(k) ? k[k.length - 1] : k;
    };
    const retNotReady = [notReadyT, {}, false];
    retNotReady.t = notReadyT;
    retNotReady.i18n = {};
    retNotReady.ready = false;
    return retNotReady;
  }
  if (i18n.options.react?.wait) (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warnOnce)(i18n, 'DEPRECATED_OPTION', 'useTranslation: It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.');
  const i18nOptions = {
    ...(0,_context_js__WEBPACK_IMPORTED_MODULE_1__.getDefaults)(),
    ...i18n.options.react,
    ...props
  };
  const {
    useSuspense,
    keyPrefix
  } = i18nOptions;
  let namespaces = ns || defaultNSFromContext || i18n.options?.defaultNS;
  namespaces = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isString)(namespaces) ? [namespaces] : namespaces || ['translation'];
  i18n.reportNamespaces.addUsedNamespaces?.(namespaces);
  const ready = (i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every(n => (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.hasLoadedNamespace)(n, i18n, i18nOptions));
  const memoGetT = useMemoizedT(i18n, props.lng || null, i18nOptions.nsMode === 'fallback' ? namespaces : namespaces[0], keyPrefix);
  const getT = () => memoGetT;
  const getNewT = () => alwaysNewT(i18n, props.lng || null, i18nOptions.nsMode === 'fallback' ? namespaces : namespaces[0], keyPrefix);
  const [t, setT] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(getT);
  let joinedNS = namespaces.join();
  if (props.lng) joinedNS = `${props.lng}${joinedNS}`;
  const previousJoinedNS = usePrevious(joinedNS);
  const isMounted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      bindI18n,
      bindI18nStore
    } = i18nOptions;
    isMounted.current = true;
    if (!ready && !useSuspense) {
      if (props.lng) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.loadLanguages)(i18n, props.lng, namespaces, () => {
          if (isMounted.current) setT(getNewT);
        });
      } else {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.loadNamespaces)(i18n, namespaces, () => {
          if (isMounted.current) setT(getNewT);
        });
      }
    }
    if (ready && previousJoinedNS && previousJoinedNS !== joinedNS && isMounted.current) {
      setT(getNewT);
    }
    const boundReset = () => {
      if (isMounted.current) setT(getNewT);
    };
    if (bindI18n) i18n?.on(bindI18n, boundReset);
    if (bindI18nStore) i18n?.store.on(bindI18nStore, boundReset);
    return () => {
      isMounted.current = false;
      if (i18n && bindI18n) bindI18n?.split(' ').forEach(e => i18n.off(e, boundReset));
      if (bindI18nStore && i18n) bindI18nStore.split(' ').forEach(e => i18n.store.off(e, boundReset));
    };
  }, [i18n, joinedNS]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isMounted.current && ready) {
      setT(getT);
    }
  }, [i18n, keyPrefix, ready]);
  const ret = [t, i18n, ready];
  ret.t = t;
  ret.i18n = i18n;
  ret.ready = ready;
  if (ready) return ret;
  if (!ready && !useSuspense) return ret;
  throw new Promise(resolve => {
    if (props.lng) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.loadLanguages)(i18n, props.lng, namespaces, () => resolve());
    } else {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.loadNamespaces)(i18n, namespaces, () => resolve());
    }
  });
};

/***/ }),

/***/ "./node_modules/react-i18next/dist/es/utils.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-i18next/dist/es/utils.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDisplayName: () => (/* binding */ getDisplayName),
/* harmony export */   hasLoadedNamespace: () => (/* binding */ hasLoadedNamespace),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   loadLanguages: () => (/* binding */ loadLanguages),
/* harmony export */   loadNamespaces: () => (/* binding */ loadNamespaces),
/* harmony export */   warn: () => (/* binding */ warn),
/* harmony export */   warnOnce: () => (/* binding */ warnOnce)
/* harmony export */ });
const warn = (i18n, code, msg, rest) => {
  const args = [msg, {
    code,
    ...(rest || {})
  }];
  if (i18n?.services?.logger?.forward) {
    return i18n.services.logger.forward(args, 'warn', 'react-i18next::', true);
  }
  if (isString(args[0])) args[0] = `react-i18next:: ${args[0]}`;
  if (i18n?.services?.logger?.warn) {
    i18n.services.logger.warn(...args);
  } else if (console?.warn) {
    console.warn(...args);
  }
};
const alreadyWarned = {};
const warnOnce = (i18n, code, msg, rest) => {
  if (isString(msg) && alreadyWarned[msg]) return;
  if (isString(msg)) alreadyWarned[msg] = new Date();
  warn(i18n, code, msg, rest);
};
const loadedClb = (i18n, cb) => () => {
  if (i18n.isInitialized) {
    cb();
  } else {
    const initialized = () => {
      setTimeout(() => {
        i18n.off('initialized', initialized);
      }, 0);
      cb();
    };
    i18n.on('initialized', initialized);
  }
};
const loadNamespaces = (i18n, ns, cb) => {
  i18n.loadNamespaces(ns, loadedClb(i18n, cb));
};
const loadLanguages = (i18n, lng, ns, cb) => {
  if (isString(ns)) ns = [ns];
  if (i18n.options.preload && i18n.options.preload.indexOf(lng) > -1) return loadNamespaces(i18n, ns, cb);
  ns.forEach(n => {
    if (i18n.options.ns.indexOf(n) < 0) i18n.options.ns.push(n);
  });
  i18n.loadLanguages(lng, loadedClb(i18n, cb));
};
const hasLoadedNamespace = (ns, i18n, options = {}) => {
  if (!i18n.languages || !i18n.languages.length) {
    warnOnce(i18n, 'NO_LANGUAGES', 'i18n.languages were undefined or empty', {
      languages: i18n.languages
    });
    return true;
  }
  return i18n.hasLoadedNamespace(ns, {
    lng: options.lng,
    precheck: (i18nInstance, loadNotPending) => {
      if (options.bindI18n && options.bindI18n.indexOf('languageChanging') > -1 && i18nInstance.services.backendConnector.backend && i18nInstance.isLanguageChangingTo && !loadNotPending(i18nInstance.isLanguageChangingTo, ns)) return false;
    }
  });
};
const getDisplayName = Component => Component.displayName || Component.name || (isString(Component) && Component.length > 0 ? Component : 'Unknown');
const isString = obj => typeof obj === 'string';
const isObject = obj => typeof obj === 'object' && obj !== null;

/***/ }),

/***/ "./node_modules/react-i18next/dist/es/withSSR.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-i18next/dist/es/withSSR.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   withSSR: () => (/* binding */ withSSR)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _useSSR_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useSSR.js */ "./node_modules/react-i18next/dist/es/useSSR.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context.js */ "./node_modules/react-i18next/dist/es/context.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/react-i18next/dist/es/utils.js");




const withSSR = () => function Extend(WrappedComponent) {
  function I18nextWithSSR({
    initialI18nStore,
    initialLanguage,
    ...rest
  }) {
    (0,_useSSR_js__WEBPACK_IMPORTED_MODULE_1__.useSSR)(initialI18nStore, initialLanguage);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(WrappedComponent, {
      ...rest
    });
  }
  I18nextWithSSR.getInitialProps = (0,_context_js__WEBPACK_IMPORTED_MODULE_2__.composeInitialProps)(WrappedComponent);
  I18nextWithSSR.displayName = `withI18nextSSR(${(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.getDisplayName)(WrappedComponent)})`;
  I18nextWithSSR.WrappedComponent = WrappedComponent;
  return I18nextWithSSR;
};

/***/ }),

/***/ "./node_modules/react-i18next/dist/es/withTranslation.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-i18next/dist/es/withTranslation.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   withTranslation: () => (/* binding */ withTranslation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _useTranslation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useTranslation.js */ "./node_modules/react-i18next/dist/es/useTranslation.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/react-i18next/dist/es/utils.js");



const withTranslation = (ns, options = {}) => function Extend(WrappedComponent) {
  function I18nextWithTranslation({
    forwardedRef,
    ...rest
  }) {
    const [t, i18n, ready] = (0,_useTranslation_js__WEBPACK_IMPORTED_MODULE_1__.useTranslation)(ns, {
      ...rest,
      keyPrefix: options.keyPrefix
    });
    const passDownProps = {
      ...rest,
      t,
      i18n,
      tReady: ready
    };
    if (options.withRef && forwardedRef) {
      passDownProps.ref = forwardedRef;
    } else if (!options.withRef && forwardedRef) {
      passDownProps.forwardedRef = forwardedRef;
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(WrappedComponent, passDownProps);
  }
  I18nextWithTranslation.displayName = `withI18nextTranslation(${(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.getDisplayName)(WrappedComponent)})`;
  I18nextWithTranslation.WrappedComponent = WrappedComponent;
  const forwardRef = (props, ref) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(I18nextWithTranslation, Object.assign({}, props, {
    forwardedRef: ref
  }));
  return options.withRef ? (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(forwardRef) : I18nextWithTranslation;
};

/***/ }),

/***/ "./node_modules/void-elements/index.js":
/*!*********************************************!*\
  !*** ./node_modules/void-elements/index.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * This file automatically generated from `pre-publish.js`.
 * Do not manually edit.
 */

module.exports = {
  "area": true,
  "base": true,
  "br": true,
  "col": true,
  "embed": true,
  "hr": true,
  "img": true,
  "input": true,
  "link": true,
  "meta": true,
  "param": true,
  "source": true,
  "track": true,
  "wbr": true
};


/***/ }),

/***/ "./src/MarketplaceApp.jsx":
/*!********************************!*\
  !*** ./src/MarketplaceApp.jsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_MarketPlace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/MarketPlace */ "./src/components/MarketPlace.jsx");
/* harmony import */ var _components_ProductBanner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ProductBanner */ "./src/components/ProductBanner.jsx");
/* harmony import */ var _components_FeaturedCarousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/FeaturedCarousel */ "./src/components/FeaturedCarousel.jsx");
/* harmony import */ var _components_LoadingOverlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/LoadingOverlay */ "./src/components/LoadingOverlay.jsx");
/* harmony import */ var _context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context/MarketplaceContext */ "./src/context/MarketplaceContext.jsx");








// Inner component that can access the context
const MarketplaceContent = () => {
  const {
    allPluginsActivated
  } = (0,_context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_5__.useMarketplace)();

  // Track detail page visibility with state
  const [isDetailPage, setIsDetailPage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(typeof window !== "undefined" && new URLSearchParams(window.location.search).get("plugin"));

  // Listen for URL changes (both popstate and custom events)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const checkDetailPage = () => {
      const hasPlugin = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("plugin");
      setIsDetailPage(!!hasPlugin);
    };

    // Listen for browser back/forward
    window.addEventListener('popstate', checkDetailPage);

    // Listen for programmatic URL changes (from pushState)
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      checkDetailPage();
    };
    return () => {
      window.removeEventListener('popstate', checkDetailPage);
      window.history.pushState = originalPushState;
    };
  }, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_LoadingOverlay__WEBPACK_IMPORTED_MODULE_4__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-activated"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "marketplace-container gv-layout-product gv-surface-dim gv-w-max-container gv-mx-auto gv-p-fluid "
  }, !isDetailPage && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ProductBanner__WEBPACK_IMPORTED_MODULE_2__["default"], null), !isDetailPage && !allPluginsActivated && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_FeaturedCarousel__WEBPACK_IMPORTED_MODULE_3__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_MarketPlace__WEBPACK_IMPORTED_MODULE_1__["default"], null))));
};
const MarketplaceApp = ({
  apiBaseUrl,
  useWPHandlers,
  wpConfig,
  enableDefaultStyles,
  assetsBaseUrl
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_5__.MarketplaceProvider, {
    apiBaseUrl: apiBaseUrl,
    useWPHandlers: useWPHandlers,
    wpConfig: wpConfig,
    enableDefaultStyles: enableDefaultStyles,
    assetsBaseUrl: assetsBaseUrl
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(MarketplaceContent, null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MarketplaceApp);

/***/ }),

/***/ "./src/components/ErrorState.jsx":
/*!***************************************!*\
  !*** ./src/components/ErrorState.jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ErrorState)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/MarketplaceContext */ "./src/context/MarketplaceContext.jsx");



function ErrorState() {
  const {
    assetsBaseUrl
  } = (0,_context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_1__.useMarketplace)();
  const assetBase = assetsBaseUrl || typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl || "";
  const iconBase = assetBase ? `${assetBase}assets/icons/` : "";
  const handleRefresh = () => {
    window.location.reload();
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-items-center gv-justify-center gv-p-fluid"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-text-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: "gv-header-md gv-mb-sm"
  }, "Couldn't load the page"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "gv-text-md gv-mb-lg"
  }, "Please refresh the page and contact our support if the issue persists."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "gv-button gv-button-primary buttons-min-width",
    onClick: handleRefresh
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Refresh page"))));
}

/***/ }),

/***/ "./src/components/ErrorToast.jsx":
/*!***************************************!*\
  !*** ./src/components/ErrorToast.jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ErrorToast)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/MarketplaceContext */ "./src/context/MarketplaceContext.jsx");



function ErrorToast({
  plugin
}) {
  const {
    assetsBaseUrl,
    errorState,
    setErrorState
  } = (0,_context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_1__.useMarketplace)();
  if (!errorState || !errorState.visible || errorState.pluginSlug !== plugin?.slug) {
    return null;
  }
  const assetBase = assetsBaseUrl || typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl || "";
  const iconBase = assetBase ? `${assetBase}assets/` : "";
  const handleClose = () => {
    setErrorState({
      visible: false,
      type: null,
      pluginSlug: null
    });
  };
  const isActivateError = errorState.type === 'activate';
  const isInstallError = errorState.type === 'install';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-toast-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-toast gv-toast-alert gv-visible"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("gv-icon", {
    className: "gv-notice-icon",
    "aria-hidden": "true",
    src: `${iconBase}icons/error.svg`
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-toast-content"
  }, isActivateError && "Couldn't activate plugin.", isInstallError && "Couldn't install plugin."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "gv-toast-close",
    "aria-label": "Close",
    onClick: handleClose
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("gv-icon", {
    "aria-hidden": "true",
    src: `${iconBase}icons/close.svg`
  }))));
}

/***/ }),

/***/ "./src/components/FeaturedCarousel.jsx":
/*!*********************************************!*\
  !*** ./src/components/FeaturedCarousel.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FeaturedCarousel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/MarketplaceContext */ "./src/context/MarketplaceContext.jsx");



function FeaturedCarousel() {
  const {
    plugins,
    assetsBaseUrl
  } = (0,_context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_1__.useMarketplace)();
  const [currentIndex, setCurrentIndex] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [slidesPerView, setSlidesPerView] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(2);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth > 1024) {
        setSlidesPerView(2); // Desktop: show 2 slides
      } else if (window.innerWidth >= 600) {
        setSlidesPerView(1); // Tablet: show 2 slides
      } else {
        setSlidesPerView(1); // Mobile: show 1 slide
      }
    };
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  // Filter featured plugins that are not active
  const featuredPlugins = plugins.filter(plugin => plugin.featured === true && plugin.activated !== true);
  const assetBase = assetsBaseUrl || typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl || "";
  const iconBase = assetBase ? `${assetBase}assets/icons/` : "";
  const totalSlides = featuredPlugins.length;
  const maxIndex = Math.max(0, totalSlides - slidesPerView);
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };
  const goToNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // If no featured plugins, don't render anything
  if (!featuredPlugins || featuredPlugins.length === 0) {
    return null;
  }
  const goToSlide = index => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Navigate to plugin detail page
  const handleReadMore = plugin => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("plugin", plugin.slug);
      window.history.pushState({}, "", url.toString());

      // Dispatch custom event to notify app of navigation
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "gv-featured-carousel gv-w-full"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-carousel-header gv-mb-md"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: "gv-title gv-heading-sm"
  }, "Recommended for you")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-carousel-container",
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-carousel-track",
    style: {
      display: 'flex',
      transition: 'transform 0.3s ease-in-out',
      transform: `translateX(calc(-${currentIndex} * ((100% - ${slidesPerView - 1}rem) / ${slidesPerView} + 1rem)))`,
      gap: '1rem'
    }
  }, featuredPlugins.map((plugin, index) => {
    const title = plugin.name || 'Product';
    const description = plugin.description || plugin.shortDescription || 'No description available.';
    const isFree = plugin.licenseType === "free";
    const price = isFree ? 'Free' : plugin.priceCurrency && plugin.priceAmount ? `${plugin.priceCurrency} ${plugin.priceAmount}` : '€ 0,-';
    const mainImage = plugin.bannerUrl || plugin.image || plugin.thumbnail || 'https://gravity.group.one/guide-images/product-image@2x.png';

    // Extract category name from plugin categories array
    const categoryObj = Array.isArray(plugin.categories) && plugin.categories.length ? typeof plugin.categories[0] === 'object' ? plugin.categories[0] : {
      slug: String(plugin.categories[0]),
      title: String(plugin.categories[0]),
      description: null
    } : {
      slug: "Others",
      title: "Others",
      description: null
    };
    const categoryName = categoryObj.title || categoryObj.slug || "Others";
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: `slide-${index}`,
      className: "gv-carousel-slide",
      style: {
        minWidth: `calc((100% - ${slidesPerView - 1}rem) / ${slidesPerView})`,
        maxWidth: `calc((100% - ${slidesPerView - 1}rem) / ${slidesPerView})`,
        flex: '0 0 auto',
        backgroundColor: '#D9EBF7',
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'space-between',
        maxHeight: '456px'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
      className: "gv-product-header gv-area-header",
      style: {
        border: 'none',
        background: "#D9EBF7"
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "gv-content gv-stack-space-md gv-text-sm gv-flex gv-flex-col gv-items-start",
      style: {
        overflow: 'hidden'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "gv-badge gv-badge-info"
    }, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
      className: "gv-title gv-header-sm"
    }, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      style: {
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis'
      }
    }, description), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "gv-slide-footer gv-mt-lg gv-flex gv-align-center"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      onClick: () => handleReadMore(plugin),
      className: "gv-button gv-button-secondary"
    }, "Read more"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "gv-price gv-text-bold gv-text-md gv-ml-md"
    }, price))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "gv-image"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("picture", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
      media: "(min-width: 600px)",
      srcSet: `${mainImage} 1x, ${mainImage} 2x`
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: mainImage,
      srcSet: `${mainImage} 1x, ${mainImage} 2x`,
      alt: `${title} image`
    })))));
  }))), totalSlides > slidesPerView && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-carousel-nav-wrapper gv-flex gv-justify-center gv-align-center gv-mt-sm gv-gap-fluid"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: goToPrevious,
    disabled: currentIndex === 0,
    className: "gv-carousel-nav gv-carousel-nav-prev",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
      opacity: currentIndex === 0 ? 0.5 : 1
    },
    "aria-label": "Previous slide"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: `${iconBase}chevron_left.svg`,
    alt: "Previous",
    style: {
      width: '24px',
      height: '24px'
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-carousel-dots",
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem'
    }
  }, Array.from({
    length: maxIndex + 1
  }).map((_, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: index,
    onClick: () => goToSlide(index),
    className: "gv-carousel-dot",
    style: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      border: 'none',
      background: currentIndex === index ? '#0066CC' : '#D0D0D0',
      cursor: 'pointer',
      padding: 0
    },
    "aria-label": `Go to slide ${index + 1}`
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: goToNext,
    disabled: currentIndex >= maxIndex,
    className: "gv-carousel-nav gv-carousel-nav-next",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: currentIndex >= maxIndex ? 'not-allowed' : 'pointer',
      opacity: currentIndex >= maxIndex ? 0.5 : 1
    },
    "aria-label": "Next slide"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: `${iconBase}chevron_right.svg`,
    alt: "Next",
    style: {
      width: '24px',
      height: '24px'
    }
  }))));
}

/***/ }),

/***/ "./src/components/LoadingOverlay.jsx":
/*!*******************************************!*\
  !*** ./src/components/LoadingOverlay.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoadingOverlay)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/MarketplaceContext */ "./src/context/MarketplaceContext.jsx");



function LoadingOverlay() {
  const {
    loadingAction,
    loadingPlugin,
    assetsBaseUrl
  } = (0,_context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_1__.useMarketplace)();

  // Don't show overlay if no action is in progress
  if (!loadingAction || !loadingPlugin) {
    return null;
  }
  const assetBase = assetsBaseUrl || typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl || "";
  const spinnerSrc = `${assetBase}assets/images/spinner.svg`;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "loading-overlay show"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-loader-container gv-pos-center gv-pos-absolute"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("gv-loader", {
    src: spinnerSrc
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, loadingAction, " ", loadingPlugin)));
}

/***/ }),

/***/ "./src/components/MarketPlace.jsx":
/*!****************************************!*\
  !*** ./src/components/MarketPlace.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Marketplace)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _normalised_plugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./normalised-plugins */ "./src/components/normalised-plugins.jsx");
/* harmony import */ var _group_one_gravity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @group.one/gravity */ "./node_modules/@group.one/gravity/dist/index.es.js");
/* harmony import */ var _group_one_gravity__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_group_one_gravity__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _ProductDetail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ProductDetail */ "./src/components/ProductDetail.jsx");
/* harmony import */ var _ProductDetailRankMath__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProductDetailRankMath */ "./src/components/ProductDetailRankMath.jsx");
/* harmony import */ var _ErrorState__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ErrorState */ "./src/components/ErrorState.jsx");
/* harmony import */ var _context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../context/MarketplaceContext */ "./src/context/MarketplaceContext.jsx");
/* harmony import */ var _utils_priceFormatter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/priceFormatter */ "./src/utils/priceFormatter.js");










function Marketplace() {
  const {
    apiBaseUrl,
    useWPHandlers,
    wpConfig,
    enableDefaultStyles,
    assetsBaseUrl,
    pluginInAction,
    setPluginInAction,
    fetchSubscriptionStatus,
    isOnecomBrand,
    plugins,
    setPlugins,
    setUiI18n,
    handlePluginAction,
    allPluginsActivated,
    setAllPluginsActivated
  } = (0,_context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_7__.useMarketplace)();
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [downloadingPlugins, setDownloadingPlugins] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [selectedPlugin, setSelectedPlugin] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);

  // Use ref to track if plugins have already been fetched
  const hasFetchedPlugins = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);

  // Construct icon base URL with fallback logic
  const assetBase = assetsBaseUrl || typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl || "";
  const iconBase = assetBase ? `${assetBase}assets/icons/` : "";

  // Determine if a plugin slug is in the URL
  const pluginFromQuery = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("plugin") : null;

  // Get base page URL (without plugin parameter)
  const getBaseUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.delete("plugin");
    return url.toString();
  };

  // After plugins load, select plugin from query if present
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (pluginFromQuery && plugins.length) {
      const match = plugins.find(p => p.slug === pluginFromQuery);
      if (match) setSelectedPlugin(match);
    } else if (!pluginFromQuery) {
      // Clear selectedPlugin when no plugin parameter in URL
      setSelectedPlugin(null);
    }
  }, [pluginFromQuery, plugins]);

  // Listen for browser back/forward navigation
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handlePopState = () => {
      const currentPluginParam = new URLSearchParams(window.location.search).get("plugin");
      if (!currentPluginParam) {
        // URL no longer has plugin parameter, clear selection
        setSelectedPlugin(null);
      } else if (plugins.length) {
        // URL has plugin parameter, update selection
        const match = plugins.find(p => p.slug === currentPluginParam);
        if (match) setSelectedPlugin(match);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [plugins]);
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Only fetch once
    if (hasFetchedPlugins.current) {
      return;
    }
    async function fetchPlugins() {
      try {
        hasFetchedPlugins.current = true;
        const res = await fetch(`${apiBaseUrl}`);
        const json = await res.json();

        // Check for API error response (success: false)
        if (json && json.success === false) {
          console.error("API returned error:", json.error);
          setError(true);
          setLoading(false);
          return;
        }

        // Check for blank/empty response
        if (!json || !json.data || !json.data.catalog || Array.isArray(json.data.catalog) && json.data.catalog.length === 0) {
          console.error("API returned empty or blank response");
          setError(true);
          setLoading(false);
          return;
        }
        const {
          plugins: normalizedPlugins,
          uiI18n: apiUiI18n
        } = (0,_normalised_plugins__WEBPACK_IMPORTED_MODULE_1__.normalizePlugins)(json);
        setPlugins(normalizedPlugins);
        setUiI18n(apiUiI18n);

        // Fetch subscription status for special plugins (wp-rocket, rank-math-pro)
        if (isOnecomBrand) {
          const specialPlugins = normalizedPlugins.filter(p => p.slug === "wp-rocket" || p.slug === "rank-math-pro");

          // Fetch subscription status for each special plugin
          specialPlugins.forEach(plugin => {
            fetchSubscriptionStatus(plugin.slug);
          });
        }
      } catch (e) {
        console.error("Failed to fetch plugins", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPlugins();
  }, [apiBaseUrl, isOnecomBrand, fetchSubscriptionStatus, setPlugins]);

  // Update allPluginsActivated in context whenever plugins change
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (plugins.length > 0) {
      // Filter out activated plugins
      const nonActivatedPlugins = plugins.filter(p => p.activated !== true);
      const allActivated = nonActivatedPlugins.length === 0;
      setAllPluginsActivated(allActivated);
    }
  }, [plugins, setAllPluginsActivated]);
  const handleDownloadClick = (e, plugin) => {
    e.stopPropagation();

    // Set downloading state
    setDownloadingPlugins(prev => ({
      ...prev,
      [plugin.slug]: true
    }));

    // Reset after a short delay (download is triggered immediately)
    // The browser handles the actual download, so we simulate completion
    setTimeout(() => {
      setDownloadingPlugins(prev => ({
        ...prev,
        [plugin.slug]: false
      }));
    }, 2000);
  };
  const openDetail = (plugin, e) => {
    // Debug to confirm click
    console.log("Opening detail for plugin:", plugin.slug);
    setSelectedPlugin(plugin);
  };

  // Debug: log whenever selectedPlugin changes
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (selectedPlugin) {
      console.log("Selected plugin state now:", selectedPlugin.slug);
    }
  }, [selectedPlugin]);

  // Helper function to determine if we should use ProductDetailRankMath
  const shouldUseRankMathDetail = plugin => {
    if (!plugin) return false;
    const brand = typeof window !== "undefined" && window.marketplaceConfig?.brand;
    const isOnecomBrand = brand === "onecom";
    const isRankMathPlugin = plugin.slug === "rank-math-pro" || plugin.slug === "seo-by-rank-math";
    return isOnecomBrand && isRankMathPlugin;
  };
  if (loading) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Loading plugins...");

  // Show error state if API failed or returned error
  if (error) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ErrorState__WEBPACK_IMPORTED_MODULE_6__["default"], null);
  }

  // Early return: show full page detail instead of list
  if (selectedPlugin && pluginFromQuery) {
    const DetailComponent = shouldUseRankMathDetail(selectedPlugin) ? _ProductDetailRankMath__WEBPACK_IMPORTED_MODULE_5__["default"] : _ProductDetail__WEBPACK_IMPORTED_MODULE_4__["default"];
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DetailComponent, {
      plugin: selectedPlugin,
      onClose: () => {
        // Return to listing (clear selection and URL)
        setSelectedPlugin(null);
        window.location.href = getBaseUrl();
      },
      usePortal: false
    });
  }

  // Group plugins by a single, specific category (first category), avoid duplicates across headings
  const categoryMap = new Map();

  // Deduplicate plugins by slug first (in case backend/normalizer still returns duplicates)
  // Also filter out activated plugins
  const bySlug = new Map();
  plugins.forEach(p => {
    if (!bySlug.has(p.slug) && p.activated !== true) bySlug.set(p.slug, p);
  });
  Array.from(bySlug.values()).forEach(p => {
    // Handle new category object structure: { id, slug, title, description }
    const categoryObj = Array.isArray(p.categories) && p.categories.length ? typeof p.categories[0] === 'object' ? p.categories[0] : {
      slug: String(p.categories[0]),
      title: String(p.categories[0]),
      description: null
    } : {
      slug: "Others",
      title: "Others",
      description: null
    };
    const categoryKey = categoryObj.slug || categoryObj.title || "Others";
    if (!categoryMap.has(categoryKey)) {
      categoryMap.set(categoryKey, {
        info: categoryObj,
        plugins: []
      });
    }
    categoryMap.get(categoryKey).plugins.push(p);
  });
  const categories = Array.from(categoryMap.entries()).filter(([catKey, {
    plugins: list
  }]) => list.length > 0);

  // If all plugins are activated, show the "You've got all our plugins!" message
  if (allPluginsActivated) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-items-center gv-justify-center gv-p-fluid"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "gv-text-center"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
      className: "gv-header-md gv-mb-sm"
    }, "You've got all our plugins!"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "gv-text-md gv-mb-lg"
    }, "You can view and manage them in the My products page."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      className: "gv-button gv-button-primary  buttons-min-width",
      onClick: () => {
        // Navigate to plugins page
        window.location.href = '/wp-admin/plugins.php';
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "View products"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("gv-icon", {
      "aria-hidden": "true",
      src: `${iconBase}/arrow_right.svg`
    }))));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg"
  }, categories.map(([catKey, {
    info,
    plugins: list
  }]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    key: catKey,
    className: "category-section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "gv-text-bold gv-text-lg"
  }, info.title || catKey), info.description && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, info.description), !info.description && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "A range of versatile plugins to enhance your WordPress experience and add new functionality with ease."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "product-grid gv-grid gv-gap-lg gv-tab-grid-cols-1 gv-desk-grid-cols-3 gv-mt-lg gv-max-mob-mb-lg gv-max-mob-pb-lg"
  }, list.map(plugin => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: plugin.slug,
    className: "gv-card gv-gap-md gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-span-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "gv-tile",
    src: plugin.iconUrl || `${iconBase}add_box.svg`,
    alt: plugin.name
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-span-9"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "gv-text-lg"
  }, plugin.name), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "oc-card-content"
  }, " ", plugin.i18n.description ? plugin.i18n.description : plugin.subtitle, " "), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gv-caption-lg gv-text-bold"
  }, " ", (0,_utils_priceFormatter__WEBPACK_IMPORTED_MODULE_8__.formatPluginPrice)(plugin), " ")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-span-1 gv-content-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `${getBaseUrl()}&plugin=${plugin.slug}`,
    className: "gv-reset-button",
    style: {
      display: "inline-block"
    },
    "aria-label": `View details for ${plugin.name}`,
    onClick: e => {
      e.preventDefault();
      setSelectedPlugin(plugin);
      const url = new URL(window.location.href);
      url.searchParams.set("plugin", plugin.slug);
      window.history.pushState({}, '', url.toString());
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "gv-tile",
    src: `${iconBase}arrow_forward.svg`,
    alt: `View ${plugin.name} details`,
    style: {
      minWidth: "24px"
    }
  })))))))), selectedPlugin && !pluginFromQuery && (() => {
    const DetailComponent = shouldUseRankMathDetail(selectedPlugin) ? _ProductDetailRankMath__WEBPACK_IMPORTED_MODULE_5__["default"] : _ProductDetail__WEBPACK_IMPORTED_MODULE_4__["default"];
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DetailComponent, {
      plugin: selectedPlugin,
      onClose: () => setSelectedPlugin(null)
    });
  })());
}

/***/ }),

/***/ "./src/components/PluginActions.jsx":
/*!******************************************!*\
  !*** ./src/components/PluginActions.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PluginActions)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/MarketplaceContext */ "./src/context/MarketplaceContext.jsx");



function PluginActions({
  plugin
}) {
  const {
    assetsBaseUrl,
    pluginInAction,
    subscriptionStatus,
    isCheckingSubscription,
    isOnecomBrand,
    handlePluginAction,
    uiI18n
  } = (0,_context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_1__.useMarketplace)();
  const isSpecialPlugin = plugin.slug === "wp-rocket" || plugin.slug === "rank-math-pro";

  // Get subscription status for this plugin from context
  const pluginSubscriptionStatus = subscriptionStatus[plugin.slug];
  const pluginIsCheckingSubscription = isCheckingSubscription[plugin.slug];
  const assetBase = assetsBaseUrl || typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl || "";
  const iconBase = assetBase ? `${assetBase}assets/` : "";
  const handleClick = action => {
    // Check if brand is onecom, plugin is not installed, and slug is wp-rocket or rank-math-pro
    const isNotInstalled = !plugin.installed;
    if (isOnecomBrand && isSpecialPlugin && isNotInstalled && action === "install") {
      // Dispatch custom event instead of calling handlePluginAction
      const event = new CustomEvent("onecom-plugin-provision", {
        detail: {
          slug: plugin.slug
        },
        bubbles: true,
        cancelable: true,
        composed: true
      });
      // Dispatch on document so listeners using document.addEventListener receive it
      document.dispatchEvent(event);
      return;
    }

    // Default behavior
    handlePluginAction(action, plugin);
  };
  const handleSelectClick = () => {
    // Dispatch custom event for provisioning
    const event = new CustomEvent("onecom-subscribe-addon", {
      detail: {
        slug: plugin.slug
      },
      bubbles: true,
      cancelable: true,
      composed: true
    });
    document.dispatchEvent(event);
  };
  const handleManage = () => {
    // Check if plugin has a redirectUrl from API response
    if (plugin.redirectUrl && plugin.redirectUrl.trim() !== '') {
      // Get the admin URL from config (provided by PHP)
      const adminUrl = typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.wpConfig?.adminUrl;
      if (adminUrl) {
        // Construct full URL using adminUrl from PHP config
        // adminUrl is like "https://example.com/wp-admin/"
        // redirectUrl comes as "wp-admin\/admin.php?page=termly" (JSON unescapes \/ to /)
        // Strip "wp-admin/" prefix from redirectUrl if present to avoid duplication
        let cleanPath = plugin.redirectUrl;
        if (cleanPath.startsWith('wp-admin/')) {
          cleanPath = cleanPath.substring('wp-admin/'.length);
        }
        const fullUrl = `${adminUrl}${cleanPath}`;
        window.location.href = fullUrl;
      } else {
        // Fallback: use window.location.origin if adminUrl not available
        const siteUrl = window.location.origin;
        const fullUrl = `${siteUrl}/${plugin.redirectUrl}`;
        window.location.href = fullUrl;
      }
      return;
    }

    // Fallback to plugins page
    window.location.href = '/wp-admin/plugins.php';
  };

  // Check if we should show "Select" button instead of install/activate
  const shouldShowSelectButton = isOnecomBrand && isSpecialPlugin && !plugin.installed && pluginSubscriptionStatus === false;

  // Check if we should show skeleton loader (while checking subscription for special plugins)
  // Show skeleton if: checking OR status is undefined (not yet fetched)
  const shouldShowSkeleton = isOnecomBrand && isSpecialPlugin && !plugin.installed && (pluginIsCheckingSubscription || pluginSubscriptionStatus === undefined);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "plugin-actions gv-mt-md"
  }, shouldShowSkeleton ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-skeleton gv-heading-md"
  }) : shouldShowSelectButton ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "gv-button gv-button-primary",
    onClick: handleSelectClick,
    disabled: pluginIsCheckingSubscription
  }, "Select") : plugin.installed ? plugin.activated ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "gv-button gv-button-primary",
    onClick: handleManage
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Manage"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("gv-icon", {
    "aria-hidden": "true",
    src: `${iconBase}icons/arrow_right.svg`
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "gv-button gv-button-primary",
    disabled: pluginInAction[plugin.slug],
    onClick: () => handleClick("activate")
  }, pluginInAction[plugin.slug] ? marketplaceConfig?.labels?.activating || 'Activating...' : uiI18n?.activateButton || plugin.i18n?.activateButton || 'Activate') : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "gv-button gv-button-primary",
    disabled: pluginInAction[plugin.slug],
    onClick: () => handleClick("install")
  }, pluginInAction[plugin.slug] ? marketplaceConfig?.labels?.installing || 'Installing...' : uiI18n?.installButton || plugin.i18n?.installButton || 'Install'));
}

/***/ }),

/***/ "./src/components/ProductBanner.jsx":
/*!******************************************!*\
  !*** ./src/components/ProductBanner.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/MarketplaceContext */ "./src/context/MarketplaceContext.jsx");



const ProductBanner = () => {
  const {
    assetsBaseUrl
  } = (0,_context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_1__.useMarketplace)();
  const leftBannerUrl = `${assetsBaseUrl}assets/images/left-banner.png`;
  const rightBannerUrl = `${assetsBaseUrl}assets/images/right-banner.png`;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "gv-product-header gv-product-banner gv-pt-fluid gv-items-stretch gv-justify-between gv-gap-lg"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-left-banner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-image"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("picture", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
    media: "(min-width: 600px)",
    srcSet: leftBannerUrl
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: leftBannerUrl,
    alt: "Left banner"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-content gv-banner-content gv-max-mob-pt-0 gv-max-mob-pb-0"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "gv-banner-title"
  }, "Build your online success: add plugins"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "gv-banner-text gv-text-sm gv-mt-sm"
  }, '{', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.", '}')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-right-banner gv-max-mob-pl-md"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-image"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("picture", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
    media: "(min-width: 600px)",
    srcSet: rightBannerUrl
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: rightBannerUrl,
    alt: "Product image"
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductBanner);

/***/ }),

/***/ "./src/components/ProductDetail.jsx":
/*!******************************************!*\
  !*** ./src/components/ProductDetail.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductDetail)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PluginActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PluginActions */ "./src/components/PluginActions.jsx");
/* harmony import */ var _SuccessNotice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SuccessNotice */ "./src/components/SuccessNotice.jsx");
/* harmony import */ var _ErrorToast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ErrorToast */ "./src/components/ErrorToast.jsx");
/* harmony import */ var _context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../context/MarketplaceContext */ "./src/context/MarketplaceContext.jsx");
/* harmony import */ var _utils_priceFormatter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/priceFormatter */ "./src/utils/priceFormatter.js");








function ProductDetail({
  plugin,
  onClose,
  usePortal = true
}) {
  const {
    assetsBaseUrl,
    useWPHandlers,
    pluginInAction,
    uiI18n
  } = (0,_context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_5__.useMarketplace)();
  if (!plugin) return null;
  const assetBase = assetsBaseUrl || typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl || "";
  const imageURL = typeof window.onecomWpVars !== "undefined" && window.onecomWpVars?.imageURL || assetBase;
  const iconSrc = plugin.thumbnail || `${assetBase}assets/icons/placeholder.svg`;
  const iconBase = assetBase ? `${assetBase}assets/icons/` : "";
  const mainImage = plugin.bannerUrl || plugin.image || plugin.thumbnail || 'https://gravity.group.one/guide-images/product-image@2x.png';

  // Extract data with fallbacks
  const title = plugin.name || 'Product';
  const description = plugin.description || plugin.shortDescription || 'No description available.';
  const isFree = plugin.licenseType === "free";
  const price = (0,_utils_priceFormatter__WEBPACK_IMPORTED_MODULE_6__.formatPluginPrice)(plugin);

  // Helper function to extract numbered properties dynamically from i18n object
  const extractNumberedProps = (obj, baseName) => {
    if (!obj || typeof obj !== 'object') return [];
    const results = [];
    let i = 1;
    while (obj[`${baseName}${i}`]) {
      const value = obj[`${baseName}${i}`];
      if (value && value.trim() !== '') {
        results.push(value);
      }
      i++;
    }
    return results;
  };

  // Extract key benefits from i18n (keyBenefitContent1, keyBenefitContent2, etc.)
  const benefitsFromI18n = extractNumberedProps(plugin.i18n, 'keyBenefitContent');

  // Extract key features from i18n (keyFeatureContent1 through keyFeatureContent6)
  const keyFeaturesFromI18n = extractNumberedProps(plugin.i18n, 'keyFeatureContent');

  // Extract core features (title/content pairs) from i18n
  const coreFeaturesFromI18n = [];
  if (plugin.i18n && typeof plugin.i18n === 'object') {
    let i = 1;
    while (plugin.i18n[`coreFeatureTitle${i}`] || plugin.i18n[`coreFeatureContent${i}`]) {
      const title = plugin.i18n[`coreFeatureTitle${i}`];
      const content = plugin.i18n[`coreFeatureContent${i}`];
      if (title && title.trim() !== '' && content && content.trim() !== '') {
        coreFeaturesFromI18n.push({
          name: title,
          desc: content
        });
      }
      i++;
    }
  }

  // Fallback: Derive features from description or plugin data if i18n data is not available
  const rawFeatureSource = plugin.features && plugin.features.length ? plugin.features : description.split(/[.?!]/).map(s => s.trim()).filter(Boolean);
  const fallbackKeyFeatures = rawFeatureSource.slice(0, 6).map(f => f.replace(/\.$/, ''));
  while (fallbackKeyFeatures.length < 3) fallbackKeyFeatures.push('Sample feature');
  const fallbackBenefits = [fallbackKeyFeatures[0], fallbackKeyFeatures[1] || 'Improves performance', fallbackKeyFeatures[2] || 'Easy setup'];
  const fallbackCoreFeatures = [{
    name: fallbackKeyFeatures[0],
    desc: description.substring(0, 150) || 'Feature description'
  }, {
    name: fallbackKeyFeatures[1] || 'Performance',
    desc: 'Enhances your WordPress experience with reliable performance'
  }, {
    name: fallbackKeyFeatures[2] || 'Easy Setup',
    desc: 'Easy to set up and configure with minimal technical knowledge'
  }];

  // Use i18n data if available, otherwise use fallbacks
  const keyFeatures = keyFeaturesFromI18n.length > 0 ? keyFeaturesFromI18n : fallbackKeyFeatures;
  const benefits = benefitsFromI18n.length > 0 ? benefitsFromI18n : fallbackBenefits;
  const coreFeatures = coreFeaturesFromI18n.length > 0 ? coreFeaturesFromI18n : fallbackCoreFeatures;
  const content = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: usePortal ? "gv-surface-dim" : "gv-surface-dim"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: "gv-layout-product gv-product-single gv-w-max-container gv-mx-auto gv-p-fluid"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    className: "gv-breadcrumbs gv-area-nav gv-flex-col gv-items-start"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      if (typeof window !== "undefined" && window.history && window.history.length > 1) {
        window.history.back();
      } else if (onClose) {
        onClose();
      }
    },
    className: "gv-flex gv-items-center gv-gap-xs",
    role: "button",
    "aria-label": "Go back"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    style: {
      minWidth: "24px"
    },
    className: "gv-tile",
    src: `${iconBase}arrow_back.svg`,
    alt: "Back to plugins"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Back")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SuccessNotice__WEBPACK_IMPORTED_MODULE_3__["default"], {
    plugin: plugin
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ErrorToast__WEBPACK_IMPORTED_MODULE_4__["default"], {
    plugin: plugin
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "gv-product-header gv-area-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-content gv-stack-space-md gv-text-sm"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "gv-title gv-header-lg"
  }, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, description)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-image"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("picture", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
    media: "(min-width: 600px)",
    srcSet: `${mainImage} 1x, ${mainImage} 2x`
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: mainImage,
    srcSet: `${mainImage} 1x, ${mainImage} 2x`,
    alt: `${title} image`
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "gv-product-table gv-features-table gv-products-1 gv-area-table"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-table-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-table",
    role: "table"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-table-header",
    role: "rowgroup"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-table-row",
    role: "row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-product",
    role: "columnheader"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "gv-title"
  }, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, description.substring(0, 120), description.length > 120 ? '…' : '')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-bottom"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-price-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-price"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gv-price-text"
  }, price), !isFree && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gv-period"
  }, "/mo"))), useWPHandlers ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_PluginActions__WEBPACK_IMPORTED_MODULE_2__["default"], {
    plugin: plugin
  }) : plugin.download && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: plugin.download,
    download: true,
    className: "gv-button gv-button-secondary"
  }, "Download"))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-section",
    role: "rowgroup"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-section-header gv-table-row",
    role: "row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-cell",
    role: "cell"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "gv-title"
  }, uiI18n?.featureOverviewHeading || plugin.i18n?.featureOverviewHeading || 'Key features'))), keyFeatures.map((f, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-table-row",
    role: "row",
    key: i
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-cell",
    role: "cell"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gv-cell-text"
  }, f)))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-area-details gv-grid gv-gap-fluid"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "gv-stack-space-md"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "gv-title gv-text-bold gv-text-lg"
  }, uiI18n?.benefitHeading || plugin.i18n?.benefitHeading || 'Key benefits'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "gv-list-items gv-list-check gv-mode-condensed"
  }, benefits.map((b, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: i
  }, b)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "gv-text-max gv-text-sm gv-stack-space-md"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "gv-title gv-text-bold gv-text-lg"
  }, "Why choose ", title, "?"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "This plugin helps you enhance your site with reliable performance and simplicity. It is designed to integrate smoothly and scale as your needs grow."))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-area-content gv-grid gv-gap-fluid"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "gv-text-sm gv-stack-space-md"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "gv-title gv-text-bold gv-text-lg"
  }, uiI18n?.featureOverviewHeading || plugin.i18n?.featureOverviewHeading || 'Core features overview'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-grid gv-gap-lg gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3"
  }, coreFeatures.map((cf, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-item gv-stack-space-sm",
    key: i
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "gv-title gv-text-bold gv-text-sm"
  }, cf.name), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, cf.desc))))))));
  return usePortal ? (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)(content, document.body) : content;
}

/***/ }),

/***/ "./src/components/ProductDetailRankMath.jsx":
/*!**************************************************!*\
  !*** ./src/components/ProductDetailRankMath.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductDetailRankMath)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PluginActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PluginActions */ "./src/components/PluginActions.jsx");
/* harmony import */ var _SuccessNotice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SuccessNotice */ "./src/components/SuccessNotice.jsx");
/* harmony import */ var _ErrorToast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ErrorToast */ "./src/components/ErrorToast.jsx");
/* harmony import */ var _context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../context/MarketplaceContext */ "./src/context/MarketplaceContext.jsx");







function ProductDetailRankMath({
  plugin,
  onClose,
  usePortal = true
}) {
  const {
    assetsBaseUrl,
    useWPHandlers,
    pluginInAction,
    plugins,
    uiI18n
  } = (0,_context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_5__.useMarketplace)();
  if (!plugin) return null;

  // Always get both plugins from context - seo-by-rank-math for first column, rank-math-pro for second
  const freePlugin = plugins.find(p => p.slug === "seo-by-rank-math") || null;
  const proPlugin = plugins.find(p => p.slug === "rank-math-pro") || null;

  // Use the clicked plugin for header/main content, but always use freePlugin for first column
  const assetBase = assetsBaseUrl || typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl || "";
  const imageURL = typeof window.onecomWpVars !== "undefined" && window.onecomWpVars?.imageURL || assetBase;
  const iconSrc = plugin.thumbnail || `${assetBase}assets/icons/placeholder.svg`;
  const iconBase = assetBase ? `${assetBase}assets/icons/` : "";
  const mainImage = plugin.bannerUrl || plugin.image || plugin.thumbnail || 'https://gravity.group.one/guide-images/product-image@2x.png';

  // Extract data with fallbacks for free version (first column - always seo-by-rank-math)
  const title = freePlugin?.name || plugin.name || 'Product';
  const description = freePlugin?.description || freePlugin?.shortDescription || plugin.description || plugin.shortDescription || 'No description available.';

  // Extract data for pro version (second column - always rank-math-pro)
  const proTitle = proPlugin?.name || 'Rank Math Pro';
  const proDescription = proPlugin?.description || proPlugin?.shortDescription || 'Advanced SEO features for professionals';
  const proPrice = proPlugin?.priceCurrency && proPlugin?.priceAmount ? `${proPlugin.priceCurrency} ${proPlugin.priceAmount}` : '€ 0,-';

  // Helper function to extract numbered properties dynamically from i18n object
  const extractNumberedProps = (obj, baseName) => {
    if (!obj || typeof obj !== 'object') return [];
    const results = [];
    let i = 1;
    while (obj[`${baseName}${i}`]) {
      const value = obj[`${baseName}${i}`];
      if (value && value.trim() !== '') {
        results.push(value);
      }
      i++;
    }
    return results;
  };

  // Extract key benefits from i18n (use freePlugin's i18n if available, otherwise plugin's i18n)
  const i18nSource = freePlugin?.i18n || plugin.i18n;
  const benefitsFromI18n = extractNumberedProps(i18nSource, 'keyBenefitContent');

  // Extract key features from i18n (keyFeatureContent1 through keyFeatureContent6)
  const keyFeaturesFromI18n = extractNumberedProps(i18nSource, 'keyFeatureContent');

  // Extract core features (title/content pairs) from i18n
  const coreFeaturesFromI18n = [];
  if (i18nSource && typeof i18nSource === 'object') {
    let i = 1;
    while (i18nSource[`coreFeatureTitle${i}`] || i18nSource[`coreFeatureContent${i}`]) {
      const title = i18nSource[`coreFeatureTitle${i}`];
      const content = i18nSource[`coreFeatureContent${i}`];
      if (title && title.trim() !== '' && content && content.trim() !== '') {
        coreFeaturesFromI18n.push({
          name: title,
          desc: content
        });
      }
      i++;
    }
  }

  // Fallback: Derive features from description or plugin data if i18n data is not available
  const rawFeatureSource = freePlugin?.features && freePlugin.features.length ? freePlugin.features : description.split(/[.?!]/).map(s => s.trim()).filter(Boolean);
  const fallbackKeyFeatures = rawFeatureSource.slice(0, 6).map(f => f.replace(/\.$/, ''));
  while (fallbackKeyFeatures.length < 3) fallbackKeyFeatures.push('Sample feature');
  const fallbackBenefits = [fallbackKeyFeatures[0], fallbackKeyFeatures[1] || 'Improves performance', fallbackKeyFeatures[2] || 'Easy setup'];
  const fallbackCoreFeatures = [{
    name: fallbackKeyFeatures[0],
    desc: description.substring(0, 150) || 'Feature description'
  }, {
    name: fallbackKeyFeatures[1] || 'Performance',
    desc: 'Enhances your WordPress experience with reliable performance'
  }, {
    name: fallbackKeyFeatures[2] || 'Easy Setup',
    desc: 'Easy to set up and configure with minimal technical knowledge'
  }];

  // Use i18n data if available, otherwise use fallbacks
  const keyFeatures = keyFeaturesFromI18n.length > 0 ? keyFeaturesFromI18n : fallbackKeyFeatures;
  const benefits = benefitsFromI18n.length > 0 ? benefitsFromI18n : fallbackBenefits;
  const coreFeatures = coreFeaturesFromI18n.length > 0 ? coreFeaturesFromI18n : fallbackCoreFeatures;
  const content = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-surface-dim"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: "gv-layout-product gv-w-max-container gv-mx-auto gv-p-fluid"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    className: "gv-breadcrumbs gv-area-nav"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      if (typeof window !== "undefined" && window.history && window.history.length > 1) {
        window.history.back();
      } else if (onClose) {
        onClose();
      }
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("gv-icon", {
    "aria-hidden": "true",
    src: `${iconBase}chevron_left.svg`
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Back"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SuccessNotice__WEBPACK_IMPORTED_MODULE_3__["default"], {
    plugin: plugin
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ErrorToast__WEBPACK_IMPORTED_MODULE_4__["default"], {
    plugin: plugin
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "gv-product-header gv-area-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-content gv-stack-space-md gv-text-sm"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "gv-title gv-header-lg"
  }, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, description)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-image"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("picture", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
    media: "(min-width: 600px)",
    srcSet: `${mainImage} 2x, ${mainImage} 1x`
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: mainImage,
    srcSet: `${mainImage} 2x, ${mainImage} 1x`,
    alt: "Product image"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "gv-product-table gv-features-table gv-products-2 gv-recommended-2 gv-area-table"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-dots-scroll-area"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-table-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-slider-nav"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "gv-nav-button gv-previous gv-disabled"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("gv-icon", {
    "aria-hidden": "true",
    src: `${iconBase}chevron_left.svg`
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "gv-nav-button gv-next"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("gv-icon", {
    "aria-hidden": "true",
    src: `${iconBase}chevron_right.svg`
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-table-slider"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-table",
    role: "table"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-table-header",
    role: "rowgroup"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-table-row",
    role: "row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-product",
    role: "columnheader"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "gv-title"
  }, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, description.substring(0, 120), description.length > 120 ? '…' : '')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-bottom"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-price-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-price"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gv-price-text"
  }, "Free"))), useWPHandlers && freePlugin ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_PluginActions__WEBPACK_IMPORTED_MODULE_2__["default"], {
    plugin: freePlugin
  }) : freePlugin?.download && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "gv-button gv-button-secondary"
  }, uiI18n?.installButton || freePlugin?.i18n?.installButton || 'Install'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-product",
    role: "columnheader"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-recommended-label"
  }, "Recommended"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "gv-title"
  }, proTitle), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, proDescription.substring(0, 120), proDescription.length > 120 ? '…' : '')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-bottom"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-price-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-price"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gv-price-text"
  }, proPrice), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gv-period"
  }, "/mo"))), useWPHandlers && proPlugin ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_PluginActions__WEBPACK_IMPORTED_MODULE_2__["default"], {
    plugin: proPlugin
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "gv-button gv-button-primary"
  }, "Select"))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-section",
    role: "rowgroup"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-section-header gv-table-row",
    role: "row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-cell",
    role: "cell"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "gv-title"
  }, uiI18n?.featureOverviewHeading || freePlugin?.i18n?.featureOverviewHeading || 'Key features')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-cell",
    role: "cell"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "gv-title"
  }, uiI18n?.featureOverviewHeading || proPlugin?.i18n?.featureOverviewHeading || 'Key features'))), keyFeatures.map((f, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-table-row",
    role: "row",
    key: i
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-cell",
    role: "cell"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gv-cell-text"
  }, f)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-cell",
    role: "cell"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gv-cell-text"
  }, f)))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-slider-pagination gv-state-top"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-dots",
    role: "tablist"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gv-dot gv-active",
    role: "tab",
    "aria-selected": "true",
    "aria-label": "Go to slide 1"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gv-dot",
    role: "tab",
    "aria-selected": "false",
    "aria-label": "Go to slide 2"
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-area-details gv-grid gv-gap-fluid"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "gv-stack-space-md"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "gv-title gv-text-bold gv-text-lg"
  }, uiI18n?.benefitHeading || plugin.i18n?.benefitHeading || 'Key benefits'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "gv-list-items gv-list-check gv-mode-condensed"
  }, benefits.map((b, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: i
  }, b)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-text-max gv-text-sm gv-stack-space-md"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "gv-title gv-text-bold gv-text-lg"
  }, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, description))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-area-content gv-grid gv-gap-fluid"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "gv-stack-space-md"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "gv-title gv-text-bold gv-text-lg"
  }, uiI18n?.featureOverviewHeading || plugin.i18n?.featureOverviewHeading || 'Key features overview'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "gv-list-items gv-list-check gv-mode-condensed"
  }, keyFeatures.map((f, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: i
  }, f)))))));
  return usePortal ? (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)(content, document.body) : content;
}

/***/ }),

/***/ "./src/components/SuccessNotice.jsx":
/*!******************************************!*\
  !*** ./src/components/SuccessNotice.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SuccessNotice)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/MarketplaceContext */ "./src/context/MarketplaceContext.jsx");



function SuccessNotice({
  plugin
}) {
  const {
    assetsBaseUrl,
    noticeState,
    setNoticeState,
    handlePluginAction
  } = (0,_context_MarketplaceContext__WEBPACK_IMPORTED_MODULE_1__.useMarketplace)();
  if (!noticeState || !noticeState.visible || noticeState.pluginSlug !== plugin?.slug) {
    return null;
  }
  const assetBase = assetsBaseUrl || typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl || "";
  const iconBase = assetBase ? `${assetBase}assets/` : "";
  const handleClose = () => {
    setNoticeState({
      visible: false,
      type: null,
      pluginSlug: null
    });
  };
  const handleActivate = () => {
    handlePluginAction("activate", plugin);
  };
  const handleManage = () => {
    // Redirect to plugin's settings page
    // Common plugin admin pages
    const pluginAdminPages = {
      'wp-rocket': 'wp-rocket',
      'rank-math-pro': 'rank-math',
      'seo-by-rank-math': 'rank-math',
      'akismet': 'akismet-key-config',
      'jetpack': 'jetpack',
      'wordfence': 'Wordfence',
      'yoast': 'wpseo_dashboard'
    };
    const adminPage = pluginAdminPages[plugin.slug] || plugin.slug;
    const adminUrl = typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.wpConfig?.adminUrl;
    if (adminUrl) {
      window.location.href = `${adminUrl}admin.php?page=${adminPage}`;
    } else {
      // Fallback to plugins page
      window.location.href = '/wp-admin/plugins.php';
    }
  };
  const isInstalled = noticeState.type === 'installed';
  const isActivated = noticeState.type === 'activated';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-notice gv-notice-success gv-p-lg gv-max-mob-pt-lg gv-mb-0 gv-mt-lg",
    style: {
      'gridColumn': '1 / -1',
      'width': '100%'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "gv-notice-icon",
    src: `${iconBase}icons/success.svg`,
    alt: "Success"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-notice-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gv-notice-title"
  }, isInstalled && "Plugin was installed.", isActivated && "Plugin was activated."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, isInstalled && "Activate it now to start using it.", isActivated && "You can start using it.")), isInstalled && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "gv-action gv-button gv-button-neutral",
    onClick: handleActivate
  }, "Activate"), isActivated && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "gv-action gv-button gv-button-neutral",
    onClick: handleManage
  }, "Manage"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "gv-notice-close",
    "aria-label": "Close",
    onClick: handleClose
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("gv-icon", {
    "aria-hidden": "true",
    src: `${iconBase}icons/close.svg`
  })));
}

/***/ }),

/***/ "./src/components/normalised-plugins.jsx":
/*!***********************************************!*\
  !*** ./src/components/normalised-plugins.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizePlugins: () => (/* binding */ normalizePlugins)
/* harmony export */ });
function normalizePlugins(rawResponse) {
  // Support the new response shape:
  // { error: null, success: true, data: { catalog: [...], locale: "...", uiI18n: {...} } }

  if (!rawResponse || !rawResponse.data || !Array.isArray(rawResponse.data.catalog)) {
    // Log a clear error when the response is not supported
    // Keeping a minimal, non-crashing fallback of returning an empty object
    console.error("Unsupported marketplace response shape. Expected { data: { catalog: [...] } }.", rawResponse);
    return {
      plugins: [],
      uiI18n: {},
      locale: null
    };
  }
  const items = rawResponse.data.catalog;
  const uiI18n = rawResponse.data.uiI18n || {};
  const locale = rawResponse.data.locale || null;
  if (items.length === 0) return {
    plugins: [],
    uiI18n,
    locale
  };

  // Map to normalized structure
  const normalized = items.map(plugin => {
    var _plugin$installed, _plugin$activated;
    // Prefer description coming from i18n.description, then fallback to description field
    const descriptionFromTextKeys = plugin?.i18n?.description;
    const description = typeof descriptionFromTextKeys === "string" && descriptionFromTextKeys ? descriptionFromTextKeys : typeof plugin?.description === "object" && plugin.description !== null ? plugin.description["en-gb"] || Object.values(plugin.description)[0] || "" : plugin?.description || "";
    const download = plugin?.download || plugin?.download_url || plugin?.downloadUrl || "";

    // Author may be a string or an object { name, url }
    const authorName = typeof plugin?.author === "object" && plugin.author !== null ? plugin.author.name || "" : plugin?.author || "";
    const authorUrl = typeof plugin?.author === "object" && plugin.author !== null ? plugin.author.url || "" : "";
    const priceAmount = typeof plugin?.price === "object" && plugin.price !== null ? plugin.price.amount : undefined;
    const priceCurrency = typeof plugin?.price === "object" && plugin.price !== null ? plugin.price.currency : undefined;
    return {
      ...plugin,
      name: plugin?.name || "Unknown",
      slug: plugin?.slug || "",
      thumbnail: plugin?.thumbnail || "",
      description,
      download,
      author: authorName,
      authorUrl,
      priceAmount,
      priceCurrency,
      installed: (_plugin$installed = plugin?.installed) !== null && _plugin$installed !== void 0 ? _plugin$installed : false,
      activated: (_plugin$activated = plugin?.activated) !== null && _plugin$activated !== void 0 ? _plugin$activated : false,
      i18n: plugin?.i18n || {}
    };
  });

  // Deduplicate by slug (first occurrence wins)
  const seen = new Set();
  const plugins = normalized.filter(p => {
    const key = p.slug || p.name || JSON.stringify(p);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return {
    plugins,
    uiI18n,
    locale
  };
}

/***/ }),

/***/ "./src/context/MarketplaceContext.jsx":
/*!********************************************!*\
  !*** ./src/context/MarketplaceContext.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarketplaceProvider: () => (/* binding */ MarketplaceProvider),
/* harmony export */   useMarketplace: () => (/* binding */ useMarketplace)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const MarketplaceContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
const MarketplaceProvider = ({
  children,
  apiBaseUrl,
  useWPHandlers,
  wpConfig,
  enableDefaultStyles,
  assetsBaseUrl
}) => {
  const [pluginInAction, setPluginInAction] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [subscriptionStatus, setSubscriptionStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [isCheckingSubscription, setIsCheckingSubscription] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [plugins, setPlugins] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [uiI18n, setUiI18n] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [loadingAction, setLoadingAction] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [loadingPlugin, setLoadingPlugin] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [noticeState, setNoticeState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    visible: false,
    type: null,
    pluginSlug: null
  });
  const [errorState, setErrorState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    visible: false,
    type: null,
    pluginSlug: null
  });
  const [allPluginsActivated, setAllPluginsActivated] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Use ref to track which subscriptions have been checked to avoid recreation of fetchSubscriptionStatus
  const checkedSubscriptionsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({});
  const brand = typeof window !== "undefined" && window.marketplaceConfig?.brand;
  const isOnecomBrand = brand === "onecom";

  // Fetch subscription status for special plugins (wp-rocket, rank-math-pro)
  const fetchSubscriptionStatus = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async pluginSlug => {
    if (!isOnecomBrand) return;
    const isSpecialPlugin = pluginSlug === "wp-rocket" || pluginSlug === "rank-math-pro";
    if (!isSpecialPlugin) return;

    // If already checked or checking, skip
    if (checkedSubscriptionsRef.current[pluginSlug]) {
      return;
    }

    // Mark as being checked
    checkedSubscriptionsRef.current[pluginSlug] = true;
    setIsCheckingSubscription(prev => ({
      ...prev,
      [pluginSlug]: true
    }));
    try {
      const ajaxUrl = typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.wpConfig?.ajaxUrl;
      if (!ajaxUrl) {
        console.warn("ajaxUrl not available in marketplaceConfig");
        setIsCheckingSubscription(prev => ({
          ...prev,
          [pluginSlug]: false
        }));
        return;
      }
      console.log(`[MarketplaceContext] Fetching subscription status for ${pluginSlug}`);
      const formData = new FormData();
      formData.append('action', 'get_addon_purchase_status');
      formData.append('addon_purchase_check', 'true');
      formData.append('addon_slug', pluginSlug);
      const res = await fetch(ajaxUrl, {
        method: 'POST',
        body: formData
      });
      const json = await res.json();
      console.log(`[MarketplaceContext] Subscription status response for ${pluginSlug}:`, json);
      setSubscriptionStatus(prev => ({
        ...prev,
        [pluginSlug]: json.is_purchased
      }));
    } catch (e) {
      console.error(`[MarketplaceContext] Failed to fetch subscription status for ${pluginSlug}`, e);
      setSubscriptionStatus(prev => ({
        ...prev,
        [pluginSlug]: false
      }));
    } finally {
      setIsCheckingSubscription(prev => ({
        ...prev,
        [pluginSlug]: false
      }));
    }
  }, [isOnecomBrand]);

  // Handle plugin actions (install, activate, deactivate)
  const handlePluginAction = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (action, plugin) => {
    // Check if this is Imagify plugin activation (handles 302 redirect case)
    const isImagifyActivation = action === 'activate' && plugin.slug === 'imagify';
    setPluginInAction(prev => ({
      ...prev,
      [plugin.slug]: true
    }));

    // Set loading state for overlay
    const actionText = action.charAt(0).toUpperCase() + (action.endsWith('e') ? action.slice(1, -1) : action.slice(1)) + 'ing';
    setLoadingAction(actionText);
    setLoadingPlugin(plugin.name || plugin.slug);

    // For Imagify, use setTimeout to allow React to render the loading overlay first
    if (isImagifyActivation) {
      // Build URL for activation
      let url = `${apiBaseUrl}/${action}/${plugin.slug}`;
      const downloadParam = `download_url=${encodeURIComponent(plugin.download || '')}`;
      if (useWPHandlers) {
        url = `${wpConfig.ajaxUrl}?action=marketplace_${action}_plugin&_wpnonce=${wpConfig.nonce}&nonce=${wpConfig.nonce}&slug=${plugin.slug}&${downloadParam}`;
      } else {
        url = url + (url.includes('?') ? '&' : '?') + downloadParam;
      }

      // Allow React to render loading overlay, then execute Imagify flow
      setTimeout(() => {
        // Initiate the activation request (don't wait for response due to 302 redirect)
        fetch(url, {
          method: "POST"
        }).catch(err => {
          console.log("Imagify activation request initiated, reload will proceed");
        });

        // Show success notice after delay
        setTimeout(() => {
          setNoticeState({
            visible: true,
            type: 'activated',
            pluginSlug: plugin.slug
          });
        }, 1000);

        // Clear loading overlay after success notice appears
        setTimeout(() => {
          setLoadingAction('');
          setLoadingPlugin('');
          setPluginInAction(prev => ({
            ...prev,
            [plugin.slug]: false
          }));
        }, 1100);

        // Update plugin state to activated
        setTimeout(() => {
          setPlugins(prev => prev.map(p => p.slug === plugin.slug ? {
            ...p,
            installed: true,
            activated: true
          } : p));
        }, 1200);

        // Reload after sufficient delay to show overlay, notice, and updated button
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }, 100);
      return;
    }
    try {
      let url = `${apiBaseUrl}/${action}/${plugin.slug}`;

      // prepare encoded download param (safe if plugin.download is undefined)
      const downloadParam = `download_url=${encodeURIComponent(plugin.download || '')}`;
      if (useWPHandlers) {
        // original WP-AJAX URL + download_url appended
        url = `${wpConfig.ajaxUrl}?action=marketplace_${action}_plugin&_wpnonce=${wpConfig.nonce}&nonce=${wpConfig.nonce}&slug=${plugin.slug}&${downloadParam}`;
      } else {
        // append download_url to non-WP URL (adds ? or & correctly)
        url = url + (url.includes('?') ? '&' : '?') + downloadParam;
      }
      const res = await fetch(url, {
        method: "POST"
      });
      const result = await res.json();
      if (result.success) {
        setPlugins(prev => prev.map(p => p.slug === plugin.slug ? {
          ...p,
          installed: result.data.installed,
          activated: result.data.activated
        } : p));

        // Show success notice for install and activate actions
        if (action === 'install' && result.data.installed) {
          setNoticeState({
            visible: true,
            type: 'installed',
            pluginSlug: plugin.slug
          });
        } else if (action === 'activate' && result.data.activated) {
          setNoticeState({
            visible: true,
            type: 'activated',
            pluginSlug: plugin.slug
          });
          // Reload the page after successful activation
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      } else {
        // Show error toast for activation and installation errors
        if (action === 'activate') {
          setErrorState({
            visible: true,
            type: 'activate',
            pluginSlug: plugin.slug
          });
        } else if (action === 'install') {
          setErrorState({
            visible: true,
            type: 'install',
            pluginSlug: plugin.slug
          });
        } else {
          alert(result.data?.message || "Failed to perform action");
        }
      }
    } catch (err) {
      console.error("Plugin action failed", err);
    } finally {
      setPluginInAction(prev => ({
        ...prev,
        [plugin.slug]: false
      }));
      // Clear loading state
      setLoadingAction('');
      setLoadingPlugin('');
    }
  }, [apiBaseUrl, useWPHandlers, wpConfig]);
  const value = {
    apiBaseUrl,
    useWPHandlers,
    wpConfig,
    enableDefaultStyles,
    assetsBaseUrl,
    pluginInAction,
    setPluginInAction,
    subscriptionStatus,
    isCheckingSubscription,
    fetchSubscriptionStatus,
    isOnecomBrand,
    plugins,
    setPlugins,
    uiI18n,
    setUiI18n,
    handlePluginAction,
    loadingAction,
    loadingPlugin,
    noticeState,
    setNoticeState,
    errorState,
    setErrorState,
    allPluginsActivated,
    setAllPluginsActivated
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(MarketplaceContext.Provider, {
    value: value
  }, children);
};
const useMarketplace = () => {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within MarketplaceProvider');
  }
  return context;
};

/***/ }),

/***/ "./src/i18n/index.js":
/*!***************************!*\
  !*** ./src/i18n/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! i18next */ "./node_modules/i18next/dist/esm/i18next.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _locales_en_GB_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./locales/en_GB.json */ "./src/i18n/locales/en_GB.json");
/* harmony import */ var _locales_da_DK_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./locales/da_DK.json */ "./src/i18n/locales/da_DK.json");
/* harmony import */ var _locales_de_DE_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./locales/de_DE.json */ "./src/i18n/locales/de_DE.json");
/* harmony import */ var _locales_es_ES_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./locales/es_ES.json */ "./src/i18n/locales/es_ES.json");
/* harmony import */ var _locales_fi_FI_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./locales/fi_FI.json */ "./src/i18n/locales/fi_FI.json");
/* harmony import */ var _locales_fr_FR_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./locales/fr_FR.json */ "./src/i18n/locales/fr_FR.json");
/* harmony import */ var _locales_it_IT_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./locales/it_IT.json */ "./src/i18n/locales/it_IT.json");
/* harmony import */ var _locales_nl_NL_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./locales/nl_NL.json */ "./src/i18n/locales/nl_NL.json");
/* harmony import */ var _locales_no_NO_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./locales/no_NO.json */ "./src/i18n/locales/no_NO.json");
/* harmony import */ var _locales_pt_PT_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./locales/pt_PT.json */ "./src/i18n/locales/pt_PT.json");
/* harmony import */ var _locales_sv_SE_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./locales/sv_SE.json */ "./src/i18n/locales/sv_SE.json");



// Import all translations











const resources = {
  en_GB: {
    translation: _locales_en_GB_json__WEBPACK_IMPORTED_MODULE_2__
  },
  da_DK: {
    translation: _locales_da_DK_json__WEBPACK_IMPORTED_MODULE_3__
  },
  de_DE: {
    translation: _locales_de_DE_json__WEBPACK_IMPORTED_MODULE_4__
  },
  es_ES: {
    translation: _locales_es_ES_json__WEBPACK_IMPORTED_MODULE_5__
  },
  fi_FI: {
    translation: _locales_fi_FI_json__WEBPACK_IMPORTED_MODULE_6__
  },
  fr_FR: {
    translation: _locales_fr_FR_json__WEBPACK_IMPORTED_MODULE_7__
  },
  it_IT: {
    translation: _locales_it_IT_json__WEBPACK_IMPORTED_MODULE_8__
  },
  nl_NL: {
    translation: _locales_nl_NL_json__WEBPACK_IMPORTED_MODULE_9__
  },
  no_NO: {
    translation: _locales_no_NO_json__WEBPACK_IMPORTED_MODULE_10__
  },
  pt_PT: {
    translation: _locales_pt_PT_json__WEBPACK_IMPORTED_MODULE_11__
  },
  sv_SE: {
    translation: _locales_sv_SE_json__WEBPACK_IMPORTED_MODULE_12__
  }
};
i18next__WEBPACK_IMPORTED_MODULE_0__["default"].use(react_i18next__WEBPACK_IMPORTED_MODULE_1__.initReactI18next).init({
  resources,
  lng: "en_GB",
  // default fallback
  fallbackLng: "en_GB",
  interpolation: {
    escapeValue: false
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (i18next__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/i18n/locales/da_DK.json":
/*!*************************************!*\
  !*** ./src/i18n/locales/da_DK.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"migratorMail_footer_contactButton_title":"Kontakt os i dag","migratorMail_footer_footer-link-1_title":"one.com","migratorMail_footer_footer-link-2_title":"Vilkår","migratorMail_footer_footer-link-3_title":"Privatlivspolitik","migratorMail_footer_visitSite_title":"Besøg siden","migratorMail_hi":"Hej","migratorMail_typeFail_bodyIntro":"Noget gik galt med flytningen af din hjemmeside fra {oldsite} til {newsite}.","migratorMail_typeFail_button_title":"Prøv igen","migratorMail_typeFail_errorText":"Fejl: {fail_reason}","migratorMail_typeFail_errorTextInternal":"Fejl: Intern fejl ({fail_reason})","migratorMail_typeFail_failTime":"Migrering mislykkedes {dateandtime}","migratorMail_typeFail_footer_title":"Behøver du hjælp til at migrere din hjemmeside til one.com? Vi er her for at hjælpe.","migratorMail_typeFail_subject":"Migrering mislykkedes","migratorMail_typeFail_title":"WordPress-migrering mislykkedes","migratorMail_typeSuccess_bodyIntro":"Migreringen af din hjemmeside fra {oldsite} til {newsite} er nu fuldendt.","migratorMail_typeSuccess_brokenPlugins":"Efter migreringen viste det sig desuden, at følgende plugin(s) forårsagede fejl og er blevet deaktiveret på det migrerede websted: {plugins}.","migratorMail_typeSuccess_button_title":"Gå til din hjemmeside","migratorMail_typeSuccess_excludedDirs":"Bemærk: For at sikre en problemfri migreringsproces blev følgende mapper udelukket fra migreringen: {directories}. Du kan manuelt flytte disse data til din hjemmeside, hvis det er nødvendigt.","migratorMail_typeSuccess_finishTime":"Migrering afsluttet {dateandtime}","migratorMail_typeSuccess_footer_title":"Har du spørgsmål? Vi er her for at hjælpe.","migratorMail_typeSuccess_startTime":"Migrering startet {dateandtime}","migratorMail_typeSuccess_subject":"Migrering lykkedes","migratorMail_typeSuccess_title":"WordPress-migration fuldendt"}');

/***/ }),

/***/ "./src/i18n/locales/de_DE.json":
/*!*************************************!*\
  !*** ./src/i18n/locales/de_DE.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"migratorMail_footer_contactButton_title":"Kontaktieren Sie uns noch heute","migratorMail_footer_footer-link-1_title":"one.com","migratorMail_footer_footer-link-2_title":"AGB","migratorMail_footer_footer-link-3_title":"Datenschutzrichtlinie","migratorMail_footer_visitSite_title":"Website besuchen","migratorMail_hi":"Hallo,","migratorMail_typeFail_bodyIntro":"Bei der Migration Ihrer Website von {oldsite} zu {newsite} ist leider etwas schiefgelaufen.","migratorMail_typeFail_button_title":"Migration erneut versuchen","migratorMail_typeFail_errorText":"Fehler: {fail_reason}","migratorMail_typeFail_errorTextInternal":"Fehler: Interner Fehler ({fail_reason})","migratorMail_typeFail_failTime":"Migration fehlgeschlagen: {dateandtime}","migratorMail_typeFail_footer_title":"Benötigen Sie Hilfe bei der Migration Ihrer Website zu one.com? Wir helfen Ihnen gerne.","migratorMail_typeFail_subject":"Migration fehlgeschlagen","migratorMail_typeFail_title":"WordPress-Migration fehlgeschlagen","migratorMail_typeSuccess_bodyIntro":"Die Migration Ihrer Website von {oldsite} zu {newsite} ist nun abgeschlossen.","migratorMail_typeSuccess_brokenPlugins":"Darüber hinaus wurden nach der Migration die folgenden Plugins gefunden, die Fehler verursachen und auf der migrierten Website deaktiviert wurden: {plugins}.","migratorMail_typeSuccess_button_title":"Zu Ihrer Website gehen","migratorMail_typeSuccess_excludedDirs":"Bitte beachten Sie: Um einen reibungslosen Ablauf der Migration zu gewährleisten, wurden die folgenden Verzeichnisse von der Migration ausgeschlossen: {directories}. Sie können diese Daten bei Bedarf manuell auf Ihren Webspace verschieben.","migratorMail_typeSuccess_finishTime":"Migration abgeschlossen: {dateandtime}","migratorMail_typeSuccess_footer_title":"Haben Sie Fragen? Wir helfen Ihnen gerne.","migratorMail_typeSuccess_startTime":"Migration gestartet: {dateandtime}","migratorMail_typeSuccess_subject":"Migration erfolgreich","migratorMail_typeSuccess_title":"WordPress-Migration abgeschlossen"}');

/***/ }),

/***/ "./src/i18n/locales/en_GB.json":
/*!*************************************!*\
  !*** ./src/i18n/locales/en_GB.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"migratorMail_footer_contactButton_title":"Contact us today","migratorMail_footer_footer-link-1_title":"one.com","migratorMail_footer_footer-link-2_title":"Terms","migratorMail_footer_footer-link-3_title":"Privacy policy","migratorMail_footer_visitSite_title":"Visit site","migratorMail_hi":"Hi,","migratorMail_typeFail_bodyIntro":"Something went wrong with the migration of your site from {oldsite} to {newsite}.","migratorMail_typeFail_button_title":"Retry migration","migratorMail_typeFail_errorText":"Error: {fail_reason}","migratorMail_typeFail_errorTextInternal":"Error: Internal error ({fail_reason})","migratorMail_typeFail_failTime":"Migration failed: {dateandtime}","migratorMail_typeFail_footer_title":"Need help migrating your site to one.com? We\'re here to help.","migratorMail_typeFail_subject":"Migration failed","migratorMail_typeFail_title":"WordPress migration failed","migratorMail_typeSuccess_bodyIntro":"The migration of your site from {oldsite} to {newsite} is now completed.","migratorMail_typeSuccess_brokenPlugins":"Additionally, post-migration, the following plugin(s) were found to cause errors and have been deactivated on the migrated site: {plugins}.","migratorMail_typeSuccess_button_title":"Go to your site","migratorMail_typeSuccess_excludedDirs":"Please note: To ensure a smooth migration process, the following directories were excluded from the migration: {directories}. You can manually move this data to your webspace if needed.","migratorMail_typeSuccess_finishTime":"Migration finished: {dateandtime}","migratorMail_typeSuccess_footer_title":"Have a question? We\'re here to help.","migratorMail_typeSuccess_startTime":"Migration started: {dateandtime}","migratorMail_typeSuccess_subject":"Migration successful","migratorMail_typeSuccess_title":"WordPress migration completed"}');

/***/ }),

/***/ "./src/i18n/locales/es_ES.json":
/*!*************************************!*\
  !*** ./src/i18n/locales/es_ES.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"migratorMail_footer_contactButton_title":"Póngase en contacto con nosotros hoy mismo","migratorMail_footer_footer-link-1_title":"one.com","migratorMail_footer_footer-link-2_title":"Términos","migratorMail_footer_footer-link-3_title":"Política de privacidad","migratorMail_footer_visitSite_title":"Visitar el sitio","migratorMail_hi":"Hola:","migratorMail_typeFail_bodyIntro":"Se ha producido un error al migrar su sitio de {oldsite} a {newsite}.","migratorMail_typeFail_button_title":"Reintentar migración","migratorMail_typeFail_errorText":"Error: {fail_reason}","migratorMail_typeFail_errorTextInternal":"Error: Error interno ({fail_reason})","migratorMail_typeFail_failTime":"Error en la migración: {dateandtime}","migratorMail_typeFail_footer_title":"¿Necesita ayuda para migrar su sitio a one.com? Estamos aquí para ayudarle.","migratorMail_typeFail_subject":"Error en la migración","migratorMail_typeFail_title":"Error en la migración de WordPress","migratorMail_typeSuccess_bodyIntro":"La migración de su sitio de {oldsite} a {newsite} se ha completado.","migratorMail_typeSuccess_brokenPlugins":"Además, tras la migración, se descubrió que los siguientes plugins causaban errores y se desactivaron en el sitio migrado: {plugins}.","migratorMail_typeSuccess_button_title":"Ir a su sitio","migratorMail_typeSuccess_excludedDirs":"Nota: para garantizar un proceso de migración sin problemas, se han excluido de la migración los siguientes directorios: {directories}. Puedes mover manualmente estos datos a tu espacio web en caso de que sea necesario.","migratorMail_typeSuccess_finishTime":"Fin de la migración: {dateandtime}","migratorMail_typeSuccess_footer_title":"¿Tiene alguna pregunta? Estamos aquí para ayudarle.","migratorMail_typeSuccess_startTime":"Inicio de la migración: {dateandtime}","migratorMail_typeSuccess_subject":"Migración realizada con éxito","migratorMail_typeSuccess_title":"Migración de WordPress completada"}');

/***/ }),

/***/ "./src/i18n/locales/fi_FI.json":
/*!*************************************!*\
  !*** ./src/i18n/locales/fi_FI.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"migratorMail_footer_contactButton_title":"Ota meihin yhteyttä","migratorMail_footer_footer-link-1_title":"one.com","migratorMail_footer_footer-link-2_title":"Palvelun käyttöehdot","migratorMail_footer_footer-link-3_title":"Tietosuojakäytäntö","migratorMail_footer_visitSite_title":"Vieraile sivustolla","migratorMail_hi":"Hei,","migratorMail_typeFail_bodyIntro":"Jokin meni pieleen sivustosi siirrossa kohteesta {oldsite} kohteeseen {newsite}.","migratorMail_typeFail_button_title":"Yritä siirtoa uudelleen","migratorMail_typeFail_errorText":"Virhe: {fail_reason}","migratorMail_typeFail_errorTextInternal":"Virhe: Sisäinen virhe ({fail_reason})","migratorMail_typeFail_failTime":"Siirto epäonnistui: {dateandtime}","migratorMail_typeFail_footer_title":"Tarvitsetko apua sivustosi siirtämisessä one.comille? Autamme mielellämme.","migratorMail_typeFail_subject":"Siirto epäonnistui","migratorMail_typeFail_title":"WordPress-siirto epäonnistui","migratorMail_typeSuccess_bodyIntro":"Sivustosi siirto kohteesta {oldsite} kohteeseen {newsite} on nyt valmis.","migratorMail_typeSuccess_brokenPlugins":"Lisäksi siirron jälkeen havaittiin, että seuraavat lisäosat aiheuttavat virheitä, ja ne on poistettu käytöstä siirretyllä sivustolla: {plugins}.","migratorMail_typeSuccess_button_title":"Siirry sivustollesi","migratorMail_typeSuccess_excludedDirs":"Huomaa: Sujuvan siirtoprosessin varmistamiseksi seuraavat hakemistot jätettiin siirron ulkopuolelle: {directories}. Voit tarvittaessa siirtää nämä tiedot manuaalisesti verkkolevytilaasi.","migratorMail_typeSuccess_finishTime":"Siirto valmistui: {dateandtime}","migratorMail_typeSuccess_footer_title":"Onko sinulla kysyttävää? Autamme mielellämme.","migratorMail_typeSuccess_startTime":"Siirto aloitettu: {dateandtime}","migratorMail_typeSuccess_subject":"Siirto onnistui","migratorMail_typeSuccess_title":"WordPress-siirto onnistui"}');

/***/ }),

/***/ "./src/i18n/locales/fr_FR.json":
/*!*************************************!*\
  !*** ./src/i18n/locales/fr_FR.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"migratorMail_footer_contactButton_title":"Contactez-nous aujourd\'hui","migratorMail_footer_footer-link-1_title":"one.com","migratorMail_footer_footer-link-2_title":"Conditions","migratorMail_footer_footer-link-3_title":"Politique de confidentialité","migratorMail_footer_visitSite_title":"Visiter le site","migratorMail_hi":"Bonjour,","migratorMail_typeFail_bodyIntro":"Un incident s\'est produit durant la migration de votre site de {oldsite} vers {newsite}.","migratorMail_typeFail_button_title":"Recommencer la migration","migratorMail_typeFail_errorText":"Erreur: {fail_reason}","migratorMail_typeFail_errorTextInternal":"Erreur : Erreur interne ({fail_reason})","migratorMail_typeFail_failTime":"Échec de la migration: {dateandtime}","migratorMail_typeFail_footer_title":"Vous avez besoin d\'aide pour effectuer la migration de votre site vers one.com? Nous sommes là pour vous aider.","migratorMail_typeFail_subject":"Échec de la migration","migratorMail_typeFail_title":"Échec de la migration WordPress","migratorMail_typeSuccess_bodyIntro":"La migration de votre site de {oldsite} vers {newsite} est à présent terminée.","migratorMail_typeSuccess_brokenPlugins":"En outre, après la migration, le(s) plugin(s) suivant(s) a (ont) provoqué des erreurs et a (ont) été désactivé(s) sur le site migré : {plugins}.","migratorMail_typeSuccess_button_title":"Accéder à votre site","migratorMail_typeSuccess_excludedDirs":"Remarque : Pour garantir un processus de migration fluide, les répertoires suivants ont été exclus de la migration : {directories}. Vous pouvez déplacer manuellement ces données vers votre espace web si nécessaire.","migratorMail_typeSuccess_finishTime":"Fin de la migration: {dateandtime}","migratorMail_typeSuccess_footer_title":"Une question? Nous sommes là pour vous aider.","migratorMail_typeSuccess_startTime":"Début de la migration: {dateandtime}","migratorMail_typeSuccess_subject":"Migration effectuée avec succès","migratorMail_typeSuccess_title":"Migration WordPress terminée"}');

/***/ }),

/***/ "./src/i18n/locales/it_IT.json":
/*!*************************************!*\
  !*** ./src/i18n/locales/it_IT.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"migratorMail_footer_contactButton_title":"Contattaci oggi stesso","migratorMail_footer_footer-link-1_title":"one.com","migratorMail_footer_footer-link-2_title":"Condizioni","migratorMail_footer_footer-link-3_title":"Informativa sulla privacy","migratorMail_footer_visitSite_title":"Visita il sito","migratorMail_hi":"Salve,","migratorMail_typeFail_bodyIntro":"Qualcosa non ha funzionato con la migrazione del tuo sito da {oldsite} a {newsite}.","migratorMail_typeFail_button_title":"Ritenta la migrazione","migratorMail_typeFail_errorText":"Errore: {fail_reason}","migratorMail_typeFail_errorTextInternal":"Errore: Errore interno ({fail_reason})","migratorMail_typeFail_failTime":"Migrazione non riuscita: {dateandtime}","migratorMail_typeFail_footer_title":"Hai bisogno di assistenza per migrare il tuo sito verso one.com? Siamo qui per aiutarti.","migratorMail_typeFail_subject":"Migrazione non riuscita","migratorMail_typeFail_title":"Migrazione WordPress non riuscita","migratorMail_typeSuccess_bodyIntro":"La migrazione del tuo sito da {oldsite} a {newsite} è ora completata.","migratorMail_typeSuccess_brokenPlugins":"Inoltre, dopo la migrazione, i seguenti plugin hanno causato errori e sono stati disattivati sul sito migrato: {plugins}.","migratorMail_typeSuccess_button_title":"Visita il tuo sito","migratorMail_typeSuccess_excludedDirs":"Nota: per garantire un processo di migrazione ottimizzato, le seguenti directory sono state escluse dalla migrazione: {directories}. Se necessario, puoi spostare manualmente questi dati sul tuo spazio web.","migratorMail_typeSuccess_finishTime":"Migrazione finita: {dateandtime}","migratorMail_typeSuccess_footer_title":"Hai delle domande? Siamo qui per aiutarti.","migratorMail_typeSuccess_startTime":"Migrazione iniziata: {dateandtime}","migratorMail_typeSuccess_subject":"Migrazione riuscita","migratorMail_typeSuccess_title":"Migrazione WordPress completata"}');

/***/ }),

/***/ "./src/i18n/locales/nl_NL.json":
/*!*************************************!*\
  !*** ./src/i18n/locales/nl_NL.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"migratorMail_footer_contactButton_title":"Neem vandaag nog contact met ons op","migratorMail_footer_footer-link-1_title":"one.com","migratorMail_footer_footer-link-2_title":"Algemene voorwaarden","migratorMail_footer_footer-link-3_title":"Privacybeleid","migratorMail_footer_visitSite_title":"Website bezoeken","migratorMail_hi":"Hallo,","migratorMail_typeFail_bodyIntro":"Er is iets mis gegaan tijdens de migratie van uw site van {oldsite} naar {newsite}.","migratorMail_typeFail_button_title":"Migratie opnieuw proberen","migratorMail_typeFail_errorText":"Fout: {fail_reason}","migratorMail_typeFail_errorTextInternal":"Fout: Interne fout ({fail_reason})","migratorMail_typeFail_failTime":"Migratie niet gelukt: {dateandtime}","migratorMail_typeFail_footer_title":"Hebt u hulp nodig bij het migreren van uw site naar one.com? We helpen u graag.","migratorMail_typeFail_subject":"Migratie niet gelukt","migratorMail_typeFail_title":"WordPress migratie niet gelukt","migratorMail_typeSuccess_bodyIntro":"De migratie van uw site van {oldsite} naar {newsite} is nu voltooid.","migratorMail_typeSuccess_brokenPlugins":"Daarnaast is na de migratie gebleken dat de volgende plugin(s) fouten veroorzaken en zijn gedeactiveerd op de gemigreerde site: {plugins}.","migratorMail_typeSuccess_button_title":"Naar uw site gaan","migratorMail_typeSuccess_excludedDirs":"Let op: Om een soepele migratie te garanderen, zijn de volgende mappen uitgesloten van de migratie: {directories}. Indien nodig kun je deze gegevens handmatig naar je webruimte verplaatsen.","migratorMail_typeSuccess_finishTime":"Migratie voltooid: {dateandtime}","migratorMail_typeSuccess_footer_title":"Hebt u een vraag? We helpen u graag.","migratorMail_typeSuccess_startTime":"Migratie gestart: {dateandtime}","migratorMail_typeSuccess_subject":"Migratie is geslaagd","migratorMail_typeSuccess_title":"WordPress migratie voltooid"}');

/***/ }),

/***/ "./src/i18n/locales/no_NO.json":
/*!*************************************!*\
  !*** ./src/i18n/locales/no_NO.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"migratorMail_footer_contactButton_title":"Kontakt oss i dag","migratorMail_footer_footer-link-1_title":"one.com","migratorMail_footer_footer-link-2_title":"Betingelser","migratorMail_footer_footer-link-3_title":"Personvernerklæring","migratorMail_footer_visitSite_title":"Besøk nettstedet","migratorMail_hi":"Hei,","migratorMail_typeFail_bodyIntro":"Noe gikk galt med migreringen av siden din fra {oldsite} til {newsite}.","migratorMail_typeFail_button_title":"Prøv migrering på nytt","migratorMail_typeFail_errorText":"Feil: {fail_reason}","migratorMail_typeFail_errorTextInternal":"Feil: Intern feil ({fail_reason})","migratorMail_typeFail_failTime":"Migrering mislyktes: {dateandtime}","migratorMail_typeFail_footer_title":"Trenger du hjelp med å migrere siden din til one.com? Vi er her for å hjelpe deg.","migratorMail_typeFail_subject":"Migreringen mislyktes","migratorMail_typeFail_title":"WordPress-migreringen mislyktes","migratorMail_typeSuccess_bodyIntro":"Migreringen av siden din fra {oldsite} til {newsite} er fullført.","migratorMail_typeSuccess_brokenPlugins":"I tillegg ble det oppdaget feil i følgende plugin(er) etter migreringen, og disse er deaktivert på det migrerte nettstedet: {plugins}.","migratorMail_typeSuccess_button_title":"Gå til siden din","migratorMail_typeSuccess_excludedDirs":"Vennligst merk: For å sikre en smidig migreringsprosess ble følgende kataloger utelatt fra migreringen: {directories}. Du kan manuelt flytte disse dataene til webhotellet ditt om nødvendig.","migratorMail_typeSuccess_finishTime":"Migrering ferdig: {dateandtime}","migratorMail_typeSuccess_footer_title":"Har du spørsmål? Vi er her for å hjelpe deg.","migratorMail_typeSuccess_startTime":"Migrering startet: {dateandtime}","migratorMail_typeSuccess_subject":"Migreringen var vellykket","migratorMail_typeSuccess_title":"WordPress-migreringen er fullført"}');

/***/ }),

/***/ "./src/i18n/locales/pt_PT.json":
/*!*************************************!*\
  !*** ./src/i18n/locales/pt_PT.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"migratorMail_footer_contactButton_title":"Contacte-nos hoje","migratorMail_footer_footer-link-1_title":"one.com","migratorMail_footer_footer-link-2_title":"Termos","migratorMail_footer_footer-link-3_title":"Política de Privacidade","migratorMail_footer_visitSite_title":"Visitar o sítio","migratorMail_hi":"Olá,","migratorMail_typeFail_bodyIntro":"Ocorreu um erro ao migrar o seu website de {oldsite} para {newsite}.","migratorMail_typeFail_button_title":"Voltar a tentar a migração","migratorMail_typeFail_errorText":"Erro: {fail_reason}","migratorMail_typeFail_errorTextInternal":"Erro: Erro interno ({fail_reason})","migratorMail_typeFail_failTime":"A migração falhou: {dateandtime}","migratorMail_typeFail_footer_title":"Precisa de ajuda para migrar o seu website para a one.com? Estamos aqui para ajudar.","migratorMail_typeFail_subject":"Falha na migração","migratorMail_typeFail_title":"Falha na migração para o WordPress","migratorMail_typeSuccess_bodyIntro":"A migração do seu website de {oldsite} para {newsite} foi concluída.","migratorMail_typeSuccess_brokenPlugins":"Além disso, após a migração, verificou-se que o(s) seguinte(s) plugin(s) causava(m) erros e foi(ram) desativado(s) no site migrado: {plugins}.","migratorMail_typeSuccess_button_title":"Aceda ao seu website","migratorMail_typeSuccess_excludedDirs":"Queira ter em atenção: para garantir um processo de migração suave, os seguintes diretórios foram removidos da migração: {directories}. Pode mover manualmente esses dados para o seu espaço web, se necessário.","migratorMail_typeSuccess_finishTime":"Fim da migração: {dateandtime}","migratorMail_typeSuccess_footer_title":"Tem dúvidas? Estamos aqui para ajudar.","migratorMail_typeSuccess_startTime":"A migração começou: {dateandtime}","migratorMail_typeSuccess_subject":"Migração bem-sucedida","migratorMail_typeSuccess_title":"Migração para WordPress concluída"}');

/***/ }),

/***/ "./src/i18n/locales/sv_SE.json":
/*!*************************************!*\
  !*** ./src/i18n/locales/sv_SE.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"migratorMail_footer_contactButton_title":"Kontakta oss idag","migratorMail_footer_footer-link-1_title":"one.com","migratorMail_footer_footer-link-2_title":"Villkor","migratorMail_footer_footer-link-3_title":"Sekretesspolicy","migratorMail_footer_visitSite_title":"Besök webbplatsen","migratorMail_hi":"Hej!","migratorMail_typeFail_bodyIntro":"Någonting gick fel när din hemsida skulle migreras från {oldsite} till {newsite}.","migratorMail_typeFail_button_title":"Starta om migrering","migratorMail_typeFail_errorText":"Fel: {fail_reason}","migratorMail_typeFail_errorTextInternal":"Fel: Internt fel ({fail_reason})","migratorMail_typeFail_failTime":"Migrering misslyckades: {dateandtime}","migratorMail_typeFail_footer_title":"Behöver du hjälp med att migrera din hemsida till one.com? Vi hjälper dig gärna.","migratorMail_typeFail_subject":"Migrering misslyckades","migratorMail_typeFail_title":"WordPress-migreringen misslyckades","migratorMail_typeSuccess_bodyIntro":"Migreringen av din hemsida från {oldsite} till {newsite} är nu slutförd.","migratorMail_typeSuccess_brokenPlugins":"Efter migreringen visade det sig dessutom att följande plugin orsakade fel och har avaktiverats på den migrerade webbplatsen: {plugins}.","migratorMail_typeSuccess_button_title":"Gå till din hemsida","migratorMail_typeSuccess_excludedDirs":"Observera: För att säkerställa en smidig migreringsprocess uteslöts följande kataloger från migreringen: {directories}. Du kan manuellt flytta dessa data till ditt webbutrymme om det behövs.","migratorMail_typeSuccess_finishTime":"Migrering slutfördes: {dateandtime}","migratorMail_typeSuccess_footer_title":"Har du några frågor? Vi hjälper dig gärna.","migratorMail_typeSuccess_startTime":"Migrering startades: {dateandtime}","migratorMail_typeSuccess_subject":"Migrering lyckades","migratorMail_typeSuccess_title":"WordPress-migrering är slutförd"}');

/***/ }),

/***/ "./src/utils/priceFormatter.js":
/*!*************************************!*\
  !*** ./src/utils/priceFormatter.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatPluginPrice: () => (/* binding */ formatPluginPrice)
/* harmony export */ });
/**
 * Formats the price display for a plugin based on its license type
 * @param {Object} plugin - The plugin object containing price and license information
 * @returns {string} - Formatted price string ('Free' or 'Currency Amount')
 */
const formatPluginPrice = plugin => {
  const isFree = plugin.licenseType === "free";
  if (isFree) {
    return 'Free';
  }
  if (plugin.priceCurrency && plugin.priceAmount) {
    return `${plugin.priceCurrency} ${plugin.priceAmount}`;
  }
  return '€ 0,-';
};

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactDOM"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ./src/index.jsx ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MarketplaceApp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MarketplaceApp */ "./src/MarketplaceApp.jsx");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./i18n */ "./src/i18n/index.js");






// Inside-WP auto-mount
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("marketplace-root");
  if (el) {
    const config = window.marketplaceConfig || {};
    if (config.locale) {
      Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! i18next */ "./node_modules/i18next/dist/esm/i18next.js")).then(({
        default: i18n
      }) => {
        i18n.changeLanguage(config.locale);
      });
    }
    const root = (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createRoot)(el);
    root.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_MarketplaceApp__WEBPACK_IMPORTED_MODULE_2__["default"], {
      ...config
    }));
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map
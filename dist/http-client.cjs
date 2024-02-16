"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/http-client.ts
var http_client_exports = {};
__export(http_client_exports, {
  httpClient: () => httpClient
});
module.exports = __toCommonJS(http_client_exports);
var import_qs = __toESM(require("qs"), 1);
var httpClient = (_0) => __async(void 0, [_0], function* ({
  method = "GET",
  body = null,
  headers,
  url,
  queryParams = {}
}) {
  var _a;
  try {
    const params = import_qs.default.stringify(queryParams);
    url = `${url}?${params}`;
    headers = __spreadValues({
      "content-type": "application/json"
    }, headers);
    if (body instanceof Object) {
      body = JSON.stringify(body);
    }
    const res = yield fetch(url, { method, body, headers });
    const data = yield res.json();
    const { ok, status } = res;
    let total = 10;
    let contentRangeHeader = (_a = res == null ? void 0 : res.headers) == null ? void 0 : _a.get("Content-Range");
    if (contentRangeHeader) {
      total = +(contentRangeHeader == null ? void 0 : contentRangeHeader.split("/")[1]) || 10;
    }
    return { res, ok, status, data, total };
  } catch (error) {
    console.error(error);
    throw error;
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  httpClient
});

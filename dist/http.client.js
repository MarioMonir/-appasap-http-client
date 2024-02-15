"use strict";
/**
 * Http Client for AppAsap
 *
 * GET /api/user?filter=%7B%7D&range=%5B0%2C9%5D&sort=%5B%22id%22%2C%22ASC%22%5D
 * @link: https://dev.to/nerdyman/replacing-query-string-with-native-urlsearchparams-4kdg
 * @author MarioMonir
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpClient = void 0;
// -------------------------------------------------
const qs_1 = __importDefault(require("qs"));
// -------------------------------------------------
const httpClient = ({ method = "GET", body = null, headers, url, queryParams = {}, }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const params = qs_1.default.stringify(queryParams);
        url = `${url}?${params}`;
        headers = Object.assign({ "content-type": "application/json" }, headers);
        if (body instanceof Object) {
            body = JSON.stringify(body);
        }
        const res = yield fetch(url, { method, body, headers });
        const data = yield res.json();
        const { ok, status } = res;
        let total = 10;
        let contentRangeHeader = (_a = res === null || res === void 0 ? void 0 : res.headers) === null || _a === void 0 ? void 0 : _a.get("Content-Range");
        if (contentRangeHeader) {
            total = +(contentRangeHeader === null || contentRangeHeader === void 0 ? void 0 : contentRangeHeader.split("/")[1]) || 10;
        }
        return { res, ok, status, data, total };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.httpClient = httpClient;

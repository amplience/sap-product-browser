"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
class ProductSearchService {
    constructor(host, token) {
        this.host = host;
        this.token = token;
    }
    search(query, callBack) {
        request_1.default(`${this.host}/Products`, {
            headers: {
                'apikey': this.token
            }, method: 'GET'
        }, callBack);
    }
}
//# sourceMappingURL=product-search-service.js.map
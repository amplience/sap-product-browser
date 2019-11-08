"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
var PAGE_SIZE = 25;
var ProductService = /** @class */ (function () {
    function ProductService(host, basPath) {
        this.host = host;
        this.basPath = basPath;
    }
    ProductService.prototype.search = function (catalogue, query, currency, page, onSuccess, onFail) {
        request_1.default.get("" + this.host + this.basPath + "/" + catalogue + "/products/search?fields=products(code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating),pagination(DEFAULT),sorts(DEFAULT),\n    freeTextSearch&query=" + query + "&pageSize=" + PAGE_SIZE + "&lang=en&curr=" + currency, {
            headers: {
                'Origin': null
            }
        }, function (error, response, body) {
            if (error) {
                if (onFail) {
                    onFail(error);
                    throw new Error('unable to retrieve results from SAP.');
                }
            }
            onSuccess(JSON.parse(body));
        });
    };
    ProductService.prototype.getByCode = function (catalogue, code, onSuccess, onFail) {
        request_1.default.get("" + this.host + this.basPath + "/" + catalogue + "/products/" + code + "?fields=code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating&lang=en&curr=" + this.currency, {
            headers: {
                'Origin': null
            }
        }, function (error, response, body) {
            if (error) {
                if (onFail) {
                    onFail(error);
                    throw new Error('unable to retrieve product by code from SAP.');
                }
                onSuccess(body.d.results);
            }
        });
    };
    ProductService.prototype.getImageSrc = function (image) {
        return (image) ? this.host + "/" + image.url : 'https://apps.dev-artifacts.adis.ws/cms-icons/master/latest/256/ca-types-carousel.png';
    };
    return ProductService;
}());
exports.ProductService = ProductService;

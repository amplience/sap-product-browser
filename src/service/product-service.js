"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
var PAGE_SIZE = 25;
var PRODUCT_FIELDS = 'fields=products(code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating)';
function sanitise(value) {
    var partial = (value.startsWith('/')) ? value.substring(1, value.length) : value;
    return (partial.endsWith('/')) ? partial.substring(0, partial.length - 1) : partial;
}
var ProductService = /** @class */ (function () {
    function ProductService(host, basPath, imageFormat) {
        if (imageFormat === void 0) { imageFormat = 'thumbnail'; }
        this.host = host;
        this.basPath = basPath;
        this.imageFormat = imageFormat;
        this.url = sanitise(host) + "/" + sanitise(basPath);
    }
    ProductService.prototype.search = function (catalogue, query, currency, page, onSuccess, onFail) {
        var _this = this;
        request_1.default.get(this.url + "/" + catalogue + "/products/search?" + PRODUCT_FIELDS + ",pagination(DEFAULT),sorts(DEFAULT),freeTextSearch&query=" + query + "&pageSize=" + PAGE_SIZE + "&lang=en&curr=" + currency, {
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
            onSuccess(_this.setDefaultImagesForProducts(JSON.parse(body)));
        });
    };
    ProductService.prototype.getByCode = function (catalogue, code, currency, onSuccess, onFail) {
        request_1.default.get("" + this.host + this.basPath + "/" + catalogue + "/products/" + code + "?fields=code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating&lang=en&curr=" + currency, {
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
    ProductService.prototype.setDefaultImagesForProducts = function (result) {
        var _this = this;
        result.products.forEach(function (x) {
            var defaultImage = _this.getFirstImageOfFormat(x.images);
            if (defaultImage) {
                x.defaultImageUrl = _this.getImageSrc(defaultImage);
            }
        });
        return result;
    };
    ProductService.prototype.getFirstImageOfFormat = function (images) {
        var _this = this;
        return (images) ? images.find(function (x) { return x.format === _this.imageFormat; }) : undefined;
    };
    ProductService.prototype.getImageSrc = function (image) {
        return (image) ? this.host + "/" + image.url : 'https://apps.dev-artifacts.adis.ws/cms-icons/master/latest/256/ca-types-carousel.png';
    };
    return ProductService;
}());
exports.ProductService = ProductService;

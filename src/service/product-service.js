"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var DEFAULT_PAGE_SIZE = 20;
var DEFAULT_PAGE = 0;
var PRODUCT_FIELDS = 'fields=products(code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating)';
function sanitise(value) {
    var partial = (value.startsWith('/')) ? value.substring(1, value.length) : value;
    return (partial.endsWith('/')) ? partial.substring(0, partial.length - 1) : partial;
}
var ProductService = /** @class */ (function () {
    function ProductService(host, basPath, defaultNotFoundImage, authTokenSupplier, defaultImageOptions) {
        if (defaultImageOptions === void 0) { defaultImageOptions = {
            format: 'thumbnail',
            type: 'PRIMARY'
        }; }
        this.host = host;
        this.basPath = basPath;
        this.defaultNotFoundImage = defaultNotFoundImage;
        this.authTokenSupplier = authTokenSupplier;
        this.defaultImageOptions = defaultImageOptions;
        this.url = sanitise(host) + "/" + sanitise(basPath);
    }
    ProductService.prototype.search = function (catalogue, query, currency, page, pageSize, defaultImageOptions) {
        if (page === void 0) { page = DEFAULT_PAGE; }
        if (pageSize === void 0) { pageSize = DEFAULT_PAGE_SIZE; }
        if (defaultImageOptions === void 0) { defaultImageOptions = this.defaultImageOptions; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, fetch(this.url + "/" + catalogue + "/products/search?" + PRODUCT_FIELDS + ",pagination(DEFAULT),sorts(DEFAULT),freeTextSearch&query=" + query + "&pageSize=" + pageSize + "&currentPage=" + page + "&lang=en&curr=" + currency, this.buildRequestOptions()).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!response.ok) {
                                        return [2 /*return*/, Promise.reject("unable to retrieve results from SAP: " + response.statusText)];
                                    }
                                    _a = this.setDefaultImagesForProducts;
                                    return [4 /*yield*/, response.json()];
                                case 1: return [2 /*return*/, _a.apply(this, [_b.sent(), defaultImageOptions])];
                            }
                        });
                    }); })];
            });
        });
    };
    ProductService.prototype.getByCode = function (catalogue, code, currency, defaultImageOptions) {
        if (defaultImageOptions === void 0) { defaultImageOptions = this.defaultImageOptions; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, fetch("" + this.host + this.basPath + "/" + catalogue + "/products/" + code + "?fields=code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating&lang=en&curr=" + currency, this.buildRequestOptions()).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                        var product;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!response.ok) {
                                        return [2 /*return*/, Promise.reject("unable to retrieve product by code from SAP: " + response.statusText)];
                                    }
                                    return [4 /*yield*/, response.json()];
                                case 1:
                                    product = _a.sent();
                                    product.defaultImageUrl = this.getImageSrc(this.getFirstImageOfFormat(product.images, defaultImageOptions.format, defaultImageOptions.type));
                                    return [2 /*return*/, product];
                            }
                        });
                    }); })];
            });
        });
    };
    ProductService.prototype.getFirstImageOfFormat = function (images, imageFormat, imageType) {
        return (images) ? images.find(function (x) { return x.format === imageFormat && x.imageType === imageType; }) : undefined;
    };
    ProductService.prototype.getImageSrc = function (image) {
        return (image) ? this.host + "/" + image.url : this.defaultNotFoundImage;
    };
    ProductService.prototype.buildRequestOptions = function () {
        return (this.authTokenSupplier) ? {
            headers: {
                'Authorization': this.authTokenSupplier()
            }
        } : {};
    };
    ProductService.prototype.setDefaultImagesForProducts = function (result, defaultImageOptions) {
        var _this = this;
        result.products.forEach(function (x) {
            x.defaultImageUrl = _this.getImageSrc(_this.getFirstImageOfFormat(x.images, defaultImageOptions.format, defaultImageOptions.type));
        });
        return result;
    };
    return ProductService;
}());
exports.ProductService = ProductService;

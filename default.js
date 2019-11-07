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
var dc_extensions_sdk_1 = require("dc-extensions-sdk");
var product_service_js_1 = require("./src/service/product-service.js");
function createElement(type, clazz) {
    var element = document.createElement('div');
    if (clazz) {
        element.className = clazz;
    }
    return element;
}
function onInit() {
    return __awaiter(this, void 0, void 0, function () {
        var SDK, value, schema, service, searchButton;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dc_extensions_sdk_1.init()];
                case 1:
                    SDK = _a.sent();
                    SDK.frame.startAutoResizer();
                    return [4 /*yield*/, SDK.field.getValue()];
                case 2:
                    value = _a.sent();
                    schema = SDK.field.schema;
                    console.log(JSON.stringify(SDK.params));
                    console.log(JSON.stringify(schema['ui:extension']));
                    console.log("should be origin of " + location.origin);
                    service = new product_service_js_1.ProductService('https://api.cjp2keew1-amplience1-d1-public.model-t.cc.commerce.ondemand.com', '/rest/v2', 'electronics-spa', 'USD');
                    searchButton = document.getElementById('searchButton');
                    if (searchButton) {
                        searchButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                service.search(document.getElementById('searchText').value, 0, function (response) {
                                    var resultTable = document.getElementById('resultTable');
                                    resultTable.innerHTML = '';
                                    response.products.forEach(function (x) {
                                        console.log('here is the product' + JSON.stringify(x, null, -2));
                                        var column = createElement('div', 'column');
                                        var card = createElement('div', 'card');
                                        column.append(card);
                                        var image = document.createElement('img');
                                        var imageSrc = service.getImageSrc(getFirstImageOfFormat('thumbnail', x.images));
                                        console.log(' my image url: ' + imageSrc);
                                        image.src = imageSrc;
                                        card.append(inDiv(asHeader(3, document.createTextNode(x.name)), 'productTitle'));
                                        card.append(inDiv(image, 'imageContainer'));
                                        card.append(inDiv(asParagraph(document.createTextNode(x.summary)), 'productSummary'));
                                        resultTable.append(column);
                                    });
                                });
                                document.getElementById('searchText');
                                return [2 /*return*/];
                            });
                        }); });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function inDiv(content, clazz) {
    var row = createElement('div', clazz);
    row.append(content);
    return row;
}
function asParagraph(content) {
    var paragraph = document.createElement('p');
    paragraph.appendChild(content);
    return paragraph;
}
function asHeader(guage, content) {
    var paragraph = document.createElement("h" + guage);
    paragraph.appendChild(content);
    return paragraph;
}
function getFirstImageOfFormat(format, images) {
    return (images) ? images.find(function (x) { return x.format === format; }) : undefined;
}
onInit();

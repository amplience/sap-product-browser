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
var product_service_1 = require("./src/service/product-service");
var ui_manager_1 = require("./src/service/ui-manager");
function onInit() {
    return __awaiter(this, void 0, void 0, function () {
        var SDK, value, schema, service, searchText, uiManager, defaultCategory;
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
                    service = new product_service_1.ProductService('https://api.cjp2keew1-amplience1-d1-public.model-t.cc.commerce.ondemand.com', '/rest/v2', 'https://apps.dev-artifacts.adis.ws/cms-icons/master/latest/256/ca-types-carousel.png');
                    searchText = document.getElementById('searchText');
                    uiManager = new ui_manager_1.UIManager(service);
                    defaultCategory = 'electronics-spa';
                    uiManager.setDefaultCategory(defaultCategory);
                    service.search(defaultCategory, '', 'USD', 0, function (response) {
                        uiManager.populateResultsTable(response);
                    });
                    if (searchText) {
                        searchText.addEventListener('keyup', function (event) {
                            if (event.key === 'Enter') {
                                service.search(defaultCategory, searchText.value, 'USD', 0, function (response) {
                                    uiManager.populateResultsTable(response);
                                });
                            }
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
onInit();

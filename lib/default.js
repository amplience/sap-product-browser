"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dc_extensions_sdk_1 = require("dc-extensions-sdk");
function onInit() {
    return __awaiter(this, void 0, void 0, function* () {
        const SDK = yield dc_extensions_sdk_1.init();
        const value = yield SDK.field.getValue();
        const x = SDK.field.schema;
    });
}
onInit();
//# sourceMappingURL=default.js.map
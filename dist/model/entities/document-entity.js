"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var caribviper_entity_1 = require("caribviper-entity");
var DocumentEntity = (function (_super) {
    __extends(DocumentEntity, _super);
    function DocumentEntity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.documentId = '';
        return _this;
    }
    return DocumentEntity;
}(caribviper_entity_1.Entity));
exports.DocumentEntity = DocumentEntity;

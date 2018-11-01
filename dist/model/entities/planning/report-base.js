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
var caribviper_common_1 = require("caribviper-common");
var caribviper_entity_1 = require("caribviper-entity");
var BaseReport = (function (_super) {
    __extends(BaseReport, _super);
    function BaseReport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = '';
        _this.recommendations = '';
        _this.description = '';
        _this.dateCreated = new Date();
        _this.photographsOnNewPage = true;
        return _this;
    }
    Object.defineProperty(BaseReport.prototype, "isFinalised", {
        get: function () {
            return !!this.dateAttached;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseReport.prototype, "hasPictures", {
        get: function () {
            return !!this.attachedPictures && this.attachedPictures.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    BaseReport.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Report cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.registryId, 'Report must have valid registry item id');
        caribviper_common_1.Assert.isTruthy(this.author, 'Report must have a valid author');
        caribviper_common_1.Assert.isTruthy(this.dateCreated, 'Report must have a valid creation date');
        caribviper_common_1.Assert.isTruthy(this.description, 'Report must have a valid description from the registry item');
    };
    BaseReport.prototype.ensureNotFinalise = function () {
        if (this.isFinalised)
            throw new Error('Report is already finalised');
    };
    BaseReport.prototype.updateContent = function (content, recommendations) {
        if (recommendations === void 0) { recommendations = ''; }
        this.ensureNotFinalise();
        this.content = content;
        this.recommendations = recommendations;
        this.update();
    };
    BaseReport.prototype.attachReport = function () {
        this.ensureNotFinalise();
        this.dateAttached = new Date();
        this.update();
    };
    return BaseReport;
}(caribviper_entity_1.Entity));
exports.BaseReport = BaseReport;

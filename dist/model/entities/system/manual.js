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
var __1 = require("../../..");
var caribviper_common_1 = require("caribviper-common");
var ManualSection = (function () {
    function ManualSection(title, sectionNo, content, sections) {
        if (sections === void 0) { sections = []; }
        this.title = title;
        this.sectionNo = sectionNo;
        this.content = content;
        this.sections = sections;
    }
    return ManualSection;
}());
exports.ManualSection = ManualSection;
var TableOfContentsItem = (function () {
    function TableOfContentsItem(sectionNo, title) {
        this.sectionNo = sectionNo;
        this.title = title;
    }
    return TableOfContentsItem;
}());
exports.TableOfContentsItem = TableOfContentsItem;
var Manual = (function (_super) {
    __extends(Manual, _super);
    function Manual() {
        var _this = _super.call(this, __1.ENTITY_MODELS.SYSTEM.MANUAL, Manual.createId(), true) || this;
        _this.sections = [];
        return _this;
    }
    Manual.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Manual cannot be transient');
    };
    Manual.prototype.tableOfContents = function () {
        var _this = this;
        if (!this.sections || this.sections.length === 0)
            return [];
        var table = [];
        this.sections.forEach(function (section) {
            table.push(new TableOfContentsItem(section.sectionNo, section.title));
            var items = _this.flattenSections(section);
            table.push.apply(table, items);
        });
    };
    Manual.prototype.flattenSections = function (manualSection) {
        var _this = this;
        var table = [];
        manualSection.sections.forEach(function (section) {
            table.push(new TableOfContentsItem(section.sectionNo, section.title));
            if (!!section.sections && section.sections.length > 0) {
                section.sections.forEach(function (subSection) {
                    var items = _this.flattenSections(subSection);
                    table.push.apply(table, items);
                });
            }
        });
        return table;
    };
    Manual.createId = function () {
        return caribviper_entity_1.Entity.generateId(__1.ENTITY_MODELS.SYSTEM.MANUAL);
    };
    Manual.mapToEntity = function (source) {
        var favourite = Object.assign(new Manual(), source);
        return favourite;
    };
    Manual.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Manual(), element));
        });
        return array;
    };
    return Manual;
}(caribviper_entity_1.Entity));
exports.Manual = Manual;

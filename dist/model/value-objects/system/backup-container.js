"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BackupContainer = (function () {
    function BackupContainer(categories, agencies, documentTemplates, workflowTemplates, decisionItemTemplates, indicies) {
        if (categories === void 0) { categories = []; }
        if (agencies === void 0) { agencies = []; }
        if (documentTemplates === void 0) { documentTemplates = []; }
        if (workflowTemplates === void 0) { workflowTemplates = []; }
        if (decisionItemTemplates === void 0) { decisionItemTemplates = []; }
        if (indicies === void 0) { indicies = []; }
        this.categories = categories;
        this.agencies = agencies;
        this.documentTemplates = documentTemplates;
        this.workflowTemplates = workflowTemplates;
        this.decisionItemTemplates = decisionItemTemplates;
        this.indicies = indicies;
    }
    Object.defineProperty(BackupContainer.prototype, "agenciesCount", {
        get: function () {
            return this.agencies ? this.agencies.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BackupContainer.prototype, "categoriesCount", {
        get: function () {
            return this.categories ? this.categories.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BackupContainer.prototype, "documentsCount", {
        get: function () {
            return this.documentTemplates ? this.documentTemplates.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BackupContainer.prototype, "decisionsCount", {
        get: function () {
            return this.decisionItemTemplates ? this.decisionItemTemplates.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BackupContainer.prototype, "workflowsCount", {
        get: function () {
            return this.workflowTemplates ? this.workflowTemplates.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BackupContainer.prototype, "indiciesCount", {
        get: function () {
            return this.indicies ? this.indicies.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    return BackupContainer;
}());
exports.BackupContainer = BackupContainer;

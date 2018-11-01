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
var entity_automapper_1 = require("./../entity-automapper");
var caribviper_common_1 = require("caribviper-common");
var entity_model_type_1 = require("./../entity-model-type");
var caribviper_entity_1 = require("caribviper-entity");
var DocumentModel = (function () {
    function DocumentModel(document, model) {
        if (model === void 0) { model = undefined; }
        this.document = document;
        this.model = model;
    }
    return DocumentModel;
}());
exports.DocumentModel = DocumentModel;
var DocumentModelType = (function () {
    function DocumentModelType(name, model) {
        this.name = name;
        this.model = model;
    }
    return DocumentModelType;
}());
exports.DocumentModelType = DocumentModelType;
var DocumentDetails = (function () {
    function DocumentDetails(template, models, title) {
        if (models === void 0) { models = []; }
        if (title === void 0) { title = ''; }
        this.template = template;
        this.models = models;
        this.title = title;
    }
    Object.defineProperty(DocumentDetails.prototype, "model", {
        get: function () {
            var mapper = new entity_automapper_1.EntityAutoMapper();
            var obj = {};
            this.models.forEach(function (m) {
                obj[m.name] = mapper.getMap(m.model);
            });
            return obj;
        },
        enumerable: true,
        configurable: true
    });
    return DocumentDetails;
}());
exports.DocumentDetails = DocumentDetails;
var DocumentUrl = (function () {
    function DocumentUrl(url, title) {
        if (title === void 0) { title = ''; }
        this.url = url;
        this.title = title;
    }
    return DocumentUrl;
}());
exports.DocumentUrl = DocumentUrl;
var DocumentProperty = (function () {
    function DocumentProperty() {
        this.title = '';
        this.subject = '';
        this.keywords = '';
        this.watermark = '';
        this.imagePath = '';
        this.code = '';
    }
    return DocumentProperty;
}());
exports.DocumentProperty = DocumentProperty;
var Document = (function (_super) {
    __extends(Document, _super);
    function Document(registryId, documentCode, property, owner) {
        if (registryId === void 0) { registryId = ''; }
        if (documentCode === void 0) { documentCode = ''; }
        if (property === void 0) { property = new DocumentProperty(); }
        if (owner === void 0) { owner = null; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SYSTEM.DOCUMENT, Document.createId(registryId, documentCode), true) || this;
        _this.registryId = '';
        _this.documentType = '';
        _this.property = new DocumentProperty();
        _this.dateCreated = new Date();
        _this.dateModified = new Date();
        _this.data = '';
        _this.registryId = registryId;
        _this.documentCode = documentCode;
        _this.property = property;
        _this.owner = owner;
        _this.dateCreated = new Date();
        return _this;
    }
    Document.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Document cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.data, 'Document data cannot be undefined/empty');
        caribviper_common_1.Assert.isTruthy(this.dateCreated, 'Document must have a valid creation date');
        caribviper_common_1.Assert.isTruthy(this.owner, 'Document owner cannot be undefined');
        caribviper_common_1.Assert.isTruthy(this.property, 'Document property cannot be undefined');
    };
    Object.defineProperty(Document.prototype, "isDraft", {
        get: function () {
            return !this.finalisedDate;
        },
        enumerable: true,
        configurable: true
    });
    Document.prototype.dispatch = function (dispatchingUser) {
        if (!this.finalisedDate)
            throw new Error('Document has not been finalised');
        this.dispatchedBy = dispatchingUser;
        this.dispatchedDate = new Date();
        this.update();
    };
    Document.prototype.finalise = function (requestingUser) {
        if (this.owner.username === requestingUser.username) {
            this.finalisedDate = new Date();
            this.update();
            return true;
        }
        return false;
    };
    Document.createId = function (registryId, guid) {
        if (registryId === void 0) { registryId = ''; }
        if (guid === void 0) { guid = ''; }
        if (!registryId)
            return '';
        if (!guid)
            return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.SYSTEM.DOCUMENT);
        return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.SYSTEM.DOCUMENT, guid);
    };
    Document.mapToEntity = function (source) {
        return Object.assign(new Document(), source);
    };
    Document.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Document(), element));
        });
        return array;
    };
    return Document;
}(caribviper_entity_1.Entity));
exports.Document = Document;

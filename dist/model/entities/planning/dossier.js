"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var building_start_1 = require("./building-start");
var dispatched_item_1 = require("./dispatched-item");
var entity_model_type_1 = require("./../entity-model-type");
var task_1 = require("./task");
var minute_1 = require("./minute");
var decision_1 = require("./decision");
var consultation_1 = require("./consultation");
var attachment_1 = require("./attachment");
var report_1 = require("./report");
var registry_item_1 = require("./registry-item");
var notice_1 = require("./notice");
var note_1 = require("./note");
var letter_1 = require("./letter");
var Dossier = (function () {
    function Dossier() {
        this.registry = new registry_item_1.RegistryItem();
        this.attachments = [];
        this.consultations = [];
        this.decisions = [];
        this.minutes = [];
        this.reports = [];
        this.tasks = [];
        this.dispatchedItems = [];
        this.buildingStarts = [];
        this.certificates = [];
        this.notices = [];
        this.notes = [];
        this.letters = [];
        this.registry = new registry_item_1.RegistryItem();
        this.attachments = [];
        this.consultations = [];
        this.decisions = [];
        this.minutes = [];
        this.reports = [];
        this.tasks = [];
        this.dispatchedItems = [];
        this.buildingStarts = [];
        this.certificates = [];
        this.notices = [];
        this.notes = [];
        this.letters = [];
    }
    Dossier.mapToEntity = function (dossier) {
        var d = Object.assign(new Dossier(), dossier);
        d.registry = registry_item_1.RegistryItem.mapToEntity(d.registry);
        d.attachments = attachment_1.Attachment.mapToEntityArray(d.attachments);
        d.consultations = consultation_1.Consultation.mapToEntityArray(d.consultations);
        d.decisions = decision_1.Decision.mapToEntityArray(d.decisions);
        d.minutes = minute_1.Minute.mapToEntityArray(d.minutes);
        d.reports = report_1.Report.mapToEntityArray(d.reports);
        d.tasks = task_1.Task.mapToEntityArray(d.tasks);
        d.dispatchedItems = dispatched_item_1.DispatchedItem.mapToEntityArray(d.dispatchedItems);
        d.buildingStarts = building_start_1.BuildingStart.mapToEntityArray(d.buildingStarts);
        d.notices = notice_1.Notice.mapToEntityArray(d.notices);
        d.notes = note_1.Note.mapToEntityArray(d.notes);
        d.letters = letter_1.Letter.mapToEntityArray(d.letters);
        if (!!d.certificates) {
            d.certificates = registry_item_1.RegistryItem.mapToEntityArray(d.certificates);
        }
        return d;
    };
    Dossier.createDossier = function (items, registryCertificates) {
        if (registryCertificates === void 0) { registryCertificates = []; }
        var dossier = new Dossier();
        if (!items || items.length < 1)
            return null;
        if (!!registryCertificates && registryCertificates.length > 0)
            dossier.certificates = registry_item_1.RegistryItem.mapToEntityArray(registryCertificates);
        items.forEach(function (item) {
            switch (item.type) {
                case entity_model_type_1.ENTITY_MODELS.PLANNING.ATTACHMENT: {
                    dossier.attachments.push(attachment_1.Attachment.mapToEntity(item));
                    break;
                }
                case entity_model_type_1.ENTITY_MODELS.PLANNING.CONSULTATION: {
                    dossier.consultations.push(consultation_1.Consultation.mapToEntity(item));
                    break;
                }
                case entity_model_type_1.ENTITY_MODELS.PLANNING.DISPATCHED_ITEM: {
                    dossier.dispatchedItems.push(dispatched_item_1.DispatchedItem.mapToEntity(item));
                    break;
                }
                case entity_model_type_1.ENTITY_MODELS.PLANNING.DECISION: {
                    dossier.decisions.push(decision_1.Decision.mapToEntity(item));
                    break;
                }
                case entity_model_type_1.ENTITY_MODELS.GENERAL.MINUTE: {
                    dossier.minutes.push(minute_1.Minute.mapToEntity(item));
                    break;
                }
                case entity_model_type_1.ENTITY_MODELS.PLANNING.REPORT: {
                    dossier.reports.push(report_1.Report.mapToEntity(item));
                    break;
                }
                case entity_model_type_1.ENTITY_MODELS.PLANNING.BUILDING_START: {
                    dossier.buildingStarts.push(building_start_1.BuildingStart.mapToEntity(item));
                    break;
                }
                case entity_model_type_1.ENTITY_MODELS.SYSTEM.TASK: {
                    dossier.tasks.push(task_1.Task.mapToEntity(item));
                    break;
                }
                case entity_model_type_1.ENTITY_MODELS.PLANNING.NOTICE: {
                    dossier.notices.push(notice_1.Notice.mapToEntity(item));
                    break;
                }
                case entity_model_type_1.ENTITY_MODELS.PLANNING.NOTE: {
                    dossier.notes.push(note_1.Note.mapToEntity(item));
                    break;
                }
                case entity_model_type_1.ENTITY_MODELS.PLANNING.LETTER: {
                    dossier.letters.push(letter_1.Letter.mapToEntity(item));
                    break;
                }
                case entity_model_type_1.ENTITY_MODELS.PLANNING.REGISTRY_ITEM: {
                    dossier.registry = registry_item_1.RegistryItem.mapToEntity(item);
                    break;
                }
            }
        });
        if (!!dossier && !!dossier.decisions && dossier.decisions.length > 0) {
            dossier.decisions.forEach(function (d) {
                d.decisionItems.forEach(function (i) {
                    if (i.order === 0)
                        i.order = i.itemNumber;
                });
            });
        }
        if (!!dossier) {
            if (!!dossier.attachments && dossier.attachments.length > 0) {
                dossier.attachments = dossier.attachments.sort(function (a, b) {
                    var x = a.filename.toLowerCase();
                    var y = b.filename.toLowerCase();
                    if (x < y)
                        return -1;
                    if (y < x)
                        return 1;
                    return 0;
                });
            }
            if (!!dossier.consultations && dossier.consultations.length > 0) {
                dossier.consultations = dossier.consultations.sort(function (a, b) {
                    return new Date(a.dateRequested).getTime() - new Date(b.dateRequested).getTime();
                });
            }
            if (!!dossier.dispatchedItems && dossier.dispatchedItems.length > 0) {
                dossier.dispatchedItems = dossier.dispatchedItems.sort(function (a, b) {
                    return new Date(a.dispatchedDate).getTime() - new Date(b.dispatchedDate).getTime();
                });
            }
            if (!!dossier.decisions && dossier.decisions.length > 0) {
                dossier.decisions = dossier.decisions.sort(function (a, b) {
                    return new Date(a.properties.created).getTime() - new Date(b.properties.created).getTime();
                });
            }
            if (!!dossier.reports && dossier.reports.length > 0) {
                dossier.reports = dossier.reports.sort(function (a, b) {
                    return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
                });
            }
            if (!!dossier.buildingStarts && dossier.buildingStarts.length > 0) {
                dossier.buildingStarts = dossier.buildingStarts.sort(function (a, b) {
                    return new Date(a.dateReceived).getTime() - new Date(b.dateReceived).getTime();
                });
            }
            if (!!dossier.certificates && dossier.certificates.length > 0) {
                dossier.certificates = dossier.certificates.sort(function (a, b) {
                    return new Date(a.dateReceived).getTime() - new Date(b.dateReceived).getTime();
                });
            }
            if (!!dossier.tasks && dossier.tasks.length > 0) {
                dossier.tasks = dossier.tasks.sort(function (a, b) {
                    return new Date(a.dateStarted).getTime() - new Date(b.dateStarted).getTime();
                });
            }
            if (!!dossier.notices && dossier.notices.length > 0) {
                dossier.notices = dossier.notices.sort(function (a, b) {
                    return new Date(a.events.created).getTime() - new Date(b.events.created).getTime();
                });
            }
            if (!!dossier.notes && dossier.notes.length > 0) {
                dossier.notes = dossier.notes.sort(function (a, b) {
                    return new Date(a.created).getTime() - new Date(b.created).getTime();
                });
            }
            if (!!dossier.letters && dossier.letters.length > 0) {
                dossier.letters = dossier.letters.sort(function (a, b) {
                    return new Date(a.created).getTime() - new Date(b.created).getTime();
                });
            }
        }
        return dossier;
    };
    return Dossier;
}());
exports.Dossier = Dossier;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spatial_feature_layer_1 = require("./spatial/spatial-feature-layer");
var spatial_tile_layer_1 = require("./spatial/spatial-tile-layer");
var broadcast_user_message_instance_1 = require("./system/broadcast-user-message-instance");
var broadcast_message_1 = require("./system/broadcast-message");
var spatial_map_1 = require("./spatial/spatial-map");
var favourite_1 = require("./general/favourite");
var dispatched_item_1 = require("./planning/dispatched-item");
var entity_model_type_1 = require("./entity-model-type");
var task_1 = require("./planning/task");
var user_1 = require("./security/user");
var workflow_template_1 = require("./system/workflow-template");
var document_template_1 = require("./system/document-template");
var decision_template_1 = require("./system/decision-template");
var application_counter_1 = require("./system/application-counter");
var document_1 = require("./planning/document");
var minute_1 = require("./planning/minute");
var category_1 = require("./general/category");
var resource_1 = require("./security/resource");
var group_1 = require("./security/group");
var user_token_1 = require("./security/user-token");
var report_1 = require("./planning/report");
var notice_1 = require("./planning/notice");
var registry_item_1 = require("./planning/registry-item");
var decision_1 = require("./planning/decision");
var consultation_1 = require("./planning/consultation");
var building_start_1 = require("./planning/building-start");
var attachment_1 = require("./planning/attachment");
var agency_1 = require("./general/agency");
var message_1 = require("./system/message");
var note_1 = require("./planning/note");
var letter_1 = require("./planning/letter");
var job_1 = require("./system/job");
var EntityMap = (function () {
    function EntityMap(map) {
        this.map = map;
    }
    return EntityMap;
}());
exports.EntityMap = EntityMap;
var EntityAutoMapper = (function () {
    function EntityAutoMapper() {
        this.maps = [];
        this.maps[entity_model_type_1.ENTITY_MODELS.PLANNING.AGENCY] = new EntityMap(agency_1.Agency);
        this.maps[entity_model_type_1.ENTITY_MODELS.PLANNING.ATTACHMENT] = new EntityMap(attachment_1.Attachment);
        this.maps[entity_model_type_1.ENTITY_MODELS.PLANNING.BUILDING_START] = new EntityMap(building_start_1.BuildingStart);
        this.maps[entity_model_type_1.ENTITY_MODELS.PLANNING.CONSULTATION] = new EntityMap(consultation_1.Consultation);
        this.maps[entity_model_type_1.ENTITY_MODELS.PLANNING.DECISION] = new EntityMap(decision_1.Decision);
        this.maps[entity_model_type_1.ENTITY_MODELS.PLANNING.DISPATCHED_ITEM] = new EntityMap(dispatched_item_1.DispatchedItem);
        this.maps[entity_model_type_1.ENTITY_MODELS.PLANNING.REGISTRY_ITEM] = new EntityMap(registry_item_1.RegistryItem);
        this.maps[entity_model_type_1.ENTITY_MODELS.PLANNING.NOTICE] = new EntityMap(notice_1.Notice);
        this.maps[entity_model_type_1.ENTITY_MODELS.PLANNING.NOTE] = new EntityMap(note_1.Note);
        this.maps[entity_model_type_1.ENTITY_MODELS.PLANNING.LETTER] = new EntityMap(letter_1.Letter);
        this.maps[entity_model_type_1.ENTITY_MODELS.PLANNING.REPORT] = new EntityMap(report_1.Report);
        this.maps[entity_model_type_1.ENTITY_MODELS.SECURITY.USER_TOKEN] = new EntityMap(user_token_1.UserToken);
        this.maps[entity_model_type_1.ENTITY_MODELS.SECURITY.USER] = new EntityMap(user_1.User);
        this.maps[entity_model_type_1.ENTITY_MODELS.SECURITY.GROUP] = new EntityMap(group_1.Group);
        this.maps[entity_model_type_1.ENTITY_MODELS.SECURITY.RESOURCE] = new EntityMap(resource_1.Resource);
        this.maps[entity_model_type_1.ENTITY_MODELS.GENERAL.CATEGORY] = new EntityMap(category_1.Category);
        this.maps[entity_model_type_1.ENTITY_MODELS.GENERAL.MINUTE] = new EntityMap(minute_1.Minute);
        this.maps[entity_model_type_1.ENTITY_MODELS.SYSTEM.APPLICATION_COUNTER] = new EntityMap(application_counter_1.ApplicationCounter);
        this.maps[entity_model_type_1.ENTITY_MODELS.SYSTEM.DECISION_TEMPLATE] = new EntityMap(decision_template_1.DecisionItemTemplate);
        this.maps[entity_model_type_1.ENTITY_MODELS.SYSTEM.DOCUMENT] = new EntityMap(document_1.Document);
        this.maps[entity_model_type_1.ENTITY_MODELS.SYSTEM.DOCUMENT_TEMPLATE] = new EntityMap(document_template_1.DocumentTemplate);
        this.maps[entity_model_type_1.ENTITY_MODELS.SYSTEM.WORKFLOW_TEMPLATE] = new EntityMap(workflow_template_1.WorkflowTemplate);
        this.maps[entity_model_type_1.ENTITY_MODELS.SYSTEM.TASK] = new EntityMap(task_1.Task);
        this.maps[entity_model_type_1.ENTITY_MODELS.GENERAL.FAVOURITE] = new EntityMap(favourite_1.Favourite);
        this.maps[entity_model_type_1.ENTITY_MODELS.SYSTEM.MESSAGE] = new EntityMap(message_1.Message);
        this.maps[entity_model_type_1.ENTITY_MODELS.SYSTEM.JOB] = new EntityMap(job_1.Job);
        this.maps[entity_model_type_1.ENTITY_MODELS.SYSTEM.BROADCAST_MESSAGE] = new EntityMap(broadcast_message_1.BroadcastMessage);
        this.maps[entity_model_type_1.ENTITY_MODELS.SYSTEM.BROADCAST_USER_MESSAGE_INSTANCE] = new EntityMap(broadcast_user_message_instance_1.BroadcastUserMessageInstance);
        this.maps[entity_model_type_1.ENTITY_MODELS.SPATIAL.SPATIAL_MAP] = new EntityMap(spatial_map_1.SpatialMap);
        this.maps[entity_model_type_1.ENTITY_MODELS.SPATIAL.SPATIAL_TILE_LAYER] = new EntityMap(spatial_tile_layer_1.SpatialTileLayer);
        this.maps[entity_model_type_1.ENTITY_MODELS.SPATIAL.SPATIAL_FEATURE_LAYER] = new EntityMap(spatial_feature_layer_1.SpatialFeatureLayer);
    }
    EntityAutoMapper.prototype.getMap = function (entity) {
        if (!entity || !entity.type)
            return entity;
        return this.maps[entity.type].map.mapToEntity(entity);
    };
    return EntityAutoMapper;
}());
exports.EntityAutoMapper = EntityAutoMapper;

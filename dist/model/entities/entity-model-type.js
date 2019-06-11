"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTITY_MODELS = {
    PLANNING: {
        AGENCY: 'agency',
        ATTACHMENT: 'attachment',
        CERTIFICATE: 'certificate',
        BUILDING_START: 'building_start',
        CONSULTATION: 'consultation',
        DECISION: 'decision',
        REGISTRY_ITEM: 'registry',
        NOTICE: 'notice',
        NOTE: 'note',
        LETTER: 'letter',
        REPORT: 'report',
        SITE_REPORT_DEVELOPMENT: 'development',
        SITE_REPORT_ENFORCEMENT: 'enforcement',
        DISPATCHED_ITEM: 'dispatched'
    },
    REGISTRY_DETAILS: {
        APPLICATIONS: {
            GENERAL: 'details',
            FORMAL: 'details:formal',
            CHATTEL: 'details:chattel',
            PERMITTED: 'details:permitted',
            TREE: 'details:tree',
            TEMPORARY: 'details:temporary',
            CERTIFICATE: 'details:certificate'
        },
        ENFORCEMENT: {
            ENFORCEMENT_FILE: 'details:enforcement'
        }
    },
    SECURITY: {
        USER_TOKEN: 'token',
        USER: 'user',
        GROUP: 'group',
        DOMAIN: 'domain',
        RESOURCE: 'resource'
    },
    GENERAL: {
        CATEGORY: 'category',
        MINUTE: 'minute',
        FAVOURITE: 'favourite'
    },
    SYSTEM: {
        APPLICATION_COUNTER: 'counter',
        DECISION_TEMPLATE: 'decision-template',
        DOCUMENT: 'document',
        DOCUMENT_TEMPLATE: 'document-template',
        CONTENT_TEMPLATE: 'content-template',
        LETTER_TEMPLATE: 'letter-template',
        STATISTICAL_REPORT_TEMPLATE: 'statistical-report-template',
        ATTACHMENT_EVENT: 'attachment-event',
        EVENT: 'event',
        WORKFLOW_TEMPLATE: 'workflow-template',
        TASK: 'task',
        TASK_SHARE: 'task-share',
        MESSAGE: 'message',
        BROADCAST_MESSAGE: 'broadcast',
        BROADCAST_USER_MESSAGE_INSTANCE: 'instance',
        ALERT: 'alert',
        JOB: 'job'
    },
    SPATIAL: {
        SPATIAL_FEATURE_LAYER: 'spatial-feature-layer',
        SPATIAL_TILE_LAYER: 'spatial-tile-layer',
        SPATIAL_MAP: 'spatial-map'
    }
};

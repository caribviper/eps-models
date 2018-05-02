export const ENTITY_MODELS = {
  //Planning Types
  PLANNING: {
    AGENCY: 'agency',
    ATTACHMENT: 'attachment',
    CERTIFICATE: 'certificate',
    BUILDING_START: 'building_start',
    CONSULTATION: 'consultation',
    DECISION: 'decision',
    REGISTRY_ITEM: 'registry',
    NOTICE: 'notice',
    REPORT: 'report',
    //used for searches and not creation of ids
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
  /**Various Security Types */
  SECURITY: {
    //Manges tokens
    USER_TOKEN: 'token',
    USER: 'user',
    GROUP: 'group',
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
    EVENT: 'event',
    WORKFLOW_TEMPLATE: 'workflow-template',
    TASK: 'task',
    MESSAGE: 'message',
    ALERT: 'alert'
  }
}

export const ENTITY_MODELS = {
  //Planning Types
  PLANNING: {
    AGENT: 'agent',
    ATTACHMENT: 'attachment',
    CONSULTATION: 'consultation',
    DECISION: 'decision',
    REPORT: 'report',
    //used for searches and not creation of ids
    SITE_REPORT: 'site',
    SITE_REPORT_DEVELOPMENT: 'site:development',
    SITE_REPORT_ENFORCEMENT: 'site:enforcement',
    REGISTRY_ITEM: 'registry'
  },
  /**Various Security Types */
  SECURITY: {
    //Manges tokens
    USER_TOKEN: 'user-tokens',
    USER: 'user',
    GROUP: 'group'
  },
  GENERAL: {
    CATEGORY: 'category',
    MINUTE: 'minute'
  },
  SYSTEM: {
    DECISION_TEMPLATE: 'decision-template',
    DOCUMENT: 'document',
    EVENT: 'event',
    WORKFLOW_TEMPLATE: 'workflow-template',
    WORKFLOW: 'workflow-action'
  }
}

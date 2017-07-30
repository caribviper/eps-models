export const ENTITY_MODELS = {
  /**Various Entity Types */
  SECURITY: {
    //Manges tokens
    USER_TOKEN: 'user-tokens',
    USER: 'user',
     GROUP: 'group'
  },
  TYPES: {
    CATEGORY: 'category',

  },
  //Stores model information for system objects
  ID_ENTITY: {
    //Manages the users
    USER_LIST: { TYPE: 'system', ID: 'users', FULL_ID: 'system:users' },
    //Manages the groups
    GROUP_LIST: { TYPE: 'system', ID: 'groups', FULL_ID: 'system:groups' },
    //Manages the resources/endpoints
    RESOURCE_LIST: { TYPE: 'system', ID: 'resources', FULL_ID: 'system:resources' },
  }
}

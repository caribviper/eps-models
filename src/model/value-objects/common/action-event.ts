import { UserInfo } from './userinfo';

/**Event actions */
export const EVENT_TYPES = {
  CREATED: 'created',
  DISPATCHED: 'dispatched',
  FINALISED: 'finalised',
  COMPLETED: 'completed'
}

export class ActionEvent {
  /**
   * Creates an event 
   * @param action Action carried out
   * @param date Date action was taken
   * @param user User that executed action
   */
  constructor(public action: string, public date: Date, public user: UserInfo) { }
}

import { DECISION_TYPES } from './../../value-objects/enumerators/decision-types';
import { DecisionItemTemplate } from './../system/decision-template';
import { ENTITY_MODELS } from './../entity-model-type';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Assert } from 'caribviper-common';
import { Entity } from 'caribviper-entity';

/**Sepcifies the possible decision maker */
export const DECISION_AUTHORITY = {
  CTP: { name: 'CTP', value: 0 },
  MINISTER: { name: 'MINISTER', value: 1 }
};

/**Decision Item making up the decision */
export class DecisionItem {
  /**Decision item number */
  order: number = 0;

  /**Number assigned to decision item template within cateogory. */
  itemNumber: number = 0;

  /**Type of decision item category */
  templateType: string;

  /**Description of the decision item. */
  description: string = '';

  /**Rationale explaining the reasoning behind condition. */
  rationale: string;

  constructor(order: number, template: DecisionItemTemplate) {
    this.order = order;
    if (!template)
      throw new Error('Invalid template used to create DecisionItem');
    this.templateType = template.decisionType;
    this.itemNumber = template.itemNo;
    this.description = template.description;
    this.rationale = template.rationale;
  }
}

/**States the particulars of a decision */
export class DecisionProperty {
  /**The decision maker */
  authority: string;

  /**Is the decision an approval */
  approved: boolean = false;

  //has application been withdrawn
  withdrawn: boolean = false;

  /**Date decision was created */
  created: Date;

  /**Username of person that prepared decision */
  preparedBy: UserInfo;

  /**Date decision was signed. */
  signed: Date;

  /**Gets the user who signed the decision. */
  signingUser: UserInfo;

  /**Date decision was dispatached */
  dispatched: Date;

  /**User who dispatached */
  dispatchingUser: UserInfo;

  /**states whether the decision was appealed */
  appealed: Date;

  /**Document id of the decision */
  documentId: string;

  /**Current status of decisions whether it be draft or final. */
  get isFinalised(): boolean { return !!this.signed; }

  constructor(authority: string, approved: boolean, preparedBy: UserInfo) {
    this.authority = authority;
    this.approved = approved;
    this.preparedBy = preparedBy;
    this.created = new Date();
  }

  ensureNotFinalised() {
    if (this.isFinalised)
      throw new Error('Cannot finalised Decision as it has already been finalised');
  }

  dispatch(ctpUser: UserInfo) {
    if(!this.isFinalised)
      throw new Error('Cannot dispatch as deicison is not finalised');
    this.dispatched = new Date();
    this.dispatchingUser = ctpUser;
  }

  sign(ctpUser: UserInfo = undefined) {
    this.ensureNotFinalised();
    this.signed = new Date();
    if (!!ctpUser)
      this.signingUser = ctpUser;
  }

  loggedAppeal(appealDate: Date) {
    if (this.isFinalised)
      this.appealed = appealDate;
  }

  validateProperty() {
    Assert.isTruthy(this.authority, 'Decision Property authority cannot be undefined/empty');
    Assert.isTruthy(this.preparedBy, 'Decision Property preparedBy cannot be undefined/empty');
    Assert.isTruthy(this.created, 'Decision Property created date cannot be undefined/empty');
  }
}

/** Decision */
export class Decision extends Entity {
  /**Registry item id */
  registryId: string;

  /**Properties associated with the decision */
  properties: DecisionProperty = new DecisionProperty('', false, null);

  /**Decision items linked to decision from CTP */
  decisionItems: DecisionItem[] = [];

  /**decision information from minister */
  ministerialContent: string;
  
  /**forces the decision to have a new line for rendering conditions */
  forceNewLineForConditions: boolean = true;
    
  /**forces the decision to have a new line for rendering conditions' reasons */
  forceNewLineForConditionsReasons: boolean = true;

  /**forces the decision to have a new line for rendering clauses */
  forceNewLineForClause: boolean = true;

  /**forces the decision to have a new line for rendering clauses */
  forceNewLineForRefusals = true;

  constructor(registryId: string = '', guid: string = '') {
    super(ENTITY_MODELS.PLANNING.DECISION, Decision.createId(registryId, guid), true);
    this.registryId = registryId;
    this.decisionItems = [];
    this.properties = new DecisionProperty('', false, null);
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Decision cannot be transient');
    Assert.isTruthy(this.registryId, 'Decision registryId cannot be undefined/empty');
    this.properties.validateProperty();
  }

  get approved(): boolean {
    return !!this.properties && this.properties.approved && !this.properties.withdrawn;
  }

  get withdrawn(): boolean {
    return !!this.properties && this.properties.withdrawn;
  }

  get finalised(): boolean {
    return !!this.properties && this.finalised;
  }

  get conditions(): DecisionItem[] {
    let items: DecisionItem[] = [];
    if (!this.decisionItems || this.decisionItems.length < 1)
      return items;
    this.decisionItems.forEach((item: DecisionItem) => {
      if (item.templateType === DECISION_TYPES.STANDARD_CONDITION ||
        item.templateType === DECISION_TYPES.CUSTOM_CONDITION ||
        item.templateType === DECISION_TYPES.STANDARD_CONDITION_TREE ||
        item.templateType === DECISION_TYPES.CUSTOM_CONDITION_TREE) {
        items.push(item);
      }
    });
    items.sort((a: DecisionItem, b: DecisionItem) => {
      if (a.order !== b.order)
        return a.order - b.order;
      return a.itemNumber - b.itemNumber;
    });
    return items;
  }

  get clauses(): DecisionItem[] {
    let items: DecisionItem[] = [];
    if (!this.decisionItems || this.decisionItems.length < 1)
      return items;
    this.decisionItems.forEach((item: DecisionItem) => {
      if (item.templateType === DECISION_TYPES.CLAUSE ||
        item.templateType === DECISION_TYPES.CUSTOM_CLAUSE) {
        items.push(item);
      }
    });
    items.sort((a: DecisionItem, b: DecisionItem) => {
      if (a.order !== b.order)
        return a.order - b.order;
      return a.itemNumber - b.itemNumber;
    });
    return items;
  }

  get refusals(): DecisionItem[] {
    let items: DecisionItem[] = [];
    if (!this.decisionItems || this.decisionItems.length < 1)
      return items;
    this.decisionItems.forEach((item: DecisionItem) => {
      if (item.templateType === DECISION_TYPES.REASON_FOR_REFUSAL ||
        item.templateType === DECISION_TYPES.CUSTOM_REASON_FOR_REFUSAL ||
        item.templateType === DECISION_TYPES.REASON_FOR_REFUSAL_TREE ||
        item.templateType === DECISION_TYPES.CUSTOM_REASON_FOR_REFUSAL_TREE) {
        items.push(item);
      }
    });
    items.sort((a: DecisionItem, b: DecisionItem) => {
      if (a.order !== b.order)
        return a.order - b.order;
      return a.itemNumber - b.itemNumber;
    });
    return items;
  }

  /**
   * Sorts the decision items
   */
  public sortDecisionItems() {
    this.decisionItems.sort((a: DecisionItem, b: DecisionItem) => {
      if (a.order !== b.order)
        return a.order - b.order;
      return a.itemNumber - b.itemNumber;
    });
  }

  public static createNew(registryId: string, guid: string, approved: boolean, preparedBy: UserInfo): Decision {
    let d = new Decision(registryId, guid);
    d.properties = new DecisionProperty(DECISION_AUTHORITY.CTP.name, approved, preparedBy);
    d.decisionItems = [];
    return d;
  }

  public static createId(registryId: string, guid: string = ''): string {
    if (!guid)
      return Entity.generateId(registryId, ENTITY_MODELS.PLANNING.DECISION);
    return Entity.generateId(registryId, ENTITY_MODELS.PLANNING.DECISION, guid);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Decision {
    let decision = Object.assign(new Decision(), source);
    decision.properties = Object.assign(new DecisionProperty('', false, null), decision.properties);
    return decision;
  }

  public static mapToEntityArray(source: Decision[]): Decision[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Decision(), element));
    });
    return array;
  }

}


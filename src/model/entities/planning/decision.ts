import { DecisionItemTemplate } from './../system/decision-template';
import { ENTITY_MODELS } from './../entity-model-type';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Assert } from 'caribviper-common';
import { Entity } from 'caribviper-entities';

/**Sepcifies the possible decision maker */
export const DECISION_AUTHORITY = {
  CTP: { name: 'ctp', value: 0 },
  MINISTER: { name: 'minister', value: 1 }
};

/**Decision Item making up the decision */
export class DecisionItem {
  /**Order of the decision item */
  order: number;
  
  /**Decision item number */
  itemNumber: number;

  /**Type of decision item category */
  templateType: string;

  /**Number assigned to decision item template within cateogory. */
  templateNumber: number;

  /**Description of the decision item. */
  description: string;

  /**Rationale explaining the reasoning behind condition. */
  rationale: string;

  constructor(order: number, itemNo: number, template: DecisionItemTemplate) {
    this.order = order;
    this.itemNumber = itemNo;
    if(!template)
      throw new Error('Invalid template used to create DecisionItem');
    this.templateType = template.decisionType;
    this.templateNumber = template.itemNo;
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

  /**Date decision was created */
  created: Date;

  /**Date decision was signed. */
  signed: Date;

  /**Date decision was dispatached */
  dispatched: Date;

  /**Username of person that prepared decision */
  preparedBy: UserInfo;

  /**Gets the user who signed the decision. */
  signingUser: UserInfo;

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
      throw new Error('Cannot update Decision Property as it has already been finalised');
  }

  dispatch() {
    this.ensureNotFinalised();
    this.dispatched = new Date();
  }

  sign(ctpUser: UserInfo = undefined) {
    this.ensureNotFinalised();
    this.signed = new Date();
    if (!!ctpUser)
      this.signingUser = ctpUser;
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
  properties: DecisionProperty[];

  /**Decision items linked to decision from CTP */
  DecisionItems: DecisionItem[];

  /**decision information from minister */
  ministerialContent: string;

  constructor(registryId: string = '') {
    super(ENTITY_MODELS.PLANNING.DECISION, Decision.createId(registryId), true);
    this.registryId = registryId;
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Decision cannot be transient');
    Assert.isTruthy(this.registryId, 'Decision registryId cannot be undefined/empty');
    Assert.isNonEmptyArray(this.properties, 'Decision properties cannot be undefined/empty and must contain at least one item');
    this.properties.forEach(property => {
      property.validateProperty();
    });
  }

  get approved(): boolean {
    if (!this.properties || this.properties.length < 1)
      return false;
    if (this.properties.length > 1)
      return this.properties[1].approved;
    return this.properties[0].approved;
  }

  public static createId(registryId: string): string {
    return Entity.generateId(ENTITY_MODELS.PLANNING.DECISION, registryId);
  }

}


// /**Specifies decision and the type of item requested */
// export class DecisionItemBuilder {
//   /**Decision created */
//   decision: Decision;

//   /**Decision item type to get decision templates */
//   decisionItemType: number;

//   /**stores already selected decision item no */
//   existingItems: number[];

//   /**Stores the existing decision items template type */
//   existingTemplateTypes: number[];

//   constructor(decision: Decision, itemType: number, existingItems: number[], existingTemplateTypes: number[]) {
//     if (!decision) {
//       throw new Error('Invalid decision');
//     }
//     if (itemType === undefined || itemType === null || itemType < 0) {
//       throw new Error('Invalid item type');
//     }
//     this.decision = decision;
//     this.decisionItemType = itemType;
//     this.existingItems = existingItems;
//     this.existingTemplateTypes = existingTemplateTypes;
//   }
// }

import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entities';


/**Template bases for decision items */
export class DecisionItemTemplate extends Entity {

  /**
   * Creates a new decision item template
   * @param decisionType Type of decision item
   * @param itemNo Number assigned to decision item template within cateogory
   * @param description Description of the decision item
   * @param rationale Rationale explaining the reasoning behind condition/clause/reason
   */
  constructor(public decisionType: string = '', public itemNo: number = undefined, public description: string = '', public rationale: string = '') {
    super(ENTITY_MODELS.SYSTEM.DECISION_TEMPLATE, DecisionItemTemplate.createId(decisionType, itemNo), true);
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'DecisionItemTemplate cannot be transient');
    Assert.isTruthy(this.decisionType, 'DecisionItemTemplate deisionType cannot be undefined/empty');
    Assert.isTruthy(this.itemNo, 'DecisionItemTemplate itemNo cannot be undefined/empty');
    Assert.isTrue(this.itemNo >= 1, 'DecisionItemTemplate itemNo cannot be less than 1');
    Assert.isTruthy(this.description, 'DecisionItemTemplate description cannot be undefined/empty');
  }

  public static createId(decisionType: string = '', itemNo: number = undefined): string {
    if (!decisionType)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.DECISION_TEMPLATE);
    else if (!itemNo || itemNo < 1)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.DECISION_TEMPLATE, decisionType);

    return Entity.generateId(ENTITY_MODELS.SYSTEM.DECISION_TEMPLATE, decisionType, itemNo.toString());
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: DecisionItemTemplate): DecisionItemTemplate {
    return Object.assign(new DecisionItemTemplate(), source);
  }
}

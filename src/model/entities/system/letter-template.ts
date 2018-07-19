import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';

export class LetterTemplateProperty {
  constructor(public hasSubject: boolean = false, public hasContact: boolean = false,
    public hasSalutation: boolean = false, public hasFormFields: boolean = false,
    public hasPhotographs: boolean = false) { }
}

/**Manages letter templates */
export class LetterTemplate extends Entity {

  constructor(public name: string = '', public template: string = '', public properties: LetterTemplateProperty = new LetterTemplateProperty()) {
    super(ENTITY_MODELS.SYSTEM.LETTER_TEMPLATE, LetterTemplate.createId(name), true);
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'LetterTemplate cannot be transient');
    Assert.isTruthy(this.name, 'LetterTemplate templateName cannot be undefined/empty');
  }

  public static createId(name: string = ''): string {
    if (!name)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.LETTER_TEMPLATE);
    return Entity.generateId(ENTITY_MODELS.SYSTEM.LETTER_TEMPLATE, name);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): LetterTemplate {
    let tmp: LetterTemplate =  Object.assign(new LetterTemplate(), source);
    if(!tmp.properties)
      tmp.properties = new LetterTemplateProperty();
    return tmp;
  }

  public static mapToEntityArray(source: LetterTemplate[]): LetterTemplate[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(this.mapToEntity(element));
    });
    return array;
  }

}

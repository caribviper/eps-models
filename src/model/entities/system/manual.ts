import { Entity } from "caribviper-entity";
import { ENTITY_MODELS } from "../../..";
import { Assert } from "caribviper-common";

export class ManualSection {
  constructor(public title: string, public sectionNo: string, public content: string, public sections: ManualSection[] = []) { }
}

export class TableOfContentsItem {
  constructor(public sectionNo: string, public title: string) { }
}

export class Manual extends Entity {

  public sections: ManualSection[];

  public version: string;

  public imagePath: string;

  constructor() {
    super(ENTITY_MODELS.SYSTEM.MANUAL, Manual.createId(), true);
    this.sections = [];
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Manual cannot be transient');
  }

  public tableOfContents(): TableOfContentsItem[] {
    if (!this.sections || this.sections.length === 0)
      return [];
    const table: TableOfContentsItem[] = [];
    this.sections.forEach(section => {
      table.push(new TableOfContentsItem(section.sectionNo, section.title));
      const items: TableOfContentsItem[] = this.flattenSections(section);
      table.push(...items);
    });
  }

  private flattenSections(manualSection: ManualSection): TableOfContentsItem[] {
    const table: TableOfContentsItem[] = [];
    manualSection.sections.forEach(section => {
      table.push(new TableOfContentsItem(section.sectionNo, section.title));
      if (!!section.sections && section.sections.length > 0) {
        section.sections.forEach(subSection => {
          const items: TableOfContentsItem[] = this.flattenSections(subSection);
          table.push(...items);
        });
      }
    });
    return table;
  }



  public static createId(): string {
    return Entity.generateId(ENTITY_MODELS.SYSTEM.MANUAL);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Manual {
    let favourite = Object.assign(new Manual(), source);
    return favourite;
  }

  public static mapToEntityArray(source: Manual[]): Manual[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Manual(), element));
    });
    return array;
  }
}

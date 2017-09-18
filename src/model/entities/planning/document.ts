import { EntityAutoMapper } from './../entity-automapper';
import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entities';
import { UserInfo } from './../../value-objects/common/userinfo';


/**Specific information regarding the construction of the document by templates */
export class DocumentModel {
  constructor(public document: Document, public model: any = undefined) { }
}

export class DocumentModelType {
  constructor(public name: string, public model: any) { }
}

/**
 * Manages document details used in creating documents
 */
export class DocumentDetails {
  constructor(public template: string, public models: DocumentModelType[] = [], public title: string = '') { }

  get model(): any {
    let mapper = new EntityAutoMapper();
    let obj = {};
    this.models.forEach((m: DocumentModelType) => {
      obj[m.name] = mapper.getMap(m.model);
    });
    return obj;
  }
}

/**
 * Allows web services to return url and document data
 */
export class DocumentUrl {
  /**
   * Creates a new document url
   * @param url Url of the document
   * @param title Title associated with the document
   */
  constructor(public url: any, public title: string = '') { }
}

/**Stores information relating to the document property */
export class DocumentProperty {
  /**Stores title of the letter */
  title: string = '';

  /**Subject of document. */
  subject: string = '';

  /**List of keywords or tags. */
  keywords: string = '';

  /**Watermark to be displayed. */
  watermark: string = '';

  imagePath: string = '';

  /**generated document code */
  code: string = '';
}

export class Document extends Entity {

  /**Registry Id */
  registryId: string = '';


  /** Type of document */
  documentType: string = '';

  /**Document code associated with item. */
  documentCode: string;

  /**Document property information. */
  property: DocumentProperty = new DocumentProperty();

  /**Date created. */
  dateCreated: Date = new Date();

  /**Date modified */
  dateModified: Date = new Date();

	/**Date document was dispatched.
	 * Not all documents will be dispatched.
	 * */
  dispatchedDate: Date;

  /**Specifies the user who dispatched */
  dispatchedBy: UserInfo;

  /**Owner of the document. */
  owner: UserInfo;

  /**Date document was finalised */
  finalisedDate: Date;

	/**Stores all information relating to document.
	 * Remarks - Information stored stored as html
	 * */
  data: string = '';

  constructor(registryId: string = '', documentCode: string = '', property: DocumentProperty = new DocumentProperty(), owner: UserInfo = null) {
    super(ENTITY_MODELS.SYSTEM.DOCUMENT, Document.createId(registryId, documentCode), true);
    this.registryId = registryId;
    this.documentCode = documentCode;
    this.property = property;
    this.owner = owner;
    this.dateCreated = new Date();
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Document cannot be transient');
    Assert.isTruthy(this.data, 'Document data cannot be undefined/empty');
    Assert.isTruthy(this.dateCreated, 'Document must have a valid creation date');
    Assert.isTruthy(this.owner, 'Document owner cannot be undefined');
    Assert.isTruthy(this.property, 'Document property cannot be undefined');
  }

  /**Indicates if the document a draft */
  public get isDraft(): boolean {
    return !this.finalisedDate;
  }

  public dispatch(dispatchingUser: UserInfo) {
    if (!this.finalisedDate)
      throw new Error('Document has not been finalised');
    this.dispatchedBy = dispatchingUser;
    this.dispatchedDate = new Date();
    this.update();
  }

  public finalise(requestingUser: UserInfo): boolean {
    if (this.owner.username === requestingUser.username) {
      this.finalisedDate = new Date();
      this.update();
      return true;
    }
    return false;
  }

  public static createId(registryId: string = '', guid: string = ''): string {
    if (!registryId)
      return '';
    if (!guid)
      return Entity.generateId(registryId, ENTITY_MODELS.SYSTEM.DOCUMENT);
    return Entity.generateId(registryId, ENTITY_MODELS.SYSTEM.DOCUMENT, guid);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Document {
    return Object.assign(new Document(), source);
  }

  public static mapToEntityArray(source: Document[]): Document[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Document(), element));
    });
    return array;
  }
}

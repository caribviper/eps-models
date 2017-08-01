import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entities';
import { UserInfo } from './../../value-objects/common/userinfo';


/**Specific information regarding the document details */
export class DocumentDetails {
	model: any = undefined;
	Document: Document = new Document();
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
}

export class Document extends Entity {
	
	/**Registry Id */
	registryId: string = '';

	/** Type of document */
	documentType: string = ''

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

  constructor(registryId: string = '', documentCode: string = '', property: DocumentProperty = null, owner: UserInfo = null) {
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

  public dispatch(dispatchingUser: UserInfo) {
    if(!this.finalisedDate)
      throw new Error('Document has not been finalised');
    this.dispatchedBy = dispatchingUser;
    this.dispatchedDate = new Date();
    this.update();
  }

  public finalise(requestingUser: UserInfo) {
    if(this.owner.username === requestingUser.username) {
      this.finalisedDate = new Date();
      this.update();
    }
  }
  
  public static createId(registryId: string = '', guid: string = '') : string {
    if(!registryId || !guid)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.DOCUMENT);
    return Entity.generateId(ENTITY_MODELS.SYSTEM.DOCUMENT, registryId, guid);
  }
}

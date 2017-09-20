import { ENTITY_MODELS } from './entity-model-type';
import { Task } from './planning/task';
import { User } from './security/user';
import { WorkflowTemplate } from './system/workflow-template';
import { DocumentTemplate } from './system/document-template';
import { DecisionItemTemplate } from './system/decision-template';
import { ApplicationCounter } from './system/application-counter';
import { Document } from './planning/document';
import { Minute } from './planning/minute';
import { Category } from './general/category';
import { Resource } from './security/resource';
import { Group } from './security/group';
import { UserToken } from './security/user-token';
import { Report } from './planning/report';
import { Notice } from './planning/notice';
import { RegistryItem } from './planning/registry-item';
import { Decision } from './planning/decision';
import { Consultation } from './planning/consultation';
import { BuildingStart } from './planning/building-start';
import { Certificate } from './planning/applications/certificate';
import { Attachment } from './planning/attachment';
import { Agency } from './general/agency';
import { IEntityMapBuilder, Entity } from "caribviper-entity";

export class EntityMap<T extends Entity> {
  constructor(public map: IEntityMapBuilder<T>) { }
}

export class EntityAutoMapper {
  private maps = [];
  constructor() {
    this.maps[ENTITY_MODELS.PLANNING.AGENCY] = new EntityMap<Agency>(Agency);
    this.maps[ENTITY_MODELS.PLANNING.ATTACHMENT] = new EntityMap<Attachment>(Attachment);
    this.maps[ENTITY_MODELS.PLANNING.BUILDING_START] = new EntityMap<BuildingStart>(BuildingStart);
    this.maps[ENTITY_MODELS.PLANNING.CONSULTATION] = new EntityMap<Consultation>(Consultation);
    this.maps[ENTITY_MODELS.PLANNING.DECISION] = new EntityMap<Decision>(Decision);
    this.maps[ENTITY_MODELS.PLANNING.REGISTRY_ITEM] = new EntityMap<RegistryItem>(RegistryItem);
    this.maps[ENTITY_MODELS.PLANNING.NOTICE] = new EntityMap<Notice>(Notice);
    this.maps[ENTITY_MODELS.PLANNING.REPORT] = new EntityMap<Report>(Report);
    this.maps[ENTITY_MODELS.SECURITY.USER_TOKEN] = new EntityMap<UserToken>(UserToken);
    this.maps[ENTITY_MODELS.SECURITY.USER] = new EntityMap<User>(User);
    this.maps[ENTITY_MODELS.SECURITY.GROUP] = new EntityMap<Group>(Group);
    this.maps[ENTITY_MODELS.SECURITY.RESOURCE] = new EntityMap<Resource>(Resource);
    this.maps[ENTITY_MODELS.GENERAL.CATEGORY] = new EntityMap<Category>(Category);
    this.maps[ENTITY_MODELS.GENERAL.MINUTE] = new EntityMap<Minute>(Minute);
    this.maps[ENTITY_MODELS.SYSTEM.APPLICATION_COUNTER] = new EntityMap<ApplicationCounter>(ApplicationCounter);
    this.maps[ENTITY_MODELS.SYSTEM.DECISION_TEMPLATE] = new EntityMap<DecisionItemTemplate>(DecisionItemTemplate);
    this.maps[ENTITY_MODELS.SYSTEM.DOCUMENT] = new EntityMap<Document>(Document);
    this.maps[ENTITY_MODELS.SYSTEM.DOCUMENT_TEMPLATE] = new EntityMap<DocumentTemplate>(DocumentTemplate);
    this.maps[ENTITY_MODELS.SYSTEM.WORKFLOW_TEMPLATE] = new EntityMap<WorkflowTemplate>(WorkflowTemplate);
    this.maps[ENTITY_MODELS.SYSTEM.TASK] = new EntityMap<Task>(Task);
  }

  getMap(entity: any): any {
    if(!entity || !entity.type)
      return entity;
    return this.maps[entity.type].map.mapToEntity(entity);    
  }
}

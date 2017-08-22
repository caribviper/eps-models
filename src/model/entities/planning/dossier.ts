import { Entity } from 'caribviper-entities';
import { ENTITY_MODELS } from './../entity-model-type';
import { Task } from './task';
import { Minute } from './minute';
import { Decision } from './decision';
import { Consultation } from './consultation';
import { Attachment } from './attachment';
import { Report } from './report';
import { RegistryItem } from './registry-item';

/**Encompasses all documents related to a file */
export class Dossier {
  
  registry: RegistryItem = new RegistryItem();
  attachments: Attachment[] = [];
  consultations: Consultation[] = [];
  decisions: Decision[] = [];
  minutes: Minute[] = [];
  reports: Report[] = [];
  tasks: Task[] = [];
  
  constructor() {
    this.registry = new RegistryItem();
    this.attachments = [];
    this.consultations = [];
    this.decisions= [];
    this.minutes= [];
    this.reports = [];
    this.tasks = [];
   }

   mapToEntity(dossier: Dossier){
     //mapp dossier items
     let d = Object.assign(new Dossier(), dossier);
   }

   public static createDossier(registry: RegistryItem, items: any[]) {
     let d = new Dossier();
     d.registry = registry;
     items.forEach((item:Entity) => {
       switch(item.type) {
        case ENTITY_MODELS.PLANNING.ATTACHMENT: { d.attachments.push(Attachment.mapToEntity(item)); break; }
        case ENTITY_MODELS.PLANNING.CONSULTATION: { d.consultations.push(Consultation.mapToEntity(item)); break; }
        case ENTITY_MODELS.PLANNING.DECISION: { d.decisions.push(Decision.mapToEntity(item)); break; }
        case ENTITY_MODELS.GENERAL.MINUTE: { d.minutes.push(Minute.mapToEntity(item)); break; }
        case ENTITY_MODELS.PLANNING.REPORT: { d.reports.push(Report.mapToEntity(item)); break; }
        case ENTITY_MODELS.SYSTEM.TASK: { d.tasks.push(Task.mapToEntity(item)); break; }
       }
     });
   }
}

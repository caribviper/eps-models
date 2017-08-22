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
    this.decisions = [];
    this.minutes = [];
    this.reports = [];
    this.tasks = [];
  }

  mapToEntity(dossier: Dossier): Dossier {
    //mapp dossier items
    let d = Object.assign(new Dossier(), dossier);
    d.registry = RegistryItem.mapToEntity(d.registry);
    d.attachments = Attachment.mapToEntityArray(d.attachments);
    d.consultations = Consultation.mapToEntityArray(d.consultations);
    d.decisions = Decision.mapToEntityArray(d.decisions);
    d.minutes = Minute.mapToEntityArray(d.minutes);
    d.reports = Report.mapToEntityArray(d.reports);
    d.tasks = Task.mapToEntityArray(d.tasks);
    return d;
  }

  public static createDossier(registry: RegistryItem, items: any[]): Dossier {
    let dossier = new Dossier();
    dossier.registry = registry;
    items.forEach((item: Entity) => {
      switch (item.type) {
        case ENTITY_MODELS.PLANNING.ATTACHMENT: { dossier.attachments.push(Attachment.mapToEntity(item)); break; }
        case ENTITY_MODELS.PLANNING.CONSULTATION: { dossier.consultations.push(Consultation.mapToEntity(item)); break; }
        case ENTITY_MODELS.PLANNING.DECISION: { dossier.decisions.push(Decision.mapToEntity(item)); break; }
        case ENTITY_MODELS.GENERAL.MINUTE: { dossier.minutes.push(Minute.mapToEntity(item)); break; }
        case ENTITY_MODELS.PLANNING.REPORT: { dossier.reports.push(Report.mapToEntity(item)); break; }
        case ENTITY_MODELS.SYSTEM.TASK: { dossier.tasks.push(Task.mapToEntity(item)); break; }
      }
    });
    return dossier;
  }
}

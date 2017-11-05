import { Certificate } from './applications/certificate';
import { BuildingStart } from './building-start';
import { DispatchedItem } from './dispatched-item';
import { Entity } from 'caribviper-entity';
import { ENTITY_MODELS } from './../entity-model-type';
import { Task } from './task';
import { Minute } from './minute';
import { Decision } from './decision';
import { Consultation } from './consultation';
import { Attachment } from './attachment';
import { Report } from './report';
import { RegistryItem } from './registry-item';
import * as moment from 'moment';

/**Encompasses all documents related to a file */
export class Dossier {

  registry: RegistryItem = new RegistryItem();
  attachments: Attachment[] = [];
  consultations: Consultation[] = [];
  decisions: Decision[] = [];
  minutes: Minute[] = [];
  reports: Report[] = [];
  tasks: Task[] = [];
  dispatchedItems: DispatchedItem[] = [];
  buildingStarts: BuildingStart[] = [];
  certificates: RegistryItem[] = [];

  constructor() {
    this.registry = new RegistryItem();
    this.attachments = [];
    this.consultations = [];
    this.decisions = [];
    this.minutes = [];
    this.reports = [];
    this.tasks = [];
    this.dispatchedItems = [];
    this.buildingStarts = [];
    this.certificates = [];
  }

  public static mapToEntity(dossier: Dossier): Dossier {
    //mapp dossier items
    let d = Object.assign(new Dossier(), dossier);
    d.registry = RegistryItem.mapToEntity(d.registry);
    d.attachments = Attachment.mapToEntityArray(d.attachments);
    d.consultations = Consultation.mapToEntityArray(d.consultations);
    d.decisions = Decision.mapToEntityArray(d.decisions);
    d.minutes = Minute.mapToEntityArray(d.minutes);
    d.reports = Report.mapToEntityArray(d.reports);
    d.tasks = Task.mapToEntityArray(d.tasks);
    d.dispatchedItems = DispatchedItem.mapToEntityArray(d.dispatchedItems);
    d.buildingStarts = BuildingStart.mapToEntityArray(d.buildingStarts);
    if(!!d.certificates) {
      d.certificates = RegistryItem.mapToEntityArray(d.certificates);
    }
    return d;
  }

  public static createDossier(items: any[], registryCertificates: RegistryItem[] = []): Dossier {
    let dossier = new Dossier();
    if (!items || items.length < 1)
      return null;
    if(!!registryCertificates && registryCertificates.length > 0)
      dossier.certificates= RegistryItem.mapToEntityArray(registryCertificates);
      
    items.forEach((item: Entity) => {
      switch (item.type) {
        case ENTITY_MODELS.PLANNING.ATTACHMENT: { dossier.attachments.push(Attachment.mapToEntity(item)); break; }
        case ENTITY_MODELS.PLANNING.CONSULTATION: { dossier.consultations.push(Consultation.mapToEntity(item)); break; }
        case ENTITY_MODELS.PLANNING.DISPATCHED_ITEM: { dossier.dispatchedItems.push(DispatchedItem.mapToEntity(item)); break; }
        case ENTITY_MODELS.PLANNING.DECISION: { dossier.decisions.push(Decision.mapToEntity(item)); break; }
        case ENTITY_MODELS.GENERAL.MINUTE: { dossier.minutes.push(Minute.mapToEntity(item)); break; }
        case ENTITY_MODELS.PLANNING.REPORT: { dossier.reports.push(Report.mapToEntity(item)); break; }
        case ENTITY_MODELS.PLANNING.BUILDING_START: { dossier.buildingStarts.push(BuildingStart.mapToEntity(item)); break; }
        case ENTITY_MODELS.SYSTEM.TASK: { dossier.tasks.push(Task.mapToEntity(item)); break; }
        case ENTITY_MODELS.PLANNING.REGISTRY_ITEM: { dossier.registry = RegistryItem.mapToEntity(item); break; }
      }
    });

    //implement sorting
    if (!!dossier && !!dossier.tasks && dossier.tasks.length > 0) {
      //do sort
      dossier.tasks.sort((a: Task, b: Task) => {
        let x = moment(new Date(a.dateStarted));
        let y = moment(new Date(b.dateStarted));
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      });
    }
    return dossier;
  }
}

import { Certificate } from './applications/certificate';
import { BuildingStart } from './building-start';
import { DispatchedItem } from './dispatched-item';
import { Entity } from 'caribviper-entity';
import { ENTITY_MODELS } from './../entity-model-type';
import { Task } from './task';
import { Minute } from './minute';
import { Decision, DecisionItem } from './decision';
import { Consultation } from './consultation';
import { Attachment } from './attachment';
import { Report } from './report';
import { RegistryItem } from './registry-item';
import * as moment from 'moment';
import { Notice } from './notice';
import { Note } from './note';
import { Letter } from './letter';

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
  notices: Notice[] = [];
  notes: Note[] = [];
  letters: Letter[] = [];

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
    this.notices = [];
    this.notes = [];
    this.letters = [];
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
    d.notices = Notice.mapToEntityArray(d.notices);
    d.notes = Note.mapToEntityArray(d.notes);
    d.letters = Letter.mapToEntityArray(d.letters);
    if (!!d.certificates) {
      d.certificates = RegistryItem.mapToEntityArray(d.certificates);
    }
    return d;
  }

  public static createDossier(items: any[], registryCertificates: RegistryItem[] = []): Dossier {
    let dossier = new Dossier();
    if (!items || items.length < 1)
      return null;
    if (!!registryCertificates && registryCertificates.length > 0)
      dossier.certificates = RegistryItem.mapToEntityArray(registryCertificates);

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
        case ENTITY_MODELS.PLANNING.NOTICE: { dossier.notices.push(Notice.mapToEntity(item)); break; }
        case ENTITY_MODELS.PLANNING.NOTE: { dossier.notes.push(Note.mapToEntity(item)); break; }
        case ENTITY_MODELS.PLANNING.LETTER: { dossier.letters.push(Letter.mapToEntity(item)); break; }
        case ENTITY_MODELS.PLANNING.REGISTRY_ITEM: { dossier.registry = RegistryItem.mapToEntity(item); break; }
      }
    });

    //fix for decisions item number being 0
    if (!!dossier && !!dossier.decisions && dossier.decisions.length > 0) {
      dossier.decisions.forEach((d: Decision) => {
        d.decisionItems.forEach((i: DecisionItem) => {
          if (i.order === 0)
            i.order = i.itemNumber;
        });
      });
    }

    //implement sorting

    //sort
    if (!!dossier) {
      //attachments
      if (!!dossier.attachments && dossier.attachments.length > 0) {
        dossier.attachments = dossier.attachments.sort((a: Attachment, b: Attachment) => {
          let x = a.filename.toLowerCase();
          let y = b.filename.toLowerCase();
          if (x < y) return -1;
          if (y < x) return 1;
          return 0;
        });
      }

      //consultations
      if (!!dossier.consultations && dossier.consultations.length > 0) {
        dossier.consultations = dossier.consultations.sort((a: Consultation, b: Consultation) => {
          return new Date(a.dateRequested).getTime() - new Date(b.dateRequested).getTime();
        });
      }

      //dipatched items
      if (!!dossier.dispatchedItems && dossier.dispatchedItems.length > 0) {
        dossier.dispatchedItems = dossier.dispatchedItems.sort((a: DispatchedItem, b: DispatchedItem) => {
          return new Date(a.dispatchedDate).getTime() - new Date(b.dispatchedDate).getTime();
        });
      }

      //decisions
      if (!!dossier.decisions && dossier.decisions.length > 0) {
        dossier.decisions = dossier.decisions.sort((a: Decision, b: Decision) => {
          return new Date(a.properties.created).getTime() - new Date(b.properties.created).getTime();
        });
      }

      //reports
      if (!!dossier.reports && dossier.reports.length > 0) {
        dossier.reports = dossier.reports.sort((a: Report, b: Report) => {
          return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
        });
      }

      //building starts
      if (!!dossier.buildingStarts && dossier.buildingStarts.length > 0) {
        dossier.buildingStarts = dossier.buildingStarts.sort((a: BuildingStart, b: BuildingStart) => {
          return new Date(a.dateReceived).getTime() - new Date(b.dateReceived).getTime();
        });
      }

      //certificates
      if (!!dossier.certificates && dossier.certificates.length > 0) {
        dossier.certificates = dossier.certificates.sort((a: RegistryItem, b: RegistryItem) => {
          return new Date(a.dateReceived).getTime() - new Date(b.dateReceived).getTime();
        });
      }

      //tasks
      if (!!dossier.tasks && dossier.tasks.length > 0) {
        dossier.tasks = dossier.tasks.sort((a: Task, b: Task) => {
          return new Date(a.dateStarted).getTime() - new Date(b.dateStarted).getTime();
        });
      }

      //notices
      if (!!dossier.notices && dossier.notices.length > 0) {
        dossier.notices = dossier.notices.sort((a: Notice, b: Notice) => {
          return new Date(a.events.created).getTime() - new Date(b.events.created).getTime();
        });
      }

      //notes
      if (!!dossier.notes && dossier.notes.length > 0) {
        dossier.notes = dossier.notes.sort((a: Note, b: Note) => {
          return new Date(a.created).getTime() - new Date(b.created).getTime();
        });
      }

      //letters
      if (!!dossier.letters && dossier.letters.length > 0) {
        dossier.letters = dossier.letters.sort((a: Letter, b: Letter) => {
          return new Date(a.created).getTime() - new Date(b.created).getTime();
        });
      }
    }
    return dossier;
  }
}

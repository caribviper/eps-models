import { DecisionItemTemplate } from './../../entities/system/decision-template';
import { WorkflowTemplate } from './../../entities/system/workflow-template';
import { DocumentTemplate } from './../../entities/system/document-template';
import { Agency } from './../../entities/general/agency';
import { Category } from './../../entities/general/category';

/**
 * Stores the backuped items
 */
export class BackupContainer {
  constructor(public categories: Category[] = [], 
    public agencies: Agency[] = [], 
    public documentTemplates: DocumentTemplate[] = [], 
    public workflowTemplates: WorkflowTemplate[] = [],
    public decisionItemTemplates: DecisionItemTemplate[] = []) 
    { }
}

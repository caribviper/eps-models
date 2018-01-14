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
    public decisionItemTemplates: DecisionItemTemplate[] = [], 
    public indicies: any[] = []) 
    { }

    /**Get backup agency count */
    public get agenciesCount(): number {
      return this.agencies ? this.agencies.length : 0;
    }

    /**Get backup category count */
    public get categoriesCount(): number {
      return this.categories ? this.categories.length : 0;
    }

    /**Get backup document count */
    public get documentsCount(): number {
      return this.documentTemplates ? this.documentTemplates.length : 0;
    }

    /**Get backup decision count */
    public get decisionsCount(): number {
      return this.decisionItemTemplates ? this.decisionItemTemplates.length : 0;
    }

    /**Get backup workflow count */
    public get workflowsCount(): number {
      return this.workflowTemplates ? this.workflowTemplates.length : 0;
    }

    /**Get backup indicies count */
    public get indiciesCount() : number {
      return this.indicies ? this.indicies.length : 0;
    }
}

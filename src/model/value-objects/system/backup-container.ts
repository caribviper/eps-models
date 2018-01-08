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

    /**Get backup agency count */
    get agenciesCount(): number {
      return this.agencies ? this.agencies.length : 0;
    }

    /**Get backup category count */
    get categoriesCount(): number {
      return this.categories ? this.categories.length : 0;
    }

    /**Get backup document count */
    get documentCount(): number {
      return this.documentTemplates ? this.documentTemplates.length : 0;
    }

    /**Get backup decision count */
    get decisionCount(): number {
      return this.decisionItemTemplates ? this.decisionItemTemplates.length : 0;
    }

    /**Get backup workflow count */
    get workflowTemplateCount(): number {
      return this.workflowTemplates ? this.workflowTemplates.length : 0;
    }
}

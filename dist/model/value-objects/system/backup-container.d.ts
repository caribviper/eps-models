import { DecisionItemTemplate } from './../../entities/system/decision-template';
import { WorkflowTemplate } from './../../entities/system/workflow-template';
import { DocumentTemplate } from './../../entities/system/document-template';
import { Agency } from './../../entities/general/agency';
import { Category } from './../../entities/general/category';
export declare class BackupContainer {
    categories: Category[];
    agencies: Agency[];
    documentTemplates: DocumentTemplate[];
    workflowTemplates: WorkflowTemplate[];
    decisionItemTemplates: DecisionItemTemplate[];
    indicies: any[];
    constructor(categories?: Category[], agencies?: Agency[], documentTemplates?: DocumentTemplate[], workflowTemplates?: WorkflowTemplate[], decisionItemTemplates?: DecisionItemTemplate[], indicies?: any[]);
    readonly agenciesCount: number;
    readonly categoriesCount: number;
    readonly documentsCount: number;
    readonly decisionsCount: number;
    readonly workflowsCount: number;
    readonly indiciesCount: number;
}

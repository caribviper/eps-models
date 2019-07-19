import { Entity } from "caribviper-entity";
export declare class ManualSection {
    title: string;
    sectionNo: string;
    content: string;
    sections: ManualSection[];
    constructor(title: string, sectionNo: string, content: string, sections?: ManualSection[]);
}
export declare class TableOfContentsItem {
    sectionNo: string;
    title: string;
    constructor(sectionNo: string, title: string);
}
export declare class Manual extends Entity {
    sections: ManualSection[];
    version: string;
    imagePath: string;
    constructor();
    validateEntity(): void;
    tableOfContents(): TableOfContentsItem[];
    private flattenSections;
    static createId(): string;
    static mapToEntity(source: any): Manual;
    static mapToEntityArray(source: Manual[]): Manual[];
}

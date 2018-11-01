import { Entity } from 'caribviper-entity';
export declare class CodeScriptItem {
    name: string;
    description: string;
    code: string;
    constructor(name: string, description: string, code: string);
}
export declare class CodeScripts extends Entity {
    scripts: CodeScriptItem[];
    constructor();
    validateEntity(): void;
    sortScripts(): void;
    addScript(script: CodeScriptItem): boolean;
    removeScript(name: string): void;
    clearScripts(): void;
    static createId(): string;
    static mapToEntity(source: any): CodeScripts;
    static mapToEntityArray(source: CodeScripts[]): CodeScripts[];
}

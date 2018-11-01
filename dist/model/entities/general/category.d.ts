import { Entity } from 'caribviper-entity';
export declare class CategoryNameValue {
    name: string;
    value: any;
    constructor(name: string, value?: any);
}
export declare class Category extends Entity {
    name: string;
    values: CategoryNameValue[];
    constructor(name?: string, values?: CategoryNameValue[]);
    validateEntity(): void;
    static createId(name: string): string;
    static mapToEntity(source: any): Category;
    static mapToEntityArray(source: Category[]): Category[];
}

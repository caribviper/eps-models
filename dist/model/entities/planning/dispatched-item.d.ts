import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
export declare class DispatchedItemContainer {
    dispatchedItem: DispatchedItem;
    reference: Entity;
    constructor(dispatchedItem: DispatchedItem, reference: Entity);
}
export declare class DispatchedItem extends Entity {
    registryId: string;
    dispatchedDate: Date;
    referencedId: string;
    user: UserInfo;
    itemType: string;
    description: string;
    constructor(registryId?: string, dispatchedDate?: Date, referencedId?: string, user?: UserInfo, itemType?: string, description?: string);
    validateEntity(): void;
    static createId(registryId: string, username?: string, dispatchedDate?: Date): string;
    static mapToEntity(source: any): DispatchedItem;
    static mapToEntityArray(source: DispatchedItem[]): DispatchedItem[];
}

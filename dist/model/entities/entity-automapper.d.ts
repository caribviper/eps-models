import { IEntityMapBuilder, Entity } from "caribviper-entity";
export declare class EntityMap<T extends Entity> {
    map: IEntityMapBuilder<T>;
    constructor(map: IEntityMapBuilder<T>);
}
export declare class EntityAutoMapper {
    private maps;
    constructor();
    getMap(entity: any): any;
}

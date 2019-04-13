import { Projection } from './../common/projection';
import { RegistryItem } from './../../entities/planning/registry-item';
export declare class GeoRegistryProperty extends Projection {
    referenceNo: string;
    registryId: string;
    fileType: string;
    landTax: string;
    parcel: string;
    area: string;
    landUse: string;
    formalType: string;
    siteArea: number;
    static createFromRegistry(registry: RegistryItem): void;
}

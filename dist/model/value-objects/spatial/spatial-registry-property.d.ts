import { Projection } from './../common/projection';
import { RegistryItem } from './../../entities/planning/registry-item';
export declare class GeoSpatialRegistryProperty extends Projection {
    referenceNo: string;
    registryId: string;
    fileType: string;
    landTax: string;
    parcel: string;
    area: string;
    landUse: string;
    formalType: string;
    siteArea: number;
    status: string;
    static createFromRegistry(registry: RegistryItem): GeoSpatialRegistryProperty;
    private static getStatus(registry);
}

export interface IRegistryDetails {
}
export declare abstract class RegistryDetails {
    registryId: string;
    static idHelper(registryId: string, detailsType: string): string;
}

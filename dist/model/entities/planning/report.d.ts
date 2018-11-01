import { UserInfo } from './../../value-objects/common/userinfo';
import { BaseReport } from "./report-base";
export declare class Report extends BaseReport {
    constructor(registryId?: string, user?: UserInfo, description?: string);
    static createId(registryId: string, username?: string): string;
    static mapToEntity(source: any): Report;
    static mapToEntityArray(source: Report[]): Report[];
}

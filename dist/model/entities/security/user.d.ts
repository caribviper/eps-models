import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
export declare class User extends Entity {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    disabled: boolean;
    lastLoggedOn: Date;
    groups: string[];
    supervisorGroups: string[];
    securityLevel: number;
    constructor(username?: string, firstname?: string, lastname?: string, email?: string);
    readonly fullname: string;
    validateEntity(): void;
    addGroup(...groupNames: string[]): void;
    removeGroup(groupName: string): void;
    addSupervisorGroup(...groupNames: string[]): void;
    removeSupervisorGroup(groupName: string): void;
    static createId(username: string): string;
    static mapToEntity(source: any): User;
    static mapToEntityArray(source: User[]): User[];
    static toUserInfo(user: User): UserInfo;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOCKETS = {
    SYSTEM: {
        NAMESPACE: 'system',
        ALERT: 'system.alert',
        ERROR: 'system.error',
        ERROR_SERVER: 'system.error.server',
        ERROR_CLIENT: 'sysem.error.client',
        NOTIFICATION: 'system.notification'
    },
    ADMIN: {
        NAMESPACE: 'admin',
        INVALID_LOGON: 'admin.invalid.logon',
        REQUEST: 'admin.notification.request'
    },
    COMMUNICATION: {
        NAMESPACE: 'communication',
        MESSAGE: 'communication.message',
        ALERT: 'communication.alert',
        NOTICE: 'communication.notice'
    },
    RESERVED: {
        ERROR: 'error',
        CONNECT: 'connect',
        CONNECTION: 'connection',
        DISCONNECT: 'disconnect',
        DISCONNECTING: 'disconnecting',
        NEW_LISTENER: 'newListener',
        REMOVE_LISTENER: 'removeListener',
        PING: 'ping',
        PONG: 'pong'
    }
};

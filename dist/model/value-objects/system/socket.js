"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOCKETS = {
    SYSTEM: {
        NAMESPACE: 'system',
        USER_CONNECTED: 'system.user.connected',
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
        MESSAGE_UNREAD_COUNT: 'communication.message.unread.count',
        ALERT: 'communication.alert',
        ALERT_DISMISS: 'communication.alert.dismiss',
        ALERT_ACTIVE_COUNT: 'communication.alert.active.count',
        NOTICE: 'communication.notice',
        NOTICE_UNREAD_COUNT: 'communication.notice.unread.count',
        USER_CONNECTED: 'communication.user.connected',
        USER_DISCONNECTED: 'communication.user.disconnected',
        VERSION_CHECK: 'communication.version.check',
        VERSION_RESPONSE: 'communication.version.response',
        VERSION_UPDATE: 'communication.version.update'
    },
    RESERVED: {
        ERROR: 'error',
        CONNECT_ERROR: 'connect_error',
        CONNECT_TIMEOUT: 'connect_timeout',
        CONNECTING: 'connecting',
        CONNECT: 'connect',
        CONNECTION: 'connection',
        DISCONNECT: 'disconnect',
        DISCONNECTING: 'disconnecting',
        RECONNECT: 'reconnect',
        RECONNECT_ATTEMPT: 'reconnect_attempt',
        RECONNECT_FAILED: 'reconnect_failed',
        RECONNECT_ERROR: 'reconnect_error',
        RECONNECTING: 'reconnecting',
        NEW_LISTENER: 'newListener',
        REMOVE_LISTENER: 'removeListener',
        PING: 'ping',
        PONG: 'pong'
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var caribviper_common_1 = require("caribviper-common");
var EventRecord = (function () {
    function EventRecord(user) {
        this.creator = user;
        this.created = new Date();
    }
    Object.defineProperty(EventRecord.prototype, "canDispatch", {
        get: function () { return !!this.created && !!this.signed; },
        enumerable: true,
        configurable: true
    });
    EventRecord.prototype.sign = function (user) {
        this.signed = new Date();
        caribviper_common_1.Assert.isTruthy(user, 'Signer cannot be undefined');
        this.signer = user;
        if (!this.created)
            this.created = this.signed;
    };
    EventRecord.prototype.dispatch = function (user) {
        this.dispatched = new Date();
        caribviper_common_1.Assert.isTruthy(user, 'Dispatcher cannot be undefined');
        this.dispatcher = user;
        if (!this.canDispatch)
            this.signed = this.dispatched;
    };
    return EventRecord;
}());
exports.EventRecord = EventRecord;

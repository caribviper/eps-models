"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENT_TYPES = {
    CREATED: 'created',
    DISPATCHED: 'dispatched',
    FINALISED: 'finalised',
    COMPLETED: 'completed'
};
var ActionEvent = (function () {
    function ActionEvent(action, date, user) {
        this.action = action;
        this.date = date;
        this.user = user;
    }
    return ActionEvent;
}());
exports.ActionEvent = ActionEvent;

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var caribviper_common_1 = require("caribviper-common");
var entity_model_type_1 = require("./../entity-model-type");
var caribviper_entity_1 = require("caribviper-entity");
var moment = require("moment");
var Task = (function (_super) {
    __extends(Task, _super);
    function Task(registryId, guid, referenceNo, sender, dateStarted, groupAssigned) {
        if (registryId === void 0) { registryId = ''; }
        if (guid === void 0) { guid = ''; }
        if (referenceNo === void 0) { referenceNo = ''; }
        if (sender === void 0) { sender = null; }
        if (dateStarted === void 0) { dateStarted = null; }
        if (groupAssigned === void 0) { groupAssigned = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SYSTEM.TASK, Task.createId(registryId, guid), true) || this;
        _this.groupAssiged = '';
        _this.version = '';
        _this.addReminderToSender = false;
        _this.dateStarted = dateStarted;
        _this.sender = sender;
        _this.status = '';
        _this.groupAssiged = groupAssigned;
        _this.referenceNo = referenceNo;
        _this.addReminderToSender = false;
        return _this;
    }
    Task.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Must not be transient');
        caribviper_common_1.Assert.isTruthy(this.recipient, 'Must have a valid owner/receiver');
        caribviper_common_1.Assert.isTruthy(this.sender, 'Must have a valid creator');
        caribviper_common_1.Assert.isTruthy(this.registryId, 'Must have a valid registry id');
        caribviper_common_1.Assert.isTruthy(this.activity, 'Must have a valid activity');
        caribviper_common_1.Assert.isTruthy(this.dateStarted, 'Must have a valid date of event');
        caribviper_common_1.Assert.isTruthy(this.templateId, 'Must have a valid template id');
        caribviper_common_1.Assert.isTruthy(this.referenceNo, 'Must have a valid reference number');
    };
    Task.createTask = function (registryId, guid, referenceNo, sender, receiver, activity, templateId, groupAssigned) {
        if (activity === void 0) { activity = null; }
        if (templateId === void 0) { templateId = ''; }
        if (groupAssigned === void 0) { groupAssigned = ''; }
        var datecreated = new Date();
        var e = new Task(registryId, guid, referenceNo, sender, datecreated);
        e.recipient = receiver;
        e.activity = activity;
        e.groupAssiged = groupAssigned;
        return e;
    };
    Task.createId = function (registryId, guid) {
        if (registryId === void 0) { registryId = ''; }
        if (guid === void 0) { guid = ''; }
        if (!registryId)
            return '';
        if (!guid)
            return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.SYSTEM.TASK);
        return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.SYSTEM.TASK, guid);
    };
    Task.mapToEntity = function (source) {
        return Object.assign(new Task(), source);
    };
    Task.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Task(), element));
        });
        return array;
    };
    return Task;
}(caribviper_entity_1.Entity));
exports.Task = Task;
var OverdueTask = (function () {
    function OverdueTask(task) {
        this.task = task;
        caribviper_common_1.Assert.isTrue(OverdueTask.isTaskOverdue(task), 'Task has already been completed and get not be assigned to overdue tasks');
        this.daysOverDue = moment(new Date(task.dateStarted)).diff(moment(), 'days');
        this.highestSupervisorNotification = parseInt((this.daysOverDue / task.activity.estimatedDays).toFixed(2));
    }
    OverdueTask.createOverdueTasks = function (tasks) {
        var _this = this;
        return tasks.map(function (t) {
            if (_this.isTaskOverdue(t))
                return new OverdueTask(t);
        });
    };
    OverdueTask.isTaskOverdue = function (task) {
        return !task.dateCompleted && moment(new Date(task.dateStarted)).add(task.activity.estimatedDays, 'days') < moment();
    };
    return OverdueTask;
}());
exports.OverdueTask = OverdueTask;
var TaskReportRequest = (function () {
    function TaskReportRequest(username, start, end) {
        this.username = username;
        this.start = start;
        this.end = end;
    }
    return TaskReportRequest;
}());
exports.TaskReportRequest = TaskReportRequest;
var GroupTasksBox = (function () {
    function GroupTasksBox(membersTasksBoxes) {
        if (membersTasksBoxes === void 0) { membersTasksBoxes = []; }
        this.membersTasksBoxes = membersTasksBoxes;
    }
    GroupTasksBox.prototype.addMemberBox = function (username, box) {
        this.membersTasksBoxes.push(box);
    };
    GroupTasksBox.clone = function (box) {
        var newBox = new GroupTasksBox(box.membersTasksBoxes);
        for (var i = 0; i < newBox.membersTasksBoxes.length; i++) {
            newBox.membersTasksBoxes[i] = UserTasksBox.clone(newBox.membersTasksBoxes[i]);
        }
        return newBox;
    };
    return GroupTasksBox;
}());
exports.GroupTasksBox = GroupTasksBox;
var UserTasksBox = (function () {
    function UserTasksBox(username, todo, inbox, outbox) {
        if (todo === void 0) { todo = []; }
        if (inbox === void 0) { inbox = []; }
        if (outbox === void 0) { outbox = []; }
        this.username = username;
        this.todo = todo;
        this.inbox = inbox;
        this.outbox = outbox;
        this._unassignedTasks = [];
        this._allUndoneTasks = [];
        this._inboxUndoneTasks = [];
        this._forceUpdate = false;
        this.forceUpdate = true;
    }
    UserTasksBox.prototype.sortAll = function () {
        this.sortTodo();
        this.sortInbox();
        this.sortOutbox();
    };
    UserTasksBox.prototype.sortTodo = function () {
        this.todo = this.sortTasks(this.todo);
    };
    UserTasksBox.prototype.sortInbox = function () {
        this.inbox = this.sortTasks(this.inbox);
    };
    UserTasksBox.prototype.sortOutbox = function () {
        this.outbox = this.sortTasks(this.outbox);
    };
    UserTasksBox.prototype.sortTasks = function (tasks) {
        if (!tasks || tasks.length == 0)
            return [];
        tasks.sort(function (a, b) {
            var x = moment(new Date(a.dateStarted));
            var y = moment(new Date(b.dateStarted));
            if (x < y)
                return -1;
            if (y < x)
                return 1;
            return 0;
        });
        return tasks;
    };
    UserTasksBox.clone = function (box) {
        var newBox = new UserTasksBox(box.username, Task.mapToEntityArray(box.todo || []), Task.mapToEntityArray(box.inbox || []), Task.mapToEntityArray(box.outbox || []));
        return newBox;
    };
    Object.defineProperty(UserTasksBox.prototype, "nonAssignedTasks", {
        get: function () { return this._unassignedTasks; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserTasksBox.prototype, "allUndoneTasks", {
        get: function () { return this._allUndoneTasks; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserTasksBox.prototype, "inboxUndoneTasks", {
        get: function () { return this._inboxUndoneTasks; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserTasksBox.prototype, "forceUpdate", {
        get: function () { return this._forceUpdate; },
        set: function (value) {
            this._forceUpdate = value;
            if (value === true) {
                this.update();
            }
        },
        enumerable: true,
        configurable: true
    });
    UserTasksBox.prototype.update = function () {
        var _this = this;
        this._unassignedTasks = Task.mapToEntityArray(this.outbox);
        var _loop_1 = function (x) {
            if (this_1.inbox.find(function (i) { return i.referenceNo === _this._unassignedTasks[x].referenceNo; }))
                this_1._unassignedTasks.splice(x, 1);
        };
        var this_1 = this;
        for (var x = this._unassignedTasks.length - 1; x > -1; x--) {
            _loop_1(x);
        }
        this._allUndoneTasks = [];
        this._allUndoneTasks = (_a = this._allUndoneTasks).concat.apply(_a, this.inbox);
        var _loop_2 = function (i) {
            if (this_2.outbox.find(function (o) { return o.referenceNo === _this._allUndoneTasks[i].referenceNo; }))
                this_2._allUndoneTasks.splice(i, 1);
        };
        var this_2 = this;
        for (var i = this._allUndoneTasks.length - 1; i > -1; i--) {
            _loop_2(i);
        }
        this._inboxUndoneTasks = this._allUndoneTasks;
        this._allUndoneTasks = this.sortTasks(this._allUndoneTasks);
        var _a;
    };
    return UserTasksBox;
}());
exports.UserTasksBox = UserTasksBox;
var UserStatistics = (function () {
    function UserStatistics(box) {
        this.box = box;
        this._unassignedFiles = [];
        if (!this.box || !this.box.username)
            throw new Error('Invalid UserTasksBox');
        this.box.update();
    }
    Object.defineProperty(UserStatistics.prototype, "totalTasks", {
        get: function () {
            return this.totalTasksUncompletedFromInbox + this.totalCompletedTasks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserStatistics.prototype, "totalAssigned", {
        get: function () {
            return this.box.inbox.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserStatistics.prototype, "totalTasksCompletedFromInbox", {
        get: function () {
            return (this.box.inbox.length - this.box.inboxUndoneTasks.length);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserStatistics.prototype, "totalTasksUncompletedFromInbox", {
        get: function () {
            return this.box.inbox.length - this.totalTasksCompletedFromInbox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserStatistics.prototype, "totalUncompletedTasks", {
        get: function () {
            return this.box.allUndoneTasks.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserStatistics.prototype, "totalCompletedTasks", {
        get: function () {
            return this.box.outbox.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserStatistics.prototype, "totalTasksBroughtOver", {
        get: function () {
            if (!this.box || !this.box.nonAssignedTasks)
                return 0;
            return this.box.nonAssignedTasks.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserStatistics.prototype, "productivity", {
        get: function () {
            return (this.totalTasks == 0) ? 0 : (this.totalCompletedTasks / this.totalTasks) * 100;
        },
        enumerable: true,
        configurable: true
    });
    UserStatistics.prototype.update = function () {
        this.box.forceUpdate = true;
    };
    return UserStatistics;
}());
exports.UserStatistics = UserStatistics;
var MergeTask = (function (_super) {
    __extends(MergeTask, _super);
    function MergeTask(qid) {
        if (qid === void 0) { qid = 0; }
        var _this = _super.call(this, '$merge', 'task') || this;
        _this.qid = qid;
        return _this;
    }
    MergeTask.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'MergeTask must not be transient');
    };
    MergeTask.mapToEntity = function (source) {
        return Object.assign(new MergeTask(), source);
    };
    return MergeTask;
}(caribviper_entity_1.Entity));
exports.MergeTask = MergeTask;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var caribviper_common_1 = require("caribviper-common");
var StatisticItem = (function () {
    function StatisticItem(description, value, prefix, group) {
        this.description = description;
        this.value = value;
        this.prefix = prefix;
        this.group = group;
        caribviper_common_1.Assert.isTruthy(description, 'Statistic item must have description');
    }
    return StatisticItem;
}());
exports.StatisticItem = StatisticItem;
var GroupStatistics = (function () {
    function GroupStatistics(items) {
        if (items === void 0) { items = []; }
        this.items = items;
    }
    GroupStatistics.validate = function (items) {
        caribviper_common_1.Assert.isTruthy(items, 'Statistic items cannot be undefined');
        caribviper_common_1.Assert.isTrue(items.length > 0, 'Statistic items cannot be empty');
    };
    Object.defineProperty(GroupStatistics.prototype, "count", {
        get: function () {
            return this.items.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupStatistics.prototype, "sum", {
        get: function () {
            return GroupStatistics.sum(this.items);
        },
        enumerable: true,
        configurable: true
    });
    GroupStatistics.sum = function (items) {
        var value = 0;
        items.forEach(function (item) { return value += item.value; });
        return value;
    };
    Object.defineProperty(GroupStatistics.prototype, "average", {
        get: function () {
            return GroupStatistics.average(this.items);
        },
        enumerable: true,
        configurable: true
    });
    GroupStatistics.average = function (items) {
        var value = GroupStatistics.sum(items);
        return value / items.length;
    };
    Object.defineProperty(GroupStatistics.prototype, "percentages", {
        get: function () {
            return GroupStatistics.percentages(this.items);
        },
        enumerable: true,
        configurable: true
    });
    GroupStatistics.percentages = function (items) {
        var percents;
        var sum = GroupStatistics.sum(items);
        items.forEach(function (item) {
            percents.push(new StatisticItem(item.description, item.value / sum, item.prefix, item.group));
        });
        return percents;
    };
    return GroupStatistics;
}());
exports.GroupStatistics = GroupStatistics;

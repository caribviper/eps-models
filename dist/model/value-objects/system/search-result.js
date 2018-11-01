"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var registry_item_1 = require("./../../entities/planning/registry-item");
var ScoredRow = (function () {
    function ScoredRow() {
    }
    Object.defineProperty(ScoredRow.prototype, "registry", {
        get: function () {
            if (!!this.doc)
                return registry_item_1.RegistryItem.mapToEntity(this.doc);
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return ScoredRow;
}());
exports.ScoredRow = ScoredRow;
var SearchFetchResults = (function () {
    function SearchFetchResults() {
    }
    SearchFetchResults.initialise = function (results) {
        var s = Object.assign(new SearchFetchResults(), results);
        for (var i = 0; i < s.rows.length; i++) {
            s.rows[i] = Object.assign(new ScoredRow(), s.rows[i]);
        }
        return s;
    };
    return SearchFetchResults;
}());
exports.SearchFetchResults = SearchFetchResults;

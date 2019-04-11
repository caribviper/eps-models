"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GEOMETRY_NAMED_TYPES = {
    POINT: 'Point',
    LINE_STRING: 'LineString',
    POLYGON: 'Polygon',
    MULTI_POINT: 'MultiPoint',
    MULTI_LINE_STRING: 'MultiLineString',
    MULTI_POLYGON: 'MultiPolygon',
    FEATURE: 'Feature',
    FEATURE_COLLECTION: 'FeatureCollection'
};
exports.CRS = {
    type: 'name',
    properties: {
        name: 'urn:ogc:def:crs:OGC:1.3:CRS84'
    }
};
var geoPoint = (function () {
    function geoPoint(x, y, z, temporal) {
        if (z === void 0) { z = undefined; }
        if (temporal === void 0) { temporal = undefined; }
        this.x = x;
        this.y = y;
        this.z = z;
        this.temporal = temporal;
    }
    return geoPoint;
}());
exports.geoPoint = geoPoint;
var Point = (function () {
    function Point(x, y) {
        this.type = exports.GEOMETRY_NAMED_TYPES.POINT;
        this.coordinates = [x, y];
    }
    return Point;
}());
exports.Point = Point;
var MultiPoint = (function () {
    function MultiPoint() {
        var points = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            points[_i] = arguments[_i];
        }
        this.type = exports.GEOMETRY_NAMED_TYPES.MULTI_POINT;
        this.coordinates = points;
    }
    return MultiPoint;
}());
exports.MultiPoint = MultiPoint;
var LineString = (function () {
    function LineString() {
        var points = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            points[_i] = arguments[_i];
        }
        this.type = exports.GEOMETRY_NAMED_TYPES.LINE_STRING;
        this.coordinates = points;
    }
    return LineString;
}());
exports.LineString = LineString;
var MultiLineString = (function () {
    function MultiLineString() {
        var points = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            points[_i] = arguments[_i];
        }
        this.type = exports.GEOMETRY_NAMED_TYPES.MULTI_LINE_STRING;
        this.coordinates = points;
    }
    return MultiLineString;
}());
exports.MultiLineString = MultiLineString;
var Polygon = (function () {
    function Polygon() {
        var points = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            points[_i] = arguments[_i];
        }
        this.type = exports.GEOMETRY_NAMED_TYPES.POLYGON;
        this.coordinates = points;
    }
    return Polygon;
}());
exports.Polygon = Polygon;
var MultiPolygon = (function () {
    function MultiPolygon() {
        var points = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            points[_i] = arguments[_i];
        }
        this.type = exports.GEOMETRY_NAMED_TYPES.MULTI_POLYGON;
        this.coordinates = points;
    }
    return MultiPolygon;
}());
exports.MultiPolygon = MultiPolygon;
var Feature = (function () {
    function Feature(geometry, properties) {
        if (properties === void 0) { properties = {}; }
        this.geometry = geometry;
        this.properties = properties;
        this.type = exports.GEOMETRY_NAMED_TYPES.FEATURE;
    }
    Feature.createNamedFeature = function (name, geometry) {
        return new Feature(geometry, { name: name });
    };
    return Feature;
}());
exports.Feature = Feature;
var FeatureCollection = (function () {
    function FeatureCollection(name, features) {
        if (features === void 0) { features = []; }
        this.name = name;
        this.features = features;
        this.type = exports.GEOMETRY_NAMED_TYPES.FEATURE_COLLECTION;
        this.crs = exports.CRS;
        if (!name)
            throw 'Invalid FeatureCollection name';
        if (!features)
            features = [];
    }
    return FeatureCollection;
}());
exports.FeatureCollection = FeatureCollection;

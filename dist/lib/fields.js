"use strict";
// Helper functions for creating fields
Object.defineProperty(exports, "__esModule", { value: true });
exports.createListField = exports.createStructListField = exports.createStructField = exports.createTimestampField = exports.createDecimalField = exports.createDoubleField = exports.createFloatField = exports.createIntField = exports.createBooleanField = exports.createStringField = void 0;
function createStringField(optional = true, fieldOptions = {}) {
    return { ...fieldOptions, optional, type: 'UTF8' };
}
exports.createStringField = createStringField;
function createBooleanField(optional = true, fieldOptions = {}) {
    return { ...fieldOptions, optional, type: 'BOOLEAN' };
}
exports.createBooleanField = createBooleanField;
function createIntField(size, optional = true, fieldOptions = {}) {
    return { ...fieldOptions, optional, type: `INT${size}` };
}
exports.createIntField = createIntField;
function createFloatField(optional = true, fieldOptions = {}) {
    return { ...fieldOptions, optional, type: 'FLOAT' };
}
exports.createFloatField = createFloatField;
function createDoubleField(optional = true, fieldOptions = {}) {
    return { ...fieldOptions, optional, type: 'DOUBLE' };
}
exports.createDoubleField = createDoubleField;
function createDecimalField(precision, optional = true, fieldOptions = {}) {
    return { ...fieldOptions, precision, optional, type: 'FLOAT' };
}
exports.createDecimalField = createDecimalField;
function createTimestampField(optional = true, fieldOptions = {}) {
    return { ...fieldOptions, optional, type: 'TIMESTAMP_MILLIS' };
}
exports.createTimestampField = createTimestampField;
function createStructField(fields, optional = true) {
    return {
        optional,
        fields,
    };
}
exports.createStructField = createStructField;
function createStructListField(fields, optional = true) {
    return {
        type: 'LIST',
        optional,
        fields: {
            list: {
                repeated: true,
                fields: {
                    element: {
                        fields,
                    },
                }
            },
        },
    };
}
exports.createStructListField = createStructListField;
function createListField(type, optional = true, elementOptions = { optional: true }) {
    return {
        type: 'LIST',
        optional,
        fields: {
            list: {
                repeated: true,
                fields: {
                    element: {
                        optional: true,
                        ...elementOptions,
                        type,
                    },
                },
            },
        },
    };
}
exports.createListField = createListField;

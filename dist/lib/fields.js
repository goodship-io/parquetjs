"use strict";
// Helper functions for creating fields
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStringField = createStringField;
exports.createBooleanField = createBooleanField;
exports.createIntField = createIntField;
exports.createFloatField = createFloatField;
exports.createDoubleField = createDoubleField;
exports.createDecimalField = createDecimalField;
exports.createTimestampField = createTimestampField;
exports.createStructField = createStructField;
exports.createStructListField = createStructListField;
exports.createListField = createListField;
function createStringField(optional = true, fieldOptions = {}) {
    return { ...fieldOptions, optional, type: 'UTF8' };
}
function createBooleanField(optional = true, fieldOptions = {}) {
    return { ...fieldOptions, optional, type: 'BOOLEAN' };
}
function createIntField(size, optional = true, fieldOptions = {}) {
    return { ...fieldOptions, optional, type: `INT${size}` };
}
function createFloatField(optional = true, fieldOptions = {}) {
    return { ...fieldOptions, optional, type: 'FLOAT' };
}
function createDoubleField(optional = true, fieldOptions = {}) {
    return { ...fieldOptions, optional, type: 'DOUBLE' };
}
function createDecimalField(precision, optional = true, fieldOptions = {}) {
    return { ...fieldOptions, precision, optional, type: 'FLOAT' };
}
function createTimestampField(optional = true, fieldOptions = {}) {
    return { ...fieldOptions, optional, type: 'TIMESTAMP_MILLIS' };
}
function createStructField(fields, optional = true) {
    return {
        optional,
        fields,
    };
}
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
                },
            },
        },
    };
}
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

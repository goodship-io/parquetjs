"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeValues = exports.encodeValues = void 0;
const int53_1 = __importDefault(require("int53"));
function encodeValues_BOOLEAN(values) {
    const buf = Buffer.alloc(Math.ceil(values.length / 8));
    buf.fill(0);
    for (let i = 0; i < values.length; ++i) {
        if (values[i]) {
            buf[Math.floor(i / 8)] |= 1 << i % 8;
        }
    }
    return buf;
}
function decodeValues_BOOLEAN(cursor, count) {
    const values = [];
    for (let i = 0; i < count; ++i) {
        const b = cursor.buffer[cursor.offset + Math.floor(i / 8)];
        values.push((b & (1 << i % 8)) > 0);
    }
    cursor.offset += Math.ceil(count / 8);
    return values;
}
function encodeValues_INT32(values, opts) {
    const isDecimal = opts?.originalType === 'DECIMAL' || opts?.column?.originalType === 'DECIMAL';
    const scale = opts?.scale || 0;
    const buf = Buffer.alloc(4 * values.length);
    for (let i = 0; i < values.length; i++) {
        if (isDecimal) {
            buf.writeInt32LE(values[i] * Math.pow(10, scale), i * 4);
        }
        else {
            buf.writeInt32LE(values[i], i * 4);
        }
    }
    return buf;
}
function decodeValues_INT32(cursor, count, opts) {
    let values = [];
    const name = opts.name || opts.column?.name || undefined;
    try {
        if (opts.originalType === 'DECIMAL') {
            values = decodeValues_DECIMAL(cursor, count, opts);
        }
        else {
            for (let i = 0; i < count; ++i) {
                values.push(cursor.buffer.readInt32LE(cursor.offset));
                cursor.offset += 4;
            }
        }
    }
    catch (e) {
        console.log(`Error thrown for column: ${name}`);
        throw e;
    }
    return values;
}
function encodeValues_INT64(values, opts) {
    const isDecimal = opts?.originalType === 'DECIMAL' || opts?.column?.originalType === 'DECIMAL';
    const scale = opts?.scale || 0;
    const buf = Buffer.alloc(8 * values.length);
    for (let i = 0; i < values.length; i++) {
        if (isDecimal) {
            buf.writeBigInt64LE(BigInt(Math.floor(values[i] * Math.pow(10, scale))), i * 8);
        }
        else {
            buf.writeBigInt64LE(BigInt(values[i]), i * 8);
        }
    }
    return buf;
}
function decodeValues_INT64(cursor, count, opts) {
    let values = [];
    const name = opts.name || opts.column?.name || undefined;
    try {
        if (opts.originalType === 'DECIMAL' || opts.column?.originalType === 'DECIMAL') {
            const columnOptions = opts.column?.originalType ? opts.column : opts;
            values = decodeValues_DECIMAL(cursor, count, columnOptions);
        }
        else {
            for (let i = 0; i < count; ++i) {
                values.push(cursor.buffer.readBigInt64LE(cursor.offset));
                cursor.offset += 8;
            }
        }
    }
    catch (e) {
        console.log(`Error thrown for column: ${name}`);
        throw e;
    }
    return values;
}
function decodeValues_DECIMAL(cursor, count, opts) {
    const precision = opts.precision;
    // Default scale to 0 per spec
    const scale = opts.scale || 0;
    const name = opts.name || undefined;
    if (!precision) {
        throw `missing option: precision (required for DECIMAL) for column: ${name}`;
    }
    const values = [];
    // by default we prepare the offset and bufferFunction to work with 32bit integers
    let offset = 4;
    let bufferFunction = (offset) => cursor.buffer.readInt32LE(offset);
    if (precision > 9) {
        // if the precision is over 9 digits, then we are dealing with a 64bit integer
        offset = 8;
        bufferFunction = (offset) => cursor.buffer.readBigInt64LE(offset);
    }
    for (let i = 0; i < count; ++i) {
        const bufferSize = cursor.size || 0;
        if (bufferSize === 0 || cursor.offset < bufferSize) {
            const fullValue = bufferFunction(cursor.offset);
            const valueWithDecimalApplied = Number(fullValue) / Math.pow(10, scale);
            values.push(valueWithDecimalApplied);
            cursor.offset += offset;
        }
    }
    return values;
}
function encodeValues_INT96(values) {
    const buf = Buffer.alloc(12 * values.length);
    for (let i = 0; i < values.length; i++) {
        if (values[i] >= 0) {
            int53_1.default.writeInt64LE(values[i], buf, i * 12);
            buf.writeUInt32LE(0, i * 12 + 8); // truncate to 64 actual precision
        }
        else {
            int53_1.default.writeInt64LE(~-values[i] + 1, buf, i * 12);
            buf.writeUInt32LE(0xffffffff, i * 12 + 8); // truncate to 64 actual precision
        }
    }
    return buf;
}
function decodeValues_INT96(cursor, count) {
    const values = [];
    for (let i = 0; i < count; ++i) {
        // Read the low and high parts as BigInts
        const lowBigInt = BigInt(int53_1.default.readInt64LE(cursor.buffer, cursor.offset));
        const highBigInt = BigInt(cursor.buffer.readUInt32LE(cursor.offset + 8)) << BigInt(64);
        // Combine the low and high parts
        const value = lowBigInt | highBigInt;
        values.push(value);
        cursor.offset += 12;
    }
    return values;
}
function encodeValues_FLOAT(values) {
    const buf = Buffer.alloc(4 * values.length);
    for (let i = 0; i < values.length; i++) {
        buf.writeFloatLE(values[i], i * 4);
    }
    return buf;
}
function decodeValues_FLOAT(cursor, count) {
    const values = [];
    for (let i = 0; i < count; ++i) {
        values.push(cursor.buffer.readFloatLE(cursor.offset));
        cursor.offset += 4;
    }
    return values;
}
function encodeValues_DOUBLE(values) {
    const buf = Buffer.alloc(8 * values.length);
    for (let i = 0; i < values.length; i++) {
        buf.writeDoubleLE(values[i], i * 8);
    }
    return buf;
}
function decodeValues_DOUBLE(cursor, count) {
    const values = [];
    for (let i = 0; i < count; ++i) {
        values.push(cursor.buffer.readDoubleLE(cursor.offset));
        cursor.offset += 8;
    }
    return values;
}
function encodeValues_BYTE_ARRAY(values) {
    let buf_len = 0;
    const returnedValues = [];
    for (let i = 0; i < values.length; i++) {
        returnedValues[i] = Buffer.from(values[i]);
        buf_len += 4 + returnedValues[i].length;
    }
    const buf = Buffer.alloc(buf_len);
    let buf_pos = 0;
    for (let i = 0; i < returnedValues.length; i++) {
        buf.writeUInt32LE(returnedValues[i].length, buf_pos);
        returnedValues[i].copy(buf, buf_pos + 4);
        buf_pos += 4 + returnedValues[i].length;
    }
    return buf;
}
function decodeValues_BYTE_ARRAY(cursor, count) {
    const values = [];
    for (let i = 0; i < count; ++i) {
        const len = cursor.buffer.readUInt32LE(cursor.offset);
        cursor.offset += 4;
        values.push(cursor.buffer.subarray(cursor.offset, cursor.offset + len));
        cursor.offset += len;
    }
    return values;
}
function byteArrayToDecimal(bytes, scale) {
    // Convert the byte array to a big integer
    let bigInteger = BigInt(0);
    for (let byte of bytes) {
        bigInteger = (bigInteger << BigInt(8)) + BigInt(byte);
    }
    // Calculate the scale factor as a BigInt
    const factor = BigInt(Math.pow(10, scale));
    // Perform the division and modulus operations in BigInt
    const integerPart = bigInteger / factor;
    const fractionalPart = bigInteger % factor;
    // Construct the decimal string
    return `${integerPart}.${fractionalPart.toString().padStart(scale, '0')}`;
}
function encodeValues_FIXED_LEN_BYTE_ARRAY(values, opts) {
    if (!opts.typeLength) {
        throw 'missing option: typeLength (required for FIXED_LEN_BYTE_ARRAY)';
    }
    const returnedValues = [];
    for (let i = 0; i < values.length; i++) {
        returnedValues[i] = Buffer.from(values[i]);
        if (returnedValues[i].length !== opts.typeLength) {
            throw 'invalid value for FIXED_LEN_BYTE_ARRAY: ' + returnedValues[i];
        }
    }
    return Buffer.concat(returnedValues);
}
function decodeValues_FIXED_LEN_BYTE_ARRAY(cursor, count, opts) {
    const values = [];
    const typeLength = opts.typeLength ?? (opts.column ? opts.column.typeLength : undefined);
    if (!typeLength) {
        throw 'missing option: typeLength (required for FIXED_LEN_BYTE_ARRAY)';
    }
    const isDecimal = opts?.originalType === 'DECIMAL' || opts?.column?.originalType === 'DECIMAL';
    if (isDecimal) {
        const returnedValues = [];
        for (let i = 0; i < count; i++) {
            const buffer = cursor.buffer.subarray(cursor.offset, cursor.offset + opts.typeLength);
            returnedValues[i] = byteArrayToDecimal(buffer, opts.scale ?? 0);
            cursor.offset += opts.typeLength;
        }
        return returnedValues;
    }
    for (let i = 0; i < count; ++i) {
        values.push(cursor.buffer.subarray(cursor.offset, cursor.offset + typeLength));
        cursor.offset += typeLength;
    }
    return values;
}
const encodeValues = function (type, values, opts) {
    switch (type) {
        case 'BOOLEAN':
            return encodeValues_BOOLEAN(values);
        case 'INT32':
            return encodeValues_INT32(values, opts);
        case 'INT64':
            return encodeValues_INT64(values, opts);
        case 'INT96':
            return encodeValues_INT96(values);
        case 'FLOAT':
            return encodeValues_FLOAT(values);
        case 'DOUBLE':
            return encodeValues_DOUBLE(values);
        case 'BYTE_ARRAY':
            return encodeValues_BYTE_ARRAY(values);
        case 'FIXED_LEN_BYTE_ARRAY':
            return encodeValues_FIXED_LEN_BYTE_ARRAY(values, opts);
        default:
            throw 'unsupported type: ' + type;
    }
};
exports.encodeValues = encodeValues;
const decodeValues = function (type, cursor, count, opts) {
    switch (type) {
        case 'BOOLEAN':
            return decodeValues_BOOLEAN(cursor, count);
        case 'INT32':
            return decodeValues_INT32(cursor, count, opts);
        case 'INT64':
            return decodeValues_INT64(cursor, count, opts);
        case 'INT96':
            return decodeValues_INT96(cursor, count);
        case 'FLOAT':
            return decodeValues_FLOAT(cursor, count);
        case 'DOUBLE':
            return decodeValues_DOUBLE(cursor, count);
        case 'BYTE_ARRAY':
            return decodeValues_BYTE_ARRAY(cursor, count);
        case 'FIXED_LEN_BYTE_ARRAY':
            return decodeValues_FIXED_LEN_BYTE_ARRAY(cursor, count, opts);
        default:
            throw 'unsupported type: ' + type;
    }
};
exports.decodeValues = decodeValues;

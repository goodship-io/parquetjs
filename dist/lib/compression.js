"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inflate = exports.deflate = exports.PARQUET_COMPRESSION_METHODS = void 0;
const zlib_1 = __importDefault(require("zlib"));
const snappyjs_1 = __importDefault(require("snappyjs"));
const wasm_brotli_1 = require("wasm-brotli");
// LZO compression is disabled. See: https://github.com/LibertyDSNP/parquetjs/issues/18
exports.PARQUET_COMPRESSION_METHODS = {
    'UNCOMPRESSED': {
        deflate: deflate_identity,
        inflate: inflate_identity
    },
    'GZIP': {
        deflate: deflate_gzip,
        inflate: inflate_gzip
    },
    'SNAPPY': {
        deflate: deflate_snappy,
        inflate: inflate_snappy
    },
    'BROTLI': {
        deflate: deflate_brotli,
        inflate: inflate_brotli
    }
};
/**
 * Deflate a value using compression method `method`
 */
async function deflate(method, value) {
    if (!(method in exports.PARQUET_COMPRESSION_METHODS)) {
        throw 'invalid compression method: ' + method;
    }
    return exports.PARQUET_COMPRESSION_METHODS[method].deflate(value);
}
exports.deflate = deflate;
function deflate_identity(value) {
    return buffer_from_result(value);
}
function deflate_gzip(value) {
    return zlib_1.default.gzipSync(value);
}
function deflate_snappy(value) {
    const compressedValue = snappyjs_1.default.compress(value);
    return buffer_from_result(compressedValue);
}
async function deflate_brotli(value) {
    const compressedContent = await (0, wasm_brotli_1.compress)(value /*, {
      mode: 0,
      quality: 8,
      lgwin: 22
    }
    */);
    return Buffer.from(compressedContent);
}
/**
 * Inflate a value using compression method `method`
 */
async function inflate(method, value) {
    if (!(method in exports.PARQUET_COMPRESSION_METHODS)) {
        throw 'invalid compression method: ' + method;
    }
    return await exports.PARQUET_COMPRESSION_METHODS[method].inflate(value);
}
exports.inflate = inflate;
async function inflate_identity(value) {
    return buffer_from_result(value);
}
async function inflate_gzip(value) {
    return zlib_1.default.gunzipSync(value);
}
function inflate_snappy(value) {
    const uncompressedValue = snappyjs_1.default.uncompress(value);
    return buffer_from_result(uncompressedValue);
}
async function inflate_brotli(value) {
    const uncompressedContent = await (0, wasm_brotli_1.decompress)(value);
    return Buffer.from(uncompressedContent);
}
function buffer_from_result(result) {
    if (Buffer.isBuffer(result)) {
        return result;
    }
    else {
        return Buffer.from(result);
    }
}

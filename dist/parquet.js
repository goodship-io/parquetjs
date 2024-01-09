"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParquetFieldBuilder = exports.ParquetShredder = exports.ParquetSchema = exports.ParquetTransformer = exports.ParquetWriter = exports.ParquetEnvelopeWriter = exports.ParquetReader = exports.ParquetEnvelopeReader = void 0;
const reader = __importStar(require("./lib/reader"));
const writer = __importStar(require("./lib/writer"));
const schema = __importStar(require("./lib/schema"));
const shredder = __importStar(require("./lib/shred"));
const fields = __importStar(require("./lib/fields"));
exports.ParquetEnvelopeReader = reader.ParquetEnvelopeReader;
exports.ParquetReader = reader.ParquetReader;
exports.ParquetEnvelopeWriter = writer.ParquetEnvelopeWriter;
exports.ParquetWriter = writer.ParquetWriter;
exports.ParquetTransformer = writer.ParquetTransformer;
exports.ParquetSchema = schema.ParquetSchema;
exports.ParquetShredder = shredder;
exports.ParquetFieldBuilder = fields;
exports.default = {
    ParquetEnvelopeReader: exports.ParquetEnvelopeReader,
    ParquetReader: exports.ParquetReader,
    ParquetEnvelopeWriter: exports.ParquetEnvelopeWriter,
    ParquetWriter: exports.ParquetWriter,
    ParquetTransformer: exports.ParquetTransformer,
    ParquetSchema: exports.ParquetSchema,
    ParquetShredder: exports.ParquetShredder,
    ParquetFieldBuilder: exports.ParquetFieldBuilder,
};

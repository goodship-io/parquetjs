import sbbf from "../bloom/sbbf";
import { ParquetEnvelopeReader } from "../reader";
import { ColumnChunkData } from "../declare";
type bloomFilterOffsetData = {
    columnName: string;
    offsetBytes: number;
    rowGroupIndex: number;
};
export declare const parseBloomFilterOffsets: (ColumnChunkDataCollection: Array<ColumnChunkData>) => Array<bloomFilterOffsetData>;
export declare const siftAllByteOffsets: (columnChunkDataCollection: Array<ColumnChunkData>) => Array<bloomFilterOffsetData>;
export declare const getBloomFiltersFor: (paths: Array<string>, envelopeReader: InstanceType<typeof ParquetEnvelopeReader>) => Promise<{
    sbbf: sbbf;
    columnName: string;
    rowGroupIndex: number;
}[]>;
export {};

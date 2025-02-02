import { Cursor, Options } from './types';
type ValidValueTypes = 'BOOLEAN' | 'INT32' | 'INT64' | 'INT96' | 'FLOAT' | 'DOUBLE' | 'BYTE_ARRAY' | 'FIXED_LEN_BYTE_ARRAY';
export declare const encodeValues: (type: ValidValueTypes | string, values: unknown[], opts: Options) => Buffer;
export declare const decodeValues: (type: ValidValueTypes | string, cursor: Cursor, count: number, opts: Options) => string[] | number[] | boolean[] | bigint[] | Buffer[];
export {};

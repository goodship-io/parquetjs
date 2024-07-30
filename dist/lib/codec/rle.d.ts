import { Cursor } from './types';
export declare const encodeValues: (type: string, values: number[], opts: {
    bitWidth: number;
    disableEnvelope?: boolean;
}) => Buffer;
export declare const decodeValues: (_: string, cursor: Cursor, count: number, opts: {
    bitWidth: number;
    disableEnvelope?: boolean;
}) => any[];

import { PrimitiveType, OriginalType, ParquetType, FieldDefinition, ParquetField } from "./declare";
import { Options } from "./codec/types";
type ParquetTypeDataObject = {
    primitiveType?: PrimitiveType;
    toPrimitive: Function;
    fromPrimitive?: Function;
    originalType?: OriginalType;
    typeLength?: number;
};
export declare function getParquetTypeDataObject(type: ParquetType, field?: ParquetField | Options | FieldDefinition): ParquetTypeDataObject;
/**
 * Convert a value from it's native representation to the internal/underlying
 * primitive type
 */
export declare function toPrimitive(type: string | undefined, value: unknown, field?: ParquetField | Options): any;
/**
 * Convert a value from it's internal/underlying primitive representation to
 * the native representation
 */
export declare function fromPrimitive(type: string | undefined, value: unknown, field?: ParquetField | Options): any;
export {};

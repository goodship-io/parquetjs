export namespace PARQUET_COMPRESSION_METHODS {
    namespace UNCOMPRESSED {
        export { deflate_identity as deflate };
        export { inflate_identity as inflate };
    }
    namespace GZIP {
        export { deflate_gzip as deflate };
        export { inflate_gzip as inflate };
    }
    namespace SNAPPY {
        export { deflate_snappy as deflate };
        export { inflate_snappy as inflate };
    }
}
/**
 * Deflate a value using compression method `method`
 */
export function deflate(method: any, value: any): Promise<any>;
/**
 * Inflate a value using compression method `method`
 */
export function inflate(method: any, value: any): Promise<any>;
declare function deflate_identity(value: any): Buffer;
declare function inflate_identity(value: any): Buffer;
declare function deflate_gzip(value: any): Buffer;
declare function inflate_gzip(value: any): Buffer;
declare function deflate_snappy(value: any): Buffer;
declare function inflate_snappy(value: any): Buffer;
export {};

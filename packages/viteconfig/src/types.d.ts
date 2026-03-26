export interface ViteEnv {
    /** 页面标题 */
    readonly VITE_TITLE?: string;
    /** 是否开启模拟数据 */
    readonly VITE_ENABLE_MOCK?: string;
    /** 压缩算法类型 */
    readonly VITE_COMPRESS_TYPE?:
    | "gzip"
    | "brotliCompress"
    | "deflate"
    | "deflateRaw";
    /** 图标前缀 */
    readonly VITE_ICON_PREFIX: string;
    /** 图标本地前缀 */
    readonly VITE_ICON_LOCAL_PREFIX: string;
    /** 外部配置文件类型 */
    readonly VITE_EXTERNAL_CONFIG_FILE?: 'yaml' | 'toml';
}

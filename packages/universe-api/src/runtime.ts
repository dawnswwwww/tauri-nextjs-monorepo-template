/**
 * 判断当前运行环境
 * @returns 'tauri'  | 'browser'
 */
export const getRuntime = () => {
  if (typeof window !== "undefined") {
    if ("__TAURI_INTERNALS__" in window) {
      return "tauri";
    }
  }
  return "browser";
};

/**
 * 判断是否在 Tauri 环境中运行
 */
export const isTauri = () => getRuntime() === "tauri";

/**
 * 判断是否在浏览器环境中运行
 */
export const isBrowser = () => getRuntime() === "browser";

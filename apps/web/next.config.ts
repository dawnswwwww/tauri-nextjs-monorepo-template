import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import NextWebConfig from "./next-configs/next.config.web";
import NextDesktopConfig from "./next-configs/next.config.native";

const RUNTIME_TYPE_PHASE = process.env.RUNTIME_TYPE_PHASE;

const isNative = RUNTIME_TYPE_PHASE === "native";

const isWeb = RUNTIME_TYPE_PHASE === "web";

const isDev = process.env.NODE_ENV === "development";

const isProd = process.env.NODE_ENV === "production";

const extendedConfig = isNative ? NextDesktopConfig : NextWebConfig;

console.log("isNative", isNative);

const nextConfig: NextConfig = {
  ...extendedConfig,
};

export default nextConfig;

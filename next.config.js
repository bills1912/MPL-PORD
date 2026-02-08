/** @type {import('next').NextConfig} */
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});


const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@nivo"],
  experimental: { esmExternals: "loose", appDir: false },
  output: "standalone",
  webpack: (config) => {
    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.fallback = { fs: false };
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      type: "asset/resource",
      generator: {
        filename: "static/worker/[hash][ext][query]"
      }
    });

    config.plugins.push(
      new NodePolyfillPlugin(),
      new CopyPlugin({
        patterns: [
          // {
          //   from: './node_modules/onnxruntime-web/dist/ort-wasm.wasm',
          //   to: 'static/chunks/pages',
          // },
          // {
          //   from: './node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm',
          //   to: 'static/chunks/pages',
          // },
          {
            from: './node_modules/onnxruntime-web/dist/*.wasm',
            to: 'static/chunks/pages',
          },
          {
            from: './models',
            to: 'static/chunks/pages',
          },
        ],
      })
    );

    return config;
  }
};

const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = withBundleAnalyzer(withPWA(nextConfig));

// module.exports = nextConfig;

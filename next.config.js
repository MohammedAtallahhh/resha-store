/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData: `
          @import "./components.scss";
          @import "./helpers.scss";
    `,
  },
};

module.exports = nextConfig;

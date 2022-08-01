const path = require("path");

const parts = path.resolve(".").split("/");
const package = parts[parts.length - 1];

module.exports = {
  testMatch: [`<rootDir>/packages/${package}/src/**/*.test.{ts,tsx}`],
};

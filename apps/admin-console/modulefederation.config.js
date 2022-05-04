const { dependencies } = require("./package.json");

module.exports = {
  name: "adminconsole",
  exposes: {
    "./App": "./src/App",
  },
  remotes: {},
  filename: "moduleEntry.js",
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
  },
};

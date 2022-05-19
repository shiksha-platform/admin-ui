const { dependencies } = require("./package.json");

module.exports = {
  name: "modulename",
  exposes: {
    "./App": "./src/App",
    "./ExamplePage": "./src/pages/config-view/ExamplePage",
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

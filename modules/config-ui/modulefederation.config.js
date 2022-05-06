const { dependencies } = require("./package.json");

module.exports = {
  name: "configui",
  exposes: {
    "./App": "./src/App",
    "./ConfigEditorPage": "./src/pages/config-view/ConfigEditorPage"
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

const { dependencies } = require("./package.json");

module.exports = {
  name: "content_pages",
  exposes: {
    "./App": "./src/App",
    "./EditContentPage": "./src/pages/EditContentPage",
    "./CreateContentPage": "./src/pages/CreateContentPage",
    "./ViewContentPages": "./src/pages/ViewContentPages",
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

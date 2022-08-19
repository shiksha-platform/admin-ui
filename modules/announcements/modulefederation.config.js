const { dependencies } = require("./package.json");

module.exports = {
  name: "announcements",
  exposes: {
    "./App": "./src/App",
    "./EditAnnouncement": "./src/pages/EditAnnouncement",
    "./CreateAnnouncement": "./src/pages/CreateAnnouncement",
    "./ViewAnnouncements": "./src/pages/ViewAnnouncements",
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

import "./App.css";

import "common-ui/dist/index.css";
import { useTranslation } from "react-i18next";
import { AppShell, initializeI18n } from "common-ui";
import React from "react";

const HomePage = () => <h1>Home Page</h1>;
const ConfigPage = React.lazy(() => import("configui/ConfigEditorPage"));
const RegistryPage = () => <h1>Registry Page</h1>;
const AboutPage = () => <h1>About Page</h1>;

initializeI18n(
  ["translation", "configui"],
  `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`,
  window.appModules
);
function App() {
  const routes = [
    {
      path: "/",
      label: "Home",
      component: HomePage,
    },
    {
      path: "/registry",
      label: "Registry",
      component: RegistryPage,
    },
    {
      path: "/config",
      label: "Modules",
      component: ConfigPage,
    },
    {
      path: "about",
      label: "About",
      component: AboutPage,
    },
  ];
  const appShellProp = {
    label: "Admin Console",
    routes: routes,
  };
  return (
    <article>
      <AppShell {...appShellProp}></AppShell>
    </article>
  );
}

export default App;

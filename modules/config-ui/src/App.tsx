import "./App.css";

import "common-ui/dist/index.css";

import { AppShell, initializeI18n } from "common-ui";
import React from "react";
import ConfigEditorPage from "./pages/config-view/ConfigEditorPage";
import { useTranslation } from "react-i18next";

type User = {
  name: string;
};

const AboutPage = () => <h1>About Page</h1>;

initializeI18n([], `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`);

function App() {
  const routes = [
    {
      path: "/",
      label: "Home",
      component: ConfigEditorPage,
    },
    {
      path: "/config",
      label: "Modules",
      component: ConfigEditorPage,
    },
    {
      path: "about",
      label: "About",
      component: AboutPage,
    },
  ];
  const appShellProp = {
    label: "",
    routes: routes,
  };
  return (
    <article>
      <AppShell {...appShellProp}></AppShell>
    </article>
  );
}

export default App;

import "./App.css";

import "common-ui/dist/index.css";

import { AppShell, Header } from "common-ui";
import React from "react";
import ConfigEditorPage from "./pages/config-view/ConfigEditorPage";

type User = {
  name: string;
};

const AboutPage = () => <h1>About Page</h1>;

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
    label: "Config UI Shell",
    routes: routes,
  };
  return (
    <article>
      <AppShell {...appShellProp}></AppShell>
    </article>
  );
}

export default App;

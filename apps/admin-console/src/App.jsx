import "./App.css";

import "common-ui/dist/index.css";
import { AppShell, initializeI18n } from "common-ui";
import React from "react";
import { FaBook, FaHome, FaCogs } from "react-icons/fa";
import { BiBarChartSquare } from "react-icons/bi";

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
      icon: FaHome,
      component: HomePage,
    },
    {
      path: "/registry",
      label: "Registry",
      icon: FaBook,
      component: RegistryPage,
      children: [
        {
          path: "/config",
          label: "Schools",
          component: RegistryPage,
        },
        {
          path: "/config",
          label: "Students",
          component: RegistryPage,
        },
      ],
    },
    {
      path: "/config",
      label: "Modules",
      component: ConfigPage,
      icon: FaCogs,
      children: [
        {
          path: "/config",
          label: "Attendance",
          component: ConfigPage,
        },
        {
          path: "/config",
          label: "Classes & Groups",
          component: ConfigPage,
        },
      ],
    },
    {
      path: "reports",
      label: "Reports",
      icon: BiBarChartSquare,
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

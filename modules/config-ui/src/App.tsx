import "./App.css";

import "common-ui/dist/index.css";

import { AppShell, initializeI18n, LoginPage } from "common-ui";
import ConfigEditorPage from "./pages/config-view/ConfigEditorPage";
import { RouteProps, NavMenuItemProps, AppShellProps } from "common-ui";

type User = {
  name: string;
};

const AboutPage = () => <h1>About Page</h1>;

initializeI18n([], `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`);

function App() {
  const navLinks: NavMenuItemProps[] = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/config/module1",
      label: "Modules",
    },
    {
      path: "about",
      label: "About",
    },
  ];
  const routes: RouteProps[] = [
    {
      path: "/",
      component: AboutPage,
    },
    {
      path: "/config/:moduleId",
      component: ConfigEditorPage,
    },
    {
      path: "about",
      component: AboutPage,
    },
  ];

  const appShellProp: AppShellProps = {
    label: "",
    routes: routes,
    navLinks: navLinks,
    AuthComponent: LoginPage,
  };
  return (
    <article>
      <AppShell {...appShellProp}></AppShell>
    </article>
  );
}

export default App;

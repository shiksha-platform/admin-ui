import "./App.css";

import "common-ui/dist/index.css";

import {
  AppShell,
  AppShellProps,
  initializeI18n,
  LoginPage,
  NavMenuItemProps,
} from "common-ui";
import EditContentPage from "./pages/EditContentPage";

type User = {
  name: string;
};

const AboutPage = () => <h1>About Page</h1>;

initializeI18n([], `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`);

function App() {
  const routes = [
    {
      path: "about",
      label: "About",
      component: AboutPage,
    },
    {
      path: "/content-pages/edit",
      component: EditContentPage,
    }
  ];
  let navLinks: NavMenuItemProps[] = [];
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

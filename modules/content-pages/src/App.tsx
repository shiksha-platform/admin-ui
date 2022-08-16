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
import CreateContentPage from "./pages/CreateContentPage";

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
      path: "/content-pages/edit/:slug",
      component: EditContentPage,
    },
    {
      path: "/content-pages/create",
      component: CreateContentPage,
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

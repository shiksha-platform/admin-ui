import "./App.css";

import "common-ui/dist/index.css";

import {
  AppShell,
  AppShellProps,
  initializeI18n,
  LoginPage,
  NavMenuItemProps,
  RouteProps,
} from "common-ui";
import EditAnnouncement from "./pages/EditAnnouncement";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import ViewAnnouncements from "./pages/ViewAnnouncements";

type User = {
  name: string;
};

const AboutPage = () => <h1>About Page</h1>;

initializeI18n([], `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`);

function App() {
  const routes : RouteProps[]= [
    {
      path: "/",
      component: ViewAnnouncements,
    },
    {
      path: "/create",
      component: CreateAnnouncement
    },
    {
      path: "/allannouncements",
      component: ViewAnnouncements
    },
    {
      path: "/announcement/:announcementId",
      component: EditAnnouncement,
    },
    {
      path: "about",
      component: AboutPage,
    },
  ];
  let navLinks: NavMenuItemProps[] = [{
    path: "/",
    label: "Home",
  },
  {
    path: "/allannouncements",
    label: "Announcements",
  },
  {
    path: "about",
    label: "About",
  }];
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
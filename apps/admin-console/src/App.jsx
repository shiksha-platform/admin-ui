import "./App.css";

import "common-ui/dist/index.css";
import { AppShell, initializeI18n, LoginPage } from "common-ui";
import React from "react";
import { FaBook, FaHome, FaCogs, FaUserCog } from "react-icons/fa";
import { BiBarChartSquare } from "react-icons/bi";

const HomePage = () => <h1>Home Page</h1>;
const ConfigPage = React.lazy(() => import("configui/ConfigEditorPage"));
const ViewAnnouncements = React.lazy(() => import("announcements/ViewAnnouncements"));
const CreateAnnouncement = React.lazy(() => import("announcements/CreateAnnouncement"));
const EditAnnouncement = React.lazy(() => import("announcements/EditAnnouncement"));
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
      component: HomePage,
    },
    {
      path: "/registry",
      component: RegistryPage,
    },
    {
      path: "/config/:moduleId",
      component: ConfigPage,
    },
    {
      path: "/announcements/create",
      component: CreateAnnouncement,
    },
    {
      path: "/announcements",
      component: ViewAnnouncements,
    },
    {
      path: "/announcements/edit/:announcementId",
      component: EditAnnouncement,
    },
    {
      path: "reports",
      component: AboutPage,
    },

  ];

  const navLinks = [
    {
      path: "/",
      label: "Home",
      icon: FaHome,
    },
    {
      path: "/general",
      label: "General",
      icon: FaUserCog,
      children: [
        {
          path: "/config/theme",
          label: "Theme",
        },
        {
          path: "/config/roles",
          label: "Roles",
        },
      ],
    },
    {
      path: "/registry",
      label: "Registry",
      icon: FaBook,
      children: [
        {
          path: "/registry/schools",
          label: "Schools",
        },
        {
          path: "/registry/students",
          label: "Students",
        },
      ],
    },
    {
      path: "/config/attendance",
      label: "Modules",
      icon: FaCogs,
      children: [
        {
          path: "/config/attendance",
          label: "Attendance",
        },
        {
          path: "/config/worksheet",
          label: "Worksheet",
        },
        {
<<<<<<< HEAD
          path: "/config/assessment",
          label: "Assessment",
=======
          path: "/config/announcements",
          label: "Announcements",
>>>>>>> 1cf553d (Integrated announcement config with admin console)
        },
      ],
    },
    {
      path: "/announcements",
      label: "Announcements",
      icon: BiBarChartSquare,
    },
    {
      path: "reports",
      label: "Reports",
      icon: BiBarChartSquare,
    },
  ];
  return (
    <article>
      <AppShell
        label=""
        routes={routes}
        navLinks={navLinks}
        AuthComponent={LoginPage}
      ></AppShell>
    </article>
  );
}

export default App;

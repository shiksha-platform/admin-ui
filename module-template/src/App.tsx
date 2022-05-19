import "./App.css";

import "common-ui/dist/index.css";

import { AppShell, initializeI18n } from "common-ui";
import ExamplePage from "./pages/example/ExamplePage";

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
      component: ExamplePage,
    },
    {
      path: "/config",
      label: "Modules",
      component: ExamplePage,
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

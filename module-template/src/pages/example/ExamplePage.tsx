import { useTranslation } from "react-i18next";

const ExamplePage = () => {
  const { t } = useTranslation("configui");
  return <>{t("PAGE_TITLE")}</>;
};
export default ExamplePage as React.FC;

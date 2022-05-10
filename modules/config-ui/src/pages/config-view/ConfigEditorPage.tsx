import { useTranslation } from "react-i18next";

const ConfigEditorPage = () => {
  const { t } = useTranslation("configui");
  return <>{t("PAGE_TITLE")}</>;
};
export default ConfigEditorPage as React.FC;

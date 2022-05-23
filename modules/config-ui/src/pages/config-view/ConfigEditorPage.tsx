import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Heading,
  Icon,
  Link,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import { FaInfoCircle } from "react-icons/fa";

import Form from "@rjsf/chakra-ui";
import attendanceConfigSchema from "../../services/Attendance/attendance-config-schema.json";
import { useState } from "react";

const ObjectFieldTemplate = (props: any) => {
  return (
    <div>
      <Heading
        m={1}
        display={"flex"}
        as="h4"
        size="sm"
        backgroundColor="primary.900"
      >
        <Switch m={2} id="enable-m1" />
        <Box m={2} flex={1}>
          {props.title}
        </Box>
      </Heading>
      <Box>
        {props.properties.map((element: any, index: number) => (
          <div key={index} className="property-wrapper">
            {element.content}
          </div>
        ))}
      </Box>
    </div>
  );
};

const CustomFieldTemplate = (props: any) => {
  const {
    id,
    classNames,
    label,
    help,
    required,
    description,
    errors,
    children,
  } = props;
  return (
    <div className={classNames}>
      {description}
      {children}
      {errors}
      {help}
    </div>
  );
};

interface ConfigSchema {
  name: string;
  label: string;
  subModules: SubModuleConfig[];
}
interface SubModuleConfig {
  name: string;
  label: string;
  sections: SectionConfig[];
}
interface SectionConfig {
  name: string;
  label: string;
  schema?: any;
  uischema?: any;
}

const ConfigEditorPage = () => {
  const config: any = attendanceConfigSchema;

  const [selectedModule, setSelectedModule] = useState<SubModuleConfig>(
    config["subModules"][0]
  );
  const { t } = useTranslation("configui");
  return (
    <Box marginX={4}>
      <Heading as="h4" size="md">
        {config.label} <Icon as={FaInfoCircle} />
      </Heading>
      <Box marginY={4} p={0}>
        {config["subModules"].map((m: SubModuleConfig, index: number) => {
          return (
            <Button
              key={index}
              style={{ borderRadius: 0, margin: "0px" }}
              color="primary.100"
              variant="outline"
            >
              <Link
                onClick={() => {
                  setSelectedModule(m);
                }}
              >
                {m.label}
              </Link>
            </Button>
          );
        })}
      </Box>
      <Box>
        <Tabs>
          <TabList>
            {selectedModule.sections.map(
              (section: SectionConfig, index: number) => {
                return <Tab key={index}>{section.label}</Tab>;
              }
            )}
          </TabList>

          <TabPanels>
            {selectedModule.sections.map(
              (section: SectionConfig, index: number) => {
                return (
                  <TabPanel key={index}>
                    <Form
                      schema={section.schema}
                      uiSchema={section.uischema}
                      ObjectFieldTemplate={ObjectFieldTemplate}
                      FieldTemplate={CustomFieldTemplate}
                    />
                  </TabPanel>
                );
              }
            )}
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
export default ConfigEditorPage as React.FC;

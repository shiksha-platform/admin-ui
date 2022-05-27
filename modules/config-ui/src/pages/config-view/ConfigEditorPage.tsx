import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  Spacer,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import { FaInfoCircle } from "react-icons/fa";
import { Form } from "@rjsf/chakra-ui";

import { useParams } from "react-router-dom";

import attendanceConfigSchema from "../../services/Attendance/attendance-config-schema.json";
import React, { useState } from "react";

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
  const { moduleId } = useParams();

  //TODO: load the config schema fromendpoiint forr the moduleId
  console.log(moduleId);
  const config: any = attendanceConfigSchema;

  const [selectedSubModule, setSelectedSubModule] = useState<SubModuleConfig>(
    config["subModules"][0]
  );

  const { t } = useTranslation("configui");

  let configForms: any[] = [];
  const submitForm = () => {
    console.log(configForms);
    //configForms[0].submit();
    //console.log(configForms[0].state.formData);
    configForms.forEach((f) => {
      console.log(f.validate(f.state.formData));
      f.submit();
    });
  };
  const onSubmit = (formData: any) => console.log("Data submitted: ", formData);

  return (
    <Box marginX={4}>
      <Flex direction={"row"}>
        <Heading as="h4" size="md">
          {config.label} <Icon as={FaInfoCircle} />
        </Heading>
        <Spacer></Spacer>
        <Box>
          <Button
            variant={"outline"}
            borderColor={"primary.100"}
            color={"primary.100"}
            onClick={submitForm}
          >
            Save
          </Button>
        </Box>
      </Flex>
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
                  setSelectedSubModule(m);
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
            {selectedSubModule.sections.map(
              (section: SectionConfig, index: number) => {
                return <Tab key={index}>{section.label}</Tab>;
              }
            )}
          </TabList>

          <TabPanels>
            {selectedSubModule.sections.map(
              (section: SectionConfig, index: number) => {
                return (
                  <TabPanel key={index}>
                    <Form
                      id="cForm"
                      // @ts-ignore
                      ref={(form) => {
                        configForms.push(form);
                      }}
                      onSubmit={onSubmit}
                      schema={section.schema}
                      uiSchema={section.uischema}
                      ObjectFieldTemplate={ObjectFieldTemplate}
                      FieldTemplate={CustomFieldTemplate}
                    >
                      <Box my={4}>
                        <Button variant={'outline'} color={'primary.100'} type="submit">Save</Button>
                        <Button variant={'outline'} type="button">Cancel</Button>
                      </Box>
                    </Form>
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

import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";

import { FaInfoCircle } from "react-icons/fa";
import { Form } from "@rjsf/chakra-ui";

import { useParams } from "react-router-dom";

import * as _ from "lodash";

import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  fetchConfigData,
  fetchConfigSchema,
  saveConfigData,
} from "../../services/ConfigService";

const ObjectFieldTemplate = (props: any) => {
  return (
    <div>
      {props.title && (
        <Heading
          m={1}
          display={"flex"}
          as="h4"
          size="sm"
          backgroundColor="primary.900"
        >
          <Box m={2} flex={1}>
            {props.title}
          </Box>
        </Heading>
      )}
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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigEditor moduleId={moduleId}></ConfigEditor>
    </QueryClientProvider>
  );
};
const ConfigEditor = ({ moduleId }: any) => {
  const [config, setConfig] = useState({
    name: "",
    label: "",
    subModules: [],
  });

  const [selectedSubModule, setSelectedSubModule] = useState<SubModuleConfig>(
    config["subModules"][0]
  );
  const [formData, setFormData] = useState({});

  const toast = useToast();

  useEffect(() => {
    fetchConfigSchema(moduleId).then((res) => {
      console.log(res);
      let configSchema: any = JSON.parse(res.data[0]["formSchema"]);
      setConfig(configSchema);
      setSelectedSubModule(configSchema["subModules"][0]);
      fetchConfigData(moduleId).then((res) => {
        let flatKV = _.reduce(
          res.data,
          (result: any, element, index) => {
            try {
              if (_.isArray(element.value)) {
                result[element.key] = element.value;
              } else {
                result[element.key] = JSON.parse(element.value);
              }
              return result;
            } catch (error) {
              console.log(error);
              result[element.key] = element.value;
              return result;
            }
          },
          {}
        );
        const postData = unflatten(flatKV);
        setFormData(postData);
      });
    });
  }, [moduleId]);

  const { t } = useTranslation("configui");

  //TODO: move this to utils
  const flatten = (obj: any = {}, res: any = {}, extraKey = "") => {
    console.log(extraKey);
    console.log(obj);
    for (let key in obj) {
      console.log(key);
      console.log(typeof obj[key]);
      if (typeof obj[key] !== "object" || _.isArray(obj[key])) {
        res[extraKey + key] = obj[key];
      } else {
        console.log("flattenJSON");
        flatten(obj[key], res, `${extraKey}${key}.`);
      }
    }
    return res;
  };
  //TODO: move this to utils
  const unflatten = (mapData: any) => {
    let result = {};
    for (const key of Object.keys(mapData)) {
      const value = mapData[key];
      let prefixes = key.split(".");
      prefixes = prefixes.reverse();
      let obj: any;
      for (const p of prefixes) {
        if (obj === undefined) {
          obj = {};
          obj[p] = value;
        } else {
          let newObj: any = {};
          newObj[p] = obj;
          obj = newObj;
        }
      }
      result = _.merge(result, obj);
    }
    return result;
  };

  let configForms: any[] = [];
  const onSubmit = (form: any) => {
    let formDataObject = form.formData;
    let flatData = flatten(formDataObject);
    saveConfigData(moduleId, flatData).then((res) => {
      setFormData(formDataObject);
      toast({
        position: "bottom",
        render: () => (
          <Box color="white" p={3} bg="green.500">
            Configuration saved successfully.
          </Box>
        ),
      });
    });
    return;
  };

  return (
    <Box marginX={4}>
      <Flex direction={"row"}>
        <Heading as="h4" size="md">
          {config.label} <Icon as={FaInfoCircle} />
        </Heading>
        <Spacer></Spacer>
      </Flex>
      {config["subModules"].length > 1 && (
        <Box marginY={4} p={0}>
          {config["subModules"].map((m: SubModuleConfig, index: number) => {
            return (
              <Button
                key={index}
                style={{ borderRadius: 0, margin: "0px" }}
                color="primary.100"
                variant="outline"
                onClick={() => {
                  setSelectedSubModule(m);
                }}
              >
                <Link>{m.label}</Link>
              </Button>
            );
          })}
        </Box>
      )}
      <Box>
        <Tabs>
          <TabList>
            {selectedSubModule?.sections.map(
              (section: SectionConfig, index: number) => {
                return <Tab key={index}>{section.label}</Tab>;
              }
            )}
          </TabList>

          <TabPanels>
            {selectedSubModule?.sections.map(
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
                      formData={formData}
                      ObjectFieldTemplate={ObjectFieldTemplate}
                      FieldTemplate={CustomFieldTemplate}
                    >
                      <Box my={4}>
                        <Button
                          variant={"outline"}
                          color={"primary.100"}
                          type="submit"
                        >
                          Save
                        </Button>
                        <Button variant={"outline"} type="button">
                          Cancel
                        </Button>
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

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
} from "@chakra-ui/react";

import { FaInfoCircle } from "react-icons/fa";
import { Form } from "@rjsf/chakra-ui";
import attendanceConfigSchema from "../../services/Attendance/attendance-config-schema.json";

import { useParams } from "react-router-dom";

import * as _ from "lodash";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
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
          <Box p={2}>{props.title}</Box>
        </Heading>
      )}
      <Box>
        {props.properties.map((element: any, index: number) => (
          <Box marginBottom={"20px"}>
            <div
              key={index}
              className="property-wrapper"
              style={{
                backgroundColor: "#ffffff",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
                padding: "10px 10px 5px 10px",
              }}
            >
              {element.content}
            </div>
          </Box>
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
  //TODO: load the config schema fromendpoiint for the moduleId
  console.log(moduleId);
  const config: any = attendanceConfigSchema;
  const { isLoading, error, data } = useQuery(
    ["configData", { moduleId }],
    (moduleId) => {
      return fetchConfigData(moduleId).then((res) => {
        let flatKV = _.reduce(
          res.data,
          (result: any, element, index) => {
            try {
              result[element.key] = JSON.parse(element.value);
              return result;
            } catch (error) {
              return "";
            }
          },
          {}
        );
        console.log(unflatten(flatKV));
        setFormData(unflatten(flatKV));

        //TODO: tansform response into json object hierarchy for json form
        //setFormData(data)
      });
    },
    { retry: false }
  );

  const [selectedSubModule, setSelectedSubModule] = useState<SubModuleConfig>(
    config["subModules"][0]
  );

  // TODO: remove default values from here and move to on query response
  const [formData, setFormData] = useState({});

  const { t } = useTranslation("configui");

  //TODO: move this to utils
  const flatten = (obj: any, prefix: string[] = [], current: any = {}) => {
    if (typeof obj === "object" && obj !== null) {
      for (const key of Object.keys(obj)) {
        if (Array.isArray(obj[key])) {
          prefix = prefix.concat(key);
          current[prefix.join(".")] = obj[key];
        } else {
          flatten(obj[key], prefix.concat(key), current);
        }
      }
    } else {
      current[prefix.join(".")] = obj;
    }
    return current;
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
    console.log("Data submitted: ", form);
    let formDataObject = form.formData;
    let flatData = flatten(formDataObject);
    saveConfigData(moduleId, flatData);
    //TODO: refetch data
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
      {isLoading ? (
        <Flex direction={"row"}>
          <Heading as="h5" size="sm">
            Loading...
          </Heading>
          <Spacer></Spacer>
        </Flex>
      ) : (
        <></>
      )}
      {error ? (
        <Flex direction={"row"}>
          <Heading as="h5" size="sm">
            {error instanceof Error ? error.message : "Error"}
          </Heading>
          <Spacer></Spacer>
        </Flex>
      ) : (
        <></>
      )}
      <Box marginY={4} p={0}>
        {config["subModules"].map((m: SubModuleConfig, index: number) => {
          return (
            <Button
              key={index}
              style={{ borderRadius: "5px", margin: "0px" }}
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

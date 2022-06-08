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

import * as _ from "lodash";

import attendanceConfigSchema from "../../services/Attendance/attendance-config-schema.json";
import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "react-query";
import { fetchConfigData, saveConfigData } from "../../services/ConfigService";

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
      return fetchConfigData(moduleId);
      //TODO: tansform response into json object hierarchy for json form
      //setFormData(data)
    },
    { retry: false }
  );

  const mutation = useMutation(
    (configData) => {
      console.log(configData);
      return saveConfigData(configData);
      //return Promise.resolve(configData);
    },
    {
      onSuccess: (data, variable, context) => {
        console.log(data);
        //TODO: prompt success and rerender form
      },
      onError: (error) => {
        console.log(error);
        //TODO: prompt error
      },
    }
  );

  const [selectedSubModule, setSelectedSubModule] = useState<SubModuleConfig>(
    config["subModules"][0]
  );

  // TODO: remove default values from here and move to on query response
  const [formData, setFormData] = useState({
    attendance: {
      default_attendance_states: ["present", "absent"],
    },
    attendance_card: {
      order_of_attendance_card: "roll_number",
    },
  });

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
    let lookupTbl = {};
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
    mutation.mutate(flatData);
    return true;
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

import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import { FaInfoCircle } from "react-icons/fa";

const ConfigEditorPage = () => {
  const { t } = useTranslation("configui");

  return (
    <Box marginX={4}>
      <Heading as="h4" size="md">
        Attendance <Icon as={FaInfoCircle} />
      </Heading>
      <Box marginY={4} p={0}>
        <Button
          style={{ borderRadius: 0, margin: "0px" }}
          color="primary.100"
          variant="outline"
        >
          Student Attendance
        </Button>
        <Button style={{ borderRadius: 0, margin: "0px" }} variant="outline">
          Staff Attendance
        </Button>
      </Box>
      <Box>
        <Tabs>
          <TabList>
            <Tab>Markinng Attendance</Tab>
            <Tab>Reports</Tab>
            <Tab>Communication</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>Markinng Attendance Configuration</TabPanel>
            <TabPanel>Reports Configuration</TabPanel>
            <TabPanel>Communication Configuration</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
export default ConfigEditorPage as React.FC;

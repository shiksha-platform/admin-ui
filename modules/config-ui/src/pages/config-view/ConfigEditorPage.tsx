import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/button"
import { Box, Center, Flex, Heading, Icon, Spacer, Square, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import {
  Container,
  FormControl,
  FormLabel,
  Code,
  Link,
  FormErrorMessage
} from "@chakra-ui/react";
import {
  Select,
  CreatableSelect,
  AsyncSelect,
  OptionBase,
  GroupBase
} from "chakra-react-select";

interface AttendanceState extends OptionBase {
  label: string;
  value: string;
}
interface AttendanceTag extends OptionBase {
  label: string;
  value: string;
}

const attendanceStates: AttendanceState[]= [
  { value: "0", label: "Absent" },
  { value: "1", label: "Present" },
];
const attendanceTags: AttendanceTag[]= [
  { value: "0", label: "Special Duty" },
  { value: "1", label: "Govt Duty" },
];

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { FaInfoCircle } from 'react-icons/fa'


const ConfigEditorPage = () => {
  const { t } = useTranslation("configui");
  return <Box marginX={4}>
<Heading  as='h4' size='md'>Attendance <Icon as={FaInfoCircle} /></Heading>
<Box marginY={4}  p={0}>
  <Button style={{borderRadius:0, margin:'0px'}} color="primary.100" variant="outline">Student Attendance</Button>
  <Button style={{borderRadius:0, margin:'0px'}} variant="outline">Staff Attendance</Button>
</Box>
<Box>
<Tabs>
  <TabList>
    <Tab>Markinng Attendance</Tab>
    <Tab>Reports</Tab>
    <Tab>Communication</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      
<Accordion  defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <Box as="h2"  backgroundColor="primary.900">
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          Attendance
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </Box>
    <AccordionPanel p={0} pb={4} >
    <Flex p={0} mb={8} direction='column' >
    <Flex p={0}>
    <FormControl p={4}>
      <FormLabel>
        Available  States
      </FormLabel>
      <Select<AttendanceState, true, GroupBase<AttendanceState>>
        isMulti
        options={attendanceStates}
        placeholder="Select available  states..."
        closeMenuOnSelect={false}
        selectedOptionStyle="check"
        hideSelectedOptions={false}
      />
    </FormControl>
    <FormControl p={4}>
      <FormLabel>
        Default States
      </FormLabel>
      <Select<AttendanceState, true, GroupBase<AttendanceState>>
        options={attendanceStates}
        placeholder="Select available  states..."
        closeMenuOnSelect={false}
        selectedOptionStyle="check"
        hideSelectedOptions={false}
      />
    </FormControl>
    </Flex>
    <Flex>
    <FormControl p={4} w={'50%'}>
      <FormLabel>
        Available Tags
      </FormLabel>
      <Select<AttendanceTag, true, GroupBase<AttendanceTag>>
        isMulti
        options={attendanceTags}
        placeholder="Select available tags..."
        closeMenuOnSelect={false}
        selectedOptionStyle="check"
        hideSelectedOptions={false}
      />
    </FormControl>
    <Spacer />
    </Flex>

    </Flex>


    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
  <Box as="h2"  backgroundColor="primary.900">
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          Details Shown in Attendance Card
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </Box>
    <AccordionPanel pb={4}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>
</Accordion>


    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
</Box>

  </Box>;
};
export default ConfigEditorPage as React.FC;

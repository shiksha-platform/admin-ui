import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  Spacer,
  Input,
  FormLabel,
  Select,
  VStack,
  HStack,
  FormControl,
  Switch,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { FaInfoCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import * as _ from "lodash";

import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { createAnnouncement } from "../services/AnnouncementService";

const CreateAnnouncement = () => {
  const { t } = useTranslation("configui");
  const [data, setData] = useState();
  const [isPinned, setIsPinned] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = (data: any) => {
    setData(data);
    createAnnouncement(data);
  };

  return (
    <Box marginX={4}>
      <Flex direction={"row"}>
        <Heading as="h4" size="md">
          Create Announcement
        </Heading>
        <Spacer></Spacer>
      </Flex>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack mt="2" p="3">
            <Input
              mt="2"
              placeholder="Announcement title"
              id="title"
              type="text"
              {...register("title")}
            />

            <Select
              placeholder="Select announcement type"
              {...register("announcementType")}
            >
              <option value="event">Event</option>
              <option value="general">General</option>
            </Select>

            <Flex justify="space-between" width="100%">
              <FormControl>
                <FormLabel>Pinned announcement</FormLabel>
                <Switch
                  id="isPinned"
                  defaultChecked={isPinned}
                  {...register("isPinned")}
                  onChange={(e: any) => setIsPinned(e.target.checked)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Dismissable</FormLabel>
                <Switch
                  id="isDismissable"
                  defaultChecked={false}
                  isDisabled={!isPinned}
                  {...register("isDismissable")}
                />
              </FormControl>
            </Flex>
            <Textarea
              isDisabled={isPinned}
              placeholder="Data for announcement"
              {...register("data")}
            />
          </VStack>
          <HStack my={4} spacing="2">
            <Button variant={"outline"} color="primary.100" type="submit">
              Save
            </Button>
            <NavLink to={`/allannouncements`}>
              <Button variant={"outline"} type="button">
                Cancel
              </Button>
            </NavLink>
          </HStack>
        </form>
      </Box>
    </Box>
  );
};
export default CreateAnnouncement as React.FC;

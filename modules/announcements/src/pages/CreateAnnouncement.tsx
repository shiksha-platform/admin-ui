import { useTranslation } from "react-i18next";
import {
  Box,
  Divider,
  Flex,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import React, { useState, RefObject } from "react";
import { createAnnouncement } from "../services/AnnouncementService";
import AnnouncementForm from "../components/AnnouncementForm";
import SubmitDialog from "../components/SubmitDialog";

const CreateAnnouncement = () => {
  const { t } = useTranslation("announcements");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const cancelRef = React.useRef() as RefObject<any>;
  const toast = useToast();
  const onFormSubmit = (values: any) => {
    onOpen();
    createAnnouncement(values)
      .then((res: any) => {
        toast({
          title: t("ANNOUNCEMENT_CREATE_SUCCESS"),
          status: "success",
          position: "bottom",
        });
      })
      .catch((err: any) => {
        toast({
          title: `${t("ANNOUNCEMENT_CREATE_ERROR")}:${err.message}`,
          status: "error",
          position: "bottom",
        });
      })
      .finally(() => navigate(`/announcements`));
  };

  return (
    <Box marginX={4}>
      <Flex direction={"row"}>
        <Heading as="h4" size="md" mb="2">
          {t("CREATE_ANNOUNCEMENT")}
        </Heading>
      </Flex>
      <Divider></Divider>
      <SubmitDialog
        onClose={onClose}
        isOpen={isOpen}
        cancelRef={cancelRef}
      ></SubmitDialog>

      <AnnouncementForm
        initialData={{}}
        onFormSubmit={onFormSubmit}
      ></AnnouncementForm>
    </Box>
  );
};
export default CreateAnnouncement as React.FC;

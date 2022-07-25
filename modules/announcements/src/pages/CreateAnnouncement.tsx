import { useTranslation } from "react-i18next";
import { Box, Divider, Flex, Heading, useDisclosure } from "@chakra-ui/react";

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

  const onFormSubmit = (values: any) => {
    onOpen();
    createAnnouncement(values)
      .then((res: any) => {
        console.log("Created announcement");
      })
      .catch((err: any) => {
        alert(err.message);
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

      <AnnouncementForm onFormSubmit={onFormSubmit}></AnnouncementForm>
    </Box>
  );
};
export default CreateAnnouncement as React.FC;

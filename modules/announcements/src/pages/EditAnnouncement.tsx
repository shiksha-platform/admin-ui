import { useTranslation } from "react-i18next";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import * as _ from "lodash";
import React, { useState, useEffect, RefObject } from "react";

import {
  fetchAnnouncement,
  updateAnnouncement,
} from "../services/AnnouncementService";
import AnnouncementForm from "../components/AnnouncementForm";
import SubmitDialog from "../components/SubmitDialog";

const EditAnnouncement = () => {
  const { t } = useTranslation("announcements");
  const [initialData, setInitialData] = useState<any>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { announcementId } = useParams();
  const navigate = useNavigate();
  const cancelRef = React.useRef() as RefObject<any>;
  const location = useLocation();
  const toast = useToast();

  const setUpdatedData = (formData: any) => {
    formData["dateModified"] = new Date().toISOString();
    formData["announcementId"] = initialData.announcementId;
    return formData;
  };

  const onFormSubmit = (values: any) => {
    onOpen();
    updateAnnouncement(setUpdatedData(values))
      .then((res: any) => {
        toast({
          title: t("ANNOUNCEMENT_EDIT_SUCCESS"),
          status: "success",
          position: "bottom",
        });
      })
      .catch((err: any) => {
        toast({
          title: `${t("ANNOUNCEMENT_EDIT_ERROR")}:${err.message}`,
          status: "error",
          position: "bottom",
        });
      })
      .finally(() => navigate(`/announcements`));
  };

  const initialiseData = async () => {
    let res: any;
    if (!location.state) {
      const apiData = await fetchAnnouncement(announcementId);
      res = apiData.data[0];
    } else {
      res = location.state;
    }
    setInitialData({
      ...initialData,
      ...res,
    });
  };

  useEffect(() => {
    initialiseData();
  }, []);

  return (
    <Box marginX={4}>
      <Flex direction={"row"}>
        <Heading as="h4" size="md" mb="2">
          {t("EDIT_ANNOUNCEMENT")}
        </Heading>
      </Flex>
      <Divider></Divider>
      <SubmitDialog
        onClose={onClose}
        isOpen={isOpen}
        cancelRef={cancelRef}
      ></SubmitDialog>
      {!_.isEmpty(initialData) ? (
        <AnnouncementForm
          initialData={initialData}
          onFormSubmit={onFormSubmit}
        ></AnnouncementForm>
      ) : (
        <Spinner
          mt="4"
          thickness="5px"
          speed="0.45s"
          emptyColor="gray.200"
          color="primary.100"
          size="xl"
          label="Loading data..."
        />
      )}
    </Box>
  );
};
export default EditAnnouncement as React.FC;

import { useTranslation } from "react-i18next";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import * as _ from "lodash";
import React, { useState, useEffect } from "react";
import ContentPageForm from "../components/ContentPageForm";
import {
  fetchContentPageData,
  updateContentPage,
} from "../services/ContentPagesService";

const EditContentPage = () => {
  const { t } = useTranslation("contentPages");
  const toast = useToast();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<any>({});
  const { slug } = useParams();

  const formSubmitHandler = (formData: any) => {
    console.log(formData);
    formData["contentPageId"] = initialData?.contentPageId;
    updateContentPage(formData, initialData?.contentPageId)
      .then((res: any) => {
        toast({
          title: t("CONTENT_PAGE_EDIT_SUCCESS"),
          position: "bottom",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err: any) =>
        toast({
          title: t("CONTENT_PAGE_EDIT_ERROR"),
          position: "bottom",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      )
      .finally(() => navigate(`/`));
  };

  const initialiseData = () => {
    fetchContentPageData(slug).then((res: any) => {
      delete res["dateModified"];
      delete res["contentPageId"];
      setInitialData(res);
    });
  };
  useEffect(() => initialiseData(), []);
  return (
    <Box marginX={4}>
      <Flex direction={"row"}>
        <Heading as="h4" size="md" mb="2">
          {t("EDIT_CONTENT_PAGE")}
        </Heading>
      </Flex>
      <Divider></Divider>
      {!_.isEmpty(initialData) ? (
        <ContentPageForm
          initialData={initialData}
          formSubmitHandler={formSubmitHandler}
        ></ContentPageForm>
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
export default EditContentPage as React.FC;

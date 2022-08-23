import { useTranslation } from "react-i18next";
import { Box, Divider, Flex, Heading, useToast } from "@chakra-ui/react";
import * as _ from "lodash";
import React from "react";
import ContentPageForm from "../components/ContentPageForm";
import { createContentPage } from "../services/ContentPagesService";

const CreateContentPage = () => {
  const { t } = useTranslation("contentPages");
  const toast = useToast();
  const formSubmitHandler = (formData: any) => {
    createContentPage(formData)
      .then((res: any) => {
        toast({
          title: t("CONTENT_PAGE_CREATE_SUCCESS"),
          status: "success",
          position: "bottom",
        });
      })
      .catch((err: any) => {
        toast({
          title: `${t("CONTENT_PAGE_CREATE_ERROR")}:${err.message}`,
          status: "error",
          position: "bottom",
        });
      });
  };
  return (
    <Box marginX={4}>
      <Flex direction={"row"}>
        <Heading as="h4" size="md" mb="2">
          {t("CREATE_CONTENT_PAGE")}
        </Heading>
      </Flex>
      <Divider></Divider>
      <ContentPageForm formSubmitHandler={formSubmitHandler}></ContentPageForm>
    </Box>
  );
};
export default CreateContentPage as React.FC;

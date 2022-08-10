import { useTranslation } from "react-i18next";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import * as _ from "lodash";
import React, { useState, useEffect, RefObject } from "react";
import ContentPageForm from "../components/ContentPageForm";
import { createContentPage } from "../services/ContentPagesService";

const CreateContentPage = () => {
  const { t } = useTranslation("configui");
  const formSubmitHandler = (formData: any) => {
    console.log(formData);
    formData["status"] = "published";
    formData["author"] = "principal";
    createContentPage(formData).then((res: any) => console.log(res));
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

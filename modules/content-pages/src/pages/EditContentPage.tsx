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

const EditContentPage = () => {
  const { t } = useTranslation("configui");
  const initialData={
    "blocks": [
      {
        "blockType": "image",
        "blockData":{
            "imgSrc": "https://i.picsum.photos/id/1018/300/200.jpg?hmac=7zbk4w0X7mlStuBLB7ZOuCyvzKkZkcOOvpE353yHcwE",
            "imageCaption": "Sample image of hill"
        }
      },
      {
        "blockType": "collapsible",
        "blockData":{
            "collapsibleHeader": "Collapsible heading",
            "collapsibleContent": "Collapsible content"
        }
      },
      {
        "blockType": "richtext",
        "blockData": {
          "richtextData":
          "{\"blocks\":[{\"key\":\"9dni5\",\"text\":\"Richtext block for testing purposes\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":19,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}"
        }
      }
    ],
    "title": "Sample content page for testing",
    "urlSlug": "sample-content-page-for-testing"
  }
  return (
    <Box marginX={4}>
      <Flex direction={"row"}>
        <Heading as="h4" size="md" mb="2">
          {t("EDIT_CONTENT_PAGE")}
        </Heading>
      </Flex>
      <Divider></Divider>
      {!_.isEmpty(initialData) ? (
        <ContentPageForm initialData={initialData}></ContentPageForm>
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

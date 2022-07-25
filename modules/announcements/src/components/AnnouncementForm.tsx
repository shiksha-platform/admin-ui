import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/button";
import {
  Flex,
  Input,
  FormLabel,
  Select,
  HStack,
  FormControl,
  Switch,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
  Textarea,
} from "@chakra-ui/react";

import { Field, Form, Formik } from "formik";
import { NavLink } from "react-router-dom";

import * as _ from "lodash";

import React from "react";

const defaultAnnouncementData: any = {
  title: "",
  announcementType: "general",
  isPinned: false,
  pinnedAnnouncementProperties: {},
  data: "",
  additionalTags: [],
  status: "draft",
  author: "",
};

//convert form data in the required exchange format
const convertToDTO = (data: any) => {
  const updatedData: any = {};
  for (let k in defaultAnnouncementData) {
    if (data[k]) updatedData[k] = data[k];
    else updatedData[k] = defaultAnnouncementData[k];
  }
  return updatedData;
};

const AnnouncementForm: React.FC<any> = ({
  initialData = {},
  onFormSubmit,
}: any) => {
  const { t } = useTranslation("announcements");
  return (
    <Formik
      enableReinitialize
      initialValues={{ ...convertToDTO(initialData), additionalTagsInput: "" }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        onFormSubmit(convertToDTO(values));
      }}
    >
      {(props) => (
        <Form
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter")
              e.preventDefault();
          }}
        >
          <Stack spacing="6" p="5">
            <FormControl isRequired>
              <FormLabel htmlFor="title">{t("TITLE")}</FormLabel>
              <Field
                as={Input}
                name="title"
                isInvalid={!!props.errors.title && props.touched.title}
                validate={(value: any) => {
                  let error;
                  if (value.length === 0) {
                    error = "Title must not be empty";
                  }
                  return error;
                }}
              ></Field>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="author">{t("AUTHOR")}</FormLabel>
              <Field
                as={Input}
                name="author"
                isInvalid={!!props.errors.author && props.touched.author}
                validate={(value: any) => {
                  let error;
                  if (value.length === 0) {
                    error = "Author must not be empty";
                  }
                  return error;
                }}
              ></Field>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="announcementType">
                {t("ANNOUNCEMENT_TYPE")}
              </FormLabel>
              <Field as={Select} name="announcementType">
                <option value="event">{t("EVENT")}</option>
                <option value="general">{t("GENERAL")}</option>
              </Field>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="data">{t("ANNOUNCEMENT_DATA")}</FormLabel>
              <Field as={Textarea} name="data"></Field>
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="isPinned">
                {t("SET_ANNOUNCEMENT_AS_PINNED")}
              </FormLabel>
              <Field
                as={Switch}
                name="isPinned"
                isChecked={props.values.isPinned}
              ></Field>
            </FormControl>
            <FormControl
              alignItems="center"
              display={props.values.isPinned === true ? "flex" : "none"}
            >
              <FormLabel htmlFor="pinnedAnnouncementProperties.isDismissable">
                {t("SET_PINNED_ANNOUNCEMENT_AS_DISMISSABLE")}
              </FormLabel>
              <Field
                as={Switch}
                name="pinnedAnnouncementProperties.isDismissable"
                isChecked={
                  props.values.pinnedAnnouncementProperties.isDismissable
                }
              ></Field>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="additionalTagsInput">
                {t("ADDITIONAL_TAGS")}
              </FormLabel>
              <Field
                as={Input}
                name="additionalTagsInput"
                placeholder={t("ADDITIONAL_TAG_PLACEHOLDER")}
                onKeyDown={(e: any) => {
                  if (e.code === "Enter" || e.code === "NumpadEnter") {
                    const tagVal = props.getFieldMeta(
                      "additionalTagsInput"
                    ).value;
                    if (tagVal === "") return;
                    const data = [
                      ...(props.getFieldMeta("additionalTags")
                        .value as Array<string>),
                      tagVal,
                    ];
                    props.setFieldValue("additionalTags", data);
                    props.setFieldValue("additionalTagsInput", "");
                  }
                }}
              ></Field>
              <Flex mt="2" wrap="wrap">
                {(
                  props.getFieldMeta("additionalTags").value as Array<string>
                ).map((tag: any, index: number) => (
                  <Tag
                    key={index}
                    borderRadius="full"
                    variant="outline"
                    colorScheme="orange"
                    px="2"
                    mr="2"
                    mt="2"
                  >
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton
                      onClick={() => {
                        const data = (
                          props.getFieldMeta("additionalTags")
                            .value as Array<string>
                        ).filter((item: any, idx: number) => idx !== index);
                        props.setFieldValue("additionalTags", data);
                      }}
                    />
                  </Tag>
                ))}
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="status">{t("STATUS")}</FormLabel>
              <Field as={Select} name="status">
                <option value="draft">{t("DRAFT")}</option>
                <option value="published">{t("PUBLISHED")}</option>
              </Field>
            </FormControl>
          </Stack>
          <HStack spacing="2">
            <Button
              mt="5"
              type="submit"
              variant={"outline"}
              color={"primary.100"}
              isLoading={props.isSubmitting === true}
            >
              {t("SUBMIT")}
            </Button>
            <NavLink to="/announcements">
              <Button mt="5" variant="outline">
                {t("CANCEL")}
              </Button>
            </NavLink>
          </HStack>
        </Form>
      )}
    </Formik>
  );
};
export default AnnouncementForm;

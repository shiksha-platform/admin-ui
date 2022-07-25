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
  const { t } = useTranslation("configui");
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
              <FormLabel htmlFor="title">Title</FormLabel>
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
              <FormLabel htmlFor="author">Author</FormLabel>
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
                Announcement Type
              </FormLabel>
              <Field as={Select} name="announcementType">
                <option value="event">Event</option>
                <option value="general">General</option>
              </Field>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="data">Announcement data</FormLabel>
              <Field as={Textarea} name="data"></Field>
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="isPinned">
                Set announcement as pinned
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
                Set pinned announcement as dismissable
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
                Additional tags
              </FormLabel>
              <Field
                as={Input}
                name="additionalTagsInput"
                placeholder="type additional tag and hit 'Enter' key"
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
              <FormLabel htmlFor="status">Announcement Status</FormLabel>
              <Field as={Select} name="status">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
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
              Submit
            </Button>
            <NavLink to="/announcements">
              <Button mt="5" variant="outline">
                Cancel
              </Button>
            </NavLink>
          </HStack>
        </Form>
      )}
    </Formik>
  );
};
export default AnnouncementForm;

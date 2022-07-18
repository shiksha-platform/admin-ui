import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Divider,
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
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { Field, Form, Formik } from "formik";
import { FaInfoCircle } from "react-icons/fa";
import { useParams, useLocation, NavLink, useNavigate } from "react-router-dom";

import * as _ from "lodash";

import React, { useState, useEffect, SyntheticEvent } from "react";

import { useForm } from "react-hook-form";
import {
  fetchAnnouncement,
  updateAnnouncement,
} from "../services/AnnouncementService";

//TO-DO: Add validation, draft, author
const EditAnnouncement = () => {
  const { t } = useTranslation("configui");
  const [data, setData] = useState();
  const [initialData, setInitialData] = useState<any>({});
  const navigate = useNavigate();
  const [isPinned, setIsPinned] = useState(false);
  const { announcementId } = useParams();
  const location = useLocation();
  const setUpdatedData = (formData: any) => {
    const updatedData: any = {};
    for (let k in initialData) {
      if (formData[k]) updatedData[k] = formData[k];
      else updatedData[k] = initialData[k];
    }
    updatedData["dateModified"] = new Date().toISOString();
    return updatedData;
  };

  const getAns = async () => {
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
    getAns();
  }, [initialData]);

  return (
    <Box marginX={4}>
      <Flex direction={"row"}>
        <Heading as="h4" size="md" mb="6">
          Edit Announcement
        </Heading>
      </Flex>
      <Formik
        enableReinitialize
        initialValues={{
          title: initialData?.title ?? "",
          announcementType: initialData?.announcementType ?? "general",
          isPinned: initialData?.isPinned ?? false,
          pinnedAnnouncementProperties:
            initialData?.pinnedAnnouncementProperties ?? {},
          data: initialData?.data ?? "",
          additionalTags: initialData?.additionalTags ?? [],
          additionalTagsInput: "",
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          //TO-DO: Add more robust error handling + toast
          updateAnnouncement(setUpdatedData(values))
            .then((res: any) => {
              if (res.statusCode === 200) alert("Data updated successfully");
              else alert("Error updating data!");
              navigate(`/allannouncements`);
            })
            .catch((err: any) => {
              alert(err.message);
              navigate(`/allannouncements`);
            });
        }}
      >
        {(props) => (
          <Form
            onKeyDown={(e) => {
              if (e.code === "Enter" || e.code === "NumpadEnter")
                e.preventDefault();
            }}
          >
            <Stack
              spacing="6"
              overflowY={"scroll"}
              height="60vh"
              p="5"
              rounded={"8"}
              border="1px"
              borderColor="gray.100"
            >
              <FormControl>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Field as={Input} name="title"></Field>
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
                      const data = [
                        ...(props.getFieldMeta("additionalTags")
                          .value as Array<string>),
                        props.getFieldMeta("additionalTagsInput").value,
                      ];
                      /* props.values.additionalTags.push(
                        props.values.additionalTagsInput
                      ); */
                      props.setFieldValue("additionalTags", data);
                      props.setFieldValue("additionalTagsInput", "");
                    }
                  }}
                ></Field>
                {/* TO-DO: See if it is better to use state insteaf of formik field value */}
                <Flex mt="2" wrap="wrap">
                  {(
                    props.getFieldMeta("additionalTags").value as Array<string>
                  ).map((tag: any, index: number) => (
                    <Tag
                      key={index}
                      borderRadius="full"
                      variant="solid"
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
            </Stack>
            <HStack spacing="2">
              <Button mt="5" colorScheme="teal" type="submit">
                Submit
              </Button>
              <NavLink to="/allannouncements">
                <Button mt="5" colorScheme="teal" variant="outline">
                  Cancel
                </Button>
              </NavLink>
            </HStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default EditAnnouncement as React.FC;

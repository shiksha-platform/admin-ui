import { Button } from "@chakra-ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Divider,
  TableContainer,
  Table,
  Text,
  Thead,
  Tbody,
  Td,
  Th,
  Tooltip,
  Tr,
} from "@chakra-ui/react";

import { FaEdit, FaTrash } from "react-icons/fa";
import * as _ from "lodash";

import React, { useState, useEffect } from "react";

import {
  deleteAnnouncement,
  fetchAnnouncements,
} from "../services/AnnouncementService";

const ViewAnnouncements = ({ toast }: any) => {
  const [announcementsData, setAnnouncementsData] = useState<any>();
  const navigate = useNavigate();

  const initialiseValues = () => {
    //TO-DO: Add error handling
    const res = fetchAnnouncements().then((res: any) =>
      setAnnouncementsData(res.data)
    );
  };

  useEffect(() => {
    initialiseValues();
  }, []);

  const deleteAnnouncementById = (id: any) => {
    const shouldDelete = window.confirm(
      "Do you want to delete the announcement?"
    );
    if (shouldDelete) deleteAnnouncement(id);
  };

  return (
    <Box marginX={4}>
      <Flex direction={"row"} mb="2">
        <Heading as="h4" size="md">
          View Announcements
        </Heading>
      </Flex>
      <Divider></Divider>
      <Flex width="100%" justifyContent={"flex-end"}>
        <NavLink to={`/create`}>
          <Button size="sm" mt="5" mb="3" colorScheme="green">
            + New Announcement
          </Button>
        </NavLink>
      </Flex>
      <Box mt="5">
        <TableContainer h={"70vh"} overflowY={"scroll"}>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Date Modified</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {announcementsData?.map((val: any, index: number) => {
                console.log(val);
                return (
                  <Tr key={index}>
                    <Td
                      w="30vw"
                      textOverflow="ellipsis"
                      overflow={"hidden"}
                      cursor="pointer"
                    >
                      <a
                        onClick={() =>
                          navigate(`/announcement/${val.announcementId}`, {
                            state: val,
                          })
                        }
                      >
                        {val.title}
                      </a>
                    </Td>
                    <Td>
                      {new Date(val.dateModified).toLocaleString("en-IN")}
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={
                          val.status === "draft"
                            ? "red"
                            : val.status === "published"
                            ? "green"
                            : "default"
                        }
                      >
                        <Text casing="capitalize">{val.status}</Text>
                      </Badge>
                    </Td>
                    <Td>
                      <HStack alignItems={"center"} justifyContent="flex-start">
                        <Tooltip label="Edit announcement">
                          <IconButton
                            icon={<FaEdit />}
                            aria-label={"Edit announcement"}
                            variant="ghost"
                            onClick={() =>
                              navigate(`/announcement/${val.announcementId}`, {
                                state: val,
                              })
                            }
                          />
                        </Tooltip>

                        <Tooltip label="Delete announcement">
                          <IconButton
                            icon={<FaTrash />}
                            variant="ghost"
                            aria-label={"Delete announcement"}
                            onClick={() =>
                              deleteAnnouncementById(val.announcementId)
                            }
                          />
                        </Tooltip>
                      </HStack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
export default ViewAnnouncements as React.FC;

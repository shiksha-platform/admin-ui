import { Button } from "@chakra-ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Divider,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Skeleton,
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

import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import * as _ from "lodash";

import React, { useState, useEffect } from "react";

import {
  deleteAnnouncement,
  fetchAnnouncements,
} from "../services/AnnouncementService";
import { useTranslation } from "react-i18next";

const PAGE_SIZE = 3;

const ViewAnnouncements = () => {
  const { t } = useTranslation("announcements");
  const [announcementsData, setAnnouncementsData] = useState<any>();
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  //pagination click handler
  const navigateToPage = (pI: number) => {
    //set the current index and initiate skeleton loader
    setPageIndex(pI);
    setIsLoading(true);
    setErrMsg("");

    //fetch announcements from backend
    fetchAnnouncements(pI * PAGE_SIZE, PAGE_SIZE).then(
      (res: any) => {
        setAnnouncementsData(res.data.data);
        setTotalPages(res.data.count);
        setIsLoading(false);
      },
      (rej: any) => {
        setIsLoading(false);
        setErrMsg(rej.message);
        setAnnouncementsData([]);
      }
    );
  };

  useEffect(() => {
    navigateToPage(0);
  }, []);

  return (
    <Box marginX={4}>
      <Flex direction={"row"} mb="2">
        <Heading as="h4" size="md">
          {t("ALL_ANNOUNCEMENTS")}
        </Heading>
      </Flex>
      <Divider></Divider>
      <Flex width="100%" justifyContent={"flex-end"}>
        <NavLink to={`create`}>
          <Button size="sm" mt="5" mb="3" colorScheme="green">
            {t("CREATE_NEW")}
          </Button>
        </NavLink>
      </Flex>
      <Box mt="5" h={"50vh"} overflowY={"auto"}>
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>{t("TITLE")}</Th>
                <Th>{t("DATE_MODIFIED")}</Th>
                <Th>{t("STATUS")}</Th>
                <Th>{t("ACTIONS")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!isLoading
                ? announcementsData?.map((val: any, index: number) => {
                    return (
                      <Tr key={index}>
                        <Td
                          w="30vw"
                          textOverflow="ellipsis"
                          overflow={"hidden"}
                          cursor="pointer"
                          onClick={() =>
                            navigate(
                              `/announcements/edit/${val.announcementId}`,
                              {
                                state: val,
                              }
                            )
                          }
                        >
                          {val.title}
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
                            <Text>{t(val.status.toUpperCase())}</Text>
                          </Badge>
                        </Td>
                        <Td>
                          <HStack
                            alignItems={"center"}
                            justifyContent="flex-start"
                          >
                            <Tooltip label={t("EDIT_ANNOUNCEMENT")}>
                              <IconButton
                                icon={<FaEdit />}
                                aria-label="Edit announcement"
                                variant="ghost"
                                onClick={() =>
                                  navigate(
                                    `/announcements/edit/${val.announcementId}`,
                                    {
                                      state: val,
                                    }
                                  )
                                }
                              />
                            </Tooltip>
                            <Popover>
                              <Tooltip label={t("DELETE_ANNOUNCEMENT")}>
                                <Box display="inline-block">
                                  <PopoverTrigger>
                                    <IconButton
                                      icon={<FaTrash />}
                                      variant="ghost"
                                      aria-label={"Delete announcement"}
                                    />
                                  </PopoverTrigger>
                                </Box>
                              </Tooltip>
                              <Portal>
                                <PopoverContent width="fit-content">
                                  <PopoverArrow />
                                  <PopoverHeader textAlign={"center"}>
                                    {t("CONFIRM_DELETION")}
                                  </PopoverHeader>
                                  <PopoverBody textAlign={"center"}>
                                    <Button
                                      colorScheme="red"
                                      size="sm"
                                      onClick={() => {
                                        deleteAnnouncement(val.announcementId);
                                        setAnnouncementsData(
                                          announcementsData.filter(
                                            (val: any, idx: number) =>
                                              idx !== index
                                          )
                                        );
                                      }}
                                    >
                                      {t("DELETE")}
                                    </Button>
                                  </PopoverBody>
                                </PopoverContent>
                              </Portal>
                            </Popover>
                          </HStack>
                        </Td>
                      </Tr>
                    );
                  })
                : Array.from({ length: PAGE_SIZE }, (val: any, idx: any) => (
                    <Tr key={idx}>
                      <Td colSpan={4}>
                        <Skeleton height="50px"></Skeleton>
                      </Td>
                    </Tr>
                  ))}
            </Tbody>
          </Table>
        </TableContainer>
        {errMsg !== "" ? (
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            mt="3"
            height={"40vh"}
          >
            <AlertIcon boxSize="40px" />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {t("FETCH_ERROR")}
            </AlertTitle>
            <AlertDescription>{errMsg}</AlertDescription>
          </Alert>
        ) : null}
      </Box>

      {/* Pagination */}

      <HStack
        width="100%"
        alignItems="center"
        justifyContent="center"
        spacing="3"
        flexWrap="nowrap"
        mt="3"
      >
        <IconButton
          icon={<FaChevronLeft />}
          aria-label={"Previous page"}
          variant="ghost"
          isDisabled={pageIndex === 0}
          onClick={() => navigateToPage(pageIndex - 1)}
        />
        {Array.from(
          { length: Math.ceil(totalPages / PAGE_SIZE) },
          (v: any, idx: number) => (
            <Button
              key={idx}
              variant={idx == pageIndex ? "solid" : "ghost"}
              onClick={() => navigateToPage(idx)}
            >
              {idx + 1}
            </Button>
          )
        )}
        <IconButton
          icon={<FaChevronRight />}
          aria-label={"Next page"}
          variant="ghost"
          isDisabled={pageIndex >= Math.ceil(totalPages / PAGE_SIZE) - 1}
          onClick={() => navigateToPage(pageIndex + 1)}
        />
      </HStack>
    </Box>
  );
};
export default ViewAnnouncements as React.FC;

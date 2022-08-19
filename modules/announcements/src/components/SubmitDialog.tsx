import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogOverlay,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

const SubmitDialog: React.FC<any> = ({ isOpen, onClose, cancelRef }) => {
  const { t } = useTranslation("announcements");
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      isCentered
      size="md"
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogBody textAlign={"center"}>
            <Stack spacing={"2"} alignItems="center">
              <Spinner
                size="lg"
                emptyColor="gray.200"
                thickness="3px"
                color="primary.100"
              ></Spinner>
              <h4>{t("SUBMITTING_FORM")}</h4>
            </Stack>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
export default SubmitDialog;

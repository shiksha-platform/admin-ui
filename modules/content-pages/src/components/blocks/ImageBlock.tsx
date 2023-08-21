import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as _ from "lodash";
import {
  Flex,
  Icon,
  IconButton,
  VStack,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { FaUpload } from "react-icons/fa";
import { validateImage } from "../../services/utils/FileValidationUtils";

const ImageBlock: React.FC<any> = (props: any) => {
  const toast = useToast();
  const [imgFile, setImgFile] = React.useState();
  const [imgFileUrl, setImgFileUrl] = React.useState(props?.value);
  const [showUploadButton, setsetShowUploadButton] = React.useState(false);
  const [isUploading, setIsuploading] = React.useState(false);
  console.log(props);

  const handleChange = (e: any) => {
    if (e.target.files.length > 0) {
      const fileError = validateImage(e.target.files[0]);
      if (fileError !== "no_error") {
        toast({
          title: `Error`,
          description: fileError,
          position: "bottom",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      setsetShowUploadButton(true);
      setImgFile(e.target.files[0]);
      setImgFileUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <VStack
      className="img"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Flex width="100%" maxHeight={"400px"} justifyContent="center">
        {!_.isEmpty(imgFileUrl) ? (
          <img src={imgFileUrl} />
        ) : (
          <VStack spacing="1">
            <IconButton
              aria-label="Select image"
              icon={<Icon as={FaUpload} />}
            />
            <Text>Upload Image</Text>
          </VStack>
        )}
      </Flex>
      <input
        style={{
          opacity: 0,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        type="file"
        accept=".jpeg,.png,image/png,image/jpeg"
        onChange={(e) => handleChange(e)}
      />
      {showUploadButton ? (
        <Button
          isLoading={isUploading}
          loadingText="Uploading"
          aria-label="Upload"
          leftIcon={<Icon as={FaUpload} />}
          onClick={() => {
            setIsuploading(true);
            props?.options.fileUploader
              ?.uploadFile(imgFile)
              .then((res: any) => {
                URL.revokeObjectURL(imgFileUrl);
                setImgFileUrl(res);
                console.log(res);
                setsetShowUploadButton(false);
                props.onChange(res);
                toast({
                  title: `Image uploaded successfully`,
                  position: "bottom",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              })
              .catch((err: any) =>
                toast({
                  title: `Error uploading image`,
                  description: `${err}`,
                  position: "bottom",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                })
              )
              .finally(() => setIsuploading(false));
          }}
        >
          Upload
        </Button>
      ) : null}
    </VStack>
  );
};
export default ImageBlock;

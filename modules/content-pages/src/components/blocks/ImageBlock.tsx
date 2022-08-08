import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as _ from "lodash";
import { Flex, Icon, IconButton, VStack, Text } from "@chakra-ui/react";
import React from "react";
import { FaUpload } from "react-icons/fa";

const ImageBlock: React.FC<any> = (props: any) => {
  const [imgFile, setImgFile] = React.useState(props?.value);
  const handleChange = (e: any) => {
    if (e.target.files.length > 0) {
      setImgFile(URL.createObjectURL(e.target.files[0]));
      //To-do: add aws support
      props.onChange("https://i.picsum.photos/id/1018/300/200.jpg?hmac=7zbk4w0X7mlStuBLB7ZOuCyvzKkZkcOOvpE353yHcwE");
      console.log(e.target.files[0]);
    }
  };
  return (
    <div className="img" style={{ width: "100%", cursor: "pointer" }}>
      <div
        style={{
          pointerEvents: "none",
          width: "100%",
          opacity: 1,
        }}
      >
        <Flex justifyContent="center" width="100%" height={"400px"}>
          {!_.isEmpty(imgFile) ? (
            <img src={imgFile} />
          ) : (
            <VStack spacing="1">
              <IconButton
                aria-label="Upload image"
                icon={<Icon as={FaUpload} />}
              />
              <Text>Upload Image</Text>
            </VStack>
          )}
        </Flex>
      </div>
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
    </div>
  );
};
export default ImageBlock;

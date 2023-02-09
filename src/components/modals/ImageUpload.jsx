import React, { useRef, forwardRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  Input,
  Box,
  Center,
} from "@chakra-ui/react";
import { readFileToDataUrl } from "components/constants";
import { useAppState } from "utils/context/AppContext";

export const ImageUpload = forwardRef(
  ({
    isOpen,
    onClose,
    onFile,
    loading,
    trim = true,
    handleEmbed,
    removeImage = () => {},
  }) => {
    const [currentImage, setCurrentImage] = useState(null);
    const [file, setFile] = useState(null);
    const choosePicture = useRef(null);
    const { addImageUploadUrl } = useAppState();

    const handleFileSelectionChange = async (event) => {
      const file = event?.target?.files?.[0];
      setFile(file);

      const fileData = await readFileToDataUrl(file);
      setCurrentImage(fileData);
      addImageUploadUrl(fileData);

      const base64String = fileData.split(",")[1];

      if (trim) {
        return onFile(base64String);
      }

      return onFile(fileData);
    };

    const handleRemove = () => {
      setCurrentImage(null);
      onFile(null);
      removeImage(setCurrentImage);
    };

    const handleClick = (event) => {
      event.target.value = "";
    };

    const buttonText =
      currentImage !== null ? "Remove Image" : "Import Image from Device";

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize="16px">Embed</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDirection={"column"} justifyContent={"flex-start"}>
                <Box mb={3}>
                  <Text fontSize="14px" color="#343E37">
                    {" "}
                    Upload Image{" "}
                  </Text>
                </Box>
                <Box mb={3}>
                  <Text fontSize="10px" color="#333333">
                    {" "}
                    FILE UPLOAD{" "}
                  </Text>
                </Box>
                <Box
                  p={5}
                  border="1px"
                  borderColor="#0A7227"
                  borderStyle="dashed"
                  borderRadius="4px"
                >
                  <Center flexDirection={"column"}>
                    <Button
                      mb={3}
                      borderColor={"#0A7227"}
                      variant="outline"
                      fontSize="10px"
                      onClick={
                        currentImage !== null
                          ? () => handleRemove()
                          : () => choosePicture.current.click()
                      }
                    >
                      {loading ? "Uploading" : buttonText}
                    </Button>
                    {currentImage && (
                      <Text fontSize="10px" color="#333333">
                        {file?.name}
                      </Text>
                    )}
                  </Center>
                </Box>

                <Input
                  ref={choosePicture}
                  onChange={handleFileSelectionChange}
                  onClick={handleClick}
                  type="file"
                  sx={{
                    display: "none",
                  }}
                />
              </Flex>
            </ModalBody>

            <ModalFooter justifyContent={"flex-start"}>
              <Button
                bg="#0A7227"
                fontSize={"14px"}
                color="white"
                mr={3}
                onClick={handleEmbed}
                _hover={{
                  background: "#0A7227",
                  opacity: "0.8",
                }}
              >
                Embed
              </Button>
              <Button variant="ghost" fontSize={"14px"} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
);

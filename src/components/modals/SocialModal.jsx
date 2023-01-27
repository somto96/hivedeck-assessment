import React, { useRef } from "react";
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
  FormControl,
  FormLabel,
  Select,
  Switch,
  Text,
  Input,
  Box,
  Center,
} from "@chakra-ui/react";

export const SocialModal = ({ isOpen, onClose }) => {
  const socialMediaPlatform = useRef();
  const url = useRef();
  const code = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      platform: socialMediaPlatform.current?.value,
      url: url.current?.value,
      code: code.current?.value,
    };
    console.log("data", data);
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="16px">Embed</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDirection={"column"}
              justifyContent={"flex-start"}
              gap={5}
            >
              <FormControl>
                <FormLabel fontSize={"10px"} color="#333333">
                  SOCIAL MEDIA PLATFORM
                </FormLabel>
                <Select placeholder="Please select" ref={socialMediaPlatform}>
                  <option>Facebook</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={"10px"} color="#333333">
                  URL
                </FormLabel>
                <Input type="text" ref={url} />
              </FormControl>

              <FormControl>
                <FormLabel fontSize={"10px"} color="#333333">
                  CODE
                </FormLabel>
                <Input type="text" ref={code} />
              </FormControl>

              <FormControl
                display="flex"
                alignItems="center"
                justifyContent={"space-between"}
              >
                <FormLabel
                  htmlFor="disable-caption"
                  fontSize={"12px"}
                  color="#343E37"
                >
                  Disable caption
                </FormLabel>
                <Switch id="disable-caption" colorScheme="green" />
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent={"flex-start"}>
            <Button bg="#0A7227" color="white" mr={3} onClick={handleSubmit}>
              Embed
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

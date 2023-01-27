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
  Input,
} from "@chakra-ui/react";

export const VideoModal = ({ isOpen, onClose }) => {
  const videoProvider = useRef();
  const url = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      platform: videoProvider.current?.value,
      url: url.current?.value,
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
                <FormLabel fontSize={"10px"} color="#333333">VIDEO PROVIDER</FormLabel>
                <Select placeholder="Please select" ref={videoProvider}>
                  <option>Youtube</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={"10px"} color="#333333">URL</FormLabel>
                <Input type="text" ref={url} />
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

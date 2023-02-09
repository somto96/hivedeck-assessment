import React, { useRef } from "react";
import PropTypes from "prop-types";
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
import { useAppState } from "utils/context/AppContext";
import { handleEmbed, formatUrl } from "components/constants";

export const VideoModal = ({ isOpen, onClose }) => {
  const videoProvider = useRef();
  const url = useRef();
  const { quill } = useAppState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      platform: videoProvider.current?.value,
      url: url.current?.value,
    };

    const embedUrl = formatUrl(data?.url);
    handleEmbed("video", quill, embedUrl);
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
                  VIDEO PROVIDER
                </FormLabel>
                <Select
                  placeholder="Please select"
                  ref={videoProvider}
                  color={"#343E37"}
                  bg={"#FAFAFA"}
                  fontSize={"12px"}
                >
                  <option color={"#343E37"} fontSize={"12px"}>
                    Youtube
                  </option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={"10px"} color="#333333">
                  URL
                </FormLabel>
                <Input
                  type="text"
                  ref={url}
                  bg={"#FAFAFA"}
                  color={"#343E37"}
                  fontSize={"12px"}
                />
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent={"flex-start"}>
            <Button
              bg="#0A7227"
              color="white"
              fontSize={"14px"}
              mr={3}
              _hover={{
                background: "#0A7227",
                opacity: "0.8",
              }}
              onClick={handleSubmit}
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
};

VideoModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

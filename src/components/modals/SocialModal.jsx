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
  Switch,
  Input,
} from "@chakra-ui/react";
import { useAppState } from "utils/context/AppContext";
import { handleEmbed } from "components/constants";

export const SocialModal = ({ isOpen, onClose }) => {
  const socialMediaPlatform = useRef();
  const url = useRef();
  const code = useRef();
  const { quill } = useAppState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      platform: socialMediaPlatform.current?.value,
      url: url.current?.value,
      code: code.current?.value,
    };
    handleEmbed("link", quill, data?.url);
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
                <Select placeholder="Please select" ref={socialMediaPlatform} color={"#343E37"} bg={"#FAFAFA"} fontSize={"12px"}>
                  <option color={"#343E37"} fontSize={"12px"} py={5}>Facebook</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={"10px"} color="#333333">
                  URL
                </FormLabel>
                <Input type="text" ref={url} color={"#343E37"} bg={"#FAFAFA"} fontSize={"12px"} />
              </FormControl>

              <FormControl>
                <FormLabel fontSize={"10px"} color="#333333">
                  CODE
                </FormLabel>
                <Input type="text" ref={code} color={"#343E37"} bg={"#FAFAFA"} fontSize={"12px"} />
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
            <Button
              bg="#0A7227"
              color="white"
              fontSize={"14px"}
              _hover={{
                background: "#0A7227",
                opacity: "0.8",
              }}
              mr={3}
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

SocialModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

import React, { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Center,
  Text,
  Divider,
  Box,
  Flex,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import Plus from "assets/pngs/plus.png";
import { MENU_LINKS, handleEmbed } from "components/constants";
import { ImageUpload } from "components/modals/ImageUpload";
import { SocialModal } from "components/modals/SocialModal";
import { VideoModal } from "components/modals/VideoModal";
import { TextEditor } from "components/TextEditor";
import { useAppState } from "utils/context/AppContext";

export const CreatePost = () => {
  const { quill, imageUrl, wordCount } = useAppState();
  const headerRef = useRef();
  const [modalType, setModalType] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");

  const handleShowModal = (type) => {
    if (type === "Picture") {
      setModalType("Picture");
      onOpen();
    } else if (type === "Video") {
      setModalType("Video");
      onOpen();
    } else {
      setModalType("Social");
      onOpen();
    }
  };

  const handleImageEmbed = () => {
    handleEmbed("image", quill, imageUrl);
    onClose();
  };
  return (
    <>
      <Center h="100vh" flexDirection={"column"}>
        <Box p={5} w="662px" h="813px">
          <Card
            sx={{
              border: "1px solid #E7F1E9",
              borderRadius: "4px",
            }}
          >
            <CardHeader bg={"#FAFAFA"}></CardHeader>
            <Divider
              sx={{
                border: "1px solid #E7F1E9",
              }}
            />
            <CardBody bg={"#FAFAFA"}>
              <Input
                type="text"
                placeholder={"Add post title"}
                size={"lg"}
                focusBorderColor="none"
                variant="unstyled"
                mb={3}
                _placeholder={{
                  fontSize: "1em",
                  fontWeight: "600",
                  color: "#343E37",
                }}
                sx={{
                  borderRadius: "0px",
                  color: "#343E37",
                  fontSize: "24px",
                  fontWeight: "600",
                }}
                ref={headerRef}
              />
              <TextEditor value={value} onChange={setValue} />

              <Flex alignItems={"center"} justifyContent={"flex-start"}>
                <Menu>
                  <MenuButton>
                    <Center cursor={"pointer"}>
                      <Image src={Plus} alt="Plus icon" />
                    </Center>
                  </MenuButton>
                  <MenuList>
                    <Box p={3}>
                      <Text fontSize={"10px"} color={"#333333"}>
                        EMBEDS
                      </Text>
                    </Box>

                    {MENU_LINKS.map(({ id, Icon, name, subtitles }) => (
                      <MenuItem key={id} onClick={() => handleShowModal(name)}>
                        <Flex
                          flexDirection={"column"}
                          justifyContent={"flex-start"}
                        >
                          <Flex justifyContent={"flex-start"} gap={3}>
                            <Icon />
                            <Box>
                              <Text fontSize={"12px"} color={"#010E05"}>
                                {name}
                              </Text>
                              <Box as={"span"}>
                                <Text fontSize={"8px"} color={"#343E37"}>
                                  {subtitles}
                                </Text>
                              </Box>
                            </Box>
                          </Flex>
                        </Flex>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Flex>
            </CardBody>
            <Divider />
            <CardFooter
              w="100%"
              alignItems={"center"}
              justifyContent={"flex-end"}
              p={1}
            >
              <Text fontSize="10px">{wordCount ?? 0}/1000 words</Text>
            </CardFooter>
          </Card>
          <Flex
            alignItems={"center"}
            justifyContent={"flex-end"}
            w="100%"
            mt={3}
            color={"white"}
          >
            <Button
              bg={"green"}
              fontSize={"14px"}
              _hover={{
                color: "white",
                background: "green",
              }}
            >
              Post
            </Button>
          </Flex>
        </Box>
      </Center>
      {modalType === "Picture" && (
        <ImageUpload
          isOpen={isOpen}
          onClose={onClose}
          handleEmbed={handleImageEmbed}
        />
      )}
      {modalType === "Social" && (
        <SocialModal isOpen={isOpen} onClose={onClose} />
      )}
      {modalType === "Video" && (
        <VideoModal isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
};

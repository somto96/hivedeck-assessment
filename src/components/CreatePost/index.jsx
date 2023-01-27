import React, { useState, useMemo } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
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
import { MENU_LINKS, wordCount, TOOLBAR_OPTIONS } from "components/constants";
import { ImageUpload } from "components/modals/ImageUpload";
import { SocialModal } from "components/modals/SocialModal";
import { VideoModal } from "components/modals/VideoModal";

export const CreatePost = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [words, setWords] = useState(0);
  const [modalType, setModalType] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useMemo(
    () =>
      setWords(
        wordCount(convertToRaw(editorState?.getCurrentContent())?.blocks)
      ),
    [editorState]
  );

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
  return (
    <>
      <Center p={5} h="100vh" flexDirection={"column"}>
        <Box>
          <Card
            align={"center"}
            justify={"center"}
            maxW="lg"
            sx={{
              border: "1px solid #E7F1E9",
            }}
          >
            <CardHeader></CardHeader>
            <Divider
              sx={{
                border: "1px solid #E7F1E9",
              }}
            />
            <CardBody>
              <Input
                type="text"
                placeholder={"Add Post title"}
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
                  fontSize: "1.5em",
                  fontWeight: "600",
                }}
                // value={header}
              />
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                //   toolbarCustomButtons={[<CustomOption />]}
                toolbar={TOOLBAR_OPTIONS}
                placeholder="Add content"
              />
              {/* <textarea
                disabled
                value={draftToHtml(
                  convertToRaw(editorState.getCurrentContent())
                )}
              /> */}
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

                    {MENU_LINKS.map((link) => (
                      <MenuItem
                        key={link?.id}
                        onClick={() => handleShowModal(link?.name)}
                      >
                        <Flex
                          flexDirection={"column"}
                          justifyContent={"flex-start"}
                        >
                          <Box>
                            <Text fontSize={"12px"} color={"#010E05"}>
                              {link?.name}
                            </Text>
                          </Box>
                          <Box as={"span"}>
                            <Text fontSize={"8px"} color={"#343E37"}>
                              {link?.subtitles}
                            </Text>
                          </Box>
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
            >
              <Text fontSize="10px">{words}/1000 words</Text>
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
        <ImageUpload isOpen={isOpen} onClose={onClose} />
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

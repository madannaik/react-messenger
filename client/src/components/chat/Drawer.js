import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Stack,
    Box,
    FormLabel,
    Input,
  } from "@chakra-ui/react";
import {useRef} from "react";

export const DrawerMenu = ({isOpen, onOpen, onClose}) => {
    const firstField = useRef()
    return (
      <>
        
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Create a new account
            </DrawerHeader>
  
            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="username">Name</FormLabel>
                  <Input
                    ref={firstField}
                    id="username"
                    placeholder="Please enter user name"
                  />
                </Box>               
              </Stack>
            </DrawerBody>
  
            <DrawerFooter borderTopWidth="1px">
            <Button colorScheme="blue">Log Out</Button>
              <Button variant="outline" mr={3} ml={3} onClick={onClose}>
                EditProfile
              </Button>
              <Button colorScheme="blue">Friends</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
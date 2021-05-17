import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerOverlay,
    DrawerContent,
    Button,
    Stack,
    Box,
    FormLabel,
    Input,
  } from "@chakra-ui/react";
import {useRef,useContext} from "react";
import { ReactReduxContext } from 'react-redux';
export const DrawerMenu = ({isOpen, onOpen, onClose}) => {
    const firstField = useRef()
    const context = useContext(ReactReduxContext);

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
            {/* <DrawerCloseButton /> */}
            {/* <DrawerHeader borderBottomWidth="1px">
            {context.store.replaceReducer("User")}Madan
            </DrawerHeader> */}
            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="username">Name</FormLabel>
                  <Input
                    ref={firstField}
                    id="Search"
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
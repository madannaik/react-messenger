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
import { useHistory } from "react-router-dom";
import {useRef,useContext} from "react";
import { ReactReduxContext } from 'react-redux';
import {userLoggedOut} from "../../store/login"
export const DrawerMenu = ({isOpen, onOpen, onClose}) => {
    const firstField = useRef()
    const context = useContext(ReactReduxContext);
    let history = useHistory();
    const logOut = ()=>{
      context.store.dispatch(userLoggedOut());
      history.push("/")
    }


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
            {/* {context.store.replaceReducer("User")} */}Madan
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
            <Button colorScheme="blue" onClick={logOut}>Log Out</Button>
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
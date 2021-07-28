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
  Divider,
  useToast,
} from "@chakra-ui/react";
import { ChatIcon} from '@chakra-ui/icons'
import { useHistory, Link } from "react-router-dom";
import { useRef, useContext, useState } from "react";
import { ReactReduxContext } from 'react-redux';
import { userLoggedOut } from "../context/login";

import Avatar from "../assets/boy.svg"
import "../styles/Drawers.scss"
import { AddFriends, GetAllUsers } from "../services/API/user-service";
export const DrawerMenu = ({ isOpen, onOpen, onClose }) => {
  const toast = useToast();
  const firstField = useRef()
  const [users, setusers] = useState([])
  const context = useContext(ReactReduxContext);
  let history = useHistory();
  const [input, setinput] = useState('');
  const onChange = (e)=>setinput(e.target.value);
  const logOut = () => {
    context.store.dispatch(userLoggedOut());
    localStorage.clear()
    history.push("/")
  }
  const id = context.store.getState().logindetails.profile.id;
  const onEnter = (e)=>{
    if(e.charCode===13){
      console.log("event caputered");
        GetAllUsers(context.store.getState().logindetails.profile.id,input).then(data=>{
          setusers(data);
          if(data.length === 0){
            toast({
              title: "No users found",
              status: "success",
              duration: 9000,
              isClosable: true,
            
          });
          }
        });
    }
  }

  const addFriends = (data)=>{
      AddFriends(id,data._id).then(
        data=>console.log(data)
      )
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
            {context.store.getState().logindetails.profile.username}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Name</FormLabel>
                <Input
                  ref={firstField}
                  id="username"
                  placeholder="Enter username and/or enter"
                  onChange={onChange}
                  onKeyPress={onEnter}
                />
                <span className="divider">
                  <Divider orientation="horizontal" />
                </span>
                <div className="requests-data">
                  {users.map(data => {
                    return <div className="singlecard"  onClick={()=>addFriends(data)}>
                      <div className="avatar-cnt">
                        <img src={data.image??Avatar}
                          alt={"avatar"}
                          className="avatar"
                        />
                      </div>

                      <h6 className="username">{data.username}</h6>
                      <ChatIcon color={"white"} className="add-people" />
                    </div>
                  })}
                  
                </div>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="solid" colorScheme="telegram" onClick={logOut}>Log Out</Button>
            <Link to={"/chat/editprofile"}>
              <Button variant="outline" colorScheme="linkedin" mr={3} ml={3} onClick={onClose}>
                EditProfile
              </Button>
            </Link>

            {/* <Button colorScheme="blue">Friends</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
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
import { ChatIcon } from '@chakra-ui/icons'
import { useHistory, Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";


import Avatar from "../assets/boy.svg"
import "../styles/Drawers.scss"
import { AddFriends, GetAllUsers } from "../services/API/user-service";
export const DrawerMenu = ({ isOpen, onOpen, onClose }) => {
  const key = JSON.parse(localStorage.getItem("item"));
  const toast = useToast();
  const firstField = useRef()
  const [users, setusers] = useState([])
  let history = useHistory();
  const [input, setinput] = useState('');
  const onChange = (e) => setinput(e.target.value);
  const logOut = () => {
    localStorage.setItem("item", JSON.stringify({
      id: null,
      username: null,
      email: null,
      image: null,
      isLoggedIn: false,
    }));
    history.push("/login");
  }
  useEffect(() => {
    getAllUsers();
    return () => {
      setusers([])
    }
  }, []);
  const id = key?.id;
  const onEnter = (e) => {
    if (e.charCode === 13) {
      // console.log("event caputered");
      getAllUsers();
    }
  }
  const getAllUsers = () => {
    GetAllUsers(key?.id, input).then(data => {
      setusers(data);
      if (data.length === 0) {
        toast({
          title: "No users found",
          status: "success",
          duration: 9000,
          isClosable: true,

        });
      }
    });
  }
  const addFriends = (data) => {
    AddFriends(id, data._id).then(

      data => { console.log(data) }
    )
    setusers(users.filter((e) => { return e._id !== data._id }))
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
            {key?.username}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Add Friends</FormLabel>
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
                    return <div className="singlecard" key={data._id} onClick={() => addFriends(data)}>
                      <div className="avatar-cnt">
                        <img src={data.image ?? Avatar}
                          alt={"avatar"}
                          className="avatar"
                        />
                      </div>

                      <h6 className="username">{data.username}</h6>
                      {/* <ChatIcon color={"white"} className="add-people" /> */}
                      <h4 className="add-people" >Add</h4>
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
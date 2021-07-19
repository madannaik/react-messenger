import React,{useState,useContext,useEffect} from "react"
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    IconButton,
    Divider
  } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { ReactReduxContext } from "react-redux";
import { GetFriends } from "../../services/API/user-service";
import  Avatar  from "../../svg/boy.svg";
export default function DrawerExample() {
    const context = useContext(ReactReduxContext);
    const loggedUser = context.store.getState().profile.email;
    useEffect(() => {
        GetFriends(context.store.getState().profile.id).then(data=>
            setNames(data.data));
    }, []);

    const [Names, setNames] = useState([]);
    const [input, setinput] = useState("");

    const [currentUserData,setcurrentUserData] = useState({
        currentuser:"",
        currentUserId:"",
        currentUserAvatar:"",
    })


    const handlechange = (event) => setinput(event.target.value);
    const handleClick = (event) => {
        setcurrentUserData(
            {
                ...currentUserData,
                currentuser:event.username,
                currentUserId:event._id,
                currentUserAvatar:event.image,

            }
        )
        
        
    };
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()


    return (
      <>
        <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
          Open
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>
  
            <DrawerBody>
            <div className="online-div">
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
                        <IconButton icon={<HamburgerIcon />} colorScheme="blackAlpha" aria-label="menu" onClick={onOpen} marginRight={1} />

                        <Input variant="outline" color="white" placeholder="Search user" onChange={handlechange} />

                    </div>

                    <span className="divider">
                        <Divider orientation="horizontal" />
                    </span>
                    <div className="userdata">
                        {Names.map((data) => {
                            
                            return <div className="singlecard" onClick={() => handleClick(data)} key={data.email} >
                                <div className="avatar-cnt">
                                    <img src={data.image ?? Avatar}
                                        alt={"avatar"}
                                        className="avatar"
                                    />
                                </div>
                               
                                
                                <h6 className="username">{data.email === loggedUser ? "saved message" : data.username}</h6>
                            </div>
                        })}
                    </div>


                </div>
            </DrawerBody>
  
    
          </DrawerContent>
        </Drawer>
      </>
    )
  }
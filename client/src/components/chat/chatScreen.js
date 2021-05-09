import { useDisclosure } from "@chakra-ui/hooks";
import { Button, Divider, Input } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { DrawerMenu } from "./Drawer";
import Avatar from "../../svg/avatar.svg"
import "./chatscreen.css"

export const ChatScreen = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return <>
        <div>
            <DrawerMenu isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
            {/* <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
          Create user
        </Button> */}
            <div className="chatmaindiv">
                <div className="online-div">
                    <Input variant="outline" placeholder="Search user" />
                    <span className="divider">
                        <Divider orientation="horizontal" />
                    </span>
                    <div className="userdata">
                        {Array.from(Array(20)).map((data) => {
                            return <div className="singlecard">
                                <img src={Avatar}
                                    alt={"avatar"}
                                    className="avatar"
                                />
                                <h6 className="username">David Jones</h6>
                            </div>
                        })}
                        {/* <div className="singlecard">
                            <img src={Avatar}
                                alt={"avatar"}
                                className="avatar"
                            />
                            <h6 className="username">David Jones</h6>
                        </div> */}
                    </div>


                </div>
                <div className="chatdiv">

                </div>

            </div>
        </div>
    </>
}
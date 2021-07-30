import Avatar from "../assets/boy.svg";
import "../styles/chatbox.css";
import { Image, Box, Input, Button, IconButton, HStack, useDisclosure } from "@chakra-ui/react";
import { ArrowRightIcon, SettingsIcon, StarIcon, ViewIcon } from "@chakra-ui/icons";
import Chatbubble from '../components/chatbubble';
import { useEffect, useRef, useState } from 'react';
import { socketData } from "../utils/socket"
import Picker from 'emoji-picker-react';
import team from '../assets/team.svg';
import DrawerExample from "../components/isOnlineMOb";
import React from "react";
import { DrawerMenu } from "../components/Drawer";
import { GetConverstions } from "../services/API/user-service";
export const ChatBox = ({ username, receiverID, avatar ,handleclick}) => {
    const key = JSON.parse(localStorage.getItem("item"));
    const senderID = key?.id;
    const from = key?.username;
    const inputref = useRef(null)
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState('');
    // let image = con

    let todaysDate = new Date();

    const ref = useRef(null);

    const scrollToBottom = () => {
        ref.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
    }

    const sendMessage = async () => {
        // console.log(inputText);
        if (inputText.length && chatId !== "") {
            let text = inputText;
            const data = { from: from, to: username, text: text, date: todaysDate, id: chatId };
            const msg = { from: from, to: username, text: text, date: todaysDate };
            setMessages(messages => [...messages, msg]);
            await socketData.emit("send_message", data);
            setInputText('');
            inputref.current.value = '';
            // console.log("data sent");
            scrollToBottom();
        }
    }


    const [emoji, setemoji] = useState(false);
    const onClickEmoji = () => setemoji(!emoji);
    const onEmojiClick = (event, emojiObject) => {
        let text = inputref.current.value + emojiObject.emoji;
        setInputText(text);
        inputref.current.value = text;
        // console.log(text);
    };



    useEffect(() => {
        if (username === '') {

        }
        else {
            setChatId("");
                GetConverstions({ member1: senderID, member2: receiverID })
                .then(data => {
                    console.log(data)
                    setMessages(data.message);
                    setChatId(data._id);
                    scrollToBottom();
                    socketData.emit("joinchat", {
                        // email: context.store.getState().logindetails.profile.email,
                        email: key?.email,
                        chatId: data._id,
                    });

                })
                .catch(err => console.log(err));
            if (ref.current) {
                ref.current.scrollIntoView(
                    {
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    })
            }
        }
    }, [username]);

    useEffect(() => {

        socketData.connect();
        socketData.on("connect", () => {
        });
        socketData.on("recieve_message", (data) => {
            setMessages(messages => [...messages, data]);
            ref.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
            return () => {
                socketData.disconnect();
            }
        });

    }, []);



    const onChange = (event) => {
        setInputText(event.target.value);
    }
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { 
        isOpen: isLeftOpen, 
        onOpen: onLeftOpen, 
        onClose: onLeftClose 
    } = useDisclosure()
    
  
    return <>
        <DrawerExample isOpen={isLeftOpen} onClose={onLeftClose} onOpen={onLeftOpen} handleClick={handleclick}  />
        <DrawerMenu isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        <div className="chatarea">
            <div className="chatuserdata">
                <div className="chatusericon">

                    <Image className="chatavatar" src={avatar ? avatar : Avatar} alt={"usericon"} />
                    <Box className="chatusername">{username === '' ? '' : username}</Box>
                    <span></span>
                    <HStack className="settings-menu">
                       
                        <IconButton className="view-icon" icon={<ViewIcon />} onClick={onLeftOpen} backgroundColor="transparent" _focus={{ border: "none" }} />
                        <IconButton  icon={<SettingsIcon />} onClick={onOpen} backgroundColor="transparent" _focus={{ border: "none" }} />
                    </HStack>
                </div>
                <div className="chatdisplayspace" ref={ref} >
                    {messages.length === 0 ? <div className="no-messages">
                        <img src={team} alt={"empty icons"} width="50%" height="50%" />
                    </div> : messages.map((data) => {
                        return <>
                            <Chatbubble data={data} />
                        </>
                    }

                    )}
                </div>
                <div className="chatexchange">
                    <div style={{ display: emoji ? "block" : "none" }}>
                        <Picker onEmojiClick={onEmojiClick} />
                    </div>

                    <Input variant="filled" placeholder="filled" className="catchusertext" onChange={onChange} ref={inputref} />
                    <Button rightIcon={<ArrowRightIcon />} onClick={sendMessage} colorScheme="blue" variant="outline" paddingX={3} paddingY={0} className="send-button" >
                        Send
                    </Button>
                    <IconButton icon={<StarIcon />} _focus={{
                        border: "none"
                    }} marginLeft="1vw" className="emoticon" onClick={onClickEmoji}></IconButton>
                </div>
            </div>
        </div>
    </>
}

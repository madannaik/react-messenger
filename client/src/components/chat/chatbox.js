import Avatar from "../../svg/boy.svg";
import "./css/chatbox.css";
import { Image, Box, Input ,Button, IconButton} from "@chakra-ui/react";
import {AddIcon, ArrowRightIcon, StarIcon, ViewIcon} from "@chakra-ui/icons";
import Chatbubble from './chatbubble';
import {useEffect, useRef, useState} from 'react';
import {ReactReduxContext} from "react-redux";
import {useContext} from "react";
import {socketData} from "../constants/socket"


export const ChatBox = ({username,receiverID}) => {



    const context = useContext(ReactReduxContext);
    const senderID = context.store.getState().profile.id;
    const from = context.store.getState().profile.username;

    const [inputText,setInputText] = useState('');
    const [messages,setMessages] = useState([]);
    const [chatId,setChatId] = useState('');

    let todaysDate = new Date();

    const ref = useRef(null);

    const scrollToBottom = ()=>{
        ref.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
    }

    const sendMessage = async ()=>{
        if(inputText.length && chatId !==""){
            let text = inputText;
            const data = { from:from,to:username,text:text,date:todaysDate,id:chatId};
            const msg = {from:from,to:username,text:text,date:todaysDate};
            setMessages(messages => [...messages,msg]);
            await socketData.emit("send_message",data);
            console.log("sending....");
            scrollToBottom();  
        
        }
    }


    useEffect(()=>{
        if(username === ''){

        }
        else{
            setChatId("");
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ member1:senderID,member2:receiverID})
            }
            fetch('http://127.0.0.1:5000/put',requestOptions)
                .then(getResponse => getResponse.json())
                .then(data=>{
                    setMessages(data.message);
                    
                    setChatId(data._id);
                    socketData.emit("joinchat",{
                        email:context.store.getState().profile.email,
                        chatId:data._id,
                    });
                    
                })
                .catch(err =>console.log(err));
                if (ref.current) {
                    ref.current.scrollIntoView(
                      {
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                      })
                  }
        }
    },[username]);
    
    useEffect(() => {
        socketData.connect();
        socketData.on("connect", () => {
        });
        
    
        socketData.on("recieve_message", (data) => {
            console.log(data);
            setMessages(messages => [...messages,data]);
            ref.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
              });
            return ()=>{
                socketData.disconnect();
            }
        });
        
    }, []);

   

    const onChange = (event) =>{
        setInputText(event.target.value);
        console.log(inputText);
    }

    return <>
        <div className="chatarea">
            <div className="chatuserdata">
                <div className="chatusericon">
                    <Image className="chatavatar" src={Avatar} alt={"usericon"} />
                    <Box className="chatusername">{username === '' ? 'Click on users to start chatting':username}</Box>
                </div>
                <div className="chatdisplayspace" ref={ref} >
                    {messages.length === 0 ? <h1>Start texting</h1> : messages.map((data) => {
                            return <>
                                <Chatbubble data={data}/>
                            </>
                        }

                    )}
                </div>
                <div className="chatexchange">
                    <Input variant="filled" placeholder="filled" className="catchusertext" onChange={onChange}  />
                    <Button rightIcon={<ArrowRightIcon />} onClick={sendMessage} colorScheme="blue" variant="outline" paddingX={3} paddingY={0} className="send-button" >
                        Send
                    </Button>
                    <IconButton icon={<StarIcon/>} marginLeft="1vw" className="emoticon" ></IconButton>
                    <IconButton icon={<AddIcon/>} marginLeft="1vw" className="file-picker" ></IconButton>
                </div>
            </div>
        </div>
    </>
}

import Avatar from "../../svg/boy.svg";
import "./css/chatbox.css";
import { Image, Box, Input, Button, IconButton } from "@chakra-ui/react";
import { ArrowRightIcon, StarIcon} from "@chakra-ui/icons";
import Chatbubble from './chatbubble';
import { useEffect, useRef, useState } from 'react';
import { ReactReduxContext } from "react-redux";
import { useContext } from "react";
import { socketData } from "../constants/socket"
import Picker from 'emoji-picker-react';
import team from '../../svg/team.svg';
export const ChatBox = ({ username, receiverID ,avatar}) => {



    const context = useContext(ReactReduxContext);
    const senderID = context.store.getState().profile.id;
    const from = context.store.getState().profile.username;
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
    const onClickEmoji = ()=> setemoji(!emoji);
    const onEmojiClick = (event, emojiObject) => {
        let text = inputref.current.value+ emojiObject.emoji;
        setInputText(text);
        inputref.current.value = text ;
        // console.log(text);
    };



    useEffect(() => {
        if (username === '') {

        }
        else {
            setChatId("");
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ member1: senderID, member2: receiverID })
            }
            fetch('http://127.0.0.1:5000/put', requestOptions)
                .then(getResponse => getResponse.json())
                .then(data => {
                    setMessages(data.message);

                    setChatId(data._id);
                    scrollToBottom();
                    socketData.emit("joinchat", {
                        email: context.store.getState().profile.email,
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
            // console.log(data);
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

    return <>

        <div className="chatarea">
            <div className="chatuserdata">
                <div className="chatusericon">

                    <Image className="chatavatar"  src={avatar?avatar:Avatar} alt={"usericon"} />
                    <Box className="chatusername">{username === '' ? '' : username}</Box>
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
                    <div style={{display:emoji?"block":"none"}}>
                        <Picker onEmojiClick={onEmojiClick} />
                    </div>

                    <Input variant="filled" placeholder="filled" className="catchusertext" onChange={onChange} ref={inputref} />
                    <Button rightIcon={<ArrowRightIcon />} onClick={sendMessage} colorScheme="blue" variant="outline" paddingX={3} paddingY={0} className="send-button" >
                        Send
                    </Button>
                    <IconButton icon={<StarIcon />} marginLeft="1vw" className="emoticon" onClick={onClickEmoji}></IconButton>
                </div>
            </div>
        </div>
    </>
}

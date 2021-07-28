import { createSlice } from '@reduxjs/toolkit';

const initialChatState = {
    chatuserid: "",
    chatusername:"",
    chatuserimageid:"",
};
const currentChat = createSlice({
    name:"chatstate",
    initialState:initialChatState,
    reducers:{
        "changeChatState":(state,action)=>{
            return state.push({
                chatuserid:action.payload.chatuserid,
                chatusername:action.payload.chatuserid,
                chatuserimageid:action.payload.chatuserimageid
            })
        },
        "ripoffchat":(state)=>{
            return state.push({           
            });
        }

    }

});


export const {changeChatState,ripoffchat} = currentChat.actions;
export const currentChatReducer = currentChat.reducer;

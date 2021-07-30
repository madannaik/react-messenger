import React from 'react'

import {format} from "timeago.js";



export default function Chatbubble({data}) {
    const key = JSON.parse(localStorage.getItem("item"));
    const from = key?.username;

    const bubblediv = {
        
        "margin":"5px",
    }
    const Chatbubbles  = {
        "float":`${from === data.from ? "right":"left"}`,
        
        
        "fontFamily": "'Lato', sans-serif",
        "color":"#fff",
        "fontWeight":"500",
        "fontSize":"0.85rem"
    }
    const textdiv = {
      "padding":"10px 14px",
      "maxWidth":"40vw",
      "backgroundColor":"#312244",
      "borderRadius": `${from === data.from ? "20px 20px 3px 20px":"20px 20px 20px 3px"}`,
    }
    const time ={
        "float":"right",
        "fontFamily":"san-serif",
        "fontSize":"0.5rem",
        "color":"rgba(0,0,0,0.5)"
    }
  return (
      <div style={bubblediv}>
        <div style={Chatbubbles}>
          <div style={textdiv}>
              {data.text}
          </div>
          <p style={time}>{format(data.time)}</p>          
        </div>
        
      </div>
  )
}
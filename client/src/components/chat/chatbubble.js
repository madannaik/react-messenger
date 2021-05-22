import React from 'react'


const bubblediv = {
  // "display":"flex",
  // "flexDirection":"row",
  // "justifyContent":"flexEnd",
  "margin":"5px",
}
const Chatbubbles  = {
  "float":"left",
  "padding":"5px 14px",
  "maxWidth":"25vw",
  "backgroundColor":"#312244",
  "borderRadius": "20px 20px 3px 20px",
  "fontFamily": "'Lato', sans-serif",
  "color":"#fff",
  "fontWeight":"500",
  "fontSize":"0.85rem"
}

export default function Chatbubble() {
  return (
      <div style={bubblediv}>
        <div style={Chatbubbles}>
          Hello
        </div>

      </div>
  )
}
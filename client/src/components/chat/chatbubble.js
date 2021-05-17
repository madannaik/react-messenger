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
    // "background": "rgb(130,48,48)",
    // "background": "linear-gradient(90deg, rgba(130,48,48,1) 0%, rgba(153,231,240,1) 0%, rgba(153,255,244,1) 100%)",
    "borderRadius": "20px 20px 3px 20px",
    "fontFamily": "'Lato', sans-serif",
    "color":"#fff",
    "fontWeight":"500",
    "fontSize":"0.85rem"
    // "borderTop":"5px",
    // "borderBottom":"5px",
    // "borderLeft":"5px",
    // "birderRight":"5px",
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

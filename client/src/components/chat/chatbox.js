import Avatar from "../../svg/avatar.svg"
import "./css/chatbox.css"
export const ChatBox  = ()=>{
    return <>
    <div className="chatarea">
        <div className="chatuserdata">
            <div className="chatusericon">
                <img src={Avatar} alt={"usericon"} />
            </div>
        </div>
    </div>
    </>
}
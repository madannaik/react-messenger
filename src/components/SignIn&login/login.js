import "./login.css";
import { React, useState } from "react"
import { Input } from "@chakra-ui/react";
import { Divider, Button } from "@chakra-ui/react";
import chat from "../../svg/log-in.svg";
export const Login = () => {
    const [isloading, setisloading] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [username, setusername] = useState("");
    const handleChange = (event) => setemail(event.target.value)
    return <div className="maindiv">
        <div className="logindiv">
            <div className="loginbox">
                <div className="letters">SIGN UP</div>
                <Input placeholder="User Name" _placeholder={{ color: '#161a1d' }} borderColor={"#003049"} textColor={"white"} marginBottom={"5"} />
                <Input placeholder="Email" _placeholder={{ color: '#161a1d' }} borderColor={"#003049"} textColor={"white"} marginBottom={"5"} type={"email"} onChange={handleChange} />
                <Input placeholder="Password" _placeholder={{ color: '#161a1d' }} borderColor={"#003049"} textColor={"white"} marginBottom={"5"} type={"password"} />
                <Button
                    isLoading={isloading}
                    loadingText="Submitting"
                    colorScheme="facebook"
                    variant="outline"
                    onClick={() => setisloading(true)}
                    bgColor={"#03045e"}
                    color={"whitesmoke"}
                >
                    Submit
                </Button>
            </div>
            <div className="line">

                <Divider orientation="vertical" />

            </div>
            <div className="logo">
                <img src={chat} width="300" height="300" alt={"logo"} />
                <p className="letters margin-right">Already have an account?</p>
                <p className="letters margin-right"><a href="">Log In</a></p>
            </div>
        </div>
    </div>
}
import "./login.css";
import { React, useState } from "react"
import { Input } from "@chakra-ui/react";
import { Divider, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import chat from "../../svg/log-in.svg";
import { useToast } from "@chakra-ui/react"
import Style from "./style";
export const SignUp = () => {
    const toast = useToast();
    const [isloading, setisloading] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [username, setusername] = useState("");
    const handleChangeEmail = (event) => setemail(event.target.value);
    const handleChangePassword = (event) => setpassword(event.target.value);
    const handleChangeUsername = (event) => setusername(event.target.value);
    const handleSubmit = () => {
        setisloading(true);
        if (!username || !email || !password) {
            setisloading(false);
            toast({
                title: "Fill all fields.",
                status: "warning",
                duration: 9000,
                isClosable: true,
            });
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, email: email, password: password })
            };
            fetch('http://localhost:5000/', requestOptions)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    setisloading(false)
                    toast({
                        title: `${data.message}`,
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                    if (data.status === "200") {
                        // console.log("you can go further");
                    }

                });

        }
    }
    return <div className="maindiv">
        <Style />
        <div className="logindiv">
            <div className="loginbox">
                <div className="letters signin-letters" >SIGN UP</div>
                <p className="letters-login" >ALready have an?  <Link to="/" style={{ color: "blue" }}>Log In</Link></p>
                <Input placeholder="User Name" _placeholder={{ color: 'black' }} borderColor={"#003049"} textColor={"black"} marginBottom={"5"} onChange={handleChangeUsername} />
                <Input placeholder="Email" _placeholder={{ color: 'black' }} borderColor={"#003049"} textColor={"black"} marginBottom={"5"} type={"email"} onChange={handleChangeEmail} />
                <Input placeholder="Password" _placeholder={{ color: 'black' }} borderColor={"#003049"} textColor={"black"} marginBottom={"5"} type={"password"} onChange={handleChangePassword} />
                <Button
                    isLoading={isloading}
                    loadingText="Submitting"
                    colorScheme="facebook"
                    variant="outline"
                    onClick={handleSubmit}
                    bgColor={"#5390d9"}
                    _hover={
                        {
                            opacity:"0.8"
                        }
                    }
                    color={"whitesmoke"}
                    w={"50%"}
                    margin="0 auto"
                >
                    Submit
                </Button >
              

            </div>
        
        </div>

    </div>
}
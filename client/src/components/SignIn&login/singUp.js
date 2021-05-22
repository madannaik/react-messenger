import "./login.css";
import { React, useState } from "react"
import { Input} from "@chakra-ui/react";
import { Divider, Button } from "@chakra-ui/react";
import {Link} from 'react-router-dom';
import chat from "../../svg/log-in.svg";
import { useToast } from "@chakra-ui/react"
export const SignUp = () => {
    const toast = useToast();
    const [isloading, setisloading] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [username, setusername] = useState("");
    const handleChangeEmail = (event) => setemail(event.target.value);
    const handleChangePassword = (event) => setpassword(event.target.value);
    const handleChangeUsername = (event) => setusername(event.target.value);
    const handleSubmit = ()=>{
        setisloading(true);
        if(!username || !email ||  !password){
            setisloading(false);
            toast({
                title: "Fill all fields.",
                description: "Dumbass.",
                status: "warning",
                duration: 9000,
                isClosable: true,
              });
        }
        else{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username:username,email:email,password:password})
            };
            fetch('http://localhost:5000/', requestOptions)
            .then(response => response.json())
            .then(data =>{
                    console.log(data);
                   setisloading(false)
                    toast({
                    title: `${data.message}`,
                    description: "Dumbass.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                  if(data.status ==="200"){
                      console.log("you can go further");
                  }
               
            });
            
        }
    }
    return <div className="maindiv">

        <div className="logindiv">

            <div className="loginbox">
                <div className="letters">SIGN UP</div>
                <Input placeholder="User Name" _placeholder={{ color: '#161a1d' }} borderColor={"#003049"} textColor={"white"} marginBottom={"5"} onChange={handleChangeUsername}/>
                <Input placeholder="Email" _placeholder={{ color: '#161a1d' }} borderColor={"#003049"} textColor={"white"} marginBottom={"5"} type={"email"} onChange={handleChangeEmail} />
                <Input placeholder="Password" _placeholder={{ color: '#161a1d' }} borderColor={"#003049"} textColor={"white"} marginBottom={"5"} type={"password"} onChange={handleChangePassword}/>
                <Button
                    isLoading={isloading}
                    loadingText="Submitting"
                    colorScheme="facebook"
                    variant="outline"
                    onClick={handleSubmit}
                    bgColor={"#03045e"}
                    color={"whitesmoke"}
                    
                >
                    Submit
                </Button >
                <div className="mobile">
                    <p className="mobile-p">Already have an account?</p>
                    <Link to={{
                        pathname: "/",
                    }}>
                        <p className="mobile-p" >Log In</p>
                    </Link>
                </div>
            </div>
            <div className="line">

                <Divider orientation="vertical" color="white"/>

            </div>
            <div className="logo">
                <img src={chat} className="stylesvg" width="300" height="300" alt={"logo"} />
                <p className="letters margin-right">Already have an account?</p>
                <Link to={{
                    pathname: "/",
                }}>
                    <p className="letters margin-right" >Log In</p>
                </Link>
                
            </div>
        </div>

    </div>
}
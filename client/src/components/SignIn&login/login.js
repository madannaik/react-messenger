import "./login.css";
import { React, useState } from "react"
import { Input} from "@chakra-ui/react";
import { Divider, Button ,useToast} from "@chakra-ui/react";
import chat from "../../svg/webpage.svg";
import {Link} from "react-router-dom"
export const Login = () => {
    const toast = useToast();
    const [isloading, setisloading] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
 
    const handleChangeEmail = (event) => setemail(event.target.value);
    const handleChangePassword = (event) => setpassword(event.target.value);


    const handleSubmit = ()=>{
        setisloading(true);
        if(!email ||  !password){
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
                body: JSON.stringify({ email:email,password:password})
            };
            fetch('http://localhost:5000/login', requestOptions)
            .then(response => response.json())
            .then(data =>{
               
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
                <div className="letters login-letters">Log In</div>
                <Input placeholder="Email" _placeholder={{ color: '#161a1d' }} borderColor={"#003049"} textColor={"white"} marginBottom={"8"}  marginTop={"4"} type={"email"} onChange={handleChangeEmail} />
                <Input placeholder="Password" _placeholder={{ color: '#161a1d' }} borderColor={"#003049"} textColor={"white"} marginBottom={"8"} type={"password"} onChange={handleChangePassword}/>
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
                </Button>
            </div>
            <div className="line">

                <Divider orientation="vertical" color={"white"} />

            </div>
            <div className="logo">
                <img src={chat} className="signinlogo" alt={"logo"} />
                <p className="letters margin-right">Dont have an account?</p>
                <Link to="/signup">
                    <p className="letters margin-right">Sing Up</p>
                </Link>
                
            </div>
        </div>
    </div>
}
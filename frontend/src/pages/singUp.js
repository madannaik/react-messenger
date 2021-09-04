import "../styles/signup.css";
import { React, useState } from "react"
import { Button, Input } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useToast } from "@chakra-ui/react"
import { SingUpUser } from "../services/API/auth";
import { bgSvg } from "../utils/misc";

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
            if (password.length !== 8) {
                // console.log(password.length);
                toast({
                    title: "Password should min 8 char",
                    status: "warning",
                    duration: 9000,
                    isClosable: true,
                });
                setisloading(false);
            }
            else {
                SingUpUser({ username: username, email: email, password: password })
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

                        }

                    });

            }
        }
    }
    return <div className="maindiv-signin" style={{ backgroundImage: `${bgSvg}` }}>
        <div className="intro">
            <h1 className="heading-primary">Connect People around the world anonymously</h1>
            <div className="intro-image"></div>
            <span href="null" className="intro-connect">Connect now &#8594; </span>
        </div>
        <div className="signdiv">
            {/* <h1 className="heading-primary-mob">Connect People around the world announusmsly</h1> */}
            <div className="signbox" >

                <div className="letters signin-letters" >SIGN UP</div>
                <p className="letters-login" >Already have an?  <Link to="/login" style={{ color: "blue" }}>Log In</Link></p>
                <Input borderRadius={"xl"} placeholder="User Name" _placeholder={{ color: 'black' }} borderColor={"#003049"} textColor={"black"} marginBottom={"5"} onChange={handleChangeUsername} />
                <Input borderRadius={"xl"} placeholder="Email" _placeholder={{ color: 'black' }} borderColor={"#003049"} textColor={"black"} marginBottom={"5"} type={"email"} onChange={handleChangeEmail} />
                <Input borderRadius={"xl"} placeholder="Password" _placeholder={{ color: 'black' }} borderColor={"#003049"} textColor={"black"} marginBottom={"5"} type={"password"} onChange={handleChangePassword} />
                <Button
                    isLoading={isloading}
                    loadingText="Submitting"
                    colorScheme="facebook"
                    variant="outline"
                    border="none"
                    onClick={handleSubmit}
                    boxShadow="dark-lg"
                    bgColor={"#6254e4"}
                    _hover={
                        {
                            opacity: "0.8"
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

    </div >
}
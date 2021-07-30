import "../styles/login.css";
import { React, useState, useContext ,useEffect} from "react"
import { Input } from "@chakra-ui/react";
import { Button, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const key = JSON.parse(localStorage.getItem("item"));

export const Login = () => {
    const toast = useToast();
    const [isloading, setisloading] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    let history = useHistory();
    const handleChangeEmail = (event) => setemail(event.target.value);
    const handleChangePassword = (event) => setpassword(event.target.value);
  
    // console.log(context.store.getState());
    const key = JSON.parse(localStorage.getItem("item"));

    
    
    useEffect(() => {
        
        const keystate = key?.isLoggedIn;
        if(keystate){
            history.push("/chat");
        }
    
    }, [])

    const handleSubmit = () => {
        setisloading(true);
        if (!email || !password) {
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
                body: JSON.stringify({ email: email, password: password })
            };
            fetch('http://localhost:5000/login', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setisloading(false)
                    toast({
                        title: `${data.message}`,
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                    if (data.status === "200") {
                        // context.store.dispatch(userLogged({
                        //     id: data.id,
                        //     username: data.username,
                        //     email: data.email,
                        //     image:data.image
                        // }));
                        localStorage.setItem("item", JSON.stringify({
                            id: data.id,
                            username: data.username,
                            email: data.email,
                            image:data.image,
                            isLoggedIn:true
                        }));
                        history.push('/chat')
                        console.log("you can go further");
                    }

                });

        }
    }
    return <div className="maindiv">
        {/* <Style/> */}
        <div className="logindiv">
            <div className="loginbox">
                <div className="letters login-letters">Log In</div>
                <p className="letters-signin" >Dont have an account?  <Link to="/signup" style={{color:"blue"}}>Sign Up</Link></p>
                <Input placeholder="Email" _placeholder={{ color: '#000' }} borderColor={"#003049"} textColor={"black"} marginBottom={"8"} marginTop={"4"} type={"email"} onChange={handleChangeEmail} />
                <Input placeholder="Password" _placeholder={{ color: '#000' }} borderColor={"#003049"} textColor={"black"} marginBottom={"8"} type={"password"} onChange={handleChangePassword} />
                <Button
                    isLoading={isloading}
                    loadingText="Submitting"
                    colorScheme="facebook"
                    variant="outline"
                    w={"50%"}
                    _hover={{
                        opacity: "0.7"
                    }
                    }
                    margin={"0 auto"}
                    onClick={handleSubmit}
                    bgColor={"#5390d9"}
                    color={"whitesmoke"}
                >
                    Submit
                </Button>         
            </div>
        </div>
    </div>
}
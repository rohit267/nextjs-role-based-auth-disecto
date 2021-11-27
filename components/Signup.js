import React, { useState } from 'react';
import { Box, Center, Container, Flex, Text } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import {Select} from "@chakra-ui/react";
import axios from "axios";
import Router from "next/router";

function Signup(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrorMsg, setFormErrorMsg] = useState("");

    function handleUsernameChange(e){
        if (!e.target.value.match(/^(?![\s-])[a-zA-Z0-9\s-]+$/) && !e.target.value==="") return;
        setFormErrorMsg("");
        setUsername(e.target.value);
    }

    function handleUserTypeChange(e){
        setFormErrorMsg("");
        setUserType(e.target.value);
    }

    function handlePasswordChange(e){
        setFormErrorMsg("");
        setPassword(e.target.value);
    }

    function handleSubmit(e){
        if(!username.match(/^(?![\s-])[a-zA-Z0-9\s-]+$/) || !username) {
            setFormErrorMsg("Username must be alphanumeric and cannot contain spaces or dashes");
            return;
        }
        if(!userType){
            setFormErrorMsg("Please select a user type");
            return;
        }
        if (!password.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,20}$/) || !password){
            setFormErrorMsg("Password must be at least 8 characters long, contain at least one letter, one number, and one special character");
            return;
        }
        setFormErrorMsg("");
        setIsSubmitting(true);

        axios.post("/api/auth/signup", {
            username: username,
            password: password,
            isAdmin: userType === "admin"
        }).then(res => {
            if(res.data.error){
                setFormErrorMsg(res.data.error);
                setIsSubmitting(false);
                return;
            }
            userType === "admin" ? Router.push("/admin-panel"): Router.push("/user-panel");
        }).catch(err => {
            console.error(err);
            setFormErrorMsg("An error occurred. Please try again later.");
            setIsSubmitting(false);
        });

    }
    return(
        <Container maxW="container.lg">
            <form onSubmit={(e)=>e.preventDefault()} id='signupFrom'>
                <Center>
                    <Box mt='16' pt='5' pl='2' pr='2' pb='6' boxSize='lg' height='auto' border='1px solid #e3e3e3' borderRadius='8px'>
                        <Box>
                            <Center mt='4'>
                                <Text fontSize='24px' fontWeight='semibold'>Signup</Text>
                            </Center>
                            <Center mt='6' ml='7' mr='7'>
                                    <Input value={username} onChange={handleUsernameChange}  required color='black.800' borderColor='cyan.300' bgColor='#fff' focusBorderColor='cyan.600' type='text' size="lg" placeholder='Username' />
                            </Center>
                            <Center mt='6' ml='7' mr='7'>
                                <Select onChange={handleUserTypeChange}  required  borderColor='cyan.300' bgColor='#fff' focusBorderColor='cyan.600'  size="lg" >
                                    <option value="">Select User Type</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </Select>
                            </Center>
                            <Center mt='6' ml='7' mr='7'>
                                <Input value={password} onChange={handlePasswordChange}  required minLength="8" borderColor='cyan.300' bgColor='#fff' focusBorderColor='cyan.600' type='password' size="lg" placeholder='Password' />
                            </Center>
                            <Center>
                                <Text ml='9' mr='7' color='red'>{formErrorMsg ? formErrorMsg : ""}</Text>
                            </Center>
                            <Flex mt='6' ml='7' mr='7' justifyContent='space-between'>
                                <Text onClick={() => props.toggleIsLogin(true)} cursor='pointer' fontWeight='semibold' color='cyan.600'>Already have an account?</Text>
                                <Button isLoading={isSubmitting} onClick={handleSubmit} type='submit'>Submit</Button>
                            </Flex>
                        </Box>
                    </Box>
                </Center>
            </form>
        </Container>
    )
}

export default Signup;

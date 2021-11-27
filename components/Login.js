import {Box, Button, Center, Container, Flex, Input, Text} from "@chakra-ui/react";
import {useState} from "react";
import Router from 'next/router'
import axios from "axios";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formErrorMsg, setFormErrorMsg] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        axios.post('/api/auth/login',{
            username: username,
            password: password
        }).then(res => {
            if(res.data.error){
                setIsSubmitting(false);
                setFormErrorMsg(res.data.message);
                return;
            }
           res.data.isAdmin ? Router.push('/admin-panel') : Router.push('/user-panel');
        }).catch(err => {
            console.log(err);
        });
    }

    return (<Container maxW="container.lg">
            <form onSubmit={handleSubmit}>
                <Center>
                    <Box mt='16' pt='5' pl='2' pr='2' pb='6' boxSize='lg' height='auto' border='1px solid #e3e3e3'
                         borderRadius='8px'>
                        <Box>

                            <Center mt='4'>
                                <Text fontSize='24px' fontWeight='semibold'>Login</Text>
                            </Center>
                            <Center mt='6' ml='7' mr='7'>
                                <Input value={username} onChange={handleUsernameChange} required color='black.800' borderColor='cyan.300' bgColor='#fff'
                                       focusBorderColor='cyan.600' type='text' size="lg" placeholder='Username'/>
                            </Center>
                            <Center mt='6' ml='7' mr='7'>

                                <Input value={password.value} onChange={handlePasswordChange} required minLength="8" borderColor='cyan.300'
                                       bgColor='#fff' focusBorderColor='cyan.600' type='password' size="lg"
                                       placeholder='Password'/>

                            </Center>
                            <Center>
                                <Text position='relative' top='12px' ml='9' mr='7'
                                      color='red'>{formErrorMsg ? formErrorMsg : ""}</Text>
                            </Center>
                            <Flex mt='6' ml='7' mr='7' justifyContent='space-between'>
                                <Text fontWeight='semibold' onClick={() => props.toggleIsLogin(false)} cursor='pointer'
                                      color='cyan.600'>Create account</Text>
                                <Button isLoading={isSubmitting} type='submit'>Submit</Button>
                            </Flex>
                        </Box>
                    </Box>
                </Center>
            </form>
        </Container>
    )
}

export default Login;

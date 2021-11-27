import jwt from 'jsonwebtoken';
import config from '../configs';
import Cookie from 'cookies';
import {Box, Button, Center, Container, Text} from "@chakra-ui/react";
import axios from "axios";
import Router from "next/router";
import {useState} from "react";

function AdminPanel(props){
    const [isLoading, setIsLoading] = useState(false);

    function handleLogout(){
        setIsLoading(true);
        axios.post('/api/auth/logout').then(res => {
            setIsLoading(false);
            Router.push('/');
        }).catch(err => {
            setIsLoading(false);
            console.log(err);
        });
    }

    return(
        <Container maxW="container.lg">
            <Center pt={60}>
                {
                    props.isLoggedIn && props.isAdmin ?
                        <Box fontSize="4xl" textAlign={"center"}>
                            <Text>Admin Panel</Text>
                            <Text>Welcome {props.user.username}</Text>
                            <Button isLoading={isLoading} onClick={handleLogout} colorScheme={"red"} >Logout</Button>
                        </Box>
                        :
                        <Text fontSize="4xl">
                            <Text>Unauthorized access</Text>
                        </Text>
                }

            </Center>
        </Container>
    )
}


export async function getServerSideProps(context) {
    try {
        const cookies = new Cookie(context.req);
        const token = cookies.get('token');
        const user = jwt.verify(token, config.JWT_SECRET);
        return {
            props: {
                user: user,
                isAdmin: user.isAdmin,
                isLoggedIn: true
            },
        }
    } catch (e) {
        return {
            redirect: {
                status: 404,
                permanent: false,
                destination: "/404",
            },
            props:{},
        };
    }

}

export default AdminPanel;

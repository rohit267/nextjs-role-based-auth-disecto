import {useState} from "react";
import Login from '../components/Login';
import Signup from '../components/Signup';

export default function Home() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <>
            {showLogin ? <Login toggleIsLogin={setShowLogin}/> : <Signup toggleIsLogin={setShowLogin}/>}
        </>
    )
}

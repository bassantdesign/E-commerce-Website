import { useEffect } from "react";
import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import profile from '../assets/images/profile.png'

export let UserContext = createContext()

    function decode(){
    return jwtDecode(localStorage.getItem('userToken'))    
    }


export default function UserContextProvider(props){

    const [userLogin, setUserLogin] = useState(null);
    let [userId, setUserId] = useState(null);
    let [userName, setUserName] = useState(null);
    let [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null);

    let [image, setImage] = useState(() => {
    let email = localStorage.getItem('userEmail');
    return email ? (localStorage.getItem(`userImage_${email}`) || profile) : profile;
    });


    useEffect(() => {

        if(localStorage.getItem('userToken') !== null){
            setUserLogin(localStorage.getItem('userToken'))
            setUserId(decode().id)
            setUserName(decode().name);
        }
    }, [])

    return <UserContext.Provider value={{userLogin, setUserLogin, userId, setUserId, userName, setUserName, userEmail, setUserEmail, image, setImage}}>
        {props.children}
    </UserContext.Provider>

}
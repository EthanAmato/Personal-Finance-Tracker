import './style.scss'
import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import AuthService from "../../services/auth.service";
import IUser from "../../Types/user.type";

type Props = {};

type State = {
    redirect: string | null,
    userReady: boolean,
    currentUser: IUser & { accessToken: string }
}


function Profile(props: Props) {
    const [currentUser, setCurrentUser] = useState<IUser & { accessToken: string }>({ accessToken: "" })
    const [userReady, setUserReady] = useState<boolean>(false)
    const [redirect, setRedirect] = useState<string | null>()


    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) setRedirect("/home");
        () => {
            setCurrentUser(currentUser);
            setUserReady(true)
        }

    }, [])


    return (

        <>
            {(redirect) && <Navigate to={redirect}/>}
            <div className="container">
                {(userReady) ?
                    <div>
                        <header className="jumbotron">
                            <h3>
                                <strong>{currentUser.username}</strong> Profile
                            </h3>
                        </header>
                        <p>
                            <strong>Token:</strong>{" "}
                            {currentUser.accessToken.substring(0, 20)} ...{" "}
                            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                        </p>
                        <p>
                            <strong>Id:</strong>{" "}
                            {currentUser.id}
                        </p>
                        <p>
                            <strong>Email:</strong>{" "}
                            {currentUser.email}
                        </p>
                        <strong>Authorities:</strong>
                        <ul>
                            {currentUser.roles &&
                                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                        </ul>
                    </div> : null}
            </div>
        </>
    );
}



export default Profile;
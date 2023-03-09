import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth/";

class AuthService {
    login(username: string, password: string) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            }) //posts to "http://localhost:5000/api/auth/signin" with user + pass in body
            .then(res => {
                //if we are able to sign in successfully, the server will send us access token to remain logged in
                //we then save that in local storage with all user data returned
                if (res.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(res.data))
                }
                return res.data
            })
    }

    logout() {
        //remove the access item from local storage so user can no longer be logged in
        localStorage.removeItem("user")
    }


    register(username: string, email: string, password: string, balance: number) {
        return axios.post(API_URL + "register", {
            username,
            email,
            password,
            balance
        })
    }

    getCurrentUser() {
        //get the user data stored from logging in and returned by server
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);
        return null;
    }

}

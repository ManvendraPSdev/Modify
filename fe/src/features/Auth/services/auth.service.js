import axios from "axios" ; 

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials : true
}) ;

export async function register({userName , email , password}){
    try {
        const response = await api.post("/api/auth/register" , {
            userName , 
            email , 
            password
        })
        return response.data ; 
    } catch (error) {
        console.log(error) ; 

    }
}

export async function login({userName , email , password}){
    try {
        const response = await api.post("/api/auth/login" , {
            userName , email , password
        })
        return response.data ; 
    } catch (error) {
        console.log(error) ; 
    }
}

export async function getMe(){
    try {
        const response = api.get("/api/auth/getMe") ; 
        return response.data ; 
    } catch (error) {
        console.log(error) ; 
    }
}

export async function logout(){
    try {
        const response = await api.post("/api/auth/logout") ; 
        return response.data ; 
    } catch (error) {
        console.log(error)
    }
}
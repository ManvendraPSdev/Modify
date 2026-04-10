import { useContext , useEffect } from "react";
import { register , login , getMe, logout } from "../services/auth.service";
import { AuthContext } from "../auth.context";

export const useAuth = ()=>{
    const context = useContext(AuthContext) ; 
    const {user , setUser, loading , setLoading} = context ; 

    const handelRegister = async ({userName , email , password})=>{
        setLoading(true) ; 
        try {
            const data = await register({userName , email , password}) ; 
            setUser(data.user) ; 
        } catch (error) {
            console.log(error) ; 
        }finally{
            setLoading(false) ; 
        }
    } ; 

    const handelLogin = async({userName , email , password})=>{
        setLoading(true) ; 
        try {
            const data = await login({userName , email , password}) ; 
            setUser(data.user) ; 
        } catch (error) {
            console.log(error); 
        }finally{
            setLoading(false)
        }
    }

    const handelLogout = async()=>{
        setLoading(true) ; 
        try {
            await logout();
            setUser(null) ; 
        } catch (err) {
            console.log(err);
        }finally{
            setLoading(false) ; 
        }
    }
    

    const handelGetMe = async()=>{
        setLoading(true) ; 
        console.log("hello1") 
        const data = await getMe() ;
        console.log("hello2") 
        setUser(data.user) ; 
        console.log("hello3")  // yaha acess nhi aa raha hai
        setLoading(false) ; 
    }

    useEffect(()=>{
        handelGetMe()
    } , []) ;

    return {user, loading , handelRegister , handelLogin , handelLogout} ; 
}
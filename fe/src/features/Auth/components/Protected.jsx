import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router';

const Protected = ({children}) => {

    const {user , loading} = useAuth() ; 
    const navigate = useNavigate() ; 

    if(loading){
        return (
            <h1>Loading...</h1>
        )
    }

    if (!loading && !user) {
        navigate("/register")
        return null
    }

    return children
}

export default Protected
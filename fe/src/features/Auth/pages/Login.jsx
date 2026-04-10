import React, { useState } from 'react'
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {

    const { handelLogin } = useAuth() ; 
    const [email , setEmail] = useState("") ; 
    const [userName , setUserName] = useState("") ; 
    const [password , setPassword] = useState("") ; 

    const navigate = useNavigate() ; 

    async function handleSubmit(e) {
        e.preventDefault()
        await handelLogin({userName , email , password}) ; 
        navigate("/app")
    }

    return (
        <main className="login-page">
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} >
                    <FormGroup
                        value={userName}
                        onChange={(e)=> setUserName(e.target.value)}
                        label="UserName"
                        placeholder="Enter your UserName"
                    />
                    <FormGroup
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <FormGroup
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        label="Password"
                        placeholder="Enter your password"
                    />
                    <button className='button' type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </main>
    )
}

export default Login
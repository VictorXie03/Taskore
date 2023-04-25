import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ Login, Register, error }) => {
    const [details, setDetails] = useState({ username: "", password: "" });
    const [isOnLoginForm, setIsOnLoginForm] = useState(true)

    const loginSubmitHandler = e => {
        e.preventDefault();
        Login(details);
    }

    const registerSubmitHandler = e => {
        e.preventDefault();
        Register(details);
    }
    return (
        <>
            {isOnLoginForm ?
                <div className="login-form-border">
                    <form onSubmit={loginSubmitHandler}>
                        <div className="form-inner">
                            <h2>Login</h2>
                            {(error != "") ? (<div className="error">{error}</div>) : ""}
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input type="username" name="username" id="username" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                            </div>
                            <input type="submit" value="LOGIN" />
                        </div>
                    </form>
                    <button onClick={() => setIsOnLoginForm(false)}>REGISTER</button>
                </div>
                : <div className="login-form-border">
                    <form onSubmit={registerSubmitHandler}>
                        <div className="form-inner">
                            <h2>Register</h2>
                            {(error != "") ? (<div className="error">{error}</div>) : ""}
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input type="username" name="username" id="username" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                            </div>
                            <input type="submit" value="REGISTER" />
                        </div>
                    </form>
                    <button onClick={() => setIsOnLoginForm(true)}>Already have an account, LOGIN</button>
                </div>}
        </>
    )
}



export default LoginForm
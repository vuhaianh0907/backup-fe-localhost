import React from 'react';
import { Link } from 'react-router-dom';
import './LoginBar.css';

export default function Login() {
    return (
        <div className='background'>
            <div className='shape'></div>
            <div className='shape'></div>

            <form>
                <h3>Login Here</h3>
                <label htmlFor='username'>Username</label>
                <input type='text' placeholder='Email or Phone' id='username' />
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='Password' id='password' />
                <button type='submit'>Log In</button>
                <div className='login-links'>
                    <a href="/register">Register</a>
                    <a href="/forgot-password">Forgot Password</a>
                </div>
                <div className='social'>
                    <div className='go'><i className='fab fa-google'></i> Google</div>
                    <div className='fb'><i className='fab fa-facebook'></i> Facebook</div>
                </div>
            </form>
        </div>
    );
}

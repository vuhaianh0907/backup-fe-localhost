import React from 'react';
import './Register.css';

export default function Register() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [email, setEmail] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Thực hiện xử lý đăng kí tài khoản với các thông tin đã nhập
    };

    return (
        <div className='background'>
            <div className='shape'></div>
            <div className='shape'></div>
            <div className='register-container'>

                <form onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <input
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <input
                        type='text'
                        name='phoneNumber'
                        placeholder='Phone Number'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type='submit' name='action' value='register'>Register</button>
                </form>
            </div>
        </div>
    );
}

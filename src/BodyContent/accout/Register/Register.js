import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { Link } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Tạo đối tượng dữ liệu gửi đi
        const data = {
            email: email,
            password: password,
            fullname: fullname,
            address: address,
            phone: phone,
            gender: gender,
            confirmPassword: confirmPassword
        };

        // Gửi yêu cầu POST đến API
        axios.post('http://localhost:3000/api/auth/register', data)
            .then((response) => {
                // Xử lý phản hồi từ API thành công
                console.log(response.data);
                // Thực hiện các hành động khác sau khi đăng ký thành công
            })
            .catch((error) => {
                // Xử lý lỗi từ API
                if (error.response) {
                    // API trả về lỗi
                    setErrorMessage(error.response.data.message);
                } else {
                    // Lỗi không thể kết nối đến API
                    setErrorMessage('An error occurred. Please try again later.');
                }
            });
    };

    return (
        <div className='register-container'>
            <form onSubmit={handleSubmit}>
                <h2>Đăng ký</h2>
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    type='text'
                    name='fullname'
                    placeholder='Full Name'
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                />
                <input
                    type='text'
                    name='address'
                    placeholder='Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    type='text'
                    name='phone'
                    placeholder='Phone Number'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <select
                    name='gender'
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                >
                    <option value='' disabled>Select Gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                </select>
                <input
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                <button type='submit'>Đăng ký </button>
                <div className='back-to-login'>
                    <a href="/login" className='register-link'>Trở về đăng nhập </a>
                </div>
            </form>
        </div>
    );
}

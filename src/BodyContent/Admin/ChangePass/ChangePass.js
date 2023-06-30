import React, { useState } from 'react';
import './ChangePass.css';

function ChangePass() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleChangeNewPassword = (event) => {
        setNewPassword(event.target.value);
    };

    const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Kiểm tra mật khẩu hiện tại và xác nhận mật khẩu mới
        if (password === '') {
            setErrorMessage('Vui lòng nhập mật khẩu hiện tại');
            return;
        }

        if (newPassword === '') {
            setErrorMessage('Vui lòng nhập mật khẩu mới');
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        }

        // Xử lý logic thay đổi mật khẩu tại đây
        // ...

        // Đặt lại các trường dữ liệu
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrorMessage('');
    };

    return (
        <div className="change-pass">

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <h2>Thay đổi mật khẩu</h2>
                <div className="form-group">
                    <label htmlFor="currentPassword">Mật khẩu hiện tại:</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={password}
                        onChange={handleChangePassword}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">Mật khẩu mới:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={handleChangeNewPassword}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChangeConfirmPassword}
                    />
                </div>
                <button type="submit">Thay đổi mật khẩu</button>
            </form>
        </div>
    );
}

export default ChangePass;


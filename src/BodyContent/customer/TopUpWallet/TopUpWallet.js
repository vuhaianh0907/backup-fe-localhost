import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopUpWallet.css';
import { useParams } from 'react-router-dom';
const TopUpWallet = () => {
  const [userData, setUserData] = useState(null);
  const [QR, setQR] = useState(null);
  const { id } = useParams();
  const note = `nap tien ${id}`;
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);
  useEffect(() => {
    if (user === null) {

      window.location.href = '/';

    }
    else {
      if (user.role !== 'customer') {
        window.location.href = '/';
      }
    }
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://oooo-zifh.onrender.com/api/account/customer/details?id=${id}`); // Thay đổi URL API tùy theo yêu cầu của bạn
        setUserData(response.data);


      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);



  return (
    <div className="top-up-wallet">
      {userData ? (
        <div className='momodiv'>

          <h2 className="user-info-heading">Nạp tự động qua ví momo</h2>
          <p className="user-info">MOMO: 0911413402</p>
          <p className="user-info">Nội dung chuyển khoản: nap tien {id}</p>
          <img src={`https://momosv3.apimienphi.com/api/QRCode?phone=0911413402&amount=0&note=${note}`} />
          {/* <div className='luuy'>
            <p className="user-info">Lưu ý nạp đúng nội dung chuyển khoản nếu sai vui lòng liên hệ ....</p>
          </div> */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default TopUpWallet;

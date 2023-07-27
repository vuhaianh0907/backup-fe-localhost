import React, { useEffect, useState } from "react";
import ViewTransaction from "../TopUpWallet/ViewTransaction";
import axios from "axios";
import { useParams } from "react-router";
import './Wallet.scss';

function Wallet() {

    const { id } = useParams();
    const note = `nap tien ${id}`;
    const [user, setUser] = useState(null);
    const [isMomo, setMomo] = useState(null);
    const storedUserString = sessionStorage.getItem('token');
  const user1 = JSON.parse(storedUserString);
  useEffect(() => {
    if (user1 === null) {

      window.location.href = '/';

    }
    else {
      if (user1.role !== 'customer') {
        window.location.href = '/';
      }
    }
  })

    const handleMomo = () => {
        setMomo(true);
    }
    const handleCloseMomo = () => {
        setMomo(false);
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://oooo-zifh.onrender.com/api/account/customer/details?id=${id}`);
                const userData = response.data.customer;
                setUser(userData);
            } catch (error) {
                console.log('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);
    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div id="Wallet" className="walletform"> 
            <div className="user-wallet-info m-3">
                <div >
                    Xin chào {user.fullname}
                </div>
                <div class="formatted-money">
                    Số dư của bạn là: {user.balance} VND
                </div>
                <div>
                    <button class="btn btn-primary mt-3 mb-3" onClick={handleMomo} >
                        Nạp tiền
                    </button>
                </div>
            </div>
            {isMomo && (
                <div className='popup-momo'>
                    <button
                        type="button"
                        className="btn-close"
                        data-dismiss="modal"
                        aria-label="Close"
                        id="close-btn"
                        onClick={handleCloseMomo}
                    >
                       
                    </button>
                    <h2 className="momo-heading">Nạp tự động qua ví momo</h2>
                    <div className="momo-upper-content">
                        <p className="momo-info">MOMO: 0911413402</p>
                        <p className="momo-info">Nội dung chuyển khoản: nap tien {id}</p>
                    </div>

                    <img src={`https://momosv3.apimienphi.com/api/QRCode?phone=0911413402&amount=0&note=${note}`} alt="QR Code" />
                    <div className='luuy'>
                        <p className="momo-note">Sau khi hoàn thành nạp tiền vui lòng tải lại trang</p>
                        <p className="momo-note">Lưu ý nạp đúng nội dung chuyển khoản nếu sai vui lòng liên hệ chúng tôi qua Email:</p>
                    </div>
                </div>
            )}


        </div>
    );
}
export default Wallet;

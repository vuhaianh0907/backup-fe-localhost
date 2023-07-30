import React, { useState, useEffect } from 'react';
import './banner.css';
import VinAlignSmall from './conten/VinAlignSmall';
import DichVu from './conten/DichVu';
import IconBoxes from './conten/IconBoxes';

import axios from "configs/axios";

export default function Banner() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('amount/get')
      .then((response) => {
        setAmount(response.data.amount);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : (
        <>
          <div className="ct"></div>
          Chỉ với giá: {amount} VND -
          <button type="button" id="bk-btn" onClick={() =>{ window.location.href = '/customer/listdoctor';}} >Đặt lịch ngay!!</button>
          <VinAlignSmall />
          <IconBoxes />
         
        </>
      )}
    </div>
  );
}

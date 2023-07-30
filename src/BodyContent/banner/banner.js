import React, { useState, useEffect } from 'react';
import './banner.css';
import VinAlignSmall from './conten/VinAlignSmall';
import DichVu from './conten/DichVu';
import IconBoxes from './conten/IconBoxes';

import axios from 'axios';

export default function Banner() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/amount/get')
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
          <VinAlignSmall />
          <IconBoxes />
          <DichVu />
        </>
      )}
    </div>
  );
}

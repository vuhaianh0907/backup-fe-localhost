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
      .get('https://oooo-zifh.onrender.com/api/amount/get')
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
    <div className="ct">
      
    </div>
    
    <VinAlignSmall />
    <IconBoxes />
    <DichVu/>

  </div>
    
    
  );
}

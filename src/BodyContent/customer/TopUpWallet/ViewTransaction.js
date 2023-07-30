// ViewTransaction.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Wallet from "../Wallet/Wallet";
import './ViewTransaction.css';

export default function ViewTransaction() {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);

  useEffect(() => {
    if (user === null) {
      window.location.href = '/';
    } else {
      if (user.role !== 'customer') {
        window.location.href = '/';
      }
    }
  })

  const getHistory = async () => {
    try {
      const response = await axios.get(`balance/get?id=${id}`);
      if (response.status === 200) {
        setHistory(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  console.log(history);

  return (
    <div className="cust-view-transaction">
      <Wallet/>
      <div className="cust-transaction-header">
        <h3>Lịch sử giao dịch</h3>
      </div>
      <div className="transaction-body">
        {isLoading ? (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID Giao Dịch</th>
                <th>Số Tiền</th>
                <th>Thông Tin Giao Dịch</th>
                <th>Số dư</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <div>
              {!history.length && (
                <p>Đang tải...</p>
              )}
            </div>
            <tbody>
              {history.length > 0 &&
                history.map((list) => (
                  <tr key={list.id}>
                    <td>{list.id}</td>
                    <td>{list.amount}</td>
                    <td>{list.comment}</td>
                    <td>{list.blance}</td>
                    <td>{list.createdAt}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import './ViewTransaction.css';

export default function ViewTransaction() {
  const { id } = useParams();
  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/transaction/get?id=${id}`);
      if (response.status === 200) {
        // Check if the response data is an array, otherwise wrap it in an array
        
        setHistory(response.data.transactions);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  console.log(history);

  return (
    <div className="cust-view-transaction">
      <div className="cust-transaction-header">
        <h3>Lịch sử giao dịch</h3>
      </div>
      <div className="transaction-body">
        <table>
          <thead>
            <tr>
              <th>ID Giao Dịch</th>
              <th>Số Điện Thoại</th>
              <th>Số Tiền</th>
              <th>Thông Tin Giao Dịch</th>
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
                    <td>{list.partnerId}</td>
                    <td>{list.amount}</td>
                    <td>{list.comment}</td>
                    <td>{list.createdAt}</td>
                  </tr>
                ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

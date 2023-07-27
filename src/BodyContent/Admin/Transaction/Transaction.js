import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Transaction.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 15;
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);
  useEffect(() => {
    if (user === null) {

      window.location.href = '/';

    }
    else {
      if (user.role !== 'admin') {
        window.location.href = '/';
      }
    }
  })
  

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('https://oooo-zifh.onrender.com/api/transaction/getall');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    
    fetchTransactions();
  }, []);

  // Logic for pagination
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const currentTransactions = transactions.slice(firstIndex, lastIndex);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="transaction-list">
      <h1>Transaction List</h1>
      <table>
        {/* Table content */}
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Partner ID</th>
            <th>Amount</th>
            <th>Comment</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.partnerId}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.comment}</td>
              <td>{transaction.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {currentPage > 1 && (
          <button id='thist-paging' onClick={prevPage}>{'<'}</button>
        )}
        {currentTransactions.length > 0 && (
          <button id='thist-paging'>
            <span>
            {currentPage}
          </span>
          </button>
          
        )}
        {currentTransactions.length === perPage && (
          <button id='thist-paging' onClick={nextPage}>{'>'}</button>
        )}
      </div>
    </div>
  );
};

export default TransactionList;

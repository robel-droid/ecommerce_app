import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [cookies, setCookies] = useCookies(['cart', 'login']);
    const customer_id = cookies.login.id;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://localhost:3001/transactions?customer_id=${customer_id}`);
          if(Array.isArray(res.data.transactions)){
            setTransactions(res.data.transactions);
          }
          else{
            console.log('data from server not in correct format');
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, []);
  
    return (
      <div>
        <h1>Transaction History</h1>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(transactions) && transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{Date(transaction.date)}</td>
                <td>{transaction.total}</td>
                <td>{transaction.products}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
export default TransactionHistory;  
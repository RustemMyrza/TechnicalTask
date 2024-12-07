import React, { useEffect, useState } from 'react';
import './Table.css';

const Table = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isThereData, setDataStatus] = useState(true);

  const fetchTransactions = () => {
    fetch('http://localhost:3001/data')
      .then((response) => {
        if (response.status === 404) {
          setDataStatus(false);
          setLoading(false);
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setTransactions(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTransactions();
    const intervalId = setInterval(fetchTransactions, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date/Time</th>
          <th>Author</th>
          <th>Sum</th>
          <th>Category</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {
          isThereData ? (
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.dateTime}</td>
                  <td>{transaction.author}</td>
                  <td>{transaction.sum}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.comment}</td>
                </tr>
              ))
            ) : (
            <tr><td colSpan="6">Ошибка при получении данных</td></tr>
          )
        }
      </tbody>
    </table>
  );
};

export default Table;

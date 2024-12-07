import React from 'react';
import './DeleteButton.css';

const DeleteButton = () => {
  const handleDelete = () => {
    fetch('http://localhost:3001/data/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
  };

  return (
    <button className="delete-button" onClick={handleDelete}>
        Удалить все транзакции
    </button>

  );
};

export default DeleteButton;

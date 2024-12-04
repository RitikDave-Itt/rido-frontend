import { Transaction } from '@/Interfaces/wallet';
import React from 'react';



interface TransactionRowCardProps {
  transaction: Transaction;
}

const TransactionRowCard: React.FC<TransactionRowCardProps> = ({ transaction }) => {
  return (
    <div className="bg-background-light p-4 rounded-lg shadow-md flex justify-between items-center mb-4">
      <div>
        <p className="text-gray-800 text-lg font-bold">
          <span className='text-gray-500 text-sm'>
          Amount: 
          </span>
          {"  "}
           ₹ {transaction.amount.toLocaleString()}
           </p>
        <p className="text-sm">Type: {transaction.type}</p>
        <p className="text-sm">Status: {transaction.status}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-500">ID: {transaction.id}</p>
        <p className="text-sm">Date: {new Date(transaction.createdAt).toLocaleDateString()}</p>

      </div>
    </div>
  );
};

export default TransactionRowCard;

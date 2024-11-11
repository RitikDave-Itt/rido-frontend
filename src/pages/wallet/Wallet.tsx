import { useEffect, useState } from 'react';
import AddMoney from './components/AddMoney';
import WithdrawMoney from './components/WithdrawMoney';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchWallet } from '@/redux/thunks/userThunks';
import TransactionRowCard from '@/components/TransactionRowCard';
import { Transaction } from '@/Interfaces/wallet';
import { fetchWalletTransactions } from '@/Service/walletService';

const Wallet = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const { wallet } = useSelector((state: RootState) => state.user);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const [isAddMoneyVisible, setIsAddMoneyVisible] = useState(user?.role === 'User');

  
  useEffect(() => {
    dispatch(fetchWallet());
  }, [dispatch]);

  
  useEffect(() => {
    const loadTransactions = async () => {
      const { items, totalCount } = await fetchWalletTransactions(pageNo);
      setTransactions(prevTransactions => [...prevTransactions, ...items]);
      setTotalTransactions(totalCount);
    };

    loadTransactions();
  }, [pageNo]);

  useEffect(() => {
    if (wallet?.balance !== undefined) {
      const loadTransactions = async () => {
        setTransactions([]);  
        const { items, totalCount } = await fetchWalletTransactions(1);  
        setTransactions(items);
        setTotalTransactions(totalCount);
      };

      loadTransactions();
    }
  }, [wallet?.balance]);

  const handleLoadMore = () => {
    setPageNo(prevPage => prevPage + 1);
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="md:w-1/3 w-full bg-gray-300 p-4 flex flex-col items-center justify-center">
        <div className="h-full w-[80%] flex justify-center mt-5">
          {isAddMoneyVisible ? <AddMoney /> : <WithdrawMoney />}
        </div>
      </div>

      <div className="md:w-2/3 w-full bg-background-light p-4 flex flex-col items-center md:h-[80vh] overflow-y-auto">
        <div className="w-full h-1/5 md:text-2xl md:text-right font-bold text-lg mb-4">
          <p><span className="text-gray-500">Balance:</span> {wallet?.balance}</p>
          <p className={wallet?.status === "Active" ? "text-green-600" : "text-red-600"}>
            <span className="text-gray-500">Status:</span> {wallet?.status}
          </p>
        </div>

        <div className="container mx-auto px-4">
          {transactions.length > 0 ? (
            transactions.map(transaction => (
              <TransactionRowCard key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <div className="flex w-full justify-center items-center h-full">No Transactions</div>
          )}

          {transactions.length < totalTransactions && (
            <div className="flex justify-center mt-4">
              <button 
                onClick={handleLoadMore}
                className="bg-primary text-white py-2 px-4 rounded hover:bg-primary_hover transition-colors duration-200"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchWallet } from '@/redux/thunks/userThunks';
import { Transaction } from '@/Interfaces/wallet';
import { fetchWalletTransactions } from '@/Service/walletService';
const useWallet = () => {
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
{
    transactions,
    totalTransactions,
    isAddMoneyVisible,
    setIsAddMoneyVisible,
    handleLoadMore,
    wallet,
    user,
    dispatch
}  )
}

export default useWallet
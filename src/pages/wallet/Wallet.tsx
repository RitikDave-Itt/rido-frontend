import { useEffect, useState } from 'react';
import AddMoney from './components/AddMoney';
import WithdrawMoney from './components/WithdrawMoney';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchWallet } from '@/redux/thunks/userThunks';

const Wallet = () => {
  const [isAddMoneyVisible, setIsAddMoneyVisible] = useState(true); 
  const { wallet} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const toggleAddMoney = () => {
    setIsAddMoneyVisible(true);
  };

  const toggleWithdrawMoney = () => {
    setIsAddMoneyVisible(false);
  };
useEffect(()=>{
  dispatch(fetchWallet())

},[])
  return (
    <div className="flex  flex-col md:flex-row h-full w-full">
      <div className="md:w-1/3 w-full  bg-gray-300 p-4 flex flex-col   items-center justify-center">
        <div className="md:w-[80%] w-full flex md:flex-col justify-evenly items-center">
          <h2 className="text-xl   font-bold   mb-4">Wallet Actions</h2>
          <button
            onClick={toggleAddMoney}
            className={`mb-4 px-6 py-3 rounded-lg   transition   duration-200 w-full ${
              isAddMoneyVisible ? 'bg-primary   text-white' : 'bg-gray-100 text-gray-800'
            }`}
          >
            Add Money
          </button>
          <button
            onClick={toggleWithdrawMoney}
            className={`px-6 py-3   rounded-lg   transition duration-200 w-full ${
              !isAddMoneyVisible ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
            }`}
          >
            Withdraw Money
          </button>
        </div>
      </div>

      <div className="md:w-2/3 w-full   bg-background-light p-4 flex    flex-col items-center justify-center">
        <div className="w-full h-1/5 md:text-2xl md:text-right font-bold text-lg mb-4">
          <p><span className='text-gray-500'>Balance:</span> {wallet?.balance}</p>
          <p className={wallet?.status==="Active"?"text-green-600":"text-red-600"}><span className='text-gray-500'>Status:</span> {wallet?.status}  </p>
        </div>

        <div className="h-4/5 w-full flex justify-center mt-5">
          {isAddMoneyVisible ? <AddMoney /> : <WithdrawMoney />}
        </div>
      </div>
    </div>
  );
};

export default Wallet;


import useWithdrawMoney from './useWithdrawMoney';
import Input from '@/components/ui/Input';
import CircularProgress from '@mui/material/CircularProgress';



const WithdrawMoney = () => {

  const {amount, setAmount , handleWithdraw ,loading}  = useWithdrawMoney();
 

  return (
    <div className="flex flex-col   w-full md:w-[40%] h-[70%] justify-center items-center">
      <h3 className="text-2xl font-semibold mb-4">Withdraw Money</h3>
      <Input
      type='number'
      name='amount'
      value={amount}
      onChange={(e)=>{setAmount((e.target.value))}}
      placeholder="Enter amount"
      ></Input>
      <button
      disabled = {loading}
        onClick={handleWithdraw}
        className={`px-6 py-3 rounded-lg w-full  bg-green-500 text-white  transition duration-200 hover:bg-green-700 ${loading && 'cursor-not-allowed bg-green-700'}`} 
      >
        {loading?<CircularProgress/>:"Withdraw Money"}
      </button>
    </div>
  );
};

export default WithdrawMoney;

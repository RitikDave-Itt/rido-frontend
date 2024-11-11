
import Input from '@/components/ui/Input';
import CircularProgress from '@mui/material/CircularProgress';
import useAddMoney from './useAddMoney';



const AddMoney = () => {

  const {amount, setAmount , handleAddMoney ,loading}  = useAddMoney();
 

  return (
    <div className="flex flex-col  md:w-full h-full   justify-center items-center w-full">
      <h3 className="text-2xl font-semibold mb-4">Add Money To Wallet</h3>
      <Input
      type='number'
      name='amount'
      value={amount}
      onChange={(e)=>{setAmount((e.target.value))}}
      placeholder="Enter amount"
      ></Input>
      <button
      disabled = {loading}
        onClick={handleAddMoney}
        className={`px-6 py-3 rounded-lg w-full  bg-green-500 text-white  transition duration-200 hover:bg-green-700 ${loading && 'cursor-not-allowed bg-green-700'}`} 
      >
        {loading?<CircularProgress/>:"Add Money"}
      </button>
    </div>
  );
};

export default AddMoney;

import { AppDispatch } from '@/redux/store';
import { fetchWallet } from '@/redux/thunks/userThunks';
import { withdrawWallet } from '@/Service/walletService';
import  { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const useWithdrawMoney = () => {
    const [loading , setLoading] = useState(false);
    const [amount, setAmount] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();


    const handleWithdraw = async ()=>{
        setLoading(true);
        try{
            if(amount!=null&&Number(amount)>0){
        const result = await withdrawWallet(Number(amount));

        if(result){
            toast.success("Withdrawed Successfully")
            setAmount("");
            dispatch(fetchWallet());

        }}
    }
        catch(error){
            console.error(error);
            toast.error("Something went wrong");
        }
        finally{
            setLoading(false);
        }
    }

  return (
{
    amount,
    loading,
    setLoading,
    setAmount,
    handleWithdraw
}  )
}

export default useWithdrawMoney
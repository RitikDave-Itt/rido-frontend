import { AppDispatch } from '@/redux/store';
import { fetchWallet } from '@/redux/thunks/userThunks';
import { addWalletMoney } from '@/Service/walletService';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const useAddMoney = () => {
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();

    const handleAddMoney = async () => {
        setLoading(true);
        try {
            if (amount != null && Number(amount) > 0) {
                const result = await addWalletMoney(Number(amount));
                
                if (result) {
                    toast.success("Money Added To Wallet Successfully");
                    dispatch(fetchWallet());
                    setAmount("");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return {
        amount,
        loading,
        setLoading,
        setAmount,
        handleAddMoney
    };
};

export default useAddMoney;

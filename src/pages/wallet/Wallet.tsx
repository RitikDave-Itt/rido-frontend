import AddMoney from './components/AddMoney';
import WithdrawMoney from './components/WithdrawMoney';
import TransactionRowCard from '@/components/TransactionRowCard';
import useWallet from './useWallet';

const Wallet = () => {
  const {   transactions,
    totalTransactions,
    isAddMoneyVisible,
    handleLoadMore,
    wallet,
  
  } = useWallet();
  

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="md:w-1/3 w-full bg-gray-300 p-4 flex flex-col items-center justify-center">
      
        <div className=" flex-col h-full w-[80%] flex justify-center  items-center mt-5">
        <img src="images/walletAddMoney.png" alt="" className='w-[40%]' />

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

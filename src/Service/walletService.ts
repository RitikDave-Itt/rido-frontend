import axiosRequest from "@/common/request";

export const withdrawWallet = async (amount:number)=> {
    try {
      
  
      const response = await axiosRequest({
        route: `/wallet-transaction/withdraw`, 
        method: 'POST',
        body:{
         amount
        }
      });
  
      return response.data; 
    } catch (error) {
      console.error('Error fetching ride list:', error);
      throw error; 
    }
  };
  
 
export const addWalletMoney = async (amount:number)=> {
    try {
      
  
      const response = await axiosRequest({
        route: `/wallet-transaction/credit`, 
        method: 'POST',
        body:{
         amount
        }
      });
  
      return response.data; 
    } catch (error) {
      console.error('Error fetching ride list:', error);
      throw error; 
    }
  };
  
  
  
  
  
   
  
  
  
  
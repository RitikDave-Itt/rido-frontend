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
  
  
  
  
  
   
  
  export const fetchWalletTransactions = async (pageNo: number, pageSize: number = 10):Promise<{ items: any[]; totalCount: number }> => {
    try {
      const response = await axiosRequest({
        route: `/wallet-transaction/all-by-user?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: 'GET',
      });
  
      return {
        items: response.data?.data || [],
        totalCount: response.data?.totalItem || 0,
      };
    } catch (error) {
      console.error(error);
      
      return {
          items: [],
          totalCount: 0,
      };
    }
  };
  
  
  
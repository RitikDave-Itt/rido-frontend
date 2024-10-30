import { IHistory } from '@/Interfaces/history';
import { fetchHistoryData } from '@/Service/historyService';
import{ useEffect, useState } from 'react';

const useHistory = () => {
  const [page, setPage] = useState(1);
  const [historyList, setHistoryList] = useState<IHistory[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore,setHasMore] = useState(true);
  const pageSize = 10;

  const loadMore = () => {
    if (hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
  
  };

  
  const loadHistoryData = async () => {
    setLoading(true);

    try {
      const result = await fetchHistoryData(page, pageSize); 
      setHistoryList(prevList => [...prevList, ...result.items]); 
      setTotalItems(result.totalCount);
      const morePagesAvailable = (page * pageSize) < result.totalCount;
      setHasMore(morePagesAvailable);

      

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistoryData();
  }, [page]); 

  return {
    historyList,
    totalItems,
    loading,
    page,
    setPage,
    loadMore,
    hasMore
  };
};

export default useHistory;

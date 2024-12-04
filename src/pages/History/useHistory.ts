import { IHistory } from '@/Interfaces/history';
import { fetchBookingById, fetchHistoryData } from '@/Service/historyService';
import{ useEffect, useState } from 'react';

const useHistory = () => {
  const [page, setPage] = useState(1);
  const [historyList, setHistoryList] = useState<IHistory[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore,setHasMore] = useState(true);
  const [selectedRideRequest, setSelectedRideRequest] = useState<any>(null)
  const pageSize = 10;

  const loadMore = () => {
    if (hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
  
  };

  const handleSelect = async (rideId: string) => {

    try {
      
      const bookingDetails = await fetchBookingById(rideId);
      setSelectedRideRequest(bookingDetails); 
    } catch (err) {
      console.error('Error fetching booking details:', err);
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

      if (page === 1 && result.items.length > 0) {
        handleSelect(result.items[0].id); 
      }

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
    hasMore,
    selectedRideRequest,
    setSelectedRideRequest,
    handleSelect,
    setLoading,
  };
};

export default useHistory;

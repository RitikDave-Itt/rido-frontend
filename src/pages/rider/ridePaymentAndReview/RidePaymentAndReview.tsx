import { AppDispatch, RootState } from '@/redux/store';
import { createReview, createRideTransaction } from '@/Service/rideServices';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Input from '@/components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { resetRide } from '@/redux/slices/rideSlice';

const RidePaymentAndReview = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const { rideData } = useSelector((state: RootState) => state.ride);
  const [comment , setComment] = useState("");
  const [bookingId , setBookingId] = useState<string>("")
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();


  const createPayment = async () => {
    try {
      if (rideData) {
        const result = await createRideTransaction(rideData?.id);
        if (result) {
          setPaymentSuccess(true);
          setBookingId(result.bookingId)
          toast.success("Payment Successful");
        }
      }
      else{
        toast.error("Something went wrong");
        navigate("/")
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const giveReview = async () => {
    if (bookingId && rating) {
      try {
        const result = await createReview(bookingId, rating, comment);
        if (result) {
          toast.success("Review submitted successfully!");
          dispatch(resetRide())
          navigate("/");
          
          
        
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to submit the review");
      }
    } else {
      toast.error("Please provide a rating and ensure booking ID is valid.");
    }
  };

 

  return (
    <div className="flex flex-col items-center justify-center  space-y-6 md:w-[40%] min-h-[80vh]">
      <div className="w-[70%] flex justify-center"> 
        {!paymentSuccess ? (
          <img 
            src="/images/paymentInitiate.gif" 
            alt="Initiate Payment" 
            className=" w-2/3 max-w-xs mb-4" 
          />
        ) : (
          <img 
            src="/images/paymentSuccess.gif" 
            alt="Payment Successful" 
            className="w-1/2 max-w-xs mb-4" 
          />
        )}
      </div>

      <div className='w-full flex flex-col justify-center items-center mt-6 h-[50%] '>
        {!paymentSuccess ? (
          <>
                      <h3 className='font-bold text-[1.3rem] text-gray-700'>Deducting from wallet—let's confirm!</h3>

            <div className="text-4xl font-bold text-gray-700 mt-6 p-[5%]">
              ₹ {`${rideData?.price ?? '0.00'}`}
            </div>
            <button 
              onClick={createPayment} 
              className="mt-3 mb-3 bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary_hover md:w-[60%] w-full"
            >
              Make Payment
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-4 w-[80%] h-full mt-6">
            <h3 className='font-bold text-[1.3rem] text-gray-700'>Rate your ride – your journey, your say</h3>
            <Rating
              name="ride-rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              size="large"
              className='p-5 w-full '
            />
            <Input
            type="text"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            placeholder='Comment'
            name='comment'
            required={false}
            className=''
            
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={giveReview}
              className="w-[80%] mt-10"
            >
              Submit Review
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RidePaymentAndReview;

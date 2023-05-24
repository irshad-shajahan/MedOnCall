import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import { useBookSlotMutation } from '../../redux/features/api/apiSlice';

function PaymentScreen() {
  const [bookSlot, bookingActions] = useBookSlotMutation();
  const location = useLocation();
  const data = location.state;

  const bookingHandler = () => {
    if (!bookingActions.isLoading) {
      bookSlot(data);
    }
  };
  return (
    <div>
      <Navbar>
        payment completed for fee
        <button
          type="button"
          className="bg-blue-800 m-8 w-16 rounded-lg"
          onClick={bookingHandler}
        >
          done
        </button>
      </Navbar>
    </div>
  );
}

export default PaymentScreen;

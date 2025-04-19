import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Verify = () => {
  const [searchParams] = useSearchParams();

  const success = searchParams.get('success');
  const appointmentId = searchParams.get('appointmentId');

  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const verifyStripe = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/verifyStripe`,
        { success, appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      navigate('/my-appointments');
    } catch (error) {
      toast.error('Something went wrong during verification.');
      console.error(error);
      navigate('/my-appointments');
    }
  };

  useEffect(() => {
    if (token && appointmentId && success) {
      verifyStripe();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full animate-spin mb-4"></div>
      <h2 className="text-lg font-medium text-gray-700">Verifying your payment...</h2>
      <p className="text-sm text-gray-500 mt-2">Please wait while we confirm your appointment.</p>
    </div>
  );
};

export default Verify;

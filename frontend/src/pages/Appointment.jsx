import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(false);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSolts = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => ([...prev, timeSlots]));
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book appointment');
      return navigate('/login');
    }

    const date = docSlots[slotIndex][0].datetime;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const slotDate = day + "_" + month + "_" + year;

    try {
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getDoctosData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSolts();
    }
  }, [docInfo]);

  return docInfo ? (
    <div className="max-w-5xl mx-auto p-4 bg-gray-50 text-gray-800">
      {/* Doctor Details */}
            <div className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow-lg p-6 mb-8 hover:shadow-xl transition-all">
        <div className="w-full md:w-1/3 bg-gradient-to-r from-green-700 to-primary-light rounded-lg shadow-md overflow-hidden">
            <img className="w-full h-full object-cover" src={docInfo.image} alt="Doctor" />
        </div>
        <div className="flex-1 p-4">
            <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
            {docInfo.name} <img className="w-6" src={assets.verified_icon} alt="Verified" />
            </h2>
            <p className="text-sm text-gray-500 mt-2">{docInfo.degree} - {docInfo.speciality}</p>

            <button className="mt-4 text-xs bg-gradient-to-r from-green-700 to-primary-light text-white px-4 py-2 rounded-full">
            {docInfo.experience} Years of Experience
            </button>

            <div className="mt-6">
            <p className="font-medium text-gray-700">About the Doctor</p>
            <p className="text-sm text-gray-600 mt-2">{docInfo.about}</p>
            </div>

            <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-semibold text-gray-900">Appointment Fee</p>
            <p className="text-2xl font-bold text-green-700">{currencySymbol}{docInfo.fees}</p>
            </div>

            <div className="mt-6 text-gray-600">
            <p className="font-medium">Contact</p>
            <p className="text-sm">{docInfo.contact}</p>
            </div>
        </div>
        </div>


      {/* Booking Slots */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-medium text-gray-800">Select a Booking Slot</h3>
        <div className="mt-4 flex gap-4 overflow-x-auto">
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div
              key={index}
              className={`text-center py-4 min-w-[100px] rounded-md cursor-pointer ${slotIndex === index ? 'bg-green-700 text-white' : 'border border-gray-300'}`}
              onClick={() => setSlotIndex(index)}
            >
              <p className="font-semibold">{daysOfWeek[item[0].datetime.getDay()]}</p>
              <p className="text-sm">{item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-4 overflow-x-auto">
          {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
            <p
              key={index}
              className={`py-2 px-5 rounded-md cursor-pointer text-sm ${item.time === slotTime ? 'bg-green-700 text-white' : 'text-gray-600 border border-gray-300'}`}
              onClick={() => setSlotTime(item.time)}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className="mt-6 bg-green-700 text-white py-3 px-6 rounded-md w-full transition-all hover:bg-green-700-dark"
        >
          Book Appointment
        </button>
      </div>

      {/* Related Doctors */}
      {/* <RelatedDoctors speciality={docInfo.speciality} docId={docId} /> */}
    </div>
  ) : null;
};

export default Appointment;

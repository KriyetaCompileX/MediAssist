import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <section className="my-16 px-6 sm:px-10">
      <div className="text-center text-[#262626]">
        <h2 className="text-3xl font-semibold mb-2">Top Doctors to Book</h2>
        <p className="text-sm text-gray-500 sm:w-1/2 mx-auto">
          Browse through our curated list of trusted doctors and book appointments easily.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="bg-white border border-[#C9D8FF] rounded-full shadow-lg overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-all duration-300 p-4"
          >
            <div className="w-32 h-32 mx-auto bg-[#EAEFFF] rounded-full overflow-hidden mb-4">
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt={item.name}
              />
            </div>
            <div className="text-center">
              <div className={`flex justify-center items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <p className="text-[#262626] text-lg font-medium mt-2">{item.name}</p>
              <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => {
            navigate('/doctors');
            scrollTo(0, 0);
          }}
          className="bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full text-lg font-medium"
        >
          View More Doctors
        </button>
      </div>
    </section>
  );
};

export default TopDoctors;

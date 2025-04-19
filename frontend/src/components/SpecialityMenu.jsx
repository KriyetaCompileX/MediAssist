import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <section id="speciality" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Browse Specialities</h2>
        <p className="text-sm text-gray-500 text-center mt-2 sm:w-1/2 mx-auto">
          Explore a wide range of medical specialities and find the right doctor for your needs. Scheduling made easy!
        </p>
        
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {specialityData.map((item, index) => (
            <Link
              to={`/doctors/${item.speciality}`}
              onClick={() => scrollTo(0, 0)}
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300 p-6 text-center w-40 flex flex-col items-center"
            >
              <img className="w-16 sm:w-24 mb-4 object-contain" src={item.image} alt={item.speciality} />
              <p className="text-base font-medium text-gray-700">{item.speciality}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialityMenu;

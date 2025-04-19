import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relatedDoctors, setRelatedDoctors] = useState([]);

  useEffect(() => {
    if (doctors.length && speciality) {
      const filtered = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId);
      setRelatedDoctors(filtered);
    }
  }, [doctors, speciality, docId]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Related Doctors</h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Explore more specialists in the same field
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {relatedDoctors.map((doc) => (
            <div
              key={doc._id}
              onClick={() => {
                navigate(`/appointment/${doc._id}`);
                scrollTo(0, 0);
              }}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer group border border-gray-200"
            >
              <div className="h-48 w-full overflow-hidden rounded-t-lg">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{doc.name}</h3>
                <p className="text-sm text-gray-500">{doc.speciality}</p>
                <span
                  className={`text-xs font-medium mt-2 inline-block ${
                    doc.available ? 'text-green-600' : 'text-red-400'
                  }`}
                >
                  {doc.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedDoctors;

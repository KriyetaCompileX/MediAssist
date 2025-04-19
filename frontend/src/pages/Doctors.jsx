import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="text-center text-3xl font-semibold text-gray-700">
        <h2>Find the Best Specialist for You</h2>
        <p className="text-lg text-gray-500 mt-2">Browse through the list of available doctors based on your needs.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
        <button 
          onClick={() => setShowFilter(!showFilter)} 
          className={`py-2 px-5 border-2 rounded-full text-sm sm:hidden transition-all ${showFilter ? 'bg-green-700 text-white' : 'border-green-700 text-green-700'}`}
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className={`mt-4 sm:mt-0 sm:flex ${showFilter ? 'block' : 'hidden'}`}>
          <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-4 sm:flex-wrap sm:justify-center">
            {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec) => (
              <button
                key={spec}
                onClick={() => navigate(speciality === spec ? '/doctors' : `/doctors/${spec}`)}
                className={`text-sm sm:text-base px-4 py-2 rounded-lg transition-all duration-300 w-full sm:w-auto text-gray-700 border border-gray-300 hover:bg-green-700 hover:text-white ${
                  speciality === spec ? 'bg-green-700 text-white' : ''
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filterDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <img className="w-full h-48 object-cover" src={item.image} alt={item.name} />
            <div className="p-4">
              <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Doctors

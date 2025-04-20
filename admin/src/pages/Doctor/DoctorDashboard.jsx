import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  const [emrVisibleIndex, setEmrVisibleIndex] = useState(null)

  const toggleEMR = (index) => {
    setEmrVisibleIndex(prevIndex => (prevIndex === index ? null : index))
  }

  const generateFakeEMR = () => {
    const symptoms = ['fever', 'headache', 'fatigue', 'shortness of breath', 'abdominal pain']
    const diagnoses = ['viral infection', 'migraine', 'type 2 diabetes', 'bronchitis', 'gastritis']
    const treatments = [
      'advised rest and increased fluid intake.',
      'prescribed painkillers and advised follow-up in a week.',
      'started on Metformin and recommended dietary changes.',
      'given antibiotics and inhaler usage instructions.',
      'advised antacids and avoidance of spicy food.'
    ]
    const followUps = [
      'Follow-up recommended in 10 days.',
      'Patient advised to monitor symptoms.',
      'Further blood tests suggested in 1 week.',
      'Told to return if symptoms worsen.',
      'Routine review in 2 weeks advised.'
    ]

    const random = (arr) => arr[Math.floor(Math.random() * arr.length)]

    return {
      summary: `Patient presented with ${random(symptoms)} and was diagnosed with ${random(diagnoses)} They were ${random(treatments)} ${random(followUps)}`
    }
  }

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className='m-5'>

      {/* Dashboard Stats */}
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{currency} {dashData.earnings}</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex flex-col border-b px-6 py-3 hover:bg-gray-100' key={index}>

              <div className='flex items-center gap-3'>
                <img className='rounded-full w-10' src={item.userData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                  <p className='text-gray-600'>Booking on {slotDateFormat(item.slotDate)}</p>
                </div>

                {item.cancelled ? (
                  <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-green-500 text-xs font-medium'>Completed</p>
                ) : (
                  <div className='flex gap-2'>
                    <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer' src={assets.cancel_icon} alt="Cancel" />
                    <img onClick={() => completeAppointment(item._id)} className='w-8 cursor-pointer' src={assets.tick_icon} alt="Complete" />
                  </div>
                )}

                <button
                  onClick={() => toggleEMR(index)}
                  className='ml-4 px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100'
                >
                  {emrVisibleIndex === index ? 'Hide EMR' : 'Show EMR'}
                </button>
              </div>

              {/* EMR Section */}
              {emrVisibleIndex === index && (
                <div className='bg-gray-50 mt-2 p-3 rounded text-sm text-gray-700'>
                  <p>{(item.emr?.summary || generateFakeEMR().summary)}</p>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
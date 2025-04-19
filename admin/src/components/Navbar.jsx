import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <header className='w-full bg-white shadow-sm border-b border-gray-200 px-4 sm:px-8 py-3 flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <img
          onClick={() => navigate('/')}
          src={assets.admin_logo}
          alt="Admin Logo"
          className='w-32 sm:w-40 cursor-pointer hover:opacity-80 transition'
        />
        <span className='text-xs sm:text-sm px-3 py-1 border border-gray-400 text-gray-600 rounded-full'>
          {aToken ? 'Admin' : 'Doctor'}
        </span>
      </div>

      <button
        onClick={logout}
        className='bg-primary text-white text-sm px-6 py-2 rounded-full hover:bg-primary-dark transition-all'
      >
        Logout
      </button>
    </header>
  )
}

export default Navbar

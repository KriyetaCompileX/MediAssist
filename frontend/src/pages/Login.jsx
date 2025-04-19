import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const url = state === 'Sign Up' ? '/api/user/register' : '/api/user/login'
      const payload = state === 'Sign Up' ? { name, email, password } : { email, password }

      const { data } = await axios.post(backendUrl + url, payload)

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    }
  }

  useEffect(() => {
    if (token && state === 'login') {
      navigate('/')
    }
  }, [token, state])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <div className='w-full max-w-md bg-white shadow-xl rounded-2xl p-8'>
        <h2 className='text-3xl font-semibold text-green-700 mb-1'>{state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}</h2>
        <p className='text-gray-500 mb-6'>{state === 'Sign Up' ? 'Join us to book appointments with top doctors.' : 'Log in to continue your health journey.'}</p>

        {state === 'Sign Up' && (
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700'
              required
            />
          </div>
        )}

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700'
            required
          />
        </div>

        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700'
            required
          />
        </div>

        <button type='submit' className='w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition-all duration-200'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <p className='text-sm text-gray-600 mt-5 text-center'>
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className='text-green-700 font-medium cursor-pointer underline'
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className='text-green-700 font-medium cursor-pointer underline'
              >
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  )
}

export default Login

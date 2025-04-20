import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [activePayment, setActivePayment] = useState(null)

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const formatDate = (slotDate) => {
        const [day, month, year] = slotDate.split('_');
        return `${day} ${months[Number(month)]} ${year}`;
    }

    const fetchAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } })
            setAppointments(data.appointments.reverse())
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token } })
            data.success ? toast.success(data.message) : toast.error(data.message)
            fetchAppointments()
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    const initRazorpayPayment = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: 'Payment for booked appointment',
            order_id: order.id,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(`${backendUrl}/api/user/verifyRazorpay`, response, { headers: { token } })
                    if (data.success) {
                        toast.success('Payment successful')
                        fetchAppointments()
                    }
                } catch (error) {
                    console.error(error)
                    toast.error(error.message)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const payWithRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/payment-razorpay`, { appointmentId }, { headers: { token } })
            data.success ? initRazorpayPayment(data.order) : toast.error(data.message)
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    const payWithStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/payment-stripe`, { appointmentId }, { headers: { token } })
            data.success ? window.location.replace(data.session_url) : toast.error(data.message)
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) fetchAppointments()
    }, [token])

    return (
        <div className="mt-12 px-4 sm:px-0">
            <h2 className="pb-4 text-2xl font-semibold text-gray-700 border-b">My Appointments</h2>
            <div className="space-y-6 mt-4">
                {appointments.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:items-start border rounded-xl p-4 shadow-sm bg-white">
                        <img src={item.docData.image} alt={item.docData.name} className="w-36 h-36 object-cover rounded-lg bg-[#EAEFFF]" />

                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">{item.docData.name}</h3>
                            <p className="text-sm text-gray-600">{item.docData.speciality}</p>

                            <div className="mt-2 text-sm text-gray-700">
                                <p><span className="font-medium">Address:</span> {item.docData.address.line1}, {item.docData.address.line2}</p>
                                <p className="mt-1"><span className="font-medium">Date & Time:</span> {formatDate(item.slotDate)} at {item.slotTime}</p>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {!item.cancelled && !item.payment && !item.isCompleted && activePayment !== item._id && (
                                    <button onClick={() => setActivePayment(item._id)} className="btn border border-gray-300 text-gray-600 hover:bg-primary hover:text-white transition-all px-4 py-2 rounded-lg">
                                        Pay Online
                                    </button>
                                )}
                                {!item.cancelled && !item.payment && !item.isCompleted && activePayment === item._id && (
                                    <>
                                        {/* <button onClick={() => payWithStripe(item._id)} className="btn border border-gray-300 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg flex items-center">
                                            <img src={assets.stripe_logo} alt="Stripe" className="h-5" />
                                        </button> */}
                                        <button onClick={() => payWithRazorpay(item._id)} className="btn border border-gray-300 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg flex items-center">
                                            <img src={assets.razorpay_logo} alt="Razorpay" className="h-5" />
                                        </button>
                                    </>
                                )}
                                {!item.cancelled && item.payment && !item.isCompleted && (
                                    <button disabled className="btn bg-[#EAEFFF] text-gray-600 px-4 py-2 rounded-lg">
                                        Paid
                                    </button>
                                )}
                                {item.isCompleted && (
                                    <span className="btn border border-green-500 text-green-600 px-4 py-2 rounded-lg">Completed</span>
                                )}
                                {!item.cancelled && !item.isCompleted && (
                                    <button onClick={() => cancelAppointment(item._id)} className="btn border border-gray-300 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition-all">
                                        Cancel Appointment
                                    </button>
                                )}
                                {item.cancelled && !item.isCompleted && (
                                    <span className="btn border border-red-400 text-red-500 px-4 py-2 rounded-lg">Appointment Cancelled</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments

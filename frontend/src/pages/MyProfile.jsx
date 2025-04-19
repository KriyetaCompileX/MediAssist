import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(null)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData()
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            if (image) formData.append('image', image)

            const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(null)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    return userData ? (
        <div className="max-w-xl w-full mx-auto py-8 px-6 bg-white shadow-md rounded-2xl text-sm">
            <div className="flex items-center gap-6">
                {isEdit ? (
                    <label htmlFor="image" className="relative group">
                        <img
                            src={image ? URL.createObjectURL(image) : userData.image}
                            alt="profile"
                            className="w-32 h-32 rounded-full object-cover border shadow-md opacity-80"
                        />
                        {!image && (
                            <img
                                src={assets.upload_icon}
                                alt="upload"
                                className="w-8 h-8 absolute bottom-2 right-2 opacity-80 group-hover:opacity-100"
                            />
                        )}
                        <input
                            type="file"
                            id="image"
                            hidden
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                ) : (
                    <img src={userData.image} alt="profile" className="w-32 h-32 rounded-full object-cover shadow-md" />
                )}

                <div className="flex flex-col gap-2">
                    {isEdit ? (
                        <input
                            className="text-2xl font-semibold bg-gray-100 px-3 py-1 rounded-md"
                            type="text"
                            value={userData.name}
                            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                        />
                    ) : (
                        <p className="text-2xl font-semibold text-[#262626]">{userData.name}</p>
                    )}
                    <p className="text-gray-500">{userData.email}</p>
                </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Contact Information */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-600 underline">Contact Information</h3>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2 text-gray-700">
                    <p className="font-medium">Phone:</p>
                    {isEdit ? (
                        <input
                            className="bg-gray-100 rounded px-2 py-1"
                            value={userData.phone}
                            onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                    ) : (
                        <p>{userData.phone}</p>
                    )}

                    <p className="font-medium">Address:</p>
                    {isEdit ? (
                        <div className="space-y-2">
                            <input
                                className="bg-gray-100 rounded px-2 py-1 w-full"
                                placeholder="Line 1"
                                value={userData.address.line1}
                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                            />
                            <input
                                className="bg-gray-100 rounded px-2 py-1 w-full"
                                placeholder="Line 2"
                                value={userData.address.line2}
                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                            />
                        </div>
                    ) : (
                        <p>{userData.address.line1}<br />{userData.address.line2}</p>
                    )}
                </div>
            </div>

            {/* Basic Information */}
            <div className="mt-6 space-y-4">
                <h3 className="text-sm font-semibold text-gray-600 underline">Basic Information</h3>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2 text-gray-700">
                    <p className="font-medium">Gender:</p>
                    {isEdit ? (
                        <select
                            className="bg-gray-100 rounded px-2 py-1 max-w-[150px]"
                            value={userData.gender}
                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                        >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    ) : (
                        <p>{userData.gender}</p>
                    )}

                    <p className="font-medium">Birthday:</p>
                    {isEdit ? (
                        <input
                            className="bg-gray-100 rounded px-2 py-1 max-w-[150px]"
                            type="date"
                            value={userData.dob}
                            onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                        />
                    ) : (
                        <p>{userData.dob}</p>
                    )}
                </div>
            </div>

            {/* Action Button */}
            <div className="mt-8">
                {isEdit ? (
                    <button
                        onClick={updateUserProfileData}
                        className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition-all"
                    >
                        Save Information
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    ) : null
}

export default MyProfile

import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="px-4 md:px-12 py-10">
      
      <div className="text-center text-2xl text-[#707070]">
        <p>CONTACT <span className="text-gray-700 font-semibold">US</span></p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-10 justify-center items-center md:items-start">
        <img className="w-3/4 md:w-1/3 rounded-lg shadow-lg" src={assets.appointment_img} alt="Contact Image" />
        
        <div className="flex flex-col justify-start items-start gap-6 w-full md:w-2/3">
          
          <div>
            <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
            <p className="text-gray-500">128 Ab Road, Indore 350, MP, India</p>
            <p className="text-gray-500">Tel: (415) 555-0132 <br /> Email: MediAssist@gmail.com</p>
          </div>
          
          <div>
            {/* <p className="font-semibold text-lg text-gray-600">CAREERS AT MEDIASSIST</p>
            <p className="text-gray-500">Learn more about our teams and job openings.</p>
            <button className="border border-black px-8 py-3 text-sm font-medium text-gray-800 rounded-full hover:bg-black hover:text-white transition-all duration-300 ease-in-out">
              Explore Jobs
            </button> */}
          </div>

        </div>
      </div>

    </div>
  )
}

export default Contact

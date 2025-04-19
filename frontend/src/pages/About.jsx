import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="px-6 md:px-12">
      <div className="text-center text-2xl pt-10 text-[#4B4B4B]">
        <p>
          ABOUT <span className="text-greenbg-green-700 font-semibold">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-[360px] rounded-lg shadow-lg" src={assets.about_image} alt="About Us" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-[#3C4A5B]">
          <p>
            Welcome to MediAssist, your reliable ally in handling your healthcare requirements with efficiency and precision.
            At MediAssist, we recognize the hurdles individuals face when organizing doctor visits and maintaining their medical records.
          </p>
          <p>
            MediAssist is devoted to delivering excellence in healthcare innovation. We constantly work to refine our platform, incorporating state-of-the-art technologies to enhance user interaction and offer outstanding service. Whether you’re arranging your initial appointment or managing ongoing health needs, MediAssist is here to assist you throughout the entire process.
          </p>
          <p>
            At MediAssist, our mission is to craft a flawless healthcare experience for each user. We strive to close the gap between patients and healthcare providers, guaranteeing effortless access to the care you deserve when it's most critical.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

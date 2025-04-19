import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-white to-slate-100 rounded-t-3xl shadow-inner px-6 sm:px-10 md:px-16 py-14 mt-40">
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-12 text-sm text-gray-700">

        {/* Brand and About */}
        <div>
          <img className="mb-5 w-36" src={assets.logo} alt="MediAssist Logo" />
          <p className="max-w-md leading-6 text-slate-600">
            <strong>MediAssist</strong> uses advanced multi-agent systems to automate key
            hospital workflows including appointment scheduling, EMR retrieval, and billing.
            Our AI agents streamline administrative tasks, helping providers focus on patient care.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Company</h3>
          <ul className="space-y-2">
            {['Home', 'About us', 'Delivery', 'Privacy policy'].map((item, index) => (
              <li key={index} className="hover:text-indigo-500 cursor-pointer transition-colors">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Get in Touch</h3>
          <ul className="space-y-2">
            <li>📞 +91 8770234040</li>
            <li>📧 MediAssist@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* Divider and Bottom Note */}
      <div className="mt-10 border-t pt-6 text-center text-xs text-slate-500">
        © 2025 MediAssist.com — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

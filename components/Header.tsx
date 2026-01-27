
import React from 'react';
import { HOSPITAL_NAME } from '../constants';

interface HeaderProps {
  onFeedbackClick: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-center">
        <a href="#/" className="flex items-center space-x-3 group">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-100 group-hover:rotate-6 transition-transform">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <h1 className="text-lg font-black text-blue-900 tracking-tighter uppercase leading-none">{HOSPITAL_NAME}</h1>
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">Cổng phản ánh trực tuyến</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default Header;

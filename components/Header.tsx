
import React from 'react';
import { HOSPITAL_NAME, BRANDING } from '../constants';

interface HeaderProps {
  onFeedbackClick: () => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onFeedbackClick, onHomeClick }) => {
  return (
    <header className="glass sticky top-0 z-50 h-20 border-b flex items-center px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4 cursor-pointer group" onClick={onHomeClick}>
          <img 
            src={BRANDING.logo} 
            alt="Logo" 
            className="h-12 w-auto object-contain transition-transform group-hover:scale-105" 
            onError={(e: any) => e.target.src='https://cdn-icons-png.flaticon.com/512/883/883356.png'} 
          />
          <div className="hidden md:block">
            <h1 className="font-extrabold text-blue-900 text-lg leading-none tracking-tight">{HOSPITAL_NAME}</h1>
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">Cổng phản ánh trực tuyến</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={onHomeClick} 
            className="px-5 py-2 rounded-full text-xs font-bold uppercase text-slate-400 hover:bg-slate-100 transition-all"
          >
            Trang chủ
          </button>
          <button 
            onClick={onFeedbackClick}
            className="px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest bg-blue-600 text-white shadow-lg shadow-blue-100 hover:scale-105 transition-all"
          >
            Gửi phản ánh
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

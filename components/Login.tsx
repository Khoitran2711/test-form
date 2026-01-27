
import React, { useState } from 'react';
import { HOSPITAL_NAME } from '../constants';

interface LoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Giả lập đăng nhập đơn giản cho demo
    if (username === 'admin' && password === '123456') {
      localStorage.setItem('hospital_admin_auth', 'true');
      localStorage.setItem('hospital_admin_name', 'Bác sĩ trực lãnh đạo');
      onLoginSuccess();
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không chính xác.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 animate-in zoom-in-95 duration-300">
        <div className="text-center space-y-2">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg shadow-blue-200">
            <i className="fas fa-user-shield"></i>
          </div>
          <h2 className="text-2xl font-black text-gray-900 uppercase">Cán Bộ Đăng Nhập</h2>
          <p className="text-gray-500 text-sm font-medium">{HOSPITAL_NAME}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tên đăng nhập</label>
            <div className="relative">
              <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input 
                required
                type="text" 
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-50 focus:border-blue-500 outline-none transition-all bg-gray-50 font-medium"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mật khẩu</label>
            <div className="relative">
              <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input 
                required
                type="password" 
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-50 focus:border-blue-500 outline-none transition-all bg-gray-50 font-medium"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i> {error}
            </p>
          )}

          <div className="pt-2 space-y-3">
            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-100 transition-all active:scale-95"
            >
              ĐĂNG NHẬP HỆ THỐNG
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-2xl font-bold transition-all"
            >
              QUAY LẠI TRANG CHỦ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
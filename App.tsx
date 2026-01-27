
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import FeedbackForm from './components/FeedbackForm.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import AdminView from './components/AdminView.tsx';
import Login from './components/Login.tsx';
import { HOSPITAL_NAME, ADDRESS, HOTLINE } from './constants.ts';
import { Feedback } from './types.ts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'submit' | 'history'>('submit');
  const [view, setView] = useState<'patient' | 'admin'>('patient');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [history, setHistory] = useState<Feedback[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('hospital_feedback_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    
    const auth = localStorage.getItem('hospital_admin_auth');
    if (auth === 'true') setIsLoggedIn(true);
  }, []);

  const refreshHistory = () => {
    const savedHistory = localStorage.getItem('hospital_feedback_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  };

  const handleLogout = () => {
    localStorage.removeItem('hospital_admin_auth');
    setIsLoggedIn(false);
    setView('patient');
  };

  if (view === 'admin') {
    if (!isLoggedIn) {
      return (
        <Login 
          onLoginSuccess={() => setIsLoggedIn(true)} 
          onCancel={() => setView('patient')} 
        />
      );
    }
    return (
      <AdminView 
        onLogout={handleLogout} 
        onBack={() => setView('patient')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header onFeedbackClick={() => setIsModalOpen(true)} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tight">Cổng Thông Tin Phản Hồi Bệnh Nhân</h2>
          <p className="text-gray-500 font-medium italic">Chúng tôi luôn lắng nghe ý kiến của bạn để nâng cao chất lượng dịch vụ</p>
        </div>

        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200 mb-8 max-w-md mx-auto">
          <button 
            onClick={() => setActiveTab('submit')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'submit' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <i className="fas fa-edit"></i>
            <span>Gửi phản ánh</span>
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'history' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <i className="fas fa-search"></i>
            <span>Tra cứu kết quả</span>
          </button>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'submit' ? (
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 text-center space-y-8">
               <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-file-signature text-4xl"></i>
               </div>
               <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800">Bắt đầu gửi ý kiến của bạn</h3>
                  <p className="text-gray-600 max-w-md mx-auto">Mọi thông tin phản ánh sẽ được chuyển trực tiếp đến Ban Giám đốc và các khoa phòng liên quan để xử lý.</p>
               </div>
               <button 
                 onClick={() => setIsModalOpen(true)}
                 className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-100 hover:scale-[1.02] transition-all flex items-center justify-center space-x-3 mx-auto"
               >
                 <i className="fas fa-plus-circle"></i>
                 <span>ĐÓNG GÓP Ý KIẾN CỦA BẠN</span>
               </button>
               <div className="pt-8 grid grid-cols-2 gap-4 text-left border-t border-gray-50">
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-shield-check text-green-500 mt-1"></i>
                    <p className="text-xs text-gray-500">Bảo mật danh tính 100%</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-history text-blue-500 mt-1"></i>
                    <p className="text-xs text-gray-500">Xử lý trong 24-48 giờ</p>
                  </div>
               </div>
            </div>
          ) : (
            <div className="space-y-6">
              {history.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-dashed border-gray-300">
                  <div className="text-gray-300 text-6xl mb-4">
                    <i className="fas fa-inbox"></i>
                  </div>
                  <p className="text-gray-500 text-lg">Bạn chưa có phản ánh nào được ghi nhận trên thiết bị này.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {history.map((item) => (
                    <div key={item.id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase">{item.type}</span>
                          <span className="text-xs text-gray-400 font-medium">Mã: #{item.id}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                           <span className={`text-xs font-bold px-4 py-2 rounded-full ${
                            item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                            item.status === 'processing' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                            <i className={`fas ${item.status === 'pending' ? 'fa-clock' : item.status === 'processing' ? 'fa-spinner fa-spin' : 'fa-check-circle'} mr-2`}></i>
                            {item.status === 'pending' ? 'Chờ tiếp nhận' : item.status === 'processing' ? 'Đang xử lý' : 'Đã phản hồi'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-2xl">
                          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Nội dung đã gửi - {new Date(item.createdAt).toLocaleDateString('vi-VN')}:</p>
                          <p className="text-gray-800 font-medium leading-relaxed">"{item.content}"</p>
                          <p className="text-xs text-blue-600 mt-2 font-bold flex items-center">
                            <i className="fas fa-hospital mr-2"></i> Khoa: {item.department}
                          </p>
                        </div>

                        {item.status === 'resolved' && item.replyContent ? (
                          <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
                             <p className="text-sm font-bold text-green-700 uppercase tracking-widest mb-2 flex items-center">
                               <i className="fas fa-reply-all mr-2"></i> Phản hồi từ Bệnh viện:
                             </p>
                             <p className="text-green-800 leading-relaxed italic">
                               {item.replyContent}
                             </p>
                             <div className="mt-3 pt-3 border-t border-green-100 text-[10px] text-green-600 font-bold uppercase tracking-wider flex justify-between">
                               <span>Người trả lời: {item.repliedBy || 'Ban Giám đốc'}</span>
                               <span>Ngày: {item.repliedAt ? new Date(item.repliedAt).toLocaleDateString('vi-VN') : ''}</span>
                             </div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-gray-400 p-2 italic text-sm">
                             <i className="fas fa-info-circle"></i>
                             <span>Ý kiến đang được Ban Giám đốc xem xét giải quyết.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-gray-900 font-black uppercase text-sm">{HOSPITAL_NAME}</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-xs text-gray-500">
            <span className="flex items-center"><i className="fas fa-map-marker-alt mr-2 text-blue-500"></i> {ADDRESS}</span>
            <span className="flex items-center"><i className="fas fa-phone-alt mr-2 text-green-500"></i> Hotline: {HOTLINE}</span>
          </div>
          <div className="pt-4 border-t border-gray-50">
             <button 
               onClick={() => setView('admin')}
               className="text-[10px] text-blue-400 font-bold uppercase tracking-widest hover:text-blue-600 transition-colors"
             >
               Dành cho cán bộ nhân viên đăng nhập
             </button>
          </div>
          <p className="text-[10px] text-gray-300 font-bold tracking-widest uppercase">Hệ thống ghi nhận phản ánh điện tử © 2024</p>
        </div>
      </footer>

      <FeedbackForm 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          refreshHistory();
        }} 
      />
      <AIAssistant />
    </div>
  );
};

export default App;

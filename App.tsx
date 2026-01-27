
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
    try {
      const savedHistory = localStorage.getItem('hospital_feedback_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
      const auth = localStorage.getItem('hospital_admin_auth');
      if (auth === 'true') setIsLoggedIn(true);
    } catch (e) {
      console.error("Lỗi khi nạp dữ liệu từ LocalStorage:", e);
    }
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
        <div className="text-center mb-10 space-y-2 animate-in fade-in duration-700">
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
                  <p className="text-gray-600 max-w-md mx-auto">Mọi thông tin phản ánh sẽ được chuyển trực tiếp đến Ban Giám đốc để xem xét.</p>
               </div>
               <button 
                 onClick={() => setIsModalOpen(true)}
                 className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-100 hover:scale-[1.02] transition-all flex items-center justify-center space-x-3 mx-auto"
               >
                 <i className="fas fa-plus-circle"></i>
                 <span>ĐÓNG GÓP Ý KIẾN CỦA BẠN</span>
               </button>
            </div>
          ) : (
            <div className="space-y-6">
              {history.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-dashed border-gray-300">
                  <i className="fas fa-inbox text-gray-200 text-6xl mb-4"></i>
                  <p className="text-gray-500 text-lg">Bạn chưa có phản ánh nào được ghi nhận.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {history.map((item) => (
                    <div key={item.id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase">{item.type}</span>
                          <span className="text-xs text-gray-400 font-medium tracking-widest">#{item.id}</span>
                        </div>
                        <span className={`text-xs font-bold px-4 py-2 rounded-full ${
                          item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {item.status === 'pending' ? 'Chờ tiếp nhận' : 'Đã phản hồi'}
                        </span>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-2xl border-l-4 border-blue-200">
                          <p className="text-gray-800 font-medium leading-relaxed italic">"{item.content}"</p>
                          <div className="mt-3 flex items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            <i className="fas fa-hospital mr-2"></i> {item.department} • {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                          </div>
                        </div>
                        {item.status === 'resolved' && (
                          <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                             <p className="text-sm font-bold text-blue-800 uppercase tracking-widest mb-2">Phản hồi từ bệnh viện:</p>
                             <p className="text-blue-900 leading-relaxed">{item.replyContent}</p>
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

      <footer className="bg-white border-t border-gray-100 py-10 mt-12">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-gray-900 font-black uppercase text-sm tracking-tight">{HOSPITAL_NAME}</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-xs text-gray-400 font-medium">
            <span className="flex items-center"><i className="fas fa-map-marker-alt mr-2 text-blue-500"></i> {ADDRESS}</span>
            <span className="flex items-center"><i className="fas fa-phone-alt mr-2 text-green-500"></i> {HOTLINE}</span>
          </div>
          <button 
            onClick={() => setView('admin')}
            className="text-[10px] text-gray-300 font-black uppercase tracking-[0.2em] hover:text-blue-500 transition-colors pt-4"
          >
            Quản trị viên Đăng nhập
          </button>
        </div>
      </footer>

      <FeedbackForm isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); refreshHistory(); }} />
      <AIAssistant />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import FeedbackForm from './components/FeedbackForm.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import AdminView from './components/AdminView.tsx';
import Login from './components/Login.tsx';
import { HOSPITAL_NAME, ADDRESS, HOTLINE, BRANDING } from './constants.ts';
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
      if (savedHistory) setHistory(JSON.parse(savedHistory));
      const auth = localStorage.getItem('hospital_admin_auth');
      if (auth === 'true') setIsLoggedIn(true);
    } catch (e) {
      console.error("Lỗi khi nạp dữ liệu:", e);
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
      return <Login onLoginSuccess={() => setIsLoggedIn(true)} onCancel={() => setView('patient')} />;
    }
    return <AdminView onLogout={handleLogout} onBack={() => setView('patient')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans fade-in">
      <Header onFeedbackClick={() => setIsModalOpen(true)} onHomeClick={() => { setActiveTab('submit'); setView('patient'); }} />
      
      <main className="flex-grow">
        {activeTab === 'submit' && (
          <div className="space-y-0">
            {/* Hero Section */}
            <section className="relative h-[480px] flex items-center overflow-hidden">
                <img src={BRANDING.heroImage} className="absolute inset-0 w-full h-full object-cover" alt="Bệnh viện" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/60 to-transparent"></div>
                <div className="container mx-auto px-6 relative z-10 text-white max-w-5xl">
                    <span className="bg-blue-500/30 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 inline-block">Ninh Thuan General Hospital</span>
                    <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 tracking-tight">VÌ SỨC KHỎE CỘNG ĐỒNG<br/><span className="text-blue-400 italic font-medium">Lắng nghe để sẻ chia</span></h2>
                    <p className="text-lg opacity-90 font-medium mb-10 max-w-xl border-l-4 border-blue-400 pl-6 leading-relaxed">{BRANDING.slogan}</p>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => setIsModalOpen(true)} className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-105 transition-all">Gửi phản ánh ngay</button>
                        <button onClick={() => setActiveTab('history')} className="bg-blue-600/30 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-all">Tra cứu kết quả</button>
                    </div>
                </div>
            </section>

            {/* Info Cards */}
            <div className="container mx-auto px-6 max-w-5xl -mt-16 relative z-20 pb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-white hover:-translate-y-2 transition-transform">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><i className="fas fa-shield-heart text-xl"></i></div>
                  <h3 className="font-bold text-slate-800 mb-2">Bảo mật thông tin</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">Mọi thông tin cá nhân của người phản ánh được cam kết giữ kín tuyệt đối.</p>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-white hover:-translate-y-2 transition-transform">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6"><i className="fas fa-bolt text-xl"></i></div>
                  <h3 className="font-bold text-slate-800 mb-2">Xử lý nhanh chóng</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">Ý kiến được chuyển thẳng tới Ban Giám đốc để giải quyết trong thời gian sớm nhất.</p>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-white hover:-translate-y-2 transition-transform">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6"><i className="fas fa-robot text-xl"></i></div>
                  <h3 className="font-bold text-slate-800 mb-2">Trợ lý ảo AI</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">Hỗ trợ giải đáp các quy trình và thắc mắc của bệnh nhân 24/7 qua chatbot.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Lịch sử phản ánh</h2>
               <p className="text-slate-400 mt-2">Tra cứu tình trạng và phản hồi từ phía bệnh viện</p>
            </div>
            
            <div className="space-y-6">
              {history.length === 0 ? (
                <div className="bg-white p-20 rounded-[3rem] text-center border-4 border-dashed border-slate-100">
                  <i className="fas fa-inbox text-slate-100 text-7xl mb-6"></i>
                  <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Không tìm thấy phản ánh nào trên thiết bị này</p>
                  <button onClick={() => setActiveTab('submit')} className="mt-8 text-blue-600 font-black uppercase text-xs">Về trang gửi phản ánh</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {history.map((item) => (
                    <div key={item.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-lg transition-all">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-tighter">MÃ: #{item.id}</span>
                          <span className="text-xs text-slate-300 font-bold">{new Date(item.createdAt).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${
                          item.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' : 'bg-green-50 text-green-700 border border-green-100'
                        }`}>
                          {item.status === 'pending' ? 'Đang chờ' : 'Đã phản hồi'}
                        </span>
                      </div>
                      <div className="space-y-4">
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">{item.department}</p>
                        <div className="bg-slate-50 p-6 rounded-2xl italic text-slate-600 text-sm font-medium border-l-8 border-slate-200 shadow-inner">
                          "{item.content}"
                        </div>
                        {item.status === 'resolved' && (
                          <div className="mt-6 bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl animate-in zoom-in-95">
                             <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-xs"><i className="fas fa-reply"></i></div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Phản hồi từ Ban Giám đốc:</p>
                             </div>
                             <p className="text-sm font-medium leading-relaxed opacity-90">{item.replyContent}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-100 py-16 mt-12">
        <div className="container mx-auto px-6 text-center space-y-8">
          <img src={BRANDING.logo} alt="Logo" className="h-16 mx-auto opacity-40 grayscale hover:grayscale-0 transition-all" />
          <div className="space-y-2">
            <p className="text-slate-900 font-black uppercase text-sm tracking-tight">{HOSPITAL_NAME}</p>
            <p className="text-xs text-slate-400 font-medium max-w-md mx-auto">{ADDRESS}</p>
            <p className="text-xs text-blue-600 font-bold pt-2 uppercase tracking-widest">Hotline phản ánh: {HOTLINE}</p>
          </div>
          <div className="pt-10 border-t border-slate-50 max-w-xs mx-auto">
            <button onClick={() => setView('admin')} className="text-[10px] text-slate-300 font-black uppercase tracking-[0.4em] hover:text-blue-500 transition-colors">Cán bộ đăng nhập</button>
          </div>
        </div>
      </footer>

      <FeedbackForm isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); refreshHistory(); }} />
      <AIAssistant />
    </div>
  );
};

export default App;

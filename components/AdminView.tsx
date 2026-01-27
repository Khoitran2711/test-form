
import React, { useState, useEffect } from 'react';
import { Feedback } from '../types';
import { HOSPITAL_NAME } from '../constants';

interface AdminViewProps {
  onLogout: () => void;
  onBack: () => void;
}

const AdminView: React.FC<AdminViewProps> = ({ onLogout, onBack }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = JSON.parse(localStorage.getItem('hospital_feedback_history') || '[]');
    setFeedbacks(data);
  };

  const handleReply = () => {
    if (!selectedFeedback || !replyText.trim()) return;
    
    setIsReplying(true);
    
    setTimeout(() => {
      const staffName = localStorage.getItem('hospital_admin_name') || 'Ban Giám đốc';
      const updatedFeedbacks = feedbacks.map(f => {
        if (f.id === selectedFeedback.id) {
          return {
            ...f,
            status: 'resolved' as const,
            replyContent: replyText,
            repliedAt: new Date().toISOString(),
            repliedBy: staffName
          };
        }
        return f;
      });

      localStorage.setItem('hospital_feedback_history', JSON.stringify(updatedFeedbacks));
      setFeedbacks(updatedFeedbacks);
      setSelectedFeedback(null);
      setReplyText('');
      setIsReplying(false);
    }, 1000);
  };

  const filteredFeedbacks = feedbacks.filter(f => {
    if (filter === 'all') return true;
    return f.status === filter;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Admin */}
      <header className="bg-white border-b border-gray-200 h-20 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-900 p-2 rounded-xl text-white">
              <i className="fas fa-user-tie"></i>
            </div>
            <div>
              <h1 className="text-lg font-black text-blue-900 tracking-tight leading-none uppercase">Hệ thống Quản trị</h1>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{HOSPITAL_NAME}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <button onClick={onBack} className="text-gray-500 font-bold text-sm hover:text-blue-600 transition-colors hidden md:block">Xem với vai trò bệnh nhân</button>
             <button onClick={onLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-100 transition-all flex items-center">
               <i className="fas fa-sign-out-alt mr-2"></i> Đăng xuất
             </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-black text-gray-900 uppercase">Danh sách phản ánh ({feedbacks.length})</h2>
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-50'}`}
            >Tất cả</button>
            <button 
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'text-gray-400 hover:bg-gray-50'}`}
            >Chờ trả lời</button>
            <button 
              onClick={() => setFilter('resolved')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${filter === 'resolved' ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-50'}`}
            >Đã giải quyết</button>
          </div>
        </div>

        {filteredFeedbacks.length === 0 ? (
          <div className="bg-white p-20 rounded-[2.5rem] border border-dashed border-gray-200 text-center space-y-4">
             <i className="fas fa-check-circle text-gray-200 text-6xl"></i>
             <p className="text-gray-400 font-bold uppercase tracking-widest">Không có phản ánh nào cần xử lý</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredFeedbacks.map(f => (
              <div key={f.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full uppercase mr-2">{f.type}</span>
                    <span className="text-[10px] font-bold text-gray-400">Mã phiếu: #{f.id}</span>
                  </div>
                  <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase ${
                    f.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {f.status === 'pending' ? 'Đang chờ' : 'Đã trả lời'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-3">
                    <p className="text-gray-900 font-black flex items-center text-sm">
                      <i className="fas fa-user-circle mr-2 text-blue-500"></i> {f.patientName} - {f.phoneNumber}
                    </p>
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">
                      <i className="fas fa-hospital mr-2"></i> {f.department}
                    </p>
                    <div className="bg-slate-50 p-4 rounded-2xl italic text-gray-700 text-sm leading-relaxed">
                      "{f.content}"
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{new Date(f.createdAt).toLocaleString('vi-VN')}</p>
                  </div>

                  <div className="md:border-l border-gray-100 md:pl-6 h-full flex flex-col justify-center">
                    {f.status === 'resolved' ? (
                      <div className="bg-green-50 p-4 rounded-2xl border border-green-100 space-y-2">
                        <p className="text-[10px] font-black text-green-700 uppercase tracking-widest flex items-center">
                          <i className="fas fa-reply-all mr-2"></i> Đã phản hồi:
                        </p>
                        <p className="text-sm text-green-800 leading-relaxed font-medium">{f.replyContent}</p>
                        <p className="text-[10px] text-green-600 font-bold italic pt-2 border-t border-green-100">
                          Bởi: {f.repliedBy}
                        </p>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setSelectedFeedback(f)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center space-x-2"
                      >
                        <i className="fas fa-reply"></i>
                        <span>TRẢ LỜI NGAY</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Trả lời */}
      {selectedFeedback && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm" onClick={() => setSelectedFeedback(null)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="bg-blue-600 p-8 text-white">
               <h3 className="text-xl font-black uppercase">Giải đáp phản ánh #{selectedFeedback.id}</h3>
               <p className="text-blue-100 text-sm mt-1 opacity-80">Trả lời ý kiến của bệnh nhân: {selectedFeedback.patientName}</p>
             </div>
             <div className="p-8 space-y-6">
                <div className="bg-gray-50 p-4 rounded-2xl text-sm italic text-gray-600 border-l-4 border-blue-400">
                  "{selectedFeedback.content}"
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nội dung phản hồi chính thức</label>
                   <textarea 
                     rows={6}
                     className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 focus:border-blue-500 outline-none transition-all bg-gray-50 resize-none font-medium"
                     placeholder="Nhập nội dung trả lời cho bệnh nhân..."
                     value={replyText}
                     onChange={(e) => setReplyText(e.target.value)}
                   ></textarea>
                </div>
                <div className="flex space-x-3">
                   <button 
                     disabled={isReplying}
                     onClick={handleReply}
                     className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-green-100 hover:bg-green-700 transition-all flex items-center justify-center space-x-2"
                   >
                     {isReplying ? <i className="fas fa-circle-notch animate-spin"></i> : <><i className="fas fa-check-circle"></i><span>XÁC NHẬN PHẢN HỒI</span></>}
                   </button>
                   <button 
                     onClick={() => setSelectedFeedback(null)}
                     className="px-6 bg-gray-100 text-gray-500 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all"
                   >HỦY</button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;

import React, { useState } from 'react';
import { DEPARTMENTS, HOSPITAL_NAME } from '../constants';
import { FeedbackType, Feedback } from '../types';

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dept: '',
    type: FeedbackType.COMPLAINT,
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newFeedback: Feedback = {
        id: Math.random().toString(36).substr(2, 6).toUpperCase(),
        patientName: formData.name,
        phoneNumber: formData.phone,
        department: formData.dept,
        type: formData.type,
        content: formData.content,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };

      const existingHistory = JSON.parse(localStorage.getItem('hospital_feedback_history') || '[]');
      localStorage.setItem('hospital_feedback_history', JSON.stringify([newFeedback, ...existingHistory]));

      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', phone: '', dept: '', type: FeedbackType.COMPLAINT, content: '' });
      
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 border-4 border-white">
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 z-20 w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-full flex items-center justify-center transition-colors"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="bg-gradient-to-br from-blue-800 to-blue-600 px-10 py-12 text-white">
          <h2 className="text-3xl font-black uppercase tracking-tight">Phiếu Ý Kiến</h2>
          <p className="text-blue-100 mt-2 opacity-80 font-medium">Sự đóng góp của bạn giúp chúng tôi cải thiện chất lượng phục vụ.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6 max-h-[70vh] overflow-y-auto">
          {showSuccess ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto text-4xl shadow-xl shadow-green-100">
                <i className="fas fa-check animate-bounce"></i>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Gửi Thành Công!</h3>
                <p className="text-slate-400 font-medium italic">Chúng tôi sẽ sớm phản hồi ý kiến của bạn.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Họ và tên</label>
                  <input 
                    required type="text" 
                    className="w-full px-7 py-4 rounded-2xl border-2 border-slate-50 focus:border-blue-500 outline-none transition-all bg-slate-50 font-bold text-sm shadow-inner"
                    placeholder="Nguyễn Văn A"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Số điện thoại</label>
                  <input 
                    required type="tel" 
                    className="w-full px-7 py-4 rounded-2xl border-2 border-slate-50 focus:border-blue-500 outline-none transition-all bg-slate-50 font-bold text-sm shadow-inner"
                    placeholder="0912..."
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Khoa/Phòng & Loại phản ánh</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select 
                    required
                    className="w-full px-7 py-4 rounded-2xl border-2 border-slate-50 focus:border-blue-500 outline-none bg-slate-50 font-bold text-sm shadow-inner appearance-none cursor-pointer"
                    value={formData.dept}
                    onChange={(e) => setFormData({...formData, dept: e.target.value})}
                  >
                    <option value="">-- Khoa --</option>
                    {DEPARTMENTS.map(dept => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                  <select 
                    required
                    className="w-full px-7 py-4 rounded-2xl border-2 border-slate-50 focus:border-blue-500 outline-none bg-slate-50 font-bold text-sm shadow-inner appearance-none cursor-pointer"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                  >
                    {Object.values(FeedbackType).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Nội dung chi tiết</label>
                <textarea 
                  required rows={5}
                  className="w-full px-7 py-4 rounded-[2rem] border-2 border-slate-50 focus:border-blue-500 outline-none transition-all bg-slate-50 resize-none font-bold text-sm shadow-inner"
                  placeholder="Mô tả cụ thể sự việc..."
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                ></textarea>
              </div>

              <div className="pt-4 flex flex-col space-y-4">
                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className={`w-full py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest text-white shadow-2xl transition-all flex items-center justify-center space-x-3 ${
                    isSubmitting ? 'bg-slate-300' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100 hover:scale-[1.02]'
                  }`}
                >
                  {isSubmitting ? <i className="fas fa-circle-notch animate-spin text-xl"></i> : <span>Xác nhận gửi thông tin</span>}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;

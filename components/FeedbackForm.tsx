
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

      // Save to local storage
      const existingHistory = JSON.parse(localStorage.getItem('hospital_feedback_history') || '[]');
      const updatedHistory = [newFeedback, ...existingHistory];
      localStorage.setItem('hospital_feedback_history', JSON.stringify(updatedHistory));

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

      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full flex items-center justify-center transition-colors"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-10 text-white">
          <h2 className="text-2xl font-black uppercase">Phiếu Ý Kiến Phản Ánh</h2>
          <p className="text-blue-100 mt-1 opacity-80 font-medium">Ban Giám đốc sẽ tiếp nhận và xử lý ý kiến của bạn.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[75vh] overflow-y-auto">
          {showSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">
                <i className="fas fa-check-circle animate-pulse"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 tracking-tight">Gửi Thành Công!</h3>
              <p className="text-gray-500 font-medium italic">Vui lòng vào tab "Tra cứu" để xem kết quả sau ít phút.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Họ và tên</label>
                  <input 
                    required type="text" 
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-gray-50 focus:border-blue-500 outline-none transition-all bg-gray-50 font-medium"
                    placeholder="Nguyễn Văn A"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Số điện thoại</label>
                  <input 
                    required type="tel" 
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-gray-50 focus:border-blue-500 outline-none transition-all bg-gray-50 font-medium"
                    placeholder="0912345..."
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Khoa/Phòng</label>
                  <select 
                    required
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-gray-50 focus:border-blue-500 outline-none transition-all bg-gray-50 appearance-none font-medium cursor-pointer"
                    value={formData.dept}
                    onChange={(e) => setFormData({...formData, dept: e.target.value})}
                  >
                    <option value="">-- Chọn Khoa --</option>
                    {DEPARTMENTS.map(dept => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Loại ý kiến</label>
                  <select 
                    required
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-gray-50 focus:border-blue-500 outline-none transition-all bg-gray-50 appearance-none font-medium cursor-pointer"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                  >
                    {Object.values(FeedbackType).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Chi tiết phản ánh</label>
                <textarea 
                  required rows={5}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-gray-50 focus:border-blue-500 outline-none transition-all bg-gray-50 resize-none font-medium"
                  placeholder="Hãy mô tả rõ ràng sự việc để bệnh viện giải quyết chính xác nhất..."
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                ></textarea>
              </div>

              <div className="pt-4 flex flex-col space-y-3">
                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className={`w-full py-5 rounded-2xl font-black text-lg text-white shadow-xl transition-all flex items-center justify-center space-x-3 group ${
                    isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-100'
                  }`}
                >
                  {isSubmitting ? (
                    <i className="fas fa-circle-notch animate-spin"></i>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                      <span>XÁC NHẬN GỬI Ý KIẾN</span>
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">Ban Giám đốc cam kết giữ bí mật thông tin người phản ánh</p>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;

import { HospitalDept, FeedbackType } from './types';

export const HOSPITAL_NAME = "Bệnh viện Đa khoa Tỉnh Ninh Thuận";
export const BRANDING = {
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Logo_BVDK_Ninh_Thuan.png/600px-Logo_BVDK_Ninh_Thuan.png",
  heroImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2053",
  slogan: "Tận tâm - Chất lượng - Văn minh - Hướng tới sự hài lòng của người bệnh"
};

export const ADDRESS = "Số 20 Nguyễn Văn Cừ, Phường Văn Hải, TP. Phan Rang - Tháp Chàm, Ninh Thuận";
export const HOTLINE = "0259.3822.660";

export const DEPARTMENTS: HospitalDept[] = [
  { id: '1', name: 'Khoa Cấp cứu' },
  { id: '2', name: 'Khoa Khám bệnh' },
  { id: '3', name: 'Khoa Nội tổng hợp' },
  { id: '4', name: 'Khoa Ngoại chấn thương' },
  { id: '5', name: 'Khoa Sản' },
  { id: '6', name: 'Khoa Nhi' },
  { id: '7', name: 'Khoa Hồi sức tích cực' },
  { id: '9', name: 'Khoa Mắt' },
  { id: '10', name: 'Khoa Tai Mũi Họng' }
];

export const MOCK_STATS = [
  { name: 'Tháng 1', count: 42 },
  { name: 'Tháng 2', count: 35 },
  { name: 'Tháng 3', count: 58 },
  { name: 'Tháng 4', count: 64 },
  { name: 'Tháng 5', count: 49 },
  { name: 'Tháng 6', count: 72 },
];

export const MOCK_DISTRIBUTION = [
  { name: FeedbackType.PRAISE, value: 45, color: '#10b981' },
  { name: FeedbackType.COMPLAINT, value: 20, color: '#ef4444' },
  { name: FeedbackType.SUGGESTION, value: 25, color: '#3b82f6' },
  { name: FeedbackType.QUESTION, value: 10, color: '#f59e0b' },
];

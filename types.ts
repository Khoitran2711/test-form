
export enum FeedbackType {
  PRAISE = 'Khen ngợi',
  COMPLAINT = 'Góp ý/Phản ánh',
  SUGGESTION = 'Đề xuất cải tiến',
  QUESTION = 'Câu hỏi/Thắc mắc'
}

export interface Feedback {
  id: string;
  patientName: string;
  phoneNumber: string;
  department: string;
  type: FeedbackType;
  content: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'resolved';
  replyContent?: string;
  repliedAt?: string;
  repliedBy?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface HospitalDept {
  id: string;
  name: string;
}
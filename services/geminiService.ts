
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getGeminiResponse = async (userPrompt: string, history: {role: string, content: string}[] = []) => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please check your environment.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `
    Bạn là trợ lý ảo chính thức của Bệnh viện Đa khoa Tỉnh Ninh Thuận. 
    Nhiệm vụ của bạn là:
    1. Hướng dẫn bệnh nhân cách gửi phản ánh, góp ý một cách lịch sự, khách quan.
    2. Trả lời các câu hỏi thường gặp về quy trình khám chữa bệnh tại bệnh viện Ninh Thuận.
    3. Giúp người dùng tóm tắt hoặc viết lại nội dung góp ý của họ sao cho rõ ràng và mang tính xây dựng nhất.
    4. Luôn giữ thái độ chuyên nghiệp, đồng cảm và trung thực. 
    5. Nếu người dùng hỏi về thông tin y khoa chuyên sâu, hãy khuyên họ nên gặp bác sĩ trực tiếp.
    
    Thông tin bệnh viện:
    - Tên: Bệnh viện Đa khoa Tỉnh Ninh Thuận.
    - Địa chỉ: Số 20 Nguyễn Văn Cừ, Văn Hải, Phan Rang - Tháp Chàm.
    - Hotline: 0259.3822.660.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Xin lỗi, tôi không thể xử lý yêu cầu lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi khi kết nối với hệ thống trí tuệ nhân tạo. Vui lòng thử lại sau.";
  }
};

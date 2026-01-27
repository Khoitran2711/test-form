
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("React đang khởi tạo...");

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React đã render thành công.");
  } catch (error) {
    console.error("Lỗi khi render React:", error);
  }
} else {
  console.error("Không tìm thấy phần tử #root");
}

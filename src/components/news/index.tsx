import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom'; // Đảm bảo import ReactDOM để render ứng dụng
import NewsSection from './NewsSection'; // Đảm bảo đường dẫn import chính xác
import './styles.css';


const App = () => {
  return (
    <div>
      <h1>Trang tin Cư Jút</h1>
      <NewsSection /> {/* Render NewsSection component */}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Đảm bảo rằng có phần tử với id 'root' trong file index.html
);

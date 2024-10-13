import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Hiệu ứng gradient chuyển màu động
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Hiệu ứng nền chuyển động hạt
const particleAnimation = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-100vh); }
`;

const FullScreenContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(270deg, #3498db, #8e44ad, #e74c3c, #f1c40f);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 10s ease infinite;
  overflow: hidden;
  position: relative;
  margin: 0;
`;

const Particle = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  width: 10px;
  height: 10px;
  bottom: -10px;
  left: ${() => Math.random() * 100}%;
  animation: ${particleAnimation} 5s linear infinite;
  animation-delay: ${() => Math.random() * 5}s;
`;

const LoaderContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  position: absolute;
  width: 250px;
  height: 250px;
  border: 16px solid rgba(255, 255, 255, 0.2); /* Màu nền của loader mờ */
  border-top: 16px solid white; /* Màu trắng cho hiệu ứng xoay */
  border-radius: 50%; /* Tạo hình tròn */
  animation: ${spin} 2s linear infinite;
`;

const Logo = styled.img`
  position: relative;
  width: 230px;
  height: 230px;
  border-radius: 50%; /* Logo tròn */
  object-fit: cover; /* Đảm bảo logo không bị biến dạng */
`;

const LoadingPage: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // Chuyển tiếp vào App sau 3 giây
    return () => clearTimeout(timer); // Cleanup nếu component bị unmount
  }, [onFinish]);

  return (
    <FullScreenContainer>
      <LoaderContainer>
        <Loader />
        <Logo src="https://mini.dno.vn/logo.png" alt="Logo" /> {/* Đổi thành đường dẫn logo */}
      </LoaderContainer>
      {/* Thêm hiệu ứng hạt di chuyển */}
      {Array.from({ length: 50 }).map((_, index) => (
        <Particle key={index} />
      ))}
    </FullScreenContainer>
  );
};

export default LoadingPage;

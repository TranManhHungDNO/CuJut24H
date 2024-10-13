import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "zmp-ui";
import { officialAccounts } from "./officialAccounts"; // Import danh sách từ file officialAccounts.tsx
import tw from "twin.macro"; // Tailwind CSS nếu bạn đang sử dụng

const ScrollContainer = styled.div`
  width: 90%; /* Giới hạn chiều rộng tổng cộng là 90% */
  height: 200px; /* Hiển thị 4 link */
  overflow: hidden;
  position: relative;
  margin: 0 auto; /* Căn giữa */
  ${tw`bg-transparent`}; /* Nền trong suốt hoặc trùng nền */
`;

const ScrollContent = styled.div`
  display: flex;
  flex-direction: column;
  transition: transform 1s ease-in-out; /* Hiệu ứng cuộn mượt mà */
`;

const WebItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  ${tw`text-gray-700`}; /* Màu chữ trùng với các thành phần khác */
  &:hover {
    ${tw`bg-transparent`}; /* Tránh đổi màu khi hover */
  }
`;

const ListOA: React.FC = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prevIndex) =>
        prevIndex + 4 >= officialAccounts.length ? 0 : prevIndex + 4
      );
    }, 5000); // Dừng lại 5 giây trước khi cuộn tiếp

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  return (
    <ScrollContainer>
      <ScrollContent style={{ transform: `translateY(-${visibleIndex * 50}px)` }}>
        {officialAccounts.map((item) => (
          <WebItem key={item.oaId}>
            <span>{item.oaName}</span>
            <Button
              type="highlight"
              onClick={() => window.open(item.oaLink, "_blank")} // Mở trang mới
            >
              Truy cập
            </Button>
          </WebItem>
        ))}
      </ScrollContent>
    </ScrollContainer>
  );
};

export default ListOA;

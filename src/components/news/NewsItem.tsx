import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';

const NewsListContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Cho phép các item xuống dòng nếu không đủ chỗ */
  gap: 20px; /* Khoảng cách giữa các item */
`;

const NewsItemStyled = styled.div`
  display: flex; /* Sử dụng flexbox để sắp xếp hình ảnh và nội dung */
  flex: 1 1 calc(33.33% - 20px); /* Chiều rộng của mỗi item là 1/3 chiều rộng của container */
  border: 1px solid #eaeaea; /* Đường viền xung quanh mỗi item */
  border-radius: 8px; /* Bo góc */
  overflow: hidden; /* Để tránh phần dư ra bên ngoài */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Đổ bóng cho item */
`;

const NewsImage = styled.img`
  width: 50%; /* Giảm kích thước ảnh xuống 50% */
  height: auto; /* Giữ tỷ lệ khung hình của ảnh */
`;

const NewsDescription = styled.div`
  padding: 10px; /* Padding cho nội dung bên phải */
  display: flex;
  flex-direction: column; /* Để tiêu đề và nội dung nằm theo chiều dọc */
  justify-content: space-between; /* Để căn chỉnh tiêu đề và nội dung */
  flex-grow: 1; /* Để cho nội dung chiếm toàn bộ không gian còn lại */
`;

const NewsTitle = styled.h2`
  font-weight: bold; /* In đậm tiêu đề */
  font-size: 1.2em; /* Kích thước tiêu đề lớn hơn */
  color: #007bff; /* Màu xanh da trời */
  margin: 0; /* Bỏ khoảng cách mặc định */
`;

const NewsDate = styled.p`
  font-size: 14px; /* Kích thước font cho ngày tháng */
  color: #888; /* Màu cho ngày tháng */
  margin-top: 5px; /* Khoảng cách trên cho ngày tháng */
`;

const NewsList: React.FC<{ articles: any[]; onClick: (link: string) => void }> = ({ articles, onClick }) => {
  return (
    <NewsListContainer>
      {articles.map((article, index) => (
        <NewsItemStyled key={index} onClick={() => onClick(article.link)}>
          {article.imageUrl && <NewsImage src={article.imageUrl} alt={article.title} />}
          <NewsDescription>
            <NewsTitle>{article.title}</NewsTitle>
            <NewsDate>Cập nhật lúc: {new Date(article.pubDate).toLocaleString()}</NewsDate>
            <p>{article.description}</p>
          </NewsDescription>
        </NewsItemStyled>
      ))}
    </NewsListContainer>
  );
};

export default NewsList;

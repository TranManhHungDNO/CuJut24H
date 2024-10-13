import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Article {
  title: string;
  link: string;
  description: string;
  imageUrl: string;
  pubDate: string;
}

const NewsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const TabButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? '#007bff' : '#ddd')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 5px;
`;

const NewsItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  align-items: center;
  text-align: center;
  background-color: white;
`;

const NewsImage = styled.img`
  width: 80%;
  height: auto;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  cursor: pointer;
`;

const NewsDescription = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: justify;
  width: 100%;
`;

const NewsTitle = styled.h2`
  font-weight: bold;
  font-size: 1.4em;
  color: #007bff;
  margin: 10px 0;
  cursor: pointer;
`;

const NewsDate = styled.p`
  font-size: 14px;
  color: #888;
  margin: 5px 0;
`;

const NewsIcon = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  right: -35px;
  top: -10px;
`;

const NewsList: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const [activeTab, setActiveTab] = useState(0); // Tab bắt đầu từ Cư Jút 24H
  const [videoArticles, setVideoArticles] = useState<Article[]>([]);
  const [radioArticles, setRadioArticles] = useState<Article[]>([]); // Dữ liệu cho tab Radio

  const openLink = (url: string) => {
    window.open(url, '_blank'); // Mở trong tab mới
  };

  // Lấy dữ liệu từ RSS feed của Video (Tab 2)
  useEffect(() => {
    const fetchVideoArticles = async () => {
      const response = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=https://baodaknong.vn/rss/video'
      );
      const data = await response.json();

      if (data.status === 'ok') {
        const articles = data.items.map((item: any) => ({
          title: item.title,
          link: item.link,
          description: item.description.replace(/<[^>]+>/g, ''), // Bỏ thẻ HTML khỏi mô tả
          imageUrl: 'https://media.baosonla.org.vn/public/hieupt/2024-03-18-oi/bia-cover.jpg', // Ảnh mặc định cho Tab 2
          pubDate: item.pubDate,
        }));

        setVideoArticles(articles);
      }
    };

    fetchVideoArticles();
  }, []);

  // Lấy dữ liệu từ RSS feed của Cư Jút Radio (Tab 3)
  useEffect(() => {
    const fetchRadioArticles = async () => {
      const response = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftrungtamtruyenthongcujut.daknong.gov.vn%2Fradioonline%2Frss%2F'
      );
      const data = await response.json();

      if (data.status === 'ok') {
        const articles = data.items.map((item: any) => {
          // Lấy URL ảnh từ nội dung mô tả nếu có
          const imageUrlMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
          const imageUrl = imageUrlMatch ? imageUrlMatch[1] : 'https://trungtamtruyenthongcujut.daknong.gov.vn/uploads/2020.png'; // Ảnh mặc định nếu không có ảnh

          return {
            title: item.title,
            link: item.link,
            description: item.description.replace(/<[^>]+>/g, ''), // Bỏ thẻ HTML khỏi mô tả
            imageUrl, // Dùng ảnh từ RSS feed cho Tab Radio
            pubDate: item.pubDate,
          };
        });

        setRadioArticles(articles);
      }
    };

    fetchRadioArticles();
  }, []);

  // Chia các tin thành 3 nhóm: Tab 1 (Cư Jút 24h), Tab 2 (Video), Tab 3 (Cư Jút Radio)
  const tabArticles = [articles.slice(0, 5), videoArticles.slice(0, 5), radioArticles.slice(0, 5)];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && activeTab > 0) {
      setActiveTab(activeTab - 1);
    } else if (direction === 'right' && activeTab < 2) {
      setActiveTab(activeTab + 1);
    }
  };

  return (
    <NewsListContainer>
      {/* Tab Navigation */}
      <TabContainer>
        {[
          { name: 'Tin Cư Jút' },
          { name: 'Video Đắk Nông' },
          { name: 'Radio Cư Jút' }, //
        ].map((tab, tabIndex) => (
          <TabButton
            key={tabIndex}
            active={activeTab === tabIndex}
            onClick={() => setActiveTab(tabIndex)}
          >
            {tab.name}
          </TabButton>
        ))}
      </TabContainer>

      {/* Danh sách tin cho từng tab */}
      {tabArticles[activeTab].map((article, index) => (
        <NewsItemStyled key={index}>
          {article.imageUrl && (
            <NewsImage
              src={article.imageUrl}
              alt={article.title}
              onClick={() => openLink(article.link)}
            />
          )}
          <NewsDescription>
            <NewsTitle onClick={() => openLink(article.link)}>
              {article.title}
              {new Date().getTime() - new Date(article.pubDate).getTime() < 5 * 24 * 60 * 60 * 1000 && (
                <NewsIcon src="/path/to/news.gif" alt="New" />
              )}
            </NewsTitle>
            <NewsDate>
              Cập nhật lúc: {new Date(article.pubDate).toLocaleString()}
            </NewsDate>
            <p>{article.description}</p>
          </NewsDescription>
        </NewsItemStyled>
      ))}

      {/* Vuốt để chuyển tab */}
      <div
        onTouchStart={(e) => {
          const touchStartX = e.changedTouches[0].screenX;
          e.currentTarget.onTouchEnd = (ev) => {
            const touchEndX = ev.changedTouches[0].screenX;
            if (touchEndX < touchStartX) handleSwipe('left');
            if (touchEndX > touchStartX) handleSwipe('right');
          };
        }}
      />
    </NewsListContainer>
  );
};

export default NewsList;

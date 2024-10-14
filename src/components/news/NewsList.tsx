import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSwipeable } from 'react-swipeable';

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
  overflow: hidden;
  position: relative;
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

const NewsItemStyled = styled.div<{ animationDirection: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
  animation: ${({ animationDirection }) => animationDirection} 0.5s ease-in-out;

  @keyframes slideInRight {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes slideInLeft {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

const NewsImage = styled.img`
  width: 80%;
  height: auto;
  object-fit: cover;
  cursor: pointer;
`;

const NewsDescription = styled.div`
  padding: 15px;
  text-align: justify;
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
  const [activeTab, setActiveTab] = useState(0); // Tab mặc định là 0 (Cư Jút 24H)
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'slideInLeft' | 'slideInRight'>('slideInRight');

  const [videoArticles, setVideoArticles] = useState<Article[]>([]);
  const [radioArticles, setRadioArticles] = useState<Article[]>([]);

  const openLink = (url: string) => {
    window.open(url, '_blank');
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
          description: item.description.replace(/<[^>]+>/g, ''),
          imageUrl: 'https://media.baosonla.org.vn/public/hieupt/2024-03-18-oi/bia-cover.jpg',
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
          const imageUrlMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
          const imageUrl = imageUrlMatch
            ? imageUrlMatch[1]
            : 'https://trungtamtruyenthongcujut.daknong.gov.vn/uploads/2020.png';

          return {
            title: item.title,
            link: item.link,
            description: item.description.replace(/<[^>]+>/g, ''),
            imageUrl,
            pubDate: item.pubDate,
          };
        });

        setRadioArticles(articles);
      }
    };

    fetchRadioArticles();
  }, []);

  const tabArticles = [articles.slice(0, 5), videoArticles.slice(0, 5), radioArticles.slice(0, 5)];

  const handleNextArticle = () => {
    setAnimationDirection('slideInRight');
    setCurrentArticleIndex((prevIndex) =>
      prevIndex < tabArticles[activeTab].length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevArticle = () => {
    setAnimationDirection('slideInLeft');
    setCurrentArticleIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : tabArticles[activeTab].length - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(handleNextArticle, 3000);
    return () => clearInterval(intervalId); // Clear interval khi component bị hủy
  }, [activeTab, currentArticleIndex]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextArticle,
    onSwipedRight: handlePrevArticle,
    trackMouse: true, // Hỗ trợ kéo bằng chuột
  });

  return (
    <NewsListContainer {...swipeHandlers}>
      {/* Tab Navigation */}
      <TabContainer>
        {['Tin Cư Jút', 'Video Đắk Nông', 'Radio Cư Jút'].map((tab, tabIndex) => (
          <TabButton
            key={tabIndex}
            active={activeTab === tabIndex}
            onClick={() => {
              setActiveTab(tabIndex);
              setCurrentArticleIndex(0); // Reset về bài viết đầu tiên khi chuyển tab
            }}
          >
            {tab}
          </TabButton>
        ))}
      </TabContainer>

      {/* Hiển thị bài viết hiện tại */}
      {tabArticles[activeTab][currentArticleIndex] && (
        <NewsItemStyled animationDirection={animationDirection}>
          <NewsImage
            src={tabArticles[activeTab][currentArticleIndex].imageUrl}
            alt={tabArticles[activeTab][currentArticleIndex].title}
            onClick={() => openLink(tabArticles[activeTab][currentArticleIndex].link)}
          />
          <NewsDescription>
            <NewsTitle onClick={() => openLink(tabArticles[activeTab][currentArticleIndex].link)}>
              {tabArticles[activeTab][currentArticleIndex].title}
            </NewsTitle>
            <NewsDate>
              Cập nhật lúc: {new Date(tabArticles[activeTab][currentArticleIndex].pubDate).toLocaleString()}
            </NewsDate>
            <p>{tabArticles[activeTab][currentArticleIndex].description}</p>
          </NewsDescription>
        </NewsItemStyled>
      )}
    </NewsListContainer>
  );
};

export default NewsList;

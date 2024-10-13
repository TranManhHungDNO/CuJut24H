import React, { useEffect, useState } from 'react';
import NewsList from './NewsList';

const RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftrungtamtruyenthongcujut.daknong.gov.vn%2Frss%2F';

const NewsSection: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(RSS_URL);
        const data = await response.json();

        if (data.status === 'ok') {
          const latestArticles = data.items.slice(0, 5).map((item: any) => {
            const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
            const imageUrl = imgMatch ? imgMatch[1] : '';

            return {
              title: item.title,
              link: item.link,
              description: item.description.replace(/<[^>]+>/g, ''),
              imageUrl,
              pubDate: item.pubDate,
            };
          });

          setArticles(latestArticles);
        } else {
          console.error('Failed to fetch RSS feed.');
        }
      } catch (error) {
        console.error('Error fetching the RSS feed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (link: string) => {
    // Mở bài viết trong ứng dụng Zalo Mini App mà không bật cửa sổ mới
    console.log(`Mở bài viết: ${link}`);
    // Thực hiện logic để mở bài viết trong Zalo Mini App
  };

  return (
    <div>
      {loading ? <p>Loading...</p> : <NewsList articles={articles} onClick={handleArticleClick} />}
    </div>
  );
};

export default NewsSection;

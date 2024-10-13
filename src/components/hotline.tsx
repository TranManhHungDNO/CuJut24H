import React from 'react';
import styled from 'styled-components';

const HotlineContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  max-width: 600px;
  margin: auto;
`;

const HotlineItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 8px;

  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const InfoContainer = styled.div`
  flex-grow: 1;
`;

const PhoneNumber = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Hotline: React.FC = () => {
  const hotlines = [
    {
      id: 1,
      name: 'Cấp cứu',
      address: 'Bệnh viện Đa khoa',
      phone: '115',
      icon: '/path/to/emergency-icon.png', // Đường dẫn tới icon cấp cứu
    },
    {
      id: 2,
      name: 'Phòng cháy chữa cháy',
      address: 'Công an PCCC',
      phone: '114',
      icon: '/path/to/fire-icon.png', // Đường dẫn tới icon phòng cháy
    },
    {
      id: 3,
      name: 'Bệnh viện',
      address: 'Bệnh viện Công an Đắk Nông',
      phone: '0261 3888 115',
      icon: '/path/to/hospital-icon.png', // Đường dẫn tới icon bệnh viện
    },
    {
      id: 4,
      name: 'Công an',
      address: 'Công an tỉnh Đắk Nông',
      phone: '113',
      icon: '/path/to/police-icon.png', // Đường dẫn tới icon công an
    },
  ];

  return (
    <HotlineContainer>
      {hotlines.map((hotline) => (
        <HotlineItem key={hotline.id}>
          <Icon src={hotline.icon} alt={`${hotline.name} icon`} />
          <InfoContainer>
            <strong>{hotline.name}</strong>
            <p>{hotline.address}</p>
            <PhoneNumber href={`tel:${hotline.phone}`}>{hotline.phone}</PhoneNumber>
          </InfoContainer>
        </HotlineItem>
      ))}
    </HotlineContainer>
  );
};

export default Hotline;

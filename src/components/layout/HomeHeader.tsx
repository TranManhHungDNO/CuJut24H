import React, { FC } from "react";
import { Box } from "zmp-ui";
import styled from "styled-components";
import tw from "twin.macro";
import Logo from "@assets/logo.png";
import TextItemSkeleton from "@components/skeleton/TextSketeton";
import { useStore } from "@store";
import Background from "@assets/header-background.png";
import Slider from "react-slick";

// Ảnh slide
import Slide1 from "@assets/slide1.jpg";
import Slide2 from "@assets/slide2.jpg";
import Slide3 from "@assets/slide3.jpg";

export interface HomeHeaderProps {
    title: string;
    name: string;
}

const HeaderContainer = styled.div`
    ${tw`flex flex-row bg-main text-white items-center fixed top-0 left-0 w-full px-4 h-[calc(48px + var(--zaui-safe-area-inset-top, 0px))]`}
    padding-top: var(--zaui-safe-area-inset-top);
    z-index: 2;
    background: linear-gradient(
            0deg,
            rgba(4, 109, 214, 0.9),
            rgba(4, 109, 214, 0.9)
        ),
        url(${Background});
    background-size: cover;
    background-position: center;
`;

const Title = styled.div`
    ${tw`text-base font-medium`}
`;

const LogoWrapper = styled.div`
    width: 32px;
    height: 32px;
    position: relative;
    margin-right: 8px;
`;

const StyledText = styled.div`
    ${tw`text-wth_a70 text-xs`}
    min-height: 16px;
`;

// SliderWrapper với chiều cao điều chỉnh cho điện thoại và bo tròn góc
const SliderWrapper = styled.div`
    ${tw`relative w-full z-0`}
    height: 45vh; /* Chiều cao mặc định */
    overflow: hidden;
    border-top-left-radius: 20px; /* Bo góc trên bên trái */
    border-bottom-right-radius: 20px; /* Bo góc dưới bên phải */

    /* Sử dụng media queries để thay đổi chiều cao cho thiết bị nhỏ */
    @media (max-width: 768px) {
        height: 30vh; /* Chiều cao nhỏ hơn trên màn hình điện thoại */
    }
`;

const SlideImage = styled.img`
    ${tw`w-full h-full object-cover`}
    border-top-left-radius: 20px; /* Bo góc trên bên trái */
    border-bottom-right-radius: 20px; /* Bo góc dưới bên phải */
    object-fit: cover; /* Đảm bảo ảnh không bị méo */
    width: 100%; /* Chiều rộng luôn chiếm 100% khung */
    height: 100%; /* Chiều cao cũng luôn chiếm 100% khung */
`;

const MainContent = styled.div`
    ${tw`relative z-1 bg-white py-8 px-4`} /* Nội dung dưới slider */
`;

const HomeHeader: FC<HomeHeaderProps> = props => {
    const { title, name } = props;
    const loading = useStore(state => state.gettingOrganization);

    // Cấu hình cho slider
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <>
            {/* Slider gọn lại với bo tròn */}
            <SliderWrapper>
                <Slider {...sliderSettings}>
                    <div>
                        <SlideImage src={Slide1} alt="Slide 1" />
                    </div>
                    <div>
                        <SlideImage src={Slide2} alt="Slide 2" />
                    </div>
                    <div>
                        <SlideImage src={Slide3} alt="Slide 3" />
                    </div>
                </Slider>
            </SliderWrapper>

            {/* Nội dung header ban đầu */}
            <HeaderContainer>
                <LogoWrapper>
                    <img src={Logo} alt={title} />
                </LogoWrapper>
                <Box flex flexDirection="column">
                    <Title>{title}</Title>
                    {loading ? (
                        <TextItemSkeleton
                            color="rgba(255,255,255,0.2)"
                            height={16}
                            width={180}
                        />
                    ) : (
                        <StyledText>{name}</StyledText>
                    )}
                </Box>
            </HeaderContainer>

            {/* Nội dung chính bên dưới slider */}
           
        </>
    );
};

export default HomeHeader;

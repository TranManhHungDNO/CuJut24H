import React, { FC } from "react";
import styled from "styled-components";
import { Box, List, Text, Button } from "zmp-ui";
import tw from "twin.macro";
import { OAItemSkeleton } from "@components/skeleton";
import { useStore } from "@store";
import { officialAccounts } from "./officialAccounts";  // Import từ file mới

const ListWrapper = styled(Box)`
    ${tw`bg-ui_bg`};
`;

const SubTitle = styled(Text)`
    ${tw`text-text_2`}
`;
const ListOAStyled = styled(List)`
    padding: 8px 0;
    margin-top: 16px;
`;

const WebItem = styled(Box)`
    ${tw`flex justify-between items-center py-2`}
`;

const ListOA: FC<any> = () => {
    const loading = useStore(state => state.gettingOrganization); // Có thể lấy trạng thái loading từ store hoặc bỏ qua nếu không cần

    return (
        <ListWrapper mt={2} p={4}>
            <Text.Title size="small">Danh bạ Web</Text.Title>
            <SubTitle size="small">Trang web chính thức của cơ quan nhà nước</SubTitle>

            <ListOAStyled>
                {!loading &&
                    officialAccounts?.map(item => (
                        <WebItem key={item.oaId}>
                            <Text size="small">{item.oaName}</Text>
                            <Button
                                type="primary"
                                onClick={() => window.open(item.oaLink, "_blank")}
                            >
                                Truy cập
                            </Button>
                        </WebItem>
                    ))}
                {loading && <OAItemSkeleton />}
            </ListOAStyled>
        </ListWrapper>
    );
};

export default ListOA;

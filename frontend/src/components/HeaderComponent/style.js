import { Row, Image } from "antd";
import styled from "styled-components";

export const WrapperLogoHeader = styled(Image)`
    &.ant-image-img {
        width: 50px;
        height: 50px;
        vertical-align: middle;
}
`

export const WrapperHeader = styled(Row)`
    // max-width: 100%;
    padding: 10px 0;
    background-color: #F61418;
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 1270px;
    & .ant-col.ant-col-4 {
        display: flex;
        align-items: center;
    }
    & .ant-col.ant-col-12 {
        max-width: 50%;
      
    }
    & .ant-col.ant-col-8 {
        display: flex; 
        gap: 30px;
        align-items: center;
        & span.anticon.anticon-user, span.anticon.anticon-shopping-cart{
            font-size: 32px;
            color: #fff;
        }
    }
`

export const WrapperTextHeader = styled.span`
    font-size: 18px;
    color: #74f7f1e8;
    font-weight: bold;
    text-align: left;
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    font-size: 15px;
    cursor: pointer;
    .ant-scroll-number.ant-badge-count.ant-badge-count-sm {
        font-size: 15px;
        font-weight: 400;
        background: #5fede5cf;
    }
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: 15px;
    font-weight: 400;
    line-height: 1.5;
    color: #fff;
    white-space: nowrap;
    cursor: pointer;
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: #ed3b3bb0;
    }
`
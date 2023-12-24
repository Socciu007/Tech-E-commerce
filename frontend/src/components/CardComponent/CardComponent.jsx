import React from "react";
import {
  StyleNameProduct,
  WrapperCartStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
  WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import logo from "../../assets/pictures/logo.png";
import { useNavigate } from "react-router-dom";

const CardComponent = (props) => {
  const {
    name,
    image,
    type,
    price,
    description,
    rating,
    countInStock,
    discount,
    selled,
    id,
  } = props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };
  return (
    <WrapperCartStyle
      hoverable
      style={{ width: 196 }}
      bodyStyle={{ padding: "10px" }}
      cover={<img alt="product" src={image} />}
      onClick={() => handleDetailsProduct(id)}
    >
      <img
        src={logo}
        alt="icon-logo"
        style={{
          width: "68px",
          height: "14px",
          position: "absolute",
          top: -1,
          left: -1,
        }}
      />
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span>
          <b>{rating} </b>
          <StarFilled style={{ fontSize: "12px", color: "#fb6e2e" }} />
        </span>
        <WrapperStyleTextSell>(Đã bán {selled || 999}+)</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        <span>{price?.toLocaleString()}</span>
        <WrapperDiscountText>-{discount || 15}%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCartStyle>
  );
};

export default CardComponent;

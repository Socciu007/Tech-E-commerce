import { Col, Row, Image, Rate } from "antd";
import React, { useState } from "react";
import imageProduct from "../../assets/pictures/product1.jpg";
import imageSmall from "../../assets/pictures/imagesmall1.webp";
import SliderComponent from "../SliderComponent/SliderComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import {
  WrapperAddressProduct,
  WrapperIcon,
  WrapperImageText,
  WrapperInputNumberQuantity,
  WrapperQuantityProduct,
  WrapperStyleCategoryProduct,
  WrapperStyleCategoryProductSmall,
  WrapperStyleNameProduct,
  WrapperStylePrice,
  WrapperStylePriceText,
  WrapperStylePriceTextRight,
  WrapperStylePriceTextSmall,
  WrapperStyleTextSell,
} from "./style";
import {
  YoutubeOutlined,
  DropboxOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slices/orderSlide";

const ProductDetailsComponent = ({ idProduct }) => {
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [numProduct, setNumProduct] = useState(1);
  const onChange = (e) => {
    setNumProduct(Number(e.target.value));
  };
  //get details
  const fetchGetDetailProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    const res = await ProductService.getDetailProduct(id);
    return res.data;
  };

  const { isLoading, data: productDetails } = useQuery({
    queryKey: ["product-details", idProduct],
    queryFn: fetchGetDetailProduct,
    enabled: !!idProduct,
  });
  const handleChangeCount = (type) => {
    if (type === "increase") {
      setNumProduct(numProduct + 1);
    } else if (type === "descrease") {
      setNumProduct(numProduct === 0 ? 0 : numProduct - 1);
    }
  };

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: numProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
            discount: productDetails?.discount,
            countInstock: productDetails?.countInStock,
          },
        })
      );
    }
  };

  return (
    <Loading isLoading={isLoading}>
      <Row>
        <Col span={10}>
          <SliderComponent
            arrImages={[imageProduct, imageProduct]}
            dots="true"
          />
          <Row className="ant-row-option">
            <WrapperImageText span={8}>
              <WrapperIcon>
                <FontAwesomeIcon icon={faImage} style={{ color: "#5a5d63" }} />
              </WrapperIcon>
              <p>Xem thêm 4 ảnh</p>
            </WrapperImageText>
            <WrapperImageText span={8}>
              <WrapperIcon>
                <YoutubeOutlined style={{ color: "#5a5d63" }} />
              </WrapperIcon>
              <p>Xem video sản phẩm</p>
            </WrapperImageText>
            <WrapperImageText span={8}>
              <WrapperIcon>
                <DropboxOutlined style={{ color: "#5a5d63" }} />
              </WrapperIcon>
              <p>Có gì trong hộp</p>
            </WrapperImageText>
          </Row>
        </Col>
        <Col span={14}>
          <WrapperStyleNameProduct>
            {productDetails?.name}
          </WrapperStyleNameProduct>
          <div style={{ marginBottom: "10px" }}>
            <Rate
              allowHalf
              defaultValue={3}
              value={productDetails?.rating}
              style={{ fontSize: "12px", color: "#fb6e2e" }}
            />
            <WrapperStyleTextSell>Đã bán 1000+</WrapperStyleTextSell>
            <WrapperStyleTextSell style={{ cursor: "pointer" }}>
              | Hỏi & đáp
            </WrapperStyleTextSell>
          </div>
          <WrapperStylePrice>
            <WrapperStylePriceText>
              {(productDetails?.price * 0.9).toLocaleString()}đ
            </WrapperStylePriceText>
            <WrapperStylePriceTextSmall>
              {productDetails?.price?.toLocaleString()}đ
            </WrapperStylePriceTextSmall>
            <WrapperStylePriceTextRight>
              <span>Trả góp chỉ từ &nbsp;</span>
              <span>
                <strong>2.885.000đ</strong>/tháng
              </span>
            </WrapperStylePriceTextRight>
          </WrapperStylePrice>
          <WrapperStyleCategoryProduct>
            <WrapperStyleCategoryProductSmall>
              <Image
                src={imageSmall}
                height={38}
                width={38}
                alt="image product category"
                preview={false}
                style={{ marginBottom: "4px" }}
              />
              <p>Đen</p>
            </WrapperStyleCategoryProductSmall>
            <WrapperStyleCategoryProductSmall>
              <Image
                src={imageSmall}
                height={38}
                width={38}
                alt="image product category"
                preview={false}
              />
              <p
                style={{ color: "#495057", fontWeight: "400", marginTop: "0" }}
              >
                Vàng
              </p>
            </WrapperStyleCategoryProductSmall>
            <WrapperStyleCategoryProductSmall>
              <Image
                src={imageSmall}
                height={38}
                width={38}
                alt="image product category"
                preview={false}
              />
              <p
                style={{ color: "#495057", fontWeight: "400", marginTop: "0" }}
              >
                Tím
              </p>
            </WrapperStyleCategoryProductSmall>
            <WrapperStyleCategoryProductSmall>
              <Image
                src={imageSmall}
                height={38}
                width={38}
                alt="image product category"
                preview={false}
              />
              <p
                style={{ color: "#495057", fontWeight: "400", marginTop: "0" }}
              >
                Trắng
              </p>
            </WrapperStyleCategoryProductSmall>
          </WrapperStyleCategoryProduct>
          <WrapperAddressProduct>
            <span>Giao đến</span>
            <span className="address">{user?.address}</span>-
            <span className="change-address">Đổi địa chỉ</span>
          </WrapperAddressProduct>
          <div className="wrapper-quantity">
            <div className="wrapper-quantity__number">Số lượng</div>
            <WrapperQuantityProduct>
              <button onClick={() => handleChangeCount("descrease")}>
                <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>
              <WrapperInputNumberQuantity
                value={numProduct}
                onChange={onChange}
                size="small"
              />
              <button onClick={() => handleChangeCount("increase")}>
                <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>
            </WrapperQuantityProduct>
          </div>
          <div className="wrapper-button">
            <ButtonComponent
              size={40}
              styleButton={{
                background: "rgb(255,57,69)",
                height: "48px",
                width: "220px",
                border: "none",
                borderRadius: "4px",
              }}
              textButton={"Chọn mua"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
              onClick={handleAddOrderProduct}
            />
            <ButtonComponent
              size={40}
              styleButton={{
                background: "#fff",
                height: "48px",
                width: "220px",
                border: "1px solid #1e63c3ad",
                borderRadius: "4px",
              }}
              textButton={"Mua trả góp"}
              styleTextButton={{
                color: "#1e63c3ad",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </div>
        </Col>
      </Row>
    </Loading>
  );
};

export default ProductDetailsComponent;

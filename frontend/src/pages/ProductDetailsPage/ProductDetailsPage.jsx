import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";
import "./style.scss";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleHomePage = () => {
    navigate("/");
  };
  return (
    <div className="layout-product-details-page">
      <h5>
        <span style={{ cursor: "pointer" }} onClick={handleHomePage}>
          Trang chủ
        </span>{" "}
        - Chi tiết sản phẩm
      </h5>
      <ProductDetailsComponent idProduct={id} />
    </div>
  );
};

export default ProductDetailsPage;

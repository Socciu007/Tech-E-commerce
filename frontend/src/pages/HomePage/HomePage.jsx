import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperButton,
  WrapperContainer,
  WrapperProducts,
  WrapperTypeProduct,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/pictures/slider1.gif";
import slider2 from "../../assets/pictures/slider2.png";
import slider3 from "../../assets/pictures/slider3.png";
import slider4 from "../../assets/pictures/slider4.png";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useDebounceHooks } from "../../hooks/useDebounceHooks";
import Loading from "../../components/LoadingComponent/Loading";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounceHooks(searchProduct, 500);
  const [limit, setLimit] = useState(3);
  const [typeProduct, setTypeProduct] = useState([]);

  //get all product
  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };
  //get all type
  const fetchGetAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProduct(res?.data);
    }
  };

  const {
    data: products,
    isLoading,
    isPreviousData,
  } = useQuery({
    queryKey: ["products", limit, searchDebounce],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    fetchGetAllTypeProduct();
  }, []);

  return (
    <Loading isLoading={isLoading}>
      <div style={{ maxWidth: "1270px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {typeProduct.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        className="body"
        style={{ width: "100%", backgroundColor: "#efefef" }}
      >
        <div
          id="container"
          style={{ height: "100%", maxWidth: "1270px", margin: "0 auto" }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <NavbarComponent />
            <WrapperContainer>
              <SliderComponent
                arrImages={[slider1, slider2, slider3, slider4]}
              />
              <WrapperProducts>
                {products?.data?.map((product) => {
                  return (
                    <CardComponent
                      key={product._id}
                      id={product._id}
                      countInStock={product.countInStock}
                      description={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      type={product.type}
                      discount={product.discount}
                      selled={product.selled}
                    />
                  );
                })}
              </WrapperProducts>
              <WrapperButton>
                <ButtonComponent
                  textButton="Xem thêm"
                  type="outline"
                  styleButton={{ background: "#fff" }}
                  styleTextButton={{
                    fontSize: "15px",
                    fontWeight: 400,
                  }}
                  // disabled={
                  //   products?.total === products?.data?.length ||
                  //   products?.totalPage === products?.data?.length / limit
                  // }
                  onClick={() => setLimit((prev) => prev + 3)}
                ></ButtonComponent>
              </WrapperButton>
            </WrapperContainer>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default HomePage;

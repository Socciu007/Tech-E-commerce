import React, { useEffect, useState } from "react";
import { Badge, Col, Popover } from "antd";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "./style";
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperLogoHeader,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoShop from "../../assets/pictures/logoshop1.png";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slices/userSlice";
import { searchProduct } from "../../redux/slices/productSlice";
import Loading from "../LoadingComponent/Loading";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user);
  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleNavigateOrder = () => {
    navigate("/order");
  };
  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };

  const content = (
    <div style={{ fontSize: "15px", fontWeight: 400, lineHeight: "30px" }}>
      <WrapperContentPopup onClick={() => navigate("/profile-user")}>
        Thông tin người dùng
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate("/system/admin")}>
          Quản lý hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(search));
  };
  return (
    <div
      style={{
        width: "100%",
        background: "#F61418",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WrapperHeader
        style={{
          justifyContent:
            isHiddenSearch && isHiddenCart ? "space-between" : "unset",
        }}
      >
        <Col span={4}>
          <WrapperLogoHeader src={logoShop} preview={false}></WrapperLogoHeader>
          <WrapperTextHeader>Go Tech</WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={12}>
            <ButtonInputSearch
              size="large"
              placeholder="Bạn cần gì..."
              bordered={false}
              onChange={onSearch}
              // onClick={onSearch}
            />
          </Col>
        )}
        <Col span={8}>
          <Loading isLoading={loading}>
            <WrapperHeaderAccount>
              {userAvatar ? (
                <img
                  style={{ height: "32px", width: "32px", borderRadius: "50%" }}
                  src={userAvatar}
                  alt="avatar"
                />
              ) : (
                <UserOutlined />
              )}
              {user?.access_token ? (
                <>
                  <div>
                    {userName ||
                      user?.email?.substring(0, user?.email?.indexOf("@")) ||
                      "User"}
                  </div>
                  <Popover
                    content={content}
                    trigger="click"
                    placement={"bottomRight"}
                    arrow={false}
                  >
                    <CaretDownOutlined
                      style={{ marginTop: "2px", marginLeft: "-7px" }}
                    />
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
                  <WrapperTextHeaderSmall>
                    Đăng nhập/Đăng ký
                  </WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall style={{ marginRight: "5px" }}>
                      Tài khoản
                    </WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
          <div onClick={handleNavigateOrder}>
            {!isHiddenCart && (
              <WrapperHeaderAccount>
                <Badge count={3} size="small">
                  <ShoppingCartOutlined />
                </Badge>
                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
              </WrapperHeaderAccount>
            )}
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;

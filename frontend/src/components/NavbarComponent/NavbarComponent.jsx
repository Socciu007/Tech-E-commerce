import React from "react";
import {
  NavBarStyle,
  WrapperContent,
  WrapperLabelText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";
import { Checkbox, Rate } from "antd";

const NavbarComponent = () => {
  const onChange = () => {};
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option, key) => {
          return <WrapperTextValue key={key}>{option}</WrapperTextValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
            onChange={onChange}
          >
            {options.map((option, key) => {
              return (
                <Checkbox style={{}} key={key} value={option.value}>
                  {option.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((option, key) => {
          return (
            <div key={key} className="report-star">
              <Rate disabled defaultValue={option} />
              <span>{` từ ${option} sao`}</span>
            </div>
          );
        });
      case "price":
        return options.map((option, key) => {
          return <WrapperTextPrice key={key}>{option}</WrapperTextPrice>;
        });
      default:
        return {};
    }
  };

  return (
    <NavBarStyle>
      <div className="navbar-home">
        <WrapperLabelText>Category</WrapperLabelText>
        <WrapperContent>
          {renderContent("text", [
            "Điện thoại",
            "Laptop",
            "Tablet",
            "Phụ kiện",
            "Smartwatch",
            "Smarthouseware",
            "Dịch vụ tiện ích",
          ])}
        </WrapperContent>
        <WrapperLabelText>Checkbox</WrapperLabelText>
        <WrapperContent>
          {renderContent("checkbox", [
            { label: "Điện thoại", value: "Đt" },
            { label: "Laptop", value: "laptop" },
            { label: "Phụ kiện", value: "pk" },
          ])}
        </WrapperContent>
        <WrapperLabelText>ReportStar</WrapperLabelText>
        <WrapperContent>{renderContent("star", [3, 4, 5])}</WrapperContent>
        <WrapperLabelText>Price</WrapperLabelText>
        <WrapperContent>
          {renderContent("price", ["Dưới 1$", "1$-2$", "Trên 2$"])}
        </WrapperContent>
      </div>
    </NavBarStyle>
  );
};

export default NavbarComponent;

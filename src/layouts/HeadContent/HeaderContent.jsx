import React from "react";
import { Dropdown, Layout } from "antd";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Jump } from "@/utils/tools";
import { logoutApi } from "@/api/httpApi";
import { persistor } from "@/redux/store";
import { useDispatch } from "react-redux";
import logo from "@/image/logo.png";
import logoFont from "@/image/logo-font.png";
import { themeColor } from "@/theme/color";
import LocaleButton from "@/components/LocaleButton/LocaleButton";

const { Header } = Layout;

function HeaderContent() {
  const history = useHistory();
  const dispatch = useDispatch();

  // 退出
  const logout = async () => {
    Jump("/login", history);
    await persistor.purge();
    dispatch({ type: "RESET_DATA" });
    await logoutApi();
  };

  const userInfoList = {
    items: [
      // {
      //   key: "1",
      //   label: <span>个人资料</span>,
      //   onClick: () => history.push('/user/user-info'),
      // },
      // {
      //   key: "2",
      //   label: <span>使用情况</span>,
      //   onClick: () => history.push('/user/usage'),
      // },
      {
        key: "3",
        danger: true,
        label: <span>{t('HeadContent.HeaderContent.7725626-0')}</span>,
        onClick: logout,
      },
    ],
  };

  return (
    <Header style={headerStyle}>
      <div className="headerBox">
        <Left>
          <img style={{ height: "28px" }} src={logo} alt="" />
          <img style={{ height: "28px" }} src={logoFont} alt="" />
          <div>
            <span onClick={() => history.push("/project")}>{t(t('HeadContent.HeaderContent.7725626-1'))}</span>
          </div>
          {/* <div>
            <span onClick={() => history.push("/project")}>Universe</span>
          </div> */}
        </Left>
        <Right>
          <LocaleButton />
          <Dropdown menu={userInfoList} placement="bottom">
            <div className="userInfo">
              <img
                src="https://gd-hbimg.huaban.com/7968f776596196a8061e9ee0ee51c0606d785fc42400b-9aWWPH_fw236"
                alt=""
              />
            </div>
          </Dropdown>
        </Right>
      </div>
    </Header>
  );
}

const headerStyle = {
  background:
    "linear-gradient(225deg, rgba(184, 164, 245, .11), rgba(149, 238, 232, .11) 32.81%, rgba(96, 124, 233, .11) 70.83%, rgba(184, 164, 245, .11)), #fff",
  padding: "0 36px",
  boxShadow: "0 1px 0.5px 0 rgba(0, 0, 0, 0.1)",
  marginBottom: "2px",
  height: 65,
};

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  span {
    margin-left: 12px;
    padding: 8px 12px;
    background-color: white;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
    border: 1px solid rgba(0, 0, 0, 0);
    &:hover {
      background-color: #584fbb26;
      border: 1px solid ${themeColor.primary};
      color: #2313d3a0;
    }
  }
`;

const Right = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export default HeaderContent;

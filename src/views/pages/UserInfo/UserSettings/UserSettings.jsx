import { ConfigProvider, Menu } from "antd";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import BaseView from "./BaseView/BaseView";
import BindingView from "./BindingView/BindingView";
import SecurityView from "./SecurityView/SecurityView";
import Info from "./Info/Info";
import { getUserInfoApi } from "@/api/httpApi";
import { App } from "antd";

const UserInfo = () => {
  const { message } = App.useApp();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const menuMap = {
    base: t('UserSettings.UserSettings.7183016-0'),
    security: t('UserSettings.UserSettings.7183016-1'),
    binding: t('UserSettings.UserSettings.7183016-2'),
  };

  const [initConfig, setInitConfig] = useState({
    mode: "inline",
    selectKey: "base",
  });

  const dom = useRef(null);

  const resize = () => {
    requestAnimationFrame(() => {
      if (!dom.current) {
        return;
      }
      let mode = "inline";
      const { offsetWidth } = dom.current;
      if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = "horizontal";
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = "horizontal";
      }
      setInitConfig({
        ...initConfig,
        mode: mode,
      });
    });
  };

  useLayoutEffect(() => {
    if (dom.current) {
      window.addEventListener("resize", resize);
      resize();
    }
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [dom.current]);

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const res = await getUserInfoApi();
      if (res.code !== 200) {
        message.error(res.message);
        return;
      }
      setCurrentUser(res.data[0]);
    } catch (error) {
      console.error(t('UserSettings.UserSettings.7183016-3'), error);
      message.error(t('UserSettings.UserSettings.7183016-4'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const getMenu = () => {
    return Object.keys(menuMap).map((item) => ({ key: item, label: menuMap[item] }));
  };

  const onUpdate = () => {
    fetchUserInfo();
  };

  const renderChildren = () => {
    const { selectKey } = initConfig;
    switch (selectKey) {
      case "base":
        return <BaseView currentUser={currentUser} loading={loading} onUpdate={onUpdate} />;
      case "security":
        return <SecurityView />;
      case "binding":
        return <BindingView />;
      default:
        return null;
    }
  };

  return (
    <Container ref={dom}>
      <div className="leftMenu">
        <div>
          <Info currentUser={currentUser} loading={loading} />
        </div>
        <ConfigProvider theme={{ components: { Menu: { itemBorderRadius: 4 } } }}>
          <Menu
            mode={initConfig.mode}
            style={{
              height: "100%",
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
            selectedKeys={[initConfig.selectKey]}
            onClick={({ key }) => {
              setInitConfig({
                ...initConfig,
                selectKey: key,
              });
            }}
            items={getMenu()}
          />
        </ConfigProvider>
      </div>
      <div className="right custom-scroll">
        <div className="title">{menuMap[initConfig.selectKey]}</div>
        {renderChildren()}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;

  .leftMenu {
    width: 240px;
    background: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .right {
    flex: 1;
    padding: 24px;
    /* border-radius: 8px; */
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    background: #fff;
  }
  .title {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 16px;
  }
  @media (max-width: 768px) {
    .leftMenu {
      width: 100%;
    }
    .right {
      padding: 20px;
    }
  }
`;

export default UserInfo;

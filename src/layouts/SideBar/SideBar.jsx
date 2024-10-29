import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Menu, Layout, ConfigProvider, Tooltip, Button, Drawer, Radio } from "antd";
import { workSideBarList, projectSideBarList } from "./sideBarData";
import { extractValueFromPath } from "../../utils/tools";
import { useSelector, useDispatch } from "react-redux";
import WorkSpaceSide from "./WorkSpaceSide/WorkSpaceSide";
import ProjectSide from "./ProjectSide/ProjectSide";
import SideBarBody from "../SideBarBody/SideBarBody";

const { Sider } = Layout;

function SideBar() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  // 白名单
  const workSideWhite = [
    "/project",
    "/data-center",
    "/user-info/user-settings",
    "/user-info/usage",
    "/user-info/api-keys",
  ];

  const sideBarList = workSideWhite.includes(location.pathname) ? workSideBarList : projectSideBarList;

  //要{t('SideBar.SideBar.7725620-0')}的侧边栏
  const rootSubmenuKeys = sideBarList.filter((v) => v.children).map((v) => v.key);

  const [openKeys, setOpenKeys] = useState([]);
  const collapsed = useSelector((state) => state.sideBarCollapsed.collapsed);

  //手风琴
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const firstSegment = extractValueFromPath(location.pathname);
    const shouldOpenKey = rootSubmenuKeys.includes(firstSegment) ? [firstSegment] : [];
    setOpenKeys(shouldOpenKey);
  }, [location.pathname]);

  // 菜单样式
  const menuStyle = {
    itemBorderRadius: 0,
    itemHeight: 48,
    iconSize: 16,
    iconMarginInlineEnd: 8,
  };

  return (
    <Sider
      className="sideBarBox"
      width="230px"
      theme="light"
      style={{ backgroundColor: "white" }}
      collapsed={collapsed}
      breakpoint="xl"
      collapsedWidth="50px"
      onBreakpoint={(broken) => dispatch({ type: broken ? "COLLAPSED/TRUE" : "COLLAPSED/FALSE" })}
    >
      {collapsed ? (
        ""
      ) : (
        <div style={{ padding: "16px" }}>
          {workSideWhite.includes(location.pathname) ? <WorkSpaceSide /> : <ProjectSide />}
        </div>
      )}

      <ConfigProvider theme={{ components: { Menu: menuStyle } }}>
        <Menu
          mode="inline"
          theme="light"
          className="sideBarMenu"
          selectedKeys={[location.pathname]}
          items={sideBarList}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={(v) => {
            history.push(v.key);
          }}
        />
      </ConfigProvider>
      <SideBarBody collapsed={collapsed} />
    </Sider>
  );
}

export default SideBar;

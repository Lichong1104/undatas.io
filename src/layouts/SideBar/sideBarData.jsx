import { FolderAddOutlined, GlobalOutlined, LockOutlined, MacCommandOutlined, MenuOutlined, SelectOutlined, UserAddOutlined } from "@ant-design/icons";

export const workSideBarList = [
  { key: "/project", label: t('SideBar.sideBarData.7725619-0'), icon: <GlobalOutlined /> },
  // {
  //   key: "/user", label: t('SideBar.sideBarData.785023-0'), icon: <UserAddOutlined />,
  //   children: [
  //     { key: "/user/usage", label: t('SideBar.sideBarData.785023-1'), icon: <SelectOutlined /> },
  //     // { key: "/user/api-keys", label: "api-keys", icon: <LockOutlined /> },
  //     { key: "/user-info/user-settings", label: "个人资料", icon: <LockOutlined /> },
  //   ]
  // }
];

export const projectSideBarList = [
  { key: "/upload-data", label: t('SideBar.sideBarData.7725619-1'), icon: <FolderAddOutlined /> },
  { key: "/dataset", label: t('SideBar.sideBarData.7725619-2'), icon: <MacCommandOutlined /> },
  { key: "/versions/version-info", label: t('SideBar.sideBarData.7725619-3'), icon: <MenuOutlined /> },
];

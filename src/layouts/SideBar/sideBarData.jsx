import {
  FolderAddOutlined,
  GlobalOutlined,
  LockOutlined,
  MacCommandOutlined,
  MenuOutlined,
  ReadOutlined,
  SelectOutlined,
  UserAddOutlined,
  WalletOutlined,
} from "@ant-design/icons";

export const workSideBarList = [
  { key: "/project", label: t("SideBar.sideBarData.7725619-0"), icon: <GlobalOutlined /> },
  {
    key: "/user-info",
    label: t("SideBar.sideBarData.785023-0"),
    icon: <UserAddOutlined />,
    children: [
      {
        key: "/user-info/usage",
        label: t("SideBar.sideBarData.785023-1"),
        icon: <SelectOutlined />,
      },
      { key: "/user-info/api-keys", label: "Api-keys", icon: <LockOutlined /> },
      // { key: "/user-info/user-settings", label: t("SideBar.sideBarData.7183145-0"), icon: <WalletOutlined /> },
    ],
  },
];

export const projectSideBarList = [
  {
    key: "/upload-data",
    label: t("SideBar.sideBarData.7725619-1"),
    icon: <FolderAddOutlined />,
  },
  { key: "/dataset", label: t("SideBar.sideBarData.7725619-2"), icon: <MacCommandOutlined /> },
  {
    key: "/versions/version-info",
    label: t("SideBar.sideBarData.7725619-3"),
    icon: <MenuOutlined />,
  },
  { key: "/api-docs", label: "API Docs", icon: <ReadOutlined /> },
];

import { createWorkSpaceApi, getAllWorkApi } from "@/api/httpApi";
import { themeColor } from "@/theme/color";
import {
  AppstoreAddOutlined,
  EllipsisOutlined,
  EyeFilled,
  IssuesCloseOutlined,
  LaptopOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { App, Button, Dropdown, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";

const { Search } = Input;

function WorkSpaceSide() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { message, notification } = App.useApp();

  const [createWork, setCreateWork] = useState(false);
  const [loading, setLoading] = useState(false);

  // 工作区列表
  const [workList, setWorkList] = useState([]);
  // 获取当前工作区
  const currentWork = useSelector((state) => state.currentWork.work.work_name);

  // 当前展示工作区下标
  const showWorkIndex = useSelector((state) => state.currentWork.work.currentWorkKey);

  // 切换工作区
  const workChange = (e, v) => {
    dispatch({ type: "WORK_CHANGE", payload: { ...v, currentWorkKey: e.key } });
  };

  // 初始化
  const init = async () => {
    const res = await getAllWorkApi();
    if (res.code !== 200) return message.error(t('WorkSpaceSide.WorkSpaceSide.7725621-0'));

    const sortData = res.data.sort(
      (a, b) => Date.parse(new Date(a.c_time)) - Date.parse(new Date(b.c_time))
    );
    if (!currentWork) {
      dispatch({ type: "WORK_CHANGE", payload: { ...sortData[0], currentWorkKey: "0" } });
    }

    const data = sortData.map((v, i) => {
      return {
        ...v,
        key: i,
        label: <span>{v.work_name}</span>,
        onClick: (e) => workChange(e, v),
        icon: v.permission === "0" ? <EyeFilled /> : <IssuesCloseOutlined />,
      };
    });
    setWorkList(data);
    return sortData;
  };

  useEffect(() => {
    init();
  }, []);

  const inputRef = React.createRef();

  // 自动获取焦点
  useEffect(() => {
    if (createWork) inputRef.current.focus();
  }, [createWork]);

  // 创建工作区
  const startCreate = async (value) => {
    if (!value) return;
    setLoading(true);
    const res = await createWorkSpaceApi(value);
    setLoading(false);

    if (res.code !== 200) return message.error(res.msg);
    setCreateWork(false);

    notification.success({
      message: t('WorkSpaceSide.WorkSpaceSide.7725621-1', [value]),
      description: t('WorkSpaceSide.WorkSpaceSide.7725621-2'),
    });

    const workRes = await init();
    dispatch({
      type: "WORK_CHANGE",
      payload: { ...workRes[workRes.length - 1], currentWorkKey: (workRes.length - 1).toString() },
    });
  };
  return (
    <MainBox>
      <Title>
        <Space>
          <LaptopOutlined />{t(t('WorkSpaceSide.WorkSpaceSide.7725621-3'))}</Space>
        <Button icon={<SettingOutlined />} onClick={() => history.push("/work-settings")} size="small" />
      </Title>
      <Dropdown
        overlayClassName="antd_dropdown custom-scroll"
        menu={{ items: workList, selectable: true, selectedKeys: [showWorkIndex] }}
        placement="bottom"
      >
        <WorkspaceList>
          {currentWork}
          <EllipsisOutlined />
        </WorkspaceList>
      </Dropdown>
      {createWork ? (
        <Search
          placeholder={t(t('WorkSpaceSide.WorkSpaceSide.7725621-4'))} 
          style={{ height: 40.5 }}
          onBlur={() => setCreateWork(false)}
          ref={inputRef}
          enterButton={t(t('WorkSpaceSide.WorkSpaceSide.7725621-5'))} 
          size="middle"
          onSearch={startCreate}
          loading={loading}
        />
      ) : (
        <NewWorkSpace onClick={() => setCreateWork(true)}>{t(t('WorkSpaceSide.WorkSpaceSide.7725621-6'))}<AppstoreAddOutlined />
        </NewWorkSpace>
      )}
    </MainBox>
  );
}

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  padding: 0 4px;
  font-size: 16px;
  /* padding-right: 12px; */
`;

const WorkspaceList = styled.div`
  color: rgba(131, 21, 249, var(--tw-text-opacity));
  border: 1px solid ${themeColor.primary};
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  span:hover {
    color: ${themeColor.primary};
  }
`;

const NewWorkSpace = styled.div`
  color: #000000ae;
  font-size: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid white;
  transition: 0.2s;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  &:hover {
    border: 1px solid ${themeColor.primary};
    background-color: ${themeColor.hover};
    color: ${themeColor.primary};
  }
`;

export default WorkSpaceSide;

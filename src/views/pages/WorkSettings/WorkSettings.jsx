import {
  deleteWorkSpaceApi,
  getWorkUserListApi,
  renameWorkSpaceApi,
  workAddUserApi,
  workDeleteUserApi,
} from "@/api/httpApi";
import { themeColor } from "@/theme/color";
import { InfoCircleOutlined, GlobalOutlined, LoadingOutlined } from "@ant-design/icons";
import { App, Avatar, Button, Form, Input, List, Popconfirm, Space, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";

function WorkSettings() {
  const history = useHistory();
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const dispatch = useDispatch();

  // 头像地址
  const imgBaseUrl = "https://randomuser.me/api/portraits/men/";

  const [loading, setLoading] = useState(true);
  const work = useSelector((state) => state.currentWork.work);

  // 用户{t('WorkSettings.WorkSettings.7725628-0')}
  const [userList, setUserList] = useState([]);

  // 初始化
  const init = async () => {
    const res = await getWorkUserListApi(work.work_name);
    setLoading(false);
    if (res.code !== 200) return message.error(res.msg);
    const data = res.data.map((v, i) => {
      return { ...v, avatar: `${imgBaseUrl + i}.jpg` };
    });
    setUserList(data);
  };

  useEffect(() => {
    init();
  }, []);

  // {t('WorkSettings.WorkSettings.903401-23')}work
  const deleteWork = async () => {
    setLoading(true);
    const res = await deleteWorkSpaceApi(work.work_name);
    setLoading(false);
    if (res.code !== 200) return message.error(res.msg);
    dispatch({ type: "WORK_CHANGE", payload: {} });
    message.success(t('WorkSettings.WorkSettings.903401-0'));
    history.push("/project");
  };

  const renameInput = useRef(null);
  const inviteInput = useRef(null);

  // {t('WorkSettings.WorkSettings.903401-9')}
  const rename = async () => {
    if (!renameInput.current.input.value) return message.warning(t('WorkSettings.WorkSettings.903401-1'));
    setLoading(true);
    const res = await renameWorkSpaceApi(work.work_id, renameInput.current.input.value);
    setLoading(false);
    if (res.code !== 200) return message.error(res.msg);
    dispatch({ type: "WORK_CHANGE", payload: { ...work, work_name: renameInput.current.input.value } });
    message.success(t('WorkSettings.WorkSettings.903401-2'));
  };

  // {t('WorkSettings.WorkSettings.903401-12')}
  const invite = async () => {
    if (!inviteInput.current.input.value) return message.warning(t('WorkSettings.WorkSettings.903401-1'));
    setLoading(true);
    const res = await workAddUserApi(work.work_id, inviteInput.current.input.value);
    setLoading(false);
    if (res.code !== 200) return message.error(res.msg);
    init();
    message.success(t('WorkSettings.WorkSettings.903401-3'));
  };

  // {t('WorkSettings.WorkSettings.903401-18')}work
  const deleteWorkUser = async (name) => {
    setLoading(true);
    const res = await workDeleteUserApi(work.work_id, name);
    setLoading(false);
    if (res.code !== 200) return message.error(res.msg);
    init();
    message.success(t('WorkSettings.WorkSettings.903401-4'));
  };

  return (
    <Spin spinning={loading} tip={t('WorkSettings.WorkSettings.903401-5')} indicator={<LoadingOutlined spin />} size="large">
      <MainBox>
        <Body className="custom-scroll">
          <Title>{t('WorkSettings.WorkSettings.903401-6')}</Title>
          <Placeholder>
            lc {">"}
            <GlobalOutlined />
            <span>Modify the parameters of the workspace</span>
          </Placeholder>

          <Form form={form} layout="vertical">
            <InputBox>
              <Form.Item
                label={<ItemTitle>{t('WorkSettings.WorkSettings.903401-7')}</ItemTitle>}
                name="task_info"
                tooltip={{
                  title: t('WorkSettings.WorkSettings.903401-8'),
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    allowClear
                    ref={renameInput}
                    onPressEnter={rename}
                    placeholder="E.g., `Dog Breeds` or `Car Models` or `Text Finder`."
                  />
                  <Button type="primary" onClick={rename}>
                    {t('WorkSettings.WorkSettings.903401-9')}
                  </Button>
                </Space.Compact>
              </Form.Item>
              <Form.Item
                label={<ItemTitle>{t('WorkSettings.WorkSettings.903401-10')}</ItemTitle>}
                name="task_info"
                tooltip={{
                  title: t('WorkSettings.WorkSettings.903401-11'),
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    allowClear
                    onPressEnter={invite}
                    placeholder={t('WorkSettings.WorkSettings.903401-11')}
                    ref={inviteInput}
                  />
                  <Button type="primary" onClick={invite}>
                    {t('WorkSettings.WorkSettings.903401-12')}
                  </Button>
                </Space.Compact>
              </Form.Item>
            </InputBox>
          </Form>
          <ItemTitle>{t('WorkSettings.WorkSettings.903401-12')}{t('WorkSettings.WorkSettings.7725628-0')}</ItemTitle>
          <List
            className="work-settings-list custom-scroll"
            itemLayout="horizontal"
            dataSource={userList}
            renderItem={(item) => (
              <List.Item
                className="work-settings-list-item"
                actions={[
                  <Popconfirm
                    title={t('WorkSettings.WorkSettings.903401-14')}
                    description={t('WorkSettings.WorkSettings.903401-15')}
                    onConfirm={() => deleteWorkUser(item.user_name)}
                    okText={t('WorkSettings.WorkSettings.903401-16')}
                    cancelText={t('WorkSettings.WorkSettings.903401-17')}
                  >
                    <Button danger>{t('WorkSettings.WorkSettings.903401-18')}</Button>
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a>{item.user_name}</a>}
                  description={item.c_time}
                />
                <div>{t('WorkSettings.WorkSettings.903401-19')}{item.permission}</div>
              </List.Item>
            )}
          />
        </Body>
        <Footer>
          <Space size="middle">
            <Button onClick={() => history.push("/project")}>{t('WorkSettings.WorkSettings.903401-20')}</Button>
            <Popconfirm
              title={t('WorkSettings.WorkSettings.903401-21')}
              description={t('WorkSettings.WorkSettings.903401-22')}
              onConfirm={deleteWork}
              okText={t('WorkSettings.WorkSettings.903401-16')}
              cancelText={t('WorkSettings.WorkSettings.903401-17')}
            >
              <Button type="primary" danger>
                {t('WorkSettings.WorkSettings.903401-23')}
              </Button>
            </Popconfirm>
          </Space>
        </Footer>
      </MainBox>
    </Spin>
  );
}

const MainBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  width: 100%;
  max-width: 1410px;
  margin: 0 auto;
  padding: 0 24px;
  flex: 1;
  min-height: 80%;
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
  .work-settings-list {
    border: 1px solid #b0aeae2c;
    margin-top: 12px;
    /* padding: 12px; */
    border-radius: 12px;
    flex: 1;
    background-color: #d2d0d01d;
    .work-settings-list-item {
      background-color: white;
      padding: 12px;
    }
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 4px;
`;

const Placeholder = styled.div`
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  > span {
    color: ${themeColor.primary};
  }
`;

const ItemTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 2px;
`;

const InputBox = styled.div`
  display: flex;
  gap: 24px;
  > div:nth-child(1) {
    width: 65%;
  }
  > div:nth-child(2) {
    width: 35%;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #d1d1d5b4;
`;

export default WorkSettings;

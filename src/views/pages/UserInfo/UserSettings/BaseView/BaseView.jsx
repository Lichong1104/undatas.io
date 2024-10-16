import { updateUserInfoApi } from "@/api/httpApi";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Form, App, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import UpdateAvatar from "./UpdateAvatar/UpdateAvatar";

const { TextArea } = Input;

const BaseView = ({ currentUser, onUpdate }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        user_nickname: currentUser.user_nickname,
        user_name: currentUser.user_name,
        user_email: currentUser.user_email,
        user_phone: currentUser.user_phone,
        user_desc: currentUser.user_desc,
      });
      setLoading(false);
    }
  }, [currentUser]);

  // 更新用户信息
  const updateUserInfo = async () => {
    const { user_nickname, user_desc } = form.getFieldsValue();
    const res = await updateUserInfoApi(user_nickname, user_desc);
    if (res.code !== 200) return message.error(res.message);
    message.success(t('BaseView.BaseView.7183021-0'));
    // 通知父组件更新
    onUpdate();
  };

  const fileRef = useRef(null);

  return (
    <Spin spinning={loading} tip={t('BaseView.BaseView.7183021-1')} indicator={<LoadingOutlined spin />} size="large">
      <BaseViewWrapper className="custom-scroll">
        <Left>
          <Form form={form} layout="vertical" onFinish={updateUserInfo} initialValues={{}}>
            <Form.Item name="user_nickname" label={t('BaseView.BaseView.7183021-2')}>
              <Input />
            </Form.Item>
            <Form.Item name="user_name" label={t('BaseView.BaseView.7183021-3')} disabled={true}>
              <Input disabled={true} />
            </Form.Item>
            <Form.Item name="user_email" label={t('BaseView.BaseView.7183021-4')} disabled={true}>
              <Input disabled={true} />
            </Form.Item>

            <Form.Item label={t('BaseView.BaseView.7183021-5')} name="user_phone">
              <PhoneNumber disabled={true} value={currentUser?.user_phone} />
            </Form.Item>

            <Form.Item name="user_desc" label={t('BaseView.BaseView.7183021-6')}>
              <TextArea placeholder={t('BaseView.BaseView.7183021-6')} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                {t('BaseView.BaseView.7183021-7')}
              </Button>
            </Form.Item>
          </Form>
        </Left>
        <Right>
          <UpdateAvatar currentUser={currentUser} onUpdate={onUpdate} />
        </Right>
      </BaseViewWrapper>
    </Spin>
  );
};

// 使用 styled-components 定义样式
const BaseViewWrapper = styled.div`
  overflow: auto;
  display: flex;
  padding-top: 12px;
  @media screen and (max-width: 1200px) {
    flex-direction: column-reverse;
  }
`;

const Left = styled.div`
  min-width: 224px;
  max-width: 460px;
`;

const Right = styled.div`
  flex: 1;
  padding-left: 0px;
  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 448px;
    padding: 20px;
  }
`;

const AvatarTitle = styled.div`
  height: 22px;
  margin-bottom: 8px;
  color: #000;
  font-size: 16px;
  line-height: 22px;
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  margin-bottom: 12px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const PhoneNumber = styled(Input)`
  /* width: 214px; */
`;

export default BaseView;

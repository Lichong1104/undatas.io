import { updateUserInfoApi, updateUserAvatarApi } from "@/api/httpApi";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Form, App, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const { TextArea } = Input;

const BaseView = ({ currentUser, onUpdate }) => {
  const { message } = App.useApp();
  const dispatch = useDispatch();
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
    message.success("更新成功");
    // 通知父组件更新
    onUpdate();
  };

  const fileRef = useRef(null);

  // 上传用户头像
  const uploadUserAvatar = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await updateUserAvatarApi(formData);
    setLoading(false);
    if (res.code === 200) {
      message.success("头像更新成功");
      onUpdate(); // 通知父组件更新
      dispatch({ type: "SET_USER_AVATAR", payload: res.data.file_url });
    } else {
      message.error(res.msg || "头像更新失败");
    }
  };

  return (
    <Spin
      spinning={loading}
      tip={t("Dataset.Dataset.9034111-12")}
      indicator={<LoadingOutlined spin />}
      size="large"
    >
      <BaseViewWrapper className="custom-scroll">
        <Left>
          <Form form={form} layout="vertical" onFinish={updateUserInfo} initialValues={{}}>
            <Form.Item name="user_nickname" label="昵称">
              <Input />
            </Form.Item>
            <Form.Item name="user_name" label="用户名" disabled={true}>
              <Input disabled={true} />
            </Form.Item>
            <Form.Item name="user_email" label="邮箱" disabled={true}>
              <Input disabled={true} />
            </Form.Item>

            <Form.Item label="手机号" name="user_phone">
              <PhoneNumber disabled={true} value={currentUser?.user_phone} />
            </Form.Item>

            <Form.Item name="user_desc" label="个人简介">
              <TextArea placeholder="个人简介" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                更新基本信息
              </Button>
            </Form.Item>
          </Form>
        </Left>
        <Right>
          <AvatarTitle>头像</AvatarTitle>
          <Avatar>
            <img src={currentUser?.user_avatar} alt="avatar" />
          </Avatar>
          <input
            type="file"
            onChange={uploadUserAvatar}
            ref={fileRef}
            style={{ display: "none" }}
          ></input>
          <Button type="primary" onClick={() => fileRef.current.click()}>
            更换头像
          </Button>
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
  max-width: 448px;
`;

const Right = styled.div`
  flex: 1;
  padding-left: 104px;
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

const ButtonView = styled.div`
  width: 120px;
  text-align: center;
`;

const AreaCode = styled(Input)`
  width: 72px;
`;

const PhoneNumber = styled(Input)`
  /* width: 214px; */
`;

export default BaseView;

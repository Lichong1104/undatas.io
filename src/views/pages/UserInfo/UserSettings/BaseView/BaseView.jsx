import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input, message, Upload, Form, Select, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const { TextArea } = Input;


const BaseView = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: '',
    name: '',
    profile: '',
    country: 'China',
    province: '',
    city: '',
    address: '',
    phone: ['86', ''],
    avatar: '',
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCurrentUser({
        email: 'test@example.com',
        name: 'Test User',
        profile: '这是个人简介',
        country: 'China',
        province: '110000',
        city: '110100',
        address: 'Street 123',
        phone: ['86', '123456789'],
        avatar: 'https://gd-hbimg.huaban.com/7968f776596196a8061e9ee0ee51c0606d785fc42400b-9aWWPH_fw236',
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleFinish = () => {
    message.success('更新基本信息成功');
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <BaseViewWrapper className='custom-scroll'>
      <Left>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            ...currentUser,
            phone: currentUser?.phone,
          }}
        >
          <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入您的邮箱!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="昵称" rules={[{ required: true, message: '请输入您的昵称!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="profile" label="个人简介" rules={[{ required: true, message: '请输入个人简介!' }]}>
            <TextArea placeholder="个人简介" />
          </Form.Item>
          {/* <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card" fileList={[{
              uid: '-1',
              name: '头像',
              status: 'done',
              url: currentUser.avatar,
            }]}>

            </Upload>
          </Form.Item> */}
          <Form.Item name="country" label="国家/地区" rules={[{ required: true, message: '请输入您的国家或地区!' }]}>
            <Select>
              <Select.Option value="China">中国</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="city"
            label="所在城市"
            rules={[{ required: true, message: '请输入您的所在城市!' }]}
          >
            <Select>
              <Select.Option value="110100">北京市</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="街道地址"
            rules={[{ required: true, message: '请输入您的街道地址!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="联系电话" required>
            <Space>
              <AreaCode value={currentUser.phone[0]} />
              <PhoneNumber value={currentUser.phone[1]} />
            </Space>

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
          <img src={currentUser.avatar} alt="avatar" />
        </Avatar>
        <ButtonView>
          <Upload showUploadList={false}>
            <Button>
              <UploadOutlined />
              更换头像
            </Button>
          </Upload>
        </ButtonView>
      </Right>
    </BaseViewWrapper>
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
  width: 214px;
`;


export default BaseView;

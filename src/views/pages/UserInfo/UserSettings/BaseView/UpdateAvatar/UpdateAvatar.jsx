import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Avatar, Button, App, Divider, Spin } from "antd";
import { UserOutlined, UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { updateUserAvatarApi, updateUserAvatarByUrlApi } from "@/api/httpApi";

export default function UpdateAvatar({ currentUser, onUpdate }) {
  const { message, modal } = App.useApp();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(currentUser?.user_avatar);
  useEffect(() => setAvatar(currentUser?.user_avatar), [currentUser]);

  const [loading, setLoading] = useState(false);

  // {t('UpdateAvatar.UpdateAvatar.7183125-5')}选择
  const handlePresetSelect = async (preset) => {
    modal.confirm({
      title: t('UpdateAvatar.UpdateAvatar.7183125-0'),
      onOk: () => usePresetAvatar(preset),
    });
  };

  // 使用{t('UpdateAvatar.UpdateAvatar.7183125-5')}
  const usePresetAvatar = async (preset) => {
    const res = await updateUserAvatarByUrlApi(String(preset));
    if (res.code === 200) {
      message.success(t('UpdateAvatar.UpdateAvatar.7183125-1'));
      onUpdate(); // 通知父组件更新
      dispatch({ type: "SET_USER_AVATAR", payload: res.data.file_url });
    } else {
      message.error(res.msg || t('UpdateAvatar.UpdateAvatar.7183125-2'));
    }
  };

  // {t('UpdateAvatar.UpdateAvatar.7183125-6')}
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
      message.success(t('UpdateAvatar.UpdateAvatar.7183125-1'));
      onUpdate(); // 通知父组件更新
      dispatch({ type: "SET_USER_AVATAR", payload: res.data.file_url });
    } else {
      message.error(res.msg || t('UpdateAvatar.UpdateAvatar.7183125-2'));
    }
  };

  // {t('UpdateAvatar.UpdateAvatar.7183125-5')}地址
  const presetAvatarUrls = Array.from({ length: 12 }).map(
    (_, index) =>
      `https://fquantplus.oss-cn-qingdao.aliyuncs.com/undataParser/default_avatar/${
        index + 1
      }.png`
  );

  return (
    <Container>
      <Spin
        spinning={loading}
        tip={t('UpdateAvatar.UpdateAvatar.7183125-3')}
        indicator={<LoadingOutlined spin />}
        size="large"
      >
        <Header>
          <StyledAvatar src={avatar} icon={<UserOutlined />} />
          <Title>{t('UpdateAvatar.UpdateAvatar.7183125-4')}</Title>
        </Header>

        <PresetAvatars className="custom-scroll">
          {presetAvatarUrls.map((preset, index) => (
            <PresetAvatarButton key={index} onClick={() => handlePresetSelect(index + 1)}>
              <img src={preset} alt={t('UpdateAvatar.UpdateAvatar.7183125-5')} />
            </PresetAvatarButton>
          ))}
        </PresetAvatars>
        <Divider variant="dotted" style={{ borderColor: "#262820" }}>
          or
        </Divider>
        <Button
          style={{ width: "100%" }}
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => fileRef.current.click()}
        >
          {t('UpdateAvatar.UpdateAvatar.7183125-6')}
        </Button>
        <input
          type="file"
          onChange={uploadUserAvatar}
          ref={fileRef}
          style={{ display: "none" }}
        ></input>
      </Spin>
    </Container>
  );
}

// 样式组件
const Container = styled.div`
  max-width: 350px;
  /* margin: 0 auto; */
  margin-left: 40px;
  padding: 18px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid #6a696927;
  /* margin-top: 10px; */
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 400;
  color: #333;
  margin-top: 8px;
`;

const StyledAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
`;

const PresetAvatars = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  max-height: 180px;
  overflow-y: auto;
  padding: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
`;

const PresetAvatarButton = styled(Button)`
  padding: 0;
  width: 80px;
  height: 80px;
  img {
    width: 70px;
    height: 70px;
  }
`;

import { getFileDetailApi } from "@/api/httpApi";
import { LoadingOutlined } from "@ant-design/icons";

import { App, Drawer, Empty, Spin, Typography } from "antd";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";

const { Paragraph } = Typography;

function VideNotion() {
  const { message } = App.useApp();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [notion, setNotion] = useState("");

  const [videoUrl, setVideoUrl] = useState("");

  const currentFile = useSelector((state) => state.currentFile.file);

  // 初始化
  const init = async () => {
    const res = await getFileDetailApi(currentFile);
    setLoading(false);
    if (res.code !== 200) return message.error(res.msg);
    setNotion(res.data[0].result_path.result);
    setVideoUrl(res.data[0].result_path.file_path);
  };

  useEffect(() => {
    init();
  }, []);

  // 抽屉
  const [drawerOpen, setDrawerOpen] = useState(true);
  const onClose = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      history.goBack();
    }, 100);
  };

  return (
    <Drawer title={t('FileDetail.VideoNotion.903405-0')} onClose={onClose} placement="top" style={drawerStyle} open={drawerOpen}>
      <Spin size="large" spinning={loading} tip={t('FileDetail.VideoNotion.903405-1')} indicator={<LoadingOutlined spin />}>
        <MainBox>
          <VideoPlayer>
            <video
              src={videoUrl}
              playsInline
              controls
              style={{ width: "100%", height: "100%", backgroundColor: "#f5f5f5" }}
            ></video>
          </VideoPlayer>
          <Text>
            {notion ? <Paragraph copyable>{notion}</Paragraph> : <Empty style={{ marginTop: "70px" }} />}
          </Text>
        </MainBox>
      </Spin>
    </Drawer>
  );
}

const drawerStyle = {
  height: "65vh",
  width: "85vw",
  margin: "0 auto",
};

const MainBox = styled.div`
  height: 100%;
  display: flex;
  display: flex;
  gap: 12px;
  > div {
    width: 50%;
    height: 100%;
  }
`;

const VideoPlayer = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;

const Text = styled.div`
  background-color: #f5f5f5;
  padding: 12px;
`;

export default VideNotion;

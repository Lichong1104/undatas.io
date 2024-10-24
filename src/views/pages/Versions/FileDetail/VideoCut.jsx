import { getFileDetailApi } from "@/api/httpApi";
import { LoadingOutlined } from "@ant-design/icons";

import { App, Drawer, Empty, Spin, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";

function VideoCut() {
  const { message } = App.useApp();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [cutFinishList, seCutFinishList] = useState([]);

  const [videoUrl, setVideoUrl] = useState("");

  const currentFile = useSelector((state) => state.currentFile.file);

  // 初始化
  const init = async () => {
    const res = await getFileDetailApi(currentFile);
    setLoading(false);
    if (res.code !== 200) return message.error(res.msg);
    seCutFinishList(res.data[0].result_path);
    setVideoUrl(res.data[0].result_path[0]);
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
    <Drawer title={t('FileDetail.VideoCut.903406-0')} onClose={onClose} placement="top" style={drawerStyle} open={drawerOpen}>
      <Spin size="large" spinning={loading} tip={t('FileDetail.VideoCut.903406-1')} indicator={<LoadingOutlined spin />}>
        <MainBox>
          <VideoPlayer>
            <video
              src={videoUrl}
              playsInline
              controls
              style={{ width: "100%", height: "100%", backgroundColor: "#f5f5f5" }}
            ></video>
          </VideoPlayer>
          <VideoInfo className="custom-scroll">
            {cutFinishList.length ? (
              cutFinishList.map((v, i) => {
                return (
                  <Tooltip title={v} key={i}>
                    <VideoItem
                      key={i}
                      onClick={() => {
                        setVideoUrl(v);
                      }}
                    >
                      <p>
                        {t('FileDetail.VideoCut.903406-2')}{i}{t('FileDetail.VideoCut.903406-3')}{v}
                      </p>
                    </VideoItem>
                  </Tooltip>
                );
              })
            ) : (
              <Empty style={{ marginTop: "70px" }} />
            )}
          </VideoInfo>
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

const VideoInfo = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const VideoItem = styled.div`
  background-color: #f5f5f5;
  border-radius: 4px;
  > p {
    padding: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  cursor: pointer;
  &:hover {
    background-color: #dbd6d6b1;
  }
`;

export default VideoCut;

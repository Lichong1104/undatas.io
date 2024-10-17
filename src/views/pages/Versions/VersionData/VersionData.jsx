import { getVersionFile } from "@/api/httpApi";
import { themeColor } from "@/theme/color";
import { LoadingOutlined } from "@ant-design/icons";
import { App, Badge, Spin, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import VideoCut from "../FileDetail/VideoCut";
import VideNotion from "../FileDetail/VideoNotion";
import { getBinaryFileContent } from "@/api/s3Api";
import PdfParser from "../FileDetail/PdfParser";
import PdfParserPro from "../FileDetail/PdfParserPro";

function VersionData(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { message } = App.useApp();
  const project = useSelector((state) => state.currentProject.project);

  const [loading, setLoading] = useState(true);

  // 文件列表
  const [fileList, setFileList] = useState([]);

  // 用 useRef 来保存 WebSocket 实例
  const socketRef = useRef(null);

  // 初始化并建立 WebSocket 连接
  const init = async () => {
    setLoading(true);

    // 确保只有一次初始化
    if (socketRef.current) {
      socketRef.current.close();
    }

    const params = {
      task_id: project.task_id,
      vision: props.v,
      count: "all",
    };

    // 建立 WebSocket 连接
    socketRef.current = new WebSocket(
      `wss://backendwss.undatas.io/api/socket/socket_task_vision`
    );

    // WebSocket 连接打开时发送参数
    socketRef.current.onopen = () => {
      socketRef.current.send(JSON.stringify(params));
    };

    // 接收到 WebSocket 数据时更新 fileList
    socketRef.current.onmessage = async (event) => {
      const res = JSON.parse(event.data);
      // 如果项目类型不是 pdfParser，则设置 fileList
      if (project.task_type !== "pdfParser" && project.task_type !== "pdfParserPro") {
        setFileList(res);
        return setLoading(false);
      }
      const dataPromise = res?.map(async (v, i) => {
        const image_path = await getBinaryFileContent(v.image_path);
        return {
          ...v,
          image_path,
        };
      });
      const data = await Promise.all(dataPromise);
      setLoading(false);
      setFileList(data);
    };

    // WebSocket 关闭时清理
    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };
  };

  useEffect(() => {
    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  // 文件详情
  const fileDetail = (file_id, result) => {
    if (!result) return message.warning(t("VersionData.VersionData.7183010-0"));
    const payload = {
      file_id,
      task_type: project.task_type,
      task_id: project.task_id,
      vision: props.v,
    };
    dispatch({ type: "FILE_CHANGE", payload });
    history.push("/versions/version-data/" + project.task_type);
  };
  return (
    <MainBox>
      <Title>
        {fileList.length} Total Images
        <span onClick={() => history.push("/versions/version-info")}>
          {t("VersionData.VersionData.903404-0")}
        </span>
      </Title>
      {loading ? (
        <div style={{ flex: 1 }}>
          <Spin
            spinning={loading}
            tip={t("VersionData.VersionData.903404-1")}
            indicator={<LoadingOutlined spin />}
            size="large"
          >
            <div></div>
          </Spin>
        </div>
      ) : (
        <FileList className="custom-scroll">
          {fileList.map((v, i) => {
            return (
              <FileItem key={i} onClick={() => fileDetail(v.file_id, v.result)}>
                <Badge.Ribbon
                  style={{ fontSize: 12 }}
                  text={
                    <Tooltip mouseEnterDelay={0.2} title={v.file_name}>
                      {v.file_name.charAt(0)}
                    </Tooltip>
                  }
                  color={v.color}
                  placement="start"
                >
                  <ImageBox
                    style={{
                      backgroundImage: `url("${v.image_path}")`,
                    }}
                  >
                    {" "}
                    <Status>{v.result ? <Badge status="success" /> : undefined}</Status>
                  </ImageBox>
                </Badge.Ribbon>
                <p>{v.file_name}</p>
              </FileItem>
            );
          })}
        </FileList>
      )}
      <Route path="/versions/version-data/videoCut" component={VideoCut} />
      <Route path="/versions/version-data/videoNotion" component={VideNotion} />
      <Route path="/versions/version-data/pdfParser" component={PdfParser} />
      <Route path="/versions/version-data/pdfParserPro" component={PdfParserPro} />
    </MainBox>
  );
}

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  gap: 8px;
  min-height: 80%;
  padding: 20px;
  padding-top: 12px;
`;

const Title = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  span {
    color: ${themeColor.primary};
    cursor: pointer;
    padding: 4px 12px;
    transition: all.2s;
    border-radius: 8px;
    &:hover {
      background-color: ${themeColor.hover};
    }
  }
`;

const FileList = styled.div`
  flex: 1;
  min-height: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(116px, 1fr));
  justify-content: space-between;
  grid-auto-rows: 126px;
  gap: 4px;
`;

const FileItem = styled.div`
  width: 116px;
  height: 131px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  gap: 4px;
  border: 1px solid ${(p) => (p.$isActive ? themeColor.primary : "rgba(0, 0, 0, 0)")};
  background-color: ${(p) => (p.$isActive ? themeColor.hover : "rgba(0, 0, 0, 0)")};
  cursor: pointer;
  transition: 0.1s;
  position: relative;

  &:hover {
    background-color: ${themeColor.hover};
    border: 1px solid ${(p) => (p.$isActive ? themeColor.primary : "#8315f94b;")};
    .dataset_checkbox {
      display: block;
    }
  }
  .dataset_checkbox {
    display: ${(p) => (p.$isActive ? "block" : "none")};
  }
  img {
  }
  > p {
    font-size: 12px;
    color: #000000b2;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Status = styled.div`
  position: absolute;
  right: -4px;
  top: -10px;
  z-index: 1;
`;

const ImageBox = styled.div`
  width: 94px;
  height: 86px;
  border-radius: 4px;
  background-size: cover;
`;

export default VersionData;

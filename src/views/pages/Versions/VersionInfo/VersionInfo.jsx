import { themeColor } from "@/theme/color";
import { ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons";
import { App, Badge, Space, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import VideoCut from "../FileDetail/VideoCut";
import VideNotion from "../FileDetail/VideoNotion";
import PdfParserPro from "../FileDetail/PdfParserPro";
import { getBinaryFileContent } from "@/api/s3Api";
import PdfParser from "../FileDetail/PdfParser";

function VersionInfo(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { message } = App.useApp();
  const project = useSelector((state) => state.currentProject.project);

  const [version, setVersion] = useState("");
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

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
      vision: props.info.vision,
      count: "10",
    };

    // 建立 WebSocket 连接
    socketRef.current = new WebSocket(`wss://backendwss.undatas.io/api/socket/socket_task_vision`);

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

  // 当 version 或 props 变化时重新连接 WebSocket
  useEffect(() => {
    setVersion(props.info.vision);
  }, [props]);

  useEffect(() => {
    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [version]);

  // 文件详情
  const fileDetail = (file_id, result) => {
    // if (!result) return message.warning(t("VersionInfo.VersionInfo.7183011-0"));
    const payload = {
      file_id,
      task_type: project.task_type,
      task_id: project.task_id,
      vision: props.info.vision,
    };
    dispatch({ type: "FILE_CHANGE", payload });
    history.push("/versions/version-info/" + project.task_type);
  };

  return (
    <MainBox className="custom-scroll">
      <Spin spinning={loading} tip={t("Versions.Versions.903402-7")} indicator={<LoadingOutlined spin />} size="large">
        <VersionDesc>
          <h2>{t("VersionInfo.VersionInfo.903403-0")}</h2>
          <p>
            {t("VersionInfo.VersionInfo.903403-1")}
            {t("VersionInfo.VersionInfo.903403-2")}
          </p>
        </VersionDesc>
        <FileTitle>
          <Space>
            <span style={{ fontWeight: 500 }}>{props.info.count}</span>
            <span>{t("VersionInfo.VersionInfo.903403-3")}</span>
          </Space>
          <ViewData onClick={() => history.push("/versions/version-data")}>
            <span>{t("VersionInfo.VersionInfo.903403-4")}</span>
            <ArrowRightOutlined />
          </ViewData>
        </FileTitle>
        <FileList>
          {fileList?.map((v, i) => (
            <FileItem
              onClick={() => fileDetail(v.file_id, v.result)}
              key={i}
              style={{ backgroundImage: `url(${v.image_path})` }}
            >
              <Status>{v.result ? <Badge status="success" /> : undefined}</Status>
            </FileItem>
          ))}
          {/* {props.info.file_info?.map((v, i) => (
            <FileItem
              onClick={() => fileDetail(v.file_id, v.result)}
              key={i}
              style={{ backgroundImage: `url(${v.image_path})` }}
            >
              <Status>{v.result ? <Badge status="success" /> : undefined}</Status>
            </FileItem>
          ))} */}
        </FileList>

        <Route path="/versions/version-info/videoCut" component={VideoCut} />
        <Route path="/versions/version-info/videoNotion" component={VideNotion} />
        <Route path="/versions/version-info/pdfParser" component={PdfParser} />
        <Route path="/versions/version-info/pdfParserPro" component={PdfParserPro} />
        <VersionParams>
          <h3>{t("VersionInfo.VersionInfo.903403-5")}</h3>
          <div>
            <p>
              <span>{t("VersionInfo.VersionInfo.903403-6")} </span>
              {props.info["Auto-Orient"]}
            </p>
            <p>
              <span>{t("VersionInfo.VersionInfo.903403-7")} </span> {props.info["Resize"]}
            </p>
            <p>
              <span>{t("VersionInfo.VersionInfo.903403-8")} </span> {props.info["Rotation"]}
            </p>
            <p>
              <span>{t("VersionInfo.VersionInfo.903403-9")} </span> {props.info["Outputs per training example"]}
            </p>
            <p>
              <span>Filp : </span> {props.info["Filp"]}
            </p>
            <p>
              <span>{t("VersionInfo.VersionInfo.903403-10")} </span> {props.info["c_time"]}
            </p>
            <p>
              <span>{t("VersionInfo.VersionInfo.903403-11")} </span> {props.info["vision"]}
            </p>
          </div>
        </VersionParams>
        <VersionParams>
          <h3>{t("VersionInfo.VersionInfo.903403-12")}</h3>
          <div>
            <p>
              <span>{t("VersionInfo.VersionInfo.903403-13")}</span> {project.task_name}
            </p>
            <p>
              <span>{t("VersionInfo.VersionInfo.903403-14")} </span>
              {project.c_time}
            </p>
            <p>
              <span>{t("VersionInfo.VersionInfo.903403-15")}</span>
              {project.task_type}
            </p>
          </div>
        </VersionParams>
      </Spin>
    </MainBox>
  );
}

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  min-height: 80%;
`;

const VersionDesc = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 24px 36px;
`;

const FileTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  font-size: 16px;
`;

const ViewData = styled.div`
  display: flex;
  gap: 4px;
  color: ${themeColor.primary};
  letter-spacing: 1px;
  padding: 4px 12px;
  border-radius: 8px;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    background-color: ${themeColor.hover};
  }
`;

const FileList = styled.div`
  display: flex;
  gap: 12px;
  width: 98%;
  min-height: 100px;
  overflow: hidden;
  padding: 0 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #8080802f;
`;

const FileItem = styled.div`
  flex: 0 0 100px;
  height: 100px;
  border-radius: 8px;
  cursor: pointer;
  background-size: cover;
  border: 2px solid white;
  transition: all 0.2s;
  border: 1px solid #7674743f;
  position: relative;
  &:hover {
    box-shadow: 2px 2px 4px 1px #7674743f;
  }
`;

const Status = styled.div`
  position: absolute;
  right: -4px;
  top: -10px;
  z-index: 1;
`;

const VersionParams = styled.div`
  padding: 24px;
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #8080802f;
  > h3 {
    font-weight: 600;
  }
  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }
  span {
    font-weight: 600;
  }
`;

export default VersionInfo;

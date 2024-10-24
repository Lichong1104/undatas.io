import { s3UploadApi } from "@/api/s3Api";
import { themeColor } from "@/theme/color";
import {
  ArrowUpOutlined,
  FileDoneOutlined,
  FolderOpenOutlined,
  FundOutlined,
  HeatMapOutlined,
  PlusSquareOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
import { App, Button, Space, Tour } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { md5 } from "js-md5";
import { noticeUploadApi } from "@/api/httpApi";
import { multipartUploadApi } from "@/api/ossApi";
import { isSeenTour, seenTour } from "@/utils/tools";

function UploadData() {
  const project = useSelector((state) => state.currentProject.project);
  const workId = useSelector((state) => state.currentWork.work.work_id);
  const dispatch = useDispatch();
  const { notification } = App.useApp();

  // 上传
  const fileInput = useRef(null);
  const folderInput = useRef(null);

  // {t('UploadData.UploadData.903409-6')}
  const fileUpload = async (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files).map((f, i) => ({
      name: f.name,
      size: f.size,
      status: "wait",
      key: Date.now() + i,
    }));

    // 把新的文件添加到现有的列表前面
    dispatch({ type: "UPLOAD/ADD", payload: fileArray });
    dispatch({ type: "PROGRESS/CHANGE", payload: true });

    notification.info({
      message: t("UploadData.UploadData.903409-0"),
      description: t("UploadData.UploadData.903409-1", [fileArray.length]),
    });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileKey = fileArray[i].key;

      // 更新上传状态的辅助函数
      const updateUploadStatus = (status, progress = 0) => {
        dispatch({
          type: "UPLOAD/CHANGE_STATUS",
          payload: { key: fileKey, status, progress },
        });
      };

      // {t('UploadData.UploadData.903409-0')}的辅助函数
      const uploadFile = async (uploadFn, progressCallback) => {
        updateUploadStatus("uploading", 0);
        const res = await uploadFn(progressCallback);
        await noticeUploadApi(workId, project.task_id, file.name, md5(file.name), project.task_type);
        updateUploadStatus(res.res.status ? "success" : "fail");
      };

      if (project.task_type === "pdfParser" || project.task_type === "pdfParserPro") {
        await uploadFile(
          (progressCallback) => s3UploadApi(workId, project.task_id, file, progressCallback),
          (p) => updateUploadStatus("uploading", p * 100)
        );
      } else {
        await uploadFile(
          (progressCallback) => multipartUploadApi(project.task_id, project.task_type, file, progressCallback),
          (p) => updateUploadStatus("uploading", p * 100)
        );
      }
    }
  };

  // 导览
  const [tourOpen, setTourOpen] = useState(false);
  const tourRef = useRef(null);
  const steps = [
    {
      title: t("UploadData.UploadData.903409-2"),
      description: t("UploadData.UploadData.903409-3"),
      target: () => tourRef.current,
    },
    {
      title: t("UploadData.UploadData.903409-4"),
      description: t("UploadData.UploadData.903409-5"),
      target: null,
    },
  ];

  useEffect(() => {
    if (!isSeenTour("uploadData")) setTourOpen(true);
  }, []);

  // 关闭导览
  const closeTour = () => {
    setTourOpen(false);
    seenTour("uploadData");
  };

  return (
    <MainBox>
      <Title>
        <div>
          <PlusSquareOutlined />
        </div>
        {t("UploadData.UploadData.903409-6")}
      </Title>
      {/* <UploadParams>
        <div>
          <span>Batch Name :</span>
          <Input placeholder="Uploaded on 06/28/24 at 10:48 am" />
        </div>
        <div>
          <span>Tags :</span>
          <Input placeholder="Search or add tags for images" />
        </div>
      </UploadParams> */}
      <UploadBox>
        <UploadIcon>
          <ArrowUpOutlined />
        </UploadIcon>

        <h1>{t("UploadData.UploadData.483485-0")}</h1>
        <h1 style={{ marginTop: "-12px" }}>{t("UploadData.UploadData.863539-0")}</h1>

        <Space ref={tourRef}>
          <Button icon={<FileDoneOutlined />} onClick={() => fileInput.current.click()}>
            {t("UploadData.UploadData.903409-9")}
          </Button>
          <Button icon={<FolderOpenOutlined />} onClick={() => folderInput.current.click()}>
            {t("UploadData.UploadData.147838-0")}
          </Button>
        </Space>

        <input type="file" style={{ display: "none" }} ref={fileInput} multiple onChange={fileUpload} />
        <input
          type="file"
          style={{ display: "none" }}
          ref={folderInput}
          webkitdirectory={"true"}
          onChange={fileUpload}
        />

        <div style={{ marginTop: 12 }}>
          <p style={{ fontSize: 12, textAlign: "center" }}>{t("UploadData.UploadData.147838-1")}</p>
          <FileFormats>
            <div>
              <Space>
                <FundOutlined />
                Document
              </Space>

              <p>in .pdf .pptx .ppt .docx .doc</p>
            </div>
            {/* <div>
              <Space>
                <HeatMapOutlined /> Annotations
              </Space>
              <p>in .mov, .mp4, .avi</p>
            </div>
            <div>
              <Space>
                <VideoCameraAddOutlined />
                Videos
              </Space>
              <p>in .mov, .mp4, .avi</p>
            </div> */}
          </FileFormats>
        </div>

        <span style={{ marginTop: 24 }}>{t("UploadData.UploadData.903409-12")}</span>
      </UploadBox>
      <Tour open={tourOpen} onClose={closeTour} steps={steps} />
    </MainBox>
  );
}
const MainBox = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 20px;
  display: flex;
  gap: 8px;
`;

const UploadParams = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  > div {
    width: 50%;
    display: flex;
    align-items: center;
    gap: 4px;
    > span {
      display: block;
      white-space: nowrap;
    }
  }
`;

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 2vh;
  flex: 1;
  background-color: white;
  border-radius: 12px;
  border: 1px solid #827e7e58;
  overflow: auto;
  h1 {
    color: ${themeColor.primary};
    font-weight: 500;
    letter-spacing: 2px;
    font-size: 24px;
  }
  > span {
    font-size: 12px;
  }
`;

const UploadIcon = styled.div`
  color: ${themeColor.primary};
  background-color: ${themeColor.hover};
  width: 72px;
  height: 72px;
  display: flex;
  justify-content: center;
  font-size: 32px;
  border-radius: 50%;
`;

const FileFormats = styled.div`
  display: flex;
  gap: 40px;
  border: 1px dashed #827e7e58;
  padding: 12px;
  border-radius: 8px;
  margin-top: 8px;

  padding: 12px 120px;
`;

export default UploadData;

import { OrderedListOutlined } from "@ant-design/icons";
import React, { useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Progress, Table } from "antd";
import { themeColor } from "@/theme/color";

function UploadProgress(props) {
  const dispatch = useDispatch();
  const fileList = useSelector((state) => state.uploadProgress.fileList);
  const columns = [
    {
      title: t(t('UploadProgress.UploadProgress.7725654-0')) ,
      dataIndex: "name",
      key: "name",
      render: (text) => <a style={{ color: themeColor.primary }}>{text}</a>,
    },
    {
      title: t(t('UploadProgress.UploadProgress.7725654-1')) ,
      dataIndex: "size",
      key: "size",
      render: (text) => <span>{(text / 1048576).toFixed(3)} MB</span>,
    },
    {
      title: t(t('UploadProgress.UploadProgress.7725654-2')) ,
      dataIndex: "status",
      key: "status",
      render: (v, r) => {
        if (v === "wait") return <Progress type="circle" size={40} percent={0} />;
        if (v === "uploading")
          return <Progress type="circle" size={40} percent={r.progress.toFixed(1)} />;
        if (v === "success") return <Progress type="circle" size={40} percent={100} status="success" />;
        if (v === "fail") return <Progress type="circle" size={40} percent={100} status="exception" />;
      },
    },
  ];

  const tasksRef = useRef(null);

  // 切换分页
  const tablePagination = {
    defaultPageSize: 30,
    onChange: (page, size) => tasksRef.current.scrollTo(0, 0),
    total: 30,
  };

  // 清除进度
  const clearProgress = () => {
    dispatch({ type: "CLEAR/PROGRESS" });
  };

  return (
    <Tasks ref={tasksRef} $width={props.width} $height={props.height} $position={props.position}>
      <TaskHead>{t(t('UploadProgress.UploadProgress.7725654-3'))}<Button size="small" style={{ padding: 10 }} type="primary" onClick={clearProgress}>{t(t('UploadProgress.UploadProgress.7725654-4'))}</Button>
      </TaskHead>
      <div style={{ flex: 1 }} className="custom-scroll">
        {fileList.length ? (
          <Table columns={columns} dataSource={fileList} pagination={tablePagination} bordered />
        ) : (
          <TaskBody>
            <OrderedListOutlined style={{ fontSize: "24px" }} />
            <h3>{t(t('UploadProgress.UploadProgress.7725654-5'))}</h3>
            <p>{t(t('UploadProgress.UploadProgress.7725654-6'))}</p>
          </TaskBody>
        )}
      </div>
    </Tasks>
  );
}

const Tasks = styled.div`
  width: ${(p) => p.$width};
  height: ${(p) => p.$height};
  background-color: white;
  border: 1px solid #8885855d;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  position: ${(p) => (p.$position ? "none" : "absolute")};
  right: 0px;
  bottom: 0px;
`;

const TaskHead = styled.div`
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskBody = styled.div`
  background-color: #f3f4f6;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  p {
    font-size: 12px;
  }
`;

export default UploadProgress;

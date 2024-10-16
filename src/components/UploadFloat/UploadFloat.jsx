import { FileUnknownOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import React from "react";
import UploadProgress from "../UploadProgress/UploadProgress";
import { useDispatch, useSelector } from "react-redux";

function UploadFloat() {
  const open = useSelector((state) => state.uploadProgress.open);
  const dispatch = useDispatch();
  return (
    <FloatButton.Group
      trigger="click"
      type="primary"
      open={open}
      onOpenChange={(v) => setTimeout(() => dispatch({ type: "PROGRESS/CHANGE", payload: v }), 0)}
      style={{ right: 24 }}
      icon={<FileUnknownOutlined />}
    >
      <UploadProgress width="25vw" height="65vh" />
    </FloatButton.Group>
  );
}

export default UploadFloat;

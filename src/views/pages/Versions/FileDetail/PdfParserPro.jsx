import { App, Drawer, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getFileDetailApi } from "@/api/httpApi";
import { getPdfFileContent } from "@/api/s3Api";
import { LoadingOutlined } from "@ant-design/icons";

function PdfParserPro() {
  const { message } = App.useApp();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const currentFile = useSelector((state) => state.currentFile.file);

  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);

  const [pdfUrl, setPdfUrl] = useState("");

  const init = async () => {
    const res = await getFileDetailApi(currentFile);
    if (res.code !== 200) return message.error(res.msg);
    const url = await getPdfFileContent(res.data.pdfurl);
    setLoading(false);
    setPdfUrl(url);
    // 处理pdfresult字段
    const pdfResult = res.data.pdfresult;
    const data = Object.entries(pdfResult).map(([key, value]) => ({
      key,
      value,
    }));
    setDataSource(data);
    setColumns([
      { title: "Key", dataIndex: "key", key: "key" },
      { title: "Value", dataIndex: "value", key: "value" },
    ]);
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
    }, 300); // 增加延迟时间
  };

  return (
    <Drawer
      title={t("FileDetail.PdfParser.903407-12")}
      onClose={onClose}
      placement="top"
      style={drawerStyle}
      open={drawerOpen}
    >
      <Spin
        spinning={loading}
        tip={t('FileDetail.PdfParserPro.7183017-0')}
        indicator={<LoadingOutlined spin />}
        size="large"
      >
        <MainBox>
          <iframe src={pdfUrl} className="iframe" />
          <div>
            <Table bordered dataSource={dataSource} pagination={false} columns={columns} />
          </div>
        </MainBox>
      </Spin>
    </Drawer>
  );
}

const drawerStyle = {
  height: "100vh",
  width: "100vw",
  margin: "0 auto",
};

const MainBox = styled.div`
  display: flex;
  gap: 12px;
  height: 100%;
  gap: 12px;
  .iframe {
    width: 50%;
    height: 100%;
  }
  > div {
    width: 50%;
    height: 100%;
    overflow: auto;
  }
`;

export default PdfParserPro;

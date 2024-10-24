import { Radio, Space, Spin, Button, App, Drawer, InputNumber, Tour } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MyAnnotation from "@/components/Annotation/Annotation";

import "vditor/dist/index.css";
import Vditor from "vditor";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { getFileDetailApi, parseSinglePdfApi } from "@/api/httpApi";
import { getBinaryFileContent } from "@/api/s3Api";
import { LoadingOutlined } from "@ant-design/icons";
import { isSeenTour, seenTour } from "@/utils/tools";

function PdfParser() {
  const { message } = App.useApp();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const currentFile = useSelector((state) => state.currentFile.file);
  const project = useSelector((state) => state.currentProject.project);

  const [dataList, setDataList] = useState([]);
  // {t('FileDetail.PdfParser.903407-17')}数
  const [page, setPage] = useState(0);
  // 标注数据
  const [markData, setMarkData] = useState([]);
  // 新的数据
  const [newMarkData, setNewMarkData] = useState([]);
  // markdown
  const [markdown, setMarkdown] = useState("");

  const init = async () => {
    const res = await getFileDetailApi(currentFile);
    if (res.code !== 200) return message.error(res.msg);

    const dataPromises = res.data.map(async (v, i) => {
      const img_url = await getBinaryFileContent(v.img_url);
      return { ...v, img_url };
    });

    const data = await Promise.all(dataPromises);
    setLoading(false);
    setDataList(data);
  };

  useEffect(() => {
    init();
  }, []);

  // 标注数据
  useEffect(() => {
    if (dataList.length === 0) return;
    const data = dataList[page].layouts_data.map((v, i) => {
      return {
        id: i + 1,
        comment: v.type,
        mark: {
          type: "RECT",
          x: v.bbox[0] * 3,
          y: v.bbox[1] * 3,
          width: v.bbox[2] * 3 - v.bbox[0] * 3,
          height: v.bbox[3] * 3 - v.bbox[1] * 3,
        },
      };
    });
    setMarkData(data);
    setMarkdown(dataList[page].markdown);
  }, [dataList, page]);

  // {t('FileDetail.PdfParser.903407-14')}
  const prevPage = () => {
    if (page === 0) return message.warning(t("FileDetail.PdfParser.903407-0"));
    setPage(page - 1);
  };

  // {t('FileDetail.PdfParser.903407-15')}
  const nextPage = () => {
    if (page === dataList.length - 1) return message.warning(t("FileDetail.PdfParser.903407-1"));
    setPage(page + 1);
  };

  // 重新{t('FileDetail.PdfParser.903407-19')}
  const reParse = async () => {
    for (let i = 0; i < newMarkData.length; i++) {
      // 判断每个item中是否存在comment属性并且不为空
      if (!newMarkData[i].comment) return message.warning(t("FileDetail.PdfParser.903407-2"));
    }
    setLoading(true);
    const data = newMarkData.map((v) => {
      return {
        bbox: [v.mark.x / 3, v.mark.y / 3, v.mark.x / 3 + v.mark.width / 3, v.mark.y / 3 + v.mark.height / 3],
        type: v.comment,
      };
    });

    const params = {
      file_id: currentFile.file_id,
      task_id: project.task_id,
      vision: currentFile.vision,
      task_type: project.task_type,
      layout: [
        {
          para_blocks: data,
          page_id: page,
        },
      ],
    };

    const res = await parseSinglePdfApi(params);
    if (res.code !== 200) {
      setLoading(false);
      return message.error(res.msg);
    }
    await init();
    setLoading(false);
    message.success(t("FileDetail.PdfParser.903407-3"));
  };

  const [radioValue, setRadioValue] = useState("markdown");
  const onRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const [downloading, setDownloading] = useState(false);

  // 下载
  const download = async () => {
    setDownloading(true);
    const res = await downloadApi(pdfId, radioValue);
    setDownloading(false);
    if (res.code !== 200) return message.error(res.message);
    window.open(res.data, "_self");
  };

  // 标注数据改变
  const markDataChange = (v) => {
    const value = v.map((v) => ({ comment: v.comment, mark: v.mark }));
    setNewMarkData(value);
  };

  const [isMarkFull, setIsMarkFull] = useState(false);

  const [vd, setVd] = useState();
  useEffect(() => {
    const vditor = new Vditor("vditor", {
      after: () => {
        vditor.setValue(markdown);
        setVd(vditor);
      },
      // 监听全屏按钮的点击事件
    });
    // Clear the effect

    return () => {
      vd?.destroy();
      setVd(undefined);
    };
  }, [markdown, isMarkFull]);

  // 抽屉
  const [drawerOpen, setDrawerOpen] = useState(true);
  const onClose = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      history.goBack();
    }, 100);
  };

  // 导览
  const [tourOpen, setTourOpen] = useState(false);
  const tourRef1 = useRef(null);
  const tourRef2 = useRef(null);
  const tourRef3 = useRef(null);
  const tourRef4 = useRef(null);
  const steps = [
    {
      title: t("FileDetail.PdfParser.903407-4"),
      description: t("FileDetail.PdfParser.903407-5"),
      target: () => tourRef1.current,
    },
    {
      title: t("FileDetail.PdfParser.903407-6"),
      description: t("FileDetail.PdfParser.903407-7"),
      target: tourRef2.current,
    },
    {
      title: t("FileDetail.PdfParser.903407-8"),
      description: t("FileDetail.PdfParser.903407-9"),
      target: tourRef3.current,
      placement: "right",
    },
    {
      title: t("FileDetail.PdfParser.903407-10"),
      description: t("FileDetail.PdfParser.903407-11"),
      target: tourRef4.current,
    },
  ];

  useEffect(() => {
    if (dataList.length === 0) return;
    if (!isSeenTour("pdfParser")) setTourOpen(true);
  }, [loading]);

  // 关闭导览
  const closeTour = () => {
    setTourOpen(false);
    seenTour("pdfParser");
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
        tip={t("FileDetail.PdfParser.903407-13")}
        indicator={<LoadingOutlined spin />}
        size="large"
      >
        <MainBox>
          <Body>
            <div style={{}} ref={tourRef3}>
              <MyAnnotation
                sizeChange={isMarkFull}
                imgUrl={dataList[page]?.img_url}
                markData={markData}
                onChange={markDataChange}
              />
            </div>

            {isMarkFull ? (
              ""
            ) : (
              <div>
                <div id="vditor" className="vditor" style={{ height: "100%" }} />
              </div>
            )}
          </Body>
          <Footer>
            <div>
              <Space size="large">
                <Button type="primary" onClick={() => prevPage()} size="small">
                  {t("FileDetail.PdfParser.903407-14")}
                </Button>

                <Button ref={tourRef1} type="primary" onClick={() => nextPage()} size="small">
                  {t("FileDetail.PdfParser.903407-15")}
                </Button>
                <Space ref={tourRef2}>
                  {t("FileDetail.PdfParser.903407-16")}{" "}
                  <InputNumber
                    min={1}
                    size="small"
                    style={{
                      width: 80,
                      textIndent: 24,
                    }}
                    max={dataList.length}
                    value={page + 1}
                    onChange={(v) => {
                      if (!v) return;
                      const targetPage = Math.min(Math.max(v, 1), dataList.length) - 1;
                      setPage(targetPage);
                    }}
                  />{" "}
                  {t("FileDetail.PdfParser.903407-17")}
                </Space>

                {/* <Button
                type="primary"
                onClick={() => {
                  setIsMarkFull(!isMarkFull);
                  props.sizeChange(!isMarkFull);
                }}
                size="small"
              >
                全屏
              </Button> */}
              </Space>{" "}
              <span>
                {t("FileDetail.PdfParser.903407-18")} {dataList.length} {t("FileDetail.PdfParser.903407-17")}
              </span>
            </div>
            <div>
              <Space size="large">
                <Radio.Group onChange={onRadioChange} value={radioValue}>
                  <Space>
                    <Radio value={"markdown"}>markdown</Radio>
                    {/* <Radio value={"word"}>docx</Radio> */}
                  </Space>
                </Radio.Group>
                {/* <Button type="primary" onClick={download} size="small" loading={downloading}>
                  下载
                </Button> */}
                <Button ref={tourRef4} type="primary" onClick={reParse} size="small">
                  {t("FileDetail.PdfParser.903407-19")}
                </Button>
              </Space>
            </div>
          </Footer>
        </MainBox>
      </Spin>
      <Tour open={tourOpen} onClose={closeTour} steps={steps} />
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
  flex-direction: column;
  gap: 12px;
  height: 100%;
`;

const Body = styled.div`
  flex: 1;
  height: 80%;
  display: flex;
  gap: 12px;
  > div:nth-child(1) {
    flex: 1;
  }
  > div:nth-child(2) {
    width: 50%;
    border-radius: 8px;
    overflow: auto;
  }
  > pre {
    width: 50%;
    padding: 16px;
    height: 100%;
    border-radius: 8px;

    white-space: pre-wrap;
    background-color: #f7f4f2;
  }
`;

const Footer = styled.div`
  display: flex;
  gap: 20px;
  > div {
    width: 50%;
  }
  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
  }
  > div:nth-child(2) {
    display: flex;
    justify-content: flex-end;
  }
`;

export default PdfParser;

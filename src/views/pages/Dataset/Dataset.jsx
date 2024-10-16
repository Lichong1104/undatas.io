import { deleteDatasetApi, getDatasetApi, parseDatasetApi } from "@/api/httpApi";
import { themeColor } from "@/theme/color";
import { isSeenTour, randomColor, seenTour } from "@/utils/tools";
import {
  AreaChartOutlined,
  CheckSquareOutlined,
  LoadingOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  App,
  Badge,
  Button,
  Checkbox,
  Empty,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Space,
  Spin,
  Tabs,
  Tooltip,
  Tour,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getBinaryFileContent } from "@/api/s3Api";
import styled from "styled-components";

const { Search } = Input;

function Dataset() {
  const { message, modal } = App.useApp();
  const history = useHistory();

  const project = useSelector((state) => state.currentProject.project);
  const [loading, setLoading] = useState(true);

  // 是否展示Empty
  const [showEmpty, setShowEmpty] = useState(false);

  // 文件列表
  const [fileList, setFileList] = useState([]);

  // 初始化
  const init = async () => {
    setLoading(true);
    const res = await getDatasetApi(project.task_id, project.task_type);
    if (res.code !== 200) return message.error(res.msg);
    // 转换s3图片
    const dataPromises = res.data.map(async (v, i) => {
      let imageUrl;
      if (project.task_type === "pdfParser" || project.task_type === "pdfParserPro") {
        imageUrl = await getBinaryFileContent(v.image_path);
      } else {
        imageUrl = v.image_path;
      }
      return {
        ...v,
        id: i,
        color: randomColor(),
        isActive: false,
        image_path: imageUrl,
      };
    });

    const data = await Promise.all(dataPromises);
    const sortData = data.sort(
      (a, b) => Date.parse(new Date(b.c_time)) - Date.parse(new Date(a.c_time))
    );

    setLoading(false);
    setShowEmpty(true);
    setFileList(sortData);
  };

  useEffect(() => {
    init();
  }, []);

  // 选中文件
  const onSelectFile = (v) => {
    const newFileList = fileList.map((item) => {
      if (item.id === v.id) {
        return { ...item, isActive: !item.isActive };
      }
      return item;
    });
    setFileList(newFileList);
  };

  // {t('Dataset.Dataset.9034111-15')}
  const selectAll = (e) => {
    const newFileList = fileList.map((item) => {
      return { ...item, isActive: e.target.checked };
    });
    setFileList(newFileList);
  };

  // 被选中文件
  const [selectedFile, setSelectedFile] = useState([]);
  useEffect(() => {
    const selected = fileList.filter((v) => v.isActive).map((v) => v.file_id);
    setSelectedFile(selected);
  }, [fileList]);

  // {t('Dataset.Dataset.9034111-19')}数据集
  const parseDataset = async () => {
    setLoading(true);

    let paramsObj = {};
    if (JSON.stringify(parseParams) !== "{}") {
      if (project.task_type === "videoCut") {
        if (parseParams.paramsType === "min_max") {
          paramsObj = { cut_time: [parseParams.min, 0, parseParams.max] };
        } else {
          paramsObj = { cut_time: [0, parseParams.middle, 0] };
        }
      }
    }

    const res = await parseDatasetApi(selectedFile, project.task_id, paramsObj);
    setLoading(false);
    if (res.code !== 200) return message.error(res.msg);
    message.success(t("Dataset.Dataset.9034111-0"));
    history.push("/versions/version-info");
  };

  // {t('Dataset.Dataset.9034111-18')}数据集
  const deleteDataset = async () => {
    setLoading(true);
    const res = await deleteDatasetApi(selectedFile, project.task_type);
    setLoading(false);
    if (res.code !== 200) return message.error(res.msg);
    message.success(t("Dataset.Dataset.9034111-1"));
    init();
  };

  // {t('Dataset.Dataset.9034111-14')}
  const [form] = Form.useForm();
  const [parseParams, setParseParams] = useState({});
  const parseType = [
    {
      label: t("Dataset.Dataset.9034111-2"),
      key: "pdfParser",
      children: "",
    },
    {
      label: t("Dataset.Dataset.9034111-3"),
      key: "videoNotion",
      children: "",
    },
    {
      label: t("Dataset.Dataset.9034111-4"),
      key: "videoCut",
      children: <VideoCut form={form} />,
    },
  ];

  let currentKey;
  const parseTypeTabs = parseType.map((v) => {
    if (v.key !== project.task_type) {
      return { ...v, disabled: true };
    }
    currentKey = v.key;
    return v;
  });

  // 导览
  const [tourOpen, setTourOpen] = useState(false);
  const tourRef1 = useRef(null);
  const tourRef2 = useRef(null);
  const steps = [
    {
      title: t("Dataset.Dataset.9034111-5"),
      description: t("Dataset.Dataset.9034111-6"),
      target: () => tourRef1.current,
    },
    {
      title: t("Dataset.Dataset.9034111-7"),
      description: t("Dataset.Dataset.9034111-8"),
      target: tourRef2.current,
    },
  ];

  useEffect(() => {
    if (fileList.length === 0) return;
    if (!isSeenTour("uploadData")) setTourOpen(true);
  }, [loading]);

  // 关闭导览
  const closeTour = () => {
    setTourOpen(false);
    seenTour("dataSet");
  };

  const selectParams = () => {
    const m = modal.confirm({
      title: t("Dataset.Dataset.9034111-9"),
      content: <Tabs type="card" items={parseTypeTabs} activeKey={currentKey} />,
      width: "50vw",
      icon: <QuestionCircleOutlined />,
      footer: [
        <Space key="submit" style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => m.destroy()}>{t("Dataset.Dataset.9034111-10")}</Button>
          <Form
            form={form}
            name="videoCut"
            onFinish={(v) => {
              setParseParams(v);
              m.destroy();
            }}
          >
            <Button type="primary" htmlType="submit">
              {t("Dataset.Dataset.9034111-11")}
            </Button>
          </Form>
        </Space>,
      ],
    });
  };

  return (
    <Spin
      spinning={loading}
      tip={t("Dataset.Dataset.9034111-12")}
      indicator={<LoadingOutlined spin />}
      size="large"
    >
      <MainBox>
        <Header>
          <Title>
            <h3>
              <AreaChartOutlined />
              {t("Dataset.Dataset.9034111-13")}
              <p onClick={selectParams}>
                <CheckSquareOutlined />
                {t("Dataset.Dataset.9034111-14")}
              </p>
            </h3>

            <Space size="middle">
              <SelectAll>
                {t("Dataset.Dataset.9034111-15")}
                <Checkbox onChange={selectAll} />
              </SelectAll>
              <Popconfirm
                title={t("Dataset.Dataset.9034111-16")}
                description={t("Dataset.Dataset.9034111-17")}
                onConfirm={deleteDataset}
                okText={t("Dataset.Dataset.9034111-11")}
                cancelText={t("Dataset.Dataset.9034111-10")}
              >
                <Button size="small" type="primary" danger disabled={!selectedFile.length}>
                  {t("Dataset.Dataset.9034111-18")}
                </Button>
              </Popconfirm>

              <Button
                ref={tourRef2}
                size="small"
                type="primary"
                onClick={parseDataset}
                disabled={!selectedFile.length}
              >
                {t("Dataset.Dataset.9034111-19")}
              </Button>
            </Space>
          </Title>
          <Search
            placeholder={t("Dataset.Dataset.9034111-20")}
            onSearch={() => {}}
            enterButton
          />
          <Actions></Actions>
        </Header>

        <Body>
          <FileList className="custom-scroll" $isNone={!fileList.length ? true : false}>
            {fileList.length ? (
              fileList.map((v, i) => {
                return (
                  <FileItem key={i} $isActive={v.isActive} ref={i === 0 ? tourRef1 : null}>
                    <CheckboxBox className="dataset_checkbox">
                      <Checkbox checked={v.isActive} onChange={() => onSelectFile(v)} />
                    </CheckboxBox>

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
                      />
                    </Badge.Ribbon>
                    <p>{v.file_name}</p>
                  </FileItem>
                );
              })
            ) : (
              <Empty style={{ display: showEmpty ? "" : "none" }} />
            )}
          </FileList>
        </Body>
      </MainBox>
      <Tour open={tourOpen} onClose={closeTour} steps={steps} />
    </Spin>
  );
}

const MainBox = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  > h3 {
    display: flex;
    gap: 8px;
    align-items: center;
    font-weight: 500;
    font-size: 20px;
    > p {
      margin-left: 12px;
      margin-top: 4px;
      font-size: 14px;
      color: ${themeColor.primary};
      display: flex;
      gap: 4px;
      cursor: pointer;
    }
  }
`;

const SelectAll = styled.div`
  font-size: 14px;
  color: ${themeColor.primary};
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Actions = styled.div``;

const Body = styled.div`
  width: 100%;
  flex: 1;
  /* min-height: 100%; */
  min-height: 60%;
  border-radius: 8px;
  background-color: white;
`;

const FileList = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: ${(p) =>
    p.$isNone ? "none" : "repeat(auto-fill, minmax(120px, 1fr))"};
  justify-content: ${(p) => (p.$isNone ? "center" : "space-between")};
  grid-auto-rows: 140px;
  gap: 12px;
  padding: 12px;
`;

const FileItem = styled.div`
  width: 120px;
  height: 135px;
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

const ImageBox = styled.div`
  width: 98px;
  height: 90px;
  border-radius: 4px;
  background-size: cover;
`;

const CheckboxBox = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 1;
`;

export default Dataset;

const VideoCut = (props) => {
  return (
    <Form
      form={props.form}
      style={{
        width: "100%",
      }}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 18,
      }}
      initialValues={{ paramsType: "min_max", min: 0, max: 0, middle: 0 }}
      autoComplete="off"
    >
      <Form.Item
        label={t("Dataset.Dataset.9034111-21")}
        name="paramsType"
        rules={[{ required: true }]}
      >
        <Select
          options={[
            { value: "min_max", label: t("Dataset.Dataset.9034111-22") },
            { value: "middle", label: t("Dataset.Dataset.9034111-23") },
          ]}
        />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.paramsType !== currentValues.paramsType
        }
      >
        {({ getFieldValue }) => {
          const paramsType = getFieldValue("paramsType");
          return paramsType === "min_max" ? (
            <>
              <Form.Item
                label={t("Dataset.Dataset.9034111-24")}
                name="min"
                rules={[{ required: true }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder={t("Dataset.Dataset.9034111-25")}
                />
              </Form.Item>
              <Form.Item
                label={t("Dataset.Dataset.9034111-26")}
                name="max"
                rules={[{ required: true }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder={t("Dataset.Dataset.9034111-27")}
                />
              </Form.Item>
            </>
          ) : (
            <Form.Item
              label={t("Dataset.Dataset.9034111-23")}
              name="middle"
              rules={[{ required: true }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder={t("Dataset.Dataset.9034111-28")}
              />
            </Form.Item>
          );
        }}
      </Form.Item>
    </Form>
  );
};

import { createProjectApi } from "@/api/httpApi";
import { themeColor } from "@/theme/color";
import {
  InfoCircleOutlined,
  GlobalOutlined,
  UnderlineOutlined,
  FontColorsOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { App, Button, Form, Input, Select, Space, Spin, Tag, Tooltip } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import videoNotionImage from "@/image/shipinlijie.jpeg";
import videoCutImage from "@/image/shipqiege.jpg";
import pdfParserImage from "@/image/wenbenjiexi.jpeg";
import pdfParserProImage from "@/image/wenbenjiexi2.png";
import meetImage from "@/image/yinpinjiexi.png";

function CreateProject() {
  const history = useHistory();
  const [form] = Form.useForm();

  const { message, notification } = App.useApp();
  const [loading, setLoading] = useState(false);
  const workId = useSelector((state) => state.currentWork.work.work_id);

  // 提交
  const onFinish = async (values) => {
    // 不创建video
    // if (currentType === "videoNotion" || currentType === "videoCut") {
    //   return message.warning(t("CreateProject.CreateProject.783725-0"));
    // }

    setLoading(true);
    const data = { ...values, work_id: workId, task_type: currentType };
    const res = await createProjectApi(data);
    setLoading(false);
    if (res.code !== 200) return message.error(res.msg);

    notification.success({
      message: t("CreateProject.CreateProject.9034112-0"),
      description: t("CreateProject.CreateProject.9034112-1", [values.task_name]),
    });

    history.push("/project");
  };

  const typeList = [
    {
      type: "pdfParser",
      num: 211,
      title: t("CreateProject.CreateProject.7183128-0"),
      img: pdfParserImage,
      desc: t("CreateProject.CreateProject.9034112-7"),
      disabled: false,
    },
    {
      type: "pdfParserPro",
      num: 352,
      title: t("CreateProject.CreateProject.7183128-1"),
      img: pdfParserProImage,
      desc: t("CreateProject.CreateProject.7183128-2"),
      disabled: false,
    },
    {
      type: "videoCut",
      num: 632,
      title: t("CreateProject.CreateProject.9034112-4"),
      img: videoCutImage,
      desc: t("CreateProject.CreateProject.9034112-5"),
      disabled: true,
    },
    {
      type: "videoNotion",
      num: 352,
      title: t("CreateProject.CreateProject.9034112-2"),
      img: videoNotionImage,
      desc: t("CreateProject.CreateProject.9034112-3"),
      disabled: true,
    },

    {
      type: "meet",
      num: 104,
      title: t("CreateProject.CreateProject.9034112-8"),
      img: meetImage,
      desc: t("CreateProject.CreateProject.9034112-9"),
      disabled: true,
    },
  ];

  // 当前选中类型
  const [currentType, setCurrentType] = useState("pdfParser");

  // 切换类型
  const typeChange = (v) => {
    if (!v.disabled) {
      setCurrentType(v.type);
    }
  };

  return (
    <Spin
      spinning={loading}
      tip={t("CreateProject.CreateProject.9034112-10")}
      indicator={<LoadingOutlined spin />}
      size="large"
    >
      <MainBox>
        <Body className="custom-scroll">
          <Title>{t("CreateProject.CreateProject.9034112-11")}</Title>
          <Placeholder>
            lc {">"}
            <GlobalOutlined />
            <span>New Public Project</span>
          </Placeholder>

          <Form form={form} layout="vertical" name="form" initialValues={{ license: "Public", task_info: "" }}>
            <InputBox>
              <Form.Item
                name="task_name"
                label={<ItemTitle>{t("CreateProject.CreateProject.9034112-12")}</ItemTitle>}
                rules={[
                  {
                    required: true,
                  },
                ]}
                tooltip={t("CreateProject.CreateProject.9034112-13")}
              >
                <Input placeholder="input placeholder" />
              </Form.Item>
              <Form.Item
                label={<ItemTitle>{t("CreateProject.CreateProject.9034112-14")}</ItemTitle>}
                name="license"
                tooltip={t("CreateProject.CreateProject.9034112-13")}
              >
                <Select placeholder="Select a option and change input text above" allowClear>
                  <Select.Option value="Public">Public</Select.Option>
                  <Select.Option value="Private">Private</Select.Option>
                </Select>
              </Form.Item>
            </InputBox>

            <Form.Item
              label={<ItemTitle>{t("CreateProject.CreateProject.9034112-15")}</ItemTitle>}
              name="task_info"
              tooltip={t("CreateProject.CreateProject.9034112-13")}
            >
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Form>
          <ItemTitle>{t("CreateProject.CreateProject.9034112-16")}</ItemTitle>

          <CardList>
            {typeList.map((v, i) => {
              return (
                <Tooltip key={i} title={v.disabled ? t("CreateProject.CreateProject.783725-1") : ""}>
                  <Card onClick={() => typeChange(v)} $isActive={v.type === currentType} $isDisabled={v.disabled}>
                    <div>
                      <img src={v.img} alt="" />
                      <h2>{v.title}</h2>
                      <p>{v.desc}</p>
                    </div>

                    <div>
                      <Space>
                        <Tag
                          color={v.type === currentType ? themeColor.hover : "#eaeaefd3"}
                          style={{ color: "black" }}
                          icon={<UnderlineOutlined />}
                        >
                          {v.type}
                        </Tag>
                        <Tag
                          color={v.type === currentType ? themeColor.hover : "#eaeaefd3"}
                          style={{ color: "black" }}
                          icon={<FontColorsOutlined />}
                        >
                          {v.num}
                        </Tag>
                      </Space>
                    </div>
                  </Card>
                </Tooltip>
              );
            })}
          </CardList>
        </Body>
        <Footer>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item style={{ margin: 0 }}>
              <Space size="middle">
                <Button onClick={() => history.push("/project")}>{t("CreateProject.CreateProject.9034112-17")}</Button>
                <Button type="primary" htmlType="submit">
                  {t("CreateProject.CreateProject.9034112-18")}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Footer>
      </MainBox>
    </Spin>
  );
}

const MainBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  max-width: 1410px;
  margin: 0 auto;
  padding: 0 24px;
  flex: 1;
  min-height: 80%;

  padding-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 2px;
`;

const Placeholder = styled.div`
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  > span {
    color: ${themeColor.primary};
  }
`;

const ItemTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0px;
`;

const InputBox = styled.div`
  display: flex;
  gap: 24px;
  > div:nth-child(1) {
    width: 65%;
  }
  > div:nth-child(2) {
    width: 35%;
  }
`;

const CardList = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 36px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(25% - 27px); // 考虑到间隔,宽度略小于25%
  padding: 12px;
  background-color: ${(props) => (props.$isDisabled ? "#f5f5f5" : "white")};
  border-radius: 8px;
  cursor: ${(props) => (props.$isDisabled ? "not-allowed" : "pointer")};
  gap: 20px;
  border: ${(props) => (props.$isActive ? `2px solid ${themeColor.primary}` : `2px solid #b4b4b958`)};
  transition: all.2s;
  box-shadow: 0 0 10px 0 ${(props) => (props.$isActive ? "#2313d392" : "rgba(0, 0, 0, 0)")};
  opacity: ${(props) => (props.$isDisabled ? 0.5 : 1)};
  &:hover {
    box-shadow: ${(props) =>
      props.$isDisabled ? "none" : `0 0 10px 0 ${props.$isActive ? "#2313d392" : "rgba(0, 0, 0, 0.217)"}`};
  }
  img {
    width: 100%;
    height: 170px;
    border-radius: 4px;
  }
  p {
    margin-top: 4px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 设置显示的行数 */
    overflow: hidden;
  }
  > div:nth-child(2) {
    margin-top: 3.5vh;
    flex: 1;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #d1d1d5b4;
`;

export default CreateProject;

import { deleteProjectApi, getProjectListApi, renameProjectApi } from "@/api/httpApi";
import { getBinaryFileContent } from "@/api/s3Api";
import UploadProgress from "@/components/UploadProgress/UploadProgress";
import {
  CopyOutlined,
  FolderOpenOutlined,
  GlobalOutlined,
  MoreOutlined,
  PlusOutlined,
  RestOutlined,
  SignatureOutlined,
  SisternodeOutlined,
} from "@ant-design/icons";
import { App, Button, Dropdown, Empty, Input, Modal, Skeleton, Tag } from "antd";
import copy from "copy-to-clipboard";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";

function Project() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { message } = App.useApp();
  // 当前工作区
  const workId = useSelector((state) => state.currentWork.work.work_id);

  // {t('Project.Project.9034110-10')}
  const [projectList, setProjectList] = useState([]);

  // 是否展示空状态
  const [showEmpty, setShowEmpty] = useState(false);

  // 初始化
  const init = async () => {
    if (!workId) return;
    setShowEmpty(false);
    const res = await getProjectListApi(workId);
    if (res.code !== 200) return message.error(res.msg);

    const dataPromises = res.data.map(async (v) => {
      if (v.task_type === "pdfParser" || v.task_type === "pdfParserPro") {
        const image_path = await getBinaryFileContent(v.image_path);
        return { ...v, image_path };
      }
      return v;
    });
    const data = await Promise.all(dataPromises);
    setProjectList(data);
    res.data.length ? setShowEmpty(false) : setShowEmpty(true);
  };

  useEffect(() => {
    // 骨架屏
    const list = Array.from({ length: 5 }, () => Date.now()).map((v) => {
      return { loading: true };
    });
    setProjectList(list);
    init();
  }, [workId]);

  // 当前选中projectId
  const [projectId, setProjectId] = useState("");

  // {t('Project.Project.9034110-6')}
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirmLoading, setDeleteConfirmLoading] = useState(false);

  const deleteHandleOk = async (e) => {
    e.stopPropagation();
    setDeleteConfirmLoading(true);
    const res = await deleteProjectApi(projectId);
    setDeleteConfirmLoading(false);

    if (res.code !== 200) return message.error(res.msg);
    setDeleteOpen(false);
    message.success(t("Project.Project.9034110-0"));
    init();
  };

  // {t('Project.Project.9034110-5')}
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameConfirmLoading, setRenameConfirmLoading] = useState(false);
  const renameInput = React.createRef();

  const renameHandleOk = async (e) => {
    e.stopPropagation();
    setRenameConfirmLoading(true);
    const res = await renameProjectApi(projectId, renameInput.current.input.value);
    setRenameConfirmLoading(false);

    if (res.code !== 200) return message.error(res.msg);
    setRenameOpen(false);
    message.success(t("Project.Project.9034110-1"));
    init();
  };

  // 更多操作
  const projectDropDown = [
    {
      label: t("Project.Project.9034110-2"),
      key: "0",
      icon: <FolderOpenOutlined style={{ fontSize: "16px" }} />,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        return message.warning(t("Project.Project.9034110-3"));
      },
    },
    {
      label: t("Project.Project.9034110-4"),
      key: "1",
      icon: <SisternodeOutlined style={{ fontSize: "16px" }} />,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        return message.warning(t("Project.Project.9034110-3"));
      },
    },
    {
      label: t("Project.Project.9034110-5"),
      key: "3",
      icon: <SignatureOutlined style={{ fontSize: "16px" }} />,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        setRenameOpen(true);
      },
    },
    {
      label: t("Project.Project.9034110-6"),
      key: "4",
      icon: <RestOutlined style={{ fontSize: "16px" }} />,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        setDeleteOpen(true);
      },
      danger: true,
    },
    {
      type: "divider",
    },
    {
      label: t("Project.Project.9034110-7"),
      key: "5",
      icon: <CopyOutlined style={{ fontSize: "16px" }} />,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        copy(projectId);
        message.success(t("Project.Project.9034110-8"));
      },
    },
    {
      label: t("Project.Project.9034110-9"),
      key: "6",
      icon: <CopyOutlined style={{ fontSize: "16px" }} />,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        copy(workId);
        message.success(t("Project.Project.9034110-8"));
      },
    },
  ];

  return (
    <MainBox>
      <Title>
        {t("Project.Project.9034110-10")}
        <Button type="primary" icon={<PlusOutlined />} onClick={() => history.push("/create-project")}>
          {t("Project.Project.9034110-11")}
        </Button>
      </Title>
      <Content>
        <ProjectList className="custom-scroll">
          {!showEmpty ? (
            projectList.map((v, i) => {
              return (
                <Skeleton loading={v.loading} key={i} active style={{ marginBottom: "32px" }}>
                  <ProjectItem
                    key={i}
                    onClick={(e) => {
                      dispatch({ type: "PROJECT_CHANGE", payload: v });
                      history.push("/dataset");
                    }}
                  >
                    <img src={v.image_path} alt="" />
                    <ProjectInfo>
                      <Tag color="#eaeaefd3" style={{ color: "black" }} bordered={false}>
                        {v.task_type}
                      </Tag>
                      <h2>
                        <GlobalOutlined style={{ fontSize: 12, color: "#060606bc" }} />
                        {v.task_name}
                      </h2>
                      <p>Edited {v.time}</p>
                      <p>
                        {v.license} {v.num} dataset
                      </p>
                    </ProjectInfo>
                    <ProjectMore>
                      <Dropdown menu={{ items: projectDropDown }} trigger={["click"]}>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setProjectId(v.task_id);
                          }}
                          icon={<MoreOutlined />}
                          type="text"
                        />
                      </Dropdown>
                    </ProjectMore>
                  </ProjectItem>
                </Skeleton>
              );
            })
          ) : (
            <Empty style={emptyStyle} />
          )}
          {}
        </ProjectList>
        <Modal
          title={t("Project.Project.9034110-12")}
          open={deleteOpen}
          onOk={deleteHandleOk}
          confirmLoading={deleteConfirmLoading}
          onCancel={(e) => {
            setDeleteOpen(false);
            e.stopPropagation();
          }}
        >
          <p>{t("Project.Project.9034110-13")}</p>
        </Modal>
        <Modal
          onClick={(e) => e.stopPropagation()}
          title={t("Project.Project.9034110-5")}
          open={renameOpen}
          onOk={renameHandleOk}
          confirmLoading={renameConfirmLoading}
          onCancel={(e) => {
            setRenameOpen(false);
            e.stopPropagation();
          }}
        >
          <Input ref={renameInput} placeholder={t("Project.Project.9034110-14")} />
        </Modal>
        <UploadProgress width="35%" height="100%" position />
      </Content>
    </MainBox>
  );
}

const MainBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  gap: 6px;
  min-height: 80%;

  > div {
    height: 100%;
  }
`;

const ProjectList = styled.div`
  width: 65%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding-right: 6px;
  align-items: flex-start;
  align-content: flex-start;
`;

const emptyStyle = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100%",
};

const ProjectItem = styled.div`
  flex: 0 1 calc(49.7% - 8px);
  padding: 16px;
  display: flex;
  gap: 12px;
  border: 1px solid #807f7f3d;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #f5f5f5;
  }
  img {
    width: 84px;
    height: 84px;
    border-radius: 8px;
  }
`;

const ProjectInfo = styled.div`
  flex: 1;
  h2 {
    font-size: 16px;
    display: flex;
    gap: 4px;
  }
  p {
    font-size: 12px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  }
`;

const ProjectMore = styled.div`
  display: flex;
  align-items: center;
`;

export default Project;

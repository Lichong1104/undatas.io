import { themeColor } from "@/theme/color";
import {
  DatabaseOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FolderViewOutlined,
  FormOutlined,
  LoadingOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { App, Button, Checkbox, Empty, Input, Popconfirm, Space, Spin, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import VersionInfo from "./VersionInfo/VersionInfo";
import VersionData from "./VersionData/VersionData";
import {
  deleteVersionApi,
  downloadDatasetApi,
  getVersionListApi,
  mergeVersionApi,
  renameVersionApi,
} from "@/api/httpApi";
import { useSelector } from "react-redux";

const { Search } = Input;

function Versions() {
  const history = useHistory();
  const { message, notification } = App.useApp();
  const project = useSelector((state) => state.currentProject.project);

  // 版本列表
  const [versionList, setVersionList] = useState([]);

  const [loading, setLoading] = useState(true);

  // 初始化
  const init = async () => {
    const res = await getVersionListApi(project.task_type, project.task_id);
    if (res.code !== 200) return message.error(res.msg);
    setLoading(false);
    if (!res.data.length) return setVersionList([{}]);

    const data = res.data.map((v, i) => ({ ...v, id: i, isMerge: false }));

    setVersionList(data);
  };

  useEffect(() => {
    init();
  }, []);

  // 当前选中version
  const [currentVersion, setCurrentVersion] = useState(0);

  // 切换版本
  const versionChange = async (v) => {
    setCurrentVersion(v.id);
    history.push("/versions/version-info");
  };

  // {t('Versions.Versions.903402-18')}
  const [rename, setRename] = useState(false);
  const renameInput = useRef(null);

  const [renameLoading, setRenameLoading] = useState(false);

  // 自动获取焦点
  useEffect(() => {
    if (rename) renameInput.current.focus();
  }, [rename]);

  // 修改版本名字
  const startRename = async (version, value) => {
    if (!value) return message.warning(t("Versions.Versions.903402-0"));
    setRenameLoading(true);
    const res = await renameVersionApi(project.task_type, project.task_id, version, value);
    setRenameLoading(false);

    if (res.code !== 200) return message.error(res.msg);
    setRename(false);

    notification.success({
      message: t("Versions.Versions.903402-1", [value]),
      description: t("Versions.Versions.903402-2"),
    });
    init();
  };

  const [downLoading, setDownLoading] = useState(false);

  // {t('Versions.Versions.903402-16')}
  const download = async () => {
    setDownLoading(true);
    const res = await downloadDatasetApi(
      project.task_id,
      versionList[currentVersion].vision,
      project.task_type
    );
    setDownLoading(false);
    if (res.code !== 200) return message.error(res.msg);
    window.open(res.data, "_self");
  };

  // {t('Versions.Versions.903402-15')}
  const deleteVersion = async () => {
    const res = await deleteVersionApi(
      project.task_id,
      versionList[currentVersion].vision,
      project.task_type
    );
    if (res.code !== 200) return message.error(res.msg);
    await init();
    message.success(t("Versions.Versions.903402-3"));
  };

  // {t('Versions.Versions.903402-10')}
  const merge = () => {
    const list = versionList.map((v) => {
      if (v.vision === versionList[currentVersion].vision) {
        return { ...v, isMerge: true };
      }
      return v;
    });
    setIsMergeVersion(true);
    setVersionList(list);
  };

  // 选择{t('Versions.Versions.903402-10')}的版本
  const selectMergeVersion = async (version) => {
    const newList = versionList.map((v) => {
      if (v.vision === version) return { ...v, isMerge: !v.isMerge };
      return v;
    });
    setVersionList(newList);
  };

  // {t('Versions.Versions.903402-10')}版本
  const mergeVersion = async () => {
    const list = versionList.filter((v) => v.isMerge).map((v) => v.vision);
    if (list.length < 2) return message.warning(t("Versions.Versions.903402-4"));
    setLoading(true);

    const res = await mergeVersionApi(project.task_id, list, project.task_type);
    if (res.code !== 200) return message.error(res.code);
    await init();
    message.success(t("Versions.Versions.903402-5"));
    setLoading(false);
    setIsMergeVersion(false);
    setCurrentVersion(0);
  };

  // {t('Versions.Versions.903402-8')}{t('Versions.Versions.903402-10')}
  const cancelMerge = () => {
    const list = versionList.map((v) => ({ ...v, isMerge: false }));
    setVersionList(list);
    setIsMergeVersion(false);
  };

  // 选择{t('Versions.Versions.903402-10')}
  const [isMergeVersion, setIsMergeVersion] = useState(false);
  return (
    <MainBox>
      <Title>
        <RobotOutlined />
        {t("Versions.Versions.903402-6")}
      </Title>
      {loading ? (
        <div style={{ flex: 1 }}>
          <Spin
            spinning={loading}
            tip={t("Versions.Versions.903402-7")}
            indicator={<LoadingOutlined spin />}
            size="large"
          >
            <div></div>
          </Spin>
        </div>
      ) : (
        <>
          <Body style={{ display: Object.keys(versionList[0]).length ? "" : "none" }}>
            <VersionList>
              <div>
                VERSIONS
                {isMergeVersion ? (
                  <Space size="small">
                    <Button size="small" onClick={cancelMerge} danger type="primary">
                      {t("Versions.Versions.903402-8")}
                    </Button>
                    <Button size="small" onClick={mergeVersion} type="primary">
                      {t("Versions.Versions.903402-9")}
                    </Button>
                  </Space>
                ) : (
                  <Button size="small" onClick={merge} type="primary">
                    {t("Versions.Versions.903402-10")}
                  </Button>
                )}
              </div>
              <div className="custom-scroll">
                {versionList.map((v, i) => {
                  return (
                    <VersionItem
                      key={i}
                      $isActive={v.id === currentVersion}
                      $isMerge={v.isMerge}
                      onClick={() => versionChange(v)}
                    >
                      {isMergeVersion ? (
                        <CheckboxBox>
                          <Checkbox
                            checked={v.isMerge}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => selectMergeVersion(v.vision)}
                          />
                        </CheckboxBox>
                      ) : undefined}

                      <p>{v.title}</p>
                      <span>{v.c_time}</span>
                      <Space>
                        <Tag
                          color={v.id === currentVersion ? themeColor.hover : "#eaeaefd3"}
                          style={{ color: "black" }}
                          icon={<FolderViewOutlined />}
                        >
                          {v.vision}
                        </Tag>
                        <Tag
                          color={v.id === currentVersion ? themeColor.hover : "#eaeaefd3"}
                          style={{ color: "black" }}
                          icon={<DatabaseOutlined />}
                        >
                          {v.count} {t("Versions.Versions.903402-11")}
                        </Tag>
                      </Space>
                    </VersionItem>
                  );
                })}
              </div>
            </VersionList>
            <VersionDetail>
              <DetailTitle>
                <div>
                  <Space>
                    <Tag color="#eaeaefd3" style={{ color: "black" }}>
                      {versionList[currentVersion].vision}
                    </Tag>
                    <p>{versionList[currentVersion].title}</p>
                  </Space>
                  <span>{versionList[currentVersion].c_time}</span>
                </div>
                <div>
                  <Space size="large">
                    <Popconfirm
                      title={t("Versions.Versions.903402-12")}
                      description={t("Versions.Versions.903402-13")}
                      onConfirm={deleteVersion}
                      okText={t("Versions.Versions.903402-14")}
                      cancelText={t("Versions.Versions.903402-8")}
                    >
                      <Button danger icon={<DeleteOutlined />}>
                        {t("Versions.Versions.903402-15")}
                      </Button>
                    </Popconfirm>

                    <Button
                      icon={<DownloadOutlined />}
                      loading={downLoading}
                      onClick={download}
                    >
                      {t("Versions.Versions.903402-16")}
                    </Button>
                    {rename ? (
                      <Search
                        placeholder={t("Versions.Versions.903402-17")}
                        style={{ height: 40.5, width: 299 }}
                        onBlur={() => setRename(false)}
                        ref={renameInput}
                        enterButton={t("Versions.Versions.903402-14")}
                        size="middle"
                        onSearch={(v) => startRename(versionList[currentVersion].vision, v)}
                        loading={renameLoading}
                      />
                    ) : (
                      <Button
                        icon={<FormOutlined />}
                        onClick={() => setRename(true)}
                        type="primary"
                      >
                        {t("Versions.Versions.903402-18")}
                      </Button>
                    )}
                  </Space>
                </div>
              </DetailTitle>
              <Switch>
                <Route
                  path="/versions/version-info"
                  render={() => <VersionInfo info={versionList[currentVersion]} />}
                />
                <Route
                  path="/versions/version-data"
                  render={() => <VersionData v={versionList[currentVersion].vision} />}
                />
              </Switch>
            </VersionDetail>
          </Body>
          <Placeholder style={{ display: !Object.keys(versionList[0]).length ? "" : "none" }}>
            <Empty />
          </Placeholder>
        </>
      )}
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

const Body = styled.div`
  flex: 1;
  min-height: 80%;
  display: flex;
  gap: 24px;
  flex-wrap: nowrap;
  > div {
    height: 100%;
  }
`;

const Placeholder = styled.div`
  flex: 1;
  min-height: 80%;
  display: flex;
  background-color: white;
  border-radius: 12px;
  justify-content: center;
  padding-top: 20px;
`;

const VersionList = styled.div`
  width: 20%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #77757525;
  > div:nth-child(1) {
    background-color: black;
    color: white;
    padding: 8px;
    padding-right: 16px;
    text-indent: 12px;
    font-weight: 500;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  > div:nth-child(2) {
    flex: 1;
    background-color: white;
  }
`;

const VersionItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: 0.2s;
  border-top: 1px solid #8080802b;
  background-color: ${(props) =>
    props.$isActive || props.$isMerge ? themeColor.hover : "white"};
  position: relative;
  border: ${(props) => (props.$isMerge ? "2px" : "0px")} solid ${themeColor.primary};
  /* border-top: none; */
  &:hover {
    background-color: ${(props) =>
      props.$isActive || props.$isMerge ? themeColor.hover : "#8080801a"};
  }
  > p {
    font-weight: 500;
  }
  > span {
    display: block;
    font-size: 12px;
    color: #858585;
  }
`;

const CheckboxBox = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 1;
`;

const VersionDetail = styled.div`
  flex: 1;
  min-width: 65%;
  border-radius: 12px;
  background-color: white;
  border: 1px solid #7775753c;
  display: flex;
  flex-direction: column;
`;

const DetailTitle = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 500;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #8080802b;
  > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
    > span {
      font-size: 12px;
      color: #808080df;
    }
  }
`;

export default Versions;

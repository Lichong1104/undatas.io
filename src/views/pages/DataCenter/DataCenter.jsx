import {
  CloseOutlined,
  LoadingOutlined,
  PlayCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Input, Select, Table, Row, Col, Button, message, Spin, Space } from "antd";
import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

// 在组件外部或内部定义这个映射对象
const fieldMapping = {
  fi_column: "源字段",
  fi_column_value: "源字段值",
  ti_column_rule: "目标字段规则",
  ti_column_type: "目标字段类型",
  ti_column_target: "目标字段",
  ti_column_comment: "备注",
  result: "结果",
};

function DataCenter() {
  const sourceData = [
    {
      key: "1",
      解析结果: "20220215-GTMY-CFSSS001",
      字段: "合同编号",
    },
    {
      key: "2",
      解析结果: "棉花",
      字段: "品种",
    },
    {
      key: "3",
      解析结果: "20220215-GTMY-CFSSS002",
      字段: "合同编号",
    },
    {
      key: "4",
      解析结果: "玉米",
      字段: "品种",
    },
    {
      key: "5",
      解析结果: "20220215-GTMY-CFSSS003",
      字段: "合同编号",
    },
    {
      key: "6",
      解析结果: "小麦",
      字段: "品种",
    },
    {
      key: "7",
      解析结果: "20220215-GTMY-CFSSS004",
      字段: "合同编号",
    },
    {
      key: "8",
      解析结果: "大豆",
      字段: "品种",
    },
    {
      key: "9",
      解析结果: "20220215-GTMY-CFSSS005",
      字段: "合同编号",
    },
    {
      key: "10",
      解析结果: "大米",
      字段: "品种",
    },
  ];

  const sourceColumns = [
    {
      title: "字段",
      dataIndex: "字段",
      key: "字段",
    },
    {
      title: "解析结果",
      dataIndex: "解析结果",
      key: "解析结果",
    },
  ];

  const [resultData, setResultData] = useState([]);
  const [resultColumns, setResultColumns] = useState([
    {
      title: "字段",
      dataIndex: "字段",
      key: "字段",
    },
    {
      title: "解析结果",
      dataIndex: "解析结果",
      key: "解析结果",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // 执行
  const handleExecute = async () => {
    console.log(selectedData);

    setLoading(true);

    // 不要key字段
    const data = selectedData.map((item) => {
      const { key, ...rest } = item;
      return rest;
    });
    const res = await axios.post("http://116.204.67.82:8099/api/task/execute", {
      task_execute_data_list: data,
    });
    console.log(res);

    // 将解析好的结果塞进去
    if (res.data && res.data.code === 200) {
      const newResultData = res.data.data.map((item, index) => {
        const newItem = { key: index.toString() };
        Object.keys(item).forEach((key) => {
          if (fieldMapping[key]) {
            newItem[fieldMapping[key]] = item[key];
          } else {
            newItem[key] = item[key];
          }
        });
        return newItem;
      });
      setResultData(newResultData);

      // 更新结果列
      if (newResultData.length > 0) {
        const newResultColumns = Object.keys(newResultData[0])
          .filter((key) => key !== "key")
          .map((key) => ({
            title: key,
            dataIndex: key,
            key: key,
          }));
        setResultColumns(newResultColumns);
      }
    } else {
      message.error(res.data.msg || "执行失败");
    }

    setLoading(false);
  };

  const [selectedKey, setSelectedKey] = useState(undefined);
  const [selectedValue, setSelectedValue] = useState("");
  const [targetField, setTargetField] = useState("");
  const [fieldType, setFieldType] = useState(undefined);
  const [fieldStyle, setFieldStyle] = useState("");

  // 添加数据
  const addSelectedData = () => {
    if (!selectedKey || !targetField || !fieldType) {
      message.error("请填写完整信息");
      return;
    }

    const newData = {
      key: Date.now().toString(),
      fi_column: selectedKey,
      fi_column_value: selectedValue,
      ti_column_target: targetField,
      ti_column_type: fieldType,
      ti_column_rule: fieldStyle,
      ti_column_comment: "",
    };

    setSelectedData([...selectedData, newData]);

    // 重置输入
    setSelectedKey(undefined);
    setSelectedValue("");
    setTargetField("");
    setFieldType(undefined);
    setFieldStyle("");
  };

  // 重置数据
  const resetSelectedData = () => {
    setSelectedData([]);
    setSelectedKey(undefined);
    setSelectedValue("");
    setTargetField("");
    setFieldType(undefined);
    setFieldStyle("");
  };

  // 选择的数据
  const [selectedData, setSelectedData] = useState([]);
  const selectColumns = [
    {
      title: "字段",
      dataIndex: "fi_column",
      key: "fi_column",
    },
    {
      title: "解析结果",
      dataIndex: "fi_column_value",
      key: "fi_column_value",
    },

    {
      title: "目标字段",
      dataIndex: "ti_column_target",
      key: "ti_column_target",
    },
    {
      title: "字段类型",
      dataIndex: "ti_column_type",
      key: "ti_column_type",
    },
    {
      title: "字段规则",
      dataIndex: "ti_column_rule",
      key: "ti_column_rule",
    },
  ];

  return (
    <Spin spinning={loading} tip="执行中..." indicator={<LoadingOutlined spin />} size="large">
      <MainBox className="custom-scroll">
        <BannerBox>
          <h1 style={{ display: "flex", justifyContent: "space-between" }}>
            数据中心
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => history.push("/create-project")}
            >
              新建项目
            </Button>
          </h1>
          <SourceBox>
            <iframe
              src="https://fquantplus.oss-cn-qingdao.aliyuncs.com/pdfextractor/pdf/mianhua20240426-1.pdf"
              frameBorder="0"
              width="60%"
              height="100%"
            ></iframe>
            <div style={{ flex: 1 }}>
              <Table
                dataSource={sourceData}
                columns={sourceColumns}
                bordered
                pagination={false}
              />
            </div>
          </SourceBox>
          {/* <h1>模板数据</h1> */}

          <h1>模板数据</h1>
          <ResultBox>
            <Table
              dataSource={selectedData}
              columns={selectColumns}
              bordered
              pagination={false}
            />
            <TemplateBox>
              <Select
                style={{ width: 200 }}
                placeholder="选择源字段"
                value={selectedKey}
                onChange={(value) => {
                  setSelectedKey(value);
                  const selectedItem = sourceData.find((item) => item.字段 === value);
                  setSelectedValue(selectedItem ? selectedItem.解析结果 : "");
                }}
              >
                {sourceData.map((item) => (
                  <Select.Option key={item.key} value={item.字段}>
                    {item.字段}
                  </Select.Option>
                ))}
              </Select>

              <Input
                style={{ width: 200 }}
                placeholder="目标字段"
                value={targetField}
                onChange={(e) => setTargetField(e.target.value)}
              />

              <Select
                style={{ width: 200 }}
                placeholder="字段类型"
                value={fieldType}
                onChange={(value) => setFieldType(value)}
              >
                <Select.Option value="int">int</Select.Option>
                <Select.Option value="str">str</Select.Option>
                <Select.Option value="float">float</Select.Option>
              </Select>

              <Input
                style={{ width: 200 }}
                placeholder="字段规则"
                value={fieldStyle}
                onChange={(e) => setFieldStyle(e.target.value)}
              />

              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={addSelectedData}>
                  添加
                </Button>

                <Button type="primary" icon={<CloseOutlined />} onClick={resetSelectedData}>
                  重置
                </Button>
                <Button type="primary" icon={<PlayCircleOutlined />} onClick={handleExecute}>
                  执行
                </Button>
              </Space>
            </TemplateBox>
          </ResultBox>
          <h1 style={{ display: "flex", justifyContent: "space-between" }}>结果数据</h1>
          <ResultBox>
            <Table
              dataSource={resultData}
              columns={resultColumns}
              bordered
              pagination={false}
            />
          </ResultBox>
        </BannerBox>
      </MainBox>
    </Spin>
  );
}

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const BannerBox = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  height: 200px;

  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SourceBox = styled.div`
  width: 100%;
  height: 660px;
  display: flex;
  gap: 16px;
  iframe {
    border-radius: 12px;
  }
`;

const TemplateBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const ResultBox = styled.div`
  width: 100%;
`;

export default DataCenter;

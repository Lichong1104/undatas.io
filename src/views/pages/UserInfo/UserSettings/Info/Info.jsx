import { ClusterOutlined, ContactsOutlined, HomeOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Divider, Row, Tag, Input } from "antd";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";

// Mock function to simulate fetching user data
const queryCurrent = async () => {
  // Simulated user data
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        name: "John Doe",
        avatar:
          "https://gd-hbimg.huaban.com/7968f776596196a8061e9ee0ee51c0606d785fc42400b-9aWWPH_fw236",
        title: "Software Engineer",
        group: "Development Team",
        geographic: {
          province: { label: "California" },
          city: { label: "San Francisco" },
        },
        tags: [
          { key: "1", label: "JavaScript" },
          { key: "2", label: "React" },
        ],
        notice: [
          { id: "1", href: "#", logo: "https://via.placeholder.com/20", member: "Alice" },
          { id: "2", href: "#", logo: "https://via.placeholder.com/20", member: "Bob" },
        ],
      });
    }, 1000)
  );
};

const Wrapper = styled.div`
  .avatarHolder {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin-right: 16px;
    }

    .name {
      font-size: 18px;
      font-weight: bold;
    }
  }

  .detail {
    margin-bottom: 16px;
  }

  .tags {
    margin-bottom: 16px;
  }

  .tagsTitle {
    font-weight: bold;
    margin-bottom: 8px;
  }

  .team {
    margin-top: 16px;
  }

  .teamTitle {
    font-weight: bold;
    margin-bottom: 16px;
  }
`;

const TagList = ({ tags }) => {
  const ref = useRef(null);
  const [newTags, setNewTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const showInput = () => {
    setInputVisible(true);
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...newTags];
    if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
      tempsTags = [
        ...tempsTags,
        {
          key: `new-${tempsTags.length}`,
          label: inputValue,
        },
      ];
    }
    setNewTags(tempsTags);
    setInputVisible(false);
    setInputValue("");
  };

  return (
    <div>
      <div className="tagsTitle">{t('Info.Info.7183020-0')}</div>
      {(tags || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      {inputVisible && (
        <Input
          ref={ref}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ borderStyle: "dashed" }}>
          <PlusOutlined />
        </Tag>
      )}
    </div>
  );
};

const Info = (props) => {
  const { currentUser, loading } = props;

  const renderUserInfo = () => (
    <div>
      <p>
        <ContactsOutlined style={{ marginRight: 8 }} />
        {currentUser.user_nickname}
      </p>
      <p>
        <ClusterOutlined style={{ marginRight: 8 }} />
        {currentUser.user_name}
      </p>
      <p>
        <HomeOutlined style={{ marginRight: 8, marginBottom: 16 }} />
        {currentUser.user_phone}
      </p>
    </div>
  );

  return (
    <Wrapper>
      <Row gutter={24}>
        <Col lg={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            {!loading && (
              <div>
                <div className="avatarHolder">
                  <img alt="" src={currentUser.user_avatar} />
                  <div className="name">{currentUser.user_nickname}</div>
                  {/* <div>{currentUser.signature}</div> */}
                </div>
                {renderUserInfo()}
                {/* <Divider dashed /> */}
                <TagList tags={currentUser.tags || []} />
                {/* <Divider style={{ marginTop: 16 }} dashed /> */}
                {/* <div className="team">
                                    <div className="teamTitle">团队</div>
                                    <Row gutter={36}>
                                        {currentUser.notice &&
                                            currentUser.notice.map((item) => (
                                                <Col key={item.id} lg={24} xl={12}>
                                                    <a href={item.href}>
                                                        <Avatar size="small" src={item.logo} />
                                                        {item.member}
                                                    </a>
                                                </Col>
                                            ))}
                                    </Row>
                                </div> */}
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Info;

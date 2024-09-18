import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { App, Progress, Space, Spin, Table, Typography } from 'antd';
import { AreaChartOutlined, ArrowLeftOutlined, EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getBalanceApi, usageSituationApi } from '@/api/httpApi';

const { Title, Text } = Typography;

function Usage() {
    const username = sessionStorage.getItem('username')
    const history = useHistory()
    const { message } = App.useApp()

    const [loading, setLoading] = useState(true)

    // 余额
    const [balance, setBalance] = useState('')

    // 余额使用情况
    const [balanceData, setBalanceData] = useState([])
    // 初始化
    const init = async () => {
        const res = await usageSituationApi()
        const balanceRes = await getBalanceApi()
        setLoading(false)
        if (res.code !== 200) return message.error(res.msg)

        const data = res.data.map((v, i) => ({ ...v, key: i }))
        setBalanceData(data)
        setBalance(balanceRes.data)
    }

    useEffect(() => {
        init()
    }, [])

    const balanceColumns = [
        {
            title: '使用项目',
            dataIndex: 'change_project',
        },
        {
            title: '使用文件',
            dataIndex: 'file_name',
        },
        {
            title: '扣除金额',
            dataIndex: 'change_amount',
        },
        {
            title: "剩余金额",
            dataIndex: 'balance',
        },
        {
            title: '使用时间',
            dataIndex: 'c_time',
        },
    ];
    return (
        <div className='custom-scroll' style={{ height: '100%' }}>
            {loading ?
                <div style={{ height: '100%' }}>
                    <Spin
                        spinning={loading}
                        tip={t('Usage.Usage.903408-0')}
                        indicator={<LoadingOutlined spin />}
                        size="large">
                        <div></div>
                    </Spin>
                </div> :
                <MainBox >
                    <Title level={3}>
                        <Space size="large">
                            <ArrowLeftOutlined
                                style={{ fontSize: 18, cursor: 'pointer' }}
                                onClick={() => history.push('/project')}
                            />
                            <span>{username} {t('Usage.Usage.903408-1')}</span>
                        </Space>
                    </Title>

                    <Title level={4} style={{ fontWeight: 500 }}>
                        您当前的余额剩余：<span style={{ fontWeight: 700, fontSize: 24 }}>{balance}</span> 元
                    </Title>

                    <Title level={4} style={{ fontWeight: 500 }}> {t('Usage.Usage.903408-5')}</Title>
                    <Text style={{ color: 'gray' }}>{t('Usage.Usage.903408-6')}</Text>
                    <UsageList>
                        {Array.from({ length: 2 }).map((v, i) => {
                            return <UsageItem key={i}>
                                <IconBox><AreaChartOutlined /></IconBox>
                                <span>{t('Usage.Usage.903408-4')}</span>
                                <ProgressBox>
                                    <div>
                                        <span style={{ fontWeight: 600 }}>145</span> / 10,000
                                    </div>
                                    <Progress percent={80} />
                                </ProgressBox>
                            </UsageItem>
                        })}
                    </UsageList>

                    <Title level={4} style={{ fontWeight: 500 }}> {t('Usage.Usage.903408-2')}</Title>
                    <Text style={{ color: 'gray', marginBottom: 24 }}>
                        {t('Usage.Usage.903408-3')}
                    </Text>
                    <Table columns={balanceColumns} pagination={{ defaultPageSize: 7 }} dataSource={balanceData} />

                    <Text style={{ marginTop: 20, color: 'gray', marginBottom: 12 }}>
                        <EyeOutlined /> {t('Usage.Usage.903408-7')}
                    </Text>
                </MainBox >
            }

        </div>
    )
}

const MainBox = styled.div`
  max-width: 880px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const UsageList = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 20px;
    gap: 24px;
`

const UsageItem = styled.div`
    display: flex;
    width: 100%;
    gap: 18px;
    font-size: 17px;
    align-items: center;
    > span{
        flex: 1;
    }
`

const IconBox = styled.div`
    --tw-bg-opacity: 1;
    --tw-text-opacity: 1;
    align-items: center;
    background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
    border-radius: .25rem;
    color: rgba(107, 114, 128, var(--tw-text-opacity));
    display: flex;
    flex: none;
    height: 2.25rem;
    justify-content: center;
    width: 2.25rem;
`
const ProgressBox = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    font-size: 14px;

`

export default Usage
import { AlipayOutlined, DingdingOutlined, TaobaoOutlined } from '@ant-design/icons';
import { List } from 'antd';
import React, { Fragment } from 'react';

const BindingView = () => {
    const getData = () => [
        {
            title: t('BindingView.BindingView.7183123-0'),
            description: t('BindingView.BindingView.7183123-1'),
            actions: [<a key="Bind">{t('BindingView.BindingView.7183123-2')}</a>],
            avatar: <TaobaoOutlined className="taobao" />,
        },
        {
            title: t('BindingView.BindingView.7183123-3'),
            description: t('BindingView.BindingView.7183123-4'),
            actions: [<a key="Bind">{t('BindingView.BindingView.7183123-2')}</a>],
            avatar: <AlipayOutlined className="alipay" />,
        },
        {
            title: t('BindingView.BindingView.7183123-5'),
            description: t('BindingView.BindingView.7183123-6'),
            actions: [<a key="Bind">{t('BindingView.BindingView.7183123-2')}</a>],
            avatar: <DingdingOutlined className="dingding" />,
        },
    ];

    return (
        <Fragment>
            <List
                itemLayout="horizontal"
                dataSource={getData()}
                renderItem={(item) => (
                    <List.Item actions={item.actions}>
                        <List.Item.Meta
                            avatar={item.avatar}
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </Fragment>
    );
};

export default BindingView;

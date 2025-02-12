import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { bitable } from '@lark-base-open/connector-api';
import { Button, Form, Input } from 'antd';

// 定义配置项接口
interface ConfigType {
    'config-item-1': string;
    'config-item-2': string;
}

export default function App() {
    const [value, setValue] = useState('');
    const [userId, setUserId] = useState('');
    const [tenantKey, setTenantKey] = useState('');

    console.log('test');
    useEffect(() => {
        bitable.getConfig().then(config => {
            console.log('pre sync config', config);
            setValue(config?.value || '');
        });
        bitable.getUserId().then(id => {
            console.log('userId', id);
            setUserId(id);
        });
        bitable.getTenantKey().then(key => {
            console.log('tenantKey', key);
            setTenantKey(key);
        })
    }, [])

    const handleSaveConfig = (config: ConfigType) => {
        console.log('config', config)
        bitable.saveConfigAndGoNext(config)
    }

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={handleSaveConfig}
                autoComplete="off"
            >
                <Form.Item
                    label="配置项-1"
                    name="config-item-1"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="配置项-2"
                    name="config-item-2"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label=""
                >
                    <Button type="primary" htmlType="submit">下一步</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
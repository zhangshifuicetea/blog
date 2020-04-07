import React, {useEffect, useState} from 'react';
import {Form, Input, message, Popconfirm, Select, Switch, Tag, DatePicker, Button, Table} from 'antd';
import {UserInfo} from '../../../api/user';
import service from '../../../utils/axios-config';
import moment from 'moment';

const typeMapList: { value: number, label: string }[] = [
    {value: 1, label: 'github 用户'},
    {value: 2, label: '站内用户'}
];

interface UserParams {
    page: number;
    pageSize: number
}

export const AdminUsers = () => {
    const [form] = Form.useForm();
    const [queryParams, setQueryParams] = useState<UserParams>({page: 0, pageSize: 10});
    const [total, setTotal] = useState(0);
    const [users, setUsers] = useState<UserInfo[]>();

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        service.get<{ rows: UserInfo[], count: number }>('/user/list', {params: queryParams})
            .then((res) => {
                setUsers(res.data.rows || []);
                setTotal(res.data.count || 0);
            })
    }

    const columns = [
        {title: '用户名', dataIndex: 'username'},
        {title: '邮箱', dataIndex: 'email'},
        {
            title: '用户类型',
            dataIndex: 'type',
            render: (text: number, record: UserInfo) => {
                return record.github ? <Tag color='#1890ff'>github 用户</Tag> : <Tag color='magenta'>站内用户</Tag>
            }
        },
        {
            title: '注册时间',
            dataIndex: 'createdAt',
            sorter: (a: UserInfo, b: UserInfo) => (moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1)
        },
        {
            dataIndex: 'id',
            title: '操作',
            render: (userId: number, record: UserInfo) => (
                <Popconfirm
                    title='Are you sure？'
                    onConfirm={e => deleteUser(userId)}>
                    <a className='delete-text'>Delete</a>
                </Popconfirm>
            )
        }
    ];

    const deleteUser = (id: number) => {
        service.delete(`/user/${id}`).then((res) => {
            message.success('删除成功');
        })
    };

    function handleSubmit(values: { [key: string]: any }) {
        if (Array.isArray(values.rangeDate)) {
            values.rangeDate = values.rangeDate.map(m => m.format('YYYY-MM-DD'))
        }
        setQueryParams({...queryParams, ...values});
        getUsers();
    }

    return (
        <>
            {/* 检索 */}
            <Form layout='inline' form={form} onFinish={handleSubmit} style={{marginBottom: 20}}>
                <Form.Item label='姓名' name={'username'}>
                    <Input placeholder='请输入姓名' allowClear/>
                </Form.Item>

                <Form.Item label='用户类型' name={'type'}>
                    <Select style={{width: 200}} allowClear>
                        {typeMapList.map(item => (
                            <Select.Option key={item.value} value={item.value}>
                                {item.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label='创建日期' name={'rangeDate'}>
                    <DatePicker.RangePicker/>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' style={{marginRight: 8}}>检索</Button>
                </Form.Item>
            </Form>

            <Table columns={columns} dataSource={users || []}
                   pagination={{
                       current: queryParams.page, pageSize: queryParams.pageSize, total: total,
                       showTotal: total => `共${total}条`
                   }}/>
        </>
    )
};

export default AdminUsers;

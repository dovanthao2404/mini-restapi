import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actGetListUser } from '../../redux/actions/UserManagementAction';
import {
    EyeOutlined, EyeInvisibleOutlined
} from '@ant-design/icons';

const Password = ({ value }) => {
    const [show, setShow] = useState(false);
    return <>
        <input style={{
            padding: 0,
            margin: 0,
            border: "none",
            outline: "none",
            width: 140,
            minWidth: "unset"
        }} readOnly={true} type={show ? "text" : "password"} value={value} />
        {show ? <EyeOutlined onClick={() => {
            setShow(false);
        }} /> : <EyeInvisibleOutlined onClick={() => {
            setShow(true);
        }} />}
    </>;
};

const columns = [
    {
        title: 'Account',
        dataIndex: 'taiKhoan',
    },
    {
        title: 'Full Name',
        dataIndex: 'hoTen',
    },
    {
        title: 'Phone Number',
        dataIndex: 'soDt',
    },
    {
        title: "Password",
        dataIndex: "matKhau",
        render: (text, record, index) => {
            return <Password key={index} value={text} />;
        }
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'User type',
        dataIndex: 'maLoaiNguoiDung',
    },
];


const ListUser = () => {
    const dispatch = useDispatch();
    const { lisUser } = useSelector(state => state.userManagementReducer);
    useEffect(() => {
        dispatch(actGetListUser());
    }, []);
    return (
        <div>
            <h1 style={{ textAlign: "center", fontSize: 40 }}>List user</h1>
            <Table columns={columns} dataSource={lisUser} rowKey={"taiKhoan"}
                pagination={{
                    position: ["bottomCenter "]
                }} />
        </div>
    );
};

export default ListUser;
import { Layout, Menu } from 'antd';
import "./style.scss";
import {
    UserOutlined,
    LogoutOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { routerString } from '../../routers/routerString';
import { actLogout } from '../../redux/actions/UserManagementAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userManagementServices } from '../../services/userManagementServices';
import { TYPE_ADMIN } from '../../utils/settings/config';

const { Content, Sider } = Layout;
const Admin = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();
    const { userLogin } = useSelector(state => state.userManagementReducer);
    useEffect(() => {
        (async () => {
            try {
                const res = await userManagementServices.getMyInfo(
                    userLogin?.taiKhoan
                );
                if (res.data.content.loaiNguoiDung.maLoaiNguoiDung !== TYPE_ADMIN) {
                    const error = "error";
                    throw error;
                }
            } catch (err) {
                localStorage.clear();
                dispatch(actLogout());
            }
        })();
    }, []);

    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                    <Menu.Item onClick={() => {
                        navigate(routerString.ListUser);
                    }} key={routerString.ListUser} icon={<UserOutlined />}>
                        Danh Sách Người Dùng
                    </Menu.Item>
                    <Menu.Item onClick={() => {
                        navigate(routerString.AddUser);
                    }} key={routerString.AddUser} icon={<UserAddOutlined />}>
                        Add User
                    </Menu.Item>
                    <Menu.Item onClick={() => {
                        dispatch(actLogout());
                    }} key={"/"} icon={<LogoutOutlined />}>
                        Đăng Xuất
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className="site-layout-background">
                        {children}
                    </div>
                </Content>

            </Layout>
        </Layout>
    );
};

export default Admin;
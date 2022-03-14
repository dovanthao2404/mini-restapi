import { routerString } from "../../routers/routerString";
import { userManagementServices } from "../../services/userManagementServices";
import { TYPE_ADMIN, USER_LOGIN } from "../../utils/settings/config";
import { ADD_USER_FAILED, ADD_USER_REQUEST, ADD_USER_SUCCESS, LIST_USER_FAILED, LIST_USER_REQUEST, LIST_USER_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../constants/UserManagementConstant";

export const actLogin = (info, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(actLoginRequest());
            const result = await userManagementServices.loginServices(info);
            if (result.data.content.maLoaiNguoiDung === TYPE_ADMIN) {
                dispatch(actLoginSuccess(result.data.content));
                localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content));
                navigate(routerString.ListUser);
            } else {
                const error = {
                    response: {
                        data: {
                            content: "Không có quyền truy cập!"
                        }
                    }
                };
                throw error;
            }
        } catch (error) {
            dispatch(actLoginFailed(error));
        }
    };
};

const actLoginRequest = () => ({
    type: LOGIN_REQUEST
});

const actLoginFailed = (error) => ({
    type: LOGIN_FAILED,
    payload: error
});
const actLoginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
});


export const actGetListUser = () => {
    return async dispatch => {
        try {
            dispatch(actGetListUserRequest());
            const result = await userManagementServices.getListUserServices();
            dispatch(actGetListUserSuccess(result.data.content));
        } catch (error) {
            dispatch(actGetListUserFailed(error));
        }
    };
};


const actGetListUserRequest = () => ({
    type: LIST_USER_REQUEST
});

const actGetListUserFailed = (error) => ({
    type: LIST_USER_FAILED,
    payload: error
});
const actGetListUserSuccess = (data) => ({
    type: LIST_USER_SUCCESS,
    payload: data
});




export const actAddUser = (values, resetForm, message) => {
    return async dispatch => {
        try {
            dispatch(actAddUserRequest());
            await userManagementServices.addUserServices(values);
            resetForm();
            dispatch(actAddUserSuccess());
            message.success("Thêm người dùng thành công");
        } catch (error) {
            dispatch(actAddUserFailed());
            message.error(error.response?.data?.content);
        }
    };
};

const actAddUserRequest = () => ({
    type: ADD_USER_REQUEST
});

const actAddUserFailed = () => ({
    type: ADD_USER_FAILED,
});
const actAddUserSuccess = () => ({
    type: ADD_USER_SUCCESS,
});

export const actLogout = () => ({
    type: LOGOUT
});
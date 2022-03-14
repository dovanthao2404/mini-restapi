import { USER_LOGIN } from "../../utils/settings/config";
import { ADD_USER_FAILED, ADD_USER_REQUEST, ADD_USER_SUCCESS, LIST_USER_FAILED, LIST_USER_REQUEST, LIST_USER_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../constants/UserManagementConstant";

let userLogin = null;
const userLocal = localStorage.getItem(USER_LOGIN);
if (userLocal) {
    userLogin = JSON.parse(userLocal);
}

const initialState = {
    userLogin: userLogin,
    lisUser: null,
    error: null,
    isLoading: false,
    isLoadingAdd: false
};

export const userManagementReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case LOGIN_REQUEST:
            state.error = null;
            state.isLoading = true;
            state.userLogin = null;
            return { ...state };
        case LOGIN_FAILED:
            state.error = payload;
            state.isLoading = false;
            state.userLogin = null;
            return { ...state };
        case LOGIN_SUCCESS:
            state.error = null;
            state.isLoading = false;
            state.userLogin = payload;
            return { ...state };



        case LIST_USER_REQUEST:
            state.error = null;
            state.isLoading = true;
            state.lisUser = null;
            return { ...state };
        case LIST_USER_SUCCESS:
            state.error = null;
            state.isLoading = false;
            state.lisUser = payload;
            return { ...state };
        case LIST_USER_FAILED:
            state.error = payload;
            state.isLoading = false;
            state.lisUser = null;
            return { ...state };



        case ADD_USER_REQUEST:
            state.isLoadingAdd = true;
            return { ...state };
        case ADD_USER_FAILED:
            state.isLoadingAdd = false;
            return { ...state };
        case ADD_USER_SUCCESS:
            state.isLoadingAdd = false;
            return { ...state };


        case LOGOUT:
            state.userLogin = null;
            state.isLoadingAdd = false;
            state.lisUser = null;
            state.error = null;
            state.isLoading = false;
            localStorage.clear();
            return { ...state };
        default:
            return { ...state };
    }
};
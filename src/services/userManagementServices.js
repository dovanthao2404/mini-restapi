import { api } from "./baseApiServices";

class UserManagementServices {

    getListUserServices = () => {
        return api.get(
            `/api/QuanLyNguoiDung/LayDanhSachNguoiDung`
        );
    };

    loginServices = (infoLogin) => {
        return api.post(`/api/QuanLyNguoiDung/DangNhap`, infoLogin);
    };

    addUserServices = (info) => {
        return api.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, info);
    };

    getMyInfo = (info) => {

        return api.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${info}`);
    };

}

export const userManagementServices = new UserManagementServices();
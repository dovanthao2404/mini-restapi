import { useFormik } from 'formik';
import React from 'react';

import { message, Radio } from 'antd';


import "./style.scss";
import { actAddUser } from '../../redux/actions/UserManagementAction';
import { useDispatch, useSelector } from 'react-redux';
import { GROUP_ID } from '../../utils/settings/config';

const validate = (values) => {
    const errors = {};
    if (!values.taiKhoan) {
        errors.taiKhoan = "Account is require";
    } else if (values.taiKhoan.length > 24 || values.taiKhoan.length < 6) {
        errors.taiKhoan = "Account 6-24 character";
    } else if (!/^[a-zA-Z0-9]+$/i.test(values.taiKhoan)) {
        errors.taiKhoan = "Account only include letters and numbers";
    }

    if (!values.matKhau) {
        errors.matKhau = "Password is require";
    } else if (values.matKhau.length > 32 || values.matKhau.length < 8) {
        errors.matKhau = "Password 8-32 character";
    }

    if (!values.email) {
        errors.email = "Email is require";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Email invalidate";
    }

    if (!values.soDt) {
        errors.soDt = "Phone number is require";
    } else if (!/^(84|0[3|5|7|8|9])+([0-9]{8})\b$/i.test(values.soDt)) {
        errors.soDt = "Phone number invalidate";
    }

    if (!values.hoTen) {
        errors.hoTen = "Full name is require";
    } else if (
        !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/i.test(
            values.hoTen
        )
    ) {
        errors.hoTen = "Full name invalidate";
    }



    return errors;
};


const AddUser = () => {
    const dispatch = useDispatch();
    const { isLoadingAdd } = useSelector(state => state.userManagementReducer);

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            hoTen: "",
            email: "",
            soDt: "",
            matKhau: "",
            maLoaiNguoiDung: "KhachHang",
            maNhom: GROUP_ID
        },
        validate
        ,
        onSubmit: values => {
            dispatch(actAddUser(values, formik.resetForm, message));
        },
    });
    const { errors, touched, values } = formik;


    const onChange = e => {
        formik.setFieldValue("maLoaiNguoiDung", e.target.value);
    };



    return (
        <div className='add-user'>
            <h1 style={{ textAlign: "center", fontSize: 40 }}>Add user</h1>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <form className='form' onSubmit={formik.handleSubmit}>
                    <div>
                        <input
                            onChange={formik.handleChange}
                            value={values.taiKhoan}
                            onBlur={formik.handleBlur} type="text" name='taiKhoan' placeholder='Account' />
                        {errors.taiKhoan && touched.taiKhoan ? <div className='error'>{errors.taiKhoan}</div> : null}
                    </div>
                    <div>
                        <input
                            onChange={formik.handleChange}
                            value={values.hoTen}
                            onBlur={formik.handleBlur} type="text" name='hoTen' placeholder='Full name' />
                        {errors.hoTen && touched.hoTen ? <div className='error'>{errors.hoTen}</div> : null}
                    </div>
                    <div>
                        <input
                            onChange={formik.handleChange}
                            value={values.email}
                            onBlur={formik.handleBlur} type="text" name='email' placeholder='Email' />
                        {errors.email && touched.email ? <div className='error'>{errors.email}</div> : null}
                    </div>
                    <div>
                        <input
                            onChange={formik.handleChange}
                            value={values.soDt}
                            onBlur={formik.handleBlur} type="text" name='soDt' placeholder='Phone number' />
                        {errors.soDt && touched.soDt ? <div className='error'>{errors.soDt}</div> : null}
                    </div>
                    <div>
                        <Radio.Group onChange={onChange} value={values.maLoaiNguoiDung}>
                            <Radio value={"KhachHang"}>User</Radio>
                            <Radio value={"QuanTri"}>Admin</Radio>
                        </Radio.Group>
                    </div>
                    <div>
                        <input
                            onChange={formik.handleChange}
                            value={values.matKhau}
                            type="password"
                            onBlur={formik.handleBlur} name='matKhau' placeholder='Password' />
                        {errors.matKhau && touched.matKhau ? <div className='error'>{errors.matKhau}</div> : null}
                    </div>
                    <button type='submit'>Add User</button>
                </form>
            </div>
            <div className='modal' style={{
                display: isLoadingAdd ? "block" : "none"
            }}>
                <div className='loader-wrap'>
                    <div className="loader"></div>
                </div>
            </div>
        </div >
    );
};

export default AddUser;
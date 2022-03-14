import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import "./style.scss";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { actLogin } from '../../redux/actions/UserManagementAction';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';



const SignupSchema = Yup.object().shape({
    taiKhoan: Yup.string()
        .required('Account is required'),
    matKhau: Yup.string()
        .required('Password is required'),
});

const Login = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.userManagementReducer);
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
        },
        validationSchema: SignupSchema
        ,
        onSubmit: values => {
            dispatch(actLogin(values, navigate));
        },
    });
    const { errors, touched } = formik;

    useEffect(() => {
        if (error?.response?.data?.content) {
            message.error(error.response.data.content);
        }
    }, [error]);


    return (
        <div className='login'>
            <form className='form' onSubmit={formik.handleSubmit}>
                <div>
                    <input
                        id="taiKhoan"
                        name="taiKhoan"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Account"
                        value={formik.values.taiKhoan}
                    />
                    {errors.taiKhoan && touched.taiKhoan ? <div className='error'>{errors.taiKhoan}</div> : null}
                </div>
                <div>
                    <input
                        id="matKhau"
                        name="matKhau"
                        type="password"
                        onChange={formik.handleChange}
                        placeholder="Password"
                        onBlur={formik.handleBlur}
                        value={formik.values.matKhau}
                    />
                    {errors.matKhau && touched.matKhau ? <div className='error'>{errors.matKhau}</div> : null}
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
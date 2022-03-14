import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import Admin from "../templates/admin";
import { pages } from "./pages";
import { routerString } from "./routerString";


const listPagePrivate = [
    routerString.AddUser,
    routerString.ListUser,
];


const listPageNotRunWhileLogin = [
    routerString.Login,
];

const PrivateRoute = ({ children }) => {
    const { userLogin } = useSelector(state => state.userManagementReducer);
    return userLogin ? <Admin>{children}</Admin> : <Navigate to={routerString.Login} />;
};

const LoginNotRun = ({ children }) => {
    const { userLogin } = useSelector(state => state.userManagementReducer);
    return !userLogin ? children : <Navigate to={routerString.ListUser} />;
};


export const routers = () => {
    return pages.map((item, key) => {
        if (listPagePrivate.includes(item.path)) {
            return <Route key={key} path={item.path} element={
                <PrivateRoute>
                    <item.component />
                </PrivateRoute>
            } />;
        }
        if (listPageNotRunWhileLogin.includes(item.path)) {
            return <Route key={key} path={item.path} element={
                <LoginNotRun>
                    <item.component />
                </LoginNotRun>
            } />;
        }
        return <Route key={key} path={item.path} element={<item.component />} />;
    });
};
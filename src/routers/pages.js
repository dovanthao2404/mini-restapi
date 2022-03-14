import AddUser from "../pages/AddUser";
import ListUser from "../pages/ListUser";
import Login from "../pages/Login";
import { routerString } from "./routerString";

export const pages = [
    {
        path: routerString.Login,
        component: Login
    },
    {
        path: routerString.AddUser,
        component: AddUser
    },
    {
        path: routerString.ListUser,
        component: ListUser
    }
];
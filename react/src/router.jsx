import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Users from "./views/users/Users.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import UserForm from "./views/users/UserForm.jsx";
import Tasks from "./views/tasks/Tasks.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to='/users'/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate"/>
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate"/>
      },
      {
        path: '/tasks',
        element: <Tasks/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      },
    ]
  },

  {
    path: '*',
    element: <NotFound/>
  }
])

export default router;

import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {
  const {user, token,notification,setUser,setToken} = useStateContext()

  if (!token) {
    return <Navigate to="/login"/>
  }

  const onLogout = (ev) => {
   ev.preventDefault();
   axiosClient.post('/logout')
     .then(()=>{
       setUser({})
       setToken(null)
     }).catch(err=>{
     const response=err.response;
     if(response && response.status===422){
       if(response.data.errors){
         console.log(response.data.errors)
       }else {
         console.log(response.data.message)
       }
     }
     throw err
    })
  }
  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/tasks">Tasks</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name}
            <a href="#" onClick={onLogout}>Logout</a>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
      </div>
      {notification && <div className="notification">{notification}</div>}
    </div>
  )
}

import React from 'react';
import { useHistory, useLocation } from 'react-router';
const ProfileSidebar = () =>{
    const history = useHistory();
    const location = useLocation();
// checking which is the highlighted current url in profile sidebar
// changes page of menu in profile

    const[currentTab] = React.useState(location.pathname);//select current menu
// change url in browser when click dif tabs in profile
    const handleRequest = (e,path)=>{
        e.preventDefault();
        history.push("/"+path);
    }
    // after logout button clicked 
    const handleLogout = (e)=>{
        e.preventDefault();
        localStorage.removeItem("loginStatus");//remove login id from cookies 
        history.push("/login");//direct to login
    }
return (
    <>
<div className="col-md-3 ">
		<div className="list-group ">
            <a href="/profile" onClick={(e)=>{ handleRequest(e,'profile');}} className={currentTab === "/profile" ? "list-group-item list-group-item-action active": "list-group-item list-group-item-action"}>  Profile</a>
            <a href="/change-password" onClick={(e)=>{ handleRequest(e,'change-password');}} className={currentTab === "/change-password" ? "list-group-item list-group-item-action active": "list-group-item list-group-item-action"}>Change Password</a>
            <a href="/manage-blogs" onClick={(e)=>{ handleRequest(e,'manage-blogs');}} className={currentTab.includes("/manage-blogs") ? "list-group-item list-group-item-action active": "list-group-item list-group-item-action"}>Blogs</a>
            <a href="/logout" className="list-group-item list-group-item-action" onClick={handleLogout}>Logout</a>
        </div> 
		</div>
    </>
)

}
export default  ProfileSidebar;
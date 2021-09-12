import React from 'react';
import {useHistory} from "react-router-dom";
const NavBar = () =>{
    const history = useHistory();
return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow" id="mainNav">
            <div className="container-fluid">
                <a className="navbar-brand" href="/" onClick={(e)=>{e.preventDefault(); history.push('/');}}>React central</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item text-black">
                            <a className="nav-link text-black font-weight-bold" href="/" onClick={(e)=>{e.preventDefault(); history.push('/about');}}>About</a>
                        </li>
                        <li className="nav-item text-black">
                            <a className="nav-link text-black font-weight-bold" href="/" onClick={(e)=>{e.preventDefault(); history.push('/policy');}}>Policy</a>
                        </li>
                        <li className="nav-item text-black">
                            <a className="nav-link text-black font-weight-bold" href="/" onClick={(e)=>{e.preventDefault(); history.push('/contact');}}>Contact</a>
                        </li>
                        <li className="nav-item text-black">
                            <a className="nav-link text-black font-weight-bold" href="/" onClick={(e)=>{e.preventDefault(); history.push('/map');}}>Map</a>
                        </li>
                        <li className="nav-item text-black">
                            <a className="nav-link text-black font-weight-bold" href="/" onClick={(e)=>{e.preventDefault(); history.push('/cdc');}}>CDC</a>
                        </li>
                        <li className="nav-item text-black">
                            <a className="nav-link text-black font-weight-bold" href="/" onClick={(e)=>{e.preventDefault(); history.push('/nearest-places');}}>Places</a>
                        </li>
                        { !localStorage.getItem("loginStatus")?
                        <><li className="nav-item text-black">
                            <a className="nav-link text-black font-weight-bold" href="/" onClick={(e)=>{e.preventDefault(); history.push('/login');}}>Login</a>
                        </li>
                        <li className="nav-item text-black">
                            <a className="nav-link text-black font-weight-bold" href="/" onClick={(e)=>{e.preventDefault(); history.push('/register');}}>Register</a>
                        </li></>
                        :
                        <>
                        {/*<li className="nav-item text-black">
                            <a className="nav-link text-black font-weight-bold" href="/" onClick={(e)=>{e.preventDefault(); localStorage.setItem("loginStatus",'null'); history.push('/login');}}>Logout</a>
</li> */}
<li className="nav-item text-black">
                            <a className="nav-link text-black font-weight-bold" href="/" onClick={(e)=>{e.preventDefault();  history.push('/profile');}}>Profile</a>
</li> 
                        </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    
    </>
)

}
export default  NavBar;

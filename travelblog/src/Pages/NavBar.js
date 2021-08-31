import React from 'react';
import {useHistory} from "react-router-dom";
const NavBar = () =>{
    const history = useHistory();
return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow" id="mainNav">
            <div class="container-fluid">
                <a class="navbar-brand" href="/" onClick={(e)=>{e.preventDefault(); history.push('/');}}>React central</a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item text-black">
                            <a class="nav-link text-black font-weight-bold" href="/" onClick={(e)=>{e.preventDefault(); history.push('/about');}}>About</a>
                        </li>
                        <li class="nav-item text-black">
                            <a class="nav-link text-black font-weight-bold" href="/" onClick={(e)=>{e.preventDefault(); history.push('/policy');}}>Policy</a>
                        </li>
                        <li class="nav-item text-black">
                            <a class="nav-link text-black font-weight-bold" href="/" onClick={(e)=>{e.preventDefault(); history.push('/contact');}}>Contact</a>
                        </li>
                        <li class="nav-item text-black">
                            <a class="nav-link text-black font-weight-bold" href="/" onClick={(e)=>{e.preventDefault(); history.push('/map');}}>Map</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    
    </>
)

}
export default  NavBar;

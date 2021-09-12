import React,{useState} from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import ProfileSidebar from './ProfileSidebar';
import { API_PATH } from './API';
// it's simirlar the fetch api function but we are seding post method data via axios
import axios from "axios";
const ChangePassword = () =>{
  const defaultForm = {password:'',cpassword:''};
  const[formData,setFormData] = useState(defaultForm);
  const handleSubmit = (e)=>{
  e.preventDefault();
  if(formData.password === ""){ alert("Please fill required password field!"); return false;}
  else if(formData.password === formData.cpassword){ alert("Password and Confirm Password should be same!"); return false;}
  const params = new URLSearchParams();
  // who is logged in and what is the new password
  params.append('id', localStorage.getItem("loginStatus"));
  params.append('password', formData.password);
  const config = {
		  headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		  }
	};
// axios sending the data from react to django by parmameter of id and password
// parms refers to line 16
	  axios.post(API_PATH+"api-update-password", params, config)
	  .then((result) => {
			alert("Successfully updated your password");
			setFormData(defaultForm);
	  })
	  .catch((err) => {
		// Do somthing
	  })
     
}
return (
    <>
    <>
    <NavBar />
    <div className="container profilePage">
	<div className="row">
        <ProfileSidebar/>

        <div className="col-md-9">
		    <div className="card">
		        <div className="card-body">
		            <div className="row">
		                <div className="col-md-12">
		                    <h4>Change Password</h4>
		                    <hr/>
		                </div>
		            </div>
		            <div className="row">
		                <div className="col-md-12">
		                    <form method="post">
                              <div className="form-group row">
                                <label  className="col-4 col-form-label">Password</label> 
                                <div className="col-8">
                                  <input onChange={(e)=>{setFormData({...formData,password:e.target.value})}} placeholder="Password" value={formData.password} className="form-control here" type="password"/>
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-4 col-form-label">Confirm Password</label> 
                                <div className="col-8">
                                  <input onChange={(e)=>{setFormData({...formData,cpassword:e.target.value})}} placeholder="Confirm Password" value={formData.cpassword} className="form-control here" type="password"/>
                                </div>
                              </div>
                          
                                <div className="form-group row">
                                <div className="offset-4 col-8">
                                  
                                  <button name="submit" type="submit" onClick={handleSubmit} className="btn btn-primary">Update Password</button>
                                </div>
                              </div>
                            </form>
		                </div>
		            </div>
		            
		        </div>
		    </div>
		</div>
    </div>
        </div> 
    <Footer />
    </>
    </>
)

}
export default  ChangePassword;

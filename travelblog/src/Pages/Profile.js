import React,{useState,useEffect} from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import ProfileSidebar from './ProfileSidebar';
import { API_PATH } from './API';
import axios from "axios";
const Profile = () =>{
  // calling API from django based on passing user id and then store in loginStatus
  // setting data in setFormData(data)function
  // using form data in html profile in current function to print out value 
  const defaultForm = {fName:'',lName:'',email:''};
  const[formData,setFormData] = useState(defaultForm);
  useEffect(()=>{
    fetch(API_PATH+"api-profile/"+localStorage.getItem("loginStatus"))
    .then(response=> response.json())
    .then(data=>{ setFormData(data)})
// returns error message if no connect to api in django
    .catch(err=> alert("API Error"))
// check if page is loading or not  for useEffect/line 13
},[]);

const handleSubmit = (e)=>{
  e.preventDefault();
// parameters being passed from react to django
  const params = new URLSearchParams();
  params.append('id', localStorage.getItem("loginStatus"));
  params.append('fName', formData.fName);
  params.append('lName', formData.lName);
  params.append('email', formData.email);

  // headers to send api to django 
  const config = {
		  headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		  }
	};
// sending data from react to django
	  axios.post(API_PATH+"api-update-profile", params, config)
	  .then((result) => {
			alert("Successfully updated profile");
	  })
	  .catch((err) => {
		// catch error but does nothing
    alert("API Error");
	  })
     
}
return (
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
		                    <h4>Your Profile</h4>
		                    <hr/>
		                </div>
		            </div>
		            <div className="row">
		                <div className="col-md-12">
		                    <form method="post">
                              <div className="form-group row">
                                <label  className="col-4 col-form-label">First Name</label> 
                                <div className="col-8">
                                  <input onChange={(e)=>{setFormData({...formData,fName:e.target.value})}} placeholder="First Name" value={formData.fName} className="form-control here" type="text"/>
                                </div>
                              </div>
                              <div className="form-group row">
                                <label  className="col-4 col-form-label">Last Name</label> 
                                <div className="col-8">
                                  <input onChange={(e)=>{setFormData({...formData,lName:e.target.value})}} placeholder="Last Name" value={formData.lName} className="form-control here" type="text"/>
                                </div>
                              </div>
                            <div className="form-group row">
                                <label className="col-4 col-form-label">Email*</label> 
                                <div className="col-8">
                                  <input onChange={(e)=>{setFormData({...formData,email:e.target.value})}} placeholder="Email" className="form-control here" value={formData.email} required="required" type="text"/>
                                </div>
                              </div>
                                <div className="form-group row">
                                <div className="offset-4 col-8">
                                  
                                  <button name="submit" type="submit" className="btn btn-primary" onClick={handleSubmit}>Update My Profile</button>
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
)

}
export default  Profile;

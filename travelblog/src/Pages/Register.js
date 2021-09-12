import React,{useState} from 'react'
import { useHistory } from 'react-router'
import Footer from './Footer'
import NavBar from './NavBar'
import { API_PATH } from './API';
const Register = () => {
    const history = useHistory();
    //getting value from register form from form which is in register.js
    const[formData,setFormData] = useState({username:'',email:'',password1:'',password2:''});
    const handleRegister = ()=>{
        console.log(formData);
        
        if(formData.username === "" || formData.email === "" || formData.password1 === "" || formData.password2 === ""){
            alert("Please fill all required field");
            return false;
        }
        if(formData.password1 !== formData.password2 ) {
            alert("Password1 and Password2 should be the same !");
            return false;
        }
		let url = API_PATH+"api-register?u="+formData.username+"&e="+formData.email+"&p="+formData.password1;
        fetch(url)
        .then(response=>response.json())
        .then((data)=>{
                 //if datat.status = 1 then success//localStorage.setItem assigns loginStatus to 1
            if(data.status === 1){ localStorage.setItem("loginStatus","1"); history.push("/");}
// if user already exists or error from django then alert the message
            else{localStorage.setItem("loginStatus",'null'); alert("We can't able to register you, Can you try with diffrent detail");}
        })
        .catch(err=>alert("API Error"));
    }
    return (
        <>
          <NavBar/>
          <div className="container">
                 <div className="row">
                            <div className="col-md-12">
                            <form method="POST" className="web-form">
		<h1>Register</h1>
		<label >Username:</label>
        <input type="text" name="username" onChange={(e)=>{setFormData({...formData,username:e.target.value})}} maxlength="150" autofocus="" required="" id="id_username"/><br/>
        <span className="helptext">Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.</span>
        <label >Email:</label>
        <input type="email" name="email"  onChange={(e)=>{setFormData({...formData,email:e.target.value})}}required="" id="id_email"/>
        <label >Password:</label>
        <input type="password" name="password1" onChange={(e)=>{setFormData({...formData,password1:e.target.value})}} required="" id="id_password1"/><br/>
        <span className="helptext">
            <ul>
                <li>Your password can’t be too similar to your other personal information.</li>
                <li>Your password must contain at least 8 characters.</li>
                <li>Your password can’t be a commonly used password.</li>
                <li>Your password can’t be entirely numeric.</li>
            </ul>
        </span>
        <label >Password confirmation:</label>
        <input type="password" name="password2" onChange={(e)=>{setFormData({...formData,password2:e.target.value})}} required="" id="id_password2"/><br/>
        <span className="helptext">Enter the same password as before, for verification.</span>
        <div className="form-btn">
		<button className="btn btn-primary" type="button" onClick={handleRegister}>Register</button>
        </div>
		<p className="text-center">If you already have an account, <a href="/login" >onClick={(e)=>{ e.preventDefault(); history.push('/login');}}login</a> instead.</p>
	</form>
                            </div>
        </div>
</div> 

        <Footer/>  
        </>
    )
}

export default Register

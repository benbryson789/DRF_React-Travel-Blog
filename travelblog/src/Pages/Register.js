import React,{useState} from 'react'
import { useHistory } from 'react-router'
import Footer from './Footer'
import NavBar from './NavBar'

const Register = () => {
    const history = useHistory();
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
        const BACKENDURLLOCAL = "http://localhost:8000";
        const BACKENDURL = "https://protected-scrubland-37279.herokuapp.com";
        let url = BACKENDURL+"/api-register?u="+formData.username+"&e="+formData.email+"&p="+formData.password1;
        fetch(url)
        .then(response=>response.json())
        .then((data)=>{
                 //if datat.status = 1 then success//localStorage.setItem assigns loginStatus to 1
            if(data.status === 1){ localStorage.setItem("loginStatus","1"); history.push("/");}
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
                            <form method="POST" class="web-form">
		<h1>Register</h1>
		<label for="id_username">Username:</label>
        <input type="text" name="username" onChange={(e)=>{setFormData({...formData,username:e.target.value})}} maxlength="150" autofocus="" required="" id="id_username"/><br/>
        <span class="helptext">Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.</span>
        <label for="id_email">Email:</label>
        <input type="email" name="email"  onChange={(e)=>{setFormData({...formData,email:e.target.value})}}required="" id="id_email"/>
        <label for="id_password1">Password:</label>
        <input type="password" name="password1" onChange={(e)=>{setFormData({...formData,password1:e.target.value})}} required="" id="id_password1"/><br/>
        <span class="helptext">
            <ul>
                <li>Your password can’t be too similar to your other personal information.</li>
                <li>Your password must contain at least 8 characters.</li>
                <li>Your password can’t be a commonly used password.</li>
                <li>Your password can’t be entirely numeric.</li>
            </ul>
        </span>
        <label for="id_password2">Password confirmation:</label>
        <input type="password" name="password2" onChange={(e)=>{setFormData({...formData,password2:e.target.value})}} required="" id="id_password2"/><br/>
        <span class="helptext">Enter the same password as before, for verification.</span>
        <div class="form-btn">
		<button class="btn btn-primary" type="button" onClick={handleRegister}>Register</button>
        </div>
		<p class="text-center">If you already have an account, <a href="/login" >onClick={(e)=>{ e.preventDefault(); history.push('/login');}}login</a> instead.</p>
	</form>
                            </div>
        </div>
</div> 

        <Footer/>  
        </>
    )
}

export default Register

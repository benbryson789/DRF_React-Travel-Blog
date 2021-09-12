import React,{useState} from 'react'
import { useHistory } from 'react-router'
import Footer from './Footer'
import NavBar from './NavBar'
import { API_PATH } from './API';
const Login = () => {
    const history = useHistory();
    //formData stores username and password from login form using setFormData method
    const[formData,setFormData] = useState({username:'',password:''});
    const handleLogin = ()=>{
        //checking the username and password required for the login authentication
        //if we never enter any field value we are writing message "please fill in field"
        if(formData.username === "" || formData.password === ""){ alert("Please fill required field!"); return false;}
        //if user enters username and password we are sending via query string from react to django for authentication
        let url= API_PATH +"api-login?username="+formData.username+"&password="+formData.password;
        fetch(url)
        .then(response=>response.json())
        .then((data)=>{
            //if datat.status = 1 then success//localStorage.setItem assigns loginStatus to 1
            //line 1== true then localStorage of username/password is stored in loginStatus/the redirect to home page
            //else if localStorage is null/incorrect password and username alert to check username and password
            // local storage of who is log in being stored in loginstatuus of data.id and refers views.api
            
            if(data.status === 1){ localStorage.setItem("loginStatus",data.id); history.push("/");}
            else{localStorage.setItem("loginStatus",'null'); alert("Please check username and password");}
        })
        .catch(err=>alert("API Error"))
    }
    return (
        <>
          <NavBar/>
          <div className="container">
                 <div className="row">
                            <div className="col-md-12">
                            <form method="POST" className="web-form">
                                    <h1>Login</h1>
                                    
                                    <label >Username:</label>
                                    <input type="text" name="username" onChange={(e)=>{setFormData({...formData,username:e.target.value})}} />
                                    <label >Password:</label>
                                    <input type="password" name="password"  onChange={(e)=>{setFormData({...formData,password:e.target.value})}} />
                                    <div className="form-btn">
                                        <button className="btn btn-primary" type="button" onClick={handleLogin}>Login</button>
                                    </div>
                                    {/* register route in app.js */}
                                    <p className="text-center">Don't have an account? <a href="/register" onClick={(e)=>{ e.preventDefault(); history.push('/register');}}>Create an account</a>.</p>
                                </form>
                            </div>
                     </div>
                    </div> 

          <Footer/>  
        </>
    )
}

export default Login

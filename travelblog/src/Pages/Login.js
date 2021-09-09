import React,{useState} from 'react'
import { useHistory } from 'react-router'
import Footer from './Footer'
import NavBar from './NavBar'

const Login = () => {
    const history = useHistory();
    const[formData,setFormData] = useState({username:'',password:''});
    const handleLogin = ()=>{
        if(formData.username === "" || formData.password === ""){ alert("Please fill required field!"); return false;}
        let url= "http://127.0.0.1:8000/api-login?username="+formData.username+"&password="+formData.password;
        fetch(url)
        .then(response=>response.json())
        .then((data)=>{
            //if datat.status = 1 then success//localStorage.setItem assigns loginStatus to 1
            if(data.status === 1){ localStorage.setItem("loginStatus","1"); history.push("/");}
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
                            <form method="POST" class="web-form">
                                    <h1>Login</h1>
                                    
                                    <label for="id_username">Username:</label>
                                    <input type="text" name="username" onChange={(e)=>{setFormData({...formData,username:e.target.value})}} />
                                    <label for="id_password">Password:</label>
                                    <input type="password" name="password"  onChange={(e)=>{setFormData({...formData,password:e.target.value})}} />
                                    <div class="form-btn">
                                        <button class="btn btn-primary" type="button" onClick={handleLogin}>Login</button>
                                    </div>
                                    <p class="text-center">Don't have an account? <a href="/register" onClick={(e)=>{ e.preventDefault(); history.push('/register');}}>Create an account</a>.</p>
                                </form>
                            </div>
                     </div>
                    </div> 

          <Footer/>  
        </>
    )
}

export default Login

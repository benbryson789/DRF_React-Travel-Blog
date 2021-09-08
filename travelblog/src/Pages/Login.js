import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

const Login = () => {
    return (
        <>
          <NavBar/>
          <div className="container">
                 <div className="row">
                            <div className="col-md-12">
                            <form method="POST" class="web-form">
                                    <h1>Login</h1>
                                    
                                    <label for="id_username">Username:</label>
                                    <input type="text" name="username" autofocus="" autocapitalize="none" autocomplete="username" maxlength="150" required="" id="id_username"/>
                                    <label for="id_password">Password:</label>
                                    <input type="password" name="password" autocomplete="current-password" required="" id="id_password"/>
                                    <div class="form-btn">
                                        <button class="btn btn-primary" type="submit">Login</button>
                                    </div>
                                    <p class="text-center">Don't have an account? <a href="/register">Create an account</a>.</p>
                                </form>
                            </div>
                     </div>
                    </div> 

          <Footer/>  
        </>
    )
}

export default Login

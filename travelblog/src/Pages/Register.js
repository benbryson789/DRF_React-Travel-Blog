import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

const Register = () => {
    return (
        <>
          <NavBar/>
          <div className="container">
                 <div className="row">
                            <div className="col-md-12">
                            <form method="POST" class="web-form">
		<h1>Register</h1>
		<label for="id_username">Username:</label>
        <input type="text" name="username" maxlength="150" autofocus="" required="" id="id_username"/><br/>
        <span class="helptext">Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.</span>
        <label for="id_email">Email:</label>
        <input type="email" name="email" required="" id="id_email"/>
        <label for="id_password1">Password:</label>
        <input type="password" name="password1" autocomplete="new-password" required="" id="id_password1"/><br/>
        <span class="helptext">
            <ul>
                <li>Your password can’t be too similar to your other personal information.</li>
                <li>Your password must contain at least 8 characters.</li>
                <li>Your password can’t be a commonly used password.</li>
                <li>Your password can’t be entirely numeric.</li>
            </ul>
        </span>
        <label for="id_password2">Password confirmation:</label>
        <input type="password" name="password2" autocomplete="new-password" required="" id="id_password2"/><br/>
        <span class="helptext">Enter the same password as before, for verification.</span>
        <div class="form-btn">
		<button class="btn btn-primary" type="submit">Register</button>
        </div>
		<p class="text-center">If you already have an account, <a href="/login">login</a> instead.</p>
	</form>
                            </div>
        </div>
</div> 

        <Footer/>  
        </>
    )
}

export default Register

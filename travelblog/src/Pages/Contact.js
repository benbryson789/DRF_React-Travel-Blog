import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';

const Contact = () =>{
return (
    <>
    <NavBar />
    <div class="container">
<form>
    <div class="form-group">
        <label for="name">Name</label>
        <input type="name" class="form-control" id="name" placeholder="name"/>
      </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="subject">Subject</label>
      <input type="subject" class="form-control" id="subject" placeholder="subjec"/>
    </div>
    <div class="form-group">
        <label for="message">Message</label>
        <input type="message" class="form-control" id="message" placeholder="message"/>
      </div>
    <div>

    <a href="https://www.google.com/" class="btn btn-info" role="button">Submit</a>
  
    </div>

  </form>
</div>


    <Footer />
    </>
)

}
export default  Contact;
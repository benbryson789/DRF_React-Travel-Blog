import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';

const Contact = () =>{
return (
    <>
    <NavBar />
    <div className="container">
<form>
    <div className="form-group">
        <label >Name</label>
        <input type="name" className="form-control" id="name" placeholder="name"/>
      </div>
    <div className="form-group">
      <label >Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div className="form-group">
      <label >Subject</label>
      <input type="subject" className="form-control" id="subject" placeholder="subjec"/>
    </div>
    <div className="form-group">
        <label >Message</label>
        <input type="message" className="form-control" id="message" placeholder="message"/>
      </div>
    <div>

    <a href="https://www.google.com/" className="btn btn-info" role="button">Submit</a>
  
    </div>

  </form>
</div>


    <Footer />
    </>
)

}
export default  Contact;
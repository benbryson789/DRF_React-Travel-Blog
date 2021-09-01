import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';

const Policy = () =>{
return (
    <>
    <NavBar />
    <div class="container">

<div class="list-group">
<a href="/" class="list-group-item active">  
      <h4 class="list-group-item-heading">PRIVACY POLICY</h4>
   <p class="list-group-item-text">We consider the privacy of our visitors to be extremely important. This privacy policy document describes in detail the types of personal information is collected and recorded by www.mywebsite.com and how we use it.</p>
</a>
    
      <a href="/" class="list-group-item">
      <h4 class="list-group-item-heading">LOG FILES</h4>
      <p class="list-group-item-text">Like many other Web sites, www.mywebsite.com makes use of log files. These files merely logs visitors to the site – usually a standard procedure for hosting companies and a part of hosting services’ analytics. The information inside the log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and possibly the number of clicks. This information is used to analyze trends, administer the site, track user’s movement around the site, and gather demographic information. IP addresses and other such information are not linked to any information that is personally identifiable.</p>
</a>

    <a href="/" class="list-group-item">
      <h4 class="list-group-item-heading">COOKIEW AND WEB BEACONS</h4>
      <p class="list-group-item-text">We uses cookies to store information about visitors’ preferences, to record user-specific information on which page</p>
    </a>
  </div>
</div>

    <Footer />
    </>
)

}
export default  Policy;
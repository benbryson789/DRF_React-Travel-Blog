import React from 'react';
const Sidebar = () =>{
return (
    <>
    <div class="col-md-4 float-right ">
<div class="card my-4">
        <h5 class="card-header">About Us</h5>
    <div class="card-body">
        <p class="card-text"> This awesome blog is made on the top of our Favourite full stack Framework 'Django', follow up the tutorial to learn how we made it..!</p>
        <a href="https://djangocentral.com/building-a-blog-application-with-django"
           class="btn btn-danger">Know more!</a>
    </div>
</div>
</div>
    </>
)

}
export default  Sidebar;
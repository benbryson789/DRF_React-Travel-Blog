import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

const BACKENDURL = "https://protected-scrubland-37279.herokuapp.com"

const BlogDetails = () =>{
    const[object,setObject] = useState({});
    const params = useParams();
    console.log('params',params);
    useEffect(()=>{
        fetch(BACKENDURL + '/api/'+params.slug+'/?format=json')
        .then(response=> response.json())
        .then(data=>{ setObject(data)})
        .catch(err=> alert("API Error"))
    },[params]);
return (
    <>
    <NavBar />
    <div class="container">
  <div class="row">
    <div class="col-md-8 card mb-4  mt-3 left  top">
      <div class="card-body">
        <h1>{ object.title }</h1>
        <p class=" text-muted">{ object.author } | { object.created_on }</p>
        <p class="card-text ">{ object.content  }</p>
        <p class="card-text ">{ object.excerpt  }</p>
        <p class="card-text ">{ object.published }</p>
        <p class="card-text "><img src={ object.image  } alt=""/></p>


      </div>
    </div>
    <Sidebar />
  </div>
</div>

    <Footer />
    </>
)

}
export default  BlogDetails;
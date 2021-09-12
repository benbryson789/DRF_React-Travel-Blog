import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import { API_PATH } from './API';
const BlogDetails = () =>{
    const[object,setObject] = useState({});
    const params = useParams();
    console.log('params',params);
    useEffect(()=>{
        fetch(API_PATH + 'api/'+params.slug+'/?format=json')
        .then(response=> response.json())
// get blogs is useState
        .then(data=>{ setObject(data)})
        .catch(err=> alert("API Error"))
// gets blog id by parameter//related const params
    },[params]);
return (
    <>
    <NavBar />
    <div className="container">
  <div className="row">
    <div className="col-md-8 card mb-4  mt-3 left  top">
      <div className="card-body">
        <h1>{ object.title }</h1>
        {/* text muted means duller printed information in image boxes */}
        <p className=" text-muted">{ object.author } | { object.created_on }</p>
        {/* card text encapsulates info in box of image */}
        <p className="card-text ">{ object.content  }</p>
        <p className="card-text ">{ object.excerpt  }</p>
        <p className="card-text ">{ object.published }</p>
        <p className="card-text "><img src={ object.image  } alt=""/></p>


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
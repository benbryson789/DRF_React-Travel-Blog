import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import { API_PATH } from './API';
const Home = () =>{
    const[blogList,setBlogList] = useState([]);
    const history = useHistory();
    // const[filter,setFilter] = useState(false);
    useEffect(()=>{
        fetch(API_PATH+"api/?format=json")
        .then(response=> response.json())
        .then(data=>{ setBlogList(data)})
        .catch(err=> alert("API Error"))
    },[]);
return (
    <>
    <NavBar />
    <header className="masthead">
    <div className="overlay"></div>
    <div className="container">
        <div className="row">
            <div className=" col-md-8 col-md-10 mx-auto">
                <div className="site-heading">
                    <h3 className=" site-heading my-4 mt-3 text-white"> Welcome to my awesome Travel Blog </h3>
                    <p className="text-light">I love traveling As much as you do..! &nbsp
                    </p>
                </div>
            </div>
        </div>
    </div>
</header>
<div className="container">
    <div className="row">
    
        <div className="col-md-8 mt-3 left">
            {/* looping thru post by index like 0,1,3,4 etc */}
            {blogList.map((post,index)=>(
            <div className="card mb-4" key={index}>
                <div className="row">
                    <div className="col-md-4"> <img src={ post.image  } alt=""/></div><div className="col-md-8">
                <div className="card-body">
                    <h2 className="card-title">{post.title}</h2>
                    <p className="card-text text-muted h6">{post.author } | { post.published} </p>
                    <p className="card-text">{post.excerpt}</p>
                    {/* click read more button view more info about post */}
                    {/* history push is calling slug route in app.js */}
                    <a href="/" onClick={(e)=>{e.preventDefault(); history.push("/"+post.id); }} className="btn btn-primary">Read More &rarr;</a>
                </div>
                </div>
                </div>
            </div>
            ))}
           
        </div>
       <Sidebar />
    </div>
</div>

    <Footer />
    </>
)

}
export default  Home;
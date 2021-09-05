import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

const Home = () =>{
    const[blogList,setBlogList] = useState([]);
    const history = useHistory();
    // const[filter,setFilter] = useState(false);
    useEffect(()=>{
        fetch('https://protected-scrubland-37279.herokuapp.com/api/?format=json')
        .then(response=> response.json())
        .then(data=>{ setBlogList(data)})
        .catch(err=> alert("API Error"))
    },[]);
return (
    <>
    <NavBar />
    <header class="masthead">
    <div class="overlay"></div>
    <div class="container">
        <div class="row">
            <div class=" col-md-8 col-md-10 mx-auto">
                <div class="site-heading">
                    <h3 class=" site-heading my-4 mt-3 text-white"> Welcome to my awesome Blog </h3>
                    <p class="text-light">We Love Django As much as you do..! &nbsp
                    </p>
                </div>
            </div>
        </div>
    </div>
</header>
<div class="container">
    <div class="row">
    
        <div class="col-md-8 mt-3 left">
            {blogList.map((post,index)=>(
            <div class="card mb-4" key={index}>
                <div class="row">
                    <div class="col-md-4"> <img src={ post.image  } alt=""/></div><div class="col-md-8">
                <div class="card-body">
                    <h2 class="card-title">{post.title}</h2>
                    <p class="card-text text-muted h6">{post.author } | { post.published} </p>
                    <p class="card-text">{post.excerpt}</p>
                    <a href="/" onClick={(e)=>{e.preventDefault(); history.push("/"+post.id); }} class="btn btn-primary">Read More &rarr;</a>
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
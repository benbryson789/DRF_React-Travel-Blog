import React,{useState,useEffect} from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import ProfileSidebar from './ProfileSidebar';
import { useHistory } from 'react-router';
import { API_PATH } from './API';
const ManageBlogs = () =>{
    const[blogList,setBlogList] = useState([]);
    const[deleteItem,setDeletedItem] = useState('');
// fetch calls django api from manage blogs
// localStorage.getItem calls log in user//local storage stores the id of user in browser cookies
    const history = useHistory();
	 useEffect(()=>{
        fetch(API_PATH+"api-manage-blogs/"+localStorage.getItem("loginStatus"))
        .then(response=> response.json())
// returns blog list data in UseState
        .then(data=>{ setBlogList(data)})
        .catch(err=> alert("API Error"))
// if get error the show api error
    },[deleteItem]);
// if delteItem/button selected then calls handledelete function 
	const handleDelete = (id)=>{
// sending the selected blog id to django for deleting blog
		fetch(API_PATH+"api-delete-blogs/"+id)
		.then(response=> response.json())
		.then(data=>{alert("Successfully deleted Post!"); setDeletedItem(id); })
		 .catch(err=> alert("API Error"))
	}
return (
    <>
<NavBar />
<div className="container profilePage">
	<div className="row">
        <ProfileSidebar/>
        <div className="col-md-9">
		    <div className="card">
		        <div className="card-body">
		            <div className="row">
		                <div className="col-md-9">
		                    <h4>My Blogs</h4>
                            </div>
                            <div className="col-md-3 text-right">
                            <a href="/manage-blogs/add" onClick={(e)=>{e.preventDefault();history.push('/manage-blogs/add');}} className="btn btn-primary">Add New </a>
		                   
		                </div>
                      <div className="col-md-12">  <hr/></div>
		            </div>

		            <div className="row">
		                <div className="col-md-12">
						{Object.keys(blogList).map((data,index)=>(	
                            <article key={index}>
								{console.log(data)}
                                <div className="row">
                                    <div className="col-sm-6 col-md-4">
                                        <figure>
                                            <img src={`${API_PATH}media/${blogList[data].media}`} alt=""/>
                                        </figure>
                                    </div>
                                    <div className="col-sm-6 col-md-8">
                                         <h4>{blogList[data].title}</h4>
                                        <p>{blogList[data].excerpt}</p>
                                        <section>
                                            {/* prevent default behavior of onClick */}
                                            {/* history push-insteading of changing url in browser it calls antother component */}
                                            {/* manage-blogs/edit is calling edit routing in app.js */}
                                            <a href="/" onClick={(e)=>{e.preventDefault();history.push('/manage-blogs/edit/'+data);}}  className="btn btn-primary">Edit </a> &nbsp;
                                            <a href="/" onClick={(e)=>{e.preventDefault(); handleDelete(data);}} className="btn btn-danger">Delete </a>
                                        </section>
                                    </div>
                                </div>
                            </article>
						 ))}
                        </div>
                </div>
                        
                </div>
            </div>
		</div>


        </div>
    </div>    
<Footer />
    </>
)

}
export default  ManageBlogs;
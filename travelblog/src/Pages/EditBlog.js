import React,{useState,useEffect} from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import ProfileSidebar from './ProfileSidebar';
import { API_PATH } from './API';
import axios from "axios";
import { useHistory,useParams } from 'react-router';
const EditBlog = () =>{
  const defaultForm = {title:'',excerpt:'',content:'',file:''};
  const[formData,setFormData] = useState(defaultForm);
  const history = useHistory();
  const queryParams = useParams();
  useEffect(()=>{
    fetch(API_PATH+"api-single-blog/"+queryParams.id)
    .then(response=> response.json())
// put data in state
    .then(data=>{data.file=""; setFormData(data)})
    .catch(err=> alert("API Error"))
},[queryParams]);
  const handleSubmit = (e)=>{
	  e.preventDefault();

	  const params = new FormData();
	  params.append('id', queryParams.id);
	  params.append('title', formData.title);
	  params.append('content', formData.content);
	  params.append('excerpt', formData.excerpt);
	  params.append('file', formData.file);
	  const config = {
			  headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			  }
		};
// posting the post data from react to django
// api path + apii-update-blogs(django)
// passing parameters of const default form line 9
		  axios.post(API_PATH+"api-update-blogs", params, config)
		  .then((result) => {
				alert("Successfully updated blog!");
				 history.push("/manage-blogs");
		  })
		  .catch((err) => {
			// Do somthing
      alert("API Error");
		  })
	 
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
		                <div className="col-md-12">
		                    <h4>Edit Blog</h4>
		                    <hr/>
		                </div>
		            </div>
		            <div className="row">
		                <div className="col-md-12">
		                    <form method="post">
                              <div className="form-group row">
                                <label  className="col-4 col-form-label">Title</label> 
                                <div className="col-8">
                                  <input onChange={(e)=>{setFormData({...formData,title:e.target.value})}} value={formData.title} className="form-control here" type="text"/>
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-4 col-form-label">Excerpt</label> 
                                <div className="col-8">
                                  <textarea onChange={(e)=>{setFormData({...formData,excerpt:e.target.value})}} className="form-control here"  value={formData.excerpt}></textarea>
                                </div>
                              </div>
                              <div className="form-group row">
                                <label  className="col-4 col-form-label">Content</label> 
                                <div className="col-8">
                                  <textarea onChange={(e)=>{setFormData({...formData,content:e.target.value})}}  className="form-control here" value={formData.content}></textarea>
                                </div>
                              </div>
                            <div className="form-group row">
                                <label className="col-4 col-form-label">Image</label> 
                                <div className="col-8">
                                  <input  className="form-control here"   onChange={(e)=>{setFormData({...formData,file:e.target.files[0]})}} required="required" type="file"/>
								  { formData.media !== "" &&
									<img src={`${API_PATH}media/${formData.media}`} alt=""/>
								  }
                                </div>
                              </div>
                                <div className="form-group row">
                                <div className="offset-4 col-8">
                                  
                                  <button name="submit" type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                                </div>
                              </div>
                            </form>
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
export default  EditBlog;
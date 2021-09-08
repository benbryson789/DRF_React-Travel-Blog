import React, { useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
//import axios from "axios";
const NearestPlaces = ()=>{
const[formData,setFormData] = useState({type:'restaurant',radius:10,location:'',keyword:''});
const[searchPlaces,setSearchPlaces] = useState([]);
console.log("searchPlaces",searchPlaces);
const searchPlacesFn = ()=>{
    //let url = 'https://protected-scrubland-37279.herokuapp.com/google_api?';
    let url = 'http://127.0.0.1:8000/google_api?';
    url += 'type='+formData.type+'&';
    url += 'radius='+formData.radius+"&";
    url += "location="+formData.location+"&";
    url += "keyword="+formData.keyword;
    fetch(url)
    .then(res=> res.json())
    .then((data)=>{ setSearchPlaces(data['results'])})
    .catch(err=>console.log("error"))
}
//
    return(
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
            <div className="container">
                <div className="row">
                <div class="col-md-4">
                    <div class="card my-4">
                            <h5 class="card-header">Search Your Nearest Places</h5>
                        <div class="card-body">
                <form method="post" action="">
            <p className="form-group">
                {/* form lines 27-34 */}
                    <label>Search Type</label>
                    {/* on change event  replace current object value from current value */}
                    {/* input boxes function */}
                    <select className={'form-control'} onChange={(e)=>{
                        // changes key value type
                        setFormData({...formData , 
                            // 
                            // put current value in set FormData
                            type: e.target.value
                        })
                    }}>
                        {/* related lines 15-19 */}
                    <option value="restaurant">Restaurant</option>
                    <option value="school">School</option>
                    <option value="hospital">Hospital</option>
                    </select>
                    
                </p>
                <p className="form-group">
                    <label>Radius</label>
                    <select className={'form-control'} onChange={(e)=>{
                        setFormData({...formData , 
                            radius: e.target.value
                        })
                    }}>
                    <option value="10">10</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    </select>
                </p>
                <p className="form-group">
                    <label>Location</label>
                    <input className={'form-control'} type="text" onChange={(e)=>{
                        setFormData({...formData , 
                            location: e.target.value
                        })
                    }}/>
                </p>
                <p className="form-group"> 
                    <label>Keyword</label>
                    <input className={'form-control'} type="text" onChange={(e)=>{
                        setFormData({...formData , 
                            keyword: e.target.value
                        })
                    }}/>
                </p>
                <p className="form-group"><button type="button" className={" btn btn-primary"} onClick={searchPlacesFn}>Search Nearest Places</button></p>
        </form>
        </div></div></div>
        <div class="col-md-8 ">
            <h2>Search Result: </h2>
        {searchPlaces && searchPlaces.map((obj,index)=>(
                    <div class="card mb-4" key={index}>
                    <div class="row">
                        <div class="col-md-4"> <img src={ obj.icon  } alt=""/></div><div class="col-md-8">
                    <div class="card-body">
                        <h2 class="card-title">{obj.name}</h2>
                        <p class="card-text text-muted h6"><label>Rating: </label>{ obj.rating} </p>
                        <p class="card-text"><label>Address: </label>{obj.formatted_address}</p>
                    </div>
                    </div>
                    </div>
                </div>
                ))}
        </div>
        </div>
        </div>
        <Footer /> 
        </>
    )
}
export default NearestPlaces;
import React, { useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { API_PATH } from './API';
const NearestPlaces = ()=>{
const[formData,setFormData] = useState({type:'restaurant',radius:10,location:'',keyword:''});
const[searchPlaces,setSearchPlaces] = useState([]);
console.log("searchPlaces",searchPlaces);
const searchPlacesFn = ()=>{
    let url = API_PATH+'google_api?';
// passing parameters in url according to formData
    url += 'type='+formData.type+'&';
    url += 'radius='+formData.radius+"&";
    url += "location="+formData.location+"&";
    url += "keyword="+formData.keyword;
    fetch(url)
    .then(res=> res.json())
    // setting response datat in state
    .then((data)=>{ setSearchPlaces(data['results'])})
    .catch(err=>console.log("error"))
}
//
    return(
        <>
        <NavBar />
        <header className="masthead">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className=" col-md-8 col-md-10 mx-auto">
                            <div className="site-heading">
                                <h3 className=" site-heading my-4 mt-3 text-white"> Welcome to my awesome Blog </h3>
                                <p className="text-light">We Love Django As much as you do..! &nbsp
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <div className="row">
                <div className="col-md-4">
                    <div className="card my-4">
                            <h5 className="card-header">Search Your Nearest Places</h5>
                        <div className="card-body">
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
        <div className="col-md-8 ">
            <h2>Search Result: </h2>
        {searchPlaces && searchPlaces.map((obj,index)=>(
                    <div className="card mb-4" key={index}>
                    <div className="row">
                        <div className="col-md-4"> <img src={ obj.icon  } alt=""/></div><div className="col-md-8">
                    <div className="card-body">
                        <h2 className="card-title">{obj.name}</h2>
                        <p className="card-text text-muted h6"><label>Rating: </label>{ obj.rating} </p>
                        <p className="card-text"><label>Address: </label>{obj.formatted_address}</p>
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
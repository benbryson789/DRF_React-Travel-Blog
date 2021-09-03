import React, { useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import axios from "axios";
const NearestPlaces = ()=>{
const[formData,setFormData] = useState({type:'restaurant',radius:10,location:'',keyword:''});
const[searchPlaces,setSearchPlaces] = useState([]);
console.log("searchPlaces",searchPlaces);
const searchPlacesFn = ()=>{
    var config = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyAInX0_Rk6nMsqubmBSAxqrm1BjemVP47E&type=restaurant&radius=10&location=det&query=dert',
    headers: { 'Access-Control-Allow-Origin':"http://localhost:3000/",
    methods: "GET,PUT,POST,DELETE"
    },
   
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
}
//
    return(
        <>
        <NavBar />
            <h1>Search Your Nearest Places</h1>
            <form method="post" action="">
            <p>
                    <label>Search Type</label>
                    {/* on change event  replace current object value from current value */}
                    {/* input boxes function */}
                    <select onChange={(e)=>{
                        // changes key value type
                        setFormData({...formData , 
                            // 
                            type: e.target.value
                        })
                    }}>
                        {/* related lines 15-19 */}
                    <option value="restaurant">Restaurant</option>
                    <option value="school">School</option>
                    <option value="hospital">Hospital</option>
                    </select>
                    
                </p>
                <p>
                    <label>Radius</label>
                    <select onChange={(e)=>{
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
                <p>
                    <label>Location</label>
                    <input type="text" onChange={(e)=>{
                        setFormData({...formData , 
                            location: e.target.value
                        })
                    }}/>
                </p>
                <p>
                    <label>Keyword</label>
                    <input type="text" onChange={(e)=>{
                        setFormData({...formData , 
                            keyword: e.target.value
                        })
                    }}/>
                </p>
                <p><button type="button" onClick={searchPlacesFn}>Search Nearest Places</button></p>

            </form>
           <Footer /> 
        </>
    )
}
export default NearestPlaces;
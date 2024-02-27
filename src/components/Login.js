import PropTypes from 'prop-types';
import React, { useState } from "react";
 
export default function Login({setToken}){
    const[formData, setFormData] = useState({email:"",password:""});
    const [loginForm, setLoginForm] = useState(false);
    const[Error, setError] =  useState("");


    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData, [name]: value,
        }));
     }

    
     const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                   'Content-Type': 'application/json',
                },
                body:JSON.stringify(formData)
            });
            const data = await response.json();
            if(data.message ==="successful"){
                setLoginForm(true);
                setToken(formData)
                console.log(data)
            }else{
                setError("Wrong Email or Password");
               
            }
  
        }catch (error){
             console.error('error fetching data:', error);
        }
    };    

    if(loginForm){
        return(
            <div className="btn btn-primary">Hurray login successfull </div>
        )
    }
  
    return (
        <>
    <diV style={{width:"70%",margin:"0 auto",textAlign:"center",color:"blue",backgroundColor:"azure",fontSize:"25px"}}>Simple Login Form </diV>
    <diV style={{width:"70%",margin:"0 auto",textAlign:"center",color:"red",fontSize:"25px"}}>{Error}</diV>
          <form onSubmit={handleSubmit} style ={{width: '70%', margin:" 0 auto",backgroundColor: "whitesmoke"}}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="text" 
             className="form-control" 
             id="email"
             name = "email" 
             value ={formData.email}
             onChange= {handleChange}
             aria-describedby="email"
             autoComplete='off'/> 
            <div id="emailcheck" className="form-text">
            </div>
        </div>

        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" 
             className="form-control"
             id="password" aria-describedby="password"
             name ="password"
             value ={formData.password}
             onChange= {handleChange}/> 
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input"/> 
          <label class="form-check-label" for="checkbox">
              remember
          </label>
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
      </form>
        </>
      );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
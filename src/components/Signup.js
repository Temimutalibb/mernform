import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp(){
  const[formData, setFormData] = useState({email:"",password:""});
  const[checkingEmail, SetCheckingEmail] = useState("");
  const[signUpForm, setSignupForm] = useState(false);
  const[spin, setSpin] = useState("")
  const[disable, setDisable] = useState(true)
  const[Error, setError] = useState("")
  
      const handleChange = (e)=>{
          const {name, value} = e.target;
          setFormData((prevData) => ({
              ...prevData, [name]: value,
          }));
          }

      const handleSubmit = async (e) => {
          e.preventDefault();
          try{
              const response = await fetch('http://localhost:3001/submitform', {
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body:JSON.stringify(formData)
              });
              console.log(formData)
              const data = await response.json();
              if(data.message ==="successful"){
                  setSignupForm(true);
                  console.log('successful')
              }else{
                  setError("error submitting form")
              }
          }catch (error){
               console.error('error fetching data:', error);
          }
      };  

    const handleMouseEnter = ()=>{
        SetCheckingEmail('checking');
        setSpin('spinner-border spinner-border-sm')
    }
 
    const handleCheckEmail = async ()=> {
        const {email} = formData
        try{
            const response = await fetch('http://localhost:3001/checkemail', {
                method: 'POST',
                headers: {
                   'Content-Type': 'application/json',
                },
            body: JSON.stringify({email})
            });
           const data = await response.json();
          if(data.exists){
              SetCheckingEmail("email exists with another account");
              setDisable(true)
              setSpin("");
          }else{
              SetCheckingEmail("good")
              setSpin("")
              setDisable(false)
          }
        }catch (error){
           console.error('error fetching data:', error);
        }
    }

    if(signUpForm){
        return (
            <>
            <button type="button" className="btn btn-outline-secondary">
                <div >Sign up successfull
                <Link to="/Login" className="btn btn-primary" role="button" style={{marginLeft:"5px"}}>
                    click to login
                </Link>
                </div>
           </button>
            </>
        )  
    }
   
  return (
    <>
    <diV style={{width:"70%",margin:"0 auto",textAlign:"center",color:"white",backgroundColor:"blue",fontSize:"25px"}}>Simple form signup  </diV>
    <diV style={{width:"70%",margin:"0 auto",textAlign:"center",color:"red",fontSize:"25px"}}>{Error}</diV>
    <form onSubmit={handleSubmit} style ={{width: '70%', margin:" 0 auto",backgroundColor: "whitesmoke"}}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="text" 
             className="form-control" 
             id="email"
             name = "email" 
             value ={formData.email}
             onChange={handleChange}
             onMouseEnter={handleMouseEnter}
             onMouseOut={handleCheckEmail}
             aria-describedby="email"
             autoComplete='off'/> 
            <div id="emailcheck" className="form-text">
               <span className ={spin}></span>
               <span style ={{color:"green",fontSize:"15px"}} role="status">{checkingEmail}</span>
            </div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" 
             className="form-control"
             id="password" aria-describedby="password"
             disabled= {disable}
             name ="password"
             value ={formData.password}
             onChange={handleChange}/> 
        </div>

      <div className="mb-3">
          <label htmlFor="password2" className="form-label">Confirm password</label>
          <input type="password" 
           className="form-control" 
           id="password2" aria-describedby="confirm password"
           name= "password2"
           disabled  ={disable}
           /> 
          <div id="passwordCheck" className="form-text"></div>
      </div>

      <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input"/> 
          <label class="form-check-label" for="checkbox">
              i greed to the terms and conditions 
          </label>
      </div>
      <button type="submit" className="btn btn-primary" disabled ={disable}>Submit</button>
      
          <Link to="/Login" className="btn btn-success" role="button" style={{float:"right"}}>
              click to login
         </Link>
      

    </form>
    </>
  );

}
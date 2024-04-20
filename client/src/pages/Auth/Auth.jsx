import React, { useState } from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import {useDispatch, useSelector} from 'react-redux'
import { signUp,logIn } from '../../actions/AuthAction'



function Auth() {
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.authReducer.loading);
  const [isSignUp, setIsSignUp] = useState(true);
  // console.log(loading)
  // const dispatch = useDispatch()
  const [data, setData]=useState({firstname:"", lastname: "",password: "", confirmpass: "",username: "" })
  const [confirmpass, setConfirmPass] = useState(true);
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) =>{
    setConfirmPass(true);
    e.preventDefault();

    if(isSignUp)
    {
      data.password === data.confirmpass ? dispatch(signUp(data)) : setConfirmPass(false);
    }
    else
    {
      dispatch(logIn(data))
    }
  }
  const resetForm=()=>{
    setConfirmPass(true)
    setData({firstname:"", lastname: "",password: "", confirmpass: "",username: "" });
  }
  return (
    <div className='Auth'>
      {/*left side*/}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
            <h1>Campusync</h1>
            
        </div>
      </div>
      {/* <Signup/> */}
      {/*right side*/}
      <div className="a-right">
            <form className="infoForm authForm" onSubmit={handleSubmit}>


                <h3>{isSignUp ? "Sign Up":"Log In"}</h3>
                {isSignUp &&
                <div>
                    <input type="text" placeholder='First Name' className='infoInput' name='firstname' onChange={handleChange} value={data.firstname}/>
                    <input type="text" placeholder='Last Name' className='infoInput' name='lastname' onChange={handleChange} value={data.lastname}/>
                </div>}

                <div>
                    <input type="text" placeholder='User Name' className='infoInput' name='username' onChange={handleChange} value={data.username}/>
                </div>

                <div>
                    <input type="password" className="infoInput" placeholder='Password' name='password' onChange={handleChange} value={data.password}/>
                    {isSignUp &&
                    <input type="password" className="infoInput" placeholder='Confirm Password' name='confirmpass' onChange={handleChange} value={data.confirmpass}/>
                  }
                </div> 
                    <span style={{display: confirmpass? "none": "block", color: 'red', fontSize:'12px', WebkitAlignSelf: "flex-end", marginRight:"5px"}}>
                      Confirm Passwod is not same!
                    </span>
                <div>
                    <span style={{fontSize:'12px',cursor:"pointer" }} onClick={() => {setIsSignUp((prev) => !prev); resetForm()}}
                    >
                      {isSignUp? "Already have an account? Login!" : "Don't have an account? Sign Up"}</span>
                </div>
                <button className="button infoButton" type="submit" disabled={loading}>
                  {loading? "Loading..." : isSignUp ? "Signup" : "Log In"}</button>
                  {/* <button className="button infoButton" type="submit">
                  {isSignUp ? "Signup" : "Log In"}</button> */}
            </form>
        </div>
    </div>
  )
}




export default Auth;

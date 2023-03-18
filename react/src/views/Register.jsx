import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

export default function Register() {
  const [errors,setErrors]=useState();
  const firstNameRef=useRef();
  const lastNameRef=useRef();
  const emailRef=useRef();
  const passwordRef=useRef();
  const passwordConfirmationRef=useRef();
  const onSumbit = (e) => {
    e.preventDefault();
    const payLoad={
      firstName:firstNameRef.current.value,
      lastName:lastNameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value,
      password_confirmation:passwordConfirmationRef.current.value
    }
    setErrors(null);
    axiosClient.post('/register',payLoad)
      .then(({data}) => {
      console.log(data);
    })
      .catch(err=>{
        const response=err.response;
        if(response && response.status===422){
          setErrors(response.data.errors)
        }
      })

  }

  return (
    <form onSubmit={onSumbit}>
      <h1 className="title">Register</h1>
      {errors && <div className="alert">
        {Object.keys(errors).map(key=>(
          <p className="alert-text" key={key}>{errors[key][0]}</p>
        ))}
    </div>
    }
      <input ref={firstNameRef} type="text" placeholder="First Name"/>
      <input ref={lastNameRef} type="text" placeholder="Last Name"/>
      <input ref={emailRef} type="email" placeholder="Email"/>
      <input ref={passwordRef} type="password" placeholder="Password"/>
      <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation"/>
      <button className="btn btn-block">Register</button>
      <p className="message">
        Already Registered? <Link to='/login'>Sign in</Link>
      </p>
    </form>
  )
}


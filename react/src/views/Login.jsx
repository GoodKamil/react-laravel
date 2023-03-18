import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Login() {
  const [errors,setErrors]=useState();
  const emailRef=useRef();
  const passwordRef=useRef();
  const {setUser,setToken}=useStateContext();
  const onSumbit = (e) => {
    e.preventDefault();
    const payLoad={
      email:emailRef.current.value,
      password:passwordRef.current.value
    };
    setErrors(null);
    axiosClient.post('/login',payLoad)
      .then(({data})=>{
        setUser(data.user)
        setToken(data.token)
     }).catch(err=>{
      const response=err.response;
      if(response && response.status===422){
        if(response.data.errors){
          setErrors(response.data.errors)
        }else {
          setErrors({
            email:[response.data.message]
          })
        }
      }
    })

  }

  return (
    <form onSubmit={onSumbit}>
      <h1 className="title">Login you account</h1>
      {errors && <div className="alert">
        {Object.keys(errors).map(key=>(
          <p className="alert-text" key={key}>{errors[key][0]}</p>
        ))}
      </div>
      }
      <input ref={emailRef} type="email" placeholder="email"/>
      <input ref={passwordRef} type="password" placeholder="Password"/>
      <button className="btn btn-block">Login</button>
      <p className="message">
        Not register? <Link to='/register'>Create account</Link>
      </p>
    </form>
  )
}

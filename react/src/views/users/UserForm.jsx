import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

export default function UserForm() {
  const navigator=useNavigate();
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const {notification,setNotification}=useStateContext();
  const [user, setUser] = useState({
    id: null,
    firstName: '',
    lastName: '',
    password: '',
    password_confirmation: '',
  })
  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setUser(data);
          setLoading(false)
        })
        .catch(err => {
         setLoading(false)
        })
    }, []);
  }

  const onSubmit=(e)=>{
    e.preventDefault();
    if(user.id){
      axiosClient.put(`/users/${user.id}`,user)
        .then(()=>{
        setNotification('Pomyślnie zaktualizowano uzytkownika')
        navigator('/users');
        }).catch(err=>{
        const response=err.response;
        if(response && response.status===422){
          console.log(err);
          setErrors(response.data.errors)
        }
      })
    }else{
      axiosClient.post(`/users`,user)
        .then(()=>{
          setNotification('Pomyślnie dodano uzytkownika')
          navigator('/users');
        }).catch(err=>{
        const response=err.response;
        if(response && response.status===422){
          setErrors(response.data.errors)
        }
      })
    }
  }


  return (
    <>
      <h1>{user.id ? 'Edytuj użytkownika' : 'Dodaj użytkownika'}</h1>
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Ładowanie danych
          </div>)}
        {errors && <div className="alert">
          {Object.keys(errors).map(key => (
            <p className="alert-text" key={key}>{errors[key][0]}</p>
          ))}
        </div>
        }
        {!loading &&
          <form onSubmit={onSubmit}>
            <input value={user.firstName}  onChange={e=>setUser({...user,firstName:e.target.value})}    type="text" autoComplete="off" placeholder="Imie"/>
            <input value={user.lastName} onChange={e=>setUser({...user,lastName:e.target.value})}   type="text" autoComplete="off" placeholder="Nazwisko"/>
            <input value={user.email}   onChange={e=>setUser({...user,email:e.target.value})} type="email" autoComplete="off" placeholder="Email"/>
            <input onChange={e=>setUser({...user,password:e.target.value})}  type="password" placeholder="Hasło" autoComplete="off"/>
            <input onChange={e=>setUser({...user,password_confirmation:e.target.value})}   type="password" placeholder="powtórz hasło" autoComplete="off"/>
            <button className="btn">{user.id ? 'Edytuj' : 'Dodaj'}</button>
          </form>
        }
      </div>
    </>
  )
}

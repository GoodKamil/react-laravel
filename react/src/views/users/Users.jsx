import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification}=useStateContext()

  useEffect(() => {
    getUsers()
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({data}) => {
        console.log(data.data)
        setUsers(data.data)
        setLoading(false)
      }).catch(err => {
      setLoading(false)
    })
  }

  const onDelete = (u) => {
    if (!window.confirm("Jestes pewny że chcesz usunąć użytkownika")) {
      return;
    }

    axiosClient.delete(`/users/${u.id}`)
      .then(() => {
        setNotification('Pomyślnie usunięto użytkownika');
        getUsers()
      })
      .catch(err => {
        console.log(err);
      })

  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Użytkownicy</h1>
        <Link to="/users/new" className="btn-add">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Imie</th>
            <th>Nazwisko</th>
            <th>Email</th>
            <th>Akcje</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">Ładowanie danych...</td>
            </tr>
            </tbody>}
          {!loading &&
            <tbody>
            {users.map(user => (
              <tr>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <Link className="btn-edit" to={`/users/${user.id}`}>Edit</Link>
                  &nbsp;
                  <button onClick={e => onDelete(user)} className="btn-delete">Usuń</button>
                </td>
              </tr>
            ))}
            </tbody>}
        </table>
      </div>
    </div>
  )
}

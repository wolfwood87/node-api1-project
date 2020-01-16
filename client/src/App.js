import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './Components/UserList';
import axios from 'axios';

function App() {
  const [newForm, setNewForm] = useState(false);
  const [newUser, setNewUser] = useState({name: '', bio: ''})


  const handleNewUser = e => {
    e.preventDefault();
    setNewForm(true);
  }

  const handleChange = e => {
    e.preventDefault();
    setNewUser({
        ...newUser,
        [e.target.name]: e.target.value
    })
  }
  const submitNewUser = e => {
    e.preventDefault();
    axios
        .post(`http://localhost:5000/api/users/`, newUser)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err)
        })
}
  return (
    <div className="App">
      {newForm && 
            <div>
                <input
                    type='text'
                    name="name"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={handleChange}
                    />
                <input
                    type='text'
                    name="bio"
                    placeholder="Bio"
                    value={newUser.bio}
                    onChange={handleChange}
                    />
                <button onClick={submitNewUser}>Submit</button>
            </div>
            }
      {!newForm && 
        <button onClick={handleNewUser}>Add User</button>
      }
      <UserList />
    </div>
  );
}

export default App;

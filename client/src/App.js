import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './Components/UserList';
import axios from 'axios';

function App() {
  const [newForm, setNewForm] = useState(false);
  const [newUser, setNewUser] = useState({name: '', bio: ''})
  
  //styles
  const formBack = {
    border: '4px solid black',
    width: '50%',
    margin: '2% auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#C8634E',
    color: 'white'
  }

  const formHead = {
    fontSize: '1.5rem',
    textAlign: 'center',
    backgroundColor: '#C8634E',
    border: 'none',
    width: '100%',
    color: 'white'
  }
  const formText = {
    fontSize: '1rem',
    textAlign: 'center',
    backgroundColor: '#C8634E',
    border: 'none',
    width: '100%',
    paddingTop: '1%',
    paddingBottom: '1%',
    color: 'white'
  }
  const formButton = {
    backgroundColor: 'darkred',
    width: '7rem',
    padding: '.25%',
    color: 'white',
    margin: '.5% auto',
    marginBottom: '.5%',
    color: 'white'
  }


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
            <div style={formBack}>
                <input
                    type='text'
                    name="name"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={handleChange}
                    style={formHead}
                    />
                <input
                    type='text'
                    name="bio"
                    placeholder="Bio"
                    value={newUser.bio}
                    onChange={handleChange}
                    style={formText}
                    />
                <button onClick={submitNewUser} style={formButton}>Submit</button>
            </div>
            }
      {!newForm && 
        <button onClick={handleNewUser} style={formButton}>Add User</button>
      }
      <UserList />
    </div>
  );
}

export default App;

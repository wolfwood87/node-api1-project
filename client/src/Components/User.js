import React, {useState} from 'react';
import axios from 'axios';

const User = props => {
    const [form, setForm] = useState(false)
    const [user, setUser] = useState({name: props.name, bio: props.bio})
    const deleteUser = e => {
        e.preventDefault();
        axios
            .delete(`http://localhost:5000/api/users/${props.id}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            })
    }
    const editUser = e => {
        e.preventDefault();
        setForm(true)
    }

    const handleChange = e => {
        e.preventDefault();
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const submitUser = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/users/${props.id}`, user)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <>
            {form && 
            <div>
                <input
                    type='text'
                    name="name"
                    placeholder="Name"
                    value={user.name}
                    onChange={handleChange}
                    />
                <input
                    type='text'
                    name="bio"
                    placeholder="Bio"
                    value={user.bio}
                    onChange={handleChange}
                    />
                <button onClick={submitUser}>Submit</button>
            </div>
            }
            {!form && 
            <div>
                <h1>{props.name}</h1>
                <p>Bio: {props.bio}</p>
            </div>
            }
            <button onClick={deleteUser}>Delete User</button>
            <button onClick={editUser}>Edit User</button>
        </>
    )
}

export default User;
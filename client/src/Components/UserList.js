import React, {useState, useEffect} from 'react';
import axios from 'axios';
import User from './User.js';

const UserList = () => {
    const [users, setUsers] = useState([{}]);

    useEffect(() => {
        axios
        .get("http://localhost:5000/api/users")
        .then(res => {
            console.log(res)
            setUsers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    return (
        <>
            {users.map(user => (
                <User
                    name={user.name}
                    bio={user.bio}
                    key={user.id}
                    id={user.id}
                    
                    />
                ))}
        </>
    )
}
export default UserList
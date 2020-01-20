import React, {useState} from 'react';
import axios from 'axios';

const User = props => {
    const [form, setForm] = useState(false)
    const [user, setUser] = useState({name: props.name, bio: props.bio})

    //styles
    const backStyle = {
        border: '4px solid black',
        width: '50%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'darkred',
        color: 'white'
    }
    const formBack = {
        border: '4px solid black',
        width: '50%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#C8634E',
        color: 'white'
    }
    const headStyle = {
        fontSize: '1.5rem',
        margin: '0 auto',
    }
    const formHead = {
        fontSize: '1.5rem',
        textAlign: 'center',
        backgroundColor: '#C8634E',
        border: 'none',
        width: '100%'
    }
    const textStyle ={
        fontSize: '1rem',
        margin: '1%'
    }
    const formText = {
        fontSize: '1rem',
        textAlign: 'center',
        backgroundColor: '#C8634E',
        border: 'none',
        width: '100%',
        paddingTop: '1%',
        paddingBottom: '1%'
    }
    const button = {
        backgroundColor: 'darkred',
        width: '7rem',
        padding: '.25%',
        color: 'white',
        margin: '.5%',
        marginBottom: '2%',
        color: 'white'
    }
    const formButton = {
        backgroundColor: 'darkred',
        width: '7rem',
        padding: '.25%',
        color: 'white',
        margin: '0 auto',
        marginBottom: '.5%',
        color: 'white'
    }
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
            <div style={formBack}>
                <input
                    type='text'
                    name="name"
                    placeholder="Name"
                    value={user.name}
                    onChange={handleChange}
                    style={formHead}
                    />
                <input
                    type='text'
                    name="bio"
                    placeholder="Bio"
                    value={user.bio}
                    onChange={handleChange}
                    style={formText}
                    />
                <button onClick={submitUser} style={formButton}>Submit</button>
            </div>
            }
            {!form && 
            <div style={backStyle}>
                <h1 style={headStyle}>{props.name}</h1>
                <p style={textStyle}>Bio: {props.bio}</p>
            </div>
            }
            <button onClick={deleteUser} style={button}>Delete User</button>
            <button onClick={editUser} style={button}>Edit User</button>
        </>
    )
}

export default User;
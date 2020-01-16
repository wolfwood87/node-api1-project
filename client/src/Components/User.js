import React from 'react';

const User = props => {
    return (
        <>
            <h1>{props.name}</h1>
            <p>Bio: {props.bio}</p>
        </>
    )
}

export default User;
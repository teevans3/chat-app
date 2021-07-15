import React, {useState} from 'react'
import styled from 'styled-components';
import openSocket from 'socket.io-client';


const CreateAccount = (props) => {
    const [username, setUsername] = useState('')
    const [error, setError] = useState(false);

    const createUser = () => {
        // add user to database, update user state, and add to localstorage
        const socket = openSocket('http://localhost:8080');
        socket.emit('new user', {username: username});

        // make sure username does not already exist
        socket.on('username taken', () => {
            setError(true);
        })
        socket.on('user created', data => {
            localStorage.setItem('username', username);
            props.setUser(data.user);
        })
    }

    return (
        
        <CreateAccountContainer>
            {error ? <div>Username taken!</div> : null}
            <CreateLabel for="username">What's your name?</CreateLabel>
            <UsernameInput type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}></UsernameInput>
            <CreateButton onClick={() => createUser()}>Join</CreateButton>
        </CreateAccountContainer>
    )
}

export default CreateAccount;

const CreateAccountContainer = styled.div`
    width: 100%;
    height: calc(100vh - 6rem);
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
`

const CreateLabel = styled.label`
    font-size: 1rem;
    margin: auto;
    margin: 2rem auto;
`

const UsernameInput = styled.input`
    width: 20rem;
    margin: 2rem auto;
    height: 2rem;
    border-radius: 24px;
`

const CreateButton = styled.button`
    width: 6rem;
    margin: 2rem auto;
    height: 2rem;
    border-radius: 24px;
`
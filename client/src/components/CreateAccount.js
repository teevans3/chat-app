import React, {useState} from 'react'
import styled, {css, keyframes} from 'styled-components';
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
        <CreateAccountContainer darkMode={props.darkMode}>
            {error ? <UsernameTaken>Username taken!</UsernameTaken> : null}
            <CreateLabel for="username">What's your name?</CreateLabel>
            <UsernameInput type="text" id="username" value={username} autoComplete="off" error={error} onChange={(e) => setUsername(e.target.value)}></UsernameInput>
            <CreateButton onClick={() => createUser()}>Join</CreateButton>
        </CreateAccountContainer>
    )
}

export default CreateAccount;

const CreateAccountContainer = styled.div`
    color: ${props => props.darkMode ? 'white' : 'black'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: auto;
`

const UsernameTaken = styled.div`
    position: absolute;
    color: red;
    top: 25%;
`

const CreateLabel = styled.label`
    font-size: 2rem;
`

const growError = keyframes`
    0% {
        background-color: red;
        border: 0.01rem solid red;
    }
    100% {
        background-color: white;
        border: 0.01rem solid red;
    }
`

const UsernameInput = styled.input`
    width: 22rem;
    height: 3rem;
    border-radius: 24px;
    box-sizing: border-box;
    margin: 2rem 0 1rem 0;
    padding: 0 1rem;
    border: ${props => props.error ? '0.01rem solid red;' : 'none;'};
    font-size: 1.4rem;
    outline: none;

    animation: ${props => props.error ? css`${growError} 2s ease-out;` : 'none;'}
`

const CreateButton = styled.button`
    width: 22rem;
    height: 3rem;
    border-radius: 24px;
    border: none;
    color: white;
    font-size: 1.4rem;
    background: linear-gradient(to right, #59C173, #a17fe0, #5D26C1);

    &:hover {
        cursor: pointer;
        border: 0.01rem solid white;
    }

`
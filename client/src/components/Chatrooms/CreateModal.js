import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import openSocket from 'socket.io-client';


const CreateModal = (props) => {
    const [roomName, setRoomName] = useState('');    

    const createNewRoomHandler = () => {
        const socket = openSocket('http://localhost:8080');
        socket.emit('new room', {roomName: roomName})

        props.setDisplayCreateModal(false);
    }

    return (
        <CreateModalContainer>
            <p style={{textAlign: 'center'}}>Create a new room.</p>
            <NewRoomName type="text" onChange={(e) => setRoomName(e.target.value)} />
            <CreateButton onClick={() => createNewRoomHandler()}>Create</CreateButton>
        </CreateModalContainer>
    )
}

export default CreateModal;

const CreateModalContainer = styled.div`
    position: absolute;
    margin: auto;
    height: 10rem;
    width: 20rem;
    background-color: red;
    display: flex;
    flex-direction: column;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    top: 50%;
`

const NewRoomName = styled.input`
    width: 80%;
    border-radius: 24px;
    margin: 1rem auto;
    height: 2rem;
`

const CreateButton = styled.button`
    width: 30%;
    margin: auto;
    border-radius: 24px;
    height: 2rem;
`
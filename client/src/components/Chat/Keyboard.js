import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import openSocket from 'socket.io-client';

const Keyboard = (props) => {
    const [message, setMessage] = useState('');

    const sendMessageHandler = () => {
        // don't let user send empty messages
        if ((message.length < 1) || (message.trim().length < 1)) {
            return;
        }
        const socket = openSocket('http://localhost:8080');
        socket.emit('new message', {
            text: message,
            userId: props.user.id,
            roomId: props.activeRoom.id,
            time: new Date().toISOString().slice(0, 19).replace('T', ' '),
            username: props.user.username
        });
        setMessage('');
    }

    return (
        <KeyboardContainer>
            <KeyboardDiv>
                <KeyboardInput darkMode={props.darkMode} type="textarea" value={message} onChange={(e) => setMessage(e.target.value)} />
            </KeyboardDiv>
            <SendDiv>
                <SendButton onClick={() => sendMessageHandler()}><i className="fas fa-arrow-up fa-2x"></i></SendButton>
            </SendDiv>
        </KeyboardContainer>
    )
}

export default Keyboard;

const KeyboardContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 4rem;
    border-left: none;
    border-top: none;
    display: flex;
    padding: 0 1rem;
`

const KeyboardDiv = styled.div`
    height: 100%;
    width: 100%;
    padding-right: 1rem;
`
const SendDiv = styled.div`
    height: 100%;
    bottom: 0;
    width: 4rem;
`

const KeyboardInput = styled.input`
    height: 100%;
    border-radius: 50px;
    font-size: 24px;
    box-sizing: border-box;
    border: 1px solid gray;
    color: ${props => props.darkMode ? 'white' : 'black'};
    width: 100%;
    padding: 0 1.5rem;
    background-color: ${props => props.darkMode ? 'black' : 'white'};
`

const SendButton = styled.button`
    height: 4rem;
    box-sizing: border-box;
    border-radius: 60px;
    width: 100%;
    border: none;
    background-color: #147efb;
    color: white;
    font-size: 1rem;

    &:hover {
        cursor: pointer;
        border: 0.01rem solid white;
    }
`

import React, {useState} from 'react'
import styled from 'styled-components';

import Room from './Room';

const Chatrooms = (props) => {

    return (
        <ChatroomsContainer>
            <RoomsContainer>
                {props.chatrooms.map(room => {
                    return <Room room={room} setActiveRoom={props.setActiveRoom} activeRoom={props.activeRoom} darkMode={props.darkMode}/>
                })}
            </RoomsContainer>
            <CreateContainer onClick={props.setDisplayCreateModal} darkMode={props.darkMode}>
                Create new room
            </CreateContainer>
        </ChatroomsContainer>
    )
}

export default Chatrooms;

/* min-height: calc(100vh - 6rem); */
const ChatroomsContainer = styled.div`
    box-sizing: border-box;
    height: 46rem;
    width: 10rem;
    display: flex;
    flex-direction: column;
    position: relative;
`

/*     height: calc(100% - 6rem); */
const RoomsContainer = styled.div`
    max-height: calc(100% - 4rem);
    overflow: scroll;
`

const CreateContainer = styled.button`
    box-sizing: border-box;
    width: 100%;
    height: 4rem;
    margin-top: auto;
    border: none;
    background: ${(props) => (
        props.darkMode ?
        'linear-gradient(to bottom right, black 60%, gray)' :
        'linear-gradient(to bottom right, white 60%, gray)'
    )};
    color: ${props => props.darkMode ? 'white' : 'black'};

    &:hover {
        cursor: pointer;
    }
`

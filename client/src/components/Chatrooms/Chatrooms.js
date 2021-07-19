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
                Create Room
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

    @media (max-width: 80rem) {
        flex-direction: row;
        width: 100% !important;
        height: 4rem !important;
    }
`

/*     height: calc(100% - 6rem); */
const RoomsContainer = styled.div`
    max-height: calc(100% - 4rem);
    overflow: scroll;
    
    @media (max-width: 80rem) {
        display: flex;
        flex-direction: row;
        max-height: 4rem;
        width: 80%;
    }
`

const CreateContainer = styled.button`
    box-sizing: border-box;
    width: 100%;
    height: 4rem;
    margin-top: auto;
    box-shadow: 0.01rem 0.01rem 0.2rem 0.2rem ${props => props.darkMode ? '#141414' : '#f4f4f4'} inset;
    border: none;
    font-size: 1rem;
    background-color: ${props => props.darkMode ? 'black' : 'white'};
    color: ${props => props.darkMode ? 'white' : 'black'};

    &:hover {
        cursor: pointer;
    }

    @media (max-width: 80rem) {
        width: 20%;
        margin-top: none;
    }
`

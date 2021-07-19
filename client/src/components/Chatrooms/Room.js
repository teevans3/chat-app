import React, {useEffect} from 'react'
import styled from 'styled-components'

const Room = (props) => {
    useEffect(() => {
        console.log(props.darkMode);
    }, [props.darkMode])
    return (
        <RoomContainer
            active={props.activeRoom.name === props.room.name ? true : false}
            onClick={() => props.setActiveRoom(props.room)}
            darkMode={props.darkMode}
        >
            {props.room.name}
        </RoomContainer>
    )
};

export default Room;

const RoomContainer = styled.div`
    width: 100%;
    height: 4rem;
    box-sizing: border-box;
    border-bottom: ${props => props.darkMode ? '0.01rem solid black' : '0.01rem solid white'};
    background: ${(props) => (
        (props.active) ?
        'linear-gradient(to right, #59C173, #a17fe0, #5D26C1);' :
        'none;'
        )};
    color: ${props => props.active ? 'white' : 'gray'};
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 80rem) {
        width: auto;
        padding: 1rem 2rem;
        border-bottom: none;
        margin: 0;
        border-right: ${props => props.darkMode ? '0.01rem solid black' : '0.01rem solid white'};
    }
`
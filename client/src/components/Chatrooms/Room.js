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
    background-color: ${(props) => (
        (props.darkMode && props.active) ?
        'black;' :
        (!props.darkMode && props.active) ?
        'white;' : 
        'none;'
        )};
    color: ${props => props.active ? 'gray' : 'gray'};
    display: flex;
    align-items: center;
    justify-content: center;

`
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import Keyboard from './Keyboard';


const Chat = (props) => {
    const [roomMessages, setRoomMessages] = useState([]);

    // filter out messages to specific room
    useEffect(() => {
        setRoomMessages(props.messages.filter(msg => msg.roomId === props.activeRoom.id))
    }, [props]);

    // convert ISO date string to a nice display
    const convertDate = (dateString) => {
        const date = new Date(dateString);

        let hours = date.getHours();
        let meridiem = 'am';
        if (hours > 12) {
            hours = hours - 12;
            meridiem = 'pm';
        }

        let minutes = date.getMinutes();
        if (parseInt(minutes) < 10) {
            minutes = `0${minutes}`
        }
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${hours}:${minutes}${meridiem}`;
    }

    return (
        <ChatContainer>
            <ChatArea>
                {roomMessages.map((msg, index) => {
                        console.log(msg.time);
                        if (!roomMessages[index + 1]) {
                            return (
                                <MessageDiv>
                                    <SenderInfo display={true} myMessage={msg.userId === props.user.id ? true : false}>
                                        {msg.username} | {convertDate(msg.time)}
                                    </SenderInfo>
                                    {msg.userId === props.user.id ? 
                                        <MyMessage>{msg.text}</MyMessage>
                                    :   <TheirMessage>{msg.text}</TheirMessage>
                                    }
                                </MessageDiv>
                            )
                        }
                        return (
                            <MessageDiv>
                                {/* dont display sender info in any consecutive messages! (only first) */}
                                <SenderInfo
                                    myMessage={msg.userId === props.user.id ? true : false}
                                    display={
                                        (index !== index.length) &&
                                        (msg.userId === roomMessages[index + 1].userId)
                                        ? false : true
                                    }
                                >
                                    {msg.username} | {convertDate(msg.time)}
                                </SenderInfo>
                                {msg.userId === props.user.id ? 
                                    <MyMessage>{msg.text}</MyMessage>
                                :   <TheirMessage>{msg.text}</TheirMessage>
                                }
                            </MessageDiv>
                        )
                })}
            </ChatArea>
            <Keyboard
                darkMode={props.darkMode}
                messages={props.messages}
                setMessages={props.setMessages}
                activeRoom={props.activeRoom}
                user={props.user}
            />
        </ChatContainer>
    )
}

export default Chat;

const ChatContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    border-radius: 60px;
`


/*     height: calc(100% - 6rem); */
const ChatArea = styled.div`
    height: 40rem;
    overflow: auto;
    width: 100%;
    box-sizing: border-box;
    border-left: none;
    color: white;
    margin-bottom: 1rem;  
    display: flex;
    flex-direction: column-reverse;
 
`

const MessageDiv = styled.div`
    display: flex;
    margin: 0.2rem 2rem;
    flex-direction: column;
`

const SenderInfo = styled.p`
    padding: 0;
    margin: 0;
    color: gray;
    font-size: 0.8rem;
    align-self: ${props => props.myMessage ? 'flex-end' : 'flex-start'};
    display: ${props => props.display ? 'flex' : 'none'}
`

const MyMessage = styled.div`
    margin-left: auto;
    background-color: #147efb;
    padding: 0.7rem;
    border-radius: 24px;
    max-width: 70%;
`

const TheirMessage = styled.div`
    width: auto;
    background-color: #333333;
    padding: 0.7rem;
    border-radius: 24px;
    margin-right: auto;
    max-width: 70%;
`

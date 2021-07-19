import React, {useState, useEffect} from 'react'
import openSocket from 'socket.io-client';
import styled from 'styled-components';
import Split from 'react-split';

import './App.css';
import Layout from './components/Layout';
import CreateAccount from './components/CreateAccount';
import Chatrooms from './components/Chatrooms/Chatrooms';
import Chat from './components/Chat/Chat';
import CreateModal from './components/Chatrooms/CreateModal';

// ADD LOADING COMPONENT

function App(props) {
  const [user, setUser] = useState(null);
  const [activeRoom, setActiveRoom] = useState();
  const [messages, setMessages] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const [displayCreateModal, setDisplayCreateModal] = useState(false);

  useEffect(() => {
    const socket = openSocket('http://localhost:8080');

    // retrieve user info, if they have been here before
    socket.emit('initialize', {
      username: localStorage.getItem('username')
    })

    // retrieve and set chatrooms from server
    socket.on('initialize', data => {
        setUser(data.user);
        setActiveRoom(data.rooms[0]);
        setChatrooms(data.rooms);
        setMessages(data.messages);
    })

    // listen for newly created rooms
    socket.on('new room', data => {
        setChatrooms(data.rooms);
    })

    // listen for newly created messages
    socket.on('new message', data => {
        setMessages(data.messages);
    })

  }, [])


  return (
    <Layout darkMode={darkMode}>
      <ModeContainer onClick={() => setDarkMode(!darkMode)} darkMode={darkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
      </ModeContainer>
      <AppContainer darkMode={darkMode}>
        {!user ? 
          <CreateAccount setUser={setUser} darkMode={darkMode} />
        :
          <>
            <SplitContainer direction={(window.screen.width > 1280) ? 'horizontal' : 'vertical'} sizes={[15, 85]} minSize={[140, 800]} gutterSize={4} darkMode={darkMode}>
              <Chatrooms
                darkMode={darkMode}
                chatrooms={chatrooms}
                setActiveRoom={setActiveRoom}
                activeRoom={activeRoom}
                setDisplayCreateModal={() => {setDisplayCreateModal(!displayCreateModal)}}
              />
              <Chat
                darkMode={darkMode}
                activeRoom={activeRoom}
                messages={messages}
                user={user}
              />
            </SplitContainer>
            {displayCreateModal ?
            <CreateModal
              setChatrooms={setChatrooms}
              chatrooms={chatrooms}
              setDisplayCreateModal={setDisplayCreateModal}
            /> : null}
          </>
        }
        
      </AppContainer>
    </Layout>
  );
}

export default App;

const ModeContainer = styled.button`
  position: absolute;
  z-index: 1;
  top: 2%;
  left: 4%;
  width: 6rem;
  height: 3rem;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.darkMode ? 'rgba(152, 255, 204, 1);' : 'rgba(80, 0, 0, 1);'};
  color: ${(props => props.darkMode ? 'black' : 'white')};
  border-radius: 12px;

  &:hover {
    cursor: pointer;
  }
`

const AppContainer = styled.div`
  box-sizing: border-box;
  border-radius: 20px;
  overflow: hidden;
  width: 80rem;
  height: 46rem;
  margin: auto;
  position: relative;
  background: ${(props) => (props.darkMode
    ? 'linear-gradient(to right bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2));'
    : 'linear-gradient(to right bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.2));'
  )};
  border: ${(props => (props.darkMode ? '0.01rem solid black' : '0.01rem solid white'))};
  backdrop-filter: blur(0.5rem);
  z-index: 1;

  @media(max-width: 80rem) {
    width: 80%;
    display: flex;
    flex-direction: column;
  }
`

const SplitContainer = styled(Split)`
  display: flex;
  width: 100%;

  & .gutter {
    background-color: ${(props => (props.darkMode ? 'black' : 'white'))};

    &:hover {
      cursor: col-resize;
    }
  }

  @media (max-width: 80rem) {
    flex-direction: column;
  }
`
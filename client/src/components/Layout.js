import React, {useState} from 'react'
import styled from 'styled-components'

const Layout = (props) => {
    return (
        <LayoutContainer darkMode={props.darkMode}>
            {props.children}
            <CircleOne darkMode={props.darkMode}/>
            <CircleTwo darkMode={props.darkMode}/>
        </LayoutContainer>
    )
}

export default Layout;


const LayoutContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    background: ${props => (props.darkMode ?
        'linear-gradient(to right top, rgba(40, 0, 0, 1), rgba(18, 14, 32, 1));' :
        'linear-gradient(to right top, rgba(89, 255, 255, 1), rgba(152, 255, 204, 1));'
        )};
`

const CircleOne = styled.div`
    height: ${props => (props.darkMode ? '38rem' : '26rem')};
    width: ${props => (props.darkMode ? '38rem' : '26rem')};
    position: absolute;
    top: ${props => (props.darkMode ? '2%' : '7%')}; 
    left: ${props => (props.darkMode ? '7%' : '2%')};
    z-index: 0;
    background: ${props => (props.darkMode ?
        'linear-gradient(to bottom, rgba(122, 108, 93, 1) 20%, rgba(247, 244, 234, 0.8))' :
        'linear-gradient(to right top, rgba(55, 57, 58, 1), rgba(191, 182, 187, 0.5))'
        )};
    border-radius: 50%;
    transition: ease-out 1.5s;
`

const CircleTwo = styled.div`
    height: ${props => (props.darkMode ? '26rem' : '38rem')};
    width: ${props => (props.darkMode ? '26rem' : '38rem')};
    position: absolute;
    bottom: ${props => (props.darkMode ? '7%' : '2%')}; 
    right: ${props => (props.darkMode ? '2%' : '7%')}; 
    z-index: 0;
    border-radius: 50%;
    background: ${props => (props.darkMode ?
        'linear-gradient(to left bottom, rgba(122, 108, 93, 1), rgba(247, 244, 234, 0.8))':
        'linear-gradient(to top left, rgba(55, 57, 58, 1), rgba(191, 182, 187, 0.5) 80%)'
    )};
    transition: ease-out 1.5s;

`
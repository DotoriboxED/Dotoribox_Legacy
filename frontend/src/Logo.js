import logo from './image/logo.png';
import './App.css';
import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  height: 3rem;
  justify-content: center;
  margin:auto;
`;
const Header= styled.div`
  width:100%;
  height: 3rem;
  border: solid 0.5px #707070;
  background-color: #DC6E3F;
  text-align : center;
`

function App() {
  return (
    <Header>
      <Image src={logo} className="logo" />
    </Header>
  );
}

export default App;

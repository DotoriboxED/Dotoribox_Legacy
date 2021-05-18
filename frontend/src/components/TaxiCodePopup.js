import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useHistory} from "react-router-dom";
import styled from 'styled-components';

const Button=styled.button`
  width: 80%;
  height: 2.206rem;
  margin: 1.281rem 0.063rem 0 0;
  padding: 0.406rem 4.063rem 0.406rem 4.156rem;
  background-color: #e7713f;
  font-family: SpoqaHanSansNeo;
  font-size: 0.406rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.46;
  letter-spacing: -0.07px;
  color: #ffffff;
  `

const Background = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
`

const Popup = styled.div`
    width: 335px;
    height: 260px;
    background-color: white;
    position: relative;
    box-sizing: border-box;
    margin: 30px auto;
    padding: 20px;
    background: #fff; 
    border: 1px solid #e7713f
`

const Tag=styled.p`
    font-family: SpoqaHanSansNeo;
    font-size: 0.7rem;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: -0.05px;
    color: #434040;
    margin:auto;

    padding-top:0.5rem;
    padding-bottom:0.5rem;
`

const Title=styled.div`
    &:before, &:after {
        content: "";
        flex-grow: 1;
        background: rgba(0, 0, 0, 0.35);
        height: 1px;
        font-size: 0px;
        line-height: 0px;
        margin: 0px 16px;
    }
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(0, 0, 0, 1);
    font-size: 18px;
    font-weight: bold;
    margin: 1em 0em;
`

function App(props) {
    return (
        <div>
            {
                !props.isExist && (
                    <Background>
                        <Popup>
                            <Title>오류</Title>
                            <Tag>입력하신 Taxi Code를 가진<br/>Taxi가 존재하지 않습니다.</Tag>
                            <Button onClick={() => {props.setIsExist(true)}}>확인했습니다</Button>
                        </Popup>
                    </Background>
                )
            }
        </div>
    )
}

export default App;
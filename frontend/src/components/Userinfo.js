import logo from '../image/logo.png';
import React from 'react';
import styled from 'styled-components';
import { useHistory} from "react-router-dom";

const Black = styled.div`
  background-color: black;
  height: 5rem;
  justify-content: center;
  margin:auto;
  vertical-align:middle;
`;
const Under= styled.div`
  width:100%;
  border: solid 0.5px #707070;
  background-color: white;
  text-align : center;
`
const Name=styled.p`
  color:white;
  font-size:1rem;
  margin:auto;
  text-align:center;
`
const Button=styled.button`
  width: 80%;
  height: 1.406rem;
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
const Tag=styled.p`
  font-family: SpoqaHanSansNeo;
  font-size: 0.7rem;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.05px;
  color: #a3a0a0;
  margin:auto;

  padding-top:0.5rem;
  padding-bottom:0.5rem;
`

const Title=styled.p`
  font-family: SpoqaHanSansNeo;
  font-size: 2rem;
  font-weight: 100;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.49;
  letter-spacing: 0.53px;
  color: black;
  margin:auto;
  padding-top:4rem;
`
const Image=styled.img`
  width: 5.125rem;
  height: 5.313rem;
`
const Price=styled.p`
  font-family: SpoqaHanSansNeo;
  font-size: 2rem;
  font-weight: 100;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.49;
  letter-spacing: 0.53px;
  color: black;
  margin:auto;
  padding-top:4rem;
`
function App() {
  const history = useHistory();

  return (
    <div>
      <Black>
        <Name>sample name</Name>
      </Black>
      <Under>
        <Title>샘플 이름</Title>
        <Image src={logo}></Image>
        <Tag>샘플 설명</Tag>
        <Button onClick={() => {history.push("/review")}}>샘플 가져가기</Button>
      </Under>
    </div>
  );
}

export default App;

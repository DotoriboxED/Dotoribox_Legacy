
import React ,{useState} from 'react';
import { useHistory} from "react-router-dom";
import styled from 'styled-components';



const Upper= styled.div`
  width:100%;
  height:30%;
  justify-content: center;
  margin:auto;
  text-align: left;
  `
const Under= styled.div`
  
  width:100%;
  height:70%;
  margin:auto;
  background-size:cover;
  background-repeat : no-repeat;
  background-position: center;
  `
const Header= styled.div`
  background-color:black;
  width:100%;
  height:45rem;
  text-align : center;
`
const Title1=styled.p`
  font-family: SpoqaHanSansNeo;
  font-size: 3rem;
  font-weight: 100;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.49;
  letter-spacing: 0.53px;
  text-align: left;
  color: #ffffff;
  margin:auto;
  margin-left:2rem;
  padding-top:4rem;
`
const Title2=styled.p`
  font-family: SpoqaHanSansNeo;
  font-size: 1rem;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.46;
  letter-spacing: -0.07px;
  text-align: left;
  color: #ffffff;
  margin:auto;
  margin-left:2rem;
  padding-top:0.5rem;
  
`

const Input=styled.input`
  margin:auto;
  margin-left:2rem;
  text-align: left;
  width: 40%;
  height: 1.188rem;
  padding: 0.313rem 9.25rem 0.313rem 0.5rem;
  border: solid 0.5px #a3a0a0;
  background-color:transparent;
  padding-top:0.5rem;
  color:#e7713f;
`
const Button=styled.button`
  width: 5rem;
  height: 2rem;
  margin: 0.625rem 7.938rem 0.281rem 0.531rem;
  background-color: #ffffff;
  margin-left:2rem;
  font-family: SpoqaHanSansNeo;
  font-size: 0.313rem;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.05px;
  padding-top:0.6rem;
`

const Hr=styled.hr`
  width: 80%;
  color: #e7713f;
  margin-top:0.9rem;
  
`


function Reviewpage() {
  const [Review, setReview] = useState("");
  const history = useHistory();
  
  return (
    <Header>
      <Upper>
        <Title1>Thank you</Title1>
        <Title2>기사님은 목적지 도착 후 하차할 때 샘플을 전달해주실 거에요.</Title2>
        <Title2>샘플과 함께 오늘도 좋은하루 되세요</Title2>
        <Hr></Hr>
        <Title2>도토리박스와 함께한 이동은 어떠셨나요?</Title2>
        <Title2>잠시 시간을 내어 알려주세요(선택)</Title2>
        <Input 
          placeholder="의견을 자유롭게 적어주세요" 
          placeholderTextColor="#a3a0a0"
          value={Review}
          onChange={({ target: {value}} )=>setReview(value)}
          ></Input>
        <br></br>
        <Button onClick={() => {history.push("/")}}>Enter</Button>
      </Upper>
      <Under >
      </Under>
    </Header>
  );
}

export default Reviewpage;

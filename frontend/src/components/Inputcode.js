import Background from '../image/background2.png';
import React ,{useState} from 'react';
import { useHistory} from "react-router-dom";
import styled from 'styled-components';

import { SampleApi } from '../api';
import Alert from './TaxiCodePopup';

const Upper= styled.div`
  width:100%;
  height:30%;
  justify-content: center;
  margin:auto;
  text-align: left;
  `
const Under= styled.div`
  background-image: url(${Background});
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
  height:calc(100vh - 3rem);
  text-align : center;
`
const Title1=styled.p`
  font-family: SpoqaHanSansNeo;
  font-size: 2.1rem;
  font-weight: 100;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.49;
  letter-spacing: 0.53px;
  text-align: left;
  color: #ffffff;
  margin:auto;
  margin-left:1rem;
  padding-top:4rem;
  
`
const Title2=styled.p`
  font-family: SpoqaHanSansNeo;
  font-size: 0.9rem;
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
  margin: 0em 1em 0em 1em;
  
`

const Title3=styled.p`
  font-family: SpoqaHanSansNeo;
  font-size: 0.7rem;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.46;
  letter-spacing: -0.07px;
  text-align: left;
  color: #ffffff;
  margin:auto;
  padding-top:0.5rem;
  margin: 0em 1em 2em 1.45em;
  
`

const Tag=styled.p`
  font-family: SpoqaHanSansNeo;
  font-size: 0.7rem;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.05px;
  text-align: left;
  color: #a3a0a0;
  margin:auto;
  margin-left:1rem;
  padding-top:2rem;
  padding-bottom:0.5rem;
`
const Input=styled.input`
  margin:auto;
  margin-left:1rem;
  margin-top:1rem;
  text-align: left;
  width: 20%;
  height: 2rem;
  font-size: 0.8rem;
  padding: 0.313rem 9.25rem 0.313rem 0.5rem;
  border: solid 0.5px #a3a0a0;
  background-color:transparent;
  padding-top:0.5rem;
  color:#e7713f;
`
const Button=styled.button`
  width: 5rem;
  height: 2rem;
  margin: 2rem 7.938rem 0.281rem 0.531rem;
  background-color: #ffffff;
  margin-left:1rem;
  font-family: SpoqaHanSansNeo;
  font-size: 0.313rem;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.05px;
`

const Hr=styled.hr`
  width: 90%;
  border-color: #a3a0a0;
  margin: 1em 1em 1em 1em;
  
`

const Space = styled.div`
  height: 1rem;
`

function Inputcode() {
  const [Code, setCode] = useState();
  const [isExist, setIsExist] = useState(true);
  const history = useHistory();
  
  return (
    <Header>
      <Upper>
        <Title1>dotoribox</Title1>
        <Title3>?????????????????? ?????? ????????? ????????? ???????????????</Title3>
        <Space />
        <Hr></Hr>
        <Title2>?????? ????????? ?????? ?????????????????????<br/>???????????? ????????? ???????????? ?????? ??? ???????????? ????????????</Title2>
        <Tag>QR?????? ??? 5?????? ????????? ??????????????????.</Tag>
        <Input 
          placeholder="CODE" 
          placeholderTextColor="#a3a0a0"
          value={Code}
          onChange={({ target: {value}} )=>setCode(value)}
          ></Input>
        <Button onClick={() => {
          SampleApi.taxiIsValid(parseInt(Code, 10), { isTaxiCode : true }).then((res) => {
            history.push({ pathname:'./selectsample', state:{Code: res.data.id}})
          }).catch((err) => {
            setIsExist(false);
          });
        }
        }>Enter</Button>
      </Upper>
      <Under >
      </Under>
      <Alert isExist={isExist} setIsExist={setIsExist} />
    </Header>
  );
}

export default Inputcode;

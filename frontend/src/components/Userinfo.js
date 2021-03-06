import logo from '../image/logo.png';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory} from "react-router-dom";
import Popup from './SubmitPopup';
import WarningPopup from './InvalidFormPopup';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import {useLocation} from 'react-router';
import {SampleApi, API_URL} from "../api"

const Black = styled.div`
  background-color: black;
  height: 3.25rem;
  justify-content: center;
  margin:auto;
  vertical-align:middle;
`;
const Under= styled.div`
  width:100%;
  background-color: white;
  text-align : center;
  
`
const Name=styled.div`
  color:white;
  font-size:1rem;
  margin: 0 0 0 0;
  text-align:center;
  background-color: black;
`
const ClickButton=styled.button`
  width: 90%;
  height: 2.5rem;

  
  background-color: #e7713f;
  font-family: SpoqaHanSansNeo;
  font-size: 0.806rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.46;
  letter-spacing: -0.07px;
  color: #ffffff;
  border:none;
  bottom:1.3rem;
  position:fixed;
  text-align:center;
  left: 1rem;
`
const Tag=styled.p`
  font-family: SpoqaHanSansNeo;
  font-size: 0.7rem;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.05px;
  color: #131010;
  margin:auto;
  margin-bottom: 0.5rem;

  padding-top:0.5rem;
  padding-bottom:2.1rem;
`

const Title=styled.p`
  font-family: SpoqaHanSansNeo;
  font-size: 1.3rem;
  font-weight: 100;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.49;
  letter-spacing: 0.53px;
  color: black;
  margin:auto;
  padding-top:3.3rem;
  padding-bottom: 4rem;
`
const Image=styled.img`
  width: 60%;
  margin-bottom: 2rem;
`
const Price= styled.div`
  font-family: SpoqaHanSansNeo;
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.44;
  letter-spacing: -0.05px;
  color: #0035ff;
  margin: auto;
  margin-bottom: 3rem;
`
const Body=styled.div`
  text-align: center;
  margin: auto;
`
const Section=styled.div`
  height:4rem;
  margin: auto;
  width:80%;
  text-align: center;
  vertical-align:middle;
`
const Column=styled.div`
  width:3rem;
  height:3rem;
  text-align: left;
  font-size: 0.9rem;
  margin: auto;
  float:left;
  color:#707070;
  border-right:1px solid #d3d3d3;
`

const Warning=styled.div`
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
    font-size: 12px;
    font-weight: bold;
    margin: 1em 0em;
    margin-bottom: 2rem;
`

const Border = styled.div`
    height: 4rem;
`

function App() {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isMale,setisMale] = useState();
  const [product,setproduct] = useState();
  const [age,setAge]=useState();
  const [body,setBody]=useState();
  const [man,setMan]=useState("white");
  const [woman,setWoman]=useState("white");
  const [image, setImage] = useState();
  const [isValid, setIsValid] = useState(true);
  const location = useLocation();
  const Code = location.state.Code;
  const Sample=location.state.Sample;

  const open = () => { setIsOpen(true); }
  const close = () => { setIsOpen(false); }
  const setFormValid = () => { setIsValid(true); }

  const checkIsValid = () => {
    if (isMale === undefined || age === undefined)
      setIsValid(false);
    else
      setIsOpen(true);
  }

  function getProduct(sample){
      SampleApi.getInfo(sample).then((res) => {
        console.log(res.data);
        setproduct(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }
  // function getImage(sample){
  //   console.log(sample);
  //   SampleApi.getInfoImage(sample).then(async (res) => {
  //     setImage(res.data);
  //   });
    
  // }

  useEffect(()=>{
    getProduct(Sample)
  },[])

  useEffect(() => {
    if (isMale === undefined) {
      setMan("white");
      setWoman("white");
    } else if (isMale === true){
      setMan("#e7713f");
      setWoman("white");
    } else {
      setMan("white");
      setWoman("#e7713f");
    }
  }, [isMale])
  
  function valueLabelFormat(value) {
    return `${value}???`;
  }
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setAge(newValue);
    setValue(newValue);
  };
  
  return (
    <Body>
      <Black>
      </Black>
      <Name>SAMPLE CART</Name>
      <Black>
      </Black>
      <Under>
        {
          product && <div>
            <Title><b>{product.sampleName}</b></Title>
            <Image src={ API_URL + '/api/sample/' + Sample + '/image'}/>
            <Tag>{product.explain}</Tag>
            <Price><b>{product.price}???</b></Price>
          </div>
        }

      <Warning>
        ?????? ????????? ?????? ????????? ?????????.
      </Warning>

      <Section>
        <Column>
          <p>??????</p>
        </Column>
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group" style={{width:"10rem",verticalAlign:"middle",textAlign:"center"}}>
          <Button onClick={()=>setisMale(true)} style={{background:`${man}`,color:"#d3d3d3",width:"7rem"}}>??????</Button>
          <Button onClick={()=>setisMale(false)} style={{background:`${woman}`,color:"#d3d3d3",width:"7rem"}}>??????</Button>

        </ButtonGroup>
      </Section>
      <Section>
        <Column>
          <p>?????????</p>
        </Column>
        <Slider style={{width:"10rem",margin:"auto",color:"#e7713f"}}
          value={value}
          min={0}
          step={10}
          max={100}
          scale={(x) => x }
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="nonisOpen-linear-slider"
        />
      </Section>
      <Border></Border>
        
        
      </Under>
      <ClickButton onClick={() => {checkIsValid()}}>?????? ????????????</ClickButton>
        <Popup isOpen={isOpen} close={close} code={Code} sample={Sample} gender={isMale} age={age}/>
        <WarningPopup isValid={isValid} setValid={setFormValid} message={<div>????????? ?????????<br/>?????? ?????? ?????????.</div>}/>
    </Body>
  );
}
export default App;

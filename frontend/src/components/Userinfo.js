import logo from '../image/logo.png';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory} from "react-router-dom";
import Popup from './SubmitPopup';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import {useLocation} from 'react-router';
import {SampleApi} from "../api"

const Black = styled.div`
  background-color: black;
  height: 5rem;
  justify-content: center;
  margin:auto;
  vertical-align:middle;
`;
const Under= styled.div`
  width:100%;
  background-color: white;
  text-align : center;
  
`
const Name=styled.p`
  color:white;
  font-size:1rem;
  margin:auto;
  text-align:center;
`
const ClickButton=styled.button`
  width: 80%;
  height: 1.406rem;

  
  background-color: #e7713f;
  font-family: SpoqaHanSansNeo;
  font-size: 0.406rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.46;
  letter-spacing: -0.07px;
  color: #ffffff;
  border:none;
  bottom:0;
  position:fixed;
  text-align:center;
  left:10%;
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
const Body=styled.div`
  text-align: center;
  margin: auto;
`
const Section=styled.div`
  text-align: center;
  height:4rem;
  margin: auto;
  width:80%;
  text-align:middle;
  margin-bottom:2rem;
  text-align: center;
  vertical-align:middle;
`
const Column=styled.div`
  width:3rem;
  height:3rem;
  text-align: center;
  margin: auto;
  float:left;
  color:#707070;
  border-right:1px solid #d3d3d3;

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
  const location = useLocation();
  const Code = location.state.Code;
  const Sample=location.state.Sample;

  const open = () => { setIsOpen(true); }
  const close = () => { setIsOpen(false); }
  
  useEffect(()=>{
    getProduct(Sample)
    getImage(Sample)
  },[])

  async function getProduct(sample){
    
    await SampleApi.getInfo(body,sample).then(async (res) => {
      console.log(res.data);
      setproduct(res.data);
    });
    
  }
  async function getImage(sample){
    
    await SampleApi.getInfoImage(sample).then(async (res) => {
      

    });
    
  }

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
    return `${value}대`;
  }
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setAge(newValue);
    setValue(newValue);
  };
  
  return (
    <Body>
      <Black>
        <Name>sample cart</Name>
      </Black>
      <Under>
        <Title>{product.sampleName}</Title>
        <Image src={logo}></Image>
        <Tag>{product.explain}</Tag>

      <Section>
        <Column>
          <p>성별</p>
        </Column>

        <ButtonGroup variant="text" color="primary" aria-label="text primary button group" style={{width:"10rem",verticalAlign:"middle",textAlign:"center"}}>
          <Button onClick={()=>setgender(true)} style={{background:`${man}`,color:"#d3d3d3",width:"7rem"}}>남성</Button>
          <Button onClick={()=>setgender(false)} style={{background:`${woman}`,color:"#d3d3d3",width:"7rem"}}>여성</Button>

        </ButtonGroup>
      </Section>

      <Section>
        <Column>
          <p>연령대</p>
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
          aria-labelledby="non-linear-slider"
        />
      </Section>
        
        
      </Under>
      <ClickButton onClick={() => {open()}}>샘플 가져가기</ClickButton>
        <Popup isOpen={isOpen} close={close} code={Code} sample={Sample} gender={isMale} age={age}/>
    </Body>
  );
}

export default App;

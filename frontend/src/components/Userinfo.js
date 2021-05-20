import logo from '../image/logo.png';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory} from "react-router-dom";
import Popup from './SubmitPopup';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';

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
const ClickButton=styled.button`
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
  border:none;
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
  height:3rem;
  margin: auto;
  width:80%;
  border:1px solid #d3d3d3;
  margin-bottom:1rem;
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
  const [man,setMan]=useState("white");
  const [woman,setWoman]=useState("white");

  const open = () => { setIsOpen(true); }
  const close = () => { setIsOpen(false); }

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
    setValue(newValue);
  };

  return (
    <Body>
      <Black>
        <Name>sample cart</Name>
      </Black>
      <Under>
        <Title>샘플 이름</Title>
        <Image src={logo}></Image>
        <Tag>샘플 설명</Tag>

      <Section>
        <Column>
          성별
        </Column>
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group" style={{width:"10rem"}}>
          <Button onClick={()=>setisMale(true)} style={{background:`${man}`,color:"#d3d3d3",width:"7rem"}}>남성</Button>
          <Button onClick={()=>setisMale(false)} style={{background:`${woman}`,color:"#d3d3d3",width:"7rem"}}>여성</Button>
        </ButtonGroup>
      </Section>

      <Section>
        <Column>
          연령대
        </Column>
        <Slider style={{width:"4rem",margin:"auto"}}
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
          style={{color:"#e7713f",width:"10rem"}}
        />
      </Section>
        <ClickButton onClick={() => {open()}}>샘플 가져가기</ClickButton>
        <Popup isOpen={isOpen} close={close} />
        
      </Under>
    </Body>
  );
}

export default App;

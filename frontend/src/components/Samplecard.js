import React,{useState} from 'react';
import styled from 'styled-components';

const Each= styled.p`
  text-align: center;
  margin: auto;
  width: 90%;
  height: 15rem;
  justify-content:center;
  bottom: 0;
  border: 0.2rem solid;
  margin-bottom:0.4rem;
  margin-top:01.rem;
  background-color:white;

`
const Name= styled.div`
  font-family: SpoqaHanSansNeo;
  font-size: 0.438rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.07px;
  color: black;
  margin: auto;
`
const Price= styled.div`
  font-family: SpoqaHanSansNeo;
  font-size: 0.281rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.44;
  letter-spacing: -0.05px;
  color: #0035ff;
  margin: auto;

`

const Button= styled.button`
  width:80%;
  height: 2rem;
  padding: 0.313rem 3.438rem 0.281rem 3.375rem;
  background-color: #2e2e2e;
  font-family: SpoqaHanSansNeo;
  font-size: 0.344rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.55;
  letter-spacing: -0.06px;
  text-align: center;
  color:#ffffff ;
  border:none;
  
`
const Bottom=styled.div`
  width:100%;
  display: flex;
  
  `
const Info=styled.div`
  width:20%;
  background-color: black;
  height: 2rem;
`
const Image = styled.img`
  width: 2rem;
  height: 2rem;
  justify-content: center;
  margin:auto;
`;
const Card = (props) =>{
  const [background,setbackground]=useState("#2e2e2e");

  function changeColor(){
    if (background==="#2e2e2e")
      setbackground("#e7713f");
    else
      setbackground("#2e2e2e");
  }
    return(
    <Each style={{ borderColor: background}}>
     <Image src={props.image}></Image>
     <Name>{props.name}</Name>
     <Price>{props.price}</Price>
     <Bottom>
     <Button onClick={changeColor} style={{ backgroundColor: background}} >지금 가져가기</Button>
     <Info></Info>
     </Bottom>
    </Each>
  );
}

export default Card;

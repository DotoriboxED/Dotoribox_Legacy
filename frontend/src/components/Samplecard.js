import React ,{useState,useEffect} from 'react';
import styled from 'styled-components';

const Each= styled.div`
  text-align: center;
  margin: 1em 1em 0 1em;
  width: 90%;
  height: 16.1rem;
  justify-content:center;
  bottom: 0;
  border: 0.2rem solid;
  margin-bottom:0.4rem;
  margin-top:01.rem;
  background-color:white;

`
const Name= styled.div`
  font-family: SpoqaHanSansNeo;
  font-size: 0.9rem;
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
  font-size: 0.75rem;
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
  height: 2.5rem;
  padding: 0.313rem 3.438rem 0.281rem 3.375rem;
  background-color: #2e2e2e;
  font-family: SpoqaHanSansNeo;
  font-size: 0.8rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.55;
  letter-spacing: -0.06px;
  text-align: center;
  color:#ffffff ;
  border:none;
  vertical-align: bottom;
  
`
const Bottom=styled.div`
  width:100%;
  display: flex;
  
  `
const Info=styled.div`
  width:20%;
  background-color: white;
  height: 2.5rem;
`
const Image = styled.img`
  width: 100%;
  height: 11.2rem;
  justify-content: center;
  margin:auto;
  overflow: hidden;
`;
const Card = (props) =>{
  const { setSelect, select, id } = props;

  useEffect(()=>{
    changeSelect(props.select)
  },[])
  
  useEffect(() => {
    console.log(select);
    if (select === props.id) setbackground('#e7713f');
    else setbackground('#2e2e2e')
  }, [select])
  const [background,setbackground]=useState("#2e2e2e");
  
  function changeSelect(select){
    if (select===props.id)
      setbackground("#e7713f");
    else
      setbackground("#2e2e2e");
  }
    return(
    <Each style={{ borderColor: background}}>
     <Image src={'http://localhost:5000/api/sample/' + props.id + '/image'}></Image>
     <Name>{props.name}</Name>
     <Price>{props.price}원</Price>
     <Bottom>
     <Button style={{ backgroundColor: background}} onClick={() => { setSelect(props.id); }} ><b>지금 가져가기</b></Button>
     <Info></Info>
     </Bottom>
    </Each>
  );
}

export default Card;

import React ,{useState} from 'react';
import Logo from '../Logo.js';
import Sample from '../components/Samplecard'
import styled from 'styled-components';
import { useHistory} from "react-router-dom";
import {useLocation} from 'react-router';
import Background from '../image/background3.png';

const Button=styled.button`
  width: 90%;
  height: 2rem;
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
  position:fixed;
  left:1rem;
  bottom:0;
`
const Main=styled.div`
  text-align: center;
  background-image: url(${Background});
  height:45rem;
`

function App() {
  const [Products,setProducts]=useState([
    {
      name:"술이싹",
      price:"1000원",
      info:"설명1"
    },
    {
      name:"보건용 마스크",
      price:"2000원",
      info:"설명2"
    }
  ]);
  const history = useHistory();

  const renderLists=(Products.map((product,index)=>{
    return <Sample name={product.name}
                 price={product.price}
                 info={product.info}
                 >
            </Sample>
      
   
  }));
  return (
    <Main >
      <Logo></Logo>
      {renderLists}
      
      <Button onClick={() => {history.push({
          pathname:'./userinfo',
          state:{Code:"12",
                 Sample:"123"}
        })}}>카트로 이동하기</Button>
       
    </Main>
  );
}

export default App;

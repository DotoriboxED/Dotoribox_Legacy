import React ,{useState,useEffect} from 'react';
import Logo from '../Logo.js';
import Sample from '../components/Samplecard'
import styled from 'styled-components';
import { useHistory} from "react-router-dom";
import {SampleApi} from "../api"
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
  const [Products,setProducts]=useState([]);
  const [Images,setImages]=useState();
  const [Select,setSelect]=useState("6094d30c4d617f142e340368");
  const history = useHistory();
  const location = useLocation();

  const Code = location.state.Code;

  useEffect(()=>{
    getProduct()
  },[])

  async function getProduct(){
    
    await SampleApi.getList().then(async (res) => {
      console.log(res.data);
      setProducts(res.data);
      
    });
    
  }
  async function getImage(id){
    
    await SampleApi.getInfoImage(id).then(async (res) => {
     
      setImages(res.data);
    });
    
  }
  function changeSelect(id){
    setSelect(id);
  }

  const renderLists=(Products.map((product,index)=>{
  
    getImage(product.id)
    return <Sample image={Images}
                   name={product.sampleName}
                   price={product.price}
                   info={product.explain}
                   select={Select}
                   id={product.id}
                   />
  }));

  return (
    <Main >
      <Logo></Logo>
      {renderLists}
      
      <Button onClick={() => {history.push({
          pathname:'./userinfo',
          state:{Code:Code,
                 Sample:Select}
        })}}>카트로 이동하기</Button>
       
    </Main>
  );
}

export default App;

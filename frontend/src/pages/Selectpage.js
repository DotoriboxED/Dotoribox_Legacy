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
  height: 2.5rem;
  background-color: #e7713f;
  font-family: SpoqaHanSansNeo;
  font-size: 0.8rem;
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
  margin: 0 0 1rem 0;
`
const Main=styled.div`
  text-align: center;
  background-image: url(${Background});
  height:52rem;
`

const List = styled.div`
  margin-top: 1em;
`

function App() {
  const [Products,setProducts]=useState([]);
  const [Images,setImages]=useState();
  const [Select,setSelect]=useState();
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
                   setSelect={setSelect}
                   id={product.id}
                   />
  }));

  return (
    <Main >
      <Logo></Logo>
      <List>
      {renderLists}
      </List>
      
      <Button onClick={() => {history.push({
          pathname:'./userinfo',
          state:{Code:Code,
                 Sample:Select}
        })}}><b>카트로 이동하기</b></Button>
       
    </Main>
  );
}

export default App;

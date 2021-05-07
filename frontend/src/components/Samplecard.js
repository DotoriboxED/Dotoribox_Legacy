import React from 'react';
import styled from 'styled-components';

const Each= styled.p`
  text-align: center;
  margin: auto;
  width: 90%;
  height: 8.063rem;
  justify-content:center;
  bottom: 0;
`
const name= styled.p`
  font-family: SpoqaHanSansNeo;
  font-size: 0.438rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.07px;
  text-align: left;
  color: black;
`
const price= styled.p`
  font-family: SpoqaHanSansNeo;
  font-size: 0.281rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.44;
  letter-spacing: -0.05px;
  text-align: left;
  color: #0035ff;
`

const Button= styled.button`
  width:100%;
  height: 1.125rem;
  padding: 0.313rem 3.438rem 0.281rem 3.375rem;
  background-color: #e7713f;
  font-family: SpoqaHanSansNeo;
  font-size: 0.344rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.55;
  letter-spacing: -0.06px;
  text-align: center;
  color: #ffffff;
`
function Card() {
  return (
    <Each>
     <name>술이싹 새싹보리 </name>
     <price>0원</price>
     <Button>지금 가져가기</Button>
    </Each>
  );
}

export default Card;

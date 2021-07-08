import React, {useState} from 'react';
import {useLocation} from 'react-router';
import Card from '../components/Samplecard.js';
import styled from 'styled-components';
import {useHistory} from "react-router-dom";

const main = styled.div`
  text-align: center;
  width: 90%;
  height: 8.063rem;
  justify-content: center;
  bottom: 0;
`
const Button = styled.button`
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
  border: none;
`

function Sample() {
    const location = useLocation();
    const history = useHistory();
    const Code = location.state.Code;
    const [Sample, setSample] = useState(0);

    return (
        <main>
            {Code}
            <Card></Card>


        </main>
    );
}

export default Sample;

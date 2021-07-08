import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { TaxiApi, API_URL } from '../../../api';
import styled from 'styled-components';
import { TextField, Input } from '@material-ui/core'

import Logo from '../../../Logo';

const Body = styled.div`
    margin: 20px;
    align-items: center;
`

const Picture = styled.img`
    width: 100%;
`

const Container = styled.div`
    height: 10px;
`

const Setting = styled.div`
    font-size: 2rem;
    margin: 10px;
    text-align: center;
`

const ButtonWrapper = styled.div`
    position: fixed;
    width: 90%;
    margin: 1rem;
    bottom: 0;
    align-items: center;
`

const Button = styled.button`
  width: 47%;
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
  left:1rem;
  bottom:0;
  margin: 0.3rem;
  float: left;
`

const App = ({ match }) => {
    const [taxi, setTaxi] = useState({
        taxiNumber: undefined,
        driverName: undefined,
        phoneNumver: undefined,
        accountNumber: undefined,
        licensePlate: undefined,
        group: undefined
    });
    const history = useHistory();
    const { sampleId } = match.params;

    const handleValueChange = (e) => {
        const { value, name } = e.target;
        setTaxi({
            ...taxi,
            [name]: value
        })
    }

    const submitHandler = () => {
        TaxiApi.postTaxi(taxi).then(() => {
            history.push('/coffee/menu/taxi')
        });
    }

    return (
        <div>
            <Logo />
            <Body>
                <Setting><b>택시 생성</b></Setting>
                <hr />
                {
                    taxi &&
                    <form onSubmit={submitHandler} >
                        <TextField fullWidth name="taxiNumber" label="택시번호" onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="name" label="기사명" onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="phoneNumber" label="전화번호" onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="accountNumber" label="계좌번호" onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="licensePlate" label="번호판" onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="group" label="군" onChange={handleValueChange} />
                        <Container />
                        <Button variant="contained" type="submit" fullWidth>제출</Button>
                    </form>
                }
            </Body>
        </div>
    )
};

export default App;
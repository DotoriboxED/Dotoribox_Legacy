import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { TaxiApi, API_URL } from '../../../api';
import styled from 'styled-components';
import { TextField, Button, Input } from '@material-ui/core'

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

const sampleEditPage = ({ match }) => {
    const [taxi, setTaxi] = useState(null);
    const [update, setUpdate] = useState({})
    const history = useHistory();
    const { taxiId } = match.params;

    useEffect(() => {
        TaxiApi.getTaxiInfo(taxiId).then((res) => {
            setTaxi(res.data);
        })
    }, []);

    const handleValueChange = (e) => {
        const { value, name } = e.target;
        setUpdate({
            ...update,
            [name]: value
        })
    }

    const submitHandler = () => {
        TaxiApi.putTaxi(taxiId, update).then(() => {
            history.push('/coffee/menu/taxi');
        });
    }

    return (
        <div>
            <Logo />
            <Body>
                <Setting><b>제품 수정</b></Setting>
                <hr />
                {
                    taxi &&
                    <div>
                        <TextField fullWidth name="taxiNumber" label="택시 고유번호" defaultValue={taxi.taxiNumber} onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="driverName" label="기사 이름" defaultValue={taxi.driver.name} onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="licensePlate" label="번호판" multiline defaultValue={taxi.driver.licensePlate} onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="phoneNumber" label="전화번호" multiline defaultValue={taxi.driver.phoneNumber} onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="group" label="군" multiline defaultValue={taxi.driver.group} onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="accountNumber" label="통장 번호" multiline defaultValue={taxi.driver.accountNumber} onChange={handleValueChange} />
                        <Container />
                        <Button variant="contained" onClick={ () => submitHandler() } fullWidth>제출</Button>
                    </div>
                }
            </Body>
        </div>
    )
};

export default sampleEditPage;
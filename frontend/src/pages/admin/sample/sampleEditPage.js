import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { SampleApi, API_URL } from '../../../api';
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
    const [sample, setSample] = useState(null);
    const [image, setImage] = useState(null);
    const history = useHistory();
    const { sampleId } = match.params;

    useEffect(() => {
        SampleApi.getInfo(sampleId).then((res) => {
            setSample(res.data);
        });
    }, []);

    const handleValueChange = (e) => {
        const { value, name } = e.target;
        setSample({
            ...sample,
            [name]: value
        })
    }

    const submitHandler = () => {
        SampleApi.putSample(sampleId, sample).then(() => {
            history.push('/coffee/menu/sample')
        });
    }

    const imageHandler = (e) => {
        let formData = new FormData();
        formData.append("attachment", e.target.files[0]);
        return SampleApi.putSampleImage(sampleId, formData, {
            'Content-Type': 'multipart/form-data'
        });
    };

    return (
        <div>
            <Logo />
            <Body>
                <Setting><b>제품 수정</b></Setting>
                <hr />
                <Picture src={API_URL + '/api/sample/' + sampleId + '/image'} />
                <Container/>
                
                <Button variant="contained" component="label" fullWidth>
                    이미지 선택
                    <input type="file" accept="image/*" onChange={e => imageHandler(e)} hidden/>
                </Button>
                <Container/>
                {
                    sample &&
                    <form onSubmit={submitHandler} >
                        <TextField fullWidth name="sampleName" label="상품명" defaultValue={sample.sampleName} onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="price" label="가격" defaultValue={sample.price} onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="explain" label="설명" multiline defaultValue={sample.explain} onChange={handleValueChange} />
                        <Container />
                        <Button variant="contained" type="submit" fullWidth>제출</Button>
                    </form>
                }
            </Body>
        </div>
    )
};

export default sampleEditPage;
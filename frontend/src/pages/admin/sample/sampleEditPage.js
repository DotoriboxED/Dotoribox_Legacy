import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { SampleApi, API_URL } from '../../../api';
import styled from 'styled-components';
import { TextField, Button, Input } from '@material-ui/core'

import Logo from '../../../Logo';
import MenuTitle from "../../../components/menu/MenuTitle";

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

const App = ({ match }) => {
    const [sample, setSample] = useState(null);
    const [image, setImage] = useState(null);
    const history = useHistory();
    const { sampleId } = match.params;

    useEffect(() => {
        SampleApi.getInfo(sampleId).then((res) => {
            setSample(res.data);
            console.log(res.data);
            console.log(sample);
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
                <MenuTitle Title="제품 수정" showBack={true} />
                <Picture src={API_URL + '/api/sample/' + sampleId + '/image'} />
                <Container />

                <Button variant="contained" component="label" fullWidth>
                    이미지 선택
                    <input type="file" accept="image/*" onChange={e => imageHandler(e)} hidden />
                </Button>
                <Container />
                {
                    sample &&
                    <div>
                        <Container />
                        <TextField fullWidth name="sampleName" label="상품명" defaultValue={sample.sampleName} onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="price" label="가격" defaultValue={sample.price} onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="explain" label="설명" defaultValue={sample.explain} multiline onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="amount" label="재고" defaultValue={sample.stock.amount} onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="name" label="상품명(설명창)" defaultValue={sample.info.name} onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="sampleType" label="샘플 종류" defaultValue={sample.info.sampleType} onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="manufacture" label="제조사" defaultValue={sample.info.manufacture} onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="sale" label="판매처" defaultValue={sample.info.sale} onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="consulting" label="소비자상담실" defaultValue={sample.info.consulting} onChange={handleValueChange} />
                        <Container />
                        <TextField fullWidth name="question" label="도토리박스 문의" defaultValue={sample.info.question} onChange={handleValueChange} />
                        <Container />
                        <Button variant="contained" type="submit" onClick={() => submitHandler()} fullWidth>제출</Button>
                    </div>
                }
            </Body>
        </div>
    )
};

export default App;
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

const App = ({ match }) => {
    const [sample, setSample] = useState(null);
    const [image, setImage] = useState(null);
    const history = useHistory();
    const { sampleId } = match.params;

    const handleValueChange = (e) => {
        const { value, name } = e.target;
        setSample({
            ...sample,
            [name]: value
        })
    }

    const submitHandler = () => {
        const upload = async () => {
            try {
                let formData = new FormData();
                formData.append("attachment", image);
                const item = await SampleApi.postSample(sample);
                await SampleApi.putSampleImage(item.data.id, formData, {
                    'Content-Type': 'multipart/form-data'
                });

                history.push('/coffee/menu/sample');
            } catch (err) {
                console.log(err);
            }
        }

        upload();
    }

    const imageHandler = (e) => {
        setImage(e.target.files[0])
    };

    return (
        <div>
            <Logo />
            <Body>
                <Setting><b>제품 생성</b></Setting>
                <hr />
                <Button variant="contained" component="label" fullWidth>
                    이미지 선택
                    <input type="file" accept="image/*" onChange={e => imageHandler(e)} hidden />
                </Button>
                <Container />
                <TextField fullWidth name="sampleName" label="상품명" onChange={handleValueChange} />
                <Container />
                <TextField fullWidth name="price" label="가격" onChange={handleValueChange} />
                <Container />
                <TextField fullWidth name="explain" label="설명" multiline onChange={handleValueChange} />
                <Container />
                <TextField fullWidth name="amount" label="재고" onChange={handleValueChange} />
                <Container />
                <TextField fullWidth name="name" label="상품명(설명창)" onChange={handleValueChange} />
                <Container />
                <TextField fullWidth name="sampleType" label="샘플 종류" onChange={handleValueChange} />
                <Container />
                <TextField fullWidth name="manufacture" label="제조사" onChange={handleValueChange} />
                <Container />
                <TextField fullWidth name="sale" label="판매처" onChange={handleValueChange} />
                <Container />
                <TextField fullWidth name="consulting" label="소비자상담실" onChange={handleValueChange} />
                <Container />
                <TextField fullWidth name="question" label="도토리박스 문의" onChange={handleValueChange} />
                <Container />
                <Button variant="contained" type="submit" onClick={() => submitHandler()} fullWidth>제출</Button>
            </Body>
        </div>
    )
};

export default App;
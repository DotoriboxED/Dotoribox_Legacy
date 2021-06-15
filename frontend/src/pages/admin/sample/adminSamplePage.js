import React, { useEffect, useState } from 'react';
import Item from '../../../components/menu/SampleBlock';
import Logo from '../../../Logo';
import styled from 'styled-components';
import { SampleApi } from '../../../api';

const ItemMenu = styled.div`
    flex: 1;
    overflow-y: auto;
    margin: 10px;
`
const Setting = styled.div`
    font-size: 2rem;
    margin: 10px;
    text-align: center;
`

const Button=styled.button`
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

const Buttons = styled.div`
    position: fixed;
    width: 90%;
    margin: 1rem;
    bottom: 0;
    align-items: center;
`

const App = () => {
    const [Sample, setSample] = useState([]);
    const [SampleView, setSampleView] = useState([]);

    useEffect(() => {
        SampleApi.getList().then((res) => {
            setSample(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const SampleList = (Sample.map((product, index) => {
        return <Item name={product.sampleName} sampleId={product.id} />
    }));

    return (
        <div>
            <Logo />
            <ItemMenu>

                <Setting><b>샘플 목록</b></Setting>
                <hr />
                <ItemMenu>
                    {SampleList}
                </ItemMenu>
            </ItemMenu>
            <Buttons>
                <Button>삭제</Button>
                <Button>생성</Button>
            </Buttons>
        </div>
    )
}

export default App;
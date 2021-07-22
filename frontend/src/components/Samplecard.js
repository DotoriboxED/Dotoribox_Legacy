import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {API_URL} from '../api';
import WarningPopup from "./InvalidFormPopup";

const Each = styled.div`
  margin: 1em 1em 0 1em;
  width: 90%;
  height: 16.1rem;
  justify-content: center;
  bottom: 0;
  border: 0.2rem solid;
  background-color: white;
`
const Name = styled.div`
  font-family: SpoqaHanSansNeo;
  font-size: 0.9rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.07px;
  color: black;
  margin: auto;
`
const Price = styled.div`
  font-family: SpoqaHanSansNeo;
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.44;
  letter-spacing: -0.05px;
  color: #0035ff;
  margin: auto;
`

const Button = styled.button`
  width: 80%;
  height: 2.5rem;
  padding: 0.313rem 3.438rem 0.281rem 3.375rem;
  background-color: #2e2e2e;
  font-family: SpoqaHanSansNeo;
  font-size: 0.8rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.55;
  letter-spacing: -0.06px;
  text-align: center;
  color: #ffffff;
  border: none;
  vertical-align: bottom;
`
const Bottom = styled.div`
  width: 100%;
  display: flex;
`
const Info = styled.button`
  width: 20%;
  background-color: white;
  height: 2.5rem;
  font-size: 0.8rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  border: none;
  line-height: 1.55;
  letter-spacing: -0.06px;
  text-align: center;
`
const Image = styled.img`
  height: 11.3rem;
  overflow: hidden;
`;

const SoldOutImage = styled.img`
  height: 11.3rem;
  -webkit-filter: grayscale(100%) brightness(40%);
  overflow: hidden;
`;

const ImageForm = styled.div`
  width: 100%;
  height: 11.3rem;
  justify-content: center;
  margin: auto;
  overflow: hidden;
`

const Filter = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 90%;
  height: 16.1rem;
  position: absolute;
`

const Card = (props) => {
    const {setSelect, select, id, amount, sampleInfo} = props;
    const [sampleExists, setSampleExists] = useState(true);
    const [infoState, setInfoState] = useState(true);
    const [background, setBackground] = useState("#2e2e2e");

    useEffect(() => {
        changeSelect(props.select)
    }, [])

    useEffect(() => {
        if (select === props.id) setBackground('#e7713f');
        else setBackground('#2e2e2e')
    }, [select])

    function changeSelect(select) {
        if (select === props.id)
            setBackground("#e7713f");
        else
            setBackground("#2e2e2e");
    }

    return (
        <Each style={{borderColor: background}}>
            {
                amount < 1 && <Filter/>
            }
            <ImageForm>
                {
                    amount > 0 ? <Image src={API_URL + '/api/sample/' + props.id + '/image'}/>
                        : <SoldOutImage src={API_URL + '/api/sample/' + props.id + '/image'}/>
                }

            </ImageForm>
            <Name>{props.name}</Name>
            <Price>{props.price}원</Price>
            <Bottom>
                <Button style={{backgroundColor: background}} onClick={() => {
                    if (amount > 0)
                        setSelect(props.id);
                    else
                        setSampleExists(false);
                }}><b>지금 가져가기</b></Button>
                <Info onClick={() => {
                    console.log(infoState);
                    setInfoState(false);
                }}>정보</Info>
            </Bottom>
            <WarningPopup isValid={sampleExists} setValid={setSampleExists} message={
                <div>매진된 상품입니다.<br/>아쉽지만 다른 샘플을 골라 주세요!</div>}/>
            <WarningPopup isValid={infoState} setValid={setInfoState}
                          message={
                              <div>
                                  <div>이름 : {sampleInfo.name}</div>
                                  <div>종류 : {sampleInfo.sampleType}</div>
                                  <div>제조사 : {sampleInfo.manufacture}</div>
                                  <div>판매처 : {sampleInfo.sale}</div>
                                  <div>고객상담 : {sampleInfo.consulting}</div>
                                  <div>질문 : {sampleInfo.question}</div>
                              </div>
                          }/>
        </Each>
    );
}

export default Card;
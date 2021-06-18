import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { TaxiApi, ReviewApi } from '../../../api';

import Item from '../../../components/menu/MenuBlock'
import Logo from '../../../Logo';

const ItemMenu = styled.div`
    flex: 1;
    overflow-y: auto;
    margin: 10px;
`;

const Setting = styled.div`
    font-size: 2rem;
    margin: 10px;
    text-align: center;
`;

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

const taxiInfoPage = ({ match }) => {
    const [taxiInfo, setTaxiInfo] = useState({
        taxi: undefined,
        customer: undefined
    });
    
    const { taxiId } = match.params;
    const history = useHistory();

    useEffect(() => {

        const fetch = async () => {
            const taxi = await TaxiApi.getTaxiInfo(taxiId);
            const customer = await ReviewApi.getReview({ taxiNumber: taxiId });

            console.log(taxi.data);

            setTaxiInfo({
                taxi: taxi.data, 
                customer: customer.data
            });
        }

        fetch();
    }, []);

    return (
        <div>
            <Logo />
            <ItemMenu>
            <Setting><b>정보</b></Setting>
            <hr/>
            {
                taxiInfo.taxi && 
                    <div>
                        <Item title={taxiInfo.taxi.taxiNumber} explain="택시 고유번호" isUpper={true}/>
                        <Item title={taxiInfo.taxi.driver.name} explain="기사 이름" isUpper={true}/>
                        <Item title={taxiInfo.taxi.driver.licensePlate} explain="번호판" isUpper={true}/>
                        <Item title={taxiInfo.taxi.driver.phoneNumber} explain="전화번호" isUpper={true}/>
                        <Item title={taxiInfo.taxi.driver.group} explain="군" isUpper={true}/>
                        <Item title={taxiInfo.taxi.driver.accountNumber} explain="통장" isUpper={true}/>
                        <Item title={taxiInfo.taxi.passenger} explain="승객 수" isUpper={true} />
                    </div>
            }
            </ItemMenu>
            <ButtonWrapper>
                <Button variant="contained" onClick={() => { history.push('/coffee/menu/taxi/' + taxiInfo.taxi.taxiNumber + '/edit') }}>편집</Button>
                <Button variant="contained">샘플 관리</Button>
            </ButtonWrapper>
        </div>
    )
}

export default taxiInfoPage;
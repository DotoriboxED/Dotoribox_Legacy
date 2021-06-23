import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Checkbox } from '@material-ui/core';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { TaxiApi } from '../../../api';
import Item from '../../../components/menu/SampleBlock';
import Logo from '../../../Logo';

const Body = styled.div`
    margin: 10px;
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

const taxiListPage = () => {
    const [taxi, setTaxi] = useState([]);
    const [check, setCheck] = useState({});
    const history = useHistory();

    useEffect(() => {
        TaxiApi.getTaxi().then((res) => {
            setTaxi(res.data)
        });
    }, [check]);

    const onCheck = (event) => {
        setCheck({ ...check, [event.target.name]: event.target.checked });
    }

    const TaxiList = (taxi.map((elem) => {
        return (
            <ListItem button>
                <ListItemText onClick={ () => history.push('/coffee/menu/taxi/' + elem.id) } primary={elem.taxiNumber} />
                <Checkbox name={elem.id} onChange={onCheck} />
            </ListItem>
        )
    }));

    const onDelete = () => {
        const deleteTaxi = async () => {
            let change = {}
            for (let key in check) {
                if (check[key])
                    await TaxiApi.deleteTaxi(key);
                else
                    change[key] = check[key];
            }

            setCheck(change);
        }

        deleteTaxi();
    }

    return (
        <div>
            <Logo />
            <Body>
                <List component="nav">
                    {TaxiList}
                </List>
                <ButtonWrapper>
                    <Button variant="contained" onClick={() => { history.push('/coffee/menu/taxi/create') }}>생성</Button>
                    <Button variant="contained" onClick={() => onDelete()}>제거</Button>
                </ButtonWrapper>
            </Body>
        </div>
    )
}

export default taxiListPage;
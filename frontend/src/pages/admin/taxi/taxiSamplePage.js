import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Checkbox, List, ListItem, ListItemText} from '@material-ui/core';
import styled from 'styled-components';

import Logo from '../../../Logo';
import {StockApi, TaxiApi} from '../../../api';


const Body = styled.div`
    margin:10px;
`;

const ButtonWrapper = styled.div`
    position: fixed;
    width: 90%;
    margin: 1rem;
    bottom: 0;
    align-items: center;
`;

const Setting = styled.div`
    font-size: 2rem;
    margin: 10px;
    text-align: center;
`;

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
`;

const App = ({ match }) => {
    const [taxiSample, setTaxiSample] = useState([]);
    const [check, setCheck] = useState({});
    const history = useHistory();

    const { taxiId } = match.params;

    const fetch = async () => {
        try {
            const taxiInfo = await StockApi.getStock(taxiId);
            setTaxiSample(taxiInfo.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
         StockApi.getStock(taxiId).then((res) => {
             setTaxiSample(res.data);
         });
    }, [check]);

    const onCheck = (event) => {
        setCheck({ ...check, [event.target.name]: event.target.checked });
    }

    const onDelete = () => {
        const deleteTaxi = async () => {
            let change = { }
            for (let key in check) {
                change = await TaxiApi.deleteTaxiSample(taxiId, key);
            }
            setCheck(change);
        }

        deleteTaxi().then(() => {
            fetch().catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);

        });

        setCheck({});
    }

    const SampleList = (taxiSample.map((elem) => {
        console.log('elkem');
        return (
            <ListItem button>
                <ListItemText
                    primary={elem.sample[0].info.name}
                    onClick={() => {
                        history.push({
                            pathname: '/coffee/menu/taxi/' + taxiId + '/sample/' + elem.id
                        });
                    }}
                />
                <Checkbox name={elem.sample[0].id} onChange={onCheck} />
            </ListItem>
        )
    }));

    return (
        <div>
            <Logo/>
            <Body>
                <Setting><b>샘플 관리</b></Setting>
                <hr />
                <List>
                    {SampleList}
                </List>
                <ButtonWrapper>
                    <Button variant="contained"
                            onClick={() => { history.push('/coffee/menu/taxi/' + taxiId + '/sample/create') }}>생성</Button>
                    <Button variant="contained" onClick={() => onDelete()}>제거</Button>
                </ButtonWrapper>
            </Body>
        </div>
    )
}

export default App;
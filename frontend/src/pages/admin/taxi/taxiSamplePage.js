import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Checkbox, List, ListItem, ListItemText} from '@material-ui/core';
import styled from 'styled-components';

import Logo from '../../../Logo';
import {TaxiApi} from '../../../api';


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

    useEffect(() => {
        const fetch = async () => {
            try {
                const taxiInfo = await TaxiApi.getAllTaxiSample(taxiId);
                taxiInfo.data[0].stocks = taxiInfo.data[0].stocks.filter((elem) => {
                    return elem.isDeleted === false
                });

                setTaxiSample(taxiInfo.data[0].stocks);
                console.log(taxiInfo.data[0].stocks);
            } catch (err) {
                console.log(err);
            }
        }

         fetch();
    }, [check]);

    const onCheck = (event) => {
        setCheck({ ...check, [event.target.name]: event.target.checked });
        console.log(check);
    }

    const onDelete = () => {
        const deleteTaxi = async () => {
            let change = { }
            for (let key in check) {
                if (check[key]) 
                    await TaxiApi.deleteTaxiSample(taxiId, key);
                else
                    change[key] = check[key];
            }

            setCheck(change);
        }
        deleteTaxi();
    }

    const SampleList = (taxiSample.map((elem) => {
        return (
            <ListItem button>
                <ListItemText
                    primary={elem.info.name}
                    onClick={() => {
                        history.push({
                            pathname: '/coffee/menu/taxi/' + taxiId + '/sample/' + elem.id
                        });
                    }}
                />
                <Checkbox name={elem.info.id} onChange={onCheck} />
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
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, ListItem, ListItemText, Checkbox } from '@material-ui/core';
import styled from 'styled-components';

import Logo from '../../../Logo';
import { TaxiApi, SampleApi } from '../../../api';


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
    const [taxiSample, setTaxiSample] = useState({ samples: [] });
    const [check, setCheck] = useState({});
    const history = useHistory();

    const { taxiId } = match.params;

    useEffect(() => {
        const fetch = async () => {
            try {
                const taxiInfo = await TaxiApi.getTaxiInfo(taxiId);
                const samples = taxiInfo.data.samples.filter((elem) => {
                    return elem.isDeleted !== true
                });

                taxiInfo.data.samples = samples;

                console.log(taxiInfo.data);

                setTaxiSample(taxiInfo.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetch();
    }, []);

    const onCheck = (event) => {
        setCheck({ ...check, [event.target.name]: event.target.checked });
        console.log(check);
    }

    const onDelete = () => {
        const deleteTaxi = async () => {
            let change = {}
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

    const SampleList = (taxiSample.samples.map((elem) => {
        return (
            <ListItem button>
                <ListItemText primary={elem.sample.sampleName} />
                <Checkbox name={elem.sample.id} onChange={onCheck} />
            </ListItem>
        )
    }));

    return (
        <div>
            <Logo/>
            <Body>
                <List>
                    {SampleList}
                </List>
                <ButtonWrapper>
                    <Button variant="contained" onClick={() => { history.push('/coffee/menu/taxi/' + taxiId + '/sample/create') }}>생성</Button>
                    <Button variant="contained" onClick={() => onDelete()}>제거</Button>
                </ButtonWrapper>
            </Body>
        </div>
    )
};

export default App;
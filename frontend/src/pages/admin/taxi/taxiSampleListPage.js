import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, ListItem, ListItemText, Checkbox, TextField } from '@material-ui/core';
import styled from 'styled-components';

import Logo from '../../../Logo';
import { TaxiApi, SampleApi } from '../../../api';
import MenuTitle from "../../../components/menu/MenuTitle";


const Body = styled.div`
    margin:10px;
`;

const Button=styled.button`
  width: 90%;
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
  position:fixed;
  left:1rem;
  bottom:0;
  margin: 0 0 1rem 0;
`

const App = ({ match }) => {
    const [Sample, setSample] = useState([]);
    const [check, setCheck] = useState({});
    const history = useHistory();

    const { taxiId } = match.params;

    useEffect(() => {
        const fetch = () => {
            SampleApi.getList().then((res) => {
                setSample(res.data);
            });
        }

        fetch();
    }, []);

    const onCheck = (event) => {
        setCheck({
            ...check, 
            [event.target.name]: { 
                ...check[event.target.name], 
                isChecked: event.target.checked 
            } 
        });

        console.log(check);
    }

    const onChange = (e) => {
        const { value, name } = e.target;
        setCheck({
            ...check,
            [name]: {
                ...check[e.target.name],
                stock: value
            }
        });

        console.log(check);
    }

    const SampleList = (Sample.map((elem) => {
        return (
            <ListItem button>
                <ListItemText
                    primary={
                    <div>
                        <div onClick={() => history.push('/coffee/menu/taxi/' + elem.id)}>
                            {elem.sampleName}
                        </div>
                        <TextField name={elem.id} label='갯수' onChange={onChange}/>
                    </div>}
                    secondary={'전체 ' + elem.stock.amount + '개 남음, ' + elem.stock.sales + '개 소비됨'}
                />
                
                <Checkbox name={elem.id} onChange={onCheck} />
            </ListItem>
        )
    }));

    const onCreate = () => {
        let update = {};

        Object.keys(check).forEach((key) => {
            if (check[key].isChecked)
                update[key] = check[key]
        })

        Object.keys(update).forEach((key) => {
            TaxiApi.postTaxiSample(taxiId, { sampleId: key, stock: update[key].stock })
            .then((res) => {
                console.log('success');
                history.push('/coffee/menu/taxi/' + taxiId +'/sample');
            })
            .catch((err) => { 
                console.log('err');
            });
        });
    }

    return (
        <div>
            <Logo/>
            <Body>
                <MenuTitle Title="샘플 목록" showBack={true} />
                <List>
                    {SampleList}
                </List>
                <Button variant="contained" onClick={() => onCreate()}>생성</Button>
            </Body>
        </div>
    )
};

export default App;
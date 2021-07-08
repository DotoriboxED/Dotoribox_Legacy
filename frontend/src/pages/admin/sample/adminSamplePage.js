import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Item from '../../../components/menu/SampleBlock';
import Logo from '../../../Logo';
import styled from 'styled-components';
import { List, ListItem, ListItemText, Checkbox } from '@material-ui/core';
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
    const [check, setCheck] = useState({});
    const [SampleView, setSampleView] = useState([]);
    const history = useHistory();

    useEffect(() => {
        SampleApi.getList().then((res) => {
            setSample(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [check]);

    const onCheck = (event) => {
        setCheck({ ...check, [event.target.name]: event.target.checked });
        console.log(check);
    }

    const SampleList = (Sample.map((product, index) => {
        return (
            <ListItem button>
                <ListItemText primary={product.sampleName} 
                    onClick={() => history.push('/coffee/menu/sample/' + product.id + '/edit')} />
                <Checkbox name={product.id} onChange={onCheck} />
            </ListItem>
        )
    }));

    const onDelete = () => {
        const deleteTaxi = async () => {
            let change = {}
            for (let key in check) {
                if (check[key]) 
                    await SampleApi.deleteSample(key);
                else
                    change[key] = check[key];
            }

            setCheck(change);
        }
        deleteTaxi();
    };

    return (
        <div>
            <Logo />
            <ItemMenu>
                <Setting><b>샘플 관리</b></Setting>
                <hr />
                <List>
                    {SampleList}
                </List>
            </ItemMenu>
            <Buttons>
                <Button onClick={() => history.push('/coffee/menu/sample/create')}>생성</Button>
                <Button onClick={() => onDelete()}>삭제</Button>
            </Buttons>
        </div>
    )
}

export default App;
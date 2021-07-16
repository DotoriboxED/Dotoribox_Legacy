import React, {useEffect, useState} from 'react';
import {SampleApi, TaxiApi} from "../../../api";
import { useLocation } from 'react-router';
import { TextField, Button } from '@material-ui/core';
import styled from 'styled-components';
import Logo from '../../../Logo';
import Item from "../../../components/menu/MenuBlock";
import {useHistory} from "react-router-dom";

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

const App = ({ match }) => {
    const [stock, setStock] = useState(null);
    const [update, setUpdate] = useState(null);

    const { sampleId, taxiId } = match.params;
    const history = useHistory();

    const handleValueChange = (e) => {
        setUpdate(e.target.value);
    }

    useEffect(() => {
        TaxiApi.getTaxiSample(taxiId, sampleId).then((res) => {
            setStock(res.data);
            console.log(res.data);
        });

    }, []);

    const EditStock = () => {
        TaxiApi.putTaxiSample(taxiId, sampleId, { stock: update }).then((res) => {
            history.push('/coffee/menu/taxi/' + taxiId + '/sample');
        });
    }

    return (
        <div>
            <Logo />
            <ItemMenu>
                <Setting><b>재고</b></Setting>
                <hr/>
                {
                    stock !== null && <div>
                        <Item title={stock.stock} explain='재고' isUpper={true}/>
                        <TextField fullWidth name='stock' label='재고' defaultValue={stock.stock} onChange={handleValueChange} />
                    </div>
                }
                <br />
                <br />
                <Button variant="contained" onClick={() => { EditStock() }} fullWidth>수정</Button>
            </ItemMenu>
        </div>
    )
}

export default App;
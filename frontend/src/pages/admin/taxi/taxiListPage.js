import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

import { TaxiApi } from '../../../api';
import Item from '../../../components/menu/SampleBlock';
import Logo from '../../../Logo';

const taxiListPage = () => {
    const [taxi, setTaxi] = useState([]);

    useEffect(() => {
        TaxiApi.getTaxi().then((res) => {
            setTaxi(res.data)
        });
    }, []);

    const TaxiList = (taxi.map((elem) => {
        console.log(elem.taxiNumber)
        return (
            <ListItem button>
                <ListItemText primary={elem.taxiNumber}/>
            </ListItem>
        )
    }));

    return (
        <div>
            <Logo />
            <List component="nav">
                {TaxiList}
            </List>
        </div>
    )
}

export default taxiListPage;
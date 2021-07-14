import React, {useEffect, useState} from "react";
import Logo from "../../../Logo";
import styled from "styled-components";
import {TaxiApi} from "../../../api";
import {ListItem, ListItemText, List, Select, MenuItem} from "@material-ui/core";
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

const App = () => {
    const [taxi, setTaxi] = useState([]);
    const [sort, setSort] = useState(0);

    const history = useHistory();

    const sortDict = {
        0: { createdAt: 'asc' },
        1: { createdAt: 'desc' },
        2: { passenger: 'asc' },
        3: { passenger: 'desc' }
    };

    useEffect(() => {
        TaxiApi.getTaxi({ createdAt: 'asc' }).then(res => {
            setTaxi(res.data);
        });
    }, []);

    useEffect(() => {
        TaxiApi.getTaxi(sortDict[sort]).then(res => {
            setTaxi(res.data);
        });
    }, [sort]);

    const TaxiComponent = taxi.map(elem => {
        return (
            <ListItem onClick={() => history.push('/coffee/menu/stat/taxi/' + elem.id, {
                elem
            })}>
                <ListItemText primary={elem.taxiNumber} secondary={"판매 갯수: " + elem.passenger + "개"} />
            </ListItem>
        )
    });

    const handleChange = (e) => {
        setSort(e.target.value)
    }

    return (
        <div>
            <Logo />
            <ItemMenu>
                <Setting><b>택시 통계</b></Setting>
                <hr />
                <Select
                    labelId="demo-simple-select-label"
                    id='demo-simple-select'
                    value={sort}
                    onChange={handleChange}
                    fullWidth
                >
                    <MenuItem value={0}>등록 순</MenuItem>
                    <MenuItem value={1}>등록 역순</MenuItem>
                    <MenuItem value={2}>판매량 순</MenuItem>
                    <MenuItem value={3}>판매량 역순</MenuItem>
                </Select>
                <List>
                    {TaxiComponent}
                </List>
            </ItemMenu>
        </div>
    )
}

export default App;
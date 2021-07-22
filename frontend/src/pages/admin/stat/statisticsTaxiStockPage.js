import React, {useEffect, useState} from "react";
import Logo from "../../../Logo";
import styled from "styled-components";
import {ReviewApi, StockApi, TaxiApi} from "../../../api";
import {useLocation} from "react-router-dom";
import {Select, MenuItem, ListItem, ListItemText, List} from "@material-ui/core";
import MenuTitle from "../../../components/menu/MenuTitle";
import Graph from "../../../components/Graph";

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
    const [data, setData] = useState({
        recent: [],
        stock: []
    });
    const [menu, setMenu] = useState('recent');
    const [error, setError] = useState(null);
    const taxiId = match.params.taxiId;
    const location = useLocation();
    const Taxi = location.state.elem;

    useEffect(() => {
        const fetch = async () => {
            try {
                const recent = await ReviewApi.getReview({ taxiId, createdAt: 'desc' });
                const stock = await StockApi.getStock(taxiId, { sales: 'desc' });

                setData({ recent: recent.data ,stock: stock.data });
            } catch (e) {
                setError(e);
            }
        };

        fetch().catch(e => setError(e));
    }, []);

    const handleChange = (e) => {
        setMenu(e.target.value);
    }

    const DataBlock = (data[menu].map(elem => {
        let secondary;

        if (menu === 'recent') {
            const date = new Date(elem.createdAt);
            secondary = date.getFullYear() + '년 ' + date.getMonth() + '월 ' + date.getDay() + '일 ' +
                date.getHours() + '시 ' + date.getMinutes() + '분 ' + date.getSeconds() + '초'
        }
        else secondary = elem.sales + '개 판매됨';

        return (
            <ListItem>
                <ListItemText
                    primary={elem.sample[0].sampleName}
                    secondary={secondary}
                />
            </ListItem>
        )
    }));

    const graphData = data.stock.map(elem => {
        return {
            id: elem.sample[0].sampleName,
            label: elem.sample[0].sampleName,
            value: elem.sales
        }
    });

    return (
        <div>
            <Logo />
            <ItemMenu>
                <MenuTitle Title="택시 샘플 통계" showBack={true} />
                <Graph data={graphData} />
                <Select
                    labelId="demo-simple-select-label"
                    id='menuSelector'
                    value={menu}
                    onChange={handleChange}
                    fullWidth
                >
                    <MenuItem value='recent'>샘플 판매 기록</MenuItem>
                    <MenuItem value='stock'>가장 많이 판매된 샘플</MenuItem>
                </Select>
                <List>
                    {DataBlock}
                </List>
            </ItemMenu>
        </div>
    )
}

export default App
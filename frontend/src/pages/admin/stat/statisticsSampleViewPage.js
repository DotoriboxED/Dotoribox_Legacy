import React, { useState, useEffect } from 'react';
import {ReviewApi} from "../../../api";
import {List, ListItem, ListItemText, Select, MenuItem} from "@material-ui/core";
import Logo from "../../../Logo";
import styled from "styled-components";
import {useLocation} from "react-router-dom";
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
        people: [],
        sale: []
    });
    const [menu, setMenu] = useState('people');

    const sampleId = match.params.sampleId;
    const location = useLocation();

    const sampleName = location.state.sampleName;

    useEffect(() => {
        const fetch = async () => {
            try {
                const people = await ReviewApi.getReviewStat(sampleId);
                const sale = await ReviewApi.getReview({ sampleCode: sampleId });

                setData({
                    people: people.data,
                    sale: sale.data
                })
            } catch (err) {
                console.log(err);
            }
        }

        fetch().catch(err => console.log(err));
    }, []);

    const PeopleBlock = (data[menu].map(elem => {
        if (menu === 'people') {
            let gender;
            if (elem._id.isMale) gender = '남성';
            else gender = '여성';

            return (
                <ListItem>
                    <ListItemText
                        primary={elem._id.age + '대, ' + gender}
                        secondary={elem.count + '명 가져감'}
                    />
                </ListItem>
            )
        } else {
            const date = new Date(elem.createdAt);

            return (
                <ListItem>
                    <ListItemText
                        primary={elem.sample[0].sampleName}
                        secondary={date.getFullYear() + '년 ' + date.getMonth() + '월 ' + date.getDay() + '일 ' +
                        date.getHours() + '시 ' + date.getMinutes() + '분 ' + date.getSeconds() + '초'}
                    />
                </ListItem>
            )
        }
    }));

    const graphData = data['people'].map(elem => {
        let gender;
        if (elem._id.isMale) gender = '남성';
        else gender = '여성';

        const title = elem._id.age + '대 ' + gender
        return {
            id: title,
            label: title,
            value: elem.count
        }
    });

    const handleChange = (e) => {
        setMenu(e.target.value);
    }

    return (
        <div>
            <Logo />
            <ItemMenu>
                <MenuTitle Title={sampleName} showBack={true} />
                <Graph data={graphData} />
                <Select
                    labelId="demo-simple-select-label"
                    id='menuSelector'
                    value={menu}
                    onChange={handleChange}
                    fullWidth
                >
                    <MenuItem value='people'>사용자 기록</MenuItem>
                    <MenuItem value='sale'>판매 기록</MenuItem>
                </Select>
                <List>
                    {PeopleBlock}
                </List>
            </ItemMenu>
        </div>
    )
}

export default App;
import React, { useState, useEffect } from 'react';
import {ReviewApi} from "../../../api";
import {List, ListItem, ListItemText} from "@material-ui/core";
import Logo from "../../../Logo";
import styled from "styled-components";
import {useLocation} from "react-router-dom";

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
    const [people, setPeople] = useState([]);
    const sampleId = match.params.sampleId;
    const location = useLocation();

    const sampleName = location.state.sampleName;

    useEffect(() => {
        ReviewApi.getReviewStat(sampleId).then(res => {
            setPeople(res.data);
            console.log(res.data);
        });
    }, []);

    const PeopleBlock = (people.map(elem => {
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
    }));

    return (
        <div>
            <Logo />
            <ItemMenu>
                <Setting><b>{sampleName}</b></Setting>
                <hr />
                <List>
                    {PeopleBlock}
                </List>
            </ItemMenu>
        </div>
    )
}

export default App;
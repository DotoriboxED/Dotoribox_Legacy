import React, {useEffect, useState} from 'react';
import MenuTitle from "../../../components/menu/MenuTitle";
import styled from "styled-components";
import {useLocation} from "react-router-dom";
import {ReviewApi} from "../../../api";
import Logo from "../../../Logo";
import {List, ListItem, ListItemText} from "@material-ui/core";
import SampleListItem from "../../../components/SampleListItem";

const ItemMenu = styled.div`
    flex: 1;
    overflow-y: auto;
    margin: 10px;
`;

const App = ({ match }) => {
    const location = useLocation();
    const sampleName = location.state.sampleName;
    const { sampleId, taxiId } = match.params;
    const [data, setData] = useState([]);

    useEffect(() => {
        ReviewApi.getReview({ sampleCode: sampleId, taxiId }).then(res => {
            setData(res.data);
        });
    });

    const Lists = (data.map(elem => {
        return <SampleListItem primary={elem.sample[0].sampleName} date={elem.createdAt}/>
    }));

    return (
        <div>
            <Logo />
            <MenuTitle Title={sampleName} showBack={true} />
            <ItemMenu>
                <List>
                    {Lists}
                </List>
            </ItemMenu>
        </div>
    )
}

export default App;

import React, {useEffect, useState} from 'react';
import Logo from '../../../Logo';
import styled from "styled-components";
import {SampleApi} from "../../../api";
import {ListItem, ListItemText, List} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import MenuTitle from "../../../components/menu/MenuTitle";
import Graph from '../../../components/Graph';

const ItemMenu = styled.div`
    flex: 1;
    overflow-y: auto;
    margin: 10px;
`;

const App = () => {
    const [sample, setSample] = useState([]);
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        SampleApi.getList().then(res => {
            setSample(res.data);

            const data = res.data.map(elem => {
                return {
                    id: elem.sampleName,
                    label: elem.sampleName,
                    value: elem.stock.sales
                }
            });

            setGraphData(data);
        });
    }, []);

    const history = useHistory();

    const Samples = (sample.map(elem => {
        return (
            <ListItem Button>
                <ListItemText
                    primary={elem.sampleName}
                    secondary={elem.stock.sales + '개 판매됨'}
                    onClick={() => { history.push('/coffee/menu/stat/sample/' + elem.id,
                        { sampleName: elem.sampleName }) }}
                />
            </ListItem>
        )
    }));

    return (
        <div>
            <Logo />
            <ItemMenu>
                <MenuTitle Title="샘플 통계" showBack={true} />
                <Graph data={graphData} />
                <List>
                    {Samples}
                </List>
            </ItemMenu>
        </div>
    )
}

export default App;
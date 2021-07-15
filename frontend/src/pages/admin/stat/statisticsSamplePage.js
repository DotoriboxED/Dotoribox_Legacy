import React, {useEffect, useState} from 'react';
import Logo from '../../../Logo';
import styled from "styled-components";
import {SampleApi} from "../../../api";
import {ListItem, ListItemText, List} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const ItemMenu = styled.div`
    flex: 1;
    overflow-y: auto;
    margin: 10px;
`;

const Setting = styled.div`
    font-size: 2rem;
    margin: 10px;
    text-align: center;
`;
// 성별 나이 통계
// 고유번호 통계

const App = () => {
    const [sample, setSample] = useState([]);

    useEffect(() => {
        SampleApi.getList().then(res => {
            setSample(res.data);
        });
    }, []);

    const history = useHistory();

    const Samples = (sample.map(elem => {
        return (
            <ListItem Button>
                <ListItemText
                    primary={elem.sampleName}
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
                <Setting><b>샘플 통계</b></Setting>
                <hr />
                <List>
                    {Samples}
                </List>
            </ItemMenu>
        </div>
    )
}

export default App;
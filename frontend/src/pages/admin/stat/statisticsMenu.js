import React from 'react';
import Logo from "../../../Logo";
import Item from '../../../components/menu/MenuBlock'
import styled from "styled-components";

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
    return (
        <div>
            <Logo />
            <ItemMenu>
                <Setting><b>기록 및 통계</b></Setting>
                <hr />
                <Item title='택시' explain='택시 관련 통계를 봅니다.' path='/coffee/menu/stat/taxi' isUpper={false}/>
                <Item title='샘플' explain='샘플 관련 통계를 봅니다.' path='/coffee/menu/stat/sample' isUpper={false}/>
            </ItemMenu>
        </div>
    )
}

export default App;
import React from 'react';
import styled from 'styled-components';
import Item from './MenuBlock';
import { useHistory } from 'react-router-dom';
import { ReactComponent as BackButton } from '../../image/back.svg';
import MenuTitle from "./MenuTitle";

const ItemMenu = styled.div`
    flex: 1;
    overflow-y: auto;
    margin: 10px;
`

const Setting = styled.div`
    font-size: 2rem;
    margin: 10px;
    text-align: center;
    top: 0;
    left: 40%
`

const TitleBar = styled.div`
    width: 100%;
    height: 3rem;
    position: relative;
`

const BackBtn = styled.div`
    position: absolute;
    top: 1rem;
    left: 0.5rem;
`

const App = () => {
    const history = useHistory();

    const onClickHandler = (path) => {
        history.push('/coffee/menu/' + path);
    }

    return (
        <ItemMenu>
            <MenuTitle Title="설정" />
            <Item title='샘플 관리' explain='샘플을 생성/수정/삭제합니다.' path='/coffee/menu/sample' isUpper={false}/>
            <Item title='택시 관리' explain='택시를 생성/수정/삭제합니다.' path='/coffee/menu/taxi' isUpper={false} />
            <Item title='기록 및 통계' explain='택시/샘플의 기록을 조회합니다.' path='/coffee/menu/stat' isUpper={false} />
        </ItemMenu>
    )
}

export default App;
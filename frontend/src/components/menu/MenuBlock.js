import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Title = styled.div`
    font-size: 1.6rem;
`

const Explain = styled.div`
    font-size: 0.9rem;
`

const Item = styled.div`
    margin: 10px;
`

const App = ({title, explain, path}) => {
    const history = useHistory();

    return (
        <Item onClick={() => { history.push(path); }}>
            <Title><b>{title}</b></Title>
            {
                explain && <Explain>{explain}</Explain>
            }
        </Item>
    )
}

export default App;
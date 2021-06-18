import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Title = styled.div`
    font-size: 1.4rem;
`

const Explain = styled.div`
    font-size: 0.9rem;
`

const Item = styled.div`
    margin: 10px;
`

const App = ({title, explain, path, isUpper}) => {
    const history = useHistory();

    return (
        <div>
            <Item onClick={() => { history.push(path); }}>
                {
                    isUpper && explain && <Explain>{explain}</Explain>
                }
                <Title><b>{title}</b></Title>
                {
                    !isUpper && explain && <Explain>{explain}</Explain>
                }
            </Item>
        </div>
    )
}

export default App;
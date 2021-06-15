import React, { useState } from 'react';
import styled from 'styled-components';

const Title = styled.div`
    float: left;
    vertical-align: middle;
    font-size: 1.2rem;
`

const Item = styled.div`
    margin: 10px;
    width: 90%;
`

const Input = styled.div`
    float: right;
    vertical-align: middle;
`

const App = ({name, sampleId}) => {

    return (
        <div>
            <Item>
                <Title onClick={() => { console.log('Clicked!'); }}>{name} </Title>
            </Item>
        </div>
    )
}

export default App;
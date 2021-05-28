import React from 'react';
import styled from 'styled-components';

import StarSVG from '../image/star.svg';
import NonStarSVG from '../image/nonstar.svg';

const StarBox = styled.div`
    padding-right: 0.5rem;
`

const App = (props) => {
    const { isStar } = props;

    return (
        <div>
        {
            isStar ? <div><img src={StarSVG}/></div>
            : <div><img src={NonStarSVG}/></div>
        }
        </div>
    )
}

export default App;
import React from 'react';
import styled from 'styled-components';

import { ReactComponent as StarSVG } from '../image/star.svg';
import { ReactComponent as NonStarSVG } from '../image/nonstar.svg';

const StarBox = styled.div`
    padding-right: 0.5rem;
`

const App = (props) => {
    const { isStar } = props;

    return (
        <div>
        {
            isStar ? <StarBox><StarSVG/></StarBox>
            : <StarBox><NonStarSVG/></StarBox>
        }
        </div>
    )
}

export default App;
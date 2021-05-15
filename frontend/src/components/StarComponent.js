import React from 'react';
import { ReactComponent as StarSVG } from '../image/star.svg';
import { ReactComponent as NonStarSVG } from '../image/nonstar.svg';

const App = (props) => {
    const { isStar } = props;

    return (
        <div>
        {
            isStar ? <StarSVG/>
            : <NonStarSVG/>
        }
        </div>
    )
}

export default App;
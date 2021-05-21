import React, {useMemo} from 'react';
import styled from 'styled-components';
import StarIcon from './StarComponent';

const StarBox = styled.div`
    margin: 1rem 0 0.6rem 0;
`

const App = (props) => {
    const { index, rating, onSaveRating } = props;

    const fillColor = useMemo(() => {
        if (rating >= index) return true;
        return false
    }, [rating, index])

    return (
        <div   
            onClick={() => onSaveRating(index)}
        >
            <StarBox>
                <StarIcon isStar={fillColor} />
            </StarBox>
        </div>
    )
}

export default App;
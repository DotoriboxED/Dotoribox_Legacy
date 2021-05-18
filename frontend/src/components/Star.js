import React, {useMemo} from 'react';
import StarIcon from './StarComponent';

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
            <StarIcon isStar={fillColor} />
        </div>
    )
}

export default App;
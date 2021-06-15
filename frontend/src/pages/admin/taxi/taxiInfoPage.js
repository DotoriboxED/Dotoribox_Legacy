import React, { useState, useEffect } from 'react';

import { TaxiApi } from '../../../api';

const taxiInfoPage = ({ match }) => {
    const [taxiInfo, setTaxiInfo] = useState({
        taxi: undefined,
        customer: undefined
    });
    const { taxiId } = match.params;

    useEffect(() => {
        TaxiApi.getTaxiInfo(taxiId).then((res) => {
            setTaxiInfo({ taxi: res.data })
        });
        
    }, [])

    return (
        <div>

        </div>
    )
}

export default taxiInfoPage;
import React from 'react';

import CommonBanner from './components/CommonBanner';

const GuestBanner = ({ page }) => {
    return (
        <CommonBanner
            image='/static/images/bg-home.png'
            title='Find the most existing jobs.'
            subtitle='Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative to'
            page={page}
        />
    )
}

export default GuestBanner;

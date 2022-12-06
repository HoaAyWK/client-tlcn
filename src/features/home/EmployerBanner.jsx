import React from 'react';

import CommonBanner from './components/CommonBanner';

const EmployerBanner = () => {
    return (
        <CommonBanner
            image='/static/images/search_freelancer.png'
            title='Search Freelancers'
            subtitle='Find the best freelancers for any job online.'
        />
    )
};

export default EmployerBanner;
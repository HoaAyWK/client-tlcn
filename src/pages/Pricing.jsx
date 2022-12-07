import React, { useState } from 'react';
import { Grid, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Loading, Page } from '../components';
import PricingItem from '../features/pricing/PricingItem';
import { getPricings, selectAllPricings } from '../features/pricing/pricingSlice';
import { useEffect } from 'react';
import { ACTION_STATUS } from '../constants';
import CancelledCheckoutDialog from '../features/pricing/CancelledCheckoutDialog';

const Pricing = () => {
    const { status } = useSelector(state => state.pricings);
    const { status: getCheckoutStatus } = useSelector(state => state.checkout);
    const pricings = useSelector(selectAllPricings);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const cancelled = searchParams.get('cancelled');
    const [open, setOpen] = useState(cancelled || false);
    const navigate = useNavigate();

    useEffect(() => {
        if (status === ACTION_STATUS.IDLE) {
            dispatch(getPricings());
        }
    }, [status, dispatch]);

    const handleClose = () => {
        navigate('/pricing');
        setOpen(false);
    };

    return (
        <Page title='Pricing'>
            {getCheckoutStatus === ACTION_STATUS.LOADING ? (
                <Loading />
            ) : (
                <Container maxWidth='lg' sx={{ paddingBlockStart: 5 }} >
                    <>
                        <Grid container spacing={2}>
                            {pricings?.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item}>
                                    <PricingItem item={item} />
                                </Grid>
                            ))}
                        </Grid>
                        <CancelledCheckoutDialog open={open} handleClose={handleClose} />
                    </>
                </Container>
            )}
        </Page>
    )
}

export default Pricing;

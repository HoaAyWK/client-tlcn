import {
    Grid, 
    IconButton, 
    InputAdornment} from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react';
import { FormProvider, RHFTextField } from '../../components/hook-form';
function InputField({handleSubmit, onSubmit, methods}) {
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item sx={{flex: 1}}>
                    <RHFTextField name="jobSearch" label="Find Jobs"
                        InputProps={{
                            endAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <Icon icon="material-symbols:search" onClick={handleSubmit(onSubmit)}/>
                                </IconButton>
                            </InputAdornment>
                            )
                        }}
                    />
                </Grid>
            </Grid>
        </FormProvider>
    );
}

export default InputField;
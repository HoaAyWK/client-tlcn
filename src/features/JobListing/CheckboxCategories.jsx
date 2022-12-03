import React from 'react';
import { FormProvider, RHFCheckbox } from '../../components/hook-form';

function CheckboxCategories(props) {
    const {handleSubmit, onSubmit, methods, data} = props
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {data.map((item) => 
            <RHFCheckbox
                key={item.value}
                sx={{ 
                    display: 'block',
                    '& .MuiTypography-root': {
                        color: '#3a3a3a', 
                        fontSize: '20px', 
                        fontWeight: '200',
                        fontFamily: 'system-ui'
                    }
                }} 
                name={`category${item.value}`} 
                label={item.label}
            />)}
        </FormProvider>
    );
}

export default CheckboxCategories;
import React from 'react';
import { FormProvider, RHFCheckbox } from '../../components/hook-form';

function CheckboxCategories(props) {
    const { handleSubmit, onSubmit, methods, data } = props
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {data.map((item) => 
                <RHFCheckbox
                    key={item.name}
                    sx={{ 
                        display: 'block',
                        '& .MuiTypography-root': {
                            color: '#3a3a3a', 
                            fontSize: '20px', 
                            fontWeight: '200',
                            fontFamily: 'system-ui'
                        }
                    }} 
                    name={item.name} 
                    label={item.name}
                />
            )}
        </FormProvider>
    );
}

export default CheckboxCategories;
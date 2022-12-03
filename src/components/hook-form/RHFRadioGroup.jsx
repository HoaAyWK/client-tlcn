import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const RHFRadioGroup = ({ name, id, label, items, ...other }) => {
    const { control } = useFormContext();
    return (
        <FormControl>
            <FormLabel id={id}>{label}</FormLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <RadioGroup {...field} { ...other } arial-labelledby={id}>
                        {items.map((item) => (
                            <FormControlLabel
                                key={item}
                                value={item}
                                control={<Radio />}
                                label={item}
                            />
                        ))}
                    </RadioGroup>
                )}
            />
        </FormControl>
    )
};

export default RHFRadioGroup;
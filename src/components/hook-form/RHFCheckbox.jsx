import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

export const RHFCheckbox = ({ name, ...other }) => {
    const { control } = useFormContext();
    
    return (
        <FormControlLabel
            control={
                <Controller
                name={name}
                control={control}
                render={({ field }) => <Checkbox {...field} checked={field.value} />}
                />
            }
            {...other}
        />
    );
};

RHFCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
};

export const RHFMultiCheckbox = ({ name, options, ...other }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const onSelected = (option) =>
                field.value.includes(option) ? field.value.filter((value) => value !== option) : [...field.value, option];
        
                return (
                <FormGroup>
                    {options.map((option) => (
                        <FormControlLabel
                            key={option.value}
                            control={
                                <Checkbox
                                    checked={field.value.includes(option.value)}
                                    onChange={() => field.onChange(onSelected(option.value))}
                                />
                            }
                            label={option.label}
                            {...other}
                        />
                    ))}
                </FormGroup>
                );
            }}
        />
    );
};

RHFMultiCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
};
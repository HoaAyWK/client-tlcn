import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { FormControl, Select, InputLabel, MenuItem, ListItemText, Checkbox } from '@mui/material';

const RHFTextField = ({ name, data, defaultValue, id, label, ...other }) => {
    const [items, setItems] = useState(defaultValue);

    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                    <FormControl fullWidth>
                    <InputLabel id={id}>{label}</InputLabel>
                    <Select
                        {...field}
                        labelId={id}
                        label={id}
                        multiple
                        onChange={(event) => {
                            setItems(event.target.value);
                            field.onChange(event.target.value);
                        }}
                        value={items}
                        
                        defaultValue={defaultValue}
                        {...other}
                        renderValue={(selected) => {
                            const values = [];
                            selected.forEach(item => {
                                const value = data.find(e => e.id === item);
                                values.push(value?.name);
                            });

                            return values.join(', ');
                        }}
                    >
                        {data.map((item) => (
                            <MenuItem value={item.id} key={item.id}>
                                <Checkbox checked={items.indexOf(item.id) > -1} />
                                <ListItemText primary={item.name} />
                            </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
            )}
        />
    );
};

RHFTextField.propTypes = {
    name: PropTypes.string,
};

export default RHFTextField;
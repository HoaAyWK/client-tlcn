import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { FormControl, Select, InputLabel, MenuItem, ListItemText, Checkbox } from '@mui/material';

const RHFTextField = ({ name, data, id, label, ...other }) => {
    const [items, setItems] = useState([]);
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
                        defaultValue={[]}
                        value={items}
                        {...other}
                        renderValue={(selected) => selected.map((item) => (item.name)).join(', ')}
                    >
                        {data.map((item) => (
                            <MenuItem value={item} key={item.id}>
                                <Checkbox checked={items.indexOf(item) > -1} />
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
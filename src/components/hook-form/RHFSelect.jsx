import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const MenuProps = {
    variant: "menu",
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "left"
    }
};

const RHFSelect = ({ name, id, label, data }) => {
    const { control } = useFormContext();
    const [open, setOpen] = useState(false);

    return (
        <FormControl fullWidth>
            <InputLabel id={id}>
                {label}
            </InputLabel>
        
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return (
                            <Select
                                {...field}
                                fullWidth
                                labelId={id}
                                label={label}
                                value={field.value}
                                // Todo
                                onClose={() => {
                                    setOpen(false);
                                }}
                                onOpen={() => setOpen(true)}
                                open={open}
                                displayEmpty={true}
                                MenuProps={MenuProps}
                            >
                                {data?.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                    )
                }}
                
            />
        </FormControl>
    );
};

export default RHFSelect;
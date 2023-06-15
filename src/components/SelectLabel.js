import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useState} from "react";

const SelectLabel = () => {
    const [date, setDate] = useState('month');

    const handleChange = (event: SelectChangeEvent) => {
        setDate(event.target.value);
        alert(event.target.value);
    };

    return (
        <div>
            {/*<FormControl sx={{ m: 0, minWidth: 80, minHeight: 30 }}>*/}
            <FormControl>
                <Select
                    value={date}
                    onChange={handleChange}
                    // displayEmpty
                    // inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={'month'}>월</MenuItem>
                    <MenuItem value={'week'}>주</MenuItem>
                    <MenuItem value={'day'}>일</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectLabel;
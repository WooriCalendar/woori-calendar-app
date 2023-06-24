import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useState} from "react";

const SelectLabel = ({initialView}) => {
    const [date, setDate] = useState('dayGridMonth');

    const handleChange = (event) => {
        console.log(event.target.value)
        setDate(event.target.value);
        initialView(event)
    };

    return (
        <div>
            {/*<FormControl sx={{ m: 0, minWidth: 80, minHeight: 30 }}>*/}
            <FormControl>
                <Select
                    defaultValue={date}
                    onChange={handleChange}
                    // displayEmpty
                    // inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={'dayGridMonth'}>월</MenuItem>
                    <MenuItem value={'dayGridWeek'}>주</MenuItem>
                    <MenuItem value={'dayGridDay'}>일</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectLabel;
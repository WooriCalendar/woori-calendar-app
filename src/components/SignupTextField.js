import React from 'react';
import {TextField} from "@mui/material";

const SignupTextField = (props) => {

    return (
        <TextField
            variant="outlined"
            required
            fullWidth
            id={props.value}
            name={props.value}
            label={props.value}
            type={props.value === 'password' ? 'password' : ''}
            autoComplete={props.value}
        />
    );
};

export default SignupTextField;
import React from 'react';
import {TextField} from "@mui/material";

/**
 * @author: DGeon
 * @comment: 회원정보를 위한 컴포넌트
 * @date: 2023-06-08
 */
const SignupTextField = ({value, onChange}) => {
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        onChange(newValue);
    };

    return (
        <TextField
            variant="outlined"
            required
            fullWidth
            id={value.value}
            name={value.value}
            label={value.value}
            type={value.value === 'password' ? 'password': value.value === 'passwordcheck' ? 'password' : '' }
            autoComplete={value.value}
            style={{marginTop: "5%"}}
            tabIndex={-1}
            inputProps={{ tabIndex: -1 }}
            onBlur={value.checkEmail}
            disabled={value.btnSendEmailDisabled || value.sendCodeDisabled}
            onChange={handleInputChange}
        />
    );
};

export default SignupTextField;
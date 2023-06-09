import React from 'react';
import {TextField} from "@mui/material";

/**
 * @author: DGeon
 * @comment: 회원정보를 위한 컴포넌트
 * @date: 2023-06-08
 */
const SignupTextField = (props) => {
    return (
        <TextField
            variant="outlined"
            required
            fullWidth
            id={props.value}
            name={props.value}
            label={props.value}
            type={props.value === 'password' ? 'password': props.value === 'passwordcheck' ? 'password' : '' }
            autoComplete={props.value}
            style={{marginTop: "5%"}}
            tabIndex={-1}
            inputProps={{ tabIndex: -1 }}
            onBlur={props.checkEmail}
        />
    );
};

export default SignupTextField;
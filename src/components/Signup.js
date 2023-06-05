import React from 'react';
import {Button, Container, Grid, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {signup} from "../service/ApiService";
/**
 * 파일명: Signup.js
 * 작성자: 이동건
 * 작성일: 2023-05-31
 * 설명: 회원가입 폼을 위한 컴포넌트
 */
const Signup = () => {
    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get("email");
        const password = data.get("password");
        const nickname = data.get("nickname");
        const subemail = data.get("subemail");
        const birthday = data.get("birthday");
        const regDate = data.get("regDate");
        const updateDate = data.get("updateDate");
        signup({email, password, nickname,  subemail, birthday, regDate, updateDate}).then(
            (resp) => (window.location.href = "/login")
        );
    }
    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        Account Create
                    </Typography>
                </Grid>
            </Grid>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="password"
                            type="password"
                            autoComplete="current-password"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="nickname"
                            name="nickname"
                            label="nickname"
                            type="nickname"
                            autoComplete="nickname"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="subemail"
                            name="subemail"
                            label="subemail"
                            type="subemail"
                            autoComplete="subemail"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="birthday"
                            name="birthday"
                            label="birthday"
                            type="birthday"
                            autoComplete="birthday"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Account Create
                        </Button>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item>
                        <Link to="/login" variant="body2">
                            Already have an account? sign in.
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Signup;
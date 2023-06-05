import React from "react";
import { signin, socialLogin } from "../service/ApiService";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const email = data.get("email");
        const password = data.get("password");
        console.log("email", email);
        console.log("password", password);
        signin({ email: email, password: password }).then((resp) => {
            console.log("login", resp);
        });
    };

    const handleSocialLogin = (provider) => {
        socialLogin(provider);
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            style={{ marginTop: "8%", marginBottom: 20 }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        Login
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
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            type="password"
                            label="password"
                            autoComplete="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Login
                        </Button>
                    </Grid>
                   {/* <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{ background: "#000" }}
                            onClick={() => {
                                handleSocialLogin("github");
                            }}
                        >
                            GitHub Login
                        </Button>
                    </Grid>*/}
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{ background: "#ff0", color: "#000" }}
                            onClick={() => {
                                handleSocialLogin("google");
                            }}
                        >
                            Google Login
                        </Button>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item>
                        <Link to="/Signup" variant="body2">
                            Don't have an account? sign up here
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Login;

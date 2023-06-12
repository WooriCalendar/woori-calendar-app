import React from "react";
import {signin, socialLogin} from "../service/ApiService";
import {Button, Container, Grid, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import LoginSvg from "./LoginSvg";

/**
 * @author        : DGeon
 * @Comment       : 로그인, Oauth로그인
 * @date          : 2023-06-07
 *
 */
const Login = () => {
    /**
     * @author        : DGeon
     * @Comment       : TextField에 입력된 email, password를 MemberDTO형태로 백엔드에 전송
     * @date          : 2023-06-07
     *
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const email = data.get("email");
        const password = data.get("password");
        console.log("email", email);
        console.log("password", password);
        signin({email: email, password: password}).then((resp) => {
            console.log("login", resp);
        });
    };

    /**
     * @author        : DGeon
     * @Comment       : Google 로그인
     * @date          : 2023-06-07
     *
     */
    const handleSocialLogin = (provider) => {
        socialLogin(provider);
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            style={{marginTop: "8%", marginBottom: "2%"}}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5" style={{marginBottom : "2%"}}>
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
                            style={{marginBottom : "2%"}}
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
                            style={{marginBottom : "2%"}}
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
                            style={{background: "#fff", color: "#000" ,marginBottom : "2%"}}
                            onClick={() => {
                                handleSocialLogin("google");
                            }}
                        >
                            <LoginSvg/>
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

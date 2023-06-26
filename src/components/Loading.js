import React from 'react';
import {Container, Grid} from "@mui/material";
import companyLogo from "../assets/logo(ver3).png";
import {TailSpin} from "react-loader-spinner";


const Loading = () => {
    return (
        <Container
            component="main"
            maxWidth="xs"
            style={{marginTop: "8%", marginBottom: "2%"}}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <img src={companyLogo} alt="Woori. logo" style={{width: "100%", marginBottom: "10%"}}/>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{width : 400, textAlign : "center", marginTop : 20}}>
                        <div style={{display : "inline-block"}}>
                            <TailSpin
                                color="#7cc6ff"
                                height={100}
                                width={100}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Loading;
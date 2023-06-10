import {AppBar, Button, Grid, Toolbar, Typography} from "@mui/material";
import React from "react";
import {signout} from "../service/ApiService";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import logoImage from '../assets/logo(ver3)small.png';

/**
 * @author        : DGeon
 * @Comment       : 웹 상단에 표시 하는 부분
 * @date          : 2023-06-07
 *
 */
const Navigation = () => {

    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <Grid container spacing={2} alignItem="center">
                    <Grid item style={{ marginTop : 10}}>
                        <FontAwesomeIcon icon={faBars} className="bar fa-2x"/>
                    </Grid>
                    <Grid item style={{ marginTop : 0}}>
                        <img src={logoImage} alt="Logo Image"/>
                    </Grid>
                    <Grid item style={{ marginTop : '10px'}}>
                        <Typography variant="h6">Woori Calendar</Typography>
                    </Grid>
                    <Grid item style={{ marginLeft : 'auto', marginTop : '10px'}}>
                        <Button color="inherit" onClick={signout}>
                            Logout
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;

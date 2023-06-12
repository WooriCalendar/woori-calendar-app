import {AppBar, Button, Grid, Toolbar, Typography} from "@mui/material";
import React from "react";
import {signout} from "../service/ApiService";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import logoImage from '../assets/logo(ver3)small.png';

const Navigation = (
    {SideBar}
) => {
    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <Grid container spacing={2} alignItem="center">
                    <Grid item style={{ marginTop : '10px'}}>
                        <FontAwesomeIcon onClick={SideBar} icon={faBars} className="bar fa-2x"/>
                    </Grid>
                    <Grid item style={{ marginTop : '0px'}}>
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

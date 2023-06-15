import {
    AppBar,
    Button,
    Grid,
    Toolbar,
    Typography
} from "@mui/material";
import React from "react";
import {signout} from "../service/ApiService";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import logoImage from '../assets/logo(ver3)small.png';
import SelectLabel from "./SelectLabel";
import Notification from "./Notification";

const Navigation = (
    {SideBar}
) => {
    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <Grid container spacing={2} align-item="center">
                    <Grid item style={{marginTop: '10px'}}>
                        <Button>
                            <FontAwesomeIcon onClick={SideBar} icon={faBars} size="2xl" style={{color: "black"}}/>
                        </Button>
                    </Grid>
                    <Grid item style={{marginTop: '0px'}}>
                        <img src={logoImage} alt="Logo Image"/>
                    </Grid>
                    <Grid item style={{marginTop: '10px'}}>
                        <Typography variant="h6">Woori Calendar</Typography>
                    </Grid>
                    <Grid item style={{marginLeft: 'auto', marginTop: '10px'}}>
                        <Notification/>
                    </Grid>
                    <Grid item>
                        <SelectLabel/>
                    </Grid>
                    <Grid item style={{marginLeft: '0', marginTop: '10px'}}>
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

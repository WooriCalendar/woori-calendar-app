import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import { signout } from "../service/ApiService";

const Navigation = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid justifyContent="space-between" container>
                    <Grid item>
                        <Typography variant="h6">Woori Calendar</Typography>
                    </Grid>
                    <Grid item>
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

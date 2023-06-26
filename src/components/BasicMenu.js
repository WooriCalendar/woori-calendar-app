import {Button, Fab, Menu, MenuItem, TextField, Typography} from "@mui/material";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";

const BasicMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button variant="outlined"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                    size="large"
                    sx={{borderRadius: '20px'}}
            >
                {/*<Fab variant="extended">*/}
                    <AddIcon sx={{ mr: 1 }} />
                    만들기
                {/*</Fab>*/}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Link to={"/schedule"} style={{ textDecoration: 'none', color: 'black' }}>
                <MenuItem onClick={handleClose}><Typography variant="subtitle2">일정추가</Typography></MenuItem>
                </Link>
                <Link to={"/calendar"} style={{ textDecoration: 'none', color: 'black' }}>
                <MenuItem onClick={handleClose}><Typography variant="subtitle2">캘린더추가</Typography></MenuItem>
                </Link>
            </Menu>
        </div>
    );
}
export default BasicMenu;
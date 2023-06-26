import '../css/Sidebar.css';
import FullCalendars from "./FullCalendars";
import Category from "./Category";
import {Button, Fab, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import BasicMenu from "./BasicMenu";


const Sidebar = ({visible, aspectRatio, height, contentHeight, onCategoryChange}, props) => {
    const headerToolbar = {
        left: '',
        center: '',
        right: '',
    };

    return (
        <div>
            {visible && (
                <div className="slide-out">
                    <BasicMenu />
                    {/*<Fab variant="extended">*/}
                    {/*    <AddIcon sx={{ mr: 1 }} />*/}
                    {/*    만들기*/}
                    {/*</Fab>*/}
                    {/*<Link to={"/schedule"}>*/}
                        {/*<Button variant="outlined" color="primary">*/}
                            {/*<FontAwesomeIcon icon={faPlus} size={"xl"}/>*/}
                            {/*<Typography>만들기</Typography>*/}
                        {/*</Button>*/}
                    {/*</Link>*/}
                    <FullCalendars
                        headerToolbar={headerToolbar}
                        heigth={height}
                        contentHeight={contentHeight}
                        aspectRatio={aspectRatio}
                    />
                    <form>
                        <TextField
                            label="검색"
                            variant="outlined"
                            size="small"
                        />
                    </form>
                    <Category onCategoryChange={onCategoryChange}/>
                </div>
                )}
        </div>
    );
};
export default Sidebar;
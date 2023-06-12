import '../css/Sidebar.css';
import FullCalendars from "./FullCalendars";
import Category from "./Category";
import {Button, IconButton, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import {Container, Grid} from "@mui/material";

const Sidebar = (
    {visible, aspectRatio, height, contentHeight}
) => {
    const headerToolbar = {
        left: '',
        center: '',
        right: '',
    };
    return (
        <div>
            <Button variant="contained" color="primary">
                일정추가버튼
            </Button>
            {visible && (
                <div className="slide-out">
                    <FullCalendars
                        headerToolbar={headerToolbar}
                        heigth={height}
                        contentHeight={contentHeight}
                        aspectRatio={aspectRatio}
                    />
                </div>
            )}
            <form>
                <TextField
                    label="검색"
                    variant="outlined"
                    size="small"
                />
            </form>
            <Category/>
        </div>
    );
};
export default Sidebar;
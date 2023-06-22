import '../css/Sidebar.css';
import FullCalendars from "./FullCalendars";
import Category from "./Category";
import {Button, TextField} from "@mui/material";
import {Link} from "react-router-dom";

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
                    <Link to={"/schedule"}>
                        <Button variant="contained" color="primary">
                            일정추가버튼
                        </Button>
                    </Link>
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
                    <Link to={"/calendar"}>
                        <Button variant="contained" color="primary">
                            캘린더추가버튼
                        </Button>
                    </Link>
                    <Category onCategoryChange={onCategoryChange}/>
                </div>
                )}
        </div>
    );
};
export default Sidebar;
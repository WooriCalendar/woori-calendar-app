import '../css/Sidebar.css';
import FullCalendarMonth from "./FullCalendarMonth";

const Sidebar = (
    {visible}
) => {
    return (


        <div>
            {visible && (
                <div className="slide-out">
                    <FullCalendarMonth
                    />
                </div>
            )}
        </div>
    );
};

export default Sidebar;
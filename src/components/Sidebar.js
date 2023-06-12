import '../css/Sidebar.css';
import FullCalendars from "./FullCalendars";

const Sidebar = (
    {visible}
) => {
    return (
        <div>
            {visible && (
                <div className="slide-out">
                    <FullCalendars
                    />
                </div>
            )}
        </div>
    );
};

export default Sidebar;
import '../css/Sidebar.css';
import FullCalendars from "./FullCalendars";

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
        </div>
    );
};

export default Sidebar;
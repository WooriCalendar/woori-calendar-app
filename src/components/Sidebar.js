import React, { useState } from 'react';
import '../../src/Sidebar.css'; // 스타일링을 위한 CSS 파일 import

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button onClick={toggleSidebar}><FontAwesomeIcon icon="fa-solid fa-bars" /></button>
            <div className="sidebar-content">여기다가 이것저것만들거에요</div>
        </div>
    );
};

export default Sidebar;
import './App.css';
import FullCalendarMonth from "./components/FullCalendarMonth";
import Navigation from "./components/Navigation"
import {Container} from "@mui/material";
import {useState} from "react";
import FullCalendarDay from "./components/FullCalendarDay";
import FullCalendarWeek from "./components/FullCalendarWeek";
import FullCalendarDayDetail from "./components/FullCalendarDayDetail";
import Sidebar from "./components/Sidebar";


function App() {

    const [currentPage, setCurrentPage] = useState('2');

    const handleButtonClick = (page) => {
        setCurrentPage(page);
    };

    return (
            <div className="App">
                <Navigation />
                <Container maxWidth="md">
                    {/*<Sidebar />*/}
                    <div>
                        <button onClick={() => handleButtonClick('1')}>1</button>
                        <button onClick={() => handleButtonClick('2')}>2</button>
                        <button onClick={() => handleButtonClick('3')}>3</button>
                        <button onClick={() => handleButtonClick('4')}>4</button>

                        {currentPage === '1' && <FullCalendarDay />}
                        {currentPage === '2' && <FullCalendarMonth />}
                        {currentPage === '3' && <FullCalendarWeek />}
                        {currentPage === '4' && <FullCalendarDayDetail />}
                    </div>
                </Container>
            </div>
    );
}

export default App;

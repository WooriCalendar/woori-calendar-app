import './App.css';
import Navigation from "./components/Navigation"
import {Container} from "@mui/material";
import Sidebar from "./components/Sidebar";
import FullCalendars from "./components/FullCalendars";

function App() {
    return (
            <div className="App">
                <Navigation />
                <Container maxWidth="md">
                    <Sidebar />
                    <FullCalendars />
                </Container>
            </div>
    );
}

export default App;

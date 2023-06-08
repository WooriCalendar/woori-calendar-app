import './App.css';
import FullCalendarMonth from "./components/FullCalendarMonth";
import Navigation from "./components/Navigation"
import {Container} from "@mui/material";
import {useEffect} from "react";
import {call} from "./service/ApiService";
import FullCalendarDay from "./components/FullCalendarDay";


function App() {
    return (
        <Router>
            <div className="App">
                <Navigation />
                <Container maxWidth="md">
                    <Switch>
                        <Route path="/month">
                            <FullCalendarMonth />
                        </Route>
                        <Route path="/day">
                            <FullCalendarDay />
                        </Route>
                    </Switch>
                </Container>
            </div>
        </Router>
    );
}

export default App;

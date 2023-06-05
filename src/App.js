import './App.css';
import FullCalendarApp from "./components/FullCalendarApp";
import Navigation from "./components/Navigation"
import {Container} from "@mui/material";
import {useEffect} from "react";
import {call} from "./service/ApiService";



function App() {
  return (
      <div className="App">
        <Navigation />
          <Container maxWidth="md">
            <FullCalendarApp />
          </Container>
      </div>
  );
}

export default App;

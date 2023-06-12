import './App.css';
import Navigation from "./components/Navigation";
import {Container, Grid} from "@mui/material";
import Sidebar from "./components/Sidebar";
import FullCalendars from "./components/FullCalendars";
import {useState} from "react";

function App() {

    const [isSideBarVisible, setSideBarVisible] = useState(true);
    const headerToolbar = {
        left: 'prev,next today',
        center: 'title',


        right: 'dayGridMonth,timeGridWeek,timeGridDay',
    };
    const sideBarButton = () => {
        setSideBarVisible(!isSideBarVisible);
    };
    console.log(isSideBarVisible)
    return (
        <div className="App">
            <Navigation SideBar={sideBarButton}/>
            <Container maxWidth="md" style={{margin : '0px 0px'}}>
                <Grid container spacing={4} style={{ margin : '0px 0px' }}>
                    <Grid item xs={4} style={{ maxWidth: '300px' }}>
                        <Sidebar
                            visible={isSideBarVisible}
                            height={'400px'}
                            contentHeight={'500px'}
                            aspectRatio={'2'}
                        />
                    </Grid>
                    <Grid item xs={8} style={{ width : 'calc(100% - 300px)' }}>
                        <FullCalendars
                            headerToolbar={headerToolbar}
                            height={'800px'}
                            contentHeight={'400px'}
                            aspectRatio={'3'}
                        />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;

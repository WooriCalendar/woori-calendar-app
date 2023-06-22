import './App.css';
import Navigation from "./components/Navigation";
import {Container, Grid} from "@mui/material";
import Sidebar from "./components/Sidebar";
import FullCalendars from "./components/FullCalendars";
import {useEffect, useRef, useState} from "react";
import {call} from "./service/ApiService";

function App() {
    const [initialView, setInitialView] = useState('dayGridMonth');
    const [isSideBarVisible, setSideBarVisible] = useState(true);
    const headerToolbar = {
        // left: 'prev',
        left: '',
        center: '',
        right: '',
        // center: 'title',
        // right: 'dayGridMonth,timeGridWeek,timeGridDay',
    };
    const sideBarButton = () => {
        setSideBarVisible(!isSideBarVisible);
    };
    console.log(isSideBarVisible)

    const onInitialViewChange = (e) => {
        setInitialView(e.target.value)
    }

    const [category, setCategory] = useState(false);

    const onCategoryChange = () => {
        setCategory(!category);
    }

    return (
        <div className="App">
            <Navigation SideBar={sideBarButton} initialView={onInitialViewChange}/>
            {/*<Container maxWidth="xl" style={{margin : '0px 0px'}}>*/}
            <Grid container spacing={3} style={{margin: '0px 0px', justifyContent: 'space-between', width: 'auto'}}>
                <Grid item xs={2} style={{paddingLeft: '20px'}}>
                    <Sidebar
                        visible={isSideBarVisible}
                        // height={'200px'}
                        contentHeight={'410px'}
                        aspectRatio={'2'}
                        onCategoryChange={onCategoryChange}
                    />
                </Grid>
                <Grid item xs={10} style={{padding: '10px 30px', marginLeft: 'auto'}}>
                    <FullCalendars
                        headerToolbar={headerToolbar}
                        // height={'800px'}
                        contentHeight={'800px'}
                        aspectRatio={'3'}
                        initialView={initialView}
                        category={category}
                    />
                </Grid>
            </Grid>
            {/*</Container>*/}
        </div>
    );
}

export default App;
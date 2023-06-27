import './App.css';
import Navigation from "./components/Navigation";
import {Container, Grid} from "@mui/material";
import Sidebar from "./components/Sidebar";
import FullCalendars from "./components/FullCalendars";
import React, {useEffect, useRef, useState} from "react";
import {call} from "./service/ApiService";
import companyLogo from "./assets/logo(ver3).png";
import {TailSpin} from "react-loader-spinner";
import Loading from "./components/Loading";

function App() {
    const [initialView, setInitialView] = useState('dayGridMonth');
    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);
    const [today, setToday] = useState(false);
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
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000); // 1초
    }, []);


    const onNextClick = () => {
        setNext(!next)
    }

    const onPrevClick = () => {
        setPrev(!prev);
    }

    const onTodayClick = () => {
        setToday(!today)
    }

    return (
        <div className="App">
            {loading ? (
                <Loading/>
            ) : (
                <>
            <Navigation SideBar={sideBarButton} initialView={onInitialViewChange} next={onNextClick} prev={onPrevClick} today={onTodayClick}/>
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
                        next={next}
                        prev={prev}
                        today={today}
                    />
                </Grid>
            </Grid>
            {/*</Container>*/}
                </>
            )}
        </div>
    );
}

export default App;
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
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";

function App() {
    const [initialView, setInitialView] = useState('dayGridMonth');
    const [next, setNext] = useState(0);
    const [prev, setPrev] = useState(0);
    const [today, setToday] = useState(0);
    const [isSideBarVisible, setSideBarVisible] = useState(true);
    const [category, setCategory] = useState(false);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(moment(new Date()).format('YYYY.M'));
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

    const onCategoryChange = () => {
        setCategory(!category);
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000); // 1초
    }, []);


    const onNextClick = () => {
        setNext(next + 1)
    }

    const onPrevClick = () => {
        setPrev(prev + 1);
    }

    const onTodayClick = () => {
        setToday(today + 1)
    }

    const titleFunction = function (value) {
        setDate(value)
        console.log("App.js", value)
    }

    return (
        <div className="App">
            {loading ? (
                <Loading/>
            ) : (
                <>
                    <Navigation SideBar={sideBarButton} initialView={onInitialViewChange} next={onNextClick} prev={onPrevClick} today={onTodayClick} date={date}/>
                    {/*<Container maxWidth="xl" style={{margin : '0px 0px'}}>*/}
                    <Grid container spacing={3} style={{margin: '0px 0px', justifyContent: 'space-between', width: 'auto'}}>
                        <Grid item xs={isSideBarVisible ? 2 : false} style={{paddingLeft: '20px'}}>
                            <Sidebar
                                visible={isSideBarVisible}
                                contentHeight={'410px'}
                                aspectRatio={'2'}
                                onCategoryChange={onCategoryChange}
                            />
                        </Grid>
                        <Grid item xs={isSideBarVisible ? 10 : 12} style={{padding: '10px 30px', marginLeft: 'auto'}}>
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
                                setTitle={titleFunction}
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
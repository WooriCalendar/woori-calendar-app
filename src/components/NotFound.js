import React, {useEffect, useRef, useState} from 'react';
import Error from "../assets/error.png";
import {Container, Grid} from "@mui/material";

const NotFound = () => {
    const [language, setLanguage] = useState(window.navigator.language.substring(0, 2));

    useEffect(() => {
        setLanguage(window.navigator.language.substring(0, 2));
    }, []);

    const windowLanguage = () => {
        switch (language) {
            case 'ko' :
                console.log("ko들어옴");
                return <Ko />;
            case 'ja' :
                return <Ja />;
            default:
                console.log("en들어옴");
                return <En />;
        }
    };
    const Ko = () => {
        return (
            <Container
                component="main"
                maxWidth="md"
                style={{marginTop: "8%", marginBottom: "2%"}}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <hr style={{border: "2px solid rgb(3, 199, 90)"}}/>
                        <br/><br/>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <div style={{justifyContent: "center"}}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <main style={{width: "100%"}}>
                                    <div style={{width: "max-content"}}>
                                        <div>Woori Calendar</div>
                                        <h1><span style={{color: "rgb(3, 199, 90)"}}>죄송합니다</span></h1>
                                        <br/>
                                        <br/>
                                        <p>요청하신 페이지는 존재하지 않거나 변경되었습니다.<br/>
                                            지속적으로 이 페이지가 보이신다면<br/> 관리자에게 문의 바랍니다.
                                        </p>
                                        <br/>
                                        <br/>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={6}>
                        <aside style={{width: "100%", justifyContent: "flex-end"}}>
                            <div style={{width: "max-content"}}>
                                <img src={Error} alt="Error" style={{width: "20%"}}/>
                            </div>
                        </aside>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <hr/>
                        <div align="center">
                            <h3 style={{color: "rgb(3, 199, 90)"}}>관리자 이메일 입니다.</h3>
                            <div style={{fontSize: "130%"}}>finalWoori@gmail.com</div>
                        </div>
                        <br/>
                        <hr style={{border: "2px solid rgb(3, 199, 90)"}}/>
                    </Grid>
                </Grid>
            </Container>
        );
    };

    const En = () => {
        return (
            <Container
                component="main"
                maxWidth="md"
                style={{marginTop: "8%", marginBottom: "2%"}}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <hr style={{border: "2px solid rgb(3, 199, 90)"}}/>
                        <br/><br/>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <div style={{justifyContent: "center"}}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <main style={{width: "100%"}}>
                                    <div style={{width: "max-content"}}>
                                        <div>Woori Calendar</div>
                                        <h1><span style={{color: "rgb(3, 199, 90)"}}>Sorry,</span></h1>
                                        <br/>
                                        <br/>
                                        <p>The page you requested does not exist or has been changed.<br/>
                                            If you continue to see this page,<br/> please contact the administrator.
                                        </p>
                                        <br/>
                                        <br/>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={6}>
                        <aside style={{width: "100%", justifyContent: "flex-end"}}>
                            <div style={{width: "max-content"}}>
                                <img src={Error} alt="Error" style={{width: "20%"}}/>
                            </div>
                        </aside>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <hr/>
                        <div align="center">
                            <h3 style={{color: "rgb(3, 199, 90)"}}>
                                This is the administrator's email.</h3>
                            <div style={{fontSize: "130%"}}>finalWoori@gmail.com</div>
                        </div>
                        <br/>
                        <hr style={{border: "2px solid rgb(3, 199, 90)"}}/>
                    </Grid>
                </Grid>
            </Container>
        );
    };

    const Ja = () => {
        return (
            <Container
                component="main"
                maxWidth="md"
                style={{marginTop: "8%", marginBottom: "2%"}}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <hr style={{border: "2px solid rgb(3, 199, 90)"}}/>
                        <br/><br/>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <div style={{justifyContent: "center"}}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <main style={{width: "100%"}}>
                                    <div style={{width: "max-content"}}>
                                        <div>Woori Calendar</div>
                                        <h1><span style={{color: "rgb(3, 199, 90)"}}>申し訳ありません,</span></h1>
                                        <br/>
                                        <br/>

                                        <p>リクエストページが存在しない、又は変更されました。<br/>
                                            引く続きこのページが表示される場合は<br/> 管理者へお問い合わせください。
                                        </p>
                                        <br/>
                                        <br/>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={6}>
                        <aside style={{width: "100%", justifyContent: "flex-end"}}>
                            <div style={{width: "max-content"}}>
                                <img src={Error} alt="Error" style={{width: "20%"}}/>
                            </div>
                        </aside>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <hr/>
                        <div align="center">
                            <h3 style={{color: "rgb(3, 199, 90)"}}>
                                これは管理者のメールです。</h3>
                            <div style={{fontSize: "130%"}}>finalWoori@gmail.com</div>
                        </div>
                        <br/>
                        <hr style={{border: "2px solid rgb(3, 199, 90)"}}/>
                    </Grid>
                </Grid>
            </Container>
        );
    };

    // <div>
    //     <hr style={{border: "2px solid rgb(3, 199, 90)"}} />
    //     <br />
    //     <br />
    //     <div style={{justifyContent: "center"}}>
    //         <div style={{margin: "100px", display: "flex", justifyContent: "space-between"}}>
    //             <main style={{width: "48%"}}>
    //                 <div style={{width: "max-content"}}>
    //                     <div>Woori Calendar</div>
    //                     <h1><span style={{color: "rgb(3, 199, 90)"}}>죄송합니다</span></h1>
    //                     <br />
    //                     <br/>
    //                     <p>요청하신 페이지는 존재 하지 않거나 변경 되었습니다.<br />
    //                         지속적으로 이 페이지가 보이신다면 관리자에게 문의 바랍니다.
    //                     </p>
    //                     <br />
    //                     <br/>
    //                 </div>
    //             </main>
    //             <aside style={{width: "48%"}}>
    //                 <div style={{width: "max-content"}}>
    //                     <img src={Error} alt="Error" style={{width: "20%"}}/>
    //                 </div>
    //             </aside>
    //         </div>
    //     </div>
    //     <hr />
    //     <div align="center">
    //         <h3 style={{color: "rgb(3, 199, 90)"}}> 관리자 이메일 입니다. </h3>
    //         <div style={{fontSize:"130%"}}>finalWoori@gmail.com</div>
    //     </div>
    //     <br/>
    //     <hr style={{border: "2px solid rgb(3, 199, 90)"}} />
    //     <div align="center">
    //         <sapn>Copyright &copy; Woori Calendar</sapn>
    //     </div>
    // </div>

    return (
        <div>
            {windowLanguage()}
        </div>
    );
};
export default NotFound;
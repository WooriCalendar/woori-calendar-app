import React, {useRef, useState} from 'react';
import {Button, Container, Grid, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {signup, signupemail} from "../service/ApiService";
import companyLogo from "../assets/logo(ver3).png";
import SignupTextField from "./SignupTextField";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
/**
 * @author: DGeon
 * @comment: 회원가입 폼을 위한 컴포넌트
 * @date: 2023-05-31
 */
const Signup = () => {
    const [isEmailVisible, setIsEmailVisible] = useState(true);
    const [isPassVisible, setIsPassVisible] = useState(true);
    const [isNicknameVisible, setIsNicknameVisible] = useState(true);
    const [isBirthdayVisible, setIsBirthdayVisible] = useState(true);
    const [isSubemailVisible, setIsSubemailVisible] = useState(true);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [nickname, setNickname] = useState();
    const [subemail, setSubemail] = useState();
    const [birthday, setBirthday] = useState();
    const [language, setLanguage] = useState();
    const sliderRef = useRef(null);
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        draggable: false
    };
    /**
     * @author: DGeon
     * @comment: 입력폼에 대한 visible 및 회원 가입 memberDTO 백엔드 전송
     * @date: 2023-06-08
     */
    const handleButtonClick = (event) => {
        if(isEmailVisible || isPassVisible || isNicknameVisible || isBirthdayVisible) {
            event.preventDefault();
            setLanguage(window.navigator.language);
            if (isEmailVisible) {
                setEmail(document.getElementById('email').value);
                setIsEmailVisible(false);
                document.getElementById('email').value = "";
            } else if (isPassVisible) {
                setPassword(document.getElementById('password').value);
                setIsPassVisible(false);
                document.getElementById('password').value = "";
            } else if (isNicknameVisible) {
                setNickname(document.getElementById('nickname').value);
                setIsNicknameVisible(false);
                document.getElementById('nickname').value = null;
            } else if (isSubemailVisible) {
                setSubemail(document.getElementById('subemail').value);
                setIsSubemailVisible(false);
                document.getElementById('subemail').value = null;
            } else if (isBirthdayVisible) {
                setBirthday(document.getElementById('birthday').value);
                setIsEmailVisible(false);
                setIsBirthdayVisible(false);
                document.getElementById('birthday').value = null;
                document.getElementById('handleButton').innerText = "Account Create";
            }
        }
        else {
            signup({email, password, nickname, subemail, birthday, language}).then(
                (resp) => (window.location.href = "/login")
            );
        }
        sliderRef.current.slickNext();
    }

    const handleEmail = (event) =>{
        setEmail(document.getElementById('email').value);
        signupemail({email}).then();
    }


    return (
        <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <img src={companyLogo} alt="Woori. logo" style={{width: "100%", marginBottom: "10%"}}/>
                </Grid>
            </Grid>
            <form noValidate onSubmit={handleButtonClick}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            Account Create
                        </Typography>
                    </Grid>
                </Grid>
                {/*<Grid container spacing={2} style={{marginTop: "5%"}}>*/}
                {/*    <Grid item xs={12}>*/}
                {/*        {isEmailVisible ? (*/}
                {/*            <>*/}
                {/*            <SignupTextField value="email"/>*/}
                {/*            <Button >인증번호 발송</Button>*/}
                {/*            </>*/}
                {/*        ) : isPassVisible ? (*/}
                {/*            <SignupTextField value="password"/>*/}
                {/*        ) : isNicknameVisible ? (*/}
                {/*            <SignupTextField  value="nickname"/>*/}
                {/*        ) : isSubemailVisible ? (*/}
                {/*            <SignupTextField  value="subemail"/>*/}
                {/*        ) : isBirthdayVisible ? (*/}
                {/*            <SignupTextField value="birthday"/>*/}
                {/*        ) : ''}*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}

                <Grid container spacing={2} style={{marginTop: "5%"}}>
                    <Grid item xs={12}>
                        <Slider ref={sliderRef} {...settings}>
                            <div>
                                <SignupTextField value="email"/>
                                <Button onClick={handleEmail}>인증번호 발송</Button>
                            </div>
                            <div>
                             <SignupTextField value="password"/>
                            </div>
                            <div>
                                <SignupTextField  value="nickname"/>
                            </div>
                            <div>
                                <SignupTextField  value="subemail"/>
                            </div>
                            <div>
                                <SignupTextField value="birthday"/>
                            </div>
                            <div>
                            </div>
                        </Slider>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button id="handleButton" fullWidth variant="contained" color="primary"  type="submit"
                            onClick={handleButtonClick}
                            style={{marginTop: "5%"}}>
                        Next
                    </Button>
                </Grid>
            </form>
        </Container>
    );
};
export default Signup;

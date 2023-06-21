import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, Grid, Typography} from "@mui/material";
import {call, findemail, signup, signupemail} from "../service/ApiService";
import companyLogo from "../assets/logo(ver3).png";
import SignupTextField from "./SignupTextField";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import {Link} from "react-router-dom";
import moment from 'moment';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {ko} from "date-fns/locale";
import '../css/fullWidth.css';
import ForgotTextField from "./ForgotTextField";
import {TailSpin} from "react-loader-spinner";
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
    const emailRef = useRef();
    let [password, setPassword] = useState();
    const [nickname, setNickname] = useState();
    const [subemail, setSubemail] = useState();
    let [birthday, setBirthday] = useState(new Date());
    const [language, setLanguage] = useState();
    const [code, setCode] = useState();
    const [isCodeVisible, setIsCodeVisible] = useState(false);
    const sliderRef = useRef(null);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [btnSendEmailDisabled, setBtnSendEmailDisabled] = useState(false);
    const [btnDatePickerDisabled, setBtnDatePickerDisabled] = useState(true);
    const [checkEmail, setCheckEmail] = useState();


    const [emailConfirm, setEmailConfirm] = useState();

    const [loding, setLoding] = useState(true);
    const [sendEmailDisabled, setSendEmailDisabled] = useState(false);
    const [sendCodeDisabled, setSendCodeDisabled] = useState(false);
    const [sendCodeConfirmDisabled, setSendCodeConfirmDisabled] = useState(false);
    const [display, setDisplay] = useState('none');

    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        draggable: false
    };
    // useEffect(() => {
    //     call("/member/signup", "GET", null).then((response) => {
    //         setCheckEmail(response.data);
    //     });
    // }, []);

    useEffect(()=>{
        setEmail(document.getElementById('email').value);
        console.log(email);
    }, [email]);

    /**
     * @author: DGeon
     * @comment: 입력폼에 대한 visible 및 회원 가입 memberDTO 백엔드 전송
     * @date: 2023-06-08
     */
    const handleButtonClick = (event) => {

        if (isEmailVisible || isPassVisible || isNicknameVisible || isBirthdayVisible) {
            event.preventDefault();
            setLanguage(window.navigator.language);
            if (isEmailVisible) {

                setEmail(document.getElementById('email').value);
                setIsEmailVisible(false);
                document.getElementById('email').value = "";
                sliderRef.current.slickNext();
            } else if (isPassVisible) {
                if(passwordRegEx.test(document.getElementById('password').value) || passwordRegEx.test(document.getElementById('passwordcheck').value)) {
                    if (document.getElementById('password').value === document.getElementById('passwordcheck').value) {
                        setPassword(document.getElementById('password').value);
                        setIsPassVisible(false);
                        document.getElementById('password').value = "";
                        sliderRef.current.slickNext();
                    } else {
                        document.getElementById('passwordOut').innerText = "Passwords do not match.";
                    }
                }else {
                    document.getElementById('passwordOut').innerText = "Please enter a password between 8 and 20 characters with a mixture of uppercase and lowercase letters and numbers.";
                }
            } else if (isNicknameVisible) {
                setNickname(document.getElementById('nickname').value);
                setIsNicknameVisible(false);
                document.getElementById('nickname').value = null;
                sliderRef.current.slickNext();
            } else if (isSubemailVisible) {
                setSubemail(document.getElementById('subemail').value);
                setIsSubemailVisible(false);
                document.getElementById('subemail').value = null;
                setBtnDatePickerDisabled(false);
                sliderRef.current.slickNext();
            } else if (isBirthdayVisible) {
                birthday = moment().format("yyyy-MM-DD");
                setIsEmailVisible(false);
                setIsBirthdayVisible(false);
                sliderRef.current.slickNext();
                document.getElementById('handleButton').innerText = "Account Create";
            }
        } else {
            signup({email, password, nickname, subemail, birthday, language}).then(() => {
                window.location.href = "/login";
            });
        }

    }
    const handleEmail = () => {
        // emailRef.current = document.getElementById('email').value;
        // let email = emailRef.current;
        setLoding(false);
        setBtnSendEmailDisabled(true);
        // console.log(" emailRef.current :: " + emailRef.current);
        // console.log(" email :: " + email);
        // console.log("발송전");
        if(emailRegEx.test(email)) {
        call("/member/findemail", "POST", {email}).then((resp)=> {
            if (!resp.email) {
                document.getElementById('emailCheck').innerText = "This email is available";
                // setBtnSendEmailDisabled(true);
                setTimeout(() => {
                    signupemail({email}).then((resp) => {
                        setCode(resp);
                        setIsCodeVisible(true);
                        setLoding(true);
                        setDisplay('block');
                    });

                });

                //이메일 사용가능
            } else {
                //중복된 이메일
                document.getElementById('emailCheck').innerText = "Duplicate emails exist.";
                setLoding(true);
                setBtnSendEmailDisabled(false);
            }
        });
        }else{
            setLoding(true);
            setBtnSendEmailDisabled(false);
            document.getElementById('emailCheck').innerText = "다릅니다";
        }




        // const inputValue = emailRef.current;
        // const isEmailExists = checkEmail.includes(inputValue);
        //
        // console.log(inputValue);
        // if (isEmailExists) {
        //     document.getElementById('emailCheck').innerText = "Duplicate emails exist.";//중복
        //
        // } else {
        //     document.getElementById('emailCheck').innerText = "This email is available";
        //
        //
        //     setBtnSendEmailDisabled(false);
        // }


    }

    const confirm = () => {
        let confirmCode = document.getElementById('code').value;
        // alert("code::"+ code);
        // alert("confirmCode::"+ confirmCode);
        if (code === confirmCode) {
            console.log("일치함");
            setButtonDisabled(false);
            setSendEmailDisabled(true);
            setSendCodeDisabled(true);
            setSendCodeConfirmDisabled(true);
        } else {
            alert("It doesn't match. please verify again");
        }
    }

    const languageCode = window.navigator.language.slice(0, 2);
    // const languageCode = "ja";
    //   const languageCode = "en";

    const resetBtn = (e)=>{
        document.getElementById('email').value="";
        document.getElementById('code').value=null;
        setSendEmailDisabled(false);
        setSendCodeDisabled(false);
        setBtnSendEmailDisabled(false);
        setSendCodeConfirmDisabled(false)

        e.target.display = "block";
    }

    const handleEmailChange = (Email) => {
        setEmail(Email);
        console.log(Email);
    };

    const handleCodeChange = (code) => {
        setCode(code);
        console.log(code);
    };
    return (
        <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <img src={companyLogo} alt="Woori. logo" style={{width: "100%", marginBottom: "10%"}}/>
                </Grid>
            </Grid>
            {/*onSubmit={handleButtonClick}*/}
            <form noValidate>
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

                        <Slider ref={sliderRef} {...settings} style={{height: "10%"}}>
                            <div>
                                <ForgotTextField value={{ value:"email", btnSendEmailDisabled : btnSendEmailDisabled}} onChange={handleEmailChange}/>
                                <div id="emailCheck" style={{color: "red"}}></div>
                                {loding ? (
                                <Button onClick={handleEmail} id="sendEmail">
                                    Send verification code</Button>
                                ) : (
                                    <div style={{width : 400, textAlign : "center", marginTop : 20}}>
                                        <div style={{display : "inline-block"}}>
                                            <TailSpin
                                                color="#7cc6ff"
                                                height={50}
                                                width={50}
                                            />
                                        </div>
                                    </div>
                                )}
                                {isCodeVisible ? (
                                    <div>
                                        <ForgotTextField value={{value: "code", sendCodeDisabled:sendCodeDisabled}} onChange={handleCodeChange}/>
                                        <Button id="confirm" onClick={confirm}>Confirm verification code</Button>
                                    </div>) : ''
                                }
                                {/*loading ? ( <h1>메일 발송중..</h1> ):''*/}
                                <Button fullWidth variant="contained" color="success" id={"resetBtn"} onClick={resetBtn} style={{display}} >reset</Button>
                            </div>
                            <div>
                                <SignupTextField value="password"/>
                                <SignupTextField value="passwordcheck"/>
                                <div id="passwordOut" style={{color: "red"}}></div>
                            </div>
                            <div>
                                <SignupTextField value="nickname"/>
                            </div>
                            <div>
                                <SignupTextField value="subemail"/>
                            </div>

                            <div style={{outline: 'none'}} >
                                {/*<SignupTextField value="birthday"/>*/}
                                {/*<Calendar onChange={setBirthday} value={birthday} id={birthday} />*/}
                                <div style={{marginTop: "5%", outline: 'none'}} >
                                    <LocalizationProvider locale={ko} dateAdapter={AdapterDayjs} >
                                        <DatePicker format={"YYYY-MM-DD"} onChange={setBirthday} id={birthday} disabled={btnDatePickerDisabled} required/>
                                    </LocalizationProvider>
                                </div>
                            </div>

                            <div>
                            </div>
                        </Slider>

                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button id="handleButton" fullWidth variant="contained" color="primary" type="submit"
                            onClick={handleButtonClick} disabled={buttonDisabled}
                            style={{marginTop: "5%"}}>
                        Next
                    </Button>
                </Grid>
                <Grid item xs={12} style={{marginTop: "5%"}}>
                    {languageCode === "ko" && (
                        <Link to="/PrivacyPolicyKo">개인정보 보호 정책</Link>
                    )}
                    {languageCode === "ja" && (
                        <Link to="/PrivacyPolicyJa">プライバシーポリシー</Link>
                    )}
                    {languageCode === "en" && (
                        <Link to="/PrivacyPolicyEn">Privacy Policy</Link>
                    )}
                </Grid>
            </form>
        </Container>
    );
}
export default Signup;

import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, Grid, TextField, Typography} from "@mui/material";
import companyLogo from "../assets/logo(ver3).png";
import ForgotTextField from "./ForgotTextField";
import {call, signupemail, signuppassword} from "../service/ApiService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import {Oval, TailSpin} from "react-loader-spinner";

const Forgotpassword = () => {
    const emailRef = useRef();
    const sliderRef = useRef(null);

    const [code, setCode] = useState();
    const [isCodeVisible, setIsCodeVisible] = useState(false);
    const [emailConfirm, setEmailConfirm] = useState();

    const [btnSendEmailDisabled, setBtnSendEmailDisabled] = useState(false);
    const [sendEmailDisabled, setSendEmailDisabled] = useState(false);
    const [sendCodeDisabled, setSendCodeDisabled] = useState(false);
    const [sendCodeConfirmDisabled, setSendCodeConfirmDisabled] = useState(false);
    const [display, setDisplay] = useState('none');

    const [passwordDisabled, setPasswordDisabled] = useState(false);
    const [passwordCheckDisabled, setPasswordCheckDisabled] = useState(false);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [password, setPassword]=useState();

    const [isCheck, setIsCheck]=useState(false);
    const [email, setEmail] = useState();
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        draggable: false
    };

    const [loding, setLoding] = useState(true);

    useEffect(()=>{
        setEmail(document.getElementById('email').value);
        console.log(email);
    }, [email]);

    const passwordValue = ((e)=>{
        setPassword(e.target.value);
    })


    const handleEmail = (e) => {
        setLoding(false);
        // emailRef.current = document.getElementById('email').value;
        // let email = emailRef.current;
        // console.log(" emailRef.current :: " + emailRef.current);
        console.log("발송전");
        setBtnSendEmailDisabled(true);
        setTimeout(() => {
            signuppassword({email}).then((resp) => {
                console.log("발송완료");
                setCode(resp);
                console.log(code);
                setEmailConfirm(email);
                setDisplay('block');

                setIsCodeVisible(true);
                setLoding(true);
            });
        }, 100);
    }


    const confirm = () => {
        let confirmCode = document.getElementById('code').value;
        // alert("code::"+ code);
        // alert("confirmCode::"+ confirmCode);
        if (code === confirmCode && emailConfirm === document.getElementById('email').value) {
            console.log("일치함");
            setSendEmailDisabled(true);
            setSendCodeDisabled(true);
            setSendCodeConfirmDisabled(true);
            setButtonDisabled(false);

        } else {
            alert("It doesn't match. please verify again");
        }
    }

    // useEffect(() => {  // Email 형식 체크
    //     var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    //     setEmailValid(regExp.test(email));
    // }, [email])
    //
    const resetBtn = (e)=>{
        document.getElementById('email').value="";
        document.getElementById('code').value=null;
        setSendEmailDisabled(false);
        setSendCodeDisabled(false);
        setBtnSendEmailDisabled(false);
        setSendCodeConfirmDisabled(false);
        e.target.display = "block";
    }
    const nextBtn = (event)=>{
        sliderRef.current.slickNext();
        if (document.getElementById('password').value === document.getElementById('passwordcheck').value) {
            // setPassword(document.getElementById('password').value);
            document.getElementById('nextBtn').innerText="Change Password";
            setIsCheck(true);
        }else {
            event.preventDefault();
            document.getElementById('passwordOut').innerText = "Passwords do not match.";
        }
        if(isCheck){
            alert(isCheck);
            alert(email);
            alert(password);
            call("/member/updatePassword", "PUT", {email, password}).then(()=>{
                window.location.href = "/login";
            });
        }
    }

    const handleEmailChange = (Email) => {
        setEmail(Email);
        console.log(Email);
    };

    const handleCodeChange = (code) => {
        setCode(code);
        console.log(code);
    };

    const handlePasswordChange = (password) => {
        setPassword(password);
        console.log(password);
    };

    const handlePasswordChangeCheck = (passwordCheck) => {
        // set(passwordCheck);
        console.log(passwordCheck);
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            style={{marginTop: "8%", marginBottom: "2%"}}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <img src={companyLogo} alt="Woori. logo" style={{width: "100%", marginBottom: "10%"}}/>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Slider ref={sliderRef} {...settings} style={{height: "10%"}}>
                        <div>
                            <ForgotTextField value={{value: "email", btnSendEmailDisabled : btnSendEmailDisabled}} onChange={handleEmailChange} />
                            <div id="emailCheck" style={{color: "red"}}></div>
                            {loding ? (
                                <Button onClick={handleEmail} id="sendEmail" disabled={sendEmailDisabled} >인증번호
                                    발송</Button>
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
                                    <Button id="confirm" onClick={confirm} disabled={sendCodeDisabled}>인증확인</Button>
                                </div>) : ''
                            }
                            <Button fullWidth variant="contained" color="success" id={"resetBtn"} onClick={resetBtn} style={{display}} >다시 입력하기</Button>

                            {/*loading ? ( <h1>메일 발송중..</h1> ):''*/}
                        </div>
                        <form noValidate>
                        <div>
                            <ForgotTextField value={{value:"password"}}  disabled={passwordDisabled} onChange={handlePasswordChange}/>
                            <ForgotTextField value={{value:"passwordcheck"}} disabled={passwordCheckDisabled} onChange={handlePasswordChangeCheck}/>
                            <div id="passwordOut" style={{color: "red"}}></div>
                        </div>
                        </form>
                    </Slider>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" color="primary" id={"nextBtn"} onClick={nextBtn} disabled={buttonDisabled} >
                        Next
                    </Button>
                </Grid>
            </Grid>


        </Container>
    );
};

export default Forgotpassword;
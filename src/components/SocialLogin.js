import React from "react";
import { Navigate } from "react-router-dom";

/**
 * @author: DGeon
 * @comment: 구글 oauth 토큰 localstorage 저장
 * @date: 2023-06-08
 */
const socialLogin = (props) => {
    const getUrlParameter = (name) => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        return params.get(name);
    };
    const token = getUrlParameter("token");
    console.log("토큰 파싱", token);
    if (token) {
        console.log("로컬 스토리지에 토큰 저장", token);
        localStorage.setItem("ACCESS_TOKEN", token);
        return <Navigate to={{ pathname: "/", state: { from: props.location } }} />;
    } else {
        return (
            <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
        );
    }
};

export default socialLogin;

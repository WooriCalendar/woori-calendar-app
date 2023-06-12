import { API_BASE_URL } from "../api-config";

/**
 * @author: DGeon
 * @comment: 토큰검증 및 callback
 * @date: 2023-06-08
 */
export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });
    const access_token = localStorage.getItem("ACCESS_TOKEN");
    if (access_token && access_token !== null) {
        // if(access_token) { 이 방법으로 해도 된다.
        headers.append("Authorization", "Bearer " + access_token);
    }

    let options = {
        headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if (request) {
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options)
        .then((resp) => {
            // alert("resp::"+resp.status);
            console.log("callresp", resp);
            if (resp.status === 200) {
                return resp.json();
            } else if (resp.status === 403) {
                window.location.href = "/login";
            } else {

                Promise.reject(resp);
                throw Error(resp);
            }
        })
        .catch((error) => {
            console.log("http error");
            console.log(error);
        });
}

/**
 * @author: DGeon
 * @comment: Login Token 생성
 * @date: 2023-06-08
 */
export function signin(memberDTO) {
    return call("/member/signin", "POST", memberDTO)
        .then((response) => {
            console.log("response : ", response);
            // alert('로그인 토큰 : ' + response.token);
            if (response.token) {
                localStorage.setItem("ACCESS_TOKEN", response.token);
                alert(window.navigator.language);

                window.location.href = "/";


            }
        })
        .catch((error) => {
            alert("login fail");
            window.location.href = "/login";
        });
}

/**
 * @author: DGeon
 * @comment: 소셜Login
 * @date: 2023-06-08
 */
export function socialLogin(provider) {
    window.location.href =
        API_BASE_URL +
        "/oauth2/auth/" +
        provider +
        "?redirect_url=" +
        (window.location.protocol + "//" + window.location.host);
}

/**
 * @author: DGeon
 * @comment: 로그아웃 시 토큰 삭제
 * @date: 2023-06-08
 */
export function signout() {
    // localStorage.setItem("ACCESS_TOKEN", null);
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href = "/login";
}

/**
 * @author: DGeon
 * @comment: 회원가입
 * @date: 2023-06-08
 */
export function signup(memberDTO) {
    return call("/member/signup", "POST", memberDTO);
}

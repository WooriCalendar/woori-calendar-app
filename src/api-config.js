let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
}

//backendHost = "http://18.224.7.38:8080";

export const API_BASE_URL = `${backendHost}`;

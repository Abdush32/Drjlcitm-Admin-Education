import axios from "axios";
import store from "../Redux/Store/Store"
import { toast } from "react-toastify";

let apiUrl;
if (document.URL.includes("abdushlocalhost")) {
  apiUrl = "https://api.drjlcitm.com";
} else {  
  apiUrl = "https://api.drjlcitm.com";
}

const http = axios.create({
  baseURL: apiUrl,
  //timeout: 1000,
  // headers: { "Content-Type": "application/json" },
});
http.interceptors.request.use(
  (config) => {
    if (store.getState()?.Auth[0]?.token) {
      config.headers.Authorization = `Bearer ${
        store.getState()?.Auth[0]?.token
      }`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error,"ERROR_Abdush");
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    } else if (error.response.status === 404) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (error.response.status === 500) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (error.response.status === 403) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (error.response.status === 415) {
      toast.error(
        error.message +
          " - Unsupported media type. Please upload image file only.",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
    } else {
      return Promise.resolve(error.response);
    }
    return Promise.reject(error);
  }
);

export default http;

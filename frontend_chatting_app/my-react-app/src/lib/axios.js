import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "http://localhost:8005",
    withCredentials : true  //this line will help use to access the cookies
})
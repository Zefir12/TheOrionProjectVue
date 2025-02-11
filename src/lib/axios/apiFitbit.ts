import axios from "axios";

const apiFitbit = axios.create({
    baseURL: "https://api.fitbit.com/",
    timeout: 5000
});

export default apiFitbit;

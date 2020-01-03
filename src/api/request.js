import axios from 'axios'

const request = axios.create({
    withCredentials:true,
    baseURL:process.env.VUE_APP_BASEURL
})

export default request;
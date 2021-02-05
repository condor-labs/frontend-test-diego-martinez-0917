import axios from "axios";
const BASE_URL = 'https://run.mocky.io/v3/';
export const getValues =(url)=>{
    try {
        return axios({
            baseURL:BASE_URL,
            url,
            method:'GET'
          })
    } catch (error) {
        throw error;
    }
}
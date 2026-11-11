import axios, {type AxiosInstance} from "axios";
import { sessionExpired } from "./session";

export class HttpApiServices{

    axios: AxiosInstance;

    constructor(){
        this.axios = axios.create({
            baseURL: import.meta.env.VITE_VUE_PUBLIC_API_URL + '/api'
        });

        this.axios.interceptors.request.use((config: any) => {
            const token = localStorage.getItem('token');
            if(token){
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        });

        this.axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (sessionExpired(error?.response?.status, localStorage.getItem('token'))) {
                    localStorage.clear();
                    window.location.href = '/';
                }
                return Promise.reject(error);
            }
        );
    }

    post(url: string, data: any){
        return this.axios.post(url, data);
    }

    get(url: string){
        return this.axios.get(url);
    }

    put(url: string, data: any){
        return this.axios.put(url, data);
    }

    delete(url: string){
        return this.axios.delete(url);
    }
}

import axios, { AxiosError, AxiosResponse } from "axios";  
import { getToken } from "../utils/helperFunctions";
import { toast } from 'react-toastify';
 
let store:any;
 export const injectStore = (_store:any )=> {
  store = _store
}
axios.defaults.baseURL = process.env.REACT_APP_API_URL;  
axios.interceptors.request.use(config => {  
  const token = getToken()
    if (token && config.headers){
    config.headers.Authorization = `Bearer ${token}`
   } 
  return config;
})
axios.interceptors.response.use(async response => { 
  return response;
}, (error: AxiosError) => {
  const { data, status, config, headers } = error.response!;
  debugger
  switch (status) {
      case 401:
          if (status === 401  ) {

              // store.userStore.logout();
              toast.error('Session expired - please login again');
          }
          break;
    
  }
  return Promise.reject(error);
})
const responseBody = (response: AxiosResponse) => response.data;
 
const Users = {
  login: (username?:string,password?:string): Promise<any> =>
    axios.post(`/auth/login`,  {username,password}),
    register: (userName?:string,firstName?:string,lastName?:string,password?:string): Promise<any> =>
    axios.post(`/auth/register`,  {userName,firstName,lastName,password}),
  getCurrentUser:(username:string):Promise<any> =>  
    axios.get(`/getUser?userName=${username}`)  .then(responseBody), 
  list: (searchText ='' ) =>
    axios
       .get<any>(`/users?searchText=${searchText}`)
      .then(responseBody),
 }; 

export default {
    Users  
};

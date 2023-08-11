import axios, { AxiosResponse } from 'axios'
import {UserState, UserResponse} from './../types'

const callWaiter=async(data:UserState)=>{
    const url='https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/callWaiter'; 
  try {
    const response: AxiosResponse<UserResponse | any> = await axios.post(url, data);
    return response.data;
  } catch (error:any) {
    throw new Error('Failed to send POST request: ' + error.message);
  }
}

export default callWaiter;

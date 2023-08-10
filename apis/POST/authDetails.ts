import axios, { AxiosResponse } from 'axios'
import {UserField , UserResponse} from './../types'
const postUserData=async(data:UserField)=>{
    const url = 'https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/createCustomer'; 
  try {
    const response: AxiosResponse<UserResponse> = await axios.post(url, data);

    return response.data;
  } catch (error:any) {
    throw new Error('Failed to send POST request: ' + error.message);
  }
}

export default postUserData;

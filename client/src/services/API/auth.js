import { API_URL } from "../../utils/misc";
import {postReq} from "./httpmethods";

export const SingUpUser = (body)=>{
    return postReq(API_URL,body);
}

export const LoginUser = (body)=>{
    return postReq(API_URL+"login",body);
}
import {postReq} from "./httpmethods";
const url = 'http://localhost:5000/';
export const SingUpUser = (body)=>{
    return postReq(url,body);
}
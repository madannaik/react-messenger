import axios from "axios";
import { getReq, putReq } from "./httpmethods";

const API_URL = "http://localhost:5000/";

export const getUserData = async (id) => {
  return axios.get(API_URL + "getuserdata/", {
    _id: id
  })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    })
}
export const ChangeAvatar = (id, url, funct) => {
  return putReq(API_URL + "updateprofile/" + funct, {
    _id: id, image: url
  })
}
export const UpdatePassword = async (id, pass, newpass, funct) => {
  return putReq(API_URL + "updateprofile/" + funct, {
    _id: id,
    password: pass,
    newpassword: newpass
  })
}
export const AddFriends = async (id, friendId) => {
  return putReq(API_URL + "updateprofile/addfriends",
    {
      _id: id,
      addFriendId: friendId
    })
}
export const GetFriends = async (id) => {
  return getReq(API_URL + `updateprofile/getfriends/${id}`);
}
export const GetAllUsers = async (id, username) => {
  return getReq(API_URL + `getUser/${id}/username/${username === '' ? "null" : username}`)
}
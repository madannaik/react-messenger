import axios from "axios";


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
export const ChangeAvatar = async (id, url, funct) => {
  return axios.put(API_URL + "updateprofile/" + funct, {
    _id: id, image: url
  })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    })
}
export const UpdatePassword = async (id, pass, newpass, funct) => {
  return axios.put(API_URL + "updateprofile/" + funct, {
    _id: id,
    password: pass,
    newpassword: newpass
  }).then(response => {
    return response.data;
  })
    .catch(err => {
      console.log(err);
    })
}
export const AddFriends = async (id, friendId) => {
  return axios.put(
    API_URL + "updateprofile/addfriends",
    {
      _id: id,
      addFriendId: friendId
    }
  )
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    })
}
export const GetFriends = async (id) => {

  return axios.get(
    API_URL + `updateprofile/getfriends/${id}`,
  )
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    })
}
export const GetAllUsers = async (id, username) => {
  return axios.get(
    API_URL + `getUser/${id}/username/${username === '' ? "null" : username}`
  )
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    })
}
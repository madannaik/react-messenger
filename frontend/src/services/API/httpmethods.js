import axios from "axios";

export const getReq = async (url) => {
    return axios.get(url).then(response => {
        return response.data;
    })
        .catch(err => {
            console.log(err);
        })
}
export const putReq = async (url, body) => {
    return axios.put(url, body).then(response => {
        return response.data;
    })
        .catch(err => {
            console.log(err);
        })
}
export const postReq = async (url, body) => {
    return axios.post(url, body).then(response => {
        return response.data;
    })
        .catch(err => {
            console.log(err);
    })
}
export const deleteReq = async (url, body) => {
    return axios.delete(url).then(response => {
        return response.data;
    })
        .catch(err => {
            console.log(err);
    })
}
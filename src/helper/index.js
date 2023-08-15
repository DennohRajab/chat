import axios from "axios"

export const Api = (data) => new Promise((resolve, reject) => {
    axios.post('http://192.168.88.237:3001', JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((resp) => {
        resolve(resp.data)
    }).catch((e) => {
        reject(e)
    })
})

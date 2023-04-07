import axios from 'axios'


export default  axios.create({

    baseURL: 'http://localhost:8080',
    withCredentials:true
    
})

// export const axiosPrivate= axios.create({
//     baseURL: 'http://localhost:8000',
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials:true
    
// })

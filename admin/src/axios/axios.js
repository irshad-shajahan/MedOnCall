import axios from 'axios'

const baseURL=import.meta.env.MODE==='development'?"http://localhost:8080/api/admin":"/api/admin"
export default  axios.create({

    baseURL,
    withCredentials:true
    
})

// export const axiosPrivate= axios.create({
//     baseURL: 'http://localhost:8000',
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials:true
    
// })

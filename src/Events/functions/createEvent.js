import  axios from 'axios'


export const createEvents = async (values) =>{

   const res = await axios.post('http://localhost:3001/api/events', values,{
       headers:{
           "Content-Type":"application/json"
       }
   })
   return res.data;
}

export const listEvent= async () =>{
    
   

    const res = await axios.get('http://localhost:3001/api/events',{
        headers:{
            "Content-Type":"application/json"
        }
    })
    return res
 }

 
export const handleCurrentMonth = async (values) =>{

    const res = await axios.post('http://localhost:3001/api/current-month', values,{
        headers:{
            "Content-Type":"application/json"
        }
    })
    return res
 }


 export const updateEvent = async (values) =>{

    const res = await axios.put('http://localhost:3001/api/update', values,{
        headers:{
            "Content-Type":"application/json"
        }
    })
    return res
 }

 export const removeEvent = async (values) =>{

    const res = await axios.delete('http://localhost:3001/api/delete/'+ values,{
        headers:{
            "Content-Type":"application/json"
        }
    })
    return res
 }
 


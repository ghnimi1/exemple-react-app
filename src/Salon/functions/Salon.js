import  axios from 'axios'


export const createSalon = async (values) =>{

   const res = await axios.post('http://localhost:3001/api/createSalon', values,{
       headers:{
           "Content-Type":"application/json"
       }
   })
   return res.data;
}

export const listSalon= async () =>{
    
   

    const res = await axios.get('http://localhost:3001/api/getSalon',{
        headers:{
            "Content-Type":"application/json"
        }
    })
    return res
 }

 
export const handleCurrentMonthSalon = async (values) =>{

    const res = await axios.post('http://localhost:3001/api/current-monthSalon', values,{
        headers:{
            "Content-Type":"application/json"
        }
    })
    return res
 }


 export const updateSalon = async (values) =>{

    const res = await axios.put('http://localhost:3001/api/updateSalon', values,{
        headers:{
            "Content-Type":"application/json"
        }
    })
    return res
 }

 export const removeSalon = async (values) =>{

    const res = await axios.delete('http://localhost:3001/api/deleteSalon/'+ values,{
        headers:{
            "Content-Type":"application/json"
        }
    })
    return res
 }
 


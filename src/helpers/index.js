import { API } from "../api"

export const checkAttendens = (id, value, user, setDep, type) => {
  const date = new Date()
  const month = localStorage.getItem('month')
  if(value){
    value.push({num: value[value.length - 1].num+1, time: `${date.getDate()} ${month}/${date.getHours()}:${date.getMinutes()}`, type: type})
    API.addAttended(id, value)
      .then(() => {
        setDep(Math.random())
      })
  }else{
    const data = [{num: 1, time: `${date.getDate()} ${month}/${date.getHours()}:${date.getMinutes()}`, type: type}]
    console.log(data); 
    API.addAttended(id, data)
      .then(() => {
        setDep(Math.random())
      })
  }
  
} 
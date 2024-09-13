import { API } from "../api"

export const checkAttendens = (id, value, setDep) => {
  const data = []
  for(let i = 1; i <= value; i++){
    data.push(i)
  }
  API.addAttended(id, data)
    .then(() => {
      setDep(Math.random())
    })
} 
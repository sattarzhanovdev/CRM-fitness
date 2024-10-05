import axios from "axios";

export const API = {
  getClients: () => axios.get('clients.json'),
  postClients: (data) => axios.post('clients.json', data),
  addAttended: (id, value) => axios.put(`clients/${id}/attended.json`, value),
  deleteClient: (id) => axios.delete(`/clients/${id}/.json`)
}
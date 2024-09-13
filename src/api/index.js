import axios from "axios";

export const API = {
  getClients: () => axios.get('clients.json'),
  addAttended: (id, value) => axios.put(`clients/${id}/attended.json`, value),
}
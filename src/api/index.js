import axios from "axios";

export const API = {
  getClients: () => axios.get('clients.json'),
  postClients: (data) => axios.post('clients.json', data),
  addAttended: (id, value) => axios.put(`clients/${id}/attended.json`, value),
  deleteClient: (id) => axios.delete(`/clients/${id}/.json`),
  addGym: (data) => axios.post('/gym.json/', data),
  postReport: (month, data) => axios.put(`/report/${month}.json`, data),
  postExpenses: (month, data) => axios.post(`/expenses/${month}.json`, data),
  getExpenses: (month, data) => axios.get(`/expenses/${month}.json`, data),
  getReport: () => axios.get('/report.json')
}
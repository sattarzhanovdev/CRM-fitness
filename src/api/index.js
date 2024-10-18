import axios from "axios";

export const API = {
  getClients: () => axios.get('clients.json'),
  postClients: (data) => axios.post('clients.json', data),
  putClient: (id, data) => axios.put(`/clients/${id}.json`, data),
  addAttended: (id, value) => axios.put(`clients/${id}/attended.json`, value),
  deleteClient: (id) => axios.delete(`/clients/${id}/.json`),
  addGym: (data) => axios.post('/gym.json/', data),
  postReport: (month, data) => axios.put(`/report/${month}.json`, data),
  postExpenses: (month, day, data) => axios.post(`/expenses/${month}/${day}.json`, data),
  getExpensesByDay: (month, day) => axios.get(`/expenses/${month}/${day}.json`),
  getExpenses: (month) => axios.get(`/expenses/${month}.json`),
  getReport: () => axios.get('/report.json'),
  extend: (id, data) => axios.put(`/clients/${id}.json`, data)
}
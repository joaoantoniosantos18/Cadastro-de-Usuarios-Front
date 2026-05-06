import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export const listarUsuarios = () => api.get('/usuarios')
export const buscarUsuario = (id) => api.get(`/usuarios/${id}`)
export const criarUsuario = (dados) => api.post('/usuarios', dados)
export const atualizarUsuario = (id, dados) => api.put(`/usuarios/${id}`, dados)
export const deletarUsuario = (id) => api.delete(`/usuarios/${id}`)     
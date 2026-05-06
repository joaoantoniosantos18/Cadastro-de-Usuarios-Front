import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { criarUsuario, buscarUsuario, atualizarUsuario } from '../services/api'

function UsuarioForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const modoEdicao = Boolean(id)

  const [form, setForm] = useState({
    nome: '',
    email: '',
    idade: '',
    telefone: '',
  })
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  useEffect(() => {
    if (modoEdicao) {
      setCarregando(true)
      buscarUsuario(id)
        .then((resposta) => {
          const u = resposta.data.dados
          setForm({
            nome: u.nome,
            email: u.email,
            idade: u.idade,
            telefone: u.telefone,
          })
        })
        .catch(() => setErro('Não foi possível carregar o usuário.'))
        .finally(() => setCarregando(false))
    }
  }, [id])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCarregando(true)
    setErro('')
    setSucesso('')

    try {
      if (modoEdicao) {
        await atualizarUsuario(id, form)
        setSucesso('Usuário atualizado com sucesso!')
      } else {
        await criarUsuario(form)
        setSucesso('Usuário criado com sucesso!')
        setForm({ nome: '', email: '', idade: '', telefone: '' })
      }
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      const mensagem =
        err.response?.data?.mensagem ||
        err.response?.data?.erros?.join(', ') ||
        'Erro ao salvar usuário.'
      setErro(mensagem)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-header bg-white py-3">
            <h4 className="mb-0 fw-semibold">
              {modoEdicao ? '✏️ Editar Usuário' : '➕ Novo Usuário'}
            </h4>
          </div>
          <div className="card-body p-4">

            {erro && (
              <div className="alert alert-danger alert-dismissible">
                {erro}
                <button className="btn-close" onClick={() => setErro('')} />
              </div>
            )}
            {sucesso && <div className="alert alert-success">{sucesso}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-medium">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Ex: João Silva"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Ex: joao@email.com"
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-medium">Idade</label>
                  <input
                    type="number"
                    className="form-control"
                    name="idade"
                    value={form.idade}
                    onChange={handleChange}
                    placeholder="Ex: 25"
                    min="1"
                    max="120"
                    required
                  />
                </div>
                <div className="col-md-8 mb-3">
                  <label className="form-label fw-medium">Telefone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder="Ex: (11) 91234-5678"
                    required
                  />
                </div>
              </div>

              <div className="d-flex gap-2 mt-2">
                <button type="submit" className="btn btn-primary" disabled={carregando}>
                  {carregando ? (
                    <><span className="spinner-border spinner-border-sm me-2" />Salvando...</>
                  ) : (
                    modoEdicao ? 'Salvar alterações' : 'Cadastrar'
                  )}
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/')}>
                  Cancelar
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default UsuarioForm
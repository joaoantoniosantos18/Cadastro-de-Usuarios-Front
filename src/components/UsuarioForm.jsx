// src/components/UsuarioForm.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { criarUsuario, buscarUsuario, atualizarUsuario } from '../services/api'

function UsuarioForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const modoEdicao = Boolean(id)

  const [form, setForm] = useState({ nome: '', email: '', idade: '', telefone: '' })
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  useEffect(() => {
    if (modoEdicao) {
      setCarregando(true)
      buscarUsuario(id)
        .then((r) => {
          const u = r.data.dados
          setForm({ nome: u.nome, email: u.email, idade: u.idade, telefone: u.telefone })
        })
        .catch(() => setErro('Não foi possível carregar o usuário.'))
        .finally(() => setCarregando(false))
    }
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
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
    <>
      {/* Topbar */}
      <div className="topbar">
        <div>
          <div className="topbar-title">{modoEdicao ? 'Editar Usuário' : 'Novo Usuário'}</div>
          <div className="topbar-sub">{modoEdicao ? 'Atualize os dados do usuário' : 'Preencha os dados para cadastrar'}</div>
        </div>
      </div>

      <div className="page">

        {/* Alertas */}
        {erro && (
          <div className="alert-custom alert-error" style={{ maxWidth: 560 }}>
            <span>⚠️</span>
            <span>{erro}</span>
            <button
              onClick={() => setErro('')}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '16px' }}
            >×</button>
          </div>
        )}
        {sucesso && (
          <div className="alert-custom alert-success" style={{ maxWidth: 560 }}>
            <span>✓</span>
            <span>{sucesso}</span>
          </div>
        )}

        {/* Formulário */}
        <div className="form-card">
          <div className="form-card-header">
            <div className="form-card-icon">
              {modoEdicao ? '✏️' : '➕'}
            </div>
            <h4>{modoEdicao ? 'Editar Usuário' : 'Cadastrar Usuário'}</h4>
          </div>

          <div className="form-card-body">
            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label className="form-label-custom">Nome completo</label>
                <input
                  type="text"
                  className="form-input-custom"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Ex: João Silva"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label-custom">E-mail</label>
                <input
                  type="email"
                  className="form-input-custom"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Ex: joao@email.com"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label-custom">Idade</label>
                  <input
                    type="number"
                    className="form-input-custom"
                    name="idade"
                    value={form.idade}
                    onChange={handleChange}
                    placeholder="25"
                    min="1"
                    max="120"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label-custom">Telefone</label>
                  <input
                    type="text"
                    className="form-input-custom"
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder="(11) 91234-5678"
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary-custom" disabled={carregando}>
                  {carregando ? (
                    <>
                      <div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                      Salvando...
                    </>
                  ) : (
                    modoEdicao ? '✓ Salvar alterações' : '+ Cadastrar'
                  )}
                </button>
                <button
                  type="button"
                  className="btn-secondary-custom"
                  onClick={() => navigate('/')}
                >
                  Cancelar
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </>
  )
}

export default UsuarioForm
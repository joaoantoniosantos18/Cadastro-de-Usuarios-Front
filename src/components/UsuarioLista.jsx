// src/components/UsuarioLista.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { listarUsuarios, deletarUsuario } from '../services/api'

function UsuarioLista() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    buscarTodos()
  }, [])

  const buscarTodos = () => {
    setCarregando(true)
    listarUsuarios()
      .then((resposta) => setUsuarios(resposta.data.dados))
      .catch(() => setErro('Não foi possível carregar os usuários.'))
      .finally(() => setCarregando(false))
  }

  const handleDeletar = async (id, nome) => {
    const confirmado = window.confirm(`Deseja realmente deletar "${nome}"?`)
    if (!confirmado) return
    try {
      await deletarUsuario(id)
      setMensagem(`"${nome}" removido com sucesso.`)
      setUsuarios((lista) => lista.filter((u) => u._id !== id))
      setTimeout(() => setMensagem(''), 3000)
    } catch {
      setErro('Erro ao deletar usuário.')
    }
  }

  // Calcula média de idade
  const mediaIdade = usuarios.length
    ? Math.round(usuarios.reduce((acc, u) => acc + u.idade, 0) / usuarios.length)
    : 0

  if (carregando) {
    return (
      <>
        <div className="topbar">
          <div>
            <div className="topbar-title">Dashboard</div>
            <div className="topbar-sub">Visão geral dos usuários</div>
          </div>
        </div>
        <div className="page">
          <div className="loading-wrapper">
            <div className="spinner-custom" />
            <span className="loading-text">Carregando dados...</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <div>
          <div className="topbar-title">Dashboard</div>
          <div className="topbar-sub">Visão geral dos usuários cadastrados</div>
        </div>
        <Link to="/novo" className="btn-primary-custom">
          <span>+</span> Novo Usuário
        </Link>
      </div>

      <div className="page">

        {/* Alertas */}
        {erro && (
          <div className="alert-custom alert-error">
            <span>⚠️</span>
            <span>{erro}</span>
            <button
              onClick={() => setErro('')}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '16px' }}
            >×</button>
          </div>
        )}
        {mensagem && (
          <div className="alert-custom alert-success">
            <span>✓</span>
            <span>{mensagem}</span>
          </div>
        )}

        {/* Cards de estatísticas */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-label">Total de Usuários</div>
            <div className="stat-value">{usuarios.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-label">Média de Idade</div>
            <div className="stat-value">{mediaIdade}</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-label">Registros Ativos</div>
            <div className="stat-value">{usuarios.length}</div>
          </div>
        </div>

        {/* Tabela */}
        <div className="table-card">
          <div className="table-header-bar">
            <div>
              <h5>Usuários Cadastrados</h5>
            </div>
            <span>{usuarios.length} registro(s)</span>
          </div>

          {usuarios.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">👤</div>
              <h5>Nenhum usuário cadastrado</h5>
              <p>Comece adicionando o primeiro usuário ao sistema.</p>
              <Link to="/novo" className="btn-primary-custom">
                + Cadastrar primeiro usuário
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Idade</th>
                    <th>Telefone</th>
                    <th style={{ textAlign: 'right' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario._id}>
                      <td>
                        <span className="user-name">{usuario.nome}</span>
                      </td>
                      <td>
                        <span className="user-email">{usuario.email}</span>
                      </td>
                      <td>
                        <span className="badge-age">{usuario.idade} anos</span>
                      </td>
                      <td>
                        <span className="phone-text">{usuario.telefone}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <Link to={`/editar/${usuario._id}`} className="btn-icon btn-edit">
                            ✏️ Editar
                          </Link>
                          <button
                            className="btn-icon btn-delete"
                            onClick={() => handleDeletar(usuario._id, usuario.nome)}
                          >
                            🗑️ Deletar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </>
  )
}

export default UsuarioLista
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
      .then((resposta) => {
        setUsuarios(resposta.data.dados)
      })
      .catch(() => setErro('Não foi possível carregar os usuários.'))
      .finally(() => setCarregando(false))
  }

  const handleDeletar = async (id, nome) => {
    const confirmado = window.confirm(`Deseja realmente deletar "${nome}"?`)
    if (!confirmado) return

    try {
      await deletarUsuario(id)
      setMensagem(`"${nome}" deletado com sucesso!`)
      setUsuarios((lista) => lista.filter((u) => u._id !== id))
      setTimeout(() => setMensagem(''), 3000)
    } catch {
      setErro('Erro ao deletar usuário.')
    }
  }

  if (carregando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" />
        <p className="mt-3 text-muted">Carregando usuários...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-0 fw-semibold">👥 Usuários Cadastrados</h4>
          <small className="text-muted">{usuarios.length} registro(s)</small>
        </div>
        <Link to="/novo" className="btn btn-primary">+ Novo Usuário</Link>
      </div>

      {erro && (
        <div className="alert alert-danger alert-dismissible">
          {erro}
          <button className="btn-close" onClick={() => setErro('')} />
        </div>
      )}

      {mensagem && <div className="alert alert-success">{mensagem}</div>}

      {usuarios.length === 0 ? (
        <div className="card shadow-sm">
          <div className="card-body text-center py-5">
            <p className="text-muted fs-5 mb-3">Nenhum usuário cadastrado ainda.</p>
            <Link to="/novo" className="btn btn-primary">Cadastrar primeiro usuário</Link>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Idade</th>
                  <th>Telefone</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario._id}>
                    <td className="align-middle fw-medium">{usuario.nome}</td>
                    <td className="align-middle text-muted">{usuario.email}</td>
                    <td className="align-middle">{usuario.idade} anos</td>
                    <td className="align-middle">{usuario.telefone}</td>
                    <td className="align-middle text-center">
                      <div className="d-flex gap-2 justify-content-center">
                        <Link to={`/editar/${usuario._id}`} className="btn btn-sm btn-outline-primary">
                          ✏️ Editar
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
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
        </div>
      )}
    </div>
  )
}

export default UsuarioLista
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import UsuarioLista from './components/UsuarioLista'
import UsuarioForm from './components/UsuarioForm'

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">

        {/* Sidebar fixa na esquerda */}
        <Sidebar />

        {/* Conteúdo principal */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<UsuarioLista />} />
            <Route path="/novo" element={<UsuarioForm />} />
            <Route path="/editar/:id" element={<UsuarioForm />} />
            <Route
              path="*"
              element={
                <>
                  <div className="topbar">
                    <div className="topbar-title">404</div>
                  </div>
                  <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                    <h2 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>Página não encontrada</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>A rota que você acessou não existe.</p>
                    <a href="/" className="btn-primary-custom">Voltar ao início</a>
                  </div>
                </>
              }
            />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  )
}

export default App
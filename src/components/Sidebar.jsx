// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <aside className="sidebar">

      {/* Logo / Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">👥</div>
        <div className="sidebar-brand-name">UserPanel</div>
        <div className="sidebar-brand-sub">Gestão de Usuários</div>
      </div>

      {/* Navegação */}
      <nav className="sidebar-nav">
        <div className="sidebar-label">Menu</div>

        <Link
          to="/"
          className={`nav-link-custom ${isActive('/') ? 'active' : ''}`}
        >
          <span className="nav-icon">📋</span>
          Lista de Usuários
        </Link>

        <Link
          to="/novo"
          className={`nav-link-custom ${isActive('/novo') ? 'active' : ''}`}
        >
          <span className="nav-icon">➕</span>
          Novo Usuário
        </Link>

      </nav>

      {/* Rodapé da sidebar */}
      <div className="sidebar-footer">
        v1.0.0 — Node + MongoDB
      </div>

    </aside>
  )
}

export default Sidebar
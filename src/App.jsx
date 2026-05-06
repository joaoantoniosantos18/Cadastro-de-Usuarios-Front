import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import UsuarioLista from './components/UsuarioLista'
import UsuarioForm from './components/UsuarioForm'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<UsuarioLista />} />
          <Route path="/novo" element={<UsuarioForm />} />
          <Route path="/editar/:id" element={<UsuarioForm />} />
          <Route
            path="*"
            element={
              <div className="text-center py-5">
                <h2>404 — Página não encontrada</h2>
                <a href="/" className="btn btn-primary mt-3">Voltar ao início</a>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
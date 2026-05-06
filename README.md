# 👥 Cadastro de Usuários — Frontend

Interface web para cadastro, listagem, edição e remoção de usuários, desenvolvida em React com design de dashboard profissional dark mode.

<img width="1919" height="946" alt="image" src="https://github.com/user-attachments/assets/790accf9-ed5d-4cc5-bc15-7409f9ea542f" />


---

## 🛠️ Tecnologias

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

---

## 📁 Estrutura do projeto

```
cadastro-usuarios-front/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          → menu lateral fixo
│   │   ├── UsuarioLista.jsx     → dashboard com tabela de usuários
│   │   └── UsuarioForm.jsx      → formulário de criação e edição
│   ├── services/
│   │   └── api.js               → configuração do Axios e chamadas ao backend
│   ├── App.jsx                  → rotas e layout principal
│   ├── main.jsx                 → ponto de entrada do React
│   └── index.css                → estilos globais do dashboard
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) instalado
- Backend rodando em `http://localhost:3000` → [Cadastro de Usuários — Backend](https://github.com/joaoantoniosantos18/Cadastro-de-Usuarios-Back)

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/joaoantoniosantos18/Cadastro-de-Usuarios-Front.git
cd Cadastro-de-Usuarios-Front
```

**2. Instale as dependências**
```bash
npm install
```

**3. Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.

> ⚠️ O backend precisa estar rodando para a aplicação funcionar. Inicie o backend antes de abrir o frontend.

---

## 📡 Páginas da aplicação

| Rota | Descrição |
|------|-----------|
| `/` | Dashboard com cards de estatísticas e tabela de usuários |
| `/novo` | Formulário para cadastrar novo usuário |
| `/editar/:id` | Formulário preenchido para editar usuário existente |

---

## 🔗 Backend

Este frontend consome a API desenvolvida em Node.js + Express + MongoDB:

[Cadastro de Usuários — Backend](https://github.com/joaoantoniosantos18/Cadastro-de-Usuarios-Back)

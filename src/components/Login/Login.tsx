import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Por favor, preencha email e senha");
      return;
    }

    // Aceita qualquer login e senha não vazios
    setErro("");
    navigate("/card");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Entrar</h2>

        {erro && <div className="erro">{erro}</div>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />

        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="current-password"
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;

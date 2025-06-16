import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Notificacao from "../components/Notificacao/NotificacaoNatural";
import Login from "../components/Login/Login";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Redireciona automaticamente da raiz para /card */}
        <Route path="/" element={<Navigate to="/card" replace />} />

        {/* Rotas principais */}
        <Route path="/auth" element={<Login />} />
        <Route path="/card" element={<Notificacao />} />

        {/* Caso queira uma página 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

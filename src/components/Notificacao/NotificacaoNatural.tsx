import { useEffect, useState } from "react";
import "../Notificacao/NotificacaoNatural.css";
import ModalCadastroNotificacao from "../ModalCadastroNotificacao/ModalCadastroNotificacao";

interface Notificacao {
  id: number;
  tipo: string;
  descricao: string;
  dataOcorrencia: string;
  local: string;  // nome correto do campo
  ativo: boolean;
}

function formatarData(dataStr: string) {
  const data = new Date(dataStr);
  if (isNaN(data.getTime())) return dataStr;
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}-${mes}-${ano}`;
}

function ListagemNotificacoes() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroLocal, setFiltroLocal] = useState("");  
  const [filtroData, setFiltroData] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [exibirCadastro, setExibirCadastro] = useState(false);
  const [notificacaoEditando, setNotificacaoEditando] = useState<Notificacao | null>(null);

  useEffect(() => {
    setNotificacoes([]);
  }, []);

  const handleSalvar = (novaNotificacao: Notificacao) => {
    if (notificacaoEditando) {
      setNotificacoes((prev) =>
        prev.map((n) => (n.id === novaNotificacao.id ? novaNotificacao : n))
      );
    } else {
      setNotificacoes((prev) => [...prev, novaNotificacao]);
    }
    setExibirCadastro(false);
    setNotificacaoEditando(null);
  };

  const notificacoesFiltradas = notificacoes.filter((notificacao) => {
    const statusStr = notificacao.ativo ? "ativo" : "inativo";
    return (
      notificacao.tipo.toLowerCase().includes(filtroTipo.toLowerCase()) &&
      (notificacao.local || "").toLowerCase().includes(filtroLocal.toLowerCase()) &&
      (filtroData === "" || notificacao.dataOcorrencia.includes(filtroData)) &&
      (filtroStatus === "" || statusStr.includes(filtroStatus.toLowerCase()))
    );
  });

  return (
    <div className="pagina-com-sidebar">
      <div className="conteudo-principal">
        <h2 className="titulo-produto">Notificações de Desastres Naturais</h2>

        <div className="filtros">
          <input
            type="text"
            placeholder="Filtrar por Tipo"
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filtrar por Local"
            value={filtroLocal}
            onChange={(e) => setFiltroLocal(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filtrar por Data"
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filtrar por Status"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          />

          <button className="btn-filtro btn-cadastrar" onClick={() => {
            setNotificacaoEditando(null); // Limpa edição para criar nova
            setExibirCadastro(true);
          }}>
            + Cadastrar Notificação
          </button>
        </div>

        <div className="cards-container">
          {notificacoesFiltradas.length > 0 ? (
            notificacoesFiltradas.map((notificacao) => (
              <div
                key={notificacao.id}
                className={`card ${notificacao.ativo ? "ativo" : "inativo"}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setNotificacaoEditando(notificacao);
                  setExibirCadastro(true);
                }}
              >
                <div className="card-header">
                  <h3>{notificacao.tipo}</h3>
                  <span className="status">{notificacao.ativo ? "Ativo" : "Inativo"}</span>
                </div>
                <p className="descricao">{notificacao.descricao}</p>
                <div className="card-footer">
                  <span>📅 {formatarData(notificacao.dataOcorrencia)}</span>
                  <span>📍 {notificacao.local || "-"}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="nenhuma-notificacao">Nenhuma notificação encontrada</p>
          )}
        </div>

        {exibirCadastro && (
          <ModalCadastroNotificacao
            onClose={() => {
              setExibirCadastro(false);
              setNotificacaoEditando(null);
            }}
            onSalvar={handleSalvar}
            notificacaoEditando={notificacaoEditando}
          />
        )}
      </div>
    </div>
  );
}

export default ListagemNotificacoes;

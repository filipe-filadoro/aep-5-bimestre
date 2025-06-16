import { useState } from "react";
import "../ModalCadastroNotificacao/ModalCadastroNotificacao.css";

interface Notificacao {
  id: number;
  tipo: string;
  descricao: string;
  dataOcorrencia: string;
  local: string;  // mudou aqui
  ativo: boolean;
}

interface ModalCadastroProps {
  onClose: () => void;
  onSalvar: (novaNotificacao: Notificacao) => void;
  notificacaoEditando: Notificacao | null;
}

function ModalCadastroNotificacao({ onClose, onSalvar, notificacaoEditando }: ModalCadastroProps) {
  const [tipo, setTipo] = useState(notificacaoEditando ? notificacaoEditando.tipo : "");
  const [descricao, setDescricao] = useState(notificacaoEditando ? notificacaoEditando.descricao : "");
  const [dataOcorrencia, setDataOcorrencia] = useState(notificacaoEditando ? notificacaoEditando.dataOcorrencia : "");
  const [local, setLocal] = useState(notificacaoEditando ? notificacaoEditando.local : ""); // mudou aqui
  const [ativo, setAtivo] = useState(notificacaoEditando ? notificacaoEditando.ativo : true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const novaNotificacao: Notificacao = {
      id: notificacaoEditando ? notificacaoEditando.id : Date.now(),
      tipo,
      descricao,
      dataOcorrencia,
      local,  // mudou aqui
      ativo,
    };

    onSalvar(novaNotificacao);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-conteudo">
        <h3>{notificacaoEditando ? "Editar Notificação" : "Cadastrar Notificação"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Data"
            value={dataOcorrencia}
            onChange={(e) => setDataOcorrencia(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Local"  // mudou aqui
            value={local}       // mudou aqui
            onChange={(e) => setLocal(e.target.value)} // mudou aqui
          />
          <label>
            <input
              type="checkbox"
              checked={ativo}
              onChange={(e) => setAtivo(e.target.checked)}
            />
            Ativo
          </label>
          <div>
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCadastroNotificacao;

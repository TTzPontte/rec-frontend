import React, { useState } from "react";
import {
  Container,
  Header,
  Fields,
  Field,
  BtnAddFile,
  BtnAddDocument,
} from "./styles";
import { DropDownDM } from "@iso/components/DropDownDM";
import Api from "../../api";
import { ReactComponent as TrashDocument } from "../../assets/icon-trash.svg";
import folderIcon from "../../assets/icon-folder.svg";
import addAttachmentIcon from "../../assets/add-attachment.svg";
import { InputPersonalizado } from "@iso/components";
import FormData from "form-data";

function buildFileSelector() {
  const fileSelector = document.createElement("input");
  fileSelector.setAttribute("type", "file");
  fileSelector.setAttribute("multiple", "multiple");
  return fileSelector;
}

export const AddDocumento = ({
  visible,
  setVisible = () => {},
  initualValue = "",
  pessoaId,
  setListDocuments,
}) => {
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const [nomeDocumento, setNomeDocumento] = useState(null);
  const [tipoDocumento, setTipoDocumento] = useState(null);

  const api = new Api();

  const handleFileSelect = () => {
    const fileSelector = buildFileSelector();

    fileSelector.addEventListener("change", async (e) =>
      setArquivoSelecionado(e.target.files[0])
    );

    fileSelector.click();
  };

  const handleAddDocument = async () => {
    if (!nomeDocumento && !tipoDocumento && !arquivoSelecionado) return;

    const data = new FormData();
    data.append("file", arquivoSelecionado);
    data.append("nome", nomeDocumento || arquivoSelecionado.name);
    data.append("anexoTipo", tipoDocumento);
    data.append("urlOrigem", "");
    data.append("pessoaId", pessoaId);

    const resultado = await api.salvar("pessoa-anexo", data);

    if (resultado.status === 201) {
      setListDocuments(resultado.data);
      setVisible(false);
      setNomeDocumento(null);
      setArquivoSelecionado(null);
      setTipoDocumento(null);
    }
  };

  const handleDestroyForm = () => setVisible(false);

  return (
    <Container visible={visible}>
      <Header>
        <div className="title">
          <img src={folderIcon} alt="" />
          <span> Novo Documento </span>
        </div>
        <TrashDocument
          onClick={handleDestroyForm}
          style={{ cursor: "pointer" }}
        />
      </Header>
      <Fields>
        <Field>
          <DropDownDM
            title={"Tipo"}
            initialValue={initualValue}
            handleSaveItem={(descricao) =>
              api.addItemDM("dm-pessoa-anexo-tipo", { descricao })
            }
            handleGetItem={async () =>
              api.buscarTabelaDM("dm-pessoa-anexo-tipo")
            }
            handleSaveProcessInfo={({ descricao }) =>
              setTipoDocumento(descricao)
            }
          />
        </Field>
        <Field>
          <InputPersonalizado
            texto={"Nome:"}
            valorCampo={arquivoSelecionado?.name || ""}
            onSave={(value) => setNomeDocumento(value)}
            idCampo={"nome"}
          />
        </Field>
        <Field>
          <div className="title">
            <img src={folderIcon} alt="" />
            <span> Documento </span>
          </div>
          {!arquivoSelecionado ? (
            <BtnAddFile type="file" onClick={handleFileSelect}>
              <img src={addAttachmentIcon} alt="" />
              <span>Adicionar arquivo</span>
            </BtnAddFile>
          ) : (
            <span className="textFileSelected" onClick={handleFileSelect}>
              {arquivoSelecionado?.name}
            </span>
          )}
        </Field>
      </Fields>
      <BtnAddDocument onClick={() => handleAddDocument()}>
        <div className="buttonAddDocument">
          <img src={addAttachmentIcon} alt="" />
          <span>ADICIONAR</span>
        </div>
      </BtnAddDocument>
    </Container>
  );
};

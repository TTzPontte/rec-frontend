import React, { useState } from "react";
import Api from "../../api";
import { buildFileSelector } from "@iso/utils/BuildFileSelector";
import FormData from "form-data";

import { DropDownDM } from "@iso/components/";

import {
  Container,
  Header,
  Fields,
  Field,
  BtnAddFile,
  BtnAddDocument,
} from "./styles";

import { ReactComponent as TrashDocument } from "@iso/assets/icon-trash.svg";
import folderIcon from "@iso/assets/icon-folder.svg";
import addAttachmentIcon from "@iso/assets/add-attachment.svg";

export const FormDocumento = ({
  visible,
  setVisible = () => {},
  initualValue = "",
  pessoaId,
  setListDocuments,
}) => {
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const [tipoDocumento, setTipoDocumento] = useState(null);
  const areFilled = !!arquivoSelecionado && !!tipoDocumento;

  const api = new Api();

  const handleFileSelect = () => {
    const fileSelector = buildFileSelector();

    fileSelector.addEventListener("change", async (e) =>
      setArquivoSelecionado(e.target.files[0])
    );

    fileSelector.click();
  };

  const handleAddDocument = async () => {
    if (!areFilled) return;

    const data = new FormData();
    data.append("file", arquivoSelecionado);
    data.append("nome", arquivoSelecionado.name);
    data.append("anexoTipo", tipoDocumento);
    data.append("urlOrigem", "");
    data.append("pessoaId", pessoaId);

    const resultado = await api.salvar("pessoa-anexo", data);

    if (resultado.status === 201) {
      setListDocuments(resultado.data);
      setVisible(false);
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
          <span> Novo Tipo de Documento </span>
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
          <div className="title">
            <img src={folderIcon} alt="" />
            <span>Documento</span>
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
      <BtnAddDocument disable={areFilled} onClick={handleAddDocument}>
        <div className="buttonAddDocument">
          <span>SALVAR</span>
        </div>
      </BtnAddDocument>
    </Container>
  );
};

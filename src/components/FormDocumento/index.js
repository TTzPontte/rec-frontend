import React, { useCallback, useEffect, useState } from "react";
import { buildFileSelector } from "@iso/utils/BuildFileSelector";

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
  handleSaveDocumento,
  handleGetTipoDM,
  handleSaveTipoDM,
}) => {

  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const [tipoDocumento, setTipoDocumento] = useState(null);

  const areFilled = !!arquivoSelecionado && !!tipoDocumento;

  const getTypeDocument = useCallback(
    () => setTipoDocumento(initualValue),
    [initualValue]
  );

  useEffect(() => {
    getTypeDocument();
  }, [getTypeDocument]);

  const handleReset = () => {
    setTipoDocumento(null);
    setArquivoSelecionado(null);
  };

  const handleFileSelect = () => {
    const fileSelector = buildFileSelector();

    fileSelector.addEventListener("change", async (e) =>
      setArquivoSelecionado(e.target.files[0])
    );

    fileSelector.click();
  };

  const handleAddDocument = async () => {
    if (!areFilled) return;

    const anexo = await handleSaveDocumento(arquivoSelecionado, tipoDocumento);

    if (!!anexo) {
      setVisible(false);
      handleReset();
    }
  };

  const handleDestroyForm = () => {
    setVisible(false);
    handleReset();
  };

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
            initialValue={tipoDocumento}
            handleSaveItem={(descricao) => handleSaveTipoDM(descricao)}
            handleGetItem={handleGetTipoDM}
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

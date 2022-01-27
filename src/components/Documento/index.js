import React, { useState } from "react";
import Api from "@iso/api";
import FormData from "form-data";
import { buildFileSelector } from "@iso/utils/BuildFileSelector";

import { Container, Header, File, BtnAddFile } from "./styled-component";

import { ReactComponent as DeleteFile } from "@iso/assets/icon-delete.svg";
import { ReactComponent as DownloadFile } from "@iso/assets/icon-download.svg";
import addAttachmentIcon from "@iso/assets/add-attachment.svg";
import folderIcon from "@iso/assets/icon-folder.svg";
import jpgIcon from "@iso/assets/icon-jpg.svg";

export const Documento = ({ title = "", files = [], pessoaId }) => {
  const [listFile, setListFile] = useState(files);

  const api = new Api();

  const handleDownloadDocument = (url) => {
    const lastElement = (arr) => arr[arr.length - 1];

    const filename = lastElement(url.split("/"));

    api.downloadFile(url, filename);
  };

  const handleDeleteFile = async (id) => {
    const { status } = await api.deletar(`pessoa-anexo/${id}`);
    if (status === 200) setListFile(listFile.filter((file) => file.id !== id));
  };

  const handleFileSelect = (anexoTipo, pessoaId) => {
    const fileSelector = buildFileSelector();

    fileSelector.addEventListener("change", async (e) => {
      const file = e.target.files[0];

      const data = new FormData();
      data.append("file", file);
      data.append("nome", file.name);
      data.append("anexoTipo", anexoTipo);
      data.append("urlOrigem", "");
      data.append("pessoaId", pessoaId);

      const resultado = await api.salvar("pessoa-anexo", data);

      if (resultado.status === 201) setListFile([...listFile, resultado.data]);
    });
    fileSelector.click();
  };

  return (
    <Container>
      <Header>
        <img src={folderIcon} alt="" />
        <span> {title} </span>
      </Header>
      {listFile.map((file) => (
        <File>
          <div className="filename">
            <img src={jpgIcon} alt="" />
            <div>{file.nome}</div>
          </div>
          <div className="areaBtnFiles">
            <DownloadFile
              className="btnFile downloadFile"
              onClick={() => handleDownloadDocument(file.url)}
            />
            <DeleteFile
              className="btnFile deleteFile"
              onClick={() => handleDeleteFile(file.id)}
            />
          </div>
        </File>
      ))}
      <BtnAddFile onClick={() => handleFileSelect(title, pessoaId)}>
        <img src={addAttachmentIcon} alt="" />
        <span>Adicionar arquivo</span>
      </BtnAddFile>
    </Container>
  );
};

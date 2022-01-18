import React, { useState } from "react";
import { Container, Header, File, BtnAddFile } from "./styles";
import { ReactComponent as DeleteFile } from "../../assets/icon-delete.svg";
import { ReactComponent as DownloadFile } from "../../assets/icon-download.svg";
import addAttachmentIcon from "../../assets/add-attachment.svg";
import folderIcon from "../../assets/icon-folder.svg";
import jpgIcon from "../../assets/icon-jpg.svg";
import Api from "../../api";
import FormData from "form-data";

function buildFileSelector() {
  const fileSelector = document.createElement("input");
  fileSelector.setAttribute("type", "file");
  fileSelector.setAttribute("multiple", "multiple");
  return fileSelector;
}

export const Documento = ({ title = "", files = [], pessoaId }) => {
  const [listFile, setListFile] = useState(files);
  const api = new Api();

  const handleDownloadDocument = (url) => api.downloadFile(url);

  const handleDeleteFile = async (id) => {
    const { status } = await api.deletar(`pessoa-anexo/${id}`);
    if (status === 200 || status === 204) {
      console.log("entrou");
      setListFile(listFile.filter((file) => file.id !== id));
    }
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

      if (resultado.status === 201) {
        setListFile([...listFile, resultado.data]);
      }
    });
    fileSelector.click();
  };

  return (
    <Container>
      <Header>
        <img src={folderIcon} alt="" />
        <span> {title} </span>
      </Header>
      {listFile.length > 0 &&
        listFile.map((file) => (
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

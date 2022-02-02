import React, { useCallback, useEffect, useState } from "react";
import Api from "@iso/api";
import { buildFileSelector } from "@iso/utils/BuildFileSelector";

import { Container, Header, File, BtnAddFile } from "./styled-component";

import { ReactComponent as DeleteFile } from "@iso/assets/icon-delete.svg";
import { ReactComponent as DownloadFile } from "@iso/assets/icon-download.svg";
import addAttachmentIcon from "@iso/assets/add-attachment.svg";
import folderIcon from "@iso/assets/icon-folder.svg";
import jpgIcon from "@iso/assets/icon-jpg.svg";

export const Documento = ({
  title,
  files,
  handleSaveDocumento,
  handleDeleteDocumento,
}) => {
  const [listFile, setListFile] = useState(files);

  const getListFileCallback = useCallback(() => setListFile(files), [files]);

  useEffect(() => {
    getListFileCallback();
  }, [getListFileCallback]);

  const api = new Api();

  const handleDownloadDocument = (url) => {
    const lastElement = (arr) => arr[arr.length - 1];

    const filename = lastElement(url.split("/"));

    api.downloadFile(url, filename);
  };

  const handleDeleteFile = async (id) => {
    handleDeleteDocumento(id).then(() =>
      setListFile(listFile.filter((file) => file.id !== id))
    );
  };

  const handleFileSelect = (anexoTipo) => {
    const fileSelector = buildFileSelector();

    fileSelector.addEventListener("change", async (e) => {
      const file = e.target.files[0];

      console.log({ original: file });

      const anexo = await handleSaveDocumento(file, anexoTipo);

      setListFile([...listFile, anexo]);
    });

    fileSelector.click();
  };

  return (
    <Container>
      <Header>
        <img src={folderIcon} alt="" />
        <span> {title} </span>
      </Header>
      {listFile.map((file, index) => (
        <File key={index}>
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
      <BtnAddFile onClick={() => handleFileSelect(title)}>
        <img src={addAttachmentIcon} alt="" />
        <span>Adicionar arquivo</span>
      </BtnAddFile>
    </Container>
  );
};

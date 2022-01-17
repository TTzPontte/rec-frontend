import React from "react";
import { Container, Header, File, BtnAddFile } from "./styles";
import { ReactComponent as DeleteFile } from "../../assets/icon-delete.svg";
import { ReactComponent as DownloadFile } from "../../assets/icon-download.svg";
import addAttachmentIcon from "../../assets/add-attachment.svg";
import folderIcon from "../../assets/icon-folder.svg";
import jpgIcon from "../../assets/icon-jpg.svg";
import Api from "../../api";

export const Documento = ({ title, files }) => {
  const api = new Api();
  const handleDownloadDocument = (url) => {
    return api.downloadFile(url);
  };
  return (
    <Container>
      <Header>
        <img src={folderIcon} alt="" />
        <span> {title} </span>{" "}
      </Header>
      {files.length > 0 &&
        files.map((file) => (
          <File>
            <div>
              <img src={jpgIcon} alt="" />
              <span>{file.nome}</span>
            </div>
            <div>
              <DownloadFile
                className="btnFile downloadFile"
                onClick={handleDownloadDocument}
              />
              <DeleteFile className="btnFile deleteFile" />
            </div>
          </File>
        ))}
      <BtnAddFile type="file" onClick={() => {}}>
        <img src={addAttachmentIcon} alt="" />
        <span>Adicionar arquivo</span>
      </BtnAddFile>
    </Container>
  );
};

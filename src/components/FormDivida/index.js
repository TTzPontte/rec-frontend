import React, { useState, useEffect, useCallback } from "react";
import Api from "@iso/api";
import { buildFileSelector } from "@iso/utils/BuildFileSelector";

import {
  Container,
  Header,
  Fields,
  Field,
  BtnAddFile,
} from "./styled-component";

import { DropDownDM, InputMonetarioPersonalizado } from "@iso/components";

import { ReactComponent as TrashDocument } from "@iso/assets/icon-trash.svg";
import folderIcon from "@iso/assets/icon-folder.svg";
import addAttachmentIcon from "@iso/assets/add-attachment.svg";

export const FormDivida = ({
  divida = {},
  handleGetAnexo,
  handleSaveDocumentoDivida,
  handleOnSaveDivida,
  handleExcluirDivida,
}) => {
  const api = new Api();

  const [arquivo, setArquivo] = useState(null);

  const handleGetAnexoCallback = useCallback(async () => {
    handleGetAnexo(divida).then(({data}) => setArquivo(data[0]));
  }, [divida, handleGetAnexo]);

  useEffect(() => {
    handleGetAnexoCallback();
  }, [handleGetAnexoCallback]);

  const handleFileSelect = async () => {
    const fileSelector = buildFileSelector();

    fileSelector.addEventListener("change", async (e) => {
      const file = e.target.files[0];

      const anexo = await handleSaveDocumentoDivida(file, divida.dividaTipo);

      if (!!anexo) setArquivo({ ...anexo, fileName: file.name });
    });

    fileSelector.click();
  };


  const handleDownloadDocument = () => {    
    if(!arquivo) return null;
   
    const url = arquivo.url;

    const lastElement = (arr) => arr[arr.length - 1];

    const filename = lastElement(url.split("/"));

    const pathname = new URL(url).pathname.substring(1);
    
    api.downloadFile(pathname, filename);
  };

  return (
    <Container>
      <Header>
        <div className="title">
          <img src={folderIcon} alt="" />
          <span>Dívida | {divida.dividaTipo}</span>
        </div>
        <TrashDocument
          onClick={() => handleExcluirDivida(arquivo, divida)}
          style={{ cursor: "pointer" }}
        />
      </Header>
      <Fields>
        <Field>
          <DropDownDM
            title={"Tipo"}
            initialValue={divida.dividaTipo}
            handleSaveItem={(descricao) =>
              api.addItemDM("dm-divida-tipo", { descricao })
            }
            handleGetItem={async () => api.buscarTabelaDM("dm-divida-tipo")}
            handleSaveProcessInfo={({ descricao }) =>
              handleOnSaveDivida("dividaTipo", descricao)
            }
          />
        </Field>
        <Field>
          <InputMonetarioPersonalizado
            texto="Valor"
            valorCampo={divida.valor}
            onSave={(value) =>
              handleOnSaveDivida("valor", Number(value.slice(2)))
            }
            idCampo="valorDivida"
          />
        </Field>
        <Field>
          {
            <DropDownDM
              title={"Status"}
              initialValue={divida.status}
              handleSaveItem={(descricao) =>
                api.addItemDM("dm-divida-status", { descricao })
              }
              handleGetItem={async () => api.buscarTabelaDM("dm-divida-status")}
              handleSaveProcessInfo={({ descricao }) =>
                handleOnSaveDivida("status", descricao)
              }
            />
          }
        </Field>
        <Field>
          <div className="title">
            <img src={folderIcon} alt="" />
            <span>Documento</span>
          </div>
          {!arquivo ? (
            <BtnAddFile onClick={handleFileSelect}>
              <img src={addAttachmentIcon} alt="" />
              <span>Adicionar arquivo</span>
            </BtnAddFile>
          ) : (
            <span className="textFileSelected" onClick={handleDownloadDocument}>
              {arquivo?.fileName ?? arquivo?.nome}
            </span>
          )}
        </Field>
      </Fields>
    </Container>
  );
};

import React, { useMemo, useState } from "react";
import {
  Container,
  Header,
  Fields,
  Field,
  BtnAddFile,
} from "./styled-component";
import { ReactComponent as TrashDocument } from "../../assets/icon-trash.svg";
import folderIcon from "../../assets/icon-folder.svg";
import addAttachmentIcon from "../../assets/add-attachment.svg";
import Api from "../../api";

import { InputMonetarioPersonalizado } from "../InputMonetarioPersonalizado";
import { DropDownDM } from "../DropDownDM";
import { useEffect } from "react";
import { useCallback } from "react";

function buildFileSelector() {
  const fileSelector = document.createElement("input");
  fileSelector.setAttribute("type", "file");
  return fileSelector;
}

export const FormDivida = ({
  divida,
  handleDeletarDivida,
  handleAlterarDivida,
}) => {
  const api = new Api();

  const [arquivo, setArquivo] = useState(null);

  const handleGetAnexo = () => {
    api.busca(`/pessoa-divida-anexo?pessoaDivida=${divida.id}`, (data) =>
      setArquivo(data[0])
    );
  };

  const handleGetAnexoCallback = useCallback(handleGetAnexo, [divida.id]);

  useEffect(() => {
    handleGetAnexoCallback();
  }, [handleGetAnexoCallback]);

  const handleOnSaveDivida = (key, value, setState = () => {}) =>
    api
      .alterarProcesso(`/pessoa-divida/${divida.id}`, {
        ...divida,
        [key]: value,
      })
      .then(() => {
        setState(value);
        handleAlterarDivida({ ...divida, [key]: value });
      });

  const handleFileSelect = async () => {
    const fileSelector = buildFileSelector();

    fileSelector.addEventListener("change", async (e) => {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append("file", file);
      formData.append("nome", file.name);
      formData.append("anexoTipo", divida.dividaTipo);
      formData.append("urlOrigem", "pontte");
      formData.append("pessoaDividaId", divida.id);

      if (!!arquivo) await api.deletar(`/pessoa-divida-anexo/${arquivo?.id}`);

      const resultado = await api.salvar("/pessoa-divida-anexo", formData);

      if (resultado.status === 201)
        setArquivo({ ...resultado.data, fileName: file.name });
    });

    fileSelector.click();
  };

  const excluirDivida = async () => {
    if (!!arquivo) await api.deletar(`/pessoa-divida-anexo/${arquivo?.id}`);

    api
      .deletar(`/pessoa-divida/${divida.id}`)
      .then(() => handleDeletarDivida(divida.id));
  };

  return (
    <Container>
      {console.log({ arquivo })}
      <Header>
        <div className="title">
          <img src={folderIcon} alt="" />
          <span>Dívida | {divida.dividaTipo}</span>
        </div>
        <TrashDocument onClick={excluirDivida} style={{ cursor: "pointer" }} />
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
            <BtnAddFile type="file" onClick={handleFileSelect}>
              <img src={addAttachmentIcon} alt="" />
              <span>Adicionar arquivo</span>
            </BtnAddFile>
          ) : (
            <span className="textFileSelected" onClick={handleFileSelect}>
              {arquivo?.fileName ?? arquivo?.nome}
            </span>
          )}
        </Field>
      </Fields>
    </Container>
  );
};

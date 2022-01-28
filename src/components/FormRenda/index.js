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

export const FormRenda = ({
  renda = {},
  handleDeletarRenda = () => {},
  handleAlterarRenda = () => {},
}) => {
  const api = new Api();

  const [arquivo, setArquivo] = useState(null);

  const handleGetAnexo = () =>
    api.busca(`/renda-anexo?renda=${renda.id}`, (data) => setArquivo(data[0]));

  const handleGetAnexoCallback = useCallback(handleGetAnexo, [renda.id]);

  useEffect(() => {
    handleGetAnexoCallback();
  }, [handleGetAnexoCallback]);

  const handleOnSaveDivida = (key, value) => {
    api
      .alterarProcesso(`/renda/${renda.id}`, {
        ...renda,
        [key]: value,
      })
      .then(() => handleAlterarRenda({ ...renda, [key]: value }));
  };

  const handleFileSelect = async () => {
    const fileSelector = buildFileSelector();

    fileSelector.addEventListener("change", async (e) => {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append("file", file);
      formData.append("nome", file.name);
      formData.append("anexoTipo", renda.rendaTipo);
      formData.append("urlOrigem", window.location.hostname);
      formData.append("rendaId", renda.id);

      if (!!arquivo) await api.deletar(`/renda-anexo/${arquivo?.id}`);

      const resultado = await api.salvar("/renda-anexo", formData);

      if (resultado.status === 201)
        setArquivo({ ...resultado.data, fileName: file.name });
    });

    fileSelector.click();
  };

  const handleExcluirDivida = async () => {
    if (!!arquivo) await api.deletar(`/renda-anexo/${arquivo?.id}`);

    api.deletar(`/renda/${renda.id}`).then(() => handleDeletarRenda(renda.id));
  };

  const handleDownloadDocument = () => {
    const url = arquivo.url;
    const lastElement = (arr) => arr[arr.length - 1];
    const filename = lastElement(url.split("/"));

    api.downloadFile(url, filename);
  };

  return (
    <Container>
      <Header>
        <div className="title">
          <img src={folderIcon} alt="" />
          <span>Renda | {renda.rendaTipo}</span>
        </div>
        <TrashDocument
          onClick={handleExcluirDivida}
          style={{ cursor: "pointer" }}
        />
      </Header>
      <Fields>
        <Field>
          <DropDownDM
            title={"Tipo"}
            initialValue={renda.rendaTipo}
            handleSaveItem={(descricao) =>
              api.addItemDM("dm-renda-tipo", { descricao })
            }
            handleGetItem={async () => api.buscarTabelaDM("dm-renda-tipo")}
            handleSaveProcessInfo={({ descricao }) =>
              handleOnSaveDivida("rendaTipo", descricao)
            }
          />
        </Field>

        <Field>
          <InputMonetarioPersonalizado
            texto="Renda Informada"
            valorCampo={renda.rendaInformada}
            onSave={(value) =>
              handleOnSaveDivida("rendaInformada", Number(value.slice(2)))
            }
          />
        </Field>

        <Field>
          <InputMonetarioPersonalizado
            texto="Renda Aferida"
            valorCampo={renda.rendaAferida}
            onSave={(value) =>
              handleOnSaveDivida("rendaAferida", Number(value.slice(2)))
            }
          />
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

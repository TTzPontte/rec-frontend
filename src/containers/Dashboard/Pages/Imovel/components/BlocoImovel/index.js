import React, { useCallback, useEffect, useState } from "react";
import Api from "@iso/api";
import addAttachmentIcon from "@iso/assets/add-attachment.svg";
import { groupBy } from "@iso/utils/GroupBy";

import {
  InputPersonalizado,
  InputMaskPersonalizado,
  Documento,
  FormDocumento,
  FormDivida,
} from "@iso/components";

import { Content, BtnAdd } from "./styled-components";

export const BlocoImovel = ({
  patrimonio,
  dividasPatrimonio,
  documentosPatrimonio,
  handleAddListDocument,
}) => {
  const api = new Api();
  const [dividas, setDividas] = useState([]);
  const [isVisibleAddDocument, setIsVisibleAddDocument] = useState(false);
  const [documentos, setDocumentos] = useState([]);

  const getDocumentoCallback = useCallback(
    () =>
      setDocumentos(Object.entries(groupBy(documentosPatrimonio, "anexoTipo"))),
    [documentosPatrimonio]
  );

  const getDividasCallback = useCallback(
    () => setDividas(dividasPatrimonio),
    [dividasPatrimonio]
  );

  useEffect(() => {
    getDocumentoCallback();
    getDividasCallback();
  }, [getDividasCallback, getDocumentoCallback]);

  const handleOnSaveImovel = (imovel, key, newValue) => {
    /*if (!newValue) return;

    const imovelAlterado = { ...imovel, [key]: newValue };

    api
      .alterarProcesso(`/patrimonio/${imovel.id}`, imovelAlterado)
      .then((imovel) =>
        setImoveis(
          imoveis.map((patrimonio) => {
            if (patrimonio.id === imovel.id) {
              patrimonio = imovel;
            }
            return patrimonio;
          })
        )
      );
      */
  };

  const handleSaveDocumentoPatrimonio = async (arquivo, tipoArquivo) => {
    try {
      const formData = new FormData();

      formData.append("file", arquivo);
      formData.append("nome", arquivo.name);
      formData.append("anexoTipo", tipoArquivo);
      formData.append("urlOrigem", "");
      formData.append("patrimonioId", patrimonio.id);

      const { data: documento } = await api.salvar(
        "patrimonio-anexo",
        formData
      );

      handleAddListDocument(documento);

      return documento;
    } catch (error) {
      console.log({ error });
      return;
    }
  };

  const handleDeleteDocumentoPatrimonio = async (patrimonioAnexoId) =>
    api.deletar(`patrimonio-anexo/${patrimonioAnexoId}`);

  const handleGetTipoPatrimonioAnexo = () =>
    api.buscarTabelaDM("dm-patrimonio-anexo-tipo");

  const handleSaveTipoPatrimonioAnexo = (descricao) =>
    api.addItemDM("dm-patrimonio-anexo-tipo", { descricao });

  // Handles Divida

  const handleCriarDivida = () => {
    api
      .salvar("/patrimonio-divida", {
        dividaTipo: null,
        valor: null,
        status: null,
        quitar: true,
        patrimonio: {
          id: patrimonio.id,
        },
      })
      .then(({ data: novaDivida }) =>
        setDividas([...dividasPatrimonio, novaDivida])
      );
  };

  const handleSaveDocumentoDivida = async (divida, arquivo, tipoArquivo) => {
    try {
      const formData = new FormData();

      formData.append("file", arquivo);
      formData.append("nome", arquivo.name);
      formData.append("anexoTipo", tipoArquivo);
      formData.append("urlOrigem", window.location.hostname);
      formData.append("patrimonioDividaId", divida.id);

      const { data: documento } = await api.salvar(
        "/patrimonio-divida-anexo",
        formData
      );

      return documento;
    } catch (error) {
      console.log({ error });
      return;
    }
  };

  const handleAlterarDivida = () => {};

  const handleExcluirDivida = async (arquivo, divida) => {
    if (!!arquivo) await api.deletar(`/patrimonio-divida-anexo/${arquivo.id}`);

    api
      .deletar(`/patrimonio-divida/${divida.id}`)
      .then(() =>
        setDividas(
          dividasPatrimonio.filter(
            (dividaPatrimonio) => dividaPatrimonio.id !== divida.id
          )
        )
      );
  };

  const handleOnSaveDivida = (divida, key, value) => {
    api
      .alterarProcesso(`/patrimonio-divida/${divida.id}`, {
        ...divida,
        [key]: value,
      })
      .then(() => handleAlterarDivida({ ...divida, [key]: value }));
  };

  const handleGetAnexoDivida = (divida) =>
    api.buscarProcesso(`/patrimonio-divida-anexo?patrimonioDivida=${divida.id}`);

  return (
    <>
      <Content>
        <header>INFORMAÇÕES GERAIS</header>

        <InputPersonalizado
          texto={"Tipo do imóvel"}
          valorCampo={patrimonio.categoria}
          onSave={(value) => handleOnSaveImovel(patrimonio, "categoria", value)}
        />

        <InputPersonalizado
          texto={"Logradouro"}
          valorCampo={patrimonio.logradouro}
          onSave={(value) =>
            handleOnSaveImovel(patrimonio, "logradouro", value)
          }
        />

        <InputPersonalizado
          texto={"Numero"}
          valorCampo={patrimonio.numero}
          onSave={(value) => handleOnSaveImovel(patrimonio, "numero", value)}
        />

        <InputPersonalizado
          texto={"Complemento"}
          valorCampo={patrimonio.complemento}
          onSave={(value) =>
            handleOnSaveImovel(patrimonio, "complemento", value)
          }
        />

        <InputPersonalizado
          texto={"CEP"}
          valorCampo={patrimonio.cep}
          onSave={(value) => handleOnSaveImovel(patrimonio, "cep", value)}
        />

        <InputPersonalizado
          texto={"Estado"}
          valorCampo={patrimonio.estado}
          onSave={(value) => handleOnSaveImovel(patrimonio, "estado", value)}
        />

        <InputPersonalizado
          texto={"Cidade"}
          valorCampo={patrimonio.cidade}
          onSave={(value) => handleOnSaveImovel(patrimonio, "cidade", value)}
        />

        <InputPersonalizado
          texto={"Bairro"}
          valorCampo={patrimonio.bairro}
          onSave={(value) => handleOnSaveImovel(patrimonio, "bairro", value)}
        />

        <InputPersonalizado
          texto={"Numero da Matricula"}
          valorCampo={patrimonio.numeroMatricula}
          onSave={(value) =>
            handleOnSaveImovel(patrimonio, "numeroMatricula", value)
          }
        />

        <InputPersonalizado
          texto={"Cartório de Registro"}
          valorCampo={patrimonio.cartorioRegistro}
          onSave={(value) =>
            handleOnSaveImovel(patrimonio, "cartorioRegistro", value)
          }
        />

        <InputPersonalizado
          texto={"Cartório de Registro"}
          valorCampo={patrimonio.cartorioRegistro}
          onSave={(value) =>
            handleOnSaveImovel(patrimonio, "cartorioRegistro", value)
          }
        />

        <InputMaskPersonalizado
          texto={"Área Informada"}
          valorCampo={patrimonio.areaInformada}
          onSave={(value) =>
            handleOnSaveImovel(patrimonio, "areaInformada", value)
          }
          mask={"30m²"}
        />

        <InputPersonalizado
          texto={"Área Construida"}
          valorCampo={patrimonio.areaConstruida}
          onSave={(value) =>
            handleOnSaveImovel(patrimonio, "areaConstruida", value)
          }
        />

        <InputPersonalizado
          texto={"Valor Informado"}
          valorCampo={patrimonio.valorInformado}
          onSave={(value) =>
            handleOnSaveImovel(patrimonio, "valorInformado", value)
          }
        />

        <InputPersonalizado
          texto={"Valor Pontte"}
          valorCampo={patrimonio.valorPontte}
          onSave={(value) =>
            handleOnSaveImovel(patrimonio, "valorPontte", value)
          }
        />

        <InputPersonalizado
          texto={"Valor da Avaliação"}
          valorCampo={patrimonio.valorAvaliado}
          onSave={(value) =>
            handleOnSaveImovel(patrimonio, "valorAvaliado", value)
          }
        />
      </Content>

      <Content>
        <header>DOCUMENTOS</header>
        {documentos.map(([title, files], index) => (
          <div className="documentoPessoa" key={`documento_${index}`}>
            <Documento
              title={title}
              files={files}
              handleSaveDocumento={(arq, tipo) =>
                handleSaveDocumentoPatrimonio(patrimonio, arq, tipo)
              }
              handleDeleteDocumento={handleDeleteDocumentoPatrimonio}
            />
          </div>
        ))}
        <div>
          <FormDocumento
            visible={isVisibleAddDocument}
            setVisible={setIsVisibleAddDocument}
            handleSaveDocumento={(arq, tipo) =>
              handleSaveDocumentoPatrimonio(patrimonio, arq, tipo)
            }
            handleGetTipoDM={handleGetTipoPatrimonioAnexo}
            handleSaveTipoDM={handleSaveTipoPatrimonioAnexo}
          />
        </div>
        <div className="addFilePessoa">
          {!isVisibleAddDocument ? (
            <BtnAdd
              onClick={() => setIsVisibleAddDocument(!isVisibleAddDocument)}
            >
              <div className="buttonAddDocument">
                <img
                  src={addAttachmentIcon}
                  alt="Imagem do botão de adicionar novo item"
                  style={{ cursor: "pointer" }}
                />
                <span>ADICIONAR</span>
              </div>
            </BtnAdd>
          ) : (
            <div></div>
          )}
        </div>
      </Content>

      <Content>
        <header>DÍVIDAS</header>
        {dividas.map((divida) => {
          return (
            <FormDivida
              divida={divida}
              handleGetAnexo={() => handleGetAnexoDivida(divida)}
              handleSaveDocumentoDivida={(arq, tipo) =>
                handleSaveDocumentoDivida(divida, arq, tipo)
              }
              handleOnSaveDivida={(key, value) =>
                handleOnSaveDivida(divida, key, value)
              }
              handleExcluirDivida={handleExcluirDivida}
              key={divida.uuid}
            />
          );
        })}
        <div className="addFilePessoa">
          <BtnAdd onClick={handleCriarDivida}>
            <div className="buttonAddDocument">
              <img
                src={addAttachmentIcon}
                alt="Imagem do botão de adicionar novo item"
                style={{ cursor: "pointer" }}
              />
              <span>ADICIONAR</span>
            </div>
          </BtnAdd>
        </div>
      </Content>
    </>
  );
};

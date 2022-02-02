import React, { useCallback, useEffect, useState } from "react";
import Api from "@iso/api";
import { groupBy } from "@iso/utils/GroupBy";

import {
  CollapsePersonalizado,
  InputPersonalizado,
  InputMaskPersonalizado,
  Documento,
  FormDocumento,
  FormDivida,
  FormRenda,
} from "@iso/components";

import { Container, Content, BtnAdd } from "./styled-components";

import addAttachmentIcon from "@iso/assets/add-attachment.svg";

export default function Imovel({ uuid }) {
  const [imoveis, setImoveis] = useState([]);
  const [isVisibleAddDocument, setIsVisibleAddDocument] = useState(false);
  const [documentos, setDocumentos] = useState([]);

  const handleAddListDocumento = (documentosPatrimonio, patrimonio) => {
    setDocumentos([
      ...documentos,
      ...Object.entries(
        groupBy(
          documentosPatrimonio.filter((d) => d.patrimonio.id === patrimonio.id),
          "anexoTipo"
        )
      ),
    ]);
  };

  const api = new Api();

  const getImoveis = async () => {
    const documentos = [];

    const { patrimonios } = await api.buscarProcessoByUuid(
      "/processo/".concat(uuid + "/0/1")
    );

    patrimonios.map(({ patrimonio }) => {
      api
        .buscarProcesso(`/patrimonio-anexo?patrimonio=${patrimonio.id}`)
        .then(({ data: documentosPatrimonio }) =>
          handleAddListDocumento(documentosPatrimonio, patrimonio)
        );

      console.log({ documentos });
    });

    setImoveis(patrimonios);
  };

  const getImoveisCallback = useCallback(getImoveis, []);

  useEffect(() => {
    getImoveisCallback();
  }, [getImoveisCallback]);

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

  const handleSaveDocumentoPatrimonio = async (
    patrimonio,
    arquivo,
    tipoArquivo
  ) => {
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

      handleAddListDocumento([documento], patrimonio);

      return documento;
    } catch (error) {
      console.log({ error });
      return;
    }
  };

  const handleDeleteDocumentoPatrimonio = async (pessoaAnexoId) =>
    api.deletar(`patrimonio-anexo/${pessoaAnexoId}`);

  const handleGetTipoPatrimonioAnexo = () =>
    api.buscarTabelaDM("dm-patrimonio-anexo-tipo");

  const handleSaveTipoPatrimonioAnexo = (descricao) =>
    api.addItemDM("dm-patrimonio-anexo-tipo", { descricao });

  return (
    <Container>
      {imoveis.map(({ patrimonio }, index) => {
        return (
          <CollapsePersonalizado
            title={`IMOVÉL | ${patrimonio["endereco"]} ${patrimonio["numero"]}`}
            key={patrimonio.id}
            startOpen={index === 0 ? true : false}
          >
            <Content>
              <header>INFORMAÇÕES GERAIS</header>

              <InputPersonalizado
                texto={"Tipo do imóvel"}
                valorCampo={patrimonio.categoria}
                onSave={(value) =>
                  handleOnSaveImovel(patrimonio, "categoria", value)
                }
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
                onSave={(value) =>
                  handleOnSaveImovel(patrimonio, "numero", value)
                }
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
                onSave={(value) =>
                  handleOnSaveImovel(patrimonio, "estado", value)
                }
              />

              <InputPersonalizado
                texto={"Cidade"}
                valorCampo={patrimonio.cidade}
                onSave={(value) =>
                  handleOnSaveImovel(patrimonio, "cidade", value)
                }
              />

              <InputPersonalizado
                texto={"Bairro"}
                valorCampo={patrimonio.bairro}
                onSave={(value) =>
                  handleOnSaveImovel(patrimonio, "bairro", value)
                }
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
                    onClick={() =>
                      setIsVisibleAddDocument(!isVisibleAddDocument)
                    }
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
            </Content>
          </CollapsePersonalizado>
        );
      })}
    </Container>
  );
}

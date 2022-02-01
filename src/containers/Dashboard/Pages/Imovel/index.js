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

  const api = new Api();

  const getImoveis = async () => {
    const documentos = [];

    const { patrimonios } = await api.buscarProcessoByUuid(
      "/processo/".concat(uuid + "/0/1")
    );

    patrimonios.map(({patrimonio}) => {
      api
        .buscarProcesso(`/patrimonio-anexo?patrimonio=${patrimonio.id}`)
        .then(({ data: documentosImoveis }) => {
          console.log({ patrimonio, documentosImoveis });
          setDocumentos([
            ...documentos,
            ...Object.entries(
              groupBy(
                documentosImoveis.filter(
                  (d) => d.patrimonio.id === patrimonio.id
                ),
                "anexoTipo"
              )
            ),
          ]);
        });

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
                  <Documento title={title} files={files} pessoaId={1} />
                </div>
              ))}
              <div>
                <FormDocumento
                  visible={isVisibleAddDocument}
                  setVisible={setIsVisibleAddDocument}
                  pessoaId={1}
                  setListDocuments={() => {}}
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

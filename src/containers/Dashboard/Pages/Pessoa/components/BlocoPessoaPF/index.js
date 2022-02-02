import React, { Fragment, useCallback, useEffect, useState } from "react";
import Api from "@iso/api";
import { groupBy } from "@iso/utils/GroupBy";

import {
  DropDownDM,
  InputPersonalizado,
  InputMaskPersonalizado,
  Documento,
  FormDocumento,
  FormDivida,
  FormRenda,
} from "@iso/components";

import { Content, BtnAddNewDocument } from "./styled-components";

import { ReactComponent as IconPhone } from "@iso/assets/icon-phone-14x14.svg";
import { ReactComponent as IconEmail } from "@iso/assets/icon-email-14x14.svg";
import addAttachmentIcon from "@iso/assets/add-attachment.svg";

export const BlocoPessoaPF = ({
  processo = {},
  envolvido = {},
  handleChangePessoa = () => {},
  documentosProcesso = [],
  handleAddListDocument = (document) => {},
}) => {
  const api = new Api();

  const { pessoa } = envolvido;

  const [isVisibleAddDocument, setIsVisibleAddDocument] = useState(false);
  const [dividasPessoa, setDividasPessoa] = useState(envolvido.pessoa.dividas);
  const [rendasPessoa, setRendasPessoa] = useState(envolvido.pessoa.rendas);
  const [documentosPessoa, setDocumentosPessoa] = useState([]);
  const [cidades, setCidades] = useState([]);

  const getDocumentoCallback = useCallback(
    () =>
      setDocumentosPessoa(
        Object.entries(
          groupBy(
            documentosProcesso.filter((d) => d.pessoa.id === pessoa.id),
            "anexoTipo"
          )
        )
      ),
    [documentosProcesso, pessoa.id]
  );

  useEffect(() => {
    getDocumentoCallback();
  }, [getDocumentoCallback]);

  const assignData = (object, key, data) => {
    if (object[key].length === 0) object[key] = [data];
  };

  assignData(pessoa, "enderecos", {
    logradouro: null,
    numero: null,
    complemento: null,
    bairro: null,
    cep: null,
    tipo: null,
  });

  assignData(pessoa, "telefones", {
    ddd: null,
    numero: null,
  });

  const handleOnSavePessoa = (key, newValue) => {
    if (!newValue) return;

    const pessoaAlterada = { ...pessoa, [key]: newValue };

    api
      .alterarProcesso(`/pessoa/${pessoa.id}`, pessoaAlterada)
      .then(() => handleChangePessoa(pessoaAlterada));
  };

  const utilSaveApi = (endpoint, object, data) => {
    api
      .salvar(endpoint, { ...data, pessoa: { id: pessoa.id } })
      .then(({ data }) => (object.id = data.id));
  };

  const handleOnSaveTelefone = (telefone, newValue) => {
    const numeroCompleto = newValue.replace(/[^0-9]/g, "");
    const [ddd, numero] = [numeroCompleto.slice(0, 2), numeroCompleto.slice(2)];
    const data = { ddd, numero };

    !telefone.id
      ? utilSaveApi("/telefone", telefone, { ...data })
      : api.alterarProcesso(`telefone/${telefone.id}`, { ...data });
  };

  const handleOnSaveEndereco = (endereco, key, newValue) => {
    !endereco.id
      ? utilSaveApi("/endereco", endereco, {
          ...endereco,
          [key]: newValue,
        })
      : api.alterarProcesso(`endereco/${endereco.id}`, {
          [key]: newValue,
        });
  };

  const handleCriarDivida = () => {
    api
      .salvar("/pessoa-divida", {
        dividaTipo: null,
        valor: null,
        status: null,
        quitar: true,
        pessoa: {
          id: pessoa.id,
        },
      })
      .then(({ data: novaDivida }) =>
        setDividasPessoa([...dividasPessoa, novaDivida])
      );
  };

  const handleCriarRenda = () => {
    api
      .salvar("/renda", {
        rendaTipo: "...",
        rendaInformada: null,
        rendaAferida: null,
        pessoa: {
          id: pessoa.id,
        },
      })
      .then(({ data: novaRenda }) =>
        setRendasPessoa([...rendasPessoa, novaRenda])
      );
  };

  const handleDeletarDivida = (id) => {
    setDividasPessoa(dividasPessoa.filter((divida) => divida.id !== id));
  };

  const handleAlterarDivida = (dividaAlterada) => {
    setDividasPessoa(
      dividasPessoa.map((divida) =>
        divida.id === dividaAlterada.id ? dividaAlterada : divida
      )
    );
  };

  const handleDeletarRenda = (id) => {
    setRendasPessoa(rendasPessoa.filter((divida) => divida.id !== id));
  };

  const handleAlterarRenda = (rendaAlterada) => {
    setRendasPessoa(
      rendasPessoa.map((renda) =>
        renda.id === rendaAlterada.id ? rendaAlterada : renda
      )
    );
  };

  const handleGetCidadesByStateCallback = async (estadoNome) => {
    const { data } = await api.buscarTabelaDM(
      `dm-cidade?estado[descricao]=${estadoNome}`
    );
    setCidades(data);
  };

  const handleSaveDocumentoPessoa = async (arquivo, tipoArquivo) => {
    try {
      const data = new FormData();

      console.log({ arquivo });

      data.append("file", arquivo);
      data.append("nome", arquivo.name);
      data.append("anexoTipo", tipoArquivo);
      data.append("urlOrigem", "");
      data.append("pessoaId", pessoa.id);

      const { data: anexo } = await api.salvar("pessoa-anexo", data);

      return anexo;
    } catch (error) {
      console.log({ error });
      return;
    }
  };

  const handleDeleteDocumentoPessoa = async (pessoaAnexoId) =>
    api.deletar(`pessoa-anexo/${pessoaAnexoId}`);

  return (
    <>
      <Content>
        <header>INFORMAÇÕES DA PESSOA</header>
        <InputPersonalizado
          texto={"Nome:"}
          valorCampo={pessoa.nome}
          onSave={(value) => handleOnSavePessoa("nome", value)}
        />

        <DropDownDM
          title={"Papel na operação"}
          initialValue={envolvido.tipo}
          handleSaveItem={(descricao) =>
            api.addItemDM("dm-processo-tipo", { descricao })
          }
          handleGetItem={() => api.buscarTabelaDM("dm-processo-tipo")}
          handleSaveProcessInfo={async ({ descricao }) =>
            api.alterarProcesso(`/processo-envolvidos/${envolvido.id}`, {
              tipo: descricao,
              pessoa: {
                id: pessoa.id,
              },
              processo: {
                id: processo.id,
              },
            })
          }
        />

        <InputPersonalizado
          texto={"E-mail:"}
          valorCampo={pessoa.email}
          iconeLabel={<IconEmail />}
          onSave={(value) => handleOnSavePessoa("email", value)}
        />

        {pessoa.telefones.map((telefone, index) => (
          <InputMaskPersonalizado
            texto={"Telefone"}
            valorCampo={`${telefone.ddd} + ${telefone.numero}`}
            iconeLabel={<IconPhone />}
            onSave={(value) => handleOnSaveTelefone(telefone, value)}
            mask={"(99) 99999-9999"}
            key={`telefonePF_${index}`}
          />
        ))}

        <InputMaskPersonalizado
          texto={"Data de Nascimento"}
          valorCampo={
            pessoa.dataNascimento
              ? pessoa.dataNascimento.slice(0, 10).split("-").reverse().join("")
              : ""
          }
          onSave={(value) => {
            const data = value.split("/").reverse().join("-");
            handleOnSavePessoa("dataNascimento", data);
          }}
          mask={"99/99/9999"}
        />

        <InputMaskPersonalizado
          texto={"CPF"}
          valorCampo={pessoa.cpf}
          onSave={(value) => {
            const data = value.replace(/[^0-9]/g, "");
            handleOnSavePessoa("cpf", data);
          }}
          mask={"999.999.999-99"}
        />

        <InputMaskPersonalizado
          texto={"RG"}
          valorCampo={pessoa.rg}
          onSave={(value) => {
            const data = value.replace(/[^0-9]/g, "");
            handleOnSavePessoa("rg", data);
          }}
          mask={"99999999-9"}
        />

        <InputPersonalizado
          texto={"Orgão Emissor:"}
          valorCampo={pessoa.orgaoEmissorRg}
          onSave={(value) =>
            handleOnSavePessoa("orgaoEmissorRg", value.toUpperCase())
          }
        />

        <InputPersonalizado
          texto={"Nacionalidade:"}
          valorCampo={pessoa.nacionalidade}
          onSave={(value) => handleOnSavePessoa("nacionalidade", value)}
        />

        <DropDownDM
          title={"Escolaridade:"}
          initialValue={pessoa.escolaridade}
          handleSaveItem={(descricao) =>
            api.addItemDM("dm-escolaridade", { descricao })
          }
          handleGetItem={() => api.buscarTabelaDM("dm-escolaridade")}
          handleSaveProcessInfo={async ({ descricao }) =>
            handleOnSavePessoa("escolaridade", descricao)
          }
        />

        <InputPersonalizado
          texto={"Nome da mãe:"}
          valorCampo={pessoa.nomeMae}
          onSave={(value) => handleOnSavePessoa("nomeMae", value)}
        />

        <InputPersonalizado
          texto={"Nome da pai:"}
          valorCampo={pessoa.nomePai}
          onSave={(value) => handleOnSavePessoa("nomePai", value)}
        />

        <InputPersonalizado
          texto={"Profissão:"}
          valorCampo={pessoa.profissao}
          onSave={(value) => handleOnSavePessoa("profissao", value)}
        />

        <DropDownDM
          title={"Estado Civil:"}
          initialValue={pessoa.estadoCivil}
          handleSaveItem={(descricao) =>
            api.addItemDM("dm-estado-civil", { descricao })
          }
          handleGetItem={() => api.buscarTabelaDM("dm-estado-civil")}
          handleSaveProcessInfo={async ({ descricao }) =>
            handleOnSavePessoa("estadoCivil", descricao)
          }
        />

        <DropDownDM
          title={"Regime de União:"}
          initialValue={pessoa.regimeComunhao}
          handleSaveItem={(descricao) =>
            api.addItemDM("dm-regime-uniao", { descricao })
          }
          handleGetItem={() => api.buscarTabelaDM("dm-regime-uniao")}
          handleSaveProcessInfo={async ({ descricao }) =>
            handleOnSavePessoa("regimeComunhao", descricao)
          }
        />

        {pessoa.enderecos.map((endereco, index) => {
          const helperText = !!endereco.tipo ? ` | ${endereco.tipo}` : "";
          return (
            <Fragment key={endereco.uuid || index}>
              <InputPersonalizado
                texto={`Logradouro${helperText}:`}
                valorCampo={endereco.logradouro}
                onSave={(value) =>
                  handleOnSaveEndereco(endereco, "logradouro", value)
                }
              />
              <InputPersonalizado
                texto={`Numero${helperText}:`}
                valorCampo={endereco.numero}
                onSave={(value) =>
                  handleOnSaveEndereco(endereco, "numero", value)
                }
              />

              <InputPersonalizado
                texto={`Complemento${helperText}:`}
                valorCampo={endereco.complemento}
                onSave={(value) =>
                  handleOnSaveEndereco(endereco, "complemento", value)
                }
              />

              <InputMaskPersonalizado
                texto={`CEP${helperText}:`}
                valorCampo={endereco.cep}
                onSave={(value) => handleOnSaveEndereco(endereco, "cep", value)}
                mask={"99999-999"}
              />

              <DropDownDM
                title={"Estado"}
                initialValue={endereco.estado}
                handleGetItem={() => api.buscarTabelaDM("dm-estado")}
                handleSaveProcessInfo={async ({ descricao }) => {
                  handleGetCidadesByStateCallback(descricao);
                  handleOnSaveEndereco(endereco, "estado", descricao);
                }}
              />

              <DropDownDM
                title={"Cidade"}
                initialValue={endereco.cidade}
                handleGetItem={() => {
                  if (cidades.length === 0)
                    handleGetCidadesByStateCallback(endereco.estado);

                  return Promise.resolve({ data: cidades });
                }}
                handleSaveProcessInfo={async ({ descricao }) =>
                  handleOnSaveEndereco(endereco, "cidade", descricao)
                }
              />

              <InputPersonalizado
                texto={`Bairro${helperText}:`}
                valorCampo={endereco.bairro}
                onSave={(value) =>
                  handleOnSaveEndereco(endereco, "bairro", value)
                }
              />
            </Fragment>
          );
        })}
      </Content>

      <Content>
        <header>DOCUMENTOS</header>
        {documentosPessoa.map(([title, files], index) => (
          <div className="documentoPessoa" key={`documento_${index}`}>
            <Documento
              title={title}
              files={files}
              handleSaveDocumento={handleSaveDocumentoPessoa}
              handleDeleteDocumento={handleDeleteDocumentoPessoa}
            />
          </div>
        ))}
        <div>
          <FormDocumento
            visible={isVisibleAddDocument}
            setVisible={setIsVisibleAddDocument}
            pessoaId={envolvido.pessoa.id}
            setListDocuments={handleAddListDocument}
          />
        </div>
        <div className="addFilePessoa">
          {!isVisibleAddDocument ? (
            <BtnAddNewDocument
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
            </BtnAddNewDocument>
          ) : (
            <div></div>
          )}
        </div>
      </Content>

      <Content>
        <header>RENDAS</header>
        {rendasPessoa.map((renda) => {
          return (
            <FormRenda
              renda={renda}
              pessoa={pessoa}
              handleDeletarRenda={handleDeletarRenda}
              handleAlterarRenda={handleAlterarRenda}
              key={renda.uuid}
            />
          );
        })}

        <div className="addFilePessoa">
          <BtnAddNewDocument onClick={handleCriarRenda}>
            <div className="buttonAddDocument">
              <img
                src={addAttachmentIcon}
                alt="Imagem do botão de adicionar novo item"
                style={{ cursor: "pointer" }}
              />
              <span>ADICIONAR</span>
            </div>
          </BtnAddNewDocument>
        </div>
      </Content>

      <Content>
        <header>DIVIDAS</header>
        {dividasPessoa.map((divida) => {
          return (
            <FormDivida
              divida={divida}
              pessoa={pessoa}
              handleDeletarDivida={handleDeletarDivida}
              handleAlterarDivida={handleAlterarDivida}
              key={divida.uuid}
            />
          );
        })}

        <div className="addFilePessoa">
          <BtnAddNewDocument onClick={handleCriarDivida}>
            <div className="buttonAddDocument">
              <img
                src={addAttachmentIcon}
                alt="Imagem do botão de adicionar novo item"
                style={{ cursor: "pointer" }}
              />
              <span>ADICIONAR</span>
            </div>
          </BtnAddNewDocument>
        </div>
      </Content>
    </>
  );
};

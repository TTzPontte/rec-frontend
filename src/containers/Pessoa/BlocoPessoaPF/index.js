import React from "react";

import { ReactComponent as IconPhone } from "@iso/assets/icon-phone-14x14.svg";
import { ReactComponent as IconEmail } from "@iso/assets/icon-email-14x14.svg";

import {
  DropDownDM,
  InputPersonalizado,
  InputMaskPersonalizado,
  InputMonetarioPersonalizado,
  Documento,
  AddDocumento,
} from "@iso/components";

import Api from "@iso/api";
import { Content } from "./styles";
import { useState } from "react";
import { groupBy } from "@iso/utils/GroupBy";

export const BlocoPessoaPF = ({
  processo = {},
  envolvido = {},
  handleChangePessoa = () => {},
  documentosProcesso = [],
  handleAddListDocument = (document) => {},
}) => {
  const [isVisibleAddDocument, setIsVisibleAddDocument] = useState(false);

  const api = new Api();

  const { pessoa } = envolvido;

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

  const handleOnSaveTelefone = (telefone, newValue) => {
    const numeroCompleto = newValue.replace(/[^0-9]/g, "");
    const ddd = numeroCompleto.slice(0, 2);
    const numero = numeroCompleto.slice(2);

    if (!telefone.id) {
      api
        .salvar("/telefone", {
          ddd,
          numero,
          pessoa: { id: pessoa.id },
        })
        .then(({ data }) => (telefone.id = data.id));
      return;
    }

    api.alterarProcesso(`telefone/${telefone.id}`, {
      ddd,
      numero,
    });
  };

  const handleOnSaveEndereco = (endereco, key, newValue) => {
    if (!endereco.id) {
      api.salvar("/endereco", {
        ...endereco,
        [key]: newValue,
        pessoa: {
          id: pessoa.id,
        },
      });
      return;
    }
    api.alterarProcesso(`endereco/${endereco.id}`, {
      [key]: newValue,
    });
  };

  const handleGetDocumentsByPersonID = (pessoaId) =>
    Object.entries(
      groupBy(
        documentosProcesso.filter((d) => d.pessoa.id === pessoaId),
        "anexoTipo"
      )
    );

  return (
    <>
      <Content>
        <header>INFORMAÇÕES DA PESSOA</header>
        <InputPersonalizado
          texto={"Nome:"}
          valorCampo={pessoa.nome}
          onSave={(value) => handleOnSavePessoa("nome", value)}
          idCampo={"nome"}
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

        {pessoa.rendas?.length > 0 &&
          pessoa.rendas.map((renda) => (
            <InputMonetarioPersonalizado
              texto={`Renda aferida | ${renda.rendaTipo}:`}
              valorCampo={renda.rendaAferida}
              onSave={(value) =>
                api.alterarProcesso(`/renda/${renda.id}`, {
                  ...renda,
                  rendaAferida: Number(value.replace(/[^0-9]/g, "")),
                })
              }
              idCampo={"nome"}
            />
          ))}

        <InputPersonalizado
          texto={"E-mail:"}
          valorCampo={pessoa.email}
          iconeLabel={<IconEmail />}
          onSave={(value) => handleOnSavePessoa("email", value)}
          idCampo={"email"}
        />

        {pessoa.telefones.map((telefone) => (
          <InputMaskPersonalizado
            texto={"Telefone"}
            valorCampo={`${telefone.ddd} + ${telefone.numero}`}
            iconeLabel={<IconPhone />}
            onSave={(value) => handleOnSaveTelefone(telefone, value)}
            idCampo={"telefone"}
            mask={"(99) 99999-9999"}
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
          idCampo={"dataNascimento"}
          mask={"99/99/9999"}
        />

        <InputMaskPersonalizado
          texto={"CPF"}
          valorCampo={pessoa.cpf}
          onSave={(value) => {
            const data = value.replace(/[^0-9]/g, "");
            handleOnSavePessoa("cpf", data);
          }}
          idCampo={"CPF"}
          mask={"999.999.999-99"}
        />

        <InputMaskPersonalizado
          texto={"RG"}
          valorCampo={pessoa.rg}
          onSave={(value) => {
            const data = value.replace(/[^0-9]/g, "");
            handleOnSavePessoa("rg", data);
          }}
          idCampo={"RG"}
          mask={"99999999-9"}
        />

        <InputPersonalizado
          texto={"Orgão Emissor:"}
          valorCampo={pessoa.orgaoEmissorRg}
          onSave={(value) =>
            handleOnSavePessoa("orgaoEmissorRg", value.toUpperCase())
          }
          idCampo={"orgaoEmissorRg"}
        />

        <InputPersonalizado
          texto={"Nacionalidade:"}
          valorCampo={pessoa.nacionalidade}
          onSave={(value) => handleOnSavePessoa("nacionalidade", value)}
          idCampo={"nacionalidade"}
        />

        <InputPersonalizado
          texto={"Escolaridade:"}
          valorCampo={pessoa.escolaridade}
          onSave={(value) => handleOnSavePessoa("escolaridade", value)}
          idCampo={"escolaridade"}
        />

        <InputPersonalizado
          texto={"Nome da mãe:"}
          valorCampo={pessoa.nomeMae}
          onSave={(value) => handleOnSavePessoa("nomeMae", value)}
          idCampo={"nomeMae"}
        />

        <InputPersonalizado
          texto={"Profissão:"}
          valorCampo={pessoa.profissao}
          onSave={(value) => handleOnSavePessoa("profissao", value)}
          idCampo={"profissao"}
        />

        {pessoa.enderecos.map((endereco) => {
          const helperText = !!endereco.tipo ? ` | ${endereco.tipo}` : "";
          return (
            <>
              <InputPersonalizado
                texto={`Logradouro${helperText}:`}
                valorCampo={endereco.logradouro}
                onSave={(value) =>
                  handleOnSaveEndereco(endereco, "logradouro", value)
                }
                idCampo={"enderecoLogradouro"}
              />
              <InputPersonalizado
                texto={`Numero${helperText}:`}
                valorCampo={endereco.numero}
                onSave={(value) =>
                  handleOnSaveEndereco(endereco, "numero", value)
                }
                idCampo={"enderecoNumero"}
              />

              <InputPersonalizado
                texto={`Complemento${helperText}:`}
                valorCampo={endereco.complemento}
                onSave={(value) =>
                  handleOnSaveEndereco(endereco, "complemento", value)
                }
                idCampo={"enderecoComplemento"}
              />

              <InputMaskPersonalizado
                texto={`CEP${helperText}:`}
                valorCampo={endereco.cep}
                onSave={(value) => handleOnSaveEndereco(endereco, "cep", value)}
                idCampo={"enderecoCEP"}
                mask={"99999-999"}
              />

              <DropDownDM
                title={"Estado"}
                initialValue={endereco.estado}
                handleSaveItem={(descricao) =>
                  api.addItemDM("dm-estado", { descricao })
                }
                handleGetItem={() => api.buscarTabelaDM("dm-estado")}
                handleSaveProcessInfo={async ({ descricao }) =>
                  handleOnSaveEndereco(endereco, "estado", descricao)
                }
              />

              <InputPersonalizado
                texto={`Cidade${helperText}:`}
                valorCampo={endereco.estado}
                onSave={(value) =>
                  handleOnSaveEndereco(endereco, "cidade", value)
                }
                idCampo={"enderecoCidade"}
              />

              <InputPersonalizado
                texto={`Bairro${helperText}:`}
                valorCampo={endereco.bairro}
                onSave={(value) =>
                  handleOnSaveEndereco(endereco, "bairro", value)
                }
                idCampo={"enderecoBairro"}
              />
            </>
          );
        })}
      </Content>
      <Content>
        <header>DOCUMENTOS</header>
        {handleGetDocumentsByPersonID(envolvido.pessoa.id).map(
          ([title, files]) => (
            <div className="documentoPessoa">
              <Documento
                title={title}
                files={files}
                pessoaId={envolvido.pessoa.id}
              />
            </div>
          )
        )}
        <div>
          <AddDocumento
            visible={isVisibleAddDocument}
            setVisible={setIsVisibleAddDocument}
            pessoaId={envolvido.pessoa.id}
            setListDocuments={handleAddListDocument}
          />
        </div>
        <div className="addFilePessoa">
          <button
            onClick={() => setIsVisibleAddDocument(!isVisibleAddDocument)}
          >
            Adicionar
          </button>
        </div>
      </Content>

      <Content>
        <header>DIVIDAS</header>
      </Content>
    </>
  );
};

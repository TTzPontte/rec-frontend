import React, { useCallback, useEffect, useState } from "react";
import { Container, Content } from "./styles";
import { CollapsePersonalizado } from "../../components/CollapsePersonalizado";
import Api from "../../api";
import InputPersonalizado from "@iso/components/InputPersonalizado";
import InputMaskPersonalizado from "@iso/components/InputMaskPersonalizado";
import InputMonetarioPersonalizado from "@iso/components/InputMonetarioPersonalizado";
import { DropDownDM } from "@iso/components/DropDownDM";
import { Documento } from "@iso/components/Documento";
import { ReactComponent as IconTextNumber } from "../../assets/icon-text_number.svg";
import { ReactComponent as IconDropdown } from "../../assets/icon-dropdown.svg";
import { ReactComponent as IconPhone } from "../../assets/icon-phone-14x14.svg";
import { ReactComponent as IconEmail } from "../../assets/icon-email-14x14.svg";

export default function Pessoa({ uuid }) {
  const [processo, setProcesso] = useState([]);
  const [envolvidos, setEnvolvidos] = useState([]);
  const [documentosProcesso, setDocumentosProcesso] = useState([]);

  const api = new Api();

  const getEnvolvidos = async () => {
    const processo = await api.buscarProcessoByUuid(
      "/processo/".concat(uuid + "/0/1")
    );

    setProcesso(processo);

    const { envolvidos } = processo;

    const documentos = [];

    await Promise.all(
      envolvidos.map(async (e, index) => {
        if (!e.pessoa) return;
        const { data } = await api.buscarProcesso(`pessoa?id=${e.pessoa?.id}`);
        envolvidos[index].pessoa = data[0];

        const { data: documentosData } = await api.buscarProcesso(
          `pessoa-anexo?pessoa=${e.pessoa?.id}`
        );
        if (documentosData?.length > 0) {
          documentos.push(...documentosData);
        }
      })
    );

    setDocumentosProcesso(documentos);

    if (envolvidos.length > 0) setEnvolvidos(envolvidos);
  };

  const getEnvolvidosCallback = useCallback(getEnvolvidos, []);

  useEffect(() => {
    getEnvolvidosCallback();
  }, [getEnvolvidosCallback]);

  const handleOnSavePessoa = (newValue, pessoa, key, index) => {
    if (!newValue) return;

    const novaPessoa = { ...pessoa, [key]: newValue };

    api.alterarProcesso(`/pessoa/${pessoa.id}`, novaPessoa).then(() => {
      envolvidos[index] = {
        ...envolvidos[index],
        pessoa: novaPessoa,
      };
      setEnvolvidos(envolvidos);
    });
  };

  const utilGroupBy = (array, key) => {
    console.log("entrou", array, key);
    const result = array.reduce((a, c) => {
      const t = a[c[key]] || [];
      t.push(c);
      a[c[key]] = t;
      return a;
    }, {});
    console.log(result);
    return result;
  };

  return (
    <Container>
      {envolvidos.length > 0 &&
        envolvidos.map((envolvido, index) => {
          const { pessoa } = envolvido;

          return (
            pessoa && (
              <CollapsePersonalizado
                title={`PESSOA  |  ${pessoa["nomeSocial"] || pessoa["nome"]}`}
                key={envolvido.id}
              >
                <Content>
                  <header>INFORMAÇÕES DA PESSOA</header>
                  <InputPersonalizado
                    texto={"Nome:"}
                    valorCampo={pessoa.nome}
                    iconeLabel={<IconTextNumber />}
                    onSave={(value) =>
                      handleOnSavePessoa(value, pessoa, "nome", index)
                    }
                    idCampo={"nome"}
                  />

                  <DropDownDM
                    title={"Papel na operação"}
                    initialValue={envolvido.tipo}
                    iconLabel={<IconDropdown />}
                    handleSaveItem={(descricao) =>
                      api.addItemDM("dm-processo-tipo", { descricao })
                    }
                    handleGetItem={() => api.buscarTabelaDM("dm-processo-tipo")}
                    handleSaveProcessInfo={async ({ descricao }) =>
                      api.alterarProcesso(
                        `/processo-envolvidos/${envolvido.id}`,
                        {
                          tipo: descricao,
                          pessoa: {
                            id: pessoa.id,
                          },
                          processo: {
                            id: processo.id,
                          },
                        }
                      )
                    }
                  />

                  {pessoa.rendas.length > 0 &&
                    pessoa.rendas.map((renda) => (
                      <InputMonetarioPersonalizado
                        texto={`Renda aferida | ${renda.rendaTipo}:`}
                        valorCampo={renda.rendaAferida}
                        iconeLabel={<IconTextNumber />}
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
                    onSave={(value) =>
                      handleOnSavePessoa(value, pessoa, "email", index)
                    }
                    idCampo={"email"}
                  />

                  {pessoa.telefones.length > 0 &&
                    pessoa.telefones.map((telefone) => (
                      <InputMaskPersonalizado
                        texto={"Telefone"}
                        valorCampo={`${telefone.ddd} + ${telefone.numero}`}
                        iconeLabel={<IconPhone />}
                        onSave={(value) => {
                          const numeroCompleto = value.replace(/[^0-9]/g, "");
                          const ddd = numeroCompleto.slice(0, 2);
                          const numero = numeroCompleto.slice(2);
                          api.alterarProcesso(`telefone/${telefone.id}`, {
                            ddd,
                            numero,
                          });
                        }}
                        idCampo={"telefone"}
                        mask={"(99) 99999-9999"}
                      />
                    ))}

                  <InputMaskPersonalizado
                    texto={"Data de Nascimento"}
                    valorCampo={
                      pessoa.dataNascimento
                        ? pessoa.dataNascimento
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("")
                        : ""
                    }
                    iconeLabel={<IconPhone />}
                    onSave={(value) => {
                      const data = value.split("/").reverse().join("-");
                      handleOnSavePessoa(data, pessoa, "dataNascimento", index);
                    }}
                    idCampo={"dataNascimento"}
                    mask={"99/99/9999"}
                  />

                  <InputMaskPersonalizado
                    texto={"CPF"}
                    valorCampo={pessoa.cpf}
                    iconeLabel={<IconTextNumber />}
                    onSave={(value) => {
                      const data = value.replace(/[^0-9]/g, "");
                      handleOnSavePessoa(data, pessoa, "cpf", index);
                    }}
                    idCampo={"CPF"}
                    mask={"999.999.999-99"}
                  />

                  <InputMaskPersonalizado
                    texto={"RG"}
                    valorCampo={pessoa.rg}
                    iconeLabel={<IconPhone />}
                    onSave={(value) => {
                      const data = value.replace(/[^0-9]/g, "");
                      handleOnSavePessoa(data, pessoa, "rg", index);
                    }}
                    idCampo={"RG"}
                    mask={"99999999-9"}
                  />

                  <InputPersonalizado
                    texto={"Orgão Emissor:"}
                    valorCampo={pessoa.orgaoEmissorRg}
                    iconeLabel={<IconTextNumber />}
                    onSave={(value) =>
                      handleOnSavePessoa(
                        value.toUpperCase(),
                        pessoa,
                        "orgaoEmissorRg",
                        index
                      )
                    }
                    idCampo={"orgaoEmissorRg"}
                  />

                  <InputPersonalizado
                    texto={"Nacionalidade:"}
                    valorCampo={pessoa.nacionalidade}
                    iconeLabel={<IconTextNumber />}
                    onSave={(value) =>
                      handleOnSavePessoa(value, pessoa, "nacionalidade", index)
                    }
                    idCampo={"nacionalidade"}
                  />

                  <InputPersonalizado
                    texto={"Escolaridade:"}
                    valorCampo={pessoa.escolaridade}
                    iconeLabel={<IconTextNumber />}
                    onSave={(value) =>
                      handleOnSavePessoa(value, pessoa, "escolaridade", index)
                    }
                    idCampo={"escolaridade"}
                  />

                  <InputPersonalizado
                    texto={"Nome da mãe:"}
                    valorCampo={pessoa.nomeMae}
                    iconeLabel={<IconTextNumber />}
                    onSave={(value) =>
                      handleOnSavePessoa(value, pessoa, "nomeMae", index)
                    }
                    idCampo={"nomeMae"}
                  />

                  <InputPersonalizado
                    texto={"Profissão:"}
                    valorCampo={pessoa.profissao}
                    iconeLabel={<IconTextNumber />}
                    onSave={(value) =>
                      handleOnSavePessoa(value, pessoa, "profissao", index)
                    }
                    idCampo={"profissao"}
                  />

                  {pessoa.enderecos.length > 0 &&
                    pessoa.enderecos.map((endereco) => {
                      const helperText = !!endereco.tipo
                        ? ` | ${endereco.tipo}`
                        : "";
                      return (
                        <>
                          <InputPersonalizado
                            texto={`Logradouro${helperText}:`}
                            valorCampo={endereco.logradouro}
                            iconeLabel={<IconTextNumber />}
                            onSave={(value) =>
                              api.alterarProcesso(`endereco/${endereco.id}`, {
                                logradouro: value,
                              })
                            }
                            idCampo={"enderecoLogradouro"}
                          />
                          <InputPersonalizado
                            texto={`Numero${helperText}:`}
                            valorCampo={endereco.numero}
                            iconeLabel={<IconTextNumber />}
                            onSave={(value) =>
                              api.alterarProcesso(`endereco/${endereco.id}`, {
                                numero: value,
                              })
                            }
                            idCampo={"enderecoNumero"}
                          />

                          <InputPersonalizado
                            texto={`Complemento${helperText}:`}
                            valorCampo={endereco.complemento}
                            iconeLabel={<IconTextNumber />}
                            onSave={(value) =>
                              api.alterarProcesso(`endereco/${endereco.id}`, {
                                complemento: value,
                              })
                            }
                            idCampo={"enderecoComplemento"}
                          />

                          <InputMaskPersonalizado
                            texto={`CEP${helperText}:`}
                            valorCampo={endereco.cep}
                            iconeLabel={<IconTextNumber />}
                            onSave={(value) =>
                              api.alterarProcesso(`endereco/${endereco.id}`, {
                                cep: value,
                              })
                            }
                            idCampo={"enderecoCEP"}
                            mask={"99999-999"}
                          />

                          <DropDownDM
                            title={"Estado"}
                            initialValue={endereco.estado}
                            iconLabel={<IconDropdown />}
                            handleSaveItem={(descricao) =>
                              api.addItemDM("dm-estado", { descricao })
                            }
                            handleGetItem={() =>
                              api.buscarTabelaDM("dm-estado")
                            }
                            handleSaveProcessInfo={async ({ descricao }) =>
                              api.alterarProcesso(`endereco/${endereco.id}`, {
                                estado: descricao,
                              })
                            }
                          />

                          <InputPersonalizado
                            texto={`Cidade${helperText}:`}
                            valorCampo={endereco.estado}
                            iconeLabel={<IconTextNumber />}
                            onSave={(value) =>
                              api.alterarProcesso(`endereco/${endereco.id}`, {
                                cidade: value,
                              })
                            }
                            idCampo={"enderecoCidade"}
                          />

                          <InputPersonalizado
                            texto={`Bairro${helperText}:`}
                            valorCampo={endereco.estado}
                            iconeLabel={<IconTextNumber />}
                            onSave={(value) =>
                              api.alterarProcesso(`endereco/${endereco.id}`, {
                                bairro: value,
                              })
                            }
                            idCampo={"enderecoBairro"}
                          />
                        </>
                      );
                    })}
                </Content>

                <Content>
                  <header>DOCUMENTOS</header>
                  {documentosProcesso.length > 0 &&
                    Object.entries(
                      utilGroupBy(
                        documentosProcesso.filter(
                          (d) => d.pessoa.id === envolvido.pessoa.id
                        ),
                        "anexoTipo"
                      )
                    ).map(([title, files]) => (
                      <Documento
                        title={title}
                        files={files}
                      />
                    ))}
                    <div className="addFilePessoa">
                    <button>Adicionar</button>
                    </div>
                </Content>

                <Content>
                  <header>DIVIDAS</header>
                </Content>
              </CollapsePersonalizado>
            )
          );
        })}
    </Container>
  );
}

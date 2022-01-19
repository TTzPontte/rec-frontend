import React, { useCallback, useEffect, useState } from "react";
import Api from "../../api";
import { CollapsePersonalizado } from "../../components/CollapsePersonalizado";
import InputPersonalizado from "@iso/components/InputPersonalizado";
import InputMaskPersonalizado from "@iso/components/InputMaskPersonalizado";
import InputMonetarioPersonalizado from "@iso/components/InputMonetarioPersonalizado";
import { DropDownDM } from "@iso/components/DropDownDM";
import { Documento } from "@iso/components/Documento";
import { AddDocumento } from "@iso/components/AddDocumento";
import { groupBy } from "@iso/utils/GroupBy";
import {
    DivContentModalPF,
    DivContentModalPJ,
    DivModalInputCPF,
    DivModalInputNome,
    DivModalNovaPessoa,
    DivModalSelectTipoEnvolvimento,
  DivModalTexto,
  DivModalTextoCPF,
  DivModalTextoNome,
  DivModalTextoTipoEnvolvimento,
  DivModalTitulo,
  DivNovaPessoa,
  DivSpanNovaPessoa,
  SpanNovaPessoa,
} from "./styled-components";
import './style.css';
import { Container, Content } from "./styles";
import { Button, Input, Modal, Select } from "antd";
import { ReactComponent as IconPhone } from "../../assets/icon-phone-14x14.svg";
import { ReactComponent as IconTextNumber } from "../../assets/icon-text_number.svg";
import { ReactComponent as IconEmail } from "../../assets/icon-email-14x14.svg";
import { ReactComponent as IconNovaPessoa } from "../../assets/button-add.svg";
import { ReactComponent as IconInputNomeRazaoSocial } from "../../assets/Icon-type-14x14.svg";
import { ReactComponent as IconInputCpfCnpj } from "../../assets/Icon-doc-14x14.svg";
const { Option } = Select;

export default function Pessoa({ uuid }) {
  const [processo, setProcesso] = useState([]);
  const [envolvidos, setEnvolvidos] = useState([]);
  const [documentosProcesso, setDocumentosProcesso] = useState([]);
  const [isVisibleAddDocument, setIsVisibleAddDocument] = useState(false);

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

  const handleSetEnvolvidos = (envolvido) => {
    console.log(envolvidos, [...envolvidos, envolvido]);
    setEnvolvidos([...envolvidos, envolvido]);
  };

  const handleGetDocumentsByPersonID = (id) =>
    Object.entries(
      groupBy(
        documentosProcesso.filter((d) => d.pessoa.id === id),
        "anexoTipo"
      )
    );

  const handleAddListDocument = (item) => {
    setDocumentosProcesso([...documentosProcesso, item]);
  };

  // Modal PF e PJ
  const [isModalNovaPessoaVisible, setIsModalNovaPessoaVisible] = useState(false);
  const novaPessoaHandle = (e) => {
    showModal();
  };
  const showModal = () => {
    setIsModalNovaPessoaVisible(true);
  };

  const handleOk = () => {
    setIsModalNovaPessoaVisible(false);
  };

  const handleCancel = () => {
    setIsModalNovaPessoaVisible(false);
  };
  //

  // Modal PF
  const [isModalNovaPessoaPFVisible, setIsModalNovaPessoaPFVisible] = useState(false);
  const [valuesPF, setValuesPF] = React.useState({ processo: uuid, pessoaTipo: "PF", });
  const [errosPF, setErrosPF] = React.useState(null);
  const [buttonConcluirPFState, setButtonConcluirPFState] = React.useState(true);

  const enableButtonConcluirPF = () => {
    if (
      typeof valuesPF.nome !== "undefined" &&
      valuesPF.nome !== "" &&
      typeof valuesPF.cpf !== "undefined" &&
      valuesPF.cpf !== "" &&
      typeof valuesPF.envolvimento !== "undefined" &&
      valuesPF.envolvimento !== ""
    ) {
      setButtonConcluirPFState(false);
    }
  };

  const startNovaPF = () => {
    setValuesPF({ processo: uuid, pessoaTipo: "PF" });
  };

  const showModalPF = () => {
    startNovaPF();
    setIsModalNovaPessoaPFVisible(true);
  };

  const handlePFOk = () => {
    setIsModalNovaPessoaPFVisible(false);
  };

  const handlePFCancel = () => {
    startNovaPF();
    setIsModalNovaPessoaPFVisible(false);
  };

  const handleNovaPessoaPF = () => {
    handleCancel();
    showModalPF();
  };

  const handleInputPF = (e) => {
    const auxValuesPF = { ...valuesPF };
    auxValuesPF[e.target.id] = e.target.value;
    setValuesPF(auxValuesPF);
    enableButtonConcluirPF();
  };

  const handleSelectPFEnvolvimento = (value) => {
    const auxValuesPF = { ...valuesPF };
    auxValuesPF["envolvimento"] = value;
    setValuesPF(auxValuesPF);
    enableButtonConcluirPF();
  };

  const handlePFConcluir = async () => {
    let response = await api.salvarPessoaNoProcesso(valuesPF);
    if (typeof response !== 'object' && typeof response === 'string') {
        setErrosPF(response);
    } else {
        getEnvolvidos();
        handlePFCancel();
    }
  };
  //

  // Modal PJ
  const [isModalNovaPessoaPJVisible, setIsModalNovaPessoaPJVisible] = useState(false);
  const [valuesPJ, setValuesPJ] = useState({processo: uuid, pessoaTipo: "PJ",});
  const [errosPJ, setErrosPJ] = React.useState(null);
  const [buttonConcluirPJState, setButtonConcluirPJState] = useState(true);

  const enableButtonConcluirPJ = () => {
    if (
      typeof valuesPJ.razaoSocial !== "undefined" &&
      valuesPJ.razaoSocial !== "" &&
      typeof valuesPJ.cnpj !== "undefined" &&
      valuesPJ.cnpj !== "" &&
      typeof valuesPJ.envolvimento !== "undefined" &&
      valuesPJ.envolvimento !== ""
    ) {
      setButtonConcluirPJState(false);
    }
  };

  const startNovaPJ = () => {
    setValuesPJ({ processo: uuid, pessoaTipo: "PJ" });
  };

  const showModalPJ = () => {
    startNovaPJ();
    setIsModalNovaPessoaPJVisible(true);
  };

  const handlePJOk = () => {
    setIsModalNovaPessoaPJVisible(false);
  };

  const handlePJCancel = () => {
    startNovaPJ();
    setIsModalNovaPessoaPJVisible(false);
  };

  const handleNovaPessoaPJ = () => {
    handleCancel();
    showModalPJ();
  };

  const handleInputPJ = (e) => {
    const auxValuesPJ = { ...valuesPJ };
    auxValuesPJ[e.target.id] = e.target.value;
    setValuesPJ(auxValuesPJ);
    enableButtonConcluirPJ();
  };

  const handleSelectPJEnvolvimento = (value) => {
    const auxValuesPJ = { ...valuesPJ };
    auxValuesPJ["envolvimento"] = value;
    setValuesPJ(auxValuesPJ);
    enableButtonConcluirPJ();
  };

  const handlePJConcluir = async () => {
    let response = await api.salvarPessoaNoProcesso(valuesPJ);
    if (typeof response !== 'object' && typeof response === 'string') {
        setErrosPJ(response);
    } else {
        getEnvolvidos();
        handlePJCancel();
    }
  };
  // end Modals

  return (
    <Container>
      {envolvidos?.length > 0 &&
        envolvidos.map((envolvido, index) => {
          const { pessoa } = envolvido;

          return (
            pessoa && (
              <CollapsePersonalizado
                title={`PESSOA  |  ${pessoa["nomeSocial"] || pessoa["nome"]}`}
                key={envolvido.id}
                startOpen={false}
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

                  {pessoa.rendas?.length > 0 &&
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

                  {pessoa.telefones?.length > 0 &&
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

                  {pessoa.enderecos?.length > 0 &&
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
                      onClick={() =>
                        setIsVisibleAddDocument(!isVisibleAddDocument)
                      }
                    >
                      Adicionar
                    </button>
                  </div>
                </Content>

                <Content>
                  <header>DIVIDAS</header>
                </Content>
              </CollapsePersonalizado>
            )
          );
        })}
      <DivNovaPessoa>
        <IconNovaPessoa
          onClick={novaPessoaHandle}
          style={{ cursor: "pointer" }}
        />
        <Modal
          style={{ top: 90, left: "35%", borderRadius: 5 }}
          width={260}
          height={222}
          visible={isModalNovaPessoaVisible}
          closable
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          closable={false}
        >
          <DivModalNovaPessoa>
            <DivSpanNovaPessoa>
              <SpanNovaPessoa>
                Que tipo de pessoa você gostaria de adicionar?
              </SpanNovaPessoa>
            </DivSpanNovaPessoa>
            <div>
              <Button
                onClick={handleNovaPessoaPF}
                type="text"
                style={{
                  width: "210px",
                  height: "35px",
                  marginTop: "30px",
                  borderStyle: "solid",
                  borderColor: "gray",
                }}
              >
                Pessoa física
              </Button>
            </div>
            <div>
              <Button
                onClick={handleNovaPessoaPJ}
                type="text"
                style={{
                  width: "210px",
                  height: "35px",
                  marginTop: "10px",
                  borderStyle: "solid",
                  borderColor: "gray",
                }}
              >
                Pessoa jurídica
              </Button>
            </div>
          </DivModalNovaPessoa>
        </Modal>
      </DivNovaPessoa>
      <Modal
        style={{ borderRadius: 10 }}
        width={648}
        height={480}
        visible={isModalNovaPessoaPFVisible}
        closable
        onOk={handlePFOk}
        onCancel={handlePFCancel}
        footer={null}
        closable={false}
      >
        <DivContentModalPF>
          <DivModalTitulo>
            <span>Adiciona nova PF</span>
          </DivModalTitulo>
          <DivModalTexto>
            <span>
              Antes de adicionarmos uma nova pessoa à operação, precisamos que
              você nos informe os dados abaixo! ;)
            </span>
          </DivModalTexto>          
          <DivModalTextoTipoEnvolvimento>
            Tipo de envolvimento
          </DivModalTextoTipoEnvolvimento>
          <DivModalSelectTipoEnvolvimento>
            <Select
              onChange={handleSelectPFEnvolvimento}
              onBlur={enableButtonConcluirPF}
              placeholder="Selecione..."
              style={{ width: 544 }}
            >
              <Option value="Composição de renda">Composição de renda</Option>
              <Option value="Tomador">Tomador</Option>
            </Select>
          </DivModalSelectTipoEnvolvimento>
          <IconInputNomeRazaoSocial className="modalNovaPessoa_IconInputNomeRazaoSocial" />
          <DivModalTextoNome>Nome</DivModalTextoNome>
          <DivModalInputNome>
            <Input
              id="nome"
              onChange={handleInputPF}
              onBlur={enableButtonConcluirPF}
              placeholder="Nome..."
              style={{ width: 544, height: 40 }}
            />
          </DivModalInputNome>
          <IconInputCpfCnpj className="modalNovaPessoa_IconInputCpfCnpj" />
          <DivModalTextoCPF>CPF</DivModalTextoCPF>
          <DivModalInputCPF>
            <Input
              id="cpf"
              onChange={handleInputPF}
              onBlur={enableButtonConcluirPF}
              placeholder="CPF..."
              style={{ width: 544, height: 40 }}
            />
          </DivModalInputCPF>
          <div style={{marginLeft: '28px', marginTop: '10px'}}><span style={{color: 'red'}}>{errosPF}</span></div>
          <div style={{ marginTop: "10px" }}>
            <Button
              onClick={handlePFCancel}
              type="text"
              className="modalNovaPessoa_botaoCancelar"
            >
              CANCELAR
            </Button>
            <Button
              onClick={handlePFConcluir}
              disabled={buttonConcluirPFState}
              type="text"
              className="modalNovaPessoa_botaoConcluir"
            >
              CONCLUIR
            </Button>
          </div>
        </DivContentModalPF>
      </Modal>
      <Modal
        style={{ borderRadius: 5 }}
        width={648}
        height={480}
        visible={isModalNovaPessoaPJVisible}
        closable
        onOk={handlePJOk}
        onCancel={handlePJCancel}
        footer={null}
        closable={false}
      >
        <DivContentModalPJ>
          <DivModalTitulo>
            <span>Adiciona nova PJ</span>
          </DivModalTitulo>
          <DivModalTexto>
            <span>
              Antes de adicionarmos uma nova pessoa à operação, precisamos que
              você nos informe os dados abaixo! ;)
            </span>
          </DivModalTexto>
          <DivModalTextoTipoEnvolvimento>
            Tipo de envolvimento
          </DivModalTextoTipoEnvolvimento>
          <DivModalSelectTipoEnvolvimento>
            <Select
              onChange={handleSelectPJEnvolvimento}
              onBlur={enableButtonConcluirPJ}
              placeholder="Selecione..."
              style={{ width: 544 }}
            >
              <Option value="Composição de renda">Composição de renda</Option>
              <Option value="Tomador">Tomador</Option>
            </Select>
          </DivModalSelectTipoEnvolvimento>
          <IconInputNomeRazaoSocial className="modalNovaPessoa_IconInputNomeRazaoSocial" />
          <DivModalTextoNome>Razão Social</DivModalTextoNome>
          <DivModalInputNome>
            <Input
              id="razaoSocial"
              onChange={handleInputPJ}
              onBlur={enableButtonConcluirPJ}
              placeholder="Razão Social..."
              style={{ width: 544, height: 40 }}
            />
          </DivModalInputNome>
          <IconInputCpfCnpj className="modalNovaPessoa_IconInputCpfCnpj" />
          <DivModalTextoCPF>CNPJ</DivModalTextoCPF>
          <DivModalInputCPF>
            <Input
              id="cnpj"
              onChange={handleInputPJ}
              onBlur={enableButtonConcluirPJ}
              placeholder="CNPJ..."
              style={{ width: 544, height: 40 }}
            />
          </DivModalInputCPF>
          <div style={{marginLeft: '28px', marginTop: '10px'}}><span style={{color: 'red'}}>{errosPJ}</span></div>
          <div style={{ marginTop: "10px" }}>
            <Button
              onClick={handlePJCancel}
              type="text"
              className="modalNovaPessoa_botaoCancelar"
            >
              CANCELAR
            </Button>
            <Button
              onClick={handlePJConcluir}
              disabled={buttonConcluirPJState}
              type="text"
              className="modalNovaPessoa_botaoConcluir"
            >
              CONCLUIR
            </Button>
          </div>
        </DivContentModalPJ>
      </Modal>
    </Container>
  );
}

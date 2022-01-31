import React, { useCallback, useEffect, useState } from "react";

import { CollapsePersonalizado } from "@iso/components";
import { BlocoPessoaPF, BlocoPessoaPJ } from "./components";
import { Button, Input, Modal, Select } from "antd";

import {
  Container,
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
import "./style.css";

import { ReactComponent as IconNovaPessoa } from "@iso/assets/button-add.svg";
import { ReactComponent as IconInputNomeRazaoSocial } from "@iso/assets/Icon-type-14x14.svg";
import { ReactComponent as IconInputCpfCnpj } from "@iso/assets/Icon-doc-14x14.svg";

import Api from "@iso/api";

const { Option } = Select;

export default function Pessoa({ uuid }) {
  const [processo, setProcesso] = useState([]);
  const [envolvidos, setEnvolvidos] = useState([]);
  const [documentosProcesso, setDocumentosProcesso] = useState([]);
  const [processoEnvolvidosTipo, setProcessoEnvolvidosTipo] = useState([]);

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

  const getProcessoEnvolvidosTipo = async () => {
    await api.busca("/dm-processo-envolvidos-tipo", setProcessoEnvolvidosTipo);
  };

  const getEnvolvidosCallback = useCallback(getEnvolvidos, []);
  const getProcessoEnvolvidosTipoCallback = useCallback(
    getProcessoEnvolvidosTipo,
    []
  );

  useEffect(() => {
    getEnvolvidosCallback();
    getProcessoEnvolvidosTipoCallback();
  }, [getEnvolvidosCallback, getProcessoEnvolvidosTipoCallback]);

  const handleChangePessoa = (pessoa) => {
    setEnvolvidos(
      envolvidos.map((e) => {
        console.log(e, pessoa);
        if (e.pessoa?.id === pessoa.id) {
          e.pessoa = pessoa;
        }
        return e;
      })
    );
  };

  // const handleAddEnvolvidos = (envolvido) => setEnvolvidos([...envolvidos, envolvido]);

  const handleAddListDocument = (item) => {
    setDocumentosProcesso([...documentosProcesso, item]);
  };

  // Modal PF e PJ
  const [isModalNovaPessoaVisible, setIsModalNovaPessoaVisible] =
    useState(false);
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
  const [isModalNovaPessoaPFVisible, setIsModalNovaPessoaPFVisible] =
    useState(false);
  const [valuesPF, setValuesPF] = React.useState({
    processo: uuid,
    pessoaTipo: "PF",
  });
  const [errosPF, setErrosPF] = React.useState(null);
  const [buttonConcluirPFState, setButtonConcluirPFState] =
    React.useState(true);

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
    if (typeof response !== "object" && typeof response === "string") {
      setErrosPF(response);
    } else {
      getEnvolvidos();
      handlePFCancel();
    }
  };
  //

  // Modal PJ
  const [isModalNovaPessoaPJVisible, setIsModalNovaPessoaPJVisible] =
    useState(false);
  const [valuesPJ, setValuesPJ] = useState({
    processo: uuid,
    pessoaTipo: "PJ",
  });
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
    if (typeof response !== "object" && typeof response === "string") {
      setErrosPJ(response);
    } else {
      getEnvolvidos();
      handlePJCancel();
    }
  };
  // end Modals

  return (
    <Container>
      {envolvidos.map((envolvido, index) => {
        const { pessoa } = envolvido;

        return (
          pessoa && (
            <CollapsePersonalizado
              title={`PESSOA  |  ${pessoa["razaoSocial"] || pessoa["nome"]}`}
              key={envolvido.id}
              startOpen={index === 0 ? true : false}
            >
              {!!pessoa.cnpj ? (
                <BlocoPessoaPJ
                  processo={processo}
                  envolvido={envolvido}
                  handleChangePessoa={handleChangePessoa}
                  documentosProcesso={documentosProcesso}
                  handleAddListDocument={handleAddListDocument}
                />
              ) : (
                <BlocoPessoaPF
                  processo={processo}
                  envolvido={envolvido}
                  handleChangePessoa={handleChangePessoa}
                  documentosProcesso={documentosProcesso}
                  handleAddListDocument={handleAddListDocument}
                />
              )}
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
                  borderColor: "#d3d3d3",
                  fontSize: "15px",
                  color: "#5C3B6B",
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
                  borderColor: "#d3d3d3",
                  fontSize: "15px",
                  color: "#5C3B6B",
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
              {processoEnvolvidosTipo?.length > 0 &&
                processoEnvolvidosTipo.map((envolvidoTipo) => {
                  return (
                    <Option
                      key={envolvidoTipo.descricao}
                      value={envolvidoTipo.descricao}
                    >
                      {envolvidoTipo.descricao}
                    </Option>
                  );
                })}
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
          <div style={{ marginLeft: "28px", marginTop: "10px" }}>
            <span style={{ color: "red" }}>{errosPF}</span>
          </div>
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
              {processoEnvolvidosTipo?.length > 0 &&
                processoEnvolvidosTipo.map((envolvidoTipo) => {
                  return (
                    <Option
                      key={envolvidoTipo.descricao}
                      value={envolvidoTipo.descricao}
                    >
                      {envolvidoTipo.descricao}
                    </Option>
                  );
                })}
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
          <div style={{ marginLeft: "28px", marginTop: "10px" }}>
            <span style={{ color: "red" }}>{errosPJ}</span>
          </div>
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

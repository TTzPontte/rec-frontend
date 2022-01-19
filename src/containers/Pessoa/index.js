import React, { useCallback, useEffect, useState } from "react";

import { CollapsePersonalizado } from "@iso/components";

import { BlocoPessoaPF } from "./BlocoPessoaPF";

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

import { Button, Input, Modal, Select } from "antd";
import Api from "@iso/api";
import { groupBy } from "@iso/utils/GroupBy";
import "./style.css";

import { ReactComponent as IconNovaPessoa } from "@iso/assets/button-add.svg";

const { Option } = Select;

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

  const handleAddEnvolvidos = (envolvido) =>
    setEnvolvidos([...envolvidos, envolvido]);

  const handleAddListDocument = (item) => {
    setDocumentosProcesso([...documentosProcesso, item]);
  };

  // Modal PF e PJ
  const [isModalNovaPessoaVisible, setIsModalNovaPessoaVisible] =
    useState(false);
  const novaPessoaHandle = (e) => {
    console.log("Nova Pessoa");
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
    console.log("PF");
    handleCancel();
    showModalPF();
  };

  const handleInputPF = (e) => {
    const auxValuesPF = { ...valuesPF };
    auxValuesPF[e.target.id] = e.target.value;
    setValuesPF(auxValuesPF);
    console.log(valuesPF);
    enableButtonConcluirPF();
  };

  const handleSelectPFEnvolvimento = (value) => {
    const auxValuesPF = { ...valuesPF };
    auxValuesPF["envolvimento"] = value;
    setValuesPF(auxValuesPF);
    console.log(valuesPF);
    enableButtonConcluirPF();
  };

  const handlePFConcluir = async () => {
    console.log("Grava PF: ");
    console.log(valuesPF);
    let response = await api.salvarPessoaNoProcesso(valuesPF);
    getEnvolvidos();
    handlePFCancel();
  };
  //

  // Modal PJ
  const [isModalNovaPessoaPJVisible, setIsModalNovaPessoaPJVisible] =
    useState(false);
  const [valuesPJ, setValuesPJ] = useState({
    processo: uuid,
    pessoaTipo: "PJ",
  });
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
    console.log("PJ");
    handleCancel();
    showModalPJ();
  };

  const handleInputPJ = (e) => {
    const auxValuesPJ = { ...valuesPJ };
    auxValuesPJ[e.target.id] = e.target.value;
    setValuesPJ(auxValuesPJ);
    console.log(valuesPJ);
    enableButtonConcluirPJ();
  };

  const handleSelectPJEnvolvimento = (value) => {
    const auxValuesPJ = { ...valuesPJ };
    auxValuesPJ["envolvimento"] = value;
    setValuesPJ(auxValuesPJ);
    console.log(valuesPJ);
    enableButtonConcluirPJ();
  };

  const handlePJConcluir = async () => {
    console.log("Grava PJ: ");
    console.log(valuesPJ);
    let response = await api.salvarPessoaNoProcesso(valuesPJ);
    getEnvolvidos();
    handlePJCancel();
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
                title={`PESSOA  |  ${pessoa["razaoSocial"] || pessoa["nome"]}`}
                key={envolvido.id}
                startOpen={false}
              >
                <BlocoPessoaPF
                  processo={processo}
                  envolvido={envolvido}
                  handleChangePessoa={handleChangePessoa}
                  documentosProcesso={documentosProcesso}
                  handleAddListDocument={handleAddListDocument}
                />
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

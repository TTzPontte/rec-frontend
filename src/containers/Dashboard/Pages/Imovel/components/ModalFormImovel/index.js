import React, { useCallback, useEffect, useState } from "react";
import InputMask from "react-input-mask";

import {
  Content,
  DivModalTitulo,
  DivModalTexto,
  Form,
  AreaInput,
  HeaderField,
  Field,
} from "./styled-components";
import "./style.css";

import { ReactComponent as IconInputNomeRazaoSocial } from "@iso/assets/Icon-type-14x14.svg";

import { Button, Input, Modal, Select } from "antd";

import Api from "@iso/api";

const { Option } = Select;

export const ModalFormImovel = ({
  isVisible = false,
  handleIsDone,
  processo,
  handleAddListPatrimonio,
}) => {
  const [buttonConcluir, setButtonConcluir] = useState(true);
  const [erros, setErros] = React.useState(null);
  const [patrimonioCategorias, setPatrimonioCategorias] = useState([]);

  const [inputCategoria, setInputCategoria] = useState("");
  const [inputCEP, setInputCEP] = useState("");
  const [inputNumero, setInputNumero] = useState("");

  const api = new Api();

  const handleGetPatrimonioDM = () => {
    api
      .buscarTabelaDM("/dm-patrimonio-categoria")
      .then(({ data }) => setPatrimonioCategorias(data));
  };

  const handleGetPatrimonioDMCallBack = useCallback(handleGetPatrimonioDM, []);

  useEffect(() => {
    handleGetPatrimonioDMCallBack();
  }, [handleGetPatrimonioDMCallBack]);

  const handleOnSaveForm = () => {
    api
      .salvar("/patrimonio", {
        categoria: inputCategoria,
        cep: inputCEP,
        numero: inputNumero,
      })
      .then(({ data: patrimonio }) => {
        api
          .salvar("/processo-patrimonios", {
            patrimonio: { id: patrimonio.id },
            processo: {
              id: processo.id,
            },
          })
          .then(({ data }) => {
            handleAddListPatrimonio(data.patrimonio);
            handleIsDone();
          });
      })
      .catch((e) => setErros(e.message));
  };

  const enableButtonConcluir = () => {
    const isNotEmpty = (value) => !!value && value !== "";

    if (
      isNotEmpty(inputCategoria) &&
      isNotEmpty(inputCEP) &&
      isNotEmpty(inputNumero)
    ) {
      setButtonConcluir(false);
    }
  };

  const handleOnChangeInputCategoria = (value) => {
    setInputCategoria(value);
    enableButtonConcluir();
  };

  const handleOnChangeInputCEP = (value) => {
    setInputCEP(value);
    enableButtonConcluir();
  };

  const handleOnChangeInputNumero = (value) => {
    setInputNumero(value);
    enableButtonConcluir();
  };

  return (
    <Modal
      style={{ borderRadius: 5 }}
      width={648}
      height={480}
      visible={isVisible}
      onOk={handleIsDone}
      onCancel={handleIsDone}
      footer={null}
      closable={false}
    >
      <Content>
        <DivModalTitulo>
          <span>Adiciona nova PJ</span>
        </DivModalTitulo>
        <DivModalTexto>
          <span>
            Antes de adicionarmos uma nova pessoa à operação, precisamos que
            você nos informe os dados abaixo! ;)
          </span>
        </DivModalTexto>
        <Form>
          <Field>
            <HeaderField>
              <IconInputNomeRazaoSocial style={{ marginRight: "10px" }} />
              <span>Categoria</span>
            </HeaderField>
            <AreaInput>
              <Select
                onChange={(value) => handleOnChangeInputCategoria(value)}
                placeholder="Selecione..."
                style={{ width: 544 }}
                className="inputSelectCategoria"
              >
                {patrimonioCategorias.map((patrimonioCategoria) => (
                  <Option
                    key={patrimonioCategoria.descricao}
                    value={patrimonioCategoria.descricao}
                  >
                    {patrimonioCategoria.descricao}
                  </Option>
                ))}
              </Select>
            </AreaInput>
          </Field>

          <Field>
            <HeaderField>
              <IconInputNomeRazaoSocial style={{ marginRight: "10px" }} />
              <span>CEP</span>
            </HeaderField>
            <AreaInput>
              <InputMask
                id={"ModalCEPImovel"}
                onChange={({ target: { value } }) =>
                  handleOnChangeInputCEP(value)
                }
                className="inputMaskCEPIMOVEL"
                disabled={false}
                placeholder="Ex.: 99999-999"
                mask={"99999-999"}
              />
            </AreaInput>
          </Field>

          <Field>
            <HeaderField>
              <IconInputNomeRazaoSocial style={{ marginRight: "10px" }} />
              <span>Número</span>
            </HeaderField>
            <AreaInput>
              <Input
                id="ModalNUMEROImovel"
                onChange={({ target: { value } }) =>
                  handleOnChangeInputNumero(value)
                }
                placeholder="Ex.: 220"
                style={{ width: 544, height: 40 }}
              />
            </AreaInput>
          </Field>
        </Form>
        <div style={{ marginLeft: "28px", marginTop: "10px" }}>
          <span style={{ color: "red" }}>{erros}</span>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button
            onClick={handleIsDone}
            type="text"
            className="modalNovaPessoa_botaoCancelar"
          >
            CANCELAR
          </Button>
          <Button
            onClick={handleOnSaveForm}
            disabled={buttonConcluir}
            type="text"
            className="modalNovaPessoa_botaoConcluir"
          >
            CONCLUIR
          </Button>
        </div>
      </Content>
    </Modal>
  );
};

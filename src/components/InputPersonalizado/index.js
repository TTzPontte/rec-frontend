import React, { useCallback, useEffect, useState } from "react";

import {
  Container,
  Header,
  Content,
  AreaInput,
  AreaSaveChanged,
} from "./styled-component";

import Input from "@iso/components/uielements/input";

import { ReactComponent as CheckConfirmSecondary } from "@iso/assets/check-confirm-secondary.svg";
import { ReactComponent as CloseSecondary } from "@iso/assets/close-secondary.svg";
import { ReactComponent as IconPencilEdit } from "@iso/assets/icon-pencil_edit.svg";
import { ReactComponent as IconTextNumber } from "@iso/assets/icon-text_number.svg";

export const InputPersonalizado = ({
  texto,
  valorCampo,
  iconeLabel = <IconTextNumber />,
  onSave,
  handleChange = () => {},
  idCampo,
  editavel = true,
  tipoInput = "text",
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [textAlterado, setTextAlterado] = useState("");

  const setLastSaveCallback = useCallback(
    () => setTextAlterado(valorCampo),
    [valorCampo]
  );

  useEffect(() => {
    setLastSaveCallback();
  }, [setLastSaveCallback]);

  const habilitarDesabilitar = () => editavel && setIsEditable(!isEditable);

  const handleOk = () => {
    onSave(textAlterado);
    habilitarDesabilitar();
  };

  const handleCancel = () => habilitarDesabilitar();

  return (
    <Container>
      <Header onClick={habilitarDesabilitar}>
        {iconeLabel}
        <span>{texto}</span>
        <IconPencilEdit className="iconPencilEdit" />
      </Header>
      <Content>
        <AreaInput isEditable={isEditable}>
          <Input
            type={tipoInput}
            defaultValue={valorCampo}
            className={"inputComponent"}
            disabled={!isEditable}
            onChange={(e) => {
              setTextAlterado(e.target.value);
              handleChange(e);
            }}
            id={idCampo}
          />
        </AreaInput>
        {isEditable && (
          <AreaSaveChanged>
            <CheckConfirmSecondary onClick={handleOk} />
            <CloseSecondary onClick={handleCancel} />
          </AreaSaveChanged>
        )}
      </Content>
    </Container>
  );
};

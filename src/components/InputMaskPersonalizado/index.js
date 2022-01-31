import React, { useCallback, useEffect, useState } from "react";
import InputMask from "react-input-mask";

import {
  Container,
  Header,
  Content,
  AreaInput,
  AreaSaveChanged,
} from "./styled-component";

import { ReactComponent as CheckConfirmSecondary } from "../../assets/check-confirm-secondary.svg";
import { ReactComponent as CloseSecondary } from "../../assets/close-secondary.svg";
import { ReactComponent as IconPencilEdit } from "../../assets/icon-pencil_edit.svg";
import { ReactComponent as IconTextNumber } from "../../assets/icon-text_number.svg";

export const InputMaskPersonalizado = ({
  texto = "",
  valorCampo = "",
  iconeLabel = <IconTextNumber />,
  onSave = () => {},
  handleChange = () => {},
  idCampo = "",
  mask = "",
  editavel = true,
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
          <InputMask
            onChange={({ target: { value } }) => {
              handleChange({ target: { id: idCampo, value } });
              setTextAlterado(value);
            }}
            className="inputMask"
            disabled={!isEditable}
            id={idCampo}
            value={textAlterado || ""}
            mask={mask}
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

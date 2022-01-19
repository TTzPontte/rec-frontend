import React, { useState } from "react";
import InputMask from "react-input-mask";
import { ReactComponent as CheckConfirmSecondary } from "../../assets/check-confirm-secondary.svg";
import { ReactComponent as CloseSecondary } from "../../assets/close-secondary.svg";
import { ReactComponent as IconPencilEdit } from "../../assets/icon-pencil_edit.svg";
import { ReactComponent as IconTextNumber } from "../../assets/icon-text_number.svg";
import "./style.css";

export const InputMaskPersonalizado = ({
  texto,
  valorCampo,
  iconeLabel = <IconTextNumber />,
  onSave,
  handleChange = () => {},
  idCampo,
  mask,
  editavel = true,
}) => {
  const [estiloInput, setEstiloInput] = useState("desabilitado inputMaskClass");
  const [desabilitarCampo, setDesabilitarCampo] = useState(true);
  const [estiloIconeOk, setEstiloIconeOk] = useState("hidden");
  const [estiloIconeNOk, setEstiloIconeNOk] = useState("hidden");
  const [estiloIconeEditar, setEstiloIconeEditar] = useState("hidden");
  const [valor, setValor] = useState(valorCampo);

  const habilitarDesabilitar = () => {
    if (editavel) {
      setDesabilitarCampo(!desabilitarCampo);

      if (estiloInput === "desabilitado inputMaskClass") {
        setEstiloInput("inputMaskClass");
      } else {
        setEstiloInput("desabilitado inputMaskClass");
      }

      if (estiloIconeNOk === "hidden") {
        setEstiloIconeNOk("iconeCinza");
      } else {
        setEstiloIconeNOk("hidden");
      }

      if (estiloIconeOk === "hidden") {
        setEstiloIconeOk("iconeVerde");
      } else {
        setEstiloIconeOk("hidden");
      }
    }
  };

  const handleMouseOver = () => {
    if (estiloIconeEditar === "hidden") {
      setEstiloIconeEditar("iconeEditar");
    } else {
      setEstiloIconeEditar("hidden");
    }
  };

  const handleOk = () => {
    onSave(valor);
    habilitarDesabilitar();
  };

  const handleCancel = () => {
    habilitarDesabilitar();
  };

  return (
    <div>
      <div
        className="hoverAzul labelInput"
        onClick={habilitarDesabilitar}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOver}
      >
        {iconeLabel} {texto} <IconPencilEdit className={estiloIconeEditar} />
      </div>
      <div className="divInput">
        <InputMask
          onChange={({ target: { value } }) => {
            handleChange({ target: { id: idCampo, value } });
            setValor(value);
          }}
          bordered={desabilitarCampo}
          className={estiloInput}
          disabled={desabilitarCampo}
          id={idCampo}
          value={valor}
          mask={mask}
        />
      </div>
      <CheckConfirmSecondary className={estiloIconeOk} onClick={handleOk} />{" "}
      <CloseSecondary className={estiloIconeNOk} onClick={handleCancel} />
    </div>
  );
};

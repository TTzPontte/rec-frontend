import React, { useState } from "react";
import CurrencyInput from "react-currency-input";
import { ReactComponent as CheckConfirmSecondary } from "../../assets/check-confirm-secondary.svg";
import { ReactComponent as CloseSecondary } from "../../assets/close-secondary.svg";
import { ReactComponent as IconPencilEdit } from "../../assets/icon-pencil_edit.svg";
import "./style.css";

export default function InputMonetarioPersonalizado({
  texto,
  valorCampo,
  iconeLabel,
  onSave,
  handleChange = () => {},
  idCampo,
  editavel = true,
}) {
  const [estiloInput, setEstiloInput] = useState(
    "desabilitado inputMonetarioClass"
  );
  const [desabilitarCampo, setDesabilitarCampo] = useState(true);
  const [estiloIconeOk, setEstiloIconeOk] = useState("hidden");
  const [estiloIconeNOk, setEstiloIconeNOk] = useState("hidden");
  const [estiloIconeEditar, setEstiloIconeEditar] = useState("hidden");
  const [textAlterado, setTextAlterado] = useState(valorCampo);

  const habilitarDesabilitar = () => {
    if (editavel) {
      setDesabilitarCampo(!desabilitarCampo);

      if (estiloInput === "desabilitado inputMonetarioClass") {
        setEstiloInput("inputMonetarioClass");
      } else {
        setEstiloInput("desabilitado inputMonetarioClass");
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
    onSave(textAlterado);
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
        <CurrencyInput
          decimalSeparator=","
          thousandSeparator="."
          precision="2"
          prefix="R$"
          value={textAlterado}
          className={estiloInput}
          disabled={desabilitarCampo}
          onChange={(value) => {
            setTextAlterado(value);
            handleChange({ target: { id: idCampo, value } });
          }}
          id={idCampo}
        />
      </div>
      <CheckConfirmSecondary className={estiloIconeOk} onClick={handleOk} />{" "}
      <CloseSecondary className={estiloIconeNOk} onClick={handleCancel} />
    </div>
  );
}

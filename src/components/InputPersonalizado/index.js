import Input from "@iso/components/uielements/input";
import React, { useState } from "react";
import { ReactComponent as CheckConfirmSecondary } from "../../assets/check-confirm-secondary.svg";
import { ReactComponent as CloseSecondary } from "../../assets/close-secondary.svg";
import { ReactComponent as IconPencilEdit } from "../../assets/icon-pencil_edit.svg";
import "./style.css";

export default function InputPersonalizado({
  texto,
  valorCampo,
  iconeLabel,
  onSave,
  handleChange,
  idCampo,
  editavel = true,
  tipoInput = "text",
}) {
  const [estiloInput, setEstiloInput] = useState("desabilitado");
  const [desabilitarCampo, setDesabilitarCampo] = useState(true);
  const [estiloIconeOk, setEstiloIconeOk] = useState("hidden");
  const [estiloIconeNOk, setEstiloIconeNOk] = useState("hidden");
  const [estiloIconeEditar, setEstiloIconeEditar] = useState("iconeEditar");
  const [textAlterado, setTextAlterado] = useState("");

  const habilitarDesabilitar = () => {
    if (editavel) {
      setDesabilitarCampo(!desabilitarCampo);

      if (estiloInput) {
        setEstiloInput(null);
      } else {
        setEstiloInput("desabilitado");
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
    if (estiloIconeEditar == "hidden") {
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
        {iconeLabel}
        <span style={{ marginLeft: "7px" }}>{texto}</span>
        <IconPencilEdit className={estiloIconeEditar} />
      </div>
      <div className="divInput">
        <Input
          type={tipoInput}
          defaultValue={valorCampo}
          className={estiloInput}
          disabled={desabilitarCampo}
          onChange={(e) => {
            setTextAlterado(e.target.value);
            handleChange(e);
          }}
          id={idCampo}
        />
      </div>
      <CheckConfirmSecondary className={estiloIconeOk} onClick={handleOk} />{" "}
      <CloseSecondary className={estiloIconeNOk} onClick={handleCancel} />
    </div>
  );
}
